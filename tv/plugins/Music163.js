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
	return buildLiveUrl(protocol2Type(utils.getUrlProtocol(url)),utils.getUrlHostAndPath(url));
}


/**
@param  type
      1: Music; 163music:/xxx : https://music.163.com/#/song?id=29722582
      2: MV;   163mv://xxx  : https://music.163.com/#/mv?id=xxx
      3: sh视频   163video://B8FD182003B18CFBD4030DDCDCB78372  : https://music.163.com/#/video?id=B8FD182003B18CFBD4030DDCDCB78372
 */
function buildLiveUrl( type, id) {
	//print("type="+type+" ; id="+id);
	var url,params ;//= new java.util.LinkedHashMap<>();
    //i2x={"id":"29722582","ids":"[\"29722582\"]","limit":10000,"offset":0,"csrf_token":""}
    switch( type ) {
        case 1: // 163music
	        url = "https://music.163.com/weapi/song/enhance/player/url";
	        params = {
	        	ids : "[" + id + "]",//JsonUtils.encode(new String[] {id}, 1));
	        	"br": 128000
	        };
	        break;
        case 2: //163mv
	        url = "https://music.163.com/weapi/song/enhance/play/mv/url";
	         params = {
	        		 id: id,
	        		 r:1080
	         };
	        break;
        case 3: // 163video
	        url = "https://music.163.com/weapi/cloudvideo/playurl";
	        params = {
	        		"ids":"[\""+id+"\"]",
	        		resolution:720
	        };
            break;
        default:
        	throw "type="+type;
    }
    params.csrf_token = "";
    var jsonEncodedParams = JSON.stringify(params);//, 1);
 //print("jsonEncodedParams="+jsonEncodedParams);
    var postParams = newHttpPostParams(jsonEncodedParams);
  //  print(postParams.encText);
  //  print(postParams.encSecKey);
    //HttpFormOutput formOutput = new HttpFormOutput(new LinkedHashMap<String,String>());
    formParams = {	
    		params: postParams.encText,
    		encSecKey:postParams.encSecKey
    };
    //https://music.163.com/weapi/song/enhance/player/url

    //WebContent c = HttpUtils.post("https://music.163.com/weapi/song/enhance/player/url", formOutput);
    //byte retData[] = HttpUtils.post("https://music.163.com/weapi/song/enhance/player/url",formParams);
    // https 报错，先使用 http
    //final String url = "https://music.163.com/weapi/song/enhance/player/url";
    //var retData = HttpUtils.post(url,formParams);
            //System.out.println(c.getContentAsString());
    var retText = utils.httpPostAsString(
    		url,
    		null,
    		"application/x-www-form-urlencoded; charset=utf-8",
    		formParams,
    		0x400
    	);
 print("retText="+retText);   
    var m = JSON.parse(retText);
    var objData = type==3?m.urls:m.data; //m.get(type==3?"urls":"data");
    //final java.util.Map<String,Object> data;
    if( objData instanceof Array ){
        if( objData.length==0 )
            return null;
        data = objData[0];
    } else
        data = objData;
    return data==null ? null : data.url;
    
}

var AES_IV = "0102030405060708";
var EK_3 = "0CoJUm6Qyw8W8jud";
/*
 * EncSecKey 是用 RSA( publicKey={EK_2,EK_1}
 */
/*
 * @param String params 
 */
var EncSecKey="c7399b736dd9cb241a1c8b5b66325b059eda5eea6654b851696b7a4f8cc9fc4135be6f0acb506a666275b48ded191b9c4cc0067594e8f80c3ac3475bf79d87cbc16946955c67b7d10010f4d24fad7b119c6e78b017b2d42bafc9b4f9c5e5675738ca8d7499f060df4ce82b1d4b4480bcd73e9a0cde5a365d4c100d36fc7b17ec";
function newHttpPostParams(params){
	var randomKey = newRandomStr(16);
	var aesEncodeParams = utils.aescbcEncrypt(AES_IV,EK_3,params);
    //  System.out.format("EK_3(%s) - 加密后：%s \n",EK_3,aesEncodeParams);
         aesEncodeParams = utils.aescbcEncrypt(AES_IV,randomKey,aesEncodeParams); //J9FsJ9hrKj1VN9S5
      return {
    	  encText : aesEncodeParams,
    	  encSecKey : EncSecKey
      };
}

function newRandomStr(len){
	return "J9FsJ9hrKj1VN9S5";
}

