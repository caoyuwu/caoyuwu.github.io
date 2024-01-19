Xjs.loadedXjs.push("vlive/Seal1226VLive");
/*snsoftx/vlive/seal1226/Seal1226LiveService.java*/
Xjs.namespace("snsoftx.vlive.seal1226");
snsoftx.vlive.seal1226.Seal1226LiveService=function(){
    snsoftx.vlive.seal1226.Seal1226LiveService.superclass.constructor.call(this);
    this.videoPlayerType = "";
    this.name = "Seal1226";
    this.emptyVideoSize = {width:544,height:960};
    this.initSettingType();
    this.AccessToken = window.localStorage[this.name + ".AccessToken"];
    this.RefreshToken = window.localStorage[this.name + ".RefreshToken"];
    this.options = 1;
};
Xjs.extend(snsoftx.vlive.seal1226.Seal1226LiveService,snsoftx.vlive.VLiveService,{
  _js$className_:"snsoftx.vlive.seal1226.Seal1226LiveService",
    AppServer:"https://app01.posoyo.com",
    AgoraAppid:"b86555215e9e4b67a15260c6a144564a",
    /*snsoftx.vlive.seal1226.Seal1226LiveService.getCurrentSettings*/
    getCurrentSettings:function()
    {
        this.loadAllSettings();
        return this.allSettings[0];
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.getRefreshRoomsOpts*/
    getRefreshRoomsOpts:function()
    {
        return [{name:"CategoryId",options:[5,6,7,8]}];
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.prepareAuthorization*/
    prepareAuthorization:function(rooms)
    {
        lb_auth:if(this.AccessToken)
            {
                var authParts = this.AccessToken.split(".");
                if(authParts.length != 3)
                    break lb_auth;
                var payload = JSON.parse(atob(authParts[1])),
                    exp = payload.exp,
                    expT = (new Date()).getTime() / 1000 - exp;
                if(expT < -5)
                {
                    if(rooms)
                        this.onAuthed4RefreshRooms(rooms);
                    else 
                        this.onAuthed4PrepareJoin();
                    return;
                }
                window.console.log("过期 : " + expT + " 秒");
            }
        if(!this.RefreshToken || this.RefreshToken.length == 0)
        {
            throw new Error("RefreshToken is null");
        }
        var url = this.AppServer + "/home/token/refresh/" + this.RefreshToken;
        window.console.log("重新获取AccessToken %s",url);
        var header = {};
        this.buildHttpReqHeader(header,false);
        this.ajaxPOST(url,header,null,null,new Xjs.FuncCall(this.onRefreshTokenRet,this,[rooms],2),new Xjs.FuncCall(this.msgListener.onRoomsLoadFail,this.msgListener,[rooms],2),0);
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.onRefreshTokenRet*/
    onRefreshTokenRet:function(rooms,ret)
    {
        if(!ret.success)
        {
            if(rooms)
                this.msgListener.onRoomsLoadFail(rooms,new Error(ret.error));
            return;
        }
        window.localStorage[this.name + ".AccessToken"] = this.AccessToken = ret.data.accessToken;
        window.localStorage[this.name + ".RefreshToken"] = this.RefreshToken = ret.data.refreshToken;
        if(rooms)
            this.onAuthed4RefreshRooms(rooms);
        else 
            this.onAuthed4PrepareJoin();
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.buildHttpReqHeader*/
    buildHttpReqHeader:function(headers,addAuth)
    {
        if(addAuth)
            headers.Authorization = "Bearer " + this.AccessToken;
        var mDev = {};
        mDev.AppVersion = "30";
        mDev.Client = "User";
        mDev.DeviceCode = snsoftx.vlive.seal1226.Seal1226LiveService.DeviceCode;
        mDev.DeviceName = snsoftx.vlive.seal1226.Seal1226LiveService.DeviceName;
        mDev.DeviceVersion = "10";
        mDev.Terminal = "Android";
        headers["x-device"] = JSON.stringify(mDev);
        headers["x-device-code"] = snsoftx.vlive.seal1226.Seal1226LiveService.DeviceCode;
        headers["x-id"] = snsoftx.vlive.seal1226.Seal1226LiveService.X_ID;
        headers["x-ns"] = snsoftx.vlive.seal1226.Seal1226LiveService.X_NS;
        var ts = Math.floor((new Date()).getTime() / 1000);
        headers["x-ts"] = "" + ts;
        var s = "k=" + snsoftx.vlive.seal1226.Seal1226LiveService.SignMagic + "&ns=" + snsoftx.vlive.seal1226.Seal1226LiveService.X_NS + "&ts=" + ts,
            getMd5Url = "https://api.hashify.net/hash/md5/hex?value=" + encodeURIComponent(s);
        window.console.log(getMd5Url);
        var retV = Xjs.Ajax.get("https://api.hashify.net/hash/md5/hex?value=" + encodeURIComponent(s)),
            md5 = retV.Digest;
        window.console.log("%s  : %s",s,md5);
        headers["x-sign"] = md5;
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.refreshRooms*/
    refreshRooms:function(rooms)
    {
        this.prepareAuthorization(rooms);
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.onAuthed4RefreshRooms*/
    onAuthed4RefreshRooms:function(rooms)
    {
        var CategoryId = rooms.refreshParams.CategoryId;
        window.console.log("CategoryId = " + CategoryId);
        var url = this.AppServer + "/live?Source=2&CategoryId=" + CategoryId + "&PageSize=20&PageIndex=1";
        window.console.log("url=" + url);
        var header = {};
        this.buildHttpReqHeader(header,true);
        this.ajaxGET(url,header,null,new Xjs.FuncCall(this.onAjaxRoomsLoaded,this,[rooms],2),new Xjs.FuncCall(this.msgListener.onRoomsLoadFail,this.msgListener,[rooms],2),0);
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.onAjaxRoomsLoaded*/
    onAjaxRoomsLoaded:function(rooms,o)
    {
        rooms.refreshTime = (new Date()).getTime();
        rooms.errInfo = null;
        rooms.rooms = new Array(o.data == null || o.data.rows == null ? 0 : o.data.rows.length);
        for(var i=0;i < rooms.rooms.length;i++)
        {
            var r = {};
            rooms.rooms[i] = r;
            var li = o.data.rows[i];
            r.roomId = li.roomNum;
            r.userId = r.roomId;
            r.userName = li.nickName;
            r.title = li.roomTitle;
            if(li.area)
            {
                r.title += "-" + li.area;
            }
            if(li.payPrice != null)
                r.title += "-" + li.payPrice;
            if(li.coverImage)
            {
                r.logoUrl = this.AppServer + li.coverImage;
            }
        }
        this.msgListener.onRoomsLoaded(rooms);
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.enterRoom*/
    enterRoom:Xjs.emptyFn,
    /*snsoftx.vlive.seal1226.Seal1226LiveService.requestVideoURL*/
    requestVideoURL:function()
    {
        var _this = this;
        Xjs.JsLoad.asynLoadJS("https://download.agora.io/sdk/release/AgoraRTC_N.js").then(function(){
            _this.prepareVideo();
        });
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.prepareVideo*/
    prepareVideo:function()
    {
        window.console.log("====prepareVideo=====");
        if(!this.agoraClient)
        {
            this.agoraClient = AgoraRTC.createClient({mode:"live",codec:"h264"});
            this.agoraClient.on("user-published",this.handleUserPublished.createDelegate(this));
            this.agoraClient.on("user-unpublished",this.handleUserUnpublished.createDelegate(this));
            this.agoraClient.setClientRole("audience",{level:1}).then(this.prepareJoin.createDelegate(this));
        } else 
        {
            this.prepareJoin();
        }
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.prepareJoin*/
    prepareJoin:function()
    {
        this.prepareAuthorization(null);
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.onAuthed4PrepareJoin*/
    onAuthed4PrepareJoin:function()
    {
        var url = this.AppServer + "/live/token/play?roomNum=" + this.roomId;
        window.console.log("url=" + url);
        var header = {};
        this.buildHttpReqHeader(header,true);
        this.ajaxGET(url,header,null,new Xjs.FuncCall(this.onPreparedJoin,this,[],2),null,0);
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.onPreparedJoin*/
    onPreparedJoin:function(ret)
    {
        window.console.log("ret = " + JSON.stringify(ret));
        if(!ret.success)
        {
            alert(ret.error);
            return;
        }
        this.agoraToken = ret.data.token;
        this.agoraUid = ret.data.uid;
        this.join();
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.join*/
    join:function()
    {
        if(!this.agoraToken)
            throw new Error("AgoraToken is null");
        window.console.log("加入 %s: token=%s,uid=%s",this.roomId,this.agoraToken,this.agoraUid);
        this.agoraClient.join(this.AgoraAppid,this.roomId,this.agoraToken,parseInt(this.agoraUid));
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.handleUserPublished*/
    handleUserPublished:function(user,mediaType)
    {
        window.console.log("[处理]接受到消息-user-published: user=%s",user.uid);
        this.subscribe(user,mediaType);
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.subscribe*/
    subscribe:function(user,mediaType)
    {
        this.agoraClient.subscribe(user,mediaType).then(this.onVideoSubscribed.createDelegate(this,[user,mediaType],false));
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.onVideoSubscribed*/
    onVideoSubscribed:function(user,mediaType)
    {
        window.console.log("[%s]订阅成功: user=%s",mediaType,user.uid);
        if(mediaType == "video")
        {
            var videoDom = document.getElementById("video-player-wrapper");
            Xjs.DOM.removeAllChild(videoDom);
            videoDom.style.width = "360px";
            videoDom.style.height = "640px";
            user.videoTrack.play("video-player-wrapper",{fit:"contain"});
        } else if(mediaType == "audio")
        {
            user.audioTrack.play();
        }
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.handleUserUnpublished*/
    handleUserUnpublished:Xjs.emptyFn,
    /*snsoftx.vlive.seal1226.Seal1226LiveService.exitRoom*/
    exitRoom:function()
    {
        snsoftx.vlive.seal1226.Seal1226LiveService.superclass.exitRoom.call(this);
        this.agoraClient.leave();
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.getAjaxInvokeProxy*/
    getAjaxInvokeProxy:function()
    {
        return "http://proxy.lan:1080";
    },
    /*snsoftx.vlive.seal1226.Seal1226LiveService.getLocalSettingsDef*/
    getLocalSettingsDef:Xjs.nullFn
});
Xjs.apply(snsoftx.vlive.seal1226.Seal1226LiveService,{
    SignMagic:"7db66862-9f2b-420c-b0c3-ac6a5ef2730d",
    X_NS:"0000000000",
    X_ID:"Seal20kdwU29p20K",
    DeviceCode:"29f0fc834109719680bb0a27865107ab",
    DeviceName:"HMA-AL00"
});
