/*
  https://live.jstv.com/
  
  ? https://live.jstv.com/assets/js/924.c4d39ff9.js
   encodeLiveUrl 从 主页面 的 924.c4d39ff9.js 文件中抓取
   
   https://live-hls.jstv.com/livezhuzhan/jsws.m3u8 
     https://live-hls.jstv.com/livezhuzhan/jsws.m3u8?upt=0ae696ff1702897124
   https://live-hls.jstv.com/livezhuzhan/jsgg.m3u8
    
   curl -i  -H "Referer:https://live.jstv.com/" -H "User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "https://live-hls.jstv.com/livezhuzhan/jsws.m3u8?upt="
   
   encodeLiveUrl("https://live-hls.jstv.com/livezhuzhan/jsws.m3u8")
   
   jstvlivezhuzhan@2022cdn!@#124gg&1702911737&/livezhuzhan/jsws.m3u8
   =>b69ce5009b380aede56af90f7433676c
   
   ee0845191702970508
   
*/
function encodeLiveUrl(url){
	var t = url.split("//")
      , n = t[0] + "//" + t[1].split("/")[0]
      , path = url.replace(n, "");
     if( path.includes("?") ){
		 path =  path.split("?")[0];
	 } 
    var a = "jstvlivezhuzhan@2022cdn!@#124gg";
       //i = Number(((new Date).getTime() / 1e3).toFixed()) + 5;
    var time = utils.currentTimeSeconds()+5;
     //  print("time="+time);
// i = 1702971713;      
     var s = a + "&" + time + "&" + path;
     //  console.log("s=%s",s);
      ;
    var md5 = utils.md5LowerCaseHex(s);// h()(s);
      // l = md5.substring(12, 20);
     var upt = md5.substring(12, 20) + time;   // b位 + 10 位
      //, u = ""
      ;
    return  url.includes("?") ? url + "&upt=" + upt : url + "?upt=" + upt;
}


function prepareMediaSource(url){
	var chId = utils.getUrlHostAndPath(url); //"" +
	var headers = {
			Referer: "https://live.jstv.com/"
			//,"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
		};
	return { url :  encodeLiveUrl("https://live-hls.jstv.com/livezhuzhan/"+chId+".m3u8"),
	          headers:headers
	      };
}

