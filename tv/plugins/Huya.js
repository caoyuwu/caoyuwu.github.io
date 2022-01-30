
/*
  https://www.huya.com/XXXXX => huyalive://XXXXX
  huyalive://11352916
 */
var cacheLiveStreamInfo = {}; 
var LiveStreamInfo = function(){}
LiveStreamInfo.prototype.init = function(){
    this.initParams = "";
    var minitParams = {};//new java.util.LinkedHashMap<>();
            //  String initParams = "";
  //print("this.sHlsAntiCode = "+this.sHlsAntiCode);           
    var paramsA = this.sHlsAntiCode.split("&");
  //print("paramsA.length="+paramsA.length);  
            //String fm = null;
            //'wsSecret=7f043783b2fd20f82bb0869dd85fb5aa&wsTime=614fd57f&fm=RFdxOEJjSjNoNkRKdDZUWV8kMF8kMV8kMl8kMw%3D%3D&ctype=tars_mobile&txyp=o%3Acp1%3B&fs=bgct&&sphdcdn=al_7-tx_3-js_3-ws_7-bd_2-hw_2&sphdDC=huya&sphd=264_*-265_*&t=103'
     for(var i=0;i<paramsA.length;i++) {
     	var s = paramsA[i];
   // print("s="+s); 	
        var  p = s.indexOf('=');
                if( p<0 ) {
                    continue;
                }
    var name = s.substring(0,p);
    var value = s.substring(p+1);
    switch( name ) {
        case "wsSecret":
            continue;
        case "wsTime":
            //wsTime = value;
            continue;
        case "fm":
                var v = decodeURIComponent(value);//java.net.URLDecoder.decode(value, "UTF-8");
                this.fm = utils.base64Decode(v);//atob(v);//new String(Base64.decode(v,Base64.DEFAULT),"UTF-8");
                //fm = new String(java.util.Base64.getDecoder().decode(v),"UTF-8");
            continue;
        default:
            //minitParams.put(name, value);
            minitParams[name] = value;
            this.initParams += "&"+s;
            break;
    } //switch( name )
    } // for(paramsA
    this.t = minitParams.t;//.get("t"); //103
    this.ctype = minitParams.ctype;//get("ctype"); //tars_mobile
    print("this.ctype="+this.ctype+";this.t"+this.t+";this.fm"+this.fm);
    if( this.ctype==null || this.t==null || this.fm==null ) {
        throw "缺少 ctype 或 t";
    }
} // init

LiveStreamInfo.prototype.buildPlayHlsURL = function(){
	if( this.fm==null ){
        this.init();
    }
    var t0 = utils.currentTime();
    //final String u = "0";
    var wsTime = Math.floor(t0/1000+24*60*60).toString(16);//Long.toHexString(t0/1000+24*60*60);

    var seqid = ""+(UID+t0);//Long.toString(UID+t0);
    var param2 = utils.md5Hex(seqid+"|"+this.ctype+"|"+this.t).toLowerCase();
    //String s = StrUtils.format(fm.replace('$', '%'),UID,this.sStreamName,param2,wsTime);
    var s = this.fm.replace("$0", ""+UID)
            .replace("$1", this.sStreamName)
            .replace("$2", param2)
            .replace("$3", wsTime)
            ;
    var wsSecret = utils.md5Hex(s).toLowerCase();
    //System.out.println("this.sHlsAntiCode="+this.sHlsAntiCode);
    //System.out.println("fm="+fm);
    //System.out.println("sStreamName="+this.sStreamName);
    //System.out.println("wsTime="+wsTime);
    //System.out.println("s="+s);
    ////System.out.println("wsSecret="+wsSecret);
    return this.sHlsUrl + '/' + this.sStreamName + '.' + this.sHlsUrlSuffix + '?'
            +"wsSecret="+wsSecret+"&wsTime="+wsTime+"&seqid="+seqid
            +"&uid="+UID
            +"&ver=1"
            +this.initParams
            ;
}

