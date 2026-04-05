
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
XMLHttpRequest.prototype.open = function(method,url,asynchronous){
       // console.trace("XMLHttpRequest.open(%s %s)",method,url);
	   console.log("XMLHttpRequest.open(%s %s)",method,url);
        window.XMLHttpRequest_open.apply(this,arguments);
}