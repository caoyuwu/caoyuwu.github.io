/*
 * 参考：
 *  https://blog.csdn.net/qq405935987/article/details/89926626
     https://github.com/hahaha108/iqiyi-parser/blob/master/js/tencent.js
 */
/*
 * https://v.qq.com/x/cover/mzc00200phpj1bv/x00407hjyyt.html
   ??? ( https://m.v.qq.com/play.html?cid=mzc00200phpj1bv&vid=x00407hjyy ) 
 */

var GUID = "0f058e1f60b75cb1605a215ea21862a3";
//0f058e1f60b75cb1605a215ea21862a3
var document = {
    //URL: "https://v.qq.com/x/cover/bzfkv5se8qaqel2/j002024w2wg.html",
    referrer: ""

};

var navigator = {
    userAgent: WEB_UserAgent,
    appCodeName: "Mozilla",
    appName: "Netscape",
    platform: "Win32"
};

var window = this;

function w() {
    Fa = new Int8Array(Ea),
        Ha = new Int16Array(Ea),
        Ja = new Int32Array(Ea),
        Ga = new Uint8Array(Ea),
        Ia = new Uint16Array(Ea),
        Ka = new Uint32Array(Ea),
        La = new Float32Array(Ea),
        Ma = new Float64Array(Ea);
}
function d(a) {
    var b = Oa;
    return Oa = Oa + a + 15 & -16,
        b
}
function e(a, b) {
    b || (b = Da);
    var c = a = Math.ceil(a / b) * b;
    return c
}
function i(a, b, c, d, e){
    function f(a) {
        return "string" === b ? k(a) : "boolean" === b ? Boolean(a) : a
    }
    var i = wasmobject.exports._getckey //h(a)
        , j = []
        , l = 0;
    // if (g("array" !== b, 'Return type should not be "array".'),
    //     d)
    if (d)
        for (var m = 0; m < d.length; m++) {
            var n = $a[c[m]];
            // n ? (0 === l && (l = Ub()),
            n ? (0 === l && (l = Ub()),
                j[m] = n(d[m])) : j[m] = d[m]
        }
    var o = i.apply(null, j);
    return o = f(o),
    0 !== l && Tb(l),
        o

}

