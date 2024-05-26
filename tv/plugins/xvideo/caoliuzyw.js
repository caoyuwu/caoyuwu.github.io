	/** 
	 *  草榴资源
	*/
{
	contentUrl : "https://caoliuzyw.com",
	
	List : {
		//htmlSelector : ">BODY > DIV.index > B > HEADER > DIV.container > DIV.logo > DIV.logonav > DIV.logonavbar > DIV.nav-item > DIV.nav-drop > div.dropitem a.dropdown-item",
		htmlSelector : ">BODY > DIV.index  HEADER > DIV.container  DIV.nav-item > DIV.nav-drop > div.dropitem a.dropdown-item",
		items : "@crawler-list://xvideo/caoliuzyw.js#ListPg?[PATH=${URLDOM.attr.href}]"
	},
	"ListPg-1" : {
		contentUrl : "~${PATH}",
		loadItems : function(items, contentUrl,contentCache,macros){
			items.push({
				title : "1",
				items : loadMenus4Def(this._parent.List2,contentUrl,contentCache,macros)
			});
		}  
	},
	"ListPg-2" : {
		contentUrl : "~${PATH}",
		  // BODY > B > MAIN > DIV.container > DIV.tablecount.row > DIV.pagecount.col > NAV.navigation > UL.pagination.justify-content-center > LI.page-item
		/*
		htmlSelector : ">BODY DIV.container > DIV.tablecount > DIV.pagecount > .navigation > UL.pagination > LI.page-item a",
		items : "@crawler-list://xvideo/caoliuzyw.js#List2?[PATH=${URLDOM.attr.href}]",
		filter : function(macros){
			var href = macros.get("URLDOM.attr.href");
			return href &&  /\.html$/ .test(href) && !href.endsWith("/page/1.html");
		}
		*/
		loadItems : function(items, contentUrl){
			if( !contentUrl.endsWith(".html") )
			   return;
			 var urlPrefix = contentUrl.substring(0,contentUrl.length-5);
			for(var page=2;page<=50;page++){
				items.push({
					title : ""+page,
					items : "@crawler-list://xvideo/caoliuzyw.js#List2?[PATH="+urlPrefix+"/page/"+page+".html]"
				});
			}   
		}
	},
	
	List2 : {
		contentUrl : "~${PATH}",
		//BODY > B > MAIN > DIV.container > DIV.tablecount.row > TABLE.table
		htmlSelector : ">BODY  DIV.container > DIV.tablecount > TABLE.table tr a",
		url : "crawler://xvideo/caoliuzyw.js?[PATH=${URLDOM.attr.href}]"  
	},
	
	MediaSource: {
		/*
		https://caoliuzyw.com/index.php/vod/play/id/67447/sid/1/nid/1.html
		*/
		contentUrl : "~${PATH}",
		getUrl : function(macros,content){
			var doc = utils.newHTMLDocument(content);
		    var e = doc.getBody().querySelector(">BODY  DIV.container > DIV.tablecount > DIV.listcount > DIV.listitems .btn  a");
		    var href = e ? e.getAttribute("href") : null;
		    if( !href ) return null;
		    return parseUrlParams(href).url;
		}
	}
	
}