/*
  https://live.douyin.com/56101854482 
    => douyinlive://56101854482
  参考：
   https://www.jianshu.com/p/43c10df00be3  
 签名：
  __ac_signature 根据   __ac_nonce 签名 获得
  算法在：
   https://lf3-cdn-tos.bytescm.com/obj/rc-web-sdk/acrawler.js
   
  v = JSON.parse(decodeURIComponent(document.getElementById("RENDER_DATA").text))
*/

var lastInitCookiesTime = 0;
function initCookies(){
	  if( lastInitCookiesTime>utils.getLastUpdateConfigPreferenceTime() ){
	  	return;
	  }
	  
	  //utils.addHttpCookiesFromConfig("https://live.douyin.com","Douyin.Cookie.");
	  utils.addHttpCookiesFromConfig("https://douyin.com","Douyin.Cookie.");
	  lastInitCookiesTime = utils.currentTime();
	}

function prepareMediaSource(url,params){
	initCookies();
	//<script id="RENDER_DATA" type="application/json">
	var p = url.indexOf(":");
	var mid = utils.getUrlHostAndPath(url);
	switch( url.substring(0,p) ){
		case "douyinlive": return prepareLiveMediaSource(mid);
		case "douyinvideo":  return prepareVideoMediaSource(mid);
	}
}
	
function prepareLiveMediaSource(rid){	
	//var rid = utils.getUrlHostAndPath(url);
	var headers = {
		"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
//,"Cookie": "msToken=POvuHSkDcPSRm9e66TNPHiHtJfR-6i1viHdY9DOGKYFq6kv_Kkjt6IaukW1iEUXyF-3V9ez_Ag576Cjevb167Twfy0WTyEw_ruM4LbcUAeuJ_5Dt6ytcbEDn17wBRL0DWg==; __ac_nonce=06206091a006da43eddca; __ac_signature=_02B4Z6wo00f01uLcnxAAAIDDyVbE1FUN2vLi-JuAANq-TXDw.j8BQVGcF091wdAaWUKohB-.N5ttQzrfppKJuFabLOCtO4GFHqvog8YcRYu7bESl7JIMFAGct1UK0VuChsMBx7PSpMlH8nJsa7; __ac_referer=https://live.douyin.com/56101854482"
		//	,"Cookie": "__ac_nonce=06206091a006da43eddca; __ac_signature=_02B4Z6wo00f01uLcnxAAAIDDyVbE1FUN2vLi-JuAANq-TXDw.j8BQVGcF091wdAaWUKohB-.N5ttQzrfppKJuFabLOCtO4GFHqvog8YcRYu7bESl7JIMFAGct1UK0VuChsMBx7PSpMlH8nJsa7"
  //,"Cookie":"msToken=u6rhKZjafNCYcS38Jd7_jrV4GriEoIOFdSuOy0_3aMEq_ojzM6YVMSEkuTTn4Ohpaw1IpsXCfq9v3UtW8LfbZIE4H5578x16AVA0TyXPvzt6YvXVWv3GZA==; __ac_nonce=06206091a006da43eddca; __ac_signature=_02B4Z6wo00f01uLcnxAAAIDDyVbE1FUN2vLi-JuAANq-TXDw.j8BQVGcF091wdAaWUKohB-.N5ttQzrfppKJuFabLOCtO4GFHqvog8YcRYu7bESl7JIMFAGct1UK0VuChsMBx7PSpMlH8nJsa7; __ac_referer=https://live.douyin.com/56101854482"  		
		
	};
	var html = utils.httpGetAsString("https://live.douyin.com/"+rid,headers);
	//print(html);
	var jsPrefix = '<script id="RENDER_DATA" type="application/json">';
	var p1 = html.indexOf(jsPrefix);
	var p2 = p1<0 ? -1 : html.indexOf("</script>",p1+jsPrefix.length);
	if( p2<0 ){
		return null;
	}
//	print("p1="+p1+",p2="+p2);
	var text = decodeURIComponent(html.substring(p1+jsPrefix.length,p2));
//print(text);
	var retVal = JSON.parse(text);
	var room = retVal.app.initialState.roomStore.roomInfo.room;
	var urls = room && room.stream_url ? room.stream_url.flv_pull_url : null;
	return urls ? urls.FULL_HD1 || urls.HD1 || urls.SD1 || urls.SD2 
			: null
}

