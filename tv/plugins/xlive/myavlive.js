/*
https://zh.myavlive.com/
同 https://zh.mycamtv.com
*/
{
	contentUrl : "https://zh.myavlive.com",
	cookiesFromCfgFile : "Myavlive-Cookies.txt",
	List: {
			/*
			BODY.visitor-agreement-hidden.non-touch > DIV#body > DIV.indexpage.main-layout.main-layout__with-navbar.sticky-header-desktop.sticky-header-mobile.sticky-subheader-mobile 
			> DIV.wrapper > MAIN#app.main-layout-main.main-layout-main-multiple-column > DIV.main-layout-main-right > DIV.main-layout-main-content > DIV.page-wrapper > DIV.index-page.index-page-multiple.page.page-columns > DIV.model-list-wrapper.multiple-categories-wrapper
			 > DIV.model-list-container > DIV.category-countryGenderModels.collapsable.expandable-multiple-categories-category.multiple-categories-category.segment-expanded-with-model-items-count-24.slidable 
			 > DIV.multiple-categories-category-header

			*/
			//htmlSelector: ">BODY DIV#body > DIV.indexpage  DIV.wrapper DIV.page-wrapper DIV.index-page DIV.model-list-wrapper DIV.model-list-container DIV.category-countryGenderModels DIV.multiple-categories-category-header a",
			//items : "@crawler-list://xvideo/mycamtv.js#List2?[PATH=${URLDOM.attr.href}]"
			loadItems: 	function(items,_contentUrl,contentCache,macros){
				var groups1 = {girls:"女",couples:"情侣",men:"男",trans:"跨"};
				var groups2 = {recommended:"推荐",tagLanguageChinese:"中文",tagLanguageJapanese:"日语",autoTagNew:"新",autoTagVr:"VR"};
				for(var id1 in groups1){
					items.push({ title:groups1[id1], items:items2=[]});
					for(var id2 in groups2){
						items2.push({ title:groups2[id2],
							 items:"@crawler-list://xlive/myavlive.js#List2?[PATH="+id1+"/"+id2+"]"
						 	});
					}
				}
			}
		},
		List2: {
			contentUrl : "~/${PATH}", httpReqOpts:0x488,
			
    			/*
			loadUrlContent : function(url) {
				if( !webview ) webview = utils.getWebView();
    			//print("webview = "+webview);
    			var injectURL = utils.toAbsoluteURL(this._parent._defUrl,"../webview/httprequest.js");
    			var homeUrl = utils.getHomeURL(url);
    			print("myavlive.loadUrlContent : url="+url);
    			print("homeUrl="+homeUrl);
    			print("injectURL="+injectURL);
    			webview.loadUrl(homeUrl,[injectURL],1);  // 1:Visible
    			var s = webview.evalOnPageFinished("typeof(window.httpGetAsString)=='function'",
    				//"httpGetAsString('/index.html',null,0)",
    				"httpGetAsString('"+url+"',null,0)",
    			10, // timeout
    			1  // 隐藏 WebView
    			);
    			return s;
			},
			/*
			> DIV#body 
			    > DIV.main-layout.main-layout__with-navbar.sticky-header-desktop.sticky-header-mobile.sticky-subheader-mobile.tag-layout
				 > DIV.wrapper 
				 > MAIN#app.main-layout-main.main-layout-main-multiple-column 
				 > DIV.main-layout-main-right > DIV.main-layout-main-content 
				 > DIV.page-wrapper > DIV.tag-page.index-page.page.page-columns 
				 > DIV.index-page-content-wrapper 
				 > DIV.model-list-wrapper.multiple-categories-wrapper > DIV.model-list-container 
				 > DIV.models-list-container 
				 > DIV.featured-model-list.lazy-load-model-list.model-list.tag-page-model-list 
				 > DIV.model-list-item > A#model-list-item-175683625.model-list-item-link.model-list-item-link-mobile
				 //main-layout__with-navbar.sticky-header-desktop.sticky-header-mobile.sticky-subheader-mobile.tag-layout
			* /
			htmlSelector : ">BODY > DIV#body > DIV.main-layout > DIV.wrapper > MAIN#app.main-layout-main > DIV.main-layout-main-right > DIV.main-layout-main-content > DIV.page-wrapper > DIV.tag-page > DIV.index-page-content-wrapper > DIV.model-list-wrapper > DIV.model-list-container > DIV.models-list-container > DIV.tag-page-model-list > DIV.model-list-item > A ",
			titSelector : "div > span.model-name",
			url : "crawler://xlive/mycamtv.js?[PATH=${URLDOM.attr.href}]"  
			*/
			loadItems: 	function(items,contentUrl,contentCache,macros){
				/*
				https://zh.mycamtv.com/api/front/models/get-list
				https://zh.mycamtv.com/api/front/models?
				limit: 60
				offset: 0
				primaryTag: girls
				filterGroupTags: %5B%5B%22recommended%22%5D%5D
				sortBy: recommendedScore
				userRole: guest
				watchedIds%5B0%5D: 193676287
				srpm: 1
				rcmGrp: A
				uniq: 5jifp6xbykeqrtal
				*/
				var uniq = "";
				for(var i=0;i<16;i++){
					var d = Math.random()*35;
					uniq += i<10?""+i : String.fromCharCode(97+i-10);
				}
				var homeUrl = utils.getHomeURL(contentUrl);
				var path = macros.PATH;//get("PATH");
				var p = path.indexOf("/");
				if( p<=1 ) return;
				var primaryTag = path.substring(0,p);
				var filterGroupTag = path.substring(p+1);
				var url = homeUrl+"/api/front/models?limit=60&offset=0&primaryTag="+primaryTag
				                       +"&filterGroupTags="+encodeURIComponent("[[\""+filterGroupTag+"\"]]")
									   +"&sortBy=recommendedScore&userRole=guest&srpm=1&rcmGrp=A&uniq="+uniq
									   ;
	//print("url = "+url);								   
				var text =  utils.httpGetAsString(url,0x408);	
	//print("text = "+text);	
				var models = JSON.parse(text).models;
				for(var model of models){
					//var hlsPlaylist = model.hlsPlaylist;
					  //https://edge-hls.doppiocdn.com/hls/192861445/master/192861445_240p.m3u8
					  // https://edge-hls.doppiocdn.net/hls/193425108/master/193425108_auto.m3u8?playlistType=lowLatency
					//var viewersCount = model.viewersCount;
					//var streamName = model.streamName; //"streamName": "192861445",
					//var username = model.username;
					items.push({urls:[
								"browser-"+homeUrl+"/"+model.username,
								model.hlsPlaylist
								//"crawler://xlive/myavlive.js?[PATH="+s+"]"
								   // "browser-"+href
								],
								title : model.username+"("+model.viewersCount+")"
							  }
						);
					//?playlistType=lowLatency
				} // models						   
				//print("List2.loadItems _contentUrl = "+_contentUrl);
				/*
				if( !webview ) webview = utils.getWebView();
				//var injectURL = utils.toAbsoluteURL(this._parent._defUrl,"myavlive-inject.js");
				//webview.loadUrl(contentUrl,[injectURL],1);
				webview.loadUrl(contentUrl,null,1);
				var s = webview.evalOnPageFinished("typeof(window.getMenu)=='function' && document.readyState=='complete'","getMenu()",20,1);
		//print("s = "+s);		 
				var a = JSON.parse(s);
				if( a ) for(var e of a) items.push(e);
				*/
			}
			// model-name"
		},
		"MediaSource":{
		 // https://cn.pornhub.com/view_video.php?viewkey=640d40f843334
		 contentUrl:"~/${PATH}",
		 // url:"..."
		 getUrl : function(contentUrl,macro){
			 print("List2.getUrl contentUrl = "+contentUrl);
				//var injectURL = utils.toAbsoluteURL(this._parent._defUrl,"myavlive-inject.js");
				//webview.loadUrl(contentUrl,[injectURL],1);
				webview.loadUrl(contentUrl,null,1);
				var s = webview.evalOnPageFinished("typeof(window.getMediaSource)=='function' && document.readyState=='complete'","getMediaSource()",20,1);
				return s;
		 }
		}
	
}