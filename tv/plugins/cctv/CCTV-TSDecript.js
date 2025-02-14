
if( !this.window ){
	window = self = this;
	document = {};
	document.location = location = {
		host :"tv.cctv.com",
		hostname : "tv.cctv.com",
		href : "http://tv.cctv.com/live/",
		origin :"http://tv.cctv.com",
		pathname :"/live/",
		protocol:"https:"

	};
	wb = null;
}
/*
function arrayHashCode(a,start,end){
	if(a==null ){return 0;}
	var result = 1;
	if( start===undefined ) start = 0;
	if( end===undefined ) end = a.length;
    for(var i=start;i<end;i++)
        result = (31 * result + a[i])&0x7fffffff;
    return result;
} // arrayHashCode

function arrayHashCode2(a2,getBytes){
			if(a2==null ){return 0;}
			var result = 1;
			for(var e of a2){
				var a = getBytes(e); 
		    	for(var i=0;i<a.length;i++)
		        	result = (31 * result + a[i])&0x7fffffff;
			}
		    return result;
} // arrayHashCode2
function bytesToHex(a,start,end){
	if( start===undefined ) start = 0;
	if( end===undefined ) end = a.length;
	var v = [];
    for(var i=start;i<end;i++){
		 v.push(a[i]<10?"0"+a[i].toString(16) : a[i].toString(16)); 
	}
	return v.join("");
}
function printAvcSamples(samples){
		 for(var i=0;i<samples.length;i++){
			var sample = samples[i];
	
			console.log("AvcSample[%d]: units.length=%d, hash=%d",
			 i,
			 //sample.frame,sample.key,sample.pts,
			 sample.units.length,
			 arrayHashCode2(sample.units,(u)=>u.data.toUint8Array())
			 );
		 }
}  // printAvcSamples
*/
/*
	 console.log("AvcSample[%d]: frame=%s, key=%s, pts=%s, units.length=%d, hash=%d",
	 i,sample.frame,sample.key,sample.pts,sample.units.length,
	 arrayHashCode2(sample.units,(u)=>u.data)
	 );
	 */


ByteArray=function(initSize){
    this.buf = new ArrayBuffer(initSize);
    this.a = new Uint8Array(this.buf);
};

