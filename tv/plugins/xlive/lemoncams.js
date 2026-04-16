/*
https://www.lemoncams.com/zh/china

scp -O  /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/xlive/lemoncams.js router:/www/tv/plugins/xlive/
*/

/*
jsmenu:xlive/lemoncams.js!c

https://api-v2-prod.lemoncams.com/main?page=1&country=cn&function=cams
 &path=.zh.china&project=lemoncams&tsp=1776352149347


*/
function loadMenus(url,params){
	var path = utils.getUrlHostAndPath(url);
	if( path=="*" ){
		return loadMenus1();
	}
	var page = params ? params._pgIdx || 0 : 0;
	var params = {
		page: page+1,
		country : path, //"cn",
		"function" : "cams",
		"path":".zh.china",
		"project":"lemoncams",
		"tsp": utils.currentTime 
	};
	var url = utils.appendUrlParameters("https://api-v2-prod.lemoncams.com/main",params);
	var text = utils.httpGetAsString(url,0x488);
	//print("text = "+text);
	var retVals = JSON.parse(text);
	var items = [];
	for(var i of retVals.cams){
		if( i.previewUrls ){
			items.push({title:i.username+"-"+i.title, urls:i.previewUrls});
		}
	}
	return items;
}

function loadMenus1(){
	return [
	  { title:"CN", items:"jsmenu:xlive/lemoncams.js!cn"}
		
	];
}
