/*
 https://www.ximalaya.com/radio/93 
 =>https://live.ximalaya.com/live-web/v1/radio?radioId=93
  ximalayaradio://93
  https://live.xmcdn.com/live/" + radioId + "/64.m3u8?transcode=ts"
*/

function prepareRadioSource(radioId){
	// https://live.xmcdn.com/live/" + radioId + "/64.m3u8?transcode=ts"
	var text = utils.httpGetAsString("https://live.ximalaya.com/live-web/v1/radio?radioId="+radioId);
	var data = JSON.parse(text);
	if(data.ret)
		 throw data.msg;
	//aac64
	var playUrl = data.data.playUrl;
	return playUrl.ts64 || playUrl.aac64 || playUrl.ts24 || playUrl.aac24;
}

function prepareMediaSource(url,params){
	if( url.startsWith("ximalayaradio:") ){
		return prepareRadioSource(utils.getUrlHostAndPath(url));
	}
}