
/*
scp -O  /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/webview/xiaohongshu/Xiaohongshu-inject.js router:/www/tv/plugins/webview/xiaohongshu/  

 
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

console.log("注入脚本 Xiaohongshu-inject.js。。。");
var _CrawledResult = null;

window.XMLHttpRequest_open = XMLHttpRequest.prototype.open;
console.log("window.XMLHttpRequest_open = %s",window.XMLHttpRequest_open);
XMLHttpRequest.prototype.open = function(method,url,asynchronous){
       // console.trace("XMLHttpRequest.open(%s %s)",method,url);
	   if( url.indexOf("/api/sns/red/live/web/feed/v1/squarefeed")>0 ){
	      console.log("[Xisohongshu-inject.js]XMLHttpRequest.open(%s %s %s)",method,url,asynchronous);
		  this.addEventListener("readystatechange",()=>{
			  if( this.readyState==4 ){
				   if( this.status>=200 && this.status<300 ){
					_CrawledResult = this.responseText;
				   } else {
					_CrawledResult = "error:HTTP返回状态码="+this.status;
				   }
				   _AndroidNativeAPI.exec("notifyAllEvalJSWaitingValue",1);			   
			  } //this.readyState
		  })
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