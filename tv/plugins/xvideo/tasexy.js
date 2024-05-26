{
	/*
	   已经 403 限制
	*/
	contentUrl : "https://www.tasexy.com",
	List: {
		"contentUrl":"~/list.html",
		"htmlSelector":">body > div.container >div.site > a",
		"items": "@crawler-list:xvideo/tasexy.js#List2?[PATH=${URLDOM.attr.href}]",
		filter : function(macros){
			var href = macros.get("URLDOM.attr.href");
			// /\/list\/\d\d\d\.html$/ .test('/list/000.html')
			return href && /\/list\/\d\d\d\.html$/ .test(href)
			
		}
	},
	List2 : {
		"contentUrl":"~${PATH}",
		"htmlSelector":">body > div.container >div.list_box > ul > a",
		// ;https://www.tasexy.com/embed/${URLDOM.attr.href.name}
		"url": "crawler:xvideo/tasexy.js?[name=${URLDOM.attr.href.name}]",
		"title": "${URLDOM.attr.title}"
	},
	MediaSource: {
		"contentUrl":"~/embed/${NAME}",
		"urlMatcherRegExp" : /.+url:\s?'((https|http):\/\/.+)'.+/
	}
}