{
	contentUrl : "https://live.kuaishou.com",
	
	List: {
		contentUrl : "~${PATH}"  // /YL/1000005
		/*
		DIV#app > DIV.cate-main > DIV.main > DIV.list > DIV.load-more
		 > DIV.category-row > DIV.category-row-info 
		 > DIV.live-card-main.live-card-finetune > DIV.live-card-scale 
		 > DIV.live-card > DIV.card-info > DIV.info-main > DIV.info-main-info 
		 > DIV.info-user > A.user-info.has-current-watching
		*/
		htmlSelector: ">BODY  >DIV#app > DIV.cate-main > DIV.main > DIV.list DIV.live-card-main DIV.live-card DIV.info-user  A.user-info",
		url : "@crawler://live/kuaishou.js?[PATH=${URLDOM.attr.href}]"
	},
	
	MediaSource:{
		contentUrl : "~${PATH}",
		url : "browser-${CONTENTURL}"
	}
}