function prepareVideoMediaSource(vid){	
	var headers = {
		"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
//,"Cookie": "msToken=POvuHSkDcPSRm9e66TNPHiHtJfR-6i1viHdY9DOGKYFq6kv_Kkjt6IaukW1iEUXyF-3V9ez_Ag576Cjevb167Twfy0WTyEw_ruM4LbcUAeuJ_5Dt6ytcbEDn17wBRL0DWg==; __ac_nonce=06206091a006da43eddca; __ac_signature=_02B4Z6wo00f01uLcnxAAAIDDyVbE1FUN2vLi-JuAANq-TXDw.j8BQVGcF091wdAaWUKohB-.N5ttQzrfppKJuFabLOCtO4GFHqvog8YcRYu7bESl7JIMFAGct1UK0VuChsMBx7PSpMlH8nJsa7; __ac_referer=https://live.douyin.com/56101854482"
		//	,"Cookie": "__ac_nonce=06206091a006da43eddca; __ac_signature=_02B4Z6wo00f01uLcnxAAAIDDyVbE1FUN2vLi-JuAANq-TXDw.j8BQVGcF091wdAaWUKohB-.N5ttQzrfppKJuFabLOCtO4GFHqvog8YcRYu7bESl7JIMFAGct1UK0VuChsMBx7PSpMlH8nJsa7"
  //,"Cookie":"msToken=u6rhKZjafNCYcS38Jd7_jrV4GriEoIOFdSuOy0_3aMEq_ojzM6YVMSEkuTTn4Ohpaw1IpsXCfq9v3UtW8LfbZIE4H5578x16AVA0TyXPvzt6YvXVWv3GZA==; __ac_nonce=06206091a006da43eddca; __ac_signature=_02B4Z6wo00f01uLcnxAAAIDDyVbE1FUN2vLi-JuAANq-TXDw.j8BQVGcF091wdAaWUKohB-.N5ttQzrfppKJuFabLOCtO4GFHqvog8YcRYu7bESl7JIMFAGct1UK0VuChsMBx7PSpMlH8nJsa7; __ac_referer=https://live.douyin.com/56101854482"  		
		
	};
	var html = utils.httpGetAsString("https://www.douyin.com/video/"+vid,headers);
//print(html);
	var jsPrefix = '<script id="RENDER_DATA" type="application/json">';
	var p1 = html.indexOf(jsPrefix);
	var p2 = p1<0 ? -1 : html.indexOf("</script>",p1+jsPrefix.length);
	if( p2<0 ){
		return null;
	}
//	print("p1="+p1+",p2="+p2);
	var text = decodeURIComponent(html.substring(p1+jsPrefix.length,p2));
//print(text);
	var retVal = JSON.parse(text);
	//v["74931a6b75e09238f154ab1577c994c9"].aweme.detail.video.playAddr[0].src
	for( k in retVal){
		var v = retVal[k];
		if( v.aweme && v.aweme.detail &&  v.aweme.detail.video &&  v.aweme.detail.video.playAddr ){
			var url = v.aweme.detail.video.playAddr[0].src;
			if( url.startsWith("//") ){
				url = "https:"+url;
			}
			return url;
		}
	}
	//video.playAddr[0].srcl
}


