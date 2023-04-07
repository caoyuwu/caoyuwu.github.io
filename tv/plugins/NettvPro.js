/*
http://caoyuwu.eu.org/tv/plugins/NettvPro.js
  https://www.nettvpro.live/
*/
 
/*
   nettvpro://hongkong/146 => view-source:https://www.nettvpro.live/hongkong/146.html
*/
function prepareMediaSource(url,params){
	var path = utils.getUrlHostAndPath(url);
	if( !path.endsWith(".html") ) {
	   path += ".html";
	}
	var  urls = [];
	var DocSelector1 = " > body > div.container-fluid  > div > div.main-container > section  >div > div.row";
	
	var html = utils.httpGetAsString("https://www.nettvpro.live/"+path);
    var doc = utils.newHTMLDocument(html);
    var ea = doc.getBody().querySelectorAll(DocSelector1+" ul.video-meta li a");
  //  print("ea.length = "+ea.length);
    for(var i=0;i<ea.length;i++){
     	    var href = ea[i].getAttribute("href");
     	    if( !href || href!="javascript:void(0);" ) 
     	        continue;
     	    var onClick = ea[i].getAttribute("onClick"); 
     	    //frame('/player/play.html?url=https://v3.mediacast.hk/webcast/bshdlive-pc/playlist.m3u8&amp;t=video','100%','650')"
     	    if( !onClick || !onClick.startsWith("frame('/player/play.html?") ){
     	       continue;
     	    }
     	    var s = onClick.substring(25);
     	    var p = s.indexOf("'");
     	    if( p<0 )
     	       continue;
     	      // print(s.substring(0,p).replaceAll("&amp;","&"));
     	    var a = s.substring(0,p).replaceAll("&amp;","&").split("&");
     	   //  print(a.join(" ; "));
     	    var url = null;
     	    for(var j=0;j<a.length;j++){
     	        if( a[j].startsWith("url=") ) {
     	           url = a[j].substring(4);
     	           break;
     	        }
     	    }
     	   if(url) {
     		  var title = ea[i].getAllNodeValue();
     		 urls.push({title:title,url:decodeURIComponent(url)});
     	   	//	return decodeURIComponent(url);
     	   }
     	   
     	   
    }
    return urls;
}

/*
  
  nettvpro-list:Asia/china => view-source:https://www.nettvpro.live/Asia/china/
                           
  nettvpro-list:hongkong => view-source:https://www.nettvpro.live/hongkong/
  Asia/china/1
  cctv
  hongkong
*/
function loadMenus(path,params){
    // path == ""
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
    var DocSelector1 = " > body > div.container-fluid  > div > div.main-container > div.row";
    
  // print("path = "+path+", deep="+deep+",");  
     //   throw new Error("无效参数 :"+path);
     var totalPages = 1;
    var a = [];
    for(var pageIdx=1;pageIdx<=totalPages;pageIdx++){
    var doc ;
    try {
       var html = utils.httpGetAsString("https://www.nettvpro.live/"+path+(pageIdx>1?"/list_"+pageIdx+".html":""));
       doc = utils.newHTMLDocument(html);
     } catch( ex ){
         if( pageIdx>1 ) continue;
        throw ex;
     }
    var ea =doc.getBody().querySelectorAll(DocSelector1+
        ( deep>0 ? " > div.col-md-4 div.video-item-card > div.video-thumb  a"
    	       :"> div.col-md-8 section div.video-item-card div.video-content a"
    	  )
    	 ) ; 
  //print("ea.length = "+ea.length);
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
     	                    : ("@nettvpro:"+href);  
     	    var title = ea[i].getAllNodeValue();
     	   print(i+" : "+title+","+url); 
     	    a.push({url:url,title:title});      
     	}  // for ea
     	if( deep==0 && pageIdx==1 ){
     	    var ea =doc.getBody().querySelectorAll(DocSelector1+" > div.col-md-8 section nav.navigation li a");
     		for(var i=0;i<ea.length;i++){
     		    var href = ea[i].getAttribute("href");
     	    	if( !href || !href.startsWith("list_") || !href.endsWith(".html")) 
     	        	continue;
     	        var n = parseInt(href.substring(5,href.length-5));	
     	        if( n>totalPages ){
     	           totalPages = n;
     	        }
     		} // for ea
     		print("总页数 = "+totalPages);
     	} //deep==0 && pageIdx==1
    } // for( pageIdx
     return a;
       
   
}
