{
	"List":{
		"contentUrl":"https://www.tasexy.com/list.html",
		"htmlSelector":">body > div.container >div.site > a",
		"items": "@crawler-list:xvideo/tasexy.js#List2;https://www.tasexy.com${URLDOM.attr.href}",
		"filterExp":/\/list\/\d\d\d\.html$/,
		"filterVal":"${URLDOM.attr.href}"
	},
	"List2":{
		"htmlSelector":">body > div.container >div.list_box > ul > a",
		"url": "crawler:xvideo/tasexy.js;https://www.tasexy.com/embed/${URLDOM.attr.href.name}",
		"title": "${URLDOM.attr.title}"
	},
	"MediaSource":{
		"urlMatcherRegExp" : /.+url:\s?'((https|http):\/\/.+)'.+/
	}
}