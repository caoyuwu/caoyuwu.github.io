/*
  scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/live/Douyin.js router:/www/tv/plugins/live/
  https://live.douyin.com/208823316033    // CCTV-6
    => douyinlive://208823316033
    douyinlive:746495143885 // 嘉佳
  参考：
   https://www.jianshu.com/p/43c10df00be3  
   https://gitee.com/fitworks/real-url/blob/master/douyin.py
 签名：
  __ac_signature 根据   __ac_nonce 签名 获得
  算法在：
   https://lf3-cdn-tos.bytescm.com/obj/rc-web-sdk/acrawler.js
   
  v = JSON.parse(decodeURIComponent(document.getElementById("RENDER_DATA").text))
*/

//var lastInitCookiesTime = 0;
var lastInitCookiesTime = 0;
function initCookies(){
	//print("lastInitCookiesTime="+lastInitCookiesTime);
	if( lastInitCookiesTime!=0 ){
		return;
	}
	utils.addHttpCookiesFromCfgFile("https://douyin.com","configs/Douyin-Cookies.txt");
	lastInitCookiesTime = utils.currentTime();
	  /*
	  if( lastInitCookiesTime>utils.getLastUpdateConfigPreferenceTime() ){
	  	return;
	  }
	  
	  //utils.addHttpCookiesFromConfig("https://live.douyin.com","Douyin.Cookie.");
	  utils.addHttpCookiesFromConfig("https://douyin.com","Douyin.Cookie.");
	  lastInitCookiesTime = utils.currentTime();
	  */
}

function prepareMediaSource(url,params){
	initCookies();
	//<script id="RENDER_DATA" type="application/json">
	//var p = url.indexOf(":");
	var mid = utils.getUrlHostAndPath(url);
	var p = mid.indexOf("/");
	if( p<0 ) return;
	var type = mid.substring(0,p);
	  mid = mid.substring(p+1);
	switch( type ){
		case "live": return prepareLiveMediaSource(mid,false);
		case "video":  return prepareVideoMediaSource(mid);
	}
}
	
function prepareLiveMediaSource(rid,forUrls){	
	initCookies();
	//var rid = utils.getUrlHostAndPath(url);
	var headers = {
		"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
//,"Cookie": "msToken=POvuHSkDcPSRm9e66TNPHiHtJfR-6i1viHdY9DOGKYFq6kv_Kkjt6IaukW1iEUXyF-3V9ez_Ag576Cjevb167Twfy0WTyEw_ruM4LbcUAeuJ_5Dt6ytcbEDn17wBRL0DWg==; __ac_nonce=06206091a006da43eddca; __ac_signature=_02B4Z6wo00f01uLcnxAAAIDDyVbE1FUN2vLi-JuAANq-TXDw.j8BQVGcF091wdAaWUKohB-.N5ttQzrfppKJuFabLOCtO4GFHqvog8YcRYu7bESl7JIMFAGct1UK0VuChsMBx7PSpMlH8nJsa7; __ac_referer=https://live.douyin.com/56101854482"
		//	,"Cookie": "__ac_nonce=06206091a006da43eddca; __ac_signature=_02B4Z6wo00f01uLcnxAAAIDDyVbE1FUN2vLi-JuAANq-TXDw.j8BQVGcF091wdAaWUKohB-.N5ttQzrfppKJuFabLOCtO4GFHqvog8YcRYu7bESl7JIMFAGct1UK0VuChsMBx7PSpMlH8nJsa7"
  //,"Cookie":"msToken=u6rhKZjafNCYcS38Jd7_jrV4GriEoIOFdSuOy0_3aMEq_ojzM6YVMSEkuTTn4Ohpaw1IpsXCfq9v3UtW8LfbZIE4H5578x16AVA0TyXPvzt6YvXVWv3GZA==; __ac_nonce=06206091a006da43eddca; __ac_signature=_02B4Z6wo00f01uLcnxAAAIDDyVbE1FUN2vLi-JuAANq-TXDw.j8BQVGcF091wdAaWUKohB-.N5ttQzrfppKJuFabLOCtO4GFHqvog8YcRYu7bESl7JIMFAGct1UK0VuChsMBx7PSpMlH8nJsa7; __ac_referer=https://live.douyin.com/56101854482"  		
		
	};
	var html = utils.httpGetAsString("https://live.douyin.com/"+rid,headers);

//print(html);

    var jsPrefix = ',\\"stream_url\\":{\\"flv_pull_url\\":{';
    var p1 = html.indexOf(jsPrefix);
    var p2 = p1<0 ? -1 : html.indexOf("}",p1+jsPrefix.length);
    if( p2<0 ){
		return null;
	}
	var text = html.substring(p1+jsPrefix.length-1,p2+1);
	if( text.replaceAll ){
		text = text.replaceAll('\\"','"');
	} else
	{
		text = utils.stringReplaceAll(text,'\\"','"');
	}
	var urlsm = JSON.parse(text);
	if( forUrls ){
		return toUrls(rid,urlsm,0);
	}
	return  urlsm.FULL_HD1 || urlsm.HD1 || urlsm.SD1 || urlsm.SD2 ;
	
}

