/*
https://www.yy.com/95017956/95017956 => yylive://95017956
yylive://95017956
*/
function prepareMediaSource(url,params){
	var mediaId = utils.getUrlHostAndPath(url);
	return geLiveURL(mediaId,mediaId);
}

function  geLiveURL( sid, cid) {
   var tm = utils.currentTime();
	var head = {
			seq:tm,
            appidstr:"0",
            bidstr:"121",
            cidstr:cid,//"95017956");
            sidstr:sid,//"95017956");
            uid64:0,
            client_type:108,
            client_ver:"3.4.9",
            stream_sys_ver:1,
            app:"www.yy.com",
            playersdk_ver:"3.4.9",
            thundersdk_ver:"0",
            streamsdk_ver:"1.12.12"
	}; // head
	var client_attribute = {
			client:"web",
            model:"",
            cpu:"",
            graphics_card:"",
            os:"chrome",
            osversion:"97.0.4676.0",
            vsdk_version:"",
            app_identify:"",
            app_version:"",
            business:"",
            width:"1280",
            height:"800",
            scale:"",
            client_type:8,
            h265:0
	}; //client_attribute
	var avp_parameter = {
		    version:1,
            client_type:8,
            service_type:0,
            imsi:0,
            send_time: utils.millis2Seconds(tm), //Math.floor(tm/1000),//1636122914);
            line_seq:-1,
            gear:4,
            ssl:1,
            stream_format:0
	}; //avp_parameter
	var postData = {
			head:head,
            client_attribute:client_attribute,
            avp_parameter: avp_parameter
	}; //postData
	var queryParams = {
		uid:"0",  // 写成整数0时,手机appendUrlParameters会变成0.0
        cid:cid,
        sid:sid,
        appid:"0",
        sequence:tm, //"" +
        encode:"json"
	};
	var url = utils.appendUrlParameters("https://stream-manager.yy.com/v3/channel/streams", queryParams);
	//var httpHeaders = {
	//"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
	//};
	var text = utils.httpPostAsString(
	         url,
	   //      httpHeaders,
	         "application/json;charset=utf-8",
	         JSON.stringify(postData)
	     //    0 //0x400
		);
 //print("text="+text);		
   var retVal = JSON.parse(text);
  //	var result = retVal.result;
  if( retVal.result) {
  		throw retVal.result+":"+retVal.result_msg;
  }
   var stream_line_addr = retVal.avp_info_res ? retVal.avp_info_res.stream_line_addr : null;
        if(stream_line_addr) //for(Object v : stream_line_addr.values())
          for(var _key in stream_line_addr)
         {
             var cdn_info = stream_line_addr[_key].cdn_info;
             var vurl = cdn_info ? cdn_info.url : null;
             if( vurl )
             	return vurl;
             	/*
            Object cdn_info;
            if( v instanceof java.util.Map && (cdn_info=((java.util.Map<String,Object>)v).get("cdn_info")) instanceof java.util.Map  ) {
                String vurl = (String)((java.util.Map<String,Object>)cdn_info).get("url");
                if( vurl!=null )
                    return vurl;
            }
            */
        }
        return null;		
}