/*
http://router.lan/tv/plugins/webview/httprequest.js
scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/webview/httprequest.js router:/www/tv/plugins/webview/
var head = document.getElementsByTagName("head")[0];
      var s = document.createElement("script");s.type = "text/javascript";
      s.async = false;
	  s.src="https://caoyuwu.eu.org/tv/plugins/webview/httprequest.js";
       head.appendChild(s);
	   
*/
function httpGetAsString(url,headers, opts){
	var conn =  new XMLHttpRequest();
	conn.open("GET", url, false);
	if( headers ) for(var name in headers){
		conn.setRequestHeader(name, headers[name]);
	}
	//this.conn.setRequestHeader("Content-Type", this.contentType);
	conn.send();
	_checkHttpResponse(conn);
	return conn.response;
}

function _checkHttpResponse(conn){
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
}

function httpPostFormAsString(url,headers, formParams, opts){
	var conn =  new XMLHttpRequest();
	conn.open("POST", url, false);
	conn.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
	if( headers ) for(var name in headers){
		conn.setRequestHeader(name, headers[name]);
	}
	//this.conn.setRequestHeader("Content-Type", this.contentType);
	var formData = new URLSearchParams();
	if( formParams ) for(var name in formParams){
		formData.append(name,formParams[name]);
	}
	conn.send(formData);
	_checkHttpResponse(conn);
	return conn.response;
}

function appendUrlParams(url,queryParams){
	if( queryParams ) {
		var join = url.indexOf("?")>=0 ? "&" : "?";
		for(var name in queryParams){
			url += join+name+"="+window.encodeURIComponent(queryParams[name]);
			join = "&";
		}	
	}	
	return url;	
}

//console.log("httpGetAsString=%s",httpGetAsString);
