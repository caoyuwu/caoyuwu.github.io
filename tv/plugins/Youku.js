
/*
  youku://XNDM4NDY1ODUwNA==
 * http://localhost/caoyuwu.github.io/tv/msprepare/Youku.js
 * http://www.caoyuwu.top/tv/msprepare/Youku.js
 * var _owner;
 * youku|youku2,http://www.caoyuwu.top/tv/msprepare/Youku.js
 */
//print("user="+_owner.getParameter("user")+",id="+_owner.getParameter("id"));

var prefVideoHeight = 1080;
var APPKEY = "24679788";
var YKPid = "20160317PLF000211"; // 固定值， 来自 js
var HOMEURL =  "https://acs.youku.com";
var URL = HOMEURL+"/h5/mtop.youku.play.ups.appinfo.get/1.1/"; 
var HomeURL = new java.net.URL(HOMEURL);
var lastInitCookiesTime;

function getToken(){
	var c = Packages.snsoft.commons.net.HttpCookiesStore.impl.getHttpCookie(HomeURL, "_m_h5_tk");
	if( c ){
		var s = c.getValue();
//print("_m_h5_tk="+s);		
		var p = s.indexOf("_");
		return p>=0 ? s.substring(0,p) : s;
	}
	return "";
}
/*
function extraceUrlHostAndPath(url){
	var p = url.indexOf(":");
	if( p<0 )
		return null;
	for(p++;p<url.length && url.charAt(p)=='/';p++)
        ;
    var p2 = url.indexOf('?',p+1);
    return p2<0 ? url.substring(p) : url.substring(p,p2) ;
}
//*/