/*
 
*/
function prepareVideoMediaSource(vid){	
	var headers = {
		"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
//,"Cookie": "msToken=POvuHSkDcPSRm9e66TNPHiHtJfR-6i1viHdY9DOGKYFq6kv_Kkjt6IaukW1iEUXyF-3V9ez_Ag576Cjevb167Twfy0WTyEw_ruM4LbcUAeuJ_5Dt6ytcbEDn17wBRL0DWg==; __ac_nonce=06206091a006da43eddca; __ac_signature=_02B4Z6wo00f01uLcnxAAAIDDyVbE1FUN2vLi-JuAANq-TXDw.j8BQVGcF091wdAaWUKohB-.N5ttQzrfppKJuFabLOCtO4GFHqvog8YcRYu7bESl7JIMFAGct1UK0VuChsMBx7PSpMlH8nJsa7; __ac_referer=https://live.douyin.com/56101854482"
		//	,"Cookie": "__ac_nonce=06206091a006da43eddca; __ac_signature=_02B4Z6wo00f01uLcnxAAAIDDyVbE1FUN2vLi-JuAANq-TXDw.j8BQVGcF091wdAaWUKohB-.N5ttQzrfppKJuFabLOCtO4GFHqvog8YcRYu7bESl7JIMFAGct1UK0VuChsMBx7PSpMlH8nJsa7"
  //,"Cookie":"msToken=u6rhKZjafNCYcS38Jd7_jrV4GriEoIOFdSuOy0_3aMEq_ojzM6YVMSEkuTTn4Ohpaw1IpsXCfq9v3UtW8LfbZIE4H5578x16AVA0TyXPvzt6YvXVWv3GZA==; __ac_nonce=06206091a006da43eddca; __ac_signature=_02B4Z6wo00f01uLcnxAAAIDDyVbE1FUN2vLi-JuAANq-TXDw.j8BQVGcF091wdAaWUKohB-.N5ttQzrfppKJuFabLOCtO4GFHqvog8YcRYu7bESl7JIMFAGct1UK0VuChsMBx7PSpMlH8nJsa7; __ac_referer=https://live.douyin.com/56101854482"  		
		
	};
	var html = utils.httpGetAsString("https://www.douyin.com/video/"+vid,headers);
print(html);
	var jsPrefix = '<script id="RENDER_DATA" type="application/json">';
	var p1 = html.indexOf(jsPrefix);
	var p2 = p1<0 ? -1 : html.indexOf("</script>",p1+jsPrefix.length);
	print("p1="+p1+",p2="+p2);
	if( p2<0 ){
		return null;
	}
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

function loadUrls(url,params){
	var mid = utils.getUrlHostAndPath(url);
	var p = mid.indexOf("/");
		if( p<0 ) return;
		var type = mid.substring(0,p);
		  mid = mid.substring(p+1);
	switch( type ) {
	   case "live":	return prepareLiveMediaSource(mid,true);
	}
}

/*
  douyinlive-list://3_10000_2_2707
  
  https://live.douyin.com/webcast/web/partition/detail/room/v2/?
   aid=6383
   &app_name=douyin_web
   &live_id=1
   &device_platform=web
   &language=zh
   &cookie_enabled=true
   &screen_width=1440
   &screen_height=900
   &browser_language=zh
   &browser_platform=MacIntel
   &browser_name=Chrome
   &browser_version=145.0.0.0
   &count=15&offset=15
   &partition=102
   &partition_type=4
   &req_from=2
   &msToken=-czmNJSFxtPJijmw2AWpMfFkr8d8053ZCgRWaKcnwlGYg5TC84druHA7kpP5M34HAbOkAu8rwsUK-T8DvTXYOLjTacNNgckOr0YeZRMvthkU0oINEnbc3J7U9UJJ2udkLc1mGtc9NfH5wI4IMdJG5j15xx4Mai8SRE3xUt5_WIoiIxtnKttawQI%3D&a_bogus=E74jkF6EOxRbcdFbYKb595PU36xANsuyDNTQbJFueNKMPwFbpYPQTcCMGxqPQWLVNWBhkC17GnMlYExc8dXs11npFmpDSzU6wU5Vn8sL%2FqwVaz4mDNf8CgDFKwsGl5vwa%2F9VEADRAsB76xVAIq5OlQBG95To-mmpWHZWdZz9eEWhfA8kio3hOChkELrr0b97
   msToken:
   https://blog.csdn.net/weixin_29323049/article/details/158596025
  
  items:"@douyin-list:3_10000"  // partition_type_partition
  
*/
const PluginHost = "caoyuwu.eu.org";
//const PluginHost = "router.lan";
const PageCount = 20;
const VideoPageCount = 20;
var webview;
function loadMenus(url,params){
	var path = utils.getUrlHostAndPath(url);
	if( path=="" || path=="*" ) {
		return loadMenus1();
	}
	var p = path.indexOf("/");
	if( p<0 ) return;
	var type = path.substring(0,p);
	  path = path.substring(p+1);
	  if( !webview ) webview = utils.getWebView();
	if( type=="video" ){
		  // 视频：
		   webview.loadUrl("https://www.douyin.com/aisearch",
						  // 好像 https 页面不能注入 http 脚本， 所以使用 caoyuwu.eu.org
						    ["https:///"+PluginHost+"/tv/plugins/webview/httprequest.js",
							  "https:///"+PluginHost+"/tv/plugins/webview/douyin/Douyin-inject4video.js"],
							"win",1);
			var text = webview.evalOnPageFinished("!!window.httpGetAsString && !!window.getVideoFeed",
								    	//"httpGetAsString('/index.html',null,0)",
								    	"getVideoFeed("+VideoPageCount+")",
								    	10,
										1);	
		 //  print("text="+text);								
			return parseVideoMenus4Feed(text);							
	 } // for 
	 // 直播：douyinvideo-list
//print("[loadMenus] url="+url+",");
	if( path=="~" || path=="follow" ){
		var forFollow = path=="follow";
		webview.loadUrl("https://live.douyin.com/categorynew/",
				  // 好像 https 页面不能注入 http 脚本， 所以使用 caoyuwu.eu.org
				    ["https:///"+PluginHost+"/tv/plugins/webview/httprequest.js",
					  "https:///"+PluginHost+"/tv/plugins/webview/douyin/Douyin-inject.js"],
					"win",1);
		var text = webview.evalOnPageFinished("!!window.httpGetAsString && !!window.getLiveRoomFeed",
						    	//"httpGetAsString('/index.html',null,0)",
						    	"getLiveRoomFeed("+forFollow+")",
						    	10,
								1);		
	//print("text="+text);		
		return forFollow ? parseMenus(text,-1)  : parseMenus4Feed(text);	
	}
	var page = params ? params._pgIdx || 0 : 0;
//	   print("webview = "+webview);
	   //webview.setUserAgent("win");
	   webview.loadUrl("https://live.douyin.com/categorynew/",
		  // 好像 https 页面不能注入 http 脚本， 所以使用 caoyuwu.eu.org
		    ["https://"+PluginHost+"/tv/plugins/webview/httprequest.js",
			  "https:///"+PluginHost+"/tv/plugins/webview/douyin/Douyin-inject.js"],
			"win",1);
			var text = webview.evalOnPageFinished("!!window.httpGetAsString && !!window.getLiveRoomDetail",
			    	//"httpGetAsString('/index.html',null,0)",
			    	"getLiveRoomDetail('"+path+"',"+(page*PageCount)+","+PageCount+")",
			    	10,
					1);		
		//print("text="+text);
		    return parseMenus(text,page); 	
}

/*
  分类的直播
*/
function parseMenus(text,page){
	var retVal = JSON.parse(text);
	var vCh = [];
	if( (data=retVal.data) && (data=data.data)) {
		for(var j=0;j<data.length;j++){
		       if( !(room=data[j].room) )
		           continue;
		        var rid = data[j].web_rid;
		        var roomId = room.id_str;
				var urlsm = room.stream_url ? room.stream_url.hls_pull_url_map || room.stream_url.flv_pull_url : null;
				//var urls = toUrls(rid,urlsm,1);
		        vCh.push({title : (page>=0 ? toStr3(page*PageCount+j+1)+":" : "")
					       +room.owner.nickname+"/"+room.title+"("+room.room_view_stats.display_short_anchor+")",
		        	urls: toUrls(rid,urlsm,1),
					//url:"douyinlive://"+rid,
		        	//url:data[j].streamSrc,
		        	msgSocketArgs:[rid,roomId]});
		        // streamSrc
		       // var title = data[j].room.
		    }
	}
	return vCh;
}

/*
  未分类（全部—） 直播
*/
function parseMenus4Feed(text) {
	var retVal = JSON.parse(text);
		var vCh = [];
	if( retVal.data) for(var data1 of  retVal.data){
		var room = data1.data;
		var roomId = room.id_str;
	//	var owner = room.owner;
		var rid = data1.web_rid;  // room.owner.web_rid
		var title = room.owner.nickname+"/"+room.title+"("+room.room_view_stats.display_short_anchor+")";
		var urlsm = room.stream_url ? room.stream_url.hls_pull_url_map || room.stream_url.flv_pull_url : null;
		vCh.push({title:title,urls:toUrls(rid,urlsm,1),msgSocketArgs:[rid,roomId]});
		// data[?] -> data -> room_view_stats -> display_short_anchor  
		// data[19] -> data -> stream_url -> hls_pull_url_map  =
	}	
	return vCh;	
}

/*
  视频
*/
function parseVideoMenus4Feed(text) {
	var retVal = JSON.parse(text);
	var vCh = [];
	/*
	aweme_list[5] -> author -> nickname  = "知危"
	*/
	if( retVal.aweme_list )  for(var item of retVal.aweme_list ){
		var video;
		if( !(video=item.video) ) conntiue;
		var nickname = item.author ? item.author.nickname : null;
		var title = item.preview_title;
		/*
		aweme_list[7] -> video -> play_addr_265 -> url_list 
		video -> play_addr_h264
		*/
		var play_addr = video.play_addr_265 
					  || video.play_addr_h264 ;
		if( !play_addr && video.bit_rate ) for( var bitr of video.bit_rate ){
			if( bitr.play_addr ) {
				play_addr = bitr.play_addr; break;
			}
		}		
		if( !play_addr || !play_addr.url_list ) return;
		vCh.push({
			urls : play_addr.url_list,
			title : title+"/"+nickname,
			header : { Referer: "https://www.douyin.com/jingxuan"}
		});
	}
	return vCh;			
}

/*
opts#1 : douyinlive:xxxx 优先于网页
*/
function toUrls(rid,urlsm,opts){
	//if( urlsm.FULL_HD1 ) urls.push("FULL_HD1|"+urlsm.FULL_HD1);
	var urls = [];
	if(urls) for(var name in urlsm) {
		//{urls.push(name+"|"+urlsm[name])};
		urls.push({title:name,url:urlsm[name]});
	}
	if( urls.length==0 && (opts&1) ){
		urls.push("douyin:live/"+rid);
	}
	urls.push({title:"网页-",url:"win-browser-https://live.douyin.com/"+rid});	
	if( urls.length==0 && !(opts&1) ){
			urls.push("douyin:live/"+rid);
	}
	return urls;
}

function loadMenus1(){
	return 	[
			    {label:"我的关注",items:"@douyin-list:live/follow"},		   
				 {label:"首页",items:"@douyin-list:live/~"},	   
			    {label:"聊天",items:"@douyin-list:live/4_101",countSubMenuPages:5},
	   		    {label:"音乐",items:"@douyin-list:live/4_102",countSubMenuPages:5},
				{label:"游戏",items:"@douyin-list:live/4_103",countSubMenuPages:5},
				{label:"二次元",items:"@douyin-list:live/4_104",countSubMenuPages:5},
				{label:"舞蹈",items:"@douyin-list:live/4_105",countSubMenuPages:5},
				{label:"文化",items:"@douyin-list:live/4_106",countSubMenuPages:5},
				{label:"生活",items:"@douyin-list:live/4_107",countSubMenuPages:5},
				{label:"运动",items:"@douyin-list:live/4_108",countSubMenuPages:5},
				{label:"视频",items:"@douyin-list:video/*"},
				{label:"收藏",items: [//"tag:抖音直播收藏"
					   {label:"央视网快看",url:"douyin:live/127453393722",tag:"抖音直播收藏"},
					   {label:"CCTV13",url:"douyin:live/282773369501",tag:"抖音直播收藏"},
					    {label:"央视频",url:"douyin:live/50828500437",tag:"抖音直播收藏"},
					   {label:"2024",url:"douyin:live/524048578993",tag:"抖音直播收藏"},
					   {label:"CCTV4",url:"douyin:live/166806983360",tag:"抖音直播收藏"}
	      		  ]}
		];
}

function toStr3(x){
	s = "00"+x;
	return s.substring(s.length-3);
}


function startMessage(id,s){
	
}
