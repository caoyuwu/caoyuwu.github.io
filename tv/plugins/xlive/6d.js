/*

scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/xlive/6d.js  router:/www/tv/plugins/xlive/
*/

/*
jsmenu:xlive/6d.js!*
*/
function loadMenus(url,params){
	var url = "https://api.jsqcpt.com/api/home/getclasslive?liveclassid=2&p=1&sdktype=android&sdkver=3.1.6&device=e83480c724d7fe7662c1b8f9edd66efd&uid=8797429&token=57143c6b5d4703723246f3303c984e7e&t=1775578944&signature=bcb834391184fc192b14dbc21e10ac2730c5750163631e215f7c1fc6aae4e8bc81022243d3843efb5d56452b20d8ebf0aeeaf50f0abd1290bc73a3b8148f051b213e02503c350b9ec2e5349623c58c09";
	var json = utils.httpGetAsString(url.trim());//"http://router.lan/vlive/6d/6dlive.json",0);
	return parseLiveJson(json);
}

function parseLiveJson(json){
	var list = JSON.parse(json).data.list;
	var items = [];
	for(var i of list) {
		if( i.pull && i.pull.endsWith(".flv") )
			items.push({title:i.user_nickname+"-"+i.title+(i.type>0?"(VIP-"+i.type+")":"")
		        ,url:i.pull});
	}
	return items;
}