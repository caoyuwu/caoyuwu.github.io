{
	"List":{
		"contentUrl":"http://tv.haoqu99.com/",
		"htmlSelector":">body div#bd > div.filter > div.bd >  dl.filter-area  ul.filter-list > li a",
		"items": "@crawler-list:tv/haoqu99.js#List2;http://tv.haoqu99.com${URLDOM.attr.href}"
	},
	"List2":{
		"htmlSelector":" > body > div#bd > div.col-sya.p-cols > div.p-col1  div.channel-list > div.bx-sya > div.bd",
		"titSelector": " >div > h3 ",
		"items":{
			"htmlBodySelector":"@PMENUDOM",
			"htmlSelector": ">div >ul > li > a",
			"url": "@crawler-urls:tv/haoqu99.js;http://tv.haoqu99.com${URLDOM.attr.href}"
		}
	},
	"Urls":{
		"htmlSelector" : " > body > div#bd > div.col-sya.p-cols > div.p-col1 div.bx-syc div.bd div.tab-syb ul.tab-list-syb > li",
		"url": "crawler:tv/haoqu99.js?[DATAPLAYERID=${URLDOM.attr.data-player}]"
		,"xxxxurl": "crawler:tv/haoqu99.js;http://tv.haoqu99.com/e/extend/tv.php?id=${URLDOM.attr.data-player}"
	},
	"MediaSource":{
		  "xxxhtmlSelector":">body  video",
		  "contentUrl":"http://tv.haoqu99.com/e/extend/tv.php?id=${DATAPLAYERID}",
		  "urlMatcherRegExp":[
		      /<video[\s\S]*>[\s\S]*src="((https|http):\/\/[^"]+)"[\s\S]*<\/video>/,
		      /new\sHlsJsPlayer\(\{[\s\S]*"url":"((https|http):\/\/[^"]+)"[\s\S]*\}\)/
		  ]
	}
	
}	