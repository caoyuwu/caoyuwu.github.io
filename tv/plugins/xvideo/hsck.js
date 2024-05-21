{
	List:{
		/*
		   http://hsck.net , hscangku.com 跳转的 界面
		*/
		//"contentUrl":"http://777995.xyz/",
		contentUrl : "http://hsck323.cc/",
		htmlSelectors:[ ">body > div.container > div.row > div.stui-header__top > ul.stui-header__menu > li a",
		                ">body > div.container > div.row  > div.stui-warp-head > div.stui-pannel  > ul.stui-pannel__menu  > li a"
		                ],
		//"htmlSelector":">body > div.container > div.row > div   ul > li a",
		"items": "@crawler-list://xvideo/hsck.js#ListPg;${CONTENTURLORIGIN}${URLDOM.attr.href}",
		"filter": function(macro){
			var href = macro.get("URLDOM.attr.href");
			return href && href.endsWith(".html");
		}
	},
	ListPg:{
		/*
		BODY > DIV.container > DIV.row > DIV.stui-warp-content > DIV.stui-pannel.clearfix > DIV.stui-pannel-ft > UL.stui-page.text-center.clearfix
		*/
		htmlSelector : ">BODY > DIV.container > DIV.row > DIV.stui-warp-content > DIV.stui-pannel > DIV.stui-pannel-ft > UL.stui-page > li a",
		items: "@crawler-list://xvideo/hsck.js#List2;${CONTENTURLORIGIN}${URLDOM.attr.href}",
		filter: function(macro){
			var tit = macro.get("DOMCONTENT");
			if( !tit || ! /^\s*[-+]?\d+(\.\d+)?\s*$/ .test(tit) ){
				return false;
			}
			var href = macro.get("URLDOM.attr.href");
			return href && href.endsWith(".html");
		}
	},
	"List2":{
		// http://777995.xyz/vodtype/8.html
		"htmlSelector":">body > div.container > div.row >div.stui-warp-content > div.stui-pannel > div.stui-pannel-bd > ul.stui-vodlist > li h4 >a  ",
		"url":"crawler://xvideo/hsck.js;${CONTENTURLORIGIN}${URLDOM.attr.href}",
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