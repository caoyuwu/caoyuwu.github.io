/*
{label:"QingtingFM直播",items:"@crawler-list:live/QingtingFM.js"},

https://mobile.tingtingfm.com/v3/video_chatroom/OMob4eBJy4?type=1

scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/live/QingtingFM.js router:/www/tv/plugins/live/

https://api-v3.tingtingfm.com//recommend/index_v3_6?
//  version=h5_5.36.4
// &client=h5_1FCCtb8Y6Kb9iEuLmXVCdgJX9dfcvy
// &api_sign=0deba35041ae6d42e8ae1885ace8f371

*/
{
	contentUrl : "https://mobile.tingtingfm.com",
	version: "h5_5.36.4",
	appkey: "8brlm7uf8zka3",
	//client: "h5_1FCCtb8Y6Kb9iEuLmXVCdgJX9dfcvy",
	genRandomStr : function(len) {
	        for (var t, n = ""; n.length < len; )
	            n += (t = void 0,
	            (t = Math.floor(62 * Math.random())) < 10 ? t : t < 36 ? String.fromCharCode(t + 55) : String.fromCharCode(t + 61));
	        return n
	},
	genClientVal: function() {
	           // if (c("client"))
	           //     return c("client");
	           // var e = new Date;
	           // e.setTime(e.getTime() + 31536e6);
	           // var t = "expires=" + e.toUTCString();
	          //  return document.cookie = "client=h5_" + l(30) + ";" + t,
	           return "h5_" + this.genRandomStr(30);
	},
	genSign: function(e) {
	        var t = e.split("&").sort().join("&") + "_1Ftjv0bfpVmqbE38";
			/*
	        return (0,
	        o.default)(t).toLowerCase();
			*/
		 	//return utils. hmacDigestAsHex("HmacMD5","8brlm7uf8zka3$K5oP",t).toLowerCase();
			return utils.md5LowerCaseHex(t);
	    },
	List: {
		loadItems: function(items,contentUrl){
			if( !this._parent.client ){
				this._parent.client = this._parent.genClientVal();
			}
			//print("QingtingFM.loadItems : contentUrl = "+contentUrl+",version="+this._parent.version+","+this._parent.client);
			var params = "version="+this._parent.version+"&client="+this._parent.client;
			print("params = "+params+",sign = "+ this._parent.genSign(params));
			var url = "https://api-v3.tingtingfm.com/recommend/index_v3_6?"+params+"&api_sign="+this._parent.genSign(params);	
//			print("url="+url);
			var json = utils.httpGetAsString(url,0x408);
//			print("json="+json);
			var m = JSON.parse(json);
			//var bj_radio = m.data.bj_radio;
			/*
			{
			               "content": "yWRo5nxaEA",
			               "anchor": "\u6559\u80b2\u9762\u5bf9\u9762BRTV",
			               "live_status": 4,
			               "live_num": 141,
			               "file_url": "https:\/\/ttfm2018pub-oss-cdn.tingtingfm.com\/cover\/2020\/0318\/d4\/cb\/d4cbadaaa1fd74c78d64a7f29f9a6836.jpg?x-oss-process=image\/resize,h_800,w_800",
			               "title": "\u5403\u900f\u62db\u8003\u65b0\u653f\uff0c\u5408\u7406\u89c4\u5212\u5fd7\u613f\u586b\u62a5",
			               "notice_st": 1584610200,
			               "s_date": 1584610202,
			               "type": 3
			           },
			*/
			if(m.data.live) for(var i of m.data.live){
				var title =  "直播-"+i.anchor+"-"+i.title;
				var id = i.content;
				items.push({title:title,url:"crawler:live/QingtingFM.js;live:"+id});
			}			
			/*
			{
							"content": "R6gayOdeVM",
							"h_program_id": "MLVolnVJ4q",
							"radio_name": "\u5317\u4eac\u97f3\u4e50\u5e7f\u64ad",
							"program_name": "\u8282\u594f\u9a7e\u5230",
							"s_time": "13:00",
							"e_time": "16:00",
							"file_url": "https:\/\/ttfm2018pub-oss-cdn.tingtingfm.com\/cover\/2020\/0404\/5a\/a8\/5aa89f8793177cc4bb83ceb9ab47e403.png?x-oss-process=image\/resize,h_400,w_400",
							"fm": "FM97.4"
			}
			*/

			if(m.data.bj_radio) for(var i of m.data.bj_radio){
				var title = "广播-"+i.radio_name+"-"+i.program_name;
				var id = i.content;
				//print(title+":"+id);
				//https://mobile.tingtingfm.com/v3/fm/EOAonLJy7G //https://mobile.tingtingfm.com/v3/fm/"+
				items.push({title:title,url:"crawler:live/QingtingFM.js;radio:"+id});
			}
		}
	},
	"MediaSource":{
		/*
	声音：	
		https://api-v3.tingtingfm.com//broadcast/get_radio_programs?
		 version=h5_5.36.4
		 &client=h5_1FCCtb8Y6Kb9iEuLmXVCdgJX9dfcvy
		 &h_radio_id=R6gayOdeVM&api_sign=556d5c0c2ebabbc7d13efd702ef06879
	视频：	 
		 https://api-v3.tingtingfm.com/live/get_live
		 参数：
		 version=h5_5.36.4
		 client=h5_1FCCtb8Y6Kb9iEuLmXVCdgJX9dfcvy
		 h_live_id=4jaEKEPd9A
		 api_sign=517e31bb5b2fa4b68a5c2c36d23dfbf3
	返回：	 
		 https://mobile.tingtingfm.com/v3/video_chatroom/4jaEKEPd9A?type=1
		   	 
		*/
		getUrl : function(contentId,macros){
			print("contentId="+contentId+" ;"+macros);
			if( !this._parent.client ){
			    this._parent.client = this._parent.genClientVal();
			}
			var p0 = contentId.indexOf(":");
			if( p0<0 ) return ;
			var type = contentId.substring(0,p0);
			contentId = contentId.substring(p0+1);
			if( type=="radio" ){
				var params = "version="+this._parent.version+"&client="+this._parent.client+"&h_radio_id="+contentId;
				var url = "https://api-v3.tingtingfm.com//broadcast/get_radio_programs?"+params+"&api_sign="+this._parent.genSign(params);
			//	print("url="+url);
				var json = utils.httpGetAsString(url,0x408);
			//	print("json="+json);
				var m = JSON.parse(json);
			   return m.data.info.play_urls.hls || m.data.info.play_urls.flv;
			}
			if( type=="live" ){
				/*				version
				h5_5.36.4 clienth5_1FCCtb8Y6Kb9iEuLmXVCdgJX9dfcvy&
				h_live_id
				DOdGK6Dd34
				api_sign
				b9aaa309feebcbad0052c1bc35a124cf
				*/
				var params = "version="+this._parent.version+"&client="+this._parent.client+"&h_live_id="+contentId;
				var url = "https://api-v3.tingtingfm.com/live/get_live?"+params+"&api_sign="+this._parent.genSign(params);
				var json = utils.httpGetAsString(url,0x408);
				//		if(_debug)	print("json="+json);
				var m = JSON.parse(json);		
				var pull_url = m.data.pull_url;
				if( !pull_url ) return null;
		//https://pull2push-2.tingtingfm.com/ttfmrelease/fenghuiluzhuan_720p.m3u8?auth_key=1772973186-gxv4kA7S-0-3e006b125b9e52c6efa5c93056ce4212		
				var urlInfo = pull_url.hls || pull_url.flv || pull_url.rtmp;
				if( urlInfo  ){
					return urlInfo.url+"?auth_key="+urlInfo.ak;
				}
				return m.data.backrecord_url_mp4;
			}
		}
		
		
	}
	   
}