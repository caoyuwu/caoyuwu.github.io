/*
 http://caoyuwu.eu.org/tv/plugins/Haoqu99.js
http://tv.haoqu99.com/1/cctv1.html
  http://tv.haoqu99.com/e/extend/tv.php?id=30846

http://tv.haoqu99.com/2/zhejiangweishi.html 
  http://tv.haoqu99.com/e/extend/tv.php?id=8110
    
*/
var HOMEURL = "http://tv.haoqu99.com/";
function loadMenus(url,params){
	var path = utils.getUrlHostAndPath(url);
       
	if(  path.startsWith("/") ){
		path = path.substring(1);
		/*
		 
		*/
	}
	var html = utils.httpGetAsString(HOMEURL+path,0x408);
   //print( html );   
       doc = utils.newHTMLDocument(html);
   var a = [];    
    if( path=="") {
		//var ea = doc.getBody().querySelectorAll(" > body " );
		//print(ea.length);
		var ulSelector1 = " > body > div#bd > div.filter > div.bd >  dl.filter-area  ul.filter-list > li a";
		var ea = doc.getBody().querySelectorAll(ulSelector1);
	//print(ea.length);	
		for(var i=0;i<ea.length;i++){
			var href = ea[i].getAttribute("href");
			print(href);
     	    if( !href  )  
     	        continue;
     	    var title = ea[i].getAllNodeValue(); 
     	    var url = "@haoqu99-list:"+href;
     //	print(title+" : "+url);    
     	     a.push({url:url,title:title});  
		}
		return a; 
	}  
	/*
	  
	*/
	return a; 
}