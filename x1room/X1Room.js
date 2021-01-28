Xjs.loadedXjs.push("x1room/X1Room");
/*snsoftx/x1room/X1Room.java*/
Xjs.namespace("snsoftx.x1room");
snsoftx.x1room.X1Room=function(){
    this.roomListDOM = Xjs.DOM.findById("RoomList",null);
    this.roomItemDOM = Xjs.DOM.findById("RoomItem",null);
    this.msgPane = new Xjs.ui.MessagePane({dom:Xjs.DOM.findById("MessagePane",null),autoScroll:false});
    var e = Xjs.DOM.findById("MessagePane2",null);
    this.msgPane2 = e ? new Xjs.ui.MessagePane({dom:e,autoScroll:false}) : null;
    e = Xjs.DOM.findById("MessagePane3",null);
    this.msgPane3 = e ? new Xjs.ui.MessagePane({dom:e,autoScroll:false}) : null;
    Xjs.DOM.remove(this.roomItemDOM);
    this.refreshBtnDOM = Xjs.DOM.findById("RefreshBtn",null);
    this.enterRootBtnDOM = Xjs.DOM.findById("EnterRoomBtn",null);
    this.clearMsgBtnDOM = Xjs.DOM.findById("ClearMsgBtn",null);
    this.infoRegionDom = Xjs.DOM.findById("InfoRegion",null);
    this.curTimeTagDom = Xjs.DOM.findById("CurTimeTag",null);
    ;
    this.chkOnline = Xjs.DOM.findById("ChkOnlineBtn",null);
    this.chkFavorited = Xjs.DOM.findById("ChkFavoritedBtn",null);
    this.chkServerSite2 = Xjs.DOM.findById("ChkServerSite2Btn",null);
    this.filterTextInput = Xjs.DOM.findById("FilterText",null);
    this.favoriteRoomBtnDOM = Xjs.DOM.findById("FavoriteRoomBtn",null);
    this.msgPaneSel1 = Xjs.DOM.findById("MessagePaneSel1",null);
    this.msgPaneSel2 = Xjs.DOM.findById("MessagePaneSel2",null);
    this.msgPaneSel3 = Xjs.DOM.findById("MessagePaneSel3",null);
    this.lbMsgPaneSel2 = Xjs.DOM.findById("lb_MessagePaneSel2",null);
    this.chkHideSysMessage = Xjs.DOM.findById("ChkHideSysMessage",null);
    this.testBtnDOM = Xjs.DOM.findById("TestBtn",null);
    this.roomInfoDom = Xjs.DOM.findById("RoomInfo",null);
    this.anchor1 = Xjs.DOM.findById("Anchor1",null);
    this.anchor2 = Xjs.DOM.findById("Anchor2",null);
    if(this.refreshBtnDOM)
    {
        this.refreshBtnDOM.onclick = Function.bindAsEventListener(this.oncmd_refresh,this,0,true);
    }
    if(this.testBtnDOM)
        this.testBtnDOM.onclick = Function.bindAsEventListener(this.oncmd_test,this);
    if(this.enterRootBtnDOM)
        this.enterRootBtnDOM.onclick = Function.bindAsEventListener(this.enterOrExitRoom,this);
    if(this.clearMsgBtnDOM)
        this.clearMsgBtnDOM.onclick = Function.bindAsEventListener(this.oncmd_clearmsg,this);
    if(this.chkServerSite2)
        this.chkServerSite2.onclick = Function.bindAsEventListener(this.oncmd_serverside2,this);
    if(this.chkHideSysMessage)
    {
        this.chkHideSysMessage.onclick = Function.bindAsEventListener(this.oncmd_hidesysmessage,this);
        this.oncmd_hidesysmessage();
    }
    this.fn$onRoomItemDblClick = Function.bindAsEventListener(this.onRoomItemDblClick,this);
    this.roomid = Number.obj2int(Xjs.getReqParameter("rid"),0);
    if(this.roomid > 0)
    {
        this.videoElement = document.getElementById("video-player");
        this.serverSite = Number.obj2int(Xjs.getReqParameter("site"),1);
        if(!window.flvjs)
        {
            this.videoPlayer = window.videojs(this.videoElement,{swf:Xjs.ROOTPATH + "jslib/videojs-swf/5.4.1/video-js.swf"},this.onFlashVideoPlayReady.createDelegate(this));
        }
        window.onresize = Function.bindAsEventListener(this.onWindowResized,this);
        if(this.favoriteRoomBtnDOM)
        {
            this.favoriteRoomBtnDOM.onclick = Function.bindAsEventListener(this.oncmd_setFavoroted,this);
            this.updateSetFavoritedBtnText();
        }
        if(this.msgPaneSel1)
        {
            var f = Function.bindAsEventListener(this.onMsgPaneSelChanged,this);
            this.msgPaneSel1.onchange = f;
            this.msgPaneSel2.onchange = f;
            this.msgPaneSel3.onchange = f;
        }
        window.onbeforeunload = Function.bindAsEventListener(this.onWinClosing,this);
        this.initRoom();
    } else 
    {
        this.videoElement = null;
        this.websocket = null;
        this.room = null;
        this.oncmd_refresh();
        var fnOnChnaged = Function.bindAsEventListener(this.onFilterChanged,this);
        this.chkOnline.onchange = fnOnChnaged;
        this.chkFavorited.onchange = fnOnChnaged;
        this.filterTextInput.oninput = fnOnChnaged;
        this.filterTextInput.onchange = fnOnChnaged;
    }
};
Xjs.apply(snsoftx.x1room.X1Room.prototype,{
    serverSite:1,
    totalGuests:0,
    /*snsoftx.x1room.X1Room.initRoom*/
    initRoom:Xjs.emptyFn,
    /*snsoftx.x1room.X1Room.onRoomLoaded*/
    onRoomLoaded:function(r)
    {
        this.room = r;
        if(this.room)
            document.title = this.getRoomField(this.room,0) + "的直播间";
        this.updateAnchorDOM();
        this.openWebSocket();
        this.resetDOMPos();
        this.updateUserInfoDOM();
    },
    /*snsoftx.x1room.X1Room.getRoomField*/
    getRoomField:function(r,field)
    {
        switch(field)
        {
        case 1:
            return r.rid + ":" + (r.nickname || r.username);
        case 2:
            return r.uid;
        case 3:
            return r.lv_exp;
        case 4:
            return r.initURL;
        case 5:
            return r.live_status;
        case 6:
            return r.rid;
        case 7:
            return r.live_time;
        case 8:
            return r.one_to_many_status;
        case 9:
            return r.logoImgUrl;
        case 10:
            return r.nickname;
        case 11:
            return r.room_info;
        case 0:
            return r.nickname || r.username;
        }
        throw new Error("field=" + field);
    },
    /*snsoftx.x1room.X1Room.getWebsocketURL*/
    getWebsocketURL:Xjs.emptyFn,
    /*snsoftx.x1room.X1Room.disableEnterRoomBtn*/
    disableEnterRoomBtn:function()
    {
        if(this.enterRootBtnDOM)
        {
            this.enterRootBtnDOM.disabled = true;
            Xjs.DOM.setTextContent(this.enterRootBtnDOM,"连接..");
        }
    },
    /*snsoftx.x1room.X1Room.openWebSocket*/
    openWebSocket:function()
    {
        this.disableEnterRoomBtn();
        if(this.websocket)
        {
            try
            {
                this.websocket.close();
            }catch(ex)
            {
            }
            this.websocket = null;
        }
        var url = this.getWebsocketURL();
        if(url == null)
        {
            this.updateEnterBtnLabel();
            this.infoMsg(null,"未获取到WebSocket地址");
            return;
        }
        this.websocket = new WebSocket(url);
        this.websocket.onopen = this.onWebSocketOpen.createDelegate(this);
        this.websocket.onclose = this.onWebSocketClose.createDelegate(this);
        this.websocket.onmessage = this.onWebSocketMessage.createDelegate(this);
        this.websocket.onerror = this.onWebSocketError.createDelegate(this);
    },
    /*snsoftx.x1room.X1Room.onWebSocketOpen*/
    onWebSocketOpen:function(ev)
    {
        this.infoMsg("WebSocket","打开成功");
        this.updateEnterBtnLabel();
    },
    /*snsoftx.x1room.X1Room.onWebSocketClose*/
    onWebSocketClose:function(ev)
    {
        this.infoMsg("WebSocket","关闭");
        this.updateEnterBtnLabel();
    },
    /*snsoftx.x1room.X1Room.updateEnterBtnLabel*/
    updateEnterBtnLabel:function()
    {
        if(this.enterRootBtnDOM)
        {
            var opened = this.websocket && this.websocket.readyState == 1;
            this.enterRootBtnDOM.disabled = false;
            Xjs.DOM.setTextContent(this.enterRootBtnDOM,opened ? "退 出" : "进 入");
        }
    },
    /*snsoftx.x1room.X1Room.onWebSocketMessage*/
    onWebSocketMessage:Xjs.emptyFn,
    /*snsoftx.x1room.X1Room.info*/
    info:function(cmd,title,message,type)
    {
        var cls = null;
        if(cmd == 30001)
        {
            if(type == 9)
            {
                cls = "item-flymsg";
            } else if(type > 0 || title == "[系统消息]")
            {
                cls = "item-sysmsg";
            }
        }
        this.infoMsg(title,message,cls);
    },
    /*snsoftx.x1room.X1Room.infoMsg*/
    infoMsg:function(title,message,cls)
    {
        if(title)
        {
            this.msgPane.addMessage("【" + title + "】",cls || "item-title",1);
        }
        if(message)
            for(;;)
            {
                var p1 = message.indexOf("{/");
                if(p1 < 0)
                    break;
                var p2 = message.indexOf("}",p1);
                if(p2 < 0)
                    break;
                if(p1 > 0)
                    this.msgPane.addMessage(message.substring(0,p1),cls,1);
                var img = Xjs.DOM.createChild(this.msgPane.dom,"img");
                img.src = "icons/a" + message.substring(p1 + 2,p2) + ".png";
                img.width = 24;
                img.height = 24;
                message = message.substring(p2 + 1);
            }
        this.msgPane.addMessage(message,cls,2);
    },
    /*snsoftx.x1room.X1Room.showViwers*/
    showViwers:function()
    {
        this.msgPane2.clear();
        var s = "在线观众 " + (this.guests == null ? 0 : this.guests.length) + "/" + this.totalGuests + "人:";
        if(this.lbMsgPaneSel2)
        {
            Xjs.DOM.setTextContent(this.lbMsgPaneSel2,s);
        }
        this.msgPane2.addMessage(s);
        if(this.guests)
        {
            this.guests.sort(Array.createDescCmp(Array.createCmp2(["richLv"])));
            for(var i=0;i < this.guests.length;i++)
            {
                this.msgPane2.addMessage("  " + snsoftx.x1room.X1Room.user2String(this.guests[i]));
            }
        }
    },
    /*snsoftx.x1room.X1Room.showOtherMsgs*/
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
    /*snsoftx.x1room.X1Room.onClickCopy*/
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
    /*snsoftx.x1room.X1Room.onUpdateGuests*/
    onUpdateGuests:function(m)
    {
        this.totalGuests = m.total || 0;
        this.guests = m.items;
        this.showViwers();
    },
    /*snsoftx.x1room.X1Room.onGuestEnter*/
    onGuestEnter:function(u)
    {
        this.totalGuests = u.total;
        if(u.ruled == -1)
            return;
        addGuests:{
            if(!this.guests)
                this.guests = [];
            for(var i=0;i < this.guests.length;i++)
            {
                if(u.uid == this.guests[i].uid)
                    break addGuests;
            }
            delete u.total;
            delete u.guests;
            this.guests.push(u);
        }
        this.showViwers();
    },
    /*snsoftx.x1room.X1Room.onGuestExit*/
    onGuestExit:function(m)
    {
        this.totalGuests = m.total;
        if(this.guests)
            for(var i=0;i < this.guests.length;i++)
            {
                if(m.uid == this.guests[i].uid)
                {
                    this.guests.splice(i,1);
                    break;
                }
            }
        this.showViwers();
    },
    /*snsoftx.x1room.X1Room.onWebSocketError*/
    onWebSocketError:function(ev)
    {
        this.infoMsg("WebSocket","错误:" + ev.data);
    },
    /*snsoftx.x1room.X1Room.onFlashVideoPlayReady*/
    onFlashVideoPlayReady:function()
    {
        this.videoPlayer.on("play",this.onVideoPlay.createDelegate(this));
        this.videoPlayer.on("resize",this.onVideoResize.createDelegate(this));
        window.console.log("videoPlayer.src = " + this.videoPlayer.src());
        if(this.videoPlayer.src() != null)
            this.videoPlayer.play();
        window.console.log("onFlashVideoPlayReady: videoSize = " + this.getVideoWidth() + "X" + this.getVideoHeight());
    },
    /*snsoftx.x1room.X1Room.onVideoPlay*/
    onVideoPlay:function()
    {
        window.console.log("onVideoPlay: videoSize = " + this.getVideoWidth() + "X" + this.getVideoHeight());
        this.resetDOMPos();
        for(var i=1;i <= 10;i++)
        {
            this.resetDomPosLatter(i * 100);
        }
    },
    /*snsoftx.x1room.X1Room.resetDomPosLatter*/
    resetDomPosLatter:function(t)
    {
        if(!this.fn$resetDOMPos)
            this.fn$resetDOMPos = this.resetDOMPos.createDelegate(this);
        setTimeout(this.fn$resetDOMPos,t);
    },
    /*snsoftx.x1room.X1Room.onVideoResize*/
    onVideoResize:function()
    {
        window.console.log("onVideoResize: videoSize = " + this.getVideoWidth() + "X" + this.getVideoHeight());
        this.resetDOMPos();
    },
    /*snsoftx.x1room.X1Room.playVideo*/
    playVideo:function(url)
    {
        if(window.flvjs && url && url.startsWith("rtmp://"))
        {
            url = "http" + url.substring(4) + ".flv";
        }
        this.playingUrl = url;
        this.startPlayDate = new Date();
        this.infoMsg(null,this.startPlayDate.format());
        this.infoMsg("播放视频",url);
        this.infoMsg(null," ");
        if(window.flvjs)
        {
            if(this.flvPlayer)
            {
                this.flvPlayer.unload();
                this.flvPlayer.detachMediaElement();
                this.flvPlayer.destroy();
                this.flvPlayer = null;
            }
            this.flvPlayer = window.flvjs.createPlayer({type:"flv",url:url});
            this.videoElement.onloadedmetadata = Function.bindAsEventListener(this.onLoadedMetaData,this);
            this.flvPlayer.attachMediaElement(this.videoElement);
            this.flvPlayer.load();
        } else 
        {
            var v = this.videoPlayer;
            v.pause();
            v.src(url);
            v.play();
            setTimeout(function(){
            v.play();
        },1000);
        }
        this.updateUserInfoDOM();
        this.showOtherMsgs();
    },
    /*snsoftx.x1room.X1Room.onLoadedMetaData*/
    onLoadedMetaData:function()
    {
        window.console.log("onLoadedMetaData: videoSize = " + this.getVideoWidth() + "X" + this.getVideoHeight());
        this.resetDOMPos();
        var ve = this.videoElement,
            p = ve.play();
        if(p)
            p.then(function(){
        }).catch(function(ex){
            window.console.log("播放失败:" + ex);
            if(ex.stack)
                window.console.log(ex.stack);
        });
    },
    /*snsoftx.x1room.X1Room.getVideoWidth*/
    getVideoWidth:function()
    {
        if(this.videoPlayer)
            return this.videoPlayer.videoWidth();
        return this.videoElement.videoWidth;
    },
    /*snsoftx.x1room.X1Room.getVideoHeight*/
    getVideoHeight:function()
    {
        if(this.videoPlayer)
            return this.videoPlayer.videoHeight();
        return this.videoElement.videoHeight;
    },
    /*snsoftx.x1room.X1Room.resetDOMPos*/
    resetDOMPos:function()
    {
        if(this.msgPane)
        {
            var r = this.msgPane.dom.previousElementSibling.getBoundingClientRect();
            this.msgPane.dom.style.top = r.bottom + 10 + "px";
            if(this.msgPane2)
                this.msgPane2.dom.style.top = r.bottom + 10 + "px";
            if(this.msgPane3)
                this.msgPane3.dom.style.top = r.bottom + 10 + "px";
        }
        var videoHeight = this.getVideoHeight(),
            viewH = Xjs.DOM.getViewportHeight();
        if(this.lastVideoHeight == videoHeight && this.lastViewH == viewH)
            return;
        var videoWidth = this.getVideoWidth(),
            w = videoWidth,
            h = videoHeight;
        if(h <= 0 || w <= 0)
        {
            w = 300;
            h = 150;
        }
        var maxH = viewH - 40;
        if(maxH < 150)
            maxH = 150;
        if(h > maxH)
        {
            w = maxH * w / h;
            h = maxH;
        }
        if(!this.videoPlayer)
        {
            this.videoElement.style.width = w + "px";
            this.videoElement.style.height = h + "px";
        }
        if(this.videoPlayer)
            this.videoPlayer.height(h);
        this.lastVideoHeight = this.getVideoHeight();
        this.lastViewH = viewH;
        if(this.infoRegionDom)
            this.infoRegionDom.style.left = w + 10 + "px";
    },
    /*snsoftx.x1room.X1Room.updateUserInfoDOM*/
    updateUserInfoDOM:function()
    {
        var text = this.getRoomField(this.room,1) + "(" + this.getRoomField(this.room,3) + ")";
        Xjs.DOM.setTextContent(this.roomInfoDom,text);
    },
    /*snsoftx.x1room.X1Room.updateAnchorDOM*/
    updateAnchorDOM:function()
    {
        var initUrl = this.room ? this.getRoomField(this.room,4) : null;
        if(this.anchor1 && initUrl)
        {
            if(initUrl.endsWith("/"))
                initUrl = initUrl.substring(0,initUrl.length - 1);
            var s = initUrl + "/room/" + this.roomid;
            Xjs.DOM.setTextContent(this.anchor1,s);
            this.anchor1.href = s;
        }
    },
    /*snsoftx.x1room.X1Room.onWindowResized*/
    onWindowResized:function()
    {
        this.resetDOMPos();
    },
    /*snsoftx.x1room.X1Room.oncmd_refresh*/
    oncmd_refresh:function()
    {
        this.refreshRooms(true);
    },
    /*snsoftx.x1room.X1Room.oncmd_serverside2*/
    oncmd_serverside2:function()
    {
        this.refreshRooms(false);
    },
    /*snsoftx.x1room.X1Room.refreshRooms*/
    refreshRooms:function(refresh)
    {
        if(this.refreshBtnDOM)
        {
            this.refreshBtnDOM.disabled = true;
        }
        if(this.msgPane)
            this.msgPane.clear();
        Xjs.DOM.removeAllChild(this.roomListDOM);
        if(this.chkServerSite2)
        {
            this.serverSite = this.chkServerSite2.checked ? 2 : 1;
        }
        if(this.curTimeTagDom)
            Xjs.DOM.setTextContent(this.curTimeTagDom,"正在刷新...");
        setTimeout(this._doRefresh.createDelegate(this,[refresh],true),1);
    },
    /*snsoftx.x1room.X1Room.onRoomListLoaded*/
    onRoomListLoaded:function(roomList)
    {
        this.roomList = roomList;
        if(this.refreshBtnDOM)
        {
            this.refreshBtnDOM.disabled = false;
        }
        this.renderRooms(0);
        if(this.curTimeTagDom)
        {
            var d = roomList && roomList.refreshTime > 0 ? new Date(roomList.refreshTime) : new Date();
            Xjs.DOM.setTextContent(this.curTimeTagDom,d.format());
        }
    },
    /*snsoftx.x1room.X1Room._doRefresh*/
    _doRefresh:function(refresh)
    {
        try
        {
            this.loadRooms(this.serverSite,refresh);
        }catch(ex)
        {
            if(this.curTimeTagDom)
                Xjs.DOM.setTextContent(this.curTimeTagDom,"错误:" + ex);
        }
    },
    /*snsoftx.x1room.X1Room.onFilterChanged*/
    onFilterChanged:function()
    {
        this.renderRooms(1);
    },
    /*snsoftx.x1room.X1Room.enterOrExitRoom*/
    enterOrExitRoom:function()
    {
        if(!this.websocket || this.websocket.readyState >= 2)
        {
            this.msgPane.clear();
            this.initRoom();
        } else 
        {
            this.websocket.close();
        }
    },
    /*snsoftx.x1room.X1Room.oncmd_clearmsg*/
    oncmd_clearmsg:function()
    {
        if(this.msgPane)
            this.msgPane.clear();
    },
    /*snsoftx.x1room.X1Room.oncmd_setFavoroted*/
    oncmd_setFavoroted:function()
    {
        if(this.roomid == 0)
            return;
        this.setFavorited(this.roomid,!this.isFavorited(this.roomid));
    },
    /*snsoftx.x1room.X1Room.oncmd_hidesysmessage*/
    oncmd_hidesysmessage:function()
    {
        var hide = this.chkHideSysMessage ? this.chkHideSysMessage.checked : false;
        Xjs.DOM.addOrRemoveClass(this.msgPane.dom,"hide-sysmsg",hide);
    },
    /*snsoftx.x1room.X1Room.updateSetFavoritedBtnText*/
    updateSetFavoritedBtnText:function()
    {
        if(this.favoriteRoomBtnDOM)
            Xjs.DOM.setTextContent(this.favoriteRoomBtnDOM,this.isFavorited(this.roomid) ? "取消收藏" : "收藏");
    },
    /*snsoftx.x1room.X1Room.oncmd_test*/
    oncmd_test:Xjs.emptyFn,
    /*snsoftx.x1room.X1Room.onRoomItemDblClick*/
    onRoomItemDblClick:function(e)
    {
        var d = e.srcElement || e.target;
        for(;d && d != this.roomListDOM && (!d.id || !d.id.startsWith("Room_"));d = d.parentNode)
            ;
        if(d.id && d.id.startsWith("Room_"))
        {
            var rid = Number.obj2int(d.id.substring(5),0);
            window.open("Room.html#?rid=" + rid + "&site=" + this.serverSite,"_blank");
        }
    },
    /*snsoftx.x1room.X1Room.renderRooms*/
    renderRooms:function(opts)
    {
        var liveOnly = this.chkOnline.checked,
            favorited = this.chkFavorited.checked,
            filterText = this.filterTextInput.value;
        if(filterText != null && (filterText = filterText.trim()).length == 0)
            filterText = null;
        if(opts & 1)
        {
            if(this.liveOnly == liveOnly && this.favorited == favorited && this.filterText == filterText)
            {
                return;
            }
        }
        this.liveOnly = liveOnly;
        this.favorited = favorited;
        this.filterText = filterText;
        this.msgPane.clear();
        Xjs.DOM.removeAllChild(this.roomListDOM);
        if(!this.roomList || !this.roomList.rooms)
            return;
        for(var i=0;i < this.roomList.rooms.length;i++)
        {
            var r = this.roomList.rooms[i];
            if(this.getRoomField(r,5) != 1 && liveOnly)
                continue;
            if(filterText != null && this.getRoomField(r,0).indexOf(filterText) < 0)
                continue;
            var isFavo = this.isFavorited(this.getRoomField(r,6));
            if(this.favorited && !isFavo)
            {
                continue;
            }
            r.dom = this.roomItemDOM.cloneNode(true);
            r.dom.id = "Room_" + this.getRoomField(r,6);
            r.logoDom = Xjs.DOM.findById("LogoImage",r.dom);
            r.titleDom = Xjs.DOM.findById("Title",r.dom);
            r.livetDom = Xjs.DOM.findById("LiveTime",r.dom);
            var roomInfo = this.getRoomField(r,11);
            Xjs.DOM.setTextContent(r.titleDom,this.getRoomField(r,1) + (roomInfo == null ? "" : "(" + roomInfo + ")") + "(" + this.getRoomField(r,3) + ")");
            Xjs.DOM.setTextContent(r.livetDom,this.getRoomField(r,7));
            Xjs.DOM.addOrRemoveClass(r.dom,"live-offline",this.getRoomField(r,5) == 0);
            Xjs.DOM.addOrRemoveClass(r.dom,"live-showing",this.getRoomField(r,8) > 0);
            Xjs.DOM.addOrRemoveClass(r.dom,"live-favorited",isFavo);
            if(r.headimg)
            {
            }
            this.roomListDOM.appendChild(r.dom);
            r.dom.ondblclick = this.fn$onRoomItemDblClick;
        }
    },
    /*snsoftx.x1room.X1Room.loadFavorited*/
    loadFavorited:function(reload)
    {
        if(!this.favoritedIds || reload)
        {
            var s = window.localStorage["X1Room.Favorited"];
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
    /*snsoftx.x1room.X1Room.isFavorited*/
    isFavorited:function(rid)
    {
        this.loadFavorited(false);
        return this.favoritedIds.indexOf(rid) >= 0;
    },
    /*snsoftx.x1room.X1Room.setFavorited*/
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
        window.localStorage["X1Room.Favorited"] = this.favoritedIds.join(",");
        this.updateSetFavoritedBtnText();
    },
    /*snsoftx.x1room.X1Room.getMessagePaneSel*/
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
    /*snsoftx.x1room.X1Room.onMsgPaneSelChanged*/
    onMsgPaneSelChanged:function()
    {
        var s = this.getMessagePaneSel();
        this.msgPane.dom.style.display = s == 0 ? "" : "none";
        this.msgPane2.dom.style.display = s == 1 ? "" : "none";
        this.msgPane3.dom.style.display = s == 2 ? "" : "none";
    },
    /*snsoftx.x1room.X1Room.onWinClosing*/
    onWinClosing:function()
    {
        if(this.websocket && this.websocket.readyState == 1)
        {
            try
            {
                this.websocket.close();
            }catch(ex)
            {
            }
        }
    },
    /*snsoftx.x1room.X1Room.loadRooms*/
    loadRooms:Xjs.emptyFn
});
Xjs.apply(snsoftx.x1room.X1Room,{
    CMD_SOCKET_HEART:9999,
    CMD_CONNECT_SOCKET:10000,
    CMD_IN_ROOM:10001,
    CMD_GET_ROOM_INFO:10002,
    CMD_GET_ROOM_ANNOUNCEMENT:10003,
    CMD_LOGIN_OUT_ROOM:10005,
    CMD_BROADCAST_EXPERIENCE:10008,
    CMD_ACCOUNT_BALANCE:10009,
    CMD_RESTRICTED_ROOM:10011,
    CMD_CHAT_ROOM_LIMIT:10013,
    CMD_LIST_USERS_ROOM:11001,
    CMD_WELCOME_IN_ROOM:11002,
    CMD_ONE_TO_MANY_COUNTDOWN:11011,
    CMD_TODAYS_CONTRIBUTION:15001,
    CMD_PUSH_TODAYS_CONTRIBUTION:15002,
    CMD_TOTAL_CONTRIBUTION:15005,
    CMD_NOW_RANK:10016,
    CMD_ROOM_USER_DATA:10019,
    CMD_ERROR_SOCKET_MESSAGE:15555,
    CMD_GET_RTMP_SID:20001,
    CMD_DROP_MIC:20003,
    CMD_CHAT:30001,
    CMD_SEND_GIFT:40001,
    CMD_LUXURY_GIFT:40005,
    CMD_RTMP_URL_UP:80001,
    CMD_RTMP_URL_DOWN:80002,
    CMD_GAME_CALL_ADD:97001,
    CMD_MANY_PLACE_LOGIN:500,
    CMD_CLOSE_ROOM:501,
    CMD_START_ONE_TO_MANY:504,
    CMD_CLOSE_TOP_LIGHT:10015,
    CMD_LOGOUT:1005,
    CMD_GET_TICKETS_LIST:11009,
    CMD_GET_PLATFORM_USER_SCORE:90002,
    CMD_EXCHANGE_SCORE_FOR_POINTS:90003,
    CMD_CREATE_RED_ENVELOPE_EVENT:100001,
    CMD_SNATCH_RED_ENVELOPE:100002,
    CMD_GET_RED_ENVELOPE_SHOW_ICON:100003,
    CMD_GET_RED_ENVELOPE_LIST:100004,
    CMD_GET_RED_ENVELOPE_SETTING:100005,
    CMD_GET_RED_ENVELOPE_HISTORY:100006,
    CMD_GET_THE_CLOSEST_RED_ENVELOPE_REMAIN_TIME:100007,
    CMD_SHOW_RED_ENVELOPE_EVENT:100008,
    CMD_GET_JUMP_EGG_SETTING:110001,
    CMD_SET_JUMP_EGG_LINKING_STATUS:110002,
    CMD_GET_JUMP_EGG_SCHEDULE:110003,
    CMD_GET_JUMP_EGG_SINGLE_EVENT:110004,
    CMD_GET_JUMP_EGG_LINKING_STATUS:110005,
    CMD_GET_GUARDIAN_SEAT_LIST:120001,
    CMD_GET_GUARDIAN_INFO:120003,
    CMD_SHOW_GUARDIAN_OPEN:120004,
    CMD_KICK:120005,
    CMD_SILENT:120006,
    CMD_GET_FREE_FLY:120007,
    CMD_ERROR_SOCKET_CONTEXT:999999,
    CMD_LOGIN:10001,
    CMD_SOMEONE_ENTER_ROOM:11002,
    CMD_WELCOME:11002,
    CMD_TRANSFER_MESSAGE:30001,
    /*snsoftx.x1room.X1Room.lastTextChildDOM*/
    lastTextChildDOM:function(dom)
    {
        return dom.lastChild.previousElementSibling;
    },
    /*snsoftx.x1room.X1Room.user2String*/
    user2String:function(u)
    {
        return u.uid + ":" + u.name + "*" + u.richLv + (u.ruled == -1 ? "(游客)" : "");
    }
});
/*snsoftx/x1room/X1Room1.java*/
Xjs.RInvoke.beansDef["snsoftx.game.x1room.X1RoomService"]={listRooms:{},getRoom:{},initLoginUser:{},decodeHexFlexMsg:{},getH5RoomData:{},decodeH5Stream:{}};
snsoftx.x1room.X1Room1=function(){
    snsoftx.x1room.X1Room1.superclass.constructor.call(this);
};
Xjs.extend(snsoftx.x1room.X1Room1,snsoftx.x1room.X1Room,{
  _js$className_:"snsoftx.x1room.X1Room1",
    service:Xjs.RInvoke.newBean("snsoftx.game.x1room.X1RoomService"),
    /*snsoftx.x1room.X1Room1.initRoom*/
    initRoom:function()
    {
        this.onRoomLoaded(this.service.getRoom(this.serverSite,this.roomid));
    },
    /*snsoftx.x1room.X1Room1.loadRooms*/
    loadRooms:function(serverSite,refresh)
    {
        this.onRoomListLoaded(this.service.listRooms(serverSite,refresh));
    },
    /*snsoftx.x1room.X1Room1.getWebsocketURL*/
    getWebsocketURL:function()
    {
        var rootUrl = Xjs.ROOTPATH,
            p = rootUrl.indexOf("://"),
            wsurl = "ws" + rootUrl.substring(p) + "websocket",
            loginIdx = this.service.initLoginUser(this.serverSite,this.roomid,wsurl);
        this.info(0,"进入",this.roomid + (loginIdx == 0 ? "" : "." + loginIdx),0);
        var url = wsurl + "/X1RoomUser." + this.roomid + (loginIdx == 0 ? "" : "." + loginIdx) + "@" + this.serverSite + "?opts=" + 0x10000;
        window.console.log("roomid=" + this.roomid + ",loginIdx=" + loginIdx + "; " + url);
        return url;
    },
    /*snsoftx.x1room.X1Room1.onWebSocketMessage*/
    onWebSocketMessage:function(ev)
    {
        var m;
        try
        {
            m = Xjs.JSON.parse(ev.data);
        }catch(ex)
        {
            this.infoMsg("WebSocket","错误:" + ex);
            return;
        }
        if(m.msgtype != null)
            switch(m.msgtype)
            {
            case "PlayVideo":
                this.playVideo(m.message);
                break;
            case "UpdateGuests":
                this.onUpdateGuests(m.message);
                break;
            case "GuestEnter":
                this.onGuestEnter(m.message);
                break;
            case "GuestExit":
                this.onGuestExit(m.message);
                break;
            default:
                {
                    this.info(m.cmd || 0,m.title,m.message,m.type || 0);
                    break;
                }
            }
    }
});
/*snsoftx/x1room/X1Room2.java*/
snsoftx.x1room.X1Room2$H5RoomIV=function(){};
snsoftx.x1room.X1Room2$WSItem=function(){};
snsoftx.x1room.X1Room2$WSMessage=function(){};
snsoftx.x1room.X1Room2=Xjs.extend(snsoftx.x1room.X1Room,{
  _js$className_:"snsoftx.x1room.X1Room2",
    HomeURL:"http://www.vip1room.com/",
    /*snsoftx.x1room.X1Room2.getRoomField*/
    getRoomField:function(r,field)
    {
        if(this.roomid > 0 && r.user)
        {
            var r2 = r;
            switch(field)
            {
            case 0:
                return r2.user.nickname || r2.user.username;
            case 1:
                return r2.user.rid + ":" + (r2.user.nickname || r2.user.username);
            case 3:
                return r2.user.lv_exp;
            case 10:
                return r2.user.nickname;
            }
        }
        return snsoftx.x1room.X1Room2.superclass.getRoomField.call(this,r,field);
    },
    /*snsoftx.x1room.X1Room2.ajaxInvoke*/
    ajaxInvoke:function(method,url,params,onSuccess)
    {
        try
        {
            Xjs.Ajax.invoke(url,null,params,method,16,new Xjs.FuncCall(onSuccess,this),new Xjs.FuncCall(this.onAjaxFail,this));
        }catch(ex)
        {
            alert(ex.message);
        }
    },
    /*snsoftx.x1room.X1Room2.onAjaxFail*/
    onAjaxFail:function(ex)
    {
        alert(ex.message);
    },
    /*snsoftx.x1room.X1Room2.ajaxGET*/
    ajaxGET:function(url,params,onSuccess)
    {
        this.ajaxInvoke("GET",url,params,onSuccess);
    },
    /*snsoftx.x1room.X1Room2.initRoom*/
    initRoom:function()
    {
        this.disableEnterRoomBtn();
        var url = this.HomeURL + "/api/room/" + this.roomid + "/h5";
        this.ajaxGET(url,null,this.onAjaxRoomLoadSuccess);
    },
    /*snsoftx.x1room.X1Room2.onAjaxRoomLoadSuccess*/
    onAjaxRoomLoadSuccess:function(v)
    {
        if(v.status != 1)
        {
            alert(v.msg);
            this.updateEnterBtnLabel();
            return;
        }
        this.h5RoomData = v.data;
        var h5room = v.data.room;
        h5room.initURL = this.HomeURL;
        this.onRoomLoaded(h5room);
        this.startPlayVideo();
        if(v.data.start_time)
        {
            this.infoMsg("?",v.data.start_time + " - " + v.data.end_time);
        }
    },
    /*snsoftx.x1room.X1Room2.startPlayVideo*/
    startPlayVideo:function()
    {
        var riv = this.h5RoomData.h5data,
            base64_iv = riv ? riv.base64_iv : null,
            enc = riv ? riv.base64_encrypted : null;
        if(!enc)
        {
            this.infoMsg(null,"未获取到视频播放地址");
            return;
        }
        var key = CryptoJS.enc.Utf8.parse("29292f7aae467dac83be04761a9d8f38"),
            iv = CryptoJS.enc.Base64.parse(base64_iv),
            stream = JSON.parse(CryptoJS.AES.decrypt(enc,key,{iv:iv,padding:CryptoJS.pad.ZeroPadding}).toString(CryptoJS.enc.Utf8));
        if(stream.hls_addr)
        {
            this.playVideo(stream.hls_addr);
        }
    },
    /*snsoftx.x1room.X1Room2.getWebsocketURL*/
    getWebsocketURL:function()
    {
        var wsItem = this.h5RoomData.ws_list ? this.h5RoomData.ws_list[0] : null;
        return wsItem ? wsItem.url : null;
    },
    /*snsoftx.x1room.X1Room2.sendMessage*/
    sendMessage:function(m)
    {
        var s = Xjs.JSON.encode(m,null,1);
        window.console.log("发送",s);
        this.websocket.send(s);
    },
    /*snsoftx.x1room.X1Room2.onWebSocketOpen*/
    onWebSocketOpen:function(ev)
    {
        snsoftx.x1room.X1Room2.superclass.onWebSocketOpen.call(this,ev);
        this.sendMessage({cmd:10001,public_path:"s1",roomid:Number.obj2int(this.h5RoomData.room.user.rid,0),key:this.h5RoomData.SESSID || "123458",clienttype:1});
        this.sendMessage({cmd:10013});
    },
    /*snsoftx.x1room.X1Room2.processWSMessage*/
    processWSMessage:function(m)
    {
        switch(m.cmd)
        {
        case 5000:
            this.info(m.cmd,null,m.msg,m.type);
            return;
        case 30001:
            {
                switch(m.type)
                {
                case 3:
                    this.info(30001,"系统消息",m.content,m.type);
                    break;
                default:
                    var title = m.sendName == null ? "" : m.sendName;
                    if(m.recName != null && m.recName.length > 0)
                        title += "==>" + m.recName;
                    this.info(30001,title,m.content,m.type);
                }
                return;
            }
        case 10002:
            {
                this.info(10002,m.category,m.name,m.type);
                return;
            }
        case 11001:
            {
                this.onUpdateGuests(m);
                return;
            }
        case 11002:
            {
                this.onGuestEnter(m);
                return;
            }
        case 11003:
            {
                this.onGuestExit(m);
                return;
            }
        case 9999:
            break;
        case 10013:
            break;
        case 10001:
        default:
            return;
        }
    },
    /*snsoftx.x1room.X1Room2.onWebSocketMessage*/
    onWebSocketMessage:function(ev)
    {
        var s = ev.data,
            m = Xjs.JSON.parse(s);
        if(m instanceof Array)
        {
            var a = m;
            for(var j=0;j < a.length;j++)
            {
                this.processWSMessage(a[j]);
            }
        } else 
        {
            this.processWSMessage(m);
        }
    },
    /*snsoftx.x1room.X1Room2.loadRooms*/
    loadRooms:function(serverSite,refresh)
    {
        var params = {type:"all",_t:(new Date()).getTime()},
            url = this.HomeURL + "api/storage/s1/videolistall.json";
        this.ajaxGET(url,params,this.onRoomListLoaded);
    }
});
/*snsoftx/x1room/X1RoomTest.java*/
snsoftx.x1room.X1RoomTest=function(){
    this.msgPane = new Xjs.ui.MessagePane({dom:Xjs.DOM.findById("MessagePane",null),autoScroll:false});
    Xjs.DOM.findById("StartBtn",null).onclick = Function.bindAsEventListener(this.oncmd_start,this);
    Xjs.DOM.findById("StopBtn",null).onclick = Function.bindAsEventListener(this.oncmd_stop,this);
    this.roomidInput = Xjs.DOM.findById("RoomID",null);
    this.service = Xjs.RInvoke.newBean("snsoftx.game.x1room.X1RoomService");
};
Xjs.apply(snsoftx.x1room.X1RoomTest.prototype,{
    serverSite:1,
    /*snsoftx.x1room.X1RoomTest.stop*/
    stop:function()
    {
        if(this.websocket != null)
            try
            {
                this.websocket.close();
            }catch(ex)
            {
                window.console.trace(ex);
            }
        this.websocket = null;
    },
    /*snsoftx.x1room.X1RoomTest.oncmd_start*/
    oncmd_start:function()
    {
        this.msgPane.clear();
        this.msgPane.addMessage("开始测试...");
        this.stop();
        var roomId = Number.obj2int(this.roomidInput.value.trim(),0);
        if(roomId <= 0)
            return;
        this.h5RoomData = this.service.getH5RoomData(this.serverSite,roomId);
        this.msgPane.addMessage(Xjs.JSON.encode(this.h5RoomData));
        var wsItem = this.h5RoomData.ws_list ? this.h5RoomData.ws_list[0] : null;
        this.wsUrl = wsItem ? wsItem.url : null;
        if(!this.wsUrl)
        {
            this.info("WebSocket","未获取到 WS地址");
            this.wsUrl = Xjs.DOM.findById("WSURL",null).value;
            if(!this.wsUrl || (this.wsUrl = this.wsUrl.trim()) == "")
            {
                return;
            }
        }
        this.info("WebSocket","连接 : " + this.wsUrl);
        this.websocket = new WebSocket(this.wsUrl);
        this.websocket.onopen = this.onWebSocketOpen.createDelegate(this);
        this.websocket.onclose = this.onWebSocketClose.createDelegate(this);
        this.websocket.onmessage = this.onWebSocketMessage.createDelegate(this);
        this.websocket.onerror = this.onWebSocketError.createDelegate(this);
    },
    /*snsoftx.x1room.X1RoomTest.startPlay*/
    startPlay:Xjs.emptyFn,
    /*snsoftx.x1room.X1RoomTest.sendMessage*/
    sendMessage:function(m)
    {
        var s = Xjs.JSON.encode(m,null,1);
        this.info("发送",s);
        this.websocket.send(s);
    },
    /*snsoftx.x1room.X1RoomTest.info*/
    info:function(title,message)
    {
        var cls = null;
        if(title)
        {
            this.msgPane.addMessage("【" + title + "】",cls || "item-title",1);
        }
        this.msgPane.addMessage(message,cls,2);
    },
    /*snsoftx.x1room.X1RoomTest.oncmd_stop*/
    oncmd_stop:function()
    {
        this.stop();
    },
    /*snsoftx.x1room.X1RoomTest.onWebSocketOpen*/
    onWebSocketOpen:function(ev)
    {
        this.info("WebSocket","打开..");
        this.sendMessage({cmd:10001,public_path:"s1",roomid:Number.obj2int(this.h5RoomData.room.user.rid,0),key:this.h5RoomData.SESSID || "123458",clienttype:1});
        this.sendMessage({cmd:10013});
    },
    /*snsoftx.x1room.X1RoomTest.onWebSocketMessage*/
    onWebSocketMessage:function(ev)
    {
        var s = ev.data;
        this.info("接受到",s);
    },
    /*snsoftx.x1room.X1RoomTest.onWebSocketClose*/
    onWebSocketClose:function(ev)
    {
        this.info("WebSocket","关闭..");
    },
    /*snsoftx.x1room.X1RoomTest.onWebSocketError*/
    onWebSocketError:function(ev)
    {
        this.info("WebSocket","错误..");
    }
});
