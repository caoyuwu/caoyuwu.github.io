Xjs.loadedXjs.push("vlive/DiDiVLive");
/*snsoftx/vlive/didi/DiDiLiveService.java*/
Xjs.namespace("snsoftx.vlive.didi");
snsoftx.vlive.didi.DiDiLiveService=function(){
    snsoftx.vlive.didi.DiDiLiveService.superclass.constructor.call(this);
    this.videoPlayerType = "flv";
    this.emptyVideoSize = {width:544,height:960};
    {
        var s = Xjs.getReqParameter("s"),
            cfg = s == null || s == "" ? 0 : Number.parseInt(s);
        if(isNaN(cfg) || cfg < 0 || cfg >= 10)
        {
            throw new Error("参数 s 错误");
        }
        this.settingType = "DiDiLive" + (cfg == 0 ? "" : "" + cfg);
        window.console.log("settingType = %s",this.settingType);
    }
    var s = this.getCurrentSettings();
    if(s.options !== undefined)
    {
        this.options = Number.obj2int(s.options,1);
    }
};
Xjs.extend(snsoftx.vlive.didi.DiDiLiveService,snsoftx.vlive.VLiveService,{
  _js$className_:"snsoftx.vlive.didi.DiDiLiveService",
    staticURL:"https://static.oidhfjg.com",
    /*snsoftx.vlive.didi.DiDiLiveService.getSettings*/
    getSettings:function(settingType)
    {
        if(!settingType)
            settingType = this.settingType;
        if(!this.allSettings)
        {
            var ajax = new Xjs.Ajax({method:"get",url:Xjs.ROOTPATH + "vlive/didi/Settings.json"});
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
        if(!s.serverHost)
        {
            s.serverHost = "api.oidhfjg.com";
        }
        if(!s.serverURL)
        {
            s.serverURL = "https://" + s.serverHost + "/OpenAPI/v1/";
        }
        if(!s.websocketURL)
        {
            s.websocketURL = "wss://" + s.serverHost + ":443";
        }
        return s;
    },
    /*snsoftx.vlive.didi.DiDiLiveService.getCurrentSettings*/
    getCurrentSettings:function()
    {
        return this.getSettings(this.settingType);
    },
    /*snsoftx.vlive.didi.DiDiLiveService.getAjaxInvokeProxy*/
    getAjaxInvokeProxy:function()
    {
        return this.getCurrentSettings().ajaxInvokeProxy;
    },
    /*snsoftx.vlive.didi.DiDiLiveService.getSettingSelections*/
    getSettingSelections:function()
    {
        var a = [],
            retNul = true;
        for(var j=0;j < 10;j++)
        {
            var k = "DiDiLive" + (j == 0 ? "" : "" + j);
            if(window.localStorage[k + ".user_id"] != null)
            {
                a.push([k,j == 0 ? "缺省" : "配置" + j]);
                if(j > 0)
                    retNul = false;
            }
        }
        return retNul ? null : a;
    },
    /*snsoftx.vlive.didi.DiDiLiveService.getLocalSettingsDef*/
    getLocalSettingsDef:function()
    {
        return new snsoftx.tools.LocalSettings$Settings(this.settingType + ".",snsoftx.vlive.didi.DiDiLiveService.LocalSettingItems);
    },
    /*snsoftx.vlive.didi.DiDiLiveService.getVLiveTag*/
    getVLiveTag:function()
    {
        return "DiDiLive";
    },
    /*snsoftx.vlive.didi.DiDiLiveService.httpGet*/
    httpGet:function(path,params,onSuccess,onError,opts)
    {
        var settings = this.getCurrentSettings(),
            header = {};
        if(settings.authToken && !(opts & 1))
            header.Authorization = "Bearer " + settings.authToken;
        if(opts & 2)
        {
            header["X-Live-Butter2"] = settings.liveButter2;
        }
        this.ajaxGET(settings.serverURL + path,header,params,onSuccess,onError,opts & 4 ? 1 : 0);
    },
    /*snsoftx.vlive.didi.DiDiLiveService.onAjaxRoomsLoaded*/
    onAjaxRoomsLoaded:function(rooms,o)
    {
        if(o.code != 0)
        {
            this.msgListener.onRoomsLoadFail(rooms,new Error(o.code + ":" + o.msg));
            return;
        }
        var data = o.data,
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
                r.logoUrl = this.staticURL + logoUri;
        }
        this.msgListener.onRoomsLoaded(rooms);
    },
    /*snsoftx.vlive.didi.DiDiLiveService.getRefreshRoomsOpts*/
    getRefreshRoomsOpts:function()
    {
        return [{name:"type",options:["hot:热门","latest:最新","nearby:附近","vegan","vip:收费","lounge"]},{name:"page",options:[1,2,3,4,5,6]}];
    },
    /*snsoftx.vlive.didi.DiDiLiveService.refreshRooms*/
    refreshRooms:function(rooms)
    {
        var opts = rooms.refreshParams || {},
            type = opts.type || "hot",
            params = {page:this.curPage = opts.page || 1,size:50,order:"time"};
        this.httpGet("anchor/" + type,params,new Xjs.FuncCall(this.onAjaxRoomsLoaded,this,[rooms],2),new Xjs.FuncCall(this.msgListener.onRoomsLoadFail,this.msgListener,[rooms],2),2);
    },
    /*snsoftx.vlive.didi.DiDiLiveService.getWebsocketURL*/
    getWebsocketURL:function()
    {
        var settings = this.getCurrentSettings();
        return settings.websocketURL + "/ws?jwt_token=" + settings.authToken + "&ver=1.9.8.2";
    },
    /*snsoftx.vlive.didi.DiDiLiveService.setRoomInfo*/
    setRoomInfo:function(roomId,userId)
    {
        if(this.userId == userId && this.roomId == roomId)
            return;
        snsoftx.vlive.didi.DiDiLiveService.superclass.setRoomInfo.call(this,roomId,userId);
        if(this.getUserProfile(this.userId) == null)
        {
            this.prepareUserProfile();
        }
    },
    /*snsoftx.vlive.didi.DiDiLiveService.enterRoom*/
    enterRoom:function()
    {
        this.openWebSocket(this.getWebsocketURL());
    },
    /*snsoftx.vlive.didi.DiDiLiveService.requestVideoURL*/
    requestVideoURL:function()
    {
        this.prepareVideo();
    },
    /*snsoftx.vlive.didi.DiDiLiveService.aesDecode*/
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
    /*snsoftx.vlive.didi.DiDiLiveService.onAjaxPrepareVideo*/
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
    /*snsoftx.vlive.didi.DiDiLiveService.onAjaxPrepareVideoFail*/
    onAjaxPrepareVideoFail:function(err)
    {
        this.msgListener.onMessage("getvideo-fail","获取视频",err.message);
    },
    /*snsoftx.vlive.didi.DiDiLiveService.onPrepareVideo*/
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
    /*snsoftx.vlive.didi.DiDiLiveService.prepareVideo*/
    prepareVideo:function()
    {
        var params = {uid:this.userId};
        this.httpGet("private/getPrivateLimit",params,new Xjs.FuncCall(this.onAjaxPrepareVideo,this),new Xjs.FuncCall(this.onAjaxPrepareVideoFail,this),2 | 4);
    },
    /*snsoftx.vlive.didi.DiDiLiveService.prepareUserProfile*/
    prepareUserProfile:function()
    {
        var params = {uid:this.userId};
        this.httpGet("user/profile",params,new Xjs.FuncCall(this.onAjaxGetUserProfile,this),null,0);
    },
    /*snsoftx.vlive.didi.DiDiLiveService.onAjaxGetUserProfile*/
    onAjaxGetUserProfile:function(o)
    {
        var data = o.data;
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
    /*snsoftx.vlive.didi.DiDiLiveService.getUserProfile*/
    getUserProfile:function(id)
    {
        return this.userProfiles ? this.userProfiles[id] : null;
    },
    /*snsoftx.vlive.didi.DiDiLiveService.notifyLoginOk*/
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
    /*snsoftx.vlive.didi.DiDiLiveService.onWebSocketOpen*/
    onWebSocketOpen:function(ev)
    {
        snsoftx.vlive.didi.DiDiLiveService.superclass.onWebSocketOpen.call(this,ev);
        var settings = this.getCurrentSettings();
        this.sendWebSocketMessage({device_id:settings.device_id,issued:"lite",lob:1,_method_:"BindUid",plat:"android",rid:1,jwt_token:settings.authToken,user_id:settings.user_id,ver:snsoftx.vlive.didi.DiDiLiveService.AppVersion});
        this.sendWebSocketMessage({avatartime:"0",device_id:settings.device_id,levelid:"1",_method_:"login",prompt_time:0,rollmsg_time:0,room_id:this.roomId,jwt_token:settings.authToken,user_id:settings.user_id,user_name:settings.user_name});
    },
    /*snsoftx.vlive.didi.DiDiLiveService.onWebSocketMessage*/
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
    /*snsoftx.vlive.didi.DiDiLiveService.onInitListRooms*/
    onInitListRooms:function()
    {
        this.memberSignIN();
    },
    /*snsoftx.vlive.didi.DiDiLiveService.memberSignIN*/
    memberSignIN:function()
    {
        var ymd0 = (new Date()).format(2);
        for(var j=0;j < 10;j++)
        {
            var settingType = "DiDiLive" + (j == 0 ? "" : "" + j),
                settings = this.getSettings(settingType);
            if(!settings)
                continue;
            var userId = settings.user_id;
            if(!userId)
                continue;
            var signinDate = window.localStorage[settingType + ".signinDate"];
            if(signinDate == ymd0)
            {
                window.console.log("已签到： %s ",userId);
                continue;
            }
            if(!settings.authToken)
            {
                continue;
            }
            window.console.log("签到： %s : %s ",userId,settings.authToken);
            var header = {};
            header.Authorization = "Bearer " + settings.authToken;
            header["X-H-User-Agent"] = "Mozilla/5.0 (Linux; Android 9; AOSP on IA Emulator Build/PSR1.180720.117; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.100 Mobile Safari/537.36";
            header["X-Via-ESocks-Proxy"] = "default";
            var onSuccess = new Xjs.FuncCall(this.onAjaxSigninSuccess,this,[settings],2),
                onError = new Xjs.FuncCall(this.onAjaxSigninFail,this,[settings],2),
                proxyServer = Xjs.ROOTPATH.startsWith("https://") ? "https://proxy.caoyuwu.top:1443" : "http://proxy.caoyuwu.top:1080";
            this.ajaxGET(proxyServer + "/https-request/" + settings.serverHost + "/home/user/sign_in?uid=" + userId + "&ver=" + snsoftx.vlive.didi.DiDiLiveService.AppVersion + "&lob=1",header,null,onSuccess,onError,2);
        }
    },
    /*snsoftx.vlive.didi.DiDiLiveService.onAjaxSigninSuccess*/
    onAjaxSigninSuccess:function(settings,o)
    {
        window.localStorage[settings.settingType + ".signinDate"] = (new Date()).format(2);
        window.console.log("签到成功： %s ",settings.user_id);
    },
    /*snsoftx.vlive.didi.DiDiLiveService.onAjaxSigninFail*/
    onAjaxSigninFail:function(settings,ex)
    {
        window.console.error("签到失败： %s : %s ",settings.user_id,ex.message);
    }
});
Xjs.apply(snsoftx.vlive.didi.DiDiLiveService,{
    AppVersion:"1.9.9",
    LocalSettingItems:[{name:"settingTitle"},{name:"device_id"},{name:"user_id"},{name:"user_name"},{name:"serverHost",defaultValue:"api.oidhfjg.com"},{name:"authToken",height:50},{name:"liveButter2",height:50},{name:"options",width:50},{name:"ajaxInvokeProxy"}]
});
