Xjs.loadedXjs.push("vlive/JsylVLive");
/*snsoftx/vlive/jsyl/JsylLiveService.java*/
Xjs.namespace("snsoftx.vlive.jsyl");
snsoftx.vlive.jsyl.JsylLiveService$AjaxReturnData1=function(){};
snsoftx.vlive.jsyl.JsylLiveService=function(){
    this.videoPlayerType = "flv";
    this.name = "Jsyl";
    this.emptyVideoSize = {width:544,height:960};
    this.initSettingType();
    var s = this.getCurrentSettings();
    if(s.options !== undefined)
    {
        this.options = Number.obj2int(s.options,1);
    }
};
Xjs.extend(snsoftx.vlive.jsyl.JsylLiveService,snsoftx.vlive.VLiveService,{
  _js$className_:"snsoftx.vlive.jsyl.JsylLiveService",
    /*snsoftx.vlive.jsyl.JsylLiveService.getAjaxInvokeProxy*/
    getAjaxInvokeProxy:function()
    {
        return this.getCurrentSettings().ajaxInvokeProxy;
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.getRefreshRoomsOpts*/
    getRefreshRoomsOpts:function()
    {
        return [{name:"type",options:["200:热门","100:颜值","300:收费","500:附近","400:海外"]},{name:"page",options:[1,2,3,4,5,6]}];
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
        return settings.websocketURL + "?jwt_token=" + settings.authToken;
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
    /*snsoftx.vlive.jsyl.JsylLiveService.setRoomInfo*/
    setRoomInfo:function(roomId,userId)
    {
        if(this.userId == userId && this.roomId == roomId)
            return;
        snsoftx.vlive.jsyl.JsylLiveService.superclass.setRoomInfo.call(this,roomId,userId);
        if(this.getUserProfile(this.userId) == null)
        {
            this.prepareUserProfile();
        }
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.getUserProfile*/
    getUserProfile:function(id)
    {
        return this.userProfiles ? this.userProfiles[id] : null;
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.prepareUserProfile*/
    prepareUserProfile:function()
    {
        var settings = this.getCurrentSettings(),
            params = {flowToken:settings.token,flowUserId:this.userId};
        this.httpGet(settings.server1URL + "live/user/profile",params,new Xjs.FuncCall(this.onAjaxGetUserProfile,this),null,0);
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.onAjaxGetUserProfile*/
    onAjaxGetUserProfile:function(o)
    {
        if(!o.data)
            return;
        var data1 = Xjs.JSON.parse(o.data),
            data = data1.data;
        if(!data || !data.id)
            return;
        if(!this.userProfiles)
        {
            this.userProfiles = {};
        }
        this.userProfiles[data.id] = data;
        if(data.nickname && data.id == this.userId)
        {
            this.msgListener.onMessage("win-title",null,data.nickname);
        }
        if(this.pendingNotifyLoginOkUID && this.pendingNotifyLoginOkUID.indexOf(data.id) >= 0)
        {
            this.notifyLoginOk(null);
        }
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.onWebSocketOpen*/
    onWebSocketOpen:function(ev)
    {
        snsoftx.vlive.jsyl.JsylLiveService.superclass.onWebSocketOpen.call(this,ev);
        var settings = this.getCurrentSettings();
        this.sendWebSocketMessage({_method_:"BindUid",device_id:settings.device_id,issued:"pusher",jwt_token:settings.authToken,lob:1,plat:"android",rid:1,user_id:settings.user_id,ver:snsoftx.vlive.jsyl.JsylLiveService.AppVersion});
        var t0 = (new Date()).getTime();
        this.sendWebSocketMessage({_method_:"login",avatartime:"" + Math.floor(t0 / 1000),device_id:settings.device_id,jwt_token:settings.authToken,levelid:"0",prompt_time:"" + t0,rollmsg_time:"" + t0,room_id:this.roomId,user_id:settings.user_id,user_name:settings.user_name});
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.notifyLoginOk*/
    notifyLoginOk:function(loginUserID)
    {
        if(loginUserID)
            this._loginUserID = loginUserID;
        var data = this.getUserProfile(this.userId);
        if(!data)
        {
            if(!this.pendingNotifyLoginOkUID)
            {
                this.pendingNotifyLoginOkUID = [];
            }
            if(this.pendingNotifyLoginOkUID.indexOf(this.userId) < 0)
            {
                this.pendingNotifyLoginOkUID.push(this.userId);
            }
            return;
        }
        this.msgListener.onMessage("login","登录",this._loginUserID + "登入 RoomId=" + this.roomId + ",User " + this.userId + ":" + data.nickname + "," + data.province);
        this.msgListener.onMessage("win-title",null,data.nickname);
        if(this.pendingNotifyLoginOkUID)
        {
            this.pendingNotifyLoginOkUID.remove(this.userId,false);
        }
    },
    /*snsoftx.vlive.jsyl.JsylLiveService.onWebSocketMessage*/
    onWebSocketMessage:function(ev)
    {
        var s = ev.data,
            m = Xjs.JSON.parse(s);
        if(m.type)
            switch(m.type)
            {
            case "ping":
                this.sendWebSocketMessage({device:"android",_method_:"pong"});
                return;
            case "login_ok":
                this.notifyLoginOk(m.user_id);
                return;
            case "onLineClient":
                var cusers = m.client_list,
                    a = new Array(cusers ? cusers.length : 0);
                for(var j=0;j < a.length;j++)
                {
                    var u = cusers[j];
                    a[j] = {userId:u.user_id,level:u.levelid,role:u.role};
                }
                this.msgListener.updateViwers(m.viewer_num + "/" + m.all_num,a);
                return;
            case "legend_hall_win":
                return;
            case "sendGiftNews":
                this.msgListener.onMessage("sys",m.title,m.fromUserDesc + m.fromUserName + "=>" + m.toUserName + " : " + m.giftName);
                return;
            case "sendGift":
                this.msgListener.onMessage("buf-username",m.from_user_id,m.from_client_name);
                this.msgListener.onMessage("sys",m.from_client_name + "的礼物",m.giftName);
                return;
            case "SendPubMsg":
                this.msgListener.onMessage("buf-username",m.from_user_id,m.from_client_name);
                this.msgListener.onMessage("",m.from_client_name,m.content);
                return;
            case "toy":
                return;
            case "peerage_join":
                this.msgListener.onMessage("sys",m.title,m.user_nickname + ":" + m.desc);
                return;
            case "peerage_login":
                this.msgListener.onMessage("buf-username",m.user_id,m.nick_name);
                return;
            case "nameCardNews":
                return;
            case "chargeTimeRoom":
                return;
            case "changeRoomNotice":
            case "sysmsg.alert":
            case "sysmsg":
                this.msgListener.onMessage("",m.title,m.content);
                return;
            case "error":
            case "error.token":
            case "error.kicked":
                this.msgListener.onMessage("err",m.title,m.content);
                return;
            default:
                window.console.log("接受到 %s",s);
                return;
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
        if(settings.authToken)
        {
            header["jwt-token"] = settings.authToken;
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
        if(typeof(settingType) != "number")
            settingType = this.settingType;
        this.loadAllSettings();
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
            s.websocketURL = "wss://cywqfzo8.shdkw1o.com/ws";
        }
        return s;
    }
});
Xjs.apply(snsoftx.vlive.jsyl.JsylLiveService,{
    AppVersion:"3.9.7",
    Platform:"100",
    VestCode:"200"
});
