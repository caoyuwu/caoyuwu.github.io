/*
http://caoyuwu.eu.org/tv/plugins/Test.js
testvideo://1
test-menu-list://1
??[proxy=*]
??[proxy=default]
测试:
 JSMediaDataSourcePrepare.main
参数：
  _scriptURL 

返回:{
	label:"",
	url:...
} 
  
*/
function prepareMediaSource(url,params){
	print("prepareMediaSource : url="+url+"; params="+params);
	var path = utils.getUrlHostAndPath(url);
	/*
	  testvideo://http-caoyuwu.eu.org/video/oceans.mp4
	  testvideo://http-172.20.0.20/media/oceans.mp4
	  testvideo://http-192.168.1.12/media/oceans.mp4
	*/
	if( path.startsWith("http-")){
		return "http://"+path.substring(5);
	}
	if( path.startsWith("https-")){
		return "http://"+path.substring(6);
	}
	/*
	var s = utils.aescbcEncrypt( "fd4ec36ac783979e","d79709285951d7c9", "abc123汉字");
		print(s);
		s = utils.aescbcDecrypt("fd4ec36ac783979e","d79709285951d7c9", s);
		print(s);
		s =  "u1qrp5pv5NCto1FlV9EqRKqJOWLoSls/AUkk8Avl8wu9D6hIqCJuPcwtjgjyUwTaHcXW/ACI0dE7fIhdzBo4u9/M1Kf6CRu6kIFNNc4oWi+J+2O0D3IxDBbLf2l/KPaIBjNp36t1V6Xp7TDW9h7fkBGvKbzhBjEsDb5+WwH/bgH6Ugjqq7ggvmEyY0q/mp6KZ/tGIVEI/Y5oZpES+EM9+j86Mmx1lv/FoS1Gxs33CD4jWGVQMBBtEEa4e5LOxty7RvuV0Nbo+kIMFJMJmPnnUMc3z2nBWCaQaw9pbbzEl8Gkiz/7CYvmSrBRiUco48+svGCvR7+NLA55o5i5Cnn+BrmNvqAfLjQa43p728WybWTD7KYaILtdj5H3uODm6pg57WOdc7O4fhNhq77PHGq1iR/jCC6tcqT4t//CSCBjOjR0kEaxz0UdEXlHfPJHQUiOFpJkDeTdVWtWvtZxfJ2lmddohUvVSXU/8J9sMTO0dC4kzVq7mzawHguH4kgwK/rUCqa6m5Cl8XYhBHPq3e2kix4GKudqGrLyxGDrVshuIeEJY8NpwBey1y8pTXEgasAhH6wOllL/BdBQn39sJBivZjeSB32Dix0NGiBFo8g7/p1BphrINwwrz9NKWnmUwkej1Hf4R8Zb+7CPz2JCxFRp4xzkbuWlsrqREtqW3//Qf/q7rHfN55XsMJVssCujaVla0/aMdZ7w586IKbOcTxXjXNYuC0yzB7+0ehOMhBuaYDQ5mxv9tDy6QWdK7k1/4luTmrVWM2Hi8ddKY6k+MNVRe1JHGLTs3F5JEoT57WOBNsGE5aE+k4ufplFW3CZRktjjmxU1vKMao4eGBgHD0QPl/KC3guX2EAD5b0pwPrdN0hWuU4BZRLpFYgw+VDw237LJcaPUM8PwTi5qNly7Qnxagmr9ZVljacqlbMW0k5AQoRV3uBqBrpGZ8IoPSfuwzG0utY5h4+n/lyickmAG9ldNC52t+xudnfeFq5t5ACNCSnHWIIsDD8qjpbesmgDZNkW9YtNTvsa8LNckOC4Ab59IRfhgv3Dgf3gulHRl1JZI1IQqSBaWxjqwMDeGa3uO7JQMdZrYivpum3PWXU3RREgZsYqCjiiOrHzit7ZR37SpuoWSwCjGYwx7BiK2ydPMoYeNbpRa+HFozES+YRKEsX3faYHXGpnsK/S+WpeKPwe5uo7kQOlVI3qAb1KzsaHiOSR7tqctmzGPuLQOip3mvAwfp15mX1lFIRqbLm0yDspMOPcwZTxm5cGv4OOw0QlRlLisGsM6q81rEMMRoXicP8CaAlJ5EqQxyCxlZqj52mIfXzJduFn1h4GyD+Vtnrn04hLY0yRCzdQ03qn089CagFUZ+4gmsui8x17yn6Wm/g8tgAQcHUPVGJer8e+IDy2Q2W/YFB4RMEiO3VN51Yw9E6S56GKCkbqtgqoBhoUankSuOplNGWe4YP/Nur1BH8NM4F3uf7P2MeZEnIuPh6u4PEplbuu+/ZMaRtJWcpm42rnl2eY5GSBqoJcrgtjanyu9qTNJa4rhmsO/sFZXqDea9kq6LmC9jv5eLOLXmNLCq9uicuX+hidGSDTsAQDg/uC2D4Y+wueDu/0DAEQqOqx+aKV2/CAWBv96KAyCJgmB1UGESOaaSmTqgFZUYr9dnH+e2o2hQUPvkD6iiTXeuFo+BWdK+rAjo+yFIdrmnumjJWydnCKqC90El0FP7n8j144uy5L1kmAqXPBktUQqEpMm9JstnMOl7PxChEPOYFaPuHA/n7C4sAnUAxVde4KvET/Mqz7aAbQkQDbc0XarOLcgO/qgmuR7pRMzW3G25CEoOBc+to5ixiq5TFS6dl734fCuGQ86ZcCPYBVsvufxi4xqG7LcvRD3mzwPUgpBTJklf1pKRQsfDqwGrJE4wOL0BHaYYauL5MfCUSGXyM/a2g6DEvyg0w==";
		s = utils.aescbcDecrypt("fd4ec36ac783979e","d79709285951d7c9", s);
		print(s);
	*/	
	//print("a instanceof Uint8Array : "+(a instanceof Uint8Array)+", length="+a.length);
}

