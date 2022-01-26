
/*
https://www.mgtv.com/b/../XXXXX.html  => mgtv://XXXXX
英雄本色, mgtv://4297356
*/

var TAG = "MGTVMediaDataSourcePrepare";
var APIURL = "http://pcweb.api.mgtv.com";
var _DID="f94c162f-bcaa-4bbf-ab3e-13213288ea9c";
var _SUUID="b4cb73e4-a2a3-4249-a8ff-d62cb8d00e34";
var HttpUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36";
  

function prepareMediaSource(url,params){
   var filebitrate = 795;
	var videoId = ""+utils.getUrlHostAndPath(url);
// 标清:584, 高清:795, 超清:1392,蓝光:3328
        var did = ""+utils.getConfigPreference("MGTV.DID",_DID);
        var suuid = ""+utils.getConfigPreference("MGTV.SUUID",_SUUID);
 print("did="+did+",suuid="+suuid);       
        var header ={
        	 "User-Agent":HttpUserAgent,
        	"Referer":"https://www.mgtv.com/.html"
        	};
        var queryParams;// = new java.util.LinkedHashMap<>();
        var type = "pch5";
        var _support = "10000000";
        {
            var pno = "1030";
            var cxid = "";
            var timestamp = utils.currentTimeSeconds();//System.currentTimeMillis()/1000;
            var tk2S = "did="+did+"|pno="+pno+"|ver=0.3.0301|clit="+timestamp;
          var tk2 =  ""+utils.base64Encode(tk2S);
             //Base64.encodeToString(tk2S.getBytes(StandardCharsets.UTF_8),Base64.NO_WRAP)//.trim()
   /*{
     var s = "abc+++11///22===xyz";
     s = reverseAndReplaceB64EncodedChars(s);
        print("s = "+s);            
   } */
     //print("1---tk2="+tk2);    
           // replace('+','_').replace('/', '~').replace('=', '-')
            tk2 = reverseAndReplaceB64EncodedChars(tk2);
     //print("2---tk2="+tk2);              
            //new StringBuffer(tk2).reverse().toString();
//System.out.println("tk2S="+tk2S);
//System.out.println("tk2="+tk2+";"+tk2.length());
	queryParams = {
            did:did,
            suuid:suuid,
            cxid:cxid,
            tk2:tk2,
            video_id:videoId,
            type:type,
            _support:_support,
            auth_mode:"1",
            src:"",
            abroad:""
            }
        }
        var getVideoURL = utils.appendUrlParameters( APIURL+"/player/video", queryParams);
//print("getVideoURL="+getVideoURL);
       // HttpClient httpClient = new HttpClient(getVideoURL,header,0);
        var text =  utils.httpGetAsString(getVideoURL,header,0);
      //  System.out.println(text);
        var retVal = JSON.parse(text);
        checkRespCode(retVal,text);
        var data = retVal.data;
        var atc = data ? data.atc : null;
        if( atc==null )
            return null;
        var returnPM2 = atc.pm2;
        var returnTK2 = atc.tk2;
       // System.out.println("pm2="+returnPM2);
       // System.out.println("tk2="+returnTK2);
		/*
 "//pcweb.api.mgtv.com/player/getSource?
 _support=10000000&
 tk2=1EjN3MzNyMjNx0Ddpx2Y8FDMzAjLz4CM9IXZ2xHMzATM98mbwx3Y5EWZ4gjMzEjMzETLlNjYh1iZiJGNtEWYjJWLmJjNxMGN5YWPklGZ
 &pm2=ujdjqq4fk~p0LxXOgqLXO4sgjuVOBFxkTN9S8lW8rm0LAIcAIqMyPHO4tMKtX5L_QovNd4rPceFJrABEbIymlp2wjTQ3mlvGIfmtvZItIA6vqSTrrftFZIiaEQHbL1JnchVZa1wlxug0_TE6WaSRDumv~bwWGhctqsMhzM7~ag4s_9QVj~Bm4N6I~fZsIkjgOSB5um_luyrt8N3t_Ho9VhvHideq2vpDsZSTxZyhsPReS4Y0boD~0je7WqwVw9rRyBUUW~oYaSYzFlegkRsk7rN1Ny0nO1xiLOfG1kWBwecPH3k~AEwM~k3y0ls-
 &video_id=3552646&type=pch5&auth_mode=1&src=&abroad="
 */
    queryParams = {
    	tk2:returnTK2,
    	pm2:returnPM2,
    	video_id:videoId,
    	type:type,
    	_support:_support,
    	auth_mode:"1",
    	src:"",
    	abroad:""
    }
    //httpClient = new HttpClient(HttpUtils.appendUrlParameters(APIURL+"/player/getSource", queryParams),header,0);
   	var getSourceUrl = utils.appendUrlParameters(APIURL+"/player/getSource", queryParams);
 // print("getSourceUrl="+getSourceUrl);
    text =  utils.httpGetAsString(
        getSourceUrl,
        header,0
    	);//httpClient.request().getContentAsString();
  //  System.out.println(text);
    retVal = JSON.parse(text);
    checkRespCode(retVal,text);
    data = retVal.data;
    var stream_domainA = data.stream_domain;
    if( stream_domainA==null || stream_domainA.length==0 )
        return null;
    var streamDomain = stream_domainA[0];
    var streamA = data.stream;
    if( streamA==null )
        return null;
    var lastRate = 0;
    var url = null;
    for(var i=0;i<streamA.length;i++) {
		var m = streamA[i];// (java.util.Map<String,Object>)stream;
        var rate = m.filebitrate;
        if( url==null || Math.abs(rate-filebitrate)<Math.abs(lastRate-filebitrate) ) {
            lastRate = rate;
            url = m.url;
        }
    }
  //print("streamDomain+url="+(streamDomain+url));
    if( url==null )
        return null;
    //int code = data==null ? 0
    //httpClient = new HttpClient(streamDomain+url,header,0);
    text = utils.httpGetAsString(streamDomain+url,header,0);
    //httpClient.request().getContentAsString();
   // System.out.println(text);
    retVal = JSON.parse(text);
// print(retVal.status+" :"+retVal.info);   
    return "ok"==retVal.status ? 
    	{url:retVal.info,
    	 headers:{
    	    "User-Agent":HttpUserAgent,
    	    "Referer":"https://www.mgtv.com/.html"
    	   }
    	}
    	 : null ;
}

function checkRespCode(retVal,text){
  var code = retVal.code;
        if( code!=200 ) {
           // Logger.e(TAG,"返回错误: "+text);
            throw retVal.code+":"+retVal.msg;
        }
}

function reverseAndReplaceB64EncodedChars(s){
	//replace('+','_').replace('/', '~').replace('=', '-')
	var a = [];
	//print("s.length="+s.length);
	for(var i=s.length-1;i>=0;i--){
	   var c = s.charAt(i);
	   switch( c ){
	   	case "+": c="_"; break;
	   	case "/": c="~"; break;
	   	case "=": c="-"; break;
	   }
	   a.push(c);
	  // print("c="+c+",a="+a.join(""))
	}
	return a.join("");
}