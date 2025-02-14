var key,wb;//, wb="data..."; [CYW]
var cntvWasmURL;
var a0_0x31c9 = ['call', 'noExitRuntime', 'streaming\x20uses\x20moz-chunked-arraybuffer\x20which\x20is\x20no\x20longer\x20supported;\x20TODO:\x20rewrite\x20using\x20fetch()', 'err', 'Program\x20terminated\x20with\x20exit(', 'ActiveXObject', 'delete', 'timeout', 'userAgent', 'func', 'isMozilla', 'i16', 'opera', 'table', 'emscripten_filesystem', 'memory', ',\x20type\x20', 'instantiateWasm', 'preInit', 'arguments', 'establishStackSpace', 'decodeAudioData', '__memory_base', 'hasOwnProperty', '_GetAudioARG', 'setu64', 'HEAPF32', 'HEAPU32', 'deleteObjectStore', 'loop', 'dynCall_v', 'setStatus', 'gain', 'loaded', 'wasm-instantiate', 'open', 'uncaughtException', 'Not\x20Found', 'send', 'Running...', 'grow', 'versions', 'inspect', 'normalize', 'preloadedAudios', 'indexOf', 'Assertion\x20failed:\x20', 'shown', 'missing\x20function:\x20emscripten_is_main_runtime_thread', 'HEAPU8', ',\x20make\x20sure\x20it\x20is\x20exported', 'readonly', 'toString', 'fromCharCode', 'createChannelSplitter', 'falling\x20back\x20to\x20ArrayBuffer\x20instantiation', 'unshift', 'binary', 'isMicromessenger', 'argv', 'slice', 'dynCall_vii', '_GetDecryptAudio', 'float', 'statusText', '_memmove', 'Module.instantiateWasm\x20callback\x20failed\x20with\x20error:\x20', 'data:application/octet-stream;base64,', 'destination', 'connect', 'Instance', 'wasmMemory', 'function', 'readFileSync', 'undefined', '_nalplay2', 'dislinkerDest', 'onAbort', 'filter', 'src', 'exec', 'micromessenger', 'asm', 'safari', 'utf-16le', './this.program', 'dynCall_vi', 'onerror', 'dynCall_ii', 'title', 'abort', 'createGain', 'pop', 'wasm\x20streaming\x20compile\x20failed:\x20', 'splice', 'no\x20url\x20specified!', 'dynCall_iiii', 'dynCall_iidiiii', 'instantiateStreaming', 'masterEnd', 'xhrs', 'responseType', 'headSetGain', 'isIE', 'HEAPF64', '_malloc', 'withCredentials', 'varargs', 'implementation', 'createMediaElementSource', 'EM_IDB_DELETE', 'ontimeout', 'extraStackTrace', '(no\x20stack\x20trace\x20available)', 'masterFirst', ').\x20Build\x20with\x20-s\x20ASSERTIONS=1\x20for\x20more\x20info.', 'no\x20data', 'join', 'HEAP32', 'double', 'chrome', 'warn', 'substr', 'name', 'FILES', '_memcpy', 'Memory', 'arraybuffer', 'startsWith', 'createObjectStore', '_vodplay', 'dynCall_jiji', 'exit', 'library_fetch_init', 'arg', 'status', 'amd', 'printChar', 'buffers', 'preloadedImages', 'GET', 'Cannot\x20call\x20unknown\x20function\x20', 'Error\x20with\x20decoding\x20audio\x20data', 'charCodeAt', 'onload', 'then', 'thisProgram', 'splitPath', 'postRun', 'charAt', 'isOpera', 'IndexedDB\x20is\x20not\x20open', 'get', 'bind', '[Emscripten\x20Module\x20object]', 'objectStoreNames', 'href', 'error', 'failed\x20to\x20load\x20wasm\x20binary\x20file\x20at\x20\x27', 'OOM', 'Payload\x20Too\x20Large', 'decode', 'TOTAL_MEMORY', 'Table', 'disconnect', 'currentScript', 'onRuntimeInitialized', 'getBrowser', 'split', 'toLowerCase', 'getChannelData', 'result', 'printErr', 'i64', '___errno_location', 'stackSave', 'subarray', 'HEAP8', 'setRequestHeader', 'target', 'failed\x20to\x20asynchronously\x20prepare\x20wasm:\x20', 'anyfunc', 'dbInstance', '_memset', '_jsmalloc', 'normalizeArray', 'byteLength', 'replace', 'IndexedDB\x20not\x20available!', 'apply', 'print', 'push', 'onprogress', 'responseText', '_sbrk', 'min', 'node', 'i32', 'createConvolver', 'objectStore', 'webkitAudioContext', 'quit', 'isSafari', 'lastIndexOf', '_jsfree', 'floor', 'connectDestLoudspeaker', 'getStreamFromFD', 'wasmBinary', 'readwrite', 'createDocument', 'CNTVModule', 'value', 'readyState', 'log', 'utf8', 'addFunction', 'string', 'set', 'onupgradeneeded', 'AudioContext', 'dynCall_', 'response', 'openDatabase', 'isChrome', 'prototype', 'boolean', 'object', 'shift', 'isFirefox', 'buffer', 'stackAlloc', 'stack', 'overrideMimeType', 'number', 'max', 'louderSpeakerGain', 'errno', 'Module', 'length', 'monitorRunDependencies', 'run', '__table_base', 'instantiate', 'onsuccess', 'preRun', 'ErrnoError', '_emscripten_replace_memory', 'invalid\x20type\x20for\x20setValue:\x20', '_fflush', 'concat'];
(function(_0x335562, _0x31c93e) {
    var _0x30775e = function(_0x5b0e34) {
        while (--_0x5b0e34) {
            _0x335562['push'](_0x335562['shift']());
        }
    };
    _0x30775e(++_0x31c93e);
}(a0_0x31c9, 0x1e1));
var a0_0x3077 = function(_0x335562, _0x31c93e) {
    _0x335562 = _0x335562 - 0x0;
    var _0x30775e = a0_0x31c9[_0x335562];
    return _0x30775e;
};
var _0x2b5eef = a0_0x3077
  , CNTVModule = function() {
    var _0x4d4134 = a0_0x3077  // function(?,?){}
      , _0x5b0e34 = typeof document !== _0x4d4134('0x5f') && document[_0x4d4134('0xba')] ? document['currentScript'][_0x4d4134('0x64')] : undefined;
      // _0x5b0e34 = document.currentScript.src
      //console.log("_0x4d4134('0x64')=%s, _0x5b0e34=%s, _0x4d4134=%s",_0x4d4134('0x64'),_0x5b0e34,_0x4d4134);
      // _0x5b0e34 = "..../h5.worker.js"
    return function(_0x102ce4) {
        var _0x2fc976 = _0x4d4134;
        _0x102ce4 = _0x102ce4 || {}; // _0x102ce4==module
        var _0xb36ec9 = cctvModule = typeof _0x102ce4 !== 'undefined' ? _0x102ce4 : {}, _0x1fc59 = {}, _0x108c99;
        for (_0x108c99 in cctvModule) {
            cctvModule[_0x2fc976('0x2c')](_0x108c99) && (_0x1fc59[_0x108c99] = cctvModule[_0x108c99]);
        }
        var _0x4ad165 = []
          , _0x6e568c = _0x2fc976('0x6a')   // "./this.program"
          , _0x349f12 = function(_0x4063f6, _0x62e8a1) {
            throw _0x62e8a1;
        }
          , _0x2c925e = ![]
          , _0x33f8e7 = ![]
          , _0x49d4df = ![]
          , _0x1cf4c0 = ![]
          , _0x2345f8 = ![];
        _0x2c925e = typeof window === _0x2fc976('0xf8'),  // true
        _0x33f8e7 = typeof importScripts === _0x2fc976('0x5d'),
        _0x1cf4c0 = typeof process === _0x2fc976('0xf8') && typeof process[_0x2fc976('0x3e')] === _0x2fc976('0xf8') && typeof process[_0x2fc976('0x3e')][_0x2fc976('0xd9')] === _0x2fc976('0xee'), // false
        _0x49d4df = _0x1cf4c0 && !_0x2c925e && !_0x33f8e7, // false
        _0x2345f8 = !_0x2c925e && !_0x49d4df && !_0x33f8e7;  // false
        var _0x43bdaf = '';
        function _0x1650cb(_0x25ab45) {
            if (cctvModule['locateFile'])
                return cctvModule['locateFile'](_0x25ab45, _0x43bdaf);
            return _0x43bdaf + _0x25ab45;
        }
        var _0x5aae32, _0x5b1047, _0x2e6c48, _0x2fe184;
        if (_0x49d4df) {
            _0x43bdaf = __dirname + '/';
            var _0x425d1e, _0x4e06c2;
            _0x5aae32 = function _0x7085e2(_0x35049e, _0x586ec9) {
                var _0xb40c = _0x2fc976, _0x2a2cd8;
                if (!_0x425d1e)
                    _0x425d1e = require('fs');
                if (!_0x4e06c2)
                    _0x4e06c2 = require('path');
                return _0x35049e = _0x4e06c2['normalize'](_0x35049e),
                _0x2a2cd8 = _0x425d1e[_0xb40c('0x5e')](_0x35049e),
                _0x586ec9 ? _0x2a2cd8 : _0x2a2cd8[_0xb40c('0x49')]();
            }
            ,
            _0x2e6c48 = function _0x197414(_0x5113cf) {
                var _0x42c827 = _0x2fc976
                  , _0x18646b = _0x5aae32(_0x5113cf, !![]);
                return !_0x18646b[_0x42c827('0x0')] && (_0x18646b = new Uint8Array(_0x18646b)),
                _0x2448e1(_0x18646b[_0x42c827('0x0')]),
                _0x18646b;
            }
            ,
            process['argv'][_0x2fc976('0x9')] > 0x1 && (_0x6e568c = process[_0x2fc976('0x50')][0x1][_0x2fc976('0xd0')](/\\/g, '/')),
            _0x4ad165 = process['argv'][_0x2fc976('0x51')](0x2),
            process['on'](_0x2fc976('0x39'), function(_0x47d82a) {
                if (!(_0x47d82a instanceof _0x26a576))
                    throw _0x47d82a;
            }),
            process['on']('unhandledRejection', _0x4b6282),
            _0x349f12 = function(_0x2289d0) {
                var _0x361cbc = _0x2fc976;
                process[_0x361cbc('0x99')](_0x2289d0);
            }
            ,
            cctvModule[_0x2fc976('0x3f')] = function() {
                var _0x2c9abd = _0x2fc976;
                return _0x2c9abd('0xaf');
            }
            ;
        } else {
            if (_0x2345f8) {
                typeof read != _0x2fc976('0x5f') && (_0x5aae32 = function _0x1b409f(_0x12f443) {
                    return read(_0x12f443);
                }
                );
                _0x2e6c48 = function _0x43e787(_0x2f4af5) {
                    var _0x28b0a8 = _0x2fc976, _0x2241a5;
                    if (typeof readbuffer === 'function')
                        return new Uint8Array(readbuffer(_0x2f4af5));
                    return _0x2241a5 = read(_0x2f4af5, _0x28b0a8('0x4e')),
                    _0x2448e1(typeof _0x2241a5 === _0x28b0a8('0xf8')),
                    _0x2241a5;
                }
                ;
                if (typeof scriptArgs != _0x2fc976('0x5f'))
                    _0x4ad165 = scriptArgs;
                else
                    typeof arguments != _0x2fc976('0x5f') && (_0x4ad165 = arguments);
                typeof quit === _0x2fc976('0x5d') && (_0x349f12 = function(_0x3b16f6) {
                    quit(_0x3b16f6);
                }
                );
                if (typeof print !== _0x2fc976('0x5f')) {
                    if (typeof console === _0x2fc976('0x5f'))
                        console = {};
                    console[_0x2fc976('0xeb')] = print,
                    console[_0x2fc976('0x8e')] = console[_0x2fc976('0xb2')] = typeof printErr !== 'undefined' ? printErr : print;
                }
            } else {
                if (_0x2c925e || _0x33f8e7) {
                    if (_0x33f8e7)
                        _0x43bdaf = self['location'][_0x2fc976('0xb1')];
                    else
                        document[_0x2fc976('0xba')] && (_0x43bdaf = document[_0x2fc976('0xba')]['src']);
                        // document.currentScript.src = ".../h5.workser.js"
                    _0x5b0e34 && (_0x43bdaf = _0x5b0e34), //".../h5.workser.js"
                    _0x43bdaf[_0x2fc976('0x42')]('blob:') !== 0x0 ?
                    	 _0x43bdaf = _0x43bdaf[_0x2fc976('0x8f')](0x0, _0x43bdaf['lastIndexOf']('/') + 0x1) // http://localhost/demo-web/~tmp/cntv/"
                    	 : _0x43bdaf = '',
                    // ".../h5.workser.js".indexOf("blob:")
                    // ".../h5.workser.js".substr(0,lastIndexOf('/'))
                    _0x5aae32 = function _0xa192cd(_0x2aa276) {
                        var _0x328471 = _0x2fc976
                          , _0x58732f = new XMLHttpRequest();
                        return _0x58732f['open'](_0x328471('0xa1'), _0x2aa276, ![]),
                        _0x58732f[_0x328471('0x3b')](null),
                        _0x58732f[_0x328471('0xd6')];
                    }
                    ,
                    _0x33f8e7 && (_0x2e6c48 = function _0x52b52e(_0x4f7d52) {
                        var _0x5efe34 = _0x2fc976
                          , _0x159eb9 = new XMLHttpRequest();
                        return _0x159eb9['open']('GET', _0x4f7d52, ![]),
                        _0x159eb9[_0x5efe34('0x7a')] = _0x5efe34('0x94'),
                        _0x159eb9[_0x5efe34('0x3b')](null),
                        new Uint8Array(_0x159eb9[_0x5efe34('0xf3')]);
                    }
                    ),
                    _0x5b1047 = function _0x10380b(_0x1a32aa, _0x302d95, _0x2a4a01) {
                        var _0x2aa5cf = _0x2fc976
                          , _0x2d83da = new XMLHttpRequest();
                        _0x2d83da['open'](_0x2aa5cf('0xa1'), _0x1a32aa, !![]),
                        _0x2d83da[_0x2aa5cf('0x7a')] = 'arraybuffer',
                        _0x2d83da['onload'] = function _0x1f82ea() {
                            var _0x10b898 = _0x2aa5cf;
                            if (_0x2d83da['status'] == 0xc8 || _0x2d83da[_0x10b898('0x9c')] == 0x0 && _0x2d83da['response']) {
                                _0x302d95(_0x2d83da['response']);
                                return;
                            }
                            _0x2a4a01();
                        }
                        ,
                        _0x2d83da[_0x2aa5cf('0x6c')] = _0x2a4a01,
                        _0x2d83da['send'](null);
                    }
                    ,
                    _0x2fe184 = function(_0x20257e) {
                        var _0x11e388 = _0x2fc976;
                        document[_0x11e388('0x6e')] = _0x20257e;
                    }
                    ;
                } else {}
            }
        }
        var _0x4f566b = cctvModule[_0x2fc976('0xd3')] || console[_0x2fc976('0xeb')][_0x2fc976('0xae')](console)
                      // console.log.bind(console)
          , _0x5a9f7a = cctvModule[_0x2fc976('0xc1')] || console[_0x2fc976('0x8e')][_0x2fc976('0xae')](console);
                     // console.warn.bind(console)
        for (_0x108c99 in _0x1fc59) {
            _0x1fc59['hasOwnProperty'](_0x108c99) && (cctvModule[_0x108c99] = _0x1fc59[_0x108c99]);
        }
        _0x1fc59 = null;
        if (cctvModule[_0x2fc976('0x28')])
            _0x4ad165 = cctvModule[_0x2fc976('0x28')];
        if (cctvModule[_0x2fc976('0xa7')])  // thisProgram
            _0x6e568c = cctvModule[_0x2fc976('0xa7')];
        if (cctvModule['quit'])
            _0x349f12 = cctvModule[_0x2fc976('0xde')];  // param.quit
        var _0x481bb7 = 0x10;
        function _0x21dbfc(_0x2a52cb) {
            var _0x5579ca = _0x4829b9[_0x308fd2 >> 0x2]
              , _0x14db9a = _0x5579ca + _0x2a52cb + 0xf & -0x10;
            return _0x14db9a > _0x3e20dd() && _0x4b6282(),
            _0x4829b9[_0x308fd2 >> 0x2] = _0x14db9a,
            _0x5579ca;
        }
        function _0x45e6c5(_0x359c1b) {
            var _0x51a531 = _0x2fc976;
            switch (_0x359c1b) {
            case 'i1':
            case 'i8':
                return 0x1;
            case _0x51a531('0x20'):
                return 0x2;
            case _0x51a531('0xda'):
                return 0x4;
            case 'i64':
                return 0x8;
            case _0x51a531('0x54'):
                return 0x4;
            case _0x51a531('0x8c'):
                return 0x8;
            default:
                {
                    if (_0x359c1b[_0x359c1b[_0x51a531('0x9')] - 0x1] === '*')
                        return 0x4;
                    else {
                        if (_0x359c1b[0x0] === 'i') {
                            var _0x5b3454 = parseInt(_0x359c1b['substr'](0x1));
                            return _0x2448e1(_0x5b3454 % 0x8 === 0x0, 'getNativeTypeSize\x20invalid\x20bits\x20' + _0x5b3454 + _0x51a531('0x25') + _0x359c1b),
                            _0x5b3454 / 0x8;
                        } else
                            return 0x0;
                    }
                }
            }
        }
        function _0x2c463c(_0x327a8a) {
            var _0x2e661e = _0x2fc976;
            if (!_0x2c463c[_0x2e661e('0x44')])
                _0x2c463c['shown'] = {};
            !_0x2c463c[_0x2e661e('0x44')][_0x327a8a] && (_0x2c463c[_0x2e661e('0x44')][_0x327a8a] = 0x1,
            _0x5a9f7a(_0x327a8a));
        }
        var _0x5dcec8 = {
            'f64-rem': function(_0x2300df, _0x2f5ca3) {
                return _0x2300df % _0x2f5ca3;
            },
            'debugger': function() {}
        }
          , _0x23be15 = 0x1
          , _0x2f186e = new Array(0xe);
        function _0x2be248(_0x156b7e, _0x2a34cf) {
            var _0x108619 = _0x2fc976
              , _0x288f33 = [0x1, 0x0, 0x1, 0x60]
              , _0x3f2210 = _0x2a34cf[_0x108619('0x51')](0x0, 0x1)
              , _0x200b93 = _0x2a34cf[_0x108619('0x51')](0x1)
              , _0x4599a3 = {
                'i': 0x7f,
                'j': 0x7e,
                'f': 0x7d,
                'd': 0x7c
            };
            _0x288f33['push'](_0x200b93[_0x108619('0x9')]);
            for (var _0x458629 = 0x0; _0x458629 < _0x200b93[_0x108619('0x9')]; ++_0x458629) {
                _0x288f33[_0x108619('0xd4')](_0x4599a3[_0x200b93[_0x458629]]);
            }
            _0x3f2210 == 'v' ? _0x288f33['push'](0x0) : _0x288f33 = _0x288f33['concat']([0x1, _0x4599a3[_0x3f2210]]);
            _0x288f33[0x1] = _0x288f33[_0x108619('0x9')] - 0x2;
            var _0x260227 = new Uint8Array([0x0, 0x61, 0x73, 0x6d, 0x1, 0x0, 0x0, 0x0]['concat'](_0x288f33, [0x2, 0x7, 0x1, 0x1, 0x65, 0x1, 0x66, 0x0, 0x0, 0x7, 0x5, 0x1, 0x1, 0x66, 0x0, 0x0]))
              , _0x265275 = new WebAssembly[(_0x108619('0x8'))](_0x260227)
              , _0x3334a2 = new WebAssembly[(_0x108619('0x5b'))](_0x265275,{
                'e': {
                    'f': _0x156b7e
                }
            })
              , _0x4765cb = _0x3334a2['exports']['f'];
            return _0x4765cb;
        }
        function _0x58e857(_0x5c896f, _0x195d45) {
            var _0x54a28d = 0x0;
            for (var _0x218a08 = _0x54a28d; _0x218a08 < _0x54a28d + 0xe; _0x218a08++) {
                if (!_0x2f186e[_0x218a08])
                    return _0x2f186e[_0x218a08] = _0x5c896f,
                    _0x23be15 + _0x218a08;
            }
            throw 'Finished\x20up\x20all\x20reserved\x20function\x20pointers.\x20Use\x20a\x20higher\x20value\x20for\x20RESERVED_FUNCTION_POINTERS.';
        }
        var _0x59bda4 = {};
        function _0x5a4cf9(_0x2563b9, _0x5f4dff, _0x3c745d) {
            var _0x443a26 = _0x2fc976;
            return _0x3c745d && _0x3c745d['length'] ? cctvModule['dynCall_' + _0x2563b9][_0x443a26('0xd2')](null, [_0x5f4dff][_0x443a26('0x14')](_0x3c745d)) : cctvModule[_0x443a26('0xf2') + _0x2563b9][_0x443a26('0x15')](null, _0x5f4dff);
        }
        var _0x4e266b = 0x0, _0x191bf5 = function(_0x11a813) {
            _0x4e266b = _0x11a813;
        }, _0x581003 = function() {
            return _0x4e266b;
        }, _0x41a5ad;
        if (cctvModule.wasmBinary) //[_0x2fc976('0xe5')]
            _0x41a5ad = cctvModule.wasmBinary //['wasmBinary'];
        typeof WebAssembly !== 'object' && _0x5a9f7a('no\x20native\x20wasm\x20support\x20detected');
                 //  console.warn("No x20native ")
        function _0x2b3e17(_0x15d14e, _0x47c171, _0x5a1496, _0x23baa1) {
            var _0x40447b = _0x2fc976;
            _0x5a1496 = _0x5a1496 || 'i8';
            if (_0x5a1496[_0x40447b('0xaa')](_0x5a1496[_0x40447b('0x9')] - 0x1) === '*')
                _0x5a1496 = 'i32';
            switch (_0x5a1496) {
            case 'i1':
                _0x465e31[_0x15d14e >> 0x0] = _0x47c171;
                break;
            case 'i8':
                _0x465e31[_0x15d14e >> 0x0] = _0x47c171;
                break;
            case _0x40447b('0x20'):
                _0x47f88b[_0x15d14e >> 0x1] = _0x47c171;
                break;
            case 'i32':
                _0x4829b9[_0x15d14e >> 0x2] = _0x47c171;
                break;
            case _0x40447b('0xc2'):
                _0x39793c = [_0x47c171 >>> 0x0, (_0x15c3b8 = _0x47c171,
                +_0x24c7d4(_0x15c3b8) >= 0x1 ? _0x15c3b8 > 0x0 ? (_0x198021(+_0x185964(_0x15c3b8 / 0x100000000), 0xffffffff) | 0x0) >>> 0x0 : ~~+_0x22387d((_0x15c3b8 - +(~~_0x15c3b8 >>> 0x0)) / 0x100000000) >>> 0x0 : 0x0)],
                _0x4829b9[_0x15d14e >> 0x2] = _0x39793c[0x0],
                _0x4829b9[_0x15d14e + 0x4 >> 0x2] = _0x39793c[0x1];
                break;
            case _0x40447b('0x54'):
                _0x23a0fb[_0x15d14e >> 0x2] = _0x47c171;
                break;
            case 'double':
                _0x43973f[_0x15d14e >> 0x3] = _0x47c171;
                break;
            default:
                _0x4b6282(_0x40447b('0x12') + _0x5a1496);
            }
        }
        var _0x54893d, _0xac0049, _0x3f003c = ![], _0x5e924d = 0x0;
        function _0x2448e1(_0x104700, _0x361836) {
            var _0x3082c9 = _0x2fc976;
            !_0x104700 && _0x4b6282(_0x3082c9('0x43') + _0x361836);
        }
        function _0x4b5094(_0x4ee178) {
            var _0x47d7b9 = _0x2fc976
              , _0x570cbe = cctvModule['_' + _0x4ee178];
            return _0x2448e1(_0x570cbe, _0x47d7b9('0xa2') + _0x4ee178 + _0x47d7b9('0x47')),
            _0x570cbe;
        }
        function _0x544aa0(_0x21cb67, _0x4c60e0, _0x12bcc1, _0x2023c6, _0x3155c5) {
            var _0x51af6b = _0x2fc976
              , _0xc348ea = {
                'string': function(_0x109316) {
                    var _0x13ea09 = a0_0x3077
                      , _0x3d4d90 = 0x0;
                    if (_0x109316 !== null && _0x109316 !== undefined && _0x109316 !== 0x0) {
                        var _0x1a0ed5 = (_0x109316[_0x13ea09('0x9')] << 0x2) + 0x1;
                        _0x3d4d90 = _0x1c6ef8(_0x1a0ed5),
                        _0x17bce3(_0x109316, _0x3d4d90, _0x1a0ed5);
                    }
                    return _0x3d4d90;
                },
                'array': function(_0x1ffcb9) {
                    var _0x3b2a4b = a0_0x3077
                      , _0xd4ee71 = _0x1c6ef8(_0x1ffcb9[_0x3b2a4b('0x9')]);
                    return _0x1d5754(_0x1ffcb9, _0xd4ee71),
                    _0xd4ee71;
                }
            };
            function _0x44b887(_0x5894c3) {
                var _0x5930bf = a0_0x3077;
                if (_0x4c60e0 === 'string')
                    return _0x525f44(_0x5894c3);
                if (_0x4c60e0 === _0x5930bf('0xf7'))
                    return Boolean(_0x5894c3);
                return _0x5894c3;
            }
            var _0x17addf = _0x4b5094(_0x21cb67)
              , _0xe6981d = []
              , _0x5a0c87 = 0x0;
            if (_0x2023c6)
                for (var _0x23f722 = 0x0; _0x23f722 < _0x2023c6[_0x51af6b('0x9')]; _0x23f722++) {
                    var _0x201a9a = _0xc348ea[_0x12bcc1[_0x23f722]];
                    if (_0x201a9a) {
                        if (_0x5a0c87 === 0x0)
                            _0x5a0c87 = _0x1903cd();
                        _0xe6981d[_0x23f722] = _0x201a9a(_0x2023c6[_0x23f722]);
                    } else
                        _0xe6981d[_0x23f722] = _0x2023c6[_0x23f722];
                }
            var _0x2e9f90 = _0x17addf[_0x51af6b('0xd2')](null, _0xe6981d);
            _0x2e9f90 = _0x44b887(_0x2e9f90);
            if (_0x5a0c87 !== 0x0)
                _0x17a7a0(_0x5a0c87);
            return _0x2e9f90;
        }
        var _0x8dc848 = 0x3
          , _0x47b9b5 = typeof TextDecoder !== _0x2fc976('0x5f') ? new TextDecoder(_0x2fc976('0xec')) : undefined;
        function _0x2e8711(_0x237df7, _0x44601f, _0x4e60cd) {
            var _0x2f2725 = _0x2fc976
              , _0x35e345 = _0x44601f + _0x4e60cd
              , _0x4db26e = _0x44601f;
            while (_0x237df7[_0x4db26e] && !(_0x4db26e >= _0x35e345))
                ++_0x4db26e;
            if (_0x4db26e - _0x44601f > 0x10 && _0x237df7[_0x2f2725('0xc5')] && _0x47b9b5)
                return _0x47b9b5[_0x2f2725('0xb6')](_0x237df7[_0x2f2725('0xc5')](_0x44601f, _0x4db26e));
            else {
                var _0x304c01 = '';
                while (_0x44601f < _0x4db26e) {
                    var _0x171426 = _0x237df7[_0x44601f++];
                    if (!(_0x171426 & 0x80)) {
                        _0x304c01 += String[_0x2f2725('0x4a')](_0x171426);
                        continue;
                    }
                    var _0x2e3f65 = _0x237df7[_0x44601f++] & 0x3f;
                    if ((_0x171426 & 0xe0) == 0xc0) {
                        _0x304c01 += String[_0x2f2725('0x4a')]((_0x171426 & 0x1f) << 0x6 | _0x2e3f65);
                        continue;
                    }
                    var _0x14103b = _0x237df7[_0x44601f++] & 0x3f;
                    (_0x171426 & 0xf0) == 0xe0 ? _0x171426 = (_0x171426 & 0xf) << 0xc | _0x2e3f65 << 0x6 | _0x14103b : _0x171426 = (_0x171426 & 0x7) << 0x12 | _0x2e3f65 << 0xc | _0x14103b << 0x6 | _0x237df7[_0x44601f++] & 0x3f;
                    if (_0x171426 < 0x10000)
                        _0x304c01 += String['fromCharCode'](_0x171426);
                    else {
                        var _0x16b71e = _0x171426 - 0x10000;
                        _0x304c01 += String['fromCharCode'](0xd800 | _0x16b71e >> 0xa, 0xdc00 | _0x16b71e & 0x3ff);
                    }
                }
            }
            return _0x304c01;
        }
        function _0x525f44(_0x2bcc86, _0x594776) {
            return _0x2bcc86 ? _0x2e8711(_0x57aba7, _0x2bcc86, _0x594776) : '';
        }
        function _0x40faa6(_0x158909, _0x5729ba, _0x1c0264, _0x4d92a9) {
            var _0x2b072a = _0x2fc976;
            if (!(_0x4d92a9 > 0x0))
                return 0x0;
            var _0x2638f0 = _0x1c0264
              , _0x350953 = _0x1c0264 + _0x4d92a9 - 0x1;
            for (var _0x5a4c16 = 0x0; _0x5a4c16 < _0x158909[_0x2b072a('0x9')]; ++_0x5a4c16) {
                var _0x296894 = _0x158909[_0x2b072a('0xa4')](_0x5a4c16);
                if (_0x296894 >= 0xd800 && _0x296894 <= 0xdfff) {
                    var _0x3260ef = _0x158909[_0x2b072a('0xa4')](++_0x5a4c16);
                    _0x296894 = 0x10000 + ((_0x296894 & 0x3ff) << 0xa) | _0x3260ef & 0x3ff;
                }
                if (_0x296894 <= 0x7f) {
                    if (_0x1c0264 >= _0x350953)
                        break;
                    _0x5729ba[_0x1c0264++] = _0x296894;
                } else {
                    if (_0x296894 <= 0x7ff) {
                        if (_0x1c0264 + 0x1 >= _0x350953)
                            break;
                        _0x5729ba[_0x1c0264++] = 0xc0 | _0x296894 >> 0x6,
                        _0x5729ba[_0x1c0264++] = 0x80 | _0x296894 & 0x3f;
                    } else {
                        if (_0x296894 <= 0xffff) {
                            if (_0x1c0264 + 0x2 >= _0x350953)
                                break;
                            _0x5729ba[_0x1c0264++] = 0xe0 | _0x296894 >> 0xc,
                            _0x5729ba[_0x1c0264++] = 0x80 | _0x296894 >> 0x6 & 0x3f,
                            _0x5729ba[_0x1c0264++] = 0x80 | _0x296894 & 0x3f;
                        } else {
                            if (_0x1c0264 + 0x3 >= _0x350953)
                                break;
                            _0x5729ba[_0x1c0264++] = 0xf0 | _0x296894 >> 0x12,
                            _0x5729ba[_0x1c0264++] = 0x80 | _0x296894 >> 0xc & 0x3f,
                            _0x5729ba[_0x1c0264++] = 0x80 | _0x296894 >> 0x6 & 0x3f,
                            _0x5729ba[_0x1c0264++] = 0x80 | _0x296894 & 0x3f;
                        }
                    }
                }
            }
            return _0x5729ba[_0x1c0264] = 0x0,
            _0x1c0264 - _0x2638f0;
        }
        function _0x17bce3(_0x7b0646, _0x15e784, _0x1e0929) {
            return _0x40faa6(_0x7b0646, _0x57aba7, _0x15e784, _0x1e0929);
        }
        function _0x50b22c(str) {
            var _0x13e525 = _0x2fc976
              , _0x9ae27f = 0x0;
 //console.log("求str字节数: str = %s",str);              
            for (var i = 0x0; i < str.length; ++i) {
                var c = str.charCodeAt(i);//[_0x13e525('0xa4')](i);
                if (c >= 0xd800 && c <= 0xdfff)
                    c = 0x10000 + ((c & 0x3ff) << 0xa) | str.charCodeAt(++i) & 0x3ff;
                if (c <= 0x7f)
                    ++_0x9ae27f;
                else {
                    if (c <= 0x7ff)
                        _0x9ae27f += 0x2;
                    else {
                        if (c <= 0xffff)
                            _0x9ae27f += 0x3;
                        else
                            _0x9ae27f += 0x4;
                    }
                }
            }
            return _0x9ae27f;
        }
        var _0xcd8ce2 = typeof TextDecoder !== 'undefined' ? new TextDecoder(_0x2fc976('0x69')) : undefined;
        function _0x1d5754(_0x5ee1fb, _0x5d0be8) {
            var _0xff2276 = _0x2fc976;
            _0x465e31[_0xff2276('0xef')](_0x5ee1fb, _0x5d0be8);
        }
        function _0x5d36c1(_0x18ed7c, _0x17c8a9, _0x17a700) {
            var _0x43dd5b = _0x2fc976;
            for (var _0x397e1a = 0x0; _0x397e1a < _0x18ed7c[_0x43dd5b('0x9')]; ++_0x397e1a) {
                _0x465e31[_0x17c8a9++ >> 0x0] = _0x18ed7c[_0x43dd5b('0xa4')](_0x397e1a);
            }
            if (!_0x17a700)
                _0x465e31[_0x17c8a9 >> 0x0] = 0x0;
        }
        var _0x3b4035 = 0x10000;
        function _0x665d98(_0x21b07b, _0x460d78) {
            return _0x21b07b % _0x460d78 > 0x0 && (_0x21b07b += _0x460d78 - _0x21b07b % _0x460d78),
            _0x21b07b;
        }
        var _0x5b6c8e, _0x465e31, _0x57aba7, _0x47f88b, _0x50d027, _0x4829b9, _0x5de9c1, _0x23a0fb, _0x43973f;
        function _0x47572c() {
            var _0x5b244c = _0x2fc976;
            cctvModule[_0x5b244c('0xc6')] = _0x465e31 = new Int8Array(_0x5b6c8e),
            cctvModule['HEAP16'] = _0x47f88b = new Int16Array(_0x5b6c8e),
            cctvModule[_0x5b244c('0x8b')] = _0x4829b9 = new Int32Array(_0x5b6c8e),
            cctvModule[_0x5b244c('0x46')] = _0x57aba7 = new Uint8Array(_0x5b6c8e),
            cctvModule['HEAPU16'] = _0x50d027 = new Uint16Array(_0x5b6c8e),
            cctvModule[_0x5b244c('0x30')] = _0x5de9c1 = new Uint32Array(_0x5b6c8e),
            cctvModule[_0x5b244c('0x2f')] = _0x23a0fb = new Float32Array(_0x5b6c8e),
            cctvModule[_0x5b244c('0x7d')] = _0x43973f = new Float64Array(_0x5b6c8e);
        }
        var _0x17a6ad = 0x6e10
          , _0x4df56b = 0x506e10
          , _0x308fd2 = 0x6df0
          , _0x41d97b = cctvModule[_0x2fc976('0xb7')] || 0x1000000;
        cctvModule[_0x2fc976('0x5c')] ? _0x54893d = cctvModule[_0x2fc976('0x5c')] 
                                // WebAssembly. Memory 
        		: _0x54893d = new WebAssembly[(_0x2fc976('0x93'))]({
            'initial': _0x41d97b / _0x3b4035
        });
        _0x54893d && (_0x5b6c8e = _0x54893d[_0x2fc976('0x0')]);
        _0x41d97b = _0x5b6c8e['byteLength'],
        _0x47572c(),
        _0x4829b9[_0x308fd2 >> 0x2] = _0x4df56b;
        function _0x47fc68(_0xaa4ac1) {
            var _0x3a9692 = _0x2fc976;
            while (_0xaa4ac1[_0x3a9692('0x9')] > 0x0) {
                var _0x3e0ad1 = _0xaa4ac1[_0x3a9692('0xf9')]();
                if (typeof _0x3e0ad1 == _0x3a9692('0x5d')) {
                    _0x3e0ad1();
                    continue;
                }
                var _0x40431b = _0x3e0ad1[_0x3a9692('0x1e')];
                typeof _0x40431b === _0x3a9692('0x4') ? _0x3e0ad1[_0x3a9692('0x9b')] === undefined ? cctvModule[_0x3a9692('0x33')](_0x40431b) : cctvModule[_0x3a9692('0x6b')](_0x40431b, _0x3e0ad1[_0x3a9692('0x9b')]) : _0x40431b(_0x3e0ad1[_0x3a9692('0x9b')] === undefined ? null : _0x3e0ad1[_0x3a9692('0x9b')]);
            }
        }
        var _0x4c2c24 = []
          , _0x1f67df = []
          , _0x4d1269 = []
          , _0x2dfbf8 = []
          , _0x481a00 = ![]
          , _0x447c4c = ![];
        function _0x17c213() {
            var _0x539e7e = _0x2fc976;
            if (cctvModule[_0x539e7e('0xf')]) {
                if (typeof cctvModule[_0x539e7e('0xf')] == _0x539e7e('0x5d'))
                    cctvModule[_0x539e7e('0xf')] = [cctvModule[_0x539e7e('0xf')]];
                while (cctvModule['preRun']['length']) {
                    _0x3fe0fa(cctvModule[_0x539e7e('0xf')][_0x539e7e('0xf9')]());
                }
            }
            _0x47fc68(_0x4c2c24);
        }
        function _0x292999() {
            _0x481a00 = !![],
            _0x47fc68(_0x1f67df);
        }
        function _0x791c70() {
            _0x47fc68(_0x4d1269);
        }
        function _0x32384d() {
            _0x447c4c = !![];
        }
        function _0x11cdcf() {
            var _0x1af57e = _0x2fc976;
            if (cctvModule['postRun']) {
                if (typeof cctvModule[_0x1af57e('0xa9')] == 'function')
                    cctvModule[_0x1af57e('0xa9')] = [cctvModule[_0x1af57e('0xa9')]];
                while (cctvModule[_0x1af57e('0xa9')][_0x1af57e('0x9')]) {
                    _0x2cce62(cctvModule[_0x1af57e('0xa9')][_0x1af57e('0xf9')]());
                }
            }
            _0x47fc68(_0x2dfbf8);
        }
        function _0x3fe0fa(_0x2fdb83) {
            var _0x74a3f2 = _0x2fc976;
            _0x4c2c24[_0x74a3f2('0x4d')](_0x2fdb83);
        }
        function _0x2cce62(_0x90ad98) {
            var _0x1da06a = _0x2fc976;
            _0x2dfbf8[_0x1da06a('0x4d')](_0x90ad98);
        }
        var _0x24c7d4 = Math['abs']
          , _0x22387d = Math['ceil']
          , _0x185964 = Math[_0x2fc976('0xe2')]
          , _0x198021 = Math[_0x2fc976('0xd8')]
          , _0x2a18c7 = 0x0
          , _0x24af9d = null
          , _0x1c8814 = null;
          // _0x192b02=="wasm-instantiate"
        function _0x52cfb9(_0x192b02) {
            var _0x1d7040 = _0x2fc976;
            _0x2a18c7++,
            cctvModule.monitorRunDependencies && cctvModule.monitorRunDependencies(_0x2a18c7);
            //cctvModule[_0x1d7040('0xa')] && cctvModule[_0x1d7040('0xa')](_0x2a18c7);
        }
        function _0x5b52c1(_0xb71180) {
            var _0x1cbb9b = _0x2fc976;
            _0x2a18c7--;
            cctvModule[_0x1cbb9b('0xa')] && cctvModule['monitorRunDependencies'](_0x2a18c7);
            if (_0x2a18c7 == 0x0) {
                _0x24af9d !== null && (clearInterval(_0x24af9d),
                _0x24af9d = null);
                if (_0x1c8814) {
                    var _0x22cecb = _0x1c8814;
                    _0x1c8814 = null,
                    _0x22cecb();
                }
            }
        }
        cctvModule[_0x2fc976('0xa0')] = {},
        cctvModule[_0x2fc976('0x41')] = {};
        var _0x4daebf = _0x2fc976('0x58');
        function _0x1943c6(_0x368750) {
            var _0x5065a4 = _0x2fc976;
            return String[_0x5065a4('0xf6')]['startsWith'] ? _0x368750[_0x5065a4('0x95')](_0x4daebf) 
            	: _0x368750[_0x5065a4('0x42')](_0x4daebf) === 0x0;
        }
        var _0x39b5da = wb; // "data:application/octet-stream;base64,AGFzbQEAAAABmwEWYAN......"
        if( wb ) {
        	!_0x1943c6(wb) && (wb = _0x1650cb(wb));
        }
        function _0x2ba513() {
            try {
                if (_0x41a5ad)
                    return new Uint8Array(_0x41a5ad);
                if (_0x2e6c48)
                    return _0x2e6c48(_0x39b5da);
                else
                    throw 'both\x20async\x20and\x20sync\x20fetching\x20of\x20the\x20wasm\x20failed';
            } catch (_0x3466f6) {
                _0x4b6282(_0x3466f6);
            }
        }
        function _0x274f60() {
			//return _0x2ba513();
			/*
			if( !wb ){
				var wasmData = utils.httpGetAsByteArray(cntvWasmURL||utils.toAbsoluteURL(_scriptURL,"cntv.wasm"),null,0x408);
				console.log("wasmData.length = %d",wasmData.byteLength);
				return new Promise(function(resolve,reject){
					resolve(wasmData);
				});
			} */
            var _0x16308a = _0x2fc976;
            if (!_0x41a5ad && (_0x2c925e || _0x33f8e7) && typeof fetch === 'function')
            {
                return fetch(wb, //_0x39b5da wb="data:application/
                 {
                    'credentials': 'same-origin'
                }).then(function(wbData) {
                  //  var _0x576071 = _0x16308a;
                    if (!wbData.ok)
                        throw "failed to load wasm binary file ";//_0x576071('0xb3') + _0x39b5da + '\x27';
                    return wbData.arrayBuffer();
                }).catch(function() {
                    return _0x2ba513();
                });
            }
            return new Promise(function(_0x521ee4, _0x438c7f) {
                _0x521ee4(_0x2ba513());
             }
             );
        }
        function _0x37b555(_0x24671e) {
            var _0x26e96a = _0x2fc976
              , _0xf3bcea = importObject = {
                'env': _0x24671e,
                'global': {
                    'NaN': NaN,
                    'Infinity': Infinity
                },
                'global.Math': Math,
                'asm2wasm': _0x5dcec8
            };
            /*
            */
            function _0x238c6b(instance, _0x12ae1a) {
                var _0x3501cf = a0_0x3077
                  , _0x163ba1 = instance.exports;// _0x208dd6['exports'];
                cctvModule.asm = _0x163ba1;
                //console.log("[DEBUG]@692设置 cctvModule.asm : _jsmalloc=%s",""+cctvModule.asm._jsmalloc);
                //cctvModule[_0x3501cf('0x67')] = _0x163ba1,
                _0x5b52c1(_0x3501cf('0x37'));
            }
            _0x52cfb9('wasm-instantiate');
            function _0x19f4ec(_0x250af2) // 
            {
				/*
				  _0x250af2={module:Mudule,instance:Instance}  : WebAssembly.instantiate 的返回
				  _0x250af2.instance.exports
				 */
				//console.log("on WebAssembly.instantiate 成功: _0x250af2.instance.exports._jsmalloc=%s",""+_0x250af2.instance.exports._jsmalloc);
                _0x238c6b(_0x250af2['instance']);
            }
            // _0x167b49==_0x19f4ec
            function _0x3e0e4d(_0x167b49) {
				
                var _0x38d62f = a0_0x3077;
                if( !wb ){
					// [CYW]
					var wasmData = utils.httpGetAsByteArray(cntvWasmURL||utils.toAbsoluteURL(_scriptURL,"h5.worker.wasm"),null,0x408);
					//console.log("2-wasmData.length = %d",wasmData.byteLength);
					var module = new WebAssembly.Module(wasmData);
					var instance = new WebAssembly.Instance(module,importObject);
					_0x238c6b(instance);
					return;
				}
                /*
                var module = new WebAssembly.Module(buffer);
                new WebAssembly.Instance(module,importObject);
                */
                //return _0x274f60()[_0x38d62f('0xa6')](function(_0x1f343b) {
					/*
					  _0x274f60() => fetch("data:...") 
					*/
				return _0x274f60().then(function(_0x1f343b) {
                   // var _0x32ab46 = _0x38d62f;
                  // console.log("成功加载到  wasm : length=%d",_0x1f343b.byteLength); // 215854
                    //return WebAssembly[_0x32ab46('0xd')](_0x1f343b, _0xf3bcea); // WebAssembly.instantiate(ArrayBuffer(215854),importObject)
                    return WebAssembly.instantiate(_0x1f343b, importObject); // WebAssembly.instantiate(ArrayBuffer(215854),importObject)
                }).then( _0x167b49,  // on WebAssembly.instantiate 成功 =>_0x19f4ec
					function(_0x56c6db) {
				//console.log("WebAssembly.instantiate 失败 ");		
                    var _0xe6c6fb = _0x38d62f;
                    _0x5a9f7a(_0xe6c6fb('0xc9') + _0x56c6db),
                    _0x4b6282(_0x56c6db);
                });
            }
            function _0x19bd8c() {
                var _0x30f4ba = a0_0x3077;
                 // WebAssembly.instantiateStreaming
                if (!_0x41a5ad && typeof WebAssembly[_0x30f4ba('0x77')] === _0x30f4ba('0x5d') && !_0x1943c6(_0x39b5da) && typeof fetch === _0x30f4ba('0x5d'))
                    fetch(_0x39b5da, // "data.....,AGFz..." 
                    {
                        'credentials': 'same-origin'
                    })[_0x30f4ba('0xa6')](function(_0x225cb3) {
                        var _0x964050 = _0x30f4ba
                          , _0x317d7c = WebAssembly[_0x964050('0x77')](_0x225cb3, _0xf3bcea);
                        return _0x317d7c[_0x964050('0xa6')](_0x19f4ec, function(_0x43b665) {
                            var _0x2ab7a7 = _0x964050;
                            _0x5a9f7a(_0x2ab7a7('0x72') + _0x43b665),
                            _0x5a9f7a(_0x2ab7a7('0x4c')),
                            _0x3e0e4d(_0x19f4ec);
                        });
                    });
                else
                    return _0x3e0e4d(_0x19f4ec);
            }
            //if (cctvModule[_0x26e96a('0x26')])
            if (cctvModule.instantiateWasm)
                try {
                    //var _0x833d6e = cctvModule[_0x26e96a('0x26')](_0xf3bcea, _0x238c6b);
                    var _0x833d6e = cctvModule.instantiateWasm(_0xf3bcea, _0x238c6b);
                    return _0x833d6e;
                } catch (_0x2a7fb1) {
                    return _0x5a9f7a(_0x26e96a('0x57') + _0x2a7fb1),
                    ![];
                }
            _0x19bd8c();
            return {};    
            //return _0x19bd8c(),
            //{};
        }
        //cctvModule[_0x2fc976('0x67')] = function(_0xbdbe9c, _0x299673, _0x5de444)
        cctvModule.asm = function(_0xbdbe9c, _0x299673, _0x5de444)
        {
            var _0x1c0850 = _0x2fc976;
            //_0x299673[_0x1c0850('0x24')] = _0x54893d;
            _0x299673.memory = _0x54893d;  //Memory(256)
            // new WebAssembly.Table({initial:0xa0,maximum:0xa0,element:'anyfunc'})
            //_0x299673[_0x1c0850('0x22')] = _0xac0049 = new WebAssembly[(_0x1c0850('0xb8'))]
            _0x299673.table = _0xac0049 = new WebAssembly.Table 
            ({
                'initial': 0xa0,
                'maximum': 0xa0,
                'element': 'anyfunc',//_0x1c0850('0xca')
            }),
            _0x299673.__memory_base = 0x400;
            _0x299673.__table_base = 0x0;
            //_0x299673[_0x1c0850('0x2b')] = 0x400,
            //_0x299673[_0x1c0850('0xc')] = 0x0;
            var _0xd43c39 = _0x37b555(_0x299673);
            return _0xd43c39;
        }
        ;
        var _0x15c3b8, _0x39793c, _0x36a9d1 = [function(_0x412752) {
            var _0x372022 = _0x2fc976;
            const _0x2e6e13 = _0x525f44(_0x412752);
            /*
            var _0x1a4de5 = new XMLHttpRequest();
            _0x1a4de5[_0x372022('0x1c')] = 0x0,
            _0x1a4de5[_0x372022('0x7a')] = '',
            _0x1a4de5[_0x372022('0x38')](_0x372022('0xa1'), _0x2e6e13, ![]),
            _0x1a4de5['onload'] = function(_0x204231) {
                var _0x596c66 = _0x372022;
                this[_0x596c66('0x9c')] == 0xc8 && (tmpstr = this[_0x596c66('0xd6')]);
            }
            ,
            _0x1a4de5[_0x372022('0x3b')]();
            */
//console.log("tmpstr=")    
            tmpstr = "";
            const _0x518148 = _0x50b22c(tmpstr) + 0x1
              , _0x2e869b = _0x44a1f5(_0x518148);
            return _0x17bce3(tmpstr, _0x2e869b, _0x518148),
            _0x2e869b;
        }
        , function(_0x487cd9) {
            var _0x1e3591 = _0x525f44(_0x487cd9)
              , _0x288a88 = eval(_0x1e3591)
              , _0x5ef66a = _0x50b22c(_0x288a88) + 0x1
              , _0x3a5414 = _0x44a1f5(_0x5ef66a);
            return _0x17bce3(_0x288a88, _0x3a5414, _0x5ef66a),
            _0x3a5414;
        }
        , function(_0x492a7a) {
            const _0x37a3fb = _0x525f44(_0x492a7a)
              , _0x49298f = eval(_0x37a3fb)
              , _0x2accfd = _0x50b22c(_0x49298f) + 0x1
              , _0x29ea75 = _0x44a1f5(_0x2accfd);
            return _0x17bce3(_0x49298f, _0x29ea75, _0x2accfd),
            _0x29ea75;
        }
        ];
        function _0x15f291(_0x3adc91, _0x5a40f5) {
            return _0x36a9d1[_0x3adc91](_0x5a40f5);
        }
        var _0x216ab5 = 0x6e00;
        function _0x537afd(_0x8cc491) {
            return _0x8cc491;
        }
        function _0x48bc96(_0x2f65bc) {
            var _0x3b1f4f = /\b__Z[\w\d_]+/g;
            return _0x2f65bc['replace'](_0x3b1f4f, function(_0x25bc84) {
                var _0xcfbba8 = _0x537afd(_0x25bc84);
                return _0x25bc84 === _0xcfbba8 ? _0x25bc84 : _0xcfbba8 + '\x20[' + _0x25bc84 + ']';
            });
        }
        function _0x76fd2d() {
            var _0xde5061 = _0x2fc976
              , _0x4100cb = new Error();
            if (!_0x4100cb[_0xde5061('0x2')]) {
                try {
                    throw new Error(0x0);
                } catch (_0xb0c637) {
                    _0x4100cb = _0xb0c637;
                }
                if (!_0x4100cb[_0xde5061('0x2')])
                    return _0xde5061('0x86');
            }
            return _0x4100cb[_0xde5061('0x2')][_0xde5061('0x49')]();
        }
        function _0x52c00e() {
            var _0x50797b = _0x2fc976
              , _0x321972 = _0x76fd2d();
            if (cctvModule[_0x50797b('0x85')])
                _0x321972 += '\x0a' + cctvModule[_0x50797b('0x85')]();
            return _0x48bc96(_0x321972);
        }
        function _0x982bff() {}
        var _0x1a35a4 = {
            'splitPath': function(_0x2c7765) {
                var _0x33aa42 = _0x2fc976
                  , _0x567090 = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
                return _0x567090[_0x33aa42('0x65')](_0x2c7765)[_0x33aa42('0x51')](0x1);
            },
            'normalizeArray': function(_0x46135d, _0x147705) {
                var _0x10f405 = _0x2fc976
                  , _0x17f172 = 0x0;
                for (var _0xb5c8e6 = _0x46135d[_0x10f405('0x9')] - 0x1; _0xb5c8e6 >= 0x0; _0xb5c8e6--) {
                    var _0x2ce08c = _0x46135d[_0xb5c8e6];
                    if (_0x2ce08c === '.')
                        _0x46135d['splice'](_0xb5c8e6, 0x1);
                    else {
                        if (_0x2ce08c === '..')
                            _0x46135d[_0x10f405('0x73')](_0xb5c8e6, 0x1),
                            _0x17f172++;
                        else
                            _0x17f172 && (_0x46135d[_0x10f405('0x73')](_0xb5c8e6, 0x1),
                            _0x17f172--);
                    }
                }
                if (_0x147705)
                    for (; _0x17f172; _0x17f172--) {
                        _0x46135d[_0x10f405('0x4d')]('..');
                    }
                return _0x46135d;
            },
            'normalize': function(_0x2f7769) {
                var _0x285436 = _0x2fc976
                  , _0x38c485 = _0x2f7769[_0x285436('0xaa')](0x0) === '/'
                  , _0x55989e = _0x2f7769[_0x285436('0x8f')](-0x1) === '/';
                return _0x2f7769 = _0x1a35a4[_0x285436('0xce')](_0x2f7769[_0x285436('0xbd')]('/')[_0x285436('0x63')](function(_0x5c829e) {
                    return !!_0x5c829e;
                }), !_0x38c485)[_0x285436('0x8a')]('/'),
                !_0x2f7769 && !_0x38c485 && (_0x2f7769 = '.'),
                _0x2f7769 && _0x55989e && (_0x2f7769 += '/'),
                (_0x38c485 ? '/' : '') + _0x2f7769;
            },
            'dirname': function(_0x75c53) {
                var _0x40bb0d = _0x2fc976
                  , _0x2379fa = _0x1a35a4[_0x40bb0d('0xa8')](_0x75c53)
                  , _0x5ba7b8 = _0x2379fa[0x0]
                  , _0xe1ae3a = _0x2379fa[0x1];
                if (!_0x5ba7b8 && !_0xe1ae3a)
                    return '.';
                return _0xe1ae3a && (_0xe1ae3a = _0xe1ae3a[_0x40bb0d('0x8f')](0x0, _0xe1ae3a[_0x40bb0d('0x9')] - 0x1)),
                _0x5ba7b8 + _0xe1ae3a;
            },
            'basename': function(_0x119ca4) {
                var _0x528de8 = _0x2fc976;
                if (_0x119ca4 === '/')
                    return '/';
                var _0x5f2e1f = _0x119ca4[_0x528de8('0xe0')]('/');
                if (_0x5f2e1f === -0x1)
                    return _0x119ca4;
                return _0x119ca4[_0x528de8('0x8f')](_0x5f2e1f + 0x1);
            },
            'extname': function(_0x1314d2) {
                return _0x1a35a4['splitPath'](_0x1314d2)[0x3];
            },
            'join': function() {
                var _0x20f853 = _0x2fc976
                  , _0x4a984d = Array[_0x20f853('0xf6')][_0x20f853('0x51')][_0x20f853('0x15')](arguments, 0x0);
                return _0x1a35a4['normalize'](_0x4a984d[_0x20f853('0x8a')]('/'));
            },
            'join2': function(_0x5c1cad, _0x39aee3) {
                return _0x1a35a4['normalize'](_0x5c1cad + '/' + _0x39aee3);
            }
        }
          , _0x5da91b = {
            'buffers': [null, [], []],
            'printChar': function(_0xd02997, _0x1e36b6) {
                var _0x34c25d = _0x2fc976
                  , _0x2fd372 = _0x5da91b[_0x34c25d('0x9f')][_0xd02997];
                _0x1e36b6 === 0x0 || _0x1e36b6 === 0xa ? ((_0xd02997 === 0x1 ? _0x4f566b : _0x5a9f7a)(_0x2e8711(_0x2fd372, 0x0)),
                _0x2fd372[_0x34c25d('0x9')] = 0x0) : _0x2fd372['push'](_0x1e36b6);
            },
            'varargs': 0x0,
            'get': function(_0x3f3235) {
                var _0x1fe6fc = _0x2fc976;
                _0x5da91b[_0x1fe6fc('0x80')] += 0x4;
                var _0x26b368 = _0x4829b9[_0x5da91b[_0x1fe6fc('0x80')] - 0x4 >> 0x2];
                return _0x26b368;
            },
            'getStr': function() {
                var _0x5603ef = _0x2fc976
                  , _0x58eaf6 = _0x525f44(_0x5da91b[_0x5603ef('0xad')]());
                return _0x58eaf6;
            },
            'get64': function() {
                var _0x13fada = _0x2fc976
                  , _0x2c55e8 = _0x5da91b[_0x13fada('0xad')]()
                  , _0x394647 = _0x5da91b[_0x13fada('0xad')]();
                return _0x2c55e8;
            },
            'getZero': function() {
                var _0x4d33ff = _0x2fc976;
                _0x5da91b[_0x4d33ff('0xad')]();
            }
        };
        function _0x4ab730(_0x1b5a04, _0x14d0e1) {
            var _0x141164 = _0x2fc976;
            _0x5da91b[_0x141164('0x80')] = _0x14d0e1;
            try {
                var _0x3d8fdb = _0x5da91b[_0x141164('0xe4')]()
                  , _0x37ca09 = _0x5da91b['get']()
                  , _0x4c191f = _0x5da91b['get']()
                  , _0x277f10 = _0x5da91b[_0x141164('0xad')]()
                  , _0x37864d = _0x5da91b[_0x141164('0xad')]();
                return 0x0;
            } catch (_0x55c52e) {
                if (typeof FS === _0x141164('0x5f') || !(_0x55c52e instanceof FS[_0x141164('0x10')]))
                    _0x4b6282(_0x55c52e);
                return -_0x55c52e[_0x141164('0x7')];
            }
        }
        function _0x22e5aa() {
            var _0x4caedf = _0x2fc976
              , _0x47a611 = cctvModule[_0x4caedf('0x13')];
            if (_0x47a611)
                _0x47a611(0x0);
            var _0x17c43f = _0x5da91b[_0x4caedf('0x9f')];
            if (_0x17c43f[0x1]['length'])
                _0x5da91b[_0x4caedf('0x9e')](0x1, 0xa);
            if (_0x17c43f[0x2][_0x4caedf('0x9')])
                _0x5da91b[_0x4caedf('0x9e')](0x2, 0xa);
        }
        function _0xc94f9a(_0x52094e, _0x100130) {
            var _0x1faa38 = _0x2fc976;
            _0x5da91b[_0x1faa38('0x80')] = _0x100130;
            try {
                var _0x3164c1 = _0x5da91b[_0x1faa38('0xad')]()
                  , _0x1aa435 = _0x5da91b['get']()
                  , _0x34cbbd = _0x5da91b[_0x1faa38('0xad')]()
                  , _0x53ad36 = 0x0;
                for (var _0x488192 = 0x0; _0x488192 < _0x34cbbd; _0x488192++) {
                    var _0x1c1ae0 = _0x4829b9[_0x1aa435 + _0x488192 * 0x8 >> 0x2]
                      , _0x218283 = _0x4829b9[_0x1aa435 + (_0x488192 * 0x8 + 0x4) >> 0x2];
                    for (var _0x2ff075 = 0x0; _0x2ff075 < _0x218283; _0x2ff075++) {
                        _0x5da91b['printChar'](_0x3164c1, _0x57aba7[_0x1c1ae0 + _0x2ff075]);
                    }
                    _0x53ad36 += _0x218283;
                }
                return _0x53ad36;
            } catch (_0xefe95b) {
                if (typeof FS === 'undefined' || !(_0xefe95b instanceof FS[_0x1faa38('0x10')]))
                    _0x4b6282(_0xefe95b);
                return -_0xefe95b['errno'];
            }
        }
        function _0x37f256(_0xf1e6a0, _0x127ec3) {
            var _0x3819b4 = _0x2fc976;
            _0x5da91b['varargs'] = _0x127ec3;
            try {
                return 0x0;
            } catch (_0x2dea65) {
                if (typeof FS === _0x3819b4('0x5f') || !(_0x2dea65 instanceof FS[_0x3819b4('0x10')]))
                    _0x4b6282(_0x2dea65);
                return -_0x2dea65[_0x3819b4('0x7')];
            }
        }
        function _0x291a84(_0x3c4cf4, _0x5a83e5) {
            var _0x34e9d5 = _0x2fc976;
            _0x5da91b[_0x34e9d5('0x80')] = _0x5a83e5;
            try {
                var _0x31b217 = _0x5da91b[_0x34e9d5('0xe4')]();
                return 0x0;
            } catch (_0x111494) {
                if (typeof FS === _0x34e9d5('0x5f') || !(_0x111494 instanceof FS[_0x34e9d5('0x10')]))
                    _0x4b6282(_0x111494);
                return -_0x111494[_0x34e9d5('0x7')];
            }
        }
        function _0x13ebe9(_0x27bce1) {
            var _0x4fd1f2 = _0x2fc976;
            delete _0x2abff8[_0x4fd1f2('0x79')][_0x27bce1 - 0x1];
        }
        function _0x3e20dd() {
            var _0x2c483c = _0x2fc976;
            return _0x465e31[_0x2c483c('0x9')];
        }
        function _0x561444() {
            return !_0x33f8e7;
        }
        var _0x2abff8 = {
            'xhrs': [],
            'setu64': function(_0x410b14, _0x19170e) {
                _0x5de9c1[_0x410b14 >> 0x2] = _0x19170e,
                _0x5de9c1[_0x410b14 + 0x4 >> 0x2] = _0x19170e / 0x100000000 | 0x0;
            },
            'openDatabase': function(_0x414d32, _0x15c480, _0x74e719, _0x30381b) {
                var _0x56c2c8 = _0x2fc976;
                try {
                    var _0x510509 = indexedDB[_0x56c2c8('0x38')](_0x414d32, _0x15c480);
                } catch (_0x6d6cb5) {
                    return _0x30381b(_0x6d6cb5);
                }
                _0x510509[_0x56c2c8('0xf0')] = function(_0x1ddc0c) {
                    var _0xbfc18d = _0x56c2c8
                      , _0x422c68 = _0x1ddc0c[_0xbfc18d('0xc8')][_0xbfc18d('0xc0')];
                    _0x422c68[_0xbfc18d('0xb0')]['contains'](_0xbfc18d('0x91')) && _0x422c68[_0xbfc18d('0x31')](_0xbfc18d('0x91')),
                    _0x422c68[_0xbfc18d('0x96')]('FILES');
                }
                ,
                _0x510509['onsuccess'] = function(_0x5e3a6c) {
                    var _0x354849 = _0x56c2c8;
                    _0x74e719(_0x5e3a6c[_0x354849('0xc8')][_0x354849('0xc0')]);
                }
                ,
                _0x510509[_0x56c2c8('0x6c')] = function(_0xf15747) {
                    _0x30381b(_0xf15747);
                }
                ;
            },
            'staticInit': function() {
                var _0x23afc2 = _0x2fc976
                  , _0x5b358d = typeof ENVIRONMENT_IS_FETCH_WORKER === _0x23afc2('0x5f')
                  , _0x1d2295 = function(_0x3143e8) {
                    var _0x215503 = _0x23afc2;
                    _0x2abff8[_0x215503('0xcb')] = _0x3143e8,
                    _0x5b358d && _0x5b52c1(_0x215503('0x9a'));
                }
                  , _0x9eef4d = function() {
                    var _0x2993aa = _0x23afc2;
                    _0x2abff8[_0x2993aa('0xcb')] = ![],
                    _0x5b358d && _0x5b52c1(_0x2993aa('0x9a'));
                };
                _0x2abff8[_0x23afc2('0xf4')](_0x23afc2('0x23'), 0x1, _0x1d2295, _0x9eef4d);
                if (typeof ENVIRONMENT_IS_FETCH_WORKER === _0x23afc2('0x5f') || !ENVIRONMENT_IS_FETCH_WORKER)
                    _0x52cfb9(_0x23afc2('0x9a'));
            }
        };
        function _0x397634(_0x3a1b3b, _0x1552e5, _0x25b841, _0x5c6054, _0x32971c) {
            var _0x1c44ce = _0x2fc976
              , _0x5363a4 = _0x5de9c1[_0x3a1b3b + 0x8 >> 0x2];
            if (!_0x5363a4) {
                _0x25b841(_0x3a1b3b, 0x0, _0x1c44ce('0x74'));
                return;
            }
            var _0xa749fd = _0x525f44(_0x5363a4)
              , _0x1e08b0 = _0x3a1b3b + 0x70
              , _0x5db42c = _0x525f44(_0x1e08b0);
            if (!_0x5db42c)
                _0x5db42c = _0x1c44ce('0xa1');
            var _0x232b49 = _0x5de9c1[_0x1e08b0 + 0x20 >> 0x2]
              , _0x4f7d79 = _0x5de9c1[_0x1e08b0 + 0x34 >> 0x2]
              , _0x58a0e9 = _0x5de9c1[_0x1e08b0 + 0x38 >> 0x2]
              , _0x63e183 = !!_0x5de9c1[_0x1e08b0 + 0x3c >> 0x2]
              , _0x562af0 = _0x5de9c1[_0x1e08b0 + 0x40 >> 0x2]
              , _0xa583e2 = _0x5de9c1[_0x1e08b0 + 0x44 >> 0x2]
              , _0x4ab80d = _0x5de9c1[_0x1e08b0 + 0x48 >> 0x2]
              , _0x484e80 = _0x5de9c1[_0x1e08b0 + 0x4c >> 0x2]
              , _0x3e9b4c = _0x5de9c1[_0x1e08b0 + 0x50 >> 0x2]
              , _0x3cf53d = _0x5de9c1[_0x1e08b0 + 0x54 >> 0x2]
              , _0x1ced71 = _0x5de9c1[_0x1e08b0 + 0x58 >> 0x2]
              , _0x5ef839 = !!(_0x4f7d79 & 0x1)
              , _0x169dd5 = !!(_0x4f7d79 & 0x2)
              , _0x5cb241 = !!(_0x4f7d79 & 0x4)
              , _0x580f08 = !!(_0x4f7d79 & 0x8)
              , _0x24d95a = !!(_0x4f7d79 & 0x10)
              , _0x31f1d4 = !!(_0x4f7d79 & 0x40)
              , _0x1412a2 = !!(_0x4f7d79 & 0x80)
              , _0x2ac7ff = _0xa583e2 ? _0x525f44(_0xa583e2) : undefined
              , _0x4ee665 = _0x4ab80d ? _0x525f44(_0x4ab80d) : undefined
              , _0x1078f6 = _0x3e9b4c ? _0x525f44(_0x3e9b4c) : undefined
              ;
             /*  [CYW]
               _0x9c9e22 = new XMLHttpRequest();
            _0x9c9e22.withCredentials = _0x63e183;//[_0x1c44ce('0x7f')] = _0x63e183,
            //_0x9c9e22[_0x1c44ce('0x38')](_0x5db42c, _0xa749fd, !_0x31f1d4, _0x2ac7ff, _0x4ee665);
            _0x9c9e22.open(_0x5db42c, _0xa749fd, !_0x31f1d4, _0x2ac7ff, _0x4ee665);
            if (!_0x31f1d4)
                _0x9c9e22[_0x1c44ce('0x1c')] = _0x58a0e9;
            _0x9c9e22.url_ = _0xa749fd, // .....json
            _0x2448e1(!_0x169dd5, _0x1c44ce('0x17')),
            _0x9c9e22[_0x1c44ce('0x7a')] = _0x1c44ce('0x94');
            _0x3e9b4c && _0x9c9e22.overrideMimeType(_0x1078f6);//[_0x1c44ce('0x3')](_0x1078f6);
            if (_0x484e80)
                for (; ; ) {
                    var _0x5ed0f0 = _0x5de9c1[_0x484e80 >> 0x2];
                    if (!_0x5ed0f0)
                        break;
                    var _0x4b7f21 = _0x5de9c1[_0x484e80 + 0x4 >> 0x2];
                    if (!_0x4b7f21)
                        break;
                    _0x484e80 += 0x8;
                    var _0x41809b = _0x525f44(_0x5ed0f0)
                      , _0x43a8df = _0x525f44(_0x4b7f21);
                    _0x9c9e22.setRequestHeader(_0x41809b, _0x43a8df);//[_0x1c44ce('0xc7')](_0x41809b, _0x43a8df);
                }
            //_0x2abff8[_0x1c44ce('0x79')]['push'](_0x9c9e22);
            _0x2abff8.xhrs.push(_0x9c9e22);
            
            var _0x7ff64e = _0x2abff8[_0x1c44ce('0x79')][_0x1c44ce('0x9')];
            _0x5de9c1[_0x3a1b3b + 0x0 >> 0x2] = _0x7ff64e;
            var _0x405aaa = _0x3cf53d && _0x1ced71 ? _0x57aba7[_0x1c44ce('0x51')](_0x3cf53d, _0x3cf53d + _0x1ced71) : null;
            _0x9c9e22[_0x1c44ce('0xa5')] = function(_0x505a8e) {
                var _0xa735bb = _0x1c44ce
                  , _0x22507e = _0x9c9e22[_0xa735bb('0xf3')] ? _0x9c9e22[_0xa735bb('0xf3')][_0xa735bb('0xcf')] : 0x0
                  , _0x1f4e41 = 0x0
                  , _0x16ef14 = 0x0;
                _0x5ef839 && !_0x169dd5 && (_0x16ef14 = _0x22507e,
                _0x1f4e41 = _0x44a1f5(_0x16ef14),
                _0x57aba7[_0xa735bb('0xef')](new Uint8Array(_0x9c9e22[_0xa735bb('0xf3')]), _0x1f4e41));
                _0x5de9c1[_0x3a1b3b + 0xc >> 0x2] = _0x1f4e41,
                _0x2abff8[_0xa735bb('0x2e')](_0x3a1b3b + 0x10, _0x16ef14),
                _0x2abff8['setu64'](_0x3a1b3b + 0x18, 0x0);
                _0x22507e && _0x2abff8[_0xa735bb('0x2e')](_0x3a1b3b + 0x20, _0x22507e);
                _0x50d027[_0x3a1b3b + 0x28 >> 0x1] = _0x9c9e22[_0xa735bb('0xea')];
                if (_0x9c9e22[_0xa735bb('0xea')] === 0x4 && _0x9c9e22[_0xa735bb('0x9c')] === 0x0) {
                    if (_0x22507e > 0x0)
                        _0x9c9e22['status'] = 0xc8;
                    else
                        _0x9c9e22[_0xa735bb('0x9c')] = 0x194;
                }
                _0x50d027[_0x3a1b3b + 0x2a >> 0x1] = _0x9c9e22[_0xa735bb('0x9c')];
                if (_0x9c9e22[_0xa735bb('0x55')])
                    _0x17bce3(_0x9c9e22[_0xa735bb('0x55')], _0x3a1b3b + 0x2c, 0x40);
                if (_0x9c9e22[_0xa735bb('0x9c')] >= 0xc8 && _0x9c9e22[_0xa735bb('0x9c')] < 0x12c) {
                    if (_0x1552e5)
                        _0x1552e5(_0x3a1b3b, _0x9c9e22, _0x505a8e);
                } else {
                    if (_0x25b841)
                        _0x25b841(_0x3a1b3b, _0x9c9e22, _0x505a8e);
                }
            }
            ,
            _0x9c9e22['onerror'] = function(_0xca60b7) {
                var _0x1c78e5 = _0x1c44ce
                  , _0x123905 = _0x9c9e22[_0x1c78e5('0x9c')];
                if (_0x9c9e22[_0x1c78e5('0xea')] === 0x4 && _0x123905 === 0x0)
                    _0x123905 = 0x194;
                _0x5de9c1[_0x3a1b3b + 0xc >> 0x2] = 0x0,
                _0x2abff8[_0x1c78e5('0x2e')](_0x3a1b3b + 0x10, 0x0),
                _0x2abff8[_0x1c78e5('0x2e')](_0x3a1b3b + 0x18, 0x0),
                _0x2abff8['setu64'](_0x3a1b3b + 0x20, 0x0),
                _0x50d027[_0x3a1b3b + 0x28 >> 0x1] = _0x9c9e22['readyState'],
                _0x50d027[_0x3a1b3b + 0x2a >> 0x1] = _0x123905;
                if (_0x25b841)
                    _0x25b841(_0x3a1b3b, _0x9c9e22, _0xca60b7);
            }
            ,
            _0x9c9e22[_0x1c44ce('0x84')] = function(_0x460b98) {
                if (_0x25b841)
                    _0x25b841(_0x3a1b3b, _0x9c9e22, _0x460b98);
            }
            ,
            _0x9c9e22[_0x1c44ce('0xd5')] = function(_0x3554fb) {
                var _0x46fe07 = _0x1c44ce
                  , _0x3a2321 = _0x5ef839 && _0x169dd5 && _0x9c9e22[_0x46fe07('0xf3')] ? _0x9c9e22[_0x46fe07('0xf3')][_0x46fe07('0xcf')] : 0x0
                  , _0x59ace8 = 0x0;
                _0x5ef839 && _0x169dd5 && (_0x59ace8 = _0x44a1f5(_0x3a2321),
                _0x57aba7['set'](new Uint8Array(_0x9c9e22[_0x46fe07('0xf3')]), _0x59ace8));
                _0x5de9c1[_0x3a1b3b + 0xc >> 0x2] = _0x59ace8,
                _0x2abff8[_0x46fe07('0x2e')](_0x3a1b3b + 0x10, _0x3a2321),
                _0x2abff8[_0x46fe07('0x2e')](_0x3a1b3b + 0x18, _0x3554fb['loaded'] - _0x3a2321),
                _0x2abff8[_0x46fe07('0x2e')](_0x3a1b3b + 0x20, _0x3554fb['total']),
                _0x50d027[_0x3a1b3b + 0x28 >> 0x1] = _0x9c9e22[_0x46fe07('0xea')];
                if (_0x9c9e22['readyState'] >= 0x3 && _0x9c9e22[_0x46fe07('0x9c')] === 0x0 && _0x3554fb[_0x46fe07('0x36')] > 0x0)
                    _0x9c9e22['status'] = 0xc8;
                _0x50d027[_0x3a1b3b + 0x2a >> 0x1] = _0x9c9e22[_0x46fe07('0x9c')];
                if (_0x9c9e22[_0x46fe07('0x55')])
                    _0x17bce3(_0x9c9e22[_0x46fe07('0x55')], _0x3a1b3b + 0x2c, 0x40);
                if (_0x5c6054)
                    _0x5c6054(_0x3a1b3b, _0x9c9e22, _0x3554fb);
            }
            ,
            _0x9c9e22['onreadystatechange'] = function(_0x5e8218) {
                var _0x541ed1 = _0x1c44ce;
                _0x50d027[_0x3a1b3b + 0x28 >> 0x1] = _0x9c9e22[_0x541ed1('0xea')];
                _0x9c9e22[_0x541ed1('0xea')] >= 0x2 && (_0x50d027[_0x3a1b3b + 0x2a >> 0x1] = _0x9c9e22['status']);
                if (_0x32971c)
                    _0x32971c(_0x3a1b3b, _0x9c9e22, _0x5e8218);
            }
            ;
            try {
                _0x9c9e22[_0x1c44ce('0x3b')](_0x405aaa);
            } catch (_0x1c1625) {
                if (_0x25b841)
                    _0x25b841(_0x3a1b3b, _0x9c9e22, _0x1c1625);
            }
            */
        }
        function _0x4fc297(_0x541c11, _0x32b989, _0x2ddb88, _0x187974, _0x29eeea) {
            var _0x2ad0b8 = _0x2fc976;
            if (!_0x541c11) {
                _0x29eeea(_0x32b989, 0x0, _0x2ad0b8('0xd1'));
                return;
            }
            var _0x24e0be = _0x32b989 + 0x70
              , _0x570c87 = _0x5de9c1[_0x24e0be + 0x40 >> 0x2];
            if (!_0x570c87)
                _0x570c87 = _0x5de9c1[_0x32b989 + 0x8 >> 0x2];
            var _0x33b0ff = _0x525f44(_0x570c87);
            try {
                var _0x2367af = _0x541c11['transaction'](['FILES'], _0x2ad0b8('0xe6'))
                  , _0x5d7e38 = _0x2367af[_0x2ad0b8('0xdc')]('FILES')
                  , _0x1e16cd = _0x5d7e38['put'](_0x2ddb88, _0x33b0ff);
                _0x1e16cd[_0x2ad0b8('0xe')] = function(_0x238134) {
                    _0x50d027[_0x32b989 + 0x28 >> 0x1] = 0x4,
                    _0x50d027[_0x32b989 + 0x2a >> 0x1] = 0xc8,
                    _0x17bce3('OK', _0x32b989 + 0x2c, 0x40),
                    _0x187974(_0x32b989, 0x0, _0x33b0ff);
                }
                ,
                _0x1e16cd[_0x2ad0b8('0x6c')] = function(_0x4c415d) {
                    var _0x43075c = _0x2ad0b8;
                    _0x50d027[_0x32b989 + 0x28 >> 0x1] = 0x4,
                    _0x50d027[_0x32b989 + 0x2a >> 0x1] = 0x19d,
                    _0x17bce3(_0x43075c('0xb5'), _0x32b989 + 0x2c, 0x40),
                    _0x29eeea(_0x32b989, 0x0, _0x4c415d);
                }
                ;
            } catch (_0x1f06ea) {
                _0x29eeea(_0x32b989, 0x0, _0x1f06ea);
            }
        }
        function _0x11aeac(_0x5839aa, _0x88a677, _0x3f1f7c, _0x32ae7d) {
            var _0x274551 = _0x2fc976;
            if (!_0x5839aa) {
                _0x32ae7d(_0x88a677, 0x0, _0x274551('0xd1'));
                return;
            }
            var _0x5cb90b = _0x88a677 + 0x70
              , _0x5a67bd = _0x5de9c1[_0x5cb90b + 0x40 >> 0x2];
            if (!_0x5a67bd)
                _0x5a67bd = _0x5de9c1[_0x88a677 + 0x8 >> 0x2];
            var _0x2df06c = _0x525f44(_0x5a67bd);
            try {
                var _0x298ced = _0x5839aa['transaction'](['FILES'], _0x274551('0x48'))
                  , _0x115d3e = _0x298ced[_0x274551('0xdc')](_0x274551('0x91'))
                  , _0x474c19 = _0x115d3e['get'](_0x2df06c);
                _0x474c19['onsuccess'] = function(_0x4d8477) {
                    var _0x2e0ddd = _0x274551;
                    if (_0x4d8477[_0x2e0ddd('0xc8')][_0x2e0ddd('0xc0')]) {
                        var _0x202201 = _0x4d8477[_0x2e0ddd('0xc8')][_0x2e0ddd('0xc0')]
                          , _0x556dd5 = _0x202201[_0x2e0ddd('0xcf')] || _0x202201[_0x2e0ddd('0x9')]
                          , _0x4d3413 = _0x44a1f5(_0x556dd5);
                        _0x57aba7[_0x2e0ddd('0xef')](new Uint8Array(_0x202201), _0x4d3413),
                        _0x5de9c1[_0x88a677 + 0xc >> 0x2] = _0x4d3413,
                        _0x2abff8['setu64'](_0x88a677 + 0x10, _0x556dd5),
                        _0x2abff8[_0x2e0ddd('0x2e')](_0x88a677 + 0x18, 0x0),
                        _0x2abff8[_0x2e0ddd('0x2e')](_0x88a677 + 0x20, _0x556dd5),
                        _0x50d027[_0x88a677 + 0x28 >> 0x1] = 0x4,
                        _0x50d027[_0x88a677 + 0x2a >> 0x1] = 0xc8,
                        _0x17bce3('OK', _0x88a677 + 0x2c, 0x40),
                        _0x3f1f7c(_0x88a677, 0x0, _0x202201);
                    } else
                        _0x50d027[_0x88a677 + 0x28 >> 0x1] = 0x4,
                        _0x50d027[_0x88a677 + 0x2a >> 0x1] = 0x194,
                        _0x17bce3(_0x2e0ddd('0x3a'), _0x88a677 + 0x2c, 0x40),
                        _0x32ae7d(_0x88a677, 0x0, _0x2e0ddd('0x89'));
                }
                ,
                _0x474c19[_0x274551('0x6c')] = function(_0x30e07d) {
                    var _0x24affe = _0x274551;
                    _0x50d027[_0x88a677 + 0x28 >> 0x1] = 0x4,
                    _0x50d027[_0x88a677 + 0x2a >> 0x1] = 0x194,
                    _0x17bce3(_0x24affe('0x3a'), _0x88a677 + 0x2c, 0x40),
                    _0x32ae7d(_0x88a677, 0x0, _0x30e07d);
                }
                ;
            } catch (_0x255851) {
                _0x32ae7d(_0x88a677, 0x0, _0x255851);
            }
        }
        function _0x120d45(_0x15197a, _0x5b3e35, _0x53596e, _0x5b0c26) {
            var _0x282e77 = _0x2fc976;
            if (!_0x15197a) {
                _0x5b0c26(_0x5b3e35, 0x0, _0x282e77('0xd1'));
                return;
            }
            var _0x2d465a = _0x5b3e35 + 0x70
              , _0x313bdb = _0x5de9c1[_0x2d465a + 0x40 >> 0x2];
            if (!_0x313bdb)
                _0x313bdb = _0x5de9c1[_0x5b3e35 + 0x8 >> 0x2];
            var _0x1b552f = _0x525f44(_0x313bdb);
            try {
                var _0x4d4f63 = _0x15197a['transaction']([_0x282e77('0x91')], 'readwrite')
                  , _0x3803b9 = _0x4d4f63['objectStore'](_0x282e77('0x91'))
                  , _0x46eef5 = _0x3803b9[_0x282e77('0x1b')](_0x1b552f);
                _0x46eef5[_0x282e77('0xe')] = function(_0xb607b6) {
                    var _0x56dbb5 = _0x282e77
                      , _0x282caf = _0xb607b6[_0x56dbb5('0xc8')][_0x56dbb5('0xc0')];
                    _0x5de9c1[_0x5b3e35 + 0xc >> 0x2] = 0x0,
                    _0x2abff8['setu64'](_0x5b3e35 + 0x10, 0x0),
                    _0x2abff8[_0x56dbb5('0x2e')](_0x5b3e35 + 0x18, 0x0),
                    _0x2abff8['setu64'](_0x5b3e35 + 0x20, 0x0),
                    _0x50d027[_0x5b3e35 + 0x28 >> 0x1] = 0x4,
                    _0x50d027[_0x5b3e35 + 0x2a >> 0x1] = 0xc8,
                    _0x17bce3('OK', _0x5b3e35 + 0x2c, 0x40),
                    _0x53596e(_0x5b3e35, 0x0, _0x282caf);
                }
                ,
                _0x46eef5[_0x282e77('0x6c')] = function(_0x108410) {
                    _0x50d027[_0x5b3e35 + 0x28 >> 0x1] = 0x4,
                    _0x50d027[_0x5b3e35 + 0x2a >> 0x1] = 0x194,
                    _0x17bce3('Not\x20Found', _0x5b3e35 + 0x2c, 0x40),
                    _0x5b0c26(_0x5b3e35, 0x0, _0x108410);
                }
                ;
            } catch (_0x51b010) {
                _0x5b0c26(_0x5b3e35, 0x0, _0x51b010);
            }
        }
        var _0x203547 = 0x6de0;
        function _0x47b598() {
            return _0x203547;
        }
        function _0x31e2e6() {
            var _0x51db29 = _0x2fc976;
            _0x5a9f7a(_0x51db29('0x45')),
            _0x4b6282(-0x1);
        }
        function _0x46e40d(_0x1b4147, _0x398deb, _0x34c729, _0x39dfcc, _0x24208e) {
            var _0x241e49 = _0x2fc976;
            if (typeof cctvModule !== _0x241e49('0x5f'))
                cctvModule[_0x241e49('0x16')] = !![];
            var _0x6066bc = _0x1b4147 + 0x70
              , _0x3bb78f = _0x525f44(_0x6066bc)
              , _0x7c633c = _0x5de9c1[_0x6066bc + 0x24 >> 0x2]
              , _0x480278 = _0x5de9c1[_0x6066bc + 0x28 >> 0x2]
              , _0xf290a = _0x5de9c1[_0x6066bc + 0x2c >> 0x2]
              , _0x1c3b8a = _0x5de9c1[_0x6066bc + 0x30 >> 0x2]
              , _0x247235 = _0x5de9c1[_0x6066bc + 0x34 >> 0x2]
              , _0x255be9 = !!(_0x247235 & 0x1)
              , _0x38b398 = !!(_0x247235 & 0x2)
              , _0x4b6568 = !!(_0x247235 & 0x4)
              , _0x5b5580 = !!(_0x247235 & 0x20)
              , _0x3bc282 = !!(_0x247235 & 0x8)
              , _0x2f7647 = !!(_0x247235 & 0x10)
              , _0x162039 = function(_0x1f043a, _0x106bc7, _0x46d07a) {
                if (_0x7c633c)
                    _0x16a472(_0x7c633c, _0x1f043a);
                else {
                    if (_0x398deb)
                        _0x398deb(_0x1f043a);
                }
            }
              , _0x10ef32 = function(_0x16587c, _0x11ec25, _0x2274f4) {
                if (_0xf290a)
                    _0x16a472(_0xf290a, _0x16587c);
                else {
                    if (_0x39dfcc)
                        _0x39dfcc(_0x16587c);
                }
            }
              , _0x2dd3e8 = function(_0x3f7a75, _0x42ac91, _0x23a663) {
                if (_0x480278)
                    _0x16a472(_0x480278, _0x3f7a75);
                else {
                    if (_0x34c729)
                        _0x34c729(_0x3f7a75);
                }
            }
              , _0x3a655e = function(_0x31b63a, _0x12fb46, _0x4e5cb3) {
                if (_0x1c3b8a)
                    _0x16a472(_0x1c3b8a, _0x31b63a);
                else {
                    if (_0x24208e)
                        _0x24208e(_0x31b63a);
                }
            }
              , _0x1901fa = function(_0x2441a6, _0x1a32f6, _0x7f0eb9) {
                _0x397634(_0x2441a6, _0x162039, _0x2dd3e8, _0x10ef32, _0x3a655e);
            }
              , _0x19dfe5 = function(_0x4d92b8, _0x5e4626, _0x4d1a36) {
                var _0x1379aa = _0x241e49
                  , _0x39fb78 = function(_0x4e57f6, _0x5d7305, _0x45e92c) {
                    if (_0x7c633c)
                        _0x16a472(_0x7c633c, _0x4e57f6);
                    else {
                        if (_0x398deb)
                            _0x398deb(_0x4e57f6);
                    }
                }
                  , _0x40addc = function(_0x4cbc2f, _0x1ef16, _0x5d5d29) {
                    if (_0x7c633c)
                        _0x16a472(_0x7c633c, _0x4cbc2f);
                    else {
                        if (_0x398deb)
                            _0x398deb(_0x4cbc2f);
                    }
                };
                _0x4fc297(_0x2abff8[_0x1379aa('0xcb')], _0x4d92b8, _0x5e4626[_0x1379aa('0xf3')], _0x39fb78, _0x40addc);
            }
              , _0x13f008 = function(_0x19ac37, _0x2d7dd7, _0x16a9d7) {
                _0x397634(_0x19ac37, _0x19dfe5, _0x2dd3e8, _0x10ef32, _0x3a655e);
            }
              , _0x53c5f1 = !_0x2f7647 || _0x3bb78f === 'EM_IDB_STORE' || _0x3bb78f === _0x241e49('0x83');
            if (_0x53c5f1 && !_0x2abff8[_0x241e49('0xcb')])
                return _0x2dd3e8(_0x1b4147, 0x0, _0x241e49('0xac')),
                0x0;
            if (_0x3bb78f === 'EM_IDB_STORE') {
                var _0x3b266b = _0x5de9c1[_0x6066bc + 0x54 >> 0x2];
                _0x4fc297(_0x2abff8[_0x241e49('0xcb')], _0x1b4147, _0x57aba7[_0x241e49('0x51')](_0x3b266b, _0x3b266b + _0x5de9c1[_0x6066bc + 0x58 >> 0x2]), _0x162039, _0x2dd3e8);
            } else {
                if (_0x3bb78f === _0x241e49('0x83'))
                    _0x120d45(_0x2abff8[_0x241e49('0xcb')], _0x1b4147, _0x162039, _0x2dd3e8);
                else {
                    if (!_0x2f7647)
                        _0x11aeac(_0x2abff8[_0x241e49('0xcb')], _0x1b4147, _0x162039, _0x5b5580 ? _0x2dd3e8 : _0x4b6568 ? _0x13f008 : _0x1901fa);
                    else {
                        if (!_0x5b5580)
                            _0x397634(_0x1b4147, _0x4b6568 ? _0x19dfe5 : _0x162039, _0x2dd3e8, _0x10ef32, _0x3a655e);
                        else
                            return 0x0;
                    }
                }
            }
            return _0x1b4147;
        }
        function _0x568175(_0x457247, _0x2cfe32, _0x529ec5) {
            var _0x30b305 = _0x2fc976;
            _0x57aba7[_0x30b305('0xef')](_0x57aba7['subarray'](_0x2cfe32, _0x2cfe32 + _0x529ec5), _0x457247);
        }
        function _0x597086(_0x427baa) {
            var _0x2f849f = _0x2fc976;
            if (cctvModule[_0x2f849f('0xc3')])
                _0x4829b9[cctvModule[_0x2f849f('0xc3')]() >> 0x2] = _0x427baa;
            return _0x427baa;
        }
        function _0x7cf1a3(_0x2b9e66) {
            var _0x5ab7a3 = _0x2fc976;
            _0x4b6282(_0x5ab7a3('0xb4'));
        }
        function _0x214f40(_0x1ddc35) {
            var _0x489ff2 = _0x2fc976
              , _0x5d3b7d = 0x10000;
            _0x1ddc35 = _0x665d98(_0x1ddc35, _0x5d3b7d);
            var _0x7df3b6 = _0x5b6c8e['byteLength'];
            try {
                var _0x5c5a4c = _0x54893d[_0x489ff2('0x3d')]((_0x1ddc35 - _0x7df3b6) / 0x10000);
                return _0x5c5a4c !== (-0x1 | 0x0) ? (_0x5b6c8e = _0x54893d[_0x489ff2('0x0')],
                !![]) : ![];
            } catch (_0x3c6179) {
                return ![];
            }
        }
        function _0x54d280(_0x15f115) {
            var _0x5a22b7 = _0x2fc976
              , _0x1dedbb = _0x3e20dd()
              , _0x19d698 = 0x10000
              , _0x594048 = 0x80000000 - _0x19d698;
            if (_0x15f115 > _0x594048)
                return ![];
            var _0x283f49 = 0x1000000
              , _0x475517 = Math[_0x5a22b7('0x5')](_0x1dedbb, _0x283f49);
            while (_0x475517 < _0x15f115) {
                _0x475517 <= 0x20000000 ? _0x475517 = _0x665d98(0x2 * _0x475517, _0x19d698) : _0x475517 = Math[_0x5a22b7('0xd8')](_0x665d98((0x3 * _0x475517 + 0x80000000) / 0x4, _0x19d698), _0x594048);
            }
            if (!_0x214f40(_0x475517))
                return ![];
            return _0x47572c(),
            !![];
        }
        _0x2abff8['staticInit']();
        var _0xc8222d = ![];
        function _0xec138a(_0x41693e, _0x412031) {
            return _0x2f186e[_0x41693e](_0x412031);
        }
        function _0x446c96(_0x539d8c, _0x309957, _0x3f1e77, _0xac2d88, _0x2a1b78, _0x59e0c7, _0x28a64f) {
            return _0x2f186e[_0x539d8c](_0x309957, _0x3f1e77, _0xac2d88, _0x2a1b78, _0x59e0c7, _0x28a64f);
        }
        function _0x3cc4a1(_0x4fdeed, _0x21ee8f, _0x3b5333, _0x29c061) {
            return _0x2f186e[_0x4fdeed](_0x21ee8f, _0x3b5333, _0x29c061);
        }
        function _0x5b9adb(_0x4c8fce, _0x5483a8, _0x24435d, _0x2c4e74) {
            return _0x2f186e[_0x4c8fce](_0x5483a8, _0x24435d, _0x2c4e74);
        }
        function _0x5a7171(_0x66e448) {
            _0x2f186e[_0x66e448]();
        }
        function _0xd3fbe4(_0x440d0d, _0x475b38) {
            _0x2f186e[_0x440d0d](_0x475b38);
        }
        function _0x53a3af(_0xab3cc1, _0xc56f99, _0x541f36) {
            _0x2f186e[_0xab3cc1](_0xc56f99, _0x541f36);
        }
        var _0x441073 = {}
          , _0x103c17 = {
            'abort': _0x4b6282,
            'setTempRet0': _0x191bf5,
            'getTempRet0': _0x581003,
            'jsCall_ii': _0xec138a,
            'jsCall_iidiiii': _0x446c96,
            'jsCall_iiii': _0x3cc4a1,
            'jsCall_jiji': _0x5b9adb,
            'jsCall_v': _0x5a7171,
            'jsCall_vi': _0xd3fbe4,
            'jsCall_vii': _0x53a3af,
            '___gxx_personality_v0': _0x982bff,
            '___setErrNo': _0x597086,
            '___syscall140': _0x4ab730,
            '___syscall146': _0xc94f9a,
            '___syscall54': _0x37f256,
            '___syscall6': _0x291a84,
            '__emscripten_fetch_cache_data': _0x4fc297,
            '__emscripten_fetch_delete_cached_data': _0x120d45,
            '__emscripten_fetch_free': _0x13ebe9,
            '__emscripten_fetch_load_cached_data': _0x11aeac,
            '__emscripten_fetch_xhr': _0x397634,
            '__emscripten_get_fetch_work_queue': _0x47b598,
            '_emscripten_asm_const_ii': _0x15f291,
            '_emscripten_get_heap_size': _0x3e20dd,
            '_emscripten_is_main_browser_thread': _0x561444,
            '_emscripten_is_main_runtime_thread': _0x31e2e6,
            '_emscripten_memcpy_big': _0x568175,
            '_emscripten_resize_heap': _0x54d280,
            '_emscripten_start_fetch': _0x46e40d,
            'abortOnCannotGrowMemory': _0x7cf1a3,
            'demangle': _0x537afd,
            'demangleAll': _0x48bc96,
            'emscripten_realloc_buffer': _0x214f40,
            'flush_NO_FILESYSTEM': _0x22e5aa,
            'jsStackTrace': _0x76fd2d,
            'stackTrace': _0x52c00e,
            'tempDoublePtr': _0x216ab5,
            'DYNAMICTOP_PTR': _0x308fd2
        }
          , 
         // _0x27cd46 = cctvModule[_0x2fc976('0x67')](_0x441073, _0x103c17, _0x5b6c8e);  // module.asm({},{abort:function{},....},ArrayBuffer)
         _0x27cd46 = cctvModule.asm(_0x441073, _0x103c17, _0x5b6c8e);  // module.asm({},{abort:function{},....},ArrayBuffer)
     //   cctvModule.asm = _0x27cd46; // [CYW] 同步方式: 在 cctvModule.asm 已经被设置
        // 
        var _0x506d07 = cctvModule[_0x2fc976('0x2d')] = function() { // cctvModule._GetAudioARG
            var _0x2c8a21 = _0x2fc976;
            return cctvModule[_0x2c8a21('0x67')]['_GetAudioARG'][_0x2c8a21('0xd2')](null, arguments);
        }
          , _0x13ebd7 = cctvModule[_0x2fc976('0x53')] = function() { //_GetDecryptAudio
            var _0x4e7368 = _0x2fc976;
            return cctvModule[_0x4e7368('0x67')][_0x4e7368('0x53')][_0x4e7368('0xd2')](null, arguments);
        }
          , _0x2595da = cctvModule[_0x2fc976('0xc3')] = function() { //___errno_location
            var _0x376177 = _0x2fc976;
            return cctvModule[_0x376177('0x67')][_0x376177('0xc3')][_0x376177('0xd2')](null, arguments);
        }
          , _0x487ed3 = cctvModule[_0x2fc976('0x11')] = function() { // _emscripten_replace_memory
            var _0x1a47d2 = _0x2fc976;
            return cctvModule[_0x1a47d2('0x67')][_0x1a47d2('0x11')][_0x1a47d2('0xd2')](null, arguments);
        }
          , _0x37040b = cctvModule['_free'] = function() {
            var _0x25ecb5 = _0x2fc976;
            return cctvModule[_0x25ecb5('0x67')]['_free'][_0x25ecb5('0xd2')](null, arguments);
        }
          , _0xd6cbba = cctvModule[_0x2fc976('0xe1')] = function() { //_jsfree
            var _0x3d17dd = _0x2fc976;
            return cctvModule[_0x3d17dd('0x67')][_0x3d17dd('0xe1')][_0x3d17dd('0xd2')](null, arguments);
        }
          , _0x3d4ce2 = cctvModule[_0x2fc976('0xcd')] = function() { //_jsmalloc
            var _0x9d97aa = _0x2fc976;
            return cctvModule[_0x9d97aa('0x67')][_0x9d97aa('0xcd')]['apply'](null, arguments);
        }
          , _0x296637 = cctvModule['_llvm_bswap_i32'] = function() {
            var _0x5848db = _0x2fc976;
            return cctvModule[_0x5848db('0x67')]['_llvm_bswap_i32']['apply'](null, arguments);
        }
          , _0x44a1f5 = cctvModule[_0x2fc976('0x7e')] = function() {
            var _0x30236e = _0x2fc976;
            return cctvModule[_0x30236e('0x67')][_0x30236e('0x7e')][_0x30236e('0xd2')](null, arguments);
        }
          , _0x15d3d9 = cctvModule['_memcpy'] = function() {
            var _0x2c4489 = _0x2fc976;
            return cctvModule[_0x2c4489('0x67')][_0x2c4489('0x92')][_0x2c4489('0xd2')](null, arguments);
        }
          , _0x4c2777 = cctvModule[_0x2fc976('0x56')] = function() {
            var _0x4e68e3 = _0x2fc976;
            return cctvModule[_0x4e68e3('0x67')]['_memmove'][_0x4e68e3('0xd2')](null, arguments);
        }
          , _0x578cc8 = cctvModule['_memset'] = function() {
            var _0x341e90 = _0x2fc976;
            return cctvModule['asm'][_0x341e90('0xcc')][_0x341e90('0xd2')](null, arguments);
        }
          , _0xf8ba51 = cctvModule[_0x2fc976('0x60')] = function() {
            var _0x4f8b01 = _0x2fc976;
            return cctvModule[_0x4f8b01('0x67')][_0x4f8b01('0x60')]['apply'](null, arguments);
        }
          , _0x242a42 = cctvModule[_0x2fc976('0xd7')] = function() {
            var _0x587469 = _0x2fc976;
            return cctvModule[_0x587469('0x67')]['_sbrk'][_0x587469('0xd2')](null, arguments);
        }
          , _0x8e605d = cctvModule[_0x2fc976('0x97')] = function() {
            var _0x575f39 = _0x2fc976;
            return cctvModule[_0x575f39('0x67')][_0x575f39('0x97')][_0x575f39('0xd2')](null, arguments);
        }
          , _0x2f9c21 = cctvModule[_0x2fc976('0x29')] = function() {
            var _0x332c6e = _0x2fc976;
            return cctvModule[_0x332c6e('0x67')][_0x332c6e('0x29')][_0x332c6e('0xd2')](null, arguments);
        }
          , _0x1c6ef8 = cctvModule[_0x2fc976('0x1')] = function() {
            var _0x468627 = _0x2fc976;
            return cctvModule[_0x468627('0x67')][_0x468627('0x1')][_0x468627('0xd2')](null, arguments);
        }
          , _0x17a7a0 = cctvModule['stackRestore'] = function() {
            var _0x1a0a5b = _0x2fc976;
            return cctvModule[_0x1a0a5b('0x67')]['stackRestore'][_0x1a0a5b('0xd2')](null, arguments);
        }
          , _0x1903cd = cctvModule[_0x2fc976('0xc4')] = function() {
            var _0x407b22 = _0x2fc976;
            return cctvModule[_0x407b22('0x67')][_0x407b22('0xc4')]['apply'](null, arguments);
        }
          , _0xb9a012 = cctvModule[_0x2fc976('0x6d')] = function() {
            var _0x3addfd = _0x2fc976;
            return cctvModule[_0x3addfd('0x67')][_0x3addfd('0x6d')][_0x3addfd('0xd2')](null, arguments);
        }
          , _0x384ce0 = cctvModule[_0x2fc976('0x76')] = function() {
            var _0x52bee4 = _0x2fc976;
            return cctvModule[_0x52bee4('0x67')][_0x52bee4('0x76')][_0x52bee4('0xd2')](null, arguments);
        }
          , _0x39631c = cctvModule[_0x2fc976('0x75')] = function() {
            var _0x25e7e2 = _0x2fc976;
            return cctvModule['asm'][_0x25e7e2('0x75')][_0x25e7e2('0xd2')](null, arguments);
        }
          , _0x4d4b62 = cctvModule[_0x2fc976('0x98')] = function() {
            var _0x52259f = _0x2fc976;
            return cctvModule[_0x52259f('0x67')][_0x52259f('0x98')][_0x52259f('0xd2')](null, arguments);
        }
          , _0x1d31ab = cctvModule[_0x2fc976('0x33')] = function() {
            var _0x2b2793 = _0x2fc976;
            return cctvModule[_0x2b2793('0x67')]['dynCall_v']['apply'](null, arguments);
        }
          , _0x16a472 = cctvModule[_0x2fc976('0x6b')] = function() {
            var _0x101c5f = _0x2fc976;
            return cctvModule[_0x101c5f('0x67')][_0x101c5f('0x6b')][_0x101c5f('0xd2')](null, arguments);
        }
          , _0x11d38 = cctvModule[_0x2fc976('0x52')] = function() {
            var _0x28a199 = _0x2fc976;
            return cctvModule[_0x28a199('0x67')][_0x28a199('0x52')][_0x28a199('0xd2')](null, arguments);
        }
        ;
       // cctvModule.asm = _0x27cd46,  // [CYW]  [_0x2fc976('0x67')]cctvModule.asm
         //// 同步方式: 在 cctvModule.asm 已经被设置
//console.log("[DEBUG]@1693设置 cctvModule.asm : _jsmalloc=%s",""+cctvModule.asm._jsmalloc);        
        cctvModule.addFunction = _0x58e857;  // [_0x2fc976('0xed')] cctvModule.addFunction
        var _0x4f26f9;
        cctvModule.then = function(_0x527b68) {  // [_0x2fc976('0xa6')] .then
            if (_0x4f26f9)
                _0x527b68(cctvModule);
            else {
                var _0x26176e = cctvModule['onRuntimeInitialized'];
                cctvModule['onRuntimeInitialized'] = function() {
                    if (_0x26176e)
                        _0x26176e();
                    _0x527b68(cctvModule);
                }
                ;
            }
            return cctvModule;
        }
        ;
        function _0x26a576(_0x36d04e) {
            var _0x5a6e02 = _0x2fc976;
            this[_0x5a6e02('0x90')] = 'ExitStatus',
            this['message'] = _0x5a6e02('0x19') + _0x36d04e + ')',
            this[_0x5a6e02('0x9c')] = _0x36d04e;
        }
        _0x1c8814 = function _0xaa38f5() {
            if (!_0x4f26f9)
                _0x39184b();
            if (!_0x4f26f9)
                _0x1c8814 = _0xaa38f5;
        }
        ;
        function _0x39184b(_0x5ea9ee) {
            var _0x3c4419 = _0x2fc976;
            _0x5ea9ee = _0x5ea9ee || _0x4ad165;
            if (_0x2a18c7 > 0x0)
                return;
            _0x17c213();
            if (_0x2a18c7 > 0x0)
                return;
            function _0xf2efa4() {
                var _0x2c49c3 = a0_0x3077;
                if (_0x4f26f9)
                    return;
                _0x4f26f9 = !![];
                if (_0x3f003c)
                    return;
                _0x292999(),
                _0x791c70();
                if (cctvModule[_0x2c49c3('0xbb')])
                    cctvModule[_0x2c49c3('0xbb')]();
                _0x11cdcf();
            }
            cctvModule[_0x3c4419('0x34')] ? (cctvModule['setStatus'](_0x3c4419('0x3c')),
            setTimeout(function() {
                setTimeout(function() {
                    cctvModule['setStatus']('');
                }, 0x1),
                _0xf2efa4();
            }, 0x1)) : _0xf2efa4();
        }
        cctvModule[_0x2fc976('0xb')] = _0x39184b;  // .run
        function _0x4b6282(_0x4f9e47) {  // 
            var _0xb0b1ec = _0x2fc976;
            cctvModule['onAbort'] && cctvModule[_0xb0b1ec('0x62')](_0x4f9e47);
            _0x4f9e47 += '',
            _0x4f566b(_0x4f9e47),
            _0x5a9f7a(_0x4f9e47),
            _0x3f003c = !![],
            _0x5e924d = 0x1;
            throw 'abort(' + _0x4f9e47 + _0xb0b1ec('0x88');
        }
        cctvModule[_0x2fc976('0x6f')] = _0x4b6282;
        if (cctvModule[_0x2fc976('0x27')]) {
            if (typeof cctvModule['preInit'] == 'function')
                cctvModule[_0x2fc976('0x27')] = [cctvModule['preInit']];
            while (cctvModule[_0x2fc976('0x27')][_0x2fc976('0x9')] > 0x0) {
                cctvModule[_0x2fc976('0x27')][_0x2fc976('0x71')]()();
            }
        }
        return cctvModule[_0x2fc976('0x16')] = !![],
        _0x39184b(),
        _0x102ce4;
    }
    ;
}();
if (typeof exports === 'object' && typeof module === 'object')
    module['exports'] = CNTVModule;
