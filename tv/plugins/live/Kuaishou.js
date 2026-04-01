/*
 scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/live/Kuaishou.js  router:/www/tv/plugins/live/
*/
const HomeUrl = "https://live.kuaishou.com";

/*
kuaishoulive:3xuhkz2a6ny7s8g
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
		return loadMenus1();
	}
	var items = [];
	// path= QP/22185
	var html = utils.httpGetAsString(HomeUrl+"/cate/"+path,0x408);
    var json =  utils.extractJSCodeBodyByPrefixVar(html,"window.__INITIAL_STATE__");
    if( json==null ) return ;
   print( json );
    // nonGameBoards.data.list.playUrls
    var m = JSON.parse(json);
    var list;
    if( !m.nonGameBoards || !m.nonGameBoards.data || !(list=m.nonGameBoards.data.list) )
    	return;
    for(var i of list){
		if( !i.playUrls ) continue;
		var id = i.author.id;
		var urls = [];
		for(playUrl of i.playUrls){
			if( !playUrl.adaptationSet ) continue;
		    var url = null;
		    for( representation of playUrl.adaptationSet.representation ){
				urls.push( {title: representation.shortName,  url:representation.url} );
			}
	//		 urls.push(url);
		}
		//urls.push("crawler://live/kuaishou.js?[ID="+id+"]");
		urls.push("kuaishoulive:"+id);
		items.push({
			title: i.caption+"("+i.author.name+")",
			urls : urls
		})	
	} // for list	
	return items;
}

//@kuaishoulive-list:QP/22185]  @kuaishoulive-list:
function loadMenus1(){
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
	      		   ] 
}