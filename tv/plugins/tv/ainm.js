{
	"List":{
	    "contentUrl" : "http://ainm.cc/c/m/",
		"htmlSelector":">body > div#wlds > div.nav-box > ul >li  > a ",
		"url" : null,
		"items":{
			"htmlBodySelector" : ">body > div#wlds > div#wlds-bd  div#tabBox1-bd >div",
			 "bodyFilter": function(macro){
				 return macro.get("PMENUDOMIDX")==macro.get("HTMLDOMCHILDIDX");
			 	//"cmpMatch":"${HTMLDOMCHILDIDX}",
			 	//"cmpVal":"${PMENUDOMIDX}"
			 } ,
			 "htmlSelector":">div  ul > li  a",
		 	 "url":"crawler:tv/ainm.js;${URLDOM.attr.href}"
		}
		
	},
	"MediaSource":{
	    "htmlSelector":">body > div video"
	}
}