ByteArray.prototype = {
    size:0,
    /*xjs.util.ByteArray.get*/
    get:function(i)
    {
        if(i >= 0 && i < this.size)
            return this.a[i];
        return;
    },
    /*xjs.util.ByteArray._expand*/
    _expand:function(maxSize)
    {
        if(this.size >= maxSize)
            return;
        var capacityIncrement = 1024,
            old_a = this.a,
            n = Math.ceil((maxSize + 1) / capacityIncrement) * capacityIncrement;
        if(n < maxSize)
            n = maxSize;
        this.buf = new ArrayBuffer(n);
        this.a = new Uint8Array(this.buf);
        this.a.set(old_a,0);
    },
    /*xjs.util.ByteArray.append*/
    append:function(data,start,end)
    {
		if(start === undefined)
		{
		            start = 0;
		            end = data.byteLength;
		}
        if(end <= start)
            return;
        var newSize = this.size + end - start;
        if(this.a.length < newSize)
        {
            this._expand(newSize);
        }
        var subdata = data;
        if(start != 0 || end != data.length)
        {
            subdata = data.subarray(start,end);
        }
        this.a.set(subdata,this.size);
        this.size = newSize;
    },
    /*xjs.util.ByteArray.appendFromByteArray*/
    appendFromByteArray:function(src,start,end)
    {
        var srcMaps = src.getSrcMaps(start,end - start),
            i0 = this.size;
        this.append(src.a,start,end);
        for(var j=0;j < srcMaps.length;j++)
        {
            var m = srcMaps[j];
            this.setSrcMap(i0 + m.start - start,m.count,m.buf,m.srcStart);
        }
    },
    /*xjs.util.ByteArray.subArray*/
    subArray:function(start,end)
    {
        var a = new ByteArray(end - start);
        a.append(this.a,start,end);
        var maps = this.getSrcMaps(start,end - start);
        if(maps)
            for(var i=0;i < maps.length;i++)
            {
                var m = maps[i];
                a.setSrcMap(m.start - start,m.count,m.buf,m.srcStart);
            }
        return a;
    }, 
   /*xjs.util.ByteArray.toUint8Array*/
   toUint8Array:function()
   {
       if(this.size == this.a.byteLength)
           return this.a;
       return new Uint8Array(this.buf,0,this.size);
   },
   /*xjs.util.ByteArray.setSrcMap*/
    setSrcMap:function(start,count,buf,srcStart)
    {
        if(count <= 0 || start < 0 || srcStart < 0 || start + count > this.size)
        {
            throw new Error();
        }
        if(!this.srcMaps)
        {
            this.srcMaps = [];
        }
        var i = this.srcMaps.length;
        for(;i > 0 && start < this.srcMaps[i - 1].start;i--)
            ;
        if(i > 0 && start < this.srcMaps[i - 1].start + this.srcMaps[i - 1].count || i < this.srcMaps.length && this.srcMaps[i].start < start + count)
        {
            throw new Error();
        }
        this.srcMaps.splice(i,0,{start:start,count:count,buf:buf,srcStart:srcStart});
    },
    /*xjs.util.ByteArray.getSrcMaps*/
    getSrcMaps:function(start,count)
    {
        var maps = [],
            lastMap = null;
        if(this.srcMaps)
            for(var i=0;i < this.srcMaps.length && count > 0;i++)
            {
                var m = this.srcMaps[i],
                    end;
                if(start >= m.start && start < (end = m.start + m.count))
                {
                    var count1 = count;
                    if(count1 > end - start)
                        count1 = end - start;
                    var newMap;
                    if(start == m.start && count1 == m.count)
                    {
                        newMap = m;
                    } else 
                    {
                        newMap = {start:start,count:count1,buf:m.buf,srcStart:m.srcStart + (start - m.start)};
                    }
                    if(lastMap != null && lastMap.buf == newMap.buf && lastMap.start + lastMap.count == newMap.start && lastMap.srcStart + lastMap.count == newMap.srcStart)
                    {
                        lastMap = {start:lastMap.start,count:lastMap.count + newMap.count,buf:lastMap.buf,srcStart:lastMap.srcStart};
                        maps[maps.length - 1] = lastMap;
                    } else 
                    {
                        maps.push(lastMap = newMap);
                    }
                    count -= count1;
                    start += count1;
                }
            }
        return maps;
    },
    /*xjs.util.ByteArray.copyToSrc*/
    copyToSrc:function(start,count)
    {
		//var n = 0, n2 = 0;
        if(this.srcMaps)
            for(var m of this.srcMaps)
            {
                var i = m.start > start ? m.start : start,
                    end = m.start + m.count < start + count ? m.start + m.count : start + count;
                if(i < end)
                {
					if( i<m.start ) throw new Error("i = "+i+",m.start="+m.start);
                    var ma = new Uint8Array(m.buf);
                    for(;i < end;i++)
                    {
                        /*
						if(  ma[m.srcStart + (i - m.start)]!=this.a[i] ){
                        	n++;
                        }
                        if( i==32 || m.srcStart + (i - m.start)==85384+32 ){
							console.log("1---this.a[%d]=%d,ma[%d+%d]=%d ; m.buf.length=%d",i,this.a[i],m.srcStart,i - m.start,ma[m.srcStart + (i - m.start)],m.buf.length);	   
						} */
                       	ma[m.srcStart + (i - m.start)] = this.a[i];
                       	/*
                       	if( i==32 || m.srcStart + (i - m.start)==85384+32 ){
							var ma2 = new Uint8Array(m.buf);
							console.log("2---this.a[%d]=%d,ma[%d+%d]=%d/%d ; m.buf.length=%d",i,this.a[i],m.srcStart,i - m.start,ma[m.srcStart + (i - m.start)],ma2[m.srcStart + (i - m.start)],m.buf.length);	   
						}
                       	n2++;
                       	*/
                    }
                }
            }
        // console.log("start=%d,count=%d,n2=%d, n=%d",start,count,n2,n);   
        // return n;   
    },
    /*xjs.util.ByteArray.checkSrcMapsEq*/
    checkSrcMapsEq:function()
    {
		if(!_debug) return;
        var i = 0;
        if(this.srcMaps)
            for(var m of this.srcMaps)
            {
                var ma = new Uint8Array(m.buf);
               // console.log("%d/%d => %d/%d",m.start,m.count,m.srcStart,m.buf.length);
                if(i != m.start)
                {
                    throw new Error("第 " + i + " 位置缺源数据");
                }
                for(var j=0;j < m.count;j++)
                {
                    if(ma[m.srcStart + j] != this.a[m.start + j])
                    {
						//源[85384+32](52)!=this[0+32](123)
                        throw new Error("第 " + (m.start + j) + " 位置不等 : 源["+m.srcStart+"+"+j+"]("+ma[m.srcStart + j]+")!=this["+m.start+"+"+j+"]("+this.a[m.start + j]+")");
                    }
                }
                i += m.count;
            }
        if(i != this.size)
        {
            throw new Error("缺源数据");
        }
    }
};// ByteArray

