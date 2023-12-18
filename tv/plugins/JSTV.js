/*
  https://live.jstv.com/
  
  ? https://live.jstv.com/assets/js/924.c4d39ff9.js
   encodeLiveUrl 从 主页面 的 924.c4d39ff9.js 文件中抓取
   
   https://live-hls.jstv.com/livezhuzhan/jsws.m3u8 
     https://live-hls.jstv.com/livezhuzhan/jsws.m3u8?upt=0ae696ff1702897124
   https://live-hls.jstv.com/livezhuzhan/jsgg.m3u8
    
   curl -i  -H "Referer:https://live.jstv.com/" -H "User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "https://live-hls.jstv.com/livezhuzhan/jsws.m3u8?upt="
   
   encodeLiveUrl("https://live-hls.jstv.com/livezhuzhan/jsws.m3u8")
*/
function encodeLiveUrl(e){
	var t = e.split("//")
      , n = t[0] + "//" + t[1].split("/")[0]
      , r = e.replace(n, "");
    r.includes("?") && (r = r.split("?")[0]);
    var a = "jstvlivezhuzhan@2022cdn!@#124gg";
       //i = Number(((new Date).getTime() / 1e3).toFixed()) + 5;
       i = utils.currentTimeSeconds()+5;
     //  print("i="+i);
// i = 1702897124;      
       s = a + "&" + i + "&" + r;
     //  console.log("s=%s",s);
      ;
       o = utils.md5LowerCaseHex(s);// h()(s);
       l = o.substring(12, 20);
       d = l + i;   // b位 + 10 位
      //, u = ""
      ;
    return  e.includes("?") ? e + "&upt=" + d : e + "?upt=" + d;
}


function prepareMediaSource(url){
	var chId = utils.getUrlHostAndPath(url); //"" +
	var headers = {
			Referer: "https://live.jstv.com/",
			"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
		};
	return { url :  encodeLiveUrl("https://live-hls.jstv.com/livezhuzhan/"+chId+".m3u8"),
	          headers:headers
	      };
}

