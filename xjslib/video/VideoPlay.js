Xjs.loadedXjs.push("video/VideoPlay");
/*snsoftx/video/VideoPlay.java*/
Xjs.namespace("snsoftx.video");
snsoftx.video.VideoPlay=function(domId,cfg,playUrl){
    this.videoElement = document.getElementById(domId || "video-player");
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
    /*snsoftx.video.VideoPlay.init*/
    init:Xjs.emptyFn,
    /*snsoftx.video.VideoPlay.play*/
    play:Xjs.emptyFn,
    /*snsoftx.video.VideoPlay.pause*/
    pause:Xjs.emptyFn,
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
        var videoHeight = this.getVideoHeight(),
            viewH = Xjs.DOM.getViewportHeight() - (this.padding && this.padding.height ? this.padding.height : 0),
            viewW = Xjs.DOM.getViewportWidth() - (this.padding && this.padding.width ? this.padding.width : 0);
        if(this.fitSize == 1)
        {
            var videoWidth = this.getVideoWidth(),
                w = videoWidth,
                h = videoHeight;
            if(h <= 0 || w <= 0)
            {
                w = viewW;
                h = viewH;
            }
            var maxW = viewW;
            if(w > maxW)
            {
                h = maxW * h / w;
                w = maxW;
            }
            var maxH = viewH;
            if(h > maxH)
            {
                w = maxH * w / h;
                h = maxH;
            }
            this.setVideoViewSize(w,h);
        }
    }
});
/*snsoftx/video/FLVVideoPlay.java*/
snsoftx.video.FLVVideoPlay=function(){};
/*snsoftx/video/HLSVideoPlay.java*/
snsoftx.video.HLSVideoPlay=function(domId,cfg,playUrl){
    snsoftx.video.HLSVideoPlay.superclass.constructor.call(this,domId,cfg,playUrl);
};
Xjs.extend(snsoftx.video.HLSVideoPlay,snsoftx.video.VideoPlay,{
  _js$className_:"snsoftx.video.HLSVideoPlay",
    /*snsoftx.video.HLSVideoPlay.init*/
    init:function()
    {
        this.videoPlayer = window.videojs(this.videoElement,{},this.onVideoPlayReady.createDelegate(this));
    },
    /*snsoftx.video.HLSVideoPlay.play*/
    play:function(url)
    {
        this.videoPlayer.src(url);
        this.videoPlayer.play();
    },
    /*snsoftx.video.HLSVideoPlay.pause*/
    pause:function()
    {
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
