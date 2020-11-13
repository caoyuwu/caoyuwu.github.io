/*
 * docs/开发环境/GfwHost.txt
 * http://www.caoyuwu.top/proxy/gfwlist.pac.js
 * http://localhost/doc/pac/gfwpac.pac.js
 * chrome://net-internals/#proxy : 重置代理
 * 参考 
 * genpac 2.1.0 https://github.com/JinnLynn/genpac

 *     https://raw.githubusercontent.com/petronny/gfwlist2pac/master/gfwlist.pac
 *     https://github.com/gfwlist/gfwlist 
 *  语言参考:
   http://findproxyforurl.com/pac-functions/
 */

var proxy = 'SOCKS5 proxy.caoyuwu.top:1080; DIRECT';

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
		"g.co",

		"youtube.com",
		"ggpht.com",
		"ytimg.com",
		"googlevideo.com",
		"youtu.be",

		"facebook.com",
		"fbcdn.net",

		"twitter.com",
		"twimg.com",
		"t.co",

		"telegram.org",
		"telegram.me",
		"telegram.dog",
		"t.me",

		"wikipedia.org"
		,"utvlive.top"	
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
