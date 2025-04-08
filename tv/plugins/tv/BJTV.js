/*
http://caoyuwu.eu.org/tv/plugins/tv/BJTV.js
https://www.btime.com/btv/btvsy_index
*/
/*
  
bjtv://gid : 其中 GID : 从 主页 https://www.btime.com/btv/btvsy_index
      App.data = ... 的 JSON 中获取
北京卫视4K超高清  bjtv://5755n511tbk8flo40l4c71l0sdf
BRTV文艺      bjtv://54db6gi5vfj8r8q1e6r89imd64s  
BRTV纪实科教   bjtv://53bn9rlalq08lmb8nf8iadoph0b
BRTV影视      bjtv://50mqo8t4n4e8gtarqr3orj9l93v
BRTV财经      bjtv://50e335k9dq488lb7jo44olp71f5
BRTV体育休闲   bjtv://54hv0f3pq079d4oiil2k12dkvsc
BRTV生活   bjtv://50j015rjrei9vmp3h8upblr41jf
BRTV新闻    bjtv://53gpt1ephlp86eor6ahtkg5b2hf
卡酷少儿     bjtv://55skfjq618b9kcq9tfjr5qllb7r

参考:
  https://s2.ssl.qhres2.com/!dd49acd6/feb/page.js 中 getStream  
  
*/
function prepareMediaSource(url,params){
	 var id = utils.getUrlHostAndPath(url); //"" +
	 var type_id = 151;
	 var t0 = new Date().getTime();
	 var timestamp = parseInt(t0 / 1000),
                sign = getSign(id, 151, timestamp);
     var headers = {
			Referer: "https://www.btime.com/"
	};
	  var queryParams = {
		  from:"pc",
		  //&callback=jQuery36007688351917499108_1744008710786
		id:id,//=5755n511tbk8flo40l4c71l0sdf
		type_id:type_id,//151
		timestamp: timestamp,
		sign: sign,//=e1ad6461&_=1744008710787
		"_":t0
	  };
	  var url = utils.appendUrlParameters("https://pc.api.btime.com/video/play",queryParams);
	var text = utils.httpGetAsString(url,headers);
	/*
	{"errno":0,"data":{"play_status":1,"encode":"0","live_status":3,
	"video_stream":[{"stream_url":"https:\/\/hsplay-360.v.btime.com\/live_btime\/btv_sn_20170706_s41\/index.m3u8?time=1744011767&sign=70503948e16602669ac7368f866031b9","stream_rate":800,"stream_vbt":"标清","stream_type":5,"duration":""}],"video_streams":[[{"stream_url":"https:\/\/hsplay-360.v.btime.com\/live_btime\/btv_sn_20170706_s41\/index.m3u8?time=1744011767&sign=70503948e16602669ac7368f866031b9","stream_rate":800,"stream_vbt":"标清","stream_type":5,"duration":""}]],"ts":1744011767,"gid":"5755n511tbk8flo40l4c71l0sdf","utoken":"","video_source_type":151,"duration":"0"}}
	{"errno":-2,"msg":"缺少必要参数","data":["sign"]}
	*/
	if(_debug) print(text);
	var retVal = JSON.parse(text);
		if( !retVal ) return null;
	if( retVal.errno!=0 ){
		throw retVal.errno+":"+retVal.msg;
	}	         
	var encode = parseInt(retVal.data.encode || "0");
	/*
	  通过 encode 来判断是否需要解密 1 为需要解密，0 为不需要解密
	*/
	//if(_debug) print("encode="+encode);
	var url = retVal.data.video_stream[0].stream_url;
	if( encode==1 ){
		/*
		 参考 page.js 中 renderPlayer(options)
		*/
		url = getStreamUrl(url);
	}
	return url;
}

/*
function base64Decode(str) {
	
	var rv = atob(str);
	rv = escape(rv);
	rv = decodeURIComponent(rv);
	return rv;
}; */
/*
拷贝自: https://s2.ssl.qhres2.com/!dd49acd6/feb/page.js 中 getStreamUrl
*/
function getStreamUrl(str) {
	//return base64Decode(base64Decode(str.split('').reverse().join('')));
	return utils.base64Decode(utils.base64Decode(str.split('').reverse().join('')));
};
/*
 拷贝自: https://s2.ssl.qhres2.com/!dd49acd6/feb/page.js 中
*/
function getSign(id,type_id,timestamp){
	var sign = utils.md5LowerCaseHex(id + type_id + timestamp + 'TtJSg@2g*$K4PjUH');
    return sign.substring(0, 8);
}