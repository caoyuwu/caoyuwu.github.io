/*
 http://caoyuwu.eu.org/tv/plugins/Crawler.js
 crawler-list://xvideo/jieav.json;https://www.jieav.com
 crawler-list://xvideo/jieav.json#List2;https://www.jieav.com/1/index.html
 
 crawler-list:tv/ainm.json;http://ainm.cc/c/m/
*/
const cacheDefs = {};
const RegMacroID = /\$\{(\w|\.|\-)+\}/g;
(function(){
	RegExp.prototype.exec1 = function(s){
		if( !s )
		    return null;
		const v = this.exec(s);
		return  v && v.length>1 ? v[1] : null;
	};
})();

var webview;
/*
@param defUrl  xvideo/jieav.json
@return def
	 def.options#1 : 
  
*/
//const DefRegExpIds = ["filterExp","matcherRegExpByContent/g","urlMatcherRegExp","urlLineMatcherRegExp","regExpForUrl"];
//"bodyFilterExp",
function Macro(){
	this.macros = Array.prototype.slice.call(arguments,0);	
};
Macro.prototype.get = function(id){
	/*
 if( _debug  ){
	 print("this.macros="+this.macros.length+", id="+id);
 }	*/
	for(var macro of this.macros){
				if( !macro )
				  	continue;
	/*			  	
	if( _debug ){
	if( typeof(macro)!="function" ){
		print("macro = "+JSON.stringify(macro));
		}else {
			print("macro = function(id){..}");
		}		
	} // */	  	
				 var v;
				 if( typeof(macro)=="function" ){
					  v = macro(id);
				 } else {	 	
				 	v = macro[id];
				 }
				 if( v!==undefined )
				    return v;

	}	
}

Macro.prototype.replace = function(s){
	  if(  !s || s.indexOf("${")<0 ){
		return s;
	  }
	  const m = this;	
	  return s.replace(RegMacroID,
	        function($0){
				const v = m.get($0.substring(2,$0.length-1));	   
		 		return v===undefined ? $0 : v;
	  		}		
	  ); 
}

/*
@param defUrl http://caoyuwu.github.io/tv/plugins/video/test.js?[PATH={URLDOM.attr.href}]
@return {
	  List:xxx, 
	  List-x:xxx,
	  MediaSource:xxx
	  }
*/
function loadDef(defUrl){
	defUrl = utils.toAbsoluteURL(_scriptURL,defUrl);
	var defs = cacheDefs[defUrl];
	if( defs ) return defs;
	var defText = utils.httpGetAsString(defUrl);
	//defs =  cacheDefs[defUrl] = JSON.parse(defText);
	defs =  cacheDefs[defUrl] = eval("("+defText+")");
	var contentUrl = null , cookiesFromCfgFile = null;
	var config = null; 
	for(var defName in defs){
		var def = defs[defName];
		if( defName=="contentUrl" ){
			contentUrl = typeof(def)=="function" ? def() : def;
			continue;
		}
		if( defName=="cookiesFromCfgFile" ){
			cookiesFromCfgFile = typeof(def)=="function" ? def() : def;
			continue;
		}
		if( typeof(def)=="string" || typeof(def)=="function" || typeof(def)=="number" ){
			continue;
		} 
		def._name = defName;
		def._parent = defs;
		/*
		for( var id of DefRegExpIds){
			const p = id.lastIndexOf("/");
			var flags = null;
			if( p>0 ){
				flags = id.substring(p+1);
				id = id.substring(0,p);
			}
			toRegExpField(def,id,flags);
		}
		*/
	} // for defs
	//print("contentUrl="+contentUrl+",cookiesFromCfgFile="+cookiesFromCfgFile);
	if( contentUrl ){
		//delete  defs.contentUrl;
		for(var defName in defs) {
			var def = defs[defName];
			if( typeof(def)=="string" || typeof(def)=="function" || typeof(def)=="number" ){
				continue;
			}
			if( !def.contentUrl ) {
			    def.contentUrl = contentUrl;
			 } else if( def.contentUrl.startsWith("~")) {
				 def.contentUrl = contentUrl+def.contentUrl.substring(1);
				 //var p = def.contentUrl.indexOf("${DFTCONTENTURL}");
				 //if( p>=0 ){
				//	 def.contentUrl = def.contentUrl
				 //}
			 }
		} // for(var defName in defs)
		if( cookiesFromCfgFile ){
			delete defs.cookiesFromCfgFile;
			utils.addHttpCookiesFromCfgFile(contentUrl,"configs/"+cookiesFromCfgFile);//"configs/Douyin-Cookies.txt");
		}
	} // if( contentUrl )
	defs._defUrl = defUrl;  // def._parent._defUrl
/*	
 if(_debug ){
	 print("defUrl="+defUrl+":defs="+JSON.stringify(defs));
 } */	
	return defs;
}

