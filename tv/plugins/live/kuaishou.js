{
	contentUrl : "https://live.kuaishou.com",
	
	List: {
		contentUrl : "~${PATH}",  // /YL/1000005
		/*
		DIV#app > DIV.cate-main > DIV.main > DIV.list > DIV.load-more
		 > DIV.category-row > DIV.category-row-info 
		 > DIV.live-card-main.live-card-finetune > DIV.live-card-scale 
		 > DIV.live-card > DIV.card-info > DIV.info-main > DIV.info-main-info 
		 > DIV.info-user > A.user-info.has-current-watching
		*/
		/*
		htmlSelector: ">BODY  >DIV#app > DIV.cate-main > DIV.main > DIV.list DIV.live-card-main DIV.live-card DIV.info-user  A.user-info",
		url : "crawler://live/kuaishou.js?[PATH=${URLDOM.attr.href}]",
		title : "${URLDOM.attr.title}"
		*/
		// utils.httpGetAsString(url,def.httpReqOpts||0x408);
		loadItems: function(items,contentUrl){
			    var html = utils.httpGetAsString(contentUrl,0x408);
			    var json =  utils.extractJSCodeBodyByPrefixVar(html,"window.__INITIAL_STATE__");
			    if( json==null ) return ;
			    //print( json );
			    // nonGameBoards.data.list.playUrls
			    var m = JSON.parse(json);
			    var list;
			    if( !m.nonGameBoards || !m.nonGameBoards.data || !(list=m.nonGameBoards.data.list) )
			    	return;
			    for(var i of list){
				    var url = null;
				    if( i.playUrls && i.playUrls[0].adaptationSet && i.playUrls[0].adaptationSet.representation ){
						url = i.playUrls[0].adaptationSet.representation[0].url;
					}
					var id = i.author.id;
					var urls = [];
					if( url ) urls.push(url);
					urls.push("crawler://live/kuaishou.js?[ID="+id+"]");
					items.push({
						title: i.caption+"("+i.author.name+")",
						urls : urls
					})	
				}
			    
		}
	},
	
	// "crawler://live/kuaishou.js?[ID=3xuhkz2a6ny7s8g]"
	MediaSource:{
		//contentUrl : "~${PATH}",
		contentUrl : "~/u/${ID}",
		//url : "browser-${CONTENTURL}"
		getUrl : function(contentUrl,macros){
		    var html = utils.httpGetAsString(contentUrl,0x408);
		    var json =  utils.extractJSCodeBodyByPrefixVar(html,"window.__INITIAL_STATE__");
		    json = utils.stringReplaceAll(json,"undefined","null");
		    if( json==null ) return null;
			//print( json );
			//liveroom.playList.liveStream.hlsPlayUrl
			 var m = JSON.parse(json);
			 return m.liveroom?  m.liveroom.playList[0].liveStream.hlsPlayUrl : null;	
		}
	}
}