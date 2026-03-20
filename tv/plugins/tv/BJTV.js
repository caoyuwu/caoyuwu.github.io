/*
http://caoyuwu.eu.org/tv/plugins/tv/BJTV.js
https://www.btime.com/btv/btvsy_index
scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/tv/BJTV.js router:/www/tv/plugins/tv/
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

/*
  @bjtv-list://live
  @bjtv-list://btv
  @bjtv-list://btvprogram
*/
function loadMenus(url,params){
	var path = utils.getUrlHostAndPath(url);
	var html = utils.httpGetAsString("https://www.btime.com/"+path,0x408);
				var p1 = html.indexOf("layoutData: {");
				var p2 = p1<0 ? -1 : html.indexOf("firstInfoflow:",p1+13);
				var p3 = p1<0 ? -1 : html.indexOf("columnData:",p1+13);//columnData:
				if( p3>0 && p3<p2 ) p2=p3;
				if( p2<0 ) return null;
				print("p1 = "+p1+" , p2="+p2);	
				var json = html.substring(p1+12,p2).trim();
				if( json.charCodeAt(json.length-1)==44 ){
					json = json.substring(0,json.length-1);
				}
			//	print(json);
				var m = JSON.parse(json);
				/*
				modules[0] -> modules[0][0] -> data -> news[0] -> gid  = 55nkclfoqo88dc86uk5qg6rj3il
			    modules[0] -> modules[0][0] -> data -> news[0] -> data -> title  = 2025-26中国排球超级联赛：河南 vs 北京北冰洋
				*/
				var items = [];
				for( var modules1 of m.modules) {
					if(modules1.modules)for( var modules2 of modules1.modules) {
						for( var modules3 of modules2) {
							if(modules3.data.news) for(var news of modules3.data.news ){
								var gid = news.gid;
								var title = news.data.title;
								items.push({title:title,url:"bjtv://"+gid,msgSocketArgs:[gid]});
							}
						}
					}
				}
	return items;			
}

function onWebSocketEvent(id,type,msg,code){
	//utils.onMessage("测试",type+":"+msg);
	switch( type ){
		case "onopen":
			onWebSocketOpen(id);
			break;
		case "onclose":
			utils.onMessage(null,id+"-消息关闭");
			if( _msgWebSocket && _msgWebSocket.getId()==id ){
				_msgWebSocket = null;
			}
			break;
		case "onerror":	
			utils.onMessage("错误",code+":"+msg);
			break;
		case "onmessage":
			//utils.onMessage("消息",id+"-"+msg);
			onWebSocketMessage(id,msg);
			break;
		case "onbinmessage":
			onWebSocketBinMessage(id,msg);
				break;
	}
}

function onWebSocketOpen(id){
	utils.onMessage(null,id+"-消息打开");
	/*
	header: {
	                    version: 1,
	                    sequence: l,
	                    type: 1,
	                    request: {
	                        service: chat,
	                        method: login,
	                        one_way: false
	                    }
	                },
	*/
	var header = "080110adbeb6fdf95a1801220f0a046368617412056c6f67696e1800";
	/*
	header 是 使用 Protobuf 生成的， 格式如上， 其中  sequence 随机， 其他固定。 这里sequence固定使用抓包获取的， 
	*/
	_msgWebSocket.sendBytesByHex(header);
	var m = {
			os_type:"pc",
			room_id:id,
		   guid:"f08a1b0a-aaf2-41f3-931c-49f4819fe5ae",
			protocol:1,
			chat_type:1
		};
	_msgWebSocket.send(JSON.stringify(m));
}

function onWebSocketMessage(id,s){
	/*
	  JSON.parse 处理  "\u5317\ 有问题
	*/
	var  m =  JSON.parse(s);
	_onMessage(m);
	
}
function _onMessage(m){
	if( !m ) return;
	//print("onWebSocketMessage m="+m);
	/*
	m.type==1 : 聊天；6:来了； 5: 点亮
	*/
		if( m.chat_type==1 && m.content && m.sender && m.sender.nick_name 
			&& m.type==1
			//&& m.content!="来了"
			
		){
			utils.onMessage(m.sender.nick_name,m.content);
		} /*
		else if( m.chat_type==1 && m.msg && m.nick_name ){
			utils.onMessage(m.nick_name,m.msg);
		} */
}
function onWebSocketBinMessage(id,a){
	//var dec = new TextDecoder("utf-8");  //a [object ArrayBuffer]; true
	//print("onWebSocketBinMessage:a="+a+"; "+( a instanceof ArrayBuffer));
	 var s = utils.newString(a);// dec.decode(buf);//new Uint8Array(buf));
	// print("onWebSocketBinMessage:s="+s);
	 if( s.length>2 &&  s.charCodeAt(0)==123 && s.charCodeAt(s.length-1)==125 )   // {}
	 {
	    var m = utils.tryJsonDecode(s);
	//	print("onWebSocketBinMessage:m="+m);
		_onMessage(m);
	 }
}

var _msgWebSocket ; 

function startMessage(id,s){
	//utils.onMessage(null,"startMessage:id="+id+",s="+s);
	if( s==0 ){
		s = _msgWebSocket ? -1 : 1;//_msgSocketInv<20 ? 1 : -1;
	} 
	if( s>0 ){
		//if( _msgSocketInv!=null )
		//	return;
		if( _msgWebSocket ){
			if( _msgWebSocket.getId()==id ){
				return;
			}
			try { _msgWebSocket.close();} catch( e ){}
			_msgWebSocket = null;
		}
		var url = "wss://kite.btime.com/";
		//utils.onMessage(null,id+"-打开WS: "+url);
		var headers = {"Origin":"https://item.btime.com"};
		_msgWebSocket = utils.newJWebSocket(id,url,headers);
	} else if( _msgWebSocket )
	{
		try { _msgWebSocket.close();} catch( e ){}
		_msgWebSocket = null;
		
	}
}
