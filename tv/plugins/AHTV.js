/*
http://caoyuwu.eu.org/tv/plugins/AHTV.js
https://www.ahtv.cn/
"https://mapi.ahtv.cn/api/open/ahtv/program.php?appid=m2otdjzyuuu8bcccnq
&appkey=5eab6b4e1969a8f9aef459699f0d9000&zone=0&channel_id=47";
*/

/*
  APPID,APPKEY 从浏览器 F12 获取
*/
var APPID = "m2otdjzyuuu8bcccnq";
var APPKEY = "5eab6b4e1969a8f9aef459699f0d9000";
/*
  ahtv://47
  
*/
var channelList;
function prepareMediaSource(url,params){
	var chId = utils.getUrlHostAndPath(url); //"" +
	//var url = "https://mapi.ahtv.cn/api/open/ahtv/program.php?appid="+APPID
	//			+"&appkey="+APPKEY+"&zone=0&channel_id="+chId;
	if( !channelList ){
		var url = "https://mapi.ahtv.cn/api/open/ahtv/channel.php?appid="+APPID
				+"&appkey="+APPKEY+"&is_audio=0&category_id=1%2C2";			
		var headers = {
			Referer: "https://www.ahtv.cn"
		};
		var text = utils.httpGetAsString(url,headers);
	//print(text);
		var retVal = JSON.parse(text);
		if( !retVal ) return null;
		channelList = {};
		for(var i=0;i<retVal.length;i++){
	    	var m = retVal[i];
	    	if( m.id && m.m3u8 )
	    		channelList[m.id] = m.m3u8;
	    }
	}
	var url = channelList[chId];
	return url ? {url:url,headers:headers} : null;
//print(retVal);
	/*
	var url;
	for(var i=0;i<retVal.length;i++){
	    var m = retVal[i];
	    if( url=m.m3u8 )
	       break;
	}
	
	return url ? {url:url,headers:headers} : null;
	*/
}