/*

scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/xlive/6d.js  router:/www/tv/plugins/xlive/

*/

/*
jsmenu:xlive/6d.js!*
*/
function loadMenus(url,params){
	if( url=="*" ){
		return loadMenus1();
	}
	if( url.startsWith("video/") ){
		return loadVideoMenus(url.substring(6));
	}
	if( url.startsWith("live/") ){
		return loadLiveMenus(url.substring(5));
	}
	/*
	var url = "https://api.jsqcpt.com/api/home/getclasslive?liveclassid=2&p=1&sdktype=android&sdkver=3.1.6&device=e83480c724d7fe7662c1b8f9edd66efd&uid=8797429&token=57143c6b5d4703723246f3303c984e7e&t=1775578944&signature=bcb834391184fc192b14dbc21e10ac2730c5750163631e215f7c1fc6aae4e8bc81022243d3843efb5d56452b20d8ebf0aeeaf50f0abd1290bc73a3b8148f051b213e02503c350b9ec2e5349623c58c09";
	var json = utils.httpGetAsString(url.trim());//"http://router.lan/vlive/6d/6dlive.json",0);
	return parseLiveJson(json);
	*/
}

function parseLiveJson(json){
	var list = JSON.parse(json).data.list;
	var items = [];
	//var i of list
	for(var j=0;j<list.length;j++) {
		var i = list[j];
		if( i.pull  ) //&& i.pull.endsWith(".flv")
			items.push({title:(j+1)+":"+i.user_nickname+"-"+i.title+"("+i.viewers+")"+(i.type>0?"(VIP-"+i.type+")":"")
		        ,url:i.pull});
	}
	return items;
}

function parseVideoJson(json){
	var list = JSON.parse(json).data.list;
		var items = [];
		for(var i of list) {
			var items2 = [];
			for(var i2 of i.list ){
				if( i2.m3u8_url && i2.m3u8_url!="" )
				   items2.push({title:i2.title,url:i2.m3u8_url});
			}
			if( items2.length>0 ){
				items.push( {title: i.name,items: items2} );
			}
		}
		return items;
}

function loadConfigUrls(){
	var urls = [];
	var url = utils.toAbsoluteURL(_scriptURL,"../../../vlive/6dapp/6dapp.txt");
	var text = utils.httpGetAsString(url);
	for(var line of text.split("\n")){
		line = line.trim();
		if( line.startsWith("https://") ){
			urls.push(line);
		}
	}
	return urls;
}
function loadConfigUrl(match1,match2){
	var urls = loadConfigUrls();
	for(var url of urls ){
		if( url.indexOf(match1)>0 && (!match2 || url.indexOf(match2)>0 )){
			return url;
		}
	}
}

function loadMenus1(){
	var items = [];
	items.push({ title:"直播-2", items:"jsmenu:xlive/6d.js!live/2" });
	items.push({ title:"直播-5", items:"jsmenu:xlive/6d.js!live/5" });
	items.push({ title:"直播-6", items:"jsmenu:xlive/6d.js!live/6" });
	items.push({ title:"直播-7", items:"jsmenu:xlive/6d.js!live/7" });
	/*
	var url = loadConfigUrl("/api/fvideo/getvideoclass?");
	if( url ) {
		var retVal = JSON.parse(utils.httpGetAsString(url));
		for(var i of retVal.data){
			items.push({ title:"视频-"+i.name, items:"jsmenu:xlive/6d.js!video/"+i.id });
		}
	}
	*/
	return items;
}

function loadLiveMenus(id){
	//print("loadLiveMenus : id="+id);
	var url = loadConfigUrl("/api/home/getclasslive?","liveclassid="+id+"&");
	if( !url) return null;
	var json = utils.httpGetAsString(url.trim());//"http://router.lan/vlive/6d/6dlive.json",0);
	return parseLiveJson(json);
}

function loadVideoMenus(id){
	var url = loadConfigUrl("/api/fvideo/getvideobyclass?","classid="+id+"&");
	if( !url) return null;
		var json = utils.httpGetAsString(url.trim());//"http://router.lan/vlive/6d/6dlive.json",0);
		return parseVideoJson(json);
}

/*
http://1804b3a5c65667d2.mlvbdc.tlivesdk.com:
qc.qpli.top
"stream": "8819357_1775577313",
"sourceid": "1000381220",
http://lashfoaw064.abrillantlee.top/live/cx_360501.flv

http://lanfhllcjoahohadmcld.xinzhitushu.xyz/live/cx_381220.flv
http://lasehbehqr.sqfkkj.top/live/cx_383225.flv
http://lasywepoinetas1.jinkangyl.com/live/cx_384187.flv

*/

