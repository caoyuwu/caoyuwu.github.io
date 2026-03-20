/*
  scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/webview/douyin/Douyin-inject.js router:/www/tv/plugins/webview/douyin/
  
  http://router.lan/tv/plugins/webview/douyin/Douyin-inject.js
  
  var head = document.getElementsByTagName("head")[0];
      var s = document.createElement("script");s.type = "text/javascript";
      s.async = false;s.src="http://router.lan/tv/plugins/webview/douyin/Douyin-inject.js";
       head.appendChild(s);
   
*/
const PageCount = 15;
/*
  
*/
function getLiveRoomDetail(path,page){
	var p = path.indexOf("/");
		if( p>0 ){
			page = parseInt(path.substring(p+1));
			path =  path.substring(0,p);
		}
		var pathA = path.split("_");
		var partition = pathA[pathA.length-1];
		var partition_type = pathA[pathA.length-2];
		
	var queryParams = {
			"aid":6383,
			"app_name":"douyin_web",
			"live_id":1,
			"device_platform":"web",
			"language":navigator.language,//"zh",
			"cookie_enabled":navigator.cookieEnabled,
			"screen_width": window.screen && window.screen.width,
	        "screen_height": window.screen && window.screen.height,
			"browser_language":navigator.language,//"zh",
			"browser_platform":navigator.platform,// "Win32",
			"browser_name":navigator.appCodeName,//"Chrome",
			"browser_version":navigator.appVersion,//"114.0.0.0",
			"count":PageCount,
			"offset":page*PageCount,
			// partition=2707&partition_type=2&
			"partition":partition,
			"partition_type":partition_type,
			"req_from":2
		};
	var url = "https://live.douyin.com/webcast/web/partition/detail/room/v2";
	var join = "?";
	for(var name in queryParams){
		url += join+name+"="+window.encodeURIComponent(queryParams[name]);
		join = "&";
	}	
	console.log("url=%s",url);
	
	
	
}