function _toArray(o){
	return o && o instanceof Array ? o : [o];
}
/*
   crawler-list:video/test.js?[PATH={URLDOM.attr.href}]
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
	var defs = loadDef(defUrl);  // {List:xxx, List-x:xxx,MediaSource:xxx}
	var defsA = [];
	for(var defName in defs) {
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

function loadContent(def,url,cache){
	if( !url )
	   return null;
	 var v;  
	 if( !(v=cache[url]) ){
		 cache[url] = v = def.loadUrlContent ? def.loadUrlContent(url) 
		 				: utils.httpGetAsString(url,def.httpReqOpts||0x408);
		 //0x488 使用代理
		 if( !v ) {
		    throw "装载"+url+"内容失败";
		  }
	 }
	 return v;
	 	
 //if( _debug )print("[loadContent] url = "+url);
	  
}

function loadHTMLDoc(def,url,cache){
	if( !url )
	   return null;
	  const  key = "[HTML-DOC]"+url;
	  return cache[key]  
	     || ( cache[key]  = utils.newHTMLDocument(loadContent(def,url,cache)) )
	    ; 
}

/** 
  @return  
        (1)  "http://..."
  		(2) {url:"http://..."",proxy:"*",headers:{}} 
*/
function prepareMediaSource(url,params){
	const defv = load(url);
	if( !defv )
	   return ;
	const def = defv.def;   
	const content = loadContent(def,replaceMacro1(defv.contentUrl||def.contentUrl,defv.params),{});
//if(_debug) 	print("content="+content);
//print(def.urlMatcherRegExp)	   
    if( def.urlMatcherRegExp ){
		// /<video[\s\S]*>[\s\S]*src="((https|http):\/\/[^"]+)"[\s\S]*<\/video>/,
		const ra = def.urlMatcherRegExp  instanceof Array ? def.urlMatcherRegExp : [def.urlMatcherRegExp];
		for(var r of ra){
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
//		if(_debug)print("src="+src);		
				if( src && src.src ){
					return src.src;
				}   
			}
			
		}
		return null;
	}	  
	if( def.getUrl ){
		return def.getUrl(new Macro(defv.params),content);
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

/**
 * @return 
 *   { title:"...",items:"@crawler-list:"}
 *  { title:"...",items:[{},...]}
 *   { title:"...",url:"crawler:"}
 * { title:"...",url:"http://..."}
 */
function loadMenus(url,params){
//print("loadMenus " + url);	
	var v = load(url);
	if( !v )
	   return ;
//if(_debug) print(v.content);	   
    const contentCache = {};
	return loadMenus4Def(v.defs,v.contentUrl,contentCache,v.params);   
}
/*
  i => to
*/
/*
function  addItemsTo(to, v){
	if( !v ) return;
	if( v instanceof)
} */
function loadMenus4Def(defs,contentUrl,contentCache,macros){
	if( !defs )
	    return;
	if( ! ( defs instanceof Array) )
	     defs = [defs];   
	var items = [];
	for(var def of defs)
    {     
	if( def.htmlSelector || def.htmlSelectors ){
		 loadMenus4HtmlSelector(items,def,contentUrl,contentCache,macros);
		 continue;
	}
	if( def.linesByHtmlSelector ){
		loadMenus4LinesByHtmlSelector(items,def,contentUrl,contentCache,macros);	
		continue;	
	}   
	/*
	   必须最后处理 getItems, 因为 htmlSelector 情况下也有 
	*/ 
	if( def.loadItems ){
        	const _contentUrl = replaceMacro1(contentUrl||def.contentUrl,macros);
      //  print("def._parent = "+def._parent);	
        	def.loadItems(items,_contentUrl,contentCache,macros);
        	continue;
	 }
	} // for defs
	return items;
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
			const macro = new Macro(
				function(id){
			     switch( id ){
					 case "HTMLDOMCHILDIDX":
					    return ""+i;
				}
			   }, macros
			);
		if( def.bodyFilter
		   && !def.bodyFilter(macro) //evalCondMatched(def.bodyFilter,macros1,macros)
		   ){
	//if(_debug) print(" 不要满足 bodyFilter 的条件: "+def.bodyFilter.cmpVal+",");		   
			continue;
		}	
		   bodys.push(ea[i]);
       }
	return bodys;			   	
}

