{
	contentUrl : "https://www.fuq.com",
	
	List:{
		contentUrl : "~/zh",
		//htmlSelector: ">BODY >DIV#main > DIV.content-container > DIV#content >DIV.cards-container a",
		htmlSelector: ">BODY >DIV#main DIV#content > DIV.cards-container > div.card > a.item-link",
		items : "@crawler-list://xvideo/fuq.js#List2?[PATH=${URLDOM.attr.href}]",
		title : "${URLDOM.attr.title}"
	},
	List2:{
		contentUrl : "~${PATH}",
		/*
		*/
		htmlSelector: ">BODY >DIV#main DIV#content  DIV.cards-container > div.card > a.item-link",
		
		items : "@crawler://xvideo/fuq.js?[PATH=${URLDOM.attr.href}]",
		title : "${URLDOM.attr.title}"
	},
	
	"MediaSource":{
		contentUrl : "~${PATH}"
		
	}
}