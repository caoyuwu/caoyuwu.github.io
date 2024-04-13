/*
http://caoyuwu.eu.org/tv/plugins/NettvPro.js
  https://www.nettvpro.xyz/
*/
//var HOMEURL =  "https://www.nettvpro.live/";
var HOMEURL =  "https://www.nettvpro.xyz/";
/*
   nettvpro://hongkong/146 => view-source:https://www.nettvpro.xyz/hongkong/146.html
   
   亞洲
      中國
          中央電視台 (末)
		  衛星頻道 (末)
          山西 
			晋中 (末)
			长治
			... 
          陝西
          ..

	  日本 (末)
      蒙古国
      ..
    歐洲
       土耳其
	   英国
	     安圭拉岛
		 百慕大
	   法国  
   
*/
function loadUrls(url,params)
{
	var path = utils.getUrlHostAndPath(url);
	if( !path.endsWith(".html") ) {
	   path += ".html";
	}
	var  urls = [];
	
	var html = utils.httpGetAsString(HOMEURL+path);

//	var DocSelector1 = " > body > div.container-fluid  > div > div.main-container > section  >div > div.row";
	var DocSelector1 = " > body > div#wrapper  div.main_content div.video-info ";
    var doc = utils.newHTMLDocument(html);
    var ea = doc.getBody().querySelectorAll(DocSelector1+" ul li a");
  //  print("ea.length = "+ea.length);
    for(var i=0;i<ea.length;i++){
     	    var href = ea[i].getAttribute("href");
     	    if( !href || href!="javascript:void(0);" ) 
     	        continue;
     	    var onClick = ea[i].getAttribute("onClick");
     	    /*
     	     frame('/player/ckx2.html?url=...' 
     	      frame('/player/play.html?url=https://v3.mediacast.hk/webcast/bshdlive-pc/playlist.m3u8&amp;t=video','100%','650')"
     	      frame('/embed/cctv13.php',...)
     	         重定向到  /player/video.html?url=https://....
     	      frame('/embed/loudi.php?id=cctv13',...)
     	         重定向到  /player/videojs.php?url=https://...
     	      frame('player/play.html?url=cctv13&amp;t=cnsy',...)
     	      frame('/player/video.html?url=...)
     	    */
     	    if( !onClick || 
     	       ( !onClick.startsWith("frame('/player/play.html?")
     	         && !onClick.startsWith("frame('/player/ckx2.html?")
     	       )
     	        ){
     	       continue;
     	    }
   //print("onClick="+onClick);  	    
     	    var s = onClick.substring(25);
     	    var p = s.indexOf("'");
     	    if( p<0 )
     	       continue;
     	      // print(s.substring(0,p).replaceAll("&amp;","&"));
     	   // var a = s.substring(0,p).replaceAll("&amp;","&").split("&");
     	   //  print(a.join(" ; "));
     	    var url = null;
     	    s =  s.substring(0,p);
     	    if( s.startsWith("url=") )
     	       url = s.substring(4).replaceAll("&amp;","&");
     	       /*
     	    for(var j=0;j<a.length;j++){
     	        if( a[j].startsWith("url=") ) {
     	           url = a[j].substring(4);
     	           break;
     	        }
     	    } */
     	   if(url) {
     		  var title = ea[i].getAllNodeValue();
     		 urls.push({title:title,url:decodeURIComponent(url)});
     	   	//	return decodeURIComponent(url);
     	   }
     	   
     	   
    }
    return urls;
}
function prepareMediaSource(url,params){
  var urls = loadUrls(url,params);
  return urls && urls.length>0 ? urls[0].url : null;
}

/*
  
  nettvpro-list:Asia/china => view-source:https://www.nettvpro.live/Asia/china/
                           
  nettvpro-list:hongkong => view-source:https://www.nettvpro.live/hongkong/
  Asia/china/1
  cctv
  hongkong
*/
function loadMenus(url,params){
	 //"https://www.nettvpro.live"
   utils.addHttpCookies(HOMEURL,{PHPSESSID:"grsud0cn3mg375sdhj3p891vj7"});
	var path = utils.getUrlHostAndPath(url);
    var p = path.lastIndexOf("/");
    var deep = 0;
  //print("path = "+path+", p="+p+",path.length="+path.length);  
    if( p==path.length-2 ){
        var d = path.charCodeAt(path.length-1)-48;
        if( d>=1 && d<=9 ){
            deep = d;
            path = path.substring(0,p);
        }
    }
   // var DocSelector1 = " > body > div.container-fluid  > div > div.main-container > div.row";
   var DocSelector1 = " > body > div#wrapper  div.main_content ";
    
  // print("path = "+path+", deep="+deep+",");  
     //   throw new Error("无效参数 :"+path);
     var totalPages = 1;
    var a = [];
    for(var pageIdx=1;pageIdx<=totalPages;pageIdx++){
    var doc ;
    try {
       var html = utils.httpGetAsString(HOMEURL+path+(pageIdx>1?"/list_"+pageIdx+".html":""),0x408);
  // print( html );   
       doc = utils.newHTMLDocument(html);
     } catch( ex ){
         if( pageIdx>1 ) continue;
        throw ex;
     }
     var selector = DocSelector1+
        ( deep>0 ? " div.nav-channal ul >li  a"
    	         : " div.channals-list   a"
    	  );
    var ea = doc.getBody().querySelectorAll(selector) ; 
  //print("ea.length = "+ea.length+", deep"+deep+", selector="+selector);
     	for(var i=0;i<ea.length;i++){
     	    var href = ea[i].getAttribute("href");
     	    if( !href || href=="" ) 
     	        continue;
     	    if( href.startsWith("/") ) 
     	        href = href.substring(1);  
     	    if( href.endsWith("/") ) 
     	        href = href.substring(0,href.length-1);  
     	  	else if( href.endsWith(".html") ) 
     	        href = href.substring(0,href.length-5);       
     	    var url = deep>0 ? ("@nettvpro-list:"+href+(deep>1 ? "/"+(deep-1) : ""))
     	                    : ("@nettvpro-urls:"+href);  
     	    var title = ea[i].getAllNodeValue();
     	    if( title ) title = title.trim();
     	  // print(i+" : "+title+","+url); 
     	    a.push({url:url,title:title});      
     	}  // for ea
     	if( deep==0 && pageIdx==1 ){
     	    var ea =doc.getBody().querySelectorAll(DocSelector1+" ul.uk-pagination  li a");
     		for(var i=0;i<ea.length;i++){
     		    var href = ea[i].getAttribute("href");
     	    	if( !href || !href.startsWith("list_") || !href.endsWith(".html")) 
     	        	continue;
     	        var n = parseInt(href.substring(5,href.length-5));	
     	        if( n>totalPages ){
     	           totalPages = n;
     	        }
     		} // for ea
     	//	print("总页数 = "+totalPages);
     	} //deep==0 && pageIdx==1
    } // for( pageIdx
     return a;
       
   
}
