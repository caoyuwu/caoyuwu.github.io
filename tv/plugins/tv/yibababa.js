{
	"List":{
		"contentUrl":"https://www.yibababa.com/vod/",
		"linesByHtmlSelector":">body  div.w3-container  ",
		//"urlLineMatcher":/([^\n:：]+)(?:(:|：)\s*((https|http):\/\/[^\n]+)/
		urlLineMatcher : function(line){
			var p = line.indexOf("https://");
			if( p<0 ) p = line.indexOf("http://");
			if( p<0 ) return null;
			if( p>0 ){
				c = line.charAt(p-1);
				if( (c>='a' && c<='z') || (c>='A' && c<='Z')  )
					return null;
			}
			var tit = line.substring(0,p).trim();
			var url = line.substring(p);
			if( tit.endsWith(":") || tit.endsWith("：")  )
				tit = tit.substring(0,tit.length-1);
			return [null,tit,url];  
		}
	}
}	