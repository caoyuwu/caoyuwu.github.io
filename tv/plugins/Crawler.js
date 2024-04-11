/*
 http://caoyuwu.eu.org/tv/plugins/Crawler.js
 crawler-list://xvideo/jieav.json;https://www.jieav.com
 crawler-list://xvideo/jieav.json#List2;https://www.jieav.com/1/index.html
 
 crawler-list:tv/ainm.json;http://ainm.cc/c/m/
*/
const cacheDefs = {};
const RegMacroID = /\$\{(\w|\.|\-)+\}/g;
/*
@param defUrl  xvideo/jieav.json
@return def
	 def.options#1 : 
  
*/
const DefRegExpIds = ["filterExp","bodyFilterExp","matcherRegExpByContent/g","urlMatcherRegExp","urlLineMatcherRegExp"];

function loadDef(defUrl){
	var defs = cacheDefs[defUrl];
	if( defs ) return defs;
	var defText = utils.httpGetAsString(utils.toAbsoluteURL(_scriptURL,defUrl));
	defs =  cacheDefs[defUrl] = JSON.parse(defText);
	var contentUrl = null;
	for(const defName in defs){
		const def = defs[defName];
		if( defName=="contentUrl" ){
			contentUrl = def;
			continue;
		}
		def._name = defName;
		for( var id of DefRegExpIds){
			const p = id.lastIndexOf("/");
			var flags = null;
			if( p>0 ){
				flags = id.substring(p+1);
				id = id.substring(0,p);
			}
			if( typeof(def[id])=="string" ){
		    	def[id] = flags ? new RegExp(def[id],flags)  : new RegExp(def[id]);
		    }
		}
		/*
		if( typeof(def.filterExp)=="string" )
		    def.filterExp =  new RegExp(def.filterExp);
		if( typeof(def.bodyFilterExp)=="string" )
		    def.bodyFilterExp =  new RegExp(def.bodyFilterExp);
		    //def.matcherRegExpByContent
		 if( typeof(def.matcherRegExpByContent)=="string" )
		    def.matcherRegExpByContent =  new RegExp(def.matcherRegExpByContent,"g");   
		 if( typeof(def.urlMatcherRegExp)=="string" )
		    def.urlMatcherRegExp =  new RegExp(def.urlMatcherRegExp);      
		  */      
	}
	if( contentUrl ){
		delete  defs.contentUrl;
		for(var defName in defs){
			const def = defs[defName];
			if( !def.contentUrl )
			    def.contentUrl = contentUrl;
		}
	}
/*	
 if(_debug ){
	 print("defUrl="+defUrl+":defs="+JSON.stringify(defs));
 } */	
	return defs;
}

/*
*/
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
	var defUrl, defType, contentUrl, params ;
	if( p>=0 ) {   
	    defUrl = url.substring(0,p);
	    contentUrl = url.substring(p+1);
	 } else {
		 defUrl = url;
		 contentUrl = null;
	 }
	if( defUrl.charCodeAt(defUrl.length-1)==93) // ']'
	{
		p = defUrl.lastIndexOf('?[');
		if( p>0 ){
			params = {};
			var a = defUrl.substring(p+2,defUrl.length-1).split("&");
			defUrl =defUrl.substring(0,p);
			for(var s of a){
				p = s.indexOf("=");
				if( p>0) {
				   params[s.substring(0,p)] = encodeURIComponent(s.substring(p+1));	
				}
			} 
		}
	} 
	p = defUrl.indexOf('#');
	if( p>0 ){
		defType = defUrl.substring(p+1);  // List, List2, MediaSource
		defUrl = defUrl.substring(0,p); // xxxx.json
	} else
	{
		defType = forList ? "List" : "MediaSource";
	}   
//if(_debug) print("params="+ JSON.stringify(params)+",contentUrl="+contentUrl+",defUrl="+defUrl);	    
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
		contentUrl : contentUrl,
		params : params
		//content: url?utils.httpGetAsString(url,0x408):null
	};
//	print("defText="+defText);
//	print("defType="+defType);
}

function loadContent(url,cache){
	return cache[url] 
		|| ( cache[url] = utils.httpGetAsString(url,0x408))
		;   
}

function loadHTMLDoc(url,cache){
	  const  key = "[HTML-DOC]"+url;
	  return cache[key]  
	     || ( cache[key]  = utils.newHTMLDocument(loadContent(url,cache)) )
	    ; 
}

function replaceMacro(s){
	if( arguments.length<=1 || !s || s.indexOf("${")<0 ){
		return s;
	}
	const macros = Array.prototype.slice.call(arguments,1);
	const replaceFunc = function($0){
			const id = $0.substring(2,$0.length-1);
			for(const macro of macros){
				if( !macro )
				  	continue;
				 var v;
				 if( typeof(macro)=="function" ){
					  v = macro(id);
				 } else {	 	
				 	v = macro[id];
				 }
				 if( v!==undefined )
				    return v;

			}		   
		 return $0;
	  };
	  return s.replace(RegMacroID,replaceFunc);
}

