/*
"crawler://video/naicha86.js?[PATH=coco/132754-2-1]"
*/
{
	contentUrl:"https://www.naicha86.com",
	"MediaSource":{
			 "contentUrl":"~/${PATH}.html",
			 /*
			 <script type="text/javascript">var player_aaaa={  }</script>
			   "url":"https:\/\/t25.cdn2020.com\/video\/m3u8\/2024\/05\/18\/4184631e\/index.m3u8"
			 */
			getUrlByContent:function(macro,content){
				const prefix = '<script type="text/javascript">var player_aaaa={';
				const suffix = "}</script>";
				var v= extractJsonValues(content,prefix,suffix,1);
				return v ?  decodeURIComponent(v.url) : null;
			}
			 }
}