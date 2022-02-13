/*
  http://www.caoyuwu.top/tv/plugins/Jsyl.js
*/
var JSYL_token = "7d6f38335b9c0efa2d034c8782df13cd";
var JSYL_authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJzdWIiOiIzOTE0NDM2OSIsInVzZXJuYW1lIjoiKzEzNjM5MTQwNSIsInJvbGUiOjAsImxvYiI6MSwiaWF0IjoxNjQ0NzM2MDc0LCJleHAiOjE2NDczMjgwNzR9.fj--2uIg9h7of2vWgW_aXyck9Amck4Va4rWzQlkyX-RCysSkBW0a298SNzDoRU58FGMZVb78VzIsJNBXdkaGVg";

var JSYL_accessToken = "c515f632-5858-4b99-86b3-c20a3c0ecb2f";
var JSYL_liveButter2 = "YxE4NA+07NjzfqbSEcFMk+QGYlRdlFydY0q8Cbq6W4fKDuqCjw2bj3wSpASCBMN6lR6mSQBc66LfkTzEWe2KyHuQephq1P4difqyiuUrYXtxvlSxBvbeKy6I9GfOQgtAmOZm4Uw1uRRBVODVQfTDlsA8jLo61xhVEvQBSMBF9Ol5VMwaG26VKONqmXUn+y6z4mwQxFBb20nxHBmmxvBWdniIsX/FPwQI/mafnfp8AdI=";

function prepareMediaSource(url,params){
  var userId = utils.getUrlHostAndPath(url);
  var params = {
     "token":utils.getConfigPreference("JSYL.token",JSYL_token),
     "uid":userId
  };
  var authToken = utils.getConfigPreference("JSYL.authToken",JSYL_authToken);
  var headers = {
	    "access-token":utils.getConfigPreference("JSYL.accessToken",JSYL_accessToken),
	    "jwt-token":authToken,
	    "Authorization": "Bearer "+authToken,
	    "X-Live-Butter2":utils.getConfigPreference("JSYL.liveButter2",JSYL_liveButter2),
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
  var authToken = utils.getConfigPreference("JSYL.authToken",JSYL_authToken);
  var params = {
				"type": type,
				"flowToken": utils.getConfigPreference("JSYL.token",JSYL_token),
				"latitude":"","latitude":"",
				"page": page,
				"size": 50
				//"order","time"
				//,"t",new js.Date().getTime()
		};
	var headers = {
	    "access-token":utils.getConfigPreference("JSYL.accessToken",JSYL_accessToken),
	    "jwt-token":authToken,
	    "times":new Date().getTime(),
	    "platform":Platform,
	    "app-version":AppVersion,
	    "vest-code":VestCode
	};	
	var url = utils.appendUrlParameters("https://api.jsdn0.xyz/live/studio/list",params);
	var text = utils.httpGetAsString(url,headers,0x480);
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
		vCh.push({title:title,url:"jsyllive://"+userId});
	}
	return vCh;
//	var authTokenMD5 = utils.md5LowerCaseHex(authToken);
	//text = utils.aesDecode(authTokenMD5.substring(16),authTokenMD5.substring(0,16),text);
//	print(text);
}

