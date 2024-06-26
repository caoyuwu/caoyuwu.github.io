Xjs.loadedXjs.push("video/VideoPlay");
/*snsoftx/video/VideoPlay.java*/
Xjs.namespace("snsoftx.video");
snsoftx.video.VideoPlay=function(domId,cfg,playUrl){
    var attachInVDOM = this.attachInVideoDOM();
    this.attachInDOM = document.getElementById(domId || (attachInVDOM ? "video-player" : "video-player-wrapper"));
    if(attachInVDOM)
    {
        this.videoElement = this.attachInDOM;
        this.videoElement.onloadedmetadata = this.onLoadedMetadata.createDelegate(this);
    } else 
    {
        this.videoElement = null;
        for(;this.attachInDOM.childNodes.length > 0;)
            this.attachInDOM.removeChild(this.attachInDOM.childNodes[0]);
    }
    Xjs.apply(this,cfg);
    this.init();
    if(this.fitSize)
    {
        window.addEventListener("resize",this.onWindowResized.createDelegate(this),false);
    }
    if(playUrl)
    {
        this.play(playUrl);
    }
};
Xjs.apply(snsoftx.video.VideoPlay.prototype,{
    /*snsoftx.video.VideoPlay.attachInVideoDOM*/
    attachInVideoDOM:Xjs.trueFn,
    /*snsoftx.video.VideoPlay.onLoadedMetadata*/
    onLoadedMetadata:function()
    {
        this.updateVideoPos();
    },
    /*snsoftx.video.VideoPlay.init*/
    init:Xjs.emptyFn,
    /*snsoftx.video.VideoPlay.play*/
    play:function(url)
    {
        this.videoElement.src = url;
        this.videoElement.play();
    },
    /*snsoftx.video.VideoPlay.pause*/
    pause:function()
    {
        this.videoElement.pause();
    },
    /*snsoftx.video.VideoPlay.stop*/
    stop:function()
    {
        this.videoElement.pause();
    },
    /*snsoftx.video.VideoPlay.onVideoError*/
    onVideoError:function(err)
    {
        alert("播放错误：");
    },
    /*snsoftx.video.VideoPlay.getVideoWidth*/
    getVideoWidth:function()
    {
        return this.videoElement ? this.videoElement.videoWidth : 0;
    },
    /*snsoftx.video.VideoPlay.getVideoHeight*/
    getVideoHeight:function()
    {
        return this.videoElement ? this.videoElement.videoHeight : 0;
    },
    /*snsoftx.video.VideoPlay.onVideoPlayReady*/
    onVideoPlayReady:Xjs.emptyFn,
    /*snsoftx.video.VideoPlay.onVideoPlay*/
    onVideoPlay:function()
    {
        window.console.log("onVideoPlay: videoSize = " + this.getVideoWidth() + "X" + this.getVideoHeight());
        this.updateVideoPos();
    },
    /*snsoftx.video.VideoPlay.onVideoResize*/
    onVideoResize:function()
    {
        window.console.log("onVideoResize: videoSize = " + this.getVideoWidth() + "X" + this.getVideoHeight());
        this.updateVideoPos();
    },
    /*snsoftx.video.VideoPlay.onWindowResized*/
    onWindowResized:function()
    {
        this.updateVideoPos();
    },
    /*snsoftx.video.VideoPlay.setVideoViewSize*/
    setVideoViewSize:function(w,h)
    {
        if(this.videoElement)
        {
            this.videoElement.style.width = w + "px";
            this.videoElement.style.height = h + "px";
        }
        if(this.attachInDOM)
        {
            this.attachInDOM.style.width = w + "px";
            this.attachInDOM.style.height = h + "px";
        }
    },
    /*snsoftx.video.VideoPlay.updateVideoPos*/
    updateVideoPos:function()
    {
        var viewH = Xjs.DOM.getViewportHeight() - (this.padding && this.padding.height ? this.padding.height : 0),
            viewW = Xjs.DOM.getViewportWidth() - (this.padding && this.padding.width ? this.padding.width : 0);
        if(this.fitSize == 1)
        {
            var videoWidth = this.getVideoWidth(),
                videoHeight = this.getVideoHeight(),
                w = videoWidth || this.defaultVideoWidth || 0,
                h = videoHeight || this.defaultVideoHeight || 0;
            if(h <= 0 || w <= 0)
            {
                return;
            }
            var maxW = viewW,
                maxH = viewH;
            if(this.listener)
            {
                var s = this.listener.getVideoViewMaxSize(viewW,viewH);
                if(s)
                {
                    if(s.width > 0)
                        maxW = s.width;
                    if(s.height > 0)
                        maxH = s.height;
                }
            }
            if(w > maxW)
            {
                h = maxW * h / w;
                w = maxW;
            }
            if(h > maxH)
            {
                w = maxH * w / h;
                h = maxH;
            }
            this.setVideoViewSize(w,h);
            if(this.listener)
            {
                this.listener.onVideoViewSizeChanged(w,h);
            }
        }
    },
    /*snsoftx.video.VideoPlay.setListener*/
    setListener:function(l)
    {
        this.listener = l;
    }
});
Xjs.apply(snsoftx.video.VideoPlay,{
    /*snsoftx.video.VideoPlay.$new*/
    $new:function(type,domId,cfg,playUrl)
    {
        switch((type || "").toLowerCase())
        {
        case "hls":
            return new snsoftx.video.HLSVideoPlay(domId,cfg,playUrl);
        case "flv":
            return new snsoftx.video.FLVVideoPlay(domId,cfg,playUrl);
        case "clappr":
            return new snsoftx.video.ClapprVideoPlay(domId,cfg,playUrl);
        default:
            return new snsoftx.video.VideoPlay(domId,cfg,playUrl);
        }
    }
});
/*snsoftx/video/ClapprVideoPlay.java*/
snsoftx.video.ClapprVideoPlay=function(domId,cfg,playUrl){
    snsoftx.video.ClapprVideoPlay.superclass.constructor.call(this,domId,cfg,playUrl);
};
Xjs.extend(snsoftx.video.ClapprVideoPlay,snsoftx.video.VideoPlay,{
  _js$className_:"snsoftx.video.ClapprVideoPlay",
    ClapprJSUrl:Xjs.ROOTPATH + "jslib/clappr/Clappr.js",
    /*snsoftx.video.ClapprVideoPlay.attachInVideoDOM*/
    attachInVideoDOM:Xjs.falseFn,
    /*snsoftx.video.ClapprVideoPlay.init*/
    init:Xjs.emptyFn,
    /*snsoftx.video.ClapprVideoPlay.play*/
    play:function(url)
    {
        var _this = this;
        Xjs.JsLoad.asynLoadJS(this.ClapprJSUrl).then(function(){
            _this._play(url);
        });
    },
    /*snsoftx.video.ClapprVideoPlay.pause*/
    pause:function()
    {
        if(this.player)
            this.player.pause();
    },
    /*snsoftx.video.ClapprVideoPlay.stop*/
    stop:function()
    {
        if(this.player)
            this.player.stop();
    },
    /*snsoftx.video.ClapprVideoPlay._play*/
    _play:function(url)
    {
        if(!this.player)
        {
            this.player = new Clappr.Player({});
            this.player.attachTo(this.attachInDOM);
        }
        if(url)
            this.player.load(url);
        this.player.play();
    }
});
/*snsoftx/video/FLVVideoPlay.java*/
snsoftx.video.FLVVideoPlay=function(domId,cfg,playUrl){
    snsoftx.video.FLVVideoPlay.superclass.constructor.call(this,domId,cfg,playUrl);
};
Xjs.extend(snsoftx.video.FLVVideoPlay,snsoftx.video.VideoPlay,{
  _js$className_:"snsoftx.video.FLVVideoPlay",
    flvjsUrl:"https://cdn.bootcdn.net/ajax/libs/flv.js/1.5.0/flv.min.js",
    /*snsoftx.video.FLVVideoPlay.init*/
    init:Xjs.emptyFn,
    /*snsoftx.video.FLVVideoPlay.play*/
    play:function(url)
    {
        this.destroy();
        var _this = this;
        Xjs.JsLoad.asynLoadJS(this.flvjsUrl).then(function(){
            _this._play(url);
        });
    },
    /*snsoftx.video.FLVVideoPlay.flvConfig*/
    flvConfig:function()
    {
        if(!this._cfged)
        {
            this._cfged = true;
            var c = window.flvjs.LoggingControl;
            c.enableDebug = false;
            c.enableInfo = false;
            c.enableVerbose = false;
            c.enableWarn = false;
        }
    },
    /*snsoftx.video.FLVVideoPlay._play*/
    _play:function(url)
    {
        this.flvConfig();
        this.flvPlayer = window.flvjs.createPlayer({type:"flv",url:url});
        this.flvPlayer.attachMediaElement(this.videoElement);
        this.flvPlayer.load();
        this.videoElement.play();
    },
    /*snsoftx.video.FLVVideoPlay.pause*/
    pause:function()
    {
        if(this.flvPlayer)
        {
            this.flvPlayer.pause();
        }
    },
    /*snsoftx.video.FLVVideoPlay.stop*/
    stop:function()
    {
        this.destroy();
    },
    /*snsoftx.video.FLVVideoPlay.destroy*/
    destroy:function()
    {
        if(this.flvPlayer)
        {
            this.flvPlayer.unload();
            this.flvPlayer.detachMediaElement();
            this.flvPlayer.destroy();
            this.flvPlayer = null;
        }
    }
});
/*snsoftx/video/HLSVideoPlay.java*/
snsoftx.video.HLSVideoPlay=function(domId,cfg,playUrl){
    snsoftx.video.HLSVideoPlay.superclass.constructor.call(this,domId,cfg,playUrl);
};
Xjs.extend(snsoftx.video.HLSVideoPlay,snsoftx.video.VideoPlay,{
  _js$className_:"snsoftx.video.HLSVideoPlay",
    HLSJSUrl:"https://cdn.jsdelivr.net/hls.js/latest/hls.min.js",
    /*snsoftx.video.HLSVideoPlay.init*/
    init:Xjs.emptyFn,
    /*snsoftx.video.HLSVideoPlay.play*/
    play:function(url)
    {
        var _this = this;
        Xjs.JsLoad.asynLoadJS(this.HLSJSUrl).then(function(){
            _this._play(url);
        });
    },
    /*snsoftx.video.HLSVideoPlay._play*/
    _play:function(url)
    {
        if(!this.hls)
        {
            this.hls = new Hls();
            this.fn$onVideoPlayReady = this.onVideoPlayReady.createDelegate(this);
        }
        this.hls.attachMedia(this.videoElement);
        this.hls.loadSource(url);
        this.hls.on(Hls.Events.MEDIA_ATTACHED,this.fn$onVideoPlayReady);
    },
    /*snsoftx.video.HLSVideoPlay.onVideoPlayReady*/
    onVideoPlayReady:function()
    {
        this.videoElement.play();
    }
});