/*
  UID, APPID : 进入 https://live.jstv.com/ 页面中
   使用 tokenInfo(localStorage.token)
   获取
*/
/*
var UID="CpCAf0lL49QReFKB8YVGPMZOWM0Lyyz0";  // localStorage.uuid
var APPID="3b93c452b851431c8b3a076789ab1e14";
var PLATFORM="41";
*/
/*
  time : 秒
  buildToken(1702913717)
  buildToken(utils.currentTimeSeconds())
  js 中的关键字: localStorage.token , tokenTrue ,tokenInfo
              JwtAuth/GetWebToken

   https://api-auth-lizhi.jstv.com/JwtAuth/GetWebToken?AppID=3b93c452b851431c8b3a076789ab1e14&TT=-1316064874&Sign=ece7c66db21d7b074c22b97c890d2cd8

           
*/
/*
function buildToken(time){
	var info = {
		"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name":UID,
		"http://schemas.microsoft.com/ws/2008/06/identity/claims/role":"webguest",
		"iss":"ApiAuth",
		"nbf":time,//1702913717,
		"exp":time+900,//1702914617,
		"appid":APPID,//"3b93c452b851431c8b3a076789ab1e14",
		"uid":UID,//"CpCAf0lL49QReFKB8YVGPMZOWM0Lyyz0",
		"platform":"41"
	};
//{"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name":"CpCAf0lL49QReFKB8YVGPMZOWM0Lyyz0","http://schemas.microsoft.com/ws/2008/06/identity/claims/role":"webguest","iss":"ApiAuth","nbf":1702913717,"exp":1702914717,"appid":"3b93c452b851431c8b3a076789ab1e14","uid":"CpCAf0lL49QReFKB8YVGPMZOWM0Lyyz0","platform":"41"}
	var n = JSON.stringify(info);
	/*
	var s = n;
	console.log(s);
	var s = encodeURIComponent(s);
	console.log(s);
	* /
	n = utils.base64Encode(n);//btoa(unescape(encodeURIComponent(n)));
	n = n.replaceAll("+", "-").replaceAll("/", "_");
	return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
	  +n
	  +".kt0n7lqxLYo1D_OAFRA1eC2iL3_cbEu088g9fw_IHuU";
}
*/
/*
Authorization: `Bearer ${localStorage.token}`
t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQ3BDQWYwbEw0OVFSZUZLQjhZVkdQTVpPV00wTHl5ejAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ3ZWJndWVzdCIsImlzcyI6IkFwaUF1dGgiLCJuYmYiOjE3MDI5MTM3MTcsImV4cCI6MTcwMjkxNDYxNywiYXBwaWQiOiIzYjkzYzQ1MmI4NTE0MzFjOGIzYTA3Njc4OWFiMWUxNCIsInVpZCI6IkNwQ0FmMGxMNDlRUmVGS0I4WVZHUE1aT1dNMEx5eXowIiwicGxhdGZvcm0iOiI0MSJ9.kt0n7lqxLYo1D_OAFRA1eC2iL3_cbEu088g9fw_IHuU'
*/
/*
function tokenInfo(t){
	//var t = e || localStorage.token
    var n = t.split(".")[1].replaceAll("-", "+").replaceAll("_", "/");
  	
    // {"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name":"CpCAf0lL49QReFKB8YVGPMZOWM0Lyyz0","http://schemas.microsoft.com/ws/2008/06/identity/claims/role":"webguest","iss":"ApiAuth","nbf":1702913717,"exp":1702914617,"appid":"3b93c452b851431c8b3a076789ab1e14","uid":"CpCAf0lL49QReFKB8YVGPMZOWM0Lyyz0","platform":"41"}
     //return JSON.parse(decodeURIComponent(escape(window.atob(n))))
     return   JSON.parse(utils.base64Decode(n));
}
*/
/*
    console.log(n); //
     //eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQ3BDQWYwbEw0OVFSZUZLQjhZVkdQTVpPV00wTHl5ejAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ3ZWJndWVzdCIsImlzcyI6IkFwaUF1dGgiLCJuYmYiOjE3MDI5MTM3MTcsImV4cCI6MTcwMjkxNDYxNywiYXBwaWQiOiIzYjkzYzQ1MmI4NTE0MzFjOGIzYTA3Njc4OWFiMWUxNCIsInVpZCI6IkNwQ0FmMGxMNDlRUmVGS0I4WVZHUE1aT1dNMEx5eXowIiwicGxhdGZvcm0iOiI0MSJ9
    var s = escape(window.atob(n));
    console.log(s);//
    // %7B%22http%3A//schemas.xmlsoap.org/ws/2005/05/identity/claims/name%22%3A%22CpCAf0lL49QReFKB8YVGPMZOWM0Lyyz0%22%2C%22http%3A//schemas.microsoft.com/ws/2008/06/identity/claims/role%22%3A%22webguest%22%2C%22iss%22%3A%22ApiAuth%22%2C%22nbf%22%3A1702913717%2C%22exp%22%3A1702914617%2C%22appid%22%3A%223b93c452b851431c8b3a076789ab1e14%22%2C%22uid%22%3A%22CpCAf0lL49QReFKB8YVGPMZOWM0Lyyz0%22%2C%22platform%22%3A%2241%22%7D
    s = decodeURIComponent(s);
    console.log(s);
    */
/*
 https://publish-lizhi.jstv.com/nav/8385
*/
/*
function getWebInfo(){
	var headers = {
			Referer: "https://live.jstv.com/",
			//"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
			Authorization:"Bearer "+buildToken(utils.currentTimeSeconds()),
			"Content-Type":"application/json"
		};
	var text = utils.httpGetAsString("https://publish-lizhi.jstv.com/nav/8385",headers,0x401);
	print(text);
}
*/
