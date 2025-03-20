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
				//				女主播 情侣	男主播 跨性別
				{title:"女主播",items:[
					{title:"推荐",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/girls/recommended]"},
					{title:"中文",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/girls/chinese]"},
					{title:"日语",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/girls/japanese]"},
					{title:"新主播",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/girls/new]"},
					{title:"VR直播",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/girls/vr]"}
				   ]
				  },
				  {title:"情侣",items:[
  					{title:"推荐",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/couples/recommended]"},
  					{title:"中文",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/couples/chinese]"},
  					{title:"日语",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/couples/japanese]"},
  					{title:"新主播",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/couples/new]"},
  					{title:"VR直播",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/couples/vr]"}
				  				   ]
				  				  },
				  {title:"男主播",items:[
  					{title:"推荐",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/men/recommended]"},
  					{title:"中文",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/men/chinese]"},
  					{title:"日语",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/men/japanese]"},
  					{title:"新主播",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/men/new]"},
  					{title:"VR直播",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/men/vr]"}
				  				   ]
				  				  },	
				  {title:"跨性別",items:[
	  					{title:"推荐",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/trans/recommended]"},
	  					{title:"中文",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/trans/chinese]"},
	  					{title:"日语",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/trans/japanese]"},
	  					{title:"新主播",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/trans/new]"},
	  					{title:"VR直播",items:"@crawler-list://xlive/mycamtv.js#List2?[PATH=/trans/vr]"}
				  				   ]
				  				  }			  			  
				);
		}
	},
	List2: {
		contentUrl : "~${PATH}", httpReqOpts:0x488,
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
		*/
		htmlSelector : ">BODY > DIV#body > DIV.main-layout > DIV.wrapper > MAIN#app.main-layout-main > DIV.main-layout-main-right > DIV.main-layout-main-content > DIV.page-wrapper > DIV.tag-page > DIV.index-page-content-wrapper > DIV.model-list-wrapper > DIV.model-list-container > DIV.models-list-container > DIV.tag-page-model-list > DIV.model-list-item > A ",
		// model-name"
		url : "crawler://xlive/mycamtv.js?[PATH=${URLDOM.attr.href}]" , 
		titSelector : "div > span.model-name"
		
		
	}
}