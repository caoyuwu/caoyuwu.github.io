/*
<script ...>self.__pace_f.push([1,"7:[...."])</script
 */
/*
  path : movie
  -> tabFeedListDefault[0] -> episodeInfo -> episodeId  = "6694868680309735940"
  -> tabFeedListDefault[0] -> episodeInfo -> title  = "马戏小子"
 */
function loadsVschannelMenus(path) {
    var html = utils.httpGetAsString("https://www.douyin.com/vschannel/"+path);
    var PrefixTag = (">self.__pace_f.push([1,\"7:[");
    var p1 = html.indexOf(PrefixTag);
    if( p1<0 ) return null;
    var p2 = html.indexOf("\"])</script>",p1+PrefixTag.length);
    if( p2<0 ) return null;
    var text = html.substring(p1+PrefixTag.length-4,p2+1); // "7:["$","$L9",null,{...}]\n"
    //text = "{v:"+text.substring(3,text.length-1).trim()+"}";
    text = JSON.parse(text).trim();  //  7:[...]
    text = text.substring(2).trim();  // [...]
    var m = JSON.parse(text)[3];
    //utils.writeStringToFile( JSON.stringify(m),"/opt/temp/a.txt" );
    var items = [];
    for(var tabFeedListDefault of m.tabFeedListDefault){
        var episodeInfo = tabFeedListDefault.episodeInfo;
       // var episodeId = episodeInfo.episodeId;
       // var title = episodeInfo.title;
        items.push({
            url : "douyin:vdetail/"+episodeInfo.episodeId,
            title : episodeInfo.title
        });
    }
    return items;
}
