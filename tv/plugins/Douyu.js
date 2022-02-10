/*
 *  https://m.douyu.com/9220456 => douyulive://9220456
 *  https://m.douyu.com/2507125?type=HW
 *  ub98484234(rid,"00000003333",tt)
 */

//function _md5(s){
//	return utils.md5LowerCaseHex(s);
//}


function buildQueryParams(rid,did,tt){
	var headers = {
	         "User-Agent": "Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
    };
	var html = utils.httpGetAsString("https://m.douyu.com/"+rid,headers);
	var jsPrefix = "<script type=\"text/javascript\">";
	var p1 = html.indexOf(jsPrefix);
	var p2 = p1<0 ? -1 : html.indexOf("</script>",p1+jsPrefix.length);
	if( p2<0 )
		return null;
	var js = html.substring(p1+jsPrefix.length,p2);
	p2 = js.indexOf("window.DYAPM=");
	if( p2<0 )
		return null;
	var js2 = _jsEngine==1 ?
			 "var CryptoJS={MD5:function(s){return utils.md5LowerCaseHex(s)}};\n"
			:"var CryptoJS={MD5:utils.md5LowerCaseHex};\n"
				;
	js = "window=this;\n"
		+js2
		+js.substring(0,p2).trim()
	+"\nub98484234('"+rid+"','"+did+"',"+tt+")";
	//print(js);
	return utils.jsEval(js);//,"ub98484234",[rid,"00000003333",tt]);
	/*
	 * v=250120220210&did=00000003333&tt=1644474359&sign=29e8e1d27d509666b2df07d2f4efa4d8
	 */ 
}

function prepareMediaSource(url,params){
	var rid = utils.getUrlHostAndPath(url); //"" +
	
	var headers = {
         "User-Agent": "Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
         "Referer" : "https://m.douyu.com/"+rid,
         "Origin" : "https://m.douyu.com",
         "Accept" : "application/json, text/plain, */*"
        //,"Accept-Encoding": "gzip, deflate, br"	 
        //,"Cookie":"dy_did=9f0f02cdb4b9a6322168e4ed00031601; Hm_lvt_8416af03f83ed003a0d2316f7cb36c65=1644387129; m_did=12725c0bc0fe95fac35a399400031631; Hm_lvt_e99aee90ec1b2106afe7ec3b199020a7=1644387007,1644397704,1644398900; Hm_lpvt_8416af03f83ed003a0d2316f7cb36c65=1644475251; Hm_lpvt_e99aee90ec1b2106afe7ec3b199020a7=1644475255"
        //,"sec-ch-ua": '"Not A;Brand";v="99", "Chromium";v="97", "Google Chrome";v="97"'
        //,"sec-ch-ua-mobile": "?1"
        //,"sec-ch-ua-platform": '"Android"'
        //,"sec-fetch-dest": "empty"
        //,"sec-fetch-mode": "cors"
        //,"sec-fetch-site": "same-origin"
    };
	var date = new Date();
	//  date.getFullYear() , date.getMonth()+1 , date.getDate()
	//var year = date.getFullYear(), month = date.getMonth()+1, day = date.getDate();
	var tt = Math.floor(date.getTime()/1000); //utils.currentTimeSeconds();//
    var ver = "22107261"
//tt=1644476811;	
    var did = "12725c0bc0fe95fac35a399400031631";
	var postParams = buildQueryParams(rid,did,tt)+"&ver="+ver+"&rid="+rid+"&rate=-1&un=un";
	//var postParams = "v=250120220210&did=12725c0bc0fe95fac35a399400031631&tt=1644476811&sign=69a197a4a592cef889027e78ca235973&ver=22107261&rid=9220456&rate=-1&un=un";
	//print("pm="+pm);
	//return;
	//var v = "2501"+year+(month>=10?month:"0"+month)+(day>=10?day:"0"+day);//"250120220209",
		;
   
	   // rid + self.did + self.t10 + v
	/*	
	var rb = utils.md5Hex(rid+did+tt+v).toLowerCase();   
	var sign = "";
	var formParams = {
		v:v,
		did:did,
		tt:tt,
		sign:sign,
		ver:ver,
		rid:rid,
		rate:-1,
		un:"un"
	};
	*/
	var text = utils.httpPostAsString("https://m.douyu.com/api/room/ratestream",
			headers,
			"application/x-www-form-urlencoded",
			postParams,
			0x400
		);
	/*
	 * {"code":1,"data":"参数非法"}
	 * {"code":6,"data":"时间未校准"}
	 * {"code":7,"data":"非法请求"}
	 * {"code":0,"data":{"settings":[{"name":"蓝光","rate":0,"high_bit":1},{"name":"超清","rate":3,"high_bit":0},{"name":"高清","rate":2,"high_bit":0}],"url":"http://hlstct.douyucdn2.cn/dyliveflv3/9220456rJU0ek7q8_2000.m3u8?txSecret=c98c11fa4896742964902e1190725779\u0026txTime=6204d61a\u0026token=h5-douyu-0-9220456-383727a090f4f08cc3086f9f6854a80d\u0026did=12725c0bc0fe95fac35a399400031631\u0026origin=tct\u0026vhost=play3","rate":3,"pass":0}}
	 */
	//print("返回="+text);
	var retVal = JSON.parse(text);
	if( retVal.code ){
		throw retVal.code+":"+retVal.data;
	}
	return retVal.data.url;
}



/*
https://www.sanshuifeibing.com/posts/8146e2c4.html
*/