function k(a, b) {
    if (0 === b || !a)
        return "";
    for (var c, d = 0, e = 0; ; ) {
        // if (g(a + e < db),
        if (
            c = Ga[a + e >> 0],
                d |= c,
            0 == c && !b)
            break;
        if (e++,
        b && e == b)
            break
    }
    b || (b = e);
    var f = "";
    if (d < 128) {
        for (var h, i = 1024; b > 0; )
            h = String.fromCharCode.apply(String, Ga.subarray(a, a + Math.min(b, i))),
                f = f ? f + h : h,
                a += i,
                b -= i;
        return f
    }
    return m(a)
}
function o(a, b, c) {
    return n(a, Ga, b, c)
}
function n(a, b, c, d) {
    if (!(d > 0))
        return 0;
    for (var e = c, f = c + d - 1, g = 0; g < a.length; ++g) {
        var h = a.charCodeAt(g);
        if (h >= 55296 && h <= 57343) {
            var i = a.charCodeAt(++g);
            h = 65536 + ((1023 & h) << 10) | 1023 & i
        }
        if (h <= 127) {
            if (c >= f)
                break;
            b[c++] = h
        } else if (h <= 2047) {
            if (c + 1 >= f)
                break;
            b[c++] = 192 | h >> 6,
                b[c++] = 128 | 63 & h
        } else if (h <= 65535) {
            if (c + 2 >= f)
                break;
            b[c++] = 224 | h >> 12,
                b[c++] = 128 | h >> 6 & 63,
                b[c++] = 128 | 63 & h
        } else if (h <= 2097151) {
            if (c + 3 >= f)
                break;
            b[c++] = 240 | h >> 18,
                b[c++] = 128 | h >> 12 & 63,
                b[c++] = 128 | h >> 6 & 63,
                b[c++] = 128 | 63 & h
        } else if (h <= 67108863) {
            if (c + 4 >= f)
                break;
            b[c++] = 248 | h >> 24,
                b[c++] = 128 | h >> 18 & 63,
                b[c++] = 128 | h >> 12 & 63,
                b[c++] = 128 | h >> 6 & 63,
                b[c++] = 128 | 63 & h
        } else {
            if (c + 5 >= f)
                break;
            b[c++] = 252 | h >> 30,
                b[c++] = 128 | h >> 24 & 63,
                b[c++] = 128 | h >> 18 & 63,
                b[c++] = 128 | h >> 12 & 63,
                b[c++] = 128 | h >> 6 & 63,
                b[c++] = 128 | 63 & h
        }
    }
    return b[c] = 0,
    c - e
}
function Tb(){
    return wasmobject.exports.stackRestore.apply(null, arguments)

}
function Ub(){
    return wasmobject.exports.stackSave.apply(null, arguments)

}
function Sb(){
    return wasmobject.exports.stackAlloc.apply(null, arguments)

}
function Pb(){
    return wasmobject.exports._malloc.apply(null, arguments)
}
function P() {      // function 20( )
    function p(a) {
        for (var b = 0, c = 0; c < a.length; ++c) {
            var d = a.charCodeAt(c);
            d >= 55296 && d <= 57343 && (d = 65536 + ((1023 & d) << 10) | 1023 & a.charCodeAt(++c)),
                d <= 127 ? ++b : b += d <= 2047 ? 2 : d <= 65535 ? 3 : d <= 2097151 ? 4 : d <= 67108863 ? 5 : 6
        }
        return b
    }
    function a(a) {
        return a ? a.length > 48 ? a.substr(0, 48) : a : ""
    }
    function b() {
        var b = document.URL
            , c = window.navigator.userAgent.toLowerCase()
            , d = "";
        document.referrer.length > 0 && (d = document.referrer);
        try {
            0 == d.length && opener.location.href.length > 0 && (d = opener.location.href)
        } catch (e) {}
        var f = window.navigator.appCodeName
            , g = window.navigator.appName
            , h = window.navigator.platform;
        return b = a(b),
            d = a(d),
            c = a(c),
        b + "|" + c + "|" + d + "|" + f + "|" + g + "|" + h
    }
    var c = b()
        , d = p(c) + 1
        , e = Pb(d);
    return o(c, e, d + 1),
        e
}
function C() {
    return db
}

var $a = {
    string: function(a) {
        var b = 0;
        if (null !== a && void 0 !== a && 0 !== a) {
            var c = (a.length << 2) + 1;
            b = Sb(c),
                o(a, b, c)
        }
        return b
    },
    array: function(a) {
        var b = Sb(a.length);
        return K(a, b),
            b
    },
};




//////////////////////////////// init global var

var Da = 16;

var Ea, Fa, Ga, Ha, Ia, Ja, Ka, La, Ma, Na, Oa, Pa, Qa, Ra, Sa, Ta, Ua, Va = {
    "f64-rem": function(a, b) {
        return a % b
    },
    "debugger": function() {}
}, Wa = (new Array(0), 1024) ;

Na = Oa = Qa = Ra = Sa = Ta = Ua = 0,
    Pa = !1;
var cb = 5242880 , db = 16777216, ab = 65536;


var wasmMemory = new WebAssembly.Memory({
    initial: db / ab,
    maximum: db / ab
});
Ea = wasmMemory.buffer;

w();
Ja[0] = 1668509029;
Ha[1] = 25459;

var eb = []
    , fb = []
    , gb = []
    , hb = []
    , ib = !1
    , jb = !1;

Na = Wa,
    Oa = Na + 6928,
    fb.push();

Oa += 16;

Ua = d(4),
Qa = Ra = e(Oa),
Sa = Qa + cb,
Ta = e(Sa),
Ja[Ua >> 2] = Ta,
Pa = !0;

////////////////////////////////// wasm env ///////////////////////////////////////

var fun_ = function(){};

