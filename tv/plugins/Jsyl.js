/*
*/

function prepareMediaSource(url,params){
  var userId = utils.getUrlHostAndPath(url);
  var params = {
     "token":utils.getConfigPreference("JSYL.token"),
     "uid":userId
  };
  var authToken = utils.getConfigPreference("JSYL.authToken");
  var headers = {
	    "access-token":utils.getConfigPreference("JSYL.accessToken"),
	    "jwt-token":authToken,
	    "Authorization": "Bearer "+authToken,
	    "X-Live-Butter2":utils.getConfigPreference("JSYL.liveButter2"),
	    "times":new Date().getTime(),
	    "platform":Platform,
	    "app-version":AppVersion,
	    "vest-code":VestCode
	};	
	var url = utils.appendUrlParameters("https://notify.uidfhdf.com/OpenAPI/v1/Private/getPrivateLimit",params);
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
	return data.stream.pull_url ;
}

var AppVersion = "2.0.29";
var Platform = "100";
var VestCode = "200";
/*  
   path  : 100
*/
function loadMenus(path,params){
  var p = path.indexOf("/");
  var type = p<0 ? path : path.substring(0,p);
  var page = p<0 ? 1 : parseInt(path.substring(p+1));
  var authToken = utils.getConfigPreference("JSYL.authToken");
  var params = {
				"type": type,
				"flowToken": utils.getConfigPreference("JSYL.token"),
				"latitude":"","latitude":"",
				"page": page,
				"size": 50
				//"order","time"
				//,"t",new js.Date().getTime()
		};
	var headers = {
	    "access-token":utils.getConfigPreference("JSYL.accessToken"),
	    "jwt-token":authToken,
	    "times":new Date().getTime(),
	    "platform":Platform,
	    "app-version":AppVersion,
	    "vest-code":VestCode
	};	
	var url = utils.appendUrlParameters("https://api.jsdn0.xyz/live/studio/list",params);
	var text = utils.httpGetAsString(url,headers);
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
		var title = li.roomTitle || "";
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
		vCh.push({title:title,url:"jsyllive://"+userId});
	}
	return vCh;
//	var authTokenMD5 = utils.md5LowerCaseHex(authToken);
	//text = utils.aesDecode(authTokenMD5.substring(16),authTokenMD5.substring(0,16),text);
//	print(text);
}

