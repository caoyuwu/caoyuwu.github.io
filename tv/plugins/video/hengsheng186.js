/*
https://hengsheng186.com/
scp -O  /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/video/hengsheng186.js router:/www/tv/plugins/video/
*/

const HomeURL = "https://hengsheng186.com/"

function prepareMediaSource(url,params){
}

/*
items:"@jsmenu:video/hengsheng186.js!*"
*/
function loadMenus(url,params){
	var path = utils.getUrlHostAndPath(url);
	if( path=="" || path=="*" ) {
			return loadMenus1();
	}
}

function loadMenus1(){
	var items = [];
	var subItems = null;
	var html = utils.httpGetAsString(HomeURL,0x408);
	var doc = utils.newHTMLDocument(html);
	var ea = doc.getBody().querySelectorAll(">body >header > div.header-nav-all div.dropdown-box  ul a");
	for(var i=0;i<ea.length;i++){
		var e = ea[i];
		var href = e.getAttribute("href");
		var title = 	e.getAttribute("title");
		if( href && href.startsWith(HomeURL) ){
			var path = href.substring(HomeURL.length);
			if( path.startsWith("vodtype/") ){
				items.push({title:title,items:subItems=[]});
				subItems.push( {title:"全部",items:"@jsmenu:video/hengsheng186.js!"+path} ); 
			} else if(subItems) {
				subItems.push( {title:title, items:"@jsmenu:video/hengsheng186.js!"+path} );
			}
		}
	}
	return items;
}




