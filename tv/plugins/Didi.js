/*
  http://caoyuwu.eu.org/tv/plugins/Didi.js
  参考：
   DidiLiveService
  app下载:
    https://xhm.live 
    https://github.com/XHM6/1
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
var DIDI_Settings = null;
function getSettings() {
	if( !DIDI_Settings ){
		/*
		 * http://caoyuwu.eu.org/vlive/didi/Settings.json
		 */
		var url = utils.toAbsoluteURL(_scriptURL,"../../vlive/didi/Settings.json");
		
		var text = utils.httpGetAsString(url,{});
	//print("text="+text);	
		var data = eval(text);
		var s = DIDI_Settings = data[0];
		/*
		 * 小红帽中： https://notify.hhnt.xyz/OpenAPI/v1/config/getappconfig
		      https://q6icqldt.mascotones.com/OpenAPI/v1/config/getappconfig
		 *   获取
		 */
	//print("DIDI_Settings="+JSON.stringify(DIDI_Settings));
		if( !s.serverHost ) {
			s.serverHost = "q6icqldt.mascotones.com";
		}
		if( !s.serverURL ){
		    // GET live/studio/list
			s.serverURL = "https://"+s.serverHost+"/OpenAPI/v1/";
		}
		if( !s.websocketURL ){
			//DIDI_Settings.websocketURL = "wss://cywqfzo8.shdkw1o.com/ws";
			s.websocketURL = "wss://"+s.serverHost+"/ws"; //小红帽中抓取的
		}
	}
	return DIDI_Settings;
}

function getSetting(name){
	return getSettings()[name];
}

/*
   * opts#1 : 不需要  Authorization
	 * opts#2 : 需要  LiveButter2
	 * opts#4 : 内容需要解密
*/
function httpGet(path,params,opts){
	var url = utils.appendUrlParameters(getSetting("serverURL")+path,params);
    //"Private/getPrivateLimit",params);
    var authToken = getSetting("authToken");
    var liveButter2 = getSetting("liveButter2");
    var header = {};//"Authorization", this.authToken);
		if( authToken && !(opts&1) )
			header.Authorization = "Bearer "+authToken;
		if( opts&2 ) {
			header["X-Live-Butter2"] = liveButter2;
		}
	var text = utils.httpGetAsString(url,header);
//print(text);
	if( opts&4 ){
	var authTokenMD5 = utils.md5LowerCaseHex(authToken);
	text = utils.aesDecode(authTokenMD5.substring(16),authTokenMD5.substring(0,16),text);
	}
print(text);
//utils.onMessage(null,text);
	return JSON.parse(text);
}
/*
  didilive://1536065711/68007597
*/
var bkMediaSource = {};
function prepareMediaSource(url,params){
  var userId = utils.getUrlHostAndPath(url);
  var p = userId.indexOf("/");
  if( p>0 ){
	  // roomId = userId.substring(0,p);
	  userId = userId.substring(p+1);
  }
  var params = {
     //"token":getSetting("token"),//utils.getConfigPreference("DID.token",JSYL_token),
     "uid":userId
  };
  
	var data = httpGet("private/getPrivateLimit",params,2|4);
	if( data.code ){
	   throw data.code+":"+data.msg;
	}
	data = data.data;
	if( !data.stream )
		return null;//bkMediaSource[userId];
	//data.stream.pull_url;
	return  data.stream.pull_url ; //bkMediaSource[userId] =
}

var AppVersion = "1.12.2";//"2.0.29";
//var Platform = "100";
//var VestCode = "200";

/*  
   path  : 100 100/1
       "hot:热门",//
		"latest:最新", //
		"nearby:附近", //
		"vegan", //
		"vip:收费",//
		"lounge"
*/
function loadMenus(url,params){
	var path = utils.getUrlHostAndPath(url);
  var p = path.indexOf("/");
  var type = p<0 ? path : path.substring(0,p);
  var page = p<0 ? 1 : parseInt(path.substring(p+1));
 // var authToken = utils.getConfigPreference("JSYL.authToken",JSYL_authToken);
	var params = {
				page:page,
				size:50,
				order:"time",
				isPk:0
				//,"t",new js.Date().getTime()
				};
	var data = httpGet("anchor/"+type,params,2);
	if( data.code ){
	   throw data.code+":"+data.msg;
	}
	/*data = data.data;
	if( data.code ){
	   throw data.code+":"+data.msg;
	} */
	var list = data.data.list;
	var vCh = [];
	if(list) for(var i=0;i<list.length;i++){
	    var li = list[i];
	    var userId = li.id;
		var roomId = li.curroomnum;
		var userName = li.nickname;
		var title = li.nickname;//li.roomTitle || "";
		if( li.roomTitle )
		  title += "-"+li.roomTitle;
		var province = li.province;
		var city = li.city;
		var online = li.online;
		var lim = li.limit;
		if( province && province!="保密") {
			title += "-"+	province;
		}
		if( city && city!="保密") {
			title += "-"+	city;
		}
		if( online>0 ) {
			title += "-("+	online+")";
		}
		if( lim ) {
		   //prerequisite =  lim.prerequisite 
		   //lim.ptname
		}		
//print(title+","+userId);	
		vCh.push({title:title,url:"didilive://"+roomId+"/"+userId,msgSocketArgs:[roomId+"/"+userId]});
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
			//utils.onMessage("消息",_msgUserId+"-"+msg);
			onWebSocketMessage(id,msg);
			break;
	}
}
function onWebSocketOpen(id){
	utils.onMessage(null,id+"-消息打开");
	var p = id.indexOf("/");
	if( p<=0 )
		return;
	var roomId = id.substring(0,p);
	
	var m = {
			"_method_":"BindUid",
			"device_id": getSetting("device_id"),
			"issued":"pusher",//"lite",
			"jwt_token":getSetting("authToken"),
			"lob":1,
			"plat":"android",
			"rid":1,
			"user_id":getSetting("user_id"),
			"ver":AppVersion//"1.9.8.2"
	};			
	_msgWebSocket.send(JSON.stringify(m));
	var t0 = utils.currentTime();
	m = {
			"_method_":"login",
			"avatartime": ""+(Math.floor(t0/1000)),
	    	"device_id": getSetting("device_id"),//settings.device_id,
			"jwt_token":getSetting("authToken"),//settings.authToken,
	    	"levelid": "0",
	    	"prompt_time":""+t0,
	    	"rollmsg_time":""+t0,
	    	"room_id":roomId,// 
			"user_id":getSetting("user_id"),
			"user_name":getSetting("user_name")	
	};
	//utils.onMessage(null,JSON.stringify(m));	
	_msgWebSocket.send(JSON.stringify(m));
	
}

function onWebSocketMessage(id,s){
	 m = JSON.parse(s);
	 //utils.onMessage("m.type",""+m.type);
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

function startMessage(id,s){
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
			if( _msgWebSocket.getId()==id ){
				return;
			}
			try { _msgWebSocket.close();} catch( e ){}
			_msgWebSocket = null;
		}
		var url = getSetting("websocketURL")+"?jwt_token="+getSetting("authToken");
		//utils.onMessage(null,userId+"-打开WS: "+url);
		_msgWebSocket = utils.newJWebSocket(id,url);
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



