
function loadMenus(url,params){
  print("TestMenuList: url = "+url);
  print("TestMenuList: params = "+params);//JSON.stringify(params));
	return [
	  "CCTV-1,http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8",
	  {title:"CCTV-2",url:"http://cctvalih5ca.v.myalicdn.com/live/cctv2_2/index.m3u8"}
	];
}