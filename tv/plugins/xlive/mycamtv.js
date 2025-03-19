{
	contentUrl : "https://zh.mycamtv.com",
	
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
			items.push(
				{title:"推荐",items:"@crawler-list://xvideo/mycamtv.js#List2?[PATH=/girls/recommended]"},
				{title:"中文",items:"@crawler-list://xvideo/mycamtv.js#List2?[PATH=/girls/chinese]"},
					{title:"日语",items:"@crawler-list://xvideo/mycamtv.js#List2?[PATH=/girls/japanese]"},
					{title:"顶级免费现场视频",items:"@crawler-list://xvideo/mycamtv.js#List2?[PATH=/girls/popular]"},
					{title:"情侣直播",items:"@crawler-list://xvideo/mycamtv.js#List2?[PATH=/couples]"},
					{title:"新 主播",items:"@crawler-list://xvideo/mycamtv.js#List2?[PATH=/girls/new]"},
					{title:"VR直播",items:"@crawler-list://xvideo/mycamtv.js#List2?[PATH=/girls/vr]"}
					
						);
		}
	},
	List2: {
		contentUrl : "~${PATH}",
		}
}