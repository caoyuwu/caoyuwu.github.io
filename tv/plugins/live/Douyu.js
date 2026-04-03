/*
   scp -O /opt/Third-src/GitHUB/caoyuwu.github.io/tv/plugins/live/Douyu.js router:/www/tv/plugins/live/
    https://m.douyu.com/9220456 => douyulive://9220456
    https://m.douyu.com/2507125?type=HW
    ub98484234(rid,"00000003333",tt)
 */

//function _md5(s){
//	return utils.md5LowerCaseHex(s);
//}

/*
参数
v    250120260402
did  b7a3fd2596519b348ba2066c000117p1
tt   1775141944
sign 560bc85aa3cd57a8566eb277d5e66114
ver  22011191 
rid  4549169
rate -1

返回 v=250120260403&did=b7a3fd2596519b348ba2066c000117p1&tt=1775205994&sign=9e134310ac03bf61e9aa85a92640ba1e' 


sign:

  关键字：
  /hgapi/livenc/room/getStreamUrl
  MD5 = w._createHelper(I)  
     =》 return new r.init(d).finalize(c)
处设置断点， 获取到堆栈：
      loadLive ( /hgapi/livenc/room/getStreamUrl 附近的)
   => ub98484234(rid,did,tt) =》return eval(strc)(y865bde81b26c30, y865bde81b26c31, y865bde81b26c32);
   => function(xx0, xx1, xx2)
 获取到 函数 名 ub98484234 
*/

function isJsIdChar(c){
	return (c>=65 && c<=90)  // A - Z
	     || (c>=97 && c<=122)  // a - z
		 ||(c>=48 && c<=57)  // 0 - 9
		|| c==95 // '_'
	    || c==36  // '$'
		;
}
function isId(id){
	if( id.length==0 ) return false;
	var c = id.charCodeAt(0);
	if( !isJsIdChar(c) || (c>=48 && c<=57) ) return false;
	for(var i=0;i<id.length;i++){
		if( !isJsIdChar(c) ) return false;
	}
	return true;
}
function getBlankEndFromTextStart(text,i){
	for(;i<text.length && text.charCodeAt(i)<=0x20;i++)
			;
	return i;
}
function getIdEndFromTextStart(text,i){
	i = getBlankEndFromTextStart(text,i);
	for(;i<text.length && isJsIdChar(text.charCodeAt(i));i++)
		;
	return i;
}

function searchFuncNamesByParamsCount(text,nParams){
	var p = 0;
	var names = [];
	for(;; ){
		 p = text.indexOf("function ",p);
		if( p<0 )
			break;
		//function ub98484234(y865bde81b26c30,y865bde81b26c31,y865bde81b26c32)
		var c1 = p==0 ? 0x20 : 	text.charCodeAt(p-1);
	 // print("p="+p+", c1="+c1+" :  "+isJsIdChar(c1))	
		if( isJsIdChar(c1) ){
			p += 9; continue;
		}
		var i = getIdEndFromTextStart(text,p+9);
		var name = text.substring(p+9,i).trim();
	//	print(" i = "+i+"; name="+name);
		if( name=="" ){
			p = i; continue;
		}
		//print("name = "+name);
		i = getBlankEndFromTextStart(text,i);
		if( text.charAt(i)!="(" ) {
			p = i; continue;
		}
		var i0 = i+1;
		var i1 = text.indexOf(")",i0);
		if( i1<0 ){
			p = i; continue;
		}
		var paramsStr = text.substring(i0,i1);
	//	print("paramsStr = "+paramsStr);
		if( paramsStr.split(",").length==nParams ){
			names.push(name);
		}
		p = i1;
		//if( c1>).
	} // for(;;)
	return names;
} // searchFuncNamesByParamsCount

var windows = this;


function buildSignedRoomParams(rid,did,tt){

	var headers = {
	         "User-Agent": "Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
    };
	var html = utils.httpGetAsString("https://m.douyu.com/"+rid,headers);
	var jsPrefix =  "<script id=\"crp-stript\">";//<script type=\"text/javascript\">";
	var p1 = html.indexOf(jsPrefix);
	var p2 = p1<0 ? -1 : html.indexOf("</script>",p1+jsPrefix.length);
	if( p2<0 )
		return null;
	var js = html.substring(p1+jsPrefix.length,p2);
	/*
	  目前获取的函数中只有 生成 Sign 的函数是三个参数， 先根据参数个数获取函数名
	*/
	var names = searchFuncNamesByParamsCount(js,3);
	print("names = "+names.join(","));
	if( names.length!=1 ){
		throw "为获取到 Sign 的函数名";
	}
	var name = names[0];
	//if( true ) return null;
	/*
	ub98484234 好像动态都在变？？？
	*/
	js = 	(_jsEngine==1 ?
			 "var CryptoJS={MD5:function(s){return utils.md5LowerCaseHex(s)}};\n"
			:"var CryptoJS={MD5:utils.md5LowerCaseHex};\n")
	+"\n"
	+js
	+"\n\n "+name+"('"+rid+"','"+did+"',"+tt+")";
//print(js);
	return utils.jsEval(js);//,"ub98484234",[rid,"00000003333",tt]);
}


