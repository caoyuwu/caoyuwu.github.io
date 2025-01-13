 var videos = document.getElementsByTagName("video");
 if (videos.length>1){
	 videos[0] .requestFullscreen();
 }
 alert("执行到 video-fullscreen.js");