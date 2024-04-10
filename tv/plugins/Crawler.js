/*
 http://caoyuwu.eu.org/tv/plugins/Crawler.js
 crawler-list://xvideo/jieav.json;https://www.jieav.com
 crawler-list://xvideo/jieav.json#List2;https://www.jieav.com/1/index.html
 
 crawler-list:tv/ainm.json;http://ainm.cc/c/m/
*/
var cacheDefs = {};
/*
@param defUrl  xvideo/jieav.json
@return def
	 def.options#1 : 
  
*/
function loadDef(defUrl){
	var defs = cacheDefs[defUrl];
	if( defs ) return defs;
	var defText = utils.httpGetAsString(utils.toAbsoluteURL(_scriptURL,defUrl));
	defs =  cacheDefs[defUrl] = JSON.parse(defText);
	for(var defName in defs){
		var def = defs[defName];
		if( typeof(def.filterExp)=="string" )
		    def.filterExp =  new RegExp(def.filterExp);
		if( typeof(def.bodyFilterExp)=="string" )
		    def.bodyFilterExp =  new RegExp(def.bodyFilterExp);
		    //def.matcherRegExpByContent
		 if( typeof(def.matcherRegExpByContent)=="string" )
		    def.matcherRegExpByContent =  new RegExp(def.matcherRegExpByContent,"g");   
		        
	}
	return defs;
}
function load(url){
	var p = url.indexOf(':');
	if( p<0 )
	    return null;
	var protocol = url.substring(0,p);
	var forList = protocol.endsWith("-list");
	url = url.substring(p+1);
	for(;url.length>0 && url[0]=='/';)
	   url = url.substring(1);
	p = url.indexOf(';');
	if( p<0 )
	   return null;
	var defUrl = url.substring(0,p), defType;
	    url = url.substring(p+1);
	p = defUrl.indexOf('#');
	if( p>0 ){
		defType = defUrl.substring(p+1);  // List, List2, MediaSource
		defUrl = defUrl.substring(0,p); // xxxx.json
	} else
	{
		defType = forList ? "List" : "MediaSource";
	}   
	var defs = loadDef(defUrl);
	var defsA = [];
	for(var defName in defs){
		if( defName==defType || defName.startsWith(defType+"-") ){
			defsA.push(defs[defName]);
		}
		//var def = defs[defName];
	}
	if( defsA.length==0 )
	    return null;
	return {
		//defType : defType,
		defs : defsA,
		def : defsA[0],
		content: utils.httpGetAsString(url,0x408)
	};
//	print("defText="+defText);
//	print("defType="+defType);
}




function prepareMediaSource(url,params){
	var v = load(url);
	if( !v )
	   return ;
	const def = v.def;   
//print(v.def.urlMatcherRegExp)	   
    if( def.urlMatcherRegExp ){
		var r = new RegExp(def.urlMatcherRegExp);
//print(v.content);		
		v = r.exec(v.content);
		if( v && v.length>1 ){
			return v[1];
		}
		return null;
	} else if( def.htmlSelector ){
		var doc = utils.newHTMLDocument(v.content);
		var e = doc.getBody().querySelectorAll(def.htmlSelector);
		var tagName = e.getTagName().toUpperCase();
		if( tagName=="VIDEO" ){
			return e.getAttribute("src");
		}
		
	}	   
}


function loadMenus(url,params){
//print("loadMenus " + url);	
	var v = load(url);
	if( !v )
	   return ;
//if(_debug) print(v.content);	   
	return loadMenus4Def(v.defs,v.content,null,null);   
}

function loadMenus4Def(defs,content,doc,macros){
	if( !defs )
	    return;
	if( ! ( defs instanceof Array) )
	     defs = [defs];   
	if( defs[0].htmlSelector ){
		 if( !doc )
		 	doc = utils.newHTMLDocument(content);
		return loadMenus4HtmlSelector(defs,content,doc,macros);
	}   
}

