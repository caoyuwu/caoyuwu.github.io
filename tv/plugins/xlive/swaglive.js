/*

scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/xlive/swaglive.js router:/www/tv/plugins/xlive/

https://swag.live/category-overview

jsmenu:xlive/swaglive.js!*


*/

function loadMenus(url,params){
	var path = utils.getUrlHostAndPath(url);
	if( path=="live/*") {
		var page = params ? params._pgIdx || 0 : 0;
		return loadLiveMenus1(page,50);
	}
	if( path=="video/*") {
		return loadVideoMenus1();
	}

}

/*
https://swag.live/user/671bb66673182e98525e25a8/livestream

*/
function prepareMediaSource(url,params){
	var path = utils.getUrlHostAndPath(url);
	if( path.startsWith("live/") ){
		var id = path.substring(5);
		return "browser-https://swag.live/user/"+id+"/livestream";
	}
}


var cache_trans = {};
function getTrans(group){
	if( !cache_trans[group] ) {
		var text = utils.httpGetAsString("https://api.swag.live/translations?lang=zh-hant&group=feature%3A"+group,0x488);
		cache_trans[group] = JSON.parse(text);
	}
	return cache_trans[group];
}


/*
https://api.swag.live/feeds/user_livestream-v2?limit=10&page=1&sorting=desc:user_recommendation
*/
function loadLiveMenus1(page,count){
	if( (count||0)<=0 )  count = 50;
	if( count<10 ) count = 10;
	var url = "https://api.swag.live/feeds/user_livestream-v2?limit="+count+"&page="+(page+1)+"&sorting=desc:user_recommendation";
	var text = utils.httpGetAsString(url,0x488);
	//print("text="+text)
	var items = [];
	var j = page*count+1;
	for(var i of JSON.parse(text)){
		items.push({title:(j++)+":"+i.displayName+"-"+i.biography,url:"live/"+i.id});
	}
	return items;
}

//https://api.swag.live/configurations/default.json
function loadVideoMenus1(){
	var trans = getTrans("post");
	var url = "https://api.swag.live/configurations/default.json";
	var text = utils.httpGetAsString(url,0x488);
	//https://api.swag.live/translations?lang=zh-hant&group=feature%3Apost
	var items = [];
	//print("text = "+text);
	 /*
	 MESSAGE_CATEGORY_GROUPINGS": "clothe actions scenario figure role place miscellaneous",
	   "MESSAGE_CATEGORY_GROUPING_CLOTHE": "glasses kimono uniform sailor_suit high_heels pantyhose
	 */
	var  retVals = JSON.parse(text);
	var grps = retVals.MESSAGE_CATEGORY_GROUPINGS.split(" ");
	for(var grp of grps){
		grp = grp.trim();
		//category_grouping_ clothe"
		//print("grp = ["+grp+"]");
		var items2 = [];
		//MESSAGE_CATEGORY_GROUPING_CLOTHE
		var grps2 = retVals["MESSAGE_CATEGORY_GROUPING_"+grp.toUpperCase()].split(" ");
		for(var grp2 of grps2){
			items2.push({title:grp2+"-"+trans["category_"+grp2],jsmenu:"jsurls:xlive/swaglive.js!video/"+grp2})
			//items2.push({title:grp2+"-"+trans["category_"+grp2],urls:"jsurl:xlive/swaglive.js!"+grp2})
		}
		items.push( {title:grp+"-"+trans["category_grouping_"+grp],items:[items2]} );
	}
	return items;
}

		
