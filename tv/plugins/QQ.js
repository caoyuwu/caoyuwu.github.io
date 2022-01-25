/*
https://y.qq.com/n/ryqq/songDetail/XXXXX => qqmusic/XXXX
https://y.qq.com/n/ryqq/mv/XXXXX => qqmv://XXXXX
*/

function uuidGenerate(){
	var minLen = 10, maxLen = 16; 
	var ranLen = minLen + Math.floor(Math.random()*(maxLen-minLen));
	var dir = "0123456789abcdefghijklmnopqrstuvwxyz";
	var a = [];
	for( var i=0;i<ranLen;i++){
		a.push(dir[Math.floor(Math.random()*dir.length)]);
	}
	return a.join("");
}

function protocol2Type(protocol){
	switch( protocol ){
    case "qqmusic":  return 1;
    case "qqmv": return 2;
	}
	return -1;
}

function prepareMediaSource(url,params){
	return buildUrl(protocol2Type(""+utils.getUrlProtocol(url)),
			""+utils.getUrlHostAndPath(url));
}

var encNonce="CJBPACrRuNy7";
var signPrxfix="zza";

function genSign( postBody){
    return signPrxfix+uuidGenerate()+
            utils.md5Hex(encNonce+postBody).toLowerCase()
            ;
    ///Md5Encrypt.convertToMd5(encNonce+encParams);
}


var _UIN = 908377347;

function buildReqBody(type,songId){
    comm = {
    cv:4747474,
    ct:24,
    format:"json",
    inCharset:"utf-8",
    outCharset:"utf-8",
    notice:0,
    platform:"yqq.json",
    needNewCode:1,
    uin:""+utils.getConfigPreference("QQ.UIN",_UIN), //QQ 👌908377347;
    g_tk_new_20200303:1390962086,
    g_tk:1390962086
    };
    return {
    	comm: comm,
    	req_1: buildReq1(type,songId)
    }
}

var URL0 = "https://dl.stream.qqmusic.qq.com/";
var apiServer = [
        "https://u.y.qq.com/cgi-bin/musicu.fcg",
        "https://u.y.qq.com/cgi-bin/musics.fcg"
];

function buildUrl( type, songId) {
	print("type="+type+" ; songId="+songId);
	var postBody = JSON.stringify(buildReqBody(type,songId));
	var url = apiServer[Math.floor(Math.random()*apiServer.length)]
    			+"?_="+utils.currentTime()
    			+"&sign="+genSign(postBody)//output.getContentAsString())
    			;
//HttpUtils.appendUrlParameters(,urlParams);
	var headers = {
			//headers.put("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4512.4 Safari/537.36");
			"Referer": "https://y.qq.com/"
	};
	var sessionId = utils.getConfigPreference("QQ.SESSIONID");
	if ( sessionId!=null) {
		headers.Cookie = "fqm_sessionid=" + sessionId;
	}
	var text = utils.httpPostAsString(
			 url,
			 headers,
			 "application/json;charset=utf-8",
			 postBody,
			 0x400
			);
print("返回："+text);	
	var m = JSON.parse(text);
	if( m.code!=0 || !m.req_1 ) {
		return null;
	}
	return parseUrlFromResponse(type,m.req_1.data,songId);
}

function buildReq1(type,songId){
	switch( type ){
	case 1:
	{
		var req1_Params = {
			songmid:[songId],
		    songtype:[0],
		    uin:""+utils.getConfigPreference("QQ.UIN",""+_UIN),  // QQ 👌908377347;
		    loginflag:1,
		    platform:"20"	
		};
		var GUID = utils.getConfigPreference("QQ.GUID");
		if( GUID ){
			req1_Params.guid = ""+GUID;
		};
		return {
			module:"vkey.GetVkeyServer",
	        method:"CgiGetVkey",
	        param: req1_Params
		};
	}
	case 2:
	{
		var req1_Params = {
			vids:[songId],
		    request_typet:10001,
		    addrtype:3,
		    format:264
		};
		return {
			module:"gosrf.Stream.MvUrlProxy",
	        method:"GetMvUrls",
	        param: req1_Params
		};
	}
	default:
		throw "type="+type;
	}
}
function parseUrlFromResponse(type,data,songId){
	switch( type ){
	case 1: // music
	{
		var midurlinfo = data ? data.midurlinfo : null;
        var midurlinfo0 = midurlinfo && midurlinfo.length>0 ? midurlinfo[0] : null;
        var purl = midurlinfo? midurlinfo0.purl : null;
        return purl==null || purl=="" ? null : URL0+purl;
	}
	case 2:{
		var vdata = data ? data[songId] : null;
		if( vdata==null )
			return null;
        var vtypes = ["hls","mp4"]
		// vdata.hls = [{freeflow_url:},...]
        for(var iVType=0;iVType<vtypes.length;iVType++ )
        {
            var vurls = vdata[vtypes[iVType]];
            if(  !(vurls instanceof Array)) {
                break;
            }
            for(var j=0;j<vurls.length;j++ ) {
                var freeflow_url = vurls[j].freeflow_url;
                if( freeflow_url && freeflow_url.length>0 ) {
                    return freeflow_url[0];
                }
            }
        }
        return null;
	}
	default:
		throw "type="+type;
	}
}
