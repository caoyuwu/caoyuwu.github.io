/*

https://api.jsqcpt.com/api/home/getclasslive?liveclassid=2&p=1&sdktype=android&sdkver=3.1.6&device=e83480c724d7fe7662c1b8f9edd66efd&uid=8797429&token=57143c6b5d4703723246f3303c984e7e&t=1775577237&signature=bcb834391184fc192b14dbc21e10ac2730c5750163631e215f7c1fc6aae4e8bc2d94e151b4c6ca1e3dbae7e19581443889c757226082156c4f6d6eb1e3d2f83ab9ec2cfacdd916eb79ecc08f2be7908a

scp -O /opt/snsoftn10/snadk-srcx/docs/~tmp/x/6dlive.json  router:/www/vlive/6d/

scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/xlive/6d.js  router:/www/tv/plugins/xlive/
*/

/*
jsmenu:xlive/6d.js!*
*/
function loadMenus(url,params){
	var json = utils.httpGetAsString("http://router.lan/vlive/6d/6dlive.json",0);
	return parseLiveJson(json);
}

function parseLiveJson(json){
	var list = JSON.parse(json).data.list;
	var items = [];
	for(var i of list) {
		if( i.pull && i.pull.endsWith(".flv") )
			items.push({title:i.user_nickname+"-"+i.title,url:i.pull});
	}
	return items;
}