/*
https://www.yangshipin.cn/#/tv/home?pid=600001859
POSR https://player-api.yangshipin.cn/v1/player/get_live_info

JS 跟踪:
  根据  get_live_info 中请求关键字, 查找 关键代码
  
AES 加密:
  key = 48e5918a74ae21c972b90cce8af6c8be
  iv =  9a7e7d23610266b1d9fbf98581384d92   
    
例子:
t=2000210103, e=1704426734, r=V1.0.0, n=lqce65cx_pbamyg8qwje, i=5910204
C1=|1607206872|2000210103|1704426734|mg3c3b04ba|V1.0.0|lqce65cx_pbamyg8qwje|5910204|https://www.yangshipin.c|mozilla/5.0 (windows nt ||Mozilla|Netscape|Win32|
Al=48e5918a74ae21c972b90cce8af6c8be,kl=9a7e7d23610266b1d9fbf98581384d92
返回值=--012D35F1AB522EDA4F2FBF70FBFCF44E96AB98D11FDF2B4C02E6B9EC2808CD1A0FC3705CB123E16C1D280EC8A2B231A825425D1413E44375155B02B1488442A8CBE8C70EE39DE80159E1DEE1648966786B13C482EA8014E998055650568C9039F972B0F0503164A66577C9B0AB4EC56E3D63B031063BA720AB695ECB234F0F5E38900110E6040AE9CD658D6E171438971BD24DA3C624C97EAB3FC3B85946549958
    
*/



var APP_VER = "V1.0.0";
var GUID="lqce65cx_pbamyg8qwje";
var MAGIC = "mg3c3b04ba";
var PLATFORM = "5910204";
var CKey_AESKEY = "48e5918a74ae21c972b90cce8af6c8be";
var CKey_AESIV = "9a7e7d23610266b1d9fbf98581384d92";

var SIG_MAGIC = "0f$IVHi9Qno?G";

var GR_USER_ID = "d82407bd-ebd0-41a1-a146-f151634b9032";

function buildCKey(url,cnlid){
	var time = utils.currentTimeSeconds();
//time = 1704445490;	
	var s =  "|"+cnlid //2000210103
	        +"|"+time
	        +"|"+MAGIC // mg3c3b04ba
	        +"|"+APP_VER
	        +"|"+GUID  //lqce65cx_pbamyg8qwje
	        +"|"+PLATFORM
	        +"|"+url.substring(0,24)
	        +"|"+WEB_UserAgent.toLowerCase().substring(0,24)
	        +"|"
	        +"|"+WEB_AppCodeName
	        +"|"+WEB_AppName
	        +"|"+WEB_Platform
	        +"|";
	s = "|"+stringHashCode(s)+s;
	//print(s);       
	return "--01"+utils.aescbcEncrypt(CKey_AESIV,CKey_AESKEY,s,{"iv.encoding":"hex","key.encoding":"hex","result.encoding":"HEX"}); 
}

