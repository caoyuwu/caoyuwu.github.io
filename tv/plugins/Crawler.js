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
const DefRegExpIds = ["filterExp","matcherRegExpByContent/g","urlMatcherRegExp","urlLineMatcherRegExp","regExpForUrl"];
//"bodyFilterExp",
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
			toRegExpField(def,id,flags);
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
function toRegExpField(o,id,flags){
			var v = o[id];
			if( !v )
			   return;
			if( typeof(v)=="string" ){
		    	o[id] = flags ? new RegExp(v,flags)  : new RegExp(v);
		    } else if( v instanceof Array ){
				for(var j=0;j<v.length;j++){
					if( typeof(v[j])=="string" )
						v[j] = flags ? new RegExp(v[j],flags)  : new RegExp(v[j]);
				}
			}
	return o[id];
}
function _toArray(o){
	return o && o instanceof Array ? o : [o];
}
/*
*/
function load(url){
	var p = url.indexOf(':');
	if( p<0 )
	    return null;
	var protocol = url.substring(0,p);
	const forList = protocol.endsWith("-list");
	const forUrls = protocol.endsWith("-urls");
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
				   params[s.substring(0,p)] = decodeURIComponent(s.substring(p+1));	
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
		defType = forList ? "List" : (forUrls ? "Urls" : "MediaSource" );
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
	const defv = load(url);
	if( !defv )
	   return ;
	const def = defv.def;   
	const content = loadContent(replaceMacro(defv.contentUrl||def.contentUrl,defv.params),{});
//if(_debug) 	print("content="+content);
//print(def.urlMatcherRegExp)	   
    if( def.urlMatcherRegExp ){
		const ra = def.urlMatcherRegExp  instanceof Array ? def.urlMatcherRegExp : [def.urlMatcherRegExp];
		for(const r of ra){
			//const r = def.urlMatcherRegExp;
//if(_debug) print("r="+r);		
			const v = r.exec(content);
			if( v && v.length>1 ){
				return v[1];
			}
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
		   const macros1 = function(id){
			     switch( id ){
					 case "HTMLDOMCHILDIDX":
					    return ""+i;
				}
			};
		if( def.bodyFilter
		   && !evalCondMatched(def.bodyFilter,macros1,macros)
		   ){
	//if(_debug) print(" 不要满足 bodyFilter 的条件: "+def.bodyFilter.cmpVal+",");		   
			continue;
		}	
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
//if(_debug) print("  ;_contentUrl="+_contentUrl);        			
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
			const titE = def.titSelector ? ea[i].querySelector(def.titSelector) : ea[i];
			const urlE = def.urlSelector ? ea[i].querySelector(def.urlSelector) : ea[i];
			const macros1 = function(id){
				switch( id ){
					case "URLDOM.attr.href": return urlE.getAttribute("href");
					case "URLDOM.attr.href.name": {
						var s = urlE.getAttribute("href");
						p = s ? s.lastIndexOf("/") : -1;
						return p>=0 ? s.substring(p+1) : s;
					}
					case "URLDOM.attr.href.lastpath": {
						var s = urlE.getAttribute("href");
						p = s ? s.lastIndexOf("/") : -1;
						if( p<0 )
						   return null;
						s = s.substring(0,p);
						p =  s.lastIndexOf("/") ;    
						return p>=0 ? s.substring(p+1) : s;
					}
					case "URLDOM.attr.title": return urlE.getAttribute("title");
					//case "url": return url;
					//case "title": return title;
					case "DOMCONTENT": return ea[i].getAllNodeValue().trim();
					case "PREVDOMID": return i>0 ? ea[i-1].getAttribute("id") : null; 
					default:
						 if( id.startsWith("URLDOM.attr.") ) {
							 return urlE.getAttribute(id.substring(12));
						 } 
						 break;
				}
			};
			
			if( def.filter 
			   && !evalCondMatched(def.filter,macros1,macros)
			   ){
//if(_debug) print(" 不满足: "+def.filter.cmpVal);				   
				continue;
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

            var defTitle = def.title, defUrl = def.url, defItems = def.items;  
			
			if( def.condVals ){
				const condVal = getMatchedCondVal(def.condVals,macros1,macros);
				if( !condVal )
				   continue;
				if( condVal.title!==undefined) 
				   	defTitle = condVal.title;
				if( condVal.url!==undefined) 
				   	defUrl = condVal.url;
				if( condVal.items!==undefined) 
				   	defItems = condVal.items;
			}
									
			title = defTitle ? replaceMacro(defTitle,macros1,macros)
							  : titE.getAllNodeValue();
			if( defUrl===null )
				url =  null;			   
			else if( defUrl  )				  
		   	   url = replaceMacro(defUrl,macros1,macros);
		   	else {
			   url = urlE.getAttribute("href"); // href	   
			}   
			if( def.regExpForUrl && url ){
				var v = def.regExpForUrl.exec(url);
				if( !v )
				   continue;
				 url = v[1];  
			}
			var item = {title:title.trim()};
			if( url && url!=""  )
				item.url = url;
			if( urls ) // todo
			    item.urls = urls;
			    
			if( defItems ){
				if( typeof(defItems)=="string" ){
					item.items = replaceMacro(defItems,macros1,macros);
				} else {
					var newMacro = {};
					if( macros) for(var n in macros ){
						newMacro[n] = macros[n];
					}
					newMacro.PMENUDOMIDX = i;
					newMacro.PMENUDOM = ea[i];
					item.items = loadMenus4Def(defItems,_contentUrl,contentCache,newMacro);
				}
			} //defItems
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

/*
  condVals:[
	  {
		  url/items :"",...
		  op:"=",
		  cmpVal = ""..
		  regExp = "..." // op=="regexp"
		  cmpMatch = "" // op=="=",">", 等 使用 : cmpVal > cmpMatch
		  
	  }
  ]
*/
function  evalCondMatched(condVal,macros1,macros){
	  /*
	   if( _debug && condVal.logMessage ){
		   print("调试信息: "+replaceMacro(condVal.logMessage,macros1,macros));
	   } */
		const cmpVal = replaceMacro(condVal.cmpVal,macros1,macros);
		if( condVal.regExp ){
			const  regExps = _toArray(toRegExpField(condVal,"regExp",null));
			for(const  regExp of regExps){
// if(_debug ) print("regExp="+regExp+",cmpVal="+cmpVal);				
				if( regExp.test(cmpVal) ){
					return true;
				}    
			}
			return false;
		}
		const cmpMatch = replaceMacro(condVal.cmpMatch,macros1,macros);
		switch( condVal.op || "=" ){
			case "=" : return cmpVal==cmpMatch;
			case "!=" : return cmpVal!=cmpMatch; 
			case ">" : return cmpVal>cmpMatch;
			case "<" : return cmpVal<cmpMatch;
			case ">=" : return cmpVal>=cmpMatch;
			case "<=" : return cmpVal<=cmpMatch;
			case "contains" :
				 return cmpVal.indexOf(cmpMatch)>=0;
			case "!contains" :
				 return cmpVal.indexOf(cmpMatch)<0;
			case "!in":
			case "in" :
				for(var v of cmpMatch){
					if( v==cmpVal )
				  	 	return condVal.op=="in";
				} 
				return  condVal.op!="in";
			case "default":
				 return true;
		}
		return condVal.name=="default"; 
}

function  getMatchedCondVal(condVals,macros1,macros){
	 for(const condVal of  condVals){
		if( evalCondMatched(condVal,macros1,macros) ){
			if( condVal.aliasFor ){
				for(const c of  condVals){
					if( condVal.aliasFor==c.name ){
				//if(_debug) print("通过aliasFor="+condVal.aliasFor+"获取到: "+c.name);		
					   return c;
					 }
				}
			}
			return condVal;
		}
	}
	return null;
}

function  evalValueByCond(condVals,nameVal,macros1,macros){
	for(const condVal of  condVals){
		if( evalCondMatched(condVal,macros1,macros) ){
				return replaceMacro(condVal[nameVal||"value"],macros1,macros);
		}
	}
}