var CNTVH5PlayerModule;
var CNTVH5PlayerModuleInitialized
var funcsCallOnCNTVH5PlayerModuleLoaded;
function loadCNTVH5PlayerModule(){
	if( CNTVH5PlayerModule ){
	   return;
	}
	CNTVH5PlayerModule = CNTVModule();
	CNTVH5PlayerModule.onRuntimeInitialized = function() {
		CNTVH5PlayerModuleInitialized = true;
		//console.log("完成 CNTVH5PlayerModule 初始化...");
		if(funcsCallOnCNTVH5PlayerModuleLoaded) for(;funcsCallOnCNTVH5PlayerModuleLoaded.length>0;){
			(funcsCallOnCNTVH5PlayerModuleLoaded.pop())();
		}
		funcsCallOnCNTVH5PlayerModuleLoaded = null;
	};   
}

function callOnCNTVH5PlayerModuleLoaded(call){
	if( CNTVH5PlayerModuleInitialized ){
		call();
		return;
	}
	if( !funcsCallOnCNTVH5PlayerModuleLoaded ){
		funcsCallOnCNTVH5PlayerModuleLoaded = [];
	}
	funcsCallOnCNTVH5PlayerModuleLoaded.push(call);
	loadCNTVH5PlayerModule();
}

CCTVTSDecript = function(){}

