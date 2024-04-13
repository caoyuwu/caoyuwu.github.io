{
	"List":{
		"contentUrl":"https://www.yibababa.com/vod/",
		"htmlSelector":">body div.w3-container p",
		"matcherRegExpByContent":/([^\n]+)(?::|：)\s*((https|http):\/\/[^\n]+)/g,
		"filter" : function(macro){
			return  macro.get("PREVDOMID")=="18";
			//"cmpMatch":"18",
			//"cmpVal":"${PREVDOMID}"
		}
		
	}
}	