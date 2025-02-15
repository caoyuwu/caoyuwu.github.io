/*#
#include CCTV-TSDecript.js
#include h5.worker.js
#*/  

/*
  1 : h5.worker.js 来自 tv.cctv.com https://js.player.cntv.cn/creator/h5.worker?v=220805
     其中 标志 [CYW] 做了修改
   2 : h5.worker.wasm   来自  h5.worker.js 中的 wb 
   
*/

/*
https://caoyuwu.eu.org/tv/plugins/cctv/CCTV-HttpService.js
https://js.player.cntv.cn/creator/h5.worker?v=220805
http://m.lan:8803/cctv-httpservice/info
http://m.lan:8803/cctv-httpservice/ldncctvwbcdtxy.liveplay.myqcloud.com/ldncctvwbcd/cdrmldcctv13_1/index.m3u8?b=200-2100
http://192.168.1.14:8803/cctv-httpservice/ldncctvwbcdtxy.liveplay.myqcloud.com/ldncctvwbcd/cdrmldcctv13_1/index.m3u8?b=200-2100

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
var NotFound = {status : 404,contentType : "text/plain;charset=utf-8",	content : "Not found"};
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
	var p2 = uri.indexOf("/",p+1);
	if( p2<0 )return NotFound;
	var prefix2 = uri.substring(0,p2);	
	var prefix1= uri.substring(0,p);	
	/*
	path = "ldncctvwbcdtxy.liveplay.myqcloud.com/ldncctvwbcd/cdrmldcctv13_1/index.m3u8?b=200-2100"
	*/
	var suffix = getUrlSuffix(path);
	var httpPrefix =  "https://";
	if( path.startsWith("https-") ){
		path = path.substring(6);
	} else if( path.startsWith("http-") ){
		path = path.substring(5);
		httpPrefix =  "http://";
	}
	if( suffix=="m3u8" ){
		return httpService4M3U8(httpPrefix+path,prefix1,prefix2);
	}
	if( suffix=="ts" ){
		return httpService4TS(httpPrefix+path);
	}
	return NotFound;
}

/*
prefix1=/cctv-httpservice, 
prefix2=/cctv-httpservice/ldncctvwbcdtxy.liveplay.myqcloud.com
*/
function httpService4M3U8(url,prefix1,prefix2){
	//var p = 
	var resp = utils.httpGet(url,null,0x408|0x1000|1);
	var headers = {}
	for( var name of RespTSHeaders ){
			if (resp.headers[name] ) headers[name] = resp.headers[name];
	}
	var content = resp.content;
//print("typeof(content) = "+typeof(content));	
	if( resp.status==200 && typeof(content)=="string" ){
		var changed = false;
	var lines = content.split("\n");  //utils.httpGetAsString(url,0x408)
	//print("lines.legth = "+lines.length);
	for(var i=0;i<lines.length;i++){
		var line = lines[i];
	//	print("line = "+line);
		if( line=="" || line.charCodeAt(0)==35 ){  // #
			continue;
		}
		var suffix = getUrlSuffix(line);
		//print("suffix="+suffix+" ; line = "+line);
		if( suffix=="m3u8" || suffix=="ts" ){
			// /cctv-httpservice/
			if( line.charCodeAt(0)==47 ){ // "/"
				lines[i] = prefix2+line;
				changed = true;
				continue;
			}
			if( line.startsWith("https://") ){
				lines[i] = prefix1+line.substring(7);
				changed = true;
				continue;
			}
			if( line.startsWith("http://") ){
				lines[i] = prefix1+"http-"+line.substring(6);
				changed = true;
				continue;
			}
		} // if suffix=="m3u8" || suffix=="ts"
	}  // for lines
	if(changed ) content = lines.join("\n");
	}
	return {
				contentType : resp.contentType,// "application/vnd.apple.mpegurl;charset=utf-8", //text/plain;charset=utf-8",
				headers : headers,
				content : content //lines.join("\n")
				//prefix1="+prefix1+", prefix2="+prefix2+", url = "+url
	};
}

function decryptTS(content){
	if( !(content instanceof ArrayBuffer) )
	    return content;
//*
	if(!CNTVH5PlayerModule) loadCNTVH5PlayerModule();
	var rootURL = "https://tv.cctv.com/live/";
	new CCTVTSDecript().decryptTS(content,rootURL);
//*/	
	//utils.debug("CCTV-HttpService.js","解密: content : length= "+content.byteLength);
	return content;
}
var RespTSHeaders = [
	"Access-Control-Allow-Origin",
     "Access-Control-Allow-Credentials",
     "Cache-Control",
     "Accept-Ranges",
     "X-Tlive-SpanId",
     "cdncip","cdnsip",
     "Access-Control-Expose-Headers",
     "Access-Control-Allow-Methods",
     "Access-Control-Max-Age",
     "X-SSL-PROTOCOL",
     "X-NWS-LOG-UUID",
     "Date",
     "Last-Modified"
     //"Server"
   ]
function httpService4TS(url){
	var resp = utils.httpGet(url,null,0x408|0x1000|1);
	//var headers = resp.headers;
	var headers = {}
	for( var name of RespTSHeaders ){
		if (resp.headers[name] ) headers[name] = resp.headers[name];
	}
	var contentType = resp.contentType;
	var content = resp.content;
	if( resp.status==200 && content instanceof ArrayBuffer ){
		content = decryptTS(content);
	}
	return {
			contentType :contentType,// "video/MP2T" ,//  "text/plain;charset=utf-8",
			headers : headers,
			content : content //"ts : "+url
				
	};
}



function getUrlSuffix(url){
	var p = url.indexOf("?");
	if( p>0 )url = url.substring(0,p) ;
	p = url.lastIndexOf('.');
    return p>0 ? url.substring(p+1) : null;
}
