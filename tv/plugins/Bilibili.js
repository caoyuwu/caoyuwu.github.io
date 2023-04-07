
/*
https://live.bilibili.com/XXXXX => blive://XXXXX
铁齿铜牙纪晓岚,blive://6694373
【林正英】僵尸 经典 女鬼 24H,blive://70155
 */
//var JS_CodecNMPATH =   ["roomInitRes","data","playurl_info","playurl","stream",0,"format",0,"codec",0];
//var JS_CodecHostNMPATH =   ["url_info",0,"host"];
//var JS_CodecExtraNMPATH =   ["url_info",0,"extra"];
function prepareMediaSource(url,params){
	var liveId = utils.getUrlHostAndPath(url);//"" +
	var headers = {Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"};
  	var html = utils.httpGetAsString("https://live.bilibili.com/"+liveId,headers);
  	  //  https://live.bilibili.com/6694373
  	var JSPrefix = "<script>window.__NEPTUNE_IS_MY_WAIFU__=";
  	var p1 = html.indexOf(JSPrefix);
  	var p2 = p1<0 ? -1 : html.indexOf("</script>",p1+JSPrefix.length);
   	if( p2<0 )
            return null;
    var jsText = html.substring(p1+JSPrefix.length,p2);
        // System.out.println(jsText);
     return parseUrlFromJSText(jsText);
}

function parseUrlFromJSText( jsText) {
    var jsVal = JSON.parse(jsText);
    //"roomInitRes","data","playurl_info","playurl","stream",0,"format",0,"codec",0]
    var codec = jsVal.roomInitRes.data.playurl_info.playurl.stream[0]
    			.format[0].codec[0];
    //(java.util.Map<String,Object>) MapUtils.getElement(jsVal,JS_CodecNMPATH);
        /*
         * __NEPTUNE_IS_MY_WAIFU__.roomInitRes.data.playurl_info.playurl.stream[0].format[0].codec[0]
         * 	.base_url

         */
        //System.out.println(JsonUtils.encode(codec,1));
        var base_url = codec.base_url;
        var host = codec.url_info[0].host;
        //(String)MapUtils.getElement(codec, JS_CodecHostNMPATH);
        var extra = codec.url_info[0].extra;
        //(String)MapUtils.getElement(codec, JS_CodecExtraNMPATH);
        if( host==null || base_url==null )
            return null;
        return host+base_url+(extra==null?"":extra);
    }
/*
Bilibili.js
blive-list:10/33/1-3

*/
function loadMenus(url,params){
  //Number.parseInt("11a")
	var path = utils.getUrlHostAndPath(url);
  	var a = path.split("/");
  	if( a.length!=3 )
  		throw "无效参数"+url;
    var parent_area_id = a[0], area_id = a[1];
    var fromPage,toPage;
    var p = a[2].indexOf('-');
            if( p>0 ){
                fromPage = parseInt(a[2].substring(0,p));
                toPage = parseInt(a[2].substring(p+1));
            } else
            {
                fromPage = toPage = parseInt(a[2]);
            }
    var queryParams = {
        platform:"web",
        parent_area_id:parent_area_id,
        area_id:area_id,
        sort_type:"online"
    };	
 //print("fromPage="+fromPage+",toPage="+toPage);   
    var vCh = [];
        for(var page=fromPage;page<=toPage;page++) {
  // print("=================page="+page);     
            queryParams.page = page; // "" + 避免 appendUrlParameters 中 变成 1.0
            var url = utils.appendUrlParameters("https://api.live.bilibili.com/xlive/web-interface/v1/second/getList", queryParams);
            //HttpClient httpClient = new HttpClient(url,headers,0);
            // httpClient.request().getContentAsString();
            
            var text = utils.httpGetAsString(url);
            var retVals = JSON.parse(text);
            var list = retVals.data ? retVals.data.list : null;// (Object[])MapUtils.getElement(retVals, new Object[] {"data","list"});
            if( list==null || list.length==0 ) {
                break;
            }
            for(var i=0;i<list.length;i++) {
                var m = list[i];
                var title = m.title;
                var uname = m.uname;
                var roomid = m.roomid;
                //System.out.println(title+",blive://"+roomid);
             // print(title+",blive://"+roomid);  
                vCh.push({title:title+"("+uname+")",url:"blive://"+roomid});
                //(new Channel(title+"("+uname+")","blive://"+roomid));
            }
        }
        return vCh;	
}