function prepareMediaSource(url,params){
	var v = load(url);
	if( !v )
	   return ;
	const def = v.def;   
	const content = loadContent(replaceMacro(v.contentUrl||v.def.contentUrl,v.params),{});
//print(v.def.urlMatcherRegExp)	   
    if( def.urlMatcherRegExp ){
		const r = def.urlMatcherRegExp;
//print(v.content);		
		v = r.exec(content);
		if( v && v.length>1 ){
			return v[1];
		}
		//return null;
	} 
//if(_debug) print("def.htmlSelector="+def.htmlSelector);	
	if( def.htmlSelector ){
		const doc = utils.newHTMLDocument(content);
		const e = doc.getBody().querySelector(def.htmlSelector);
//if(_debug) print("e="+e);		
		if( e ) {
			const tagName = e.getTagName().toUpperCase();
//if(_debug) print("tagName="+tagName);			
			if( tagName=="VIDEO" ){
				var src = e.getAttribute("src");
				if( src )
				   return src;
				 /*
				  ??? 获取不到  source
				 */  
				src = e.querySelector("source");
		//if(_debug)print("src="+src);		
				if( src && src.src ){
					return src.src;
				}   
			}
			
		}
	}	   
}

function loadUrls(url,params)
{
	var v = load(url);
	if( !v )
	   return ;
//if(_debug) print(v.content);	   
    const contentCache = {};
	return loadMenus4Def(v.defs,v.contentUrl,contentCache,v.params);   
}	


function loadMenus(url,params){
//print("loadMenus " + url);	
	var v = load(url);
	if( !v )
	   return ;
//if(_debug) print(v.content);	   
    const contentCache = {};
	return loadMenus4Def(v.defs,v.contentUrl,contentCache,v.params);   
}

function loadMenus4Def(defs,contentUrl,contentCache,macros){
	if( !defs )
	    return;
	if( ! ( defs instanceof Array) )
	     defs = [defs];   
	if( defs[0].htmlSelector ){
		return loadMenus4HtmlSelector(defs,contentUrl,contentCache,macros);
	}
	if( defs[0].linesByHtmlSelector ){
		return loadMenus4LinesByHtmlSelector(defs,contentUrl,contentCache,macros);		
	}   
}

function _getBodys4HtmlBodySelector(def,doc,macros){
	if( !def.htmlBodySelector ){
		return [doc.getBody()];
	}
	if( def.htmlBodySelector.startsWith("@") ){
		
		return [macros[def.htmlBodySelector.substring(1)]];
	}
	bodys = []; 
	   var ea = doc.getBody().querySelectorAll(def.htmlBodySelector);
		 //if(_debug) print("ea.length="+ea.length+"  ;htmlBodySelector="+def.htmlBodySelector);			    
	   for(var i=0;i<ea.length;i++){
		   const macro1 = function(id){
			     switch( id ){
					 case "HTMLDOMCHILDIDX":
					    return ""+i;
				}
			};
		if( def.bodyFilterVal ){	
			  const filterVal = replaceMacro(def.bodyFilterVal,macro1,macros);
		     if( def.bodyFilterExp && !def.bodyFilterExp .test(filterVal) ){
		        continue;
		     }	
		     if( def.bodyFilterMatch ){
			   const filterMatch = replaceMacro(def.bodyFilterMatch,macro1,macros);
	//if(_debug) print("filterVal="+filterVal+",filterMatch="+filterMatch);	 		   
			   if( filterMatch!=filterVal ){
				   continue;
			   }
		     }
		   }//def.bodyFilterVal
		   bodys.push(ea[i]);
       }
	return bodys;			   	
}

