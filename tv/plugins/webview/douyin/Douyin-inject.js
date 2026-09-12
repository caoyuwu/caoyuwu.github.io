/*
  scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/webview/douyin/Douyin-inject.js router:/www/tv/plugins/webview/douyin/
  
  https://live.douyin.com/categorynew/
  http://router.lan/tv/plugins/webview/douyin/Douyin-inject.js
  
  var head = document.getElementsByTagName("head")[0];
      var s = document.createElement("script");s.type = "text/javascript";
      s.async = false;
	  //s.src="http://router.lan/tv/plugins/webview/douyin/Douyin-inject.js";
	  s.src="https://caoyuwu.eu.org/tv/plugins/webview/douyin/Douyin-inject.js";
       head.appendChild(s);
   
*/
//const PageCount = 15;
/*
getLiveRoomDetail("4_101",0)
*/
function getLiveRoomDetail(path,offset,count){
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
			"browser_platform":"Win32",//navigator.platform,// "Win32",
			"browser_name":"Chrome",//navigator.appCodeName,//"Chrome",
			"browser_version":"120.0.0.0",// navigator.appVersion,//"114.0.0.0",
			"count":count||15,//PageCount,
			"offset": offset||0,//(page||0)*PageCount,
			// partition=2707&partition_type=2&
			"partition":partition,
			"partition_type":partition_type,
			"req_from":2
		};
	var url = appendUrlParams("https://live.douyin.com/webcast/web/partition/detail/room/v2",queryParams);
	console.log("url=%s",url);
	return httpGetAsString(url);
	//window.url = url;
}
/*

follow==true: 关注的直播
   https://www.douyin.com/webcast/web/feed/follow/
   ?https://live.douyin.com/webcast/feed/follow_top/
否则： 
    https://live.douyin.com/webcast/feed/
*/
function getLiveRoomFeed(follow){
	//var url = ;

	queryParams = {
		aid : 6383 ,
		app_name : "douyin_web" ,
		live_id : 1 ,
		device_platform : "web" ,
		language : navigator.language,//"zh" ,
		enter_from : "link_share" ,
		cookie_enabled : navigator.cookieEnabled ,// true ,
		screen_width : window.screen && window.screen.width,//1440 ,
		screen_height : window.screen && window.screen.height ,//900 ,
		browser_language : navigator.language ,//"zh" ,
		browser_platform :"Win32",// "MacIntel" ,
		browser_name : "Chrome" ,
		browser_version : "120.0.0.0",//"153.0.0.0" ,
		os_name : "Android",//"Mac OS" ,
		os_version : "11",//"10.15.7" ,
		enter_source : "homepage_pc_followtop" ,
		need_pinned_info : 0 ,
		follow_session_id : 0 ,
		source_key : "web_homepage_follow_top" ,
		webcast_version_code : 170400 ,
		version_code : 170400 ,
		need_map : 1 ,
	}
	// source_key : "web_homepage_follow_top" ,
	// webcast_version_code : 170400 ,
	//version_code : 170400 ,
	//	need_map : 1 ,
	var url = appendUrlParams(
		              // follow?"https://live.douyin.com/webcast/web/feed/follow/"
				     follow ? "https://live.douyin.com/webcast/feed/follow_top/"
						        : "https://live.douyin.com/webcast/feed/",
		               queryParams
	                      );
	console.log("url=%s",url);
	return httpGetAsString(url);
}