function prepareMediaSource(url,params){
	var videoId = ""+utils.getUrlHostAndPath(url);
	 // Java的String 做 JSON.stringify 有问题!
	//var videoId = extraceUrlHostAndPath(url);
	   // 
//print("====url="+url+" ;   videoId="+videoId);
utils.showToast("====url="+url+" ;   videoId="+videoId);
	var ts = utils.currentTime();//Packages.java.lang.System.currentTimeMillis();
	var tokenExoiredChecked = false;
	var videoHeight = prefVideoHeight || 1080;
//print("ts="+ts);	
	for(;;){
		var token = getToken();
		if( token==null ){
			throw "token获取失败";
		}
//print("token="+token);
		var retText;
		{
			var steal_params = {
					ccode : "0502",
					client_ip: "192.168.1.1",
	                utid:"ULHDF1D3uWoCAXx/of4Zoglx",
	                client_ts:Math.floor(ts/1000),//.longValue(),
	                version:"2.1.69",
	                ckey:"140#yPQDSfl1zzF1hzo23zNb4pN8s7a612rhQyqHbs+HBzGI1SD8Qo2d/m8nlTEKeISfcVbKN6hqzznk+MSde6XxzBFhIHoqlQzx2DD3VthqzF+w2CiYlp1xzoObV2EqlSfLGV0I1wba7X5mYL69qukruAWMu+2SEkN4fzLjyrCIyMAvMkO6rdV2UD93x8/d0OwtKtribGx7YoxZVcenLBazjveOz1V0xhKJvo/zO8iiNozRVfT1pxuwoWF4ZphZUtcsylOABbdwxW4BiBVmw3WByVPAYgdzbSvSZh0KijslfTeqQcYajuq3yZ93H8IYT3b90Bjg92ftiq9+f80DcLyw1c4AsPYOiIuiaOZLv+Oxs+jcK8jjDhVB8wU0ktP8nrfy4IHKIcdHu78F2uGRGoJFroDYVBUGybeedOqb1dqLxZnSRBWqhYvFpRepGNgNRKYr6TWJ2OIYOh1ICb/OpUkIEMPfJghGuK3Bg+HWg7uMGBKE3o3tVi43XuRpVcnzgFzQ2LVt5ttvIqK4EhLLVzji48i6FJLwYtFbTFbSdDMhnD57fauPuzDTVvO6R4rN6szCGgWE9O8qNVBA7ZdT4RNwC/qSpD/uBOnOFjnyRAcKaTbXOYdyj6pF9co+0UNiTUTNuZN5Uq5SUgts7y82OctAENtlLWv/8mjigJbmq3Jb16TsiCLQv0+3Wn4lzPUTlU2Mb1FY31aRCJcZ9OB9DAINros2UUawROmC54VD1dH0Cg0SBIbFpMoVQeDpBoeaBFTxXf3KuhAqq5BQa3rlrwZ1HH4yfa6UZd0KUcKiQ4WK7/47N0xhseht/XpaLwTI7a02kYt2K8pNtILfUbal8DRVN5tHyDABSrleP5ZQJFYAz+15d3phuPlRfqTGnelV8DPO6E7j6cTARbVTu1INRx4llcNsOHbe/MjMvp1m7zhLspU8W7mw2i0ww1wayCEI+HAQvAzu91PX3fKhF25KGSLVQkVsjdJ/F2xih/2H9oOjuUjlkwpN63RiZSU4vwGAZclKR8Ts4F8Uz1Sa9LCViSb6dc46ebeDR86zxmhaF8Q5wIUPT+Ge65ycil3y3UewE1qRiw8aS5IRKNQCyudaT4oSTRM914aimZNiQ6LOmMExIa4YNjrs31tF76RzIqI932KUDrnb9cQyCxV/jduaHcIbG0Gd61wsFjxQXduEoxFM/V+QQ5SQIRgvbtl0MDR2BbL4l5q0CkrLq963KgfI6oW/4OAaGfi+Ua52g/2Jaxbul+hjr/5FoYKwIRm8uTsXRGdyG+ZNZ1/60y4wiZegAHvjsH6LXVT5Fs5ivJpWEy+="
			};
			//org.mozilla.javascript.NativeJSON
//print("1--------steal_params="+JSON.stringify(steal_params));			
			var biz_params = {
					vid:videoId,
	                play_ability:16782592,// js 中给出的固定
	                master_m3u8:1,
	                media_type:"standard,subtitle",
	                app_ver:"2.1.69",
	                h265:1
			};
			/*
			for(var nm in biz_params){
				print(nm+" = "+biz_params[nm]);
				print(nm+" = "+JSON.stringify(biz_params[nm]));
			}// */
//print("2--------biz_params="+biz_params);			
//print("2--------biz_params="+JSON.stringify(biz_params));			
			var ad_params = {
			};
//print("3--------ad_params="+JSON.stringify(ad_params));			
			var data = JSON.stringify({
				steal_params:JSON.stringify(steal_params),
				biz_params:JSON.stringify(biz_params),
				ad_params:JSON.stringify(ad_params),
			});
			var sign = Packages.snsoft.commons.security.MessageDigestUtils.md5Hex(token+"&"+ts+"&"+APPKEY+"&"+data).toLowerCase();
			var queryParams = {
					jsv:"2.5.8",
	                appKey: APPKEY,
	                t: ts,
	                sign: sign,
	                api: "mtop.youku.play.ups.appinfo.get",
	                v: "1.1",
	                timeout:"timeout",
	                YKPid:YKPid,//: 20160317PLF000211
	                YKLoginRequest:true,
	                AntiFlood:true,
	                AntiCreep:true,
	                type:"jsonp",
	                //dataType", "json");
	                dataType:"jsonp",
	                callback:"mtopjsonp1",
	                data:data
			};//queryParams
			//print("queryParams = "+JSON.stringify(queryParams));
			//break;
			var header = {
				Referer:"https://v.youku.com/v_show/id_"+videoId+".html"	
			};
			var url = Packages.snsoft.commons.net.HttpUtils.appendUrlParameters(URL, queryParams);
			retText = utils.httpGetAsString(url,header).trim();
		}
		if( !retText.startsWith("mtopjsonp1({") || !retText.endsWith("})") ) {
            throw "返回数据错误-"+retText;
        }
	//print("返回="+retText);	
		var retVals = JSON.parse(retText.substring(11,retText.length()-1));
		var retCodes = retVals.ret;
		var retCode = retCodes[0];
		var p = retCode.indexOf(":");
		if( p>0 )
			retCode = retCode.substring(0,p);
		if( retCode=="SUCCESS") {
			//var data = retVals.data.data;
			var streams = retVals.data.data.stream;
//print("streams="+streams);			
			var lastH = 0, lastUrl = null;
            for(var streamsIdx=0;streamsIdx<streams.length;streamsIdx++) {
            	var stream = streams[streamsIdx];
            	print("stream="+JSON.stringify(stream));	            	
                //final java.util.Map<String,Object> stream = (java.util.Map<String,Object>)streamO;
                var url = stream.m3u8_url;
//print("url="+url);	                
                if( url==null ) {
                    continue;
                }
                var height = stream.height;// snsoft.commons.util.StrUtils.obj2int(stream.get("height"),0);
                //final int width = snsoft.commons.util.StrUtils.obj2int(stream.get("width"),0);
               // System.out.println(width+"X"+height+" : "+url);
//print("height = "+height)
                if( videoHeight==height ) {
                    return url;
                }
                if( lastUrl==null
                        || Math.abs(videoHeight-height)<Math.abs(videoHeight-lastH)
                ) {
                    lastH = height;
                    lastUrl = url;
                }
            }
            return lastUrl;
		} else if( retCode=="FAIL_SYS_TOKEN_EXOIRED" || retCode=="FAIL_SYS_TOKEN_EMPTY" 
			&& !tokenExoiredChecked	
		){
			tokenExoiredChecked = true;
            continue;
		}
		throw retCodes[0];
	} // for(;;)
	//return videoId;
}


