/*
 scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/live/Huajiao.js router:/www/tv/plugins/live/
*/


/*

*/

function genGUID(m){
	var s = "platform="+m.platform+"rand=" + m.rand + "time=" + m.time 
		+ "userid="+m.userid+"version="+m.version+"eac63e66d8c4a6f0303f00bc76d0217c"
		;
		/*
		 只是用于？？？ 生成的唯一id, 服务器并没有检查
		*/
	//prit(s);	
	m.guid = utils.md5LowerCaseHex(s);
}

function loadMenus(url,params){
	var page = params ? params._pgIdx || 0 : 0;
	var pageCount = 50;
	var offset = page*pageCount;
	var m = {
		rand: ""+Math.random(),
        time: Date.now(),//utils.currentTime(),
        platform: "ios",
        version: "7.0.0",
        userid: "",
		
		partner:"h5Inner",
		num:pageCount,
		name:"live",
		offset:offset,
		real_feeds:0
		//&callback=__jp0
	};
	genGUID(m);
	var url = utils.appendUrlParameters("https://live.huajiao.com/Card",m);
	var json = utils.httpGetAsString(url,0);
	//print(json);
	var items = [];
	var retVals = JSON.parse(json);
	for(var i of retVals.data.feeds){
		if( !i.feed ){
			//print("feed==:"+i.author.nickname);
			continue;
		}
		var tit = i.feed.live_cate+"-"+i.author.nickname+"-"+i.feed.title;
		var url = i.feed.pull_url;
		items.push({title:tit, url:url});
	}
	return items;
}