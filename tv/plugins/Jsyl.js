/*
  http://www.caoyuwu.top/tv/plugins/Jsyl.js
  参考：
   JsylLiveService
*/

/*
  String token; // studio/list 中 flowToken 获取
	     String accessToken; // 登录信息, Header 中获取
	     // jwtToken == authToken
		 String authToken , liveButter2;
	String server1URL, // server1URL = "https://api.jsdn0.xyz/";
		 server2URL,  // server2URL = "https://notify.hhnt.xyz/";
	 	   websocketURL; // "wss://cywqfzo8.shdkw1o.com/ws";	 
 */
var JSYL_Settings = null;
function getSettings() {
	if( !JSYL_Settings ){
		/*
		 * http://www.caoyuwu.top/vlive/jsyl/Settings.json
		 */
		var url = utils.toAbsoluteURL(_scriptURL,"../../vlive/jsyl/Settings.json");
		
		var text = utils.httpGetAsString(url,{});
	//print("text="+text);	
		var data = eval(text);
		JSYL_Settings = data[0];
	//print("JSYL_Settings="+JSON.stringify(JSYL_Settings));
		if( !JSYL_Settings.server1URL ){
			JSYL_Settings.server1URL = "https://api.jsdn0.xyz/";
		}
		if( !JSYL_Settings.server2URL ){
			JSYL_Settings.server2URL = "https://notify.hhnt.xyz/";
		}
		if( !JSYL_Settings.websocketURL ){
			JSYL_Settings.websocketURL = "wss://cywqfzo8.shdkw1o.com/ws";
		}
	}
	return JSYL_Settings;
}

function getSetting(name){
	return getSettings()[name];
}

function prepareMediaSource(url,params){
  var userId = utils.getUrlHostAndPath(url);
  var params = {
     "token":getSetting("token"),//utils.getConfigPreference("JSYL.token",JSYL_token),
     "uid":userId
  };
  var authToken = getSetting("authToken");//utils.getConfigPreference("JSYL.authToken",JSYL_authToken);
  var headers = {
	    "access-token":getSetting("accessToken"),//utils.getConfigPreference("JSYL.accessToken",JSYL_accessToken),
	    "jwt-token":authToken,
	    "Authorization": "Bearer "+authToken,
	    "X-Live-Butter2":getSetting("liveButter2"),//utils.getConfigPreference("JSYL.liveButter2",JSYL_liveButter2),
	    "times":new Date().getTime(),
	    "platform":Platform,
	    "app-version":AppVersion,
	    "vest-code":VestCode
	};	
  // "https://notify.uidfhdf.com/
	var url = utils.appendUrlParameters(getSetting("server2URL")+"OpenAPI/v1/Private/getPrivateLimit",params);
	var text = utils.httpGetAsString(url,headers);
	//print(text);
	var authTokenMD5 = utils.md5LowerCaseHex(authToken);
	text = utils.aesDecode(authTokenMD5.substring(16),authTokenMD5.substring(0,16),text);
	//print(text);
	var data = JSON.parse(text);
	if( data.code ){
	   throw data.code+":"+data.msg;
	}
	data = data.data;
	if( !data.stream )
		return null;
	
	return data.stream.pull_url ;
}

var AppVersion = "3.9.7";//"2.0.29";
var Platform = "100";
var VestCode = "200";

/*  
   path  : 100 100/1
        "200:热门",
		"100:颜值",
		"300:收费",
		"500:附近",
		"400:海外",
*/
function loadMenus(path,params){
  var p = path.indexOf("/");
  var type = p<0 ? path : path.substring(0,p);
  var page = p<0 ? 1 : parseInt(path.substring(p+1));
 // var authToken = utils.getConfigPreference("JSYL.authToken",JSYL_authToken);
  var authToken = getSetting("authToken");//
  var params = {
				"type": type,
				"flowToken": getSetting("token"),//utils.getConfigPreference("JSYL.token",JSYL_token),
				"latitude":"","latitude":"",
				"page": page,
				"size": 50
				//"order","time"
				//,"t",new js.Date().getTime()
		};
	var headers = {
	    "access-token":getSetting("accessToken"),//utils.getConfigPreference("JSYL.accessToken",JSYL_accessToken),
	    "jwt-token":authToken,
	    "times":new Date().getTime(),
	    "platform":Platform,
	    "app-version":AppVersion,
	    "vest-code":VestCode
	};	
	var url = utils.appendUrlParameters(getSetting("server1URL")+"live/studio/list",params);
	var text = utils.httpGetAsString(url,headers,0x400); // 0x80 : 代理  
	print(text);
	var data = JSON.parse(text);
	if( data.code ){
	   throw data.code+":"+data.msg;
	}
	data = JSON.parse(data.data);
	if( data.code ){
	   throw data.code+":"+data.msg;
	}
	var list = data.data.list;
	var vCh = [];
	for(var i=0;i<list.length;i++){
	    var li = list[i];
	    var userId = li.id;
		//	r.roomId = li.curroomnum;
		var userName = li.nickname;
		var title = li.nickname;//li.roomTitle || "";
		if( li.roomTitle )
		  title += "-"+li.roomTitle;
		var province = li.province;
		var city = li.city;
		var online = li.online;
		if( province && province!="保密") {
			title += "-"+	province;
		}
		if( city && city!="保密") {
			title += "-"+	city;
		}
		if( online>0 ) {
			title += "-("+	online+")";
		}
	//print(title+","+userId);	
		vCh.push({title:title,url:"jsyllive://"+userId,msgSocketArgs:[userId]});
	}
	return vCh;
//	var authTokenMD5 = utils.md5LowerCaseHex(authToken);
	//text = utils.aesDecode(authTokenMD5.substring(16),authTokenMD5.substring(0,16),text);
//	print(text);
}

