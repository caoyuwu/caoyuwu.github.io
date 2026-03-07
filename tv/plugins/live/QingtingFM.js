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
			var url = "https://api-v3.tingtingfm.com//recommend/index_v3_6?"+params+"&api_sign="+this._parent.genSign(params);	
			print("url="+url);
			var json = utils.httpGetAsString(url,0x408);
			print("json="+json);
			var m = JSON.parse(json);
			//var bj_radio = m.data.bj_radio;
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
			for(var i of m.data.bj_radio){
				var title = i.radio_name+"-"+i.program_name;
				var id = i.content;
				//print(title+":"+id);
				//https://mobile.tingtingfm.com/v3/fm/EOAonLJy7G //https://mobile.tingtingfm.com/v3/fm/"+
				items.push({title:title,url:"crawler:live/QingtingFM.js;"+id});
			}
		}
	},
	"MediaSource":{
		/*
		https://api-v3.tingtingfm.com//broadcast/get_radio_programs?
		 version=h5_5.36.4
		 &client=h5_1FCCtb8Y6Kb9iEuLmXVCdgJX9dfcvy
		 &h_radio_id=R6gayOdeVM&api_sign=556d5c0c2ebabbc7d13efd702ef06879
		*/
		getUrl : function(radioId,macros){
			print("radioId="+radioId+" ;"+macros);
			if( !this._parent.client ){
			    this._parent.client = this._parent.genClientVal();
			}
			var params = "version="+this._parent.version+"&client="+this._parent.client+"&h_radio_id="+radioId;
			var url = "https://api-v3.tingtingfm.com//broadcast/get_radio_programs?"+params+"&api_sign="+this._parent.genSign(params);
			print("url="+url);
			var json = utils.httpGetAsString(url,0x408);
			print("json="+json);
			var m = JSON.parse(json);
			return m.data.info.play_urls.hls || m.data.info.play_urls.flv;
		}
		
		
	}
	   
}