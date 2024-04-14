{
	"List":{
		"contentUrl":"https://www.nettvpro.xyz/",
		//"xxcontentUrl":"http://127.0.0.1/nettvpro/",
		"htmlSelector":"> body > div#wrapper > div.main_sidebar div.sidebar div.sections ul > li > a",
		"items": "@crawler-list:tv/NettvPro.js#List2?[PATH=${URLDOM.attr.href}&PATHS=${URLDOM.attr.href.lastpath}]",
		"filter": function(macro){
			var href = macro.get("URLDOM.attr.href");
			return href && /\/.+\//.test(href);
			//"cmpVal":"${URLDOM.attr.href}",
		//	"regExp":"\/.+\/"
		}
	},
	"List2":{
		//"contentUrl":"https://www.nettvpro.xyz${PATH}",
		"contentUrl":"http://127.0.0.1/nettvpro${PATH}",
		"htmlSelector":"> body > div#wrapper  div.main_content div.nav-channal ul >li  a ",
		"filter" : function(macro){
			var lastPath = macro.get("URLDOM.attr.href.lastpath");
			return lastPath && macro.get("PATHS").split("/") .indexOf()<0;
		},
		url:null,
		getItems: function(macro){
			const lastPath = macro.get("URLDOM.attr.href.lastpath");
			var lastLv = true;
			if( lastPath=="china" ){
				lastLv = false;
			} else {
				const paths = macro.get("PATHS").split("/");
				if( paths[1]=="china" ){
					// 
					lastLv = paths.length < ( lastPath=="cctv" && lastPath=="weishi" ? 2 :3 );
				}
			}
			return  lastLv ?  "@crawler-list:tv/NettvPro.js#List3?[PATH=${URLDOM.attr.href}&PAGEIDX=1]"
				    : "@crawler-list:tv/NettvPro.js#List2?[PATH=${URLDOM.attr.href}&PATHS=${PATHS}/${URLDOM.attr.href.lastpath}]"
				;
		}
		/*
		"condVals":[
			{
				"aliasFor":"default",
				"cmpVal":"${URLDOM.attr.href.lastpath}",
				 "regExp":[
					 "^cctv$",
					 "^weishi$" 
				 ]  
			},
			{
				"expl":"匹配中间菜单: china,china|省 ",
				"cmpVal":"${PATHS}/${URLDOM.attr.href.lastpath}",
				 "regExp":[
					 "^Asia/china$",
					 "^Asia/china/\\w+$"
				 ] , 
				 "xxlogMessage":"cmpVal=${PATHS}/${URLDOM.attr.href.lastpath}",
				"items": "@crawler-list:tv/NettvPro.json#List2?[PATH=${URLDOM.attr.href}&PATHS=${PATHS}/${URLDOM.attr.href.lastpath}]"
			 },
			 {
				"name": "default", 
				"items": "@crawler-list:tv/NettvPro.json#List3?[PATH=${URLDOM.attr.href}&PAGEIDX=1]"
			 }
		] */
	},
	"List3":{
		"contentUrl":"https://www.nettvpro.xyz/${PATH}/list_${PAGEIDX}.html",
		"htmlSelector":"> body > div#wrapper  div.main_content div.channals-list   a",
		"url":"@crawler-urls:tv/NettvPro.json?[PATH=${URLDOM.attr.href}]"
	},
	"Urls":{
		"contentUrl":"https://www.nettvpro.xyz/${PATH}",
		"xxcontentUrl":"http://127.0.0.1/nettvpro${PATH}",
		"htmlSelector":"> body > div#wrapper  div.main_content div.video-info  ul li a",
		"url":"${URLDOM.attr.onClick}",
		"regExpForUrl":/frame\('(.*)',.*\)/
	}
	
}