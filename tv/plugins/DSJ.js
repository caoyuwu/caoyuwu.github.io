/*
 *   http://caoyuwu.eu.org/tv/plugins/DSJ.js
 *   http://172.20.0.20/caoyuwu.github.io/tv/plugins/DSJ.js
*/
var httpHeaders = {
		generation : "com.dianshijia.newlive",
		ispCode : "4",
		cityCode : "110000",
		"User-Agent" : "Dsj/Client1.2",
		hwBrand : "HUAWEI",
		appVerName : "3.5.18",
		hwAndroidId : "feeb632063289bfa",
		language : "en_HK",
		userid : "",
		uuid : "f5a1c51d97972e4934a38803de3ec982",
		deviceId : "e1079286b32946ca",
		routerMac : "020000000000",
		platform : "1",
		appVerCode : "428",
		hwMac : "426C544E6AFD",
		authorization : "",
		areaCode : "110000",
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
 * dsj-urls://cctv1
 */
function loadUrls(url,params)
{
	var chId = utils.getUrlHostAndPath(url);
	print("获取频道 URL : chId = "+chId);
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
	
	
	