var UID = 1199589329355;
var  M_HomeURL = "https://m.huya.com";
function prepareMediaSource(url,params){
	var roomid = utils.getUrlHostAndPath(url); //"" +
	var liveStreamInfo = cacheLiveStreamInfo[roomid];
	if( liveStreamInfo==null ) {
            var url = M_HomeURL + "/" + roomid;
            //final java.util.Map<String, String> headers = new java.util.HashMap<>();
            //headers.put("User-Agent", "Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30");
            //HttpClient httpClient = new HttpClient(url, headers, 0);
            var headers = {
            "User-Agent": "Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
            };
            var html = utils.httpGetAsString(url,headers);
    //print("===html="+html);        
            var hnfInit;
            {
                var p1 = html.indexOf("window.HNF_GLOBAL_INIT");
                p1 = p1 > 0 ? html.indexOf('{', p1 + 22) : -1;
                var p2 = p1 > 0 ? html.indexOf("</script>", p1) : -1;
                if (p2 < 0)
                    return null;
                var js = html.substring(p1, p2);
        //  print("===js="+js);
                hnfInit = JSON.parse(js);//snsoft.commons.util.JSON.decodeAsMap(js);
            }
            liveStreamInfo = extractStreamInfoFromMHNFInit(hnfInit);
            if( liveStreamInfo==null )
                return null;
            cacheLiveStreamInfo[roomid] = liveStreamInfo;
        } //if( liveStreamInfo==null ) 
        return liveStreamInfo.buildPlayHlsURL();
}

function  extractStreamInfoFromMHNFInit(hnfInit){
	var roomProfile = hnfInit.roomProfile;
    var roomInfo = hnfInit.roomInfo;
    var tLiveInfo = roomInfo==null?null:roomInfo.tLiveInfo;
    var  tLiveStreamInfo = tLiveInfo==null?null:tLiveInfo.tLiveStreamInfo;
    var  vStreamInfo = tLiveInfo==null?null:tLiveStreamInfo.vStreamInfo;
    var _streamVals = vStreamInfo==null?null:vStreamInfo.value;
    if( _streamVals==null || _streamVals.length==0 )
        return null;
    var streamInfo = _streamVals[0];
    var s = new LiveStreamInfo();
 // print("streamInfo="+streamInfo);  
    /*
    s.liveLineUrl = roomProfile==null ? null : (String)roomProfile.get("liveLineUrl");
    if( s.liveLineUrl!=null ) {
        s.liveLineUrl = new String(java.util.Base64.getDecoder().decode(s.liveLineUrl),StandardCharsets.UTF_8);
    }
    if( s.liveLineUrl!=null && s.liveLineUrl.startsWith("//") ) {
        s.liveLineUrl = "https:"+s.liveLineUrl;
    }
     */
    s.sStreamName = streamInfo.sStreamName;
    s.sHlsUrl = streamInfo.sHlsUrl;
    s.sHlsUrlSuffix = streamInfo.sHlsUrlSuffix;
    s.sHlsAntiCode = streamInfo.sHlsAntiCode;
    //System.out.println("s.sHlsAntiCode="+s.sHlsAntiCode);
    //System.out.println();
    if( s.sStreamName==null || s.sHlsUrl==null || s.sHlsUrlSuffix==null || s.sHlsAntiCode==null ) {
        return null;
    }
    return s;
}

/*
  g/2135 => https://m.huya.com/g/2135
    <script> window.HNF_GLOBAL_INIT = {
    ]} </script>
         
*/
function loadMenus(path,params){
	var headers = {
	   "User-Agent": "Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
	};
	var html = utils.httpGetAsString("https://m.huya.com/"+path,headers);
	var text = extractQuotedStr(html,"window.HNF_GLOBAL_INIT","</script>");
	if( !text || !(text=text.trim()).startsWith("=") )
		return null;
	var m = JSON.parse(text.substring(1).trim());
	var v = [];
	for(var i=0;i<m.liveList.length;i++){
	   var live = m.liveList[i];
	   var id = live.sAction;
	   if( !id || id.charAt(0)!='/' )
	       continue;
//print(live.sTitle+","+"huyalive:/"+id);	       
	   v.push({url:"huyalive:/"+id,title:live.sTitle});    
	}
	return v;
}

function extractQuotedStr(s,prefix,suffix){
  var p1 = s.indexOf(prefix);
  var p2 = p1>=0 ? s.indexOf(suffix,p1+prefix.length) : null;
  return p2>0 ? s.substring(p1+prefix.length,p2) : null;
}
