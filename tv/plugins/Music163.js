/*
 网易 云 音乐
   https://music.163.com/#/song?id=XXXXX => 163music
   https://music.163.com/#/mv?id=XXXXX => 163mv

   Music163MediaDataSourcePrepare
   代码参考：
     网易云音乐 网易-》 选择歌曲xxx-> 打开外链链接页面
      https://music.163.com/outchain/2/xxxx
     中的 js:
    https://s3.music.126.net/web/s/core_xxxxxx.js
    其中：
      window.asrsea(){....}
   生成的  bZe9V.encText， bZe9V.encSecKey
  测试：
    snadkx-test: Crawl163Music
   
    一百万个可能  music163://29722582
         163video://B8FD182003B18CFBD4030DDCDCB78372
         163mv://5307748
*/ 

function protocol2Type(protocol){
	switch( protocol ){
    case "music163": case "163music": return 1;
    case "163mv":case "mv163": return 2;
    case "163video": case "video163": return  3;
	}
	return -1;
}

function prepareMediaSource(url,params){
	return buildLiveUrl(protocol2Type(""+utils.getUrlProtocol(url)),""+utils.getUrlHostAndPath(url));
}

/**
@param  type
      1: Music; 163music:/xxx : https://music.163.com/#/song?id=29722582
      2: MV;   163mv://xxx  : https://music.163.com/#/mv?id=xxx
      3: sh视频   163video://B8FD182003B18CFBD4030DDCDCB78372  : https://music.163.com/#/video?id=B8FD182003B18CFBD4030DDCDCB78372
 */
function buildLiveUrl( type, id) {
	print("type="+type+" ; id="+id);
}

function newRandomStr(){
	return "J9FsJ9hrKj1VN9S5";
}