wasm_env = {
    abort: fun_,
    assert: fun_,
    enlargeMemory: fun_,
    getTotalMemory: C,
    abortOnCannotGrowMemory: fun_,
    abortStackOverflow: fun_,
    nullFunc_ii: fun_,
    nullFunc_iiii: fun_,
    nullFunc_v: fun_,
    nullFunc_vi: fun_,
    nullFunc_viiii: fun_,
    nullFunc_viiiii: fun_,
    nullFunc_viiiiii: fun_,
    invoke_ii: fun_,
    invoke_iiii: fun_,
    invoke_v: fun_,
    invoke_vi: fun_,
    invoke_viiii: fun_,
    invoke_viiiii: fun_,
    invoke_viiiiii: fun_,
    __ZSt18uncaught_exceptionv: fun_,
    ___cxa_find_matching_catch: fun_,
    ___gxx_personality_v0: fun_,
    ___lock: fun_,
    ___resumeException: fun_,
    ___setErrNo: fun_,
    ___syscall140: fun_,
    ___syscall146: fun_,
    ___syscall54: fun_,
    ___syscall6: fun_,
    ___unlock: fun_,
    _abort: fun_,
    _emscripten_memcpy_big: fun_,
    _get_unicode_str: P,              // function 20( ) => P( )
    flush_NO_FILESYSTEM: fun_,
    DYNAMICTOP_PTR: 7968,               //Ua
    tempDoublePtr: 7952,                //rb
    STACKTOP: 7984,                     //Ra
    STACK_MAX: 5250864,                 //Sa

    memoryBase: 1024,
    tableBase: 0,
    memory: wasmMemory,
    table: new WebAssembly.Table({
        initial: 99,
        maximum: 99,
        element: "anyfunc"
    })
};

var importObject = {
    'env': wasm_env,
    'asm2wasm': {
        "f64-rem": function(a, b) {
            return a % b
        },
        "debugger": function() {}
    },
    'global': {
        NaN: NaN,
        Infinity: 1 / 0
    },
    "global.Math": Math,
    // "parent": {};

};


///////////////////////////////// load wasm ///////////////////////////////////////
//const fs = require('fs');
//var wasm_data = fs.readFileSync('./js/tx-ckey.wasm')
(function(){
	var p = _scriptURL.lastIndexOf("/");
	var wasmUrl = _scriptURL.substring(0,p+1)+"tx-ckey.wasm";
	var wasm_data = utils.httpGetAsByteArray(wasmUrl,null,0);
	print("wasmUrl="+wasmUrl);
	print("wasm_data.length = "+wasm_data.byteLength);
	var buffer = new Uint8Array(wasm_data);
	var module = new WebAssembly.Module(buffer);
	window.wasmobject = new WebAssembly.Instance(module,importObject);
	print("============window.wasmobject = "+window.wasmobject);
	/*
	WebAssembly.compile(buffer).then(module=>{
		print("============module="+module);
		WebAssembly.instantiate(module,importObject).then(o=>{
			window.wasmobject = o;
			print("============window.wasmobject = "+window.wasmobject);
		});
	});
	*/
})();

/*
var conn =  new XMLHttpRequest();
conn.open("GET", "tx-ckey.wasm", true);
conn.responseType = "arraybuffer";
conn.onreadystatechange = function(){
	if (conn.readyState==4 && conn.status==200){
		var wasm_data = conn.response ;
		var buffer = new Uint8Array(wasm_data);
		//WebAssembly.compile
		//window.wasmobject = new WebAssembly.Instance(new WebAssembly.Module(buffer), importObject);
		//WebAssembly.instantiate
		WebAssembly.compile(buffer).then(module=>{
			WebAssembly.instantiate(module,importObject).then(o=>{
				window.wasmobject = o;
			});
			//window.wasmobject = new WebAssembly.Instance(module,importObject);
		});
	}
};
conn.send();
*/

// function setnavigator(URL, referrer, userAgent, appCodeName, appName, platform){
//     navigator = {
//         userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
//         appCodeName: "Mozilla",
//         appName: "Netscape",
//         platform: "Win32"
//     };
//     window.navigator = navigator;
//
// }


