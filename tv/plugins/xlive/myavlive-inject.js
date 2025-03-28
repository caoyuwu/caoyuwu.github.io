// btn-visitors-agreement-accept  我已经年满18岁
//btn ds-btn-apply-2-ds ds-btn-inline-block cookies-reminder__accept-all-button
var btn;
 btn = document.querySelector("button.btn-visitors-agreement-accept");
if( btn ) btn.click();
btn = document.querySelector("button.cookies-reminder__accept-all-button");
if( btn ) btn.click();
// https://zh.myavlive.com/girls/recommended
function getMenu(){
	/*
	div#body > div.main-layout > div.wrapper > MAIN#app.main-layout-main > div.main-layout-main-right > div.main-layout-main-content > div.page-wrapper > div.tag-page > div.index-page-content-wrapper > div.model-list-wrapper > div.model-list-container > div.models-list-container > div.tag-page-model-list > div.model-list-item > A
	*/
	var selector = "div#body  main#app.main-layout-main  div.model-list-wrapper  div.model-list-container  div.models-list-container  div.tag-page-model-list  div.model-list-item  A";
	var a = document.body.querySelectorAll(selector);
	var items = [];
	for( var e of a ){
		var href = e.href;
		var p = href ? href.lastIndexOf("/") : -1; 
		if( p<0 ) continue;
		var s = href.substring(p+1);
		//"crawler://xlive/mycamtv.js?[PATH=${URLDOM.attr.href}]"  
		items.push({urls:[
				"crawler://xlive/myavlive.js?[PATH="+s+"]"
			   // "browser-"+href
			],
			title:s}
			);
	}
	return JSON.stringify(items);
}
//https://zh.myavlive.com/_Alice_1
function getMediaSource(){
	var scripts = document.body.getElementsByTagName("script");
	var json = null;
	var Prefix1 = "window.__PRELOADED_STATE__";
	for(var script of scripts){
		var s = script.textContent;
		if( !s ) continue;
		s = s.trim();
		if( !s.startsWith(Prefix1) ) continue;
		s = s.substring(Prefix1.length).trim();
		if( s.startsWith("=") ){
			json = s.substring(1).trim();
			break;
		}  
	}
	if( !json ) return;
	var r = JSON.parse(json);
	//if( !r.viewCam || !r.viewCam.model || !r.configV3 || !r.configV3.initialCommon || !r.configV3.initialCommon  ) return;
	//console.log(r);
	var id = r.viewCam.model.id;
	if( !id ) return;
	//configV3.initialCommon.hlsStreamUrlTemplate
	var hlsStreamUrlTemplate = r.configV3.initialCommon.hlsStreamUrlTemplate;
	var hlsStreamHosts = r.configV3.initialCommon.hlsStreamHosts;
	var hlsStreamHostsA = [];
	for(var n in hlsStreamHosts) hlsStreamHostsA.push(hlsStreamHosts[n]);
	/*
	"hlsStreamHosts": {
				"A": "doppiocdn.com",
				"B": "doppiocdn1.com",
				"C": "doppiocdn.media",
				"D": "doppiocdn.net",
				"E": "doppiocdn.org",
				"F": "doppiocdn.live",
				"A1": "doppiocdn.com",
				"B1": "doppiocdn1.com",
				"C1": "doppiocdn.media",
				"D1": "doppiocdn.net",
				"E1": "doppiocdn.org",
				"F1": "doppiocdn.live"
			},
	*/
	  var j = Math.floor(Math.random()*hlsStreamHostsA.length) % hlsStreamHostsA.length  ;
	var cdnHost = hlsStreamHostsA[j];
	var suffix = "_auto";
 console.log("[myavlive-inject.getMediaSource] id=%s,hlsStreamUrlTemplate=%s,cdnHost=%s",id,hlsStreamUrlTemplate,cdnHost);	
	//"https:\u002F\u002Fedge-hls.{cdnHost}\u002Fhls\u002F{streamName}\u002Fmaster\u002F{streamName}{suffix}.m3u8"
	//https://edge-hls.doppiocdn.net/hls/193425108/master/193425108_auto.m3u8?playlistType=lowLatency
	return hlsStreamUrlTemplate.replaceAll("{cdnHost}",cdnHost)
	                            .replaceAll("{streamName}",id)
	                            .replaceAll("{suffix}",suffix)
	                            +"?playlistType=lowLatency"
	                            ;
}
