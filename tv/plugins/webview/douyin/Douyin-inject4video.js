/*
scp -O  /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/webview/douyin/Douyin-inject4video.js router:/www/tv/plugins/webview/douyin/
var head = document.getElementsByTagName("head")[0];
      var s = document.createElement("script");s.type = "text/javascript";
      s.async = false;
	  //s.src="http://router.lan/tv/plugins/webview/douyin/Douyin-inject.js";
	  s.src="https://caoyuwu.eu.org/tv/plugins/webview/douyin/Douyin-inject4video.js";
       head.appendChild(s);
	   
*/

function getVideoFeed(count){
	var queryParams = {
	device_platform : "webapp" ,
	aid : 6383 ,
	channel : "channel_pc_web" ,
	module_id : 3003101 ,
	count : count||20 ,
	filterGids : "" ,
	presented_ids : "" ,
	refresh_index : 1 ,
	refer_id : "" ,
	refer_type : 10 ,
	pull_type : 2 ,
	awemePcRecRawData : "{\"is_xigua_user\":0,\"danmaku_switch_status\":0,\"is_client\":false}" ,
	"Seo-Flag" : 0 ,
	install_time : 1744763801 ,
	tag_id : "" ,
	active_id : "" ,
	is_active_tab : false ,
	use_lite_type : 0 ,
	xigua_user : 0 ,
	pc_client_type : 1 ,
	pc_libra_divert : "Mac" ,
	update_version_code : 170400 ,
	support_h265 : 1 ,
	support_dash : 1 ,
	version_code : 170400 ,
	version_name : "17.4.0" ,
	cookie_enabled : true ,
	screen_width : window.screen && window.screen.width ,
	screen_height : window.screen && window.screen.height  ,
	browser_language : navigator.language ,
	browser_platform : "Win32",//"MacIntel" ,
	browser_name : "Chrome" ,
	browser_version : "120.0.0.0" ,
	browser_online : true ,
	engine_name : "Blink" ,
	engine_version : "120.0.0.0" ,
	os_name : "Win32",//"Mac OS" ,
	os_version : "10.15.7" ,
	cpu_core_num : 4 ,
	device_memory : 8 ,
	platform : "PC" ,
	downlink : 10 ,
	effective_type : "4g" ,
	round_trip_time : 50 ,
	//webid : "7493703403332552243" ,
	//uifid : "e4c262a6b5e3b5badbd561631828ceb96cf9bda1502c8aff5f66458d92ccf6f396ad9c373f461029437462a9a776966fdb64dac320166d6f84dab9560b997e7862e2c24aac394d7de7c9a9c1645d6a7a5ba1088ce79ac2313cb7f2b11b56afd7532141a85ab199304164b2abed3fe222f7413899b2545649a16ef2fadd0020393483b3e70e9e276ef009284201309a7722cebae9ef8074531b3f3489105455f1eea33d6911f87b50892030a631a629256eae99f28a16b3a0bb028620dac7d66c" ,
	//verifyFp : "verify_mlxp0l9q_LYAOWOqC_T4EW_4Try_9mDJ_B96bKmJ1fKDz" ,
	//fp : "verify_mlxp0l9q_LYAOWOqC_T4EW_4Try_9mDJ_B96bKmJ1fKDz" 
	};
	return httpPostFormAsString("https://www.douyin.com/aweme/v2/web/module/feed/",null,queryParams);
}