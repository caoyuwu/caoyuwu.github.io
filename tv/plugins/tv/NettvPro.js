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
		"contentUrl":"http://www.nettvpro.xyz${PATH}",
		//"contentUrl":"http://127.0.0.1/nettvpro${PATH}",
		"htmlSelector":"> body > div#wrapper  div.main_content div.nav-channal ul >li  a ",
		"filter" : function(macro){
			var lastPath = macro.get("URLDOM.attr.href.lastpath");
			return lastPath && macro.get("PATHS").split("/") .indexOf(lastPath)<0;
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
		"contentUrl":"http://www.nettvpro.xyz/${PATH}/list_${PAGEIDX}.html",
		"htmlSelector":"> body > div#wrapper  div.main_content div.channals-list   a",
		"url":"@crawler-urls:tv/NettvPro.js?[PATH=${URLDOM.attr.href}]"
	},
	"Urls":{
		"contentUrl":"http://www.nettvpro.xyz/${PATH}",
		//"contentUrl":"http://127.0.0.1/nettvpro${PATH}",
		"htmlSelector":"> body > div#wrapper  div.main_content div.video-info  ul li a",
		//"url":"${URLDOM.attr.onClick}",
		//"regExpForUrl":/frame\('(.*)',.*\)/
		/*
		    frame('/player/ckx2.html?url=...' 
     	      frame('/player/play.html?url=https://v3.mediacast.hk/webcast/bshdlive-pc/playlist.m3u8&amp;t=video','100%','650')"
     	      frame('/embed/cctv13.php',...)
     	         重定向到  /player/video.html?url=https://....
     	      frame('/embed/loudi.php?id=cctv13',...)
     	         重定向到  /player/videojs.php?url=https://...
     	      frame('player/play.html?url=cctv13&amp;t=cnsy',...)
     	      frame('/player/video.html?url=...)
     	      
     	      url = /embed/cctv13.php
url = /embed/loudi.php?id=cctv13
url = /player/play.html?url=cctv13&t=cnsy
url = /player/play.html?url=cctv13&t=bupt
url = /player/play.html?url=cctv13&t=cctv
url = /embed/migu.php?id=cctv13
url = /wuxianlu.html

		*/
		getUrl(macro){
			var url = /frame\('([^']*)',.*\)/ .exec1(macro.get("URLDOM.attr.onClick"));
			if( !url ){
				return null;
			}
		//	print("url = "+url);//	
			if( url.startsWith("/player/") ){
				var params = parseUrlParams(url);
				return params ? params.url : null;
			}
			if( url.startsWith("/embed/") ){
				 return "crawler:tv/NettvPro.js?[PATH="+encodeURIComponent(url)+"]";
			}
			return null;
		}
	},
	"MediaSource":{
		getUrl(macro) {
			var path = macro.get("PATH");
			if( !path )
			    return null;
			 if( path.startsWith("/embed/") ){
				 var v = utils.httpGetRespHeaders("http://www.nettvpro.xyz"+path,null,0x420);
				 var url = v ? v.Location || v.location : null;
				// print("url = "+url);
				 if( !url )
				     return null;
				 if( url.startsWith("/player/") ){
				      var params = parseUrlParams(url);
				     return params ? params.url : null;
			    }        
				 return  url;
			 }   
		}
	}
	
}