/*
  douyinlive-list://3_10000_2_2707
  
  https://live.douyin.com/webcast/web/partition/detail/room/?
   aid=6383&app_name=douyin_web&live_id=1&device_platform=web
   &language=zh&cookie_enabled=true&screen_width=1280&screen_height=800
   &browser_language=zh&browser_platform=MacIntel&browser_name=Chrome
   &browser_version=114.0.0.0&count=15&offset=15&partition=10000
   &partition_type=3&req_from=2
   &msToken=-5EUeZFmeM7D1lveXCmO7nYAAegea_gGo14g98jQOGffdCbDIaKjWH-gMpQlLs09sRLAkAfJNuwXHY6lIbdxxgXC7Z0UuFpbvQg1TP5SuTQckibqOxtJRgT2jpRg9z2oyjA=
   &X-Bogus=DFSzsdVYAf2ANVaJtjUg9oA9e07X
   &_signature=_02B4Z6wo000011xf4CgAAIDBtPexuRUnKdNcW-SAALOvnVxKEh7EQKH3hEKhdq-xZxKnPXW89cAqiOkaNRcEH9KLGuKIEqA5Qg67WkTy3edyXKhHFpdHCPVKg8ihWtbqUTVhH0zVotlqXLp2bf
  
  
*/
function loadMenus(url,params){
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
		"Referer": "https://live.douyin.com/category/"+path
	};
	var PageCount = 50;
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
	var url = utils.appendUrlParameters("https://live.douyin.com/webcast/web/partition/detail/room", queryParams);
	var text =  utils.httpGetAsString(url,headers,0x400);
	//print(text);
	var retVal = JSON.parse(text);
	var vCh = [];
	if( (data=retVal.data) && (data=data.data)) {
		for(var j=0;j<data.length;j++){
		       if( !(room=data[j].room) )
		           continue;
		        var rid = data[j].web_rid;
		        vCh.push({title:toStr3(page*PageCount+j)+":"+room.title+"/"+room.owner.nickname+"/"+room.room_view_stats.display_short_anchor,
		        	url:"douyinlive://"+rid,
		        	//url:data[j].streamSrc,
		        	msgSocketArgs:[rid]});
		        // streamSrc
		       // var title = data[j].room.
		    }
	}
	return vCh;
}

function toStr3(x){
	s = "00"+x;
	return s.substring(s.length-3);
}

function loadMenus1(url,params){
	initCookies();
   var path = utils.getUrlHostAndPath(url);
   var headers = {
		"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
	};
	//var html = utils.httpGetAsString(path==""?"https://live.douyin.com":"https://live.douyin.com/category/"+path,headers);
	var html = utils.httpGetAsString("https://live.douyin.com/category/"+path,headers);
//print(html);
	var jsPrefix = '<script id="RENDER_DATA" type="application/json">';
	var p1 = html.indexOf(jsPrefix);
	var p2 = p1<0 ? -1 : html.indexOf("</script>",p1+jsPrefix.length);
	if( p2<0 ){
		return null;
	}
//	print("p1="+p1+",p2="+p2);
	var text = decodeURIComponent(html.substring(p1+jsPrefix.length,p2));
//print(text);
	var retVal = JSON.parse(text);
	var vCh = [];
	var roomsData , data ,room;
	for( k in retVal){
		var v = retVal[k];
		if( (roomsData=v.roomsData) && (data=roomsData.data) ){
		    //web_rid
		    for(var j=0;j<data.length;j++){
		       if( !(room=data[j].room) )
		           continue;
		        var rid = data[j].web_rid;
		        vCh.push({title:room.title+"/"+room.owner.nickname+"/"+room.room_view_stats.display_short_anchor,
		        	url:"douyinlive://"+rid,
		        	//url:data[j].streamSrc,
		        	msgSocketArgs:[rid]});
		        // streamSrc
		       // var title = data[j].room.
		    }
		}
	}
	/*
	vCh.push({title:xxx,url:"douyinlive://"+xxx});
	*/
	return vCh;
}

function startMessage(id,s){
	
}
