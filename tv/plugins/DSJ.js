/*
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
function loadMenus(url,params){
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
		{index:16},
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
	var retVal = utils.httpGet4Protobuf(url,getHttpHeaders(),8,protoMenuMsgFields);
	print("retVal = "+retVal);	
	return retVal;
}
	
	
	