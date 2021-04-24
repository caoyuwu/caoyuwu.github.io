Xjs.loadedXjs.push("video/VideoPlay");
/*snsoftx/video/VideoPlay.java*/
Xjs.namespace("snsoftx.video");
snsoftx.video.VideoPlay=function(domId,cfg,playUrl){
    this.videoElement = document.getElementById(domId || "video-player");
    this.videoElement.onloadedmetadata = this.onLoadedMetadata.createDelegate(this);
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
        return this.videoElement.videoWidth;
    },
    /*snsoftx.video.VideoPlay.getVideoHeight*/
    getVideoHeight:function()
    {
        return this.videoElement.videoHeight;
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
        this.videoElement.style.width = w + "px";
        this.videoElement.style.height = h + "px";
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
        default:
            return new snsoftx.video.VideoPlay(domId,cfg,playUrl);
        }
    }
});
/*snsoftx/video/FLVVideoPlay.java*/
snsoftx.video.FLVVideoPlay=function(domId,cfg,playUrl){
    snsoftx.video.FLVVideoPlay.superclass.constructor.call(this,domId,cfg,playUrl);
};
Xjs.extend(snsoftx.video.FLVVideoPlay,snsoftx.video.VideoPlay,{
  _js$className_:"snsoftx.video.FLVVideoPlay",
    /*snsoftx.video.FLVVideoPlay.init*/
    init:Xjs.emptyFn,
    /*snsoftx.video.FLVVideoPlay.play*/
    play:function(url)
    {
        this.destroy();
        var _this = this;
        Xjs.JsLoad.asynLoadJS("~/jslib/flvjs/flv.js").then(function(){
            _this._play(url);
        });
    },
    /*snsoftx.video.FLVVideoPlay._play*/
    _play:function(url)
    {
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
    /*snsoftx.video.HLSVideoPlay.init*/
    init:Xjs.emptyFn,
    /*snsoftx.video.HLSVideoPlay.play*/
    play:function(url)
    {
        var _this = this;
        Xjs.JsLoad.asynLoadJS("~/jslib/videojs/video.js").then(function(){
            _this._play(url);
        });
    },
    /*snsoftx.video.HLSVideoPlay._play*/
    _play:function(url)
    {
        if(!this.videoPlayer)
        {
            Xjs.DOM.addHeaderCSSLink("~/jslib/videojs/video-js.css");
            this.videoPlayer = window.videojs(this.videoElement,{},this.onVideoPlayReady.createDelegate(this));
        }
        this.videoPlayer.src(url);
        this.videoPlayer.play();
    },
    /*snsoftx.video.HLSVideoPlay.pause*/
    pause:function()
    {
        if(this.videoPlayer)
            this.videoPlayer.pause();
    },
    /*snsoftx.video.HLSVideoPlay.stop*/
    stop:function()
    {
        if(this.videoPlayer)
            this.videoPlayer.pause();
    },
    /*snsoftx.video.HLSVideoPlay.getVideoWidth*/
    getVideoWidth:function()
    {
        if(this.videoPlayer)
            return this.videoPlayer.videoWidth();
        return this.videoElement.videoWidth;
    },
    /*snsoftx.video.HLSVideoPlay.getVideoHeight*/
    getVideoHeight:function()
    {
        if(this.videoPlayer)
            return this.videoPlayer.videoHeight();
        return this.videoElement.videoHeight;
    },
    /*snsoftx.video.HLSVideoPlay.onVideoPlayReady*/
    onVideoPlayReady:function()
    {
        this.videoPlayer.on("play",this.onVideoPlay.createDelegate(this));
        this.videoPlayer.on("resize",this.onVideoResize.createDelegate(this));
        this.videoPlayer.on("error",this.onVideoError.createDelegate(this));
        window.console.log("videoPlayer.src = " + this.videoPlayer.src());
        if(this.videoPlayer.src() != null)
            this.videoPlayer.play();
    },
    /*snsoftx.video.HLSVideoPlay.setVideoViewSize*/
    setVideoViewSize:function(w,h)
    {
        if(!this.videoPlayer)
        {
            snsoftx.video.HLSVideoPlay.superclass.setVideoViewSize.call(this,w,h);
        } else 
        {
            this.videoPlayer.height(h);
            this.videoPlayer.width(w);
        }
    }
});
