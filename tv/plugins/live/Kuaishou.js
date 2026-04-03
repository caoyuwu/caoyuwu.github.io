/*
 scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/live/Kuaishou.js  router:/www/tv/plugins/live/
*/
const HomeUrl = "https://live.kuaishou.com";

/*
kuaishoulive:3xuhkz2a6ny7s8g
一般不需要， 直接在 list 中
*/
function prepareMediaSource(url,params){
	var path = utils.getUrlHostAndPath(url);
	var html = utils.httpGetAsString(HomeUrl+"/u/"+path,0x408);
    var json =  utils.extractJSCodeBodyByPrefixVar(html,"window.__INITIAL_STATE__");
        json = utils.stringReplaceAll(json,"undefined","null");
    if( json==null ) return null;
	//print( json );
	//liveroom.playList.liveStream.hlsPlayUrl
	 var m = JSON.parse(json);
	 return m.liveroom?  m.liveroom.playList[0].liveStream.hlsPlayUrl : null;	
}

/*
kuaishoulive-list:QP/22185
*/
function loadMenus(url,params){
	var path = utils.getUrlHostAndPath(url);
	if( path=="" || path=="*") {
		return loadMenus1(); // 第一级次
	}
	if( path.indexOf("/")<0 ){
		var page = params ? params._pgIdx || 0 : 0;
		return getCategory2List(path,page+1,50);
	}
	var items = [];
	// path= QP/22185
	var html = utils.httpGetAsString(HomeUrl+"/cate/"+path,0x408);
    var json =  utils.extractJSCodeBodyByPrefixVar(html,"window.__INITIAL_STATE__");
    if( json==null ) return ;
	json = utils.stringReplaceAll(json,"undefined","null");
  // print( json );
    // nonGameBoards.data.list.playUrls
    var m = JSON.parse(json);
    var list;
    if( !m.nonGameBoards || !m.nonGameBoards.data || !(list=m.nonGameBoards.data.list) )
    	return;
    for(var i of list){
		if( !i.playUrls ) continue;
		var id = i.author.id;
		var urls = [];
		addUrlsFromplayUrls(i.playUrls,urls);
		//urls.push("crawler://live/kuaishou.js?[ID="+id+"]");
		urls.push("kuaishoulive:"+id);
		items.push({
			title: i.caption+"("+i.author.name+")",
			urls : urls
		})	
	} // for list	
	return items;
}

function addUrlsFromplayUrls(playUrls,urls){
		for(playUrl of playUrls){
			if( !playUrl.adaptationSet ) continue;
		    var url = null;
		    for( representation of playUrl.adaptationSet.representation ){
				urls.push( {title: representation.shortName,  url:representation.url} );
			}
	//		 urls.push(url);
		}
}


//@kuaishoulive-list:QP/22185]  @kuaishoulive-list:
function loadMenus1(){
	 
	var items = [];
	{
		var a = getCategory1List();
		if( a ) for( i of a) items.push(i);
	}
	/*
		 https://live.kuaishou.com/live_api/home/list
		 */
	 var json = utils.httpGetAsString(HomeUrl+"/live_api/home/list",0x408);
	//     if( json==null ) return loadDefaultHomeMenus();
	var retVals = JSON.parse(json);
	for(var i1 of retVals.data.list){
		if( !i1.gameLiveInfo ) continue;
		var items2 = [];
		for( var i2 of i1.gameLiveInfo ){
			if( !i2.liveInfo ) continue;
			var items3 = [];
			for( var i3 of i2.liveInfo ){
				if( !i3. playUrls || i3. playUrls.length==0 ) continue;
				var urls = [];
				addUrlsFromplayUrls(i3. playUrls,urls);
				var authorName = i3.author ? i3.author.name+"-" : "";
				items3.push({title:authorName+i3.caption, urls:urls});
				//playUrls[?].adaptationSet[?].representation[?]
			} // for data.list[?].gameLiveInfo[?].liveInfo
			items2.push({title:i2.subLabelName,items:items3});
		} // for data.list[?].gameLiveInfo
		items.push({title:"主页-"+i1.labelName, items:items2});  // "热推直播"
	}	// for( data.list)
	return items;
}

/*
{  "index": 1, "type": "HOT", "name": "全部直播" },
  { "index": 2, "type": "WYJJ", "name": "PC端游" },
 {  "index": 3, "type": "DJRY", "name": "主机游戏" },
{ "index": 4, "type": "SYXX", "name": "手游直播" },
 { "index": 5,  "type": "QP",  "name": "棋牌直播" },
  {"index": 6, "type": "YL", "name": "娱乐天地" },
 { "index": 7, "type": "ZH", "name": "综合直播"},
  { "index": 8, "type": "KJ","name": "科技文化" }
{ "index": 5, "type": "QP", "name": "棋牌直播" },
*/
function getCategory1List(){
	//https://live.kuaishou.com/live_api/category/config
	var items = [];
	var json = utils.httpGetAsString(HomeUrl+"/live_api/category/config",0x408);
	var retVals = JSON.parse(json);
	//	https://live.kuaishou.com/live_api/category/data?type=1&source=2&page=1&pageSize=15
    //	https://live.kuaishou.com/live_api/category/data?type=2&source=2&page=1&pageSize=15

	for(var i of retVals.data){
		items.push({title:i.name,items:"@kuaishoulive-list:"+i.index,countSubMenuPages:5});
	}
	return items;
}

/*
"index": 1, "type": "HOT", "name": "全部直播"
*/
function getCategory2List(typeIdx,page,pageSize){
	if( !page ) page = 1;
	if( !pageSize ) pageSize = 15;
	var items = [];
	var json = utils.httpGetAsString(HomeUrl+"/live_api/category/data?type="+typeIdx+"&source=2&page="+page+"&pageSize="+pageSize,0x408);
	var retVals = JSON.parse(json);
	var _idx = (page-1)*pageSize + 1;
	for(var i of retVals.data.list){
		items.push({title:(_idx++)+":"+i.name+"("+i.roomCount+")",items:"@kuaishoulive-list:"+i.categoryAbbr+"/"+i.id});
	}
	return items;
}


function loadDefaultHomeMenus(){
	return 	[ 
						{label:"天天象棋",items:"@kuaishoulive-list:QP/22185"},
						{label:"象棋",items:"@kuaishoulive-list:QP/10"},
						{label:"边锋掼蛋",items:"@kuaishoulive-list:QP/22727"},
						{label:"斗地主",items:"@kuaishoulive-list:SYXX/6"},
		      		    {label:"娱乐-明星",items:"@kuaishoulive-list:YL/1000001"},
		      		    {label:"娱乐-舞蹈",items:"@kuaishoulive-list:YL/1000002"},
		      		    {label:"娱乐-音乐",items:"@kuaishoulive-list:YL/1000003"},
		      		    {label:"娱乐-才艺",items:"@kuaishoulive-list:YL/1000004"},
		      		     {label:"娱乐-脱口秀",items:"@kuaishoulive-list:YL/1000005"},
		      		     {label:"娱乐-颜值",items:"@kuaishoulive-list:YL/1000006"},
		      		     {label:"娱乐-情感",items:"@kuaishoulive-list:YL/1000007"}
		      		   ] ;
}