function prepareMediaSource(url,params){
	var rid = utils.getUrlHostAndPath(url); //"" +
	
	var headers = {
         "User-Agent": "Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
         "Referer" : "https://m.douyu.com/"+rid,
         "Origin" : "https://m.douyu.com",
         "Accept" : "application/json, text/plain, */*"
    };
	var date = new Date();
	//  date.getFullYear() , date.getMonth()+1 , date.getDate()
	//var year = date.getFullYear(), month = date.getMonth()+1, day = date.getDate();
	var tt = Math.floor(date.getTime()/1000); //utils.currentTimeSeconds();//
    var ver = "22011191";// "22107261"
//tt=1644476811;	
    /*
     * did : 从抓取请求中提取， 含义未知
	  ？ did =  user.myUserInfo.did ； 用户的 id
     */	
 	const did = "b7a3fd2596519b348ba2066c000117p1"; //&un=un
	var param0 = buildSignedRoomParams(rid,did,tt);
if(_debug) print("param0="+param0);	
	if( param0==null ) return null;
	var postParams = param0+"&ver="+ver+"&rid="+rid+"&rate=-1";
	//var postParams = "v=250120220210&did=12725c0bc0fe95fac35a399400031631&tt=1644476811&sign=69a197a4a592cef889027e78ca235973&ver=22107261&rid=9220456&rate=-1&un=un";
	//print("postParams="+postParams);
		   // rid + self.did + self.t10 + v
	/*	
	var rb = utils.md5Hex(rid+did+tt+v).toLowerCase();   
	var sign = "";
	var formParams = {
		v:v,
		did:did,
		tt:tt,
		sign:sign,
		ver:ver,
		rid:rid,
		rate:-1,
		un:"un"
	};
	*/
	var text = utils.httpPostAsString("	https://m.douyu.com/hgapi/livenc/room/getStreamUrl",
		    //"https://m.douyu.com/api/room/ratestream",
			headers,
			"application/x-www-form-urlencoded",
			postParams,
			0
		);
	/*
	 * {"code":1,"data":"参数非法"}
	 * {"code":6,"data":"时间未校准"}
	 * {"code":7,"data":"非法请求"}
	 * {"code":0,"data":{"settings":[{"name":"蓝光","rate":0,"high_bit":1},{"name":"超清","rate":3,"high_bit":0},{"name":"高清","rate":2,"high_bit":0}],"url":"http://hlstct.douyucdn2.cn/dyliveflv3/9220456rJU0ek7q8_2000.m3u8?txSecret=c98c11fa4896742964902e1190725779\u0026txTime=6204d61a\u0026token=h5-douyu-0-9220456-383727a090f4f08cc3086f9f6854a80d\u0026did=12725c0bc0fe95fac35a399400031631\u0026origin=tct\u0026vhost=play3","rate":3,"pass":0}}
	 */
if(_debug)  print("返回="+text);
	var retVal = JSON.parse(text);
	if( retVal.code ){
		throw retVal.code+":"+retVal.data;
	}
	return retVal.data.url;
}

/*
   https://m.douyu.com/api/room/list?page=3&type=yqk
      {
   				"rid": 12080172,
   				"vipId": 0,
   				"roomName": "（奇光）罗温.艾金森动画",
   				"cate1Id": 0,
   				"cate2Id": 208,
   				"roomSrc": "https://rpic.douyucdn.cn/asrpic/260402/12080172_src_2237.avif/dy1",
   				"verticalSrc": "https://rpic.douyucdn.cn/asrpic/260402/12080172_src_2237.avif/dy2",
   				"avatar": "https://apic.douyucdn.cn/upload/https://apic.douyucdn.cn/_middle.jpg",
   				"nickname": "奇光主播R",
   				"isVertical": 0,
   				"liveCity": "",
   				"isLive": 1,
   				"hn": "21.0万"
   	  }
 * https://m.douyu.com/list/room?type=yqk
 * douyulive-list:yqk/1
 * path==yqk/1
 */