CCTVTSDecript.prototype = {
	//var signalUrlSend , rootURL;
/*
  data : ByteArray
  type : 0,1
*/
 decryptAVCNALu:function(data,type){
	//if( !CNTVH5PlayerModule ) loadCNTVH5PlayerModule();
	//var  i = 0, a = 0, n = new Uint8Array(0);
if( true) return;	
	var rootURL_len = 0;
	var r = null;
    try {
        r = CNTVH5PlayerModule._jsmalloc(data.size+1024);// e.byteLength + 1024);
        // rootURL=https://tv.cctv.com/live/cctv13/,signalUrlSend=false
       //console.log("解密:data.length=%d, t=%d ; r=%d; rootURL=%s,signalUrlSend=%s; hash=%s",data.size,type,r,this.rootURL,this.signalUrlSend,arrayHashCode(data.a));	  // r==5271064 ???
       //console.log(" 1--data = %s ",bytesToHex(data.a))
  // if( true ) return;       
        for (var i = 0; i < data.size; i++)
            CNTVH5PlayerModule.HEAP8[r + i] = data.a[i];//get(i);//[o];
         // console.log("1-解密:CNTVH5PlayerModule.HEAP8.hash=%d",arrayHashCode(CNTVH5PlayerModule.HEAPU8,r,r+data.size));
        if (!this.signalUrlSend) {
            rootURL_len = this.rootURL.length;
            for (var i = 0; i < rootURL_len; i++)
                CNTVH5PlayerModule.HEAP8[r + data.size + i] = this.rootURL.charCodeAt(i);
            this.signalUrlSend = true;//!0;
        }
        var size; 
        switch( type ){
        	case 0:	
        		size = CNTVH5PlayerModule._nalplay2(r, data.size, rootURL_len);
        		//console.log("_nalplay2 : data.size=%d,rootURL_len=%d,hash=%d",data.size, rootURL_len,arrayHashCode(CNTVH5PlayerModule.HEAPU8,r,r+size));
        		break;
        	case 1:
				size = CNTVH5PlayerModule._vodplay(r, data.size, rootURL_len);
				break;
			default:
				return;
        }
 //       0 == t ? i = CNTVH5PlayerModule._nalplay2(r, e.byteLength, a) : 1 == t && (i = CNTVH5PlayerModule._vodplay(r, e.byteLength, a)),
 //*
 		for(var i=0;i<size;i++){
		   data.a[i] = CNTVH5PlayerModule.HEAP8[r + i];
		}
	//	*/
		 data.copyToSrc(0,size);
		//console.log("解密结果 : size=%d; hash=%s; n=%d",size,arrayHashCode(data.a),n);
		//console.log("解密结果 : size=%d; hash=%s",size,arrayHashCode(data.a));
		//console.log(" 1--data = %s ",bytesToHex(data.a))
		data.checkSrcMapsEq();
        //n = new Uint8Array(i);
        //for (var l = 0; l < n.byteLength; l++)
         //   n[l] = CNTVH5PlayerModule.HEAP8[r + l]
    } finally
    {
    	if(r!==null){
			CNTVH5PlayerModule._jsfree(r);
			//console.log("_jsfree r=%d",r);
		} 
	}
    // catch (e) {
	//	console.trace(e);
	//}
    //console.log(" 解密结果 : n.length=%d, t=%d",n.length,t);
   // return CNTVH5PlayerModule._jsfree(r),
   // r = null,
   // n	
}, //decryptAVCNALu 



parsePAT:function (data, offset) {
	//console.log("_parsePAT : offset=%d",offset);	
      // skip the PSI header and parse the first PMT entry
      return (data[offset + 10] & 0x1F) << 8 | data[offset + 11];
      //logger.log('PMT PID:'  + this._pmtId);
}, // parsePAT

//function vo

/*
mpegSupported : true;isSampleAes: false
*/
parsePMT:function (data, offset, mpegSupported, isSampleAes){
      var sectionLength,
          tableEnd,
          programInfoLength,
          pid,
          result = { audio: -1, avc: -1, id3: -1, isAAC: true };
      sectionLength = (data[offset + 1] & 0x0f) << 8 | data[offset + 2];
      tableEnd = offset + 3 + sectionLength - 4;
      // to determine where the table is, we have to figure out how
      // long the program info descriptors are
      programInfoLength = (data[offset + 10] & 0x0f) << 8 | data[offset + 11];
      //console.log(" [_parsePMT] : offset=%d,mpegSupported=%s,isSampleAes=%s",offset, mpegSupported, isSampleAes);
      // advance the offset to the first entry in the mapping table
      offset += 12 + programInfoLength;
      while (offset < tableEnd) {
        pid = (data[offset + 1] & 0x1F) << 8 | data[offset + 2];
        switch (data[offset]) {
          case 0xcf:
            // SAMPLE-AES AAC
            if (!isSampleAes) {
             // _logger.logger.log('unkown stream type:' + data[offset]);
              break;
            }
          /* falls through */

          // ISO/IEC 13818-7 ADTS AAC (MPEG-2 lower bit-rate audio)
          case 0x0f:
            //logger.log('AAC PID:'  + pid);
            if (result.audio === -1) {
              result.audio = pid;
            }
            break;

          // Packetized metadata (ID3)
          case 0x15:
            //logger.log('ID3 PID:'  + pid);
            if (result.id3 === -1) {
              result.id3 = pid;
            }
            break;

          case 0xdb:
            // SAMPLE-AES AVC
            if (!isSampleAes) {
              //_logger.logger.log('unkown stream type:' + data[offset]);
              break;
            }
          /* falls through */

          // ITU-T Rec. H.264 and ISO/IEC 14496-10 (lower bit-rate video)
          case 0x1b:
            //logger.log('AVC PID:'  + pid);
            if (result.avc === -1) {
              result.avc = pid;
            }
            break;

          // ISO/IEC 11172-3 (MPEG-1 audio)
          // or ISO/IEC 13818-3 (MPEG-2 halved sample rate audio)
          case 0x03:
          case 0x04:
            //logger.log('MPEG PID:'  + pid);
            if (!mpegSupported) {
              //logger.info('MPEG audio found, not supported in this browser for now');
            } else if (result.audio === -1) {
              result.audio = pid;
              result.isAAC = false;
            }
            break;

          case 0x24:
            //logger.warn('HEVC stream type found, not supported for now');
            break;

          default:
            //_logger.logger.log('unkown stream type:' + data[offset]);
            break;
        }
        // move to the next table entry
        // skip past the elementary stream descriptors, if present
        offset += ((data[offset + 3] & 0x0F) << 8 | data[offset + 4]) + 5;
      }
      return result;
}, //parsePMT

getTimestamp:function (data,index){
	return (data[index+0] & 0x0E) * 536870912 + // 1 << 29
          (data[index+1] & 0xFF) * 4194304 + // 1 << 22
          (data[index+2] & 0xFE) * 16384 + // 1 << 14
          (data[index+3] & 0xFF) * 128 + // 1 << 7
          (data[index+4] & 0xFE) / 2;
}, //getTimestamp
/*
 @param stream : ByteArray 
*/
parsePES:function (stream){
	//stream.checkSrcMapsEq();
	var size = stream.size;
	var data = stream.a;
	var pesPrefix = (data[0] << 16) + (data[1] << 8) + data[2];
	if( pesPrefix!=1 )
	   return null;
	var streamId = data[3]&0xff,
      pesLen = (data[4] << 8) + data[5];
    if (pesLen>0 && pesLen > size - 6) {
		return null;
	}   	
    var pesPts,pesDts;
	var cryptFlags = data[6],
        pesFlags = data[7];
        if (pesFlags & 0xC0) {
          /* PES header described here : http://dvd.sourceforge.net/dvdinfo/pes-hdr.html
              as PTS / DTS is 33 bit we cannot use bitwise operator in JS,
              as Bitwise operators treat their operands as a sequence of 32 bits */
          pesPts = this.getTimestamp(data,9);
          // check if greater than 2^32 -1
          if (pesPts > 4294967295) {
            // decrement 2^33
            pesPts -= 8589934592;
          }
          if (pesFlags & 0x40) {
            pesDts = this.getTimestamp(data,14);;
            // check if greater than 2^32 -1
            if (pesDts > 4294967295) {
              // decrement 2^33
              pesDts -= 8589934592;
            }
            if (pesPts - pesDts > 60 * 90000) {
              //_logger.logger.warn(Math.round((pesPts - pesDts) / 90000) + 's delta between PTS and DTS, align them');
              pesPts = pesDts;
            }
          } else {
            pesDts = pesPts;
          }
        } //if (pesFlags & 0xC0)
        var pesHdrLen = data[8];
        // 9 bytes : 6 bytes for PES header + 3 bytes for PES extension
        var payloadStartOffset = pesHdrLen + 9;

		if (pesLen>0) {
              // payload size : remove PES header + PES extension
           pesLen -= pesHdrLen + 3;
        }
        //var size = data.size;
        var payloadSize = pesLen>0 ? pesLen : size-payloadStartOffset;
        var pesData = new ByteArray(payloadSize);
        pesData.appendFromByteArray(stream,payloadStartOffset,payloadStartOffset+payloadSize);
        /*
		pesData.append(data, payloadStartOffset,payloadStartOffset+payloadSize);
		var srcMaps = stream.getSrcMaps(payloadStartOffset,payloadSize);
		//var start = 0;
		for(var j=0;j<srcMaps.length;j++){
			var m = srcMaps[j];
	//console.log("parsePES.srcMap[%d] : %d / %d => %d ; payloadStartOffset=%d,payloadSize=%d;m.buf.byteLength=%d",j,m.start,m.count,m.srcStart,payloadStartOffset,payloadSize,m.buf.byteLength);	
			pesData.setSrcMap(m.start-payloadStartOffset,m.count,m.buf,m.srcStart);
			//start += m.count;
		} */
		//pesData.checkSrcMapsEq();	
        return { data: pesData, pts: pesPts, dts: pesDts}; 
}, //parsePES

//var decryptAVCNALUType;// = -1;// = false, decode1 = false;
/*
 pes : parsePES 的返回结果 : { data: pesData, pts: pesPts, dts: pesDts}; 
*/
parseAVCPES:function (pes,last){
	var pesData = pes.data; // ByteArray
	var a = pesData.a;
	if( a.length!=pesData.size )
		throw new Error("???");
//console.log("parseAVCPES...");		
	//pesData.checkSrcMapsEq();	
	//console.log("parseAVCPES : payload.length=%d , hash=%d",a.length,arrayHashCode(a));
	var units = this.parseAVCNALu(pesData); 
	var push;
	var avcSample = this.AvcSample;
	units.forEach( (unit)=> {
		
		unit.data.checkSrcMapsEq();
		//console.log("unit.type=%d, this.decryptAVCNALUType=%d",unit.type,this.decryptAVCNALUType)
		if( (unit.type==1 || unit.type==5) && this.decryptAVCNALUType>=0) {
			this.decryptAVCNALu(unit.data,this.decryptAVCNALUType);
		}
          //if( trace) {
          	//console.log("  unit.type=%d",unit.type);
          //}
    	  
        switch (unit.type) {
          //NDR
          case 1:
            push = true;
            /*if (debug && avcSample) {
              avcSample.debug += 'NDR ';
            } */
            avcSample.frame = true;
            // retrieve slice type by parsing beginning of NAL unit (follow H264 spec, slice_header definition) to detect keyframe embedded in NDR
            //var data = unit.data;
            //if (data.length > 4) 
            if (unit.data.size > 4)
            {
				//console.log("new _expGolomb2.default(data) : data.length=%d",data.length);
              var sliceType = 0;// ??? new _expGolomb2.default(data).readSliceType();
              // 2 : I slice, 4 : SI slice, 7 : I slice, 9: SI slice
              // SI slice : A slice that is coded using intra prediction only and using quantisation of the prediction samples.
              // An SI slice can be coded such that its decoded samples can be constructed identically to an SP slice.
              // I slice: A slice that is not an SI slice that is decoded using intra prediction only.
              //if (sliceType === 2 || sliceType === 7) {
              if (sliceType === 2 || sliceType === 4 || sliceType === 7 || sliceType === 9) {
                avcSample.key = true;
              }
            }
            break;
          //IDR
          case 5:
            push = true;
            // handle PES not starting with AUD
            if (!avcSample) {
              avcSample = this.AvcSample = this._createAVCSample(true, pes.pts, pes.dts, '');
            }
            /*if (debug) {
              avcSample.debug += 'IDR ';
            } */
            avcSample.key = true;
            avcSample.frame = true;
            break;
          //SEI
          case 6:
            push = true;
            /*
            if (debug && avcSample) {
              avcSample.debug += 'SEI ';
            }
            expGolombDecoder = new _expGolomb2.default(_this.discardEPB(unit.data));

            // skip frameType
            expGolombDecoder.readUByte();

            var payloadType = 0;
            var payloadSize = 0;
            var endOfCaptions = false;
            var b = 0;

            while (!endOfCaptions && expGolombDecoder.bytesAvailable > 1) {
              payloadType = 0;
              do {
                b = expGolombDecoder.readUByte();
                payloadType += b;
              } while (b === 0xFF);

              // Parse payload size.
              payloadSize = 0;
              do {
                b = expGolombDecoder.readUByte();
                payloadSize += b;
              } while (b === 0xFF);

              // TODO: there can be more than one payload in an SEI packet...
              // TODO: need to read type and size in a while loop to get them all
              if (payloadType === 4 && expGolombDecoder.bytesAvailable !== 0) {

                endOfCaptions = true;

                var countryCode = expGolombDecoder.readUByte();

                if (countryCode === 181) {
                  var providerCode = expGolombDecoder.readUShort();

                  if (providerCode === 49) {
                    var userStructure = expGolombDecoder.readUInt();

                    if (userStructure === 0x47413934) {
                      var userDataType = expGolombDecoder.readUByte();

                      // Raw CEA-608 bytes wrapped in CEA-708 packet
                      if (userDataType === 3) {
                        var firstByte = expGolombDecoder.readUByte();
                        var secondByte = expGolombDecoder.readUByte();

                        var totalCCs = 31 & firstByte;
                        var byteArray = [firstByte, secondByte];

                        for (i = 0; i < totalCCs; i++) {
                          // 3 bytes per CC
                          byteArray.push(expGolombDecoder.readUByte());
                          byteArray.push(expGolombDecoder.readUByte());
                          byteArray.push(expGolombDecoder.readUByte());
                        }

                        _this._insertSampleInOrder(_this._txtTrack.samples, { type: 3, pts: pes.pts, bytes: byteArray });
                      }
                    }
                  }
                }
              } else if (payloadSize < expGolombDecoder.bytesAvailable) {
                for (i = 0; i < payloadSize; i++) {
                  expGolombDecoder.readUByte();
                }
              }
            }
            */ 
            break;
          //SPS
          case 7:
            push = true;
            /*if (debug && avcSample) {
              avcSample.debug += 'SPS ';
            } */
        	//console.log("数据加密 = %s",unit.data.a[2]);//&1)!=0); // false
            if( unit.data.a[2]&1 ){
				this.decryptAVCNALUType = 0;
            	//unit.data.a[2] &= 0xfe;	unit.data.copyToSrc(2,1);
				////254&e.data[2];
            }
				/*
            if (!track.sps) {
              expGolombDecoder = new _expGolomb2.default(unit.data);
              var config = expGolombDecoder.readSPS();
              track.width = config.width;
              track.height = config.height;
              track.pixelRatio = config.pixelRatio;
              track.sps = [unit.data];
 //console.log("?????????_this._duration=%s",_this._duration);              
              track.duration = _this._duration; //9.97667
              var codecarray = unit.data.subarray(1, 4);
              var codecstring = 'avc1.';
              for (i = 0; i < 3; i++) {
                var h = codecarray[i].toString(16);
                if (h.length < 2) {
                  h = '0' + h;
                }
                codecstring += h;
              }
              track.codec = codecstring;
            }
              */
            break;
          //PPS
          case 8:
            push = true;
            /*if (debug && avcSample) {
              avcSample.debug += 'PPS ';
            } 
            if (!track.pps) {
              track.pps = [unit.data];
            }*/
            break;
          // AUD
          case 9:
            push = false;
            if (avcSample) {
            	//if( trace )
            	/*
            	{
            	var s = "";
            	for(var j=0;j<avcSample.units.length;j++){
            		s += ","+avcSample.units[j].data.length+":"+_this.arrayHashCode(avcSample.units[j].data);
            	}
            	console.log("pushAccesUnit - %s",s);
               } */
              this.pushAccesUnit(avcSample);//, track);
            }
            avcSample = this.AvcSample = this._createAVCSample(false, pes.pts, pes.dts,"");// debug ? 'AUD ' : '');
            break;
          // Filler Data
          case 12:
            push = false;
            break;
          
          case 25:
			  //decode1 = 1 === unit.data.a[1];
			  if( 1==unit.data.a[1] && this.decryptAVCNALUType==-1 )
			  	this.decryptAVCNALUType = 1; 
			  this.decryptAVCNALu(unit.data,1);
        	//  console.log("unit.type = %d",unit.type);
        	  //CNTVH5PlayerModule : e.data=R(e.data,1);
        	  break;
          default:
            push = false;
            if (avcSample) {
              //avcSample.debug += 'unknown NAL ' + unit.type + ' ';
            }
            break;
        }
        if (avcSample && push) {
          var _units = avcSample.units;
          _units.push(unit);
        }
      }); // for each Units
      // if last PES packet, push samples
      if (last && avcSample) {
        this.pushAccesUnit(avcSample);//, track);
        this.avcTrackSamples = null;
      }
},//parseAVCPES

_createAVCSample:function (key, pts, dts, debug) {
      return { key: key, pts: pts, dts: dts, units: [], debug: debug };
},

//var thisAvcSample;
//var avcTrackSamples;
pushAccesUnit:function (avcSample){
	var samples = this.avcTrackSamples;//avcTrack.samples;
        var nbSamples = samples.length;
        // only push AVC sample if starting with a keyframe is not mandatory OR
        //    if keyframe already found in this fragment OR
        //       keyframe found in last fragment (track.sps) AND
        //          samples already appended (we already found a keyframe in this fragment) OR fragment is contiguous
        if (/*!this.config.forceKeyFrameOnDiscontinuity ||
                 avcSample.key === true
        		|| avcTrack.sps && (nbSamples || this.contiguous)
        	 */
			  true	
        	) {
          avcSample.id = nbSamples;
          samples.push(avcSample);
        } else {
          // dropped samples, track it
       //   avcTrack.dropped++;
        }
 },//pushAccesUnit
 
_getLastNalUnit:function (){
	var avcSample = this.AvcSample,
          lastUnit = void 0;
      // try to fallback to previous sample if current one is empty
      if (!avcSample || avcSample.units.length === 0) {
        //var track = this._avcTrack,
         //   samples = track.samples;
        var samples = this.avcTrackSamples;    
        avcSample = samples[samples.length - 1];
      }
      if (avcSample) {
        var units = avcSample.units;
        lastUnit = units[units.length - 1];
      }
      return lastUnit;
},
//var naluState = 0;
/*
  @param pesData : ByteArray , ==pes.data
  @return 
*/
parseAVCNALu:function (pesData){
	var array = pesData.a;
	var i = 0,
          len = array.byteLength,
          value,
          overflow,
         // track = this._avcTrack,
          state = this.naluState || 0,
          lastState = state;
      var units = [],
          unit,
          unitType,
          lastUnitStart = -1,
          lastUnitType;
      //logger.log('PES:' + Hex.hexDump(array));

      if (state === -1) {
        // special use case where we found 3 or 4-byte start codes exactly at the end of previous PES packet
        lastUnitStart = 0;
        // NALu type is value read from offset 0
        lastUnitType = array[0] & 0x1f;
        state = 0;
        i = 1;
      }

      while (i < len) {
        value = array[i++];
        // optimization. state 0 and 1 are the predominant case. let's handle them outside of the switch/case
        if (!state) {
          state = value ? 0 : 1;
          continue;
        }
        if (state === 1) {
          state = value ? 0 : 2;
          continue;
        }
        // here we have state either equal to 2 or 3
        if (!value) {
          state = 3;
        } else if (value === 1) {
          if (lastUnitStart >= 0) {
			var unitData = new ByteArray(i - state - 1 - lastUnitStart);
			//unitData.append(array,lastUnitStart, i - state - 1);
			unitData.appendFromByteArray(pesData,lastUnitStart, i - state - 1);
           // unit = { data: array.subarray(lastUnitStart, i - state - 1), type: lastUnitType };
		   unit = { data: unitData, type: lastUnitType };
            //logger.log('pushing NALU, type/size:' + unit.type + '/' + unit.data.byteLength);
            units.push(unit);
          } else {
            // lastUnitStart is undefined => this is the first start code found in this PES packet
            // first check if start code delimiter is overlapping between 2 PES packets,
            // ie it started in last packet (lastState not zero)
            // and ended at the beginning of this PES packet (i <= 4 - lastState)
            var lastUnit = this._getLastNalUnit();
            if (lastUnit) {
              if (lastState && i <= 4 - lastState) {
                // start delimiter overlapping between PES packets
                // strip start delimiter bytes from the end of last NAL unit
                // check if lastUnit had a state different from zero
                if (lastUnit.state) {
                  // strip last bytes
                  //lastUnit.data = lastUnit.data.subarray(0, lastUnit.data.byteLength - lastState);
				  lastUnit.data = lastUnit.data.subArray(0, lastUnit.data.size - lastState); 
                }
              }
              // If NAL units are not starting right at the beginning of the PES packet, push preceding data into previous NAL unit.
              overflow = i - state - 1;
              if (overflow > 0) {
                //logger.log('first NALU found with overflow:' + overflow);
				/*
                var tmp = new Uint8Array(lastUnit.data.byteLength + overflow);
                tmp.set(lastUnit.data, 0);
                tmp.set(array.subarray(0, overflow), lastUnit.data.byteLength);
                lastUnit.data = tmp;
				*/
				//lastUnit.data.append(array,0, overflow);
				lastUnit.data.appendFromByteArray(pesData,0,overflow);
              }
            }
          }
          // check if we can read unit type
          if (i < len) {
            unitType = array[i] & 0x1f;
            //logger.log('find NALU @ offset:' + i + ',type:' + unitType);
            lastUnitStart = i;
            lastUnitType = unitType;
            state = 0;
          } else {
            // not enough byte to read unit type. let's read it on next PES parsing
            state = -1;
          }
        } else {
          state = 0;
        }
      }
      if (lastUnitStart >= 0 && state >= 0) {
		var unitData = new ByteArray(len-lastUnitStart);
		//unitData.append(array,lastUnitStart,len);
		unitData.appendFromByteArray(pesData,lastUnitStart,len);
        //unit = { data: array.subarray(lastUnitStart, len), type: lastUnitType, state: state };
		unit = { data: unitData, type: lastUnitType, state: state };
        units.push(unit);
        //logger.log('pushing NALU, type/size/state:' + unit.type + '/' + unit.data.byteLength + '/' + state);
      }
      // no NALu found
      if (units.length === 0) {
        // append pes.data to previous NAL unit
        var _lastUnit = this._getLastNalUnit();
        if (_lastUnit) {
			/*
          var _tmp = new Uint8Array(_lastUnit.data.byteLength + array.byteLength);
          _tmp.set(_lastUnit.data, 0);
          _tmp.set(array, _lastUnit.data.byteLength);
          _lastUnit.data = _tmp;
		  */
		  //_lastUnit.data.append(array,0,array.length);
		  _lastUnit.data.appendFromByteArray(pesData,0,array.length);
        }
      }
      this.naluState = state;
      return units;
},

/*
@param data Uint8Array
/ldncctvwbcd/cdrmldcctv13_1_720P/101667.ts?wsApp=HLS
*/
decryptTS:function (data,rootURL){
	if( data instanceof ArrayBuffer ){
		data = new Uint8Array(data);
	}
	this.signalUrlSend = false;
	this.rootURL = rootURL;
	this.naluState = 0;
	this.AvcSample = null;
	this.decryptAVCNALUType = -1;
	//callOnCNTVH5PlayerModuleLoaded(()=>this._decryptTS(data));
//_decryptTS:function (data){
	var avcSamples = this.avcTrackSamples = [];
	var len = data.length - data.length%188;
	var avcId =  -1,audioId = -1,id3Id = -1 , pmtId= -1;
	var unknownPIDs = false;
	var pmtParsed = false;
	var avcData = null;
	var pes;
	// loop through TS packets
	for(var start=0;start<len;start += 188) {
		if( data[start] != 0x47 ) // 71
		{
			//console.log("data[%d] = %d",start,data[start]);
			continue;
		} 
        var  stt = !!(data[start + 1] & 0x40);  // 起始 payloadStartIndicator
          // pid is a 13-bit field starting at the last bit of TS[1]
        var  pid = ((data[start + 1] & 0x1f) << 8) + data[start + 2];
        var  atf = (data[start + 3] & 0x30) >> 4;
          // if an adaption field is present, its length is specified by the fifth byte of the TS packet header.
          if (atf > 1) {
			  // 含附加字段
            offset = start + 5 + data[start + 4];
            // continue if there is only adaptation field
            if (offset === start + 188) {
              continue;
            }
          } else {
            offset = start + 4;
         }
        switch (pid) {
			case avcId:
				//console.log(" AVC packets ...");
				if (stt) {
					// 先 解析前一个 PES
					if( avcData && (pes = this.parsePES(avcData)) ){
						this.parseAVCPES(pes, false);
					}
					avcData = new ByteArray();
				}
				if( avcData ){
					avcData.append(data,offset, start + 188);
					var count = start + 188-offset;
					avcData.setSrcMap(avcData.size-count,count,data.buffer,offset);
				}
				break;
			case audioId:
				break;
			case id3Id:
				break;
			case 0:
              if (stt) {
                offset += data[offset] + 1;
				//包头后需要除去一个字节才是有效数据
              }
              pmtId =  this.parsePAT(data, offset);
             // console.log("pmtId=%d",pmtId);
              break;
            case pmtId:
              if (stt) {
                offset += data[offset] + 1;
              }
              var parsedPIDs = this.parsePMT(data, offset, true,false); 
              //this.typeSupported.mpeg === true || this.typeSupported.mp3 === true, this.sampleAes != null);
			   avcId = parsedPIDs.avc;
			   audioId = parsedPIDs.audio;
			   id3Id = parsedPIDs.id3;
			   if (unknownPIDs && !pmtParsed) {
                _logger.logger.log('reparse from beginning');
                unknownPIDs = false;
                // we set it to -188, the += 188 in the for loop will reset start to 0
                start = -188;
              }
              pmtParsed =  true;
             // console.log(" pmtParsed: avcId=%s,audioId=%s,id3Id=%s,pmtId=%s",avcId,audioId,id3Id,pmtId);  
              break;
            case 17:
            case 0x1fff:
              break;
            default:
				 console.log("unknownPID : %d",pid);
              unknownPIDs = true;
              break;
		} //  switch (pid)
	} // for TS packets
	if (avcData && (pes = this.parsePES(avcData))) {
          this.parseAVCPES(pes, true);
         // this.mediaTracks.avcTrack.pesData = null;
     }
     
     //if(_debug) printAvcSamples(avcSamples);
}
} //CCTVTSDecript.prototype