function  loadMenus4HtmlSelector(items,def,contentUrl,contentCache,macros){
//if(_debug) print("  [loadMenus4HtmlSelector]def._name="+def._name+",contentUrl="+def.contentUrl);
        const _contentUrl = replaceMacro1(contentUrl||def.contentUrl,macros);
//if(_debug) print("  ;_contentUrl="+_contentUrl);        			
		const doc = loadHTMLDoc(def,_contentUrl,contentCache);
		//var def = defs[i];
	//print("defName="+defName+","+def.selector);
	   	const bodys = _getBodys4HtmlBodySelector(def,doc,macros);
//if(_debug) print("  ;htmlBodySelector="+def.htmlBodySelector);	   	
	   	
	//if(_debug) print("bodys.length="+bodys.length);	 
	for( var body of bodys)	{
	//if(_debug) print("def.htmlBodySelector="+def.htmlBodySelector+"; bodys.length="+bodys.length);	 
	//if(_debug) print("body="+body+";"+typeof(body)+"; def.htmlSelector="+def.htmlSelector);	
	   const htmlSelectors = def.htmlSelectors ? def.htmlSelectors : [def.htmlSelector];
	  for(var htmlSelector of htmlSelectors ) {
		var ea = body.querySelectorAll(htmlSelector); 
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
			const macro = new Macro(
				function(id){
				switch( id ){
					case "URLDOM" : return urlE;
					case "TITLEDOM" : return titE;
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
					case "TITLEDOMCONTENT": return titE.getAllNodeValue().trim();
					case "PREVDOMID": return i>0 ? ea[i-1].getAttribute("id") : null; 
					case "CONTENTURL" : return _contentUrl;
					case "CONTENTURLORIGIN" :{
						var s = _contentUrl;
						var p1 = s.indexOf("://"); if( p1<0 ) return null;
						var p2 = s.indexOf("/",p1+3);
						return p2>=0 ? s.substring(0,p2) : s;
					}
					default:
						 if( id.startsWith("URLDOM.attr.") ) {
							 return urlE.getAttribute(id.substring(12));
						 } 
						 break;
				}
			},macros);
/*
if(_debug) {
	print(" macros = "+JSON.stringify(macros));	
	print(" ...PATHS = "+macro.get("PATHS")+",URLDOM.attr.href.lastpath="+macro.get("URLDOM.attr.href.lastpath"));	
} */				
			if( def.filter 
			   && !def.filter(macro)
			   //&& !evalCondMatched(def.filter,macros1,macros)
			   ){
//if(_debug) print(" 不满足: "+def.filter);				   
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
			//var params4Items = null;
			if( def.getValue ){
				var val = def.getValue(macro);// getMatchedCondVal(def.condVals,macros1,macros);
				if( !val )
				   continue;
				if( val.title!==undefined) 
				   	defTitle = val.title;
				if( val.url!==undefined) 
				   	defUrl = val.url;
				if( val.items!==undefined) 
				   	defItems = val.items;
			} else {
			   if( def.getUrl ){
				  var val = def.getUrl(macro);
				  if( val!==undefined) 
				   	defUrl = val;
				 }
				 if( def.getTitle ){
					   var val = def.getTitle(macro);
				       if( val!==undefined) 
				      	defTitle = val;
				  }
				 if( def.getItems ){
					var val = def.getItems(macro);
					if( val!==undefined) 
				   		defItems = val;
				}
			}
			title = defTitle ? macro.replace(defTitle) // replace-Macro(defTitle,macros1,macros)
							  : removeMutiBlanks(titE.getAllNodeValue());
			if( defUrl===null ){
				url =  null;			   
			} else if( defUrl  ){				  
		   	   url = macro.replace(defUrl);//replace-Macro(defUrl,macros1,macros);
		    } else if( !defItems ){
			   url = urlE.getAttribute("href"); // href	   
			} else {
			     url =  null;	
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
					item.items = macro.replace(defItems);//replace-Macro(defItems,macros1,macros);
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
			if( item.url || item.items || item.urls){
				items.push(item);  
			}
			//urlE.getAttribute("href");
		} // for ea.length
	   } // htmlSelectors	
	 }// bodys
	//	return items;
} // loadMenus4HtmlSelector

function  loadMenus4LinesByHtmlSelector(items,def,contentUrl,contentCache,macros){
//if(_debug) print("  [loadMenus4HtmlSelector]def._name="+def._name+",contentUrl="+def.contentUrl);
 		const doc = loadHTMLDoc(def,replaceMacro1(contentUrl||def.contentUrl,macros),contentCache);
		//var def = defs[i];
	//print("defName="+defName+","+def.selector);
	   	const bodys = _getBodys4HtmlBodySelector(def,doc,macros);
	   for( var body of bodys)	{ 
		  var ea = body.querySelectorAll(def.linesByHtmlSelector); 
		//htmlSelector(doc.getBody(),def.htmlSelector,macros);//doc.getBody().querySelectorAll(def.htmlSelector);
		//var titSelector = def
//if(_debug)print("ea.length="+ea.length+"; "+def.linesByHtmlSelector+"; body="+body.getTagName());	
		  for(var i=0;i<ea.length;i++)
		  //for(var e of ea )
		  {
			  const e  = ea[i];
			   const content = e.getAllNodeValue();
	//if(_debug)print("content  = "+content);			   
	//if(_debug)print("content.length  = "+content.length);		  
				const lines = content.split("\n");//.split("");
	//	if(_debug)print("["+i+"]lines.length = "+lines.length+"; e==e-1"+(e==ea[i-1]));		
				var lastGrpTit = null;
				var lastSubItems = null;  var urlsByTit = null;
				var r;
				if( r=def.urlLineMatcher ){
					for(var line of lines){
						line = line.trim();
						if( line=="" || line.charCodeAt(0)==35 ) // '#'
						{
							continue;
						}
						var v;
						if (typeof(r)=="function") {
							v = r(line);
						} else {
							v = r.exec(line);
						}
//if(_debug) print(line+" v="+v+";  r="+r);						
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
	//return items;	 
}

function replaceMacro1(s,macro){
	if( !macro || !s || s.indexOf("${")<0 ){
		return s;
	}
	return new Macro(macro).replace(s);
}

function  parseUrlParams(url){
	if( !url )
	   return null;
	var p = url.lastIndexOf("?");
	 var params = {};
	if( p<0 )
	    return  params;
	var a = url.substring(p+1).split("&");
	for(var s of a){
//	print(s);	
		p = s.indexOf("=");
		if( p>0) {
		   params[s.substring(0,p)] = decodeURIComponent(s.substring(p+1));	
		}
	} 
	return  params;		
}

/*
不要删除, 留给 脚本调用
  opt:#1 : 需要加 {}
*/
function extractJsonValues(text,prefix,suffix,opt){
	var p1 = text.indexOf(prefix);
	if( p1<0 ) return null;
	var p2 = text.indexOf(suffix,p1+prefix.length);
	if( p2<0 ) return null;
	var s = text.substring(p1+prefix.length,p2);
	if( opt&1 ) s = "{"+s+"}";
	return JSON.parse(s);
}

function removeMutiBlanks(s){
	return s ? s.replaceAll(/\s{2,}/g,' ') : s;
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

/*
function  evalCondMatched(condVal,macros1,macros){
	  /*
	   if( _debug && condVal.logMessage ){
		   print("调试信息: "+replaceMacro(condVal.logMessage,macros1,macros));
	   } * /
		const cmpVal = replaceMacro(condVal.cmpVal,macros1,macros);
		if( condVal.regExp ){
			const  regExps = _toArray(toRegExpField(condVal,"regExp",null));
			for(var  regExp of regExps){
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
	 for(var condVal of  condVals){
		if( evalCondMatched(condVal,macros1,macros) ){
			if( condVal.aliasFor ){
				for(var c of  condVals){
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
	for(var condVal of  condVals){
		if( evalCondMatched(condVal,macros1,macros) ){
				return replaceMacro(condVal[nameVal||"value"],macros1,macros);
		}
	}
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

function replaceMacro(s){
	if( arguments.length<=1 || !s || s.indexOf("${")<0 ){
		return s;
	}
	const macros = Array.prototype.slice.call(arguments,1);
	const replaceFunc = function($0){
			const id = $0.substring(2,$0.length-1);
			for(var macro of macros){
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

*/