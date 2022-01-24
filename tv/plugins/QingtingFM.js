/*
https://www.qingting.fm/radios/XXXXX => qingtingfm://XXXXX
  CNR中国之声 , qingtingfm://386
https://www.qingting.fm/radiopage : 生成 播放地址:
*/
function prepareMediaSource(url,params){
	  var channel_id =  ""+utils.getUrlHostAndPath(url);
 //print("====channel_id="+channel_id);	  
	  var path = "/live/"+channel_id+"/64k.mp3";
	  var urlEncodedPath = encodeURIComponent(path);//java.net.URLEncoder.encode(path,"UTF-8");
	  var t0 = utils.currentTimeSeconds()+1*60*60;//utils.System.currentTimeMillis()/1000 + 1*60*60;
	  var ts = t0.toString(16).toLowerCase();// Long.toHexString(t0).toLowerCase();
	          //ts = "60a0a496";
	  var a= "app_id=web&path="+urlEncodedPath+"&ts="+ts;
	  var  sign = utils. hmacDigestAsHex("HmacMD5","Lwrpu$K5oP",a).toLowerCase();
		  //StrUtils.toHexString(MessageDigestUtils.hmacDigest("HmacMD5", HmacMD5_Key, a.getBytes(StandardCharsets.UTF_8))).toLowerCase();
	  return "http://lhttp.qingting.fm"+path+"?app_id=web&ts="+ts+"&sign="+sign;
}

