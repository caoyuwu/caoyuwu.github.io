/*
 *   http://caoyuwu.eu.org/tv/plugins/DSJ.js
 *   http://172.20.0.20/caoyuwu.github.io/tv/plugins/DSJ.js
*/
var UUID = "f5a1c51d97972e4934a38803de3ec982";
var REGION = "110000";
var ISP = "mobile";
var httpHeaders = {
		generation : "com.dianshijia.newlive",
		ispCode : "4",
		cityCode : REGION,
		"User-Agent" : "Dsj/Client1.2",
		hwBrand : "HUAWEI",
		appVerName : "3.5.18",
		hwAndroidId : "feeb632063289bfa",
		language : "en_HK",
		userid : "",
		uuid : UUID,
		deviceId : "e1079286b32946ca",
		routerMac : "020000000000",
		platform : "1",
		appVerCode : "428",
		hwMac : "426C544E6AFD",
		authorization : "",
		areaCode : REGION,//"110000",
		lastuserid : "",
		hwModel : "HMA-AL00",
		cuuid : "3db2a8b160c3ae7af2356f5355fdd519",
		countryCode : "CN",
		appid : "083537a52f4a800a5a9319ff4d5c08e4",
		ethMac : "null",
		marketChannelName : "default_os"				
};

function getHttpHeaders(){
	return httpHeaders;
}

/*
  dsj-urls://cctv1
  data {
  streams {
    id: "105523"
    url: "Pkb+qlLrePyu5r8IRFqLyN+VdkVZuAiKOAcE0++5qihC67w33cgnwlVTWGPqd8YGqKBu3zJgm8kC4YqIYoD65YzRi99TrFsxzjWo+lTAv/Aq0RTqYel0uKuJTtXne+JEe2zw1rQz/yhRuO70RC39hw=="
    definition: "\351\253\230\346\270\205"
  }
 */
function loadUrls(url,params)
{
	var channel_id = utils.getUrlHostAndPath(url);
	print("获取频道 URL : chId = "+channel_id);
	var tm = utils.currentTime();
	var sign = utils.md5LowerCaseHex(channel_id+tm+UUID+REGION+ISP);
	var url = "http://api.dianshihome.com/gslb/channel/stream" +
	    // "http://gslb.dianshihome.com/gslb/streams"
		"?region="+REGION //110000
		+"&isp="+ISP //mobile
		+"&tm="+tm
		+"&uuid="+UUID  //f5a1c51d97972e4934a38803de3ec982
		+"&sign="+sign //24ac1cd8638c8c7b91bbfd62025fadf1
		+"&ver=1.0.8&channel_id="+channel_id
		;
	var protoItemMsgFields = [
		 {index:1,name:'id'},
		 {index:2,name:'url'},
		 {index:3,name:'title'},
		 {index:6},
		 {index:7},
		 {index:8,name:'title2'}
		 ];
	var  protoMsgFields =[
		 {index:1,name:'urls',type:protoItemMsgFields},
		 {index:2,name:'urls2',type:protoItemMsgFields},
		 {index:4}
		];
	var retVal = utils.httpGet4Protobuf(url,getHttpHeaders(),8,protoMsgFields);
//print("retVal = "+retVal.urls.length+","+retVal.urls2.length);//JSON.stringify(retVal));
	
	var  urls = [];
	var _a;
	var _added = {};
	if( _a = _toArray(retVal.urls2) ) for(var i=0;i<_a.length;i++){
		//print(i+":"+_a[i].url);	
		if(!_a[i].url || _added[_a[i].url] )
			continue;
		_added[_a[i].url] = true;
		urls.push({title:_a[i].title||_a[i].title2,url:_a[i].url});
	}
	if( _a = _toArray(retVal.urls) ) for(var i=0;i<_a.length;i++){
		//print(i+":"+_a[i].url);
		if(!_a[i].url || _added[_a[i].url] )
			continue;
		_added[_a[i].url] = true;
		urls.push({title:_a[i].title||_a[i].title2,url:_a[i].url});
	}
	return urls; 
}

function loadMenus(url,params){
	//utils.log("DSJ.loadMenus","url = "+url); 
	var protoItemMsgFields = [{index:1,name:'id'},
		{index:2,name:'title'},
		{index:3},
		{index:4,name:'area'},
		{index:5},
		{index:7},
		{index:8},
		{index:9},
		{index:10},
		{index:11},
		{index:12},
		{index:14},
		{index:15},
		{index:16,name:'tags'}, // ",adChannel,yougou,fenchengpindao"
		{index:17,name:'logURL'},
		{index:18,name:'title2'},
		{index:19,name:'name'},
		{index:20},
		{index:21},
		{index:23},
		{index:25},
		{index:26},
		{index:27},
		{index:28},
		{index:29},
		{index:30},
		{index:35}
		];
var  protoMenuMsgFields =[{index:1,name:'id'},
	{index:2,name:'title'},
	{index:3,name:'name'},
	{index:5,name:'items',type:protoItemMsgFields},
	{index:6},
	{index:7},
	{index:8},
	{index:9,name:'shorttitle'},
	{index:10},
	{index:15,name:'level'},
	{index:16,name:'logoURL'},{index:17}
	];		
		
	//var t0 = utils.currentTime();
	var url = "http://api.dianshihome.com/api/v6/channels?ts="+utils.currentTime();
//url="http://172.20.0.20/temp/channels-list.proto";	
	var retVal = utils.httpGet4Protobuf(url,getHttpHeaders(),8,protoMenuMsgFields);
	//utils.log("DSJ.loadMenus",""+retVal);
	//print("retVal = "+JSON.stringify(retVal));
	var menus = [];
	for(var i=0;i<retVal.length ;i++){
		var m1 = retVal[i];
		if( !m1.items )
			continue;
	//print("m1.items.length = "+m1.items.length);
	//print("mi.items[0] = "+mi.items[0]);
		var mi = {title:m1.title,items:[]};
		for(var j=0;j<m1.items.length;j++){
			var tags = m1.items[j].tags;//,adChannel,
			if( tags ){
				if( tags.indexOf(",adChannel,")>=0 ){
					continue;
				}
			}
			mi.items.push({url:"@dsj-urls://"+m1.items[j].id,title:m1.items[j].title});
		}
		menus.push(mi);
	}
	return menus;
}

function _toArray(o){
	if( o==null || o instanceof Array || o.length>0 )
		return o;
	return [o];
}
	
	