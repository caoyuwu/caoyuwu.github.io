
/*
 USER.Seal1226.RefreshToken=51xztxawntk2f435
 USER.Seal1226.AccessToken
*/
var Appid = "b86555215e9e4b67a15260c6a144564a";
var SignMagic = "7db66862-9f2b-420c-b0c3-ac6a5ef2730d";
var X_NS = "0000000000";// "420levuvopj"; // 随机数
var X_ID = "Seal20kdwU29p20K"; // 固定
var DeviceCode = "29f0fc834109719680bb0a27865107ab";
var DeviceName = "HMA-AL00";
var AppServer = "https://app01.posoyo.com";
var accessToken;
function getAccessToken(){
	if( !accessToken )
		 accessToken = utils.getConfigPreference("USER.Seal1226.AccessToken");
	lb_auth:if( accessToken ){
		var authParts = this.AccessToken.split(".");
                if(authParts.length != 3)
                    break lb_auth;
                var payload = JSON.parse(atob(authParts[1])),
                    exp = payload.exp,
                    expT = (new Date()).getTime() / 1000 - exp;
                if(expT < -5)
                {
                    return accessToken;
                }
            //    window.console.log("过期 : " + expT + " 秒");
	}
	// 重新获取:
	var refreshToken = utils.getConfigPreference("USER.Seal1226.RefreshToken");
	if( !refreshToken || refreshToken=="") {
		throw "RefreshToken is null";
	}
	var url = AppServer + "/home/token/refresh/" + refreshToken;
    //window.console.log("重新获取AccessToken %s",url);
    var header = {};
    buildHttpReqHeader(header,false);
    var text = utils.httpPostAsString(
			 url,
			 header,
			 "application/json;charset=utf-8",
			 null,
			 0
			);
//print(text);			
    var ret = JSON.parse(text);
    if(!ret.success ){
		throw ret.error;
	}
	utils.setConfigPreference("USER.Seal1226.RefreshToken",ret.data.refreshToken);
	utils.setConfigPreference("USER.Seal1226.AccessToken",accessToken=ret.data.accessToken);
	return accessToken;
	//ret.data.accessToken;
	//ret.data.refreshToken
}	
function buildHttpReqHeader(headers,addAuth)
    {
        if(addAuth)
            headers.Authorization = "Bearer " + getAccessToken();
        var mDev = {};
        mDev.AppVersion = "30";
        mDev.Client = "User";
        mDev.DeviceCode = DeviceCode;
        mDev.DeviceName = DeviceName;
        mDev.DeviceVersion = "10";
        mDev.Terminal = "Android";
        headers["x-device"] = JSON.stringify(mDev);
        headers["x-device-code"] = DeviceCode;
        headers["x-id"] = X_ID;
        headers["x-ns"] = X_NS;
        var ts = utils.currentTimeSeconds(); 
        //Math.floor((new Date()).getTime() / 1000);
        headers["x-ts"] = "" + ts;
        var s = "k=" + SignMagic + "&ns=" + X_NS + "&ts=" + ts;
         //   getMd5Url = "https://api.hashify.net/hash/md5/hex?value=" + encodeURIComponent(s);
        //window.console.log(getMd5Url);
        //var retV = Xjs.Ajax.get("https://api.hashify.net/hash/md5/hex?value=" + encodeURIComponent(s)),
         //   md5 = retV.Digest;
        //window.console.log("%s  : %s",s,md5);
        headers["x-sign"] = utils.md5LowerCaseHex(s);
        headers["User-Agent"] = "okhttp/4.10.0";
 };	
	
/*
  
*/	
function prepareMediaSource(url,params){
	var channel = utils.getUrlHostAndPath(url);
	var url = AppServer + "/live/token/play?roomNum=" + channel;
       // window.console.log("url=" + url);
    var header = {};
     buildHttpReqHeader(header,true);
     var text = utils.httpGetAsString(
			 url,
			 header,
			 0
			);
//print(text);				
    var ret = JSON.parse(text);
    if(!ret.success ){
		throw ret.error;
	}
	//ret.data.token , ret.data.uid
	return "browser-http://caoyuwu.eu.org/video/AgoraPlay.html#?"
	  +"appid="+Appid
	  +"&channel="+channel
	  +"&token="+encodeURIComponent(ret.data.token)
	  +"&uid="+ret.data.uid
	  ;
}

/*
   seal1226-list://Source=2&CategoryId
*/
function loadMenus(url,params){
	var path = utils.getUrlHostAndPath(url);
	var p = path.indexOf("/");
	var Source,CategoryId;
	if( p>=0 ){
		Source = path.substring(0,p);
		CategoryId = path.substring(p+1);
	} else
	{
		Source = 2; CategoryId = path;
	}
	var url = AppServer+"/live?Source="+Source+"&CategoryId="+CategoryId+"&PageSize=20&PageIndex=1";
	var header = {};
    buildHttpReqHeader(header,true);
    var text = utils.httpGetAsString(
			 url,
			 header,
			 0
			);
//print(text);				
    var ret = JSON.parse(text);
    if(!ret.success ){
		throw ret.error;
	}
	var vCh = [];
	if(ret.data && ret.data.rows) for(var i=0;i < ret.data.rows.length;i++){
		var li = ret.data.rows[i];
		var title = li.roomTitle;
		if(li.area)
        {
                title += "-" + li.area;
        }
        if(li.payPrice != null)
            title += "-" + li.payPrice; 
		vCh.push({title:title,url:"seal1226:"+li.roomNum});
	}
	return vCh;
}




