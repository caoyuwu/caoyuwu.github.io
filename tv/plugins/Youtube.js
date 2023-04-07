/*
  https://www.youtube.com/embed/GYtC4dkDi38
  https://www.youtube.com/embed/k9jn4-UtZNk
*/
var lastInitCookiesTime = 0;
var KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";
var DefaultPrefVideoHeight = 360;//720;//1080;
function initCookies(){
  if( lastInitCookiesTime>utils.getLastUpdateConfigPreferenceTime() ){
  	return;
  }
  var names = ["LOGIN_INFO","HSID","SSID","SID"];
  var cookies = {};
  for(var i=0;i<names.length;i++){
    cookies[names[i]] = "${CONFIG.YOUTUBE."+names[i]+"}";
  }
  utils.addHttpCookies("https://youtube.com",cookies);
  lastInitCookiesTime = utils.currentTime();
}

function prepareMediaSource(url,params){
   initCookies();
   var videoId = utils.getUrlHostAndPath(url);
 //print("==Youtube==url="+url+" ;   videoId="+videoId);  
   var videoHeight = DefaultPrefVideoHeight;
   var postData = {
     videoId:videoId,
   	 context:{
   		client:{
   		  h1:"en",
   		  clientName:"WEB",
   		  clientVersion:"2.20210721.00.00"
   		}
   	}
   	
   };
   var text = utils.httpPostAsString(
   	  "https://www.youtube.com/youtubei/v1/player?key="+KEY,
   	  null,
   	  "application/json;charset=utf-8",
   	  postData,
   	  0x80|0x400
   );
   var retVal = JSON.parse(text);
   var streamingData = retVal.streamingData;
   if( !streamingData )
   	  return null;
   var url = extractUrlFromStreamFmts(streamingData.formats,videoHeight);
   if( url==null)
      url = extractUrlFromStreamFmts(streamingData.adaptiveFormats,videoHeight);
 //print("url="+url);     
    return url ? {url:url,proxy:"*"} : null;  	  
}

function extractUrlFromStreamFmts(streamFmts, videoHeight){
  	if( !streamFmts )
  		return null;
  	var lastH = 0,  lastUrl = null;
        for(var i=0;i<streamFmts.length;i++ ) {
            var fmt = streamFmts[i];//(java.util.Map<String,Object>)oFmt;
            var mimeType = fmt.mimeType;
            var url = fmt.url;
            if( mimeType==null || !mimeType.startsWith("video/mp4;") ) {
                continue;
            }
            var height = fmt.height || 0;
            if( lastUrl==null
                    || Math.abs(videoHeight-height)<Math.abs(videoHeight-lastH)
            ) {
                lastH = height;
                lastUrl = url;
                if( videoHeight==height )
                    break;
            }
        } // for streamFmts
        return lastUrl;	
}

function loadMenus(url,params){
	var path = utils.getUrlHostAndPath(url);
   initCookies();
   var text = utils.httpGetAsString("https://www.youtube.com",0x80|0x400);
   var p1 = text.indexOf("var ytInitialData = {");
   var p2 = p1<0 ? -1 : text.indexOf("</script>",p1+20);
    if( p2<0 )
        return null;
    text = text.substring(p1+20,p2).trim();
    if( text.endsWith(";") )
        text = text.substring(0,text.length()-1);
   return extractVideosListFromYTInitialData(text);     
}

function extractVideosListFromYTInitialData(text){
// print(text);
	var v = [];
	var retVal = JSON.parse(text);
	var tabs0 = retVal.contents.twoColumnBrowseResultsRenderer.tabs[0];
	var objContents = tabs0.tabRenderer.content.richGridRenderer.contents;
//print("objContents="+objContents);	
	for(var i=0;i<objContents.length;i++){
	//print(i+" : "+objContents[i].richItemRenderer);
		var videoRenderer = objContents[i].richItemRenderer ? objContents[i].richItemRenderer.content.videoRenderer
				: null;
		if( videoRenderer==null )
	        continue;
	   	var videoId = videoRenderer.videoId;//get("videoId");
	    var title = videoRenderer.title.accessibility.accessibilityData.label;
	    if( title==null)
	       title = videoRenderer.title.runs[0].text;
	            //System.out.println(title+":"+videoId);
	            //public Channel(String id,String num,String label,VideoURL urls[],String tags[])
	     v.push( {title:title,url:"youtube://"+videoId} );
	     //new Channel(title,null,title,new VideoURL[]{new VideoURL("youtube://"+videoId)},null,"Youtube")); 
	}	
	return v;
}