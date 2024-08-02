/*
 * docs/开发环境/GfwHost.txt
 * https://caoyuwu.eu.org/proxy/gfwlist.pac.js
 * http://localhost/doc/pac/gfwpac.pac.js
 * chrome://net-internals/#proxy : 重置代理
 * https://caoyuwu.eu.org/proxy/TestPac.html
 * 参考 
 * genpac 2.1.0 https://github.com/JinnLynn/genpac

 *     https://raw.githubusercontent.com/petronny/gfwlist2pac/master/gfwlist.pac
 *     https://github.com/gfwlist/gfwlist 
 *  语言参考:
   http://findproxyforurl.com/pac-functions/
 */

//var proxy = 'SOCKS5 proxy.caoyuwu.eu.org:1080; DIRECT';
var proxy = 'SOCKS5 proxy.lan:1080; DIRECT';
//var proxy = 'PROXY proxy.caoyuwu.eu.org:1087; DIRECT';

var hostGrps = function(){
  var proxyHosts = [
		
		"google.com",
		"gstatic.com",
		"googleusercontent.com",
		//"googleadservices.com",
		"googleapis.com",
		"google",
		"goo.gl",
		"g.co",
		"googlesource.com",
		"google.com.hk",
		"google.com.sg",
		"google.co.kr",
		"google.co.jp",

		"youtube.com",
		"ggpht.com",
		"ytimg.com",
		"googlevideo.com",
		//googleusercontent.com
		//googlesyndication.com
		"youtu.be",

		"facebook.com",
		"fbcdn.net",
		"instagram.com",
		"cdninstagram.com",
		"fbsbx.com",
		"whatsapp.com",

		"twitter.com",
		"x.com",
		"twimg.com",
		"t.co",

		"telegram.org",
		"telegram.me",
		"telegram.dog",
		"t.me",
		
		"netflix.com",
		
		"discord.com",
		
		"tiktok.com",
		"tiktokcdn.com",
		"tiktokv.com",
		
		"openai.com",

		"wikipedia.org",
		"utvlive.top",	
		"medium.com",
		"v2ray.com",
		"pincong.rocks",
		"githubusercontent.com",
		"chinagfw.org",
		"telegra.ph",
		"githubusercontent.com",
		"apkpure.com",
		"blogger.com",
		"4gtv.tv", // 台湾电视
		"hinet.net", // 4gtv.tv 使用的视频地址
		/*
		,"arukas.io",	
		"io",
		"www.arukas.io",
		*/
		"ask.com", // 搜索引擎
		"duckduckgo.com", // 搜索引擎
		"yahoo.com",
		// 数字钱包等
		 "okx.com", // 欧易
		 // 代理工具等
		"free-proxy.cz",
		"wallmama.com",
		"lncn.org",
		"fanqiangdang.com",
		"v2rayssr.com",
		// 其他x:
		//"1pondo.tv", // 
		"r18.com", //日本
		"pornhub.com", "naiadsystems.com","livehdcams.com",
		// 爬的
		"apollo.io",
		
		//非 GFW 封的地址 services are not available ,
		"coze.com",
		
		"***"  // 最后一个被忽略 
  ];
  var rootGrps = {};	
		for (var i = 0; i < proxyHosts.length-1; i++){
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
 
 /(?:^|\.)github\.com$/.test(host)
 * 
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
