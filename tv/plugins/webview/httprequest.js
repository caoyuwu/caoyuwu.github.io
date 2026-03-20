/*
http://router.lan/tv/plugins/webview/httprequest.js

var head = document.getElementsByTagName("head")[0];
      var s = document.createElement("script");s.type = "text/javascript";
      s.async = false;
	  //s.src="http://router.lan/tv/plugins/webview/douyin/Douyin-inject.js";
	  s.src="https://caoyuwu.eu.org/tv/plugins/webview/httprequest.js";
       head.appendChild(s);
	   
*/
function httpGetAsString(url,headers, opts){
	var conn =  new XMLHttpRequest();
	if( headers ) for(var name in headers){
		conn.setRequestHeader(name, headers[name]);
	}
	//this.conn.setRequestHeader("Content-Type", this.contentType);
	conn.open("GET", url, false);
	conn.send();
	var s = conn.response;
	if (conn.status>=300 || conn<200) {
		if( conn.status==0 ) {
							// 2021-01-10 : 跨域请求 返回 0
			throw new js.Error("调用失败:Status=" +conn.status);
		}
		var ct = conn.getResponseHeader("Content-Type");
		var ex = null;
		if( ct=="application/json") {
			 var v = eval( "(" + s + ")");
			if ( v instanceof Error )
				ex =  v;
			else if( typeof(v)!="object" )
				ex = new Error("调用失败Status="+conn.status+":"+(v==null ? null : v.toString()));
			else {
				ex = new Error();
				for(var n in v ) ex[n] = v[n];
			}	
		}
		if( ex==null ) ex = new Error("调用失败Status="+conn.status+" : " + s);
		throw ex;
	}
	return s;
}

//console.log("httpGetAsString=%s",httpGetAsString);
