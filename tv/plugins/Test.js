function prepareMediaSource(url,params){
	print("prepareMediaSource : url="+url+"; params="+params);
	//print("WebAssembly = "+WebAssembly);
	//print("XMLHttpRequest = "+XMLHttpRequest); 未定义
	var a = new Uint8Array(10);
	print("a instanceof Uint8Array : "+(a instanceof Uint8Array)+", length="+a.length);
	var b =  utils.httpGetAsByteArray("https://www.baidu.com",null,0);
	print("b instanceof ArrayBuffer : "+(b instanceof ArrayBuffer)+", byteLength="+b.byteLength);
	a =  new Uint8Array(b);
	var a2 = [];
	for(var i=0;i<a.length;i++){
	//	print(a[i]+" : "+String.fromCharCode(a[i]));
		a2.push(String.fromCharCode(a[i]));
	}
		//new TextDecoder("utf-8").decode(new Uint8Array(b)); 
		//String.fromCharCode.apply(null, new Uint8Array(b));
	var s = a2.join("");
	print(s.length);
	print(s);
	//print("a instanceof Uint8Array : "+(a instanceof Uint8Array)+", length="+a.length);
}


function loadMenus(url,params){
  print("TestMenuList: url = "+url);
  print("TestMenuList: params = "+params);//JSON.stringify(params));
	return [
	  "CCTV-1,http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8",
	  {title:"CCTV-2",url:"http://cctvalih5ca.v.myalicdn.com/live/cctv2_2/index.m3u8"}
	];
}