var RegMacroID = /\$\{(\w|\.|\-)+\}/g;
function  loadMenus4HtmlSelector(defs,content,doc,macros){
		var items = [];
    //for(var i=0;i<defs.length;i++)
    for(var def of defs)
    {
		//var def = defs[i];
	//print("defName="+defName+","+def.selector);
	   	var bodys ;
//if(_debug) print("  ;htmlBodySelector="+def.htmlBodySelector);	   	
	   	if( def.htmlBodySelector ) {
			  bodys = []; 
			   var ea = doc.getBody().querySelectorAll(def.htmlBodySelector);
 //if(_debug) print("ea.length="+ea.length+"  ;htmlBodySelector="+def.htmlBodySelector);			    
			   for(var i=0;i<ea.length;i++){
				   var replaceFunc = function($0){
					   var id = $0.substring(2,$0.length-1);
					     switch( id ){
							 case "HTMLDOMCHILDIDX":
							    return ""+i;
							 default:
								if( macros && macros[id]!=null ){
									return macros[id];
								}
							  break; 
						}
					   return $0;
					};
				if( def.bodyFilterVal ){	
					  var filterVal = def.bodyFilterVal.replace(RegMacroID,replaceFunc);
				   if( def.bodyFilterExp && !def.bodyFilterExp .test(filterVal) ){
				        continue;
				   }	
				   if( def.bodyFilterMatch ){
					   var filterMatch = def.bodyFilterMatch.replace(RegMacroID,replaceFunc);
			//if(_debug) print("filterVal="+filterVal+",filterMatch="+filterMatch);	 		   
					   if( filterMatch!=filterVal ){
						   continue;
					   }
				   }
				   }//def.bodyFilterVal
				   bodys.push(ea[i]);	
			   }
		 } else
		 {
			 bodys = [doc.getBody()];
		 }
	//if(_debug) print("bodys.length="+bodys.length);	 
	for( var body of bodys)	{ 
		var ea = body.querySelectorAll(def.htmlSelector); 
		//htmlSelector(doc.getBody(),def.htmlSelector,macros);//doc.getBody().querySelectorAll(def.htmlSelector);
		//var titSelector = def
//if(_debug)print("ea.length="+ea.length);	
		for(var i=0;i<ea.length;i++){
			//var headE = ea[i].querySelector(">div > h3");
			// "matcherRegExpByContent":"(.+)\\[18\\+\\](?::|：)\\s*((https|http):\\/\\/.+)"
			var title = "";//
			var url = "";
			var replaceFunc = function($0){
				//print("$0="+$0);	
				var id = $0.substring(2,$0.length-1);
				switch( id ){
					case "URLDOM.attr.href": return urlE.getAttribute("href");
					case "URLDOM.attr.href.name": {
						var s = urlE.getAttribute("href");
						p = s ? s.lastIndexOf("/") : -1;
						return p>=0 ? s.substring(p+1) : s;
					}
					case "URLDOM.attr.title": return urlE.getAttribute("title");
					case "url": return url;
					case "title": return title;
					case "DOMCONTENT": return ea[i].getAllNodeValue().trim();
					case "PREVDOMID": return i>0 ? ea[i-1].getAttribute("id") : null; 
					default:
					{
						if( macros && macros[id]!=null ){
							return macros[id];
						}
						break;
					}
				}
				return $0;
			};
			var titE = def.titSelector ? ea[i].querySelector(def.titSelector) : ea[i];
			var urlE = def.urlSelector ? ea[i].querySelector(def.urlSelector) : ea[i];
			title = def.title ? def.title.replace(RegMacroID,replaceFunc) 
							  : titE.getAllNodeValue();
			if( def.url===null )
				url =  null;			   
			else if( def.url  )				  
		   	   url = def.url.replace(RegMacroID,replaceFunc);
		   	else {
			   url = urlE.getAttribute("href"); // href	   
			}   
			if( def.filterVal ){
			    var filterVal = def.filterVal.replace(RegMacroID,replaceFunc);
			   if( def.filterExp && !def.filterExp .test(filterVal) ){
				//var filterE = new RegExp(def.filterExp);
				   continue;
			    }
				if( def.filterMatch ){
				//var filterE = new RegExp(def.filterExp);
				    var filterMatch = def.filterMatch.replace(RegMacroID,replaceFunc);
				   if( filterMatch!=filterVal )
				     continue;
			    }
			}
			
			if( def.matcherRegExpByContent ){
				var r = def.matcherRegExpByContent;
//print(v.content);		
                 var text = ea[i].getAllNodeValue().trim();//.split("");
                for(;;){ 
				var v = r.exec(text);
				if( !v )
				   break;
				if( v.length>=3 ){
					items.push({url:v[2],title:v[1]});  
				}
				}
				continue;
				   
			}
			var item = {title:title.trim()};
			if( url && url!=""  )
				item.url = url;
			if( def.items ){
				var newMacro = {};
				if( macros) for(var n in macros ){
					newMacro[n] = macros[n];
				}
				newMacro.PMENUDOMIDX = i;
				item.items = loadMenus4Def(def.items,content,doc,newMacro);
			}
			items.push(item);  
			//urlE.getAttribute("href");
		} // forea.length
	 }// bodys
	}
		return items;
}


