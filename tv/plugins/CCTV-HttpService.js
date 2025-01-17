
/*
https://js.player.cntv.cn/creator/h5.worker?v=220805
http://m.lan:8803/cctv-httpservice/info
*/

//(function(){
  //var s = utils.httpGetAsString("https://js.player.cntv.cn/creator/h5.worker?v=220805",0x408);
  var s = utils.httpGetAsString("http://172.20.0.20/temp/cctv-h5.worker.js",0x408);
  utils.debug("CCTV-HttpService","s.length="+s.length);
  
  eval(s);
  //utils.debug("CCTV-HttpService","CNTVModule="+CNTVModule+";  console="+console);
 // utils.debug("CCTV-HttpService","console = "+console);
  delete (s);
  var CNTVH5PlayerModule = CNTVModule();
  //CNTVModule
//})()
function httpService(params){
	var uri = params.uri;
	var p = uri.indexOf("/",1);
	var path = p>0 ? uri.substring(p+1) : "";
	if( path=="" || path=="info" ){
		text = "CNTVH5PlayerModule = "+CNTVH5PlayerModule
		+"\n _jsmalloc = "+CNTVH5PlayerModule._jsmalloc
		  ;
		return {
		contentType : "text/plain;charset=utf-8",
		content : text
		};
	}	
}