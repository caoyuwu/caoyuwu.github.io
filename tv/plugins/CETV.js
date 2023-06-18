
/*
http://caoyuwu.eu.org/tv/plugins/CETV.js

http://www.centv.cn/cetv1/index.html

*/

function prepareMediaSource(url,params){
	var stream_id = utils.getUrlHostAndPath(url); //"" +
	switch( stream_id ){
	   case "cetv1": stream_id="742"; break;
	   case "cetv2": stream_id="773"; break;
	   case "cetv3": stream_id="774"; break;
	   case "cetv4": stream_id="775"; break;
	}
	var url = "http://app.cetv.cn/video/player/stream?stream_id="+stream_id+"&site_id=10001";
	var headers = {
		
	};
	var text = utils.httpGetAsString(url,headers);
	//print(text);
	var retVal = JSON.parse(text);
	if( !retVal ) return null;
	//print(retVal);
	return retVal.stream || retVal.play_url;
}