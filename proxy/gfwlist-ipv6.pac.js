/**
 * genpac 2.1.0 https://github.com/JinnLynn/genpac
   下载自: https://raw.githubusercontent.com/petronny/gfwlist2pac/master/gfwlist.pac
    https://caoyuwu.github.io/proxy/gfwlist.pac?proxy=SOCKS5%20192.168.1.7%3A1080
    https://caoyuwu.github.io/proxy/gfwlist.pac?proxy=SOCKS5%20localhost%3A1080
 	http://192.168.1.1/user/gfwlist.pac.js
 	https://caoyuwu.github.io/proxy/gfwlist-ipv6.pac.js
 */

var proxy = 'SOCKS5 ipv6-proxy.caoyuwu.top:1080; DIRECT';

var hostGrps = function(){
  var proxyHosts = [
		
		"google.com",
		"gstatic.com",
		"googleusercontent.com",
		//"googleadservices.com",
		"googleapis.com",
		"google",
		"google.com.hk",
		"goo.gl",

		"youtube.com",
		"ggpht.com",
		"ytimg.com",
		"googlevideo.com",
		"youtu.be",

		"facebook.com",
		"fbcdn.net",
		"fbsbx.com",

		"twitter.com",
		"twimg.com",
		"t.co",

		"telegram.org",
		"telegram.me",
		"telegram.dog",
		"t.me",

		"wikipedia.org"
		//arukas.io	
		/*
		,"arukas.io",	
		"io",
		"www.arukas.io",
		*/
  ];
  var rootGrps = {};	
		for (var i = 0; i < proxyHosts.length; i++){
			var a = proxyHosts[i].split("\.");
			var m = rootGrps;
			for(var j=a.length-1;j>=0;j--){
				var s = m[a[j]];
				if( !s ) {
					m[a[j]] = s = {};
				}
				m = s;
			}
			m["*"] = true;
		}
	 //alert(" rootGrps = "+rootGrps);	
   return rootGrps;
}();
/*
isPlainHostName(host) 判断是否是简单域名，例如 localhost 就是一个简单域名
dnsDomainIs(host, domain) 判断给定的 host 是否属于某个域名
dnsResolve(host) 做 DNS 解析，返回 host 的 ip，注意：DNS 解析可能会 block 住浏览器
isInNet(ip, subnet, netmask) 判断 ip 是否属于某个子网
myIpAddress() 返回本机的 ip (貌似不太可靠，见 wikipedia 的说明)
shExpMatch(str, pattern) 判断两个字符串是否匹配，pattern 中可以包含 shell 使用的通配符

 * https://www.google.com:8000/,www.google.com
 */

function FindProxyForURL(url, host) {
	//console.log("FindProxyForURL : url=%s,host=%s",url,host);	 
	var a = host.split("\.");
	var m = hostGrps;
	for(var j=a.length-1;j>=0;j--){
		m = m[a[j]];
		if( !m )
			break;
		if( m["*"])
			return proxy;
	}
	/*
	for (var j = 0; j < proxyHosts.length; j++){
		if (host == proxyHosts[j] || host.endsWith('.' + proxyHosts[j]))
		{
			return proxy;
		}	
	}
	*/
	return 'DIRECT';
}