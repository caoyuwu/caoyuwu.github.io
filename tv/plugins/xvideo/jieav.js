{
	"List":{
		"contentUrl":"https://www.jieav.com",
		"htmlSelector":">body > div#menu ul#menuul > li > a",
		"items": "@crawler-list://xvideo/jieav.js#List2;https://www.jieav.com${URLDOM.attr.href}",
		"filterExp":"/index\\.html$",
		"filterVal":"${URLDOM.attr.href}"
	},
	"List2":{
		"htmlSelector" : ">body >div#container > div#content > div.list_box ul >  a",
		"url": "crawler://xvideo/jieav.js;https://www.jieav.com/video/${URLDOM.attr.href.name}",
		"title": "${URLDOM.attr.title}"
	},	
	"MediaSource":{
		"urlMatcherRegExp" : /.+url:\s?'((https|http):\/\/.+)'.+/
	}
}