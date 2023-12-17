/*
 http://caoyuwu.eu.org/tv/plugins/Haoqu99.js
http://tv.haoqu99.com/1/cctv1.html
  http://tv.haoqu99.com/e/extend/tv.php?id=30846

http://tv.haoqu99.com/2/zhejiangweishi.html  //浙江卫视
  http://tv.haoqu99.com/e/extend/tv.php?id=8110
    
*/
var HOMEURL = "http://tv.haoqu99.com/";

/*
  url : "/1/cctv1.html"
*/
function loadUrls(url,params)
{
	var path = utils.getUrlHostAndPath(url);
       
	if(  path.startsWith("/") ){
		path = path.substring(1);
	}
	//if( )
	var html = utils.httpGetAsString(HOMEURL+path,0x408);
   //print( html );   
    var doc = utils.newHTMLDocument(html);
    var ulSelector = " > body > div#bd > div.col-sya.p-cols > div.p-col1 div.bx-syc div.bd div.tab-syb ul.tab-list-syb > li";
   var ea = doc.getBody().querySelectorAll(ulSelector);
   var  urls = [];
 print(ea.length);	
	for(var i=0;i<ea.length;i++){
		 var id = ea[i].getAttribute("data-player");
		 if( !id )
		 	continue;
		 var title = ea[i].getAllNodeValue().trim();
		 urls.push({title:title,url:"@haoqu99:"+id}); 
	}
      return urls;
}

/*
  http://tv.haoqu99.com/e/extend/tv.php?id=32584
*/
function prepareMediaSource(url,params){
  //var urls = loadUrls(url,params);
 // return urls && urls.length>0 ? urls[0].url : null;
   var id = utils.getUrlHostAndPath(url);
   var html = utils.httpGetAsString("http://tv.haoqu99.com/e/extend/tv.php?id="+id,0x408);
   //print( html );   
  //  var doc = utils.newHTMLDocument(html);
  //  var videoE = doc.getBody().querySelector(">body  div#player  video > source ");
   // if( videoE )
    //	return videoE.getAttribute("src");
    // todo...	
    var p1 = html.indexOf("<video ");
    var p2 = p1<0 ? -1 : html.indexOf("</video>",p1);
  // print("p1="+p1+",p2="+p2) 
    if( p2>0 ){
		var s = html.substring(p1+10,p2);
		p1 = s.indexOf("<source src=\"");
		p2 = p1<0 ? -1 : s.indexOf("\"",p1+13);
		if( p2>0 )
			return s.substring(p1+13,p2); 
	}
}

function loadMenus(url,params){
	var path = utils.getUrlHostAndPath(url);
       
	if(  path.startsWith("/") ){
		path = path.substring(1);
	}
	var html = utils.httpGetAsString(HOMEURL+path,0x408);
   //print( html );   
     var  doc = utils.newHTMLDocument(html);
   var a = [];    
    if( path=="") {
		//var ea = doc.getBody().querySelectorAll(" > body " );
		//print(ea.length);
		var ulSelector = " > body > div#bd > div.filter > div.bd >  dl.filter-area  ul.filter-list > li a";
		var ea = doc.getBody().querySelectorAll(ulSelector);
	//print(ea.length);	
		for(var i=0;i<ea.length;i++){
			var href = ea[i].getAttribute("href");
			//print(href);
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
	var qSelector = " > body > div#bd > div.col-sya.p-cols > div.p-col1  div.channel-list > div.bx-sya > div.bd";
	var ea = doc.getBody().querySelectorAll(qSelector);
	for(var i=0;i<ea.length;i++){
		var headE = ea[i].querySelector(">div > h3");
		var items = [];
		a.push({items:items,title:headE.getAllNodeValue()});  
		var liA = ea[i].querySelectorAll(">div >ul > li > a");
		for(var j=0;j<liA.length;j++){
			var href = liA[j].getAttribute("href");
			var title = liA[j].getAllNodeValue(); 
			items.push({url:"@haoqu99-urls:"+href,title:title.trim()});  
		}
	}
	return a; 
}