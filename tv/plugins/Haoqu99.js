/*
 http://caoyuwu.eu.org/tv/plugins/Haoqu99.js
http://tv.haoqu99.com/1/cctv1.html
  http://tv.haoqu99.com/e/extend/tv.php?id=30846

http://tv.haoqu99.com/2/zhejiangweishi.html 
  http://tv.haoqu99.com/e/extend/tv.php?id=8110
    
*/
var HOMEURL = "http://tv.haoqu99.com/";

function loadUrls(url,params)
{
}
function prepareMediaSource(url,params){
  var urls = loadUrls(url,params);
  return urls && urls.length>0 ? urls[0].url : null;
}

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