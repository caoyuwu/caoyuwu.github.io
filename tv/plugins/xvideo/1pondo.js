{
	contentUrl : "https://www.1pondo.tv",
	
	List:{
		contentUrl : "~/dyn/phpauto/movie_lists/list_newest_0.json",
		loadItems: function(items,contentUrl){
			/*
			   https://www.1pondo.tv/list/?page=3&o=newest
			*/
			var json = utils.httpGetAsString(contentUrl,0x408);
			var m = JSON.parse(json);
			//var TotalRows = m.TotalRows, SplitSize = m.SplitSize;
//	print("this="+this);	
//	print("this._parent.num2Str="+this._parent.num2Str);		
			for(var i=0;i<m.TotalRows;i+=m.SplitSize){
				var i2 = i+m.SplitSize-1;
				if( i2 > m.TotalRows ) i2 = m.TotalRows;
				var title = this._parent.num2Str(i,4)+" - "+this._parent.num2Str(i2,4);
				if( i==0 ){
					items.push({
					items: this._parent.parseContentRows(m.Rows),
					title:title
				  });
				} else {
				items.push({
					items:"@crawler-list://xvideo/1pondo.js#List2?[IDX="+i+"]",
					title:title
				  });
				  }
			}
		}
	},
	List2:{
		  /*
		  https://www.1pondo.tv/dyn/phpauto/movie_lists/list_newest_400.json
		  */
		  contentUrl:"~/dyn/phpauto/movie_lists/list_newest_${IDX}.json",
		  loadItems: function(items,contentUrl){
			    var json = utils.httpGetAsString(contentUrl,0x408);
				var m = JSON.parse(json);
				var a = this._parent.parseContentRows(m.Rows);
				for(var i of a) items.push(i);
			}
	},
	parseContentRows: function(rows){
		var items = [];
		for(var i of rows){
			//var title = i.Title");
			//var movieID = i.get("MovieID");
			//var release = (String)mi.get("Release");
			//var MemberFiles = i.MemberFiles;
			var SampleFiles = i.SampleFiles;
			items.push({
				title : i.Title+"("+i.Release+","+i.Actor+")",
				url   : SampleFiles[SampleFiles.length-1].URL
			});
		}
		return items;
	},
	num2Str: function(v,n){
		var s = ""+v;
		for(;s.length<n; ) s = "0"+s;
		return s; 
	}
	
}