/*
  return [
	  {title, url}
  ]
*/
var webview;
function loadMenus(url,params){
	var path = utils.getUrlHostAndPath(url);
  print("TestMenuList: url = "+url);
  print("TestMenuList: params = "+params);//JSON.stringify(params));
    
    if( !webview ) webview = utils.getWebView();
    print("webview = "+webview);
    injectURL = utils.toAbsoluteURL(_scriptURL,"../webview/httprequest.js");
    print("TestMenuList : injectURL="+injectURL);
    webview.loadUrl("http://172.20.0.20/demo-web/test/adr/TestAdrWeb.html",[injectURL],1);
    //webview.injectJavascritByURL("../webview/httprequest.js");
    //evalOnPageFinished(String consJS,String js,int timeout,int opts){
    var s = webview.evalOnPageFinished("typeof(window.httpGetAsString)=='function'",
    	//"httpGetAsString('/index.html',null,0)",
    	"httpGetAsString('http://172.20.0.20/demo-web/test/adr/TestAdrMenu1.json',null,0)",
    	5,1);
    print("webview 返回="+s);
    return JSON.parse(s);
    /*
	return [
	  "CCTV-1,http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8",
	  {title:"CCTV-2",url:"http://cctvalih5ca.v.myalicdn.com/live/cctv2_2/index.m3u8"}
	];
	*/
}
/*
http://192.168.1.14:8803/test-httpservice/
http://m.lan:8803/test-httpservice/error
*/
function httpService(params){
	var uri = params.uri;
	var method = params.method;
	var headers = params.headers;
	var text = method+" "+uri+"\ncontentType = "+params.contentType+"\n";
	if( headers ) for(var name in headers ){
		text += "Header."+name+" : "+headers[name]+"\n";
	}
	//path = 
	var p = uri.indexOf("/",1);
	var path = p>0 ? uri.substring(p+1) : "";
	var content = params.content;
	p = path.indexOf("?");
	if (p>=0) path = path.substring(0,p);
	if( path=="echo" || path.startsWith("echo/") ){
		if( content instanceof ArrayBuffer) {
			a = new Uint8Array(content);
			for(var i=0;i<a.length;i++) a[i] += 1;
		}
		return {
			contentType :params.contentType,
			content : content || ""
		}
	}
	if( path=="error" ){
		throw new Error("httpService error ");
	}
	 text += "params.uri="+params.uri+"\n" 
	        +"path="+path+"\n";
	if( content ){
		if( typeof(content)=="string" ){
			text += "\n"+content;
		} else if( content.length ){
			text += "\ncontent.length = "+content.length;
		}
	}
	return {
		contentType : "text/plain;charset=utf-8",
		content : text
	};
}