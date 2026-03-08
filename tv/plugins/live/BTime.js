/*
{label:"QingtingFM直播",items:"@crawler-list:live/BTime.js?#[PATH=live]"},
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
		loadItems : function(items,contentUrl){
			
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