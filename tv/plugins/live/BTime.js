/*
{label:"北京时间-直播",items:"@crawler-list:live/BTime.js?[PATH=live]"},

scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/live/BTime.js router:/www/tv/plugins/live/

wss://kite.btime.com/

publicParam : {  //长链接的公共参数
            os_type: 'pc',
            room_id : App.config.gid,
            guid: $utils.cookie.get("__guid"),
            protocol : 1, //版本号
            chat_type : 1 //聊天室类型，1聊天室2组聊3单聊
        },
		{"os_type":"pc","room_id":"56l2cocdrc48nu8sc8i4np9qabf",
			"guid":"f08a1b0a-aaf2-41f3-931c-49f4819fe5ae","protocol":1,
			"chat_type":1,"user_id":"6771868",
			"token":"ef17bf6bc937adadfb8148a226731af3"}		
			
*/
{
	contentUrl :"https://www.btime.com",
	
	List :{
		contentUrl:"~/${PATH}",
		/*
		BODY > DIV > DIV#main.w1200 > DIV.page-main > DIV#artificial_23728338_21.tpl_row.clearfix.module_row 
		> DIV.tpl_col.module_col.module_col_0 > DIV#artificial_66550136_412 > DIV.module_inner 
		> DIV.module_live > DIV.focus_wrap > DIV.right_item.right_list_pic > UL > LI.active
		*/
		loadItems: function(items,contentUrl){
			/*
			layoutData: {
			firstInfoflow:	
			*/
			var html = utils.httpGetAsString(contentUrl,0x408);
			var p1 = html.indexOf("layoutData: {");
			var p2 = p1<0 ? -1 : html.indexOf("firstInfoflow:",p1+13);
			var p3 = p1<0 ? -1 : html.indexOf("columnData:",p1+13);//columnData:
			if( p3>0 && p3<p2 ) p2=p3;
			if( p2<0 ) return null;
			print("p1 = "+p1+" , p2="+p2);	
			var json = html.substring(p1+12,p2).trim();
			if( json.charCodeAt(json.length-1)==44 ){
				json = json.substring(0,json.length-1);
			}
		//	print(json);
			var m = JSON.parse(json);
			/*
			modules[0] -> modules[0][0] -> data -> news[0] -> gid  = 55nkclfoqo88dc86uk5qg6rj3il
		    modules[0] -> modules[0][0] -> data -> news[0] -> data -> title  = 2025-26中国排球超级联赛：河南 vs 北京北冰洋
			*/
			for( var modules1 of m.modules) {
				if(modules1.modules)for( var modules2 of modules1.modules) {
					for( var modules3 of modules2) {
						if(modules3.data.news) for(var news of modules3.data.news ){
							var gid = news.gid;
							var title = news.data.title;
							items.push({title:title,url:"bjtv://"+gid,msgSocketArgs:[gid]});
						}
					}
				}
			}
		}
		/*
		htmlSelector : ">body DIV.page-main DIV.module_inner > DIV.module_live  DIV.right_item UL > LI ",
		//loadMenus4HtmlSelector
		getValue: function(macro){
			var urlE = macro.get("URLDOM");
			var json = li.getAttribute("data-json");
			if( !json ) return null;
			prinnt(json);
		}
		*/
	}
}