function  loadMenus4HtmlSelector(defs,contentUrl,contentCache,macros){
		var items = [];
    //for(var i=0;i<defs.length;i++)
    for(var def of defs)
    {
//if(_debug) print("  [loadMenus4HtmlSelector]def._name="+def._name+",contentUrl="+def.contentUrl);
        const _contentUrl = replaceMacro(contentUrl||def.contentUrl,macros);			
		const doc = loadHTMLDoc(_contentUrl,contentCache);
		//var def = defs[i];
	//print("defName="+defName+","+def.selector);
	   	const bodys = _getBodys4HtmlBodySelector(def,doc,macros);
//if(_debug) print("  ;htmlBodySelector="+def.htmlBodySelector);	   	
	   	
	//if(_debug) print("bodys.length="+bodys.length);	 
	for( var body of bodys)	{
	//if(_debug) print("def.htmlBodySelector="+def.htmlBodySelector+"; bodys.length="+bodys.length);	 
	//if(_debug) print("body="+body+";"+typeof(body)+"; def.htmlSelector="+def.htmlSelector);	
		var ea = body.querySelectorAll(def.htmlSelector); 
		//htmlSelector(doc.getBody(),def.htmlSelector,macros);//doc.getBody().querySelectorAll(def.htmlSelector);
		//var titSelector = def
//if(_debug)print("ea.length="+ea.length);	
		for(var i=0;i<ea.length;i++){
			//var headE = ea[i].querySelector(">div > h3");
			// "matcherRegExpByContent":"(.+)\\[18\\+\\](?::|：)\\s*((https|http):\\/\\/.+)"
			var title = "";//
			var url = "";
			var urls = null;
			const macros1 = function(id){
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
						 if( id.startsWith("URLDOM.attr.") ) {
							 return urlE.getAttribute(id.substring(12));
						 } 
				}
			};
			var titE = def.titSelector ? ea[i].querySelector(def.titSelector) : ea[i];
			var urlE = def.urlSelector ? ea[i].querySelector(def.urlSelector) : ea[i];
			title = def.title ? replaceMacro(def.title,macros1,macros)
							  : titE.getAllNodeValue();
			if( def.url===null )
				url =  null;			   
			else if( def.url  )				  
		   	   url = replaceMacro(def.url,macros1,macros);
		   	else {
			   url = urlE.getAttribute("href"); // href	   
			}   
			if( def.filterVal ){
			    const filterVal = replaceMacro(def.filterVal,macros1,macros);
			   if( def.filterExp && !def.filterExp .test(filterVal) ){
				//var filterE = new RegExp(def.filterExp);
				   continue;
			    }
				if( def.filterMatch ){
				//var filterE = new RegExp(def.filterExp);
				    const filterMatch = replaceMacro(def.filterMatch,macros1,macros);
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
			if( urls ) // todo
			    item.urls = urls;
			if( def.items ){
				var newMacro = {};
				if( macros) for(var n in macros ){
					newMacro[n] = macros[n];
				}
				newMacro.PMENUDOMIDX = i;
				newMacro.PMENUDOM = ea[i];
				item.items = loadMenus4Def(def.items,_contentUrl,contentCache,newMacro);
			}
			items.push(item);  
			//urlE.getAttribute("href");
		} // for ea.length
	 }// bodys
	} // defs
		return items;
}

function  loadMenus4LinesByHtmlSelector(defs,contentUrl,contentCache,macros){
		var items = [];
    //for(var i=0;i<defs.length;i++)
    for(var def of defs)
    {
//if(_debug) print("  [loadMenus4HtmlSelector]def._name="+def._name+",contentUrl="+def.contentUrl);
        const _contentUrl = replaceMacro(contentUrl||def.contentUrl,macros);			
		const doc = loadHTMLDoc(_contentUrl,contentCache);
		//var def = defs[i];
	//print("defName="+defName+","+def.selector);
	   	const bodys = _getBodys4HtmlBodySelector(def,doc,macros);
	   for( var body of bodys)	{ 
		  var ea = body.querySelectorAll(def.linesByHtmlSelector); 
		//htmlSelector(doc.getBody(),def.htmlSelector,macros);//doc.getBody().querySelectorAll(def.htmlSelector);
		//var titSelector = def
//if(_debug)print("ea.length="+ea.length);	
		  for(var i=0;i<ea.length;i++){
				const lines = ea[i].getAllNodeValue().trim().split("\n");//.split("");
				var lastGrpTit = null;
				var lastSubItems = null;  var urlsByTit = null;
				var r;
				if( r=def.urlLineMatcherRegExp ){
					for(var line of lines){
						line = line.trim();
						if( line=="" || line.charCodeAt(0)==35 ) // '#'
						{
							continue;
						}
						var v = r.exec(line);
//if(_debug) print(line+" v="+v);						
						if( v ){
							if( !lastSubItems ){
								lastSubItems = [];
								items.push({title:lastGrpTit,items:lastSubItems});
								urlsByTit = new Map();
							}
							const tit = v[1];
							var o = urlsByTit.get(tit);
							if( o ){
								if( !o.urls ){
									o.urls  = [o.url];
									delete o.url;
								}
								o.urls.push(v[2]);
							} else 
							{
								o = {title:tit,url:v[2]};//urls = [v[2]];
								urlsByTit.set(tit,o);
								lastSubItems.push(o);
							}
							//items.push({url:v[2],title:v[1]});  
						} else {
							lastGrpTit = line;
							lastSubItems = null;
						}
					}
				}   
		  } //for ea.length
	  } // bodys
	}
	return items;	 
}
