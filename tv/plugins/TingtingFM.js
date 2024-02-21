/*
https://m.tingtingfm.com/
*/

var Version = "h5_5.24";
var Client = "h5_73abd0974a1bf53a6186e418e4652bd5";
var SignMsgic = "1Ftjv0bfpVmqbE38";
function  buildApiSign(e){
	var t = e.split("&").sort().join("&") + "_" + SignMsgic;
	return utils.md5LowerCaseHex(t);   
}

/*
tingtingfm://EOAonLJy7G : 1039
*/
function prepareMediaSource(url,params){
   var channel_id =  utils.getUrlHostAndPath(url);
   var e = "version="+Version+"&client="+Client+"&h_radio_id="+channel_id;//EOAonLJy7G
   var url = "https://api-v3.tingtingfm.com//broadcast/get_radio_programs?"+e+"&api_sign="+buildApiSign(e);
 // print("url="+url); 
   var text = utils.httpPostAsString(url,null,null,null,0x400);
   var retVal = JSON.parse(text);
   if( retVal.errno!=0 || !retVal.data || !retVal.data.info ){
	   throw retVal.error;
   }
   var playUrls = retVal.data.info. play_urls;
  // print(text);
  return playUrls.hls || playUrls.flv || playUrls.mp3 ;
}