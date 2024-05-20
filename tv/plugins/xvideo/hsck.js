{
	"List":{
		/*
		   http://hsck.net , hscangku.com 跳转的 界面
		*/
		"contentUrl":"http://777995.xyz/",
		"htmlSelectors":[ ">body > div.container > div.row > div.stui-header__top > ul.stui-header__menu > li a",
		                ">body > div.container > div.row  > div.stui-warp-head > div.stui-pannel  > ul.stui-pannel__menu  > li a"
		                ],
		//"htmlSelector":">body > div.container > div.row > div   ul > li a",
		"items": "@crawler-list://xvideo/hsck.js#List2;${CONTENTURL}${URLDOM.attr.href}",
		"filter": function(macro){
			var href = macro.get("URLDOM.attr.href");
			return href && href.endsWith(".html");
		}
	},
	"List2":{
		"htmlSelector":">body > div.container > div.row >div.stui-warp-content > div.stui-pannel > div.stui-pannel-bd > ul.stui-vodlist > li h4 >a  ",
		"url":"crawler://xvideo/hsck.js;${CONTENTURLORIGIN}/${URLDOM.attr.href}",
		"filter": function(macro){
			var href = macro.get("URLDOM.attr.href");
			return href && href.endsWith(".html") && href.startsWith("/vodplay/");
		}
	 },
	 
	 "MediaSource":{
		 /*
		 <script type="text/javascript">var player_aaaa={  }</script>
		   "url":"https:\/\/t25.cdn2020.com\/video\/m3u8\/2024\/05\/18\/4184631e\/index.m3u8"
		 */
		getUrl:function(macro,content){
			const prefix = '<script type="text/javascript">var player_aaaa={';
			const suffix = "}</script>";
			var v= extractJsonValues(content,prefix,suffix,1);
			return v ? v.url : null;
		}
		 }
}