function setdocument(URL, referrer){
    document.URL = URL;
    document.referrer = referrer;
}

// encryptVer = "9.1"
// 10201,"3.5.57",vid,"",guid,tm
function _getckey(platform, appVer, vid, empty_str="", guid, tm){
    var _args = [platform, appVer, vid, empty_str="", guid, tm];
    var c = ['number', 'string', 'string', 'string', 'string', 'number'];
    return i('getckey', 'string', c, _args, undefined)

}

/*
 * getCKey("x00407hjyyt",1632904922)
 */
function getCKey(vid,tm){
	document.URL = "https://v.qq.com/x/cover//"+vid+".html";
	return _getckey("10201","3.5.57",vid,"",GUID,tm);
}
/*
 * getCKey2("mzc00200phpj1bv","x00407hjyyt",1644483914)
 */
function getCKey2(cid,vid,tm){
	document.URL = "https://v.qq.com/x/cover/"+cid+"/"+vid+".html";
	document.referrer = document.URL; 
	return _getckey("10201","3.5.57",vid,"",GUID,tm);
}

//  playerID, guid
function createGUID(a) {
    a = a || 32;
    for (var b = "", c = 1; c <= a; c++) {
        var d = Math.floor(16 * Math.random()).toString(16);
        b += d
    }
    return b
}


var Platform = 10201;//"10201";
var Sdtfrom = "v1010";
var AppVer = "3.5.57";//"appVer"
//final static String GUID = "0f058e1f60b75cb1605a215ea21862a3"; // 抓包获取
var FLOWID = "91060de785ede481a9dacb3a63c5fa30_10201";// 抓包获取
/*
 * url = mzc00200phpj1bv/x00407hjyyt
 * qqvideo://mzc00200phpj1bv/x00407hjyyt
 */
function prepareMediaSource(url,params){
	print("window.wasmobject = "+window.wasmobject);
	if( !window.wasmobject ){
		return null;
	}
	id = utils.getUrlHostAndPath(url);
	var p = id.indexOf("/");
	if( p<0 )
		return null;
	var cid = id.substring(0,p), vid = id.substring(p+1);
	var tm = Math.floor(new Date().getTime()/1000); 
	print("cid="+cid+", vid="+vid+" , tm="+tm);
	var cKey = getCKey2(cid,vid,tm);
	print("cKey="+cKey);
	
	var vinfoparam = {
			"spsrt": 1,
			"charge": 0,
			"defaultfmt": "auto",
			"otype": "ojson",
			"guid": GUID,
			"flowid": FLOWID,
			"platform": Platform,//"10201");
			"sdtfrom": Sdtfrom,//"v1010");
			"defnpayver": "1",
			"appVer": AppVer,//"3.5.57");
			"host":"v.qq.com",
			"ehost":"https://v.qq.com/x/cover/"+cid+"/"+vid+".html",
			"refer":"v.qq.com",
			"sphttps":1,
			"tm":tm,
			"spwm":4,
			"logintoken":'{"main_login":"","openid":"","appid":"","access_token":"","vuserid":"","vusession":""}',
			"vid":vid,
			"defn":"",
			"fhdswitch":0,
			"show1080p":1,
			"isHLS":1,
			"dtype":3,
			"sphls":2,
			"spgzip":1,
			"dlver":2,
			"drm":32,
			"encryptVer":"9.1",
			"cKey":cKey,
			"fp2p":"1",
			"spadseg":""			
	}; 
	var postVals = {
			"buid": "vinfoad",
			"vinfoparam" : utils.appendUrlParameters("",vinfoparam)
	};
	var headers = {
			"Referer": "https://y.qq.com/",
			"Accept-Encoding":"deflate"
	};
	var text = utils.httpPostAsString(
			"https://vd.l.qq.com/proxyhttp",
			headers,
			"text/plain",
			JSON.stringify(postVals),
			0x400
	);
	//print(text);
	var retVal = JSON.parse(text);
	if( !retVal.vinfo )
		return null;
	var vinfo = JSON.parse(retVal.vinfo);
	return vinfo.vl.vi[0].ul.ui[0].url;
}

