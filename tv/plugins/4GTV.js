/*
 https://www.4gtv.tv/channel
 4gtv://1 
 4gtv://4gtv-4gtv003.1  ( asset_id.channel_id
 https://www.4gtv.tv/channel_sub.html?channelSet_id=1&asset_id=litv-ftv13&channel_id=31
   =>
   (4gtv-4gtv003 : 来自 
 ??[proxy=*]
??[proxy=default]
 参考: http://kjol.cc/4gtv真实视频获取.html/comment-page-1
*/

var AES_Key = "ilyB29ZdruuQjC45JhBBR7o2Z8WJ26Vg";
var AES_IV = "JUMxvVMmszqUTeKn";
 

function prepareMediaSource(url,params){
	var cid = utils.getUrlHostAndPath(url); //"" +
	/*
	https://api2.4gtv.tv/Channel/GetChannel/31
	*/
	var fs4GTV_ID;
	var p = cid.lastIndexOf(".");
	if( p>0 ){
	    fs4GTV_ID = cid.substring(0,p);
	  cid = cid.substring(p+1);
	} else
	{
	var text = utils.httpGetAsString("https://api2.4gtv.tv/Channel/GetChannel/"+cid,null,0x80|0x400);
	// 0x400 : 加 WebSearchUtils.getRequestHeaders
	var retVal = JSON.parse(text);
	 fs4GTV_ID = retVal.Data ? retVal.Data.fs4GTV_ID : null;
	 }
	//print("fs4GTV_ID="+fs4GTV_ID);  // 4gtv-4gtv003.1
	if( !fs4GTV_ID )
	   return null;
	   
	var value = '{"fnCHANNEL_ID":'+cid+',"fsASSET_ID":"'+fs4GTV_ID+'","fsDEVICE_TYPE":"pc","clsIDENTITY_VALIDATE_ARUS":{"fsVALUE":""}}';    
//	var evalue = utils.aesEncode(AES_IV,AES_Key,value);
	//print("evalue="+evalue);
	var postData = {
	  "value" : utils.aesEncode(AES_IV,AES_Key,value)
	};
	var text = utils.httpPostAsString(
   	  "https://api2.4gtv.tv/Channel/GetChannelUrl3",
   	  null,
   	  "application/json;charset=utf-8",
   	  postData,
   	  0x80|0x400
   );
   //print("2-text="+text);
   retVal = JSON.parse(text);
   if( !retVal.Data )
     return null;
   text = utils.aesDecode(AES_IV,AES_Key,retVal.Data); 
   //print("3-text="+text);
   retVal = JSON.parse(text);
   var flstURLs = retVal.flstURLs;
   if( !flstURLs || flstURLs.length==0 )
     return null;
     var url = flstURLs[0];
     /*
    for(var i=0;i<flstURLs.length;i++){
       var s = flstURLs[i];
       if( s.indexOf(".4gtv.tv")>0 ){
       	 url = s;
       	 break;
       }
    }  //*/
    /*
    for(var i=0;i<flstURLs.length;i++){
       print(flstURLs[i]);
    }
    */
   //print("url="+url);
    return url ? {url:url,proxy:"*"} : null;  	  
}



