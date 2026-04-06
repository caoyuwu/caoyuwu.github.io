/*
  scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/live/Xiaohongshu.js router:/www/tv/plugins/live/
*/

const PluginHost = "caoyuwu.eu.org";
//const PluginHost = "router.lan";

var webview;
var injectJS = null;
function loadMenus(url,params){
	/*
	https://live-room.xiaohongshu.com/api/sns/red/live/web/feed/v1/squarefeed?
	
	source 13
	category 0
	pre_source 
	extra_info	{"image_formats":["jpg","webp","avif"]}
	size 27
	
	*/
	var category = utils.getUrlHostAndPath(url);
	if( category=="*" || category=="") {
		return loadCatMenus();
	}
	/*
	var queryParams = {
		source: 13,
		category: category,
		pre_source :"",
		extra_info : "{\"image_formats\":[\"jpg\",\"webp\",\"avif\"]}",
		size: 27
	};
	var url = utils.appendUrlParameters("https://live-room.xiaohongshu.com/api/sns/red/live/web/feed/v1/squarefeed",queryParams);
	var headers = {
		Referer: "https://www.xiaohongshu.com/",
		Origin: "https://www.xiaohongshu.com",
		Cookie: "a1=19d58d281adwkncubhxjpar4hatssze57aukubgfi30000327050; webId=211f0637aa806a2838614d332bf560ea; customer-sso-sid=68c517624905833605038080iywbqkvqzsdufpgh; x-user-id-redlive.xiaohongshu.com=601ff72d000000000100a1ed; customerClientId=348994796721701; access-token-redlive.xiaohongshu.com=customer.red_live.AT-68c517624905833605005315jlczovnmn0aifirh; timeslogin=aa662c94-2aca-430f-b3dd-bf208cfd1cbf; gid=yjf2YfqDSyW0yjf2YfJYy0Dk0fETIS7DxCVU7i30F4x09Tq8MMud27888qJW8288JjK0SWq8; abRequestId=211f0637aa806a2838614d332bf560ea; ets=1775311937916; web_session=030037aee24837ab050f0f5aa92e4acfa3a0ec; unread={%22ub%22:%22644521bd000000001303e579%22%2C%22ue%22:%226479886e0000000027013989%22%2C%22uc%22:15}; acw_tc=0ad5928c17753119482756380e6a0cdc3b33471d723977cee4bfc47534d1a4; webBuild=6.4.1; xsecappid=xhs-pc-web; loadts=1775312069678; websectiga=a9bdcaed0af874f3a1431e94fbea410e8f738542fbb02df1e8e30c29ef3d91ac; sec_poison_id=62f60100-c7de-49d0-abb1-0f0f7b927bb3"
	}
	var json = utils.httpGetAsString(url,headers,0x400);
	print( json );
	*/
	if( !webview ) webview = utils.getWebView();
	/*
	*/
	//https://www.xiaohongshu.com/livelist?channel_id=3&channel_type=web_live_list
	webview.loadUrl("https://www.xiaohongshu.com/livelist?channel_id="+category+"&channel_type=web_live_list",
							    [
								//	"https://"+PluginHost+"/tv/plugins/webview/httprequest.js"
								//	,"https://"+PluginHost+"/tv/plugins/webview/xiaohongshu/Xiaohongshu-inject.js",
								 ],
								"win",1);
	 if( !injectJS ){
		var url = utils.toAbsoluteURL(_scriptURL,"../webview/xiaohongshu/Xiaohongshu-inject.js");
		//print("===url="+url);
		injectJS = utils.httpGetAsString(url,0);
		//print("===url="+injectJS);
	 }				
	 //webview.evalOnPageStarted(null,"console.log('注入脚本-执行到 evalOnPageStarted')",0,0);		
	 webview.evalOnPageStarted(null,injectJS,0,0);			
	
	 var text = webview.evalOnPageFinished("!!window._CrawledResult",
										    	//"httpGetAsString('/index.html',null,0)",
										    	"window._CrawledResult",
										    	60,
												1);		
		/*
		var matchs = {
				path: "/api/sns/red/live/web/feed/v1/squarefeed"
			}	;	
		*/
		if( text.startsWith("error:") ){
			throw text.substrinng(6);
		}	
	//	text = webview.listenHttpGetRequest(matchs,20,3);										
	//	print("text = "+text);	
		return parseMeuList(text);															
	 /*							
    
	var retVals = webview.listenHttpGetRequest(matchs,15,1);	
	print("retVals = "+JSON.stringify(retVals));	
	for(var name in retVals.headers ){
		print("Header "+name+" = "+retVals.headers[name]);
	}
	//var json = utils.httpGetAsString(retVals.url,retVals.headers,0);
	var json = utils.httpGetAsString(retVals.url,retVals.headers,0x400);	
	print("json = "+json);			
	*/	
	//listenHttpGetRequest(java.util.Map<String,String> matchs,int timeout,int opts)
}

function parseMeuList(text){
	var items = [];
	var retVal = JSON.parse(text);
	for(var feed of retVal.data.feeds){
		var live;
		if( feed.type!='live' || !(live=feed.live)  || !live.room_extra_info) continue;
		var roomId =  live.t_room_info.room_id_str;
		var userId = live.t_live_host_info.user_id;
		var tit =   live.t_live_host_info.nickname +"-"+live.t_room_info.name;
		var room_extra_info = JSON.parse(live.room_extra_info); 
		var live_stream_info = JSON.parse(room_extra_info.live_stream_info);
		//print(tit+" : "+room_extra_info.live_stream_info); 
		var urls = [];
		if(live_stream_info.streams) for(var s of live_stream_info.streams){
			urls.push({title:s.quality_type_name,url:s.master_url});
		}
		items .push({ title: tit, urls: urls, msgSocketArgs:[roomId+"/"+userId]});
	} // for retVal.data.feeds
	return items;
}

function loadCatMenus(){
	return [
		{ title :"全部", items: "jsmenu:live/Xiaohongshu.js!0" },
		{ title :"游戏", items: "jsmenu:live/Xiaohongshu.js!1" },
		{ title :"才艺颜值", items: "jsmenu:live/Xiaohongshu.js!2" },
		{ title :"生活分享", items: "jsmenu:live/Xiaohongshu.js!3" },
		{ title :"兴趣手工", items: "jsmenu:live/Xiaohongshu.js!4" },
		{ title :"科技财经", items: "jsmenu:live/Xiaohongshu.js!5" },
		{ title :"运动户外", items: "jsmenu:live/Xiaohongshu.js!6" }
	];
}