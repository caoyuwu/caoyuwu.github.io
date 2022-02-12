Xjs.loadedXjs.push("vlive/JsylVLive");
/*snsoftx/vlive/jsyl/JsylLiveService.java*/
Xjs.namespace("snsoftx.vlive.jsyl");
snsoftx.vlive.jsyl.JsylLiveService$AjaxReturnData1=function(){};
snsoftx.vlive.jsyl.JsylLiveService=function(){
    this.videoPlayerType = "flv";
    this.emptyVideoSize = {width:544,height:960};
    {
        var s = Xjs.getReqParameter("s"),
            cfg = s == null || s == "" ? 0 : Number.parseInt(s);
        if(isNaN(cfg) || cfg < 0 || cfg >= 10)
        {
            throw new Error("参数 s 错误");
        }
        this.settingType = "JsylLive" + (cfg == 0 ? "" : "" + cfg);
        window.console.log("settingType = %s",this.settingType);
    }
    var s = this.getCurrentSettings();
    if(s.options !== undefined)
    {
        this.options = Number.obj2int(s.options,1);
    }
};
Xjs.extend(snsoftx.vlive.jsyl.JsylLiveService,snsoftx.vlive.VLiveService,{
  _js$className_:"snsoftx.vlive.jsyl.JsylLiveService",
    /*snsoftx.vlive.jsyl.JsylLiveService.getRefreshRoomsOpts*/
    getRefreshRoomsOpts:function()
    {
        return [{name:"type",options:["100:颜值","200:热门","300:收费","500:附近","400:海外"]},{name:"page",options:[1,2,3,4,5,6]}];
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.refreshRooms*/
    refreshRooms:function(rooms)
    {
        var settings = this.getCurrentSettings(),
            opts = rooms.refreshParams || {},
            type = opts.type || "100",
            params = {type:type,flowToken:settings.token,latitude:"",latitude:"",page:this.curPage = opts.page || 1,size:50};
        this.httpGet(settings.server1URL + "live/studio/list",params,new Xjs.FuncCall(this.onAjaxRoomsLoaded,this,[rooms],2),new Xjs.FuncCall(this.msgListener.onRoomsLoadFail,this.msgListener,[rooms],2),1);
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.onAjaxRoomsLoaded*/
    onAjaxRoomsLoaded:function(rooms,o)
    {
        if(typeof(o) == "string")
        {
            o = JSON.parse(o);
        }
        if(o.code != 0)
        {
            this.msgListener.onRoomsLoadFail(rooms,new Error(o.code + ":" + o.msg));
            return;
        }
        var data1 = Xjs.JSON.parse(o.data);
        if(data1.code != 0)
        {
            this.msgListener.onRoomsLoadFail(rooms,new Error(data1.code + ":" + data1.msg));
            return;
        }
        var data = data1.data,
            list = data.list;
        rooms.baseRoomIdx = (this.curPage - 1) * 50;
        rooms.refreshTime = (new Date()).getTime();
        rooms.errInfo = null;
        rooms.rooms = new Array(list == null ? 0 : list.length);
        rooms.totalRooms = data.row_count;
        for(var i=0;i < rooms.rooms.length;i++)
        {
            var r = {};
            rooms.rooms[i] = r;
            var li = list[i];
            r.userId = li.id;
            r.roomId = li.curroomnum;
            r.userName = li.nickname;
            r.title = li.roomTitle || "";
            var province = li.province,
                city = li.city,
                online = li.online;
            if(province && province != "保密")
            {
                r.title += "-" + province;
            }
            if(city && city != "保密")
            {
                r.title += "-" + city;
            }
            if(online > 0)
            {
                r.title += "-(" + online + ")";
            }
            var lim = li.limit,
                prerequisite = lim ? lim.prerequisite : 0;
            if(prerequisite > 0)
            {
                r.limit = prerequisite + "币";
            }
            var ptname = lim ? lim.ptname : null;
            if(ptname)
            {
                r.limit = r.limit ? r.limit + "-" + ptname : ptname;
            }
            var logoUri = li.snap || li.avatar;
            if(logoUri)
                ;
        }
        this.msgListener.onRoomsLoaded(rooms);
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.getWebsocketURL*/
    getWebsocketURL:function()
    {
        var settings = this.getCurrentSettings();
        return settings.websocketURL + "/ws?jwt_token=" + settings.authToken;
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.enterRoom*/
    enterRoom:function()
    {
        this.openWebSocket(this.getWebsocketURL());
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.requestVideoURL*/
    requestVideoURL:function()
    {
        this.prepareVideo();
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.prepareVideo*/
    prepareVideo:function()
    {
        var settings = this.getCurrentSettings(),
            params = {token:settings.token,uid:this.userId};
        this.httpGet(settings.server2URL + "OpenAPI/v1/Private/getPrivateLimit",params,new Xjs.FuncCall(this.onAjaxPrepareVideo,this),new Xjs.FuncCall(this.onAjaxPrepareVideoFail,this),2 | 4);
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.onAjaxPrepareVideoFail*/
    onAjaxPrepareVideoFail:function(err)
    {
        this.msgListener.onMessage("getvideo-fail","获取视频",err.message);
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.onAjaxPrepareVideo*/
    onAjaxPrepareVideo:function(s)
    {
        window.console.log("原始数据: %s",s);
        var _this = this;
        Xjs.JsLoad.asynLoadJS("https://cdn.bootcss.com/crypto-js/3.1.9-1/crypto-js.min.js").then(function(){
            var decoded = _this.aesDecode(s);
            window.console.log("解密后数据: %s",decoded);
            _this.onPrepareVideo(Xjs.JSON.parse(decoded));
        });
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.aesDecode*/
    aesDecode:function(enc)
    {
        var settings = this.getCurrentSettings(),
            md5Key = CryptoJS.MD5(settings.authToken),
            smd5Key = md5Key.toString();
        window.console.log("md5Key = %s",md5Key.toString());
        var key = CryptoJS.enc.Utf8.parse(smd5Key.substring(0,16));
        window.console.log("key = %s",key.toString(CryptoJS.enc.Hex));
        var iv = CryptoJS.enc.Utf8.parse(smd5Key.substring(16));
        window.console.log("iv = %s",iv.toString(CryptoJS.enc.Hex));
        return CryptoJS.AES.decrypt(enc,key,{iv:iv,padding:CryptoJS.pad.Pkcs7}).toString(CryptoJS.enc.Utf8);
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.onPrepareVideo*/
    onPrepareVideo:function(o)
    {
        if(o.code != 0)
        {
            this.msgListener.onMessage("getvideo-fail","获取视频",o.code + ":" + o.msg);
            return;
        }
        var data = o.data,
            prerequisite = data.prerequisite,
            limit = null;
        if(prerequisite > 0)
        {
            limit = prerequisite + "币";
        }
        var ptname = data.ptname;
        if(ptname)
        {
            limit = limit ? limit + "-" + ptname : ptname;
        }
        if(limit)
        {
            this.msgListener.onMessage("","限制",limit);
        }
        var stream = data ? data.stream : null,
            url = stream ? stream.pull_url : null;
        if(url)
        {
            this.msgListener.onMessage("play-video",null,url);
        } else 
        {
            this.msgListener.onMessage("getvideo-fail","获取视频","未获取到视频地址" + (data.online == 0 ? ":该用户离线" : ""));
        }
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.getLocalSettingsDef*/
    getLocalSettingsDef:Xjs.nullFn,
    /*snsoftx.vlive.jsyl.JsylLiveService.httpGet*/
    httpGet:function(url,params,onSuccess,onError,opts)
    {
        var settings = this.getCurrentSettings(),
            header = {};
        if(settings.accessToken)
        {
            header["access-token"] = settings.accessToken;
        }
        if(settings.jwtToken)
        {
            header["jwt-token"] = settings.jwtToken;
        }
        if(settings.device_id)
        {
            header["device-no"] = settings.device_id;
        }
        header.times = "" + (new Date()).getTime();
        header.platform = snsoftx.vlive.jsyl.JsylLiveService.Platform;
        header["app-version"] = snsoftx.vlive.jsyl.JsylLiveService.AppVersion;
        header["vest-code"] = snsoftx.vlive.jsyl.JsylLiveService.VestCode;
        if(settings.authToken && !(opts & 1))
            header.Authorization = "Bearer " + settings.authToken;
        if(opts & 2)
        {
            header["X-Live-Butter2"] = settings.liveButter2;
        }
        this.ajaxGET(url,header,params,onSuccess,onError,opts & 4 ? 1 : 0);
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.getCurrentSettings*/
    getCurrentSettings:function()
    {
        return this.getSettings(this.settingType);
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.getSettings*/
    getSettings:function(settingType)
    {
        if(!settingType)
            settingType = this.settingType;
        if(!this.allSettings)
        {
            var ajax = new Xjs.Ajax({method:"get",url:Xjs.ROOTPATH + "vlive/jsyl/Settings.json"});
            ajax.request();
            this.allSettings = ajax.getResponse(true);
            for(var k in this.allSettings)
            {
                var s = this.allSettings[k];
                s.settingType = k;
            }
        }
        var s = this.allSettings[settingType];
        if(!s)
            return null;
        if(!s.server1URL)
        {
            s.server1URL = "https://api.jsdn0.xyz/";
        }
        if(!s.server2URL)
        {
            s.server2URL = "https://notify.uidfhdf.com/";
        }
        if(!s.websocketURL)
        {
            s.websocketURL = "wss://notify.uidfhdf.com:443";
        }
        return s;
    }
});
Xjs.apply(snsoftx.vlive.jsyl.JsylLiveService,{
    AppVersion:"2.0.29",
    Platform:"100",
    VestCode:"200"
});
