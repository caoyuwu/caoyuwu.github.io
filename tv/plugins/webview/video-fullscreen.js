 var videos = document.getElementsByTagName("video");
 console.log("执行到 video-fullscreen.js : videos.length="+videos.length);
 //alert("执行到 video-fullscreen.js : videos.length="+videos.length);
 if (videos.length>0){
	 videos[0] .requestFullscreen();
 }
 