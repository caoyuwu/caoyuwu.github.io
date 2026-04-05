
/*
/opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/webview/xiaohongshu/Xiaohongshu-inject.js
var head = document.getElementsByTagName("head")[0];
      var s = document.createElement("script");s.type = "text/javascript";
      s.async = false;
	  s.src="https://caoyuwu.eu.org/tv/plugins/webview/xiaohongshu/Xiaohongshu-inject.js";
       head.appendChild(s);
	   
getLiveRoomList(0)   
*/
/*
function getLiveRoomList(category){
	var queryParams = {
			source: 13,
			category: category,
			pre_source :"",
			extra_info : "{\"image_formats\":[\"jpg\",\"webp\",\"avif\"]}",
			size: 27
		};
	var url = appendUrlParams("https://live-room.xiaohongshu.com/api/sns/red/live/web/feed/v1/squarefeed",queryParams);
	console.log("url=%s",url);
	return httpGetAsString(url);	
}
*/

window.XMLHttpRequest_open = XMLHttpRequest.prototype.open;
console.log("window.XMLHttpRequest_open = %s",window.XMLHttpRequest_open);
XMLHttpRequest.prototype.open = function(method,url,asynchronous){
       // console.trace("XMLHttpRequest.open(%s %s)",method,url);
	   if( url.indexOf("feed/v1/squarefeed")>0 ){
	      console.log("[Xisohongshu-inject.js]XMLHttpRequest.open(%s %s %s)",method,url,asynchronous);
	   }
        window.XMLHttpRequest_open.apply(this,arguments);
}

/*
window._fetch = window.fetch;
window.fetch = function(url){
	console.log("[Xisohongshu-inject.js]fetch(%s)",url);
	window._fetch.apply(this,arguments);
};
*/