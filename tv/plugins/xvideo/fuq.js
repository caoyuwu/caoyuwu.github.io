{
	contentUrl : "https://www.fuq.com",
	
	List:{
		contentUrl : "~/zh",
		//htmlSelector: ">BODY >DIV#main > DIV.content-container > DIV#content >DIV.cards-container a",
		htmlSelector: ">BODY >DIV#main DIV#content > DIV.cards-container > div.card > a.item-link",
		items : "@crawler-list://xvideo/fuq.js#List2?[PATH=${URLDOM.attr.href}]",
		title : "${URLDOM.attr.title}"
	},
	List2:{
		contentUrl : "~${PATH}",
		/*
		  https://www.fuq.com/zh/category/japanese
		*/
		htmlSelector: ">BODY >DIV#main DIV#content  DIV.cards-container > div.card > a.item-link",
		
		//items : "@crawler://xvideo/fuq.js?[PATH=${URLDOM.attr.href}]",
		/*
		https://www.fuq.com/out/?l=3AASCM4XnlPBq3RHdjdxcnBrTlhMAtlsaHR0cHM6Ly92aWRlb3Bvcm5sLmNvbS92aWRlb3MvMjcxNzMwOS9wYXNzaW9uYXRlLXNleC13aXRoLWNsaWVudC1tc2QtMDUxLW1zZC0wNTEtbW9kZWxtZWRpYWFzaWEvP3Byb21vPTMxMTM0zQUEonRjAc0JiKdwb3B1bGFyBNkweyJhbGwiOiIiLCJvcmllbnRhdGlvbiI6InN0cmFpZ2h0IiwicHJpY2luZyI6IiJ9zPzOZ/OKrahjYXRlZ29yec4AAhZNwNl8W3siMSI6IkZ6WFcxRlZOcFlLIn0seyIyIjoiOG52UURENW5Fc0oifSx7IjMiOiI4NlNpMzNLd3ZhMCJ9LHsiLTEiOiJ2YXI0eEZKNGl4OCJ9LHsiLTIiOiJsTEFUSGVCZXBaZyJ9LHsiLTMiOiJ4SktDUFdzZ3I3TSJ9XQ%3D%3D&c=6d7e9c16&v=3&
		https://pornl.com/videos/2717309/passionate-sex-with-client-msd-051-msd-051-modelmediaasia/?promo=31134
		*/
		getUrl : function(macro){
			//var href = def._parent.contentUrl+macro.get("URLDOM.attr.href");
			var href = macro.get("URLDOM.attr.href");
			return "@crawler://xvideo/fuq.js?[PATH="+encodeURIComponent(href)+"]";
			//return "browser-"+href;
		},
		
		title : "${URLDOM.attr.title}"
	},
	
	"MediaSource":{
		//contentUrl : "~",//${PATH}",
		contentUrl : "~${PATH}",
		getUrl : function(contentUrl,macro){
			//print("PATH="+macro.get("PATH"));
			//var url = contentUrl+macro.get("PATH");
			//print("url="+url);
			var m = utils.httpGetRespHeaders(contentUrl,null,0x420);
			//print("m="+m);
		//for(var n in m) print(n+" = "+m[n]);
			var location = m.Location || m.location;
	 		if( !location ){
				return 	 "browser-"+contentUrl;
			}	
			/*
			https://enter.javhd.com/track/Mzg5NjAuMi4yLjIuMC4wLjAuMC4w/en/id/12150
			
			*/
			return 	 "browser-"+location;
		}
	}
}