function loadMenus(url,params){
	var path = utils.getUrlHostAndPath(url);
	if( path=="" || path=="*") {
				return loadMenus1();
		}
	var headers = {
	  "User-Agent": "Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
	};	
	var fromPage = 1, toPage = 1 , type = path;
	var p = type.indexOf("/");
	if( p>0 ){
		page = path.substring(p+1);
		type = path.substring(0,p);
		p = page.indexOf("-");
		if( p>0 ){
			fromPage = parseInt(page.substring(0,p));
			toPage = parseInt(page.substring(p+1));
		} else
		{
			fromPage = toPage = parseInt(page);
		}
	}
	//print("fromPage="+fromPage+"("+typeof(fromPage)+")"+",toPage="+toPage);	
	var vCh = [];
	//return;
	//https://m.douyu.com/api/room/list?page=1&type=yqk
	for(var page=fromPage;page<=toPage;page++){
		var text = utils.httpGetAsString("https://m.douyu.com/api/room/list?page="+page+"&type="+type,headers);
	//print("text="+text);	
		var retVal = JSON.parse(text);
		if( retVal.code ){
			throw retVal.code+":"+retVal.data;
		}
		for(var i=0;i<retVal.data.list.length;i++){
			var r = retVal.data.list[i];
			vCh.push({
				  title : r.nickname+"-"+r.roomName+"("+r.hn+")",
				  urls : [
					     "douyulive://"+r.rid,
						"browser-https://m.douyu.com/"+r.rid
					   ]
				});
		}
		if( page>=retVal.data.pageCount ){
			break;
		}
	}
	return vCh;
	/*
	 * {"code":0,"data":{"pageCount":144,"nowPage":2000,"cate2Id":208,"list":[]}
	 * :[{"rid":9220456,"vipId":0,"roomName":"【万合天宜】王大锤情怀上线",
	 */
//print("text="+text);
	
}


function loadMenus1(){
	  var items = [
		      {label : "一起看", items:[
		             {label:"一起看01",items:"@douyulive-list:yqk/1-5"},
		             {label:"一起看06",items:"@douyulive-list:yqk/6-10"},
		             {label:"一起看11",items:"@douyulive-list:yqk/11-15"},
		             {label:"一起看16",items:"@douyulive-list:yqk/16-20"},
		             {label:"一起看21",items:"@douyulive-list:yqk/21-25"},
		             {label:"一起看26",items:"@douyulive-list:yqk/26-30"}
					]},
			{label : "颜值",	 items:[
		             {label:"颜值01",items:"@douyulive-list:yz/1-5"},
		             {label:"颜值06",items:"@douyulive-list:yz/6-10"},
		             {label:"颜值11",items:"@douyulive-list:yz/11-15"},
		             {label:"颜值16",items:"@douyulive-list:yz/16-20"}
				]},
		    {label : "户外",	 items:[
			         {label:"户外01",items:"@douyulive-list:HW/1-5"},
		             {label:"户外06",items:"@douyulive-list:HW/6-10"},
		             {label:"户外11",items:"@douyulive-list:HW/11-15"},
		             {label:"户外16",items:"@douyulive-list:HW/16-20"}
			   ]}
			  /* ,{label : "二次元",	 items:[   	 
		             {label:"二次元01",items:"@douyulive-list:ecy/1-5"},
		             {label:"二次元06",items:"@douyulive-list:ecy/6-10"},
		             {label:"二次元11",items:"@douyulive-list:ecy/11-15"},
		             {label:"二次元16",items:"@douyulive-list:ecy/16-20"}
			]}	*/	 
		            ];
	var items2 = 	loadCatMenus();
	for( var i of ( items2||[] )  )	items.push(i);		
	  return items;				
}	

function loadCatMenus(){
	var headers = {
		  "User-Agent": "Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
		};	
	var text = utils.httpGetAsString("https://m.douyu.com/api/cate/list",headers);
		//print("text="+text);	
	var retVal = JSON.parse(text);	
	if( retVal.code ){
			return null;
     }
	 var items = [];
	 var cate1BById = {}
	// var cate1BById = {}
	for( var cate1 of retVal.data.cate1Info){
		items.push({ title: cate1.cate1Name, items:cate1BById[cate1.cate1Id] = []});
	}	
	for( var cate2 of retVal.data.cate2Info){
		  var items2 = cate1BById[cate2.cate1Id];
		  if( items2 ) {
			items2.push({title:cate2.cate2Name,items:"@douyulive-list:"+cate2.shortName+"/1-5"});
		  }
	}
	return items;
}

/*
https://www.sanshuifeibing.com/posts/8146e2c4.html
*/
