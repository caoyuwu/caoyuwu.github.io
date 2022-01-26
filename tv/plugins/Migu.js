
/*
[1]
http://m.migu123.com/tv/beijingweishi.html
  => migu123tv://tv/beijingweishi
  
[2]
  =>migu://
   cctv1,migu://608807420
   cctv2,migu://672926537
*/

function prepareMediaSource(url,params){
    var mediaId = ""+utils.getUrlHostAndPath(url);
    if( url.startsWith("migu123tv:") ){
    	return buildMigu123TV(mediaId);	
    }
    //
    var queryParams = {
   		contId: mediaId,
        rateType:"3",
            //queryParams.put("clientId", clientId);
         startPlay:true
    };
    var webapiUrl = utils.appendUrlParameters("http://webapi.miguvideo.com/gateway/playurl/v3/play/playurl?", queryParams);
    var headers = {
    	"User-Agent":"Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
    };
    var text = utils.httpGetAsString(webapiUrl,headers,0);
    var retVal = JSON.parse(text);
    if( retVal.code!=200 ) {
        return null;
    }
    var body =  retVal.body;
    if( body==null )
        return null;
    var urlInfo = body.urlInfo;
    var videoUrl = urlInfo==null ? null : urlInfo.url;
    if( videoUrl==null ) {
        var a = body.urlInfos;
        if( a!=null  ) for(var i=0;i<a.length;i++) {
            videoUrl = a[i].url;
            if( videoUrl!=null )
                break;
        }
    }
    if( videoUrl!=null ) {
        // ddCalcu=a900efc11f8441eaf66f90d85e4b3ba9914d
        var ddCalcu = buildDDCalcu(videoUrl);
        if( ddCalcu!=null ) {
            videoUrl += "&ddCalcu="+ddCalcu;//+"&crossdomain=www";
        }
        //print("ddCalcu = "+ddCalcu);
        //System.out.println();
        //System.out.println("curl -i -H \"Referer:http://m.miguvideo.com\" -H \"User-Agent:Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30\" \""+url+"\"");
        //System.out.println();
    }
  //print("videoUrl="+videoUrl);
    return {url:videoUrl,headers:headers};
}

/*
http://m.miguvideo.com/mgs/msite/prd/liveDetail.html?cId=608807420&channelId=10010001005
  其中 h5Player.js 
  => 
*/
function buildDDCalcu(url){
  var queryParams = parseUrlParameters(url);
  //print("url="+url);
  //print("puData="+queryParams.puData);
  var t = queryParams.userid || "eeeeeeeee"
          , n = queryParams.timestamp || "tttttttttttttt"
          , o = queryParams.ProgramID || "ccccccccc"
          , a = queryParams.Channel_ID || "nnnnnnnnnnnnnnnn"
          , s = queryParams.puData || "";
        if (!s)
            return null;//url;
        var u = "2624";
        u = u.split("");
        for (var c = t.split("")[u[0]] || "e", 
        	l = n.split("")[u[1]] || "t", 
        	f = o.split("")[u[2]] || "c", 
        	d = a.split("")[a.split("").length - u[3]] || "n", 
        	p = s.split(""), h = [], y = 0; 2 * y < p.length; y++
         )
            switch (h.push(p[p.length - y - 1]),
            y < p.length - y - 1 && h.push(s[y]),
            y) {
            case 1:
                h.push(c);
                break;
            case 2:
                h.push(l);
                break;
            case 3:
                h.push(f);
                break;
            case 4:
                h.push(d)
            }
        return h.join("");    
       // var v = h.join("");
       // return //i.default.debug(v),
       // url + "&ddCalcu=" + v
}

function buildMigu123TV(mediaId){
    var text = utils.httpGetAsString("http://mini.javaa.cn/wap/" + mediaId + ".html");
	var p1 = text.indexOf("src='");
    if (p1 > 0) {
        var p2 = text.indexOf("'", p1 + 5);
        return p2 > p1+10 ? text.substring(p1 + 5, p2) : null;
    }
    p1 = text.indexOf("src=\"");
    if (p1 > 0) {
        var p2 = text.indexOf('"', p1 + 5);
        return p2 > p1+10 ? text.substring(p1 + 5, p2) : null;
    }
    //System.out.println(text);
    return null;
}

function parseUrlParameters(url){
   var p = url.indexOf("?");
   var m = {};
   if( p>0 ){
       var a = url.substring(p+1).split("&");
            for(var i=0;i < a.length;i++)
            {
                var p = a[i].indexOf('=');
                if(p > 0)
                {
                    m[a[i].substring(0,p)] = decodeURIComponent(a[i].substring(p + 1));
                }
            }
   }
   return m;
}