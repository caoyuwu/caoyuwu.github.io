{
	/*
	  https://tokyo-hot.com/index?lang=zh-TW
	  https://tokyo-hot.com/product/?page=2
	*/
	contentUrl : "https://my.tokyo-hot.com",
	
	List: {
		loadItems : function(items){
			for(var page=1;page<=20;page++){
				items.push({
					title : ""+page,
					items : "@crawler-list://xvideo/tokyo-hot.js#List2?[PAGE="+page+"]"
				});
			}
		}
	},
	List2: {
		contentUrl : "~/product/?page=${PAGE}&lang=zh-TW",
		htmlSelector : "BODY > DIV#container > DIV#main > UL.list > li a",
		url : "crawler://xvideo/tokyo-hot.js?[PATH=${URLDOM.attr.href}]"
	},
	
	 "MediaSource":{
		 /*
		 https://my.tokyo-hot.com/product/crazyasia08537/
		 */
		 contentUrl : "~${PATH}",
		// htmlSelector : ">BODY video"
		 urlMatcherRegExp : /<video[\s\S]*>[\s\S]*src="((https|http):\/\/[^"]+)"[\s\S]*<\/video>/
		}
}