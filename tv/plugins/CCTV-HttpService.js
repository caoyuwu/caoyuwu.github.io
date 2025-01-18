
/*
https://caoyuwu.eu.org/tv/plugins/CCTV-HttpService.js
https://js.player.cntv.cn/creator/h5.worker?v=220805
http://m.lan:8803/cctv-httpservice/info
http://m.lan:8803/cctv-httpservice/ldncctvwbcdtxy.liveplay.myqcloud.com/ldncctvwbcd/cdrmldcctv13_1/index.m3u8?b=200-2100
*/

//(function(){
/*	
  //var s = utils.httpGetAsString("https://js.player.cntv.cn/creator/h5.worker?v=220805",0x408);
  var s = utils.httpGetAsString("http://172.20.0.20/temp/cctv-h5.worker.js",0x408);
  utils.debug("CCTV-HttpService","s.length="+s.length);
  
  eval(s);
  //utils.debug("CCTV-HttpService","CNTVModule="+CNTVModule+";  console="+console);
 // utils.debug("CCTV-HttpService","console = "+console);
  delete (s);
  var CNTVH5PlayerModule = CNTVModule();
  //CNTVModule
  */
//})()
function httpService(params){
	var uri = params.uri;
	/*
	https://ldncctvwbcdtxy.liveplay.myqcloud.com/ldncctvwbcd/cdrmldcctv13_1/index.m3u8?b=200-2100
	/cctv-httpservice/ldncctvwbcdtxy.liveplay.myqcloud.com/ldncctvwbcd/cdrmldcctv13_1/index.m3u8?b=200-2100
	*/
	var p = uri.indexOf("/",1);
	var path = p>0 ? uri.substring(p+1) : "";
	if( path=="" || path=="info" ){
		text = "CCTV-HttpService\n"; 
		//"CNTVH5PlayerModule = "+CNTVH5PlayerModule
		//+"\n _jsmalloc = "+CNTVH5PlayerModule._jsmalloc
		  ;
		return {
		contentType : "text/plain;charset=utf-8",
		content : text
		};
	}	
	/*
	path = "ldncctvwbcdtxy.liveplay.myqcloud.com/ldncctvwbcd/cdrmldcctv13_1/index.m3u8?b=200-2100"
	*/
	var suffix = getUrlSuffix(path);
	if( suffix=="m3u8" ){
		return httpService4M3U8("https://"+path);
	}
	if( suffix=="ts" ){
		return httpService4TS("https://"+path);
	}
	return {
		    status : 404,
			contentType : "text/plain;charset=utf-8",
			content : "Not found"
		};
}

function httpService4M3U8(url){
	return {
				contentType : "text/plain;charset=utf-8",
				content : "m3u8 : "+url
	};
}

function httpService4TS(url){
	return {
				contentType : "text/plain;charset=utf-8",
				content : "ts : "+url
	};
}

function getUrlSuffix(url){
	var p = url.indexOf("?");
	if( p>0 )url = url.substring(0,p) ;
	p = url.lastIndexOf('.');
    return p>0 ? url.substring(p+1) : null;
}
