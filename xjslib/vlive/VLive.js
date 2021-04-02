Xjs.loadedXjs.push("vlive/VLive");
/*snsoftx/vlive/VLive.java*/
Xjs.namespace("snsoftx.vlive");
snsoftx.vlive.VLive=function(service){
    this.service = service;
    service.msgListener = this;
    this.vliveTag = service.getVLiveTag() || "VLive";
    this.selectSettingsDOM = Xjs.DOM.findById("SelectSetting",null);
    if(this.selectSettingsDOM)
    {
        var a = service.getSettingSelections();
        if(a)
        {
            for(var j=0;j < a.length;j++)
            {
                var o = document.createElement("option");
                o.value = a[j][0];
                o.text = a[j][1];
                if(o.value == service.settingType)
                {
                    o.selected = true;
                }
                (this.selectSettingsDOM).options.add(o);
            }
            this.selectSettingsDOM.value = service.settingType;
            this.selectSettingsDOM.onchange = Function.bindAsEventListener(this.onSettingsSelChanged,this);
        } else 
        {
            this.selectSettingsDOM.style.display = "none";
        }
    }
};
Xjs.apply(snsoftx.vlive.VLive.prototype,{
    bufUserNames:{},
    /*snsoftx.vlive.VLive.onSettingsSelChanged*/
    onSettingsSelChanged:function(e)
    {
        this.service.setSettingType(this.selectSettingsDOM.value);
    },
    /*snsoftx.vlive.VLive.loadFavorited*/
    loadFavorited:function(reload)
    {
        if(!this.favoritedIds || reload)
        {
            var s = window.localStorage[this.vliveTag + ".Favorited"];
            if(!s || (s = s.toString()).length == 0)
                this.favoritedIds = [];
            else 
                this.favoritedIds = Xjs.JSON.parse(s);
        }
    },
    /*snsoftx.vlive.VLive.isFavorited*/
    isFavorited:function(rid)
    {
        this.loadFavorited(false);
        return this.favoritedIds.indexOf(rid) >= 0;
    },
    /*snsoftx.vlive.VLive.setFavorited*/
    setFavorited:function(rid,set)
    {
        this.loadFavorited(true);
        if(set)
        {
            if(this.favoritedIds.indexOf(rid) >= 0)
                return;
            this.favoritedIds.push(rid);
        } else 
        {
            var j;
            if((j = this.favoritedIds.indexOf(rid)) < 0)
                return;
            this.favoritedIds.splice(j,1);
        }
        window.localStorage[this.vliveTag + ".Favorited"] = Xjs.JSON.encode(this.favoritedIds);
    },
    /*snsoftx.vlive.VLive.onMessage*/
    onMessage:Xjs.emptyFn,
    /*snsoftx.vlive.VLive.onRoomsLoaded*/
    onRoomsLoaded:Xjs.emptyFn,
    /*snsoftx.vlive.VLive.onRoomsLoadFail*/
    onRoomsLoadFail:Xjs.emptyFn,
    /*snsoftx.vlive.VLive.onClickCopy*/
    onClickCopy:function(e)
    {
        var btn = e.srcElement || e.target,
            txtDOM = btn.previousSibling.previousSibling,
            range = document.createRange();
        range.selectNode(txtDOM);
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(range);
        document.execCommand("Copy",false,false);
    },
    /*snsoftx.vlive.VLive.setBufUserName*/
    setBufUserName:function(userId,userName)
    {
        if(userName && userId)
            this.bufUserNames[userId] = userName;
    },
    /*snsoftx.vlive.VLive.getBufUserName*/
    getBufUserName:function(userId)
    {
        return this.bufUserNames[userId] || null;
    },
    /*snsoftx.vlive.VLive.updateViwers*/
    updateViwers:Xjs.emptyFn
});
/*snsoftx/vlive/VLiveService.java*/
snsoftx.vlive.VLiveService=function(){
};
Xjs.apply(snsoftx.vlive.VLiveService.prototype,{
    options:1,
    /*snsoftx.vlive.VLiveService.setSettingType*/
    setSettingType:function(type)
    {
        window.console.log("配置类型切换为 ： %s",type);
        this.settingType = type;
    },
    /*snsoftx.vlive.VLiveService.getSettingSelections*/
    getSettingSelections:Xjs.nullFn,
    /*snsoftx.vlive.VLiveService.ajaxInvoke*/
    ajaxInvoke:function(method,url,header,params,contentType,postParams,onSuccess,onError,opts)
    {
        var postBody = null,
            queryParams = null;
        if(params)
        {
            queryParams = Xjs.urlEncode(params);
        }
        if(method == null)
            method = postParams != null ? "post" : "get";
        if(method.toLowerCase() == "post")
        {
            if(contentType == null || contentType.startsWith("application/json"))
            {
                postBody = Xjs.JSON.encode(postParams,null,1);
                if(contentType == null)
                    contentType = "application/json;charset=utf-8";
            } else 
            {
                throw new Error("todo..:Form 表单");
            }
        }
        try
        {
            var ajax = new Xjs.Ajax({url:url,parameters:queryParams,method:method,contentType:contentType,header:header,postBody:postBody,success:onSuccess,error:onError || new Xjs.FuncCall(this.onAjaxFail,this)});
            if(opts & 1)
            {
                ajax.enableJsonDec = false;
            }
            ajax.request();
        }catch(ex)
        {
            alert(ex.message);
        }
    },
    /*snsoftx.vlive.VLiveService.onAjaxFail*/
    onAjaxFail:function(ex)
    {
        alert(ex.message);
    },
    /*snsoftx.vlive.VLiveService.ajaxGET*/
    ajaxGET:function(url,header,params,onSuccess,onError,opts)
    {
        this.ajaxInvoke("GET",url,header,params,null,null,onSuccess,onError,opts);
    },
    /*snsoftx.vlive.VLiveService.ajaxPOST*/
    ajaxPOST:function(url,header,params,postBody,onSuccess,onError,opts)
    {
        this.ajaxInvoke("POST",url,header,params,null,postBody,onSuccess,onError,opts);
    },
    /*snsoftx.vlive.VLiveService.getVLiveTag*/
    getVLiveTag:function()
    {
        return "VLive";
    },
    /*snsoftx.vlive.VLiveService.getRefreshRoomsOpts*/
    getRefreshRoomsOpts:Xjs.nullFn,
    /*snsoftx.vlive.VLiveService.refreshRooms*/
    refreshRooms:Xjs.emptyFn,
    /*snsoftx.vlive.VLiveService.setRoomInfo*/
    setRoomInfo:function(roomId,userId)
    {
        this.roomId = roomId;
        this.userId = userId;
    },
    /*snsoftx.vlive.VLiveService.enterRoom*/
    enterRoom:Xjs.emptyFn,
    /*snsoftx.vlive.VLiveService.requestVideoURL*/
    requestVideoURL:Xjs.emptyFn,
    /*snsoftx.vlive.VLiveService.exitRoom*/
    exitRoom:Xjs.emptyFn,
    /*snsoftx.vlive.VLiveService.getLocalSettingsDef*/
    getLocalSettingsDef:Xjs.emptyFn,
    /*snsoftx.vlive.VLiveService.openWebSocket*/
    openWebSocket:function(wsUrl)
    {
        this.closeWebSocket();
        if(wsUrl == null)
        {
            return;
        }
        window.console.log("OpenWebSocket %s",wsUrl);
        this.websocket = new WebSocket(wsUrl);
        this.websocket.onopen = this.onWebSocketOpen.createDelegate(this);
        this.websocket.onclose = this.onWebSocketClose.createDelegate(this);
        this.websocket.onmessage = this.onWebSocketMessage.createDelegate(this);
        this.websocket.onerror = this.onWebSocketError.createDelegate(this);
    },
    /*snsoftx.vlive.VLiveService.closeWebSocket*/
    closeWebSocket:function()
    {
        if(this.websocket)
        {
            try
            {
                this.websocket.close();
            }catch(ex)
            {
            }
            this.websocket = null;
            this.msgListener.onMessage("logout",null,null);
        }
    },
    /*snsoftx.vlive.VLiveService.onWebSocketOpen*/
    onWebSocketOpen:function(ev)
    {
        this.msgListener.onMessage("login",null,null);
    },
    /*snsoftx.vlive.VLiveService.onWebSocketClose*/
    onWebSocketClose:function(ev)
    {
        this.msgListener.onMessage("","WebSocket关闭",ev.data);
        this.msgListener.onMessage("logout",null,null);
        this.websocket = null;
    },
    /*snsoftx.vlive.VLiveService.onWebSocketError*/
    onWebSocketError:function(ev)
    {
        window.console.error("WebSocket错误:%s",ev.data);
        this.msgListener.onMessage("err","WebSocket错误",ev.data);
        this.closeWebSocket();
    },
    /*snsoftx.vlive.VLiveService.onWebSocketMessage*/
    onWebSocketMessage:Xjs.emptyFn,
    /*snsoftx.vlive.VLiveService.sendWebSocketMessage*/
    sendWebSocketMessage:function(m)
    {
        var s = Xjs.JSON.encode(m,null,1);
        this.websocket.send(s);
    },
    /*snsoftx.vlive.VLiveService.onInitListRooms*/
    onInitListRooms:Xjs.emptyFn
});
/*snsoftx/vlive/VLiveRoom.java*/
snsoftx.vlive.VLiveRoom=function(service){
    snsoftx.vlive.VLiveRoom.superclass.constructor.call(this,service);
    this.msgPane = new Xjs.ui.MessagePane({dom:Xjs.DOM.findById("MessagePane",null),autoScroll:false});
    var e = Xjs.DOM.findById("MessagePane2",null);
    this.msgPane2 = e ? new Xjs.ui.MessagePane({dom:e,autoScroll:false}) : null;
    e = Xjs.DOM.findById("MessagePane3",null);
    this.msgPane3 = e ? new Xjs.ui.MessagePane({dom:e,autoScroll:false}) : null;
    this.enterRootBtnDOM = Xjs.DOM.findById("EnterRoomBtn",null);
    this.getVideoBtnDOM = Xjs.DOM.findById("GetVideoBtn",null);
    this.clearMsgBtnDOM = Xjs.DOM.findById("ClearMsgBtn",null);
    this.infoRegionDom = Xjs.DOM.findById("InfoRegion",null);
    this.roomInfoDom = Xjs.DOM.findById("RoomInfo",null);
    this.enterRootBtnDOM.onclick = Function.bindAsEventListener(this.enterOrExitRoom,this);
    this.getVideoBtnDOM.onclick = Function.bindAsEventListener(this.requestVideoURL,this);
    this.clearMsgBtnDOM.onclick = Function.bindAsEventListener(this.oncmd_clearmsg,this);
    this.msgPaneSel1 = Xjs.DOM.findById("MessagePaneSel1",null);
    this.msgPaneSel2 = Xjs.DOM.findById("MessagePaneSel2",null);
    this.msgPaneSel3 = Xjs.DOM.findById("MessagePaneSel3",null);
    this.lbMsgPaneSel2 = Xjs.DOM.findById("lb_MessagePaneSel2",null);
    this.favoriteRoomBtnDOM = Xjs.DOM.findById("FavoriteRoomBtn",null);
    {
        var f = Function.bindAsEventListener(this.onMsgPaneSelChanged,this);
        this.msgPaneSel1.onchange = f;
        this.msgPaneSel2.onchange = f;
        this.msgPaneSel3.onchange = f;
    }
    window.onbeforeunload = Function.bindAsEventListener(this.onWinClosing,this);
    this.chkHideSysMessage = Xjs.DOM.findById("ChkHideSysMessage",null);
    if(this.chkHideSysMessage)
    {
        this.chkHideSysMessage.onclick = Function.bindAsEventListener(this.oncmd_hidesysmessage,this);
        this.oncmd_hidesysmessage();
    }
    this.roomId = Xjs.getReqParameter("rid");
    this.userId = Xjs.getReqParameter("uid");
    if(this.favoriteRoomBtnDOM)
    {
        this.favoriteRoomBtnDOM.onclick = Function.bindAsEventListener(this.oncmd_setFavoroted,this);
        this.updateSetFavoritedBtnText();
    }
    this.service.setRoomInfo(this.roomId,this.userId);
    if(this.service.options & 1)
        this.requestVideoURL();
    if(this.service.options & 2)
        this.enterOrExitRoom();
};
Xjs.extend(snsoftx.vlive.VLiveRoom,snsoftx.vlive.VLive,{
  _js$className_:"snsoftx.vlive.VLiveRoom",
    /*snsoftx.vlive.VLiveRoom.enterOrExitRoom*/
    enterOrExitRoom:function()
    {
        if(this.roomEntered)
        {
            this.service.exitRoom();
        } else 
        {
            this.disableEnterRoomBtn();
            this.service.enterRoom();
        }
    },
    /*snsoftx.vlive.VLiveRoom.requestVideoURL*/
    requestVideoURL:function()
    {
        this.enableGetVideoBtn(false);
        this.service.requestVideoURL();
    },
    /*snsoftx.vlive.VLiveRoom.updateEnterBtnLabel*/
    updateEnterBtnLabel:function()
    {
        if(this.enterRootBtnDOM)
        {
            this.enterRootBtnDOM.disabled = false;
            Xjs.DOM.setTextContent(this.enterRootBtnDOM,this.roomEntered ? "退出" : "登入");
        }
    },
    /*snsoftx.vlive.VLiveRoom.disableEnterRoomBtn*/
    disableEnterRoomBtn:function()
    {
        if(this.enterRootBtnDOM)
        {
            this.enterRootBtnDOM.disabled = true;
            Xjs.DOM.setTextContent(this.enterRootBtnDOM,"连接..");
        }
    },
    /*snsoftx.vlive.VLiveRoom.oncmd_clearmsg*/
    oncmd_clearmsg:function()
    {
        if(this.msgPane)
            this.msgPane.clear();
    },
    /*snsoftx.vlive.VLiveRoom.getMessagePaneSel*/
    getMessagePaneSel:function()
    {
        if(this.msgPaneSel2 && this.msgPaneSel2.checked)
        {
            return 1;
        }
        if(this.msgPaneSel3 && this.msgPaneSel3.checked)
        {
            return 2;
        }
        return 0;
    },
    /*snsoftx.vlive.VLiveRoom.onMsgPaneSelChanged*/
    onMsgPaneSelChanged:function()
    {
        var s = this.getMessagePaneSel();
        this.msgPane.dom.style.display = s == 0 ? "" : "none";
        this.msgPane2.dom.style.display = s == 1 ? "" : "none";
        this.msgPane3.dom.style.display = s == 2 ? "" : "none";
    },
    /*snsoftx.vlive.VLiveRoom.onWinClosing*/
    onWinClosing:function()
    {
        this.service.exitRoom();
    },
    /*snsoftx.vlive.VLiveRoom.oncmd_hidesysmessage*/
    oncmd_hidesysmessage:function()
    {
        var hide = this.chkHideSysMessage ? this.chkHideSysMessage.checked : false;
        Xjs.DOM.addOrRemoveClass(this.msgPane.dom,"hide-sysmsg",hide);
    },
    /*snsoftx.vlive.VLiveRoom.infoMsg*/
    infoMsg:function(title,message,cls)
    {
        if(title && title != "")
        {
            if(title.charCodeAt(0) != 0x3010)
            {
                title = "【" + title + "】";
            }
            this.msgPane.addMessage(title,cls || "item-title",1);
        }
        this.msgPane.addMessage(message,cls,2);
    },
    /*snsoftx.vlive.VLiveRoom.playVideo*/
    playVideo:function(url)
    {
        this.startPlayDate = new Date();
        this.infoMsg("视频地址",url,null);
        this.playingUrl = url;
        this.showOtherMsgs();
        if(!this.videoPlay)
        {
            this.videoPlay = new snsoftx.video.HLSVideoPlay("video-player",{fitSize:1});
            this.videoPlay.setListener(this);
        }
        this.videoPlay.play(url);
    },
    /*snsoftx.vlive.VLiveRoom.enableGetVideoBtn*/
    enableGetVideoBtn:function(enable)
    {
        if(this.getVideoBtnDOM)
        {
            this.getVideoBtnDOM.disabled = !enable;
        }
    },
    /*snsoftx.vlive.VLiveRoom.onMessage*/
    onMessage:function(type,title,message)
    {
        if(!type)
            type = "";
        switch(type)
        {
        case "login":
            this.infoMsg(title,message,null);
            this.roomEntered = true;
            if(this.roomInfoDom)
                Xjs.DOM.setTextContent(this.roomInfoDom,message);
            this.updateEnterBtnLabel();
            return;
        case "logout":
            if(this.roomEntered)
            {
                this.infoMsg("登录","=====退出=======",null);
                this.roomEntered = false;
            }
            if(this.roomInfoDom)
                Xjs.DOM.setTextContent(this.roomInfoDom,"");
            this.updateEnterBtnLabel();
            return;
        case "play-video":
            this.enableGetVideoBtn(true);
            this.playVideo(message);
            return;
        case "getvideo-fail":
            this.onMessage("err",title,message);
            this.enableGetVideoBtn(true);
            return;
        case "win-title":
            document.title = message;
            return;
        case "update-viwers":
            return;
        case "buf-username":
            this.setBufUserName(title,message);
            return;
        default:
            {
                var cls = null;
                if(type && type != "")
                {
                    cls = "item-" + type + "msg";
                }
                this.infoMsg(title,message,cls);
                return;
            }
        }
    },
    /*snsoftx.vlive.VLiveRoom.showOtherMsgs*/
    showOtherMsgs:function()
    {
        if(!this.msgPane3)
            return;
        this.msgPane3.clear();
        addPlayURL:if(this.playingUrl)
            {
                if(!this.fn$onClickCopy)
                    this.fn$onClickCopy = Function.bindAsEventListener(this.onClickCopy,this);
                this.msgPane3.addMessage(this.startPlayDate.format());
                this.msgPane3.addMessage("【播放地址】","item-title",2);
                this.msgPane3.addMessage(this.playingUrl,null,2);
                var cpBtn = document.createElement("button");
                cpBtn.textContent = "拷贝地址";
                cpBtn.onclick = this.fn$onClickCopy;
                this.msgPane3.addDOM(cpBtn,0);
                var p = this.playingUrl.indexOf("://");
                p = p < 0 ? -1 : this.playingUrl.indexOf("/",p + 3);
                p = p < 0 ? -1 : this.playingUrl.indexOf("/",p + 1);
                if(p < 0)
                    break addPlayURL;
                this.msgPane3.addMessage(this.playingUrl.substring(0,p),null,2);
                cpBtn = document.createElement("button");
                cpBtn.textContent = "拷贝...";
                cpBtn.onclick = this.fn$onClickCopy;
                this.msgPane3.addDOM(cpBtn,0);
                this.msgPane3.addMessage(this.playingUrl.substring(p + 1),null,2);
                cpBtn = document.createElement("button");
                cpBtn.textContent = "拷贝...";
                cpBtn.onclick = this.fn$onClickCopy;
                this.msgPane3.addDOM(cpBtn,0);
            }
    },
    /*snsoftx.vlive.VLiveRoom.onVideoViewSizeChanged*/
    onVideoViewSizeChanged:function(w,h)
    {
        if(this.infoRegionDom)
            this.infoRegionDom.style.left = w + 10 + "px";
    },
    /*snsoftx.vlive.VLiveRoom.getVideoViewMaxSize*/
    getVideoViewMaxSize:function(vw,vh)
    {
        return {width:vw * 3 / 4,height:vh};
    },
    /*snsoftx.vlive.VLiveRoom.updateViwers*/
    updateViwers:function(totalCount,views)
    {
        this.msgPane2.clear();
        var s = views == null ? "" : "在线" + totalCount + "人";
        if(this.lbMsgPaneSel2)
        {
            Xjs.DOM.setTextContent(this.lbMsgPaneSel2,s);
        }
        this.msgPane2.addMessage(s);
        if(views)
        {
            for(var i=0;i < views.length;i++)
            {
                var u = views[i];
                s = "" + u.userId;
                var uname = u.userName || this.getBufUserName(u.userId);
                if(uname)
                    s += ":" + uname;
                if(u.role)
                    s += "(" + u.role + ")";
                if(u.level)
                    s += "(" + u.level + ")";
                this.msgPane2.addMessage(s);
            }
        }
    },
    /*snsoftx.vlive.VLiveRoom.oncmd_setFavoroted*/
    oncmd_setFavoroted:function()
    {
        if(this.userId == null)
            return;
        this.setFavorited(this.userId,!this.isFavorited(this.userId));
        this.updateSetFavoritedBtnText();
    },
    /*snsoftx.vlive.VLiveRoom.updateSetFavoritedBtnText*/
    updateSetFavoritedBtnText:function()
    {
        if(this.favoriteRoomBtnDOM)
            Xjs.DOM.setTextContent(this.favoriteRoomBtnDOM,this.isFavorited(this.userId) ? "取消收藏" : "收藏");
    }
});
/*snsoftx/vlive/VLiveRoomList.java*/
snsoftx.vlive.VLiveRoomList=function(service){
    snsoftx.vlive.VLiveRoomList.superclass.constructor.call(this,service);
    this.roomListDOM = Xjs.DOM.findById("RoomList",null);
    this.roomItemDOM = Xjs.DOM.findById("RoomItem",null);
    Xjs.DOM.remove(this.roomItemDOM);
    this.refreshBtnDOM = Xjs.DOM.findById("RefreshBtn",null);
    this.renderLogoChkDOM = Xjs.DOM.findById("RenderUserLogo",null);
    var refresOptsPaneDOM = Xjs.DOM.findById("RefreshOptsPane",null),
        a = service.getRefreshRoomsOpts() || [];
    this.refreshOptChks = new Array(a.length);
    this.allRooms = {};
    var optNms = [],
        fn$onRefreshOptsChanged = Function.bindAsEventListener(this.onRefreshOptsChanged,this);
    for(var j=0;j < a.length;j++)
    {
        this.refreshOptChks[j] = {opts:a[j]};
        var d = this.refreshOptChks[j].checkDOM = Xjs.DOM.createChild(refresOptsPaneDOM,"input");
        d.onclick = fn$onRefreshOptsChanged;
        var gname = a[j]._name || "RefreshOpts";
        d.name = gname;
        d.id = d.name + "_" + j;
        if(gname != null && !gname.startsWith("CHK_"))
        {
            d.type = "radio";
            var first = optNms.indexOf(d.name) < 0;
            d.checked = first;
            if(first)
            {
                optNms.push(d.name);
            }
        } else 
        {
            d.type = "checkbox";
            d.checked = !!a[j]._checked;
        }
        var lbDOM = Xjs.DOM.createChild(refresOptsPaneDOM,"label");
        Xjs.DOM.setTextContent(lbDOM,a[j]._title);
        lbDOM.htmlFor = d.id;
    }
    this.refreshBtnDOM.onclick = Function.bindAsEventListener(this.oncmd_refresh,this,0,true);
    this.statusPaneDOM = Xjs.DOM.findById("StatusPane",null);
    ;
    this.fn$onRoomItemDblClick = Function.bindAsEventListener(this.onRoomItemDblClick,this);
    this.onRefreshOptsChanged();
    service.onInitListRooms();
};
Xjs.extend(snsoftx.vlive.VLiveRoomList,snsoftx.vlive.VLive,{
  _js$className_:"snsoftx.vlive.VLiveRoomList",
    /*snsoftx.vlive.VLiveRoomList.getSelectedRoomes*/
    getSelectedRoomes:function()
    {
        var title = null,
            opts = {};
        for(var j=0;j < this.refreshOptChks.length;j++)
        {
            if(this.refreshOptChks[j].checkDOM.checked)
            {
                var o = this.refreshOptChks[j].opts,
                    t = o._title;
                if(t == null)
                {
                    t = (o._name || "") + j;
                }
                title = title == null ? t : title + "-" + t;
                for(var n in o)
                {
                    if(n == "_name" || n == "_title" || n == "_checked")
                    {
                        continue;
                    }
                    opts[n] = o[n];
                }
            }
        }
        if(title == null)
        {
            title = "";
        }
        var r = this.allRooms[title];
        if(!r)
        {
            r = {};
            r.title = title;
            r.refreshParams = opts;
            this.allRooms[title] = r;
        }
        return r;
    },
    /*snsoftx.vlive.VLiveRoomList.oncmd_refresh*/
    oncmd_refresh:function()
    {
        this.refreshRooms(true);
    },
    /*snsoftx.vlive.VLiveRoomList.onRefreshOptsChanged*/
    onRefreshOptsChanged:function()
    {
        var r = this.getSelectedRoomes();
        this.renderRooms(r,0);
    },
    /*snsoftx.vlive.VLiveRoomList.refreshRooms*/
    refreshRooms:function(refresh)
    {
        var r = this.getSelectedRoomes();
        r.rooms = null;
        r.refreshTime = (new Date()).getTime();
        r.errInfo = null;
        this.renderRooms(r,0);
        this.service.refreshRooms(r);
    },
    /*snsoftx.vlive.VLiveRoomList.onRoomsLoaded*/
    onRoomsLoaded:function(rooms)
    {
        rooms.refreshTime = (new Date()).getTime();
        if(!rooms.rooms)
        {
            rooms.rooms = [];
        }
        this.renderRooms(rooms,0);
    },
    /*snsoftx.vlive.VLiveRoomList.onRoomsLoadFail*/
    onRoomsLoadFail:function(rooms,ex)
    {
        rooms.errInfo = ex.message || "";
        rooms.refreshTime = (new Date()).getTime();
        this.renderRooms(rooms,0);
    },
    /*snsoftx.vlive.VLiveRoomList.renderRooms*/
    renderRooms:function(roomsLst,opts)
    {
        var rooms = roomsLst ? roomsLst.rooms : null,
            n = rooms ? rooms.length : 0;
        Xjs.DOM.removeAllChild(this.roomListDOM);
        var renderLogo = this.renderLogoChkDOM ? this.renderLogoChkDOM.checked : true;
        Xjs.DOM.addOrRemoveClass(this.roomListDOM,"ui-render-userlogo",renderLogo);
        Xjs.DOM.addOrRemoveClass(this.roomListDOM,"ui-no-userlogo",!renderLogo);
        if(n > 0)
        {
            this.loadFavorited(true);
        }
        var baseRoomIdx = roomsLst.baseRoomIdx || 0;
        for(var i=0;i < n;i++)
        {
            var r = rooms[i],
                isFavo = this.isFavorited(r.userId);
            if(this.favorited && !isFavo)
            {
                continue;
            }
            r.dom = this.roomItemDOM.cloneNode(true);
            r.dom.id = "Room_" + r.roomId;
            r.logoDom = Xjs.DOM.findById("LogoImage",r.dom);
            r.titleDom = Xjs.DOM.findById("Title",r.dom);
            r.idxDOM = Xjs.DOM.findById("RoomIdx",r.dom);
            r.userDom = Xjs.DOM.findById("User",r.dom);
            r.limitDOM = Xjs.DOM.findById("Limit",r.dom);
            Xjs.DOM.setTextContent(r.titleDom,r.title);
            Xjs.DOM.setTextContent(r.userDom,r.userName);
            Xjs.DOM.setTextContent(r.idxDOM,baseRoomIdx + i + ":" + r.userId);
            Xjs.DOM.setTextContent(r.limitDOM,r.limit);
            Xjs.DOM.addOrRemoveClass(r.dom,"live-showing",r.limit != null);
            Xjs.DOM.addOrRemoveClass(r.dom,"live-favorited",isFavo);
            if(renderLogo && r.logoDom && r.logoUrl)
            {
                r.logoDom.src = r.logoUrl;
            }
            this.roomListDOM.appendChild(r.dom);
            r.dom.ondblclick = this.fn$onRoomItemDblClick;
        }
        if(this.statusPaneDOM)
        {
            var s = "";
            if(roomsLst.errInfo != null)
            {
                s = "刷新错误：" + roomsLst.errInfo;
            } else if(rooms)
            {
                s = "记录数=" + rooms.length;
                if(roomsLst.totalRooms !== undefined)
                {
                    s += "/" + roomsLst.totalRooms;
                }
                var d = new Date(roomsLst.refreshTime);
                s += ",刷新时间=" + d.format();
            } else 
            {
                s = roomsLst.refreshTime > 0 ? "正在刷新.." : "数据待刷新";
            }
            Xjs.DOM.setTextContent(this.statusPaneDOM,roomsLst.title + ":" + s);
        }
        this.refreshBtnDOM.disabled = rooms == null && roomsLst.refreshTime > 0 && roomsLst.errInfo == null;
    },
    /*snsoftx.vlive.VLiveRoomList.getRoomById*/
    getRoomById:function(rid)
    {
        var roomsLst = this.getSelectedRoomes(),
            rooms = roomsLst ? roomsLst.rooms : null,
            n = rooms ? rooms.length : 0;
        for(var i=0;i < n;i++)
        {
            var r = rooms[i];
            if(rid == r.roomId)
                return r;
        }
        return null;
    },
    /*snsoftx.vlive.VLiveRoomList.onRoomItemDblClick*/
    onRoomItemDblClick:function(e)
    {
        var d = e.srcElement || e.target;
        for(;d && d != this.roomListDOM && (!d.id || !d.id.startsWith("Room_"));d = d.parentNode)
            ;
        if(d.id && d.id.startsWith("Room_"))
        {
            var room = this.getRoomById(Number.obj2int(d.id.substring(5),0));
            window.console.log("进入 Room %s , user=%s:%s",room.roomId,room.userId,room.userName);
            window.open("Room.html#?rid=" + room.roomId + "&uid=" + room.userId,"_blank");
        }
    }
});
/*snsoftx/vlive/didi/DiDiLiveService.java*/
Xjs.namespace("snsoftx.vlive.didi");
snsoftx.vlive.didi.DiDiLiveService=function(){
    snsoftx.vlive.didi.DiDiLiveService.superclass.constructor.call(this);
    this.bufSettings = {};
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
        var s = this.bufSettings[settingType];
        if(!s)
        {
            s = {settingType:settingType};
            var settings = new snsoftx.tools.LocalSettings$Settings(settingType + ".",snsoftx.vlive.didi.DiDiLiveService.LocalSettingItems);
            for(var j=0;j < settings.items.length;j++)
            {
                var i = settings.items[j];
                s[i.name] = settings.getItemValue(i.name);
            }
            if(s.serverHost == null)
            {
                s.serverHost = "api.oidhfjg.com";
            }
            s.serverURL = "https://" + s.serverHost + "/OpenAPI/v1/";
            s.websocketURL = "wss://" + s.serverHost + ":443";
            this.bufSettings[settingType] = s;
        }
        return s;
    },
    /*snsoftx.vlive.didi.DiDiLiveService.getCurrentSettings*/
    getCurrentSettings:function()
    {
        return this.getSettings(this.settingType);
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
        this.ajaxPOST(settings.serverURL + path,header,params,null,onSuccess,onError,opts & 4 ? 1 : 0);
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
        return [{type:"hot",_title:"热门"},{type:"latest",_title:"最新"},{type:"nearby",_title:"附近"},{type:"vegan",_title:"vegan"},{type:"vip",_title:"收费"},{type:"lounge",_title:"lounge"},{_name:"Page",page:1,_title:"1"},{_name:"Page",page:2,_title:"2"},{_name:"Page",page:3,_title:"3"},{_name:"Page",page:4,_title:"4"},{_name:"Page",page:5,_title:"5"},{_name:"Page",page:6,_title:"6"}];
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
    /*snsoftx.vlive.didi.DiDiLiveService.exitRoom*/
    exitRoom:function()
    {
        this.closeWebSocket();
    },
    /*snsoftx.vlive.didi.DiDiLiveService.aesDecode*/
    aesDecode:function(enc)
    {
        var settings = this.getCurrentSettings(),
            md5Key = CryptoJS.MD5(settings.authToken),
            smd5Key = md5Key.toString();
        window.console.log("md5Key = %s",md5Key.toString());
        var key = CryptoJS.enc.Utf8.parse(smd5Key.substring(0,16));
        window.console.log("key = " + key.toString(CryptoJS.enc.Hex));
        var iv = CryptoJS.enc.Utf8.parse(smd5Key.substring(16));
        window.console.log("iv = " + iv.toString(CryptoJS.enc.Hex));
        return CryptoJS.AES.decrypt(enc,key,{iv:iv,padding:CryptoJS.pad.Pkcs7}).toString(CryptoJS.enc.Utf8);
    },
    /*snsoftx.vlive.didi.DiDiLiveService.onAjaxPrepareVideo*/
    onAjaxPrepareVideo:function(s)
    {
        this.onPrepareVideo(Xjs.JSON.parse(this.aesDecode(s)));
    },
    /*snsoftx.vlive.didi.DiDiLiveService.onAjaxPrepareVideoFail*/
    onAjaxPrepareVideoFail:function(err)
    {
        this.msgListener.onMessage("getvideo-fail","获取视频",err.getMessage());
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
            this.msgListener.onMessage("getvideo-fail","获取视频","未获取到视频地址");
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
            case "nameCardNews":
                return;
            case "chargeTimeRoom":
                return;
            case "changeRoomNotice":
            case "sysmsg.alert":
            case "sysmsg":
                this.msgListener.onMessage("",m.title,m.content);
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
            var k = "DiDiLive" + (j == 0 ? "" : "" + j),
                userId = window.localStorage[k + ".user_id"];
            if(!userId)
                continue;
            var signinDate = window.localStorage[k + ".signinDate"];
            if(signinDate == ymd0)
            {
                window.console.log("已签到： %s ",userId);
                continue;
            }
            var settings = this.getSettings(k);
            if(!settings.authToken)
            {
                continue;
            }
            window.console.log("签到： %s : %s ",userId,settings.authToken);
            var header = {};
            header.Authorization = "Bearer " + settings.authToken;
            header["User-Agent"] = "Mozilla/5.0 (Linux; Android 9; AOSP on IA Emulator Build/PSR1.180720.117; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.100 Mobile Safari/537.36";
            var onSuccess = new Xjs.FuncCall(this.onAjaxSigninSuccess,this,[settings],2),
                onError = new Xjs.FuncCall(this.onAjaxSigninFail,this,[settings],2);
            this.ajaxPOST("http://localhost:8000/snsoft/uiinvoke/st-snsoft.commons.net.HttpClient.httpRequest",null,null,[{url:"https://" + settings.serverHost + "/home/user/sign_in?uid=" + userId + "&ver=" + snsoftx.vlive.didi.DiDiLiveService.AppVersion + "&lob=1",header:header,options:0x81}],onSuccess,onError,0);
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
    LocalSettingItems:[{name:"settingTitle"},{name:"device_id"},{name:"user_id"},{name:"user_name"},{name:"serverHost",defaultValue:"api.oidhfjg.com"},{name:"authToken",height:50},{name:"liveButter2",height:50},{name:"options",width:50}]
});