else {
    if (typeof define === 'function' && define[_0x2b5eef('0x9d')])
        define([], function() {
            return CNTVModule;
        });
    else {
        if (typeof exports === 'object')
            exports[_0x2b5eef('0xe8')] = CNTVModule;
    }
}
var LiveAudio2 = function(_0x3e0fb4) {
    var _0x727cfa = _0x2b5eef;
    'use strict';
    var _0x291471 = {}, _0x268620 = {}, _0x5008d8 = {}, _0x50ce4e = {}, _0x3189bd = !![], _0x12f6b3, _0x197a79, _0x1480cd = function() {
        var _0x3ea85f = a0_0x3077
          , _0xf2f28c = new Object();
        return _0xf2f28c[_0x3ea85f('0x1f')] = typeof document[_0x3ea85f('0x81')] != _0x3ea85f('0x5f') && typeof document['implementation'][_0x3ea85f('0xe7')] != _0x3ea85f('0x5f') && typeof HTMLDocument != _0x3ea85f('0x5f'),
        _0xf2f28c[_0x3ea85f('0x7c')] = window[_0x3ea85f('0x1a')] ? !![] : ![],
        _0xf2f28c['isFirefox'] = navigator[_0x3ea85f('0x1d')][_0x3ea85f('0xbe')]()[_0x3ea85f('0x42')]('firefox') != -0x1,
        _0xf2f28c[_0x3ea85f('0xdf')] = navigator[_0x3ea85f('0x1d')]['toLowerCase']()[_0x3ea85f('0x42')](_0x3ea85f('0x68')) != -0x1 && navigator['userAgent'][_0x3ea85f('0xbe')]()[_0x3ea85f('0x42')](_0x3ea85f('0x8d')) == -0x1,
        _0xf2f28c[_0x3ea85f('0xab')] = navigator['userAgent']['toLowerCase']()['indexOf'](_0x3ea85f('0x21')) != -0x1,
        _0xf2f28c[_0x3ea85f('0x4f')] = navigator[_0x3ea85f('0x1d')][_0x3ea85f('0xbe')]()[_0x3ea85f('0x42')](_0x3ea85f('0x66')) != -0x1,
        _0xf2f28c[_0x3ea85f('0xf5')] = navigator[_0x3ea85f('0x1d')][_0x3ea85f('0xbe')]()[_0x3ea85f('0x42')](_0x3ea85f('0x8d')) != -0x1,
        console[_0x3ea85f('0xeb')](navigator[_0x3ea85f('0x1d')]),
        _0xf2f28c;
    }, _0x24209c = function(_0x19b69b) {
        var _0xae7ba1 = a0_0x3077;
        if (_0x12f6b3)
            return;
        try {
            var _0x30174f = _0x1480cd();
            _0x30174f[_0xae7ba1('0xfa')] ? (console[_0xae7ba1('0xeb')]('is\x20firfox'),
            _0x50ce4e[_0xae7ba1('0x6')] = 0x1,
            _0x50ce4e[_0xae7ba1('0x7b')] = 1.5) : (_0x50ce4e[_0xae7ba1('0x6')] = 1.8,
            _0x50ce4e[_0xae7ba1('0x7b')] = 0x2),
            _0x12f6b3 = new (window[(_0xae7ba1('0xf1'))] || window[(_0xae7ba1('0xdd'))])(),
            _0x197a79 = _0x12f6b3[_0xae7ba1('0x82')](_0x19b69b),
            _0x197a79[_0xae7ba1('0x5a')](_0x12f6b3['destination']);
        } catch (_0x3b71c0) {
            console['log'](_0x3b71c0);
        }
        return;
    };
    this[_0x727cfa('0xe3')] = function() {
        var _0x37d8c6 = _0x727cfa;
        try {
            _0x2f736d();
            if (_0x5008d8 && _0x5008d8[_0x37d8c6('0x87')]) {
                _0x197a79[_0x37d8c6('0x5a')](_0x5008d8[_0x37d8c6('0x87')]),
                _0x5008d8[_0x37d8c6('0x78')]['connect'](_0x12f6b3['destination']);
                return;
            }
            _0x5008d8['masterEnd'] = _0x12f6b3[_0x37d8c6('0x70')](),
            _0x5008d8['masterFirst'] = _0x12f6b3[_0x37d8c6('0x70')](),
            _0x5008d8[_0x37d8c6('0x87')][_0x37d8c6('0x5a')](_0x5008d8[_0x37d8c6('0x78')]),
            _0xd6db38(_0x5008d8[_0x37d8c6('0x87')], _0x5008d8[_0x37d8c6('0x78')]),
            _0x5dcd6a(_0x5008d8[_0x37d8c6('0x87')], _0x5008d8[_0x37d8c6('0x78')]),
            _0x197a79[_0x37d8c6('0x5a')](_0x5008d8[_0x37d8c6('0x87')]),
            _0x5008d8[_0x37d8c6('0x78')][_0x37d8c6('0x5a')](_0x12f6b3['destination']);
        } catch (_0x42f268) {
            console[_0x37d8c6('0xeb')](_0x42f268);
        }
    }
    ,
    this['connectDestHeadset'] = function() {
        var _0x2de30c = _0x727cfa;
        try {
            _0x2da5ab();
            if (_0x268620[_0x2de30c('0x87')] && _0x268620[_0x2de30c('0x78')]) {
                _0x197a79[_0x2de30c('0x5a')](_0x268620[_0x2de30c('0x87')]),
                _0x268620[_0x2de30c('0x78')][_0x2de30c('0x5a')](_0x12f6b3[_0x2de30c('0x59')]);
                return;
            }
            var _0x3ca78e = _0x12f6b3[_0x2de30c('0x70')]()
              , _0x41d7f8 = _0x12f6b3[_0x2de30c('0x70')]()
              , _0x1188a7 = _0x12f6b3['createGain']()
              , _0x1510b3 = _0x12f6b3[_0x2de30c('0x70')]()
              , _0x35a95b = _0x12f6b3[_0x2de30c('0x70')]()
              , _0x50a0db = _0x12f6b3[_0x2de30c('0x70')]();
            _0x268620[_0x2de30c('0x87')] = _0x3ca78e,
            _0x268620[_0x2de30c('0x78')] = _0x50a0db,
            _0x197a79[_0x2de30c('0x5a')](_0x3ca78e),
            _0x1510b3[_0x2de30c('0x35')]['value'] = 0.4,
            _0x41d7f8[_0x2de30c('0x35')][_0x2de30c('0xe9')] = 0.4,
            _0x3ca78e[_0x2de30c('0x5a')](_0x41d7f8),
            _0x49cd66(_0x41d7f8, _0x1188a7),
            _0x1188a7[_0x2de30c('0x5a')](_0x50a0db),
            _0x3ca78e['connect'](_0x1510b3),
            _0x30e02c(_0x1510b3, _0x35a95b),
            _0x35a95b[_0x2de30c('0x5a')](_0x50a0db),
            _0x50a0db[_0x2de30c('0x5a')](_0x12f6b3[_0x2de30c('0x59')]);
        } catch (_0xf8052d) {
            console[_0x2de30c('0xeb')](_0xf8052d);
        }
    }
    ;
    function _0x30e02c(_0xa65d3a, _0x5816ae) {
        var _0x1eab51 = _0x727cfa
          , _0x25b85b = _0x12f6b3[_0x1eab51('0x70')]()
          , _0x2324f3 = _0x12f6b3[_0x1eab51('0x70')]()
          , _0x477130 = _0x12f6b3[_0x1eab51('0x70')]()
          , _0x2f8653 = _0x12f6b3[_0x1eab51('0xdb')]();
        _0xa65d3a[_0x1eab51('0x5a')](_0x477130);
        var _0x3b06f4 = _0x12f6b3[_0x1eab51('0x4b')](0x2)
          , _0x2a9402 = _0x12f6b3['createChannelMerger'](0x2);
        _0xa65d3a[_0x1eab51('0x5a')](_0x3b06f4),
        _0x3b06f4[_0x1eab51('0x5a')](_0x25b85b, 0x0),
        _0x3b06f4[_0x1eab51('0x5a')](_0x2324f3, 0x1),
        _0x25b85b['connect'](_0x2a9402, 0x0, 0x1),
        _0x2324f3[_0x1eab51('0x5a')](_0x2a9402, 0x0, 0x0),
        _0x2a9402[_0x1eab51('0x5a')](_0x5816ae);
        try {
            var _0x2aa9a2 = _0x433631();
            _0x12f6b3['decodeAudioData'](_0x2aa9a2, function(_0x5f2ecf) {
                var _0x23d96d = _0x1eab51;
                _0x2f8653[_0x23d96d('0x0')] = _0x5f2ecf;
                var _0x5aceb5 = _0x5f2ecf[_0x23d96d('0xbf')](0x0)
                  , _0x4a4c4a = _0x5f2ecf['getChannelData'](0x1);
                for (var _0x362ed2 = 0x0; _0x362ed2 < _0x5aceb5[_0x23d96d('0x9')]; _0x362ed2++) {
                    _0x5aceb5[_0x362ed2] = _0x4a4c4a[_0x362ed2];
                }
                _0x2f8653['loop'] = ![],
                _0x2f8653[_0x23d96d('0x40')] = !![],
                _0x477130[_0x23d96d('0x35')][_0x23d96d('0xe9')] = _0x50ce4e[_0x23d96d('0x7b')],
                _0x477130['connect'](_0x2f8653),
                _0x2f8653['connect'](_0x5816ae);
            }, function(_0x535961) {
                var _0x1cd74e = _0x1eab51;
                _0x1cd74e('0xa3') + _0x535961[_0x1cd74e('0x18')];
            });
        } catch (_0x579bd9) {
            console[_0x1eab51('0xeb')](_0x579bd9);
        }
    }
    function _0x49cd66(_0x3a2043, _0x50d9e4) {
        var _0x26d115 = _0x727cfa
          , _0x5962ad = _0x12f6b3[_0x26d115('0x70')]()
          , _0x13801f = _0x12f6b3[_0x26d115('0x70')]()
          , _0x2c3317 = _0x12f6b3[_0x26d115('0xdb')]();
        _0x3a2043[_0x26d115('0x5a')](_0x13801f),
        _0x3a2043[_0x26d115('0x5a')](_0x5962ad),
        _0x5962ad[_0x26d115('0x5a')](_0x50d9e4);
        try {
            var _0x5ef1b4 = _0x433631();
            _0x12f6b3[_0x26d115('0x2a')](_0x5ef1b4, function(_0x348933) {
                var _0x3f137d = _0x26d115;
                _0x2c3317['buffer'] = _0x348933;
                var _0x1f616a = _0x348933[_0x3f137d('0xbf')](0x0)
                  , _0x45a603 = _0x348933['getChannelData'](0x1);
                for (var _0x393cdd = 0x0; _0x393cdd < _0x1f616a[_0x3f137d('0x9')]; _0x393cdd++) {
                    _0x45a603[_0x393cdd] = _0x1f616a[_0x393cdd];
                }
                _0x2c3317[_0x3f137d('0x32')] = ![],
                _0x2c3317[_0x3f137d('0x40')] = !![],
                _0x13801f[_0x3f137d('0x35')][_0x3f137d('0xe9')] = _0x50ce4e[_0x3f137d('0x7b')],
                _0x13801f[_0x3f137d('0x5a')](_0x2c3317),
                _0x2c3317[_0x3f137d('0x5a')](_0x50d9e4);
            }, function(_0x59396a) {
                var _0x14d5ae = _0x26d115;
                _0x14d5ae('0xa3') + _0x59396a[_0x14d5ae('0x18')];
            });
        } catch (_0x10e1e7) {
            console[_0x26d115('0xeb')](_0x10e1e7);
        }
    }
    function _0xd6db38(_0x32701f, _0x146782) {
        var _0x1a8b2d = _0x727cfa
          , _0x381b5e = _0x12f6b3[_0x1a8b2d('0x70')]()
          , _0x5422fb = _0x12f6b3[_0x1a8b2d('0xdb')]();
        _0x32701f['connect'](_0x381b5e);
        try {
            var _0x30383f = _0x433631();
            _0x12f6b3[_0x1a8b2d('0x2a')](_0x30383f, function(_0x3c4804) {
                var _0x622845 = _0x1a8b2d;
                _0x5422fb[_0x622845('0x0')] = _0x3c4804,
                _0x5422fb[_0x622845('0x32')] = ![],
                _0x5422fb[_0x622845('0x40')] = !![],
                _0x381b5e['gain']['value'] = _0x50ce4e['louderSpeakerGain'],
                _0x381b5e[_0x622845('0x5a')](_0x5422fb),
                _0x5422fb[_0x622845('0x5a')](_0x146782);
            }, function(_0x55bae0) {
                var _0x4e2ae9 = _0x1a8b2d;
                _0x4e2ae9('0xa3') + _0x55bae0['err'];
            });
        } catch (_0x5e8ce5) {
            console[_0x1a8b2d('0xeb')](_0x5e8ce5);
        }
    }
    function _0x5dcd6a(_0xfe3369, _0x139985) {
        var _0x346f98 = _0x727cfa
          , _0x1bfded = _0x12f6b3['createGain']()
          , _0x49017a = _0x12f6b3[_0x346f98('0xdb')]();
        _0xfe3369[_0x346f98('0x5a')](_0x1bfded);
        try {
            var _0x2a2b74 = _0x433631();
            _0x12f6b3[_0x346f98('0x2a')](_0x2a2b74, function(_0x289c52) {
                var _0x25f08e = _0x346f98, _0x11c36a = _0x289c52[_0x25f08e('0xbf')](0x0), _0x20b82f = _0x289c52['getChannelData'](0x1), _0x2b9fda;
                for (var _0x3df154 = 0x0; _0x3df154 < _0x11c36a[_0x25f08e('0x9')]; _0x3df154++) {
                    _0x2b9fda = _0x11c36a[_0x3df154],
                    _0x11c36a[_0x3df154] = _0x20b82f[_0x3df154],
                    _0x20b82f[_0x3df154] = _0x2b9fda;
                }
                _0x49017a[_0x25f08e('0x0')] = _0x289c52,
                _0x49017a[_0x25f08e('0x32')] = ![],
                _0x49017a[_0x25f08e('0x40')] = !![],
                _0x1bfded[_0x25f08e('0x35')]['value'] = _0x50ce4e[_0x25f08e('0x6')],
                _0x1bfded[_0x25f08e('0x5a')](_0x49017a),
                _0x49017a[_0x25f08e('0x5a')](_0x139985);
            }, function(_0x2b563c) {
                var _0x1f97ef = _0x346f98;
                'Error\x20with\x20decoding\x20audio\x20data' + _0x2b563c[_0x1f97ef('0x18')];
            });
        } catch (_0x4f58e9) {
            console['log'](_0x4f58e9);
        }
    }
    function _0x433631() {
        var _0x55c4b2 = _0x727cfa, _0x250168 = 0x249f0, _0xb6474b, _0x22b597;
        try {
            _0xb6474b = CNTVH5PlayerModule['_jsmalloc'](_0x250168 + 0x80),
            _0x22b597 = CNTVH5PlayerModule[_0x55c4b2('0x53')](_0xb6474b, _0x250168);
            let _0x3f8b90 = new Uint8Array(_0x22b597);
            for (let _0x5c5438 = 0x0; _0x5c5438 < _0x22b597; _0x5c5438++) {
                _0x3f8b90[_0x5c5438] = CNTVH5PlayerModule[_0x55c4b2('0xc6')][_0xb6474b + _0x5c5438];
            }
            let _0x428992 = _0x3f8b90[_0x55c4b2('0x0')];
            return CNTVH5PlayerModule[_0x55c4b2('0xe1')](_0x428992),
            _0x428992;
        } catch (_0x4117e3) {
            console[_0x55c4b2('0xeb')]('ee:', _0x4117e3);
        }
        return CNTVH5PlayerModule['_jsfree'](_0xb6474b),
        null;
    }
    var _0x1508c7 = function() {
        if (!_0x197a79)
            return;
        _0x197a79['disconnect'](),
        connectDest1();
    };
    function _0x2f736d() {
        var _0x47842d = _0x727cfa;
        _0x197a79[_0x47842d('0xb9')](),
        _0x268620 && _0x268620[_0x47842d('0x78')] && _0x268620['masterEnd']['disconnect']();
    }
    function _0x2da5ab() {
        var _0xf70eb5 = _0x727cfa;
        _0x197a79['disconnect'](),
        _0x5008d8 && _0x5008d8['masterEnd'] && _0x5008d8[_0xf70eb5('0x78')][_0xf70eb5('0xb9')]();
    }
    function _0x45f63a() {
        _0x197a79['connect'](_0x12f6b3['destination']);
    }
    this[_0x727cfa('0x61')] = function() {
        var _0x6fe3ae = _0x727cfa;
        if (!_0x197a79)
            return;
        _0x2f736d(),
        _0x2da5ab(),
        _0x197a79[_0x6fe3ae('0x5a')](_0x12f6b3['destination']);
    }
    ,
    _0x24209c(_0x3e0fb4),
    this['isCrossAudio'] = _0x3189bd,
    this[_0x727cfa('0xbc')] = function() {
        return _0x1480cd();
    }
    ;
    return;
};
/*2022-08-05 15:06:18 596ac468ae1c208b10d9fce996b97a31*/
;console.debug('Woker_BTime:', '2022-08-05 15:06:18');
