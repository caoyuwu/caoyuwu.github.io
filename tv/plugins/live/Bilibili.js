
/*
scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/live/Bilibili.js router:/www/tv/plugins/live/
https://live.bilibili.com/XXXXX => blive://XXXXX
铁齿铜牙纪晓岚,blive://6694373
【林正英】僵尸 经典 女鬼 24H,blive://70155
 */
//var JS_CodecNMPATH =   ["roomInitRes","data","playurl_info","playurl","stream",0,"format",0,"codec",0];
//var JS_CodecHostNMPATH =   ["url_info",0,"host"];
//var JS_CodecExtraNMPATH =   ["url_info",0,"extra"];
function prepareMediaSource(url,params){
	var urls = loadUrls(url,params);
	return urls ?  urls[0] : null;
}
function loadUrls(url,params){
	var liveId = utils.getUrlHostAndPath(url);//"" +
	//	print("liveId = "+liveId);	
		var headers = {Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"};
	  	var html = utils.httpGetAsString("https://live.bilibili.com/"+liveId,headers);
	  	  //  https://live.bilibili.com/6694373
	  	var JSPrefix = "<script>window.__NEPTUNE_IS_MY_WAIFU__=";
	  	var p1 = html.indexOf(JSPrefix);
	  	var p2 = p1<0 ? -1 : html.indexOf("</script>",p1+JSPrefix.length);
	   	if( p2<0 )
	            return null;
	    var jsText = html.substring(p1+JSPrefix.length,p2);
	 //  print(jsText);
	     return parseUrlFromJSText(jsText);
}

/*
  三种格式：
  http_stream-flv-avc
  http_hls-ts-avc
  http_hls-fmp4-avc
*/
function parseUrlFromJSText( jsText) {
    var jsVal = JSON.parse(jsText);
    //"roomInitRes","data","playurl_info","playurl","stream",0,"format",0,"codec",0]
	// protocol_name
	var items = [];
	for( stream of jsVal.roomInitRes.data.playurl_info.playurl.stream){
		for( format of stream. format){
			for( codec of  format.codec){
				var base_url = codec.base_url;
				        var host = codec.url_info[0].host;
				        //(String)MapUtils.getElement(codec, JS_CodecHostNMPATH);
				        var extra = codec.url_info[0].extra;
				        //(String)MapUtils.getElement(codec, JS_CodecExtraNMPATH);
				        if( host==null || base_url==null )
				            return null;
				     items.push({
						 title :stream.protocol_name+"-"+format.format_name+"-"+codec.codec_name, 
						 url: host+base_url+(extra==null?"":extra),
						 format_name : format.format_name  // ts, flv,fmp4
						// protocol_name": "http_hls",
						 });
			}
		}
	}
	items.sort( (i1,i2)=>_format_name_ord(i1.format_name)-_format_name_ord(i2.format_name) );
	return items;
	/*
			format[0].format_name:  "flv",
			codec[0] codec_name
			*/		
	    //(java.util.Map<String,Object>) MapUtils.getElement(jsVal,JS_CodecNMPATH);
	        /*
	         * __NEPTUNE_IS_MY_WAIFU__.roomInitRes.data.playurl_info.playurl.stream[0].format[0].codec[0]
	         * 	.base_url

	         */
	/*		
    var codec = jsVal.roomInitRes.data.playurl_info.playurl.stream[0]
    			.format[0].codec[0];
		
        //System.out.println(JsonUtils.encode(codec,1));
        var base_url = codec.base_url;
        var host = codec.url_info[0].host;
        //(String)MapUtils.getElement(codec, JS_CodecHostNMPATH);
        var extra = codec.url_info[0].extra;
        //(String)MapUtils.getElement(codec, JS_CodecExtraNMPATH);
        if( host==null || base_url==null )
            return null;
        return host+base_url+(extra==null?"":extra);
	*/	
   }
 function  _format_name_ord(format_name){
	switch(format_name){
		case "ts": return 0;
		case "flv": return 1;
	};
	return 2;
 } 
/*
Bilibili.js
blive-list:10/33/1-3

*/
var MD5Magic = "ea1db124af3c7062474693fa704f4ff8";

function signQueryParamsStr(params,w_webid){
	var wts = utils.currentTimeSeconds();
	/*
	if( _debug ){
		wts = 1774964127;
		w_webid = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzcG1faWQiOiI0NDQuMjUzIiwiYnV2aWQiOiIwN0I2NTVBMi02MDM3LURGNTUtNjg1RC1CNDhCOEYyNkJBQjAxMzY4N2luZm9jIiwidXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xNDYuMC4wLjAgU2FmYXJpLzUzNy4zNiIsImNyZWF0ZWRfYXQiOjE3NzQ5NjQxMjYsInR0bCI6ODY0MDAsInVybCI6ImxpdmUuYmlsaWJpbGkuY29tL3AvZWRlbi9hcmVhLXRhZ3M_cGFyZW50QXJlYUlkPTFcdTAwMjZhcmVhSWQ9ODY4IiwicmVzdWx0Ijoibm9ybWFsIiwiaXNzIjoiZ2FpYSIsImlhdCI6MTc3NDk2NDEyNn0.U2actcSpEQQTtllhZd_9cCNeg8rImAautwG-BpIHS2h6cOBjrtqO27eg4c5hphXlYaKEVgPmZM2JrBOa0DEzVPjhHVhsRhRud4pJrnP8_M52Q5CG166JhfOWirFNCd8Rb_aCV7wEligsaZY_Cj2lycl5vH6ScPBvz86Chs_lJE-Eb5Jq0u4le1gAS4xjQVUtd4DQX7ZOAAhuD7K1-ttT0LOXlQ9FKAAzTEZ-WlXGx0TFMmVElhT_AjDfgDlVKcQKNRYTlBbvJ4R80Vpvs9OqdVJP1lnugMQDntpz07195aJq8EdWkrUjrZzKWlIgHJ3v-ITcqsYKqmEa-VveADtzHg";
	} */
	params.wts = wts;
	params.w_webid = w_webid;
	var keys = Object.keys(params).sort();
	var str = "";
	for (var i = 0; i < keys.length; i++) {
		if( str!="") str += "&";
		str += keys[i]+"="+encodeURIComponent(params[keys[i]]);
	}
//	print("MD5签名： "+str);
	params.w_rid = utils.md5LowerCaseHex(str+MD5Magic);
	//str += "&"
}
var webview;
const PluginHost = "caoyuwu.eu.org";
//"access_id":"
function getAccessIdFromWebView(parent_area_id,area_id){
	if( !webview ) webview = utils.getWebView();
		//var w_webid = "";
		
		webview.loadUrl("https://live.bilibili.com/p/eden/area-tags?parentAreaId="+parent_area_id+"&areaId="+area_id,
								  // 好像 https 页面不能注入 http 脚本， 所以使用 caoyuwu.eu.org
								    [ //"https:///"+PluginHost+"/tv/plugins/webview/httprequest.js",
									 // "https:///"+PluginHost+"/tv/plugins/webview/bilibili/Bilibil-inject.js"
									  ]
									  ,"win"  //userAgent
									  ,1  // Visible
									 );
		return webview.evalOnPageFinished("!!window._render_data_",
										    	//"httpGetAsString('/index.html',null,0)",
										    	"_render_data_.access_id",
										    	10,
												1);	
}
function getAccessId(parent_area_id,area_id){
	var url = "https://live.bilibili.com/p/eden/area-tags?parentAreaId="+parent_area_id+"&areaId="+area_id;
	var html = utils.httpGetAsString(url,0x408);
	var p1 = html.indexOf("\"access_id\":\"");
	var p2 = p1<0 ? -1 : html.indexOf("\"",p1+13);
	//print("getAccessId : p1="+p1+",p2="+p2);  // "access_id":"
	return p2>0 ? html.substring(p1+13,p2) : "";
}

function loadMenus(url,params){
	var path = utils.getUrlHostAndPath(url);
	  	var a = path.split("/");
	  	if( a.length!=3 )
	  		throw "无效参数"+url;
	    var parent_area_id = a[0], area_id = a[1];
		
		//var w_webid = getAccessIdFromWebView(parent_area_id,area_id);
		var w_webid = getAccessId(parent_area_id,area_id);
	
	print("w_webid="+w_webid);										
	/*
	if( _debug ){
		var params = {
			platform : "web",
			"parent_area_id":1,
			"area_id":868,
			"sort_type":"income",
			"page":2,
			"web_location":"444.253"
		};
		signQueryParamsStr(params);
		for( name in params){
		print(name+" = "+params[name]);
		}
		return;
	} */
  //Number.parseInt("11a")
	
    var fromPage,toPage;
    var p = a[2].indexOf('-');
            if( p>0 ){
                fromPage = parseInt(a[2].substring(0,p));
                toPage = parseInt(a[2].substring(p+1));
            } else
            {
                fromPage = toPage = parseInt(a[2]);
            }
    
 //print("fromPage="+fromPage+",toPage="+toPage);   
    var vCh = [];
        for(var page=fromPage;page<=toPage;page++) {
  // print("=================page="+page);    
		  var queryParams = {
		          platform:"web",
		          parent_area_id:parent_area_id,
		          area_id : area_id,
		          sort_type: "",//online",
				  vajra_business_key : "",
		  		  web_location:"444.253",
				  page: page
		      };	 
           // queryParams.page = page; // "" + 避免 appendUrlParameters 中 变成 1.0
			
			signQueryParamsStr(queryParams,w_webid);
			/*
			https://api.live.bilibili.com/xlive/web-interface/v1/second/getList?
			*/
            var url = utils.appendUrlParameters("https://api.live.bilibili.com/xlive/web-interface/v1/second/getList", queryParams);
            //HttpClient httpClient = new HttpClient(url,headers,0);
            // httpClient.request().getContentAsString();
        // print("url = "+url);
            var text = utils.httpGetAsString(url,0x408);
	//	print("text = "+text);	
            var retVals = JSON.parse(text);
            var list = retVals.data ? retVals.data.list : null;// (Object[])MapUtils.getElement(retVals, new Object[] {"data","list"});
            if(list) for(m of list) {
               // var m = list[i];
                var title = m.title;
                var uname = m.uname;
                var roomid = m.roomid;
				// var uid = m.uid;
                //System.out.println(title+",blive://"+roomid);
             // print(title+",blive://"+roomid);  
                vCh.push({title:title+"("+uname+")",urls:"@blive-urls://"+roomid});
                //(new Channel(title+"("+uname+")","blive://"+roomid));
            }
        }
        return vCh;	
}