/*
 cnlid/pid
 yangshipin:2000210103/600001859
*/
function prepareMediaSource(url,params){
	var path = utils.getUrlHostAndPath(url); // 600001859
	var p = path.indexOf("/");
	if( p<0 ) {
		/*
		  获取信息主要根据 cnlid, pid 好像不重要, 缺省使用 CCTV1-600001859
		  关键: VIP 没有权限
		*/
		p = path.length;
		path += "/600001859"; 
		 //return null;
	}
	var pid = path.substring(p+1), 	cnlid =  path.substring(0,p);
	var wurl = "https://www.yangshipin.cn/#/tv/home?pid="+pid;
	var cKey = buildCKey(wurl,cnlid);
	//print(cKey);
	var req = {
            cnlid: cnlid,
            livepid: pid,
            stream: "2",//i || "",
            guid: GUID,
            cKey: cKey,
            adjust: 1,
            sphttps: "1",
            platform: PLATFORM,
            cmd: "2",
            encryptVer: "8.1",
            dtype: "1",
            devid: "devid",
            otype: "ojson",
            appVer: APP_VER,
            app_version: APP_VER,
            rand_str: randonStr(),
            channel: "ysp_tx",
    		sphttps:"1",
    		defn: "fhd"       
       };
       var reqNames = [];
       for( var name in req){
		   reqNames.push(name);
	   }
       reqNames.sort();
       var s = "";
       for(var i=0;i<reqNames.length;i++){
		   var name = reqNames[i];
		   var val = req[name];
		   if( val instanceof Array ) val = val.join();
		   if( i ) s += "&";
		   s += name+"="+decodeURI(val);
	   }
	   s += SIG_MAGIC;
	  // print("MD5原文 "+s);
	   var signature = utils.md5LowerCaseHex(s);
	//   print("signature="+signature);
	   req.signature = signature;
	   var cookie =  "guid="+GUID+"; "
	                 +"gr_user_id="+GR_USER_ID+"; "
	                 +"versionName=99.99.99; versionCode=999999; vplatform=109; platformVersion=Chrome; deviceModel=120; seqId=111111; "
	                 +"request-id=999999"+randonStr()+utils.currentTime();
       var header = {
		   "Yspappid":"519748109",
		   "Content-Type": "application/json;charset=UTF-8",
		   "Referer":"https://www.yangshipin.cn/",
		   "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
		   "Cookie":cookie
	   };
  
	  var text = utils.httpPostAsString(
		  "https://player-api.yangshipin.cn/v1/player/get_live_info",
		  header,
		  null,
		  req,
		  0x400
	  ); 
// print(text);
	  var retVal = JSON.parse(text);
	  if( retVal.code!=0 ){
		  return null;
	  }
	  var data = retVal.data;
       var url ;
	  if( url=data.playurl ){
		  var chanll = JSON.parse(data.chanll).code;
		  chanll = utils.base64Decode(chanll);
		  /*
		 var des_key = "Rd/ieE5JUUZ2kQjif3TH6w==";        
 var des_iv = "OseH0V06jHU=";    
		  */
		  var regex = /var des_key = "([^"]+).+var des_iv = "([^"]+)/;
		  var regV = regex.exec(chanll);
		  if( regV.length==3 ){
			  var des_key = regV[1], des_iv = regV[2];
			  //print("des_key="+des_key+",des_iv="+des_iv);
			  url += "&revoi="+encryptTripleDES(pid,des_key,des_iv);
		  }
		  return  { url:url,headers:data.http_header};
	  }
	  /*
	  cctv3 : 2000203803/600001801
	  {
    "code": 0,
    "msg": "ok",
    "data": {
        "code": 25,
        "errinfo": "无登录信息",
        "iretcode": 25,
        "iretdetailcode": 0,
        "message": "无登录信息"
    }
		}	
	  */
	  if( data.code && data.errinfo ){
		  throw data.errinfo;
	  } 
	  return null;
}

function randonStr(t) {
 // return "0000000000";	
        t = t || 10;
        for (var e = "ABCDEFGHIJKlMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = e.length, n = "", i = 0; i < t; i++)
            n += e.charAt(Math.floor(Math.random() * r));
        return n
  };

function stringHashCode(s){
	var h = 0;
	for(var i=0;i<s.length;i++){
		// 31 * h + getChar(value, i);
		h = (h << 5) - h + s.charCodeAt(i);
		h &= h;
	}
	return h;
}

function encryptTripleDES(pid,key,iv){
	var opts = {
		"iv.encoding":"base64",
		"key.encoding":"base64","key.minLen":24,
		"result.encoding":"HEX"
	};
	var curl = "https://www.yangshipin.cn/#/tv/home?pid="+pid;
	var cref = "";//https://www.yangshipin.cn/#/tv/home?pid="+pid;
	//var canvas = "YSPANGLE(Apple,AppleM1Pro,OpenGL4.1)";
	var canvas = "YSPANGLE(Intel,Intel(R)Iris(R)XeGraphics(0x0000A7A0)Direct3D11vs_5_0ps_5_0,D3D11)";
	var plain = {         
		   mver: "1",          
		subver: "1.2",         
   		host: getStrByUrl(curl),      
        referer: getStrByUrl(cref),       
        canvas: canvas //getCanvas()  
     };  
	//var message = "123456";
	var message = JSON.stringify(plain);    
//print(message);	    
	return utils.encrypt("DESede/CBC/PKCS7Padding",iv,key,message,opts );
}

function getStrByUrl(url)
{ 
	url = url.replace('http://', ''); 
    url = url.replace('https://', '');       
    if (url.length>32){  
		url = url.substr(0,32);      
    }
   return url;   
} 
          

