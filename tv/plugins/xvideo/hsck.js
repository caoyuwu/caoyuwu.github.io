{
	/*
		   http://hsck.net , hscangku.com 跳转的 界面
		      var strU="https://666937.xyz:8899/?u="+window.location+"&p="+
		   https://666937.xyz:8899/?u=http://hsck.net/&p=/
		*/
	//"contentUrl":"http://777995.xyz/",
	//"http://hsck324.cc",
	contentUrl : function(){
		var url = "https://666937.xyz:8899/?u=http://hsck.net/&p=/"; // 从 http://hsck.net 返回获取
		var m = utils.httpGetRespHeaders(url,{},0x20|0x400);	
		return m.Location;	
	},
	List:{
		htmlSelectors:[ ">body > div.container > div.row > div.stui-header__top > ul.stui-header__menu > li a",
		                ">body > div.container > div.row  > div.stui-warp-head > div.stui-pannel  > ul.stui-pannel__menu  > li a"
		                ],
		//"htmlSelector":">body > div.container > div.row > div   ul > li a",
		//"items": "@crawler-list://xvideo/hsck.js#ListPg;${CONTENTURLORIGIN}${URLDOM.attr.href}",
		"items": "@crawler-list://xvideo/hsck.js#ListPg?[PATH=${URLDOM.attr.href}]",
		"filter": function(macro){
			var href = macro.get("URLDOM.attr.href");
			return href && href.endsWith(".html");
		}
	},
	ListPg:{
		contentUrl:"~${PATH}",
		/*
		BODY > DIV.container > DIV.row > DIV.stui-warp-content > DIV.stui-pannel.clearfix > DIV.stui-pannel-ft > UL.stui-page.text-center.clearfix
		*/
		htmlSelector : ">BODY > DIV.container > DIV.row > DIV.stui-warp-content > DIV.stui-pannel > DIV.stui-pannel-ft > UL.stui-page > li a",
		///items: "@crawler-list://xvideo/hsck.js#List2;${CONTENTURLORIGIN}${URLDOM.attr.href}",
		items: "@crawler-list://xvideo/hsck.js#List2?[PATH=${URLDOM.attr.href}]",
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
		contentUrl:"~${PATH}",
		// http://777995.xyz/vodtype/8.html
		"htmlSelector":">body > div.container > div.row >div.stui-warp-content > div.stui-pannel > div.stui-pannel-bd > ul.stui-vodlist > li h4 >a  ",
		//"url":"crawler://xvideo/hsck.js;${CONTENTURLORIGIN}${URLDOM.attr.href}",
		"url":"crawler://xvideo/hsck.js?[PATH=${URLDOM.attr.href}]",
		"filter": function(macro){
			var href = macro.get("URLDOM.attr.href");
			return href && href.endsWith(".html") && href.startsWith("/vodplay/");
		}
	 },
	 
	 "MediaSource":{
		 contentUrl:"~${PATH}",
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