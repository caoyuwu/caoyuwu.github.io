{
	contentUrl : "https://cn.pornhub.com",
	
	List:{
		contentUrl : "~/categories",
		htmlSelector : "> BODY > DIV.wrapper > DIV.container > DIV.categoriesPage > DIV.nf-videos > DIV#categoriesListingWrapper > UL.categoriesListSection > LI .categoryTitleWrapper a ",
		//items: "@crawler-list://xvideo/pornhub.js#List2?[PATH=${URLDOM.attr.href}]",
		items: "@crawler-list://xvideo/pornhub.js#ListPg?[PATH=${URLDOM.attr.href}]",
		url : null,
		getTitle: function(macro){
			var tit = macro.get("TITLEDOMCONTENT");
		    	if( tit ) {
					var p = tit.indexOf("\n");
					if( p>0 ) {
						tit = tit.substring(0,p).trim();//+"-"+tit.substring(p+1).trim();
					}
				}
			return tit;	
		}
	},
	"ListPg-1":{
		// https://cn.pornhub.com/video?c=28
		contentUrl : "~${PATH}",
		// https://cn.pornhub.com/video?c=28 ?
		loadItems : function(items,contentUrl,contentCache,macros){
			items.push({
				title : "1",
				items : loadMenus4Def(this._parent.List2,contentUrl,contentCache,macros)
			});
		}
		
	},
	"ListPg-2": {
		// https://cn.pornhub.com/video?c=28
		contentUrl : "~${PATH}",
		htmlSelector : ">BODY > DIV.wrapper > DIV.container > DIV.paginationGated > ul > li.page_number > a  ",
		items: "@crawler-list://xvideo/pornhub.js#List2?[PATH=${URLDOM.attr.href}]"
		// https://cn.pornhub.com/video?c=28 ?
		
	},
	List2:{
		contentUrl : "~${PATH}",
		//fade fadeUp videoPreviewBg linkVideoThumb js-linkVideoThumb img
		//BODY.logged-out > DIV.wrapper > DIV.container > DIV.gridWrapper > DIV.nf-videos > DIV.sectionWrapper > UL#videoCategory.nf-videos.videos.search-video-thumbs
		htmlSelector : "> BODY > DIV.wrapper > DIV.container > DIV.gridWrapper > DIV.nf-videos > DIV.sectionWrapper > UL#videoCategory > LI  .title  a ",
		getValue: function(macro){
			var urlE = macro.get("URLDOM");
			var href = urlE.getAttribute("href");
			var tit = urlE.getAttribute("title");
	//print("href="+href+", tit="+tit);		
			if( href && tit ){
				return {
					title : tit,
					url   : "crawler://xvideo/pornhub.js?[PATH="+href+"]"
				};
			}
		}
	},
	 "MediaSource":{
		 // https://cn.pornhub.com/view_video.php?viewkey=640d40f843334
		 contentUrl:"~${PATH}",
		 getUrl: function(macros,content){
			 //var flashvars_427215341 = {"
			 var p1 = content.indexOf("var flashvars_");
			 p1 = p1<0 ? p1 : content.indexOf("{",p1);
			 if( p1<0 ) return null;
			 var p2 = content.indexOf("};",p1);
			 if( p2<0 ) return null;
			// var json = content.substring(p1,p2+1);
			 var data = JSON.parse(content.substring(p1,p2+1));
			 var mediaDefinitions = data.mediaDefinitions;
			 for(var i of mediaDefinitions ){
				 if( i.defaultQuality )
				     return i.videoUrl;
			 }
			 return mediaDefinitions[0].videoUrl;
		 }
	}
	
}