/*
  浙江卫视:  http://www.cztv.com/live
   playerLive.js :
   getVideoListApi = 'https://p.cztv.com/api/paas/program/'+_id+'/'+apiDay;
   s_data = getencrypion();
   =>initplayer()
*/
/*
 playerLive.js 
  => s_data = getencrypion(); 
  => function getencrypion
*/
md5 = utils.md5LowerCaseHex;

function getencrypion(t) {
    var a = 1000;
    /*
      cans() : 通过 canvas 生成, 感觉固定???
    */
    var d = "32c9c2afe7fc0d57dcd97a27cfa7d53d";// md5(cans());
    if( !t )
      t = utils.currentTimeSeconds();//timest();
    var timefragment = (""+t).substr(5);
    var k = md5(t + d + '7ea5d67d5d703d7d5b981a26eaaa5e3e' + md5(timefragment));
    return '?a=' + a + '&d=' + d + '&k=' + k + '&t=' + t;
    //return addencrypion
}

/*
 "LD":"http://ali-vl.cztv.com/channels/lantian/channel0"+_id.toString().substr(1)+"/360p.m3u8",
 "SD":"http://ali-vl.cztv.com/channels/lantian/channel0"+_id.toString().substr(1)+"/540p.m3u8",
 "HD":"http://ali-vl.cztv.com/channels/lantian/channel0"+_id.toString().substr(1)+"/720p.m3u8"
*/
/*
 zjtv://01
 目前 ali-vl.cztv.com/channels/lantian/channel0
  不要 getencrypion 也能允许
*/
function prepareMediaSource(url){
	var chId = utils.getUrlHostAndPath(url);
	/*
	 来自: playerLive.js :
	*/	
	return "http://ali-vl.cztv.com/channels/lantian/channel0"+chId+"/360p.m3u8"
	+ getencrypion()
	;
}