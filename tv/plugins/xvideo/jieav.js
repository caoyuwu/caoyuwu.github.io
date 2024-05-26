{
	/**
	 *  403 错误
	 */
	contentUrl : "https://www.jieav.com",
	"List":{
		"htmlSelector":">body > div#menu ul#menuul > li > a",
		"items": "@crawler-list://xvideo/jieav.js#List2?[PATH=${URLDOM.attr.href}]",
		filter : function(macros){
			var href = macros.get("URLDOM.attr.href");
			return href && /\/index\.html$/ . test(href);
		}
	},
	"List2": {
		contentUrl : "~${PATH}",
		"htmlSelector" : ">body >div#container > div#content > div.list_box ul >  a",
		"url": "crawler://xvideo/jieav.js?[NAME=${URLDOM.attr.href.name}]",
		"title": "${URLDOM.attr.title}"
	},	
	"MediaSource":{
		contentUrl : "~/video/${NAME}",
		"urlMatcherRegExp" : /.+url:\s?'((https|http):\/\/.+)'.+/
	}
}