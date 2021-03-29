Xjs.loadedXjs.push("vlive/VLive");
/*snsoftx/vlive/VLive.java*/
Xjs.namespace("snsoftx.vlive");
snsoftx.vlive.VLive=function(service){
    this.service = service;
    service.msgListener = this;
};
Xjs.apply(snsoftx.vlive.VLive.prototype,{
    /*snsoftx.vlive.VLive.loadFavorited*/
    loadFavorited:function(reload)
    {
        if(!this.favoritedIds || reload)
        {
            var s = window.localStorage["VLive.Favorited"];
            if(!s || (s = s.toString()).length == 0)
                this.favoritedIds = [];
            else 
            {
                var a = s.toString().split(",");
                this.favoritedIds = new Array(a.length);
                for(var i=0;i < a.length;i++)
                    this.favoritedIds[i] = Number.obj2int(a[i],0);
            }
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
        window.localStorage["VLive.Favorited"] = this.favoritedIds.join(",");
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
    }
});
/*snsoftx/vlive/VLiveService.java*/
snsoftx.vlive.VLiveService=function(){};
Xjs.apply(snsoftx.vlive.VLiveService.prototype,{
    /*snsoftx.vlive.VLiveService.ajaxInvoke*/
    ajaxInvoke:function(method,url,header,params,onSuccess,onError,opts)
    {
        var contentType = null,
            postBody = null,
            queryParams = null;
        if(params)
        {
            if(method == "post")
            {
                postBody = Xjs.JSON.encode(params,null,1);
                contentType = "application/json;charset=utf-8";
            } else 
            {
                queryParams = Xjs.urlEncode(params);
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
        this.ajaxInvoke("GET",url,header,params,onSuccess,onError,opts);
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
    }
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
    this.service.setRoomInfo(this.roomId,this.userId);
    this.requestVideoURL();
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
            if(this.msgPane)
                this.msgPane.clear();
            this.service.enterRoom();
        }
    },
    /*snsoftx.vlive.VLiveRoom.requestVideoURL*/
    requestVideoURL:function()
    {
        this.service.requestVideoURL();
    },
    /*snsoftx.vlive.VLiveRoom.updateEnterBtnLabel*/
    updateEnterBtnLabel:function()
    {
        if(this.enterRootBtnDOM)
        {
            this.enterRootBtnDOM.disabled = false;
            Xjs.DOM.setTextContent(this.enterRootBtnDOM,this.roomEntered ? "退 出" : "进 入");
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
            this.playVideo(message);
            return;
        case "win-title":
            document.title = message;
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
    var refresOptsPaneDOM = Xjs.DOM.findById("RefresOptsPane",null),
        a = service.getRefreshRoomsOpts() || [];
    this.refreshOptChks = new Array(a.length);
    var optNms = [];
    for(var j=0;j < a.length;j++)
    {
        this.refreshOptChks[j] = {opts:a[j]};
        var d = this.refreshOptChks[j].checkDOM = Xjs.DOM.createChild(refresOptsPaneDOM,"input"),
            gname = a[j]._name || "RefreshOpts";
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
    this.curTimeTagDom = Xjs.DOM.findById("CurTimeTag",null);
    ;
    this.fn$onRoomItemDblClick = Function.bindAsEventListener(this.onRoomItemDblClick,this);
};
Xjs.extend(snsoftx.vlive.VLiveRoomList,snsoftx.vlive.VLive,{
  _js$className_:"snsoftx.vlive.VLiveRoomList",
    /*snsoftx.vlive.VLiveRoomList.oncmd_refresh*/
    oncmd_refresh:function()
    {
        this.refreshRooms(true);
    },
    /*snsoftx.vlive.VLiveRoomList.refreshRooms*/
    refreshRooms:function(refresh)
    {
        this.refreshBtnDOM.disabled = true;
        Xjs.DOM.removeAllChild(this.roomListDOM);
        if(this.curTimeTagDom)
            Xjs.DOM.setTextContent(this.curTimeTagDom,"正在刷新...");
        var opts = {};
        for(var j=0;j < this.refreshOptChks.length;j++)
        {
            if(this.refreshOptChks[j].checkDOM.checked)
            {
                var o = this.refreshOptChks[j].opts;
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
        this.service.refreshRooms(opts);
    },
    /*snsoftx.vlive.VLiveRoomList.onRoomsLoaded*/
    onRoomsLoaded:function(rooms)
    {
        this.rooms = rooms;
        this.refreshBtnDOM.disabled = false;
        this.renderRooms(0);
        if(this.curTimeTagDom)
        {
            var d = rooms && rooms.refreshTime > 0 ? new Date(rooms.refreshTime) : new Date();
            Xjs.DOM.setTextContent(this.curTimeTagDom,d.format());
        }
    },
    /*snsoftx.vlive.VLiveRoomList.onRoomsLoadFail*/
    onRoomsLoadFail:function(ex)
    {
        alert(ex.message);
        if(this.curTimeTagDom)
            Xjs.DOM.setTextContent(this.curTimeTagDom,"刷新错误:" + ex.message);
        this.refreshBtnDOM.disabled = false;
    },
    /*snsoftx.vlive.VLiveRoomList.renderRooms*/
    renderRooms:function(opts)
    {
        var rooms = this.rooms ? this.rooms.rooms : null,
            n = rooms ? rooms.length : 0;
        Xjs.DOM.removeAllChild(this.roomListDOM);
        var renderLogo = this.renderLogoChkDOM ? this.renderLogoChkDOM.checked : true;
        Xjs.DOM.addOrRemoveClass(this.roomListDOM,"ui-render-userlogo",renderLogo);
        Xjs.DOM.addOrRemoveClass(this.roomListDOM,"ui-no-userlogo",!renderLogo);
        for(var i=0;i < n;i++)
        {
            var r = rooms[i];
            r.dom = this.roomItemDOM.cloneNode(true);
            r.dom.id = "Room_" + r.roomId;
            r.logoDom = Xjs.DOM.findById("LogoImage",r.dom);
            r.titleDom = Xjs.DOM.findById("Title",r.dom);
            r.idxDOM = Xjs.DOM.findById("RoomIdx",r.dom);
            r.userDom = Xjs.DOM.findById("User",r.dom);
            r.limitDOM = Xjs.DOM.findById("Limit",r.dom);
            Xjs.DOM.setTextContent(r.titleDom,r.title);
            Xjs.DOM.setTextContent(r.userDom,r.userName);
            Xjs.DOM.setTextContent(r.idxDOM,i + ":" + r.userId);
            Xjs.DOM.setTextContent(r.limitDOM,r.limit);
            Xjs.DOM.addOrRemoveClass(r.dom,"live-showing",r.limit != null);
            if(renderLogo && r.logoDom && r.logoUrl)
            {
                r.logoDom.src = r.logoUrl;
            }
            this.roomListDOM.appendChild(r.dom);
            r.dom.ondblclick = this.fn$onRoomItemDblClick;
        }
    },
    /*snsoftx.vlive.VLiveRoomList.getRoomById*/
    getRoomById:function(rid)
    {
        var rooms = this.rooms ? this.rooms.rooms : null,
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
    var settings = this.getLocalSettings();
    for(var j=0;j < settings.items.length;j++)
    {
        var i = settings.items[j];
        this[i.name] = settings.getItemValue(i.name);
    }
    if(this.serverHost == null)
    {
        this.serverHost = "api.oidhfjg.com";
    }
    this.serverURL = "https://" + this.serverHost + "/OpenAPI/v1/";
    this.websocketURL = "wss://" + this.serverHost + ":443";
};
Xjs.extend(snsoftx.vlive.didi.DiDiLiveService,snsoftx.vlive.VLiveService,{
  _js$className_:"snsoftx.vlive.didi.DiDiLiveService",
    staticURL:"https://static.oidhfjg.com",
    /*snsoftx.vlive.didi.DiDiLiveService.getLocalSettings*/
    getLocalSettings:function()
    {
        return new snsoftx.tools.LocalSettings$Settings("DiDiLive.",[{name:"device_id"},{name:"user_id"},{name:"user_name"},{name:"serverHost",defaultValue:"api.oidhfjg.com"},{name:"authToken",height:50},{name:"liveButter2",height:50}]);
    },
    /*snsoftx.vlive.didi.DiDiLiveService.httpGet*/
    httpGet:function(path,params,onSuccess,onError,opts)
    {
        var header = {};
        if(this.authToken && !(opts & 1))
            header.Authorization = "Bearer " + this.authToken;
        if(opts & 2)
        {
            header["X-Live-Butter2"] = this.liveButter2;
        }
        this.ajaxGET(this.serverURL + path,header,params,onSuccess,onError,opts & 4 ? 1 : 0);
    },
    /*snsoftx.vlive.didi.DiDiLiveService.onAjaxRoomsLoaded*/
    onAjaxRoomsLoaded:function(o)
    {
        if(o.code != 0)
        {
            this.msgListener.onRoomsLoadFail(new Error(o.code + ":" + o.msg));
            return;
        }
        var data = o.data,
            list = data.list,
            rooms = {};
        rooms.refreshTime = (new Date()).getTime();
        rooms.rooms = new Array(list == null ? 0 : list.length);
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
        return [{type:"hot",_title:"热门"},{type:"hot",page:2,_title:"热门2"},{type:"latest",_title:"最新"},{type:"nearby",_title:"附近"},{type:"vegan",_title:"vegan"},{type:"vip",_title:"收费"},{type:"lounge",_title:"lounge"}];
    },
    /*snsoftx.vlive.didi.DiDiLiveService.refreshRooms*/
    refreshRooms:function(opts)
    {
        if(!opts)
            opts = {};
        var type = opts.type || "hot",
            params = {page:opts.page || 1,size:50,order:"time"};
        this.httpGet("anchor/" + type,params,new Xjs.FuncCall(this.onAjaxRoomsLoaded,this),new Xjs.FuncCall(this.msgListener.onRoomsLoadFail,this.msgListener),2);
    },
    /*snsoftx.vlive.didi.DiDiLiveService.getWebsocketURL*/
    getWebsocketURL:function()
    {
        return this.websocketURL + "/ws?jwt_token=" + this.authToken + "&ver=1.9.8.2";
    },
    /*snsoftx.vlive.didi.DiDiLiveService.enterRoom*/
    enterRoom:function()
    {
        if(this.getUserProfile(this.userId) == null)
        {
            this.prepareUserProfile();
        }
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
        var md5Key = CryptoJS.MD5(this.authToken),
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
    /*snsoftx.vlive.didi.DiDiLiveService.onPrepareVideo*/
    onPrepareVideo:function(o)
    {
        if(o.code != 0)
        {
            this.msgListener.onMessage("err","获取视频",o.code + ":" + o.msg);
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
            this.msgListener.onMessage("err","获取视频","未获取到视频地址");
        }
    },
    /*snsoftx.vlive.didi.DiDiLiveService.prepareVideo*/
    prepareVideo:function()
    {
        var params = {uid:this.userId};
        this.httpGet("private/getPrivateLimit",params,new Xjs.FuncCall(this.onAjaxPrepareVideo,this),null,2 | 4);
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
        if(this.pendingNotifyLoginOkUID && this.pendingNotifyLoginOkUID.indexOf(data.id) >= 0)
        {
            this.notifyLoginOk();
        }
    },
    /*snsoftx.vlive.didi.DiDiLiveService.getUserProfile*/
    getUserProfile:function(id)
    {
        return this.userProfiles ? this.userProfiles[id] : null;
    },
    /*snsoftx.vlive.didi.DiDiLiveService.notifyLoginOk*/
    notifyLoginOk:function()
    {
        var data = this.getUserProfile(this.userId);
        if(!data)
        {
            if(!this.pendingNotifyLoginOkUID)
            {
                this.pendingNotifyLoginOkUID = [];
            }
            if(this.pendingNotifyLoginOkUID.indexOf(data.id) < 0)
            {
                this.pendingNotifyLoginOkUID.push(this.userId);
            }
            return;
        }
        this.msgListener.onMessage("login","登录","登入 RoomId=" + this.roomId + ",User " + this.userId + ":" + data.nickname + "," + data.province);
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
        this.sendWebSocketMessage({device_id:this.device_id,issued:"lite",lob:1,_method_:"BindUid",plat:"android",rid:1,jwt_token:this.authToken,user_id:this.user_id,ver:"1.9.8.2"});
        this.sendWebSocketMessage({avatartime:"0",device_id:this.device_id,levelid:"1",_method_:"login",prompt_time:0,rollmsg_time:0,room_id:this.roomId,jwt_token:this.authToken,user_id:this.user_id,user_name:this.user_name});
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
                this.notifyLoginOk();
                return;
            case "onLineClient":
                return;
            case "legend_hall_win":
                return;
            case "sendGiftNews":
                this.msgListener.onMessage("sys",m.title,m.fromUserDesc + m.fromUserName + "=>" + m.toUserName + " : " + m.giftName);
                return;
            case "sendGift":
                this.msgListener.onMessage("sys",m.from_client_name + "的礼物",m.giftName);
                return;
            case "SendPubMsg":
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
    }
});
