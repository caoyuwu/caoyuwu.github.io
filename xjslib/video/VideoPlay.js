Xjs.loadedXjs.push("video/VideoPlay");
/*snsoftx/video/VideoPlay.java*/
Xjs.namespace("snsoftx.video");
snsoftx.video.VideoPlay=function(domId,cfg,playUrl){
    this.videoElement = document.getElementById(domId || "video-player");
    this.videoPlayer = window.videojs(this.videoElement,{},this.onVideoPlayReady.createDelegate(this));
    Xjs.apply(this,cfg);
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
    /*snsoftx.video.VideoPlay.play*/
    play:function(url)
    {
        this.videoPlayer.src(url);
        this.videoPlayer.play();
    },
    /*snsoftx.video.VideoPlay.pause*/
    pause:function()
    {
        this.videoPlayer.pause();
    },
    /*snsoftx.video.VideoPlay.onVideoError*/
    onVideoError:function(err)
    {
        alert("播放错误：");
    },
    /*snsoftx.video.VideoPlay.getVideoWidth*/
    getVideoWidth:function()
    {
        if(this.videoPlayer)
            return this.videoPlayer.videoWidth();
        return this.videoElement.videoWidth;
    },
    /*snsoftx.video.VideoPlay.getVideoHeight*/
    getVideoHeight:function()
    {
        if(this.videoPlayer)
            return this.videoPlayer.videoHeight();
        return this.videoElement.videoHeight;
    },
    /*snsoftx.video.VideoPlay.onVideoPlayReady*/
    onVideoPlayReady:function()
    {
        this.videoPlayer.on("play",this.onVideoPlay.createDelegate(this));
        this.videoPlayer.on("resize",this.onVideoResize.createDelegate(this));
        this.videoPlayer.on("error",this.onVideoError.createDelegate(this));
        window.console.log("videoPlayer.src = " + this.videoPlayer.src());
        if(this.videoPlayer.src() != null)
            this.videoPlayer.play();
    },
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
            if(!this.videoPlayer)
            {
                this.videoElement.style.width = w + "px";
                this.videoElement.style.height = h + "px";
            } else 
            {
                this.videoPlayer.height(h);
                this.videoPlayer.width(w);
            }
        }
    }
});
