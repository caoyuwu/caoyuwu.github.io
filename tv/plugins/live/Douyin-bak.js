function loadMenus_v1(url,params){
	initCookies();
	var path = utils.getUrlHostAndPath(url);
	var page = params ? params._pgIdx || 0 : 0;
	var p = path.indexOf("/");
	if( p>0 ){
		page = parseInt(path.substring(p+1));
		path =  path.substring(0,p);
	}
	var pathA = path.split("_");
	var partition = pathA[pathA.length-1];
	var partition_type = pathA[pathA.length-2];
	var headers = {
		"Accept": "lication/json, text/plain, */*",
		"Referer": "https://live.douyin.com/categorynew/"+path
	};
	var queryParams = {
		"aid":6383,
		"app_name":"douyin_web",
		"live_id":1,
		"device_platform":"web",
		"language":"zh",
		"cookie_enabled":"true",
		"screen_width":"1536",
		"screen_height":"864",
		"browser_language":"zh",
		"browser_platform":"Win32",
		"browser_name":"Chrome",
		"browser_version":"114.0.0.0",
		"count":PageCount,
		"offset":page*PageCount,
		// partition=2707&partition_type=2&
		"partition":partition,
		"partition_type":partition_type,
		"req_from":2
	};
	var url = utils.appendUrlParameters("https://live.douyin.com/webcast/web/partition/detail/room/v2", queryParams);
	var text =  utils.httpGetAsString(url,headers,0x400);
//print("text="+text);
    return parseMenus(text);
}