//var  _msgSocketStarted = -1;

function onWebSocketEvent(id,type,msg,code){
	//utils.onMessage("测试",_msgUserId+"-"+type+":"+msg);
	switch( type ){
		case "onopen":
			utils.onMessage(null,id+"-消息打开");
			break;
		case "onclose":
			utils.onMessage(null,id+"-消息关闭");
			break;
		case "onerror":	
			utils.onMessage("错误",code+":"+msg);
			break;
		case "onmessage":
			//utils.onMessage("消息",_msgUserId+"-"+msg);
			onWebSocketMessage(id,msg);
			break;
	}
}
function onWebSocketMessage(id,s){
	 m = JSON.parse(s);
	 if( m.type )switch( m.type ){
	 	case "ping":
	 		if( _msgWebSocket ){
	 			_msgWebSocket.send(JSON.stringify({"device":"android","_method_":"pong"}));
	 		}
	 		break; 
	 	case "login_ok":
	 		utils.onMessage("登录",id+"-登录成功");
	 		break;
	 	case "onLineClient":
	 		break;
	 	case "legend_hall_win":
	 		break;
	 	case "sendGiftNews":
	 		utils.onMessage(m.title,m.fromUserDesc+m.fromUserName+"=>"+m.toUserName+" : "+m.giftName);
	 		break;
	 	case "sendGift":
	 		utils.onMessage(m.from_client_name+"的礼物",m.giftName);
	 		break;
	 	case "SendPubMsg":
	 		utils.onMessage(m.from_client_name,m.content);
	 		break;
	 	case "toy":
	 	case "peerage_join":
	 	case "peerage_login":
	 	case "nameCardNews":
	 	case "chargeTimeRoom":
	 		break;
	 	case "changeRoomNotice":
		case "sysmsg.alert":
		case "sysmsg":
			//break;
		case "error":
		case "error.token":
		case "error.kicked":
			utils.onMessage(m.title,m.content);
			break;
	 }
}
//var _msgSocketInv = 0;

var _msgWebSocket ; 

function startMessage(userId,s){
/*
utils.onMessage(null,userId+" startMessage-userId="+userId+",s="+s
  +",_msgSocketInv="+_msgSocketInv
  +",_onInterval="+this._onInterval
  +",setInterval="+this.setInterval
  +",WebSocket="+this.WebSocket
  +",JSON="+this.JSON
  );
  */
	if( s==0 ){
		s = _msgWebSocket ? -1 : 1;//_msgSocketInv<20 ? 1 : -1;
	} 
	if( s>0 ){
		//if( _msgSocketInv!=null )
		//	return;
		if( _msgWebSocket ){
			if( _msgWebSocket.getId()==userId ){
				return;
			}
			try { _msgWebSocket.close();} catch( e ){}
			_msgWebSocket = null;
		}
		var url = getSetting("websocketURL")+"?jwt_token="+getSetting("authToken");
		//utils.onMessage(null,userId+"-打开WS: "+url);
		_msgWebSocket = utils.newJWebSocket(userId,url);
		//_msgWebSocket.userId = userId;
		//_msgUserId = userId;
		//utils.onMessage(null,userId+"-开始消息-"+_msgSocketInv);
		//_msgSocketInv = 1;//setInterval(_onInterval,3000);
		//utils.onMessage(null,userId+"- _msgSocketInv="+_msgSocketInv);
	} else if( _msgWebSocket )
	{
		try { _msgWebSocket.close();} catch( e ){}
		_msgWebSocket = null;
		//clearInterval(_msgSocketInv);
		//_msgSocketInv = 0;
		//utils.onMessage(null,userId+"-消息关闭");
		//utils.onMessage("_cmd","closed");
		//utils.onMessage("_cmd","clear");
	}
}



