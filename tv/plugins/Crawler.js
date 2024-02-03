/*
 html-crawler-list://xvideo/jieav.json;https://www.jieav.com
 html-crawler-list://xvideo/jieav.json#List2;https://www.jieav.com/1/index.html
 html-crawler://-https://www.jieav.com/1/index.html?xxx
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
	if( p<0 )
	   return null;
	var defUrl = url.substring(0,p), defType;
	    url = url.substring(p+1);
	p = defUrl.indexOf('#');
	if( p>0 ){
		defType = defUrl.substring(p+1);
		defUrl = defUrl.substring(0,p);
	} else
	{
		defType = forList ? "List" : "MediaSource";
	}   
	var defText = utils.httpGetAsString(utils.toAbsoluteURL(_scriptURL,defUrl));
	var defs = JSON.parse(defText);
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
//print(v.def.urlMatcherRegExp)	   
    if( v.def.urlMatcherRegExp ){
		var r = new RegExp(v.def.urlMatcherRegExp);
//print(v.content);		
		v = r.exec(v.content);
		if( v && v.length>1 ){
			return v[1];
		}
		return null;
	}	   
}


function loadMenus(url,params){
	var v = load(url);
	if( !v )
	   return ;
	if( v.defs[0].htmlSelector ){
		return loadMenus4HtmlSelector(v.defs,v.content);
	}   
}

function  loadMenus4HtmlSelector(defs,content){
	var  doc = utils.newHTMLDocument(content);   
		var items = [];
    for(var i=0;i<defs.length;i++){
		var def = defs[i];
		
	//print("defName="+defName+","+def.selector);	
		var ea = doc.getBody().querySelectorAll(def.htmlSelector);
		//var titSelector = def
	//print(ea.length);	
		for(var i=0;i<ea.length;i++){
			//var headE = ea[i].querySelector(">div > h3");
			var titE = def.titSelector ? ea[i].querySelector(def.titSelector) : ea[i];
			var urlE = def.urlSelector ? ea[i].querySelector(def.urlSelector) : ea[i];
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
				}
				return $0;
			};
			title = def.title ? def.title.replace(/\$\{(\w|\.|\-)+\}/g,replaceFunc) 
							  : titE.getAllNodeValue(); 
			if( def.url )				  
		   	   url = def.url.replace(/\$\{(\w|\.|\-)+\}/g,replaceFunc);
		   	else {
			   def.url = urlE.getAttribute("href"); // href	   
			}   
			if( def.filterExp ){
				//var filterE = new RegExp(def.filterExp);
				var filterVal = def.filterVal.replace(/\$\{(\w|\.|\-)+\}/g,replaceFunc);
				if( !new RegExp(def.filterExp) .test(filterVal) )
				   continue;
			}
			items.push({url:url,title:title.trim()});  
			//urlE.getAttribute("href");
		}
	}
		return items;
}