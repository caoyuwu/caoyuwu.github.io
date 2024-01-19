Xjs.loadedXjs.push("vlive/VLive");
/*snsoftx/vlive/VLive.java*/
Xjs.namespace("snsoftx.vlive");
snsoftx.vlive.VLive=function(service){
    this.TouchDev = Xjs.TouchDev;
    this.service = service;
    service.msgListener = this;
    this.vliveTag = service.getVLiveTag() || "VLive";
    this.dbgInfoDOM = Xjs.DOM.findById("DebugInfoPane",null);
    this.selectSettingsDOM = Xjs.DOM.findById("SelectSetting",null);
    this.popupMenuDOM = Xjs.DOM.findById("PopupMenu",null);
    if(this.selectSettingsDOM)
    {
        var a = service.getSettingSelections();
        if(a)
        {
            for(var j=0;j < a.length;j++)
            {
                var o = document.createElement("option");
                o.value = j;
                o.text = a[j];
                if(j == service.settingType)
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
    document.ontouchstart = Function.bindAsEventListener(this.onTouchStart,this);
    document.ontouchend = Function.bindAsEventListener(this.onTouchEnd,this);
};
Xjs.apply(snsoftx.vlive.VLive.prototype,{
    bufUserNames:{},
    _touchTime:0,
    /*snsoftx.vlive.VLive.showDebugInfo*/
    showDebugInfo:function(text)
    {
        Xjs.DOM.setTextContent(this.dbgInfoDOM,text);
    },
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
    updateViwers:Xjs.emptyFn,
    /*snsoftx.vlive.VLive.onTouchStart*/
    onTouchStart:function(e)
    {
        if(!e.touches || e.touches.length <= 0 || e.touches.length > 1)
        {
            return;
        }
        var touch = e.touches[0];
        this._touchXY = {x:touch.pageX,y:touch.pageY};
        this.showPopupMenu(-1,-1);
        this._touchTime = (new Date()).getTime();
        this.startLongTouchTimer(true);
    },
    /*snsoftx.vlive.VLive.startLongTouchTimer*/
    startLongTouchTimer:function(start)
    {
        if(this._timeLongTouch)
        {
            clearTimeout(this._timeLongTouch);
            delete this._timeLongTouch;
        }
        if(start)
        {
            if(!this.fn$onLongTouch)
            {
                this.fn$onLongTouch = this.onLongTouch.createDelegate(this);
            }
            this._timeLongTouch = setTimeout(this.fn$onLongTouch,600);
        }
    },
    /*snsoftx.vlive.VLive.onLongTouch*/
    onLongTouch:function()
    {
        this.startLongTouchTimer(false);
        if(this._touchXY)
        {
            this.showPopupMenu(this._touchXY.x,this._touchXY.y);
        }
    },
    /*snsoftx.vlive.VLive.onTouchEnd*/
    onTouchEnd:function(e)
    {
        this._touchTime = 0;
        this.startLongTouchTimer(false);
    },
    /*snsoftx.vlive.VLive.showPopupMenu*/
    showPopupMenu:function(x,y)
    {
        if(this.popupMenuDOM)
        {
            var px = x - 50,
                py = y - 30;
            if(px < 0)
                px = 0;
            if(py < 0)
                py = 0;
            if(x < 0 || y < 0)
            {
                px = -10000;
            }
            this.popupMenuDOM.style.left = px + "px";
            this.popupMenuDOM.style.top = py + "px";
        }
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
    this.fn$onClickCopy = Function.bindAsEventListener(this.onClickCopy,this);
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
        this.msgPane.addMessage(message || "",cls,2);
    },
    /*snsoftx.vlive.VLiveRoom.addCpBtn*/
    addCpBtn:function(text)
    {
        var cpBtn = document.createElement("button");
        cpBtn.textContent = text || "拷贝..";
        cpBtn.onclick = this.fn$onClickCopy;
        this.msgPane.addDOM(cpBtn,0);
    },
    /*snsoftx.vlive.VLiveRoom.playVideo*/
    playVideo:function(url)
    {
        this.startPlayDate = new Date();
        this.infoMsg("视频地址",url,null);
        this.addCpBtn("拷贝地址");
        this.playingUrl = url;
        this.showOtherMsgs();
        if(!this.videoPlay)
        {
            this.videoPlay = snsoftx.video.VideoPlay.$new(this.service.getVideoPlayerType(),null,{fitSize:1});
            this.videoPlay.setListener(this);
            var s = this.service.getEmptyVideoSize();
            if(s)
            {
                this.videoPlay.defaultVideoWidth = s.width;
                this.videoPlay.defaultVideoHeight = s.height;
            }
        }
        if(url.startsWith("rtmp://"))
        {
            var proxyServer = Xjs.ROOTPATH.startsWith("https://") ? "https://proxy.caoyuwu.top:1443" : "http://proxy.caoyuwu.top:1080";
            url = proxyServer + "/rtmp2flv/" + url.substring(7);
            this.infoMsg("代理视频地址",url,null);
            this.addCpBtn("拷贝地址");
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
Xjs.apply(snsoftx.vlive.VLiveRoom,{
    /*snsoftx.vlive.VLiveRoom.init*/
    init:function()
    {
        var vlive = Xjs.getReqParameter("vlive");
        Xjs.JsLoad.asynLoadJS("~/xjslib/vlive/" + vlive + "VLive.js").then(function(){
            var s = Xjs.JsLoad.newObject("snsoftx.vlive." + vlive.toLowerCase() + "." + vlive + "LiveService");
            new snsoftx.vlive.VLiveRoom(s);
        });
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
    this.enterRoomDOM = Xjs.DOM.findById("EnterRoomBTN",null);
    var refresOptsPaneDOM = Xjs.DOM.findById("RefreshOptsPane",null),
        a = service.getRefreshRoomsOpts() || [];
    this.refreshRoomsOpts = a;
    this.allRooms = {};
    var fn$onRefreshOptsChanged = Function.bindAsEventListener(this.onRefreshOptsChanged,this);
    for(var i=0;i < a.length;i++)
    {
        var selDom = a[i].selDOM = Xjs.DOM.createChild(refresOptsPaneDOM,"select");
        for(var j=0;j < a[i].options.length;j++)
        {
            var v = a[i].options[j],
                s = v.toString(),
                p;
            if((p = s.indexOf(':')) > 0)
            {
                v = s.substring(0,p);
                s = s.substring(p + 1);
            }
            var o = document.createElement("option");
            o.value = v;
            o.text = s;
            (selDom).options.add(o);
            selDom.onchange = fn$onRefreshOptsChanged;
        }
    }
    this.refreshBtnDOM.onclick = Function.bindAsEventListener(this.oncmd_refresh,this,0,true);
    this.statusPaneDOM = Xjs.DOM.findById("StatusPane",null);
    ;
    if(this.enterRoomDOM)
    {
        this.enterRoomDOM.onclick = Function.bindAsEventListener(this.oncmd_enterRoom,this,0,true);
    }
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
        for(var i=0;i < this.refreshRoomsOpts.length;i++)
        {
            var o = this.refreshRoomsOpts[i],
                t = "",
                v = null;
            if(o.selDOM)
            {
                v = o.selDOM.value;
                for(var j=0;j < o.selDOM.options.length;j++)
                {
                    if(o.selDOM.options[j].value == v)
                    {
                        t = o.selDOM.options[j].text;
                        break;
                    }
                }
            }
            title = title == null ? t : title + "-" + t;
            if(v != null)
            {
                opts[o.name] = v;
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
        try
        {
            this.service.refreshRooms(r);
        }catch(ex)
        {
            this.onRoomsLoadFail(r,ex);
        }
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
            if(this.TouchDev > 0)
            {
            } else 
            {
                if(!this.fn$onRoomItemDblClick)
                {
                    this.fn$onRoomItemDblClick = Function.bindAsEventListener(this.onRoomItemDblClick,this);
                }
                r.dom.ondblclick = this.fn$onRoomItemDblClick;
            }
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
                var d = new Date(roomsLst.refreshTime),
                    hour = d.getHours(),
                    min = d.getMinutes();
                s += ",刷新时间=" + String.toStr2(hour) + ":" + String.toStr2(min);
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
    /*snsoftx.vlive.VLiveRoomList.onRoomItemClick*/
    onRoomItemClick:Xjs.emptyFn,
    /*snsoftx.vlive.VLiveRoomList.oncmd_enterRoom*/
    oncmd_enterRoom:function()
    {
        this.showPopupMenu(-1,-1);
        this.enterRoom(this._touchRoom);
    },
    /*snsoftx.vlive.VLiveRoomList.onTouchStart*/
    onTouchStart:function(e)
    {
        if(this._touchRoom)
            Xjs.DOM.removeClass(this._touchRoom.dom,"selected");
        this._touchRoom = this.getRoomByMouseEv(e);
        if(this._touchRoom)
            Xjs.DOM.addClass(this._touchRoom.dom,"selected");
        snsoftx.vlive.VLiveRoomList.superclass.onTouchStart.call(this,e);
    },
    /*snsoftx.vlive.VLiveRoomList.getRoomByMouseEv*/
    getRoomByMouseEv:function(e)
    {
        var d = e.srcElement || e.target;
        for(;d && d != this.roomListDOM && (!d.id || !d.id.startsWith("Room_"));d = d.parentNode)
            ;
        if(d.id && d.id.startsWith("Room_"))
        {
            return this.getRoomById(Number.obj2int(d.id.substring(5),0));
        }
        return null;
    },
    /*snsoftx.vlive.VLiveRoomList.enterRoom*/
    enterRoom:function(room)
    {
        if(room)
        {
            window.console.log("进入 Room %s , user=%s:%s",room.roomId,room.userId,room.userName);
            window.open("Room.html#?rid=" + room.roomId + "&uid=" + room.userId + "&vlive=" + Xjs.getReqParameter("vlive"),"_blank");
        }
    },
    /*snsoftx.vlive.VLiveRoomList.onRoomItemDblClick*/
    onRoomItemDblClick:function(e)
    {
        {
        }
        this.enterRoom(this.getRoomByMouseEv(e));
    }
});
Xjs.apply(snsoftx.vlive.VLiveRoomList,{
    /*snsoftx.vlive.VLiveRoomList.newVLive*/
    newVLive:Xjs.emptyFn,
    /*snsoftx.vlive.VLiveRoomList.init*/
    init:function()
    {
        var vlive = Xjs.getReqParameter("vlive");
        Xjs.JsLoad.asynLoadJS("~/xjslib/vlive/" + vlive + "VLive.js").then(function(){
            var s = Xjs.JsLoad.newObject("snsoftx.vlive." + vlive.toLowerCase() + "." + vlive + "LiveService");
            new snsoftx.vlive.VLiveRoomList(s);
        });
    }
});
/*snsoftx/vlive/VLiveService.java*/
snsoftx.vlive.VLiveService=function(){
};
Xjs.apply(snsoftx.vlive.VLiveService.prototype,{
    options:1,
    /*snsoftx.vlive.VLiveService.initSettingType*/
    initSettingType:function()
    {
        var s = Xjs.getReqParameter("s");
        this.settingType = s == null || s == "" ? 0 : Number.parseInt(s);
        if(isNaN(this.settingType) || this.settingType < 0 || this.settingType >= 10)
        {
            throw new Error("参数 s 错误");
        }
        window.console.log("settingType = %s",this.settingType);
    },
    /*snsoftx.vlive.VLiveService.setSettingType*/
    setSettingType:function(type)
    {
        if(typeof(type) == "sting")
            type = parseInt(type);
        window.console.log("配置类型切换为 ： %s",type);
        this.settingType = type;
    },
    /*snsoftx.vlive.VLiveService.loadAllSettings*/
    loadAllSettings:function()
    {
        if(!this.allSettings)
        {
            var ajax = new Xjs.Ajax({method:"get",url:Xjs.ROOTPATH + "vlive/" + this.name.toLowerCase() + "/Settings.json"});
            ajax.request();
            this.allSettings = ajax.getResponse(true);
        }
    },
    /*snsoftx.vlive.VLiveService.getSettingSelections*/
    getSettingSelections:function()
    {
        this.loadAllSettings();
        var a = new Array(this.allSettings.length);
        for(var j=0;j < a.length;j++)
        {
            a[j] = j == 0 ? "缺省" : "配置" + j;
        }
        return a.length <= 1 ? null : a;
    },
    /*snsoftx.vlive.VLiveService.getVideoPlayerType*/
    getVideoPlayerType:function()
    {
        return this.videoPlayerType;
    },
    /*snsoftx.vlive.VLiveService.getAjaxInvokeProxy*/
    getAjaxInvokeProxy:Xjs.nullFn,
    /*snsoftx.vlive.VLiveService.ajaxInvoke*/
    ajaxInvoke:function(method,url,header,params,contentType,postParams,onSuccess,onError,opts)
    {
        var proxy = this.getAjaxInvokeProxy();
        if(!(opts & 2) && proxy && !proxy.startsWith("#"))
        {
            var p = proxy.indexOf(';');
            if(p > 0)
            {
                var a = proxy.substring(p + 1).split("&");
                proxy = proxy.substring(0,p);
                var nh = 0;
                for(var i=0;i < a.length;i++)
                {
                    p = a[i].indexOf('=');
                    if(a[i].startsWith("header.") && p > 0)
                    {
                        if(nh == 0)
                        {
                            header = Xjs.apply({},header);
                        }
                        header[a[i].substring(7,p)] = a[i].substring(p + 1);
                        nh++;
                    }
                }
            }
            p = url.indexOf("://");
            if(p < 0)
            {
                throw new Error(url);
            }
            url = proxy + "/" + url.substring(0,p) + "-request" + url.substring(p + 2);
        }
        var postBody = null,
            queryParams = null;
        if(params)
        {
            queryParams = Xjs.urlEncode(params);
        }
        if(!method)
            method = postParams != null ? "post" : "get";
        if(method.toLowerCase() == "post")
        {
            if(contentType == null || contentType.startsWith("application/json"))
            {
                postBody = postParams == null ? null : Xjs.JSON.encode(postParams,null,1);
                if(contentType == null)
                    contentType = "application/json;charset=utf-8";
            } else 
            {
                throw new Error("todo..:Form 表单");
            }
        }
        try
        {
            var ajax = new Xjs.Ajax({url:url,parameters:queryParams,method:method,contentType:contentType,header:header,postBody:postBody,success:onSuccess,error:onError || new Xjs.FuncCall(this.onAjaxFail,this),xopts:1});
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
    exitRoom:function()
    {
        this.closeWebSocket();
    },
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
    onInitListRooms:Xjs.emptyFn,
    /*snsoftx.vlive.VLiveService.getEmptyVideoSize*/
    getEmptyVideoSize:function()
    {
        return this.emptyVideoSize;
    }
});
