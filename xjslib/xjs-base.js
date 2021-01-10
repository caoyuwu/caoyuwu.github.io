/*xjs/core/Xjs.java*/
Xjs = {
    version:'2.0.210108',
    loadedXjs:[],
    objectTypes:{'regexp':RegExp,'array':Array,'date':Date,'error':Error},
    ROOTPATH:"",
    isDebug:true,
    isDebugMode:true,
    /*xjs.core.Xjs.apply*/
    apply:function(o,src)
    {
        if(o != null)
            for(var i=arguments.length - 1;i > 0;i--)
            {
                var c = arguments[i];
                if(typeof(c) == "object")
                {
                    for(var p in c)
                    {
                        o[p] = c[p];
                    }
                }
            }
        return o;
    },
    /*xjs.core.Xjs._bindReady*/
    _bindReady:function()
    {
        if(Xjs._readyList)
            return;
        Xjs._readyList = [];
        if(document.readyState === "complete")
        {
            setTimeout(Xjs._ready,1);
            return;
        }
        if(document.addEventListener)
        {
            document.addEventListener("DOMContentLoaded",Xjs._DOMLoaded,false);
            window.addEventListener("load",Xjs._ready,false);
        } else if(document.attachEvent)
        {
            document.attachEvent("onreadystatechange",Xjs._DOMLoaded);
            window.attachEvent("onload",Xjs._ready);
            var toplevel = false;
            try
            {
                toplevel = window.frameElement == null;
            }catch(ex)
            {
            }
            if(document.documentElement.doScroll && toplevel)
                Xjs._doScrollCheck();
        }
    },
    /*xjs.core.Xjs._ready*/
    _ready:function()
    {
        if(!Xjs._isReady)
        {
            if(!document.body)
            {
                setTimeout(Xjs._ready,1);
                return;
            }
            Xjs._isReady = true;
            for(;Xjs._readyList.length > 0;)
            {
                var f = Xjs._readyList[0];
                Xjs._readyList.splice(0,1);
                f.call();
            }
        }
    },
    /*xjs.core.Xjs.onDocReady*/
    onDocReady:function(f,scorp,args)
    {
        if(f)
        {
            if(Xjs._isReady || !Xjs._readyList)
            {
                f.apply(scorp || window,args || []);
            } else 
                Xjs._readyList.push(new Xjs.FuncCall(f,scorp,args));
        }
    },
    /*xjs.core.Xjs._doScrollCheck*/
    _doScrollCheck:function()
    {
        if(Xjs._isReady)
        {
            return;
        }
        try
        {
            document.documentElement.doScroll("left");
        }catch(ex)
        {
            setTimeout(Xjs._doScrollCheck,1);
            return;
        }
        Xjs._ready();
    },
    /*xjs.core.Xjs.typeOf*/
    typeOf:function(v)
    {
        var type = typeof(v);
        if(type != "object")
            return type;
        if(v == null)
            return "null";
        for(var i in Xjs.objectTypes)
        {
            if(v.constructor == Xjs.objectTypes[i])
                return i;
        }
        return "object";
    },
    /*xjs.core.Xjs.isArray*/
    isArray:function(v)
    {
        return v instanceof Array;
    },
    /*xjs.core.Xjs.isDate*/
    isDate:function(v)
    {
        return v instanceof Date;
    },
    /*xjs.core.Xjs.applyIf*/
    applyIf:function(o,c)
    {
        if(o && c)
            for(var p in c)
            {
                if(o[p] === undefined)
                    o[p] = c[p];
            }
        return o;
    },
    /*xjs.core.Xjs.filterApply*/
    filterApply:function(o,filter,atgs)
    {
        if(o != null)
            for(var i=arguments.length - 1;i > 1;i--)
            {
                var c = arguments[i];
                if(typeof(c) == "object")
                    for(var p in c)
                    {
                        var op = filter ? filter(p,c) : p;
                        if(op)
                            o[op] = c[p];
                    }
            }
        return o;
    },
    /*xjs.core.Xjs.namespace*/
    namespace:function()
    {
        var a = arguments;
        if(a != null)
            for(var i=0;i < a.length;++i)
            {
                var d = a[i].split("."),
                    o = window;
                for(var j=0;j < d.length;++j)
                {
                    if(o[d[j]] === undefined)
                        o[d[j]] = {};
                    o = o[d[j]];
                }
            }
    },
    /*xjs.core.Xjs.getHTMLHead*/
    getHTMLHead:function()
    {
        return document.getElementsByTagName("head")[0];
    },
    /*xjs.core.Xjs.getIEVersion*/
    getIEVersion:function(ua)
    {
        var ieInfo = ua.match(/msie [\d.]+;/gi);
        if(!ieInfo)
        {
            ieInfo = ua.match(/rv:[\d.]+/);
        }
        return ieInfo && ieInfo.length > 0 ? parseInt((ieInfo[0]).replace(/[^0-9.]/ig,"")) : 0;
    },
    /*xjs.core.Xjs.extend*/
    extend:function(sb,_sp,overrides)
    {
        if(_sp == null || sb == null)
            try
            {
                console.trace();
            }catch(ex)
            {
            }
        var oc = Object.prototype.constructor,
            overridesA,
            sp;
        if(typeof(_sp) == "object")
        {
            overridesA = Array.prototype.slice.call(arguments,1);
            overrides = _sp;
            sp = sb;
            sb = overrides.constructor != oc ? overrides.constructor : function(){
            sp.apply(this,arguments);
        };
        } else 
        {
            sp = _sp;
            overridesA = Array.prototype.slice.call(arguments,2);
        }
        var F = function(){},
            spp = sp.prototype;
        F.prototype = spp;
        var sbp = sb.prototype = new F();
        sbp.constructor = sb;
        sb.superclass = spp;
        if(spp.constructor == oc)
        {
            spp.constructor = sp;
        }
        for(var j=0;j < overridesA.length;j++)
        {
            Xjs.apply(sbp,overridesA[j]);
        }
        return sb;
    },
    /*xjs.core.Xjs.getDefinedArg*/
    getDefinedArg:function(args)
    {
        var n = arguments.length;
        for(var i=0;i < n;i++)
        {
            if(arguments[i] !== undefined)
                return arguments[i];
        }
        return;
    },
    /*xjs.core.Xjs.urlEncode*/
    urlEncode:function(o)
    {
        if(!o)
            return "";
        var buf = [];
        for(var key in o)
        {
            var ov = o[key];
            if(ov == null)
                continue;
            var k = encodeURIComponent(key),
                type = typeof(ov),
                v = null;
            if(type != "function" && type != "object")
            {
                v = encodeURIComponent(ov);
            } else if(Xjs.isDate(ov))
            {
                v = encodeURIComponent(ov.format());
            }
            if(v)
            {
                buf.push(k,"=",v,"&");
            }
        }
        buf.pop();
        return buf.join("");
    },
    /*xjs.core.Xjs.addUrlParameter*/
    addUrlParameter:function(url,nm,val)
    {
        return url == null ? url : url + (url.indexOf("?") < 0 ? "?" : "&") + nm + "=" + encodeURIComponent(val);
    },
    /*xjs.core.Xjs.hasElement*/
    hasElement:function(x)
    {
        if(!x)
            return false;
        for(var p in x)
            return true;
        return false;
    },
    /*xjs.core.Xjs.elementEquals*/
    elementEquals:function(v1,v2)
    {
        if(v1 == v2)
            return true;
        if(!v1 || !v2)
            return false;
        var d1,
            d2 = v2 instanceof Date;
        if((d1 = v1 instanceof Date) && d2)
        {
            return v1.getTime() == v2.getTime();
        }
        if(d1 || d2)
            return false;
        if(typeof(v1) != "object" || typeof(v2) != "object")
            return false;
        var cmped = {};
        for(var p in v1)
        {
            if(!Xjs.elementEquals(v1[p],v2[p]))
                return false;
            cmped[p] = true;
        }
        for(var p in v2)
        {
            if(!cmped[p] && !Xjs.elementEquals(v1[p],v2[p]))
                return false;
        }
        return true;
    },
    /*xjs.core.Xjs.deepClone*/
    deepClone:function(o)
    {
        if(o == null)
            return null;
        if(o instanceof Array)
        {
            var a = new Array(o.length);
            for(var i=0;i < a.length;i++)
                a[i] = Xjs.deepClone(o[i]);
            return a;
        }
        if(typeof(o) != "object" || o instanceof Date)
            return o;
        var v = {};
        for(var p in o)
        {
            v[p] = Xjs.deepClone(o[p]);
        }
        return v;
    },
    /*xjs.core.Xjs.deepReplace*/
    deepReplace:function(o,ifEq,replaceV)
    {
        if(o == null)
            return null;
        if(o instanceof Array)
        {
            var a = o;
            for(var i=0;i < a.length;i++)
                a[i] = Xjs.deepReplace(o[i],ifEq,replaceV);
            return o;
        }
        if(o == ifEq)
            return replaceV;
        if(typeof(o) == "object" && !(o instanceof Date))
        {
            for(var p in o)
            {
                var x1 = o[p],
                    x2 = Xjs.deepReplace(x1,ifEq,replaceV);
                if(x1 != x2)
                {
                    o[p] = x2;
                }
            }
        }
        return o;
    },
    /*xjs.core.Xjs.objcmp*/
    objcmp:function(v1,v2,nullLast)
    {
        if(v1 == v2)
            return 0;
        if(v1 == null)
            return nullLast ? 1 : -1;
        if(v2 == null)
            return nullLast ? -1 : 1;
        if(v1 instanceof Date && v2 instanceof Date)
        {
            v1 = v1.getTime();
            v2 = v2.getTime();
        }
        return v1 < v2 ? -1 : 1;
    },
    /*xjs.core.Xjs.objEquals*/
    objEquals:function(v1,v2)
    {
        if(v1 == v2)
            return true;
        if(v1 == null || v2 == null)
            return false;
        if(v1 instanceof Date && v2 instanceof Date)
        {
            return v1.getTime() == v2.getTime();
        }
        return false;
    },
    /*xjs.core.Xjs.objCmp*/
    objCmp:function(v1,v2)
    {
        if(v1 == null)
        {
            return v2 == null ? 0 : -1;
        } else if(v2 == null)
        {
            return 1;
        } else 
        {
            if(v1 instanceof Date && v2 instanceof Date)
            {
                v1 = v1.getTime();
                v2 = v2.getTime();
            }
            return v1 == v2 ? 0 : (v1 < v2 ? -1 : 1);
        }
    },
    /*xjs.core.Xjs.toFullURL*/
    toFullURL:function(url,m)
    {
        if(url == null)
            return null;
        if(url.startsWith("~/"))
        {
            return Xjs.ROOTPATH + url.substring(2);
        }
        if(url.indexOf("://") < 0 && !url.startsWith("/") && !url.startsWith("data:"))
        {
            for(;url.startsWith("./");)
                url = url.substring(2);
            switch(m || 0)
            {
            case 0:
                return Xjs.ROOTPATH + url;
            case 2:
                {
                    var base = window.location.href,
                        s = url,
                        p = base.lastIndexOf('/');
                    for(;;)
                    {
                        if(p < 0)
                            break;
                        if(!s.startsWith("../"))
                        {
                            return base.substring(0,p + 1) + s;
                        }
                        s = s.substring(3);
                        base = base.substring(0,p);
                        p = base.lastIndexOf('/');
                    }
                    break;
                }
            }
        }
        return url;
    },
    /*xjs.core.Xjs.loadUrlRES*/
    loadUrlRES:function(url,cache)
    {
        var p = url.indexOf("${theme}");
        if(p >= 0)
            url = url.substring(0,p) + Xjs.getTheme() + url.substring(p + 8);
        url = Xjs.toFullURL(url,0);
        if(Xjs._$urlResBuffered != null && Xjs._$urlResBuffered[url])
            return Xjs._$urlResBuffered[url];
        else 
        {
            var html = Xjs.Ajax.invoke(url,null,null,"GET",1);
            if(cache)
            {
                if(Xjs._$urlResBuffered == null)
                    Xjs._$urlResBuffered = {};
                Xjs._$urlResBuffered[url] = html;
            }
            return html;
        }
    },
    /*xjs.core.Xjs._getDelegate0*/
    _getDelegate0:function(o,m)
    {
        var k = "_$fn$Delegate0$." + m,
            f = o[k];
        if(!f)
            o[k] = f = o[m].createDelegate(o);
        return f;
    },
    /*xjs.core.Xjs.getLocalLang*/
    getLocalLang:function(dft)
    {
        return navigator.language || navigator.browserLanguage || dft;
    },
    /*xjs.core.Xjs.trueFn*/
    trueFn:function()
    {
        return true;
    },
    /*xjs.core.Xjs.falseFn*/
    falseFn:function()
    {
        return false;
    },
    /*xjs.core.Xjs.emptyFn*/
    emptyFn:function()
    {
    },
    /*xjs.core.Xjs.nullFn*/
    nullFn:function()
    {
        return null;
    },
    /*xjs.core.Xjs.alertErr*/
    alertErr:function(ex,opts)
    {
        if(ex && !ex.dummy)
        {
            var s = ex.description || ex.message || ex.toString();
            if(ex.name == "NetworkError")
            {
                alert(s);
                return;
            }
            if(ex.showMethod)
            {
                ex.showMethod(ex,opts);
                return;
            }
            if(Xjs.onAppError)
                for(var i=0;i < Xjs.onAppError.length;i++)
                {
                    var v = Xjs.onAppError[i].call(window,0,ex);
                    if(v)
                        return;
                }
            var title = "Error";
            try
            {
                title = Xjs.ResBundle.getString("UI","Dlg.Error");
            }catch(x)
            {
            }
            Xjs.ui.UIUtil.showErrorDialog(title,s,ex.onClosing,null,(opts || 0) | 0x10);
            if(ex.debugMessage && window.console)
            {
                window.console.log(ex.debugMessage);
            }
            if(window._debug_)
            {
                window.console.trace(ex);
            }
        }
    },
    /*xjs.core.Xjs.promiseCommit*/
    promiseCommit:function(a,v,reject)
    {
        if(a)
            for(var i=0;i < a.length;i++)
            {
                if(reject)
                    a[i].reject(v);
                else 
                    a[i].resolve(v);
            }
    },
    /*xjs.core.Xjs.joinPromiseCommit*/
    joinPromiseCommit:function(o,name)
    {
        var k = name || "_promiseCommits";
        return new Promise(function(resolve,reject){
            var r = {resolve:resolve,reject:reject};
            if(o[k])
                (o[k]).push(r);
            else 
                o[k] = [r];
        });
    },
    /*xjs.core.Xjs.getTheme*/
    getTheme:function()
    {
        var theme = window.EnvParameter.theme;
        if(theme && theme.length == 1)
            theme = "theme" + theme;
        return theme || "theme0";
    },
    /*xjs.core.Xjs.newRootPath*/
    newRootPath:function(path)
    {
        if(!path || path == "")
            return Xjs.ROOTPATH;
        var p1 = Xjs.splitURLPath(Xjs.ROOTPATH),
            p2 = Xjs.splitURLPath(path);
        if(!p2.host)
            p2.host = p1.host;
        if(!p2.path)
            p2.path = p1.path;
        return p2.host + p2.path + "/";
    },
    /*xjs.core.Xjs.getThemePath*/
    getThemePath:function()
    {
        return Xjs.ROOTPATH + Xjs.getTheme();
    },
    /*xjs.core.Xjs.relativeToRoot*/
    relativeToRoot:function(uri)
    {
        if(!uri)
            uri = document.baseURI;
        var p = Xjs.splitURLPath(uri),
            s = null,
            n = 0;
        for(var i=1;i < p.path.length;i++)
        {
            if(p.path.charCodeAt(i) == 0x2f && n++ > 0)
            {
                s = s == null ? ".." : s + "/..";
            }
        }
        return s;
    },
    /*xjs.core.Xjs.getDefResPath*/
    getDefResPath:function()
    {
        return Xjs.getTheme() + "/xjsres";
    },
    /*xjs.core.Xjs.getReqParameters*/
    getReqParameters:function()
    {
        if(Xjs.reqParameter)
            return Xjs.reqParameter;
        var m = Xjs.reqParameter = {},
            fnParse = function(s){
            var a = s.split("&");
            for(var i=0;i < a.length;i++)
            {
                var p = a[i].indexOf('=');
                if(p > 0)
                {
                    m[a[i].substring(0,p)] = decodeURIComponent(a[i].substring(p + 1));
                }
            }
        };
        if(window.location.search && window.location.search.length > 1)
        {
            fnParse(window.location.search.substring(1));
        }
        if(window.location.hash && window.location.hash.startsWith("#?"))
        {
            fnParse(window.location.hash.substring(2));
        }
        return m;
    },
    /*xjs.core.Xjs.setWinReqParams*/
    setWinReqParams:function()
    {
        var m = Xjs.getReqParameters(),
            setPIFrmSize = 0;
        for(var name in m)
        {
            switch(name)
            {
            case "AutoRefresh":
                window.EnvParameter.autoRefresh = parseInt(m[name]);
                continue;
            case "wsp":
            case "lang":
                continue;
            case "_ForPrint_":
                window.EnvParameter.forPrint = parseInt(m[name]);
                continue;
            case "_Win.DOCTITLE":
                window.document.title = m[name];
                continue;
            }
            if(name.startsWith("$Xjs$."))
            {
                var n = name.substring(6),
                    v = m[name];
                if(n == "FitPIFrmSize")
                {
                    setPIFrmSize = parseInt(v);
                    continue;
                }
                window.Xjs[n] = v;
                continue;
            }
            window.EnvParameter.ReqParameter[name] = m[name];
        }
        if(window.xjsConfig && window.xjsConfig.FitPIFrmSize)
            setPIFrmSize |= window.xjsConfig.FitPIFrmSize;
        if(setPIFrmSize > 0 && window != window.parent)
        {
            Xjs.addWDocResized(Xjs.ui.UIUtil.fitPIFrameSize,null,[null,setPIFrmSize]);
        }
        if(window.EnvParameter.forPrint > 0)
        {
            Xjs.DOM.addClass(document.documentElement,"ui-page-forprint");
            Xjs.DOM.addClass(document.documentElement,"ui-page-forprint" + window.EnvParameter.forPrint);
        }
    },
    /*xjs.core.Xjs.getReqParameter*/
    getReqParameter:function(n)
    {
        return Xjs.getReqParameters()[n];
    },
    /*xjs.core.Xjs.setHistoryState*/
    setHistoryState:function(name,value)
    {
        var s;
        if(window.history.state)
        {
            s = window.history.state;
            if(value == null)
                delete s[name];
            else 
                s[name] = value;
        } else 
        {
            if(value == null)
                return;
            s = {};
            s[name] = value;
        }
        window.history.replaceState(s,window.title,window.location.href);
    },
    /*xjs.core.Xjs.getHistoryState*/
    getHistoryState:function(name)
    {
        return window.history.state ? window.history.state[name] : null;
    },
    /*xjs.core.Xjs.getCookie*/
    getCookie:function(n)
    {
        if(!document.cookie)
            return null;
        var a = document.cookie.split(";"),
            ne = n + "=";
        for(var i=0;i < a.length;i++)
        {
            var s = a[i].trim();
            if(s.startsWith(ne))
                return s.substring(n.length + 1);
        }
        return null;
    },
    /*xjs.core.Xjs.setCookie*/
    setCookie:function(n,v)
    {
        document.cookie = n + "=" + v;
    },
    /*xjs.core.Xjs.getSessionID*/
    getSessionID:function()
    {
        return Xjs.RInvoke.rsvInvoke("snsoft.bas.ui.service.homepage.LoginService.getSessionID");
    },
    /*xjs.core.Xjs.newRSSOURL*/
    newRSSOURL:function(nmSID,root,path)
    {
        var url = (root || Xjs.ROOTPATH) + path,
            key = Xjs.getCookie(nmSID || "RSESSIONID");
        if(!key || key == "")
        {
            key = Xjs.getSessionID();
        }
        if(key == null)
        {
            return url;
        }
        var p = url.indexOf("?");
        return p >= 0 ? url.substring(0,p) + ";_ssosessionid=" + key + url.substring(p) : url + ";_ssosessionid=" + key;
    },
    /*xjs.core.Xjs.wopen*/
    wopen:function(url,name,features)
    {
        window.open(url,name,features);
    },
    /*xjs.core.Xjs.getPageState*/
    getPageState:function(pgTag,name)
    {
        if(window.nativeAPI)
            return window.nativeAPI.sys.getSessionVal(pgTag + "." + name);
        return Xjs.getHistoryState(name);
    },
    /*xjs.core.Xjs.setPageState*/
    setPageState:function(pgTag,name,val)
    {
        if(window.nativeAPI)
            window.nativeAPI.sys.setSessionVal(pgTag + "." + name,val);
        else 
            Xjs.setHistoryState(name,val);
    },
    /*xjs.core.Xjs.checkWDocResized*/
    checkWDocResized:function()
    {
        if(Xjs.onWDocResized)
        {
            Xjs._onWDocResized();
        }
    },
    /*xjs.core.Xjs._onWDocResized*/
    _onWDocResized:function()
    {
        var h = Math.max(document.documentElement.offsetHeight),
            w = Math.max(document.documentElement.offsetWidth),
            absDoms = Xjs.DOM.findAll(".ui-layer-frame",null);
        if(absDoms)
            for(var i=0;i < absDoms.length;i++)
            {
                var e = absDoms[i];
                if(!Xjs.DOM.isShowing(e))
                    continue;
                var xy = Xjs.DOM.getXY(e),
                    h2 = xy.y + Xjs.DOM.getHeight(e);
                if(h < h2)
                    h = h2;
                var w2 = xy.x + Xjs.DOM.getWidth(e);
                if(w < w2)
                    w = w2;
            }
        if(Xjs._lastWDocSize && Xjs._lastWDocSize.width == w && Xjs._lastWDocSize.height == h)
        {
            return false;
        }
        Xjs._lastWDocSize = {width:w,height:h};
        if(Xjs.onWDocResized)
            for(var i=0;i < Xjs.onWDocResized.length;i++)
            {
                var f = Xjs.onWDocResized[i];
                f.call(Xjs._lastWDocSize);
            }
        return true;
    },
    /*xjs.core.Xjs.addWDocResized*/
    addWDocResized:function(f,scorp,args)
    {
        if(!Xjs.onWDocResized)
            Xjs.onWDocResized = [];
        if(!args || args.length == 0)
            args = new Array(1);
        Xjs.onWDocResized.push(new Xjs.FuncCall(f,scorp,args));
    },
    /*xjs.core.Xjs.rlog*/
    rlog:function(level,logName,logText)
    {
        Xjs.RInvoke.rmInvoke("snsoft.ui.xjs.XjsUtils.rlog",level,logName,logText);
    },
    /*xjs.core.Xjs.debug*/
    debug:function(msg)
    {
        if(Xjs.isDebugMode)
        {
            var name = arguments.callee.caller.name;
            console.log(name + "->" + msg);
        }
    },
    /*xjs.core.Xjs.splitURLPath*/
    splitURLPath:function(url)
    {
        var up = {},
            p0 = url.indexOf("://");
        if(p0 < 0)
        {
            up.path = url;
        } else 
        {
            var p = url.indexOf("/",p0 + 3);
            up.host = p > 0 ? url.substring(0,p) : url;
            up.path = p > 0 ? url.substring(p) : "";
        }
        if(up.path)
        {
            if(up.path.endsWith("/"))
                up.path = up.path.substring(0,up.path.length - 1);
            if(!up.path.startsWith("/") && up.path != "")
                up.path = "/" + up.path;
        }
        return up;
    },
    /*xjs.core.Xjs.rconsoleLog*/
    rconsoleLog:function(s)
    {
        try
        {
            Xjs.RInvoke.rmInvoke("snsoft.ui.test.Test.println",{XJSLOG:s});
        }catch(ex)
        {
            window.console.log(s + ":" + ex);
        }
    },
    /*xjs.core.Xjs.isAdmin*/
    isAdmin:function(wadm)
    {
        return window.EnvParameter && !!(window.EnvParameter.WADMIN & wadm);
    }
};
(function(){
    var ua = Xjs.ua = (window.$userAgent || navigator.userAgent).toLowerCase();
    if(ua.indexOf("windows") > 0)
        Xjs.osType = 1;
    else if(ua.indexOf("macintosh") > 0)
        Xjs.osType = 2;
    else 
        Xjs.osType = 0;
    var p = 0;
    if(ua.indexOf("opera") >= 0)
        Xjs.isOpera = true;
    Xjs.isStrict = document.compatMode == "CSS1Compat";
    if(navigator.appVersion.indexOf("Chrome/") > 0)
        Xjs.isChrome = true;
    if(ua.indexOf("mobile") >= 0)
        Xjs.isMobile = true;
    if(new RegExp("android","gi").test(navigator.appVersion))
        Xjs.TouchDev = 3;
    else if(new RegExp("ipad","gi").test(navigator.appVersion))
        Xjs.TouchDev = 1;
    else if(new RegExp("iphone","gi").test(navigator.appVersion))
        Xjs.TouchDev = 2;
    else if(new RegExp("iemobile","gi").test(navigator.appVersion) || new RegExp("touch","gi").test(navigator.appVersion) && new RegExp("msie","gi").test(navigator.appVersion))
        Xjs.TouchDev = 4;
    else if(ua.indexOf("; adr ") > 0)
        Xjs.TouchDev = 3;
    else if(ua.indexOf("x11; u; linux") > 0)
        Xjs.TouchDev = 11;
    if(new RegExp("webkit|khtml").test(ua) && !Xjs.isChrome)
        Xjs.isSafari = true;
    if(!Xjs.isOpera && (p = ua.indexOf("msie")) > -1 || 'ActiveXObject' in window)
        Xjs.isIE = true;
    if(ua.indexOf("trident") > 0)
        Xjs.isTrident = true;
    else if(!Xjs.isSafari && !Xjs.isChrome && ua.indexOf("gecko") >= 0)
        Xjs.isGecko = true;
    else if(ua.indexOf("applewebkit") >= 0)
        Xjs.isWebKit = true;
    if(ua.indexOf("firefox") >= 0)
        Xjs.isFirefox = true;
    if(Xjs.isIE && !Xjs.isStrict)
        Xjs.isBorderBox = true;
    Xjs.$browserVer = Xjs.isIE ? Xjs.getIEVersion(ua) : 0;
    if(ua.indexOf("x11; u; linux") >= 0 || ua.indexOf("ucbrowser") >= 0)
        Xjs.isUC = true;
    if(ua.indexOf("micromessenger") >= 0)
        Xjs.isWeiXin = true;
    if(Xjs.isIE)
        Xjs.$browser = "ie";
    else if(Xjs.isGecko)
        Xjs.$browser = "gecko";
    else if(Xjs.isOpera)
        Xjs.$browser = "opera";
    else if(Xjs.isSafari)
        Xjs.$browser = "safari";
    else if(Xjs.isChrome)
        Xjs.$browser = "chrome";
    Xjs.namespace("Xjs.util","Xjs.io","Xjs.ui","Xjs.dx","Xjs.table","UI");
    if(!window.EnvParameter)
        window.EnvParameter = {};
    var els = document.getElementsByTagName("script");
    for(var i=0,len=els.length;i < len;i++)
    {
        var src = els[i].src;
        if(src == null || src == "" || src.indexOf("/xjs-base.js") < 0 && src.indexOf("/xjs-core.js") < 0)
            continue;
        p = src.indexOf("/xjslib");
        if(p > 0)
        {
            Xjs.ROOTPATH = src.substring(0,p + 1);
            break;
        }
    }
    if(Xjs.isIE)
    {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = false;
        s.src = Xjs.ROOTPATH + "jslib/ie/ie-polyfill.min.js";
        Xjs.getHTMLHead().appendChild(s);
    }
    if(!Function.prototype.bind)
    {
        Function.prototype.bind = function(oThis){
            if(typeof(this) != "function")
                throw new Error("Function.prototype.bind");
            var aArgs = Array.prototype.slice.call(arguments,1),
                fToBind = this,
                fNOP = function(){},
                fBound = function(){
            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,aArgs.concat(Array.prototype.slice.call(arguments)));
        };
            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();
            return fBound;
        };
    }
    if(document.addEventListener)
    {
        Xjs._DOMLoaded = function(){
            document.removeEventListener("DOMContentLoaded",Xjs._DOMLoaded,false);
            Xjs._ready();
        };
    } else if(document.attachEvent)
    {
        Xjs._DOMLoaded = function(){
            if(document.readyState == "complete")
            {
                document.detachEvent("onreadystatechange",Xjs._DOMLoaded);
                Xjs._ready();
            }
        };
    }
    Xjs._bindReady();
})();
Xjs.apply(Function,{
    /*xjs.core.XFunction._eventListenerCall*/
    _eventListenerCall:function(event,func,_this,catchErr,forcus,_by,_exArgs)
    {
        var args = [event || window.event,_by];
        if(_exArgs)
            Array.pushAll(args,_exArgs);
        if(catchErr)
        {
            try
            {
                return func.apply(_this,args);
            }catch(ex)
            {
                if(Xjs.alertErr)
                {
                    if(forcus && forcus . focusLatter && !ex.onClosing)
                        ex.onClosing = new Xjs.FuncCall(forcus.focusLatter,forcus);
                    Xjs.alertErr(ex);
                } else 
                {
                    alert(ex);
                }
                return null;
            }
        } else 
        {
            return func.apply(_this,args);
        }
    },
    /*xjs.core.XFunction.bindAsEventListener*/
    bindAsEventListener:function(func,_this,timeout,catchErr,forcus,exArgs)
    {
        if(func == null)
            throw new Error("func is null");
        if(timeout > 0)
        {
            return function(e){
            var _s = this;
            setTimeout(function(){
            return Function._eventListenerCall(e,func,_this,catchErr,forcus,_s,exArgs);
        },timeout);
        };
        } else 
        {
            return function(e){
            return Function._eventListenerCall(e,func,_this,catchErr,forcus,this,exArgs);
        };
        }
    },
    /*xjs.core.XFunction.setTimeout*/
    setTimeout:function(func,scope,timeout,catchErr)
    {
        var args = Array.prototype.slice.call(arguments,4);
        setTimeout(function(){
            if(catchErr)
            {
                try
                {
                    func.apply(scope || this,args);
                }catch(ex)
                {
                    Xjs.alertErr(ex);
                }
            } else 
            {
                func.apply(scope || this,args);
            }
        },timeout);
    },
    /*xjs.core.XFunction.intervalCall*/
    intervalCall:function(func,scope,interval,maxTimes)
    {
        var args = Array.prototype.slice.call(arguments,3);
        args[0] = {_callID:null,_times:maxTimes||1};
        var f = function(){
            var b;
            try
            {
                b = func.apply(scope || this,args);
            }catch(ex)
            {
                try
                {
                    clearInterval(args[0]._callID);
                }catch(x)
                {
                }
                throw ex;
            }
            args[0]._times--;
            if((b === true || args[0]._times <= 0) && args[0]._callID)
            {
                clearInterval(args[0]._callID);
            }
            return b;
        };
        if(f())
            return;
        args[0]._callID = setInterval(f,interval);
    }
});
Xjs.apply(Function.prototype,{
    /*xjs.core.XFunction.createDelegate*/
    createDelegate:function(obj,args,appendArgs)
    {
        var _self = this;
        return function(){
            var callArgs = args || arguments;
            if(appendArgs === true)
            {
                callArgs = Array.prototype.slice.call(arguments,0);
                callArgs = callArgs.concat(args);
            } else if(typeof(appendArgs) == "number")
            {
                callArgs = Array.prototype.slice.call(arguments,0);
                var applyArgs = ([appendArgs,0]).concat(args);
                Array.prototype.splice.apply(callArgs,applyArgs);
            }
            return _self.apply(obj || window,callArgs);
        };
    }
});
Xjs.apply(Array,{
    /*xjs.core.XArray.intersection*/
    intersection:function(a1,a2)
    {
        if(a1 == null || a2 == null)
            return null;
        var a = [];
        for(var i=0;i < a1.length;i++)
        {
            if(a2.indexOf(a1[i]) >= 0)
                a.push(a1[i]);
        }
        return a;
    },
    /*xjs.core.XArray.identicalIndexOf*/
    identicalIndexOf:function(a,o)
    {
        for(var i=0,len=a.length;i < len;i++)
        {
            if(a[i] === o)
                return i;
        }
        return -1;
    },
    /*xjs.core.XArray.addElements*/
    addElements:function(a,items)
    {
        if(!items)
            return a;
        var nv;
        if((nv = items.length) <= 0)
            return a;
        if(!a)
        {
            a = [];
        }
        for(var i=0;i < nv;i++)
        {
            if(a.indexOf(items[i]) < 0)
                a.push(items[i]);
        }
        return a;
    },
    /*xjs.core.XArray.pushAll*/
    pushAll:function(a,a2)
    {
        if(a2)
            for(var i=0;i < a2.length;i++)
                a.push(a2[i]);
    },
    /*xjs.core.XArray.removeElements*/
    removeElements:function(a,items)
    {
        if(!a)
            return a;
        var nv = items.length;
        for(var i=0;i < nv;i++)
        {
            var j = a.indexOf(items[i]);
            if(j >= 0)
                a.splice(j,1);
        }
        return a;
    },
    /*xjs.core.XArray.addElement*/
    addElement:function(a,item)
    {
        return Array.addElements(a,Array.prototype.slice.call(arguments,1));
    },
    /*xjs.core.XArray.removeElement*/
    removeElement:function(a,item)
    {
        return Array.removeElements(a,Array.prototype.slice.call(arguments,1));
    },
    /*xjs.core.XArray.binarySearch*/
    binarySearch:function(a,low,high,key,compare)
    {
        if(arguments.length <= 3)
        {
            key = low;
            compare = high;
            low = 0;
            high = a.length - 1;
        }
        if(compare)
        {
            while(low <= high)
            {
                var mid = Math.floor((low + high) / 2),
                    c = compare(a[mid],key);
                if(c < 0)
                    low = mid + 1;
                else if(c > 0)
                    high = mid - 1;
                else 
                    return mid;
            }
            return -(low + 1);
        } else 
        {
            while(low <= high)
            {
                var mid = Math.floor((low + high) / 2),
                    midVal = a[mid];
                if(midVal < key)
                    low = mid + 1;
                else if(midVal > key)
                    high = mid - 1;
                else if(midVal == key)
                    return mid;
                else if(!key)
                    high = mid - 1;
            }
            return -(low + 1);
        }
    },
    /*xjs.core.XArray.binarySearchV*/
    binarySearchV:function(a,low,high,key,compare)
    {
        if(arguments.length <= 3)
        {
            key = low;
            compare = high;
            low = 0;
            high = a.length - 1;
        }
        var p = Array.binarySearch(a,low,high,key,compare);
        return p >= 0 ? a[p] : null;
    },
    /*xjs.core.XArray.equals*/
    equals:function(a1,a2)
    {
        if(a1 == a2)
            return true;
        if(!(a1 instanceof Array) || !(a2 instanceof Array))
            return false;
        var n1 = a1.length,
            n2 = a2.length;
        if(n1 != n2)
            return false;
        for(var i=0;i < n1;i++)
        {
            if(!Array.equals(a1[i],a2[i]))
                return false;
        }
        return true;
    },
    /*xjs.core.XArray.sameE*/
    sameE:function(a1,a2,cmpIds)
    {
        var n = a1 ? a1.length : 0;
        if(n != (a2 ? a2.length : 0))
            return false;
        var nid = cmpIds ? cmpIds.length : 0;
        for(var i=0;i < n;i++)
        {
            if(a1[i] == a2[i])
                continue;
            if(nid == 0)
                return false;
            for(var j=0;j < nid;j++)
            {
                if(a1[i][cmpIds[j]] != a2[i][cmpIds[j]])
                    return false;
            }
        }
        return true;
    },
    /*xjs.core.XArray.indexOfByAName*/
    indexOfByAName:function(a,name,val)
    {
        var n = a ? a.length : 0;
        for(var i=0;i < n;i++)
        {
            if(a[i][name] == val)
                return i;
        }
        return -1;
    },
    /*xjs.core.XArray.getByAName*/
    getByAName:function(a,name,val)
    {
        var n = a ? a.length : 0;
        for(var i=0;i < n;i++)
        {
            if(a[i][name] == val)
                return a[i];
        }
        return null;
    },
    /*xjs.core.XArray.cloneArray*/
    cloneArray:function(a,start)
    {
        if(a == null)
            return null;
        var newA = [],
            n = a.length;
        for(var i=start || 0;i < n;i++)
            newA.push(a[i]);
        return newA;
    },
    /*xjs.core.XArray.arrayCmp0*/
    arrayCmp0:function(a1,a2)
    {
        return Xjs.objCmp(a1[0],a2[0]);
    },
    /*xjs.core.XArray.arrayCmpV*/
    arrayCmpV:function(a,v)
    {
        return Xjs.objCmp(a[0],v);
    },
    /*xjs.core.XArray.createCmp1*/
    createCmp1:function(indexA)
    {
        var n = indexA.length;
        if(n == 1 && indexA[0] == 0)
        {
            return Array.arrayCmp0;
        }
        return function(a1,a2){
            if((a1 == null || a2 == null) && window._debug_)
            {
                Xjs.diag.Diag.logStackTrace(null);
            }
            for(var j=0;j < n;j++)
            {
                var i = indexA[j],
                    cmp;
                if(i >= 0)
                {
                    cmp = Xjs.objCmp(a1[i],a2[i]);
                } else 
                {
                    cmp = -Xjs.objCmp(a1[-(i + 1)],a2[-(i + 1)]);
                }
                if(cmp)
                    return cmp;
            }
            return 0;
        };
    },
    /*xjs.core.XArray.createCmp2*/
    createCmp2:function(name)
    {
        var n = name.length;
        return function(o1,o2){
            for(var j=0;j < n;j++)
            {
                var v1 = o1 == null ? null : o1[name[j]],
                    v2 = o2 == null ? null : o2[name[j]],
                    cmp = Xjs.objCmp(v1,v2);
                if(cmp)
                    return cmp;
            }
            return 0;
        };
    },
    /*xjs.core.XArray.createDescCmp*/
    createDescCmp:function(cmp)
    {
        return function(o1,o2){
            return -cmp(o1,o2);
        };
    },
    /*xjs.core.XArray.createCmp3*/
    createCmp3:function(name,valueMap)
    {
        return function(o1,o2){
            var v1 = o1 == null ? null : o1[name],
                v2 = o2 == null ? null : o2[name];
            if(valueMap != null)
            {
                if(v1 != null)
                    v1 = valueMap.get(v1.toString());
                if(v2 != null)
                    v2 = valueMap.get(v2.toString());
            }
            return Xjs.objCmp(v1,v2);
        };
    },
    /*xjs.core.XArray.createKCmp1*/
    createKCmp1:function(name)
    {
        return function(v,v2){
            return Xjs.objCmp(v == null ? null : v[name],v2);
        };
    },
    /*xjs.core.XArray.createIdxCmp*/
    createIdxCmp:function(avals,vcmp)
    {
        return function(o1,o2){
            return vcmp.call(this,avals[o1],avals[o2]);
        };
    }
});
Xjs.apply(Array.prototype,{
    /*xjs.core.XArray.indexOf*/
    indexOf:function(o)
    {
        for(var i=0,len=this.length;i < len;i++)
        {
            if(this[i] == o)
                return i;
        }
        return -1;
    },
    /*xjs.core.XArray.remove*/
    remove:function(o,identical)
    {
        var index = identical ? Array.identicalIndexOf(this,o) : this.indexOf(o);
        if(index >= 0)
        {
            this.splice(index,1);
        }
        return this;
    },
    /*xjs.core.XArray.clear*/
    clear:function()
    {
        this.length = 0;
    }
});
Xjs.apply(String,{
    /*xjs.core._String.ltrim*/
    ltrim:function(s)
    {
        return s == null ? null : s.replace(new RegExp("^\\s+","g"),"");
    },
    /*xjs.core._String.rtrim*/
    rtrim:function(s)
    {
        return s == null ? null : s.replace(new RegExp("\\s+$","g"),"");
    }
});
Xjs.apply(String.prototype,{
    /*xjs.core._String.startsWith*/
    startsWith:function(s)
    {
        return s.length <= this.length && this.substring(0,s.length) == s;
    },
    /*xjs.core._String.endsWith*/
    endsWith:function(s)
    {
        return s.length <= this.length && this.substring(this.length - s.length) == s;
    },
    /*xjs.core._String.trim*/
    trim:function()
    {
        return this.replace(new RegExp("^\\s+|\\s+$","g"),"");
    }
});
Xjs.apply(Number,{
    /*xjs.core.XNumber.format*/
    format:function(x,minDecimal,maxDecimals,commas)
    {
        var sx = x.toString();
        if(maxDecimals >= 0)
        {
            var p = sx.lastIndexOf('.');
            if(p >= 0 && sx.length - p >= maxDecimals)
            {
                sx = x.toFixed(maxDecimals);
            }
        }
        var textA = sx.split("."),
            s1 = textA[0],
            s2 = textA.length > 1 ? textA[1] : "",
            n0 = minDecimal - s2.length;
        if(n0 < 0)
        {
            var k = s2.length;
            for(;k > 0 && k > minDecimal && s2.charAt(k - 1) == "0";k--)
                ;
            if(k < s2.length)
                s2 = s2.substring(0,k);
        } else 
        {
            if(n0 > 0 && n0 <= 8)
                s2 += "00000000".substring(0,n0);
            else 
                for(var i=0;i < n0;i++)
                    s2 += "0";
        }
        ;
        if(commas)
        {
            var rgx = new RegExp("(\\d+)(\\d{3})");
            while(rgx.test(s1))
            {
                s1 = s1.replace(rgx,"$1,$2");
            }
        }
        return s2.length > 0 ? s1 + "." + s2 : s1;
    },
    /*xjs.core.XNumber.obj2int*/
    obj2int:function(x,defaultValue)
    {
        if(typeof(x) == "string")
        {
            x = parseInt(x);
        }
        if(typeof(x) != "number" || isNaN(x))
            return defaultValue;
        return Number.toInt(x);
    },
    /*xjs.core.XNumber.toInt*/
    toInt:function(value)
    {
        return value < 0 ? Math.ceil(value) : Math.floor(value);
    }
});
/*xjs/core/XjsObject.java*/
Xjs.Object=function(cfg){
    this.__init();
    Xjs.apply(this,cfg);
    if(cfg && cfg.__$thisCfg)
    {
        this.__$thisCfg = cfg;
    }
};
Xjs.apply(Xjs.Object.prototype,{
    /*xjs.core.XjsObject.__init*/
    __init:Xjs.emptyFn
});
/*xjs/core/Observable.java*/
Xjs.Observable=function(cfg){
    Xjs.Observable.superclass.constructor.call(this,cfg);
};
Xjs.extend(Xjs.Observable,Xjs.Object,{
  _js$className_:"Xjs.Observable",
    /*xjs.core.Observable.removeAllListeners*/
    removeAllListeners:function()
    {
        this.listeners = null;
    },
    /*xjs.core.Observable.getListeners*/
    getListeners:function()
    {
        return Array.cloneArray(this.listeners);
    },
    /*xjs.core.Observable.getListener*/
    getListener:function(clazz)
    {
        if(this.listeners)
            for(var i=0;i < this.listeners.length;i++)
            {
                if(this.listeners[i] instanceof clazz)
                    return this.listeners[i];
            }
        return null;
    },
    /*xjs.core.Observable.addListener*/
    addListener:function()
    {
        var n = arguments.length,
            fn,
            byFunc;
        if(n >= 2 && typeof(arguments[0]) == "string" && (fn = arguments[1]) && ((byFunc = typeof(fn) == "function") || typeof(fn.func) == "function"))
        {
            if(this.EventFN == null)
                this.EventFN = {};
            var evName = arguments[0];
            if(byFunc)
            {
                fn = new Xjs.FuncCall(fn,arguments[2] || this);
            }
            var a = this.EventFN[evName];
            if(a != null)
                for(var j=0;j < a.length;j++)
                {
                    if(a[j].func == fn.func && a[j].scorp == fn.scorp)
                        return;
                }
            this.EventFN[evName] = Array.addElement(a,fn);
            return;
        }
        for(var i=0;i < n;i++)
        {
            var l = arguments[i];
            if(!this.listeners)
                this.listeners = [];
            else if(this.listeners.indexOf(l) >= 0)
                continue;
            if(!l)
            {
                window.console.log("addListener null");
                continue;
            }
            this.listeners.push(l);
            if(l.addNotify)
                l.addNotify(this);
            if(this._fnNameAddNotify != null && l[this._fnNameAddNotify])
                l[this._fnNameAddNotify](this);
        }
    },
    /*xjs.core.Observable.removeListener*/
    removeListener:function()
    {
        var n = arguments.length,
            fn;
        if(n >= 2 && typeof(arguments[0]) == "string" && (fn = arguments[1]) && typeof(fn.func) == "function")
        {
            var evName = arguments[0],
                a;
            if(this.EventFN == null || (a = this.EventFN[evName]) == null)
                return;
            for(var j=0;j < a.length;j++)
            {
                if(a[j].func == fn.func)
                {
                    this.EventFN[evName] = Array.removeElement(a,a[j]);
                    if(this.EventFN[evName].length == 0)
                        delete this.EventFN[evName];
                    break;
                }
            }
        } else 
            this.listeners = Array.removeElements(this.listeners,arguments);
    },
    /*xjs.core.Observable.fireEvent*/
    fireEvent:function()
    {
        var evName = arguments[0],
            n = this.listeners ? this.listeners.length : 0;
        if(n > 0)
        {
            arguments[0] = this;
            for(var i=0;i < n;i++)
            {
                var l = this.listeners[i];
                if(l[evName])
                    l[evName].apply(l,arguments);
            }
        }
        var ls;
        if(this.EventFN && (ls = this.EventFN[evName]))
        {
            arguments[0] = this;
            for(var i=0;i < ls.length;i++)
            {
                ls[i].apply(arguments);
            }
        }
    },
    /*xjs.core.Observable.fireEventV*/
    fireEventV:function()
    {
        var args = Array.prototype.slice.call(arguments,1);
        return this._fireEventV(arguments[0],args[0],args);
    },
    /*xjs.core.Observable.fireEventV2*/
    fireEventV2:function(_mode,evName,args)
    {
        var a2 = new Array(args == null ? 1 : 1 + args.length);
        if(args)
            for(var j=0;j < args.length;j++)
                a2[1 + j] = args[j];
        return this._fireEventV(_mode,evName,a2);
    },
    /*xjs.core.Observable._fireEventV*/
    _fireEventV:function(_mode,evName,args)
    {
        var n = this.listeners ? this.listeners.length : 0;
        if(n > 0)
        {
            args[0] = this;
            for(var i=0;i < n;i++)
            {
                var l = this.listeners[i];
                if(l[evName])
                {
                    var v = l[evName].apply(l,args);
                    if(v !== undefined)
                        return v;
                }
            }
        }
        var ls;
        if(this.EventFN && (ls = this.EventFN[evName]))
        {
            args[0] = this;
            for(var i=0;i < ls.length;i++)
            {
                var v = ls[i].apply(args);
                if(v !== undefined)
                    return v;
            }
        }
        return;
    },
    /*xjs.core.Observable.hasListenerMethod*/
    hasListenerMethod:function(method)
    {
        var n = this.listeners ? this.listeners.length : 0;
        for(var i=0;i < n;i++)
        {
            var l = this.listeners[i],
                f;
            if((f = l[method]) && f != Xjs.emptyFn)
                return true;
        }
        if(this.EventFN && this.EventFN[method] && this.EventFN[method].length)
        {
            return true;
        }
        return false;
    },
    /*xjs.core.Observable.fireEventE*/
    fireEventE:function()
    {
        try
        {
            this.fireEvent.apply(this,arguments);
        }catch(ex)
        {
            Xjs.alertErr(ex);
        }
    }
});
/*xjs/ui/Component.java*/
Xjs.namespace("Xjs.ui");
Xjs.ui.Component=function(cfg){
    Xjs.ui.Component.superclass.constructor.call(this,cfg);
    if(this.fitSizeOnWinResize)
    {
        this._fitParentSize = new Xjs.ui.layout.FitParentSize(this,this.fitSizeOnWinResize);
        delete this.fitSizeOnWinResize;
    }
    if(this.uiConfigOnPrtPreview)
    {
        if(window.EnvParameter.forPrint > 0)
            Xjs.apply(this,this.uiConfigOnPrtPreview);
        delete this.uiConfigOnPrtPreview;
    }
};
Xjs.extend(Xjs.ui.Component,Xjs.Observable,{
  _js$className_:"Xjs.ui.Component",
    tipTextCls:"x-tiptext",
    /*xjs.ui.Component._addClsName*/
    _addClsName:function(clsName)
    {
        if(this.className && (" " + this.className + " ").indexOf(" " + clsName + " ") >= 0)
            return;
        this.className = this.className ? this.className + " " + clsName : clsName;
    },
    /*xjs.ui.Component.attachDOM*/
    attachDOM:function(dom)
    {
        if(typeof(dom) == "string")
            dom = document.getElementById(dom);
        this.dom = dom;
        this.onAttachDOM();
    },
    /*xjs.ui.Component.onAttachDOM*/
    onAttachDOM:Xjs.emptyFn,
    /*xjs.ui.Component.getAttachedElementById*/
    getAttachedElementById:function(eid)
    {
        var r = this._getAttachRootDOM();
        if(r)
        {
            return Xjs.DOM.findById(eid,r);
        }
        return document.getElementById(eid);
    },
    /*xjs.ui.Component._createDom0*/
    _createDom0:function(root,dftTag,styles)
    {
        var d = this.id ? Xjs.DOM.findById(this.id,root) : null;
        if(!d)
        {
            d = document.createElement(this.domTag || dftTag);
            if(this.id)
                d.id = this.id;
        } else 
        {
            var b = Xjs.DOM.findById("box_" + this.id,root);
            if(b && Xjs.DOM.contains(b,d))
                this._boxDOM = b;
        }
        if(styles)
            Xjs.apply(d.style,styles);
        if(this.className)
            Xjs.DOM.updateClass(d,this.className,null);
        return d;
    },
    /*xjs.ui.Component._createDOM*/
    _createDOM:function(root)
    {
        var d = this._createDom0(root,this.domTag || "span",null);
        if(this.html)
        {
            if(this.defaultRenderValue && typeof(this.html) == "boolean")
            {
                d.innerHTML = this.defaultRenderValue;
            } else 
            {
                d.innerHTML = this.html;
            }
        }
        return d;
    },
    /*xjs.ui.Component.focus*/
    focus:function()
    {
        var e = this.dom || this.attachedDom;
        if(Xjs.DOM.isShowing(e))
        {
            e.focus();
        }
    },
    /*xjs.ui.Component.focusLatter*/
    focusLatter:function(time)
    {
        if(!this._$focusDelegate)
            this._$focusDelegate = this.focus.createDelegate(this);
        setTimeout(this._$focusDelegate,time > 0 ? time : 10);
    },
    /*xjs.ui.Component.beforeDomCreate*/
    beforeDomCreate:Xjs.emptyFn,
    /*xjs.ui.Component._getAttachRootDOM*/
    _getAttachRootDOM:function()
    {
        if(!this._rootDOM && this.parent)
            this._rootDOM = this.parent._getAttachRootDOM();
        return this._rootDOM;
    },
    /*xjs.ui.Component._setAttachRootDOM*/
    _setAttachRootDOM:function(r)
    {
        this._rootDOM = r;
    },
    /*xjs.ui.Component.getDOM*/
    getDOM:function(root)
    {
        if(!this.dom)
        {
            if(this.fireOnRender)
                this.fireEvent("onRendering");
            this.beforeDomCreate();
            if(this.htmlRes)
            {
                this._rootDOM = Xjs.ui.Component.createDomFromRes(this.htmlRes,this,true,this.htmlResMacro);
            }
            this.dom = this._createDOM(root || this._getAttachRootDOM());
            if(this.disabled)
                this.dom.disabled = true;
            if(this.popupMenu || this._bindCtxMenu)
            {
                this.dom.oncontextmenu = Function.bindAsEventListener(this.onContextMenu,this);
            }
            this.onDomCreated(this._rootDOM || root);
            if(this.fnOnDomCreated)
            {
                for(var i=0;i < this.fnOnDomCreated.length;i++)
                {
                    this.fnOnDomCreated[i].call();
                }
                delete this.fnOnDomCreated;
            }
        }
        return this.dom;
    },
    /*xjs.ui.Component.callOnDomCreated*/
    callOnDomCreated:function(scorp,f,args)
    {
        if(this.dom)
        {
            f.apply(scorp || this,args || []);
        } else 
        {
            var v = new Xjs.FuncCall(f,scorp,args);
            if(!this.fnOnDomCreated)
                this.fnOnDomCreated = [v];
            else 
            {
                for(var j=0;j < this.fnOnDomCreated.length;j++)
                {
                    var fn = this.fnOnDomCreated[j];
                    if(fn.func == f && fn.scorp == scorp && Array.equals(fn.args,args))
                        return;
                }
                this.fnOnDomCreated.push(v);
            }
        }
    },
    /*xjs.ui.Component.onDomCreated*/
    onDomCreated:function(root)
    {
        if(this.domStyle)
            Xjs.apply(this.dom.style,this.domStyle);
        if(this.domConfig)
            Xjs.apply(this.dom,this.domConfig);
        this._updateDomSize();
        this.__addDialogItems();
        this.updateDomVisible();
        this._addShowTipTextMouseListener();
        if(this.fireOnRender)
        {
            this.fireEvent("onRender");
        }
    },
    /*xjs.ui.Component.__addDialogItems*/
    __addDialogItems:function()
    {
        if(this.items && (this.okButtons || this.isDialogPane))
        {
            if(!this.disableAddDlgItems)
                this._addDialogItemsTo(this);
            this.enableOkButton();
        }
    },
    /*xjs.ui.Component.appendTo*/
    appendTo:function(dom)
    {
        if(typeof(dom) == "string")
            dom = document.getElementById(dom);
        var thisDom = this.getDOM();
        if(dom != null && dom != thisDom)
            dom.appendChild(thisDom);
    },
    /*xjs.ui.Component.setEnabled*/
    setEnabled:function(enable)
    {
        this.disabled = !enable;
        if(this.dom)
            this.dom.disabled = this.disabled;
    },
    /*xjs.ui.Component.setReadonly*/
    setReadonly:function(readOnly,setDefReadonly)
    {
        if(this.readOnly != readOnly)
        {
            this.readOnly = readOnly;
            if(this.dom)
                this.dom.disabled = this.readOnly ? true : false;
        }
        if(setDefReadonly !== false)
        {
            this.defReadonly = readOnly;
        }
    },
    /*xjs.ui.Component.isDefReadonly*/
    isDefReadonly:function()
    {
        return this.defReadonly === undefined ? !!this.readOnly : this.defReadonly;
    },
    /*xjs.ui.Component.updateReadonlyStatus*/
    updateReadonlyStatus:Xjs.emptyFn,
    /*xjs.ui.Component.setDefReadonly*/
    setDefReadonly:function(defReadonly)
    {
        this.defReadonly = defReadonly;
    },
    /*xjs.ui.Component.isReadonly*/
    isReadonly:function()
    {
        return !!this.readOnly;
    },
    /*xjs.ui.Component.setSize*/
    setSize:function(width,height)
    {
        if(width === undefined)
            delete this.width;
        else 
            this.width = width;
        if(height === undefined)
            delete this.height;
        else 
            this.height = height;
        this._updateDomSize();
    },
    /*xjs.ui.Component.setWidth*/
    setWidth:function(width)
    {
        if(width === undefined)
            delete this.width;
        else 
            this.width = width;
        this._updateDomSize();
    },
    /*xjs.ui.Component.setHeight*/
    setHeight:function(height)
    {
        if(height === undefined)
            delete this.height;
        else 
            this.height = height;
        this._updateDomSize();
    },
    /*xjs.ui.Component.setFitParentHeight*/
    setFitParentHeight:function(h,oh)
    {
        if(oh)
            h -= oh;
        this.setHeight(h >= 0 ? h : 0);
    },
    /*xjs.ui.Component._updateDomSize*/
    _updateDomSize:function()
    {
        var sizeDOM = this._sizeDOM || this.dom;
        if(!sizeDOM)
            return;
        var rz = this.onResize,
            initWidth,
            initHeight;
        if(rz)
        {
            initWidth = Xjs.DOM.getWidth(sizeDOM);
            initHeight = Xjs.DOM.getHeight(sizeDOM);
        } else 
        {
            initWidth = 0;
            initHeight = 0;
        }
        if(this.width !== undefined)
            Xjs.DOM.setWidth(sizeDOM,this.width);
        if(this.height !== undefined)
            Xjs.DOM.setHeight(sizeDOM,this.height);
        var w = Xjs.DOM.getWidth(sizeDOM),
            h = Xjs.DOM.getHeight(sizeDOM);
        if(rz && (initWidth != w || initHeight != h || !this.__lastUpszW || this.__lastUpszW.width != w || this.__lastUpszW.height != h))
        {
            this.onResize();
            this.__lastUpszW = {width:w,height:h};
        }
    },
    /*xjs.ui.Component._getSizeDOM*/
    _getSizeDOM:function()
    {
        return this._sizeDOM || this.dom;
    },
    /*xjs.ui.Component.getHeight*/
    getHeight:function()
    {
        if(this.dom)
            return Xjs.DOM.getHeight(this.dom);
        if(typeof(this.height) == "number")
            return this.height;
        return 0;
    },
    /*xjs.ui.Component.getWidth*/
    getWidth:function()
    {
        if(this.dom)
            return Xjs.DOM.getWidth(this.dom);
        if(typeof(this.width) == "number")
            return this.width;
        return 0;
    },
    /*xjs.ui.Component.isVisible*/
    isVisible:function()
    {
        if(this.dom)
        {
            var s = this.dom.style;
            return s.display != "none" && s.visibility != "hidden";
        }
        return this.visible != false;
    },
    /*xjs.ui.Component.setVisible*/
    setVisible:function(visible)
    {
        this.visible = visible;
        this.updateDomVisible();
    },
    /*xjs.ui.Component.updateDomVisible*/
    updateDomVisible:function()
    {
        if(this.dom)
        {
            var d = this.dom.style.display;
            this.$styleDisplay = d != "none" ? d : "";
            this.dom.style.display = this.visible != false ? this.$styleDisplay : "none";
        }
        if(this.labelComp)
            this.labelComp.setVisible(this.visible);
        else if(this.labelDOM)
            this.labelDOM.style.display = this.visible != false ? "" : "none";
        if(this._boxDOM)
            this._boxDOM.style.display = this.visible != false ? "" : "none";
    },
    /*xjs.ui.Component._getDomToAppendParent*/
    _getDomToAppendParent:function(dom,styleOverflow)
    {
        if(this.fieldGroupLabel)
        {
            {
                if(this._boxDOM)
                    return this._boxDOM;
                if(styleOverflow != null && styleOverflow != "")
                    dom.style.overflow = styleOverflow;
                var box = this._createFieldsetDOM();
                box.appendChild(dom);
                return this._boxDOM = box;
            }
        }
        return dom;
    },
    /*xjs.ui.Component._createFieldsetDOM*/
    _createFieldsetDOM:function()
    {
        var dom = document.createElement("fieldset");
        dom.className = "ui-group";
        if(this.fieldGroupLabel && this.fieldGroupLabel.length > 0)
        {
            var labelDOM = document.createElement("legend");
            labelDOM.className = "ui-grouplabel";
            if(this.fieldGroupHtmlLabel)
                labelDOM.innerHTML = this.fieldGroupLabel;
            else 
                Xjs.DOM.setTextContent(labelDOM,this.fieldGroupLabel);
            if(this.groupLabelMode)
                this._fieldSetLegend = labelDOM;
            dom.appendChild(labelDOM);
        }
        return dom;
    },
    /*xjs.ui.Component.setSelectOptions*/
    setSelectOptions:function(selectOptions)
    {
        this.selectOptions = selectOptions;
    },
    /*xjs.ui.Component.getSelectOptions*/
    getSelectOptions:function(flags)
    {
        if(this.selectOptions)
        {
            var a;
            if(this.selectOptions instanceof Xjs.dx.CodeData)
            {
                var c = this.selectOptions;
                a = flags & 2 ? c.getData(c.preKeyCodes) : c.getData();
            } else if(this.selectOptions instanceof Xjs.dx.Data)
            {
                a = this.selectOptions.getData();
            } else 
                a = this.selectOptions;
            if(this.selectOptions.getSort && a)
            {
                var sort = this.selectOptions.getSort();
                if(sort)
                {
                    var newA = [];
                    for(var i=0;i < a.length;i++)
                        newA[i] = a[i];
                    newA.sort(Array.createCmp1(sort));
                    return newA;
                }
            }
            return a;
        }
        return null;
    },
    /*xjs.ui.Component.onChanged*/
    onChanged:function(e,opts)
    {
        delete this._$value;
        this.fireEvent("valueChanged",e,opts);
    },
    /*xjs.ui.Component.validateValue*/
    validateValue:function(src,ivFields)
    {
        if(this.nonBlank)
        {
            if(this.getValue() != null)
                return true;
            if(ivFields)
                ivFields.push({comp:this,cause:"blank"});
            return false;
        }
        return true;
    },
    /*xjs.ui.Component.setRootComponent*/
    setRootComponent:function(rootComponent)
    {
        this.rootComponent = rootComponent;
    },
    /*xjs.ui.Component.getRootComponent*/
    getRootComponent:function()
    {
        if(this.rootComponent)
            return this.rootComponent;
        if(this.mainUI == 3)
            return this;
        if(this.parent2)
            return this.parent2.getRootComponent();
        return this.parent ? this.parent.getRootComponent() : this;
    },
    /*xjs.ui.Component.getMainParentComponent*/
    getMainParentComponent:function()
    {
        if(this.mainUI & 3)
            return this;
        if(this.parent2)
            return this.parent2.getMainParentComponent();
        return this.parent ? this.parent.getMainParentComponent() : null;
    },
    /*xjs.ui.Component._addDialogItemsTo*/
    _addDialogItemsTo:function(toComp)
    {
        if(this.items && !this.isDlgItemComp)
        {
            for(var i=0;i < this.items.length;i++)
            {
                var c = this.items[i];
                if(c.okButtons || c.isDialogPane)
                    continue;
                c._addDialogItemsTo(toComp);
            }
        } else if(this.getValue)
        {
            toComp.addDialogItem(this);
        }
    },
    /*xjs.ui.Component.getRootComponentMID*/
    getRootComponentMID:function()
    {
        return this.rootUiid ? this.rootUiid : (this.parent ? this.parent.getRootComponentMID() : this.mid);
    },
    /*xjs.ui.Component.showTipText*/
    showTipText:function(html,parent,position)
    {
        if(!this.tipTextLayer && html)
        {
            this.tipTextLayer = new Xjs.ui.Layer();
            if(this.tipTextFitSize & 4)
                this.tipTextLayer.hideIfMouseOut = true;
            this.tipTextLayer.hideIfOutclick = true;
            var tipTextDOM = document.createElement("div");
            tipTextDOM.className = this.tipTextCls;
            this.tipTextLayer.attachDOM(tipTextDOM);
        }
        if(html)
        {
            if(html.startsWith("@URL:"))
            {
                html = Xjs.loadUrlRES(html.substring(5),true);
            }
            this.tipTextLayer.dom.innerHTML = html;
            this.tipTextLayer.alignShow(parent || this,position || 3,this.tipTextFitSize);
        } else if(this.tipTextLayer != null)
        {
            this.tipTextLayer.hide();
        }
    },
    /*xjs.ui.Component.getTipContentIfOvflow*/
    getTipContentIfOvflow:function()
    {
        return Xjs.DOM.getTipContentIfOvflow(this.dom);
    },
    /*xjs.ui.Component.setTipTextOnMouseOver*/
    setTipTextOnMouseOver:function(tipText)
    {
        this.tipText = tipText;
        this._addShowTipTextMouseListener();
    },
    /*xjs.ui.Component._addShowTipTextMouseListener*/
    _addShowTipTextMouseListener:function()
    {
        if(this.dom && (this.tipText || this.fn$TipText) && !this._fnshowTipTextOnMouseOver)
        {
            Xjs.DOM.addListener(this.dom,"mouseover",this._fnshowTipTextOnMouseOver = Function.bindAsEventListener(this._showTipTextOnMouseOver,this));
            Xjs.DOM.addListener(this.dom,"mouseout",this._fnhideTipTextOnMouseout = Function.bindAsEventListener(this._hideTipTextOnMouseOut,this));
        }
    },
    /*xjs.ui.Component._removeShowTipTextMouseListener*/
    _removeShowTipTextMouseListener:function()
    {
        if(this._fnshowTipTextOnMouseOver)
        {
            Xjs.DOM.removeListener(this.dom,"mouseover",this._fnshowTipTextOnMouseOver);
            Xjs.DOM.removeListener(this.dom,"mouseover",this._fnhideTipTextOnMouseout);
            this._fnshowTipTextOnMouseOver = null;
            this._fnhideTipTextOnMouseout = null;
        }
    },
    /*xjs.ui.Component._showTipTextOnMouseOver*/
    _showTipTextOnMouseOver:function(e)
    {
        var tipText;
        if(this.fn$TipText)
            tipText = this.fn$TipText.call();
        else 
            tipText = this.tipText;
        this.showTipText(tipText,null);
    },
    /*xjs.ui.Component._hideTipTextOnMouseOut*/
    _hideTipTextOnMouseOut:function(e)
    {
        if(!this.tipTextLayer || !this.tipTextLayer.dom)
            return;
        if(this.tipTextFitSize & 4 && Xjs.Event.inDOM(e,this.tipTextLayer.dom,2))
        {
            return;
        }
        this.showTipText(null,null,0);
    },
    /*xjs.ui.Component.setLabelText*/
    setLabelText:function(text,color)
    {
        if(this.groupLabelMode)
        {
            if(this._fieldSetLegend != null)
            {
                if(text !== undefined)
                    Xjs.DOM.setTextContent(this._fieldSetLegend,text);
                if(color !== undefined)
                    this._fieldSetLegend.style.color = color;
            }
            return;
        }
        if(text !== undefined)
            this.title = text;
        if(color !== undefined)
            this.labelColor = color;
        if(this.labelComp && this.labelComp.setText)
            this.labelComp.setText(text,color);
        else if(this.labelDOM)
        {
            var e = this.labelDOM.childNodes.length == 2 && Xjs.DOM.hasClass(this.labelDOM.childNodes[0],"lb_flag") ? this.labelDOM.childNodes[1] : this.labelDOM;
            Xjs.DOM.setTextContent(e,text);
            if(color !== undefined)
                this.labelDOM.style.color = color || "";
        }
    },
    /*xjs.ui.Component.updateLabelClass*/
    updateLabelClass:function()
    {
        if(!this.dom)
            this.callOnDomCreated(this,this.setLabelClassByRdonlyAndNonblank,null);
        else 
            this.setLabelClassByRdonlyAndNonblank();
    },
    /*xjs.ui.Component.setLabelClassByRdonlyAndNonblank*/
    setLabelClassByRdonlyAndNonblank:function(lbDOM)
    {
        if(lbDOM === undefined)
        {
            lbDOM = this.labelDOM;
            if(!lbDOM && this.labelComp)
                lbDOM = this.labelComp.getDOM();
        }
        var addClass = null,
            removeClass = null;
        if(this.nonBlank || this.nonBlankOnSubmit)
            addClass = "lb_nonblank";
        else 
            removeClass = "lb_nonblank";
        if(this.readOnly)
            addClass = addClass == null ? "lb_rdonly" : addClass + " " + "lb_rdonly";
        else 
            removeClass = removeClass == null ? "lb_rdonly" : removeClass + " " + "lb_rdonly";
        if(lbDOM)
            Xjs.DOM.updateClass(lbDOM,addClass,removeClass);
        return addClass;
    },
    /*xjs.ui.Component.addPopupMenu*/
    addPopupMenu:function(command,text,node)
    {
        var to;
        if(!(to = this.popupMenu))
        {
            this.popupMenu = to = new Xjs.ui.PopupMenu();
            to.addListener(this);
            to.focusCompOnHide = this;
        }
        to.addMenuNode(command,text,node);
    },
    /*xjs.ui.Component.addPopupMenus*/
    addPopupMenus:function()
    {
        for(var i=0;i < arguments.length;i++)
        {
            var arg = arguments[i];
            if(Xjs.isArray(arg))
                this.addPopupMenu(arg[0],arg[1],arg[2]);
            else if(arg == "-")
                this.addPopupMenu("-");
            else 
                this.addPopupMenu(null,null,arg);
        }
    },
    /*xjs.ui.Component.onContextMenu*/
    onContextMenu:function(e)
    {
        return Xjs.ui.Component.showCtxPopupMenu(this.popupMenu,e);
    },
    /*xjs.ui.Component.showPopupMenu*/
    showPopupMenu:function(dom,x,y)
    {
        var xy = Xjs.DOM.getXY(dom || this.dom,true);
        this.popupMenu.showAtXY(xy.x + x,xy.y + y);
    },
    /*xjs.ui.Component.performCommand*/
    performCommand:function(src,cmd)
    {
        var ra = [];
        this.fireEvent.call(this,"beforecmd_" + cmd,ra);
        if(ra.length > 0)
        {
            (new Xjs.util.ConfirmPerform(null,ra,new Xjs.FuncCall(this.doPerformCmd,this,[src,cmd]))).confirmPerform();
            return;
        }
        this.doPerformCmd(src,cmd);
    },
    /*xjs.ui.Component.doPerformCmd*/
    doPerformCmd:function(src,cmd)
    {
        var fn = "oncmd_" + cmd;
        if(this[fn])
        {
            try
            {
                this[fn]();
                return;
            }finally
            {
                this.focus();
            }
        }
        if(cmd == "savevalue" || cmd == "loadvalue")
        {
            if(!this.valStoreDlg)
            {
                var c = this;
                Xjs.JsLoad.asynLoadJsLibsOfVar("Xjs.ui.tools.PaneValueStore").then(function(v){
            c.valStoreDlg = new Xjs.ui.tools.PaneValueStore(c);
            c.valStoreDlg.showDialog(cmd == "savevalue");
        });
            } else 
            {
                this.valStoreDlg.showDialog(cmd == "savevalue");
            }
        } else if(cmd == "uidefinition")
        {
            var rootUIID = this.uidefRootUIID != null ? this.uidefRootUIID : this.getRootComponentMID();
            if(rootUIID != null)
            {
                var url = Xjs.RInvoke.buildUIInvokeURL(null,"90.UI.html",0) + "?InitValue.muiid=" + encodeURIComponent(rootUIID) + "&AutoRefresh=1";
                window.open(url,"_blank");
            }
        } else if(cmd == "uidefforcuicode")
        {
            var rootUIID = this.uidefRootUIID != null ? this.uidefRootUIID : this.getRootComponentMID();
            if(rootUIID != null)
            {
                var url = Xjs.RInvoke.buildUIInvokeURL(null,"90.ui.CMUI.html",0) + "?InitValue.muiid=" + encodeURIComponent(rootUIID) + "&AutoRefresh=1";
                window.open(url,"_blank");
            }
        } else if(cmd == "uidefxml")
        {
            var rootUIID = this.uidefRootUIID != null ? this.uidefRootUIID : this.getRootComponentMID();
            if(rootUIID != null)
            {
                var url = Xjs.RInvoke.buildUIInvokeURL(null,"90.UIXML.html",0) + "?InitValue.muiid=" + encodeURIComponent(rootUIID) + "&AutoRefresh=1";
                window.open(url,"_blank");
            }
        } else if(cmd == "uidefxmlfile")
        {
            var rootUIID = this.uidefRootUIID != null ? this.uidefRootUIID : this.getRootComponentMID();
            if(rootUIID != null)
            {
                var url = Xjs.ROOTPATH + "ui/uixml?muiid=" + rootUIID;
                window.open(url,"_blank");
            }
        } else if(cmd == "uideuistatic")
        {
            var muiid = this.uidefRootUIID != null ? this.uidefRootUIID : this.getRootComponentMID();
            Xjs.RInvoke.rmInvoke("snsoft.cmc.uidef.UITableDefListener.buildStaticHTML",muiid,window.EnvParameter.lang,Xjs.getTheme());
        } else if(cmd.indexOf("openDef_") == 0)
        {
            var node = src.getMenuNode(cmd);
            if(node)
            {
                var cfgDef = node.cfgDef;
                if(cfgDef)
                {
                    Xjs.ui.UIUtil.wopenUI(cfgDef.title,cfgDef.muiid,cfgDef.pm);
                }
            }
        } else 
        {
            var args = Array.prototype.slice.call(arguments,0);
            args[0] = "performCommand";
            this.fireEvent.apply(this,args);
            this.fireEvent.call(this,"oncmd_" + cmd);
        }
    },
    /*xjs.ui.Component.asynUIInvoke*/
    asynUIInvoke:function(method)
    {
        var args = Array.prototype.slice.call(arguments);
        args[0] = null;
        var rootUiid = this.rootUiid || this.getRootComponentMID();
        return Xjs.RInvoke._asynInvoke(rootUiid + "." + this.name + "." + method,"ui",args);
    },
    /*xjs.ui.Component.uiInvoke*/
    uiInvoke:function(m)
    {
        var args = Array.prototype.slice.call(arguments);
        args[0] = null;
        var progMode = typeof(m) != "string",
            rootUiid = this.rootUiid || this.getRootComponentMID();
        if(progMode)
        {
            m = Xjs.apply({},m);
            m.runMethod = rootUiid + "." + this.name + "." + m.runMethod;
        } else 
            m = rootUiid + "." + this.name + "." + m;
        return Xjs.RInvoke._rinvoke(m,"ui",args);
    },
    /*xjs.ui.Component.buildUIMethodInvokeURL*/
    buildUIMethodInvokeURL:function(method,opts)
    {
        return Xjs.RInvoke.buildUIInvokeURL(null,"ui-" + this.getRootComponentMID() + "." + this.name + "." + method,opts);
    },
    /*xjs.ui.Component.setDefaultValues*/
    setDefaultValues:function(values,opts)
    {
        Xjs.ui.Component.setCompValues(this,new Xjs.ui.InitValues(values,!(opts & 1)),1);
    },
    /*xjs.ui.Component.resetBackupInitVal*/
    resetBackupInitVal:function(name,val)
    {
        if(this._$backInitValues)
            this._$backInitValues[name] = val;
    },
    /*xjs.ui.Component.setItemConfigs*/
    setItemConfigs:function(itemName,cfgs)
    {
        var i = this.getItemByName(itemName);
        if(i)
            Xjs.apply(i,cfgs);
    },
    /*xjs.ui.Component.setItemChecks*/
    setItemChecks:function(nm,icks,c)
    {
        if(!c)
        {
            c = this.getItemByName(nm);
            if(!c)
            {
                return;
            }
        }
        var a = icks[nm];
        if(!a || a.length == 0)
            return;
        if(!c.validChecks)
            c.validChecks = a;
        else 
        {
            var cs;
            if(!(cs = c.validChecks))
                cs = c.validChecks = [];
            for(var i=0;i < a.length;i++)
            {
                cs.push(a[i]);
            }
        }
    },
    /*xjs.ui.Component.initComponent*/
    initComponent:function(values)
    {
        if(values.loadClasses)
        {
            for(var j=0;j < values.loadClasses.length;j++)
                Xjs.JsLoad.loadJsLibsOfVar(values.loadClasses[j]);
        }
        this.setDefaultValues(values.initValues,values._loadUIOpts & 8 ? 1 : 0);
        if(values.selectOpts)
        {
            for(var n in values.selectOpts)
            {
                var v = values.selectOpts[n],
                    forCol = n.endsWith("#columns"),
                    c = this.getSubCompByName(forCol ? n.substring(0,n.length - 8) : n);
                if(c)
                {
                    if(c.selectOptions instanceof Xjs.dx.CodeData)
                    {
                        if(forCol)
                            c.selectOptions.setColumns(v);
                        else 
                            c.selectOptions.setData(v);
                    } else 
                    {
                        if(!forCol)
                            c.selectOptions = v;
                    }
                }
            }
            if("DT_00.sop" in values.selectOpts)
            {
                Xjs.ui.Component._sopSels = values.selectOpts["DT_00.sop"];
            }
            if("DT_00.op" in values.selectOpts)
            {
                Xjs.ui.Component._opSels = values.selectOpts["DT_00.op"];
            }
        }
        if(values.CompConfig)
        {
            Xjs.apply(this,values.CompConfig);
        }
        if(values.configDefs && values.configDefs.length > 0 && (Xjs.isAdmin(1) || Xjs.isDebugMode))
        {
            this.addPopupMenu("openDef","打开定义");
            for(var i=0;i < values.configDefs.length;i++)
            {
                var cfgDef = values.configDefs[i];
                this.addPopupMenu("openDef|" + "openDef_" + cfgDef.command,cfgDef.title,{cfgDef:cfgDef});
            }
        }
        var icfgs;
        if(icfgs = values.ItemConfig)
        {
            for(var nm in icfgs)
            {
                this.setItemConfigs(nm,icfgs[nm]);
            }
        }
        var icks;
        if(icks = values.ItemChecks)
        {
            for(var nm in icks)
            {
                this.setItemChecks(nm,icks);
            }
        }
        if(this.addToolbarButtons)
        {
            if(this.toolbarBtnConfigs)
            {
                this.addToolbarButtons(this.toolbarBtnConfigs);
                delete this.toolbarBtnConfigs;
            }
            if(values.ToolbarButtons)
            {
                this.addToolbarButtons(values.ToolbarButtons);
            }
        }
        if(this.popupMenuConfigs)
        {
            for(var i=0;i < this.popupMenuConfigs.length;i++)
            {
                this.addPopupMenu(null,null,this.popupMenuConfigs[i]);
            }
        }
        if(values.initCalls)
        {
            for(var i=0;i < values.initCalls.length;i++)
            {
                var f = values.initCalls[i];
                if(f.scorp == "${this}")
                    f.scorp = this;
                Xjs.deepReplace(f.args,"${this}",this);
                f.func(f.args[0],f.args[1]);
            }
        }
        this.__addDialogItems();
        this.fireEvent("initComponent",values);
        if(this.backInitValues)
        {
            this._$backInitValues = this.getItemValues();
        }
    },
    /*xjs.ui.Component.getMainComponentByName*/
    getMainComponentByName:function(name)
    {
        if(name == this.name)
            return this;
        var c;
        return (c = Xjs.ui.Component._getMainComponentByName(this.items,name)) ? c : Xjs.ui.Component._getMainComponentByName(this.items2,name);
    },
    /*xjs.ui.Component.getMainComponentById*/
    getMainComponentById:function(id)
    {
        if(id == this.id)
            return this;
        var c;
        return (c = Xjs.ui.Component._getMainComponentById(this.items,id)) ? c : Xjs.ui.Component._getMainComponentById(this.items2,id);
    },
    /*xjs.ui.Component.getMainComponents*/
    getMainComponents:function(clazz)
    {
        var to = [];
        Xjs.ui.Component.getMainComponentsTo(this,to,clazz);
        return to;
    },
    /*xjs.ui.Component.getParentByType*/
    getParentByType:function(clazz)
    {
        var c = this.parent;
        for(;c;c = c.parent)
        {
            if(c instanceof clazz)
                return c;
        }
        return null;
    },
    /*xjs.ui.Component._setSizeCaseContainerDOM*/
    _setSizeCaseContainerDOM:function(width,height)
    {
        if(this._sizeDOM && Xjs.DOM.contains(this.dom,this._sizeDOM))
        {
            if(width !== undefined)
                Xjs.DOM.setWidth(this.dom,width);
            if(height !== undefined)
                Xjs.DOM.setHeight(this.dom,height);
            if(this.onResize)
            {
                this.onResize();
            }
        } else 
        {
            this.setSize(width,height);
        }
        return;
    },
    /*xjs.ui.Component.fireOnShowing*/
    fireOnShowing:function()
    {
        this.fireEvent("onShowing");
        if(this.items)
            for(var i=0;i < this.items.length;i++)
            {
                this.items[i].fireOnShowing();
            }
    },
    /*xjs.ui.Component.fireAllMCompEvent*/
    fireAllMCompEvent:function()
    {
        this.fireEvent.apply(this,arguments);
        if(!this.items || this.items.length == 0 || !this.items[0].mainUI)
            return;
        for(var i=0;i < this.items.length;i++)
            this.items[i].fireAllMCompEvent.apply(this.items[i],arguments);
    },
    /*xjs.ui.Component.checkShowing*/
    checkShowing:function(firstFocus,setFirstFocus)
    {
        if(this.focusableComp && firstFocus && (!firstFocus[0] || (this.focusPri || 0) > (firstFocus[0].focusPri || 0) || firstFocus[0].readOnly && !this.readOnly) && Xjs.DOM.isShowing(this.dom))
        {
            firstFocus[0] = this;
            if(setFirstFocus)
                this.focus();
        }
    },
    /*xjs.ui.Component.checkHidden*/
    checkHidden:Xjs.emptyFn,
    /*xjs.ui.Component.setComponentValueMap*/
    setComponentValueMap:function(compValueMap)
    {
        this.compValueMap = compValueMap;
    },
    /*xjs.ui.Component._getValueTo*/
    _getValueTo:function(values,options)
    {
        var v = null;
        if((options & 2) == 0 || (this.saveOrder || 0) >= 0)
            v = this.compValueMap ? this.compValueMap.get(this) : this.getValue();
        if(v == null || v === "")
            v = undefined;
        if(this.opComp)
        {
            var op = this.opComp.getValue();
            if(op != null)
            {
                values.set(this.name + ".[op]",op);
                if(op == "isnull" || op == "isnotnull")
                {
                    v = null;
                }
            }
        } else if(this.initOpVal)
        {
            values.set(this.name + ".[op]",this.initOpVal);
        }
        if(v != null || (options & 1) == 0)
        {
            if(typeof(v) == "string" && this.sqlType && !this.valueRangeSep)
            {
                v = Xjs.Data.parseFromSqlType(v,this.sqlType);
            }
            if(values)
                values.set(this.name,v);
            if(options & 0x100 && this.storeHistValue && v)
            {
                Xjs.ui.util.HistAidInputer.addStoreHistValName(this);
            }
        }
        return v;
    },
    /*xjs.ui.Component.getSubCompByName*/
    getSubCompByName:function(name)
    {
        if(this.items)
        {
            var n = this.items.length;
            for(var i=0;i < n;i++)
            {
                var x = Xjs.ui.Component.getItemByName(this.items[i],name);
                if(x)
                    return x;
            }
        }
        return null;
    },
    /*xjs.ui.Component.findComps*/
    findComps:function(t,caseThis)
    {
        var a = [];
        this._findComps(a,t,caseThis);
        return a;
    },
    /*xjs.ui.Component._findComps*/
    _findComps:function(a,t,caseThis)
    {
        if(caseThis && t.call(this))
        {
            a.push(this);
        }
        if(this.items)
        {
            var n = this.items.length;
            for(var i=0;i < n;i++)
            {
                this.items[i]._findComps(a,t,true);
            }
        }
    },
    /*xjs.ui.Component.checkWindowUnload*/
    checkWindowUnload:function(e)
    {
        var text;
        try
        {
            text = this.closeRequest();
        }catch(ex)
        {
            text = ex.toString();
        }
        if(text)
            e.returnValue = text;
        return text == null ? undefined : text;
    },
    /*xjs.ui.Component.setColumnValueAccess*/
    setColumnValueAccess:function(valueAccess)
    {
        this.valueAccess = valueAccess;
    },
    /*xjs.ui.Component.closeRequest*/
    closeRequest:function()
    {
        var text = null;
        if(this.items != null)
            for(var i=0;i < this.items.length;i++)
            {
                if(this.items[i].mainUI)
                {
                    var s = this.items[i].closeRequest();
                    if(s == null)
                        continue;
                    text = text == null ? s : text + "\r\n" + s;
                }
            }
        return text;
    },
    /*xjs.ui.Component.getCloseRequest*/
    getCloseRequest:function(opts,tit)
    {
        var r = null;
        if(this.items != null)
            for(var i=0;i < this.items.length;i++)
            {
                if(this.items[i].mainUI)
                {
                    var r2 = this.items[i].getCloseRequest(opts,tit);
                    if(!r2)
                        continue;
                    if(!r)
                        r = [];
                    for(var j=0;j < r2.length;j++)
                        r.push(r2[j]);
                }
            }
        return r;
    },
    /*xjs.ui.Component.confirmClose*/
    confirmClose:function(title,close)
    {
        (new Xjs.util.ConfirmPerform(title,this.getCloseRequest(),close)).confirmPerform();
    },
    /*xjs.ui.Component._onCmdBtnClick*/
    _onCmdBtnClick:function(ev)
    {
        var e = ev.srcElement || ev.target;
        for(;e && !e._command;e = e.parentNode)
            ;
        if(e._command)
            try
            {
                this.performCommand(e,e._command);
            }catch(ex)
            {
                Xjs.alertErr(ex);
            }
    },
    /*xjs.ui.Component.bindOnCmdClickPerform*/
    bindOnCmdClickPerform:function(dom,cmd)
    {
        dom._command = cmd;
        if(!this._fnOnCmdBtnClick)
            this._fnOnCmdBtnClick = Function.bindAsEventListener(this._onCmdBtnClick,this);
        Xjs.DOM.addListener(dom,"click",this._fnOnCmdBtnClick);
    },
    /*xjs.ui.Component.getBtnDelegate*/
    getBtnDelegate:function(type,f0,cmd,btn)
    {
        if(!this._mfn$Btn)
        {
            this._mfn$Btn = {};
        } else 
        {
            var f;
            if(f = this._mfn$Btn[type + "." + cmd])
                return f;
        }
        var f = f0.createDelegate(this,btn ? [this,cmd,btn] : [this,cmd],true);
        this._mfn$Btn[type + "." + cmd] = f;
        return f;
    },
    /*xjs.ui.Component.getBtnClickDelegate*/
    getBtnClickDelegate:function(cmd,btn)
    {
        return this.getBtnDelegate("click",Xjs.ui.Component.onBtnClick,cmd,btn);
    },
    /*xjs.ui.Component.getBtnKeyupDelegate*/
    getBtnKeyupDelegate:function(cmd,btn)
    {
        return this.getBtnDelegate("keyup",Xjs.ui.Component.onBtnKeyup,cmd,btn);
    },
    /*xjs.ui.Component.updateAttachDomCScrollbar*/
    updateAttachDomCScrollbar:function(latter)
    {
        if(!this.attachDomCScrollbar)
            return;
        if(latter > 0)
        {
            if(!this.fn$updateAttachDomCScrollbar)
                this.fn$updateAttachDomCScrollbar = this.updateAttachDomCScrollbar.createDelegate(this);
            setTimeout(this.fn$updateAttachDomCScrollbar,latter);
        } else 
        {
            this.attachDomCScrollbar.updateValue();
        }
    },
    /*xjs.ui.Component.setLocalProperty*/
    setLocalProperty:function(name,val)
    {
        if(this.localProps == null)
            this.localProps = {};
        this.localProps[name] = val;
    },
    /*xjs.ui.Component.getLocalProperty*/
    getLocalProperty:function(name)
    {
        return this.localProps == null ? null : this.localProps[name];
    },
    /*xjs.ui.Component.addAccKey*/
    addAccKey:function(k)
    {
        if(!this.accKeys)
            this.accKeys = [];
        this.accKeys.push(k);
    },
    /*xjs.ui.Component.hasAccKeyByKCode*/
    hasAccKeyByKCode:function(c)
    {
        if(this.accKeys)
            for(var i=0;i < this.accKeys.length;i++)
            {
                if(this.accKeys[i].keyCode == c)
                    return true;
            }
        return false;
    },
    /*xjs.ui.Component.processAccKey*/
    processAccKey:function(ev)
    {
        if(this.accKeys)
            for(var i=0;i < this.accKeys.length;i++)
            {
                var k = this.accKeys[i];
                if(k.keyCode == ev.keyCode && ((Xjs.osType == 2 ? ev.metaKey : ev.ctrlKey) || false) == (k.ctrl || false) && (ev.altKey || false) == (k.alt || false) && (ev.shiftKey || false) == (k.shift || false))
                {
                    var f;
                    if(f = k.call)
                    {
                        var a = [];
                        a.push(ev);
                        a.push(k.cmd || null);
                        f.apply(a);
                    } else 
                    {
                        this.performCommand(ev,k.cmd);
                    }
                    return true;
                }
            }
        return false;
    },
    /*xjs.ui.Component._processAccKey*/
    _processAccKey:function(proced,ev,caseParent,caseItems)
    {
        if(proced.indexOf(this) < 0)
        {
            proced.push(this);
            if(this.processAccKey(ev))
            {
                return true;
            }
        }
        if(this.parent && caseParent && this.parent._processAccKey(proced,ev,true,false))
        {
            return true;
        }
        if(this.items && caseItems)
        {
            for(var i=0;i < this.items.length;i++)
            {
                if(this.items[i].mainUI & 3 && this.items[i]._processAccKey(proced,ev,false,true))
                {
                    return true;
                }
            }
        }
        return false;
    },
    /*xjs.ui.Component.getDefaultAccKeyProcssComp*/
    getDefaultAccKeyProcssComp:function()
    {
        if(this.dftAccKeyProcess)
            return this;
        if(this.items && this.items[0] && this.items[0].mainUI)
        {
            for(var j=0;j < this.items.length;j++)
            {
                var c = this.items[j].getDefaultAccKeyProcssComp();
                if(c)
                    return c;
            }
        }
        return null;
    },
    /*xjs.ui.Component.fireProcessAccKey*/
    fireProcessAccKey:function(ev)
    {
        var proced = [],
            c = this.getActiveMainComponent();
        if(c)
        {
            var r = c._processAccKey(proced,ev,true,false);
            if(r)
                return true;
        }
        c = this.getDefaultAccKeyProcssComp();
        if(c)
        {
            var r = c._processAccKey(proced,ev,false,false);
            if(r)
                return true;
        }
        return this._processAccKey(proced,ev,false,true);
    },
    /*xjs.ui.Component._isActiveElementIn*/
    _isActiveElementIn:function()
    {
        return this.dom && document.activeElement && this.dom.contains(document.activeElement);
    },
    /*xjs.ui.Component.onHelpContext*/
    onHelpContext:function(caseParent)
    {
        if(this.helpURL)
        {
            window.open(Xjs.toFullURL(this.helpURL,this.helpURL.startsWith("../") ? 2 : 0),"_blank");
            return true;
        }
        if(this.helpFile)
        {
            window.open(Xjs.ROOTPATH + "help.html?helpFile=" + this.helpFile,"_blank");
            return true;
        }
        if(this.mid)
        {
            this.helpURL = Xjs.RInvoke.rsvInvoke("SN-UI.HelpURLRemoteLoadService.loadHelpURL",this.mid);
            if(this.helpURL)
            {
                window.open(Xjs.toFullURL(this.helpURL,this.helpURL.startsWith("../") ? 2 : 0),"_blank");
                return true;
            }
        }
        if(this.parent && caseParent)
            return this.parent.onHelpContext(true);
        return false;
    },
    /*xjs.ui.Component.getActiveMainComponent*/
    getActiveMainComponent:function()
    {
        if(document.activeElement && Xjs.DOM.isShowing(this.dom))
        {
            if(this.items && this.items[0] && this.items[0].mainUI)
            {
                for(var j=0;j < this.items.length;j++)
                {
                    var c = this.items[j].getActiveMainComponent();
                    if(c)
                        return c;
                }
            }
            if(this.dom.contains(document.activeElement))
                return this;
        }
        return null;
    },
    /*xjs.ui.Component.oncmd_relogin*/
    oncmd_relogin:function()
    {
        Xjs.JsLoad.loadJsLibsOfVar("snsoft.usermanager.LoginListener");
        snsoft.usermanager.LoginListener.relogin();
    },
    /*xjs.ui.Component.oncmd_helpcontext*/
    oncmd_helpcontext:function()
    {
        return this.onHelpContext(true);
    },
    /*xjs.ui.Component.oncmd_calculator*/
    oncmd_calculator:function()
    {
        Xjs.JsLoad.asynLoadJsLibsOfVar("Xjs.ui.tools.CalcDialogListener").then(function(){
            Xjs.ui.tools.CalcDialogListener.invokeCalc(null);
        });
    },
    /*xjs.ui.Component.newDftOpComp*/
    newDftOpComp:function(id,type)
    {
        return new Xjs.ui.InputField({name:this.name + ".[op]",id:id,selectOptions:Xjs.ui.Component.getOpSelections(type),width:90,aidInputer:new Xjs.ui.ComboAidInputer({selOptions:1 | 0x10000 | 0x20000000}),editable:false,showName:true,value:this.initOpVal || "="});
    }
});
Xjs.apply(Xjs.ui.Component,{
    /*xjs.ui.Component.createDomFromRes*/
    createDomFromRes:function(html,obj,cache,macro)
    {
        if(html.charCodeAt(0) == 0x40)
        {
            html = Xjs.loadUrlRES(html.substring(1),cache);
        }
        {
            var p1 = html.indexOf("<uiconfig>"),
                p2 = p1 < 0 ? -1 : html.indexOf("</uiconfig>",p1 + 10);
            if(p2 > 0)
            {
                var cfg = html.substring(p1 + 10,p2).trim();
                cfg = String.macroReplace(cfg,macro,"${","}");
                Xjs.applyIf(obj,eval(cfg));
                html = html.substring(p2 + 11);
            }
        }
        var htmlE = document.createElement("div"),
            s = Xjs.ui.AttachUtils.getInnerHTMLBody(html).trim();
        s = s.replace(new RegExp("(<\\/[^>]+>)([^<>]+)(<[^>]+>)","g"),function($0,$1,$2,$3){
            return $1 + $2.trim() + $3;
        });
        if(macro && s.indexOf("${") >= 0)
        {
            s = String.macroReplace(s,macro,"${","}");
        }
        htmlE.innerHTML = s;
        return htmlE.childNodes.length == 1 ? htmlE.childNodes[0] : htmlE;
    },
    /*xjs.ui.Component.showCtxPopupMenu*/
    showCtxPopupMenu:function(popupMenu,e)
    {
        var tn,
            ctrlKey = Xjs.Event.isCmdKey(e);
        if(!popupMenu)
            return true;
        var dftSysM = window.xjsConfig && window.xjsConfig.ctrlkeyCtxMenu,
            sysMenu = dftSysM ? !ctrlKey : ctrlKey;
        if(((tn = (e.srcElement || e.target).tagName) == "INPUT" || tn == "TEXTAREA") && document.activeElement == (e.srcElement || e.target) && !dftSysM)
        {
            sysMenu = !sysMenu;
        }
        if(sysMenu)
            return true;
        var p = Xjs.Event.getXY(e,document.body);
        Xjs.Event.cancelEvent(e,true);
        popupMenu.showAtXY(p.x,p.y);
        return false;
    },
    /*xjs.ui.Component._getMainComponentByName*/
    _getMainComponentByName:function(items,name)
    {
        if(items != null)
            for(var i=0;i < items.length;i++)
            {
                var c = items[i].mainUI ? items[i].getMainComponentByName(name) : null;
                if(c)
                    return c;
            }
        return null;
    },
    /*xjs.ui.Component._getMainComponentById*/
    _getMainComponentById:function(items,id)
    {
        if(items)
            for(var i=0;i < items.length;i++)
            {
                var c = items[i].mainUI ? items[i].getMainComponentById(id) : null;
                if(c)
                    return c;
            }
        return null;
    },
    /*xjs.ui.Component.getMainComponentsTo*/
    getMainComponentsTo:function(c,to,clazz)
    {
        if(clazz == null || c instanceof clazz)
        {
            to.push(c);
        }
        if(c.items != null)
            for(var i=0;i < c.items.length;i++)
            {
                var o = c.items[i];
                if(o.mainUI || o.cmainUI)
                    Xjs.ui.Component.getMainComponentsTo(o,to,clazz);
            }
    },
    /*xjs.ui.Component.winInit*/
    winInit:function(options,comp)
    {
        if(window.EnvParameter && window.EnvParameter.uiCls)
        {
            var a = window.EnvParameter.uiCls.split(",");
            for(var j=0;j < a.length;j++)
                Xjs.DOM.addClass(document.documentElement,a[j]);
        }
        if(options & 1)
        {
            window.onkeydown = Xjs.ui.Component._onWinKeydown;
        }
        if(comp)
        {
            if(options & 2)
                window.onbeforeunload = Function.bindAsEventListener(comp.checkWindowUnload,comp);
            if(options & 4 && comp.onResize)
            {
                var f = comp.onResize.createDelegate(comp);
                Xjs.DOM.addListener(window,"resize",f);
                Xjs.DOM.addListener(window,"load",f);
            }
            if(options & 8)
                comp.checkShowing(new Array(1),true);
        }
        Xjs.checkWDocResized();
    },
    /*xjs.ui.Component.forEach*/
    forEach:function(c,fn,scope,parameter)
    {
        var args = Array.prototype.slice.call(arguments,2);
        Xjs.ui.Component._forEach(c,fn,scope || this,args);
    },
    /*xjs.ui.Component.fnSetValues*/
    fnSetValues:function(c,values,options,vset)
    {
        if(c.name && (c.setValue || c.compValueMap))
        {
            if(options & 8 && c.disableRestoreInitVal)
                return true;
            if(c.opComp)
            {
                var op = values.get(c.name + ".[op]");
                if(op)
                    c.opComp.setValue(op);
            }
            var v = values.get(c.name);
            if((v != null || (options & 1) == 0) && ((options & 2) == 0 || (c.saveOrder || 0) >= 0))
            {
                if(v === undefined)
                    v = null;
                if(vset != null)
                    vset.push([c.saveOrder || 0,c,v]);
                else if(c.compValueMap)
                    c.compValueMap.set(c,v);
                else 
                    c.setValue(v);
            }
            return true;
        } else if(c.valueExchange)
        {
            return c.valueExchange(0,values,options,vset);
        }
        return false;
    },
    /*xjs.ui.Component.fnGetValues*/
    fnGetValues:function(c,values,options)
    {
        if(c.name && (c.getValue || c.compValueMap))
        {
            c._getValueTo(values,options);
            return true;
        } else if(c.valueExchange)
        {
            return c.valueExchange(1,values,options,null);
        }
        return false;
    },
    /*xjs.ui.Component._forEach*/
    _forEach:function(c,fn,scope,args)
    {
        args[0] = c;
        if(fn.apply(scope,args))
            return;
        if(!c.items)
            return;
        var items = c.items,
            n = items.length;
        for(var i=0;i < n;i++)
        {
            Xjs.ui.Component._forEach(items[i],fn,scope || this,args);
        }
    },
    /*xjs.ui.Component.setCompValues*/
    setCompValues:function(c0,values,options)
    {
        if(values == null)
            return;
        if(typeof(values.get) != "function")
            values = new Xjs.util.ValueMap(values);
        if(typeof(values.hasValues) == "function" && !values.hasValues())
        {
            return;
        }
        var vset = [];
        Xjs.ui.Component.forEach(c0,Xjs.ui.Component.fnSetValues,null,values,options,vset);
        vset.sort(Array.arrayCmp0);
        for(var i=0;i < vset.length;i++)
        {
            var a = vset[i],
                c = a[1],
                v = a[2];
            if(typeof(v) == "string" && c.sqlType && c.sqlType != 12)
            {
                v = Xjs.Data.parseFromSqlType(v,c.sqlType);
            }
            if(c.compValueMap)
                c.compValueMap.set(c,v);
            else 
                c.setValue(v);
        }
    },
    /*xjs.ui.Component.getCompValues*/
    getCompValues:function(c,values,options)
    {
        if(values == null)
            values = {};
        var _vals = values;
        if(typeof(values.get) != "function")
            values = new Xjs.util.ValueMap(values);
        Xjs.ui.Component.forEach(c,Xjs.ui.Component.fnGetValues,null,values,options);
        return _vals;
    },
    /*xjs.ui.Component.getItemByName*/
    getItemByName:function(c,name)
    {
        return name == c.name ? c : c.getSubCompByName(name);
    },
    /*xjs.ui.Component.getCheckValues*/
    getCheckValues:function(inputDoms,options)
    {
        if(!inputDoms)
            return null;
        if(inputDoms instanceof HTMLElement)
        {
            inputDoms = inputDoms.getElementsByTagName("input");
        }
        var multiple = (options & 1) != 0,
            intValue = (options & 2) != 0,
            caseOrder = (options & 4) != 0,
            retArray = (options & 8) != 0;
        if(caseOrder)
        {
            var value = null;
            for(var i=0;i < inputDoms.length;i++)
            {
                var checked = inputDoms[i].checked,
                    v = inputDoms[i].value;
                if(value == null)
                    value = (checked ? "*" : "") + v;
                else 
                    value += "," + (checked ? "*" : "") + v;
            }
            return value;
        }
        var value = null;
        for(var i=0;i < inputDoms.length;i++)
        {
            if(!inputDoms[i].checked)
                continue;
            var v = inputDoms[i].value;
            if(!multiple)
            {
                value = v;
                break;
            }
            if(intValue && typeof(v) == "string")
                v = parseInt(v,10);
            if(retArray)
            {
                if(value == null)
                    value = [v];
                else 
                    (value).push(v);
            } else if(value == null)
            {
                value = v;
            } else if(intValue)
            {
                value |= v;
            } else 
                value += ","+v;
        }
        if(intValue && typeof(value) == "string")
            value = parseInt(value,10);
        return value;
    },
    /*xjs.ui.Component.validateItemValues*/
    validateItemValues:function(a,src,ivFields)
    {
        var n = a != null ? a.length : 0;
        for(var i=0;i < n;i++)
        {
            var l = a[i];
            if(!(l.validateValue?l.validateValue(src,ivFields):true))
                return false;
        }
        return true;
    },
    /*xjs.ui.Component.appendToTableDOM*/
    appendToTableDOM:function(dom,alignOpts)
    {
        var tableDOM = document.createElement("table");
        tableDOM.style.width = "100%";
        tableDOM.style.height = "100%";
        var row = tableDOM.insertRow(0),
            cell = row.insertCell(0),
            align = alignOpts & 3;
        if(align == 3)
            cell.align = "center";
        else if(align == 2)
            cell.align = "right";
        var valign = alignOpts & 0xc0;
        if(valign == 12)
            cell.vAlign = "middle";
        else if(align == 8)
            cell.vAlign = "bottom";
        cell.appendChild(dom);
        return tableDOM;
    },
    /*xjs.ui.Component._prepareInitComponents*/
    _prepareInitComponents:function(comp,params)
    {
        comp.fireEvent("prepareInitParameter",params);
        if(comp.items)
            for(var i=0;i < comp.items.length;i++)
            {
                var c = comp.items[i];
                if(c.mainUI)
                    Xjs.ui.Component._prepareInitComponents(c,params);
            }
        if(comp.items2)
            for(var i=0;i < comp.items2.length;i++)
            {
                var c = comp.items2[i];
                if(c.mainUI)
                    Xjs.ui.Component._prepareInitComponents(c,params);
            }
    },
    /*xjs.ui.Component._afterInitComponents*/
    _afterInitComponents:function(comp)
    {
        comp.fireEvent("afterInitComponent");
        if(comp . afterInitComponent)
            comp.afterInitComponent();
        if(comp.items)
            for(var i=0;i < comp.items.length;i++)
            {
                var c = comp.items[i];
                if(c.mainUI)
                    Xjs.ui.Component._afterInitComponents(c);
            }
        if(comp.items2)
            for(var i=0;i < comp.items2.length;i++)
            {
                var c = comp.items2[i];
                if(c.mainUI)
                    Xjs.ui.Component._afterInitComponents(c);
            }
    },
    /*xjs.ui.Component._initComponents*/
    _initComponents:function(comp,vals,initVals,pm,_loadUiOpts)
    {
        Xjs.ui.Component._initComps(comp,initVals,pm,_loadUiOpts);
    },
    /*xjs.ui.Component._initComps*/
    _initComps:function(comp,initVals,pm,_loadUiOpts)
    {
        var values;
        if(Xjs.isDebugMode)
        {
            Xjs.diag.Diag.startTrace("初始化(_initComps)",comp.name);
        }
        var params = {};
        if(!(_loadUiOpts & 8))
        {
            Xjs.apply(params,window.EnvParameter.ReqParameter);
            if(window.EnvParameter.forPrint)
                params._ForPrint_ = window.EnvParameter.forPrint;
        }
        if(pm)
            Xjs.apply(params,pm);
        Xjs.ui.Component._prepareInitComponents(comp,params);
        if(!comp.disableServerInit)
        {
            if(Xjs.isDebugMode)
            {
                Xjs.diag.Diag.timeTrace("初始化(uiInvoke)",comp.name);
            }
            var retV = comp.uiInvoke("!init",params);
            if(Xjs.isDebugMode)
            {
                Xjs.diag.Diag.timeTrace("初始化(uiInvoke)",comp.name);
            }
            values = retV || {};
        } else 
        {
            values = {};
        }
        if(initVals)
            for(var n in initVals)
            {
                var c = comp.getMainComponentByName(n);
                if(c == null)
                    throw new Error("未定义界面：" + n);
                var o = values["UI." + c.name];
                if(!o)
                {
                    values["UI." + c.name] = o = {};
                }
                var v = o.initValues;
                if(v)
                    Xjs.apply(v,initVals[n]);
                else 
                    o.initValues = initVals[n];
            }
        if(values.EnvParameter)
        {
            if(!window.EnvParameter)
                window.EnvParameter = {};
            Xjs.apply(window.EnvParameter,values.EnvParameter);
        }
        Xjs.ui.Component._fireInitComp(comp,values,_loadUiOpts);
        Xjs.ui.Component._afterInitComponents(comp);
        if(Xjs.isDebugMode)
        {
            Xjs.diag.Diag.endTrace("初始化(_initComps)",comp.name);
        }
    },
    /*xjs.ui.Component._fireInitComp*/
    _fireInitComp:function(comp,values,_loadUiOpts)
    {
        var o = values["UI." + comp.name] || {};
        o._loadUIOpts = _loadUiOpts;
        comp.initComponent(o);
        if(comp.items)
            for(var i=0;i < comp.items.length;i++)
            {
                var c = comp.items[i];
                if(c.mainUI)
                    Xjs.ui.Component._fireInitComp(c,values,_loadUiOpts);
            }
        if(comp.items2)
            for(var i=0;i < comp.items2.length;i++)
            {
                var c = comp.items2[i];
                if(c.mainUI)
                    Xjs.ui.Component._fireInitComp(c,values,_loadUiOpts);
            }
    },
    /*xjs.ui.Component.toComponent*/
    toComponent:function(c,defaultType)
    {
        if(!c.getDOM)
        {
            var cType = c.xtype;
            if(!cType)
                cType = defaultType;
            var cz = Xjs.UITYPES[cType];
            if(cz == null)
            {
                throw new Error("未定义类型:" + cType);
            }
            return new cz(c);
        }
        return c;
    },
    /*xjs.ui.Component.isCompsShowing*/
    isCompsShowing:function(a)
    {
        if(a == null)
            return false;
        for(var i=0;i < a.length;i++)
        {
            if(Xjs.DOM.isShowing(a[i].dom))
                return true;
        }
        return false;
    },
    /*xjs.ui.Component.onBtnClick*/
    onBtnClick:function(e,comp,cmd,btn)
    {
        try
        {
            if(btn instanceof Xjs.Observable)
            {
                btn.fireEvent("beforeMouseClick");
            }
            comp.performCommand(btn || (e.srcElement || e.target),cmd);
            var _mnode;
            if(btn && (_mnode = btn._menuNode))
            {
                var menuNode = comp.getMenuNode(cmd);
                if(menuNode)
                    menuNode.menu.showPopupMenu(_mnode);
            }
        }catch(ex)
        {
            Xjs.alertErr(ex);
        }
    },
    /*xjs.ui.Component.onBtnKeyup*/
    onBtnKeyup:function(e,comp,cmd,btn)
    {
        if(e.keyCode == 13)
        {
            Xjs.Event.cancelEvent(e);
            Xjs.ui.Component.onBtnClick(e,comp,cmd,btn);
            return false;
        }
        return;
    },
    /*xjs.ui.Component.disableBackspcKey*/
    disableBackspcKey:function(e)
    {
        if(e.keyCode == 8)
        {
            if(e.target == document.body)
                e.preventDefault();
            return false;
        }
        return;
    },
    /*xjs.ui.Component._toAttachDOM*/
    _toAttachDOM:function(a,root)
    {
        if(typeof(a) == "string")
        {
            return Xjs.DOM.findById(a,root);
        } else 
        {
            return a;
        }
    },
    /*xjs.ui.Component._onWinKeydown*/
    _onWinKeydown:function(ev)
    {
        var keyCode;
        switch(keyCode = ev.keyCode)
        {
        case 8:
            var e = ev.srcElement || ev.target;
            if(e.tagName == "INPUT" || e.tagName == "TEXTAREA")
                return;
            Xjs.Event.cancelEvent(ev);
            return false;
        case 112:
            if(!Xjs.Event.isCmdKey(ev))
            {
                var r = false,
                    c;
                if(Xjs.ui.Layer._topLayer && (c = Xjs.ui.Layer._topLayer.component))
                {
                    r = (c.getActiveMainComponent() || c).onHelpContext(true);
                }
                if(!r && (c = window._MainUI))
                {
                    r = (c.getActiveMainComponent() || c).onHelpContext(true);
                }
                if(r)
                {
                    Xjs.Event.cancelEvent(ev);
                    return false;
                }
            }
            break;
        default:
            {
                if(((Xjs.osType == 2 ? ev.metaKey : ev.ctrlKey) || ev.altKey) && (keyCode >= 0x41 && keyCode <= 0x5a || keyCode >= 0x70 && keyCode <= 0x7b) || keyCode == 9 || keyCode == 0x1b)
                {
                    Xjs.ui.Component._wkeyEvent = ev;
                    try
                    {
                        var c,
                            r = false,
                            caseMUI = true,
                            layer = Xjs.ui.Layer._topLayer;
                        for(;layer;layer = layer._parentLayer)
                        {
                            if(c = Xjs.ui.Layer._topLayer.component)
                            {
                                r = c.fireProcessAccKey(ev);
                                if(!r)
                                {
                                }
                            }
                            if(layer._modal)
                            {
                                caseMUI = false;
                                break;
                            }
                            if(r)
                                break;
                        }
                        if(!r && (c = window._MainUI) && caseMUI)
                        {
                            r = c.fireProcessAccKey(ev);
                            if(!r)
                            {
                            }
                        }
                        if(r)
                        {
                            Xjs.Event.cancelEvent(ev);
                            return false;
                        }
                    }finally
                    {
                        Xjs.ui.Component._wkeyEvent = null;
                    }
                }
                break;
            }
        }
        return;
    },
    /*xjs.ui.Component.getOpSelections*/
    getOpSelections:function(type)
    {
        if(type == 12)
        {
            if(!Xjs.ui.Component._sopSels)
            {
                var codeData = Xjs.dx.CodeData.$new(null,{CODEDEFID:"DT_00.sop"});
                Xjs.ui.Component._sopSels = codeData.getData();
            }
            return Xjs.ui.Component._sopSels;
        }
        if(!Xjs.ui.Component._opSels)
        {
            var codeData = Xjs.dx.CodeData.$new(null,{CODEDEFID:"DT_00.op"});
            Xjs.ui.Component._opSels = codeData.getData();
        }
        return Xjs.ui.Component._opSels;
    }
});
{
    (function(){
            var html = document.getElementsByTagName("html")[0],
                uiC = "ui-" + Xjs.$browser;
            if(Xjs.$browser == "safari" || Xjs.$browser == "chrome")
                uiC += " ui-webkit";
            if(Xjs.isMobile)
                uiC += " ui-mobile";
            if(Xjs.$browserVer > 0)
            {
                uiC += " ui-" + Xjs.$browser + Xjs.$browserVer;
                if(Xjs.isIE && document.documentMode > 0)
                {
                    uiC += " ui-ie" + document.documentMode + "mode";
                }
            }
            var cn = html.className;
            if(cn === "" || cn == null)
                html.className = uiC;
            else 
                html.className += " " + uiC;
        })();
    Xjs.UITYPES = {};
    Xjs.UITYPES.component = Xjs.ui.Component;
    UI.$={};
}/*xjs/ui/Container.java*/
Xjs.ui.Container=function(cfg){
    Xjs.ui.Container.superclass.constructor.call(this,cfg);
};
Xjs.extend(Xjs.ui.Container,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.Container",
    __inOnResize:0,
    /*xjs.ui.Container.setFirstFocusComp*/
    setFirstFocusComp:function(firstFocusComp)
    {
        this.firstFocusComp = firstFocusComp;
    },
    /*xjs.ui.Container.bindMenuNodeBtn*/
    bindMenuNodeBtn:function(p,n)
    {
        if(!n)
            return;
        var nm = n.attachName || n.command;
        if(!nm)
            return;
        var e = this.getAttachedElementById("UI_" + this.name + "_btn_" + nm);
        if(e && n.attachedDom != e)
        {
            n.attachedDom = e;
            if(n.nodes && p)
            {
                Xjs.DOM.addListener(e,"click",p.getAttachBtnClickDelegate(n));
            } else 
            {
                Xjs.DOM.addListener(e,"click",this.getBtnClickDelegate(n.command,null));
            }
            Xjs.ui.Menu.setAttachedDomEnabled(n);
            Xjs.ui.MenuPane.setAttachedDomVisible(n);
        }
    },
    /*xjs.ui.Container.attachButtons*/
    attachButtons:function(inParent,buttons,idPrefix)
    {
        if(!inParent)
        {
            inParent = this._getAttachRootDOM();
        }
        if(buttons)
            for(var i=0;i < buttons.length;i++)
            {
                var btn = buttons[i],
                    cmd;
                if(!(cmd = btn.command))
                    continue;
                var id = idPrefix + cmd,
                    e = Xjs.DOM.findById(id,inParent);
                if(e && btn.attachedDom != e)
                {
                    btn.attachedDom = e;
                    if(this.attachBtnKeyup !== false)
                        Xjs.DOM.addListener(e,"keyup",this.getBtnKeyupDelegate(cmd,btn));
                    Xjs.DOM.addListener(e,"click",this.getBtnClickDelegate(cmd,btn));
                }
            }
    },
    /*xjs.ui.Container._addItem1*/
    _addItem1:function(o,itm2)
    {
        if(o == null)
            return;
        if(Xjs.isArray(o))
        {
            for(var j=0;j < o.length;j++)
            {
                this._addItem1(o[j],itm2);
            }
            return;
        }
        var c = o;
        if(itm2)
        {
            c.parent2 = this;
            if(!this.items2)
                this.items2 = [c];
            else if(this.items2.indexOf(c) < 0)
                this.items2.push(c);
        } else 
        {
            c.parent = this;
            if(c.mainUI || c.cmainUI)
                this.cmainUI |= 1;
            if(!this.items)
                this.items = [c];
            else if(this.items.indexOf(c) < 0)
                this.items.push(c);
        }
    },
    /*xjs.ui.Container.addChild*/
    addChild:function()
    {
        if(arguments != null)
            for(var i=0;i < arguments.length;i++)
            {
                this._addItem1(arguments[i],false);
            }
    },
    /*xjs.ui.Container.addChild2*/
    addChild2:function()
    {
        if(arguments != null)
            for(var i=0;i < arguments.length;i++)
            {
                this._addItem1(arguments[i],true);
            }
    },
    /*xjs.ui.Container.removeChild*/
    removeChild:function()
    {
        Array.removeElements(this.items,arguments);
    },
    /*xjs.ui.Container.addDialogItem*/
    addDialogItem:function()
    {
        var j0 = this.dialogItems ? this.dialogItems.length : 0;
        this.dialogItems = Array.addElements(this.dialogItems,arguments);
        for(var j=j0;j < this.dialogItems.length;j++)
        {
            this.dialogItems[j].addListener(this);
        }
    },
    /*xjs.ui.Container.updateAllItemsSize*/
    updateAllItemsSize:function()
    {
        this._updateDomSize();
        if(this.items)
            for(var j=0;j < this.items.length;j++)
            {
                var c = this.items[j];
                if(c instanceof Xjs.ui.Container)
                {
                    c.updateAllItemsSize();
                } else 
                {
                    c._updateDomSize();
                }
            }
    },
    /*xjs.ui.Container.beforeDomCreate*/
    beforeDomCreate:Xjs.emptyFn,
    /*xjs.ui.Container._newItemsComponent*/
    _newItemsComponent:function()
    {
        if(this.items)
            for(var i=0;i < this.items.length;i++)
            {
                this.items[i] = Xjs.ui.Component.toComponent(this.items[i],null);
                this.items[i].parent = this;
            }
    },
    /*xjs.ui.Container.relayoutItems*/
    relayoutItems:function(deep)
    {
        if(deep && this.items)
            for(var i=0;i < this.items.length;i++)
            {
                var c = this.items[i];
                if(c instanceof Xjs.ui.Container)
                    c.relayoutItems(true);
            }
        if(this.itemsLayout)
        {
            this.itemsLayout.relayoutItems(this);
        }
    },
    /*xjs.ui.Container.layoutItems*/
    layoutItems:function(indom,root)
    {
        if(this.itemsLayout && this.itemsLayout.attachItemDoms(this,indom,root))
            return;
        this.attachCells(this.items,root);
    },
    /*xjs.ui.Container.attachCells*/
    attachCells:function(cells,root)
    {
        if(!cells)
            return;
        var mc = this.getMainParentComponent(),
            li = {};
        li.nmPrefix = "UI_" + mc.name + "_";
        li.lbNamePefix = "lb_UI_" + mc.name + "_";
        li.opNamePefix = "op_UI_" + mc.name + "_";
        if(cells)
            for(var i=0;i < cells.length;i++)
            {
                var c = cells[i];
                if(c.mainUI || c.items)
                {
                    if(!c.lazyCreateDomOnParentAttach && !c.dom && (Xjs.ui.Container._inCompShowing(c) || !c.mainUI))
                    {
                        c.getDOM(root);
                    }
                    continue;
                }
                var nm = c.nameForAttach || c.name,
                    lb = Xjs.DOM.findById(li.lbNamePefix + nm,root);
                if(lb)
                {
                    c.labelDOM = lb;
                    if(lb.parentNode)
                    {
                        var tip = c.lbTipIfOvflow;
                        if(!tip)
                        {
                            var w = c.labelTDMaxWidth;
                            if(w === undefined && window.xjsConfig && window.xjsConfig.glayoutOpts)
                            {
                                w = window.xjsConfig.glayoutOpts.labelTDMaxWidth;
                            }
                            if(w > 0)
                                tip = true;
                        }
                        if(tip)
                        {
                            var clb = new Xjs.ui.Component({dom:lb.parentNode,tipTextCls:"x-tiptext td_label"});
                            clb.fn$TipText = new Xjs.FuncCall(clb.getTipContentIfOvflow,clb);
                            clb._addShowTipTextMouseListener();
                        }
                    }
                }
                var d = c.getDOM(root);
                if(d)
                {
                    if(!d.parentNode)
                    {
                        var e = Xjs.DOM.findById(li.nmPrefix + nm,root);
                        if(e)
                            e.appendChild(d);
                    }
                }
                if(c.layoutOpComp)
                {
                    var op = Xjs.DOM.findById(li.opNamePefix + nm,root);
                    if(op)
                    {
                        c.opComp = c.newDftOpComp(op.id,c.sqlType);
                        c.opComp.getDOM(root);
                    }
                }
                if(c.visible !== undefined)
                {
                    c.updateDomVisible();
                }
            }
    },
    /*xjs.ui.Container._createDOM*/
    _createDOM:function(root)
    {
        var dom = this._createDom0(root,"div",null),
            indom = Xjs.DOM.findById(this.id + "-container",dom);
        this.layoutItems(indom || dom,root);
        return dom;
    },
    /*xjs.ui.Container.indexOfItem*/
    indexOfItem:function(item)
    {
        if(this.items != null)
            for(var i=0;i < this.items.length;i++)
            {
                if(this.items[i] == item)
                    return i;
            }
        return -1;
    },
    /*xjs.ui.Container.getResizePDOM*/
    getResizePDOM:function()
    {
        return this.dom;
    },
    /*xjs.ui.Container.doOnResize*/
    doOnResize:function()
    {
        if(this.itemsLayout && this.itemsLayout.onResize)
            this.itemsLayout.onResize();
        if(this.resizeParentOnResize && this.parent)
            this.parent.onResize();
        if(this.resizeItemsOnResize && this.items)
        {
            for(var i=0;i < this.items.length;i++)
            {
                if(this.items[i].onResize)
                    this.items[i].onResize();
            }
        }
    },
    /*xjs.ui.Container.onResize*/
    onResize:function()
    {
        if(this.__inOnResize > 0 || !Xjs.DOM.isDisplay(this.dom))
        {
            return;
        }
        this.__inOnResize++;
        try
        {
            this.doOnResize();
        }finally
        {
            this.__inOnResize--;
        }
    },
    /*xjs.ui.Container.valueChanged*/
    valueChanged:function(item,e,opts)
    {
        if(item != this)
        {
            var ev = {item:item,e:e};
            ev.itemChnagedBySetValue = (opts & 1) != 0;
            ev.itemValueChangeOpts = opts || 0;
            this.fireEvent("itemValueChanged",ev);
            this.enableOkButton();
            if(item.fireDlgOkOnChanged & opts)
            {
                var okCmd = this.defaultDlgOkCmd,
                    okSrc = new Xjs.ui.Button({okCommand:true});
                if(!okCmd && this.okButtons && (this.okButtons[0].command == "ok" || this.okButtons[0].okCommand))
                {
                    okCmd = (okSrc = this.okButtons[0]).command;
                }
                if(okCmd)
                {
                    if(this.isAllValid())
                    {
                        this.performCommand(okSrc,okCmd);
                    }
                }
            }
        }
    },
    /*xjs.ui.Container.doAidInputing*/
    doAidInputing:function(item,c)
    {
        if(item != this)
        {
            var e = {item:item};
            e.forTblColumn = c;
            this.fireEvent("itemAidInputing",e);
        }
    },
    /*xjs.ui.Container.isAllValid*/
    isAllValid:function(ivFields)
    {
        return Xjs.ui.Component.validateItemValues(this.listeners,this,ivFields) && Xjs.ui.Component.validateItemValues(this.dialogItems,this,ivFields);
    },
    /*xjs.ui.Container.addOkButton*/
    addOkButton:function(btn)
    {
        if(!this.okButtons || this.okButtons.indexOf(btn) < 0)
            this.okButtons = Array.addElement(this.okButtons,btn);
    },
    /*xjs.ui.Container.enableOkButton*/
    enableOkButton:function()
    {
        if(this.okButtons || this.fireOnEnableDlgOkButton)
        {
            var v = this.isAllValid();
            if(this.okButtons)
                for(var j=0;j < this.okButtons.length;j++)
                {
                    var b = this.okButtons[j];
                    if(b instanceof Xjs.ui.Button)
                        b.setEnabled(v);
                    if(b.attachedDom != null)
                    {
                        b.attachedDom.disabled = !v;
                    }
                }
            this.fireEvent("onEnableDlgOkButton",v);
        }
    },
    /*xjs.ui.Container.isAncestorOf*/
    isAncestorOf:function(c)
    {
        for(var p=c.parent;p != null;p = p.parent)
        {
            if(p == this)
                return true;
        }
        return false;
    },
    /*xjs.ui.Container.getItemByName*/
    getItemByName:function(name)
    {
        var k;
        if(this[k = "item$" + name] !== undefined)
            return this[k];
        var c = Xjs.ui.Component.getItemByName(this,name);
        return this[k] = c;
    },
    /*xjs.ui.Container.getItemValue*/
    getItemValue:function(name)
    {
        var c = this.getItemByName(name);
        return c ? c.getValue() : null;
    },
    /*xjs.ui.Container.setItemValue*/
    setItemValue:function(name,value)
    {
        var c = this.getItemByName(name);
        if(c != null)
            c.setValue(value);
    },
    /*xjs.ui.Container.getItemValues*/
    getItemValues:function(options)
    {
        var values = Xjs.ui.Component.getCompValues(this,null,options);
        this.fireEvent("valueExchange",values,1);
        return values;
    },
    /*xjs.ui.Container.restortInitValues*/
    restortInitValues:function()
    {
        if(this._$backInitValues)
        {
            this.setItemValues(this._$backInitValues,8 | 16);
            this.fireEvent("onRestortInitValues",this._$backInitValues);
        } else if(!this.backInitValues && window.console)
        {
            window.console.log("界面 " + this.name + " : 未定义backInitValues");
        }
    },
    /*xjs.ui.Container.oncmd_resetitemvals*/
    oncmd_resetitemvals:function()
    {
        this.restortInitValues();
    },
    /*xjs.ui.Container.oncmd_refreshtbls*/
    oncmd_refreshtbls:function()
    {
        var a = Xjs.table.Table.getAllTablesFromRootComp(this.getRootComponent());
        if(a)
            for(var i=0;i < a.length;i++)
            {
                if(a[i].queryParam == this)
                {
                    a[i].refreshTableIfOK("refreshtbls");
                }
            }
        this.saveParamVals("default",2 | 4);
    },
    /*xjs.ui.Container.setItemValues*/
    setItemValues:function(values,options)
    {
        Xjs.ui.Component.setCompValues(this,values,options);
        this.fireEvent("valueExchange",values,0);
        this.enableOkButton();
    },
    /*xjs.ui.Container.setParamSaveUIID*/
    setParamSaveUIID:function(paramSaveUIID)
    {
        this.paramSaveUIID = paramSaveUIID;
    },
    /*xjs.ui.Container.setParamSaveType*/
    setParamSaveType:function(t)
    {
        this.paramSaveType = t;
    },
    /*xjs.ui.Container.getParamSaveUIID*/
    getParamSaveUIID:function()
    {
        return this.paramSaveUIID;
    },
    /*xjs.ui.Container.getParamSaveType*/
    getParamSaveType:function()
    {
        return this.paramSaveType;
    },
    /*xjs.ui.Container.loadSavedParamValues*/
    loadSavedParamValues:function(name)
    {
        var param = {name:name};
        if(this.paramSaveUIID)
            param.forUIID = this.paramSaveUIID;
        if(this.paramSaveType > 0)
            param.type = this.paramSaveType;
        var values = this.uiInvoke("!loadparams",param);
        if(values != null)
            this.setItemValues(values,2);
        if(this._keepLastLoadOrSaveParams)
            this._lastSavedParams = {name:name,value:values};
    },
    /*xjs.ui.Container.saveParamVals*/
    saveParamVals:function(name,flags)
    {
        if(flags & 2 && !this.autoSaveParam)
            return null;
        var param = {name:name};
        if(this.paramSaveUIID)
            param.forUIID = this.paramSaveUIID;
        if(this.paramSaveType > 0)
            param.type = this.paramSaveType;
        if(flags & 4)
            param.UseAdmindef = false;
        var vals;
        param.values = vals = this.getItemValues(2);
        if(!(flags & 1) && (name != (this._lastSavedParams ? this._lastSavedParams.name : null) || !Xjs.elementEquals(this._lastSavedParams ? this._lastSavedParams.value : null,vals)))
        {
            this._lastSavedParams = {name:name,value:vals};
            this.uiInvoke("!saveparams",param);
        }
        return param;
    },
    /*xjs.ui.Container.checkShowing*/
    checkShowing:function(firstFocus,setFirstFocus)
    {
        var showing = Xjs.DOM.isShowing(this.dom);
        if(!showing)
            return;
        if(this.firstFocusComp && showing)
        {
            var c = this.firstFocusComp;
            if(typeof(c) == "string")
                c = this.getItemByName(c);
            if(c != null && firstFocus[0] == null)
            {
                firstFocus[0] = c;
                if(setFirstFocus)
                    c.focus();
            }
        }
        if(this.items)
            for(var i=0;i < this.items.length;i++)
            {
                this.items[i].checkShowing(firstFocus,setFirstFocus);
            }
        if(this.onCheckShowingE)
            this.fireEvent(this.onCheckShowingE,firstFocus,setFirstFocus);
    },
    /*xjs.ui.Container.checkHidden*/
    checkHidden:function()
    {
        if(this.items)
        {
            for(var i=0;i < this.items.length;i++)
            {
                if(this.items[i] . checkHidden)
                    this.items[i].checkHidden();
            }
        }
    },
    /*xjs.ui.Container.getLayoutRootDOM*/
    getLayoutRootDOM:function()
    {
        if(this.layoutConfig && this.layoutConfig.rootDOM)
            return this.layoutConfig.rootDOM;
        return this.parent && this.parent.getLayoutRootDOM ? this.parent.getLayoutRootDOM() : null;
    },
    /*xjs.ui.Container.getFocusedItemPath*/
    getFocusedItemPath:function()
    {
        if(this.items)
            for(var i=0;i < this.items.length;i++)
            {
                var c;
                if((c = this.items[i])._isActiveElementIn())
                {
                    if(c instanceof Xjs.ui.Container)
                    {
                        var a = c.getFocusedItemPath();
                        if(!a)
                            return [c];
                        a.splice(0,0,c);
                        return a;
                    } else 
                    {
                        return [c];
                    }
                }
            }
        return null;
    }
});
Xjs.apply(Xjs.ui.Container,{
    /*xjs.ui.Container._inCompShowing*/
    _inCompShowing:function(c)
    {
        forTab:{
            if(c.parent instanceof Xjs.ui.TabPanel)
            {
                if(c.parent.initAllTabDOM)
                    break forTab;
                var s = c.parent.selectedTab,
                    p;
                return s >= 0 && c.parent.indexOfComp(c) == s || (p = c.parent._inInitComp) && p == c;
            }
        }
        return !c.parent || Xjs.ui.Container._inCompShowing(c.parent);
    }
});
{
    Xjs.UITYPES.container = Xjs.ui.Container;
}/*xjs/ui/Layer.java*/
Xjs.ui.Layer=function(config){
    Xjs.ui.Layer.superclass.constructor.call(this,config);
    if(window.xjsConfig && window.xjsConfig.layerOpts)
    {
        Xjs.applyIf(this,window.xjsConfig.layerOpts);
    }
};
Xjs.extend(Xjs.ui.Layer,Xjs.Observable,{
  _js$className_:"Xjs.ui.Layer",
    ClickEvent:"mousedown",
    /*xjs.ui.Layer.setParentComponent*/
    setParentComponent:function(p)
    {
        this.parent = p;
    },
    /*xjs.ui.Layer.onDomAttached*/
    onDomAttached:function()
    {
        this._registerMEnter();
    },
    /*xjs.ui.Layer.attachDOM*/
    attachDOM:function(dom,addToDom)
    {
        if(typeof(dom) == "string")
            dom = document.getElementById(dom);
        if(this.dom && this.fnOnMouseOut)
            Xjs.DOM.removeListener(this.dom,"mouseout",this.fnOnMouseOut,false);
        this.dom = dom;
        if(this.hideIfOutclick && !this.fnOnclick)
        {
            this.fnOnclick = Function.bindAsEventListener(this._onClick,this);
            this.fnOnContextMenu = Function.bindAsEventListener(this._onContextMenu,this);
        }
        if(this.hideIfMouseOut && !this.fnOnMouseOut)
        {
            this.fnOnMouseOut = Function.bindAsEventListener(this.onMouseOut,this);
        }
        if(this.dom && this.fnOnMouseOut)
            Xjs.DOM.addListener(this.dom,"mouseout",this.fnOnMouseOut,false);
        dom.style.position = "absolute";
        dom.style.visibility = "hidden";
        dom.style.left = "-10000px";
        dom.style.top = "-10000px";
        Xjs.DOM.addClass(dom,"ui-layer-frame");
        if(!addToDom && this.className)
        {
            Xjs.DOM.updateClass(dom,this.className,null);
        }
        this.parentDOM = addToDom || document.body;
        this.onDomAttached();
    },
    /*xjs.ui.Layer.getDOM*/
    getDOM:function()
    {
        return this.dom;
    },
    /*xjs.ui.Layer.hide*/
    hide:function()
    {
        this._removeFromStack();
        this._hide();
    },
    /*xjs.ui.Layer._hide*/
    _hide:function()
    {
        try
        {
            if(this.maskDOM && this.maskDOM.parentNode)
                this.maskDOM.parentNode.removeChild(this.maskDOM);
        }catch(ex)
        {
        }
        if(!this.dom)
            return;
        Xjs.ui.Panel.inShowingZIndex.remove(this.zindex,true);
        this.zindex = 0;
        this.dom.style.zIndex = 0;
        this.dom.style.visibility = "hidden";
        this.dom.style.left = "-10000px";
        this.dom.style.top = "-10000px";
        if(this.parentDOM)
            try
            {
                this.parentDOM.removeChild(this.dom);
            }catch(e)
            {
            }
        if(this.fnOnclick)
        {
            Xjs.DOM.removeListener(document.body,this.ClickEvent,this.fnOnclick,true);
            Xjs.DOM.removeListener(document.body,"contextmenu",this.fnOnContextMenu,true);
        }
        this.onLayerHidden();
        if(Xjs.onWDocResized)
            Xjs.checkWDocResized();
    },
    /*xjs.ui.Layer.addMaskDOM*/
    addMaskDOM:function(zIdx)
    {
        if(!this.maskDOM)
        {
            this.maskDOM = document.createElement("div");
            this.maskDOM.className = "ui-mask";
            this.maskDOM.disabled = true;
            this.maskDOM.id = "LayerMask";
        }
        this.maskDOM.style.zIndex = zIdx;
        if(document.body != this.maskDOM.parentNode)
            document.body.appendChild(this.maskDOM);
    },
    /*xjs.ui.Layer.getMaskDOM*/
    getMaskDOM:function()
    {
        return this.maskDOM;
    },
    /*xjs.ui.Layer.onLayerHidden*/
    onLayerHidden:Xjs.emptyFn,
    /*xjs.ui.Layer.hideAndFocusParent*/
    hideAndFocusParent:function()
    {
        this.hide();
        if(this.parent)
            this.parent.focus();
    },
    /*xjs.ui.Layer.isInShowing*/
    isInShowing:function()
    {
        return this.dom && this.dom.style.visibility != "hidden";
    },
    /*xjs.ui.Layer.prepareShowing*/
    prepareShowing:Xjs.emptyFn,
    /*xjs.ui.Layer.alignShow*/
    alignShow:function(parent,position,fitSize)
    {
        this.prepareShowing();
        if(!this.dom)
            return;
        if(parent === undefined)
        {
            parent = this.dftParent;
        }
        if(position === undefined)
            position = this.dftPosition || 3;
        if(fitSize === undefined)
            fitSize = this.dftFitSize || 0;
        if(this.parentDOM && this.dom.parentNode != this.parentDOM)
            this.parentDOM.appendChild(this.dom);
        var clientR = null;
        if(parent)
        {
            if(parent instanceof Xjs.ui.ClientRectangle)
                clientR = parent;
            else if(parent.dom)
            {
                clientR = new Xjs.ui.ClientRectangle();
                clientR.dom = parent.dom;
            }
        }
        var size = this.getPrefSize ? this.getPrefSize(clientR) : null,
            setWidth = false,
            setHeight = false;
        if(!size)
        {
            size = {width:0,height:0};
        }
        {
            var domSize = Xjs.DOM.getSize(this.dom);
            if(size.width <= 0)
                size.width = domSize.width;
            else 
                setWidth = true;
            if(size.height <= 0)
                size.height = domSize.height;
            else 
                setHeight = true;
        }
        var bodyScroll = Xjs.DOM.getScroll(),
            viewRect = Xjs.DOM.getVisRect(null,3),
            vw = viewRect.x + viewRect.width,
            vh = viewRect.y + viewRect.height,
            x,
            y;
        if(clientR)
        {
            var xy;
            xy = clientR.getClientXY();
            {
                var bodyPos = Xjs.DOM.getStyle(document.body,"position");
                if(bodyPos == "absolute" || bodyPos == "relative")
                {
                    xy.x -= Xjs.DOM.getMargins(document.body,"l");
                    xy.y -= Xjs.DOM.getMargins(document.body,"t");
                }
            }
            if(position == 3 || position == 1)
            {
                var bottom = xy.y + clientR.getClientHeight(),
                    ty = xy.y - bodyScroll.y,
                    by = bottom - bodyScroll.y,
                    tH0 = ty - 4,
                    bH = vh - by - 4,
                    tH = ty - 4;
                if(position == 3 && bH < size.height && tH > bH && tH0 >= size.height)
                {
                    position = 1;
                }
                x = xy.x;
                if(position == 3)
                {
                    y = bottom;
                    if((fitSize & 1) != 0 && size.height > bH)
                    {
                        size.height = bH;
                    }
                } else 
                {
                    if((fitSize & 1) != 0 && size.height > tH)
                    {
                        size.height = tH;
                    }
                    y = xy.y - size.height;
                }
                var dx = Xjs.DOM.hasVerticalScroll() ? 18 : 0;
                if(x + size.width > vw + bodyScroll.x - dx)
                {
                    x = vw + bodyScroll.x - dx - size.width;
                    if(x < bodyScroll.x)
                        x = bodyScroll.x;
                }
            } else 
            {
                var right = xy.x + clientR.getClientWidth(),
                    rx = right - bodyScroll.x,
                    lx = xy.x - bodyScroll.x,
                    rW = vw - rx - 4,
                    lW = lx - 4;
                if(position == 2)
                {
                    if(rW < size.width && lW > rW)
                        position = 4;
                }
                if(position == 2)
                {
                    x = right;
                } else 
                {
                    x = xy.x - size.width;
                }
                y = xy.y;
                if(y + size.height > vh + bodyScroll.y)
                {
                    y = vh + bodyScroll.y - size.height;
                }
                if(y < bodyScroll.y)
                    y = bodyScroll.y;
            }
        } else 
        {
            x = position[0];
            y = position[1];
            if(x + size.width > vw + bodyScroll.x)
                x = vw + bodyScroll.x - size.width;
            if(x < bodyScroll.x)
                x = bodyScroll.x;
            if(y + size.height > vh + bodyScroll.y)
                y = vh + bodyScroll.y - size.height;
            if(y < bodyScroll.y)
                y = bodyScroll.y;
        }
        if((fitSize & 4) != 0)
        {
            if(position == 3)
                y--;
            else if(position == 1)
                y++;
            else if(position == 2)
                x++;
            else if(position == 4)
                x--;
        }
        if(this.parentDOM && this.parentDOM != document.body)
        {
            var xy0 = Xjs.DOM.getXY(this.parentDOM,true);
            x -= xy0.x;
            y -= xy0.y;
        }
        if(setWidth && size.width > 0)
            this.dom.style.width = size.width + "px";
        if(setHeight && size.height > 0)
            this.dom.style.height = size.height + "px";
        this._inShowingPos = position;
        this.showLayer(x + (this.alignOffsetX || 0),y + (this.alignOffsetY || 0));
    },
    /*xjs.ui.Layer.showLayer*/
    showLayer:function(x,y)
    {
        this.dom.style.left = x + "px";
        this.dom.style.top = y + "px";
        if(this.zindex > 0)
        {
            Xjs.ui.Panel.inShowingZIndex.remove(this.zindex,true);
            this.zindex = 0;
        }
        {
            this.dom.style.zIndex = this.zindex = Xjs.ui.Panel.nextZIndex();
            if(Xjs.ui.Panel.inShowingZIndex.indexOf(this.zindex) < 0)
                Xjs.ui.Panel.inShowingZIndex.push(this.zindex);
        }
        this.dom.style.visibility = "visible";
        if(this.fnOnclick)
            this.bindBodyClick();
        this._addToStack();
        if(Xjs.onWDocResized)
            Xjs.checkWDocResized();
    },
    /*xjs.ui.Layer._addToStack*/
    _addToStack:function()
    {
        if(Xjs.ui.Layer._topLayer != this)
        {
            this._parentLayer = Xjs.ui.Layer._topLayer || null;
            Xjs.ui.Layer._topLayer = this;
            if(this.updateHtlCls)
                this._updatedCls = Xjs.ui.UIUtil.addHtmCls(this.updateHtlCls);
        }
    },
    /*xjs.ui.Layer._removeFromStack*/
    _removeFromStack:function()
    {
        var p = null;
        for(;;)
        {
            var n = p == null ? Xjs.ui.Layer._topLayer : p._parentLayer;
            if(n == null)
                break;
            if(n == this)
            {
                if(p == null)
                    Xjs.ui.Layer._topLayer = n._parentLayer;
                else 
                    p._parentLayer = n._parentLayer;
                n._parentLayer = null;
                if(this._updatedCls)
                {
                    Xjs.ui.UIUtil.updateHtmlCls(this._updatedCls,true);
                    this._updatedCls = null;
                }
                continue;
            }
            p = n;
        }
    },
    /*xjs.ui.Layer._close*/
    _close:function()
    {
        if(this.component && this.component.closeModal)
        {
            this.component.closeModal();
        } else 
        {
            this.hide();
        }
    },
    /*xjs.ui.Layer.bindBodyClick*/
    bindBodyClick:function()
    {
        if(!this.dom || this.dom.style.visibility == "hidden")
            return;
        Xjs.DOM.addListener(document.body,this.ClickEvent,this.fnOnclick,true);
        Xjs.DOM.addListener(document.body,"contextmenu",this.fnOnContextMenu,true);
    },
    /*xjs.ui.Layer.locateCenter*/
    locateCenter:function(opts)
    {
        this.prepareShowing();
        var ifrmPath = opts & 1 ? [] : Xjs.DOM.getIFramePath(),
            w = ifrmPath.length ? ifrmPath[0].contentWindow.parent : window,
            vw = Xjs.DOM.getViewportWidth(w),
            vh = Xjs.DOM.getViewportHeight(w),
            size = Xjs.DOM.getSize(this.dom),
            newSize = null;
        if(this.component && this.component . _resetPrefSize)
        {
            newSize = this.component._resetPrefSize(size);
        }
        if(newSize != null)
        {
            if(newSize.width != size.width)
                Xjs.DOM.setWidth(this.dom,newSize.width);
            if(newSize.height != size.height)
                Xjs.DOM.setHeight(this.dom,newSize.height);
            size = Xjs.DOM.getSize(this.dom);
        }
        var x = (vw - size.width) / 2,
            y = (vh - size.height) / 2;
        for(var i=0;i < ifrmPath.length;i++)
        {
            var oxy = Xjs.DOM.getXY(ifrmPath[i],true);
            x -= oxy.x;
            y -= oxy.y;
        }
        if(x < 0)
            x = 0;
        if(y < 0)
            y = 0;
        var bodyScroll = Xjs.DOM.getScroll(null);
        this.dom.style.left = x + bodyScroll.x + "px";
        this.dom.style.top = y + bodyScroll.y + "px";
        if(Xjs.onWDocResized)
            Xjs.checkWDocResized();
    },
    /*xjs.ui.Layer._onClick*/
    _onClick:function(e)
    {
        if(this.hideIfOutclick && !Xjs.DOM.contains(this.dom,e.srcElement || e.target))
        {
            if(this.parent && this.parent . hideAidinputerIfOutclick && !this.parent.hideAidinputerIfOutclick(this,e) || Xjs.ui.Panel.maxZIndex() > this.zindex)
            {
                return;
            }
            var v = this.fireEventV(0,"checkHideLayerOnClick",e);
            if(v === false)
                return;
            this.hide();
        }
    },
    /*xjs.ui.Layer.onMouseOut*/
    onMouseOut:function(e)
    {
        if(this.hideIfMouseOut && !Xjs.Event.inDOM(e,this.dom,0))
            this.hide();
    },
    /*xjs.ui.Layer._onContextMenu*/
    _onContextMenu:function(e)
    {
        if(this.hideIfOutclick)
        {
            if(this.parent != null && this.parent . hideAidinputerIfOutclick && !this.parent.hideAidinputerIfOutclick(this))
            {
                return true;
            }
            var v = this.fireEventV(0,"checkHideLayerOnClick",e);
            if(v === false)
            {
                return false;
            }
            this.hide();
        }
        return true;
    },
    /*xjs.ui.Layer.setDftParent*/
    setDftParent:function(p)
    {
        this.dftParent = p;
    },
    /*xjs.ui.Layer._registerMEnter*/
    _registerMEnter:function()
    {
        if(this.dom && this._fn$HoverShowMouseEnter)
        {
            Xjs.DOM.addListener(this.dom,"mouseenter",this._fn$HoverShowMouseEnter);
            Xjs.DOM.addListener(this.dom,"mouseleave",this._fn$HoverShowMouseLeave);
        }
    },
    /*xjs.ui.Layer.addShowOnHover*/
    addShowOnHover:function(dom)
    {
        if(!dom)
            return;
        if(!this._fn$HoverShowMouseEnter)
        {
            this._fn$HoverShowMouseEnter = Function.bindAsEventListener(this._onHoverShowMouseEnter,this);
            this._fn$HoverShowMouseLeave = Function.bindAsEventListener(this._onHoverShowMouseLeave,this);
            this._HoverDoms = [];
        }
        if(!this.hoverShowDoms)
        {
            this.hoverShowDoms = [dom];
            this._registerMEnter();
        } else 
        {
            if(this.hoverShowDoms.indexOf(dom) >= 0)
                return;
            this.hoverShowDoms.push(dom);
        }
        Xjs.DOM.addListener(dom,"mouseenter",this._fn$HoverShowMouseEnter);
        Xjs.DOM.addListener(dom,"mouseleave",this._fn$HoverShowMouseLeave);
    },
    /*xjs.ui.Layer._onHoverShowMouseEnter*/
    _onHoverShowMouseEnter:function(ev)
    {
        var dom = ev.srcElement || ev.target;
        if(this._HoverDoms && this._HoverDoms.indexOf(dom) < 0)
        {
            this._HoverDoms.push(dom);
        }
        if(!this.isInShowing())
        {
            this.alignShow();
        }
        if(this._ivHideLayer)
        {
            clearTimeout(this._ivHideLayer);
            delete this._ivHideLayer;
        }
    },
    /*xjs.ui.Layer._hideIfAllMouseOut*/
    _hideIfAllMouseOut:function()
    {
        if(!this._HoverDoms || this._HoverDoms.length == 0)
            this.hide();
    },
    /*xjs.ui.Layer._onHoverShowMouseLeave*/
    _onHoverShowMouseLeave:function(ev)
    {
        var dom = ev.srcElement || ev.target;
        if(this._HoverDoms)
        {
            var j;
            if((j = this._HoverDoms.indexOf(dom)) >= 0)
            {
                this._HoverDoms.splice(j,1);
            }
            if(this._ivHideLayer)
            {
                clearTimeout(this._ivHideLayer);
                delete this._ivHideLayer;
            }
            if(this._HoverDoms.length == 0)
            {
                if(!this._fn$Hide)
                    this._fn$Hide = this._hideIfAllMouseOut.createDelegate(this);
                this._ivHideLayer = setTimeout(this._fn$Hide,100);
            }
        }
    }
});
Xjs.apply(Xjs.ui.Layer,{
    /*xjs.ui.Layer.closeTop*/
    closeTop:function()
    {
        if(Xjs.ui.Layer._topLayer)
        {
            Xjs.ui.Layer._topLayer._close();
        }
    },
    /*xjs.ui.Layer.getMaskDOM*/
    getMaskDOM:function(dom)
    {
        for(;dom && dom.parentNode != document.body;dom = dom.parentNode)
            ;
        if(!dom)
            return null;
        var e1 = null,
            e2 = null;
        for(var e=dom;e;e = e.previousElementSibling)
        {
            if(e.id == "LayerMask")
            {
                e1 = e;
                break;
            }
        }
        for(var e=dom;e;e = e.nextElementSibling)
        {
            if(e.id == "LayerMask")
            {
                e2 = e;
                break;
            }
        }
        return [e1,e2];
    },
    /*xjs.ui.Layer.getFixedDomPos*/
    getFixedDomPos:function(dom,selector,pos)
    {
        var v = 0,
            maskDom = Xjs.ui.Layer.getMaskDOM(dom);
        if(maskDom)
        {
            var a = Xjs.DOM.findAll(selector,null);
            if(a)
                for(var j=0;j < a.length;j++)
                {
                    var e = a[j];
                    if(maskDom[0] && e.compareDocumentPosition(maskDom[0]) == 4 || maskDom[1] && e.compareDocumentPosition(maskDom[1]) == 2)
                        continue;
                    var x,
                        b = e.getBoundingClientRect();
                    switch(pos)
                    {
                    case 2:
                        x = b.right;
                        break;
                    case 4:
                        x = Xjs.DOM.getViewportWidth() - b.left;
                        break;
                    case 3:
                        x = Xjs.DOM.getViewportHeight() - b.top;
                        break;
                    default:
                        x = b.bottom;
                        break;
                    }
                    if(v < x)
                        v = x;
                }
        }
        return v;
    }
});
/*xjs/ui/Panel.java*/
Xjs.ui.Panel=function(config){
    Xjs.ui.Panel.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.Panel,Xjs.ui.Container,{
  _js$className_:"Xjs.ui.Panel",
    bottomsDomID:"buttons",
    toolbarDomId:"toolbar",
    titleBarDomId:"titlebar",
    clsPaneCollapsed:"ui-panel-collapsed",
    moveBarDOM:"#PaneTitleBar",
    /*xjs.ui.Panel.__init*/
    __init:function()
    {
        Xjs.ui.Panel.superclass.__init.call(this);
        this.needRelayoutIfResize = true;
    },
    /*xjs.ui.Panel._createButtonsDomTo*/
    _createButtonsDomTo:function(domStyle,btnsDOM,root)
    {
        if(!root)
            root = this._getAttachRootDOM();
        if(this.buttons)
            for(var i=0;i < this.buttons.length;i++)
            {
                var btnCfg = this.buttons[i];
                if(!btnCfg . getDOM)
                    btnCfg = Xjs.apply({domStyle:domStyle},btnCfg);
                var btn;
                this.buttons[i] = btn = Xjs.ui.Component.toComponent(btnCfg,"button");
                if(btnsDOM)
                {
                    var e = btn.getDOM(root);
                    if(!e.parentNode)
                        btnsDOM.appendChild(e);
                }
                if(btn.command == "ok" || btn.okCommand)
                    this.okButtons = Array.addElement(this.okButtons,btn);
                btn.addListener(this);
            }
        if(this.valuesSaveable && btnsDOM)
        {
            var res = Xjs.ResBundle.getRes("UI"),
                b = new Xjs.ui.Button({domStyle:domStyle,command:"savevalue",id:this.id + "_btn_savevalue",text:res.get("Param.Save"),className:"btn"}),
                e = b.getDOM(root);
            if(!e.parentNode)
                btnsDOM.appendChild(b.getDOM(root));
            b.addListener(this);
            this.okButtons = Array.addElement(this.okButtons,b);
            b = new Xjs.ui.Button({domStyle:domStyle,command:"loadvalue",id:this.id + "_btn_loadvalue",text:res.get("Param.Load"),className:"btn"});
            e = b.getDOM(root);
            if(!e.parentNode)
                btnsDOM.appendChild(b.getDOM(root));
            b.addListener(this);
        }
    },
    /*xjs.ui.Panel.onDomCreated*/
    onDomCreated:function(root)
    {
        Xjs.ui.Panel.superclass.onDomCreated.call(this,root);
        if(!this.disableCollapse)
        {
            var s = typeof(this.collapseBtn) == "string" ? this.collapseBtn : "#UI_" + this.name + "_FoldPane #FoldPaneBtn";
            this.collapseBtn = Xjs.DOM.find(s,root);
            if(!this.collapseBtn)
            {
                this.collapseBtn = Xjs.DOM.findById("PaneCollapseBtn",this.dom);
            }
            if(this.collapseBtn)
            {
                this.collapseBtn.onclick = Function.bindAsEventListener(this.onClickCollapse,this);
            }
            for(var i=1;i <= 5;i++)
            {
                var b = Xjs.DOM.findById("PaneCollapseBtn" + i,this.dom);
                if(b)
                    b.onclick = Function.bindAsEventListener(this.onClickCollapse,this,0,false,null,[i]);
            }
        }
        if(this._pendingCollapseContent !== undefined)
        {
            this.collapseContent(this._pendingCollapseContent);
            try
            {
                delete this._pendingCollapseContent;
            }catch(ex)
            {
            }
        }
        if(this.dom)
        {
            if(this.valuesSaveable)
            {
                this.bindWBtns(["savevalue","loadvalue"]);
            }
            if(this.isDialogPane)
            {
                var e;
                if(e = Xjs.DOM.findById("btn_wclose",this.dom))
                    this.bindOnCmdClickPerform(e,"close");
                this.bindWBtns(["resetitemvals","togglecollapse","refreshtbls"]);
            }
            setTimeout(this.firstFixhByContent.createDelegate(this),100);
        }
    },
    /*xjs.ui.Panel.firstFixhByContent*/
    firstFixhByContent:function()
    {
        if(this.fixhByContent == 1 && this.bodyDOM && this.bodyDOM.style.minHeight == "")
        {
            var minH = Xjs.DOM.getHeight(this.bodyDOM) - Xjs.DOM.getPadding(this.bodyDOM,"tb");
            this.bodyDOM.style.minHeight = minH + "px";
        }
    },
    /*xjs.ui.Panel.bindWBtns*/
    bindWBtns:function(na)
    {
        for(var j=0;j < na.length;j++)
        {
            try
            {
                var e;
                if(e = Xjs.DOM.findById("UIA_" + this.name + "_btn_w" + na[j],this.dom))
                {
                    this.bindOnCmdClickPerform(e,na[j]);
                    if(j == 0)
                        this.backInitValues = true;
                }
            }catch(ex)
            {
                console.log(ex);
            }
        }
    },
    /*xjs.ui.Panel._getBottomHeight*/
    _getBottomHeight:function()
    {
        var doms = this._bottomDoms;
        if(!doms || doms.length == 0)
            return 0;
        var h = 0;
        for(var i=0;i < doms.length;i++)
        {
            h += Xjs.DOM.getHeight(doms[i]);
        }
        if(doms.length == 0)
            h += Xjs.DOM.getMargins(doms[0],"tb");
        else 
        {
            h += Xjs.DOM.getMargins(doms[0],"t") + Xjs.DOM.getMargins(doms[doms.length - 1],"b");
        }
        return h;
    },
    /*xjs.ui.Panel._createDOM*/
    _createDOM:function(root)
    {
        var dom = this._createDom0(root,"div",null);
        this.xbodyDOM = Xjs.DOM.findById("xbody",dom);
        this.bodyDOM = Xjs.DOM.findById("body",dom);
        if(this.bodyDOM)
        {
            if(typeof(this.borderMargin) == "number")
                this.bodyDOM.style.margin = this.borderMargin + "px";
            if(typeof(this.borderPadding) == "number")
                this.bodyDOM.style.padding = this.borderPadding + "px";
            if(this.maxBodyHeight)
                this.bodyDOM.style.maxHeight = this.maxBodyHeight + "px";
        }
        {
            var titb = Xjs.DOM.findById(this.titleBarDomId,dom);
            if(titb)
            {
                this.titleBar = new Xjs.ui.Toolbar({id:this.titleBarDomId});
                this.titleBar.addListener(this);
                this.titleBar._setAttachRootDOM(titb);
            }
        }
        var tbDom = Xjs.DOM.findById(this.toolbarDomId,dom);
        if(tbDom)
        {
            this.toolBar = new Xjs.ui.Toolbar({id:this.toolbarDomId});
            if(this.toolbarClassName)
                this.toolBar.className = this.toolbarClassName;
            this.toolBar.addListener(this);
            this.initToolbar();
            this._updateToolbarVis();
            this.toolBar._setAttachRootDOM(tbDom);
            var tbDOM = this.toolBar.getDOM(tbDom);
            if(this.xtopPanes != null)
                for(var i=0;i < this.xtopPanes.length;i++)
                {
                    var e = this.xtopPanes[i].getDOM(),
                        b = tbDOM.nextElementSibling;
                    if(e && !e.parentNode)
                    {
                        tbDOM.parentNode.insertBefore(e,b);
                    }
                }
        }
        if(this.titleBar)
        {
            this.initTitlebar();
            this.titleBar.getDOM();
        }
        var btnsDom = null;
        if(this.bodyDOM && this.bodyDOM.parentNode)
        {
            btnsDom = Xjs.DOM.getElementById(this.bodyDOM.parentNode.childNodes,this.bottomsDomID);
        }
        if(!btnsDom)
            btnsDom = Xjs.DOM.findById(this.bottomsDomID,dom);
        this.bottomsDOM = btnsDom;
        if(this.buttons)
        {
            this._createButtonsDomTo(null,btnsDom,dom);
        }
        if(btnsDom)
        {
            this._bottomDoms = [btnsDom];
            if(this.layoutBottomBtnsMode == 2 && btnsDom)
                btnsDom.style.display = "none";
        }
        this.layoutItems(this.bodyDOM || dom || root,root);
        if(this.moveable)
        {
            Xjs.DOM.addListener(dom,"mousedown",this._onWMouseDown,false,this);
            Xjs.DOM.addListener(dom,"mousemove",this._onWMouseMove,false,this);
            this._$onWMouseUp = Function.bindAsEventListener(this._onWMouseUp,this);
            Xjs.DOM.addListener(dom,"mouseup",this._$onWMouseUp,false);
        }
        if(this.domStyle)
            Xjs.apply(dom.style,this.domStyle);
        if(this.customSbar && this.bodyDOM)
        {
            this._bodySbar = new Xjs.ui.util.CustomScrollbar(this.name + ".SBar",this.bodyDOM,this.customSbar,null,null,null);
        }
        return dom;
    },
    /*xjs.ui.Panel._updateToolbarVis*/
    _updateToolbarVis:function()
    {
        if(!this.toolBar)
            return;
        if(this.hasToolbar === false)
            this.toolBar.setVisible(false);
        else 
            this.toolBar.setVisibleIf();
    },
    /*xjs.ui.Panel.focus*/
    focus:function()
    {
        if(this.dom)
        {
            try
            {
                this.dom.focus();
            }catch(ex)
            {
                if(window.console)
                    console.log(ex);
            }
        }
    },
    /*xjs.ui.Panel.getToolbar*/
    getToolbar:function()
    {
        return this.toolBar;
    },
    /*xjs.ui.Panel.addXTopPane*/
    addXTopPane:function(p)
    {
        if(this.xtopPanes == null)
            this.xtopPanes = [p];
        else 
            this.xtopPanes.push(p);
    },
    /*xjs.ui.Panel.getResizePDOM*/
    getResizePDOM:function()
    {
        return this.contentScrollDOM || this.bodyDOM || this.dom;
    },
    /*xjs.ui.Panel.doOnResize*/
    doOnResize:function()
    {
        if(!this.dom || this.dom.style.display == "none")
        {
            return;
        }
        var hresizeDOM = this.contentScrollDOM || this.bodyDOM;
        if(hresizeDOM != this.dom && hresizeDOM && this.dom.style.height && this.dom.style.height != "auto")
        {
            var h = Xjs.DOM.getHeight(this.dom) - Xjs.DOM.getBorder(this.dom,"tb") - (this.toolBar ? Xjs.DOM.getHeight(this.toolBar.getDOM()) : 0) - this._getBottomHeight() - Xjs.DOM.getMargins(hresizeDOM,"tb");
            if(this.xtopPanes != null)
                for(var j=0;j < this.xtopPanes.length;j++)
                    h -= Xjs.DOM.getHeight(this.xtopPanes[j].getDOM());
            Xjs.DOM.setHeight(hresizeDOM,h > 0 ? h : 0);
        }
        Xjs.ui.Panel.superclass.doOnResize.call(this);
        this.updateBdoySBar();
    },
    /*xjs.ui.Panel.updateBdoySBar*/
    updateBdoySBar:function()
    {
        if(this._bodySbar)
        {
            this._bodySbar.updateValue();
        }
    },
    /*xjs.ui.Panel.initToolbar*/
    initToolbar:function()
    {
        if(this.collapsible)
        {
            var icon;
            this.toolBar.addCloseIcon(icon = {iconClass:"x-tool-collapse-north",command:"toggleCollapse"});
            if(this.floatCollapseIconLeft !== false)
            {
                icon.floatLeft = true;
            }
        }
        if(this.toolbarPanes)
            this.toolBar.addChild(this.toolbarPanes);
        if(this.closeable)
        {
            this.toolBar.addCloseIcon({iconClass:"x-tool-close",command:"onClose"});
        }
        if(!this.hideTitle && !this.titleBar)
        {
            this.toolBar.title = this.title;
        } else 
        {
            this.toolBar.setTitleHidden(true);
        }
    },
    /*xjs.ui.Panel.initTitlebar*/
    initTitlebar:function()
    {
        if(this.closeable && (!this.toolBar || !this.toolBar.isVisible()))
        {
            this.titleBar.addCloseIcon({iconClass:"x-tool-close",command:"onClose"});
        }
        if(!this.hideTitle)
        {
            this.titleBar.title = this.title;
        }
    },
    /*xjs.ui.Panel.collapseContent*/
    collapseContent:function(c,suffix)
    {
        if(suffix == null)
            suffix = "";
        if(!this.xbodyDOM)
        {
            this._pendingCollapseContent = c === undefined ? true : c;
            return;
        }
        var cls = this.clsPaneCollapsed + suffix;
        if(c == null)
            c = !Xjs.DOM.hasClass(this.dom,cls);
        var _c = !!c;
        this.fireEvent("onPaneCollapseing",_c);
        if(Xjs.DOM.hasClass(this.dom,cls) != _c)
        {
            Xjs.DOM.addOrRemoveClass(this.dom,cls,_c);
            if(this.toolBar && suffix == "")
                this.toolBar.setCloseIconClass("toggleCollapse",_c ? "x-tool-collapse-south" : "x-tool-collapse-north");
            if(this.parent != null && this.parent.onResize)
                this.parent.onResize();
            var dollapsed = Xjs.DOM.hasClass(this.dom,cls);
            if(this . onContentCollapse)
                this.onContentCollapse(dollapsed);
            this.fireEvent("onPaneCollapse",dollapsed);
            if(Xjs.onWDocResized)
                Xjs.checkWDocResized();
        }
    },
    /*xjs.ui.Panel.toggleCollapse*/
    toggleCollapse:function()
    {
        this.collapseContent(null,"");
    },
    /*xjs.ui.Panel.onClickCollapse*/
    onClickCollapse:function(ev,by,suffix)
    {
        this.collapseContent(null,suffix);
    },
    /*xjs.ui.Panel.oncmd_togglecollapse*/
    oncmd_togglecollapse:function()
    {
        this.collapseContent(null,"");
    },
    /*xjs.ui.Panel.setTitle*/
    setTitle:function(title)
    {
        this.title = title;
        if(this.toolBar && !this.hideTitle)
        {
            this.toolBar.setTitle(title);
        }
    },
    /*xjs.ui.Panel._getToolbarPanes*/
    _getToolbarPanes:function()
    {
        var toolBar = this.xtoolBar || this.toolBar;
        if(toolBar)
        {
            if(!toolBar.items)
                toolBar.items = [];
            return toolBar.items;
        } else 
        {
            return this.toolbarPanes ? this.toolbarPanes : (this.toolbarPanes = []);
        }
    },
    /*xjs.ui.Panel.addToolbarButton*/
    addToolbarButton:function(command,config,group,listener)
    {
        if(typeof(group) != "number")
            group = 5;
        var paneItems = this._getToolbarPanes(),
            n = paneItems.length,
            addToPane = null,
            i = 0;
        for(;i < n;i++)
        {
            var pi = paneItems[i];
            if(typeof(pi.buttonGrp) != "number")
                continue;
            if(pi.buttonGrp == group)
            {
                addToPane = pi;
                break;
            }
            if(pi.buttonGrp > group)
            {
                break;
            }
        }
        if(addToPane == null)
        {
            addToPane = new Xjs.ui.MenuPane({buttonGrp:group});
            paneItems.splice(i,0,addToPane);
            var toolBar = this.xtoolBar || this.toolBar;
            if(toolBar != null && toolBar.dom != null)
            {
            }
        }
        if(listener !== null)
        {
            addToPane.addListener(listener || this);
        }
        if(typeof(config) == "string")
        {
            config = {text:config};
        }
        if(config == null)
            config = {};
        var clsName = config.className;
        if(!clsName && command.indexOf("|") < 0)
        {
            config.className = "ui-iconbtn ui-tbbtn-tabletbbtns ui-tbltbbtn-defaultbtn";
        } else if(clsName && clsName.startsWith("*-"))
        {
            config.className = "ui-iconbtn ui-tbbtn-tabletbbtns ui-tbltbbtn" + clsName.substring(1);
        }
        var node = Xjs.ui.Menu.addChildNode(addToPane,command,config,null);
        if(addToPane.dom)
        {
            addToPane._createNodesDOM(addToPane.dom);
        }
        this._updateToolbarVis();
        return node;
    },
    /*xjs.ui.Panel.removeToolbarButton*/
    removeToolbarButton:function(n)
    {
        var pi = this._getToolbarPanes();
        if(pi)
            for(var i=0;i < pi.length;i++)
            {
                if(pi[i].removeNode(n))
                    return true;
            }
        return false;
    },
    /*xjs.ui.Panel.addToolbarButtons*/
    addToolbarButtons:function(btnConfigs)
    {
        if(btnConfigs == null)
            return;
        for(var i=0;i < btnConfigs.length;i++)
        {
            var cfg = Xjs.apply({},btnConfigs[i]),
                command = cfg.command,
                group = cfg.group,
                listener = cfg.listener;
            delete cfg.command;
            delete cfg.group;
            delete cfg.listener;
            this.addToolbarButton(command,cfg,group,listener);
        }
    },
    /*xjs.ui.Panel.isToolbarBtnEnabled*/
    isToolbarBtnEnabled:function(command)
    {
        var paneItems = this._getToolbarPanes();
        if(paneItems == null)
            return false;
        for(var i=0;i < paneItems.length;i++)
        {
            var p = paneItems[i],
                n = p.getNodeByCommand(command);
            if(n != null)
            {
                return !n.disabled && !p.disabled;
            }
        }
        return false;
    },
    /*xjs.ui.Panel.setToolbarBtnEnabled*/
    setToolbarBtnEnabled:function(command,enabled)
    {
        var paneItems = this._getToolbarPanes();
        if(paneItems == null)
            return;
        for(var i=0;i < paneItems.length;i++)
        {
            var p = paneItems[i];
            if(p . setCommandEnabled)
                p.setCommandEnabled(command,enabled);
        }
    },
    /*xjs.ui.Panel.setToolbarBtnVisible*/
    setToolbarBtnVisible:function(cmd,visivle,opts)
    {
        var paneItems = this._getToolbarPanes();
        if(paneItems == null)
            return;
        for(var i=0;i < paneItems.length;i++)
        {
            var p = paneItems[i];
            if(p . setCommandVisible)
                p.setCommandVisible(cmd,visivle,opts);
        }
    },
    /*xjs.ui.Panel.getMenuNode*/
    getMenuNode:function(command)
    {
        var paneItems = this._getToolbarPanes();
        if(paneItems == null)
            return null;
        for(var i=0;i < paneItems.length;i++)
        {
            var p = paneItems[i];
            if(p . getNodeByCommand)
            {
                var n = p.getNodeByCommand(command);
                if(n != null)
                {
                    return new Xjs.ui.MenuPaneNode(p,n);
                }
            }
        }
        return null;
    },
    /*xjs.ui.Panel.getMenuNodes*/
    getMenuNodes:function()
    {
        var paneItems = this._getToolbarPanes();
        if(!paneItems)
            return null;
        var a = [];
        for(var i=0;i < paneItems.length;i++)
        {
            var p = paneItems[i];
            if(p.nodes)
                for(var j=0;j < p.nodes.length;j++)
                    a.push(new Xjs.ui.MenuPaneNode(p,p.nodes[j]));
        }
        return a;
    },
    /*xjs.ui.Panel.setToolbarBtnText*/
    setToolbarBtnText:function(command,text,textType)
    {
        var n = this.getMenuNode(command);
        if(n != null)
            n.setText(text,textType);
    },
    /*xjs.ui.Panel.setSwitchShowText*/
    setSwitchShowText:function(source,show)
    {
        if(source . setText)
        {
            var $switchshow$VisibleText = source.$switchshow$VisibleText,
                $switchshow$HiddenText = source.$switchshow$HiddenText;
            if($switchshow$VisibleText == null && source . getText)
            {
                $switchshow$VisibleText = source.getText();
                source.$switchshow$VisibleText = $switchshow$VisibleText;
            }
            if($switchshow$VisibleText != null && $switchshow$HiddenText != null)
            {
                source.setText(show ? $switchshow$HiddenText : $switchshow$VisibleText);
            }
        }
    },
    /*xjs.ui.Panel.getOkButton*/
    getOkButton:function()
    {
        if(this.buttons)
            for(var i=0;i < this.buttons.length;i++)
            {
                var b = this.buttons[i],
                    cmd = b.command;
                if((cmd == "close" || cmd == "ok" || b.okCommand || b.closeCommand) && !this.buttons[i].nocloseWindow)
                    return b;
            }
        return null;
    },
    /*xjs.ui.Panel.doPerformCmd*/
    doPerformCmd:function(src,cmd)
    {
        Xjs.ui.Panel.superclass.doPerformCmd.call(this,src,cmd);
        if(!cmd)
            return;
        var node = this.getMenuNode(cmd);
        if(node && node.node.xprops && node.node.xprops._rlog)
            Xjs.rlog("INFO","button",this.getRootComponentMID() + "#" + this.name + "#" + cmd + "-" + node.node.text);
        if(cmd.startsWith("_switchcss_"))
        {
            if(this.dom)
            {
                var c;
                Xjs.DOM.toggleClass(this.dom,c = cmd.substring(11));
                this.setSwitchShowText(src,!Xjs.DOM.hasClass(this.dom,c));
            }
            return;
        }
        var close = (cmd == "close" || cmd == "ok" || cmd == "cancel" || src.okCommand || src.closeCommand) && !src.nocloseWindow;
        if(cmd == "ok" || src.okCommand)
        {
            this.fireEvent("onOk",src,cmd);
        }
        if(close)
        {
            this.closeModal(cmd);
        }
    },
    /*xjs.ui.Panel.beforeShowing*/
    beforeShowing:Xjs.emptyFn,
    /*xjs.ui.Panel.onShowing*/
    onShowing:Xjs.emptyFn,
    /*xjs.ui.Panel.showModal*/
    showModal:function()
    {
        this.showPane(true,null);
    },
    /*xjs.ui.Panel.showPane*/
    showPane:function(modal,parent)
    {
        if(!this.getDOM())
            return;
        if(!this.layer)
        {
            this.layer = new Xjs.ui.Layer({hideIfOutclick:!modal});
            this.layer.className = this.layerClassName;
            if(this.layerUpdateHtmlCls)
                this.layer.updateHtlCls = this.layerUpdateHtmlCls;
            else if(modal && this.layerUpdateHtmlCls === undefined && Xjs._uiInited)
                this.layer.updateHtlCls = ["~ui-fullpage"];
            this.layer.attachDOM(this.dom,null);
            this.layer.component = this;
        }
        if(this.layer.isInShowing())
            return;
        Xjs.DOM.addOrRemoveClass(this.dom,"ui-nonmodal",!modal);
        this.beforeShowing();
        this._zIndex = Xjs.ui.Panel.nextZIndex();
        this.dom.style.zIndex = this._zIndex + 100;
        if(modal)
        {
            this.layer.addMaskDOM(this._zIndex);
        }
        document.body.appendChild(this.dom);
        if(modal)
        {
            this.layer.locateCenter(this.locateCenterOpts || 0);
            this.dom.style.left = "-10000px";
        } else 
        {
            this.layer.alignShow(parent,3,0);
        }
        this.dom.style.visibility = "visible";
        this.layer._addToStack();
        this.layer._modal = !!modal;
        var em = this.escKeyMode === undefined ? 1 : this.escKeyMode;
        if(em == 1 && !this.hasAccKeyByKCode(0x1b))
        {
            this.addAccKey({cmd:"close",keyCode:0x1b});
        }
        this.updateAllItemsSize();
        var firstFocus = new Array(1);
        try
        {
            this.onResize();
            this.checkShowing(firstFocus,true);
        }finally
        {
            if(modal)
            {
                this.layer.locateCenter(this.locateCenterOpts || 0);
            } else 
            {
                this.layer.alignShow(parent,3,0);
            }
        }
        if(Xjs.ui.Panel.inShowingZIndex.indexOf(this._zIndex) < 0)
            Xjs.ui.Panel.inShowingZIndex.push(this._zIndex);
        var c = this.firstFocusComp || firstFocus[0];
        if(c)
        {
            if(typeof(c) == "string")
            {
                c = this.getItemByName(c);
            }
            if(c != null)
                Function.setTimeout(c.focus,c,10,false);
        }
        if(this._bodySbar)
            this._bodySbar.updateValue();
        this.onShowing();
        this.fireEvent("onShowing");
        if(this.isFixBtnsOnScr())
        {
            setTimeout(this.initBtnsFixedOnScroll.createDelegate(this),1);
        }
    },
    /*xjs.ui.Panel.isFixBtnsOnScr*/
    isFixBtnsOnScr:function()
    {
        return this.fixBtnsOnScroll !== false;
    },
    /*xjs.ui.Panel.initBtnsFixedOnScroll*/
    initBtnsFixedOnScroll:function()
    {
        if(this.btnsFixedOnScroll)
        {
            this.btnsFixedOnScroll.dispose();
            this.btnsFixedOnScroll = null;
        }
        if(this.isFixBtnsOnScr() && this.dom && this.layer && this.layer.isInShowing())
        {
            var e = this.bottomsDOM;
            if(e)
            {
                var s = this.btnsFixedOnScroll = new Xjs.ui.util.FixedOnScroll2(null,null,e,this.bodyDOM,3);
                setTimeout(s.checkFixed.createDelegate(s),1000);
            }
        }
    },
    /*xjs.ui.Panel.oncmd_close*/
    oncmd_close:function()
    {
        this.closeModal(null);
    },
    /*xjs.ui.Panel.closeModal*/
    closeModal:function(cmd)
    {
        if(!this.layer || !this.layer.isInShowing())
            return;
        this.fireEvent("onClosing",cmd);
        this.doCloseModal(cmd);
    },
    /*xjs.ui.Panel.doCloseModal*/
    doCloseModal:function(cmd)
    {
        if(this._movingW)
        {
            this._movingW.stopMouseMove();
            this._movingW = null;
        }
        this.layer.hide();
        try
        {
            if(this.dom.parentNode)
                this.dom.parentNode.removeChild(this.dom);
        }catch(ex)
        {
        }
        Xjs.ui.Panel.inShowingZIndex.remove(this._zIndex,true);
        this._zIndex = 0;
        this.onClosed();
        this.fireEvent("onClosed",cmd);
        if(this.btnsFixedOnScroll)
        {
            this.btnsFixedOnScroll.dispose();
            this.btnsFixedOnScroll = null;
        }
        this.checkHidden();
    },
    /*xjs.ui.Panel.onClosed*/
    onClosed:Xjs.emptyFn,
    /*xjs.ui.Panel.onClose*/
    onClose:function()
    {
        if(this.layer && this.layer.isInShowing())
        {
            this.closeModal(null);
        }
    },
    /*xjs.ui.Panel._resetPrefSize*/
    _resetPrefSize:Xjs.emptyFn,
    /*xjs.ui.Panel._onWMouseDown*/
    _onWMouseDown:function(e)
    {
        if(this._movingW)
            this._movingW.stopMouseMove();
        this._movingW = null;
        delete this._mouseFlags;
        var targetDOM = e.srcElement || e.target,
            inBorder = this.resizeable !== false ? Xjs.Event.inDomBorder(e,this.dom,8) : 0;
        this._mouseFlags = inBorder;
        var tbar = this.toolBar || this.titleBar;
        if(tbar && inBorder == 0)
        {
            var inToobar = tbar.dom == targetDOM || Xjs.DOM.contains(tbar.dom,targetDOM);
            if(inToobar && !tbar.isDomInToolbarCloseIcon(targetDOM))
            {
                this._mouseFlags = 0xf;
            }
        } else if(this.moveBarDOM)
        {
            if(typeof(this.moveBarDOM) == "string")
                this.moveBarDOM = Xjs.DOM.find(this.moveBarDOM,this.dom);
            if(Xjs.DOM.contains(this.moveBarDOM,targetDOM))
                this._mouseFlags = 0xf;
        }
        delete this._custSBars;
        if(Xjs.ui.GridTable)
        {
            var a = this.getMainComponents(Xjs.ui.GridTable);
            if(a)
                for(var i=0;i < a.length;i++)
                {
                    if(a[i].customSBar)
                    {
                        if(!this._custSBars)
                            this._custSBars = [];
                        this._custSBars.push(a[i].customSBar);
                    }
                }
        }
    },
    /*xjs.ui.Panel.onComponentMoved*/
    onComponentMoved:function()
    {
        if(this._movingW && this._movingW.moveMode == 0xf)
            this.doMoveOrResize(this._movingW.initRect,this._movingW.currentRect);
    },
    /*xjs.ui.Panel._onWMouseMove*/
    _onWMouseMove:function(e)
    {
        if(this._movingW)
        {
            return;
        }
        if(this._mouseFlags & 0xf)
        {
            if(!this._movingW)
            {
                this._movingW = new Xjs.ui.ComponentMove();
                this._movingW.moveListener = this;
                this._movingW.startMouseMove(this.dom,e,this._mouseFlags,this._$onWMouseUp,0,null);
            }
            this._mouseFlags = 0;
            return;
        }
        if(this.resizeable !== false)
        {
            var inBorder = Xjs.Event.inDomBorder(e,this.dom,8),
                cursorType = null;
            if(inBorder != 0)
            {
                switch(inBorder)
                {
                case 3:
                case 12:
                    cursorType = "se-resize";
                    break;
                case 9:
                case 6:
                    cursorType = "ne-resize";
                    break;
                case 1:
                case 4:
                    cursorType = "s-resize";
                    break;
                case 2:
                case 8:
                    cursorType = "e-resize";
                    break;
                }
            }
            if(cursorType != this._cursorType)
            {
                this._cursorType = cursorType;
                this.dom.style.cursor = cursorType || "default";
            }
        }
    },
    /*xjs.ui.Panel.doMoveOrResize*/
    doMoveOrResize:function(initRect,rect)
    {
        if(rect)
        {
            var s = this.dom.style,
                x = rect.x;
            if(x < 0)
                x = 0;
            var y = rect.y;
            if(y < 0)
                y = 0;
            s.left = x + "px";
            s.top = y + "px";
            if(this.resizeable !== false && (rect.width != initRect.width || rect.height != initRect.height))
            {
                var w = rect.width,
                    h = rect.height,
                    minWidth = this.minWidth || 64;
                if(this.minWidth < 64)
                    this.minWidth = 64;
                var minHeight = this.minHeight || 64;
                if(this.minHeight < 64)
                    this.minHeight = 64;
                if(w < minWidth)
                    w = minWidth;
                if(h < minHeight)
                    h = minHeight;
                this.setSize(w,h);
            }
            if(this.btnsFixedOnScroll)
                this.btnsFixedOnScroll.checkFixed();
            if(this._custSBars)
                for(var j=0;j < this._custSBars.length;j++)
                {
                    this._custSBars[j].checkFix();
                }
        }
    },
    /*xjs.ui.Panel._onWMouseUp*/
    _onWMouseUp:function(e)
    {
        this._mouseFlags = 0;
        if(this._movingW)
        {
            var rect = this._movingW.stopMouseMove(e),
                initRect = this._movingW.initRect;
            this._movingW = null;
            this.doMoveOrResize(initRect,rect);
        }
        delete this._custSBars;
    },
    /*xjs.ui.Panel.attachToHTML*/
    attachToHTML:function(html,opts)
    {
        Xjs.ui.AttachUtils.attachToHTML(html,this,0);
        if(opts & 1)
        {
            delete this.height;
            delete this.width;
        }
    },
    /*xjs.ui.Panel.setToolbarIconEnabled*/
    setToolbarIconEnabled:function(icon,enable)
    {
        if(this.toolBar)
            this.toolBar.setCloseIconEnabled(icon,enable);
    },
    /*xjs.ui.Panel.isAidInputerInShowing*/
    isAidInputerInShowing:function()
    {
        return this.layer && this.layer.isInShowing();
    },
    /*xjs.ui.Panel.addAttachBtnGroup*/
    addAttachBtnGroup:function(tbName,btnGroup,idx)
    {
        var tbComp = Xjs.ui.Component.getItemByName(this.getRootComponent(),tbName),
            mNode = this.addToolbarButton(btnGroup.command || "null",btnGroup.title);
        if(tbComp)
        {
            tbComp.callOnDomCreated(this,this._doAddAttachBtnGroupOn,[tbComp,btnGroup,mNode,idx]);
        }
        return mNode;
    },
    /*xjs.ui.Panel._doAddAttachBtnGroupOn*/
    _doAddAttachBtnGroupOn:function(tbComp,btnGrp,mNode,idx)
    {
        var pdom = tbComp.getDOM(),
            items = btnGrp.items,
            dom = btnGrp.getDOM(pdom);
        mNode.sdom = Xjs.DOM.findById("btn_text",mNode.dom = dom.firstChild);
        if(items)
        {
            var fnClock = null;
            for(var i=0;i < items.length;i++)
            {
                var c = items[i];
                if(c instanceof Xjs.ui.ToolbarBtn)
                {
                    var b = c;
                    if(btnGrp.popupMenuCls)
                    {
                        if(!fnClock)
                        {
                            fnClock = new Xjs.FuncCall(function(_c,d,cls){
            Xjs.DOM.removeClass(d,cls);
        },null,[dom,btnGrp.popupMenuCls]);
                        }
                        b.addListener("beforeMouseClick",fnClock);
                    }
                    c.getDOM().onclick = this.getBtnClickDelegate(b.command,b);
                    if(!mNode.nodes)
                        mNode.nodes = [];
                    var n = {command:b.command,text:b.text,attachedDom:c.getDOM()},
                        xprops = null;
                    if(xprops = c.xprops)
                        n.xprops = xprops;
                    mNode.nodes.push(n);
                }
            }
        }
        if(pdom.contains(dom.parentNode))
            return;
        if(typeof(idx) == "number" && idx < pdom.children.length)
        {
            if(idx < 0)
                idx = 0;
            pdom.insertBefore(dom,pdom.children[idx]);
        } else 
        {
            pdom.appendChild(dom);
        }
    },
    /*xjs.ui.Panel.addAttachBtn*/
    addAttachBtn:function(tbName,btn,btnGrpName,idx)
    {
        var tbComp = Xjs.ui.Component.getItemByName(this.getRootComponent(),tbName);
        if(tbComp)
        {
            tbComp.callOnDomCreated(this,this._doAddAttachBtn,[tbComp,btn,btnGrpName,idx]);
        }
    },
    /*xjs.ui.Panel._doAddAttachBtn*/
    _doAddAttachBtn:function(tbComp,btn,btnGrpName,idx)
    {
        var pdom = tbComp.getDOM(),
            dom = btn.getDOM();
        if(btn)
        {
            var mNode = btn._menuNode = this.addToolbarButton(btn.command || "null",btn.text);
            dom.onclick = this.getBtnClickDelegate(btn.command,btn);
            mNode.attachedDom = mNode.dom = dom;
            var xprops = null;
            if(xprops = btn.xprops)
                mNode.xprops = xprops;
        }
        if(btnGrpName)
        {
            var btnGrpDom = Xjs.DOM.findById("UIA_" + tbComp.name + "_" + btnGrpName,pdom);
            if(btnGrpDom)
                pdom = Xjs.DOM.findById("btn_list",btnGrpDom);
        }
        if(pdom)
        {
            if(idx >= 0 && idx < pdom.children.length)
            {
                pdom.insertBefore(dom,pdom.children[idx]);
            } else 
            {
                pdom.appendChild(dom);
            }
        }
    },
    /*xjs.ui.Panel.listToolbarButtons*/
    listToolbarButtons:function()
    {
        var pi = this._getToolbarPanes();
        if(pi)
            for(var i=0;i < pi.length;i++)
            {
                for(var j=0;j < pi[i].nodes.length;j++)
                {
                    var n = pi[i].nodes[j];
                    window.console.log(n.command + " : " + n.text + " , dom=" + n.dom);
                }
            }
    }
});
Xjs.apply(Xjs.ui.Panel,{
    inShowingZIndex:[],
    /*xjs.ui.Panel.updatePaneBdoySBar*/
    updatePaneBdoySBar:function(c)
    {
        for(var p=c.parent;p;p = p.parent)
        {
            if(p instanceof Xjs.ui.Panel && p._bodySbar)
            {
                p._bodySbar.updateValue();
            }
        }
    },
    /*xjs.ui.Panel.maxZIndex*/
    maxZIndex:function()
    {
        var max = 0;
        for(var i=0;i < Xjs.ui.Panel.inShowingZIndex.length;i++)
        {
            if(max < Xjs.ui.Panel.inShowingZIndex[i])
                max = Xjs.ui.Panel.inShowingZIndex[i];
        }
        return max;
    },
    /*xjs.ui.Panel.nextZIndex*/
    nextZIndex:function()
    {
        var max = 10000;
        for(var i=0;i < Xjs.ui.Panel.inShowingZIndex.length;i++)
        {
            if(max < Xjs.ui.Panel.inShowingZIndex[i])
                max = Xjs.ui.Panel.inShowingZIndex[i];
        }
        return max + 1000;
    },
    /*xjs.ui.Panel.newDefaultButtons*/
    newDefaultButtons:function(idPrefix)
    {
        var okText = "OK",
            closeText = "Close";
        try
        {
            var res = Xjs.ResBundle.getRes("UI");
            okText = res.get("Dlg.Ok");
            closeText = res.get("Dlg.Cancel");
        }catch(ex)
        {
        }
        return Xjs.ui.Panel.newOkButtons(["ok:" + okText,"close:" + closeText],idPrefix);
    },
    /*xjs.ui.Panel.newOkButtons*/
    newOkButtons:function(cmdText,idPrefix)
    {
        var btns = [];
        for(var i=0;i < cmdText.length;i++)
        {
            var s = cmdText[i],
                p = s.indexOf(':'),
                cmd = s.substring(0,p);
            btns[i] = new Xjs.ui.Button({text:s.substring(p + 1),command:cmd,className:"btn " + cmd});
            if(idPrefix)
                btns[i].id = idPrefix + cmd;
        }
        return btns;
    },
    /*xjs.ui.Panel.newCloseButton*/
    newCloseButton:function()
    {
        var closeText = "Close";
        try
        {
            closeText = Xjs.ResBundle.getString("UI","Dlg.Close");
        }catch(ex)
        {
        }
        return Xjs.ui.Panel.newOkButtons(["close:" + closeText],null);
    }
});
{
    Xjs.UITYPES.panel = Xjs.ui.Panel;
}/*xjs/ui/DialogPane.java*/
Xjs.ui.DialogPane=function(config){
    Xjs.ui.DialogPane.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.DialogPane,Xjs.ui.Panel,{
  _js$className_:"Xjs.ui.DialogPane",
    isDialogPane:true,
    /*xjs.ui.DialogPane.__init*/
    __init:function()
    {
        Xjs.ui.DialogPane.superclass.__init.call(this);
        this.title = "";
        this.frame = true;
    },
    /*xjs.ui.DialogPane.beforeDomCreate*/
    beforeDomCreate:function()
    {
        Xjs.ui.DialogPane.superclass.beforeDomCreate.call(this);
        if(this.onOk)
            this.addListener("onOk",this.onOk,this);
    },
    /*xjs.ui.DialogPane.onDomCreated*/
    onDomCreated:function(root)
    {
        Xjs.ui.DialogPane.superclass.onDomCreated.call(this,root);
        if(this.dom && this.okKeyMode > 0)
        {
            Xjs.DOM.addListener(this.dom,"keyup",Function.bindAsEventListener(this.onKeyUp,this,0,true));
        }
        var e = Xjs.DOM.findById("UIWIN_TITLE",root);
        if(e != null)
            Xjs.DOM.setTextContent(e,this.title == null ? "" : this.title);
    },
    /*xjs.ui.DialogPane.focusLost*/
    focusLost:function(_thisCell)
    {
        if(_thisCell.sqlType == 91 || _thisCell.sqlType == 93)
        {
            _thisCell.setValue(_thisCell.getValue());
        }
    },
    /*xjs.ui.DialogPane.onKeyUp*/
    onKeyUp:function(e)
    {
        if(e.keyCode == 13 && (e.ctrlKey && this.okKeyMode == 1 || this.okKeyMode == 2))
        {
            var b = this.getOkButton();
            if(b)
            {
                this.performCommand(b,b.command);
            }
        }
        return;
    },
    /*xjs.ui.DialogPane.initAsTopWin*/
    initAsTopWin:function(opts)
    {
        this.mainUI = 3;
        if(opts & 1)
            this.id = "UIA__Window_";
        if(opts & 2)
            this.itemsLayout = new Xjs.ui.DefaultLayout();
        if(opts & 4)
            this.htmlRes = "@" + Xjs.getDefResPath() + "/WindowBox0.html";
    },
    /*xjs.ui.DialogPane.initComponent*/
    initComponent:function(values)
    {
        Xjs.ui.DialogPane.superclass.initComponent.call(this,values);
        var res = Xjs.ResBundle.getRes("UI");
        if((window.EnvParameter.WADMIN & 3) != 0 || Xjs.isDebugMode)
        {
            this.addPopupMenus(["uidef",res.get("Def_UI")]);
            this.addPopupMenus(["uidef|uidefinition",res.get("Def_UIDB")]);
            this.addPopupMenus(["uidef|uidefforcuicode",res.get("Def_UIDBForCuicode")]);
            this.addPopupMenus(["uidef|uidefxml",res.get("Def_UIXML")]);
            this.addPopupMenus(["uidef|uidefxmlfile",res.get("Def_UIXMLFile")]);
            this.addPopupMenus(["uidef|uideuistatic",res.get("Def_UISTATIC")]);
            this.addPopupMenus(["chche",res.get("CACHE")]);
            this.addPopupMenus(["chche|removeallcache",res.get("CACHE_RemoveAllCache")]);
            this.addPopupMenus(["chche|removelocalcache",res.get("CACHE_RemoveLocalCache")]);
            this.addPopupMenus(["chche|removezkcache",res.get("CACHE_RemoveZKCache")]);
        }
        {
            this.addPopupMenus(["resetitemvals",res.get("ResetItemVal")]);
            this.addPopupMenus(["PCopy",res.get("PCopy")]);
            this.addPopupMenus(["PPast",res.get("PPast")]);
            if(!this._$backInitValues)
            {
                this._$backInitValues = {};
            }
        }
    },
    /*xjs.ui.DialogPane.oncmd_removeallcache*/
    oncmd_removeallcache:function()
    {
        var res = Xjs.ResBundle.getRes("UI");
        Xjs.RInvoke._rinvoke("SN-CMC.QueryCacheUIService.removeAllCaches","sv",null);
        Xjs.RInvoke._rinvoke("SN-CMC.QueryCacheUIService.removezkcache","sv",null);
        Xjs.ui.UIUtil.showInfoDialog(res.get("CACHE_RemoveAllCache"),res.get("CACHE_RemoveAllCache.InfoContent"));
    },
    /*xjs.ui.DialogPane.oncmd_removelocalcache*/
    oncmd_removelocalcache:function()
    {
        var res = Xjs.ResBundle.getRes("UI");
        Xjs.RInvoke._rinvoke("SN-CMC.QueryCacheUIService.removeAllCaches","sv",null);
        Xjs.ui.UIUtil.showInfoDialog(res.get("CACHE_RemoveLocalCache"),res.get("CACHE_RemoveLocalCache.InfoContent"));
    },
    /*xjs.ui.DialogPane.oncmd_removezkcache*/
    oncmd_removezkcache:function()
    {
        var res = Xjs.ResBundle.getRes("UI");
        Xjs.RInvoke._rinvoke("SN-CMC.QueryCacheUIService.removezkcache","sv",null);
        Xjs.ui.UIUtil.showInfoDialog(res.get("CACHE_RemoveZKCache"),res.get("CACHE_RemoveZKCache.InfoContent"));
    }
});
{
    Xjs.UITYPES.dialogpane = Xjs.ui.DialogPane;
}/*xjs/ui/LayerAidInputer.java*/
Xjs.ui.LayerAidInputer=function(config){
    Xjs.ui.LayerAidInputer.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.LayerAidInputer,Xjs.ui.Layer,{
  _js$className_:"Xjs.ui.LayerAidInputer",
    hideIfOutclick:true,
    /*xjs.ui.LayerAidInputer._createDOM*/
    _createDOM:function()
    {
        return Xjs.ui.Component.createDomFromRes(this.htmlRes,this,true,Xjs.ResBundle.getRes("UI"));
    },
    /*xjs.ui.LayerAidInputer.beforeExpandShow*/
    beforeExpandShow:Xjs.emptyFn,
    /*xjs.ui.LayerAidInputer.afterExpandShow*/
    afterExpandShow:Xjs.emptyFn,
    /*xjs.ui.LayerAidInputer.__init*/
    __init:function()
    {
        Xjs.ui.LayerAidInputer.superclass.__init.call(this);
        this.fitSizeOnAlign = 0;
    },
    /*xjs.ui.LayerAidInputer.isMultiSelectable*/
    isMultiSelectable:function()
    {
        return (this.selOptions & 4) != 0;
    },
    /*xjs.ui.LayerAidInputer.setParentValue*/
    setParentValue:function(value)
    {
        this.fireEvent("valueSelected",value);
        if(this.parent && this.parent . setValue)
        {
            this.parent.focus();
            this.parent.setValue(value,undefined,4);
        }
    },
    /*xjs.ui.LayerAidInputer.isAidInputerInShowing*/
    isAidInputerInShowing:function()
    {
        return this.isInShowing();
    },
    /*xjs.ui.LayerAidInputer.getAidInputerInfo*/
    getAidInputerInfo:Xjs.emptyFn,
    /*xjs.ui.LayerAidInputer.expand*/
    expand:function()
    {
        if(this.isInShowing())
            return;
        var newDom = this.dom == null;
        if(newDom)
            this.attachDOM(this._createDOM());
        this.beforeExpandShow(newDom);
        this.alignShow(this.alignRect || this.parent,3,this.fitSizeOnAlign);
        if(this.parent && this.parent.onAidInputerShowing)
            this.parent.onAidInputerShowing(this);
        this.afterExpandShow(newDom);
    },
    /*xjs.ui.LayerAidInputer.reAlignShow*/
    reAlignShow:function()
    {
        if(this.isInShowing())
            this.alignShow(this.alignRect || this.parent,this._inShowingPos,this.fitSizeOnAlign);
    },
    /*xjs.ui.LayerAidInputer.setInitValue*/
    setInitValue:function(value)
    {
        this.initValue = value;
    },
    /*xjs.ui.LayerAidInputer.toCodeValue*/
    toCodeValue:function(v)
    {
        return v;
    },
    /*xjs.ui.LayerAidInputer.doAidInput*/
    doAidInput:function(parent,value,ev)
    {
        if(this.intType && typeof(value) == "string")
            value = Number.obj2int(value,0);
        this.setParentComponent(parent);
        this.enterChar = ev == null ? 0 : ev.enterChar || 0;
        if(ev && ev.enterText)
            this.enterText = ev.enterText;
        this.aopts = ev && ev.options ? ev.options : 0;
        this.alignRect = ev ? ev.alignRect : null;
        if(this.isInShowing())
        {
            this.hide();
        } else 
        {
            if(ev && ev.fnSearchFilter)
            {
                this.bk$fnGetFilter = this.fnGetFilter || null;
                this.fnGetFilter = ev.fnSearchFilter;
            } else if(this.bk$fnGetFilter !== undefined)
            {
                this.fnGetFilter = this.bk$fnGetFilter;
                delete this.bk$fnGetFilter;
            }
            this.setInitValue(this.toCodeValue(value));
            if(this.aopts & 2)
            {
                this.expand();
            } else 
            {
                if(!this.expandDelegate)
                    this.expandDelegate = this.expand.createDelegate(this);
                setTimeout(this.expandDelegate,1);
            }
        }
        return;
    },
    /*xjs.ui.LayerAidInputer.onLayerHidden*/
    onLayerHidden:function()
    {
        if(this.bk$fnGetFilter !== undefined)
        {
            this.fnGetFilter = this.bk$fnGetFilter;
            delete this.bk$fnGetFilter;
        }
        if(this.parent && this.parent.onAidInputerHidden)
            this.parent.onAidInputerHidden(this);
    },
    /*xjs.ui.LayerAidInputer.refilter*/
    refilter:Xjs.emptyFn,
    /*xjs.ui.LayerAidInputer.filterByParentInput*/
    filterByParentInput:function()
    {
        this.refilter(false);
    },
    /*xjs.ui.LayerAidInputer.hideAidInputer*/
    hideAidInputer:function(component)
    {
        this.hide();
    },
    /*xjs.ui.LayerAidInputer.addFilter*/
    addFilter:function(f)
    {
        if(!this.filters)
            this.filters = [f];
        else if(this.filters.indexOf(f) < 0)
            this.filters.push(f);
    },
    /*xjs.ui.LayerAidInputer.removeFilter*/
    removeFilter:function(f)
    {
        if(this.filters)
        {
            this.filters.remove(f,true);
        }
    },
    /*xjs.ui.LayerAidInputer._adjSearchboxOvPos*/
    _adjSearchboxOvPos:function(box,inputField)
    {
        if(!box.offsetParent)
            return;
        var s = box.style,
            xy = Xjs.DOM.getRelativeXY(box.offsetParent,this.parent.dom);
        s.left = -xy.x + "px";
        s.top = -xy.y - 2 + "px";
        Xjs.DOM.setWidth(box,Xjs.DOM.getWidth(this.parent.dom));
        Xjs.DOM.setHeight(box,Xjs.DOM.getHeight(this.parent.dom));
        if(inputField)
        {
            inputField.focus();
        }
    }
});
Xjs.apply(Xjs.ui.LayerAidInputer,{
    /*xjs.ui.LayerAidInputer.filterValues*/
    filterValues:function(filters,values)
    {
        var nf = filters == null ? 0 : filters.length;
        if(nf == 0)
            return values;
        var n = values == null ? 0 : values.length,
            a = [];
        nextRow:for(var r=0;r < n;r++)
            {
                for(var j=0;j < nf;j++)
                {
                    if(!filters[j].filterAccept(values[r]))
                        continue nextRow;
                }
                a.push(values[r]);
            }
        return a;
    }
});
/*xjs/ui/ComboAidInputerA.java*/
Xjs.ui.ComboAidInputerA=function(config){
    Xjs.ui.ComboAidInputerA.superclass.constructor.call(this,config);
    if(window.xjsConfig && window.xjsConfig.comboInputWinOpts)
    {
        Xjs.applyIf(this,window.xjsConfig.comboInputWinOpts);
    }
    this.inSelectingValues = new Xjs.util.SortedArray(null);
    this.valueList = new Xjs.ui.ValueList(null);
    this.valueList.addListener(this);
    if(this.valueOpts > 0)
        this.valueList.valueOpts = this.valueOpts;
};
Xjs.extend(Xjs.ui.ComboAidInputerA,Xjs.ui.LayerAidInputer,{
  _js$className_:"Xjs.ui.ComboAidInputerA",
    minWidth:true,
    lvColumn:0,
    codeColumn:0,
    textColumn:1,
    filterIgnoreCase:true,
    curPage:0,
    clearInitFilter:true,
    /*xjs.ui.ComboAidInputerA.isMidLevlSelectable*/
    isMidLevlSelectable:function(value)
    {
        return (this.selOptions & 2) != 0;
    },
    /*xjs.ui.ComboAidInputerA.__init*/
    __init:function()
    {
        Xjs.ui.ComboAidInputerA.superclass.__init.call(this);
        if(this.selOptions == null)
            this.selOptions = 0;
        this.fitSizeOnAlign = 1;
    },
    /*xjs.ui.ComboAidInputerA.loadSelectOptions*/
    loadSelectOptions:function()
    {
        if(this.pgNavPane === undefined)
            this.initPgNavPane();
        var selectOpts,
            codeData;
        if(this.disableUseParentCodeData)
        {
            selectOpts = null;
            codeData = this.defaultCodeData;
        } else 
        {
            codeData = this.parent.selectOptions;
            if((this.selOptions & 1) == 0 && codeData && codeData.getData)
            {
                selectOpts = codeData.getData(codeData.keyParamNames,null,2,0);
                this.lvColumn = codeData.lvColumn;
                if(this.lvColumn > 0)
                {
                    selectOpts.sort(Array.createCmp1([this.lvColumn]));
                }
            } else 
            {
                selectOpts = this.parent.getSelectOptions(2);
            }
            if(codeData instanceof Xjs.dx.CodeData)
            {
                this.lvColumn = codeData.lvColumn;
                this.codeColumn = codeData.keyCount - 1;
                this.textColumn = codeData.keyCount;
            } else 
            {
            }
        }
        if(!selectOpts && this.defaultCodeData)
        {
            selectOpts = this.defaultCodeData.getData(null,null,2,0);
            this.lvColumn = this.defaultCodeData.lvColumn || 0;
            if(this.lvColumn > 0)
                selectOpts.sort(Array.createCmp1([this.lvColumn]));
        }
        if(this.emptyText !== undefined)
        {
            var old = selectOpts,
                v = this.emptyValue || "";
            selectOpts = [];
            selectOpts[0] = [v,this.emptyText];
            for(var i=0;i < old.length;i++)
                selectOpts.push(old[i]);
        }
        if(this.filters)
            selectOpts = Xjs.ui.LayerAidInputer.filterValues(this.filters,selectOpts);
        if(codeData && codeData.pgRowCount && this.pgNavPane)
        {
            this.pgRowCount = codeData.pgRowCount;
            var nr = selectOpts.length;
            this.pgNavPane.setPageInfo(nr,Math.ceil(nr / this.pgRowCount),0,this.pgRowCount);
            this.pgNavPane.dom.style.display = this.pgNavPane.totalPages > 1 ? "" : "none";
        }
        return selectOpts;
    },
    /*xjs.ui.ComboAidInputerA.getSortedSelOpts*/
    getSortedSelOpts:function()
    {
        if(!this.sortedSelOpts)
        {
            if(this.lvColumn == 0)
            {
                this.lvColCmp = this.lvCol0Cmp = Array.createCmp1([0]);
                this.sortedSelOpts = this.selectOptions;
                return;
            }
            this.sortedSelOpts = new Array(this.selectOptions.length);
            for(var j=0;j < this.sortedSelOpts.length;j++)
                this.sortedSelOpts[j] = this.selectOptions[j];
            this.sortedSelOpts.sort(this.lvColCmp = Array.createCmp1([this.lvColumn]));
        }
    },
    /*xjs.ui.ComboAidInputerA.isLastLevlCode*/
    isLastLevlCode:function(code)
    {
        if(typeof(code) != "string" || (this.selOptions & 1) != 0 || this.selectOptions == null)
            return true;
        this.getSortedSelOpts();
        if(this.ulastLevlCodes == null)
        {
            this.ulastLevlCodes = new Xjs.util.SortedArray(null);
            for(var i=0;i < this.sortedSelOpts.length - 1;i++)
            {
                if(this.sortedSelOpts[i + 1][this.lvColumn].startsWith(this.sortedSelOpts[i][this.lvColumn]))
                    this.ulastLevlCodes.add(this.sortedSelOpts[i][0]);
            }
        }
        return this.ulastLevlCodes.indexOf(code) < 0;
    },
    /*xjs.ui.ComboAidInputerA.getCodeLevel*/
    getCodeLevel:function(code)
    {
        this.getSortedSelOpts();
        var a = new Array(this.lvColumn + 1);
        if(!this.lvCol0Cmp)
            this.lvCol0Cmp = Array.createCmp1([this.codeColumn]);
        a[this.codeColumn] = code;
        var p = Array.binarySearch(this.selectOptions,a,this.lvCol0Cmp);
        if(p < 0)
            return 0;
        code = this.selectOptions[p][this.lvColumn];
        var lv = 0;
        for(;code.length > 1;)
        {
            a[this.lvColumn] = code = code.substring(0,code.length - 1);
            if(Array.binarySearch(this.sortedSelOpts,a,this.lvColCmp) >= 0)
                lv++;
        }
        return lv;
    },
    /*xjs.ui.ComboAidInputerA.isSelectable*/
    isSelectable:function(value)
    {
        return this.selOptions & 3 || this.isLastLevlCode(value);
    },
    /*xjs.ui.ComboAidInputerA.getRowByValue*/
    getRowByValue:function(value)
    {
        var cmp = Array.createCmp1([0]),
            p = Array.binarySearch(this.selectOptions,[value],cmp);
        return p >= 0 ? this.selectOptions[p] : null;
    },
    /*xjs.ui.ComboAidInputerA.isSelectOptsChanged*/
    isSelectOptsChanged:function(selectOptions)
    {
        return !Xjs.ui.List.isSelectOptsEQ(selectOptions,this.selectOptions);
    },
    /*xjs.ui.ComboAidInputerA.getSearchableCols*/
    getSearchableCols:function()
    {
        if(!this._searchableCols)
        {
            if(this.searchableCols)
            {
                return this._searchableCols = this.searchableCols;
            }
            this._searchableCols = [];
            if(this.parent && this.parent.selectOptions && this.parent.selectOptions . getColumns)
            {
                var columns = this.parent.selectOptions.getColumns();
                if(columns)
                    for(var i=0;i < columns.length;i++)
                    {
                        if(columns[i].flags & 0x4000)
                        {
                            this._searchableCols.push(i);
                        }
                    }
                if(this._searchableCols.length == 0 && this.cellTextFmt)
                {
                    if(columns)
                        for(var i=0;i < columns.length;i++)
                        {
                            this._searchableCols.push(i);
                        }
                }
            }
        }
        return this._searchableCols;
    },
    /*xjs.ui.ComboAidInputerA.getSelectValueText*/
    getSelectValueText:function(value)
    {
        var s;
        if(this.parent.selectOptions instanceof Xjs.dx.CodeData && this.parent.selectOptions.keyCount > 1)
        {
            var keyCount = this.parent.selectOptions.keyCount,
                key = new Array(keyCount);
            key[keyCount - 1] = value;
            var p = Array.binarySearch(this.selectOptions,key,Array.createCmp1([keyCount - 1]));
            if(p >= 0)
                return this.selectOptions[p].length > keyCount ? this.selectOptions[p][keyCount] : value;
        }
        if(this.selectOptions)
        {
            var p = Array.binarySearch(this.selectOptions,[value],Array.arrayCmp0);
            if(p >= 0)
                return this.selectOptions[p].length > 1 ? this.selectOptions[p][1] : value;
            s = this._getValueText(value,this.selectOptions);
            if(s != null)
                return s;
        }
        s = this._getValueText(value,this.loadSelectOptions());
        return s == null ? value : s;
    },
    /*xjs.ui.ComboAidInputerA._getValueText*/
    _getValueText:function(value,selectOpts)
    {
        if(selectOpts)
            for(var i=0;i < selectOpts.length;i++)
            {
                if(value == selectOpts[i][0])
                {
                    return selectOpts[i].length > 1 ? selectOpts[i][1] : value;
                }
            }
        return null;
    },
    /*xjs.ui.ComboAidInputerA.oncmd_query*/
    oncmd_query:function()
    {
        this.doQuery(false);
    },
    /*xjs.ui.ComboAidInputerA.doQuery*/
    doQuery:function(force)
    {
        var selectOpts = this.loadSelectOptions();
        if(!force && !this.isSelectOptsChanged(selectOpts))
            return;
        this.selectOptions = selectOpts;
        this.sortedSelOpts = null;
        this.valueList.setSelectOptions(this.selectOptions);
        this.ulastLevlCodes = null;
        this._searchableCols = null;
        this.refilter(true,0);
    },
    /*xjs.ui.ComboAidInputerA.setInputOvParent*/
    setInputOvParent:function(o)
    {
        this.inputOvParent = o;
    },
    /*xjs.ui.ComboAidInputerA.getAidInputerInfo*/
    getAidInputerInfo:function(t,p)
    {
        switch(t)
        {
        case 1:
            return true;
        case 2:
            return this.aopts;
        }
        return;
    },
    /*xjs.ui.ComboAidInputerA.getFilterText*/
    getFilterText:function()
    {
        var filter = this.fnGetFilter ? this.fnGetFilter.call(this) : (this.inputField ? this.inputField.value : null);
        if(filter == null || (filter = filter.trim()).length == 0)
            return null;
        return this.filterIgnoreCase ? filter.toLowerCase() : filter;
    },
    /*xjs.ui.ComboAidInputerA.refilter*/
    refilter:function(forece,toPage)
    {
        var filter = this.getFilterText();
        if(toPage === undefined)
            toPage = this.curFilter == filter && this.pgRowCount ? this.pgNavPane.currPage : 0;
        else if(this.curFilter != filter)
            toPage = 0;
        if(this.curFilter == filter && this.curPage == toPage && !forece)
            return;
        this.curFilter = filter;
        this.curPage = toPage;
        if(this.pgRowCount)
            this.pgNavPane.setCurrPage(this.curPage);
        this._addOptions();
    },
    /*xjs.ui.ComboAidInputerA.onBtnClick*/
    onBtnClick:function(ev)
    {
        if(Xjs.DOM.isShowing(this.inputField))
            this.inputField.focus();
        var e = ev.srcElement || ev.target;
        for(;e != null && e._command == null;e = e.parentNode)
            ;
        if(e._command != null)
        {
            var fn = "oncmd_" + e._command;
            if(this[fn])
            {
                try
                {
                    this[fn]();
                    return;
                }finally
                {
                }
            }
        }
    },
    /*xjs.ui.ComboAidInputerA.onDomAttached*/
    onDomAttached:function()
    {
        var btnCommands = ["select","all","clear","addnew","close","refresh"];
        if(this._onBtnClick == null)
        {
            this._onBtnClick = Function.bindAsEventListener(this.onBtnClick,this);
        }
        for(var i=0;i < btnCommands.length;i++)
        {
            var cmd = btnCommands[i],
                b = Xjs.DOM.findById("Btn_" + cmd,this.dom);
            if(b != null)
            {
                this[cmd + "$Btn"] = b;
                b.onclick = this._onBtnClick;
                b._command = cmd;
                if(cmd == "addnew" && this.addCodeUID == null)
                    b.style.display = "none";
            }
        }
    },
    /*xjs.ui.ComboAidInputerA.getMatchMode*/
    getMatchMode:function()
    {
        return this.matchMode === undefined ? 1 : this.matchMode;
    },
    /*xjs.ui.ComboAidInputerA._addOptions*/
    _addOptions:Xjs.emptyFn,
    /*xjs.ui.ComboAidInputerA.hasParentCode*/
    hasParentCode:function(code,values)
    {
        for(var j=values.length - 1;j >= 0;j--)
        {
            if(code.startsWith(values[j]))
                return true;
        }
        return false;
    },
    /*xjs.ui.ComboAidInputerA.getCodeByName*/
    getCodeByName:function(n)
    {
        var a = this.selectOptions || this.parent.getSelectOptions();
        if(!a)
            return null;
        for(var i=0;i < a.length;i++)
        {
            if(n == a[i][1])
                return a[i][0];
        }
        return null;
    },
    /*xjs.ui.ComboAidInputerA.filterValues*/
    filterValues:function(opts,allVals)
    {
        var casePage = this.pgRowCount && ((opts || 0) & 1) == 0,
            idxStart,
            idxEnd;
        if(casePage)
        {
            idxStart = this.pgNavPane.currPage * this.pgRowCount;
            idxEnd = idxStart + this.pgRowCount;
        } else 
        {
            idxStart = 0;
            idxEnd = 0x7fffffff;
        }
        delete this._firstFilterMachedVal;
        if(this.fnFilterVals)
        {
            return this.fnFilterVals.call(this,this.curFilter);
        }
        var optData = this.selectOptions,
            filterP = this.curFilter,
            pendingVals = (this.selOptions & 1) == 0 ? [] : null;
        this.getSearchableCols();
        var matchMode = this.getMatchMode(),
            values = [],
            matchedLvVals = (this.selOptions & 1) == 0 ? [] : null,
            nr = 0;
        if(optData != null)
            for(var i=0;i < optData.length;i++)
            {
                var a;
                if(!Xjs.isArray(optData[i]))
                    a = [optData[i]];
                else 
                    a = optData[i];
                var v = a[0],
                    lvV = a[this.lvColumn] || "";
                if(matchedLvVals)
                    for(;matchedLvVals.length > 0 && !lvV.startsWith(matchedLvVals[matchedLvVals.length - 1]);matchedLvVals.pop())
                        ;
                var matched;
                if((matched = (filterP == null || this.matched(matchMode,filterP,a)) && (!this.valueFilter || this.valueFilter.filterAccept(a))) || matchedLvVals && this.hasParentCode(lvV,matchedLvVals))
                {
                    if(pendingVals)
                    {
                        for(var j=0;j < pendingVals.length;j++)
                        {
                            var pa = pendingVals[j];
                            if(lvV.startsWith(pa[this.lvColumn]))
                            {
                                if(nr >= idxStart && nr < idxEnd)
                                    values.push(pa);
                                nr++;
                            }
                        }
                        pendingVals.clear();
                    }
                    if(nr >= idxStart && nr < idxEnd)
                        values.push(a);
                    if(!this._firstFilterMachedVal && this.isSelectable(a[0]))
                    {
                        this._firstFilterMachedVal = a[0];
                    }
                    if(matchedLvVals && matched)
                        matchedLvVals.push(lvV);
                    if(allVals)
                        allVals.add(a[0]);
                    nr++;
                } else if(pendingVals && !this.isLastLevlCode(v))
                {
                    for(;pendingVals.length > 0;pendingVals.pop())
                    {
                        if(lvV.startsWith(pendingVals[pendingVals.length - 1][this.lvColumn]))
                            break;
                    }
                    pendingVals.push(a);
                    continue;
                }
            }
        if(casePage)
        {
            this.pgNavPane.setPageInfo(nr,Math.ceil(nr / this.pgRowCount),this.pgNavPane.currPage,this.pgRowCount);
            this.pgNavPane.dom.style.display = this.pgNavPane.totalPages > 1 ? "" : "none";
        }
        return values;
    },
    /*xjs.ui.ComboAidInputerA.matched*/
    matched:function(matchMode,filterP,a)
    {
        if(this._searchableCols.length == 0)
        {
            var v = a[0],
                text = a.length < 2 ? v : (this.showCode && v != a[1] ? v + ":" + a[1] : a[1]);
            if(text == null)
                return false;
            var p = (this.filterIgnoreCase ? text.toString().toLowerCase() : text.toString()).indexOf(filterP);
            return matchMode == 1 ? p >= 0 : p == 0;
        }
        for(var i=0;i < this._searchableCols.length;i++)
        {
            var j = this._searchableCols[i];
            if(j >= a.length || a[j] == null)
                continue;
            var s = a[j].toString(),
                p = (this.filterIgnoreCase ? s.toLowerCase() : s).indexOf(filterP);
            if(matchMode == 1 ? p >= 0 : p == 0)
                return true;
        }
        return false;
    },
    /*xjs.ui.ComboAidInputerA.onListClick*/
    onListClick:function(e)
    {
        this.onSelectClickRow(Xjs.DOM.getParentForTag(e.srcElement || e.target,this.liRowTag || "LI"));
    },
    /*xjs.ui.ComboAidInputerA.onSelectClickRow*/
    onSelectClickRow:function(rowDom)
    {
        if(rowDom == null)
            return;
        if(this.isMultiSelectable() && this.valueList.indexOfItem(rowDom._value) >= 0)
            this.onDeselectValue(rowDom._value);
        else 
            this.onSelectValue(rowDom._value);
    },
    /*xjs.ui.ComboAidInputerA.onSelectValue*/
    onSelectValue:function(value)
    {
        if((this.selOptions & 1) == 0 && !this.isLastLevlCode(value) && !this.isMidLevlSelectable(value))
        {
            return;
        }
        var multiple = this.isMultiSelectable();
        setValue:{
            if(this.valueList.getItemCount() == 0 || !multiple)
            {
                this.valueList.setValue(value);
            } else 
            {
                if(this.valueList.indexOfItem(value) >= 0)
                    break setValue;
                this.valueList.addItem(value,true);
            }
        }
        if(!multiple)
            this.endAidInputer(true);
    },
    /*xjs.ui.ComboAidInputerA.endAidInputer*/
    endAidInputer:function(setParentValue)
    {
        try
        {
            this.parent.focus();
        }catch(ex)
        {
        }
        if(setParentValue)
        {
            this.setParentValue(this.valueList.getValue());
            this.fireEvent("setComoParentValue",this.valueList.getValue());
        }
        this.hideAndFocusParent();
    },
    /*xjs.ui.ComboAidInputerA.toCodeValue*/
    toCodeValue:function(value)
    {
        if(value == null)
        {
            return null;
        }
        if((this.selOptions & 4) != 0)
        {
            var t = typeof(value);
            if(t == "string")
            {
                var del = this.getMutiValueDelim();
                return value.split(del);
            }
        }
        return value;
    },
    /*xjs.ui.ComboAidInputerA.setParentValue*/
    setParentValue:function(value)
    {
        var text = null;
        if(value != null && value.toString().length > 0)
        {
            if((this.selOptions & 4) != 0)
            {
                var t = typeof(value),
                    del = this.getMutiValueDelim();
                if(t == "string")
                {
                    var a = value.split(","),
                        v = null;
                    for(var j=0;j < a.length;j++)
                    {
                        var s = this.getSelectValueText(a[j]);
                        text = text == null ? s : text + del + s;
                        v = v == null ? a[j] : v + del + a[j];
                    }
                    value = v;
                } else if(t == "number")
                {
                    for(var j=0;j < 32;j++)
                    {
                        var b = 1 << j;
                        if(value & b)
                        {
                            var s = this.getSelectValueText(b);
                            text = text == null ? s : text + del + s;
                        }
                    }
                }
            } else 
            {
                text = this.getSelectValueText(value);
            }
        } else if(this.emptyText != null || this.emptyValText != null)
        {
            text = this.emptyValText != null ? this.emptyValText : this.emptyText;
        }
        if((this.selOptions & 0x50) == 0x50)
        {
            this.parent.setValue(text,text,4);
        } else 
        {
            this.parent.setValue(value,text,4);
        }
        var rowVals;
        if(this.copyMap && (rowVals = this.getRowByValue(value)))
        {
            var columns = this.parent.selectOptions.getColumns();
            if(this.parent.table)
            {
                var ds = this.parent.table.getDataSet();
                if(columns)
                    for(var n in this.copyMap)
                    {
                        var cn = this.copyMap[n];
                        for(var j=0;j < columns.length;j++)
                        {
                            if(columns[j].name == cn)
                            {
                                var x = rowVals[j];
                                if(x !== undefined)
                                    ds.setValue(n,x);
                                break;
                            }
                        }
                    }
            } else if(this.parent.parent && this.parent.parent instanceof Xjs.ui.DialogPane)
            {
                var pane = this.parent.parent;
                for(var n in this.copyMap)
                {
                    var cn = this.copyMap[n];
                    for(var j=0;j < columns.length;j++)
                    {
                        if(columns[j].name == cn)
                        {
                            var x = rowVals[j];
                            if(x !== undefined)
                                pane.setItemValue(n,x);
                            break;
                        }
                    }
                }
            }
        }
    },
    /*xjs.ui.ComboAidInputerA.getMutiValueDelim*/
    getMutiValueDelim:function()
    {
        return this.parent.mutiValueDelim || ",";
    },
    /*xjs.ui.ComboAidInputerA.onDeselectValue*/
    onDeselectValue:function(v)
    {
        this.valueList.removeItem(v,true);
    },
    /*xjs.ui.ComboAidInputerA.onReturnBtnClick*/
    onReturnBtnClick:function()
    {
        this.endAidInputer(true);
    },
    /*xjs.ui.ComboAidInputerA.oncmd_select*/
    oncmd_select:function()
    {
        this.endAidInputer(true);
    },
    /*xjs.ui.ComboAidInputerA.oncmd_close*/
    oncmd_close:function()
    {
        this.endAidInputer(false);
    },
    /*xjs.ui.ComboAidInputerA.oncmd_clear*/
    oncmd_clear:function()
    {
        this.valueList.setValue(null);
    },
    /*xjs.ui.ComboAidInputerA.oncmd_addnew*/
    oncmd_addnew:function()
    {
        if(this.addnewDialog == null)
        {
            if(this.addCodeUID == null)
                return;
            var p = this.addCodeUID.indexOf("({"),
                uiid,
                config;
            if(p > 0)
            {
                uiid = this.addCodeUID.substring(0,p).trim();
                config = eval(this.addCodeUID.substring(p));
            } else 
            {
                uiid = this.addCodeUID;
                config = null;
            }
            this.addnewDialog = Xjs.ui.UIUtil.loadDialog(uiid,2,null,null,config);
            this.addnewDialog.addListener("onOk",this.onAddNewCodeOK,this);
            this.addnewDialog.addListener("onClosed",this.onAddNewCodeClosed,this);
            var tbls = this.addnewDialog.getMainComponents(Xjs.table.Table);
            this.addnewDlgMTable = tbls != null && tbls.length > 0 ? tbls[0] : null;
        }
        if(this.addnewDlgMTable == null)
            return;
        this.addnewDlgMTable.refreshTable();
        this.backHideIfOutclick = this.hideIfOutclick;
        this.hideIfOutclick = false;
        this.addnewDialog.showModal();
        this.addnewDlgMTable.focusLatter();
    },
    /*xjs.ui.ComboAidInputerA.onAddNewCodeOK*/
    onAddNewCodeOK:function()
    {
        this.addnewDlgMTable.saveChanges();
        this.oncmd_refresh();
    },
    /*xjs.ui.ComboAidInputerA.onAddNewCodeClosed*/
    onAddNewCodeClosed:function()
    {
        if(this.backHideIfOutclick !== undefined)
        {
            this.hideIfOutclick = this.backHideIfOutclick;
        }
    },
    /*xjs.ui.ComboAidInputerA.oncmd_refresh*/
    oncmd_refresh:function()
    {
        if(this.parent == null)
            return;
        var codeData = this.parent.selectOptions;
        codeData.clearBuffered();
        codeData.disableBrowserCache = true;
        this.oncmd_query();
    },
    /*xjs.ui.ComboAidInputerA.initPgNavPane*/
    initPgNavPane:function()
    {
        if(this.pgNavPane === undefined)
        {
            this.pgNavPane = null;
            var pdnavDOM = Xjs.DOM.findById("PageNav",this.dom);
            if(!pdnavDOM)
                return;
            var codeData = this.parent.selectOptions;
            if(codeData && codeData.pgRowCount || this.forcePgNavPane)
            {
                this.pgNavPane = new Xjs.ui.PageNavPane({dom:pdnavDOM});
                this.pgNavPane.onAttachDOM();
                this.pgNavPane.addListener(this);
            }
        }
    },
    /*xjs.ui.ComboAidInputerA.beforeExpandShow*/
    beforeExpandShow:function(newDom)
    {
        var selectOpts = this.loadSelectOptions(),
            refilter = false;
        if(newDom || this.refilterOpts & 1 || this.isSelectOptsChanged(selectOpts))
        {
            this.selectOptions = selectOpts;
            this.sortedSelOpts = null;
            this.valueList.setSelectOptions(this.selectOptions);
            this.ulastLevlCodes = null;
            this._searchableCols = null;
            refilter = true;
        }
        this.valueList.setShowCode(this.showCode);
        if(this.inputField && this.clearInitFilter)
            this.inputField.value = "";
        this.valueList.setValue(this.initValue == "" ? null : this.initValue);
        this.refilter(refilter,0);
    },
    /*xjs.ui.ComboAidInputerA.performCommand*/
    performCommand:function(source,command)
    {
        if(command.startsWith("gotoPage:"))
        {
            this.refilter(false,parseInt(command.substring(9)));
        }
    },
    /*xjs.ui.ComboAidInputerA.forEnterKey*/
    forEnterKey:Xjs.emptyFn,
    /*xjs.ui.ComboAidInputerA.doParentCompSearchBoxKeyUp*/
    doParentCompSearchBoxKeyUp:function(e)
    {
        var k = e.keyCode;
        if(k == 13 || k == 40 || k == 38 || k == 27)
        {
            if(k == 13)
            {
                this.forEnterKey(e);
            }
            Xjs.Event.cancelEvent(e,true);
            return true;
        }
        return false;
    }
});
/*xjs/ui/Window.java*/
Xjs.ui.Window=function(config){
    Xjs.ui.Window.superclass.constructor.call(this,config);
    var opts;
    if(window.xjsConfig && (opts = window.xjsConfig.windowOpts))
    {
        Xjs.applyIf(this,opts);
    }
    if(!this.buttons)
        this.buttons = Xjs.ui.Panel.newDefaultButtons();
};
Xjs.extend(Xjs.ui.Window,Xjs.ui.DialogPane,{
  _js$className_:"Xjs.ui.Window",
    /*xjs.ui.Window.__init*/
    __init:function()
    {
        Xjs.ui.Window.superclass.__init.call(this);
        this.okKeyMode = 1;
        this.disableCollapse = true;
        this.toolbarClassName = "ui-wtitlebar";
        this.closeable = true;
        this.moveable = true;
        if(!this.frameClassName)
            this.frameClassName = "ui-window ui-wborder";
    },
    /*xjs.ui.Window._createDOM*/
    _createDOM:function(root)
    {
        delete this.alignOpts;
        return Xjs.ui.Window.superclass._createDOM.call(this,root);
    },
    /*xjs.ui.Window.onDomCreated*/
    onDomCreated:function(root)
    {
        Xjs.ui.Window.superclass.onDomCreated.call(this,root);
    },
    /*xjs.ui.Window.loadContentUI*/
    loadContentUI:function(uiid,wboxHtml)
    {
        var comp = Xjs.JsLoad.loadUI(uiid,null).getUI(0,13,null,null);
        Xjs.ui.AttachUtils.attachToHTML("@" + Xjs.ui.UIUtil.getAttachHtmlURL(uiid),comp,0);
        comp.setRootComponent(comp);
        this.htmlRes = wboxHtml ? wboxHtml : "@" + Xjs.getThemePath() + "/xjsres/WindowBox0.html";
        this.items = [comp];
        this.itemsLayout = new Xjs.ui.DefaultLayout();
        return comp;
    }
});
/*xjs/table/DefaultTableListener.java*/
Xjs.namespace("Xjs.table");
Xjs.table.DefaultTableListener=function(){};
Xjs.apply(Xjs.table.DefaultTableListener.prototype,{
    /*xjs.table.DefaultTableListener.initComponent*/
    initComponent:function(table,values)
    {
        if(this.initValues == null)
        {
            this.initValues = values;
        }
    },
    /*xjs.table.DefaultTableListener.getTable*/
    getTable:function(c,name)
    {
        return c.getRootComponent().getMainComponentByName(name);
    },
    /*xjs.table.DefaultTableListener.afterInitComponent*/
    afterInitComponent:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onLazyLoaded*/
    onLazyLoaded:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.addTableNotify*/
    addTableNotify:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.beforeConfigColumns*/
    beforeConfigColumns:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onTablePrinting*/
    onTablePrinting:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.beforeTablePrint*/
    beforeTablePrint:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.checkTablePrintProgress*/
    checkTablePrintProgress:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.afterTablePrint*/
    afterTablePrint:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onTableCellClick*/
    onTableCellClick:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onTableRowRender*/
    onTableRowRender:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onTableDblClick*/
    onTableDblClick:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.tableFocusGained*/
    tableFocusGained:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.performCommand*/
    performCommand:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.itemAidInputing*/
    itemAidInputing:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.addNotify*/
    addNotify:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.prepareInitParameter*/
    prepareInitParameter:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onRendering*/
    onRendering:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onRender*/
    onRender:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onChartCreating*/
    onChartCreating:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onBuildChartLabels*/
    onBuildChartLabels:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onChartCreated*/
    onChartCreated:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onChartDblClick*/
    onChartDblClick:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onTableCellMoved*/
    onTableCellMoved:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onTableRowMoved*/
    onTableRowMoved:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onTableCellRender*/
    onTableCellRender:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.tableCellNavigated*/
    tableCellNavigated:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.tableRefreshing*/
    tableRefreshing:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.tableRefreshed*/
    tableRefreshed:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onAttachmentUploaded*/
    onAttachmentUploaded:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.wfActionSubmitted*/
    wfActionSubmitted:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.isRowPopupEditable*/
    isRowPopupEditable:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onPopupEditDialogShowing*/
    onPopupEditDialogShowing:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.beforePopupEditClosing*/
    beforePopupEditClosing:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onPopupEditClosing*/
    onPopupEditClosing:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onPopupEditClosed*/
    onPopupEditClosed:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.isRowSelectable*/
    isRowSelectable:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onShowing*/
    onShowing:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onPopupEditOk*/
    onPopupEditOk:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.getDeleteRowPrompt*/
    getDeleteRowPrompt:Xjs.nullFn,
    /*xjs.table.DefaultTableListener.checkNonBlankOnSubmit*/
    checkNonBlankOnSubmit:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.prepareLoadPrtfmtNames*/
    prepareLoadPrtfmtNames:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.filterPrintFormatSelect*/
    filterPrintFormatSelect:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.getCloseRequest*/
    getCloseRequest:Xjs.nullFn,
    /*xjs.table.DefaultTableListener.beforeCreateRGridColumn*/
    beforeCreateRGridColumn:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.getGridPreExRowCount*/
    getGridPreExRowCount:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.renderGridExRow*/
    renderGridExRow:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onCreateRGridRecord*/
    onCreateRGridRecord:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onRGridRecordRendering*/
    onRGridRecordRendering:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onRGridRecordRender*/
    onRGridRecordRender:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.getGTableRowGroup*/
    getGTableRowGroup:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.initGTableRowGroup*/
    initGTableRowGroup:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.getXlsCellRenderInfo*/
    getXlsCellRenderInfo:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.postPendingXlsCellValue*/
    postPendingXlsCellValue:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onXlsCellValuePosted*/
    onXlsCellValuePosted:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onXlsTablePreview*/
    onXlsTablePreview:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onTableGotoPage*/
    onTableGotoPage:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onTableUpdatePageRows*/
    onTableUpdatePageRows:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.getTableSaveRequest*/
    getTableSaveRequest:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.getConfirmCloseRequest*/
    getConfirmCloseRequest:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onTableRendered*/
    onTableRendered:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onTableRefreshFail*/
    onTableRefreshFail:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onTableCheckShowing*/
    onTableCheckShowing:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.isTableDataChanged*/
    isTableDataChanged:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onTableDataExporting*/
    onTableDataExporting:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onPageNavPaneAttached*/
    onPageNavPaneAttached:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onTableError*/
    onTableError:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onChartDomCreated*/
    onChartDomCreated:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onTableUpdateSaveable*/
    onTableUpdateSaveable:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.onChkingRowNonBlank*/
    onChkingRowNonBlank:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.getRGridRecordParentDOM*/
    getRGridRecordParentDOM:Xjs.emptyFn,
    /*xjs.table.DefaultTableListener.round*/
    round:function(v,deci)
    {
        return this.exeRound(this.exeRound(v,deci + 8),deci);
    },
    /*xjs.table.DefaultTableListener.exeRound*/
    exeRound:function(v,deci)
    {
        var n = Math.pow(10,deci);
        return Math.round(v * n) / n;
    },
    /*xjs.table.DefaultTableListener.round2*/
    round2:function(v)
    {
        return this.round(v,2);
    }
});
/*xjs/ui/AidInputerWindow.java*/
Xjs.ui.AidInputerWindow=function(config){
    Xjs.ui.AidInputerWindow.superclass.constructor.call(this,config);
    if(window.xjsConfig && window.xjsConfig.aidInputWinOpts)
    {
        Xjs.applyIf(this,window.xjsConfig.aidInputWinOpts);
    }
};
Xjs.extend(Xjs.ui.AidInputerWindow,Xjs.ui.Window,{
  _js$className_:"Xjs.ui.AidInputerWindow",
    nonBlankResID:"Aid.NulValueSelected",
    /*xjs.ui.AidInputerWindow.isMultiSelectable*/
    isMultiSelectable:function()
    {
        return (this.selOptions & 4) != 0;
    },
    /*xjs.ui.AidInputerWindow.__init*/
    __init:function()
    {
        Xjs.ui.AidInputerWindow.superclass.__init.call(this);
        if(Xjs.isMobile)
        {
            this.hideTitle = true;
        }
    },
    /*xjs.ui.AidInputerWindow.setValue*/
    setValue:Xjs.emptyFn,
    /*xjs.ui.AidInputerWindow.getValue*/
    getValue:Xjs.nullFn,
    /*xjs.ui.AidInputerWindow.initAidInputer*/
    initAidInputer:Xjs.emptyFn,
    /*xjs.ui.AidInputerWindow.doAidInput*/
    doAidInput:function(parent,value,ev)
    {
        if(value == "")
            value = null;
        this.forInput = parent;
        if(this._hasTitle === undefined)
        {
            this._hasTitle = this.title != null && this.title != "";
        }
        if(!this._hasTitle && parent)
        {
            var title = parent.title;
            if(!title && parent.labelComp)
                title = parent.labelComp.getText();
            this.setTitle(title || "");
        }
        this.initAidInputer(value,ev);
        this.showPane(!this.dropdownMode,parent);
        if(value == null || this.isValueSelectable(value))
            this.setValue(this.toCodeValue(value));
        this.clearExtValues();
        return;
    },
    /*xjs.ui.AidInputerWindow.toCodeValue*/
    toCodeValue:function(value)
    {
        if(this.isMultiSelectable())
        {
            var t = typeof(value);
            if(t == "string")
            {
                var del = String.obj2str(this.forInput.mutiValueDelim,",");
                return value.split(del);
            }
        }
        return value;
    },
    /*xjs.ui.AidInputerWindow.isValueSelectable*/
    isValueSelectable:Xjs.trueFn,
    /*xjs.ui.AidInputerWindow.hideAidInputer*/
    hideAidInputer:function(component)
    {
        this.closeModal(null);
    },
    /*xjs.ui.AidInputerWindow.getAidInputerInfo*/
    getAidInputerInfo:Xjs.emptyFn,
    /*xjs.ui.AidInputerWindow.getDisplayValue*/
    getDisplayValue:Xjs.emptyFn,
    /*xjs.ui.AidInputerWindow.isShowFullName*/
    isShowFullName:function()
    {
        return this.forInput != null && (this.forInput).showFullName;
    },
    /*xjs.ui.AidInputerWindow.setParentInputValue*/
    setParentInputValue:function(v,s)
    {
        if(this.forInput.toUpper && typeof(v) == "string")
        {
            v = v.toUpperCase();
        }
        if(s == null)
            this.forInput.setValue(v,undefined,4);
        else 
            this.forInput.setValue(v,s,4);
    },
    /*xjs.ui.AidInputerWindow.updateParentValue*/
    updateParentValue:function()
    {
        if(this.fireEventV(0,"onAidInputerUpdateParentValue") === true)
            return;
        if(this.forInput && !this.forInput.isReadonly())
        {
            var v = this.getValue(),
                fv = this.fireEventV(0,"onGetAidInputerValue",v);
            if(fv !== undefined)
            {
                v = fv;
            }
            if(this.nonBlank && v == null)
            {
                throw new Error(Xjs.ResBundle.getString("UI",this.nonBlankResID));
            }
            var s = this.getDisplayValue();
            this.setParentInputValue(v,s);
            if(this.copyMap)
            {
                for(var n in this.copyMap)
                {
                    var cn = this.copyMap[n],
                        x = this.getExtValue(cn);
                    if(this.forInput.table)
                    {
                        var ds = this.forInput.table.getDataSet();
                        if(x !== undefined)
                            ds.setValue(n,x);
                    } else 
                    {
                        var c = this.forInput.getMainParentComponent();
                        c.setItemValue(n,x);
                    }
                }
            }
            if(this.histSelectGrp != null)
                this.addHistValue(v);
        }
    },
    /*xjs.ui.AidInputerWindow.getExtValue*/
    getExtValue:function(name)
    {
        return this.extValues == null ? undefined : this.extValues[name];
    },
    /*xjs.ui.AidInputerWindow.setExtValue*/
    setExtValue:function(name,v)
    {
        if(this.extValues == null)
            this.extValues = {};
        this.extValues[name] = v;
    },
    /*xjs.ui.AidInputerWindow.clearExtValues*/
    clearExtValues:function()
    {
        this.extValues = null;
    },
    /*xjs.ui.AidInputerWindow.onClosed*/
    onClosed:function()
    {
        if(this.forInput != null && this.forInput . focus)
        {
            try
            {
                this.forInput.focus();
            }catch(ex)
            {
            }
            this.forInput.focusLatter();
        }
    },
    /*xjs.ui.AidInputerWindow.onOk*/
    onOk:function(dialog,source,command)
    {
        if(this.forInput && command == "ok")
        {
            this.updateParentValue();
        }
    },
    /*xjs.ui.AidInputerWindow.okExit*/
    okExit:function()
    {
        if(this.forInput)
        {
            this.updateParentValue();
        }
        this.fireEvent("onOkExit");
        this.closeModal();
    },
    /*xjs.ui.AidInputerWindow.addHistValue*/
    addHistValue:Xjs.falseFn,
    /*xjs.ui.AidInputerWindow.addFilter*/
    addFilter:function(f)
    {
        if(!this.filters)
            this.filters = [f];
        else if(this.filters.indexOf(f) < 0)
            this.filters.push(f);
    },
    /*xjs.ui.AidInputerWindow.removeFilter*/
    removeFilter:function(f)
    {
        if(this.filters)
        {
            this.filters.remove(f,true);
        }
    }
});
/*xjs/ui/Button.java*/
Xjs.ui.Button=function(config){
    Xjs.ui.Button.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.Button,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.Button",
    className:"btn",
    /*xjs.ui.Button.setClassName*/
    setClassName:function(className)
    {
        this.className = className;
        if(this.btnDom != null)
            this.btnDom.className = className;
        this.updateDisabledClass();
    },
    /*xjs.ui.Button._createDOM*/
    _createDOM:function(root)
    {
        var d = this.btnDom = Xjs.ui.Button.superclass._createDom0.call(this,root,"button");
        this.textDOM = Xjs.DOM.findById("btn_text",d);
        if(!this.textDOM)
        {
            this.textDOM = Xjs.DOM.createChild(d,"span");
            this.textDOM.className = "text";
        }
        if(this.text)
        {
            Xjs.DOM.setTextContent(this.textDOM,this.text);
        }
        if(!this.command && this.name)
            this.command = this.name;
        if(this.command)
            d.command = this.command;
        d.onclick = Function.bindAsEventListener(this._onClick,this,0,true);
        return d;
    },
    /*xjs.ui.Button.onDomCreated*/
    onDomCreated:function(root)
    {
        Xjs.ui.Button.superclass.onDomCreated.call(this,root);
        this.updateDisabledClass();
    },
    /*xjs.ui.Button.setText*/
    setText:function(text)
    {
        this.text = text;
        if(this.textDOM)
        {
            Xjs.DOM.setTextContent(this.textDOM,text);
        }
    },
    /*xjs.ui.Button.getText*/
    getText:function()
    {
        return this.text;
    },
    /*xjs.ui.Button._onClick*/
    _onClick:function(e)
    {
        this.fireEvent("focusGained");
        this.fireEvent("performCommand",this.command);
        if(this.handler)
            this.handler.call(this.scope || this,this,this.command,e);
    },
    /*xjs.ui.Button._addDialogItemsTo*/
    _addDialogItemsTo:function(toComp)
    {
        Xjs.ui.Button.superclass._addDialogItemsTo.call(this,toComp);
        this.addListener(toComp);
    },
    /*xjs.ui.Button.setEnabled*/
    setEnabled:function(enable)
    {
        Xjs.ui.Button.superclass.setEnabled.call(this,enable);
        this.updateDisabledClass();
    },
    /*xjs.ui.Button.updateDisabledClass*/
    updateDisabledClass:function()
    {
        if(this.dom)
            Xjs.DOM.addOrRemoveClass(this.dom,"ui-disabled",this.dom.disabled);
    }
});
Xjs.apply(Xjs.ui.Button,{
    /*xjs.ui.Button.getByCommand*/
    getByCommand:function(btns,command)
    {
        if(btns != null)
            for(var i=0;i < btns.length;i++)
            {
                if(btns[i].command == command)
                    return btns[i];
            }
        return null;
    }
});
{
    Xjs.UITYPES.button = Xjs.ui.Button;
}/*xjs/ui/ComboAidInputer.java*/
Xjs.ui.ComboAidInputer=function(config){
    Xjs.ui.ComboAidInputer.superclass.constructor.call(this,config);
    this.entryKeyLock = 0;
};
Xjs.extend(Xjs.ui.ComboAidInputer,Xjs.ui.ComboAidInputerA,{
  _js$className_:"Xjs.ui.ComboAidInputer",
    fitListHeight:true,
    /*xjs.ui.ComboAidInputer.__init*/
    __init:function()
    {
        Xjs.ui.ComboAidInputer.superclass.__init.call(this);
        if(this.htmlRes == null)
        {
            this.htmlRes = "@" + Xjs.getDefResPath() + "/combo1.html";
        }
    },
    /*xjs.ui.ComboAidInputer.adjSearchboxOvPos*/
    adjSearchboxOvPos:function()
    {
        this._adjSearchboxOvPos(this.searchBoxDOM,this.inputField);
    },
    /*xjs.ui.ComboAidInputer.adjSearchboxOvPosL*/
    adjSearchboxOvPosL:function()
    {
        if(this.inputOvParent)
        {
            this.adjSearchboxOvPos();
            if(!this.fn$adjSearchboxOvPos)
                this.fn$adjSearchboxOvPos = this.adjSearchboxOvPos.createDelegate(this);
            setTimeout(this.fn$adjSearchboxOvPos,50);
        }
    },
    /*xjs.ui.ComboAidInputer.updateListScrollVal*/
    updateListScrollVal:function()
    {
        if(this.listScrollbar)
        {
            var s = this.listScrollbar;
            setTimeout(function(){
            s.updateValue();
            s.resetBarPos();
        },1);
        }
    },
    /*xjs.ui.ComboAidInputer.afterExpandShow*/
    afterExpandShow:function(newDom)
    {
        if(this.fitListHeight)
        {
            this._fitListHeight();
            this.reAlignShow();
        }
        this.updateListScrollVal();
        var ib = this.searchBoxDOM || this.inputField;
        if(ib && !(this.selOptions & 0x10000))
        {
            if(this.aopts & 4)
            {
                ib.style.visibility = "hidden";
                return;
            } else 
                ib.style.visibility = "";
        }
        if(Xjs.DOM.isShowing(this.inputField))
        {
            this.inputField.focus();
            this.setCurKeyFocused(0,1,null);
            if(this.enterChar || this.enterText)
            {
                this.inputField.value = this.enterText || String.fromCharCode(this.enterChar);
                var l = this.inputField.value.length;
                Xjs.DOM.setInputSelectionRange(this.inputField,l,l);
                this.refilter(false,0);
            }
            if(this.inputOvParent)
            {
                this.adjSearchboxOvPosL();
            }
        } else if(!this.disListFocus)
        {
            this.listDOM.focus();
            this.setCurKeyFocused(0,1,null);
        }
        this.fireEvent("onComboAidInputerExpandShow",newDom);
    },
    /*xjs.ui.ComboAidInputer._fitListHeight*/
    _fitListHeight:function()
    {
        if(!this.listHeight)
        {
            var usableHeight = 0,
                totalHeight = Xjs.DOM.getViewportScrollHeight();
            if(this.parent)
            {
                var point = Xjs.DOM.getXY(this.parent.getDOM());
                usableHeight = point.y > totalHeight / 2 ? point.y : totalHeight - point.y - this.parent.getHeight();
            }
            var _listDOM = this.listBox || this.listDOMX;
            _listDOM.style.height = "";
            var oldListHeight = Xjs.DOM.getHeight(_listDOM),
                height = usableHeight;
            if(usableHeight > 0)
            {
                if(this.searchBoxDOM && !this.inputOvParent)
                    height -= Xjs.DOM.getHeight(this.searchBoxDOM);
                if(this.infoDOM)
                    height -= Xjs.DOM.getHeight(this.infoDOM) + Xjs.DOM.getMargins(this.infoDOM,"tb");
                if(this.btnGroupDOM)
                    height -= Xjs.DOM.getHeight(this.btnGroupDOM) + Xjs.DOM.getMargins(this.btnGroupDOM,"tb");
                if(this.infoDOM2)
                    height -= Xjs.DOM.getHeight(this.infoDOM2) + Xjs.DOM.getMargins(this.infoDOM2,"tb");
            }
            if(height > 0 && height < oldListHeight)
                _listDOM.style.height = height + "px";
        }
    },
    /*xjs.ui.ComboAidInputer.getPrefSize*/
    getPrefSize:function(clientR)
    {
        var alignDOM = clientR.dom;
        if(this.minWidth != null)
        {
            if(this.minWidth === true)
                this.dom.style.minWidth = Xjs.DOM.getWidth(alignDOM) + 2 + "px";
            else if(typeof(this.minWidth) == "number")
                this.dom.style.minWidth = this.minWidth + "px";
        }
        if(this.width > 0)
            return {width:this.width,height:0};
        var fitWidth = this.fitWidth;
        if(fitWidth === undefined && (this.selOptions & 0x10000) != 0)
        {
            if(this.minWidth === true)
            {
                return null;
            }
            fitWidth = 2;
        }
        if(fitWidth != null)
        {
            return {width:Xjs.DOM.getWidth(alignDOM) + fitWidth,height:0};
        }
        return null;
    },
    /*xjs.ui.ComboAidInputer.valueChanged*/
    valueChanged:function(c,e,bySetValue)
    {
        if(c == this.valueList)
        {
            this.updateRowDOMClass();
            if((this.selOptions & 4) == 0 && !bySetValue)
                this.endAidInputer(true);
        }
    },
    /*xjs.ui.ComboAidInputer.onDomAttached*/
    onDomAttached:function()
    {
        Xjs.DOM.addOrRemoveClass(this.dom,"ui-muti-select",this.selOptions & 4);
        this.searchBoxDOM = Xjs.DOM.findById("SearchBOX",this.dom);
        if(this.selOptions2 & (8 | 0x10) && this.searchBoxDOM)
        {
            this.setInputOvParent(2);
            this.dom.style.overflow = "visible";
            this.searchBoxDOM.style.position = "absolute";
            Xjs.DOM.addClass(this.dom,"x-combolist-searchboxa");
        }
        this.setInputField(Xjs.DOM.findById("SearchInput",this.dom));
        if(this.inputBgLabel && this.inputField)
        {
            this.inputField.placeholder = this.inputBgLabel;
        }
        this.listBox = Xjs.DOM.findById("LISTBOX",this.dom);
        this.listDOM = Xjs.DOM.findById("LIST",this.dom);
        var tblMode = this.listDOM.tagName == "TBODY";
        this.listDOMX = this.listDOM.tagName == "TBODY" ? this.listDOM.parentNode : this.listDOM;
        if(this.listHeight)
            (this.listBox || this.listDOMX).style.height = this.listHeight + "px";
        if(this.disListFocus)
            this.listDOM.tabIndex = "";
        this.listDOM.onkeydown = Function.bindAsEventListener(this.onListKeydown,this);
        this.listDOM.onkeyup = Function.bindAsEventListener(this.onListKeyup,this);
        this.listDOM.onclick = Function.bindAsEventListener(this.onListClick,this);
        this.listScrollbar = new Xjs.ui.util.CustomScrollbar("Combo.SBar",tblMode ? this.listBox : this.listDOM,1 | 4 | 8,null,null,null);
        var valuesDOM;
        this.valueList.ulDOM = valuesDOM = Xjs.DOM.find("#SeledtedVals ul",this.dom);
        this.infoDOM = Xjs.DOM.findById("InfoPropmpt",this.dom);
        this.infoDOM2 = Xjs.DOM.findById("MultiSelPrompt",this.dom);
        this.returnIcon = Xjs.DOM.findById("IconUP",this.dom);
        if(this.returnIcon)
        {
            this.returnIcon.onclick = Function.bindAsEventListener(this.onReturnBtnClick,this);
        }
        if(valuesDOM && valuesDOM.childNodes.length > 0)
        {
            var li = Xjs.DOM.find("li",valuesDOM);
            if(li != null)
            {
                this.valueList.liHTML = li.innerHTML;
                valuesDOM.removeChild(li);
            }
        }
        Xjs.DOM.removeAllChild(valuesDOM);
        this.searchDelDOM = Xjs.DOM.findById("SearchDelete",this.dom);
        if(this.searchDelDOM)
        {
            this.searchDelDOM.onclick = Function.bindAsEventListener(this.onSearchDelBtnClick,this);
        }
        this.btnGroupDOM = Xjs.DOM.findById("BtnGroup",this.dom);
        var hiddenSearchBox = false;
        if(this.selOptions & 0x10000)
        {
            if(this.searchBoxDOM)
            {
                this.searchBoxDOM.style.width = "120px";
                this.searchBoxDOM.style.display = "none";
                hiddenSearchBox = true;
            }
            if(this.infoDOM)
                this.infoDOM.style.display = "none";
            if(this.infoDOM2)
            {
                this.infoDOM2.style.display = "none";
            }
        }
        if(this.selOptions & 0x80000000 || this.selOptions2 & 0x40)
        {
            if(this.infoDOM)
            {
                this.infoDOM.style.display = "none";
            }
            if(this.infoDOM2)
            {
                this.infoDOM2.style.display = "none";
            }
        }
        if(!(this.selOptions & 4))
        {
            if(this.searchBoxDOM)
                this.searchBoxDOM.style.width = "100%";
            if(this.btnGroupDOM)
            {
                this.btnGroupDOM.style.display = "none";
                if(hiddenSearchBox && this.searchBoxDOM)
                    this.searchBoxDOM.style.display = "none";
            }
        }
        if(this.selOptions & 0x20000000)
        {
            if(valuesDOM != null)
                valuesDOM.style.display = "none";
            if(this.returnIcon != null)
                this.returnIcon.style.display = "none";
        }
        Xjs.ui.ComboAidInputer.superclass.onDomAttached.call(this);
    },
    /*xjs.ui.ComboAidInputer.setInputField*/
    setInputField:function(i)
    {
        this.inputField = i;
        if(i)
        {
            i["oninput" in this.inputField ? "oninput" : "onpropertychange"] = Xjs.ui.InputField.asOnInputListener(i,this.onInputFieldChanged,this);
            i.onkeydown = Function.bindAsEventListener(this.onInputFieldKeydown,this);
            i.onkeyup = Function.bindAsEventListener(this.onInputFieldKeyup,this);
        }
    },
    /*xjs.ui.ComboAidInputer.getLIClass*/
    getLIClass:function(value)
    {
        var cls = null;
        if(this.valueList.indexOfItem(value) >= 0)
            cls = "selected";
        if((this.selOptions & 1) == 0)
        {
            if(!this.isLastLevlCode(value))
            {
                cls = cls == null ? "ulastlevel" : cls + " ulastlevel";
                if(!this.isMidLevlSelectable(value))
                    cls += " unselectable";
            } else 
            {
                cls = cls == null ? "lastlevel" : cls + " lastlevel";
            }
            var lv = this.getCodeLevel(value);
            cls = cls == null ? "level" + lv : cls + " level" + lv;
        }
        return cls;
    },
    /*xjs.ui.ComboAidInputer.createRowDOM*/
    createRowDOM:function(value,text,boldText,levl)
    {
        var li = document.createElement("li"),
            cls;
        if(cls = this.getLIClass(value))
            li.className = cls;
        if(levl > 0)
            li.style.paddingLeft = levl * 12 + "px";
        if(this.liStylesByVal)
            Xjs.apply(li.style,this.liStylesByVal[value]);
        var d = Xjs.DOM.createChild(li,"div","label");
        this.appendRowText(d,text,boldText,true);
        li._value = value;
        return li;
    },
    /*xjs.ui.ComboAidInputer.appendRowText*/
    appendRowText:function(d,text,boldText,addIcon)
    {
        if(addIcon)
        {
            Xjs.DOM.createChild(d,"span","icon1");
        }
        var p = boldText != null && boldText.length > 0 ? text.toLowerCase().indexOf(boldText) : -1;
        if(p > 0)
        {
            var e = Xjs.DOM.createChild(d,"span");
            Xjs.DOM.setTextContent(e,text.substring(0,p));
            text = text.substring(p);
            p = 0;
        }
        if(p == 0)
        {
            var e1 = Xjs.DOM.createChild(d,"span","bold");
            Xjs.DOM.setTextContent(e1,text.substring(0,boldText.length));
            text = text.substring(boldText.length);
        }
        var e2 = Xjs.DOM.createChild(d,"span");
        Xjs.DOM.setTextContent(e2,text);
        if(addIcon)
            Xjs.DOM.createChild(d,"i","icon2");
    },
    /*xjs.ui.ComboAidInputer.formatCellText*/
    formatCellText:function(fmt,values,columns)
    {
        if(!columns)
            return null;
        return fmt.replace(/\$\{\w+(\?\w+\:\w+)?\}/g,function($0){
            var id = $0.substring(2,$0.length - 1),
                j;
            for(j = 0;j < columns.length;j++)
            {
                if(id == columns[j].name)
                    break;
            }
            var v = values[j];
            return v == null ? "" : (v instanceof Date ? v.format(0) : v.toString());
        });
    },
    /*xjs.ui.ComboAidInputer.createTRowDOM*/
    createTRowDOM:function(value,values,boldText,levl)
    {
        var row = document.createElement("TR"),
            cls;
        if(cls = this.getLIClass(value))
            row.className = cls;
        var codeData = this.parent.selectOptions,
            columns = codeData.getColumns();
        if(this.cellTextFmt)
        {
            for(var i=0;i < this.cellTextFmt.length;i++)
            {
                var fmt = this.cellTextFmt[i],
                    s = columns ? this.formatCellText(fmt,values,columns) : (values[i] == null ? "" : values[i].toString()),
                    td = Xjs.DOM.createChild(row,"td",null);
                td.noWrap = true;
                this.appendRowText(td,s,boldText,i == 0);
            }
        } else 
        {
            var i = 0;
            for(var j=0;j < columns.length;j++)
            {
                if(columns[j].displayFlags & 0x10)
                    continue;
                var v = values[j],
                    s = v == null ? "" : (v instanceof Date ? v.format(0) : v.toString()),
                    td = Xjs.DOM.createChild(row,"td",null);
                this.appendRowText(td,s,boldText,i++ == 0);
            }
        }
        row._value = value;
        return row;
    },
    /*xjs.ui.ComboAidInputer.updateRowDOMClass*/
    updateRowDOMClass:function()
    {
        var a = this.getLIDoms();
        for(var i=0;i < a.length;i++)
        {
            if(a[i]._value == null)
                continue;
            if(this.valueList.indexOfItem(a[i]._value) >= 0)
                Xjs.DOM.addClass(a[i],"selected");
            else 
                Xjs.DOM.removeClass(a[i],"selected");
        }
    },
    /*xjs.ui.ComboAidInputer._addOptions*/
    _addOptions:function()
    {
        if(!this.listDOM)
            return;
        Xjs.DOM.removeAllChild(this.listDOM);
        this.inSelectingValues.clear();
        delete this._bakLiDims;
        this.keyFocusedRow = null;
        var optData = this.filterValues(0,null),
            levels = this.findLevels(optData),
            tbody = this.listDOM.tagName == "TBODY" ? this.listDOM : null;
        if(tbody)
            this.liRowTag = "TR";
        var focusR = -1,
            firstSeledRow = -1;
        if(optData != null)
            for(var i=0;i < optData.length;i++)
            {
                var a = optData[i],
                    value = a[this.codeColumn];
                if(tbody)
                {
                    tbody.appendChild(this.createTRowDOM(value,a,this.curFilter,levels == null ? 0 : levels[i]));
                } else 
                {
                    var text;
                    if(this.cellTextFmt && this.cellTextFmt.length > 0)
                    {
                        var codeData = this.parent.selectOptions;
                        text = this.formatCellText(this.cellTextFmt[0],a,codeData.getColumns());
                    } else 
                    {
                        var nm = a[this.textColumn];
                        if(nm == null)
                            nm = value.toString();
                        text = a.length < 2 || (this.selOptions & 0x8000000) != 0 ? value : (this.showCode && value != nm ? value + ":" + nm : nm);
                    }
                    this.listDOM.appendChild(this.createRowDOM(value,text.toString(),this.curFilter,levels == null ? 0 : levels[i]));
                }
                if(this._firstFilterMachedVal && this._firstFilterMachedVal == value)
                    focusR = i;
                if(firstSeledRow == -1 && this.valueList && this.valueList.indexOfItem(value) >= 0)
                {
                    firstSeledRow = i;
                }
                this.inSelectingValues.add(value);
            }
        if(focusR < 0)
            focusR = firstSeledRow >= 0 ? firstSeledRow : 0;
        delete this._firstFilterMachedVal;
        if(this.inputOvParent)
            this.setKeyFocused(focusR,1,null);
        if(this.infoDOM)
        {
            Xjs.DOM.setTextContent(this.infoDOM,optData.length > 0 || this.infoNoMatch == null ? this.getPromptInfo() : this.getNoMatchPromptInfo());
        }
        if(this.domHTMLByID)
            for(var id in this.domHTMLByID)
            {
                var e = Xjs.DOM.findById(id,this.dom);
                if(e)
                {
                    var s = this.domHTMLByID[id],
                        p = s.indexOf("${title}");
                    if(p >= 0)
                        s = s.substring(0,p) + this.parent.title + s.substring(p + 8);
                    e.innerHTML = s;
                }
            }
        var raOn = this.realignOn || 1;
        if(raOn == 1 && this._inShowingPos == 1)
        {
            this.reAlignShow();
            this.adjSearchboxOvPosL();
        }
        try
        {
            this.listDOM.scrollTop = 0;
            this.listDOM.scrollTo(0,0);
        }catch(ex)
        {
        }
        if(this.listScrollbar)
        {
            this.listDOM.appendChild(this.listScrollbar.vbar);
            this.updateListScrollVal();
        }
    },
    /*xjs.ui.ComboAidInputer.getNoMatchPromptInfo*/
    getNoMatchPromptInfo:function()
    {
        return (this.selectOptions == null || this.selectOptions.length == 0) && this.infoNoSelect ? this.infoNoSelect : this.infoNoMatch;
    },
    /*xjs.ui.ComboAidInputer.getPromptInfo*/
    getPromptInfo:function()
    {
        if(this.promptInfo == null)
        {
            this.promptInfo = "";
            if(this.promptInfoFmt)
            {
                var p = this.promptInfoFmt.indexOf("${title}");
                this.promptInfo = p >= 0 ? this.promptInfoFmt.substring(0,p) + this.parent.title + this.promptInfoFmt.substring(p + 8) : this.promptInfoFmt;
            }
        }
        return this.promptInfo;
    },
    /*xjs.ui.ComboAidInputer.findLevels*/
    findLevels:function(codes)
    {
        if((this.selOptions & 1) != 0)
            return null;
        var levels = new Array(codes.length);
        this.findLevels1(codes,"",0,levels,0);
        return levels;
    },
    /*xjs.ui.ComboAidInputer.findLevels1*/
    findLevels1:function(codes,pcode,i,levels,levl)
    {
        for(;i < codes.length && codes[i][this.lvColumn].startsWith(pcode);)
        {
            levels[i] = levl;
            i = this.findLevels1(codes,codes[i][this.lvColumn],i + 1,levels,levl + 1);
        }
        return i;
    },
    /*xjs.ui.ComboAidInputer.checkInputComplete*/
    checkInputComplete:function()
    {
        if(this.selOptions & 0x400000 && this.inputField)
        {
            var v = this.inputField.value;
            if(v && (v = v.trim()).length > 0 && this.inSelectingValues.size() == 1 && this.inSelectingValues.get(0) == v)
            {
                this.onSelectValue(v);
            }
        }
    },
    /*xjs.ui.ComboAidInputer.onInputFieldChanged*/
    onInputFieldChanged:function(e)
    {
        this.refilter(false);
        this.checkInputComplete();
    },
    /*xjs.ui.ComboAidInputer.getLIDoms*/
    getLIDoms:function()
    {
        if(this._bakLiDims)
            return this._bakLiDims;
        var a = [];
        for(var j=0;j < this.listDOM.childNodes.length;j++)
        {
            var li = this.listDOM.childNodes[j];
            if(Xjs.DOM.hasClass(li,"scroll-bar"))
                continue;
            a.push(li);
        }
        return this._bakLiDims = a;
    },
    /*xjs.ui.ComboAidInputer.forEnterKey*/
    forEnterKey:function(e)
    {
        var liDoms = this.getLIDoms(),
            selectIdx = -1;
        if(this.listDOM != null && liDoms.length == 1)
        {
            selectIdx = 0;
        } else if(this.keyFocusedRow)
        {
            selectIdx = Xjs.DOM.indexOf(liDoms,this.keyFocusedRow);
        }
        if(selectIdx >= 0)
        {
            if(e.ctrlKey && this.isMultiSelectable())
            {
                this.endAidInputer(true);
                return;
            }
            var li = liDoms[selectIdx],
                value = li._value;
            if(value !== undefined)
            {
                this.onSelectValue(value);
            }
        }
    },
    /*xjs.ui.ComboAidInputer.onInputFieldKeydown*/
    onInputFieldKeydown:function(e)
    {
        if(!Xjs.Event.isNavKeyPress(e))
        {
            this.refilter(false);
            this.checkInputComplete();
        } else if(e.keyCode == 40 || e.keyCode == 13)
        {
            if(this.inputOvParent)
            {
                this.onListKeydown(e);
            } else if(this.listDOM != null && this.getLIDoms().length > 0)
            {
                this.listDOM.focus();
                this.onListKeydown(e);
                if(e.keyCode == 13)
                {
                    this.entryKeyLock++;
                }
            }
        } else if(e.keyCode == 38 && this.inputOvParent)
        {
            this.onListKeydown(e);
        } else if(e.keyCode == 27)
        {
            this.hideAndFocusParent();
            return false;
        }
        return;
    },
    /*xjs.ui.ComboAidInputer.onInputFieldKeyup*/
    onInputFieldKeyup:function(e)
    {
        if(e.keyCode == 13)
        {
            this.forEnterKey(e);
            Xjs.Event.cancelEvent(e,true);
            return false;
        }
        return;
    },
    /*xjs.ui.ComboAidInputer.doParentCompSearchBoxKeyDown*/
    doParentCompSearchBoxKeyDown:function(e)
    {
        var k = e.keyCode;
        if(k == 13)
        {
        } else if(k == 40 || k == 38)
        {
            this.onListKeydown(e);
        } else if(k == 27)
        {
            this.hideAndFocusParent();
        } else 
        {
            return false;
        }
        Xjs.Event.cancelEvent(e,true);
        return true;
    },
    /*xjs.ui.ComboAidInputer.setKeyFocused*/
    setKeyFocused:function(idx,dir,liDoms)
    {
        if(this.viewKeyFocused === false)
            return;
        if(!liDoms)
            liDoms = this.getLIDoms();
        for(;idx >= 0 && idx < liDoms.length;idx += dir)
        {
            if(this.isSelectable(liDoms[idx]._value))
            {
                this.setFocusedRow(idx,liDoms);
                break;
            }
        }
    },
    /*xjs.ui.ComboAidInputer.setCurKeyFocused*/
    setCurKeyFocused:function(idx,dir,liDoms)
    {
        if(this.viewKeyFocused === false)
            return;
        if(!liDoms)
            liDoms = this.getLIDoms();
        if(idx == 0)
            this.setFocusedRow(idx,liDoms);
        for(;idx >= 0 && idx < liDoms.length;idx += dir)
        {
            if(this.isSelectable(liDoms[idx]._value))
            {
                var className = liDoms[idx].className;
                if(className && className.indexOf("selected") > -1)
                {
                    this.setFocusedRow(idx,liDoms);
                    break;
                }
            }
        }
    },
    /*xjs.ui.ComboAidInputer.indexRowOfValue*/
    indexRowOfValue:function(v)
    {
        var liDoms = this.getLIDoms();
        for(var i=0;i >= 0 && i < liDoms.length;i++)
        {
            if(liDoms[i]._value == v)
                return i;
        }
        return -1;
    },
    /*xjs.ui.ComboAidInputer.setFocusedRow*/
    setFocusedRow:function(idx,liDoms)
    {
        if(!liDoms)
            liDoms = this.getLIDoms();
        if(this.keyFocusedRow)
        {
            var j = Xjs.DOM.indexOf(liDoms,this.keyFocusedRow);
            if(j == idx)
                return;
            Xjs.DOM.removeClass(this.keyFocusedRow,"focused");
            this.keyFocusedRow = null;
        }
        if(idx >= liDoms.length)
            return;
        this.keyFocusedRow = liDoms[idx];
        Xjs.DOM.addClass(this.keyFocusedRow,"focused");
        if(Xjs.DOM.isShowing(this.dom))
            this.scrollFocusedRowVisible();
    },
    /*xjs.ui.ComboAidInputer.getRowValue*/
    getRowValue:function(row,mode,focus)
    {
        var liDoms = this.getLIDoms(),
            nr;
        if((nr = liDoms.length) == 0)
            return null;
        if(mode == 1)
        {
            var r0 = this.keyFocusedRow == null ? -1 : Xjs.DOM.indexOf(liDoms,this.keyFocusedRow);
            if(row < 0 && r0 < 0)
                row = nr + row;
            else 
                row = r0 + row;
        }
        for(;row < 0;row += nr)
            ;
        for(;row >= nr;row -= nr)
            ;
        if(focus)
            this.setFocusedRow(row,liDoms);
        var rowDom = liDoms[row];
        if(rowDom)
            return rowDom._value;
        return null;
    },
    /*xjs.ui.ComboAidInputer.scrollFocusedRowVisible*/
    scrollFocusedRowVisible:function()
    {
        if(this.keyFocusedRow)
            Xjs.DOM.scrollToVisible(this.listDOMX,this.keyFocusedRow,2);
    },
    /*xjs.ui.ComboAidInputer.scrollFocusedRowToTop*/
    scrollFocusedRowToTop:function()
    {
        Xjs.DOM.scrollToTop(this.listDOMX,this.keyFocusedRow);
    },
    /*xjs.ui.ComboAidInputer.onListKeydown*/
    onListKeydown:function(e)
    {
        var liDoms = this.getLIDoms(),
            j = this.keyFocusedRow == null ? -1 : Xjs.DOM.indexOf(liDoms,this.keyFocusedRow),
            d;
        if(e.keyCode == 40)
            d = 1;
        else if(e.keyCode == 38)
            d = -1;
        else 
        {
            if(j == -1 && e.keyCode == 13)
            {
                d = 1;
            } else 
            {
                return;
            }
        }
        if(j < 0)
        {
            this.setKeyFocused(0,1,liDoms);
        } else 
        {
            this.setKeyFocused(j + d,d,liDoms);
        }
        return false;
    },
    /*xjs.ui.ComboAidInputer.onListKeyup*/
    onListKeyup:function(e)
    {
        if(e.keyCode == 13)
        {
            if(!this.entryKeyLock)
            {
                if(this.keyFocusedRow)
                {
                    var j = Xjs.DOM.indexOf(this.getLIDoms(),this.keyFocusedRow);
                    if(j >= 0)
                    {
                        this.onSelectClickRow(this.keyFocusedRow);
                    }
                }
            } else 
            {
                this.entryKeyLock--;
            }
            return false;
        } else if(e.keyCode == 27)
        {
            this.hideAndFocusParent();
            return false;
        }
        return;
    },
    /*xjs.ui.ComboAidInputer.onSearchDelBtnClick*/
    onSearchDelBtnClick:function(e)
    {
        if(this.inputField != null)
        {
            this.inputField.value = "";
            this.refilter(false);
            this.inputField.focus();
        }
    },
    /*xjs.ui.ComboAidInputer.oncmd_all*/
    oncmd_all:function()
    {
        var changed = false,
            vals;
        if(this.pgRowCount)
        {
            this.filterValues(1,vals = new Xjs.util.SortedArray(null));
        } else 
        {
            vals = this.inSelectingValues;
        }
        for(var i=0;i < vals.size();i++)
        {
            var value = vals.get(i);
            if((this.selOptions & 3) == 0 && !this.isLastLevlCode(value))
            {
                continue;
            }
            if(this.valueList.addItem(value,false))
                changed = true;
        }
        if(changed)
            this.updateRowDOMClass();
    }
});
Xjs.apply(Xjs.ui.ComboAidInputer,{
    /*xjs.ui.ComboAidInputer.newDefaultRemoteSearchAid*/
    newDefaultRemoteSearchAid:function(params)
    {
        var aidParams = {selOptions:1 | 0x50,promptInfo:"",selOptions4:16};
        if(params)
        {
            Xjs.apply(aidParams,params);
        }
        var remoteSearchAid = new Xjs.ui.ComboAidInputer(aidParams);
        remoteSearchAid.fnFilterVals = Xjs.ui.ComboAidInputer.newDefaultRemoteSearchFn(null,remoteSearchAid);
        return remoteSearchAid;
    },
    /*xjs.ui.ComboAidInputer.newDefaultRemoteSearchFn*/
    newDefaultRemoteSearchFn:function(searchBeanId,scop)
    {
        var remoteSearch = this.remoteSearchFn.createDelegate(this,[searchBeanId],true);
        return new Xjs.FuncCall(remoteSearch,scop);
    },
    /*xjs.ui.ComboAidInputer.remoteSearchFn*/
    remoteSearchFn:function(aid,curFilter,searchBeanId)
    {
        if(curFilter == null)
        {
        }
        if(!searchBeanId)
        {
            searchBeanId = aid.searchBeanId;
        }
        var v = [];
        if(searchBeanId)
        {
            var params = {filterTxt:curFilter};
            params.columnName = aid.parent.name;
            Xjs.apply(params,aid.searchParams || {});
            aid.selectOptions = v = Xjs.RInvoke.rsvInvoke("SN-UI.ComboRemoteService.remoteFilter",searchBeanId,params);
        }
        return v;
    }
});
/*xjs/ui/DateAidInputer.java*/
Xjs.ui.DateAidInputer=function(config){
    Xjs.ui.DateAidInputer.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.DateAidInputer,Xjs.ui.LayerAidInputer,{
  _js$className_:"Xjs.ui.DateAidInputer",
    /*xjs.ui.DateAidInputer._createDOM*/
    _createDOM:function()
    {
        var date = Date.getServerTime();
        this.curYear = date.getFullYear();
        this.curMonth = date.getMonth() + 1;
        this.curDay = date.getDate();
        var curHour = date.getHours(),
            curMin = date.getMinutes(),
            curSec = date.getSeconds(),
            htmlRes = this.htmlRes || "@" + Xjs.getDefResPath() + "/datepicker.html",
            dom = Xjs.ui.Component.createDomFromRes(htmlRes,this,false,Xjs.ResBundle.getRes("UI"));
        {
            this.yearAI = this.createComboInput("YEARSELECT",dom,"_onYMChanged",65);
            this.monthAI = this.createComboInput("MONTHSELECT",dom,"_onYMChanged",50);
            if(this.monthAI)
            {
                this.monthAI.selectOptions = new Array(12);
                for(var m=1;m <= 12;m++)
                {
                    this.monthAI.selectOptions[m - 1] = m;
                }
            }
            if(!(this.hms & 8))
            {
                var tableDOM = this.tableDOM = Xjs.DOM.findById("DAYSELECT",dom);
                tableDOM.onclick = Function.bindAsEventListener(this._onDayClick,this);
                tableDOM.onkeydown = Function.bindAsEventListener(this._onDayKeydown,this);
                for(var r=0;r < 7;r++)
                {
                    var row = tableDOM.insertRow(r);
                    if(r == 0)
                    {
                        row.className = "headerrow";
                    } else 
                    {
                        row.className = "bodyrow";
                    }
                    for(var c=0;c < 7;c++)
                    {
                        var cell = row.insertCell(c);
                        cell.align = "center";
                        cell.vAlign = "middle";
                        if(r == 0)
                        {
                            cell.innerHTML = this.ShortWeekTitle[c];
                        } else 
                        {
                        }
                    }
                }
            }
        }
        this.okBtn = Xjs.DOM.findById("OKBTN",dom);
        var hmsDOM = Xjs.DOM.findById("HMSSELECT",dom);
        if(this.hms & 7)
        {
            var dftCurHMS = this.dftCurHMS === undefined ? 7 : this.dftCurHMS,
                hmsIDs = ["HOURELECT","MINSELECT","SECSELECT"];
            for(var j=0;j < 3;j++)
            {
                var e = Xjs.DOM.findById(hmsIDs[j],dom),
                    max,
                    v;
                if(j == 0)
                {
                    this.hourDOM = e;
                    max = 23;
                    v = (dftCurHMS & 1) != 0 ? (this.initHour === undefined ? curHour : this.initHour) : 0;
                } else if(j == 1)
                {
                    this.minDOM = e;
                    max = 59;
                    v = (dftCurHMS & 2) != 0 ? (this.initMin === undefined ? curMin : this.initMin) : 0;
                    if(!(this.hms & 6) && e != null)
                        e.disabled = true;
                } else 
                {
                    this.secDOM = e;
                    max = 59;
                    v = (dftCurHMS & 4) != 0 ? (this.initSec === undefined ? curSec : this.initSec) : 0;
                    if(!(this.hms & 4) && e != null)
                        e.disabled = true;
                }
                if(this.okBtn && e.tagName == "INPUT")
                {
                    Xjs.ui.InputField.setOnInput(e,this.onYMDChanged,this);
                }
                if(e.tagName == "SELECT")
                    for(var k=0;k <= max;k++)
                    {
                        var o = document.createElement("option");
                        o.text = o.value = k < 10 ? "0" + k : "" + k;
                        if(v == k)
                            o.selected = true;
                        (e).options.add(o);
                    }
            }
            this.hmSelList = Xjs.DOM.findById("HMSELLIST",dom);
            if(this.hmSelList)
            {
                if(this.hmListVals)
                {
                    var f = Function.bindAsEventListener(this.onHMSelItemClick,this);
                    for(var i=0;i < this.hmListVals.length;i += 3)
                    {
                        var e = this.hmListVals[i + 1],
                            s = this.hmListVals[i + 2];
                        if(s > 0)
                            for(var t=this.hmListVals[i + 0];t < e;t += s)
                            {
                                var li = Xjs.DOM.createChild(this.hmSelList,"li");
                                li._value = t;
                                li.onclick = f;
                                var h = Math.floor(t / 60),
                                    m = t % 60;
                                Xjs.DOM.setTextContent(li,(h < 10 ? "0" + h : "" + h) + " : " + (m < 10 ? "0" + m : "" + m));
                            }
                    }
                    this.hmSelScrollbar = new Xjs.ui.util.CustomScrollbar("DateAI.SBar",this.hmSelList,1 | 4 | 8,null,null,null);
                } else 
                {
                    this.hmSelList.style.display = "none";
                }
            }
        } else 
        {
            var hmsI = Xjs.DOM.findById("HMSINPUT",hmsDOM);
            if(hmsI && this.hms & 8)
                Xjs.DOM.remove(hmsI);
            else 
                Xjs.DOM.remove(hmsDOM);
        }
        {
            var navIds = ["NAVYEARPREV","NAVYEARNEXT","NAVMONPREV","NAVMONTNEXT"],
                f = Function.bindAsEventListener(this._onNavYearMon,this);
            for(var i=0;i < navIds.length;i++)
            {
                var e = Xjs.DOM.findById(navIds[i],dom);
                if(e)
                    e.onclick = f;
            }
        }
        if(this.okBtn)
        {
            if(this.date2Input && this.date2Input.date1Input == this)
                this.okBtn.style.display = "none";
            else 
                this.okBtn.onclick = Function.bindAsEventListener(this._onOk,this);
        }
        if(this.selectOnDayClick === undefined)
        {
            this.selectOnDayClick = this.okBtn == null || (this.hms & 7) == 0;
        }
        this.ymdSelBtns = Xjs.DOM.findById("YMDSELBTNS",dom);
        if(this.ymdSelBtns)
        {
            var hide = true,
                f = Function.bindAsEventListener(this.onYMDQBtnClick,this);
            if(this.hmdQSelVals)
            {
                var dftBtn = Xjs.DOM.findById("DFTYMDSELBTN",this.ymdSelBtns);
                dftBtn.style.display = "none";
                for(var i=0;i < this.hmdQSelVals.length;i++)
                {
                    var s = this.hmdQSelVals[i],
                        p = s.indexOf(":");
                    if(p < 0)
                        continue;
                    var dk,
                        d = Date.parseDateMacro(dk = s.substring(0,p));
                    if(d == null)
                        continue;
                    hide = false;
                    var b = Xjs.DOM.findById("BTN_SEL_" + String.replaceInvalidIdPart(dk),this.ymdSelBtns);
                    if(!b)
                    {
                        b = dftBtn.cloneNode(true);
                        b.style.display = "";
                        this.ymdSelBtns.appendChild(b);
                        var c = Xjs.DOM.findById("label",b) || b;
                        Xjs.DOM.setTextContent(c,s.substring(p + 1));
                    }
                    b.onclick = f;
                    b._value = d;
                }
            }
            var selBtns = Xjs.DOM.findAll("button",this.ymdSelBtns);
            if(selBtns)
                for(var i=0;i < selBtns.length;i++)
                {
                    var b = selBtns[i];
                    if(b.id && b.id.startsWith("BTN_SEL_") && b.onclick == null)
                    {
                        var dk = b.id.substring(8);
                        b.onclick = f;
                        b._value = Date.parseDateMacro(dk);
                        hide = false;
                    }
                }
            if(hide)
            {
                this.ymdSelBtns.style.display = "none";
            }
        }
        return dom;
    },
    /*xjs.ui.DateAidInputer.createComboInput*/
    createComboInput:function(id,root,onChanged,width)
    {
        var e = Xjs.DOM.findById(id,root);
        if(!e)
            return null;
        var combo = new Xjs.ui.ComboAidInputer({selOptions:0x20010001});
        combo.addListener("onComboAidInputerExpandShow",this.onComboAidInputerExpandShow,this);
        var input = new Xjs.ui.InputField({editable:false,width:width,disableDel:true,textAlign:"center",aidInputer:combo});
        e.parentNode.insertBefore(input.getDOM(),e);
        e.parentNode.removeChild(e);
        if(onChanged)
            input.addListener("valueChanged",new Xjs.FuncCall(this[onChanged],this));
        return input;
    },
    /*xjs.ui.DateAidInputer.onComboAidInputerExpandShow*/
    onComboAidInputerExpandShow:function(combo)
    {
        if(combo.parent)
        {
            var v = combo.parent.getValue();
            if(typeof(v) == "number" && combo.parent.selectOptions)
            {
                var v0 = combo.parent.selectOptions[0];
                if(typeof(v0) == "number")
                    combo.setKeyFocused(v - v0,1,null);
                if(combo.parent == this.yearAI)
                    combo.scrollFocusedRowToTop();
            }
        }
    },
    /*xjs.ui.DateAidInputer.updateYearSelect*/
    updateYearSelect:function(minYear,maxYear)
    {
        var selo = this.yearAI.selectOptions;
        if(selo && selo[0] == this.curYear + minYear && selo[selo.length - 1] == this.curYear + maxYear)
            return;
        var n;
        this.yearAI.selectOptions = selo = new Array(n = maxYear - minYear + 1);
        for(var i=0;i < n;i++)
            selo[i] = minYear + i + this.curYear;
        if(this.year >= minYear && this.year <= maxYear)
            this.yearAI.setValue(this.year);
        else 
            delete this.year;
    },
    /*xjs.ui.DateAidInputer.setDate*/
    setDate:function(year,month,day)
    {
        if(typeof(year) == "string")
            year = parseInt(year);
        if(typeof(month) == "string")
            month = parseInt(month);
        if(typeof(day) == "string")
            day = parseInt(day);
        if(this.year == year && this.month == month && this.day == day)
            return;
        if(this.year != year || this.month != month)
        {
            delete this._todayFlaged;
            var date1 = new Date(year,month - 1,1),
                d = -(this._wday0 = date1.getDay()),
                mdays = this._mdays = Date.getDaysOfMonth(year,month),
                pyear = month == 1 ? year - 1 : year,
                pmonth = month == 1 ? 12 : month - 1,
                pmdays = Date.getDaysOfMonth(pyear,pmonth),
                nyear = month == 12 ? year + 1 : year,
                nmonth = month == 12 ? 1 : month + 1;
            if(this.tableDOM)
                for(var r=1;r <= 6;r++)
                {
                    var row = this.tableDOM.rows[r];
                    for(var j=0;j < 7;j++)
                    {
                        d++;
                        var cell = row.cells[j];
                        cell._day = d;
                        var _ymd;
                        if(d <= 0)
                        {
                            _ymd = [pyear,pmonth,pmdays + d];
                            cell.className = j == 0 || j == 6 ? "xhday" : "xday";
                        } else if(d > mdays)
                        {
                            _ymd = [nyear,nmonth,d - mdays];
                            cell.className = j == 0 || j == 6 ? "xhday" : "xday";
                        } else 
                        {
                            _ymd = [year,month,d];
                            cell.className = j == 0 || j == 6 ? "hday" : "day";
                        }
                        cell._ymd = _ymd;
                        if(this.checkDateValid && !this.checkDateValid.call(_ymd))
                        {
                            cell.className += " disabled";
                        }
                        cell.innerHTML = "" + _ymd[2];
                        if(this.curDay == d && month == this.curMonth && year == this.curYear)
                        {
                            Xjs.DOM.addClass(cell,"today");
                            this._todayFlaged = d;
                        } else 
                        {
                        }
                    }
                }
            this.yearAI.setValue(this.year = year);
            this.monthAI.setValue(this.month = month);
            this.day = 0;
            delete this._flagSelectedDay;
            delete this.focusedDay;
        }
        if(day > this._mdays)
            day = this._mdays;
        if(day != this.day)
        {
            this.day = day;
        }
        if(this.flagSelectedDay !== false)
            this.setSelectedDay(day);
        this.setFocusedDay(day);
        this.enableOkBtn();
    },
    /*xjs.ui.DateAidInputer.setSelectedDay*/
    setSelectedDay:function(day)
    {
        if(this._flagSelectedDay == day || !this.tableDOM)
            return;
        if(this._flagSelectedDay !== undefined)
        {
            var cell = this._getDayCell(this._flagSelectedDay);
            if(cell)
            {
                Xjs.DOM.removeClass(cell,"selectedday");
            }
        }
        this._flagSelectedDay = day;
        if(day == this._todayFlaged)
            return;
        var cell = this._getDayCell(day);
        if(cell && day != this._todayFlaged)
        {
            Xjs.DOM.addClass(cell,"selectedday");
        }
    },
    /*xjs.ui.DateAidInputer.setFocusedDay*/
    setFocusedDay:function(day)
    {
        if(this.focusedDay == day || !this.tableDOM)
            return;
        if(this.focusedDay !== undefined)
        {
            var cell = this._getDayCell(this.focusedDay);
            if(cell)
            {
                Xjs.DOM.removeClass(cell,"focusedday");
            }
        }
        var cell = this._getDayCell(this.focusedDay = day);
        if(cell)
        {
            Xjs.DOM.addClass(cell,"focusedday");
        }
    },
    /*xjs.ui.DateAidInputer.incFocusDay*/
    incFocusDay:function(inc)
    {
        var day = (this.focusedDay || 0) + inc,
            d = day - 1 + this._wday0;
        if(d >= 0 && d < 6 * 7)
        {
            this.setFocusedDay(day);
            return;
        }
        var y = this.yearAI.getValue(),
            m = this.monthAI.getValue();
        if(d < 0)
        {
            m--;
            if(m <= 0)
            {
                y--;
                m = 12;
            }
            d += 6 * 7;
        } else 
        {
            m++;
            if(m >= 13)
            {
                y++;
                m = 1;
            }
            d -= 6 * 7;
        }
        this.setDate(y,m,this.day);
        this.setFocusedDay(d - this._wday0 + 1);
    },
    /*xjs.ui.DateAidInputer.setTime*/
    setTime:function(hour,min,sec)
    {
        if(this.hourDOM != null)
            this.hourDOM.value = hour < 10 ? "0" + hour : "" + hour;
        if(this.minDOM != null)
            this.minDOM.value = min < 10 ? "0" + min : "" + min;
        if(this.hourDOM != null)
            this.secDOM.value = sec < 10 ? "0" + sec : "" + sec;
        this.enableOkBtn();
    },
    /*xjs.ui.DateAidInputer._getDayCell*/
    _getDayCell:function(day)
    {
        if(day === undefined)
            return null;
        var nd = day - 1 + this._wday0;
        return this.tableDOM.rows[1 + Math.floor(nd / 7)].cells[nd % 7];
    },
    /*xjs.ui.DateAidInputer._onYMChanged*/
    _onYMChanged:function()
    {
        this.setDate(this.yearAI.getValue(),this.monthAI.getValue(),this.day);
    },
    /*xjs.ui.DateAidInputer._onNavYearMon*/
    _onNavYearMon:function(ev)
    {
        var e = ev.srcElement || ev.target;
        if(e.id)
        {
            this.onNavYearMonProcess(e);
        }
    },
    /*xjs.ui.DateAidInputer.onNavYearMonProcess*/
    onNavYearMonProcess:function(e)
    {
        switch(e.id)
        {
        case "NAVYEARPREV":
            if(this.minYear && this.year <= this.curYear + this.minYear)
                break;
            this.setDate(this.year - 1,this.month,this.day);
            break;
        case "NAVYEARNEXT":
            if(this.maxYear && this.year >= this.curYear + this.maxYear)
                break;
            this.setDate(this.year + 1,this.month,this.day);
            break;
        case "NAVMONPREV":
            {
                var y = this.year,
                    m = this.month - 1;
                if(m <= 0)
                {
                    y--;
                    m = 12;
                    if(this.minYear && y < this.curYear + this.minYear)
                        break;
                }
                this.setDate(y,m,this.day);
            }
            break;
        case "NAVMONTNEXT":
            {
                var y = this.year,
                    m = this.month + 1;
                if(m > 12)
                {
                    y++;
                    m = 1;
                    if(this.maxYear && y > this.curYear + this.maxYear)
                        break;
                }
                this.setDate(y,m,this.day);
            }
            break;
        }
    },
    /*xjs.ui.DateAidInputer._onOk*/
    _onOk:function()
    {
        if(this.date2Input && this.date2Input.date2Input == this)
        {
            this.date2Input.selectedVal1 = null;
            this.date2Input.selectedVal2 = null;
            this.date2Input.date1Input._onOk();
        }
        if(this.hms & 8)
        {
            if(this.parent.sqlType == 12)
            {
                var val = this.year + "-" + (this.month < 9 ? "0" + this.month : "" + this.month);
                this.setParentValue(val);
            } else if(this.parent.sqlType == 4)
            {
                this.setParentValue(this.year * (this.month < 9 ? 1000 : 100) + this.month);
            }
            this.hideAndFocusParent();
        } else 
        {
            this.selectFocusedDay();
        }
    },
    /*xjs.ui.DateAidInputer.isOk*/
    isOk:function()
    {
        if(this.tableDOM)
        {
            var cell = this._getDayCell(this.focusedDay);
            if(!cell)
                return false;
        }
        var hms = this.getHMS();
        return hms[0] >= 0 && hms[0] < 24 && hms[1] >= 0 && hms[1] < 60 && hms[2] >= 0 && hms[2] < 60;
    },
    /*xjs.ui.DateAidInputer.enableOkBtn*/
    enableOkBtn:function()
    {
        if(!this.okBtn)
            return;
        this.okBtn.disabled = !this.isOk();
        Xjs.DOM.addOrRemoveClass(this.okBtn,"ui-disabled",this.okBtn.disabled);
    },
    /*xjs.ui.DateAidInputer.onYMDChanged*/
    onYMDChanged:function(e)
    {
        this.enableOkBtn();
    },
    /*xjs.ui.DateAidInputer._onDayClick*/
    _onDayClick:function(e)
    {
        var ymd = this._getMouseAtYMD(e);
        if(!ymd)
            return;
        var y = this.yearAI.getValue(),
            m = this.monthAI.getValue();
        this.setFocusedDay(Xjs.ui.DateAidInputer.toYMDay(y,m,ymd[0],ymd[1],ymd[2]));
        this.enableOkBtn();
        if(this.selectOnDayClick)
            this.selectYMD(ymd);
    },
    /*xjs.ui.DateAidInputer.selectYMD*/
    selectYMD:function(ymd)
    {
        if(ymd)
            try
            {
                var val = ymd[0] + "-" + Xjs.ui.DateAidInputer.toStr2(ymd[1]) + "-" + Xjs.ui.DateAidInputer.toStr2(ymd[2]),
                    hms = this.getHMS();
                if(this.hourDOM)
                    val += " " + Xjs.ui.DateAidInputer.toStr2(hms[0]);
                if(this.minDOM)
                    val += ":" + Xjs.ui.DateAidInputer.toStr2(hms[1]);
                if(this.secDOM)
                    val += ":" + Xjs.ui.DateAidInputer.toStr2(hms[2]);
                if(this.checkDateValid && !this.checkDateValid.call(ymd,hms))
                {
                    return;
                }
                if(this.date2Input)
                {
                    this.date2Input.selectYMD(this,val);
                    return;
                }
                this.setParentValue(val);
                this.hideAndFocusParent();
            }catch(ex)
            {
                Xjs.alertErr(ex);
            }
    },
    /*xjs.ui.DateAidInputer.getHMS*/
    getHMS:function()
    {
        var hms = [0,0,0];
        if(this.hourDOM)
            hms[0] = parseInt(this.hourDOM.value);
        if(this.minDOM)
            hms[1] = parseInt(this.minDOM.value);
        if(this.secDOM)
            hms[2] = parseInt(this.secDOM.value);
        return hms;
    },
    /*xjs.ui.DateAidInputer._onDayKeydown*/
    _onDayKeydown:function(e)
    {
        switch(e.keyCode)
        {
        case 37:
            this.incFocusDay(-1);
            return false;
        case 39:
            this.incFocusDay(1);
            return false;
        case 38:
            this.incFocusDay(-7);
            return false;
        case 40:
            this.incFocusDay(7);
            return false;
        case 33:
            this.incFocusDay(-42);
            return false;
        case 34:
            {
                this.incFocusDay(42);
                return false;
            }
        case 13:
            this.selectFocusedDay();
            return false;
        case 27:
            this.hideAndFocusParent();
            return false;
        }
        return;
    },
    /*xjs.ui.DateAidInputer.selectFocusedDay*/
    selectFocusedDay:function()
    {
        var cell = this._getDayCell(this.focusedDay);
        if(cell)
            this.selectYMD(cell._ymd);
    },
    /*xjs.ui.DateAidInputer.afterExpandShow*/
    afterExpandShow:function(newDom)
    {
        if(this.tableDOM)
            this.tableDOM.focus();
        if(this.hmSelScrollbar)
            this.hmSelScrollbar.updateValue();
    },
    /*xjs.ui.DateAidInputer._getMouseAtYMD*/
    _getMouseAtYMD:function(e)
    {
        var t = e.srcElement || e.target;
        if(t.tagName == "TD" && t._ymd)
        {
            return t._ymd;
        }
        return null;
    },
    /*xjs.ui.DateAidInputer.beforeExpandShow*/
    beforeExpandShow:function(newDOM)
    {
        this.initDate(this.parent);
    },
    /*xjs.ui.DateAidInputer.initDate*/
    initDate:function(parent)
    {
        if(parent.maxYear)
        {
            this.updateYearSelect(parent.minYear,parent.maxYear);
        } else 
        {
            this.updateYearSelect(this.minYear === undefined ? -20 : this.minYear,this.maxYear === undefined ? 20 : this.maxYear);
        }
        var selectDate = this.initValue;
        if(selectDate)
        {
            this.setDate(selectDate.getFullYear(),selectDate.getMonth() + 1,selectDate.getDate());
            this.setTime(selectDate.getHours(),selectDate.getMinutes(),selectDate.getSeconds());
        }
    },
    /*xjs.ui.DateAidInputer.setInitValue*/
    setInitValue:function(date)
    {
        if(this.hms & 8 && typeof(date) == "string")
        {
            date += "-1";
        }
        if(this.hms & 8 && typeof(date) == "number")
        {
            var intv = "" + date;
            date = intv.substring(0,4) + "-" + intv.substring(4) + "-1";
        }
        if(typeof(date) == "string")
        {
            date = Date.parseDate(date);
        }
        if(!(date instanceof Date))
        {
            date = Date.getServerTime();
            var hms = this.hms & 7;
            if(hms == 0)
            {
                date = new Date(date.getFullYear(),date.getMonth(),date.getDate());
            } else if(hms > 0)
            {
                var h = this.initHour === undefined ? date.getHours() : this.initHour,
                    m = this.initMin === undefined ? (hms & 2 ? date.getMinutes() : 0) : this.initMin,
                    s = this.initSec === undefined ? (hms & 4 ? date.getSeconds() : 0) : this.initSec;
                date = new Date(date.getFullYear(),date.getMonth(),date.getDate(),h,m,s,0);
            }
        }
        this.initValue = date;
    },
    /*xjs.ui.DateAidInputer.setCheckDateValid*/
    setCheckDateValid:function(v)
    {
        this.checkDateValid = v;
    },
    /*xjs.ui.DateAidInputer.onYMDQBtnClick*/
    onYMDQBtnClick:function(e)
    {
        var b = e.srcElement || e.target;
        if(b._value && b._value instanceof Date)
        {
            var d = b._value;
            this.setDate(d.getFullYear(),d.getMonth() + 1,d.getDate());
            if(this.hms == 0 && b._selectOnClick)
            {
                this.selectYMD([d.getFullYear(),d.getMonth() + 1,d.getDate()]);
            }
        } else if(b._value === null && this.hms == 0)
        {
            this.setParentValue(null);
            this.hideAndFocusParent();
        }
    },
    /*xjs.ui.DateAidInputer.onHMSelItemClick*/
    onHMSelItemClick:function(e)
    {
        var li = e.srcElement || e.target;
        if(li != this.hmFocusedLI)
        {
            if(this.hmFocusedLI)
                Xjs.DOM.removeClass(this.hmFocusedLI,"focused");
            this.hmFocusedLI = li;
            Xjs.DOM.addClass(li,"focused");
        }
        if(li._value)
        {
            var h = Math.floor(li._value / 60),
                m = li._value % 60;
            this.setTime(h,m,0);
        }
    }
});
Xjs.apply(Xjs.ui.DateAidInputer,{
    /*xjs.ui.DateAidInputer.toStr2*/
    toStr2:function(x)
    {
        return x < 10 ? "0" + x : "" + x;
    },
    /*xjs.ui.DateAidInputer.toYMDay*/
    toYMDay:function(y,m,y0,m0,d)
    {
        for(;y0 > y | (y0 == y && m0 > m);)
        {
            m0--;
            if(m0 <= 0)
            {
                y0--;
                m0 = 12;
            }
            d += Date.getDaysOfMonth(y0,m0);
        }
        for(;y0 < y | (y0 == y && m0 < m);)
        {
            d -= Date.getDaysOfMonth(y0,m0);
            m0++;
            if(m0 >= 13)
            {
                y0++;
                m0 = 1;
            }
        }
        return d;
    },
    /*xjs.ui.DateAidInputer.getDefaultInputer*/
    getDefaultInputer:function(hms)
    {
        if(hms == 7)
            return Xjs.ui.DateAidInputer.defaultInputer3 || (Xjs.ui.DateAidInputer.defaultInputer3 = new Xjs.ui.DateAidInputer({hms:7}));
        if(hms)
            return new Xjs.ui.DateAidInputer({hms:hms});
        return Xjs.ui.DateAidInputer.defaultInputer || (Xjs.ui.DateAidInputer.defaultInputer = new Xjs.ui.DateAidInputer());
    }
});
/*xjs/ui/Menu.java*/
Xjs.ui.Menu=function(config){
    Xjs.ui.Menu.superclass.constructor.call(this,config);
    if(this.iconPath)
    {
        this.iconPath = this.getReplacePath(this.iconPath);
    }
};
Xjs.extend(Xjs.ui.Menu,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.Menu",
    expandNodeOnOpen:2,
    /*xjs.ui.Menu.getReplacePath*/
    getReplacePath:function(path)
    {
        var p = path.indexOf("${theme}");
        if(p >= 0)
            path = path.substring(0,p) + Xjs.getThemePath() + path.substring(p + 8);
        return path;
    },
    /*xjs.ui.Menu._createDOM*/
    _createDOM:function(root)
    {
        if(!this.iconPath)
            this.iconPath = Xjs.getThemePath() + "/res/tree/";
        this._$toggleExpand = Function.bindAsEventListener(this._toggleExpand,this);
        this._$openNode = Function.bindAsEventListener(this._openNode,this);
        if(!this.nodes && this.selectOptions)
        {
            this.nodes = [];
            this._createNodesBySelopts(this.getSelectOptions(),0,"",this.nodes);
        }
        this.listDOM = Xjs.ui.Menu.superclass._createDom0.call(this,root,"div");
        var dom = this._createMenuDOM(this.listDOM);
        if(this.background)
            dom.style.background = this.background;
        return this.listDOM = dom;
    },
    /*xjs.ui.Menu._createNodesBySelopts*/
    _createNodesBySelopts:function(optData,iFrom,prefixLvCode,nodes)
    {
        var lvColumn = this.lvColumn || 0;
        if(this.lvColumn === undefined && this.selectOptions instanceof Xjs.dx.CodeData)
        {
            var lv = this.selectOptions.lvColumn;
            if(lv > 0)
                lv = lvColumn;
        }
        var nPrefix = prefixLvCode.length,
            i = iFrom;
        if(optData != null)
            for(;i < optData.length;)
            {
                var a = optData[i];
                if(!Xjs.isArray(a))
                    a = [a];
                var lvCode = a[lvColumn];
                if(lvCode.length <= nPrefix || lvCode.substring(0,nPrefix) != prefixLvCode)
                    break;
                var value = a[0],
                    text = a.length < 2 ? value : (this.showCode && value != a[1] ? value + ":" + a[1] : a[1]),
                    node = {value:value,content:text},
                    subNodes = [];
                i += 1 + this._createNodesBySelopts(optData,i + 1,lvCode,subNodes);
                if(subNodes.length > 0)
                    node.nodes = subNodes;
                nodes.push(node);
            }
        return i - iFrom;
    },
    /*xjs.ui.Menu.isLeaf*/
    isLeaf:function(node)
    {
        return !node.nodes;
    },
    /*xjs.ui.Menu.onExpand*/
    onExpand:Xjs.emptyFn,
    /*xjs.ui.Menu.collapse*/
    collapse:function(node)
    {
        if(node.expanded && node.nodes != null)
        {
            node.expanded = false;
            if(node.childrenDom != null)
                node.childrenDom.style.display = "none";
            this.onExpand(node,false);
        }
    },
    /*xjs.ui.Menu.expand*/
    expand:function(node)
    {
        if(!node.expanded && node.nodes != null && !((node.mflags || 0) & 2))
        {
            node.expanded = true;
            if(node.childrenDom != null)
                node.childrenDom.style.display = "block";
            this.onExpand(node,false);
        }
    },
    /*xjs.ui.Menu.setSelectedNode*/
    setSelectedNode:function(n)
    {
        if(this.seledNodeCls && this.seledNode && this.seledNode.dom)
            Xjs.DOM.removeClass(this.seledNode.dom,this.seledNodeCls);
        this.seledNode = n;
        if(this.seledNodeCls && this.seledNode && this.seledNode.dom)
            Xjs.DOM.addClass(this.seledNode.dom,this.seledNodeCls);
    },
    /*xjs.ui.Menu.openNode*/
    openNode:function(node)
    {
        if(this.handler)
            this.handler.call(this.scope || this,node,this);
        if(node.handler)
        {
            if(node.handlerArgs != null)
                node.handler.apply(node.handlerScope || node,node.handlerArgs);
            else 
                node.handler.call(node.handlerScope || node,node,this);
        }
        if(node.command)
            this.fireEventE("performCommand",node.command,node);
        if(node.url != null)
        {
            window.open(node.url,node.target || this.target || "_blank",node.features || this.openFeatures);
        }
        this.setSelectedNode(node);
    },
    /*xjs.ui.Menu.toggleExpand*/
    toggleExpand:function(node)
    {
        if(node.expanded)
            this.collapse(node);
        else 
            this.expand(node);
    },
    /*xjs.ui.Menu._toggleExpand*/
    _toggleExpand:function(e)
    {
        var n = Xjs.ui.Menu._getNodeByDOM(e.srcElement || e.target);
        if(n)
            this.toggleExpand(n);
    },
    /*xjs.ui.Menu._openNode*/
    _openNode:function(e)
    {
        var n = Xjs.ui.Menu._getNodeByDOM(e.srcElement || e.target);
        if(this.setValueOnClickNode)
        {
            this.value = n.value;
        }
        if(this.fireValueChangedOnClickNode)
        {
            this.onChanged(e,0);
        }
        if(n)
        {
            if(this.expandNodeOnOpen == 1)
                this.expand(n);
            else if(this.expandNodeOnOpen == 2)
                this.toggleExpand(n);
            this.openNode(n);
        }
    },
    /*xjs.ui.Menu.setSelectOptions*/
    setSelectOptions:function(selectOptions)
    {
        this.selectOptions = selectOptions;
        if(this.listDOM)
        {
            Xjs.DOM.removeAllChild(this.listDOM);
            this.nodes = [];
            this._createNodesBySelopts(this.getSelectOptions(),0,"",this.nodes);
            this._createMenuDOM(this.listDOM);
            if(this.value != null && this.checkNode)
            {
                this._updateChecked();
            }
        }
    }
});
Xjs.apply(Xjs.ui.Menu,{
    /*xjs.ui.Menu._getNodeByDOM*/
    _getNodeByDOM:function(dom)
    {
        for(;dom != null;dom = dom.parentNode)
        {
            if(dom._$node)
                return dom._$node;
        }
        return null;
    },
    /*xjs.ui.Menu.getNodeLevel*/
    getNodeLevel:function(node)
    {
        return node != null ? 1 + Xjs.ui.Menu.getNodeLevel(node.parent) : -1;
    },
    /*xjs.ui.Menu.getNodeByCommand*/
    getNodeByCommand:function(nodes,command)
    {
        if(nodes)
            for(var i=0;i < nodes.length;i++)
            {
                if(command == nodes[i].command)
                    return nodes[i];
                if(nodes[i].nodes)
                {
                    var n = Xjs.ui.Menu.getNodeByCommand(nodes[i].nodes,command);
                    if(n)
                        return n;
                }
            }
        return null;
    },
    /*xjs.ui.Menu.setAttachDomEnabled*/
    setAttachDomEnabled:function(e,enabled)
    {
        if(e)
        {
            if(enabled)
            {
                if(e.disabled)
                    e.disabled = false;
                Xjs.DOM.removeClass(e,"ui-disabled");
            } else 
            {
                e.disabled = true;
                Xjs.DOM.addClass(e,"ui-disabled");
            }
        }
    },
    /*xjs.ui.Menu.setNodeEnabled*/
    setNodeEnabled:function(n,enabled)
    {
        if(n && n.disabled != !enabled)
        {
            if(enabled)
                delete n.disabled;
            else 
                n.disabled = true;
            if(n.attachedDom)
            {
                Xjs.ui.Menu.setAttachDomEnabled(n.attachedDom,enabled);
            }
            Xjs.ui.Menu._updateBgIcon(n,null);
        }
    },
    /*xjs.ui.Menu.setAttachedDomEnabled*/
    setAttachedDomEnabled:function(n)
    {
        if(n.attachedDom)
        {
            Xjs.ui.Menu.setAttachDomEnabled(n.attachedDom,!n.disabled);
        }
    },
    /*xjs.ui.Menu.updateNodeCheckIcon*/
    updateNodeCheckIcon:function(n)
    {
        if(!n.checkMode || n._textDOM == null)
            return;
        var iconSrc = Xjs.getThemePath() + "/res/checkbox" + (n.checked ? 1 : 0) + ".png";
        n._textDOM.style.background = "url(" + iconSrc + ") no-repeat transparent";
    },
    /*xjs.ui.Menu.setNodeVisible*/
    setNodeVisible:function(n,visible)
    {
        if(n.visible != visible)
        {
            n.visible = !!visible;
            if(n.dom)
            {
                var ns = n.dom.style;
                if(n.$styleDisplay === undefined)
                    n.$styleDisplay = ns.display == "none" ? "" : ns.display;
                ns.display = visible ? n.$styleDisplay || "" : "none";
            }
            if(n.attachedDom)
                Xjs.ui.MenuPane.setAttachedDomVisible(n);
        }
    },
    /*xjs.ui.Menu.setNodeVisibleByChild*/
    setNodeVisibleByChild:function(n)
    {
        if(n && n.nodes)
        {
            var v = false;
            for(var i=0;i < n.nodes.length;i++)
            {
                if(n.nodes[i].visible)
                {
                    v = true;
                    break;
                }
            }
            Xjs.ui.Menu.setNodeVisible(n,v);
        }
    },
    /*xjs.ui.Menu.isNodeVisible*/
    isNodeVisible:function(node)
    {
        return node.visible;
    },
    /*xjs.ui.Menu.setNodeText*/
    setNodeText:function(node,text)
    {
        node.text = text;
        if(node.sdom)
        {
            Xjs.DOM.setTextContent(node.sdom,text);
        }
        Xjs.ui.MenuPane.setAttachedDomText(node);
    },
    /*xjs.ui.Menu.setNodeHtml*/
    setNodeHtml:function(node,html)
    {
        var dom = node.sdom;
        if(dom != null)
            dom.innerHTML = html;
    },
    /*xjs.ui.Menu.getNodeXProp*/
    getNodeXProp:function(n,nm)
    {
        return n.xprops == null ? null : n.xprops[nm];
    },
    /*xjs.ui.Menu._updateBgIcon*/
    _updateBgIcon:function(node,nodeDOM,flags)
    {
        if(nodeDOM == null)
            nodeDOM = node._textDOM || node.dom;
        if(nodeDOM == null)
            return;
        var disabled = node.disabled || node.pMenu && node.pMenu.disabled;
        {
            nodeDOM.disabled = disabled;
            if(disabled)
            {
                if(nodeDOM.className == null || nodeDOM.className.indexOf("disabled") < 0)
                    Xjs.DOM.addClass(nodeDOM,"disabled");
            } else 
            {
                if(nodeDOM.className != null && nodeDOM.className.indexOf("disabled") >= 0)
                    Xjs.DOM.removeClass(nodeDOM,"disabled");
            }
        }
    },
    /*xjs.ui.Menu.addChildNode*/
    addChildNode:function(rootNode,commandPath,config,configPath)
    {
        if(commandPath == null)
            return null;
        if(typeof(commandPath) == "string")
            commandPath = commandPath.split("|");
        var cmd = commandPath[0];
        if(!rootNode.nodes)
            rootNode.nodes = [];
        if(cmd == null || cmd == "")
            return null;
        var nodes = rootNode.nodes,
            n = nodes.length,
            toNode = null;
        for(var i=0;i < n;i++)
        {
            if(nodes[i].command == cmd)
            {
                toNode = nodes[i];
                break;
            }
        }
        if(!toNode)
        {
            toNode = {command:cmd,parent:rootNode};
            if(configPath && configPath.length > 0)
                Xjs.apply(toNode,configPath[0]);
            nodes.push(toNode);
            if(rootNode.popupMenu)
                delete rootNode.popupMenu;
        }
        if(commandPath.length <= 1)
        {
            Xjs.apply(toNode,config);
            if(window.xjsConfig && window.xjsConfig.dftMenuNodeVisable !== undefined && toNode.visible === undefined)
                toNode.visible = window.xjsConfig.dftMenuNodeVisable;
            return toNode;
        }
        return Xjs.ui.Menu.addChildNode(toNode,(commandPath).slice(1),config,configPath != null && configPath.length > 1 ? configPath.slice(1) : null);
    }
});
/*xjs/ui/ULComponent.java*/
Xjs.ui.ULComponent=function(config){
    Xjs.ui.ULComponent.superclass.constructor.call(this,config);
    this.dislayValues = {};
    this.values = new Xjs.util.SortedArray(null);
    if(this.value != null)
    {
        this.updateValues(this.value);
    }
};
Xjs.extend(Xjs.ui.ULComponent,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.ULComponent",
    /*xjs.ui.ULComponent.setULDOM*/
    setULDOM:function(ulDOM)
    {
        this.ulDOM = ulDOM;
    },
    /*xjs.ui.ULComponent.setLIHTML*/
    setLIHTML:function(liHTML)
    {
        this.liHTML = liHTML;
    },
    /*xjs.ui.ULComponent.createUL*/
    createUL:function()
    {
        var ulDOM = document.createElement("ul");
        if(this.ulClassName)
            ulDOM.className = this.ulClassName;
        else if(!this.domTag && this.className)
            ulDOM.className = this.className;
        return ulDOM;
    },
    /*xjs.ui.ULComponent._createDOM*/
    _createDOM:function(root)
    {
        if(!this.ulDOM)
            this.ulDOM = this.createUL();
        if(this.domTag == null)
            return this.ulDOM;
        var d = this._createDom0(root,this.domTag);
        d.appendChild(this.ulDOM);
        return d;
    },
    /*xjs.ui.ULComponent.setShowCode*/
    setShowCode:function(showCode)
    {
        this.showCode = showCode;
    },
    /*xjs.ui.ULComponent.createLI*/
    createLI:function(value)
    {
        var s = this.dislayValues[value];
        if(s == null)
            s = value == null ? "" : value.toString();
        if(this.showCode && value != s)
            s = value + ":" + s;
        return this.createLIS(value,s,false);
    },
    /*xjs.ui.ULComponent.createLIS*/
    createLIS:function(value,s,htmlV)
    {
        var html = this.liHTML,
            p = html.indexOf("${VALUE}");
        if(!htmlV)
            s = Xjs.HtmlUTIL.htmlEncode(s);
        if(p >= 0)
            html = html.substring(0,p) + s + html.substring(p + 8);
        else 
            html = s;
        var li = document.createElement("li");
        if(this.liWidth > 0)
            li.style.width = this.liWidth + "px";
        li.innerHTML = html;
        li._value = value;
        var delIcon = Xjs.DOM.findById("DelItemIcon",li);
        if(delIcon != null)
        {
            if(this._fnOnClickDelValue == null)
                this._fnOnClickDelValue = Function.bindAsEventListener(this.onItemDelClick,this);
            delIcon.onclick = this._fnOnClickDelValue;
        }
        return li;
    },
    /*xjs.ui.ULComponent.renderList*/
    renderList:Xjs.emptyFn,
    /*xjs.ui.ULComponent.onDomCreated*/
    onDomCreated:function(root)
    {
        Xjs.ui.ULComponent.superclass.onDomCreated.call(this,root);
        if(this.value != null)
        {
            this.setValue(this.value);
        }
        this.renderList();
    },
    /*xjs.ui.ULComponent.updateValues*/
    updateValues:function(value)
    {
        var changed = false;
        if(value == null)
        {
            if(this.values.size() == 0)
                return false;
            this.values.clear();
            changed = true;
        } else 
        {
            var a;
            if(Xjs.isArray(value))
                a = value;
            else if(typeof(value) == "string")
                a = value.split(",");
            else if((this.valueOpts & 2) != 0 && typeof(value) == "number")
            {
                var x = value;
                a = [];
                for(var j=0;j < 32;j++)
                {
                    var v = 1 << j;
                    if((x & v) != 0)
                        a.push(v);
                }
            } else 
                a = [value];
            a.sort();
            for(var j=this.values.size() - 1;j >= 0;j--)
            {
                var v = this.values.get(j);
                if(Array.binarySearch(a,v) < 0)
                {
                    this.values.removeByIndex(j);
                    changed = true;
                }
            }
            for(var i=0;i < a.length;i++)
            {
                if(this.values.indexOf(a[i]) < 0)
                {
                    this.values.add(a[i]);
                    changed = true;
                }
            }
        }
        return changed;
    },
    /*xjs.ui.ULComponent.indexOfItem*/
    indexOfItem:function(value)
    {
        return this.values.indexOf(value);
    },
    /*xjs.ui.ULComponent.getItemCount*/
    getItemCount:function()
    {
        return this.values.size();
    },
    /*xjs.ui.ULComponent.getValue*/
    getValue:function()
    {
        var n;
        if((n = this.values.size()) == 0)
        {
            return null;
        }
        if((this.valueOpts & 8) != 0)
            return this.values.toArray();
        if((this.valueOpts & 2) != 0)
        {
            var v = 0;
            for(var i=0;i < this.values.size();i++)
            {
                var x = this.values.get(i);
                if(typeof(x) == "number")
                    v |= x;
                else 
                    v |= parseInt(x);
            }
            return v;
        }
        if(n == 1)
            return this.values.get(0);
        return this.values.join(",");
    },
    /*xjs.ui.ULComponent.getValues*/
    getValues:function()
    {
        return this.values.size() == 0 ? null : this.values.toArray();
    }
});
/*xjs/ui/layout/Layout.java*/
Xjs.ui.Layout=function(config){
    Xjs.ui.Layout.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.Layout,Xjs.Object,{
  _js$className_:"Xjs.ui.Layout",
    /*xjs.ui.layout.Layout.relayoutItems*/
    relayoutItems:Xjs.emptyFn
});
/*xjs/canvas/GradientColors.java*/
Xjs.namespace("Xjs.canvas");
Xjs.canvas.GradientColors=function(){
    this.colors = [];
    var n = arguments.length;
    if(n > 1)
        for(var i=0;i < n;i++)
        {
            this.colors.push({start:i / (n - 1),color:arguments[i]});
        }
};
Xjs.apply(Xjs.canvas.GradientColors.prototype,{
    /*xjs.canvas.GradientColors.addColor*/
    addColor:function(start,color)
    {
        this.colors.push({start:start,color:color});
    }
});
/*xjs/core/Ajax.java*/
Xjs.Ajax=function(config){
    Xjs.apply(this,config);
    if(!this.conn)
        this.conn = Xjs.Ajax.createConnection();
};
Xjs.apply(Xjs.Ajax.prototype,{
    postBody:null,
    enableJsonDec:true,
    accept:"application/json, text/plain",
    /*xjs.core.Ajax.setRequestHeaders*/
    setRequestHeaders:function()
    {
        if(this.header)
        {
            for(var p in this.header)
            {
                this.conn.setRequestHeader(p,this.header[p]);
            }
        }
        if(this.contentType)
            this.conn.setRequestHeader("Content-type",this.contentType);
        if(this.accept)
            this.conn.setRequestHeader("Accept",this.accept);
    },
    /*xjs.core.Ajax.addReauestHeader*/
    addReauestHeader:function(name,value)
    {
        if(!this.header)
        {
            this.header = {};
        }
        this.header[name] = value;
    },
    /*xjs.core.Ajax.request*/
    request:function()
    {
        var sReqP = "";
        if(this.reqParams)
        {
            var jsonP = this.jsonEncodeParam,
                pm = {};
            for(var p in this.reqParams)
            {
                var v = this.reqParams[p];
                if(typeof(v) == "string" || !jsonP)
                    pm[p] = v;
                else 
                    pm["__Json_." + p] = Xjs.JSON.encode(v,null,this.quotJsonName ? 1 : 0);
            }
            sReqP = Xjs.urlEncode(pm);
        }
        var parameters = this.parameters || "",
            url = this.url,
            method = this.method || "post";
        if(parameters.length > 0)
            url += (url.indexOf("?") > 0 ? "&" : "?") + parameters;
        if(sReqP.length > 0 && method != "post")
            url += (url.indexOf("?") > 0 ? "&" : "?") + sReqP;
        if(Xjs.sresRandomVer && method.toLowerCase() == "get")
            url += (url.indexOf("?") > 0 ? "&" : "?") + "__$v_=" + Xjs.sresRandomVer;
        var asyn = this.success != null || this.onready != null;
        this.conn.open(method,url,asyn);
        var post = this.postBody;
        if(sReqP.length > 0 && method == "post")
        {
            post = post == null || post.length == 0 ? sReqP : post + "&" + sReqP;
        }
        if(this.overrideMimeType && this.conn.overrideMimeType)
            this.conn.overrideMimeType(this.overrideMimeType);
        this.setRequestHeaders();
        if(asyn)
        {
            this.conn.onreadystatechange = this.onReadyStateChange.createDelegate(this);
        }
        if(this.responseType)
        {
            this.conn.responseType = this.responseType;
        }
        if(this.onposting)
        {
            this.onposting.call();
        }
        var htmlCls = document.getElementsByTagName("html")[0].classList;
        if(htmlCls)
            htmlCls.add("ui-in-ajax");
        try
        {
            this.conn.send(post);
        }finally
        {
            if(htmlCls)
                htmlCls.remove("ui-in-ajax");
        }
    },
    /*xjs.core.Ajax.responseIsSuccess*/
    responseIsSuccess:function()
    {
        var status = this.conn.status;
        return status === undefined || status == 0 || status >= 200 && status < 300;
    },
    /*xjs.core.Ajax.responseStatus*/
    responseStatus:function()
    {
        return this.conn.status;
    },
    /*xjs.core.Ajax.getResponseHeader*/
    getResponseHeader:function(name)
    {
        return this.conn.getResponseHeader(name);
    },
    /*xjs.core.Ajax.onReadyStateChange*/
    onReadyStateChange:function()
    {
        var status = this.conn.status,
            self = this;
        {
            var readyState = this.conn.readyState;
            if(this.onready)
            {
                setTimeout(function(){
            self.onready.call(self,readyState);
        },0);
            }
            if(readyState == 4 && this.success)
            {
                var v;
                try
                {
                    v = this.getResponse(this.enableJsonDec);
                }catch(ex)
                {
                    this._onError(0,ex);
                    return;
                }
                setTimeout(function(){
            self.success.call(v,status);
        },0);
            }
        }
    },
    /*xjs.core.Ajax._onError*/
    _onError:function(status,ex)
    {
        var self = this;
        if(this.error)
        {
            setTimeout(function(){
            self.error.call(ex,status);
        },0);
        }
    },
    /*xjs.core.Ajax.getResponse*/
    getResponse:function(jsonDec)
    {
        var ct = this.getResponseHeader("Content-type"),
            p = ct == null ? -1 : ct.indexOf(";");
        if(p >= 0)
            ct = ct.substring(0,p);
        var s = this.conn.response;
        if(this.responseIsSuccess())
        {
            if(ct != "application/json" || !jsonDec)
                return s;
            var v = eval("(" + s + ")");
            if(v instanceof Error)
                throw v;
            return v;
        } else 
        {
            var ex = null;
            try
            {
                if(ct != "application/json")
                {
                    ex = new Error(s);
                } else 
                {
                    if((s = s.trim()).length > 2 && s.charCodeAt(0) == 0x7b && s.charCodeAt(s.length - 1) == 0x7d)
                        s = "(" + s + ")";
                    var v = eval(s);
                    if(v instanceof Error)
                        ex = v;
                    else if(typeof(v) != "object")
                        ex = new Error(v == null ? null : v.toString());
                    else 
                    {
                        ex = new Error();
                        Xjs.apply(ex,v);
                    }
                }
            }catch(e)
            {
            }
            throw ex != null ? ex : new Error("调用失败:ResponseStatus=" + this.responseStatus());
        }
    },
    /*xjs.core.Ajax.promise*/
    promise:function()
    {
        var _a = this;
        return new Promise(function(resolve,reject){
            _a.success = new Xjs.FuncCall(resolve,window);
            _a.error = new Xjs.FuncCall(reject,window);
            _a.request();
        });
    }
});
Xjs.apply(Xjs.Ajax,{
    activeX:["MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],
    /*xjs.core.Ajax.createConnection*/
    createConnection:function()
    {
        try
        {
            return new XMLHttpRequest();
        }catch(e)
        {
        }
        for(var i=0;i < Xjs.Ajax.activeX.length;++i)
        {
            try
            {
                return new ActiveXObject(Xjs.Ajax.activeX[i]);
            }catch(e)
            {
            }
        }
        return null;
    },
    /*xjs.core.Ajax.ajax*/
    ajax:function(p)
    {
        var ajax = new Xjs.Ajax(p);
        ajax.request();
        return ajax.getResponse(ajax.enableJsonDec);
    },
    /*xjs.core.Ajax.get*/
    get:function(url,parameter,options)
    {
        return Xjs.Ajax.invoke(url,null,parameter,"get",options);
    },
    /*xjs.core.Ajax.invoke*/
    invoke:function(url,cmdOrBody,parameter,method,options,success,error)
    {
        options = options || 0;
        var json = !(options & 1),
            jsonP = !(options & 2),
            jsonN = !(options & 16),
            cmdAsBody = cmdOrBody != null,
            s,
            boundary = null;
        if(method)
            method = method.toLowerCase();
        {
            var reqParams = {};
            if(parameter)
                for(var p in parameter)
                {
                    var v = parameter[p],
                        type;
                    if((type = typeof(v)) == "string" || !jsonP || !jsonN && (type == "number" || type == "boolean"))
                        reqParams[p] = v;
                    else 
                        reqParams["__Json_." + p] = Xjs.JSON.encode(v,null,(options & 4) != 0 ? 1 : 0);
                }
            s = Xjs.urlEncode(reqParams);
        }
        var lastModified = null,
            ajax0 = null;
        for(var step=0;step <= 1;step++)
        {
            var header = {};
            if(lastModified != null)
                header["If-Modified-Since"] = lastModified;
            var contentType;
            if(boundary)
                contentType = "multipart/form-data; boundary=" + boundary;
            else if(method == "get")
                contentType = null;
            else if(cmdAsBody)
                contentType = "application/json;charset=utf-8";
            else 
                contentType = "application/x-www-form-urlencoded;charset=utf-8";
            var ajax = new Xjs.Ajax({url:url,contentType:contentType,header:header});
            if(method)
            {
                ajax.method = method;
            }
            if(method == "get")
            {
                ajax.parameters = s;
            } else if(cmdAsBody)
            {
                ajax.postBody = Xjs.JSON.encode(cmdOrBody,null,(options & 4) != 0 ? 1 : 0);
            } else 
            {
                ajax.postBody = s;
            }
            ajax.enableJsonDec = json;
            if(success)
                ajax.success = success;
            if(error)
                ajax.error = error;
            try
            {
                ajax.request();
            }catch(ex)
            {
                window.console.log("ajax.request : code=" + ex.code + ",name=" + ex.name + " :" + ex.message);
                if(ex.name == "NetworkError")
                {
                    var newEx = new Error("网络异常:服务器连接失败");
                    newEx.code = ex.code;
                    newEx.name = "NetworkError";
                    throw newEx;
                }
                throw ex;
            }
            if(success)
            {
                return;
            }
            if((Xjs.isIE || Xjs.isTrident) && method == "get" && step == 0 && !ajax.conn.getResponseHeader("Date"))
            {
                lastModified = ajax.conn.getResponseHeader("Last-Modified");
                if(lastModified)
                {
                    ajax0 = ajax;
                    continue;
                }
            }
            if(step == 1 && ajax.responseStatus() == 304)
            {
                ajax = ajax0;
            }
            return ajax.getResponse(json);
        }
        throw new java.lang.RuntimeException();
    },
    /*xjs.core.Ajax.postOpen*/
    postOpen:function(uri,params,target)
    {
        var dom = document.createElement("form");
        dom.method = "post";
        dom.style.display = "none";
        if(target != null)
            dom.target = target;
        dom.action = uri;
        if(params != null)
            for(var p in params)
            {
                var v = params[p],
                    name;
                if(typeof(v) == "string")
                    name = p;
                else 
                {
                    name = "__Json_." + p;
                    v = Xjs.JSON.encode(v);
                }
                var input = document.createElement("input");
                input.type = "hidden";
                input.name = name;
                input.value = v;
                dom.appendChild(input);
            }
        document.body.appendChild(dom);
        dom.submit();
        document.body.removeChild(dom);
    }
});
/*xjs/core/Data.java*/
Xjs.Data = {
    IntRegExpr:/^\s*-?\d+\s*$/,
    NumRegExpr:/^\s*[-+]?\d*(\.\d+)?\s*$/,
    IdRegExpr:/^[a-zA-Z_\$][a-zA-Z0-9_\$]*$/,
    HalfScaleFixed:1.0E-12,
    commaExp:/\,/g,
    /*xjs.core.Data.equals*/
    equals:function(v1,v2)
    {
        if(v1 == v2)
            return true;
        if(v1 instanceof Date && v2 instanceof Date)
        {
            return v1.getTime() == v2.getTime();
        }
        return false;
    },
    /*xjs.core.Data.arrayEquals*/
    arrayEquals:function(a1,a2)
    {
        if(a1 == a2)
            return true;
        var n = a1.length;
        if(n != a2.length)
            return false;
        for(var i=0;i < n;i++)
        {
            if(!Xjs.Data.equals(a1[i],a2[i]))
                return false;
        }
        return true;
    },
    /*xjs.core.Data.numScale*/
    numScale:function(v,deci,mode)
    {
        if(v == null)
            return null;
        if(mode === undefined)
            mode = 4;
        switch(mode)
        {
        case 1:
            {
                var p = Math.pow(10,deci);
                return (v >= 0 ? Math.floor(v * p) : Math.ceil(v * p)) / p;
            }
        case 0:
            {
                var p = Math.pow(10,deci);
                return (v < 0 ? Math.floor(v * p) : Math.ceil(v * p)) / p;
            }
        }
        return parseFloat((v > 0 ? v + Xjs.Data.HalfScaleFixed : v - Xjs.Data.HalfScaleFixed).toFixed(deci));
    },
    /*xjs.core.Data.parseFromSqlType*/
    parseFromSqlType:function(value,sqlType)
    {
        if(value == null)
            return null;
        var initValue = value,
            s,
            typeV = typeof(value);
        if(typeV == "string" && (value = String.rtrim(value)).length == 0)
        {
            return null;
        }
        switch(sqlType)
        {
        case 4:
            if(typeV == "number")
                return value;
            value = parseInt(s = value.toString());
            if(isNaN(value) || !Xjs.Data.IntRegExpr.test(s))
            {
                throw new Error(Xjs.ResBundle.getString("ERRUI","ErrorDataformat.Integer",initValue));
            }
            return value;
        case 2:
            if(typeV == "number")
                return value;
            s = value.toString().replace(Xjs.Data.commaExp,"").trim();
            if(s.length == 0)
                return null;
            value = parseFloat(s);
            if(isNaN(value) || !Xjs.Data.NumRegExpr.test(s))
            {
                throw new Error(Xjs.ResBundle.getString("ERRUI","ErrorDataformat.Number",initValue));
            }
            return value;
        case -7:
            if(typeV == "boolean")
                return value;
            if(typeV == "string")
                return value.toLowerCase().trim() == "true";
            return !!value;
        case 91:
        case 92:
        case 93:
            if(value instanceof Date)
                return value;
            value = Date.parseDate(value,1);
            if(!value)
                throw new Error(Xjs.ResBundle.getString("ERRUI","ErrorDataformat.Date",initValue));
            return value;
        default:
            return value;
        }
    },
    /*xjs.core.Data.flagSqlType*/
    flagSqlType:function(sqlType)
    {
        var flag = 0;
        if(sqlType >= 2 && sqlType <= 8 || sqlType == -6 || sqlType == -5)
        {
            flag |= 1;
            if(sqlType == 2 || sqlType == 3 || sqlType == 6 || sqlType == 7 || sqlType == 8)
                flag |= 2;
            if(sqlType == 2 || sqlType == 3)
                flag |= 16;
        } else if(sqlType == 12 || sqlType == 1)
            flag |= 4;
        else if(sqlType >= 91 && sqlType <= 93)
            flag |= 8;
        else if(sqlType == -7)
            flag |= 32;
        return flag;
    }
};
Xjs.apply(Date,{
    deltaFromServer:0,
    lastGet:0,
    /*xjs.core.XDate.toDate*/
    toDate:function(year,month,day,hours,min,sec,millSec)
    {
        return new Date(year,month - 1,day || 1,hours || 0,min || 0,sec || 0,millSec || 0);
    },
    /*xjs.core.XDate.getDaysOfMonth*/
    getDaysOfMonth:function(y,m)
    {
        var d = new Date(m == 12 ? y + 1 : y,m == 12 ? 0 : m,1);
        d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
        return d.getDate();
    },
    /*xjs.core.XDate.today*/
    today:function()
    {
        var date = new Date();
        return new Date(date.getFullYear(),date.getMonth(),date.getDate());
    },
    /*xjs.core.XDate.getServerTime*/
    getServerTime:function()
    {
        var date = new Date(),
            t0 = date.getTime(),
            t = t0 + Date.deltaFromServer;
        if(Date.lastGet != 0 && t - Date.lastGet > -10 * 60 * 1000 && t - Date.lastGet < 10 * 60 * 1000)
        {
            return new Date(t);
        }
        var st = Xjs.RInvoke.rmInvoke("snsoft.commons.util.DateUtils.todayTime");
        if(st == null)
            return date;
        Date.deltaFromServer = st - t0;
        return new Date(Date.lastGet = st);
    },
    /*xjs.core.XDate.parseDate*/
    parseDate:function(text,opts)
    {
        if(typeof(text) != "string")
        {
            return Xjs.isDate(text) ? text : null;
        }
        text = text.trim();
        var len = text.length,
            a = [0,0,0,0,0,0,0];
        forA:{
            if(len == 8 && opts & 1 && Xjs.Data.IntRegExpr.test(text))
            {
                a[0] = parseInt(text.substring(0,4));
                a[1] = parseInt(text.substring(4,6));
                a[2] = parseInt(text.substring(6,8));
                break forA;
            }
            var i = 0,
                start = 0;
            for(;i < 7 && start < len;i++)
            {
                var p = i == 6 ? len : text.indexOf(i == 5 ? "." : (i == 2 ? " " : (i < 2 ? "-" : ":")),start);
                if(p < 0)
                    p = len;
                var s = text.substring(start,p).trim();
                if(!Xjs.Data.IntRegExpr.test(s))
                {
                    return null;
                }
                a[i] = parseInt(s,10);
                start = p + 1;
            }
            if(i < 3)
                return null;
        }
        if(a[0] >= 0 && a[0] < 100)
        {
            if(a[0] >= 70)
                a[0] += 1900;
            else 
                a[0] += 2000;
        }
        if(a[0] < 1000 || a[0] > 9999 || a[1] < 1 || a[1] > 12 || a[2] < 0 || a[2] > Date.getDaysOfMonth(a[0],a[1]) || a[3] < 0 || a[3] >= 24 || a[4] < 0 || a[4] >= 60 || a[5] < 0 || a[5] >= 60 || a[6] < 0 || a[6] >= 1000)
            return null;
        return new Date(a[0],a[1] - 1,a[2],a[3],a[4],a[5],a[6]);
    },
    /*xjs.core.XDate.parseDateMacro*/
    parseDateMacro:function(s)
    {
        var d = Date.today();
        if(s.startsWith("TODAY"))
        {
            s = s.substring(5);
        } else if(s.startsWith("MONTHDAYE"))
        {
            s = s.substring(9);
            d.setDate(Date.getDaysOfMonth(d.getFullYear(),d.getMonth() + 1));
        } else if(s.startsWith("MONTHDAY"))
        {
            s = s.substring(8);
            d.setDate(0);
        } else if(s.startsWith("WEEKDAY"))
        {
            s = s.substring(7);
            d.setDate(d.getDate() - d.getDay());
        } else if(s.startsWith("NEXTMDAY"))
        {
            var y = d.getFullYear(),
                m = d.getMonth() + 1;
            if(m >= 12)
            {
                m = 0;
                y++;
            }
            var maxDay = Date.getDaysOfMonth(y,m + 1),
                da = d.getDate();
            if(da > maxDay)
                da = maxDay;
            d.setDate(1);
            d.setFullYear(y);
            d.setMonth(m);
            d.setDate(da);
            s = s.substring(8);
        } else if(s.startsWith("NMONTHDAY"))
        {
            var y = d.getFullYear(),
                m = d.getMonth() + 1;
            if(m >= 12)
            {
                m = 0;
                y++;
            }
            d.setFullYear(y);
            d.setMonth(m);
            d.setDate(0);
            s = s.substring(9);
        } else 
        {
            return null;
        }
        if(s.length > 0)
            d.setDate(d.getDate() + parseInt(s));
        return d;
    }
});
Xjs.apply(Date.prototype,{
    /*xjs.core.XDate.format*/
    format:function(hmsFormat)
    {
        if(!hmsFormat)
            hmsFormat = 0;
        var options = hmsFormat >> 4;
        hmsFormat &= 0xf;
        var year = this.getFullYear(),
            month = this.getMonth() + 1,
            day = this.getDate(),
            yearText = year.toString();
        if(options & 1 && yearText.length > 2)
            yearText = yearText.substring(yearText.length - 2);
        var text = yearText + (month < 10 ? "-0" : "-") + month + (day < 10 ? "-0" : "-") + day;
        if(hmsFormat == 2)
            return text;
        var hour = this.getHours(),
            min = this.getMinutes();
        if(hmsFormat == 4)
            return text + " " + String.toStr2(hour) + ":" + String.toStr2(min);
        var sec = this.getSeconds(),
            minSec = this.getMilliseconds();
        if(hmsFormat == 1)
            return text + " " + String.toStr2(hour) + ":" + String.toStr2(min) + ":" + String.toStr2(sec);
        if(hour == 0 && min == 0 && sec == 0 && minSec == 0)
            return text;
        return sec == 0 && minSec == 0 ? text + " " + String.toStr2(hour) + ":" + String.toStr2(min) : text + " " + String.toStr2(hour) + ":" + String.toStr2(min) + ":" + String.toStr2(sec);
    }
});
Xjs.apply(String,{
    NonIdPartCharRegx:new RegExp("[^a-zA-Z0-9_\\$]","g"),
    /*xjs.core.XString.toStr2*/
    toStr2:function(x)
    {
        return x < 10 ? "0" + x : "" + x;
    },
    /*xjs.core.XString.toStr*/
    toStr:function(x,len)
    {
        var s = "" + x;
        return s.length < len ? String.newString(" ",len - s.length) + s : s;
    },
    /*xjs.core.XString.newString*/
    newString:function(c,count)
    {
        if(count <= 0)
            return "";
        var a = [];
        for(var i=0;i < count;i++)
            a[i] = c;
        return a.join("");
    },
    /*xjs.core.XString.replaceInvalidIdPart*/
    replaceInvalidIdPart:function(s)
    {
        if(s == null)
            return s;
        return s.replace(String.NonIdPartCharRegx,"_");
    },
    /*xjs.core.XString.isValidID*/
    isValidID:function(id)
    {
        return Xjs.Data.IdRegExpr.test(id);
    },
    /*xjs.core.XString.hexEncode*/
    hexEncode:function(text)
    {
        if(typeof(text) != "string")
            return null;
        var n = text.length,
            s = [];
        for(var i=0;i < n;i++)
        {
            var c = text.charCodeAt(i);
            for(var j=3;j >= 0;j--)
            {
                var x = c >> j * 4 & 0xf;
                s.push(String.fromCharCode(x < 10 ? 48 + x : 65 + x - 10));
            }
        }
        return s.join("");
    },
    /*xjs.core.XString.hasUChars*/
    hasUChars:function(s)
    {
        if(s == null)
            return false;
        var n = s.length;
        for(var i=0;i < n;i++)
        {
            if(s.charCodeAt(i) >= 0x80)
                return true;
        }
        return false;
    },
    /*xjs.core.XString.macroReplace*/
    macroReplace:function(s,macro,prefix,suffix,nullValue,nulValueDelim)
    {
        if(!macro || !prefix || !suffix)
            return s;
        var lprefix = prefix.length,
            lsuffix = suffix.length;
        for(var p0=0;;)
        {
            var p1 = s.indexOf(prefix,p0);
            if(p1 < 0)
                break;
            var p2 = s.indexOf(suffix,p1 + lprefix);
            if(p2 < 0)
                break;
            var nm = s.substring(p1 + lprefix,p2),
                nulV = nullValue;
            if(nulValueDelim != null)
            {
                var p = nm.indexOf(nulValueDelim);
                if(p >= 0)
                {
                    nulV = nm.substring(p + 1);
                    nm = nm.substring(0,p);
                }
            }
            var v = macro.get(nm);
            if(v == null)
                v = nulV;
            if(v != null)
            {
                v = v.toString();
                s = s.substring(0,p1) + v + s.substring(p2 + lsuffix);
                p0 = p1 + v.length;
            } else 
            {
                p0 = p2 + lsuffix;
            }
        }
        return s;
    },
    /*xjs.core.XString.paramReplace*/
    paramReplace:function(s)
    {
        for(var i=0;i < s.length - 1;)
        {
            if(s.charCodeAt(i) == 0x25)
            {
                var x = s.charCodeAt(i + 1);
                if(x < 0x30 || x > 0x39)
                {
                    i++;
                    continue;
                }
                var v = arguments[1 + x - 0x30];
                if(v == null)
                    v = "";
                var vs = "" + v;
                s = s.substring(0,i) + vs + s.substring(i + 2);
                i += vs.length;
            } else 
            {
                i++;
            }
        }
        return s;
    },
    /*xjs.core.XString.removeNumThouDelim*/
    removeNumThouDelim:function(s)
    {
        return s == null ? null : s.replace(new RegExp(",","g"),"");
    },
    /*xjs.core.XString.like*/
    like:function(text,pattern,ignoreCase)
    {
        return String.likeX5(text,pattern,ignoreCase,0,0);
    },
    /*xjs.core.XString.like*/
    likeX5:function(text,pattern,ignoreCase,oText,oPattern)
    {
        if(text == null)
            return pattern == null;
        var ltext = text.length - oText,
            lpattern = pattern.length - oPattern;
        for(var i=0;i < lpattern;i++)
        {
            var c = pattern.charCodeAt(i + oPattern);
            if(c == 0x2a || c == 0x25)
            {
                if(i == lpattern - 1)
                    return true;
                for(var iText=oText;iText < ltext + oText;iText++)
                    if(String.likeX5(text,pattern,ignoreCase,iText,oPattern + i + 1))
                        return true;
                return false;
            }
            if(i >= ltext)
                return false;
            if(c == 0x3f || c == 0x5f)
            {
                continue;
            }
            if(ignoreCase)
            {
                if(java.lang.Character.toUpperCase(c) != java.lang.Character.toUpperCase(text.charCodeAt(oText + i)))
                    return false;
            } else 
            {
                if(c != text.charCodeAt(oText + i))
                    return false;
            }
        }
        return ltext == lpattern || lpattern >= ltext + 1 && String.endsWithStarsPattern(pattern,ltext);
    },
    /*xjs.core.XString.endsWithStarsPattern*/
    endsWithStarsPattern:function(text,from)
    {
        if(from < 0)
            from = 0;
        for(;from < text.length;from++)
        {
            var c = text.charCodeAt(from);
            if(c != 0x2a && c != 0x25)
                return false;
        }
        return true;
    },
    /*xjs.core.XString.likeOneOf*/
    likeOneOf:function(text,patternlist,ignoreCase,patternPrifix,patternSuffix)
    {
        if(patternPrifix == null)
            patternPrifix = "";
        if(patternSuffix == null)
            patternSuffix = "";
        for(var i=0;i < patternlist.length;i++)
            if(String.likeX5(text,patternPrifix + patternlist[i] + patternSuffix,ignoreCase,0,0))
                return true;
        return false;
    },
    /*xjs.core.XString.likeOneOfN*/
    likeOneOfN:function(text,patternlist,ignoreCase,patternPrifix,patternSuffix)
    {
        if(patternPrifix == null)
            patternPrifix = "";
        if(patternSuffix == null)
            patternSuffix = "";
        var like = false;
        for(var i=0;i < patternlist.length;i++)
        {
            var s = patternlist[i],
                k = true;
            if(s.length > 0 && s.charCodeAt(0) == 0x7e)
            {
                k = false;
                s = s.substring(1);
            }
            if(String.likeX5(text,patternPrifix + s + patternSuffix,ignoreCase,0,0))
            {
                like = k;
            }
        }
        return like;
    },
    /*xjs.core.XString.likeOneOf2*/
    likeOneOf2:function(texta,patternlist,ignoreCase)
    {
        if(texta == null)
            return false;
        for(var i=0;i < texta.length;i++)
        {
            if(String.likeOneOf(texta[i],patternlist,ignoreCase))
                return true;
        }
        return false;
    },
    /*xjs.core.XString.objcat*/
    objcat:function(x1,join,x2)
    {
        if(x2 == null)
            return x1;
        if(x1 == null)
            return x2;
        return x1 + join + x2;
    },
    /*xjs.core.XString.format*/
    format:function(fmt)
    {
        var a = [],
            l = fmt.length;
        for(var i=0;i < l;)
        {
            var p = fmt.indexOf("%",i);
            if(p < i || p >= l - 1)
            {
                a.push(fmt.substring(i));
                break;
            }
            a.push(fmt.substring(i,p));
            var c = fmt.charCodeAt(p + 1);
            if(c >= 0x30 && c <= 0x39)
            {
                var j = c - 0x30,
                    c2;
                if(p + 2 < l && (c2 = fmt.charCodeAt(p + 2)) >= 0x30 && c2 <= 0x39)
                {
                    var j2 = 1 + j * 10 + (c2 - 0x30);
                    if(j2 < arguments.length)
                    {
                        if(arguments[j2] != null)
                            a.push(arguments[j2]);
                        i = p + 3;
                        continue;
                    }
                }
                j++;
                if(j < arguments.length && arguments[j] != null)
                    a.push(arguments[j]);
                i = p + 2;
            } else if(c == 0x25)
            {
                a.push("%");
                i = p + 2;
            } else 
            {
                a.push("%");
                i = p + 1;
            }
        }
        return a.join("");
    },
    /*xjs.core.XString.extractNumberStr*/
    extractNumberStr:function(s,opts)
    {
        if(s == null)
            return null;
        var sb = [],
            n = s.length,
            nd = 0;
        for(var i=0;i < n;i++)
        {
            var c = s.charCodeAt(i);
            if(c >= 0x30 && c <= 0x39)
            {
                sb.push(String.fromCharCode(c));
                nd++;
                continue;
            }
            if(c == 0x2d && opts & 2 && sb.length == 0)
            {
                opts &= ~2;
                sb.push(String.fromCharCode(c));
                continue;
            }
            if(c == 0x2e && opts & 1)
            {
                opts &= ~1;
                sb.push(String.fromCharCode(c));
                continue;
            }
            if(c == 0x2c && opts & 4)
            {
                continue;
            }
            if(c > 0x20 && sb.length > 0)
                break;
        }
        if(nd == 0)
            return null;
        return sb.join("");
    },
    /*xjs.core.XString.isStrIn*/
    isStrIn:function(strList,s,delimiter)
    {
        if(delimiter===undefined)
        {
            delimiter = ",";
        }
        return String.indexOf(strList,delimiter,s,false,false) >= 0;
    },
    /*xjs.core.XString.indexOf*/
    indexOf:function(str,delimiter,sub,trim,ignoreCase)
    {
        if(str == null || sub == null)
        {
            return -1;
        }
        var p0 = 0,
            n = str.length,
            cmpLen = sub.length,
            j = 0;
        for(var i=0;i <= n;i++)
        {
            if(i == n || str.charCodeAt(i) == delimiter.charCodeAt(0))
            {
                if(trim)
                {
                    if(ignoreCase ? str.substring(p0,i).trim().toLowerCase() == sub.toLowerCase() : str.substring(p0,i).trim() == sub)
                    {
                        return j;
                    }
                } else 
                {
                    if(cmpLen == i - p0)
                    {
                        if(ignoreCase)
                        {
                            var str1 = str.substring(p0,p0 + cmpLen),
                                sub1 = sub.substring(0,cmpLen);
                            if(str1 == sub1)
                            {
                                return j;
                            }
                        } else 
                        {
                            var str1 = str.substring(p0,p0 + cmpLen),
                                sub1 = sub.substring(0,cmpLen);
                            if(str1.toLowerCase() == sub1.toLowerCase())
                            {
                                return j;
                            }
                        }
                    }
                }
                p0 = i + 1;
                j++;
            }
        }
        return -1;
    },
    /*xjs.core.XString.obj2str*/
    obj2str:function(v,dft)
    {
        if(v)
        {
            return Xjs.Data.parseFromSqlType(v,12);
        }
        return dft;
    },
    /*xjs.core.XString.obj2int*/
    obj2int:function(v,dft)
    {
        if(dft===undefined)
        {
            dft = 0;
        }
        if(!v || v===undefined)
        {
            return dft;
        }
        return Number.obj2int(v,dft);
    },
    /*xjs.core.XString.obj2bool*/
    obj2bool:function(v,dft)
    {
        if(dft===undefined)
        {
            dft = false;
        }
        if(!v || v===undefined)
        {
            return dft;
        }
        return Xjs.Data.parseFromSqlType(v,-7);
    }
});
Xjs.apply(String.prototype,{
    /*xjs.core.XString.toLikeRegExpr*/
    toLikeRegExpr:function(flags)
    {
        var a = [],
            n = this.length,
            s1 = "\\^$.+{}()[]:=-|";
        for(var i=0;i < n;i++)
        {
            var c = this.charAt(i);
            if(c == "*" || c == "%")
            {
                a.push(".*");
                continue;
            }
            if(c == "?" || c == "_")
            {
                a.push(".?");
                continue;
            }
            var p = s1.indexOf(c);
            if(p > 0)
            {
                a.push("\\");
            }
            a.push(c);
        }
        return new RegExp("^" + a.join("") + "$",flags);
    }
});
/*xjs/core/DOM.java*/
Xjs.DOM = {
    borders:{l:"borderLeftWidth",r:"borderRightWidth",t:"borderTopWidth",b:"borderBottomWidth"},
    paddings:{l:"paddingLeft",r:"paddingRight",t:"paddingTop",b:"paddingBottom"},
    margins:{l:"marginLeft",r:"marginRight",t:"marginTop",b:"marginBottom"},
    PXEndSizeRegX:new RegExp("^\\d+px$"),
    DigEndSizeRegX:new RegExp("^\\d+$"),
    /*xjs.core.DOM.getHead*/
    getHead:function()
    {
        return Xjs.getHTMLHead();
    },
    /*xjs.core.DOM.getHeadScriptSrc*/
    getHeadScriptSrc:function(src)
    {
        var a = Xjs.DOM.getHead().getElementsByTagName("script");
        if(a)
            for(var i=0;i < a.length;i++)
            {
                if(a[i].src == src)
                    return a[i];
            }
        return null;
    },
    /*xjs.core.DOM.addHeadScript*/
    addHeadScript:function(url)
    {
        url = Xjs.toFullURL(url,0);
        var s = Xjs.DOM.getHeadScriptSrc(url);
        if(!s)
        {
            s = document.createElement("script");
            s.type = "text/javascript";
            s.async = false;
            s.src = url;
            Xjs.DOM.getHead().appendChild(s);
        }
    },
    /*xjs.core.DOM.getHeadLinkByHRef*/
    getHeadLinkByHRef:function(href)
    {
        var a = Xjs.DOM.getHead().getElementsByTagName("link");
        if(a)
            for(var i=0;i < a.length;i++)
            {
                if(a[i].href == href)
                    return a[i];
            }
        return null;
    },
    /*xjs.core.DOM.addHeaderCSSLink*/
    addHeaderCSSLink:function(src)
    {
        var p = src.indexOf("${theme}");
        if(p >= 0)
        {
            var s = window.EnvParameter ? window.EnvParameter.theme : null;
            src = src.substring(0,p) + (s || "theme0") + src.substring(p + 8);
        }
        src = Xjs.toFullURL(src,0);
        if(Xjs.DOM.getHeadLinkByHRef(src) != null)
            return;
        var s = document.createElement("link");
        s.href = src;
        s.rel = "stylesheet";
        Xjs.DOM.getHead().appendChild(s);
    },
    /*xjs.core.DOM.getStyle*/
    getStyle:function(dom,prop)
    {
        var view = document.defaultView;
        if(view && view.getComputedStyle)
        {
            var cs;
            if(cs = view.getComputedStyle(dom,""))
                return cs[prop];
            return null;
        } else if(dom.currentStyle)
        {
            return dom.currentStyle[prop];
        }
        var v;
        if(dom.style && (v = dom.style[prop]))
            return v;
        return null;
    },
    /*xjs.core.DOM.addStyles*/
    addStyles:function(dom,sides,styles)
    {
        var val = 0;
        for(var i=0,len=sides.length;i < len;i++)
        {
            var v = Xjs.DOM.getStyle(dom,styles[sides.charAt(i)]);
            if(v != null)
            {
                var w = parseFloat(v);
                if(w)
                {
                    val += w >= 0 ? w : -w;
                }
            }
        }
        return val;
    },
    /*xjs.core.DOM.toCamel*/
    toCamel:function(s)
    {
        var a = s.split("-"),
            n;
        if((n = a.length) <= 1)
            return s;
        for(var i=1;i < n;i++)
        {
            a[i] = a[i].charAt(0).toUpperCase() + a[i].substring(1);
        }
        return a.join("");
    },
    /*xjs.core.DOM.getBorder*/
    getBorder:function(dom,side)
    {
        return Xjs.DOM.addStyles(dom,side,Xjs.DOM.borders);
    },
    /*xjs.core.DOM.getPadding*/
    getPadding:function(dom,side)
    {
        return Xjs.DOM.addStyles(dom,side,Xjs.DOM.paddings);
    },
    /*xjs.core.DOM.getMargins*/
    getMargins:function(dom,side)
    {
        return Xjs.DOM.addStyles(dom,side,Xjs.DOM.margins);
    },
    /*xjs.core.DOM.getXY*/
    getXY:function(dom,clientXY)
    {
        if(dom.getBoundingClientRect)
        {
            var b = dom.getBoundingClientRect(),
                x = b.left,
                y = b.top;
            if(!clientXY)
            {
                if(Xjs.isIE)
                {
                    if(Xjs.isStrict)
                    {
                        x += document.documentElement.scrollLeft;
                        y += document.documentElement.scrollTop;
                    } else 
                    {
                        x += document.body.scrollLeft;
                        y += document.body.scrollTop;
                    }
                } else 
                {
                    x += window.pageXOffset;
                    y += window.pageYOffset;
                }
            }
            return {x:x,y:y};
        }
        var x = 0,
            y = 0;
        if(dom != document.body)
        {
            for(var d=dom;d && d != document.body;d = d.offsetParent)
            {
                x += d.offsetLeft;
                y += d.offsetTop;
            }
            for(var d=dom.parentNode;d && d != document.body;d = d.parentNode)
            {
                if(d.tagName != "TR" && d.style.display != "inline")
                {
                    x -= d.scrollLeft - (d.style.borderLeftWidth != "" ? parseInt(d.style.borderLeftWidth) : 0);
                    y -= d.scrollTop - (d.style.borderTopWidth != "" ? parseInt(d.style.borderTopWidth) : 0);
                }
            }
        }
        if(clientXY)
        {
            x -= document.body.scrollLeft;
            y -= document.body.scrollTop;
        }
        return {x:x,y:y};
    },
    /*xjs.core.DOM.scrollToDOM*/
    scrollToDOM:function(e,offX,offY)
    {
        if(typeof(e) == "string")
            e = Xjs.DOM.find(e,null);
        if(!e)
            return;
        var p = Xjs.DOM.getXY(e,false),
            s = Xjs.DOM.getScroll(null,null);
        if(typeof(offX) == "number")
            s.x = p.x + offX;
        if(typeof(offY) == "number")
            s.y = p.y + offY;
        window.scrollTo(s.x < 0 ? 0 : s.x,s.y < 0 ? 0 : s.y);
    },
    /*xjs.core.DOM.wscrollYToVisivle*/
    wscrollYToVisivle:function(e,minY)
    {
        if(typeof(e) == "string")
            e = Xjs.DOM.find(e,null);
        if(!e)
            return;
        var p = Xjs.DOM.getXY(e,true),
            s = Xjs.DOM.getScroll(null,null),
            wh = Xjs.DOM.getViewportHeight(),
            y = p.y,
            h = Xjs.DOM.getHeight(e);
        if(y < 0 || y + h > wh - minY)
        {
            var ty = window.scrollY + y;
            if(y > 0)
            {
                ty = ty + h - wh + minY;
            }
            if(ty < 0)
                ty = 0;
            window.scrollTo(s.x,ty);
        }
    },
    /*xjs.core.DOM.getRelativeXY*/
    getRelativeXY:function(dom,relativeTo)
    {
        var xy = Xjs.DOM.getXY(dom,true),
            rxy = Xjs.DOM.getXY(relativeTo,true);
        xy.x -= rxy.x;
        xy.y -= rxy.y;
        return xy;
    },
    /*xjs.core.DOM.getWidth*/
    getWidth:function(dom)
    {
        var w = dom.offsetWidth || 0;
        return w < 0 ? 0 : w;
    },
    /*xjs.core.DOM.getHeight*/
    getHeight:function(dom)
    {
        var h = dom.offsetHeight || 0;
        return h < 0 ? 0 : h;
    },
    /*xjs.core.DOM.getSize*/
    getSize:function(dom)
    {
        var w = dom.offsetWidth || 0,
            h = dom.offsetHeight || 0;
        return {width:w < 0 ? 0 : w,height:h < 0 ? 0 : h};
    },
    /*xjs.core.DOM.getOffsetTO*/
    getOffsetTO:function(dom,to)
    {
        var xy = {x:0,y:0};
        for(;dom != to && dom;)
        {
            xy.x += dom.offsetLeft;
            xy.y += dom.offsetTop;
            dom = dom.offsetParent;
            if(dom == to)
                return xy;
            if(Xjs.DOM.contains(dom,to))
            {
                xy.x += to.offsetLeft;
                xy.y += to.offsetTop;
                return xy;
            }
        }
        return xy;
    },
    /*xjs.core.DOM.getOffsetYTO*/
    getOffsetYTO:function(dom,to)
    {
        var y = 0;
        for(;dom != to;dom = dom.offsetParent)
            y += dom.offsetTop;
        return y;
    },
    /*xjs.core.DOM.setWidth*/
    setWidth:function(dom,w)
    {
        if(typeof(w) == "number")
        {
            var nw = w;
            if(!Xjs.isBorderBox)
            {
                nw -= Xjs.DOM.getBorder(dom,"lr") + Xjs.DOM.getPadding(dom,"lr");
            }
            nw -= Xjs.DOM.getMargins(dom,"lr");
            w = (nw < 0 ? 0 : nw) + "px";
        }
        dom.style.width = w;
    },
    /*xjs.core.DOM.setHeight*/
    setHeight:function(dom,h)
    {
        if(typeof(h) == "number")
        {
            var nh = h;
            if(!Xjs.isBorderBox)
            {
                nh -= Xjs.DOM.getBorder(dom,"tb") + Xjs.DOM.getPadding(dom,"tb");
            }
            nh -= Xjs.DOM.getMargins(dom,"tb");
            h = (nh < 0 ? 0 : nh) + "px";
        }
        dom.style.height = h;
    },
    /*xjs.core.DOM.remove*/
    remove:function(e)
    {
        if(e && e.parentNode)
            e.parentNode.removeChild(e);
    },
    /*xjs.core.DOM.isDisabled*/
    isDisabled:function(dom)
    {
        return Xjs.DOM.hasClass(dom,"ui-disabled");
    },
    /*xjs.core.DOM.hasClass*/
    hasClass:function(dom,cn)
    {
        if(dom.classList)
            return dom.classList.contains(cn);
        return cn && (" " + dom.className + " ").indexOf(" " + cn + " ") != -1;
    },
    /*xjs.core.DOM.isFixedSize*/
    isFixedSize:function(size)
    {
        var typeSize = typeof(size);
        if(typeSize == "number")
            return true;
        if(typeSize == "string")
        {
            return Xjs.DOM.PXEndSizeRegX.test(size) || Xjs.DOM.DigEndSizeRegX.test(size);
        }
        return false;
    },
    /*xjs.core.DOM.addClass*/
    addClass:function(dom,className)
    {
        if(!dom)
            return;
        if(dom.classList)
        {
            dom.classList.add(className);
        } else if(!Xjs.DOM.hasClass(dom,className))
        {
            if(dom.className == null || dom.className == "")
                dom.className = className;
            else 
                dom.className += " " + className;
        }
    },
    /*xjs.core.DOM.addOrRemoveClass*/
    addOrRemoveClass:function(dom,className,add)
    {
        if(add)
            Xjs.DOM.addClass(dom,className);
        else 
            Xjs.DOM.removeClass(dom,className);
    },
    /*xjs.core.DOM.toggleClass*/
    toggleClass:function(dom,cn)
    {
        if(dom.classList)
        {
            dom.classList.toggle(cn);
        } else if(Xjs.DOM.hasClass(dom,cn))
        {
            Xjs.DOM.removeClass(dom,cn);
        } else 
        {
            Xjs.DOM.addClass(dom,cn);
        }
    },
    /*xjs.core.DOM.updateClass*/
    updateClass:function(dom,addClass,removeClass)
    {
        if(!dom)
            return;
        if(dom.classList)
        {
            var a1;
            if(addClass != null && addClass.length > 0)
            {
                a1 = addClass.split(" ");
                for(var j=0;j < a1.length;j++)
                    dom.classList.add(a1[j]);
            }
            if(removeClass != null)
            {
                a1 = removeClass.split(" ");
                for(var j=0;j < a1.length;j++)
                    dom.classList.remove(a1[j]);
            }
            return;
        }
        var a = dom.className == null || dom.className.trim().length == 0 ? [] : dom.className.split(" ");
        if(addClass != null && addClass != "")
        {
            var a1 = addClass.split(" ");
            for(var j=0;j < a1.length;j++)
                Array.addElement(a,a1[j]);
        }
        if(removeClass != null && removeClass != "")
        {
            var a1 = removeClass.split(" ");
            for(var j=0;j < a1.length;j++)
                Array.removeElement(a,a1[j]);
        }
        var s = null;
        for(var i=0;i < a.length;i++)
        {
            if(a[i] == "")
                continue;
            s = s == null ? a[i] : s + " " + a[i];
        }
        dom.className = s == null ? "" : s;
    },
    /*xjs.core.DOM.removeClass*/
    removeClass:function(dom,className)
    {
        if(!className || !dom)
        {
            return;
        }
        if(dom.classList)
        {
            dom.classList.remove(className);
        } else if(Xjs.DOM.hasClass(dom,className))
        {
            var re = new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)","g");
            dom.className = dom.className.replace(re," ").trim();
        }
    },
    /*xjs.core.DOM.setInputSelectionRange*/
    setInputSelectionRange:function(i,start,end)
    {
        try
        {
            if(i.setSelectionRange)
            {
                i.setSelectionRange(start,end);
            } else if(i.createTextRange)
            {
                var r = i.createTextRange();
                r.collapse(true);
                r.moveStart("character",start);
                r.moveEnd("character",end);
                r.select();
            }
        }catch(e)
        {
        }
    },
    /*xjs.core.DOM.getInputSelectionRange*/
    getInputSelectionRange:function(i)
    {
        if(i && typeof(i.selectionStart) == "number")
        {
            return [i.selectionStart,i.selectionEnd];
        }
        return null;
    },
    /*xjs.core.DOM.replaceInputSelection*/
    replaceInputSelection:function(i,s)
    {
        if(!s)
            s = "";
        i.focus();
        if(typeof(i.selectionStart) == "number")
        {
            var start = i.selectionStart,
                end = i.selectionEnd;
            i.value = i.value.substring(0,start) + s + i.value.substring(end);
            var p = start + s.length;
            i.selectionStart = p;
            i.selectionEnd = p;
        } else if(document.selection)
        {
            document.selection.createRange().text = s;
        }
    },
    /*xjs.core.DOM.addListener*/
    addListener:function(dom,name,fn,useCapture,scope,timeout)
    {
        if(dom == null)
        {
            window.console.log("dom is NULL");
            return;
        }
        if(scope)
            fn = Function.bindAsEventListener(fn,scope,timeout);
        if(dom.addEventListener)
        {
            dom.addEventListener(name,fn,useCapture);
        } else if(dom.attachEvent)
        {
            dom.attachEvent("on" + name,fn);
        }
    },
    /*xjs.core.DOM.removeListener*/
    removeListener:function(dom,name,fn,useCapture)
    {
        if(dom.removeEventListener)
        {
            dom.removeEventListener(name,fn,useCapture);
        } else if(dom.detachEvent)
        {
            dom.detachEvent("on" + name,fn);
        }
    },
    /*xjs.core.DOM.addWMDragListener*/
    addWMDragListener:function(scorp,onmove,onup)
    {
        window.onmousemove = Xjs.DOM._onWMouseMove;
        window.onmouseup = Xjs.DOM._onWMouseUp;
        Xjs.DOM._wmDragList = {scorp:scorp,onmove:onmove,onup:onup};
    },
    /*xjs.core.DOM._onWMouseMove*/
    _onWMouseMove:function(e)
    {
        var l;
        if(l = Xjs.DOM._wmDragList)
        {
            l.onmove.call(l.scorp,e);
        }
    },
    /*xjs.core.DOM._onWMouseUp*/
    _onWMouseUp:function(e)
    {
        window.onmousemove = null;
        window.onmouseup = null;
        var l = Xjs.DOM._wmDragList;
        Xjs.DOM._wmDragList = null;
        if(l)
            l.onup.call(l.scorp,e);
    },
    /*xjs.core.DOM.createChild*/
    createChild:function(parent,tagName,className,domAttr,domStyle)
    {
        var d = document.createElement(tagName);
        if(className)
            d.className = className;
        if(domAttr)
            Xjs.apply(d,domAttr);
        if(domStyle)
        {
            Xjs.apply(d.style,domStyle);
        }
        if(parent)
        {
            parent.appendChild(d);
        }
        return d;
    },
    /*xjs.core.DOM.removeAllChild*/
    removeAllChild:function(dom)
    {
        if(dom)
            while(dom.hasChildNodes())
                dom.removeChild(dom.firstChild);
    },
    /*xjs.core.DOM.contains*/
    contains:function(p,c)
    {
        if(!p || !c)
            return false;
        if(p == c)
            return true;
        if(p.contains && !Xjs.isSafari && !Xjs.isChrome)
        {
            return p.contains(c);
        } else if(p.compareDocumentPosition)
        {
            return (p.compareDocumentPosition(c) & 16) != 0;
        } else 
        {
            var parent = c.parentNode;
            while(parent)
            {
                if(parent == p)
                {
                    return true;
                } else if(!parent.tagName || parent.tagName.toUpperCase() == "HTML")
                {
                    return false;
                }
                parent = parent.parentNode;
            }
            return false;
        }
    },
    /*xjs.core.DOM.lookupByChild*/
    lookupByChild:function(a,c)
    {
        if(a)
            for(var i=0;i < a.length;i++)
            {
                if(a[i] == c || Xjs.DOM.contains(a[i],c))
                    return a[i];
            }
        return null;
    },
    /*xjs.core.DOM.getParentForTag*/
    getParentForTag:function(dom,tag)
    {
        for(;dom;dom = dom.parentNode)
            if(dom.tagName == tag)
                return dom;
        return null;
    },
    /*xjs.core.DOM.getScroll*/
    getScroll:function(dom,w)
    {
        if(!w)
            w = window;
        var doc = w.document;
        if(!dom || dom == doc || dom == doc.body)
        {
            var l,
                t;
            if(Xjs.isIE && Xjs.isStrict)
            {
                l = doc.documentElement.scrollLeft || doc.body.scrollLeft || 0;
                t = doc.documentElement.scrollTop || doc.body.scrollTop || 0;
            } else 
            {
                l = w.pageXOffset || 0;
                t = w.pageYOffset || 0;
            }
            return {x:l,y:t};
        } else 
        {
            return {x:dom.scrollLeft,y:dom.scrollTop};
        }
    },
    /*xjs.core.DOM.getScrollX*/
    getScrollX:function(dom)
    {
        var doc = document;
        if(!dom || dom == doc || dom == doc.body)
        {
            if(Xjs.isIE && Xjs.isStrict)
            {
                return doc.documentElement.scrollLeft || doc.body.scrollLeft || 0;
            } else 
            {
                return window.pageXOffset || doc.body.scrollLeft || 0;
            }
        } else 
        {
            return dom.scrollLeft;
        }
    },
    /*xjs.core.DOM.getScrollY*/
    getScrollY:function(dom)
    {
        var doc = document;
        if(!dom || dom == doc || dom == doc.body)
        {
            if(Xjs.isIE && Xjs.isStrict)
            {
                return doc.documentElement.scrollTop || doc.body.scrollTop || 0;
            } else 
            {
                return window.pageYOffset || doc.body.scrollTop || 0;
            }
        } else 
        {
            return dom.scrollTop;
        }
    },
    /*xjs.core.DOM.getViewportHeight*/
    getViewportHeight:function(w)
    {
        if(!w)
            w = window;
        if(Xjs.isIE)
        {
            return Xjs.isStrict ? w.document.documentElement.clientHeight : w.document.body.clientHeight;
        } else 
        {
            return w.self.innerHeight;
        }
    },
    /*xjs.core.DOM.getViewportScrollTop*/
    getViewportScrollTop:function()
    {
        return window.pageYOffset || document.documentElement.scrollTop || 0;
    },
    /*xjs.core.DOM.getViewportScrollHeight*/
    getViewportScrollHeight:function()
    {
        return document.documentElement.scrollHeight;
    },
    /*xjs.core.DOM.getViewportClientHeight*/
    getViewportClientHeight:function()
    {
        return document.documentElement.clientHeight;
    },
    /*xjs.core.DOM.isTouchViewHeightByOtterSize*/
    isTouchViewHeightByOtterSize:function()
    {
        return Xjs.TouchDev == 3 && Xjs.ua.indexOf(" browser/applewebkit") >= 0;
    },
    /*xjs.core.DOM.getTouchViewHeight*/
    getTouchViewHeight:function(useOtterSize)
    {
        if(useOtterSize === undefined)
            useOtterSize = Xjs.DOM.isTouchViewHeightByOtterSize();
        if(Xjs.TouchDev == 3 && Xjs.isGecko && Xjs.ua.indexOf("fennec") < 0)
        {
            return Math.ceil(window.self.outerHeight * window.self.innerWidth / window.self.outerWidth) - 48;
        }
        if(Xjs.isIE)
        {
            return document.documentElement.clientHeight;
        }
        return window.self.innerHeight;
    },
    /*xjs.core.DOM.getViewportWidth*/
    getViewportWidth:function(w)
    {
        if(!w)
            w = window;
        if(Xjs.isIE)
        {
            return Xjs.isStrict ? w.document.documentElement.clientWidth : w.document.body.clientWidth;
        } else 
        {
            return w.self.innerWidth;
        }
    },
    /*xjs.core.DOM.isShowing*/
    isShowing:function(dom)
    {
        if(!dom || !dom.style)
            return false;
        if(dom.style.display == "none" || dom.style.visibility == "hidden" || Xjs.DOM.hasClass(dom,"hidden"))
            return false;
        return dom == document.body || Xjs.DOM.isShowing(dom.parentNode);
    },
    /*xjs.core.DOM.isDisplay*/
    isDisplay:function(dom)
    {
        if(!dom || !dom.style)
            return false;
        if(dom.style.display == "none")
            return false;
        return dom == document.body || Xjs.DOM.isShowing(dom.parentNode);
    },
    /*xjs.core.DOM.inDocBody*/
    inDocBody:function(dom)
    {
        if(!dom)
            return false;
        var p = dom;
        for(;p != null && p != document.body;p = p.parentNode)
            ;
        return p != null;
    },
    /*xjs.core.DOM.setTextContent*/
    setTextContent:function(dom,text)
    {
        if(!dom)
            return;
        {
            if(dom.textContent != text)
                dom.textContent = text;
        }
    },
    /*xjs.core.DOM.getTextContent*/
    getTextContent:function(dom)
    {
        return dom.textContent || dom.innerText;
    },
    /*xjs.core.DOM.findById*/
    findById:function(id,ctx)
    {
        if(!ctx)
            return document.getElementById(id);
        if(ctx.id == id)
            return ctx;
        if(ctx.querySelector)
            try
            {
                var e;
                if((e = ctx.querySelector("#" + id)) || !Xjs.isSafari)
                    return e;
                return ctx.querySelectorAll("#" + id)[0];
            }catch(ex)
            {
                throw new Error("无效选择符:#" + id);
            }
        return $("#" + id,ctx).get(0);
    },
    /*xjs.core.DOM.getElementById*/
    getElementById:function(a,id)
    {
        if(a)
            for(var i=0;i < a.length;i++)
            {
                if(a[i].id == id)
                    return a[i];
            }
        return null;
    },
    /*xjs.core.DOM.find*/
    find:function(s,context)
    {
        if(!context)
        {
            if(document.querySelector)
                return document.querySelector(s);
            return $(s).get(0);
        }
        if(context.querySelector)
        {
            var e;
            if((e = context.querySelector(s)) || !Xjs.isSafari)
                return e;
            return context.querySelectorAll(s)[0];
        }
        return $(s,context).get(0);
    },
    /*xjs.core.DOM.findAll*/
    findAll:function(s,context)
    {
        if(!context)
        {
            if(document.querySelectorAll)
                return document.querySelectorAll(s);
            return $(s).get();
        }
        if(context.querySelectorAll)
            return context.querySelectorAll(s);
        return $(s,context).get();
    },
    /*xjs.core.DOM.removeEmptyTextNode*/
    removeEmptyTextNode:function(dom)
    {
        for(var j=dom.childNodes.length - 1;j >= 0;j--)
        {
            var c = dom.childNodes[j];
            if(c.tagName == null && (c.innerHTML == null || c.innerHTML.trim() == ""))
            {
                dom.removeChild(c);
            }
        }
    },
    /*xjs.core.DOM.indexOf*/
    indexOf:function(a,e)
    {
        if(a == null)
            return -1;
        for(var j=0;j < a.length;j++)
        {
            if(e == a[j])
                return j;
        }
        return -1;
    },
    /*xjs.core.DOM.scrollToVisible*/
    scrollToVisible:function(p,e,opts)
    {
        var xy = Xjs.DOM.getOffsetTO(e,p);
        if((opts & 2) != 0)
        {
            var ph = Xjs.DOM.getHeight(p);
            if(p.scrollWidth > p.offsetWidth - 16 && (opts & 4) != 0)
            {
                ph -= 18;
            }
            var h = Xjs.DOM.getHeight(e),
                t = p.scrollTop;
            if(xy.y - t + h > ph)
                t = xy.y + h - ph;
            else if(t > xy.y)
                t = xy.y;
            if(t < 0)
                t = 0;
            if(t != p.scrollTop)
                p.scrollTop = t;
        }
        if((opts & 1) != 0)
        {
        }
    },
    /*xjs.core.DOM.scrollToTop*/
    scrollToTop:function(p,e)
    {
        var maxT = p.scrollHeight - p.offsetHeight,
            t = Xjs.DOM.getOffsetTO(e,p).y;
        if(t > maxT)
            t = maxT;
        p.scrollTop = t < 0 ? 0 : t;
    },
    /*xjs.core.DOM.getIFramePath*/
    getIFramePath:function()
    {
        if(!Xjs.DOM.ifrmPath)
        {
            Xjs.DOM.ifrmPath = [];
            var w = window;
            for(;w.parent != w && w.parent;w = w.parent)
            {
                try
                {
                    var frms = w.parent.document.getElementsByTagName("IFRAME");
                    if(!frms)
                        break;
                    var ifrm = null;
                    for(var i=0;i < frms.length;i++)
                        if(frms[i].contentWindow == w)
                        {
                            ifrm = frms[i];
                            break;
                        }
                    if(!ifrm)
                        break;
                    if(ifrm.contentWindow != w)
                        throw new Error();
                    Xjs.DOM.ifrmPath.push(ifrm);
                }catch(ex)
                {
                    break;
                }
            }
        }
        return Xjs.DOM.ifrmPath;
    },
    /*xjs.core.DOM.clipViewRect*/
    clipViewRect:function(w,r,removeSB)
    {
        if(!w)
            w = window;
        var vw = Xjs.DOM.getViewportWidth(w),
            vh = Xjs.DOM.getViewportHeight(w);
        if(removeSB)
        {
            var d = w.document;
            if(d.body.scrollHeight > w.innerHeight && Xjs.DOM.getStyle(d.body,"overflow-y") != "hidden")
            {
                vw -= 16;
            }
            if(d.body.scrollWidth > w.innerWidth && Xjs.DOM.getStyle(d.body,"overflow-x") != "hidden")
            {
                vh -= 16;
            }
        }
        if(r.x < 0)
        {
            r.width += r.x;
            r.x = 0;
        }
        if(r.y < 0)
        {
            r.height += r.y;
            r.y = 0;
        }
        if(r.x + r.width > vw)
            r.width = vw - r.x;
        if(r.y + r.height > vh)
            r.height = vh - r.y;
    },
    /*xjs.core.DOM.getVisRect*/
    getVisRect:function(dom,opts)
    {
        var r;
        if(!dom)
        {
            r = {x:0,y:0,width:Xjs.DOM.getViewportWidth(),height:Xjs.DOM.getViewportHeight()};
        } else 
        {
            var o = Xjs.DOM.getXY(dom,true);
            r = {x:o.x,y:o.y,width:Xjs.DOM.getWidth(dom),height:Xjs.DOM.getHeight(dom)};
            Xjs.DOM.clipViewRect(window,r,(opts & 2) != 0);
        }
        var ifrmPath;
        if(opts & 1 && (ifrmPath = Xjs.DOM.getIFramePath()).length > 0)
        {
            var ifrmPos0 = new Array(ifrmPath.length),
                ifrmPos1 = new Array(ifrmPath.length);
            for(var i=ifrmPath.length - 1;i >= 0;i--)
            {
                var oxy = ifrmPos1[i] = Xjs.DOM.getXY(ifrmPath[i],true);
                ifrmPos0[i] = i == ifrmPath.length - 1 ? oxy : {x:oxy.x + ifrmPos1[i + 1].x,y:oxy.y + ifrmPos1[i + 1].y};
            }
            r.x += ifrmPos0[0].x;
            r.y += ifrmPos0[0].y;
            if(r.x < 0)
            {
                r.width += r.x;
                r.x = 0;
            }
            if(r.y < 0)
            {
                r.height += r.y;
                r.y = 0;
            }
            for(var i=0;i < ifrmPath.length;i++)
            {
                var xy = ifrmPos0[i],
                    w = Xjs.DOM.getWidth(ifrmPath[i]),
                    h = Xjs.DOM.getHeight(ifrmPath[i]);
                if(r.x < xy.x)
                {
                    r.width -= xy.x - r.x;
                    r.x = xy.x;
                }
                if(r.y < xy.y)
                {
                    r.height -= xy.y - r.y;
                    r.y = xy.y;
                }
                if(r.x + r.width > xy.x + w)
                {
                    r.width = xy.x + w - r.x;
                }
                if(r.y + r.height > xy.y + h)
                {
                    r.height = xy.y + h - r.y;
                }
            }
            var w = ifrmPath[ifrmPath.length - 1].contentWindow.parent;
            Xjs.DOM.clipViewRect(w,r,(opts & 2) != 0);
            r.x -= ifrmPos0[0].x;
            r.y -= ifrmPos0[0].y;
        }
        return r;
    },
    /*xjs.core.DOM.getTblRow*/
    getTblRow:function(tb,r,addIfNul)
    {
        if(r >= tb.rows.length)
        {
            if(!addIfNul)
                return null;
            for(;r >= tb.rows.length;)
                tb.insertRow(tb.rows.length);
        }
        return tb.rows[r];
    },
    /*xjs.core.DOM.getTblCell*/
    getTblCell:function(tr,c,addIfNul)
    {
        if(c >= tr.cells.length)
        {
            if(!addIfNul)
                return null;
            for(;c >= tr.cells.length;)
                tr.insertCell(tr.cells.length);
        }
        return tr.cells[c];
    },
    /*xjs.core.DOM.getCSSVender*/
    getCSSVender:function(style)
    {
        var dummyStyle = document.createElement("div").style;
        if(style in dummyStyle)
            return "";
        var vendors = ["webkit","Moz","ms","O"],
            styleS = style.charAt(0).toUpperCase() + style.substring(1);
        for(var i=0;i < vendors.length;i++)
        {
            if(vendors[i] + styleS in dummyStyle)
                return vendors[i];
        }
        return "";
    },
    /*xjs.core.DOM.getCSSVenderStyleName*/
    getCSSVenderStyleName:function(style,dom)
    {
        if(!dom)
            dom = document.createElement("div");
        var dummyStyle = dom.style;
        if(style in dummyStyle)
            return style;
        var vendors = ["webkit","Moz","ms","O"],
            styleS = style.charAt(0).toUpperCase() + style.substring(1);
        for(var i=0;i < vendors.length;i++)
        {
            if(vendors[i] + styleS in dummyStyle)
                return vendors[i] + styleS;
        }
        return style;
    },
    /*xjs.core.DOM.fireTouchMouseEvent*/
    fireTouchMouseEvent:function(e,type)
    {
        var point = e.changedTouches ? e.changedTouches[0] : e,
            target = point.srcElement || point.target;
        while(target.nodeType != 1)
            target = target.parentNode;
        if(target.tagName != "SELECT" && target.tagName != "INPUT" && target.tagName != "TEXTAREA")
        {
            var ev = document.createEvent("MouseEvents");
            ev.initMouseEvent(type,true,true,e.view,1,point.screenX,point.screenY,point.clientX,point.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null);
            ev._fake = true;
            target.dispatchEvent(ev);
        }
    },
    /*xjs.core.DOM.addOnWinResize*/
    addOnWinResize:function(func,scorp,args)
    {
        if(!Xjs.DOM.fnOnWinResize)
        {
            Xjs.DOM.fnOnWinResize = [];
            Xjs.DOM.addListener(window,"resize",Xjs.DOM.onWinResize);
        }
        Xjs.DOM.fnOnWinResize.push(new Xjs.FuncCall(func,scorp,args));
    },
    /*xjs.core.DOM.onWinResize*/
    onWinResize:function(time)
    {
        if(time > 0)
        {
            setTimeout(Xjs.DOM._onWinResize,time);
        } else 
        {
            Xjs.DOM._onWinResize();
        }
    },
    /*xjs.core.DOM._onWinResize*/
    _onWinResize:function()
    {
        if(Xjs.DOM.fnOnWinResize)
            for(var i=0;i < Xjs.DOM.fnOnWinResize.length;i++)
            {
                Xjs.DOM.fnOnWinResize[i].call();
            }
        if(document.body._customScrollbar)
            try
            {
                document.body._customScrollbar.updateValue();
            }catch(ex)
            {
            }
    },
    /*xjs.core.DOM.hasVerticalScroll*/
    hasVerticalScroll:function()
    {
        if(window.innerHeight)
            return document.body.offsetHeight > window.innerHeight;
        return document.documentElement.scrollHeight > document.documentElement.offsetHeight || document.body.scrollHeight > document.body.offsetHeight;
    },
    /*xjs.core.DOM.isVScrollbarVisible*/
    isVScrollbarVisible:function(e)
    {
        var s = Xjs.DOM.getStyle(e,"overflowY");
        if(s == "scroll")
            return true;
        if(s == "auto")
        {
            var pd = Xjs.DOM.getPadding(e,"tb");
            return e.scrollHeight - pd >= e.offsetHeight - pd;
        }
        return false;
    },
    /*xjs.core.DOM._createPasteTextDOM*/
    _createPasteTextDOM:function(onPaste,execPatse)
    {
        var e = document.getElementById("_$PasteTextDOM");
        if(!e)
        {
            e = document.createElement("textarea");
            e.id = "_$PasteTextDOM";
            var s = e.style;
            s.width = "0px";
            s.height = "0px";
            s.position = "absolute";
            s.left = "-1000px";
            s.top = "-10000px";
            document.body.appendChild(e);
        }
        e.value = "";
        e.onpaste = onPaste;
        e.focus();
        if(execPatse)
            document.execCommand("Paste",false,false);
        return e;
    },
    /*xjs.core.DOM._createTempSpanDOM*/
    _createTempSpanDOM:function()
    {
        var e = document.getElementById("_$Tmp$SpanDOM_");
        if(!e)
        {
            e = document.createElement("span");
            e.id = "_$Tmp$SpanDOM_";
            var s = e.style;
            s.position = "absolute";
            s.left = "-1000px";
            s.top = "-10000px";
            document.body.appendChild(e);
        }
        return e;
    },
    /*xjs.core.DOM.isIFramInDOMAIN*/
    isIFramInDOMAIN:function(ifm)
    {
        try
        {
            var n = ifm.contentDocument.body.childNodes == null ? 0 : ifm.contentDocument.body.childNodes.length;
            return n >= 0;
        }catch(ex)
        {
        }
        return false;
    },
    /*xjs.core.DOM.getTipContentIfOvflow*/
    getTipContentIfOvflow:function(e)
    {
        if(Xjs.DOM.isContentOvflow(e))
        {
            return e.innerHTML;
        }
        return null;
    },
    /*xjs.core.DOM.isContentOvflow*/
    isContentOvflow:function(e)
    {
        return e && e.scrollWidth > e.offsetWidth || e.scrollHeight > e.offsetHeight;
    }
};
/*xjs/core/Event.java*/
Xjs.Event = {
    /*xjs.core.Event.isCmdKey*/
    isCmdKey:function(e)
    {
        return Xjs.osType == 2 ? e.metaKey : e.ctrlKey;
    },
    /*xjs.core.Event.isLeftBtnDown*/
    isLeftBtnDown:function(e)
    {
        return Xjs.isWebKit ? e.which == 1 : e.buttons & 1;
    },
    /*xjs.core.Event.getPageX*/
    getPageX:function(ev)
    {
        var x = ev.pageX;
        if(x == null)
        {
            x = ev.clientX || 0;
            if(Xjs.isIE)
            {
                x += Xjs.DOM.getScrollX(document);
            }
        }
        return x;
    },
    /*xjs.core.Event.getPageY*/
    getPageY:function(ev)
    {
        var y = ev.pageY;
        if(y == null)
        {
            y = ev.clientY || 0;
            if(Xjs.isIE)
            {
                y += Xjs.DOM.getScrollY(document);
            }
        }
        return y;
    },
    /*xjs.core.Event.getXY*/
    getXY:function(ev,dom)
    {
        var p = Xjs.DOM.getXY(dom,true);
        p.x = ev.clientX - p.x;
        p.y = ev.clientY - p.y;
        return p;
    },
    /*xjs.core.Event.isEventInDOM*/
    isEventInDOM:function(ev,dom)
    {
        var xy = Xjs.Event.getXY(ev,dom);
        return xy.x >= 0 && xy.x < Xjs.DOM.getWidth(dom) && xy.y >= 0 && xy.y < Xjs.DOM.getHeight(dom);
    },
    /*xjs.core.Event.inDomBorder*/
    inDomBorder:function(ev,dom,delta)
    {
        var xy = Xjs.Event.getXY(ev,dom),
            x = xy.x,
            y = xy.y,
            size = Xjs.DOM.getSize(dom),
            w = size.width,
            h = size.height,
            inBorder = 0;
        if(x > -delta && x < w + delta)
        {
            if(y > -delta && y < delta)
                inBorder |= 1;
            else if(y > h - delta && y < h + delta)
                inBorder |= 4;
        }
        if(y > -delta && y < h + delta)
        {
            if(x > -delta && x < delta)
                inBorder |= 2;
            else if(x > w - delta && x < w + delta)
                inBorder |= 8;
        }
        return inBorder;
    },
    /*xjs.core.Event.getOffsetX*/
    getOffsetX:function(e)
    {
        var x = e.offsetX;
        if(x != null)
            return x;
        return e.layerX;
    },
    /*xjs.core.Event.getOffsetY*/
    getOffsetY:function(e)
    {
        var y = e.offsetY;
        if(y != null)
            return y;
        return e.layerY;
    },
    /*xjs.core.Event.fnPreventDefault*/
    fnPreventDefault:function(e)
    {
        return Xjs.Event.cancelEvent(e,true);
    },
    /*xjs.core.Event.inDOM*/
    inDOM:function(ev,dom,delta)
    {
        var xy = Xjs.Event.getXY(ev,dom),
            x = xy.x,
            y = xy.y,
            size = Xjs.DOM.getSize(dom);
        return x >= -delta && x < size.width + delta && y >= -delta && y < size.height + delta;
    },
    /*xjs.core.Event.captureMouse*/
    captureMouse:function(dom,release)
    {
        if(release)
        {
            if(dom.releaseCapture)
            {
                dom.releaseCapture();
            } else if(window.releaseEvents)
            {
                window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
        } else 
        {
            if(dom.setCapture)
                dom.setCapture();
            else if(window.captureEvents)
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
    },
    /*xjs.core.Event.cancelEvent*/
    cancelEvent:function(ev,preventDefault)
    {
        if(ev.stopPropagation)
            ev.stopPropagation();
        else 
            ev.cancelBubble = true;
        if(preventDefault)
        {
            if(ev.preventDefault)
                ev.preventDefault();
            ev.returnValue = false;
            return false;
        }
        return;
    },
    /*xjs.core.Event.isNavKeyPress*/
    isNavKeyPress:function(ev)
    {
        var k = ev.keyCode;
        return k >= 33 && k <= 40 || k == 13 || k == 9 || k == 27;
    }
};
/*xjs/core/FuncCall.java*/
Xjs.FuncCall=function(func,scorp,args,argMode){
    this.func = func;
    this.scorp = scorp;
    this.args = args;
    this.argMode = argMode;
};
Xjs.apply(Xjs.FuncCall.prototype,{
    /*xjs.core.FuncCall.call*/
    call:function()
    {
        return this.apply(arguments);
    },
    /*xjs.core.FuncCall.apply*/
    apply:function(args)
    {
        return this.func.apply(this.scorp || window,this.buildCallArgs(args));
    },
    /*xjs.core.FuncCall.asFunction*/
    asFunction:function()
    {
        if(this._df)
            return this._df;
        var f = this;
        return this._df = function(){
            return f.apply(arguments);
        };
    },
    /*xjs.core.FuncCall.buildCallArgs*/
    buildCallArgs:function(callArgs)
    {
        var am;
        switch(am = this.argMode || 3)
        {
        case 1:
            return this.args;
        case 2:
        default:
            {
                var a;
                if(a = this.args)
                {
                    var args = [];
                    if(callArgs && am != 2)
                        for(var j=0;j < callArgs.length;j++)
                        {
                            args.push(callArgs[j]);
                        }
                    for(var j=0;j < a.length;j++)
                    {
                        args.push(a[j]);
                    }
                    if(callArgs && am == 2)
                        for(var j=0;j < callArgs.length;j++)
                        {
                            args.push(callArgs[j]);
                        }
                    return args;
                }
                return callArgs;
            }
        }
    }
});
/*xjs/core/HtmlUTIL.java*/
Xjs.HtmlUTIL = {
    /*xjs.core.HtmlUTIL.fillPrefixBlank*/
    fillPrefixBlank:function(s)
    {
        if(s && s.length > 0 && s.charCodeAt(0) <= 0x20)
        {
            var newS = "",
                j;
            for(j = 0;j < s.length;j++)
            {
                var c = s.charCodeAt(j);
                if(c == 0x20)
                    newS += "\u00A0";
                else if(c == 9)
                {
                    for(;;)
                    {
                        newS += "\u00A0";
                        if((newS.length & 3) == 0)
                            break;
                    }
                } else 
                    break;
            }
            s = newS + s.substring(j);
        }
        return s;
    },
    /*xjs.core.HtmlUTIL.htmlEncode*/
    htmlEncode:function(s)
    {
        var a = [],
            n = s == null ? 0 : s.length,
            en = false,
            p0 = 0;
        for(var i=0;i < n;i++)
        {
            var c = s.charCodeAt(i);
            switch(c)
            {
            case 32:
                if(p0 < i)
                {
                    a.push(s.substring(p0,i));
                }
                en = true;
                a.push("&nbsp;");
                p0 = i + 1;
                continue;
            case 60:
                if(p0 < i)
                {
                    a.push(s.substring(p0,i));
                }
                en = true;
                a.push("&lt;");
                p0 = i + 1;
                continue;
            case 62:
                if(p0 < i)
                {
                    a.push(s.substring(p0,i));
                }
                en = true;
                a.push("&gt;");
                p0 = i + 1;
                continue;
            case 38:
                if(p0 < i)
                {
                    a.push(s.substring(p0,i));
                }
                en = true;
                a.push("&amp;");
                p0 = i + 1;
                continue;
            case 10:
                if(p0 < i)
                {
                    a.push(s.substring(p0,i));
                }
                en = true;
                a.push("<br/>");
                p0 = i + 1;
                continue;
            }
        }
        if(!en)
            return s;
        if(p0 < n)
            a.push(s.substring(p0));
        return a.join("");
    },
    /*xjs.core.HtmlUTIL.toPlainText*/
    toPlainText:function(s)
    {
        var a = [],
            n = s == null ? 0 : s.length,
            en = false,
            inTag = 0,
            p0 = 0;
        for(var i=0;i < n;i++)
        {
            var c = s.charCodeAt(i);
            if(inTag == 1)
            {
                if(c == 0x3e)
                {
                    var tag = s.substring(p0,i).toLowerCase().trim();
                    if(tag == "br" || tag == "br/")
                    {
                        en = true;
                        a.push("\r\n");
                    }
                    p0 = i + 1;
                    inTag = 0;
                }
                continue;
            }
            if(inTag == 2)
            {
                if(c == 0x3b)
                {
                    var tag = s.substring(p0,i).toLowerCase().trim();
                    switch(tag)
                    {
                    case "amp":
                        a.push("&");
                        break;
                    case "lt":
                        a.push("<");
                        break;
                    case "gt":
                        a.push(">");
                        break;
                    case "quot":
                        a.push("\"");
                        break;
                    case "nbsp":
                        a.push(" ");
                        break;
                    }
                    inTag = 0;
                    p0 = i + 1;
                }
                continue;
            }
            switch(c)
            {
            case 60:
                if(p0 < i)
                    a.push(s.substring(p0,i));
                p0 = i + 1;
                en = true;
                inTag = 1;
                continue;
            case 38:
                if(p0 < i)
                    a.push(s.substring(p0,i));
                p0 = i + 1;
                en = true;
                inTag = 2;
                continue;
            }
            if(c <= 0x20)
            {
                if(p0 < i)
                    a.push(s.substring(p0,i));
                p0 = i + 1;
                en = true;
            }
        }
        if(!en)
            return s;
        if(p0 < n)
            a.push(s.substring(p0).trim());
        return a.join("");
    },
    /*xjs.core.HtmlUTIL.color2String*/
    color2String:function(c)
    {
        var s = c.toString(16);
        for(;s.length < 6;s = "0" + s)
            ;
        return "#" + s;
    },
    /*xjs.core.HtmlUTIL.getReqParameters*/
    getReqParameters:function()
    {
        return Xjs.getReqParameters();
    },
    /*xjs.core.HtmlUTIL.doEditInOffice*/
    doEditInOffice:function(url)
    {
        if(window.ActiveXObject)
        {
            var doc = Xjs.core.System.newSharePointOpenDocuments();
            if(doc == null)
                throw new Error("系统必须安装Office和其SharePoint组件才能使用");
            doc.EditDocument(url);
            return;
        }
        if(window.URLLauncher)
        {
            var urlLauncher = new URLLauncher();
            if(url.startsWith("http://") || url.startsWith("https://"))
            {
                var p = url.indexOf("/",8);
                url = url.substring(p);
            }
            urlLauncher.open(url);
            return;
        }
        if(Xjs.isFirefox)
        {
            alert("使用改功能需要安装插件 webdavloader.xpi");
            return;
        }
    }
};
/*xjs/core/JSON.java*/
Xjs.JSON = {
    TransientValsID:"__Transient.Vals_",
    IdRegExpr:/^[a-zA-Z_\$][a-zA-Z0-9_\$]*$/,
    /*xjs.core.JSON.encodeString*/
    encodeString:function(text,to)
    {
        var a = to != null ? to : [];
        a.push("\"");
        var n = text == null ? 0 : text.length;
        for(var i=0;i < n;i++)
        {
            var c = text.charCodeAt(i);
            switch(c)
            {
            case 34:
                a.push("\\\"");
                break;
            case 92:
                a.push("\\\\");
                break;
            case 13:
                a.push("\\r");
                break;
            case 10:
                a.push("\\n");
                break;
            case 8:
                a.push("\\b");
                break;
            case 9:
                a.push("\\t");
                break;
            case 12:
                a.push("\\f");
                break;
            default:
                if(c < 0x20)
                    a.push("\\u00" + (c >> 4).toString(16) + (c & 0xf).toString(16));
                else 
                    a.push(String.fromCharCode(c));
            }
        }
        a.push("\"");
        if(to == null)
            return a.join("");
        return;
    },
    /*xjs.core.JSON.encodeArray*/
    encodeArray:function(o,to,opts)
    {
        var a = to != null ? to : [],
            l = o.length,
            b = false;
        a.push("[");
        for(var i=0;i < l;i += 1)
        {
            var v = o[i],
                t = typeof(v);
            if(t == "undefined" || t == "function" || t == "unknown")
            {
                v = null;
            }
            if(b)
                a.push(",");
            if(v == null)
                a.push("null");
            else 
                Xjs.JSON.encode(v,a,opts);
            b = true;
        }
        a.push("]");
        if(to == null)
            return a.join("");
        return;
    },
    /*xjs.core.JSON.encodeDate*/
    encodeDate:function(o,to)
    {
        var a = to != null ? to : [];
        a.push("new Date(");
        a.push(o.getFullYear());
        a.push(",");
        a.push(o.getMonth());
        a.push(",");
        a.push(o.getDate());
        var h = o.getHours(),
            m = o.getMinutes(),
            s = o.getSeconds(),
            ms = o.getMilliseconds();
        if(h != 0 || m != 0 || s != 0 || ms != 0)
        {
            a.push(",");
            a.push(h);
        }
        ;
        if(m != 0 || s != 0 || ms != 0)
        {
            a.push(",");
            a.push(m);
        }
        ;
        if(s != 0 || ms != 0)
        {
            a.push(",");
            a.push(s);
        }
        ;
        if(ms != 0)
        {
            a.push(",");
            a.push(ms);
        }
        ;
        a.push(")");
        if(to == null)
            return a.join("");
        return;
    },
    /*xjs.core.JSON.encode*/
    encode:function(o,to,opts)
    {
        if(o == null)
        {
            if(to != null)
                to.push("null");
            else 
                return "null";
            return;
        }
        if(o instanceof Array)
        {
            if(to != null)
                Xjs.JSON.encodeArray(o,to,opts);
            else 
                return Xjs.JSON.encodeArray(o,null,opts);
            return;
        }
        if(o instanceof Date)
        {
            if(to != null)
                Xjs.JSON.encodeDate(o,to);
            else 
                return Xjs.JSON.encodeDate(o);
            return;
        }
        var t = typeof(o);
        if(t == "string")
        {
            if(to != null)
                Xjs.JSON.encodeString(o,to);
            else 
                return Xjs.JSON.encodeString(o);
        } else if(t == "number")
        {
            var s;
            if(isFinite(o))
            {
                s = o.toString();
                if(s.indexOf('.') < 0 && s.indexOf('e') < 0 && (o > 0x7fffffff || o < -2147483647))
                {
                    if(o > 0x7fffffffffffffff || o < -0x7fffffffffffffff)
                        s += ".0";
                    else 
                        s += "L";
                }
            } else 
            {
                s = "null";
            }
            if(to != null)
                to.push(s);
            else 
                return s;
        } else if(t == "boolean")
        {
            if(to)
                to.push(o);
            else 
                return o.toString();
        } else 
        {
            var a = to != null ? to : [],
                b = false;
            a.push("{");
            for(var i in o)
            {
                {
                    var v = o[i],
                        tv = typeof(v);
                    if(tv == "undefined" || tv == "function" || tv == "unknown" || i == "__Transient.Vals_")
                        continue;
                    if(b)
                        a.push(",");
                    if(Xjs.JSON.IdRegExpr.test(i) && !(opts & 1))
                        a.push(i);
                    else 
                        Xjs.JSON.encodeString(i,a);
                    a.push(":");
                    if(v == null)
                        a.push("null");
                    else 
                        Xjs.JSON.encode(v,a,opts);
                    b = true;
                }
            }
            a.push("}");
            if(to == null)
                return a.join("");
        }
        return;
    },
    /*xjs.core.JSON.parse*/
    parse:function(s)
    {
        if(s == null)
            return null;
        if((s = s.trim()).length > 2 && s.charCodeAt(0) == 0x7b && s.charCodeAt(s.length - 1) == 0x7d)
            return eval("(" + s + ")");
        return eval(s);
    },
    /*xjs.core.JSON.setTransientVal*/
    setTransientVal:function(o,name,v)
    {
        var x;
        if(!(x = o["__Transient.Vals_"]))
            o["__Transient.Vals_"] = x = {};
        x[name] = v;
    },
    /*xjs.core.JSON.getTransientVal*/
    getTransientVal:function(o,name)
    {
        var x;
        if(x = o["__Transient.Vals_"])
            return x[name];
        return;
    }
};
/*xjs/core/RInvoke.java*/
Xjs.RInvoke = {
    beansDef:{},
    proxy:{},
    /*xjs.core.RInvoke.buildUIInvokeURL*/
    buildUIInvokeURL:function(rootPath,invoke,opts)
    {
        var uriP = (rootPath || Xjs.ROOTPATH) + "uiinvoke/";
        if(window.EnvParameter && window.EnvParameter.wsp)
        {
            uriP += window.EnvParameter.wsp + "/" + (window.EnvParameter.lang || "zh_CN") + "/";
            if(window.EnvParameter.theme && !(opts & 1))
                uriP += window.EnvParameter.theme + "/";
        }
        return invoke ? uriP + invoke : uriP;
    },
    /*xjs.core.RInvoke.newBean*/
    newBean:function(name,sname)
    {
        if(!sname)
            sname = name;
        var o = Xjs.RInvoke.proxy[sname];
        if(o)
            return o;
        o = {};
        var def = Xjs.RInvoke.beansDef[name];
        if(!def)
            throw new Error("未定义组件:" + name);
        var urlP = Xjs.RInvoke.buildUIInvokeURL(null,null,0);
        for(var mname in def)
        {
            o[mname] = Xjs.RInvoke.createMethod(urlP,sname + "." + mname,def[mname]);
        }
        return Xjs.RInvoke.proxy[sname] = o;
    },
    /*xjs.core.RInvoke.invoke*/
    invoke:function(urlP,method,md,args)
    {
        var rmethod = method;
        if(md.rmethod)
        {
            var p = rmethod.lastIndexOf('.');
            rmethod = p >= 0 ? rmethod.substring(0,p + 1) + md.rmethod : md.rmethod;
        }
        var body,
            params;
        if("get" == md.amethod)
        {
            body = null;
            params = {};
            if(md.argNames)
                for(var i=0;i < md.argNames.length;i++)
                {
                    if(i == md.progParamIdx)
                        continue;
                    var n = md.argNames[i];
                    if(!n)
                        continue;
                    if(n == "*")
                        Xjs.apply(params,args[i]);
                    else if(args[i] !== undefined)
                        params[n] = args[i];
                }
        } else 
        {
            body = args || [];
            params = null;
        }
        if(md.progParamIdx >= 0 || md.progMode || md.asyn == 1)
        {
            var p = null;
            if(md.progParamIdx >= 0)
            {
                p = args[md.progParamIdx];
                args = Array.cloneArray(args);
                args.splice(md.progParamIdx,1);
            }
            if(!p)
                p = {};
            p.runMethod = "sv~" + rmethod;
            p.postArgs = args;
            Xjs.ui.UIUtil.progressRun(p);
            return;
        }
        var url = urlP + "sv-" + rmethod;
        if(md.asyn == 2)
        {
            return new Promise(function(resolve,reject){
            Xjs.Ajax.invoke(url,body,params,md.amethod,32 | 16,new Xjs.FuncCall(resolve,window),new Xjs.FuncCall(reject,window));
        });
        }
        return Xjs.Ajax.invoke(urlP + "sv-" + rmethod,body,params,md.amethod,32 | 16);
    },
    /*xjs.core.RInvoke.createMethod*/
    createMethod:function(urlP,method,md)
    {
        return function(){
            return Xjs.RInvoke.invoke(urlP,method,md,Xjs.RInvoke.toArray(arguments));
        };
    },
    /*xjs.core.RInvoke.toArray*/
    toArray:function(args)
    {
        if(args == null || args instanceof Array)
            return args;
        return Array.cloneArray(args);
    },
    /*xjs.core.RInvoke.rmInvoke*/
    rmInvoke:function(m)
    {
        var args = Array.prototype.slice.call(arguments,1);
        return Xjs.RInvoke._rinvoke(m,"st",args);
    },
    /*xjs.core.RInvoke.armInvoke*/
    armInvoke:function(m,success,error)
    {
        var args = Array.prototype.slice.call(arguments,3);
        return Xjs.RInvoke._rinvoke(m,"st",args,success,error);
    },
    /*xjs.core.RInvoke.asynRMInvoke*/
    asynRMInvoke:function(m)
    {
        var args = Array.prototype.slice.call(arguments,1);
        return Xjs.RInvoke._asynInvoke(m,"st",args);
    },
    /*xjs.core.RInvoke.rsvInvoke*/
    rsvInvoke:function(m)
    {
        var args = Array.prototype.slice.call(arguments,1);
        return Xjs.RInvoke._rinvoke(m,"sv",args);
    },
    /*xjs.core.RInvoke.asynSVInvoke*/
    asynSVInvoke:function(m)
    {
        var args = Array.prototype.slice.call(arguments,1);
        return Xjs.RInvoke._asynInvoke(m,"sv",args);
    },
    /*xjs.core.RInvoke.flowInvoke*/
    flowInvoke:function(m)
    {
        var args = Array.prototype.slice.call(arguments,1);
        return Xjs.RInvoke._rinvoke(m,"fl",args);
    },
    /*xjs.core.RInvoke.rmGet*/
    rmGet:function(method,pm)
    {
        var url = Xjs.RInvoke.buildUIInvokeURL(null,"st-" + method,1);
        return Xjs.Ajax.invoke(url,null,pm,"get",16);
    },
    /*xjs.core.RInvoke.armGet*/
    armGet:function(method,pm,success,error)
    {
        var url = Xjs.RInvoke.buildUIInvokeURL(null,"st-" + method,1);
        return Xjs.Ajax.invoke(url,null,pm,"get",16,success,error);
    },
    /*xjs.core.RInvoke._rinvoke*/
    _rinvoke:function(m,type,args,success,error)
    {
        var progMode = typeof(m) != "string",
            method;
        if(progMode)
            method = m.runMethod;
        else 
            method = m;
        if(progMode)
        {
            var p = m;
            p.postArgs = args || [];
            p.runMethod = type + "~" + method;
            Xjs.ui.UIUtil.progressRun(p);
            return;
        }
        var url = Xjs.RInvoke.buildUIInvokeURL(null,(progMode ? type + "~" : type + "-") + method,1);
        return Xjs.Ajax.invoke(url,args,null,null,16 | 32,success,error);
    },
    /*xjs.core.RInvoke._asynInvoke*/
    _asynInvoke:function(m,type,args)
    {
        return new Promise(function(resolve,reject){
            Xjs.RInvoke._rinvoke(m,type,args,new Xjs.FuncCall(resolve,window),new Xjs.FuncCall(reject,window));
        });
    }
};
/*xjs/core/System.java*/
Xjs.namespace("Xjs.core");
Xjs.core.System = {
    /*xjs.core.System.loadNSLib*/
    loadNSLib:function()
    {
        if(!Xjs.websocket || !Xjs.websocket.NativeWebSorcket)
            Xjs.JsLoad.load("util/NativeService");
    },
    /*xjs.core.System.getNativeService*/
    getNativeService:function(url)
    {
        Xjs.core.System.loadNSLib();
        return Xjs.websocket.NativeWebSorcket.getNativeService(url);
    },
    /*xjs.core.System.launcherURL*/
    launcherURL:function(type,url)
    {
        Xjs.core.System.loadNSLib();
        Xjs.websocket.NativeWebSorcket.launcherURL(type,url);
    },
    /*xjs.core.System.newSharePointOpenDocuments*/
    newSharePointOpenDocuments:function()
    {
        for(var i=3;i >= 1;i--)
        {
            try
            {
                return new ActiveXObject("SharePoint.OpenDocuments." + i);
            }catch(ex)
            {
            }
        }
        return null;
    }
};
/*xjs/dx/CodeData.java*/
Xjs.namespace("Xjs.dx");
Xjs.dx.CodeData=function(config){
    Xjs.dx.CodeData.superclass.constructor.call(this,config);
    if(window.xjsConfig && window.xjsConfig.codeDataOpts)
    {
        Xjs.applyIf(this,window.xjsConfig.codeDataOpts);
    }
    this.service = Xjs.RInvoke.newBean("SN-UI.CodeDataService");
};
Xjs.extend(Xjs.dx.CodeData,Xjs.Object,{
  _js$className_:"Xjs.dx.CodeData",
    keyCount:1,
    lvColumn:0,
    /*xjs.dx.CodeData.setColumns*/
    setColumns:function(a)
    {
        this.columns = a;
    },
    /*xjs.dx.CodeData.getColumns*/
    getColumns:function()
    {
        if(!this.columns && this.loadParameter && this.loadParameter.CODEDEFID)
        {
            this._initParameter();
            var loadParameter = Xjs.apply({},this.xloadParameter,this.loadParameter);
            if(this.selectColumns)
                loadParameter.SelectColumns = this.selectColumns;
            if(this.loadColumnCmd)
            {
                var url = Xjs.RInvoke.buildUIInvokeURL(null,this.loadColumnCmd,1);
                this.columns = Xjs.Ajax.invoke(url,null,loadParameter,"get",16);
            } else 
            {
                this.columns = this.service.getCodeDataColumns(loadParameter);
            }
        }
        return this.columns;
    },
    /*xjs.dx.CodeData._initParameter*/
    _initParameter:function()
    {
        if(!this._$inited)
        {
            {
                var envMap = new Xjs.util.ValueMap(window.EnvParameter),
                    reqMap = new Xjs.util.ValueMap(window.EnvParameter.ReqParameter),
                    loadParam = {};
                Xjs.apply(loadParam,this.loadParam0);
                Xjs.apply(loadParam,this.loadParameter);
                for(var p in loadParam)
                {
                    var s = loadParam[p];
                    if(typeof(s) != "string")
                        continue;
                    if(s.indexOf("%EnvParam(") >= 0)
                    {
                        if(this.xloadParameter == null)
                            this.xloadParameter = {};
                        this.xloadParameter[p] = String.macroReplace(s,envMap,"%EnvParam(",")","",",");
                    }
                    if(s.indexOf("%ReqParam(") >= 0)
                    {
                        if(this.xloadParameter == null)
                            this.xloadParameter = {};
                        ;
                        this.xloadParameter[p] = String.macroReplace(s,reqMap,"%ReqParam(",")","",",");
                    }
                }
                if(this.onInitParameter)
                    this.onInitParameter.call(this,this);
            }
            this._$inited = true;
        }
    },
    /*xjs.dx.CodeData.isLastLevlCode*/
    isLastLevlCode:function(code)
    {
        if(typeof(code) != "string")
            return true;
        var lvColumn = this.lvColumn || 0,
            keyV = new Array(lvColumn + 1);
        keyV[lvColumn] = code;
        var cmp = Array.createCmp1([lvColumn]),
            data = this.data;
        if(!data && this.filterOnLocal)
        {
            data = this.getData(null,null,0,0);
        }
        if(data)
        {
            var p = Array.binarySearch(data,keyV,cmp);
            if(p < 0 || p >= data.length - 1)
                return true;
            var nextCode = data[p + 1][0];
            return typeof(nextCode) != "string" || !nextCode.startsWith(code);
        }
        if(this.lastRows)
        {
            var p = Array.binarySearch(this.lastRows,keyV,cmp);
            if(p >= 0)
            {
                return !this.lastULastlvIdx || Array.binarySearch(this.lastULastlvIdx,p) < 0;
            }
        }
        if(this.bufferedData)
            for(var k in this.bufferedData)
            {
                var v = this.bufferedData[k];
                if(v == null)
                    continue;
                var ulastlvIdx,
                    rows;
                rows = v.rows;
                ulastlvIdx = v.ulastlvIdx;
                var p = Array.binarySearch(rows,keyV,cmp);
                if(p >= 0)
                {
                    return !ulastlvIdx || Array.binarySearch(ulastlvIdx,p) < 0;
                }
            }
        return true;
    },
    /*xjs.dx.CodeData.setPgRowCount*/
    setPgRowCount:function(pgRowCount)
    {
        this.pgRowCount = pgRowCount;
    },
    /*xjs.dx.CodeData.setPgRowRange*/
    setPgRowRange:function(pgFromRow)
    {
        if(this.pgRowCount === undefined || this.pgRowCount <= 0)
        {
            this.pgFromRow = this.pgToRow = 0;
        } else 
        {
            this.pgFromRow = pgFromRow;
            this.pgToRow = pgFromRow + this.pgRowCount;
        }
    },
    /*xjs.dx.CodeData.getBufKey*/
    getBufKey:function()
    {
        var bufKey = (this.defaultPrefixCode || "") + ".0";
        if(this.keyParamNames)
        {
            for(var i=0;i < this.keyParamNames.length;i++)
            {
                var v = this.loadParameter[this.keyParamNames[i]];
                bufKey += "\t" + (v == null ? "" : v);
            }
        }
        return bufKey;
    },
    /*xjs.dx.CodeData.setData*/
    setData:function(a)
    {
        var bufKey = this.getBufKey();
        if(this.bufferedData == null)
            this.bufferedData = {};
        var v = {rows:a};
        this.bufferedData[bufKey] = v;
    },
    /*xjs.dx.CodeData.getData*/
    getData:function(dataFilters,prefixCode,levelCode,opts,histGrp)
    {
        if(this.defaultPrefixCode && arguments.length == 0)
        {
            prefixCode = this.defaultPrefixCode;
            levelCode = this.defaultLevelCode;
        }
        if(Xjs.dx.CodeData.isNullArray(dataFilters))
            dataFilters = null;
        var filterM = !!(dataFilters || prefixCode || levelCode);
        if(this.data)
        {
            this.lastRows = null;
            return filterM ? (this.unsorted ? this.filterUnsortedData(this.data,dataFilters,opts) : Xjs.dx.CodeData.filterSortedData(this.data,dataFilters,prefixCode,levelCode,opts)) : this.data;
        }
        if(this.filterOnLocal && filterM)
        {
            var v = this.getData(null,null,0,0);
            return this.lastRows = this.unsorted ? this.filterUnsortedData(v,dataFilters,opts) : Xjs.dx.CodeData.filterSortedData(v,dataFilters,prefixCode,levelCode,opts);
        }
        this._initParameter();
        var bufKey,
            loadParameter = Xjs.apply({},this.xloadParameter,this.loadParameter);
        if(!dataFilters)
        {
            bufKey = (prefixCode || "") + "." + (levelCode || 0);
            if(this.pgToRow > 0)
                bufKey += "[" + this.pgFromRow + "-" + this.pgToRow + "]";
            if(this.keyParamNames)
            {
                for(var i=0;i < this.keyParamNames.length;i++)
                {
                    var v = loadParameter[this.keyParamNames[i]];
                    if(v == null)
                        v = "";
                    bufKey += "\t" + v;
                }
            }
        } else 
        {
            bufKey = null;
        }
        if(histGrp)
            bufKey = bufKey == null ? "[HistGrp:" + histGrp + "]" : bufKey + "\t[HistGrp:" + histGrp + "]";
        {
            var bufData = this.bufferedData && bufKey ? this.bufferedData[bufKey] : null;
            if(bufData)
            {
                if(bufData.rows)
                {
                    this.totalRows = bufData.totalRows;
                    this.lastULastlvIdx = bufData.ulastlvIdx;
                    return bufData.rows;
                }
                this.totalRows = 0;
                this.lastULastlvIdx = null;
                return this.lastRows = bufData;
            }
        }
        var loadCommand = this.loadCommand;
        {
            if(!loadCommand)
                loadCommand = "sv-SN-UI.CodeDataService.loadCodeData";
            this.loadUri = Xjs.RInvoke.buildUIInvokeURL(null,loadCommand,1);
        }
        {
            if(dataFilters)
                loadParameter.dataFilters = dataFilters;
            if(prefixCode)
                loadParameter.prefixCode = prefixCode;
            if(levelCode)
                loadParameter.levlCode = levelCode;
            if(histGrp)
                loadParameter.histGrp = histGrp;
            if(opts)
                loadParameter.options = opts;
            if(this.pgToRow > 0)
            {
                loadParameter.pgFromRow = this.pgFromRow;
                loadParameter.pgToRow = this.pgToRow;
            }
            if(this.selectColumns)
                loadParameter.SelectColumns = this.selectColumns;
            var method = bufKey && !this.disableBrowserCache && !histGrp ? "get" : null,
                data = Xjs.Ajax.invoke(this.loadUri,null,loadParameter,method,16);
            if(data && !data.rows)
                data = {rows:data,totalRows:0,ulastlvIdx:null};
            if(bufKey && data && !this.noCache)
            {
                if(!this.bufferedData)
                    this.bufferedData = {};
                this.bufferedData[bufKey] = data;
            }
            this.totalRows = data.totalRows;
            this.lastULastlvIdx = data.ulastlvIdx;
            return this.lastRows = data.rows;
        }
    },
    /*xjs.dx.CodeData.clearHistValuesBuf*/
    clearHistValuesBuf:function()
    {
        if(this.bufferedData)
        {
            var rmNames = [];
            for(var k in this.bufferedData)
            {
                if(k.indexOf("[HistGrp:") >= 0)
                    rmNames.push(k);
            }
            for(var i=0;i < rmNames.length;i++)
            {
                delete this.bufferedData[rmNames[i]];
            }
        }
    },
    /*xjs.dx.CodeData.getSort*/
    getSort:function()
    {
        return this.sort;
    },
    /*xjs.dx.CodeData.clearBuffered*/
    clearBuffered:function()
    {
        delete this.bufferedData;
        delete this.lastRows;
    },
    /*xjs.dx.CodeData.getCodeName1*/
    getCodeName1:function(code,opts)
    {
        if(code == null)
            return null;
        var kcode = code instanceof Array ? code.join("\t") : code;
        if(this.bufNames)
        {
            var n = this.bufNames[kcode];
            if(n !== undefined)
                return n;
        }
        if(this.bufferedData && !(this.pgRowCount > 0))
        {
            for(var k in this.bufferedData)
            {
                var bufData = this.bufferedData[k];
                if(bufData && bufData.rows)
                    bufData = bufData.rows;
                var p = bufData ? Array.binarySearch(bufData,[code],Array.arrayCmp0) : -1;
                if(p >= 0)
                    return bufData[p][1];
            }
        }
        var data = this.data;
        if(!data && this.filterOnLocal)
        {
            data = this.getData(null,null,0,0);
        }
        if(data)
        {
            if(this.unsorted)
            {
                for(var p=0;p < data.length;p++)
                {
                    if(code == data[p][0])
                        return data[p][1];
                }
            } else 
            {
                var p = Array.binarySearch(data,[code],Array.arrayCmp0);
                if(p >= 0)
                    return data[p][1];
            }
        }
        if(!(opts & 1))
        {
            var na = this.rgetCodeNames([code]);
            if(na)
                return na[0];
        }
        return;
    },
    /*xjs.dx.CodeData.getLevlCode*/
    getLevlCode:function(code)
    {
        if(!code)
            return null;
        if(this.lvColumn > 0)
        {
            var lvCode = this.bufLvCodes ? this.bufLvCodes[code] : undefined;
            if(lvCode !== undefined)
                return lvCode;
            this._initParameter();
            var loadParameter = Xjs.apply({},this.xloadParameter,this.loadParameter);
            lvCode = this.service.getLevlCode(loadParameter,code);
            if(!this.bufLvCodes)
                this.bufLvCodes = {};
            this.bufLvCodes[code] = lvCode;
            return lvCode;
        }
        return code;
    },
    /*xjs.dx.CodeData.getCodeNames*/
    getCodeNames:function(codes)
    {
        if(!codes || codes.length == 0)
            return null;
        var names = new Array(codes.length),
            remote = false;
        for(var j=0;j < codes.length;j++)
        {
            names[j] = this.getCodeName1(codes[j],1);
            if(names[j] === undefined)
            {
                remote = true;
                break;
            }
        }
        return remote ? this.rgetCodeNames(codes) : names;
    },
    /*xjs.dx.CodeData.rgetCodeNames*/
    rgetCodeNames:function(codes)
    {
        this._initParameter();
        if(!this.loadParameter || !this.loadParameter.CODEDEFID)
            return null;
        var names = this.service.getCodeNames(this.getCodeDataLoadParameter(null),codes);
        if(names)
            for(var j=0;j < codes.length;j++)
            {
                if(!this.bufNames)
                    this.bufNames = {};
                if(codes[j] instanceof Array)
                    this.bufNames[codes[j].join("\t")] = names[j];
                else 
                    this.bufNames[codes[j]] = names[j];
            }
        return names;
    },
    /*xjs.dx.CodeData.rgetFullName*/
    rgetFullName:function(code,showLevlFullnm)
    {
        return this.service.getCodeFullName(this.getCodeDataLoadParameter(null),code,showLevlFullnm);
    },
    /*xjs.dx.CodeData.rgetCodeValues*/
    rgetCodeValues:function(codes,fullName,showLevlFullnm)
    {
        return this.service.loadCodeValues(this.getCodeDataLoadParameter(null),codes,fullName,showLevlFullnm);
    },
    /*xjs.dx.CodeData.getCodeDataLoadParameter*/
    getCodeDataLoadParameter:function(to)
    {
        this._initParameter();
        return Xjs.apply(to || {},this.xloadParameter,this.loadParameter);
    },
    /*xjs.dx.CodeData.setLoadParameter*/
    setLoadParameter:function(name,value)
    {
        var oldValue = this.loadParameter ? this.loadParameter[name] : null;
        if(value == oldValue)
            return;
        if(!this.keyParamNames || this.keyParamNames.indexOf(name) < 0)
            this.clearBuffered();
        if(value == null)
        {
            if(!this.loadParameter)
                return;
            delete this.loadParameter[name];
            return;
        }
        if(!this.loadParameter)
            this.loadParameter = {};
        this.loadParameter[name] = value;
        this.xloadParameter = null;
        this._$inited = false;
    },
    /*xjs.dx.CodeData.getLoadParameter*/
    getLoadParameter:function(name)
    {
        return this.loadParameter ? this.loadParameter[name] : null;
    },
    /*xjs.dx.CodeData.removeLoadParamItem*/
    removeLoadParamItem:function(name,jm,delim)
    {
        if(!this.loadParameter)
            return;
        var s = this.loadParameter[name];
        if(!s)
            return;
        var a = s.split(delim || ";");
        for(var i=a.length - 1;i >= 0;i--)
            if(a[i].startsWith(jm))
            {
                a.splice(i,1);
            }
        if(a.length == 0)
            delete this.loadParameter[name];
        else 
            this.loadParameter[name] = a.join(delim || ";");
    },
    /*xjs.dx.CodeData.filterUnsortedData*/
    filterUnsortedData:function(a,filter,opts)
    {
        var n = a == null ? 0 : a.length;
        if(n == 0)
            return a;
        var v = [],
            nf = filter != null ? filter.length : 0,
            filterRegExpr = null;
        if(nf > 0)
        {
            filterRegExpr = [];
            for(var j=0;j < nf;j++)
                filterRegExpr[j] = filter[j] ? filter[j].toLikeRegExpr("i") : null;
        }
        var orMode = (opts & 1) != 0;
        nextR:for(var r=0;r < a.length;r++)
            {
                match:{
                    for(var j=0;j < a[r].length && j < nf;j++)
                    {
                        if(!filter[j])
                            continue;
                        var x = a[r][j];
                        if(this.searchVal2Display)
                        {
                            x = this.searchVal2Display.call(a,r,j);
                        }
                        if(!filterRegExpr[j].test(x || ""))
                        {
                            if(!orMode)
                                continue nextR;
                        } else if(orMode)
                            break match;
                    }
                    if(orMode)
                        continue;
                }
                v.push(a[r]);
            }
        return v;
    },
    /*xjs.dx.CodeData.getLoadParams*/
    getLoadParams:function()
    {
        this._initParameter();
        return Xjs.apply({},this.xloadParameter,this.loadParameter);
    },
    /*xjs.dx.CodeData.getCodedefID*/
    getCodedefID:function()
    {
        return this.loadParameter ? this.loadParameter.CODEDEFID : null;
    },
    /*xjs.dx.CodeData.setPreKeyCodesByTbl*/
    setPreKeyCodesByTbl:function(ds,keyColumns)
    {
        if(this.keyCount <= 1)
        {
            this.preKeyCodes = null;
            return;
        }
        this.preKeyCodes = new Array(this.keyCount);
        for(var j=0;j < this.keyCount - 1;j++)
            this.preKeyCodes[j] = ds.getValue(keyColumns[j]);
    },
    /*xjs.dx.CodeData.getMasterPane*/
    getMasterPane:function(name,parent)
    {
        if(!name)
        {
            var c = parent.getMainParentComponent ? parent.getMainParentComponent() : null;
            return c ? c : parent.table;
        }
        if(parent.table)
            parent = parent.table;
        var c = parent.getRootComponent().getMainComponentByName(name);
        if(!c && parent.parent3)
            c = parent.parent3.getRootComponent().getMainComponentByName(name);
        return c;
    },
    /*xjs.dx.CodeData.prepareLoadParams*/
    prepareLoadParams:function(parent)
    {
        if(this.pmFromPane)
            for(var n in this.pmFromPane)
            {
                var pn = this.pmFromPane[n],
                    p = pn.indexOf("."),
                    n1 = p >= 0 ? pn.substring(0,p) : null;
                if(p >= 0)
                    pn = pn.substring(p + 1);
                var c = this.getMasterPane(n1 || this.nmDftPmPane,parent),
                    v;
                if(c)
                {
                    if(Xjs.table.Table && c instanceof Xjs.table.Table)
                    {
                        v = c.dataSet.getValue(pn);
                    } else 
                    {
                        v = c.getItemValue(pn);
                    }
                    if(!v && this.keyCount > 1 && (!("errorOnNull" in this) || this.errorOnNull))
                    {
                        var title = null;
                        if(Xjs.table.Table && c instanceof Xjs.table.Table)
                        {
                            title = c.getColumn(pn).title;
                        } else 
                        {
                            title = c.getItemByName(pn).title;
                        }
                        throw new Error("[" + title + "]不可为空！");
                    }
                } else 
                {
                    v = null;
                }
                this.setLoadParameter(n,v);
            }
    }
});
Xjs.apply(Xjs.dx.CodeData,{
    /*xjs.dx.CodeData.isNullArray*/
    isNullArray:function(a)
    {
        if(!a)
            return true;
        var n = a.length;
        for(var i=0;i < n;i++)
        {
            var s = a[i];
            if(s == "" || s == "%" || s == "%%")
                s = null;
            if(s)
                return false;
        }
        return true;
    },
    /*xjs.dx.CodeData.$new*/
    $new:function(cmConfig,loadParams)
    {
        var all = Xjs.dx.CodeData.all;
        if(all == null)
            all = Xjs.dx.CodeData.all = [];
        for(var i=0;i < all.length;i++)
        {
            if(Xjs.dx.CodeData.objEquals(all[i].loadParameter,loadParams) && Xjs.dx.CodeData.objEquals(all[i].initConfig,cmConfig))
            {
                return all[i];
            }
        }
        var p = {};
        if(cmConfig != null)
        {
            Xjs.apply(p,cmConfig);
        }
        if(loadParams)
            p.loadParameter = loadParams;
        var c = new Xjs.dx.CodeData(p);
        all.push(c);
        if(cmConfig != null)
            c.initConfig = cmConfig;
        return c;
    },
    /*xjs.dx.CodeData.objEquals*/
    objEquals:function(x1,x2)
    {
        if(x1 == x2)
            return true;
        if(!x1)
            x1 = {};
        if(!x2)
            x2 = {};
        for(var p in x1)
        {
            var v1 = x1[p],
                v2 = x2[p];
            if(v1 != v2 && (typeof(v1) != "object" || typeof(v2) != "object" || !Xjs.dx.CodeData.objEquals(v1,v2)))
                return false;
        }
        for(var p in x2)
        {
            var v1 = x1[p],
                v2 = x2[p];
            if(v1 != v2 && (typeof(v1) != "object" || typeof(v2) != "object" || !Xjs.dx.CodeData.objEquals(v1,v2)))
                return false;
        }
        return true;
    },
    /*xjs.dx.CodeData.filterSortedData*/
    filterSortedData:function(a,filter,prefixCode,leveved,opts)
    {
        var n = a == null ? 0 : a.length;
        if(n == 0)
            return a;
        var orMode = (opts & 1) != 0,
            v = [],
            r = 0,
            prefix = null;
        if(filter != null && filter[0] != null && filter[0].length > 0 && !orMode)
        {
            var j = 0;
            for(;j < filter[0].length;j++)
            {
                var c = filter[0].charCodeAt(j);
                if(c == 0x25 || c == 0x2a || c == 0x5f || c == 0x3f)
                    break;
            }
            if(j > 0)
            {
                prefix = filter[0].substring(0,j);
                r = Array.binarySearch(a,[prefix],Array.arrayCmp0);
                if(r < 0)
                    r = -(r + 1);
            }
        }
        if(prefixCode != null && prefixCode.length > 0)
        {
            var r2 = Array.binarySearch(a,[prefixCode],Array.arrayCmp0);
            if(r2 < 0)
                r2 = -(r2 + 1);
            if(r2 >= 0 && r2 < a.length && prefixCode == a[r2][0])
                r2++;
            if(r < r2)
                r = r2;
        }
        var nf = filter != null ? filter.length : 0,
            filterRegExpr = null;
        if(nf > 0)
        {
            filterRegExpr = [];
            for(var j=0;j < nf;j++)
                filterRegExpr[j] = filter[j] != null ? filter[j].toLikeRegExpr() : null;
        }
        var lastCode = null;
        nextR:for(;r < a.length;r++)
            {
                var code = a[r][0];
                if(prefix != null && !code.startsWith(prefix))
                    break;
                if(prefixCode != null && !code.startsWith(prefixCode))
                    break;
                match:{
                    for(var j=0;j < a[r].length && j < nf;j++)
                    {
                        if(filter[j] == null)
                            continue;
                        if(!filterRegExpr[j].test(a[r][j] || ""))
                        {
                            if(!orMode)
                                continue nextR;
                        } else if(orMode)
                            break match;
                    }
                    if(orMode)
                        continue;
                }
                if(leveved == 1)
                {
                    if(lastCode != null && a[r][0].startsWith(lastCode))
                        continue nextR;
                    lastCode = a[r][0];
                }
                v.push(a[r]);
            }
        return v;
    }
});
/*xjs/dx/CodeDataService.java*/
Xjs.RInvoke.beansDef["SN-UI.CodeDataService"]={getCodeDataColumns:{amethod:"get",argNames:["*"]},getCodeNames:{},getCodeName:{},getCodeFullName:{},loadCodeData:{amethod:"get",argNames:["*"]},searchLevlCodeData:{},getLevlCode:{},loadHistSelectedValues:{},addHistValue:{},removeHistValue:{},loadCodeValues:{}};
/*xjs/dx/Data.java*/
Xjs.dx.Data=function(config){
    Xjs.dx.Data.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.dx.Data,Xjs.Object,{
  _js$className_:"Xjs.dx.Data",
    /*xjs.dx.Data._loadData*/
    _loadData:function()
    {
        var url = Xjs.RInvoke.buildUIInvokeURL(null,this.invoke,1);
        return Xjs.Ajax.invoke(url,this.args,null,null,16 | 32);
    },
    /*xjs.dx.Data.getData*/
    getData:function()
    {
        if(this.data == null)
            return this.data = this._loadData();
        return this.data;
    },
    /*xjs.dx.Data.reload*/
    reload:function()
    {
        if(this.invoke)
            this.data = null;
    }
});
/*xjs/dx/DefaultDataSetListener.java*/
/*xjs/table/DefaultListener.java*/
Xjs.table.DefaultListener=Xjs.extend(Xjs.table.DefaultTableListener,{
  _js$className_:"Xjs.table.DefaultListener",
    /*xjs.table.DefaultListener.ensureDataSetOpened*/
    ensureDataSetOpened:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetFieldPosting*/
    dataSetFieldPosting:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetFieldPosted*/
    dataSetFieldPosted:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetFieldPostedFinal*/
    dataSetFieldPostedFinal:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetRowNavigating*/
    dataSetRowNavigating:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetRowNavigated*/
    dataSetRowNavigated:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetRowAdded*/
    dataSetRowAdded:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetRowDeleting*/
    dataSetRowDeleting:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetRowDeleted*/
    dataSetRowDeleted:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetSaving*/
    dataSetSaving:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetSaved*/
    dataSetSaved:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetRefreshing*/
    dataSetRefreshing:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataRefreshed*/
    dataRefreshed:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataLoading*/
    dataLoading:Xjs.emptyFn,
    /*xjs.table.DefaultListener.onDataLoad*/
    onDataLoad:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataLoaded*/
    dataLoaded:Xjs.emptyFn,
    /*xjs.table.DefaultListener.masterNulDataLoaded*/
    masterNulDataLoaded:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataClosed*/
    dataClosed:Xjs.emptyFn,
    /*xjs.table.DefaultListener.requestPostPending*/
    requestPostPending:Xjs.emptyFn,
    /*xjs.table.DefaultListener.requestCencelPending*/
    requestCencelPending:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetRowEditing*/
    dataSetRowEditing:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetRowUnedited*/
    dataSetRowUnedited:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetRowPosting*/
    dataSetRowPosting:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetRowPosted*/
    dataSetRowPosted:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetRowSelected*/
    dataSetRowSelected:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetChanged*/
    dataSetChanged:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetGrouped*/
    dataSetGrouped:Xjs.emptyFn,
    /*xjs.table.DefaultListener.addDataSetNotify*/
    addDataSetNotify:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetRowSelecting*/
    dataSetRowSelecting:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetAllRowSelecting*/
    dataSetAllRowSelecting:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetAllRowSelected*/
    dataSetAllRowSelected:Xjs.emptyFn,
    /*xjs.table.DefaultListener.isRowDeleteable*/
    isRowDeleteable:Xjs.emptyFn,
    /*xjs.table.DefaultListener.dataSetTreeChildNodesLoading*/
    dataSetTreeChildNodesLoading:Xjs.emptyFn,
    /*xjs.table.DefaultListener.refreshingByKeyValue*/
    refreshingByKeyValue:Xjs.emptyFn,
    /*xjs.table.DefaultListener.refreshedByKeyValue*/
    refreshedByKeyValue:Xjs.emptyFn,
    /*xjs.table.DefaultListener.onDataSetNewRowValues*/
    onDataSetNewRowValues:Xjs.emptyFn
});
Xjs.apply(Xjs.table.DefaultListener,{
    /*xjs.table.DefaultListener.formatDate*/
    formatDate:function(date,format)
    {
        if(!date)
        {
            return "";
        }
        if(date instanceof Date)
        {
            var formateDate = date,
                o = {};
            o["M+"] = formateDate.getMonth() + 1;
            o["d+"] = formateDate.getDate();
            o["h+"] = formateDate.getHours();
            o["m+"] = formateDate.getMinutes();
            o["s+"] = formateDate.getSeconds();
            o["q+"] = Math.floor((formateDate.getMonth() + 3) / 3);
            o.S = formateDate.getMilliseconds();
            if((new RegExp("(y+)")).test(format))
            {
                format = format.replace(RegExp.$1,(formateDate.getFullYear() + "").substring(4 - RegExp.$1.length));
            }
            for(var k in o)
            {
                if((new RegExp("(" + k + ")")).test(format))
                {
                    format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substring(("" + o[k]).length));
                }
            }
            return format;
        }
        return format;
    }
});
/*xjs/ui/Anchor.java*/
Xjs.ui.Anchor=function(config){
    Xjs.ui.Anchor.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.Anchor,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.Anchor",
    /*xjs.ui.Anchor._createDOM*/
    _createDOM:function(root)
    {
        this.adom = this._createDom0(root,"a");
        if(this.href)
            this.adom.href = this.href;
        if(this.target)
            this.adom.target = this.target;
        if(this.innerHTML)
            this.adom.innerHTML = this.innerHTML;
        return this.adom;
    },
    /*xjs.ui.Anchor.setHRef*/
    setHRef:function(href)
    {
        this.href = href;
        if(this.adom != null)
            this.adom.href = href;
    }
});
/*xjs/ui/AttachUtils.java*/
Xjs.ui.AttachUtils=function(){};
Xjs.apply(Xjs.ui.AttachUtils,{
    /*xjs.ui.AttachUtils.getInnerHTML*/
    getInnerHTML:function(html,tag)
    {
        var p1 = html.indexOf("<" + tag);
        if(p1 >= 0)
        {
            p1 = html.indexOf(">",p1);
            var p2 = p1 < 0 ? -1 : html.indexOf("</" + tag,p1);
            if(p1 >= 0 && p2 >= 0)
            {
                html = html.substring(p1 + 1,p2).trim();
            }
        }
        return html;
    },
    /*xjs.ui.AttachUtils.getInnerHTMLBody*/
    getInnerHTMLBody:function(html)
    {
        return Xjs.ui.AttachUtils.getInnerHTML(Xjs.ui.AttachUtils.getInnerHTML(html,"html"),"body");
    },
    /*xjs.ui.AttachUtils.loadHTMLBody*/
    loadHTMLBody:function(html)
    {
        if(!html)
            return null;
        if(html.charCodeAt(0) == 0x40)
            html = Xjs.loadUrlRES(html.substring(1),true);
        return Xjs.ui.AttachUtils.getInnerHTMLBody(html);
    },
    /*xjs.ui.AttachUtils.attachToHTML*/
    attachToHTML:function(html,ui,options)
    {
        html = Xjs.ui.AttachUtils.loadHTMLBody(html);
        var htmlE = document.createElement("HTML"),
            bodyE = document.createElement("BODY");
        bodyE.innerHTML = html.trim();
        htmlE.appendChild(bodyE);
        Xjs.DOM.removeEmptyTextNode(bodyE);
        var dom,
            n = bodyE.childNodes.length;
        if(n != 1)
        {
            dom = document.createElement("div");
            dom.id = "__TmpAttachedBody__";
            var a = new Array(n);
            for(var j=0;j < n;j++)
                a[j] = bodyE.childNodes[j];
            for(var j=0;j < n;j++)
            {
                bodyE.removeChild(a[j]);
                dom.appendChild(a[j]);
            }
        } else 
        {
            dom = bodyE.childNodes[0];
        }
        ui._setAttachRootDOM(dom);
        return dom;
    }
});
/*xjs/ui/BorderPane.java*/
Xjs.ui.BorderPane=function(cfg){
    Xjs.ui.BorderPane.superclass.constructor.call(this,cfg);
    this.itemsLayout = new Xjs.ui.BorderLayout();
    this.className = "ui-bordepane";
};
Xjs.extend(Xjs.ui.BorderPane,Xjs.ui.Container,{
  _js$className_:"Xjs.ui.BorderPane"
});
/*xjs/ui/Canvas.java*/
Xjs.ui.Canvas=function(config){
    Xjs.ui.Canvas.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.Canvas,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.Canvas",
    /*xjs.ui.Canvas.getCanvasDOM*/
    getCanvasDOM:function()
    {
        this._initContext();
        return this.canvasDOM;
    },
    /*xjs.ui.Canvas.getDrawDOM*/
    getDrawDOM:function()
    {
        if(this.canvasDOM)
            this._initContext();
        return this.drawDOM;
    },
    /*xjs.ui.Canvas._createDOM*/
    _createDOM:function(root)
    {
        var pdom = Xjs.ui.Canvas.superclass._createDom0.call(this,root,"div");
        if(this.scrollable)
        {
            pdom.style.overflow = this.scrollable === true ? "auto" : this.scrollable;
        }
        if(this.canvasType == 2)
        {
            this.drawDOM = pdom;
            return pdom;
        }
        var d;
        if(this.canvasType == 1)
            d = this.drawDOM = document.createElement("DIV");
        else 
            d = this.drawDOM = this.canvasDOM = document.createElement("canvas");
        if(this.id != null)
            d.id = this.id;
        if(this.name != null)
            d.name = this.name;
        this._initContext();
        var w = this.imgWidth || this.width;
        if(w > 0)
        {
            if(this.canvasType == 1)
                d.style.width = w + "px";
            else 
                d.width = w;
        }
        var h = this.imgHeight || this.height;
        if(h > 0)
        {
            if(this.canvasType == 1)
                d.style.height = h + "px";
            else 
                d.height = h;
        }
        pdom.appendChild(d);
        return pdom;
    },
    /*xjs.ui.Canvas.setImgSize*/
    setImgSize:function(w,h)
    {
        this.imgWidth = w;
        this.imgHeight = h;
        if(this.drawDOM)
        {
            w = this.imgWidth || this.width;
            if(w > 0)
                this.drawDOM.width = w;
            h = this.imgHeight || this.height;
            if(h > 0)
                this.drawDOM.height = h;
        }
    },
    /*xjs.ui.Canvas._initContext*/
    _initContext:function()
    {
        if(this.contextInited)
            return;
        if(this.canvasDOM && !this.canvasDOM . getContext && Xjs.DOM.isShowing(this.canvasDOM))
        {
            if(window.FlashCanvas)
            {
                FlashCanvas.initElement(this.canvasDOM);
            }
            this.contextInited = true;
        }
    },
    /*xjs.ui.Canvas.checkShowing*/
    checkShowing:function(firstFocus,setFirstFocus)
    {
        this._initContext();
    },
    /*xjs.ui.Canvas.onResize*/
    onResize:Xjs.emptyFn
});
/*xjs/ui/CellRenderer.java*/
Xjs.ui.CellRenderer = {
    /*xjs.ui.CellRenderer.getCodeKey*/
    getCodeKey:function(cell,value,row)
    {
        var knm;
        if(!(knm = cell.codeKeyNms))
            return value;
        if(!cell.table && cell.parent && cell.parent instanceof Xjs.ui.Container)
        {
            var parent = cell.parent,
                key = new Array(knm.length);
            for(var i=0;i < key.length - 1;i++)
            {
                key[i] = parent.getItemValue(knm[i]);
            }
            key[key.length - 1] = value;
            return key;
        }
        var key = new Array(knm.length),
            nulKey = 0;
        for(var i=0;i < key.length;i++)
        {
            if(knm[i])
                key[i] = cell.table.getValue(knm[i]);
            else 
            {
                key[i] = value;
                nulKey++;
            }
        }
        if(nulKey == 0)
            key[key.length - 1] = value;
        return key;
    },
    /*xjs.ui.CellRenderer.getCellDisplayName*/
    getCellDisplayName:function(cell,value)
    {
        var o = cell.selectOptions;
        if(o == null)
            return null;
        if(o instanceof Xjs.dx.CodeData)
        {
            var codeData = o;
            codeData.prepareLoadParams(cell);
            return codeData.getCodeName1(Xjs.ui.CellRenderer.getCodeKey(cell,value));
        }
        if(o instanceof Array)
        {
            var n = o.length;
            for(var i=0;i < n;i++)
            {
                if(value == o[i][0])
                {
                    return o[i].length < 2 ? value : o[i][1];
                }
            }
        }
        return null;
    },
    /*xjs.ui.CellRenderer.getMCodePrefix*/
    getMCodePrefix:function(cell,row)
    {
        var nma = cell.codeKeyNms;
        if(nma == null || cell.table == null || cell.table.dataSet == null)
            return "";
        var dataSet = cell.table.dataSet,
            a = [];
        for(var i=0;i < nma.length - 1;i++)
        {
            var v = dataSet.getValue(nma[i],row);
            a.push(v == null ? "" : v);
        }
        a.push("");
        return a.join("\t");
    },
    /*xjs.ui.CellRenderer.getValueName*/
    getValueName:function(cellInfo,value)
    {
        if(value == null)
            return null;
        var cell = cellInfo.cell,
            row = cellInfo.row,
            codePrefix = Xjs.ui.CellRenderer.getMCodePrefix(cell,row),
            kcode = Xjs.ui.CellRenderer.getCodeKey(cell,value,row),
            fullName = cell.showFullName,
            trimName = cell.trimName || fullName,
            codeData;
        if(cell.selectOptions instanceof Xjs.dx.CodeData)
            codeData = cell.selectOptions;
        else 
            codeData = null;
        if(cell.valueMap)
        {
            var n = cell.valueMap[codePrefix + value];
            if(n != null)
            {
                if(fullName && (!codeData || (codeData.lvColumn || 0) == 0))
                {
                    var code = value.toString(),
                        lvFullnm = cell.showLvFullnm,
                        fnCodes = lvFullnm ? [n] : null;
                    for(var i=code.length - 1;i > 0;i--)
                    {
                        var s = cell.valueMap[codePrefix + code.substring(0,i)];
                        if(trimName && s)
                            s = s.trim();
                        if(s != null && s.length > 0)
                        {
                            n = n.length > 0 ? s + "-" + n : s;
                            if(fnCodes)
                            {
                                fnCodes.splice(0,0,s);
                            }
                        }
                    }
                    if(fnCodes)
                    {
                        n = "";
                        for(var i=0;i < fnCodes.length;i++)
                        {
                            var i1 = i + 1,
                                i2 = -(fnCodes.length - 1 - i),
                                show = false;
                            for(var j=0;j < lvFullnm.length;j++)
                            {
                                if(lvFullnm[j] == i1 || lvFullnm[j] == i2)
                                {
                                    show = true;
                                    break;
                                }
                            }
                            if(show)
                            {
                                n += n.length > 0 ? "-" + fnCodes[i] : fnCodes[i];
                            }
                        }
                    }
                }
                return n;
            } else if(n === null)
            {
                if(!codeData || !codeData._reloadNulCodeName)
                    return null;
            }
        }
        if(!cell.valueMap)
            cell.valueMap = {};
        var nmText = fullName ? null : Xjs.ui.CellRenderer.getCellDisplayName(cell,value);
        if(nmText == null)
        {
            var m = null;
            if(codeData)
            {
                if(fullName)
                {
                    if(codeData.lvColumn > 0)
                    {
                        nmText = codeData.rgetFullName(kcode,cell.showLvFullnm);
                        if(nmText == null)
                            nmText = "";
                        cell.valueMap[codePrefix + value] = nmText;
                        return nmText;
                    } else 
                    {
                        m = codeData.rgetCodeValues([kcode],true,null);
                    }
                } else 
                {
                    var a = codeData.getCodeNames([kcode]);
                    nmText = a != null && a.length > 0 ? a[0] : null;
                    if(nmText == null)
                        nmText = "";
                    cell.valueMap[codePrefix + value] = nmText;
                    return nmText;
                }
            } else 
            {
                var tbl = cell.table || cell.getMainParentComponent();
                m = tbl.uiInvoke(fullName ? "!getcodefname" : "!getcodename",cell.name,kcode);
            }
            if(cell.valueMap == null)
                cell.valueMap = {};
            if(m)
            {
                for(var p in m)
                {
                    cell.valueMap[codePrefix + p] = m[p];
                }
                nmText = cell.valueMap[codePrefix + value];
            }
            if(nmText == null)
                cell.valueMap[codePrefix + value] = "";
        } else 
        {
            cell.valueMap[codePrefix + value] = nmText;
        }
        if(trimName && nmText != null)
            nmText = nmText.trim();
        if(fullName && cell.valueMap && (codeData == null || codeData.lvColumn == 0))
        {
            var code = value.toString();
            for(var i=code.length - 1;i > 0;i--)
            {
                var s = cell.valueMap[codePrefix + code.substring(0,i)];
                if(trimName && s != null)
                    s = s.trim();
                if(s != null && s.length > 0)
                {
                    nmText = nmText != null && nmText.length > 0 ? s + "-" + nmText : s;
                }
            }
        }
        return nmText;
    },
    /*xjs.ui.CellRenderer.defaultRenderer*/
    defaultRenderer:function(value,info)
    {
        if(value == null)
            return "";
        var cell = info.cell;
        if(value instanceof Date)
        {
            return value.format(cell.datefmt);
        }
        var forEdit = info.forEdit;
        if(cell.showName || cell.showFullName)
        {
            var s = null;
            if(cell.bitMode)
            {
                var intV = value;
                for(var i=0;i < 32;i++)
                {
                    var x = intV & 1 << i;
                    if(x == 0)
                        continue;
                    var s1 = Xjs.ui.CellRenderer.value2String1(info,x,false);
                    if(s1 != null)
                        s = s == null ? s1 : s + cell.mutiValueDelim + s1;
                }
                return s;
            }
            if(cell.mutiValueDelim == null)
                return Xjs.ui.CellRenderer.value2String1(info,value,forEdit);
            var a = value.split(cell.mutiValueDelim);
            for(var i=0;i < a.length;i++)
            {
                var s1 = Xjs.ui.CellRenderer.value2String1(info,a[i],forEdit);
                if(s1 != null)
                    s = s == null ? s1 : s + cell.mutiValueDelim + s1;
            }
            return s;
        }
        if(typeof(value) == "number")
        {
            if(cell.hideIfZero && !forEdit && value == 0)
            {
                return "";
            }
            if(cell.percent > 1)
            {
                value = value * cell.percent;
            }
            if(info.cell.negred && value < 0 && !forEdit && !info.forGetCellText)
            {
                value = -value;
                info.color = "red";
            }
            var minDeci = cell.minDecimals || 0,
                maxDeci = cell.maxDecimals === undefined ? -1 : cell.maxDecimals;
            if(cell.percent == 100)
            {
                if(maxDeci > 2)
                    maxDeci -= 2;
                if(minDeci > 2)
                    minDeci -= 2;
            }
            var s = Number.format(value,minDeci,maxDeci,cell.deciCommas && !forEdit);
            if(cell.percent > 0 && !forEdit)
            {
                if(cell.percent == 100)
                    s += "%";
                else 
                    s += "/" + cell.percent;
            }
            return s;
        }
        return value.toString();
    },
    /*xjs.ui.CellRenderer.value2String1*/
    value2String1:function(cellInfo,value,forEdit)
    {
        var cell = cellInfo.cell,
            nmText;
        nmText = Xjs.ui.CellRenderer.getValueName(cellInfo,value);
        return nmText == null || nmText == "" || nmText == value ? value.toString() : ((cellInfo.showCode === undefined ? cell.showCode || forEdit : cellInfo.showCode) ? value + ":" + nmText : nmText);
    }
};
{
    Xjs.ui.CellRenderer.defaultCellRender = {cellRender:Xjs.ui.CellRenderer.defaultRenderer};
}/*xjs/ui/Checkbox.java*/
Xjs.ui.Checkbox=function(config){
    Xjs.ui.Checkbox.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.Checkbox,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.Checkbox",
    inputType:"checkbox",
    focusableComp:true,
    isItemComp:true,
    /*xjs.ui.Checkbox._createDOM*/
    _createDOM:function(root)
    {
        var spanDOM = this._forChkGrp ? document.createElement("span") : this._createDom0(root,"span");
        spanDOM.className = "ui-check";
        spanDOM.id = this.id;
        spanDOM.onclick = Function.bindAsEventListener(this.onMClick,this);
        if(this.focusable !== false)
            spanDOM.tabIndex = 0;
        if(this.readOnly && !(this.focusOpts & 1))
        {
            this.focusableComp = false;
        }
        var checked = this._isValChecked();
        Xjs.DOM.createChild(spanDOM,"span","check");
        var dom = this.checkDOM = document.createElement("input");
        dom.type = this.inputType;
        dom.onclick = Function.bindAsEventListener(this.onChanged,this);
        dom.onfocus = Function.bindAsEventListener(this._onFocus,this,0,true);
        dom.onblur = Function.bindAsEventListener(this._onBlur,this,0,true);
        if(this.checkValue !== undefined)
        {
            dom.value = this.checkValue;
        }
        if(this.color != null)
            dom.style.color = this.color;
        if(this.bgcolor != null)
            dom.style.backgroundColor = this.bgcolor;
        if(checked)
            dom.checked = true;
        if(this.disabled)
            dom.disabled = true;
        dom.name = this.name;
        if(this.id)
            dom.id = this.basCheckDomID = this.inputType + "$" + this.id;
        if(this.idSuffix)
            dom.id += this.idSuffix;
        spanDOM.appendChild(dom);
        this.labelDOM = document.createElement("label");
        if(this.labelCheck !== false && this.id)
            this.labelDOM.htmlFor = dom.id;
        if(this.lbHtml)
        {
            this.labelDOM.innerHTML = typeof(this.lbHtml) == "string" ? this.lbHtml : this.label;
        } else if(this.label)
        {
            Xjs.DOM.setTextContent(this.labelDOM,this.label);
        }
        spanDOM.appendChild(this.labelDOM);
        return spanDOM;
    },
    /*xjs.ui.Checkbox.updateDomFocusEvent*/
    updateDomFocusEvent:function()
    {
        if(!this.checkDOM || !this.dom)
            return;
        if(this.checkDOM.disabled)
        {
            this.dom.onfocus = this.checkDOM.onfocus;
            this.dom.onblur = this.checkDOM.onblur;
        } else 
        {
            this.dom.onfocus = null;
            this.dom.onblur = null;
        }
    },
    /*xjs.ui.Checkbox.setCheckDomIdSuffix*/
    setCheckDomIdSuffix:function(idSuffix)
    {
        this.idSuffix = idSuffix;
        if(this.checkDOM)
        {
            this.checkDOM.id = this.basCheckDomID + (idSuffix || "");
            if(this.labelDOM)
                this.labelDOM.htmlFor = this.checkDOM.id;
        }
    },
    /*xjs.ui.Checkbox.updateReadonlyStatus*/
    updateReadonlyStatus:function()
    {
        var readOnly = this.readOnly || this.compEditable && this.compEditable.isEditReadonly(this);
        if(this.checkDOM)
            this.checkDOM.disabled = !!readOnly;
        if(!(this.focusOpts & 1))
            this.focusableComp = !readOnly;
        this.updateDomFocusEvent();
        this.resetClassName();
    },
    /*xjs.ui.Checkbox.setReadonly*/
    setReadonly:function(readOnly,setDefReadonly)
    {
        if(this.readOnly != readOnly)
        {
            this.readOnly = readOnly;
            this.updateReadonlyStatus();
        }
        if(setDefReadonly !== false)
        {
            this.defReadonly = readOnly;
        }
    },
    /*xjs.ui.Checkbox.resetClassName*/
    resetClassName:function()
    {
        if(!this.checkDOM)
            return;
        var idx = (this.inputType == "radio" ? 4 : 0) | (this.checkDOM.checked ? 2 : 0) | (this.checkDOM.disabled ? 1 : 0);
        this.dom.className = "ui-check ui-check" + idx + (this._focused ? " ui-focused-checkbox" : "");
    },
    /*xjs.ui.Checkbox.getValue*/
    getValue:function()
    {
        return this.checkDOM ? (this.checkDOM.checked ? this.checkValue || true : null) : this.value;
    },
    /*xjs.ui.Checkbox._isValChecked*/
    _isValChecked:function()
    {
        return this.checkValue !== undefined ? this.value == this.checkValue : !!this.value;
    },
    /*xjs.ui.Checkbox.isChecked*/
    isChecked:function()
    {
        return this.checkDOM ? this.checkDOM.checked : this._isValChecked();
    },
    /*xjs.ui.Checkbox.setChecked*/
    setChecked:function(check)
    {
        this.setValue(check ? (this.checkValue !== undefined ? this.checkValue : true) : null);
    },
    /*xjs.ui.Checkbox.setValue*/
    setValue:function(value)
    {
        var oldValue = this.getValue();
        this.value = value;
        if(this.checkDOM)
            this.checkDOM.checked = this._isValChecked();
        this.resetClassName();
        if(oldValue != this.getValue())
            this.fireEvent("valueChanged");
    },
    /*xjs.ui.Checkbox.onMClick*/
    onMClick:function(e)
    {
        if((e.srcElement || e.target) == this.dom)
        {
            if(this._forChkGrp && this.inputType == "radio")
            {
                this._forChkGrp.setValue(this.checkValue);
            }
        }
    },
    /*xjs.ui.Checkbox.onChanged*/
    onChanged:function(e,opts)
    {
        this.resetClassName();
        Xjs.ui.Checkbox.superclass.onChanged.call(this,e,opts);
    },
    /*xjs.ui.Checkbox.onDomCreated*/
    onDomCreated:function(root)
    {
        Xjs.ui.Checkbox.superclass.onDomCreated.call(this,root);
        this.updateReadonlyStatus();
    },
    /*xjs.ui.Checkbox.focus*/
    focus:function()
    {
        if(Xjs.DOM.isShowing(this.checkDOM))
            try
            {
                if(this.checkDOM.disabled)
                    this.dom.focus();
                else 
                    this.checkDOM.focus();
            }catch(ex)
            {
            }
    },
    /*xjs.ui.Checkbox._onFocus*/
    _onFocus:function(e)
    {
        this._focused = true;
        this.fireEvent("focusGained");
        this.resetClassName();
        if(this._fonFocus)
            this._fonFocus.call(e);
    },
    /*xjs.ui.Checkbox._onBlur*/
    _onBlur:function(e)
    {
        this._focused = false;
        this.resetClassName();
        if(this._fonBlur)
            this._fonBlur.call(e);
    }
});
{
    Xjs.UITYPES.checkbox = Xjs.ui.Checkbox;
}/*xjs/ui/CheckboxGroup.java*/
Xjs.ui.CheckboxGroup=function(config){
    Xjs.ui.CheckboxGroup.superclass.constructor.call(this,config);
    if(this.sqlType == 4 || this.sqlType == 5)
    {
        this.intValue = true;
    }
};
Xjs.extend(Xjs.ui.CheckboxGroup,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.CheckboxGroup",
    focusCls:["ui-focusborder","ui-focused-checkboxgroup"],
    /*xjs.ui.CheckboxGroup.__init*/
    __init:function()
    {
        this.focusableComp = true;
        this.isDlgItemComp = true;
    },
    /*xjs.ui.CheckboxGroup._createDOM*/
    _createDOM:function(root)
    {
        if(this.readOnly)
            this.focusableComp = false;
        {
            var layoutCfgs = {},
                cfg2 = false;
            if(this.columnCount)
            {
                layoutCfgs.columnCount = this.columnCount;
                cfg2 = true;
            }
            if(this.cellSpacing > 0)
            {
                layoutCfgs.cellSpacing = this.cellSpacing;
                cfg2 = true;
            }
            if(this.cellPadding > 0)
            {
                layoutCfgs.cellPadding = this.cellPadding;
                cfg2 = true;
            }
            if(cfg2)
                this.layoutConfig = Xjs.apply(this.layoutConfig || {},layoutCfgs);
            this.layout = new Xjs.ui.GridLayout(this.layoutConfig);
            if(this.layoutInvibleItem !== undefined)
                this.layout.ignoreInvisible = !this.layoutInvibleItem;
        }
        this._buildChkItems();
        var dom = this._createDom0(root,"div",null);
        this.layout.attachItemDoms(this,dom,root);
        Xjs.DOM.addClass(dom,"ui-checkboxgroup");
        delete this.items;
        if(this.value != null)
            this._setInitValue(dom);
        delete this.__tempValueA;
        delete this.__invisibleVals;
        if(this.color != null)
            dom.style.color = this.color;
        if(this.bgcolor != null)
            dom.style.backgroundColor = this.bgcolor;
        if(this.focusable !== false)
            dom.tabIndex = 0;
        dom.onfocus = Function.bindAsEventListener(this._onFocus,this,0,true);
        dom.onblur = Function.bindAsEventListener(this._onBlur,this,0,true);
        return dom;
    },
    /*xjs.ui.CheckboxGroup._buildChkItems*/
    _buildChkItems:function()
    {
        var optData = this.getSelectOptions();
        if(this.emptyText != null)
        {
            var old = optData;
            optData = new Array(old.length + 1);
            if(this.emptyItemPos == 1)
            {
                for(var j=0;j < old.length;j++)
                    optData[j] = old[j];
                optData[old.length] = ["",this.emptyText];
            } else 
            {
                optData[0] = ["",this.emptyText];
                for(var j=0;j < old.length;j++)
                    optData[j + 1] = old[j];
            }
        }
        this.items = this.checkItems = [];
        var _onItemFocusL = null,
            onItemBlurL = null;
        if(optData != null)
        {
            this._$onChanged = Function.bindAsEventListener(this.onChanged,this);
            for(var i=0;i < optData.length;i++)
            {
                var a = optData[i];
                if(!Xjs.isArray(a))
                    a = [a];
                var value = a[0],
                    text = a.length < 2 ? a[0] : a[1];
                if(!_onItemFocusL)
                {
                    _onItemFocusL = new Xjs.FuncCall(this._onItemFocus,this);
                    onItemBlurL = new Xjs.FuncCall(this._onItemBlur,this);
                }
                var c = new Xjs.ui.Checkbox({id:(this.id || "") + "#" + value,label:text,checkValue:value,_fonFocus:_onItemFocusL,_fonBlur:onItemBlurL,focusable:false,_forChkGrp:this});
                if(this.opts & 1)
                    c.lbHtml = text;
                if(this.itemCSSStyle)
                    c.domStyle = this.itemCSSStyle;
                if(!this.multiple)
                {
                    c.inputType = "radio";
                    c.name = this.cname || this.name;
                } else 
                {
                    c.name = (this.cname || this.name || "") + "#" + value;
                }
                if(this._isCheckedItemValue(this.value,value))
                    c.value = value;
                this.items[i] = c;
                c.getDOM();
                c.checkDOM.onclick = this._$onChanged;
                if(this.__invisibleVals != null && this.__invisibleVals.indexOf(value) >= 0)
                {
                    c.setVisible(false);
                }
                if(this.idSuffix)
                {
                    c.setCheckDomIdSuffix(this.idSuffix);
                }
            }
        }
    },
    /*xjs.ui.CheckboxGroup.setCheckDomIdSuffix*/
    setCheckDomIdSuffix:function(idSuffix)
    {
        if(this.idSuffix != idSuffix)
        {
            this.idSuffix = idSuffix;
            if(this.checkItems)
                for(var i=0;i < this.checkItems.length;i++)
                    this.checkItems[i].setCheckDomIdSuffix(idSuffix);
        }
    },
    /*xjs.ui.CheckboxGroup.getItemDOM*/
    getItemDOM:function(value)
    {
        if(this.dom == null)
            return null;
        var inputDoms = this.dom.getElementsByTagName("input");
        if(inputDoms)
            for(var i=0;i < inputDoms.length;i++)
            {
                if(inputDoms[i].value == value)
                    return inputDoms[i].parentNode;
            }
        return null;
    },
    /*xjs.ui.CheckboxGroup.setItemEnabled*/
    setItemEnabled:function(value,enable,opts)
    {
        var d = this.getItemDOM(value);
        if(d)
        {
            for(var i=0;i < d.childNodes.length;i++)
            {
                d.childNodes[i].disabled = !enable;
            }
        }
        if(this.checkItems)
        {
            for(var i=0;i < this.checkItems.length;i++)
            {
                if(value == this.checkItems[i].checkValue)
                {
                    if(opts & 1)
                        this.checkItems[i].enabledOnGrp = enable;
                    this.checkItems[i].resetClassName();
                    break;
                }
            }
        }
    },
    /*xjs.ui.CheckboxGroup.getCheckboxByValue*/
    getCheckboxByValue:function(v)
    {
        if(this.checkItems)
            for(var j=0;j < this.checkItems.length;j++)
            {
                if(this.checkItems[j].checkValue == v)
                    return this.checkItems[j];
            }
        return null;
    },
    /*xjs.ui.CheckboxGroup.setItemVisible*/
    setItemVisible:function(value,visible)
    {
        var d = this.getItemDOM(value),
            c = this.getCheckboxByValue(value);
        if(c)
            c.setVisible(visible);
        if(d)
        {
            if(d.parentNode.tagName == "TD")
                d.parentNode.style.display = visible ? "" : "none";
            else 
                d.style.display = visible ? "" : "none";
        } else 
        {
            if(!this.__invisibleVals)
            {
                if(visible)
                    return;
                this.__invisibleVals = [];
            }
            var oldVisible = this.__invisibleVals.indexOf(value) < 0;
            if(oldVisible == visible)
                return;
            if(visible)
                Array.removeElement(this.__invisibleVals,value);
            else 
                this.__invisibleVals.push(value);
        }
    },
    /*xjs.ui.CheckboxGroup.setItemLabel*/
    setItemLabel:function(value,label)
    {
        if(this.checkItems)
            for(var i=0;i < this.checkItems.length;i++)
            {
                if(value == this.checkItems[i].checkValue)
                {
                    var d;
                    if(d = this.checkItems[i].labelDOM)
                        Xjs.DOM.setTextContent(d,label);
                    break;
                }
            }
    },
    /*xjs.ui.CheckboxGroup.updateReadonlyStatus*/
    updateReadonlyStatus:function()
    {
        var readOnly = this.readOnly || this.compEditable && this.compEditable.isEditReadonly(this);
        this.focusableComp = !readOnly;
        if(this.dom && this.checkItems)
        {
            for(var i=0;i < this.checkItems.length;i++)
            {
                this.checkItems[i].checkDOM.disabled = this.checkItems[i].enabledOnGrp !== undefined ? !this.checkItems[i].enabledOnGrp : (readOnly ? true : false);
            }
        }
        this.resetClassName();
    },
    /*xjs.ui.CheckboxGroup.setReadonly*/
    setReadonly:function(readOnly,setDefReadonly)
    {
        if(this.readOnly != readOnly)
        {
            this.readOnly = readOnly;
            this.updateReadonlyStatus();
        }
        if(setDefReadonly !== false)
        {
            this.defReadonly = readOnly;
        }
    },
    /*xjs.ui.CheckboxGroup.focus*/
    focus:function()
    {
        if(this.dom == null)
            return;
        this.dom.focus();
        var inputDoms = this.dom.getElementsByTagName("input");
        if(inputDoms != null && inputDoms.length > 0)
        {
            inputDoms[0].focus();
        } else 
        {
            Xjs.ui.CheckboxGroup.superclass.focus.call(this);
        }
    },
    /*xjs.ui.CheckboxGroup._onItemFocus*/
    _onItemFocus:function(e)
    {
        this.fireEvent("focusGained");
        this.updateFocusClass();
    },
    /*xjs.ui.CheckboxGroup._onItemBlur*/
    _onItemBlur:function(e)
    {
        this.updateFocusClass();
    },
    /*xjs.ui.CheckboxGroup._onFocus*/
    _onFocus:function(e)
    {
        this.fireEvent("focusGained");
        this._focused = true;
        this.updateFocusClass();
    },
    /*xjs.ui.CheckboxGroup._onBlur*/
    _onBlur:function(e)
    {
        this._focused = false;
        this.updateFocusClass();
    },
    /*xjs.ui.CheckboxGroup.updateFocusClass*/
    updateFocusClass:function()
    {
        if(this.focusCls)
            for(var j=0;j < this.focusCls.length;j++)
            {
                Xjs.DOM.addOrRemoveClass(this.dom,this.focusCls[j],this.isFocused());
            }
    },
    /*xjs.ui.CheckboxGroup.isFocused*/
    isFocused:function()
    {
        if(this._focused)
            return true;
        if(this.checkItems)
            for(var i=0;i < this.checkItems.length;i++)
            {
                if(this.checkItems[i]._focused)
                    return true;
            }
        return false;
    },
    /*xjs.ui.CheckboxGroup.getValue*/
    getValue:function()
    {
        if(this._$value !== undefined)
            return this._$value;
        if(!this.dom)
        {
            return this.value === undefined ? null : this.value;
        }
        var v = Xjs.ui.Component.getCheckValues(this.dom,(this.multiple ? 1 : 0) | (this.intValue ? 2 : 0) | (this.arrayValue ? 8 : 0));
        if(typeof(v) == "string" && this.sqlType && this.sqlType != 12)
        {
            v = Xjs.Data.parseFromSqlType(v,this.sqlType);
        }
        return this._$value = this.value = v;
    },
    /*xjs.ui.CheckboxGroup._isCheckedItemValue*/
    _isCheckedItemValue:function(value,itemValue)
    {
        if(this.multiple)
        {
            if(value != null)
            {
                if(this.intValue)
                    return (value & itemValue) != 0;
                else 
                {
                    if(this.__tempValueA == null)
                        this.__tempValueA = value instanceof Array ? value : value.toString().split(",");
                    return this.__tempValueA.indexOf(itemValue) >= 0;
                }
            }
        } else 
        {
            if(itemValue === "")
                itemValue = null;
            if(value === "")
                value = null;
            return value == itemValue;
        }
        return false;
    },
    /*xjs.ui.CheckboxGroup._setInitValue*/
    _setInitValue:function(dom)
    {
        if(!dom && !(dom = this.dom))
            return;
        var inputDoms = dom.getElementsByTagName("input");
        if(!inputDoms)
            return;
        for(var i=0;i < inputDoms.length;i++)
        {
            inputDoms[i].checked = this._isCheckedItemValue(this.value,inputDoms[i].value);
        }
        delete this.__tempValueA;
        delete this._$value;
    },
    /*xjs.ui.CheckboxGroup.setValue*/
    setValue:function(value)
    {
        this.value = value;
        delete this.__tempValueA;
        if(this.dom)
        {
            var oldValue = this._$value !== undefined ? this._$value : Xjs.ui.Component.getCheckValues(this.dom,(this.multiple ? 1 : 0) | (this.intValue ? 2 : 0));
            this._setInitValue();
            this.resetClassName();
            if(oldValue != this.getValue())
                this.fireEvent("valueChanged");
        }
    },
    /*xjs.ui.CheckboxGroup.onChanged*/
    onChanged:function(e,opts)
    {
        this.resetClassName();
        Xjs.ui.CheckboxGroup.superclass.onChanged.call(this,e,opts);
    },
    /*xjs.ui.CheckboxGroup.resetClassName*/
    resetClassName:function()
    {
        if(this.checkItems != null)
            for(var i=0;i < this.checkItems.length;i++)
            {
                if(this.checkItems[i] != null)
                    this.checkItems[i].resetClassName();
            }
    },
    /*xjs.ui.CheckboxGroup.onDomCreated*/
    onDomCreated:function(root)
    {
        Xjs.ui.CheckboxGroup.superclass.onDomCreated.call(this,root);
        this.updateReadonlyStatus();
    },
    /*xjs.ui.CheckboxGroup.recreateDOM*/
    recreateDOM:function()
    {
        if(!this.dom || !this.layout)
            return;
        this._buildChkItems();
        Xjs.DOM.removeAllChild(this.dom);
        this.layout.attachItemDoms(this,this.dom,null);
        this.updateReadonlyStatus();
    },
    /*xjs.ui.CheckboxGroup.selectAll*/
    selectAll:function(set)
    {
        if(this.sqlType == 4 || this.sqlType == 5)
        {
            var allItems = 0,
                len = this.checkItems.length;
            if(set && len > 0)
            {
                for(var i=0;i < this.checkItems.length;i++)
                {
                    allItems += this.checkItems[i].checkValue;
                }
            }
            this.setValue(allItems);
        } else 
        {
            var allItems = [],
                len = this.checkItems.length;
            if(set && len > 0)
            {
                allItems = new Array(len);
                for(var i=0;i < this.checkItems.length;i++)
                {
                    allItems[i] = this.checkItems[i].checkValue;
                }
            }
            this.setValue(allItems);
        }
    },
    /*xjs.ui.CheckboxGroup.isAllSelected*/
    isAllSelected:function()
    {
        for(var i=0;i < this.checkItems.length;i++)
        {
            if(!this.checkItems[i].isChecked())
                return false;
        }
        return true;
    },
    /*xjs.ui.CheckboxGroup.setSelectOptions*/
    setSelectOptions:function(o)
    {
        this.selectOptions = o;
        if(this.dom)
            this.recreateDOM();
    }
});
{
    Xjs.UITYPES.checkboxgroup = Xjs.ui.CheckboxGroup;
}/*xjs/ui/CheckComboAidInputer.java*/
Xjs.ui.CheckComboAidInputer=function(config){
    Xjs.ui.CheckComboAidInputer.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.CheckComboAidInputer,Xjs.ui.ComboAidInputerA,{
  _js$className_:"Xjs.ui.CheckComboAidInputer",
    /*xjs.ui.CheckComboAidInputer.__init*/
    __init:function()
    {
        Xjs.ui.CheckComboAidInputer.superclass.__init.call(this);
        if(!this.htmlRes)
        {
            this.htmlRes = "@" + Xjs.getDefResPath() + "/combo3.html";
        }
    },
    /*xjs.ui.CheckComboAidInputer.onDomAttached*/
    onDomAttached:function()
    {
        Xjs.ui.CheckComboAidInputer.superclass.onDomAttached.call(this);
        var listTable = Xjs.DOM.findById("SelectListBox",this.dom);
        this.tblBody = Xjs.DOM.find("tbody",listTable);
    },
    /*xjs.ui.CheckComboAidInputer.afterExpandShow*/
    afterExpandShow:function(newDom)
    {
        Xjs.ui.CheckComboAidInputer.superclass.afterExpandShow.call(this,newDom);
        this.fireEvent("onComboAidInputerExpandShow",newDom);
    },
    /*xjs.ui.CheckComboAidInputer._addOptions*/
    _addOptions:function()
    {
        var selectOpts = this.filterValues(0,null);
        if((this.columns || 0) <= 0)
            this.columns = 4;
        var multiple = (this.selOptions & 4) != 0,
            name = this.parent.name;
        if(name == null)
            name = "CHKA_" + this.parent.name;
        if(this._$onChanged == null)
            this._$onChanged = Function.bindAsEventListener(this.onChanged,this);
        Xjs.DOM.removeAllChild(this.tblBody);
        var row = null;
        this.ckbox = [];
        for(var r=0;r < selectOpts.length;r++)
        {
            if(row == null)
                row = Xjs.DOM.createChild(this.tblBody,"tr",null);
            var td = Xjs.DOM.createChild(row,"td",null),
                value = selectOpts[r][0],
                text = selectOpts[r][1],
                c = new Xjs.ui.Checkbox({id:"CK_" + value,label:this.showCode && value != text ? value + ":" + text : text,checkValue:value});
            if(!multiple)
            {
                c.inputType = "radio";
                c.name = name;
            } else 
            {
                c.name = (name || "") + "#" + value;
            }
            if(this.valueList.indexOfItem(value) >= 0)
                c.value = value;
            this.ckbox[r] = c;
            td.appendChild(c.getDOM());
            c.checkDOM.onclick = this._$onChanged;
            if(r % this.columns == this.columns - 1)
            {
                row = null;
            }
        }
    },
    /*xjs.ui.CheckComboAidInputer.refilter*/
    refilter:function(forece,toPage)
    {
        Xjs.ui.CheckComboAidInputer.superclass.refilter.call(this,forece,toPage);
        this.setChecked();
    },
    /*xjs.ui.CheckComboAidInputer.setChecked*/
    setChecked:function()
    {
        if(this.ckbox == null)
            return;
        for(var i=0;i < this.ckbox.length;i++)
        {
            var v = this.ckbox[i].checkValue;
            this.ckbox[i].checkDOM.checked = this.valueList.indexOfItem(v) >= 0;
            this.ckbox[i].resetClassName();
        }
    },
    /*xjs.ui.CheckComboAidInputer.onChanged*/
    onChanged:function(e,bySetValue)
    {
        if(this.ckbox != null)
            for(var i=0;i < this.ckbox.length;i++)
            {
                if(this.ckbox[i].checkDOM.checked)
                {
                    if((this.selOptions & 4) != 0)
                        this.valueList.addItem(this.ckbox[i].checkValue,false);
                    else 
                        this.valueList.setValue(this.ckbox[i].checkValue);
                } else 
                {
                    this.valueList.removeItem(this.ckbox[i].checkValue,false);
                }
                this.ckbox[i].resetClassName();
            }
        this.fireEvent("onAidValueChanged",e);
    }
});
/*xjs/ui/ClientRectangle.java*/
Xjs.ui.ClientRectangle=function(){};
Xjs.apply(Xjs.ui.ClientRectangle.prototype,{
    /*xjs.ui.ClientRectangle.getClientXY*/
    getClientXY:function()
    {
        if(this.dom)
            return Xjs.DOM.getXY(this.dom);
        return {x:this.x,y:this.y};
    },
    /*xjs.ui.ClientRectangle.getClientWidth*/
    getClientWidth:function()
    {
        return this.dom ? this.dom.offsetWidth : this.w || 0;
    },
    /*xjs.ui.ClientRectangle.getClientHeight*/
    getClientHeight:function()
    {
        return this.dom ? this.dom.offsetHeight : this.h || 0;
    }
});
/*xjs/ui/ComponentT.java*/
Xjs.ui.ComponentT=function(type,config,items){
    this.type = type;
    this.config = config;
    if(items)
        this.items = items;
};
Xjs.apply(Xjs.ui.ComponentT.prototype,{
    /*xjs.ui.ComponentT.addChild*/
    addChild:function(c)
    {
        if(!this.items)
            this.items = [];
        this.items.push(c);
    },
    /*xjs.ui.ComponentT.getSubCompByName*/
    getSubCompByName:function(name)
    {
        return Xjs.ui.ComponentT.getCompByName(this.items,name);
    },
    /*xjs.ui.ComponentT.isVisible*/
    isVisible:function()
    {
        return this.config.visible;
    },
    /*xjs.ui.ComponentT.setVisible*/
    setVisible:function(v)
    {
        this.config.visible = !!v;
    },
    /*xjs.ui.ComponentT.toComponent*/
    toComponent:function(parent)
    {
        var c = new this.type(this.config);
        c.parent = parent;
        if(this.items)
        {
            c.items = Xjs.ui.ComponentT.toComponents(this.items,c);
            if(c.layoutOnClient && c.layoutm == "grid")
            {
                c.itemsLayout = new Xjs.ui.GridLayout(c.layoutConfig);
            }
        }
        return c;
    },
    /*xjs.ui.ComponentT.fireOnShowing*/
    fireOnShowing:Xjs.emptyFn,
    /*xjs.ui.ComponentT._updateDomSize*/
    _updateDomSize:Xjs.emptyFn
});
Xjs.apply(Xjs.ui.ComponentT,{
    /*xjs.ui.ComponentT.getCompByName*/
    getCompByName:function(items,name)
    {
        if(items)
        {
            var n = items.length;
            for(var i=0;i < n;i++)
            {
                var c = items[i];
                if(name == c.config.name)
                    return c;
                if(c.items)
                {
                    var x = Xjs.ui.ComponentT.getCompByName(c.items,name);
                    if(x)
                        return x;
                }
            }
        }
        return null;
    },
    /*xjs.ui.ComponentT.toComponents*/
    toComponents:function(items,parent)
    {
        if(items == null)
            return null;
        var a = new Array(items.length);
        for(var i=0;i < a.length;i++)
        {
            a[i] = items[i].toComponent(parent);
        }
        return a;
    }
});
/*xjs/ui/Date2AidInputer.java*/
Xjs.ui.Date2AidInputer=function(config){
    Xjs.ui.Date2AidInputer.superclass.constructor.call(this,config);
    this.date1Input = new Xjs.ui.DateAidInputer(config);
    this.date1Input.date2Input = this;
    this.date2Input = new Xjs.ui.DateAidInputer(config);
    this.date2Input.date2Input = this;
};
Xjs.extend(Xjs.ui.Date2AidInputer,Xjs.ui.LayerAidInputer,{
  _js$className_:"Xjs.ui.Date2AidInputer",
    /*xjs.ui.Date2AidInputer._createDOM*/
    _createDOM:function()
    {
        var htmlRes = this.htmlRes || "@" + Xjs.getTheme() + "/xjsres/date2picker.html",
            dom = Xjs.ui.Component.createDomFromRes(htmlRes,this,false),
            startDateP = Xjs.DOM.findById("START_DATE",dom),
            endDateP = Xjs.DOM.findById("END_DATE",dom);
        startDateP.appendChild(this.date1Input._createDOM());
        endDateP.appendChild(this.date2Input._createDOM());
        return dom;
    },
    /*xjs.ui.Date2AidInputer.beforeExpandShow*/
    beforeExpandShow:function(newDOM)
    {
        this.selectedVal1 = null;
        this.selectedVal2 = null;
        if(this.minYear)
        {
            this.date1Input.minYear = this.minYear;
            this.date2Input.minYear = this.minYear;
        }
        if(this.maxYear)
        {
            this.date1Input.maxYear = this.maxYear;
            this.date2Input.maxYear = this.maxYear;
        }
        this.date1Input.initDate(this.parent);
        this.date2Input.initDate(this.parent);
    },
    /*xjs.ui.Date2AidInputer.selectYMD*/
    selectYMD:function(j,val)
    {
        if(j == this.date1Input)
            this.selectedVal1 = val;
        else if(j == this.date2Input)
            this.selectedVal2 = val;
        if(this.selectedVal1 && this.selectedVal2)
        {
            var date1 = Date.parseDate(this.selectedVal1),
                date2 = Date.parseDate(this.selectedVal2);
            if(!date1 || !date2 || date1.getTime() > date2.getTime())
            {
                if(this.dateRngErrInfo)
                    Xjs.alertErr({message:this.dateRngErrInfo});
                return;
            }
            if(this.selectedVal1 == this.selectedVal2)
                this.setParentValue(this.selectedVal1);
            else 
                this.setParentValue(this.selectedVal1 + ".." + this.selectedVal2);
            this.hideAndFocusParent();
        }
    },
    /*xjs.ui.Date2AidInputer.setInitValue*/
    setInitValue:function(date)
    {
        var date1,
            date2;
        if(typeof(date) == "string")
        {
            var p = date.indexOf("..");
            date1 = p < 0 ? date : date.substring(0,p).trim();
            date2 = p < 0 ? date1 : date.substring(p + 2).trim();
        } else 
        {
            date1 = date2 = null;
        }
        this.date1Input.setInitValue(date1);
        this.date2Input.setInitValue(date2);
    }
});
/*xjs/ui/DateYearMonthAidInputer.java*/
Xjs.ui.DateYearMonthAidInputer=function(config){
    Xjs.ui.DateYearMonthAidInputer.superclass.constructor.call(this,config);
    this.colname = config.colname;
};
Xjs.extend(Xjs.ui.DateYearMonthAidInputer,Xjs.ui.ComboAidInputer,{
  _js$className_:"Xjs.ui.DateYearMonthAidInputer",
    /*xjs.ui.DateYearMonthAidInputer.setInitValue*/
    setInitValue:function(value)
    {
        if(!value)
        {
            if(this.colname == "year")
            {
                value = Date.getServerTime().getFullYear();
            } else if(this.colname == "month")
            {
                value = Date.getServerTime().getMonth() + 1;
            }
        }
        Xjs.ui.DateYearMonthAidInputer.superclass.setInitValue.call(this,value);
    }
});
/*xjs/ui/DefaultComponentListener.java*/
Xjs.ui.DefaultComponentListener=function(){};
Xjs.apply(Xjs.ui.DefaultComponentListener.prototype,{
    /*xjs.ui.DefaultComponentListener.addNotify*/
    addNotify:Xjs.emptyFn,
    /*xjs.ui.DefaultComponentListener.prepareInitParameter*/
    prepareInitParameter:Xjs.emptyFn,
    /*xjs.ui.DefaultComponentListener.initComponent*/
    initComponent:Xjs.emptyFn,
    /*xjs.ui.DefaultComponentListener.afterInitComponent*/
    afterInitComponent:Xjs.emptyFn,
    /*xjs.ui.DefaultComponentListener.performCommand*/
    performCommand:Xjs.emptyFn,
    /*xjs.ui.DefaultComponentListener.onRendering*/
    onRendering:Xjs.emptyFn,
    /*xjs.ui.DefaultComponentListener.onRender*/
    onRender:Xjs.emptyFn,
    /*xjs.ui.DefaultComponentListener.onShowing*/
    onShowing:Xjs.emptyFn,
    /*xjs.ui.DefaultComponentListener.onLazyLoaded*/
    onLazyLoaded:Xjs.emptyFn
});
/*xjs/ui/DefaultDialogPaneListener.java*/
Xjs.ui.DefaultDialogPaneListener=function(){};
Xjs.apply(Xjs.ui.DefaultDialogPaneListener.prototype,{
    /*xjs.ui.DefaultDialogPaneListener.addNotify*/
    addNotify:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.onOk*/
    onOk:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.initComponent*/
    initComponent:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.afterInitComponent*/
    afterInitComponent:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.performCommand*/
    performCommand:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.prepareInitParameter*/
    prepareInitParameter:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.itemValueChanged*/
    itemValueChanged:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.itemAidInputing*/
    itemAidInputing:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.onRendering*/
    onRendering:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.onRender*/
    onRender:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.validateValue*/
    validateValue:Xjs.trueFn,
    /*xjs.ui.DefaultDialogPaneListener.onClosing*/
    onClosing:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.onClosed*/
    onClosed:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.valueExchange*/
    valueExchange:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.onShowing*/
    onShowing:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.onRestortInitValues*/
    onRestortInitValues:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.onPaneCollapseing*/
    onPaneCollapseing:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.onPaneCollapse*/
    onPaneCollapse:Xjs.emptyFn,
    /*xjs.ui.DefaultDialogPaneListener.onLazyLoaded*/
    onLazyLoaded:Xjs.emptyFn
});
/*xjs/ui/DefaultProgressPaneListener.java*/
Xjs.ui.DefaultProgressPaneListener=function(){};
Xjs.apply(Xjs.ui.DefaultProgressPaneListener.prototype,{
    /*xjs.ui.DefaultProgressPaneListener.onClosed*/
    onClosed:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.onRunProgress*/
    onRunProgress:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.onLockRunProgress*/
    onLockRunProgress:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.initComponent*/
    initComponent:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.afterInitComponent*/
    afterInitComponent:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.itemValueChanged*/
    itemValueChanged:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.itemAidInputing*/
    itemAidInputing:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.performCommand*/
    performCommand:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.addNotify*/
    addNotify:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.beforeRunProgress*/
    beforeRunProgress:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.onProgressMessage*/
    onProgressMessage:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.onOk*/
    onOk:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.prepareInitParameter*/
    prepareInitParameter:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.onRendering*/
    onRendering:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.onRender*/
    onRender:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.onLazyLoaded*/
    onLazyLoaded:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.validateValue*/
    validateValue:Xjs.trueFn,
    /*xjs.ui.DefaultProgressPaneListener.valueExchange*/
    valueExchange:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.onShowing*/
    onShowing:Xjs.emptyFn,
    /*xjs.ui.DefaultProgressPaneListener.checkRunProgress*/
    checkRunProgress:Xjs.emptyFn
});
/*xjs/ui/DefaultTabPanelListener.java*/
Xjs.ui.DefaultTabPanelListener=function(){
};
Xjs.apply(Xjs.ui.DefaultTabPanelListener.prototype,{
    /*xjs.ui.DefaultTabPanelListener.prepareInitParameter*/
    prepareInitParameter:Xjs.emptyFn,
    /*xjs.ui.DefaultTabPanelListener.initComponent*/
    initComponent:Xjs.emptyFn,
    /*xjs.ui.DefaultTabPanelListener.afterInitComponent*/
    afterInitComponent:Xjs.emptyFn,
    /*xjs.ui.DefaultTabPanelListener.performCommand*/
    performCommand:Xjs.emptyFn,
    /*xjs.ui.DefaultTabPanelListener.onRendering*/
    onRendering:Xjs.emptyFn,
    /*xjs.ui.DefaultTabPanelListener.onRender*/
    onRender:Xjs.emptyFn,
    /*xjs.ui.DefaultTabPanelListener.onLazyLoaded*/
    onLazyLoaded:Xjs.emptyFn,
    /*xjs.ui.DefaultTabPanelListener.addNotify*/
    addNotify:Xjs.emptyFn,
    /*xjs.ui.DefaultTabPanelListener.onTabbedSelecting*/
    onTabbedSelecting:Xjs.emptyFn,
    /*xjs.ui.DefaultTabPanelListener.onTabbedSelected*/
    onTabbedSelected:Xjs.emptyFn,
    /*xjs.ui.DefaultTabPanelListener.onShowing*/
    onShowing:Xjs.emptyFn
});
/*xjs/ui/FileInputField.java*/
Xjs.ui.FileInputField=Xjs.extend(Xjs.ui.Component,{
  _js$className_:"Xjs.ui.FileInputField",
    className:"ui-inputfieldx",
    immPostValue:true,
    uploadMethod:"upload",
    updateLock:0,
    /*xjs.ui.FileInputField.onDomCreated*/
    onDomCreated:function(root)
    {
        Xjs.ui.FileInputField.superclass.onDomCreated.call(this,root);
        this.dom.tabIndex = 0;
    },
    /*xjs.ui.FileInputField._createDOM*/
    _createDOM:function(root)
    {
        this.inputDom = document.createElement("input");
        this.inputDom.type = "file";
        this.inputDom.name = "UploadFile";
        var d = this.formDOM = Xjs.isIE && Xjs.$browserVer < 9 ? document.createElement("<form enctype='multipart/form-data'></form>") : document.createElement("form");
        this.formDOM.enctype = "multipart/form-data";
        this.formDOM.method = "post";
        d.appendChild(this.inputDom);
        this.tmpFileIdInDOM = document.createElement("input");
        this.tmpFileIdInDOM.style.display = "none";
        this.tmpFileIdInDOM.name = "TmpFileID";
        d.appendChild(this.tmpFileIdInDOM);
        var f = Function.bindAsEventListener(this.onUploadFileInput,this);
        this.inputDom.onchange = f;
        this.inputDom.oninput = f;
        return d;
    },
    /*xjs.ui.FileInputField._updateClass*/
    _updateClass:function()
    {
        if(!this.dom)
            return;
        var cls = this.className;
        if(this.isReadonly())
            cls += " ui-readonly";
        this.dom.className = cls;
    },
    /*xjs.ui.FileInputField.updateReadonlyStatus*/
    updateReadonlyStatus:function()
    {
        if(this.inputDom)
        {
            this.inputDom.readOnly = this.readOnly || this.compEditable && this.compEditable.isEditReadonly(this);
        }
        this._updateClass();
    },
    /*xjs.ui.FileInputField.onUploadFileInput*/
    onUploadFileInput:function()
    {
        this.doUpload();
    },
    /*xjs.ui.FileInputField.doUpload*/
    doUpload:function()
    {
        var fileV = Xjs.ui.InputField.getFileValue(this.inputDom);
        if(fileV == null)
            return;
        var iframeDOM = Xjs.ui.UIUtil.getTempIFrameDOM();
        iframeDOM._$RunProgress = this;
        var uploadMethod = this.uploadMethod;
        if(uploadMethod.indexOf('.') < 0)
            uploadMethod = "snsoft.ui.util.AttachmentUtils." + uploadMethod;
        var runURL = Xjs.ROOTPATH + "progress.ui" + window.EnvParameter.dftReqParameter + "&_run=" + uploadMethod;
        this.formDOM.action = runURL;
        this.formDOM.target = iframeDOM.name;
        this.formDOM.submit();
    },
    /*xjs.ui.FileInputField.getValue*/
    getValue:function()
    {
        return this.value;
    },
    /*xjs.ui.FileInputField.setReturnValue*/
    setReturnValue:function(returnValue)
    {
        if(returnValue != null)
        {
            if(returnValue._exception)
            {
                Xjs.ui.UIUtil.showErrorDialog("上载文件错误",returnValue._exception);
                return;
            }
            if(typeof(returnValue) == "string")
                this.setValue(returnValue);
            else if(this.uploadMethod == "uploadImage")
            {
                var fname = returnValue.fname,
                    format = returnValue.format;
                if(fname && format)
                {
                    this.setValue(fname);
                }
            }
        } else 
        {
            this.setValue(null);
        }
        this.onChanged();
    },
    /*xjs.ui.FileInputField.setValue*/
    setValue:function(value)
    {
        var tmpFileID = null;
        if(typeof(value) == "string")
        {
            var p = value.lastIndexOf('|'),
                desc = p < 0 ? null : value.substring(0,p);
            if(desc != null && desc.startsWith("tmpfile:"))
                tmpFileID = desc.substring(8);
        }
        if(this.tmpFileIdInDOM)
            this.tmpFileIdInDOM.value = tmpFileID;
        this.value = value;
    },
    /*xjs.ui.FileInputField.lockUpload*/
    lockUpload:function(lock)
    {
        if(lock)
            this.updateLock++;
        else 
            this.updateLock--;
    },
    /*xjs.ui.FileInputField.setProgress*/
    setProgress:Xjs.emptyFn,
    /*xjs.ui.FileInputField.startProgress*/
    startProgress:function()
    {
        this.lockUpload(true);
    },
    /*xjs.ui.FileInputField.stopProgress*/
    stopProgress:function()
    {
        if(this.updateLock > 0)
            this.lockUpload(false);
    },
    /*xjs.ui.FileInputField.setPID*/
    setPID:Xjs.emptyFn
});
/*xjs/ui/FormPanel.java*/
Xjs.ui.FormPanel=function(config){
    Xjs.ui.FormPanel.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.FormPanel,Xjs.ui.Panel,{
  _js$className_:"Xjs.ui.FormPanel",
    /*xjs.ui.FormPanel.getFormDOM*/
    getFormDOM:function()
    {
        return this.formDOM;
    },
    /*xjs.ui.FormPanel.submit*/
    submit:function(url)
    {
        if(this.formDOM != null)
        {
            if(url != null)
                this.formDOM.action = url;
            this.formDOM.submit();
        }
    },
    /*xjs.ui.FormPanel.reset*/
    reset:function()
    {
        if(this.formDOM != null)
            this.formDOM.reset();
    }
});
/*xjs/ui/GroupPane.java*/
Xjs.ui.GroupPane=function(cfg){
    Xjs.ui.GroupPane.superclass.constructor.call(this,cfg);
};
Xjs.extend(Xjs.ui.GroupPane,Xjs.ui.Container,{
  _js$className_:"Xjs.ui.GroupPane",
    /*xjs.ui.GroupPane.setReadonly*/
    setReadonly:function(readOnly,setDefReadonly)
    {
        Xjs.ui.GroupPane.superclass.setReadonly.call(this,readOnly,setDefReadonly);
        if(this.items)
        {
            for(var i=0;i < this.items.length;i++)
            {
                this.items[i].setReadonly(readOnly,setDefReadonly);
            }
        }
    },
    /*xjs.ui.GroupPane.setTitle*/
    setTitle:function(title)
    {
        var titleDOM = Xjs.DOM.findById("title",this.dom);
        if(titleDOM)
        {
            Xjs.DOM.setTextContent(titleDOM,title);
        }
    },
    /*xjs.ui.GroupPane.onTitbarBtnClick*/
    onTitbarBtnClick:function(ev)
    {
        var btn = Xjs.DOM.lookupByChild(this.titbarBtns,ev.srcElement || ev.target);
        if(!btn || !btn.id)
            return;
        switch(btn.id)
        {
        case "collapse":
            this.collapseContent = this.collapseContent == 1 ? 0 : 1;
            this.updateCollapseStat();
            break;
        }
    },
    /*xjs.ui.GroupPane.updateCollapseStat*/
    updateCollapseStat:function()
    {
        Xjs.DOM.addOrRemoveClass(this.dom,"grouppane-content-collapsed",this.collapseContent == 1);
    },
    /*xjs.ui.GroupPane.onDomCreated*/
    onDomCreated:function(root)
    {
        Xjs.ui.GroupPane.superclass.onDomCreated.call(this,root);
        var titBar = Xjs.DOM.find("#GroupPaneTitleBar",this.dom);
        if(titBar)
        {
            this.titbarBtns = Xjs.DOM.findAll(".ui-grppane-titbar-btn",titBar);
            if(this.titbarBtns && this.titbarBtns.length > 0)
            {
                var f = this.onTitbarBtnClick.createDelegate(this);
                for(var i=0;i < this.titbarBtns.length;i++)
                    this.titbarBtns[i].onclick = f;
            }
        }
        this.updateCollapseStat();
    }
});
/*xjs/ui/HtmlView.java*/
Xjs.ui.HtmlView=function(config){
    Xjs.ui.HtmlView.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.HtmlView,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.HtmlView",
    /*xjs.ui.HtmlView.setValue*/
    setValue:function(value,displayValue,opts)
    {
        this.html = value;
        if(this.dom)
            this.dom.innerHTML = this.html || "";
    },
    /*xjs.ui.HtmlView.onDomCreated*/
    onDomCreated:function(root)
    {
        Xjs.ui.HtmlView.superclass.onDomCreated.call(this,root);
        if(this.fireFocusGained)
            Xjs.DOM.addListener(this.dom,"click",Function.bindAsEventListener(this._onClick,this,0,true));
    },
    /*xjs.ui.HtmlView._onClick*/
    _onClick:function(e)
    {
        this.fireEvent("focusGained");
    }
});
/*xjs/ui/IFrame.java*/
Xjs.ui.IFrame=function(config){
    Xjs.ui.IFrame.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.IFrame,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.IFrame",
    /*xjs.ui.IFrame._createDOM*/
    _createDOM:function(root)
    {
        var dom = Xjs.DOM.findById(this.id,root);
        if(!dom)
        {
            dom = Xjs.isIE && Xjs.$browserVer < 9 && this.name != null ? document.createElement("<iframe name='" + this.name + "'></iframe>") : document.createElement("iframe");
            if(this.id)
                dom.id = this.id;
            if(this.className)
                dom.className = this.className;
            if(this.domStyle)
                Xjs.apply(dom.style,this.domStyle);
        }
        if(this.name)
            dom.name = this.name;
        dom.src = this.domSRC();
        return dom;
    },
    /*xjs.ui.IFrame.domSRC*/
    domSRC:function()
    {
        var s = this.src;
        if(!s || s == "")
            return "about:blank";
        if(s.startsWith("~/"))
        {
            return Xjs.ROOTPATH + s.substring(2);
        }
        return s;
    },
    /*xjs.ui.IFrame.setSrc*/
    setSrc:function(src)
    {
        this.src = src;
        if(this.dom)
            this.dom.src = this.domSRC();
    },
    /*xjs.ui.IFrame.replaceSrc*/
    replaceSrc:function(src)
    {
        this.src = src;
        if(this.dom)
            this.dom.contentWindow.location.replace(this.domSRC());
    },
    /*xjs.ui.IFrame.reload*/
    reload:function()
    {
        if(this.dom != null)
            this.dom.contentWindow.location.reload(true);
    },
    /*xjs.ui.IFrame.oncmd_reload*/
    oncmd_reload:function()
    {
        this.reload();
    }
});
/*xjs/ui/Image.java*/
Xjs.ui.Image=function(config){
    Xjs.ui.Image.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.Image,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.Image",
    /*xjs.ui.Image._createDOM*/
    _createDOM:function(root)
    {
        var d = this.imgDOM = Xjs.ui.Image.superclass._createDom0.call(this,root,"img");
        if(this.name)
            d.name = this.name;
        if(this.src)
            d.src = Xjs.toFullURL(this.src,1);
        if(this.imgHeight)
            d.height = this.imgHeight;
        if(this.imgWidth)
            d.width = this.imgWidth;
        return d;
    },
    /*xjs.ui.Image.setSrc*/
    setSrc:function(src)
    {
        this.src = src;
        if(this.imgDOM)
            this.imgDOM.src = Xjs.toFullURL(src,1);
    },
    /*xjs.ui.Image.getImageDOM*/
    getImageDOM:function()
    {
        return this.imgDOM;
    },
    /*xjs.ui.Image.setValue*/
    setValue:function(value)
    {
        if(!this.attached)
            return;
        this.setSrc(Xjs.table.util.AbsSelectAttachment.buildURL(this.attached,false,null,true,value,this.table,this.columnName,this.table.getDataSet().getRow(),true));
    }
});
/*xjs/ui/InputField.java*/
Xjs.ui.InputField=function(config){
    Xjs.ui.InputField.superclass.constructor.call(this,config);
    if(window.xjsConfig)
    {
        if(window.xjsConfig.inputFldOpts)
        {
            Xjs.applyIf(this,window.xjsConfig.inputFldOpts);
        }
    }
};
Xjs.extend(Xjs.ui.InputField,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.InputField",
    autoComplete:"off",
    selectOnFocus:0,
    focusableComp:true,
    isItemComp:true,
    /*xjs.ui.InputField._initDOM*/
    _initDOM:function(d)
    {
        var byCreate = d.firstChild == null;
        if(this.delIcon !== false && this.inputType != "textarea" && !this.disableDel)
        {
            if(byCreate || !(this.deliconDOM = Xjs.DOM.find("span.ui-input-delicon",d)))
                this.deliconDOM = Xjs.DOM.createChild(d,"span","ui-input-delicon");
            this.deliconDOM.onclick = Function.bindAsEventListener(this._onDelIconClick,this,0,true);
        }
        if(this.aidInputer || this.createAidInputerBtn || this.alwaysVisCombo)
        {
            if(byCreate || !(this.comboDOM = Xjs.DOM.find("span.ui-input-combobtn",d)))
                this.comboDOM = Xjs.DOM.createChild(d,"span","ui-input-combobtn");
            this.comboDOM.onclick = Function.bindAsEventListener(this._onComboIconClick,this,0,true);
        }
        var id;
        if(this.inputType == "textarea")
        {
            if(byCreate || !(id = Xjs.DOM.find("textarea",d)))
                id = Xjs.DOM.createChild(d,"textarea");
            if(this.rows)
                id.rows = this.rows;
        } else 
        {
            if(byCreate || !(id = Xjs.DOM.find("input",d)))
                id = Xjs.DOM.createChild(d,"input");
            id.type = this.inputType || "text";
        }
        id.value = "";
        if(this.bgLabel)
        {
            id.placeholder = this.bgLabel;
        }
        if(this.cssOverflow)
        {
            id.style.overflow = this.cssOverflow;
        }
        if(this.name)
            id.name = this.name;
        if(this.textAlign)
            id.style.textAlign = this.textAlign;
        if(this.resizeable === false)
            id.style.resize = "none";
        this.inputDom = id;
        if(this.maxCharsCnt > 0)
            id.maxLength = this.maxCharsCnt;
        id.readOnly = this.editable === false || this.isReadonly();
        if(this.domConfig)
            Xjs.apply(id,this.domConfig);
        if(this.domStyle)
            Xjs.apply(id.style,this.domStyle);
        if(this.color)
            id.style.color = this.color;
        if(this.bgcolor)
            id.style.backgroundColor = this.bgcolor;
        if(this.imeMode)
            id.style.imeMode = this.imeMode;
        if(this.inputMinHeight > 0)
            id.style.minHeight = this.inputMinHeight + "px";
        if(this.inputMaxHeight > 0)
            id.style.maxHeight = this.inputMaxHeight + "px";
        if(this.inputMinWidth > 0)
            id.style.minWidth = this.inputMinWidth + "px";
        if(this.multiple)
            id.multiple = true;
        if(this.autoComplete)
        {
            id.autocomplete = this.autoComplete;
        }
        if(this.textDir)
            id.dir = this.textDir;
        this.bindEvent(true);
        this._updateDomValue(0);
    },
    /*xjs.ui.InputField._createDOM*/
    _createDOM:function(root)
    {
        var d = this.inputDomx = Xjs.ui.InputField.superclass._createDom0.call(this,root,"span");
        this._initDOM(d);
        this._inAISearch();
        return d;
    },
    /*xjs.ui.InputField.bindEvent*/
    bindEvent:function(bind)
    {
        var e;
        if(!(e = this.inputDom))
            return;
        if(!bind)
        {
            e.onchange = null;
            e.onkeyup = null;
            e.onkeydown = null;
            e.onkeypress = null;
            e.onfocus = null;
            e.onblur = null;
            if(this.nm$onInput != null)
                e[this.nm$onInput] = null;
            e.onclick = null;
            e.onscroll = null;
            return;
        }
        if(this.fn$OnInput == null)
        {
            if(this.inputType == "file")
                this.fn$onChanged = Function.bindAsEventListener(this.onChanged,this);
            this.fn$OnInput = Xjs.ui.InputField.asOnInputListener(this.inputDom,this.onInput,this);
            this.fn$onKeyup = Function.bindAsEventListener(this._onKeyup,this);
            this.fn$onKeyDown = Function.bindAsEventListener(this._onKeyDown,this);
            this.fn$onKeyPress = Function.bindAsEventListener(this._onKeyPress,this,0,true,this);
            this.fn$onFocus = Function.bindAsEventListener(this._onFocus,this,0,true);
            this.fn$onBlur = Function.bindAsEventListener(this._onBlur,this);
            this.fn$OnClick = Function.bindAsEventListener(this._onClick,this);
        }
        e.onkeyup = this.fn$onKeyup;
        e.onkeydown = this.fn$onKeyDown;
        e.onclick = this.fn$OnClick;
        e.onkeypress = this.fn$onKeyPress;
        this.nm$onInput = "oninput" in e ? "oninput" : "onpropertychange";
        e[this.nm$onInput] = this.fn$OnInput;
        if(this.fn$onChanged)
            this.inputDom.onchange = this.fn$onChanged;
        if(this.tipIfOverflow || this.tipText || this.bgLabel)
        {
            if(this.tipIfOverflow || this.bgLabel && !this.tipText)
            {
                this.fn$TipText = this.fnTipText || new Xjs.FuncCall(this.getTipText,this);
            }
            this._addShowTipTextMouseListener();
        }
        e.onfocus = this.fn$onFocus;
        e.onblur = this.fn$onBlur;
    },
    /*xjs.ui.InputField.setInputDOM*/
    setInputDOM:function(inputDOM,dom)
    {
        if(this.inputDom != inputDOM)
        {
            this.bindEvent(false);
            this.inputDom = inputDOM;
            this.dom = dom;
            this.bindEvent(true);
            if(this.fitHeight && inputDOM)
                Xjs.ui.InputField.resizeHeight(this.inputDom,this.minHeight);
        }
    },
    /*xjs.ui.InputField.setSelectionRange*/
    setSelectionRange:function(start,end)
    {
        if(this.inputDom && this.inputDom.type != "file")
        {
            Xjs.DOM.setInputSelectionRange(this.inputDom,start,end);
        }
    },
    /*xjs.ui.InputField.getSelectionRange*/
    getSelectionRange:function()
    {
        if(this.inputDom && this.inputDom.type != "file")
        {
            return Xjs.DOM.getInputSelectionRange(this.inputDom);
        }
        return null;
    },
    /*xjs.ui.InputField.replaceSelection*/
    replaceSelection:function(s)
    {
        if(this.inputDom)
        {
            Xjs.DOM.replaceInputSelection(this.inputDom,s);
            this.fireOnChanged();
        }
    },
    /*xjs.ui.InputField.onDomCreated*/
    onDomCreated:function(root)
    {
        Xjs.ui.InputField.superclass.onDomCreated.call(this,root);
        this.updateComboIcon();
        this.showBgDOM();
        var i = this;
        this._updateDomSize();
        this._initValueBeforeChanged();
        if(this.maxCharsCntInd || this.charsCntInd || this.leftCharsCntInd)
        {
            setTimeout(function(){
            i.initCharsCntInd();
        },1);
        }
        if(this.parent && this.parent.subCompOpts)
        {
            if(this.parent.subCompOpts & 2 && this.width === undefined)
            {
                this.width = "100%";
                this._resetFullWid = true;
            }
        }
        setTimeout(function(){
            i._updateDomSize();
        },1);
    },
    /*xjs.ui.InputField.initCharsCntInd*/
    initCharsCntInd:function()
    {
        if(typeof(this.maxCharsCntInd) == "string")
            this.maxCharsCntInd = this.getBindElement(this.maxCharsCntInd);
        if(typeof(this.charsCntInd) == "string")
            this.charsCntInd = this.getBindElement(this.charsCntInd);
        if(typeof(this.leftCharsCntInd) == "string")
            this.leftCharsCntInd = this.getBindElement(this.leftCharsCntInd);
        this.updateCharsCntInd();
    },
    /*xjs.ui.InputField.getBindElement*/
    getBindElement:function(id)
    {
        if(id.startsWith("MUI$."))
        {
            var d = this.getMainParentComponent().getDOM();
            return d ? Xjs.DOM.find(id.substring(5),d) : null;
        }
        return document.getElementById(id);
    },
    /*xjs.ui.InputField._updateDomSize*/
    _updateDomSize:function()
    {
        if(this.disableUpdateSize)
            return;
        if(this._resetFullWid && this.dom.parentNode)
        {
            var wx = 0,
                a = this.dom.parentNode.childNodes;
            for(var j=0;j < a.length;j++)
            {
                if(a[j] != this.dom && a[j].nodeType == 1)
                {
                    wx += Xjs.DOM.getWidth(a[j]) + Xjs.DOM.getMargins(a[j],"lr");
                }
            }
            if(wx > 0)
            {
                this.width = Xjs.DOM.getWidth(this.dom.parentNode) - wx - 2;
            } else 
            {
                this.width = "100%";
            }
        }
        Xjs.ui.InputField.superclass._updateDomSize.call(this);
        if(this.inputDom != this.inputDomx)
        {
            var h = this.inputDomx.style.height,
                w = this.inputDomx.style.width,
                s = this.inputDom.style;
            s.width = w != null && w != "auto" ? "100%" : "";
            if(!this.fitHeight)
                s.height = h != null && h != "auto" ? "100%" : "";
            else 
            {
                var e = this.inputDom,
                    mh = this.minHeight;
                setTimeout(function(){
            Xjs.ui.InputField.resizeHeight(e,mh);
        },10);
            }
        }
    },
    /*xjs.ui.InputField.getAidInputer*/
    getAidInputer:function()
    {
        return this.aidInputer ? (this.aidInputer = Xjs.util.LazyLoadValue.eval(this.aidInputer)) : null;
    },
    /*xjs.ui.InputField._inAISearch*/
    _inAISearch:function()
    {
        var s = this.inputDom.readOnly && !this.isReadonly() && this.getAidInputer() && this.aidInputer.getAidInputerInfo(1,null);
        if(s)
        {
            this.inAISearch = 1;
            this.inputDom.readOnly = false;
        } else if(this.inAISearch)
        {
            delete this.inAISearch;
        }
    },
    /*xjs.ui.InputField.updateReadonlyStatus*/
    updateReadonlyStatus:function()
    {
        if(this.inputDom)
        {
            var rdOnly = this.isReadonly() || this.editable === false;
            this.inputDom.readOnly = rdOnly;
            this.updateComboIcon();
            this._updateDomSize();
            this.showBgDOM();
            this._inAISearch();
        }
    },
    /*xjs.ui.InputField.isReadonly*/
    isReadonly:function()
    {
        return !!this.readOnly || this.compEditable && this.compEditable.isEditReadonly(this);
    },
    /*xjs.ui.InputField.setEditable*/
    setEditable:function(e)
    {
        this.editable = e;
        this.updateReadonlyStatus();
    },
    /*xjs.ui.InputField.setReadonly*/
    setReadonly:function(readOnly,setDefReadonly)
    {
        if(this.readOnly != readOnly)
        {
            this.readOnly = readOnly;
            this.updateReadonlyStatus();
        }
        if(setDefReadonly !== false)
        {
            this.defReadonly = readOnly;
        }
    },
    /*xjs.ui.InputField.setTextAlign*/
    setTextAlign:function(textAlign)
    {
        this.textAlign = textAlign;
        if(this.inputDom != null)
            this.inputDom.style.textAlign = textAlign;
    },
    /*xjs.ui.InputField.isComboVisible*/
    isComboVisible:function(flags)
    {
        if(!this.aidInputer)
            return false;
        return !this.hiddenComboBtn && (!this.readOnly && (!this.compEditable || !this.compEditable.isEditReadonly(this)) || this.aidInputableIfReadonly || this.alwaysVisCombo && (flags & 1) == 0);
    },
    /*xjs.ui.InputField.updateComboIcon*/
    updateComboIcon:function()
    {
        if(this.comboDOM)
        {
            this.comboDOM.style.display = this.isComboVisible(0) ? "" : "none";
        }
        if(this.deliconDOM)
        {
            if(this.comboDOM != null && this.comboDOM.style.display != "none")
                Xjs.DOM.addClass(this.deliconDOM,"ui-input-delicona");
            else 
                Xjs.DOM.removeClass(this.deliconDOM,"ui-input-delicona");
        }
        this._updateClass();
    },
    /*xjs.ui.InputField._setParentCursor*/
    _setParentCursor:function(_parentCursor)
    {
        this._parentCursor = _parentCursor;
        if(this.inputDom)
            this.inputDom.style.cursor = _parentCursor != null ? _parentCursor : "text";
    },
    /*xjs.ui.InputField._updateClass*/
    _updateClass:function()
    {
        if(!this.inputDomx)
            return;
        var alcs = ["ui-inputfieldx"];
        if(this.comboDOM && this.comboDOM.style.display != "none")
        {
            alcs.push("ui-inputfieldxa");
            if(this.aidInputer instanceof Xjs.ui.Layer)
                alcs.push("ui-inputfieldx-layera");
        }
        var fg = 0;
        if(this.readOnly)
        {
            alcs.push("ui-input-field-rdonly");
            fg |= 1;
        }
        if(this.nonBlank || this.nonBlankOnSubmit)
        {
            alcs.push("ui-input-field-noblank");
            fg |= 2;
        }
        if(fg == 0)
            alcs.push("ui-input-field");
        if(this.className)
        {
            var a = this.className.split(" ");
            for(var j=0;j < a.length;j++)
            {
                if(a[j] != "")
                    alcs.push(a[j]);
            }
        }
        if(this._focused)
        {
            alcs.push("ui-focusborder");
            alcs.push("ui-focused-input");
        }
        if(this.__lastInalidate1)
        {
            alcs.push("ui-validation-err");
        }
        if(this._addedCls)
        {
            var changed = this._addedCls.length != alcs.length;
            for(var j=0;j < this._addedCls.length;j++)
            {
                if(j >= alcs.length || this._addedCls[j] != alcs[j])
                {
                    Xjs.DOM.removeClass(this.inputDomx,this._addedCls[j]);
                    changed = true;
                }
            }
            if(!changed)
                return;
        }
        for(var j=0;j < alcs.length;j++)
        {
            Xjs.DOM.addClass(this.inputDomx,alcs[j]);
        }
        this._addedCls = alcs;
    },
    /*xjs.ui.InputField._onFocus*/
    _onFocus:function(e)
    {
        this._focused = true;
        if(this.inAISearch == 2)
            return;
        this._updateDomValue(0);
        this._updateClass();
        this.fireEvent("focusGained");
        var m = this.selectOnFocus === true ? 3 : this.selectOnFocus;
        if(m == 0)
            m = 1;
        if(m == 3 || this.inAISearch == 1)
            this.inputDom.select();
        else if(m == 1)
        {
            var s = this.inputDom.value;
            if(s != null)
            {
                var l = s.length;
                this.setSelectionRange(l,l);
            }
        } else if(m == 2)
        {
            this.setSelectionRange(0,0);
        }
    },
    /*xjs.ui.InputField._onBlur*/
    _onBlur:function(e)
    {
        this._focused = false;
        if(this.inAISearch == 2)
            return;
        if(this.trimBlank)
        {
            this.trimDomBlank();
        }
        if(this.valConverter)
        {
            this.convertDomVal();
        } else if(this.toUpper)
        {
            this.toUpperDomVal();
        }
        if(this.updateValueOnLostFocus && this.value === undefined)
        {
            var s = this.inputDom.value,
                v = s;
            if(s != null && s.length > 0 && (this.sqlType == 2 || this.sqlType == 4))
            {
                v = parseFloat(s.trim());
                if(!isNaN(v))
                {
                    if(this.percent > 1)
                        v = v / this.percent;
                }
                this.value = v;
            }
        }
        this._updateDomValue(0);
        this._updateClass();
        this.fireEvent("focusLost");
    },
    /*xjs.ui.InputField.validateAndAlert*/
    validateAndAlert:function()
    {
        {
            var ex = null;
            try
            {
                var v = this.value !== undefined || !this.inputDom ? this.value : this.getDisplayValue(false);
                if(!this._validateValue(v,null,2))
                {
                    ex = new Error("无效格式:" + v);
                }
            }catch(er)
            {
                ex = er;
            }
            if(ex)
            {
                var s = ex.description || ex.message || ex.toString();
                Xjs.ui.UIUtil.showErrorDialog(null,this.title ? this.title + ":" + s : s,null,null,0x10);
            }
        }
    },
    /*xjs.ui.InputField._onClick*/
    _onClick:function(e)
    {
        if(this.storeHistValue)
        {
            if(!this.fn$toggleShowHistAI)
                this.fn$toggleShowHistAI = this.toggleShowHistAI.createDelegate(this);
            setTimeout(this.fn$toggleShowHistAI,1);
        }
        if(this.popupAidOnClick == 1 && this.inputDom == (e.srcElement || e.target) && (this.editable === false || this.isReadonly()) && Xjs.Event.isEventInDOM(e,this.inputDom))
        {
            this.aidInputOnClick();
        }
    },
    /*xjs.ui.InputField._onBgLabelClick*/
    _onBgLabelClick:function(e)
    {
        if(this.inputDom)
            this.inputDom.focus();
    },
    /*xjs.ui.InputField._onDelIconClick*/
    _onDelIconClick:function(e)
    {
        if(this.inputDom)
        {
            this.inputDom.focus();
            if(this.isDelable())
            {
                var v = this.inputDom.value;
                if(v != null && v !== "")
                    this.setValue(null,null,8);
            }
        }
    },
    /*xjs.ui.InputField._onComboIconClick*/
    _onComboIconClick:function(e)
    {
        this.aidInputOnClick();
    },
    /*xjs.ui.InputField.aidInputOnClick*/
    aidInputOnClick:function()
    {
        if(this.inputDom)
        {
            this.inputDom.focus();
        }
        if(this.inAISearch == 2)
            return;
        if(!this._$doAidInputOnClick)
            this._$doAidInputOnClick = this.doAidInputOnClick.createDelegate(this);
        setTimeout(this._$doAidInputOnClick,1);
    },
    /*xjs.ui.InputField.doAidInputOnClick*/
    doAidInputOnClick:function()
    {
        if(this.isComboVisible(1) && this._focused)
            try
            {
                this.lastAidInputChar = 0;
                this.doAidInput();
            }catch(ex)
            {
                Xjs.alertErr(ex);
            }
    },
    /*xjs.ui.InputField.prepareAidInputing*/
    prepareAidInputing:function()
    {
        this.fireEvent("doAidInputing",this.forTblColumn || this);
        if(this.selectOptions instanceof Xjs.dx.CodeData)
        {
            this.selectOptions.prepareLoadParams(this);
        }
    },
    /*xjs.ui.InputField.doAidInput*/
    doAidInput:function(ev)
    {
        var enterChar = this.lastAidInputChar || 0;
        this.lastAidInputChar = 0;
        if(this.getAidInputer())
        {
            var readOnly = this.isReadonly();
            this.prepareAidInputing();
            if(!ev)
                ev = {enterChar:enterChar};
            else if(enterChar)
                ev.enterChar = enterChar;
            var v = null;
            try
            {
                v = this.getValue();
            }catch(ex)
            {
            }
            v = this.aidInputer.doAidInput(this,v,ev);
            if(v != null && !readOnly)
            {
                this.inputDom.value = v.toString();
                this.inputDom.focus();
            }
        }
    },
    /*xjs.ui.InputField.toggleShowHistAI*/
    toggleShowHistAI:function()
    {
        this.showHistAI(!(this.histAI && this.histAI.isShowing()) && this._focused);
    },
    /*xjs.ui.InputField.showHistAI*/
    showHistAI:function(show)
    {
        if(!show)
        {
            if(this.histAI)
                this.histAI.hide();
            return;
        } else if(this.storeHistValue)
        {
            if(!this.histAI)
            {
                this.histAI = new Xjs.ui.util.HistAidInputer(this);
            }
            this.histAI.doAidInputer();
        }
    },
    /*xjs.ui.InputField.focus*/
    focus:function()
    {
        if(this.aidInputer && this.aidInputer.isAidInputerInShowing && this.aidInputer.isAidInputerInShowing())
        {
            return;
        }
        if(this.inputDom)
            try
            {
                this.inputDom.focus();
            }catch(ex)
            {
            }
    },
    /*xjs.ui.InputField.isDelable*/
    isDelable:function()
    {
        var c = this.tableColumn || this;
        if(this.isReadonly() || this.editable !== false || c.disableDel)
            return false;
        if(c.aidInputer && (c.nonBlank || c.nonBlankOnSubmit))
        {
            return !c.disableDelIfAI;
        }
        return true;
    },
    /*xjs.ui.InputField._onKeyup*/
    _onKeyup:function(e)
    {
        if(this.inAISearch == 2)
        {
            if(this.aidInputer.doParentCompSearchBoxKeyUp && this.aidInputer.doParentCompSearchBoxKeyUp(e))
            {
                return false;
            }
            return;
        }
        var readOnly = this.isReadonly();
        if(e.keyCode == 8 && readOnly)
        {
            return false;
        } else if(this.aidInputer && !readOnly && (e.keyCode == 0x77 || e.keyCode == 0x20 && !this.editable && this.aidInputBySpc))
        {
            this.doAidInputLatter(0);
            return false;
        } else if(e.keyCode == 13 && e.altKey && this.inputDom.tagName == "TEXTAREA" && !this.inputDom.readOnly)
        {
            Xjs.DOM.replaceInputSelection(this.inputDom,"\n");
            if(this.fitHeight)
                Xjs.ui.InputField.resizeHeight(this.inputDom,this.minHeight);
            this.onChanged(e,2,false);
            return false;
        }
        var v = this.inputDom.value,
            preventKey = false;
        if((e.keyCode == 46 || e.keyCode == 8) && this.isDelable() && v != null && v !== "")
        {
            if(e.keyCode == 8)
            {
                preventKey = true;
                Xjs.Event.cancelEvent(e);
            }
            this.setValue(null,null,8);
        }
        if(this.histAI && this.histAI.isShowing())
        {
            if(e.keyCode == 0x26 || e.keyCode == 0x28)
            {
                this.histAI.setlectNextVal(e.keyCode == 0x26);
                Xjs.Event.cancelEvent(e);
                return false;
            } else if(e.keyCode == 27)
            {
                this.histAI.hide();
                return false;
            }
        }
        if(preventKey)
            return false;
        return;
    },
    /*xjs.ui.InputField.isNLByKey13*/
    isNLByKey13:function(e)
    {
        if(e.keyCode != 13 || this.inputDom.readOnly || this.inputDom.tagName != "TEXTAREA")
            return false;
        var kf = (e.ctrlKey ? 4 : 0) | (e.shiftKey ? 1 : 0) | (e.altKey ? 2 : 0),
            f = this.nlByEnterKey;
        if(f === undefined)
            return kf == 0 || kf == 1;
        return f == kf || (f & kf) != 0;
    },
    /*xjs.ui.InputField.doAidInputLatter*/
    doAidInputLatter:function(enterChar)
    {
        if(!this._fnDoAidInpter)
            this._fnDoAidInpter = this.doAidInput.createDelegate(this);
        this.lastAidInputChar = enterChar;
        setTimeout(this._fnDoAidInpter,1);
    },
    /*xjs.ui.InputField._onKeyPress*/
    _onKeyPress:function(e)
    {
        if(!Xjs.Event.isCmdKey(e) && e.charCode >= (this.keyAidInputerOpts & 2 ? 0x20 : 0x21) && this.editable === false && this.aidInputer && !this.isReadonly() && !this.inAISearch)
        {
            this.doAidInputLatter(this.keyAidInputerOpts & 1 ? 0 : e.charCode);
            return false;
        }
        var c;
        if(this.validKeys & 1 && (c = e.charCode) > 0)
        {
            if(c >= 0x30 && c <= 0x39)
                return;
            if(c == 0x2d)
                return this.validKeys & 2 ? undefined : false;
            if(c == 0x2e)
                return this.validKeys & 4 ? undefined : false;
            return false;
        }
        if(this.table && this.table instanceof Xjs.ui.GridTable)
            this.table._onKeyPress(e);
        return;
    },
    /*xjs.ui.InputField._onKeyDown*/
    _onKeyDown:function(e)
    {
        if(e.keyCode == 9)
        {
            this.hideAidInputer();
        }
        if(this.inAISearch == 2 && this.aidInputer.doParentCompSearchBoxKeyDown && this.aidInputer.doParentCompSearchBoxKeyDown(e))
        {
            e._xopts = 1;
            return false;
        }
        if((e.keyCode == 8 || e.keyCode == 46) && (this.isReadonly() || this.editable === false))
        {
            if(this.isReadonly() || this.editable === false)
            {
                return this.inAISearch == 2 ? undefined : false;
            }
        }
        if(Xjs.Event.isCmdKey(e))
        {
            switch(e.keyCode)
            {
            case 90:
                if(this.undoFunc != null)
                {
                    return this.undoFunc();
                }
            case 67:
                {
                    var a = Xjs.DOM.getInputSelectionRange(this.inputDom);
                    if(a && a[0] == a[1])
                    {
                        this.inputDom.select();
                    }
                    break;
                }
            }
        }
        if(this.table && this.table instanceof Xjs.ui.GridTable)
        {
            if(e.keyCode == 37)
            {
                var r = this.getSelectionRange();
                if(r && r[0] > 0)
                {
                    e._xopts = 1;
                }
            }
            if(e.keyCode == 13 && this.inputDom.readOnly && (Xjs.isIE || Xjs.isTrident))
            {
                this.table._onKeyPress(e);
            }
        }
        return;
    },
    /*xjs.ui.InputField.deleteValue*/
    deleteValue:function()
    {
        delete this.value;
    },
    /*xjs.ui.InputField.fireOnChanged*/
    fireOnChanged:function()
    {
        if(this.inputDom && !this.inAISearch)
            this.onChanged(null,0,false);
    },
    /*xjs.ui.InputField.onChanged*/
    onChanged:function(e,opts,force)
    {
        this.showBgDOM();
        var v = this.inputDom.value;
        if(v === "")
            v = null;
        if(!Xjs.objEquals(v,this._$valueBeforeChanged) || this.inputType == "file" || force)
        {
            if(this._$valueBeforeChanged instanceof Date && Xjs.objEquals(Date.parseDate(v),this._$valueBeforeChanged))
            {
                return;
            }
            if(!(opts & 1) && (!(opts & 2) || !this.inputDom.readOnly))
            {
                delete this.value;
                delete this.displayValue;
            }
            this.validateValue(null,null,1);
            this.fireEvent("valueChanged",e,opts);
            this._initValueBeforeChanged();
            this.updateCharsCntInd();
        }
    },
    /*xjs.ui.InputField.updateCharsCntInd*/
    updateCharsCntInd:function()
    {
        if((this.maxCharsCnt > 0 || this.maxCharsCnt2 > 0) && this.maxCharsCntInd)
        {
            Xjs.DOM.setTextContent(this.maxCharsCntInd,"" + (this.maxCharsTxt || this.maxCharsCnt || this.maxCharsCnt2));
        }
        if(this.charsCntInd || this.leftCharsCntInd)
        {
            var v = this.inputDom.value,
                n1 = v == null ? 0 : v.length;
            if(this.charsCntInd)
                Xjs.DOM.setTextContent(this.charsCntInd,"" + n1);
            if(this.leftCharsCntInd)
            {
                var n2 = (this.maxCharsCnt || this.maxCharsCnt2) - n1;
                Xjs.DOM.setTextContent(this.leftCharsCntInd,"" + n2);
            }
        }
    },
    /*xjs.ui.InputField.getValue*/
    getValue:function()
    {
        if(this.inputType == "file")
        {
            return Xjs.ui.InputField.getFileValue(this.inputDom);
        }
        if(this.value !== undefined)
        {
            return this.value;
        }
        var s = this.getDisplayValue(true);
        if(s && this.sqlType && this.sqlType != 12)
        {
            if(this.percent > 1 && s.endsWith("%"))
            {
                s = s.substring(0,s.length - 1);
            }
            var v = Xjs.Data.parseFromSqlType(s,this.sqlType);
            if(this.percent > 1 && typeof(v) == "number")
            {
                v = v / this.percent;
                var inc = 0,
                    p = s.indexOf(".");
                if(s.length > 0 && p >= 0)
                {
                    inc = s.substring(p + 1).length;
                }
                inc += 2;
                var vstr = v.toString();
                p = vstr.indexOf(".");
                if(vstr.substring(p + 1).length > inc)
                {
                    var pow = Math.pow(10,inc);
                    v = Math.round(v * pow) / pow;
                }
            }
            return v;
        }
        return s;
    },
    /*xjs.ui.InputField.validateValue*/
    validateValue:function(src,ivFields,opts)
    {
        var v = this.value !== undefined || !this.inputDom ? this.value : this.getDisplayValue(false);
        return this._validateValue(v,ivFields,opts || 0);
    },
    /*xjs.ui.InputField._validateValue*/
    _validateValue:function(v,ivFields,opts)
    {
        if(v === undefined)
        {
            v = null;
        }
        if(opts == 1)
        {
            if(this.__lastValidVal1 === v)
            {
                return !this.__lastInalidate1;
            }
        }
        if((opts || 0) == 0)
        {
            if(this.__lastValidVal0 === v)
            {
                return !this.__lastInalidate0;
            }
        }
        var b = this._validateValue0(v,ivFields,opts);
        if((opts || 0) == 0)
        {
            this.__lastValidVal0 = v === null ? undefined : v;
            this.__lastInalidate0 = !b;
        } else if(opts == 1)
        {
            this.__lastValidVal1 = v;
            if(!this.__lastInalidate1 != b)
            {
                this.__lastInalidate1 = !b;
                this._updateClass();
            }
        }
        return b;
    },
    /*xjs.ui.InputField._validateValue0*/
    _validateValue0:function(value,ivFields,opts)
    {
        if(value === "" || value == null)
        {
            if(this.nonBlank && !(opts & 1))
            {
                if(ivFields)
                    ivFields.push({comp:this,cause:"blank"});
                return false;
            }
            return true;
        }
        var isDate = this.sqlType >= 91 && this.sqlType <= 93,
            isNum = this.sqlType == 2 || this.sqlType == 4;
        if(this.sqlType != 12 && this.sqlType != 0 && typeof(value) == "string" && !isDate)
        {
            var p = value.indexOf(':');
            if(p >= 0)
                value = value.substring(0,p);
        }
        var v0 = value;
        if(typeof(v0) == "string")
        {
            try
            {
                v0 = Xjs.Data.parseFromSqlType(value,this.sqlType);
            }catch(ex)
            {
                if(opts & 2)
                    throw ex;
                return false;
            }
        }
        if(this.chkValues)
            for(var j=0;j < this.chkValues.length;j++)
            {
                var ckv = this.chkValues[j],
                    v = ckv.value;
                if(ckv.valIn > 0)
                    switch(ckv.valIn)
                    {
                    case 1:
                        var c = this.getMainParentComponent().getItemByName(v);
                        if(!c)
                            continue;
                        v = c.getValue();
                        break;
                    }
                if(ckv.opts & 1 && v == null)
                {
                    continue;
                }
                var cmp = Xjs.objCmp(v0,v),
                    k;
                switch(ckv.cmp)
                {
                case ">=":
                    k = cmp >= 0;
                    break;
                case ">":
                    k = cmp > 0;
                    break;
                case "<=":
                    k = cmp <= 0;
                    break;
                case "<":
                    k = cmp < 0;
                    break;
                case "==":
                    k = cmp == 0;
                    break;
                case "!=":
                    k = cmp != 0;
                    break;
                default:
                    continue;
                }
                if(!k)
                    return false;
            }
        var p;
        if(isDate)
        {
            if(this.valueRangeSep && (p = value.indexOf(this.valueRangeSep)) >= 0)
            {
                var s1,
                    s2,
                    date1 = Date.parseDate(s1 = value.substring(0,p)),
                    date2 = Date.parseDate(s2 = value.substring(p + this.valueRangeSep.length));
                if(!date1 && s1 != "" || !date2 && s2 != "" || this.nonBlank && !date1 && !date2 || date1 && date2 && date1.getTime() > date2.getTime())
                    return false;
                return true;
            }
            var date;
            if(!(date = Date.parseDate(value)))
                return false;
            var date1 = null,
                date2 = null;
            if(this.name && this.name.endsWith(".[to]"))
            {
                date2 = date;
                var c = this.parent.getItemByName(this.name.substring(0,this.name.length - 3) + "from]");
                if(c)
                    date1 = Date.parseDate(c.getValue());
            } else if(this.name && this.name.endsWith(".[from]"))
            {
                date1 = date;
                var c = this.parent.getItemByName(this.name.substring(0,this.name.length - 5) + "to]");
                if(c)
                    date2 = Date.parseDate(c.getValue());
            }
            if(date1 && date2 && date1.getTime() > date2.getTime())
            {
                return false;
            }
            return true;
        } else if(this.valueRangeSep && !(opts & 1) && isNum && typeof(value) == "string" && (p = value.indexOf(this.valueRangeSep)) >= 0)
        {
            var s1 = value.substring(0,p),
                s2 = value.substring(p + this.valueRangeSep.length);
            return this._validateValue(s1,null,1) && this._validateValue(s2,null,1);
        }
        if(this.sqlType == -7)
        {
            return typeof(value) == "boolean" || value == "true" || value == "false";
        }
        if(this.validateValueRng)
        {
            if(this.validateValueRng[0] != null && v0 < this.validateValueRng[0] || this.validateValueRng[1] != null && v0 > this.validateValueRng[1])
            {
                return false;
            }
        }
        var regex = this.regExpr || this.regex;
        if(!regex)
        {
            if(this.sqlType == 4)
                regex = Xjs.Data.IntRegExpr;
            else if(this.sqlType == 2)
                regex = Xjs.Data.NumRegExpr;
        }
        return !regex || regex.test(value);
    },
    /*xjs.ui.InputField.getDisplayValue*/
    getDisplayValue:function(updateDOM)
    {
        var v;
        if(this.inputDom)
        {
            if(updateDOM)
            {
                if(this.trimBlank)
                {
                    this.trimDomBlank();
                }
                if(this.valConverter)
                    this.convertDomVal();
                else if(this.toUpper)
                    this.toUpperDomVal();
            }
            v = this.inputDom.value;
            if(!updateDOM && v)
            {
                if(this.trimBlank && typeof(v) == "string")
                {
                    v = v.trim();
                }
                if(this.valConverter)
                    v = this.valConverter.call(this,v);
                if(this.toUpper && v)
                    v = v.toUpperCase();
            }
        } else 
        {
            v = this.value;
        }
        return v === "" ? null : v;
    },
    /*xjs.ui.InputField._updateDomValue*/
    _updateDomValue:function(opts)
    {
        if(this.value === undefined)
            return;
        var displayValue = this.displayValue,
            color = this.color,
            bgcolor = this.bgcolor;
        if(displayValue === undefined)
        {
            var focus = this._focused || this.alwaysInFocus || opts & 1 || this.aidInputer && this.aidInputer.isAidInputerInShowing && this.aidInputer.isAidInputerInShowing(),
                info = {mainComp:null,cell:this,showCode:this._isShowCode(focus),forEdit:focus && (!this.hideCode || this.editable !== false)};
            displayValue = this.renderer ? this.renderer.cellRender(this.value,info) : Xjs.ui.CellRenderer.defaultRenderer(this.value,info);
            if(info.color)
                color = info.color;
            if(info.background)
                bgcolor = info.background;
        } else if(this._isShowCode(this._focused) && displayValue && displayValue != this.value && this.value != null && this.value != "" && !displayValue.startsWith(this.value + ":"))
        {
            displayValue = this.value + ":" + displayValue;
        }
        if(displayValue == null)
            displayValue = "";
        if(this.inputDom.value != displayValue)
        {
            this.inputDom.value = displayValue;
            if(this.fitHeight)
                Xjs.ui.InputField.resizeHeight(this.inputDom,this.minHeight);
        }
        if(!color)
            color = "";
        if(!bgcolor)
            bgcolor = "";
        if((this.inputDom.style.color || "") != color)
            this.inputDom.style.color = color;
        if((this.inputDom.style.backgroundColor || "") != bgcolor)
            this.inputDom.style.backgroundColor = bgcolor;
        this.showBgDOM();
        this.updateCharsCntInd();
    },
    /*xjs.ui.InputField._isShowCode*/
    _isShowCode:function(focus)
    {
        if(this.hideCode)
            return false;
        if(this.showCodeIfNEdable && focus)
            return true;
        if(this.showCode || !focus || !this.inputDom.readOnly && this.inAISearch == 0 && this.editable !== false)
            return this.showCode;
        return false;
    },
    /*xjs.ui.InputField.trimDomBlank*/
    trimDomBlank:function()
    {
        if(this.trimBlank && this.inputDom)
        {
            var s1 = this.inputDom.value,
                s2 = s1.trim();
            if(s1 != s2)
            {
                this.inputDom.value = s2;
                if(this.fitHeight)
                    Xjs.ui.InputField.resizeHeight(this.inputDom,this.minHeight);
            }
        }
    },
    /*xjs.ui.InputField.toUpperDomVal*/
    toUpperDomVal:function()
    {
        if(this.toUpper && this.inputDom)
        {
            var s1 = this.inputDom.value,
                s2 = s1.toUpperCase();
            if(s1 != s2)
            {
                this.inputDom.value = s2;
                if(this.fitHeight)
                    Xjs.ui.InputField.resizeHeight(this.inputDom,this.minHeight);
            }
        }
    },
    /*xjs.ui.InputField.convertDomVal*/
    convertDomVal:function()
    {
        if(this.valConverter && this.inputDom)
        {
            var s1 = this.inputDom.value,
                s2 = this.valConverter.call(this,s1);
            if(this.toUpper && s2)
                s2 = s2.toUpperCase();
            if(s1 != s2)
            {
                this.inputDom.value = s2;
                if(this.fitHeight)
                    Xjs.ui.InputField.resizeHeight(this.inputDom,this.minHeight);
            }
        }
    },
    /*xjs.ui.InputField.showBgDOM*/
    showBgDOM:function()
    {
        if(this.deliconDOM)
        {
            var v = this.inputDom.value,
                isNull = v == null || v.toString().trim() == "";
            if(this.deliconDOM)
                this.deliconDOM.style.visibility = isNull || this.isReadonly() ? "hidden" : "inherit";
        }
    },
    /*xjs.ui.InputField.setValue*/
    setValue:function(value,displayValue,opts)
    {
        var changed = this.value != value;
        delete this.__lastInalidate1;
        delete this.__lastInalidate0;
        this.value = value;
        this.displayValue = this.showCode && !this.showName ? value : displayValue;
        if(this.inputDom)
        {
            this._updateDomValue(opts & 1);
            this.onChanged(null,1 | opts & 12,changed);
        } else if(changed && !(opts & 0x10))
        {
            this.fireEvent("valueChanged",null,opts);
        }
    },
    /*xjs.ui.InputField._initValueBeforeChanged*/
    _initValueBeforeChanged:function()
    {
        this._$valueBeforeChanged = this.inputDom.value;
        if(this._$valueBeforeChanged === "")
            this._$valueBeforeChanged = null;
    },
    /*xjs.ui.InputField.hideAidinputerIfOutclick*/
    hideAidinputerIfOutclick:function(layer,e)
    {
        if(this.dom && Xjs.DOM.contains(this.dom,e.srcElement || e.target) && this.inAISearch == 2)
            return false;
        return true;
    },
    /*xjs.ui.InputField.hideAidInputer*/
    hideAidInputer:function()
    {
        if(this.aidInputer && this.aidInputer.hideAidInputer)
            this.aidInputer.hideAidInputer(this);
    },
    /*xjs.ui.InputField.setAidInputer*/
    setAidInputer:function(a)
    {
        this.aidInputer = a;
        if(this.inputDomx && !this.comboDOM)
        {
            this.comboDOM = Xjs.DOM.createChild(this.inputDomx,"span","ui-input-combobtn");
            this.comboDOM.onclick = Function.bindAsEventListener(this._onComboIconClick,this,0,true);
        }
        this.updateComboIcon();
        this.showBgDOM();
    },
    /*xjs.ui.InputField.disableParentTabUseEnterKey*/
    disableParentTabUseEnterKey:function()
    {
        return this.inputType == "textarea";
    },
    /*xjs.ui.InputField.addCodeNameCaseValue*/
    addCodeNameCaseValue:function(name,value)
    {
        if(!this.codeNameCaseValues)
        {
            if(value == null)
                return;
            this.codeNameCaseValues = {};
        }
        if(value == null)
            delete this.codeNameCaseValues[name];
        else 
            this.codeNameCaseValues[name] = value;
    },
    /*xjs.ui.InputField.addValueName*/
    addValueName:function(code,name)
    {
        if(code == null)
            return;
        if(!this.valueMap)
            this.valueMap = {};
        if(name == null)
            delete this.valueMap[code];
        else 
            this.valueMap[code] = name;
    },
    /*xjs.ui.InputField.onInput*/
    onInput:function(e)
    {
        if(this.fitHeight)
            Xjs.ui.InputField.resizeHeight(this.inputDom,this.minHeight);
        if(this.inAISearch)
        {
            if(this.aidInputer && !this.aidInputer.isAidInputerInShowing())
            {
                this.lastAidInputChar = 0;
                this.doAidInput({fnSearchFilter:new Xjs.FuncCall(this.getInputValue,this),options:4});
            }
            this.filterAISearch();
            return;
        }
        this.onChanged(e,2,false);
    },
    /*xjs.ui.InputField.getTipText*/
    getTipText:function()
    {
        var ie;
        if(ie = this.inputDom)
        {
            var domW = ie.offsetWidth,
                tipText = ie.value || this.bgLabel || "";
            if(this.getCharLength(tipText) * 8 <= domW)
                return null;
            var e = Xjs.DOM._createTempSpanDOM();
            e.style.fontSize = ie.style.fontSize;
            e.style.fontWeight = ie.style.fontWeight;
            Xjs.DOM.setTextContent(e,tipText);
            var dispW = e.scrollWidth;
            if(dispW >= domW)
                return tipText.replace(/\n/g,"<br>");
        }
        return null;
    },
    /*xjs.ui.InputField.getCharLength*/
    getCharLength:function(text)
    {
        var strlen = 0;
        for(var i=0;i < text.length;i++)
        {
            if(text.charCodeAt(i) > 255)
                strlen += 2;
            else 
                strlen++;
        }
        return strlen;
    },
    /*xjs.ui.InputField.filterAISearch*/
    filterAISearch:function()
    {
        if(this.inAISearch == 2 && this.getAidInputer().getAidInputerInfo(2,null) & 4 && this.aidInputer.filterByParentInput)
            this.aidInputer.filterByParentInput();
    },
    /*xjs.ui.InputField.onAidInputerShowing*/
    onAidInputerShowing:function(a)
    {
        if(this.inAISearch == 1 && this.getAidInputer().getAidInputerInfo(2,null) & 4)
        {
            if(this.value === undefined)
            {
                this._flags |= 1;
            } else 
                this._flags &= ~1;
            this.inAISearch = 2;
            Xjs.DOM.addClass(this.dom,"ui-input-inaisearch");
            this.filterAISearch();
        }
    },
    /*xjs.ui.InputField.onAidInputerHidden*/
    onAidInputerHidden:function(a)
    {
        if(this.inAISearch == 2)
        {
            this.inAISearch = 1;
            if(this._flags & 1)
                this.inputDom.value = "";
            Xjs.DOM.removeClass(this.dom,"ui-input-inaisearch");
            this._updateDomValue(0);
        }
    },
    /*xjs.ui.InputField.getInputValue*/
    getInputValue:function()
    {
        return this.inputDom ? this.inputDom.value : null;
    },
    /*xjs.ui.InputField.setMutipleFileInput*/
    setMutipleFileInput:function(m)
    {
        this.multiple = !!m;
        if(this.inputDom)
            this.inputDom.multiple = this.multiple;
    }
});
Xjs.apply(Xjs.ui.InputField,{
    /*xjs.ui.InputField.getFileValue*/
    getFileValue:function(inputDom)
    {
        var fn = inputDom.value;
        if(!fn || fn.length == 0)
            return null;
        var v = new Xjs.ui.util.FileValue(fn);
        v.inputDom = inputDom;
        return v;
    },
    /*xjs.ui.InputField.resizeHeight*/
    resizeHeight:function(ta,minHeight)
    {
        ta.style.height = "0px";
        ta.style.overflowY = "hidden";
        var h = ta.scrollHeight,
            bs = Xjs.DOM.getStyle(ta,"boxSizing"),
            tb = bs == "border-box" ? 0 : Xjs.DOM.getPadding(ta,"tb");
        if(minHeight > 0 && h < minHeight)
            h = minHeight;
        h -= tb;
        ta.style.height = (h < 0 ? 0 : h) + "px";
    },
    /*xjs.ui.InputField.asOnInputListener*/
    asOnInputListener:function(e,f,_this)
    {
        if("oninput" in e)
        {
            return function(ev){
            f.call(_this,ev || window.event);
        };
        } else 
        {
            return function(ev){
            if((ev || window.event).propertyName == "value")
                f.call(_this,ev || window.event);
        };
        }
    },
    /*xjs.ui.InputField.setOnInput*/
    setOnInput:function(e,onInput,_this)
    {
        var f = onInput == null ? null : Xjs.ui.InputField.asOnInputListener(e,onInput,_this);
        if("oninput" in e)
        {
            e.oninput = f;
        } else 
        {
            e.onpropertychange = f;
        }
    }
});
{
    Xjs.UITYPES.input = Xjs.ui.InputField;
}/*xjs/ui/Label.java*/
Xjs.ui.Label=function(config){
    Xjs.ui.Label.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.Label,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.Label",
    /*xjs.ui.Label._createDOM*/
    _createDOM:function(root)
    {
        var d = this._createDom0(root,"label");
        if(this.html === undefined && this.text != null)
            this.setHtml(this.color != null ? "<font color=" + this.color + ">" + this.text + "</font>" : this.text);
        this._updateText(d);
        if(this.htmlFor != null)
            d.htmlFor = this.htmlFor;
        return d;
    },
    /*xjs.ui.Label._updateText*/
    _updateText:function(d)
    {
        if(!d)
            d = this.dom;
        if(!d)
            return;
        if(this.html != null)
        {
            d.innerHTML = this.html;
        } else 
        {
            d.innerHTML = "";
        }
        d.style.color = this.color || "";
    },
    /*xjs.ui.Label.getText*/
    getText:function()
    {
        return this.text;
    },
    /*xjs.ui.Label.setTextHtmlFmt*/
    setTextHtmlFmt:function(s)
    {
        this.textHtmlF = s;
    },
    /*xjs.ui.Label.setText*/
    setText:function(text,color)
    {
        if(text === undefined)
            text = this.text;
        if(color === undefined)
            color = this.color;
        if(this.text != text || this.color != color)
        {
            this.text = text;
            this.color = color;
            var p;
            if(this.textHtmlF && (p = this.textHtmlF.indexOf("${TEXT}")) >= 0)
            {
                this.html = this.textHtmlF.substring(0,p) + (text || "") + this.textHtmlF.substring(p + 7);
            } else 
                this.html = text;
            this._updateText(null);
        }
    },
    /*xjs.ui.Label.getHtml*/
    getHtml:function()
    {
        return this.html;
    },
    /*xjs.ui.Label.setHtml*/
    setHtml:function(html)
    {
        if(this.html != html)
        {
            this.html = html;
            this._updateText(null);
        }
    }
});
{
    Xjs.UITYPES.label = Xjs.ui.Label;
}/*xjs/ui/LayDateAidInputer.java*/
Xjs.ui.LayDateAidInputer=function(params){
    Xjs.apply(this,params);
};
Xjs.apply(Xjs.ui.LayDateAidInputer.prototype,{
    /*xjs.ui.LayDateAidInputer.doAidInput*/
    doAidInput:function(comp,value,event)
    {
        if(!this.type)
        {
            throw new Error("必须配置配置日期辅助录入类型 type ！");
        }
        var laydate = window.laydate,
            field = comp;
        field.immPostValue = true;
        if(!field.isReadonly())
        {
            var tgt = {};
            tgt.type = this.type;
            if(this.format)
            {
                tgt.format = this.format;
            }
            tgt.elem = "#UIA_" + (field.table ? field.table.name : field.parent.name) + "_" + comp.name + " input";
            tgt.done = this.inputFieldDone(field);
            tgt.show = true;
            tgt.trigger = "xxx";
            var o = laydate.render(tgt);
            if(window._debug_)
            {
                window.console.log(o);
            }
        }
        return null;
    },
    /*xjs.ui.LayDateAidInputer.inputFieldDone*/
    inputFieldDone:function(field)
    {
        return function(value,date,enddate){
            if(field.table)
            {
                if(field.table instanceof Xjs.ui.GridTable)
                {
                    field.table.getColumn(field.name).editComponent.setValue(value);
                }
                if(field.table.dataSet.columnAt(field.name) > -1)
                {
                    field.table.dataSet.setValue(field.name,value);
                }
            } else 
            {
                field.setValue(value);
            }
        };
    },
    /*xjs.ui.LayDateAidInputer.hideAidInputer*/
    hideAidInputer:Xjs.emptyFn,
    /*xjs.ui.LayDateAidInputer.isAidInputerInShowing*/
    isAidInputerInShowing:Xjs.falseFn,
    /*xjs.ui.LayDateAidInputer.getAidInputerInfo*/
    getAidInputerInfo:Xjs.nullFn
});
/*xjs/ui/LazyComp.java*/
Xjs.ui.LazyComp=function(cfg){
    Xjs.ui.LazyComp.superclass.constructor.call(this,cfg);
};
Xjs.extend(Xjs.ui.LazyComp,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.LazyComp",
    /*xjs.ui.LazyComp.loadUI*/
    loadUI:function(rootDOM)
    {
        var _this = this;
        if(this.refComp)
        {
            return new Promise(function(resolve,reject){
            resolve(_this.refComp);
        });
        } else 
        {
            return Xjs.JsLoad.asynLoadUI(this.getRootComponentMID() + "~" + this.name).then(function(ui){
            _this.refComp = ui.getUI(0,0,null,null,_this.getRootComponent());
            _this.onCompLoaded(rootDOM);
            return _this.refComp;
        });
        }
    },
    /*xjs.ui.LazyComp.onCompLoaded*/
    onCompLoaded:function(rootDOM)
    {
        var uid = this.getRootComponentMID() + "~" + this.name;
        for(var i=0;i < this.parent.items.length;i++)
        {
            if(this.parent.items[i] == this)
                this.parent.items[i] = this.refComp;
        }
        var htmlURL = Xjs.ui.UIUtil.getAttachHtmlURL(uid,null),
            html = Xjs.loadUrlRES(htmlURL,false).trim();
        if(html.startsWith("<body>") && html.endsWith("</body>"))
        {
            html = html.substring(6,html.length - 7).trim();
        }
        var pdom = Xjs.DOM.findById(this.id,rootDOM);
        pdom.innerHTML = html;
        var a = [];
        while(pdom.hasChildNodes())
        {
            a.push(pdom.firstChild);
            pdom.removeChild(pdom.firstChild);
        }
        for(var j=0;j < a.length;j++)
        {
            pdom.parentNode.insertBefore(a[j],pdom);
        }
        pdom.parentNode.removeChild(pdom);
    }
});
/*xjs/ui/List.java*/
Xjs.ui.List$AidInputComp=function(list){
    this.list = list;
};
Xjs.extend(Xjs.ui.List$AidInputComp,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.List$AidInputComp",
    /*xjs.ui.List$AidInputComp.setValue*/
    setValue:function(v)
    {
        if(this.status == 1)
            return;
        this.status = 1;
        if(v)
        {
            delete this.list._$value;
            var a = v.split(",");
            for(var i=0;i < a.length;i++)
            {
                var s = a[i],
                    p = s.indexOf(':'),
                    value = p >= 0 ? s.substring(0,p) : s,
                    text = p >= 0 ? s.substring(p + 1) : s;
                this.list.removeItem(value);
                var rowDom = this.list.addItem(value,text);
                if(this.list.appendItemOpts & 1)
                {
                    var checkDOM = rowDom.checkDOM;
                    checkDOM.checked = true;
                    this.list.fireEvent("valueChanged");
                }
            }
        }
    }
});
Xjs.ui.List=function(config){
    Xjs.ui.List.superclass.constructor.call(this,config);
    if(typeof(this.mcheckCls) == "string")
    {
        this.mcheckCls = this.mcheckCls.split(",");
    }
};
Xjs.extend(Xjs.ui.List,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.List",
    focusableComp:true,
    isItemComp:true,
    /*xjs.ui.List.__init*/
    __init:function()
    {
        Xjs.ui.List.superclass.__init.call(this);
        this.className = "ui-list-box";
        this.listClassName = "ui-list";
        this.rowClassName = "ui-listrow";
        this.srowClassName = "ui-seledlistrow";
    },
    /*xjs.ui.List._createDOM*/
    _createDOM:function(root)
    {
        var dom = Xjs.ui.List.superclass._createDom0.call(this,root,"div");
        if(this.maxHeight > 0)
            dom.style.maxHeight = this.maxHeight + "px";
        this.listDOM = Xjs.DOM.createChild(dom,"div",this.listClassName);
        Xjs.DOM.addOrRemoveClass(this.listDOM,"ui-list-dragable",this.dragable);
        this._addOptions(this.listDOM);
        if(this.value != null)
            this._updateChecked(this.listDOM);
        if(this.appendAidInputer)
        {
            this.appendDOM = Xjs.DOM.createChild(dom,"button");
            var textDOM = Xjs.DOM.createChild(this.appendDOM,"span","text");
            Xjs.DOM.setTextContent(textDOM,this.appendBtnText || "添加..");
            this.appendDOM.onclick = Function.bindAsEventListener(this.startAppendAidInputer,this);
        }
        if(this.customSbar)
            this._customScrollSbar = new Xjs.ui.util.CustomScrollbar(this.name + ".SBar",dom,this.customSbar,null,null,null);
        return dom;
    },
    /*xjs.ui.List.updateCustomScrollBar*/
    updateCustomScrollBar:function()
    {
        if(this._customScrollSbar)
        {
            this._customScrollSbar.updateValue();
        }
    },
    /*xjs.ui.List.onResize*/
    onResize:function()
    {
        this.updateCustomScrollBar();
    },
    /*xjs.ui.List.setEmptyItemText*/
    setEmptyItemText:function(emptyText)
    {
        this.emptyText = emptyText;
    },
    /*xjs.ui.List.setFilter*/
    setFilter:function(f)
    {
        this.filter = f;
    },
    /*xjs.ui.List._addOptions*/
    _addOptions:function(listDOM)
    {
        if(this.emptyText !== undefined)
        {
            var rowDom = this.createRowDOM(false,"",this.emptyText,this.check2Fac);
            listDOM.appendChild(rowDom);
        }
        var optData = this.getSelectOptions();
        if(optData != null)
            for(var i=0;i < optData.length;i++)
            {
                var a = optData[i];
                if(!Xjs.isArray(a))
                    a = [a];
                if(this.filter && !this.filter.filterAccept(a))
                    continue;
                var value = a[0],
                    text = a.length < 2 ? value : (this.showCode && value != a[1] ? value + ":" + a[1] : a[1]),
                    rowDom = this.createRowDOM(false,value,text,this.check2Fac);
                if(this.value != null)
                {
                    if(!this.multiple)
                    {
                        if(this.value == value)
                        {
                            rowDom.checkDOM.checked = true;
                            this.forChecked(rowDom);
                        }
                    } else 
                    {
                    }
                }
                listDOM.appendChild(rowDom);
            }
        this.updateCustomScrollBar();
    },
    /*xjs.ui.List.setSelectOptions*/
    setSelectOptions:function(o)
    {
        this.selectOptions = o;
        this.resetSelectOptions();
    },
    /*xjs.ui.List.resetSelectOptions*/
    resetSelectOptions:function()
    {
        if(this.listDOM)
        {
            Xjs.DOM.removeAllChild(this.listDOM);
            this._addOptions(this.listDOM);
            if(this.value)
                this._updateChecked(this.listDOM);
        }
    },
    /*xjs.ui.List.createRowDOM*/
    createRowDOM:function(disableCheck,value,text,check2Fac)
    {
        var rowDom = document.createElement("div");
        if(this.rowHeight)
            rowDom.style.height = this.rowHeight + "px";
        rowDom.className = this.rowClassName;
        var name = this.name || this.id;
        if(this.multiple)
        {
            name += "#" + value;
        }
        if(this.mcheckCls)
        {
            var span = Xjs.DOM.createChild(rowDom,"span",(this.mcheckBasCls || "") + " " + this.mcheckCls[0]);
            span.id = "mcheck_" + this.id + "_" + value;
            rowDom._$mcheckVal = 0;
            if(!this._$onMCheckClick)
                this._$onMCheckClick = Function.bindAsEventListener(this._onMCheckClick,this);
            span.onclick = this._$onMCheckClick;
            rowDom._$mcheckDOM = span;
        } else if(this.mcheckBasCls)
        {
            var span = Xjs.DOM.createChild(rowDom,"span",this.mcheckBasCls);
            span.id = "mcheck_" + this.id + "_" + value;
        }
        var span = Xjs.DOM.createChild(rowDom,"span","ui-check"),
            checkDOM = document.createElement("input");
        checkDOM.type = this.multiple ? "checkbox" : "radio";
        checkDOM.value = value;
        if(this.readOnly)
            checkDOM.disabled = true;
        if(disableCheck)
            checkDOM.disabled = true;
        if(!this.checkVisible)
        {
            checkDOM.style.display = "none";
            Xjs.DOM.addClass(rowDom,"ui-checkvisivle");
        } else 
        {
            Xjs.DOM.createChild(span,"span","check");
            Xjs.DOM.addClass(rowDom,"ui-checkinvisivle");
        }
        checkDOM.id = this.id + "#" + value;
        checkDOM.name = name;
        span.appendChild(checkDOM);
        var labelDOM = document.createElement("label"),
            textNode = document.createTextNode(text);
        labelDOM.appendChild(textNode);
        span.appendChild(labelDOM);
        if(this.fnItemRemoveable && this.fnItemRemoveable.call(value))
        {
            var delIcon = document.createElement("span");
            delIcon.id = "DelItemIcon";
            span.appendChild(delIcon);
        }
        rowDom.value = value;
        rowDom.checkDOM = checkDOM;
        if(check2Fac)
        {
            var comp = check2Fac.newComponent({_value:value,_text:text});
            if(comp)
            {
                rowDom.check2Comp = comp;
                rowDom.appendChild(comp.getDOM());
            }
        }
        if(!this._$onClick)
        {
            this._$onClick = Function.bindAsEventListener(this._onClick,this);
            this._$onRowClick = Function.bindAsEventListener(this._onRowClick,this);
        }
        checkDOM.onclick = this._$onClick;
        rowDom.onclick = this._$onRowClick;
        if(this.dragable)
        {
            if(this._$onRowMouseDown == null)
            {
                this._$onRowMouseDown = Function.bindAsEventListener(this._onRowMouseDown,this);
                this._$onRowMouseMove = Function.bindAsEventListener(this._onRowMouseMove,this);
            }
            labelDOM.onmousedown = this._$onRowMouseDown;
            labelDOM.onmousemove = this._$onRowMouseMove;
        }
        this.resetCheckIdxCls(rowDom);
        return rowDom;
    },
    /*xjs.ui.List._onClick*/
    _onClick:function(e)
    {
        this.clearMovingDOM();
        this.onClick(this.getListRowDOM(e));
    },
    /*xjs.ui.List.getListRowDOM*/
    getListRowDOM:function(e)
    {
        if(!this.listDOM)
            return null;
        var t = e.srcElement || e.target;
        for(var j=0;j < this.listDOM.childNodes.length;j++)
        {
            if(Xjs.DOM.contains(this.listDOM.childNodes[j],t))
                return this.listDOM.childNodes[j];
        }
        return null;
    },
    /*xjs.ui.List._onRowClick*/
    _onRowClick:function(e)
    {
        this.clearMovingDOM();
        if((!this.dragable || this.labelCheck === true) && !this.readOnly)
        {
            var target = e.srcElement || e.target;
            if(target.tagName == "INPUT")
                return;
            var rowDom = this.getListRowDOM(e);
            if(!rowDom)
                return;
            if(target.id == "DelItemIcon")
            {
                this.removeItem(rowDom);
                return;
            }
            var c = rowDom.check2Comp;
            if(c && c.dom && Xjs.DOM.contains(c.dom,target))
                return;
            var checkDOM = rowDom.checkDOM;
            if(this.multiple || !checkDOM.checked)
                checkDOM.checked = !checkDOM.checked;
            this.onClick(rowDom);
        }
    },
    /*xjs.ui.List._onMCheckClick*/
    _onMCheckClick:function(e)
    {
        var target = e.srcElement || e.target,
            pid = "mcheck_" + this.id + "_";
        if(!target.id || !target.id.startsWith(pid) || !target.parentNode)
            return;
        var v = target.parentNode._$mcheckVal;
        if(v === undefined)
            return;
        delete this._$value;
        this.setMCheckVal(target.id.substring(pid.length),target,v + 1);
    },
    /*xjs.ui.List.clearMovingDOM*/
    clearMovingDOM:function()
    {
        delete this.movingRowIndex;
        if(this.movingDOM != null)
        {
            Xjs.DOM.removeAllChild(this.movingDOM);
            this.movingDOM.style.display = "none";
        }
    },
    /*xjs.ui.List._onRowMouseDown*/
    _onRowMouseDown:function(e)
    {
        this.clearMovingDOM();
        if(this.dragable)
        {
            var target = e.srcElement || e.target,
                rowDom = Xjs.DOM.getParentForTag(target,"DIV"),
                i = Array.identicalIndexOf(this.listDOM.childNodes,rowDom);
            if(i < 0)
                return;
            this.movingRowIndex = i;
            this.deltaXY = Xjs.Event.getXY(e,rowDom);
            if(!this.movingDOM)
            {
                this.movingDOM = document.createElement("div");
                this.movingDOM.className = "ui-moving";
                this.movingDOM.onmousemove = this._$onRowMouseMove;
                this.movingDOM.onmouseup = Function.bindAsEventListener(this._onRowMouseUp,this);
            } else 
            {
                Xjs.DOM.removeAllChild(this.movingDOM);
            }
            {
                var checked = this.movingRowChecked = rowDom.checkDOM.checked,
                    value = "",
                    labelElement = rowDom.getElementsByTagName("LABEL")[0],
                    text = labelElement.innerText || labelElement.textContent,
                    mrowDom = this.createRowDOM(true,value,text,this.check2Fac);
                mrowDom.checkDOM.checked = checked;
                this.movingDOM.appendChild(mrowDom);
            }
            var s = this.movingDOM.style;
            s.display = "none";
            s.height = rowDom.clientHeight + "px";
            s.width = rowDom.clientWidth + "px";
            document.body.appendChild(this.movingDOM);
            if(Xjs.isIE)
                document.onselectstart = Xjs.falseFn;
        }
    },
    /*xjs.ui.List._onRowMouseMove*/
    _onRowMouseMove:function(e)
    {
        if(this.movingRowIndex !== undefined)
        {
            var px = Xjs.Event.getPageX(e),
                py = Xjs.Event.getPageY(e),
                s = this.movingDOM.style;
            s.left = px - this.deltaXY.x + "px";
            s.top = py - this.deltaXY.y + "px";
            s.display = "block";
        }
    },
    /*xjs.ui.List.mouseInRowDOM*/
    mouseInRowDOM:function(e)
    {
        var rowDoms = this.listDOM.childNodes;
        for(var i=0;i < rowDoms.length;i++)
        {
            var xy = Xjs.Event.getXY(e,rowDoms[i]),
                y = xy.y;
            if(y < 0)
                return i - 1;
            if(y <= rowDoms[i].offsetHeight)
                return i;
        }
        return rowDoms.length;
    },
    /*xjs.ui.List._onRowMouseUp*/
    _onRowMouseUp:function(e)
    {
        if(Xjs.isIE)
            document.onselectstart = null;
        if(this.movingDOM == null)
            return;
        this.movingDOM.style.display = "none";
        document.body.removeChild(this.movingDOM);
        Xjs.DOM.removeAllChild(this.movingDOM);
        if(this.movingRowIndex !== undefined)
        {
            var j = this.movingRowIndex;
            delete this.movingRowIndex;
            var i = this.mouseInRowDOM(e);
            if(i < 0)
                i = 0;
            var n = this.listDOM.childNodes.length;
            if(i > n - 1)
                i = n - 1;
            if(j == i || j < 0 || j >= n)
                return;
            var d = this.listDOM.childNodes[j];
            this.listDOM.removeChild(d);
            if(i > n - 1)
                this.listDOM.appendChild(d);
            else 
                this.listDOM.insertBefore(d,this.listDOM.childNodes[i]);
            if(this.movingRowChecked)
                d.checkDOM.checked = true;
            this.movingRowChecked = false;
            delete this._$value;
            this.updateCheckedItemColor();
        }
    },
    /*xjs.ui.List.onClick*/
    onClick:function(rowDom)
    {
        if(!rowDom)
            return;
        if(!this.multiple)
        {
            this.updateCheckedItemColor();
        } else 
        {
            this.forChecked(rowDom);
        }
        this.onChanged();
    },
    /*xjs.ui.List.updateCheckedItemColor*/
    updateCheckedItemColor:function()
    {
        var n = 0;
        try
        {
            n = this.listDOM.childNodes.length;
        }catch(ex)
        {
        }
        for(var i=0;i < n;i++)
        {
            this.forChecked(this.listDOM.childNodes[i]);
        }
    },
    /*xjs.ui.List.forChecked*/
    forChecked:function(rowDom)
    {
        if(this.checkVisible || this.mcheckCls)
        {
            if(this.chkIdxClsPrefix)
            {
                rowDom.className = this.rowClassName;
            }
            this.resetCheckIdxCls(rowDom);
            return;
        }
        var checked = rowDom.checkDOM.checked;
        Xjs.DOM.addOrRemoveClass(rowDom,this.rowClassName,!checked);
        Xjs.DOM.addOrRemoveClass(rowDom,this.srowClassName,checked);
        this.resetCheckIdxCls(rowDom);
    },
    /*xjs.ui.List.resetCheckIdxCls*/
    resetCheckIdxCls:function(rowDom)
    {
        {
            var checkDOM = rowDom.checkDOM,
                idx = (checkDOM.type == "radio" ? 4 : 0) | (checkDOM.checked ? 2 : 0) | (checkDOM.disabled ? 1 : 0);
            if(this.chkIdxClsPrefix)
            {
                for(var j=0;j < 8;j++)
                {
                    Xjs.DOM.addOrRemoveClass(rowDom,this.chkIdxClsPrefix + idx,j == idx);
                }
            }
            checkDOM.parentNode.className = "ui-check ui-check" + idx;
        }
    },
    /*xjs.ui.List.getRowDomByValue*/
    getRowDomByValue:function(value)
    {
        if(!this.listDOM)
            return null;
        var rowDoms = this.listDOM.childNodes;
        if(rowDoms != null)
            for(var i=0;i < rowDoms.length;i++)
            {
                var rowDom = rowDoms[i],
                    checkDOM = rowDom.checkDOM;
                if(checkDOM && checkDOM.value == value)
                    return rowDom;
            }
        return null;
    },
    /*xjs.ui.List.setValueChecked*/
    setValueChecked:function(value,checked)
    {
        var rowDom = this.getRowDomByValue(value);
        if(!rowDom)
            return;
        if(rowDom.checkDOM.checked != checked)
        {
            rowDom.checkDOM.checked = checked;
            this.onClick(rowDom);
        }
    },
    /*xjs.ui.List.setAllValueChecked*/
    setAllValueChecked:function(check,flags)
    {
        if(!this.listDOM)
            return;
        delete this._$value;
        var rowDoms = this.listDOM.childNodes;
        if(rowDoms != null)
            for(var i=0;i < rowDoms.length;i++)
            {
                var rowDom = rowDoms[i];
                rowDom.checkDOM.checked = check;
                this.forChecked(rowDom);
            }
        if(flags & 1)
            this.onChanged();
    },
    /*xjs.ui.List.getExValue*/
    getExValue:function(value)
    {
        var rowDom = this.getRowDomByValue(value);
        if(!rowDom)
            return null;
        var c = rowDom.check2Comp;
        return c ? c.getValue() : null;
    },
    /*xjs.ui.List.addItem*/
    addItem:function(value,text,before)
    {
        if(this.listDOM == null)
            return null;
        var e = this.getRowDomByValue(value);
        if(!e)
        {
            e = this.createRowDOM(false,value,text,this.check2Fac);
            var rowDoms = this.listDOM.childNodes;
            if(rowDoms != null && before >= 0 && before < rowDoms.length)
                this.listDOM.insertBefore(e,rowDoms[before]);
            else 
                this.listDOM.appendChild(e);
            if(this.mcheckCls)
                delete this._$value;
        }
        this.updateCustomScrollBar();
        return e;
    },
    /*xjs.ui.List.removeItem*/
    removeItem:function(item)
    {
        if(this.listDOM == null)
            return;
        var rowDoms = this.listDOM.childNodes;
        if(rowDoms != null)
            for(var i=0;i < rowDoms.length;i++)
            {
                var rowDom = rowDoms[i];
                if(rowDom == item || rowDom.checkDOM.value == item)
                {
                    var ck = rowDom.checkDOM.checked,
                        changed = ck || this.mcheckCls;
                    if(changed)
                        delete this._$value;
                    this.listDOM.removeChild(rowDom);
                    if(this.fnOnRemoveItem)
                    {
                        this.fnOnRemoveItem.call(rowDom.value,rowDom);
                    }
                    if(changed)
                    {
                        this.onChanged();
                    }
                    return;
                }
            }
        this.updateCustomScrollBar();
    },
    /*xjs.ui.List.removeItemByIndex*/
    removeItemByIndex:function(i)
    {
        if(this.listDOM == null)
            return;
        var rowDoms = this.listDOM.childNodes;
        if(i >= 0 && i < rowDoms.length)
        {
            delete this._$value;
            this.listDOM.removeChild(rowDoms[i]);
        }
    },
    /*xjs.ui.List.removeAllItems*/
    removeAllItems:function()
    {
        Xjs.DOM.removeAllChild(this.listDOM);
    },
    /*xjs.ui.List.getAllItemValues*/
    getAllItemValues:function()
    {
        if(this.listDOM == null)
            return null;
        var rowDoms = this.listDOM.childNodes,
            a = [];
        for(var i=0;i < rowDoms.length;i++)
        {
            var rowDom = rowDoms[i];
            a[i] = rowDom.checkDOM.value;
        }
        return a;
    },
    /*xjs.ui.List.getItemCount*/
    getItemCount:function()
    {
        if(this.listDOM == null)
        {
            var optData = this.getSelectOptions();
            return optData == null ? 0 : optData.length;
        }
        return this.listDOM == null ? 0 : this.listDOM.childNodes.length;
    },
    /*xjs.ui.List.getItemValue*/
    getItemValue:function(i)
    {
        if(!this.listDOM)
        {
            var optData = this.getSelectOptions();
            if(optData == null)
                return null;
            var a = optData[i];
            if(a == null)
                return null;
            return Xjs.isArray(a) ? a[0] : a;
        }
        var rowDom = this.listDOM.childNodes[i];
        return rowDom.checkDOM.value;
    },
    /*xjs.ui.List.isItemSelected*/
    isItemSelected:function(i)
    {
        if(!this.listDOM || i < 0 || i >= this.listDOM.childNodes.length)
            return false;
        var rowDom = this.listDOM.childNodes[i];
        return rowDom.checkDOM.checked;
    },
    /*xjs.ui.List.getValue*/
    getValue:function()
    {
        if(this._$value !== undefined)
            return this._$value;
        if(!this.listDOM)
            return this.value;
        if(this.mcheckCls)
        {
            var vals = null,
                a = Xjs.DOM.findAll("span",this.dom),
                pid = "mcheck_" + this.id + "_";
            if(a)
                for(var i=0;i < a.length;i++)
                {
                    if(a[i].id.startsWith(pid))
                    {
                        var v = (a[i].parentNode._$mcheckVal || 0) + "#" + a[i].id.substring(pid.length);
                        if(!vals)
                            vals = v;
                        else 
                            vals += "," + v;
                    }
                }
            return this._$value = this.value = vals;
        }
        return this._$value = this.value = Xjs.ui.Component.getCheckValues(this.getAllCheckDoms(),(this.multiple ? 1 : 0) | (this.intValue ? 2 : 0) | (this.valueCaseOrder ? 4 : 0) | (this.arrayValue ? 8 : 0));
    },
    /*xjs.ui.List.getAllCheckDoms*/
    getAllCheckDoms:function()
    {
        if(!this.listDOM)
            return null;
        var n = this.listDOM.childNodes.length,
            a = new Array(n);
        for(var j=0;j < a.length;j++)
        {
            var rowDom = this.listDOM.childNodes[j];
            a[j] = rowDom.checkDOM;
        }
        return a;
    },
    /*xjs.ui.List.setValue*/
    setValue:function(value)
    {
        var oldValue = this.getValue();
        this.value = value;
        delete this._$value;
        if(!this.listDOM)
            return;
        this._updateChecked(this.listDOM);
        if(oldValue != this.getValue())
            this.fireEvent("valueChanged");
    },
    /*xjs.ui.List.setMCheckVal*/
    setMCheckVal:function(value,e,v)
    {
        if(!e)
        {
            var a = Xjs.DOM.findAll("span",this.dom);
            if(a)
                for(var i=0;i < a.length;i++)
                {
                    if(a[i].id == "mcheck_" + this.id + "_" + value)
                    {
                        e = a[i];
                        break;
                    }
                }
            if(!e)
                return;
        }
        var old = e.parentNode._$mcheckVal;
        if(old === undefined)
            return;
        Xjs.DOM.removeClass(e,this.mcheckCls[old]);
        if(v >= this.mcheckCls.length)
            v = 0;
        Xjs.DOM.addClass(e,this.mcheckCls[v]);
        e.parentNode._$mcheckVal = v;
    },
    /*xjs.ui.List._updateChecked*/
    _updateChecked:function(listDOM)
    {
        delete this._$value;
        if(!listDOM)
            return;
        var n = listDOM.childNodes.length;
        if(n == 0)
            return;
        if(this.valueCaseOrder && this.value != null)
        {
            var a = this.value.toString().split(","),
                checkedVals = [],
                order = new Xjs.util.ValueMap(null),
                mcheckVals = this.mcheckCls ? {} : null;
            for(var i=0;i < a.length;i++)
            {
                if(this.mcheckCls)
                {
                    var p = a[i].indexOf('#'),
                        k = 0;
                    if(p >= 0)
                    {
                        k = Number.obj2int(a[i].substring(0,p),0);
                        a[i] = a[i].substring(p + 1);
                        if(k > 0)
                            checkedVals.push(a[i]);
                    }
                    mcheckVals[a[i]] = k;
                } else if(a[i].startsWith("*"))
                {
                    checkedVals.push(a[i] = a[i].substring(1));
                }
                order.set(a[i],i);
            }
            var childNodes = new Array(n),
                oldNodes = new Array(n);
            for(var i=0;i < n;i++)
            {
                childNodes[i] = oldNodes[i] = listDOM.childNodes[i];
            }
            childNodes.sort(Array.createCmp3("value",order));
            checkedVals.sort();
            var reord = false;
            for(var i=0;i < n;i++)
            {
                if(childNodes[i] != oldNodes[i])
                {
                    reord = true;
                    break;
                }
            }
            if(reord)
            {
                Xjs.DOM.removeAllChild(listDOM);
                for(var i=0;i < n;i++)
                {
                    listDOM.appendChild(childNodes[i]);
                }
            }
            for(var i=0;i < n;i++)
            {
                var c = listDOM.childNodes[i];
                {
                    c.checkDOM.checked = Array.binarySearch(checkedVals,c.value) >= 0;
                    this.forChecked(c);
                }
                if(mcheckVals)
                {
                    var mcheckE = c._$mcheckDOM;
                    if(mcheckE)
                    {
                        this.setMCheckVal(c.value,mcheckE,mcheckVals[c.value]);
                    }
                }
            }
            return;
        }
        var a = null,
            sorted = false,
            tostr = false;
        if(this.multiple && this.value != null)
        {
            if(this.arrayValue && Xjs.isArray(this.value))
            {
                a = this.value;
            } else 
            {
                a = this.value.split(",").sort();
                sorted = true;
                tostr = true;
            }
        }
        for(var i=0;i < n;i++)
        {
            var c = listDOM.childNodes[i],
                v = c.value;
            if(tostr && v != null)
                v = v.toString();
            var checked = this.multiple ? (a != null ? (sorted ? Array.binarySearch(a,v) >= 0 : a.indexOf(v) >= 0) : false) : c.value == this.value;
            if(c.checkDOM.checked != checked)
            {
                c.checkDOM.checked = checked;
                this.forChecked(c);
            }
        }
    },
    /*xjs.ui.List.setAppendAidInputer*/
    setAppendAidInputer:function(ai,appendItemOpts)
    {
        this.appendAidInputer = ai;
        this.appendItemOpts = appendItemOpts || 0;
    },
    /*xjs.ui.List.startAppendAidInputer*/
    startAppendAidInputer:function(e)
    {
        if(!this.appendAidInputer)
            return;
        if(!this.aiComp)
            this.aiComp = new Xjs.ui.List$AidInputComp(this);
        this.aiComp.status = 0;
        var ev = {};
        this.appendAidInputer.doAidInput(this.aiComp,null,ev);
    }
});
Xjs.apply(Xjs.ui.List,{
    /*xjs.ui.List.isSelectOptsEQ*/
    isSelectOptsEQ:function(a1,a2)
    {
        return Array.equals(a1,a2);
    }
});
{
    Xjs.UITYPES.list = Xjs.ui.List;
}/*xjs/ui/MenuPane.java*/
Xjs.ui.MenuPane=function(config){
    Xjs.ui.MenuPane.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.MenuPane,Xjs.ui.Menu,{
  _js$className_:"Xjs.ui.MenuPane",
    /*xjs.ui.MenuPane._createDOM*/
    _createDOM:function(root)
    {
        var dom = Xjs.ui.MenuPane.superclass._createDom0.call(this,root,"span");
        if(!dom.parentNode)
            dom.className = "ui-iconbar";
        this._createNodesDOM(dom);
        return dom;
    },
    /*xjs.ui.MenuPane._createNodesDOM*/
    _createNodesDOM:function(dom)
    {
        var _iconMouseOver,
            _iconMouseOut,
            _iconMouseDown,
            _iconMouseClick;
        for(var i=0;i < this.nodes.length;i++)
        {
            var n = this.nodes[i];
            n.pMenu = this;
            if(n.dom)
            {
                if(n.dom.parentNode == dom)
                    continue;
                n.dom.parentNode.removeChild(n.dom);
            }
            var nodeDom = n.dom = Xjs.DOM.createChild(dom,"span",n.className || "ui-iconbtn");
            nodeDom._$node = n;
            var ns = nodeDom.style;
            Xjs.ui.Menu._updateBgIcon(n,nodeDom,0);
            this._updateBtnState(n,0);
            var s = n.sdom = Xjs.DOM.createChild(nodeDom,"span");
            if(n.content)
            {
                s.innerHTML = n.content;
            } else if(n.text)
            {
                Xjs.DOM.setTextContent(s,n.text);
            }
            if(n.mouseHandle !== false)
            {
                _iconMouseOver = Function.bindAsEventListener(this._iconMouseOver,this);
                _iconMouseOut = Function.bindAsEventListener(this._iconMouseOut,this);
                _iconMouseDown = Function.bindAsEventListener(this._iconMouseDown,this);
                _iconMouseClick = Function.bindAsEventListener(this._iconMouseClick,this);
                nodeDom.onmouseover = _iconMouseOver;
                nodeDom.onmouseout = _iconMouseOut;
                nodeDom.onmousedown = _iconMouseDown;
                nodeDom.onclick = _iconMouseClick;
            }
            if(n.visible === false)
            {
                n.$styleDisplay = ns.display;
                ns.display = "none";
            }
        }
    },
    /*xjs.ui.MenuPane.removeNode*/
    removeNode:function(n)
    {
        if(this.nodes)
            for(var i=this.nodes.length - 1;i >= 0;i--)
            {
                if(this.nodes[i] == n)
                {
                    this.nodes.splice(i,1);
                    Xjs.DOM.remove(n.dom);
                    n.dom = null;
                    return true;
                }
            }
        return false;
    },
    /*xjs.ui.MenuPane.setCommandEnabled*/
    setCommandEnabled:function(command,enabled)
    {
        Xjs.ui.Menu.setNodeEnabled(Xjs.ui.Menu.getNodeByCommand(this.nodes,command),enabled);
    },
    /*xjs.ui.MenuPane.getNodeByCommand*/
    getNodeByCommand:function(command)
    {
        return Xjs.ui.Menu.getNodeByCommand(this.nodes,command);
    },
    /*xjs.ui.MenuPane.isCommandEnabled*/
    isCommandEnabled:function(command)
    {
        var n = Xjs.ui.Menu.getNodeByCommand(this.nodes,command);
        return n != null && !n.disabled && !this.disabled;
    },
    /*xjs.ui.MenuPane.isCommandChecked*/
    isCommandChecked:function(command)
    {
        var n = Xjs.ui.Menu.getNodeByCommand(this.nodes,command);
        return n != null && n.checked;
    },
    /*xjs.ui.MenuPane.setCommandChecked*/
    setCommandChecked:function(command,checked)
    {
        this.setMenuNodeChecked(Xjs.ui.Menu.getNodeByCommand(this.nodes,command),checked);
    },
    /*xjs.ui.MenuPane.setCommandVisible*/
    setCommandVisible:function(command,visible,opts)
    {
        var n;
        if(n = Xjs.ui.Menu.getNodeByCommand(this.nodes,command))
        {
            Xjs.ui.Menu.setNodeVisible(n,visible);
        }
        if(opts & 1 && n)
        {
            Xjs.ui.Menu.setNodeVisibleByChild(n.parent);
        }
    },
    /*xjs.ui.MenuPane.setMenuNodeChecked*/
    setMenuNodeChecked:function(n,checked)
    {
        if(n)
        {
            n.checked = checked;
            this._updateBtnState(n,0);
        }
    },
    /*xjs.ui.MenuPane.toogleMenuNodeChecked*/
    toogleMenuNodeChecked:function(n)
    {
        if(n)
        {
            n.checked = !n.checked;
            this._updateBtnState(n,0);
        }
    },
    /*xjs.ui.MenuPane.setEnabled*/
    setEnabled:function(enable)
    {
        if(!!this.disabled != !enable)
        {
            Xjs.ui.MenuPane.superclass.setEnabled.call(this,enable);
            if(this.nodes != null)
                for(var i=0;i < this.nodes.length;i++)
                {
                    Xjs.ui.Menu._updateBgIcon(this.nodes[i],null,0);
                }
        }
    },
    /*xjs.ui.MenuPane._updateBtnState*/
    _updateBtnState:function(node,state)
    {
        if(!node)
            return;
        if(node.checked)
            state = 2;
        if(node.className)
        {
            var d = node.dom;
            if(d != null)
            {
                if(state == 2)
                {
                    Xjs.DOM.addClass(d,"checked");
                } else 
                {
                    Xjs.DOM.removeClass(d,"checked");
                }
            }
            return;
        }
    },
    /*xjs.ui.MenuPane._iconMouseOver*/
    _iconMouseOver:function(e)
    {
        var n = Xjs.ui.Menu._getNodeByDOM(e.srcElement || e.target);
        if(n)
        {
            this._updateBtnState(n,1);
            if((this.popupOnMouseOver || n.popupOnMouseOver || this.activePopupNode && this.activePopupNode != n && this.activePopupNode.popupMenu.isInShowing()) && !n.disabled && !this.disabled && n.nodes != null)
            {
                this.showPopupMenu(n);
            }
            if(n.tipText != null && (this.activePopupNode == null || !this.activePopupNode.popupMenu.isInShowing()))
                this.showTipText(n.tipText,{dom:n.dom});
        }
    },
    /*xjs.ui.MenuPane._iconMouseOut*/
    _iconMouseOut:function(e)
    {
        var n = Xjs.ui.Menu._getNodeByDOM(e.srcElement || e.target);
        if(!Xjs.Event.isCmdKey(e) || !window._debug_)
            this.showTipText();
        this._updateBtnState(n,0);
    },
    /*xjs.ui.MenuPane._iconMouseDown*/
    _iconMouseDown:function(e)
    {
        var n = Xjs.ui.Menu._getNodeByDOM(e.srcElement || e.target);
        if(!n.disabled)
            this._updateBtnState(n,2);
    },
    /*xjs.ui.MenuPane._iconMouseClick*/
    _iconMouseClick:function(e)
    {
        var n = Xjs.ui.Menu._getNodeByDOM(e.srcElement || e.target);
        this.showTipText();
        if(n != null)
        {
            this._updateBtnState(n,1);
            if(!n.disabled && !this.disabled)
            {
                if(n.command != null)
                {
                    this.fireEventE("performCommand",n.command,n);
                }
                if(n.nodes)
                {
                    this.showPopupMenu(n);
                }
            }
        }
    },
    /*xjs.ui.MenuPane.hidePopupMenu*/
    hidePopupMenu:function()
    {
        if(this.activePopupNode)
        {
            if(this.activePopupNode.popupMenu)
                this.activePopupNode.popupMenu.hide();
            delete this.activePopupNode;
        }
    },
    /*xjs.ui.MenuPane.showPopupMenu*/
    showPopupMenu:function(node)
    {
        if(this.activePopupNode != node)
        {
            this.hidePopupMenu();
        }
        if(node.nodes != null)
        {
            var menuPane = this;
            setTimeout(function(){
            var pm = Xjs.ui.PopupMenu.showPopupMenu(menuPane,node,3);
            pm.parentMenu = menuPane;
            menuPane.activePopupNode = node;
        },10);
        }
    },
    /*xjs.ui.MenuPane.getAttachBtnClickDelegate*/
    getAttachBtnClickDelegate:function(n)
    {
        return this._showPopupOnAttachBtnClick.createDelegate(this,[n],true);
    },
    /*xjs.ui.MenuPane._showPopupOnAttachBtnClick*/
    _showPopupOnAttachBtnClick:function(e,n)
    {
        n.dom = n.attachedDom;
        this.showPopupMenu(n);
    }
});
Xjs.apply(Xjs.ui.MenuPane,{
    /*xjs.ui.MenuPane.setAttachedDomVisible*/
    setAttachedDomVisible:function(n)
    {
        if(n.attachedDom && n.visible !== undefined)
        {
            var ns = n.attachedDom.style;
            ns.display = n.visible ? "" : "none";
        }
    },
    /*xjs.ui.MenuPane.setAttachedDomText*/
    setAttachedDomText:function(n)
    {
        if(n.attachedDom && n.text !== undefined)
        {
            var e = Xjs.DOM.findById("btn_text",n.attachedDom);
            if(e)
                Xjs.DOM.setTextContent(e,n.text);
        }
    },
    /*xjs.ui.MenuPane.createToolbtnPane2*/
    createToolbtnPane2:function(cmds,tips,nodeClassName,cmdClsPrefix,liClassName,liCmdClsPrefix)
    {
        var nodes = [],
            p = new Xjs.ui.MenuPane({nodes:nodes});
        for(var i=0;i < cmds.length;i++)
        {
            var cmdPath = cmds[i].split("|"),
                cfgPath = new Array(cmdPath.length);
            for(var j=0;j < cmdPath.length;j++)
            {
                var cmd = cmdPath[j],
                    text = null,
                    q = cmd.indexOf(':');
                if(q >= 0)
                {
                    text = cmd.substring(q + 1);
                    cmd = cmdPath[j] = cmd.substring(0,q);
                }
                cfgPath[j] = {tipText:tips[i],text:text,className:j == 0 ? nodeClassName + " " + cmdClsPrefix + cmd : liClassName + " " + liCmdClsPrefix + cmd};
            }
            Xjs.ui.Menu.addChildNode(p,cmdPath,null,cfgPath);
        }
        return p;
    }
});
/*xjs/ui/MenuPaneNode.java*/
Xjs.ui.MenuPaneNode=function(menu,node){
    this.menu = menu;
    this.node = node;
};
Xjs.apply(Xjs.ui.MenuPaneNode.prototype,{
    /*xjs.ui.MenuPaneNode.setEnabled*/
    setEnabled:function(b)
    {
        Xjs.ui.Menu.setNodeEnabled(this.node,b);
    },
    /*xjs.ui.MenuPaneNode.setText*/
    setText:function(text,textType)
    {
        delete this.node.content;
        if(textType == 1)
            this.node.tipText = text;
        else 
        {
            this.node.text = text;
            if(this.node.dom != null)
                Xjs.DOM.setTextContent(this.node.dom,text);
        }
    }
});
/*xjs/ui/MessagePane.java*/
Xjs.ui.MessagePane=function(config){
    Xjs.ui.MessagePane.superclass.constructor.call(this,config);
    this.addPopupMenu("clear","清除...");
};
Xjs.extend(Xjs.ui.MessagePane,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.MessagePane",
    className:"ui-msgpane",
    domTag:"div",
    autoScroll:true,
    /*xjs.ui.MessagePane.addMessage*/
    addMessage:function(text,cls,opts)
    {
        if(this.dom && text != null)
        {
            if(typeof(text) != "string")
                text = text.toString();
            var a = text.split("\n");
            for(var i=0;i < a.length;i++)
            {
                var s = Xjs.HtmlUTIL.fillPrefixBlank(a[i]),
                    tn = document.createTextNode(s);
                if(cls)
                {
                    var e = Xjs.DOM.createChild(this.dom,"span",cls);
                    e.appendChild(tn);
                } else 
                {
                    this.dom.appendChild(tn);
                }
                if(!(opts & 1))
                {
                    var br = this.dom.appendChild(document.createElement("br"));
                    if(cls && opts & 2)
                        br.className = cls;
                }
            }
            if(this.autoScroll)
                this.dom.scrollTop = this.dom.scrollHeight;
        }
    },
    /*xjs.ui.MessagePane.addHTML*/
    addHTML:function(html)
    {
        if(this.dom && html)
        {
            Xjs.DOM.createChild(this.dom,"span").innerHTML = html;
            Xjs.DOM.createChild(this.dom,"br");
        }
    },
    /*xjs.ui.MessagePane.addAnchor*/
    addAnchor:function(href,title,target)
    {
        if(this.dom)
        {
            var a = Xjs.DOM.createChild(this.dom,"a");
            a.href = href;
            Xjs.DOM.setTextContent(a,title);
            a.target = target || "_blank";
            Xjs.DOM.createChild(this.dom,"br");
        }
    },
    /*xjs.ui.MessagePane.addDOM*/
    addDOM:function(d,opts)
    {
        if(this.dom && d)
        {
            this.dom.appendChild(d);
            if(!(opts & 1))
                Xjs.DOM.createChild(this.dom,"br");
        }
    },
    /*xjs.ui.MessagePane.clear*/
    clear:function()
    {
        if(this.dom)
            for(;this.dom.hasChildNodes();)
            {
                this.dom.removeChild(this.dom.lastChild);
            }
    },
    /*xjs.ui.MessagePane.oncmd_clear*/
    oncmd_clear:function()
    {
        this.clear();
    }
});
/*xjs/ui/MutiDateAidInputer.java*/
Xjs.ui.MutiDateAidInputer=Xjs.extend(Xjs.ui.DateAidInputer,{
  _js$className_:"Xjs.ui.MutiDateAidInputer",
    /*xjs.ui.MutiDateAidInputer.setInitValue*/
    setInitValue:function(date)
    {
        if(typeof(date) == "string")
        {
            this.initValue = date;
        } else 
        {
            var newDate = Date.getServerTime();
            this.initValue = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
        }
    },
    /*xjs.ui.MutiDateAidInputer.initDate*/
    initDate:function(parent)
    {
        if(parent.maxYear)
        {
            this.updateYearSelect(parent.minYear,parent.maxYear);
        } else 
        {
            var minY = this.minYear === undefined ? -20 : this.minYear,
                maxY = this.maxYear === undefined ? 20 : this.maxYear;
            this.updateYearSelect(minY,maxY);
        }
        var selectDate = this.initValue;
        this.initSelectDate(selectDate);
    },
    /*xjs.ui.MutiDateAidInputer.initSelectDate*/
    initSelectDate:function(selectDate)
    {
        if(selectDate)
        {
            var dates = selectDate.split(this.getMutiValueDelim());
            for(var i=0;i < dates.length;i++)
            {
                var iDate = Date.parseDate(dates[i]);
                this.setDate(iDate.getFullYear(),iDate.getMonth() + 1,iDate.getDate());
                this.setTime(iDate.getHours(),iDate.getMinutes(),iDate.getSeconds());
            }
        }
    },
    /*xjs.ui.MutiDateAidInputer.onNavYearMonProcess*/
    onNavYearMonProcess:function(e)
    {
        switch(e.id)
        {
        case "NAVYEARPREV":
            if(this.minYear && this.year <= this.curYear + this.minYear)
                break;
            this.initNavDate(this.year - 1,this.month,this.day);
            break;
        case "NAVYEARNEXT":
            if(this.maxYear && this.year >= this.curYear + this.maxYear)
                break;
            this.initNavDate(this.year + 1,this.month,this.day);
            break;
        case "NAVMONPREV":
            {
                var y = this.year,
                    m = this.month - 1;
                if(m <= 0)
                {
                    y--;
                    m = 12;
                    if(this.minYear && y < this.curYear + this.minYear)
                        break;
                }
                this.initNavDate(y,m,this.day);
            }
            break;
        case "NAVMONTNEXT":
            {
                var y = this.year,
                    m = this.month + 1;
                if(m > 12)
                {
                    y++;
                    m = 1;
                    if(this.maxYear && y > this.curYear + this.maxYear)
                        break;
                }
                this.initNavDate(y,m,this.day);
            }
            break;
        }
        {
            var selectDate = this.getParentValue();
            if(selectDate)
            {
                var dates = selectDate.split(this.getMutiValueDelim());
                for(var i=0;i < dates.length;i++)
                {
                    var iDate = Date.parseDate(dates[i]);
                    this.setFocusedDate(iDate.getFullYear(),iDate.getMonth() + 1,iDate.getDate(),true);
                }
            }
        }
    },
    /*xjs.ui.MutiDateAidInputer.initNavDate*/
    initNavDate:function(year,month,day)
    {
        if(typeof(year) == "string")
            year = parseInt(year);
        if(typeof(month) == "string")
            month = parseInt(month);
        if(typeof(day) == "string")
            day = parseInt(day);
        if(this.year == year && this.month == month && this.day == day)
            return;
        if(this.year != year || this.month != month)
        {
            var date1 = new Date(year,month - 1,1),
                d = -(this._wday0 = date1.getDay()),
                mdays = this._mdays = Date.getDaysOfMonth(year,month),
                pyear = month == 1 ? year - 1 : year,
                pmonth = month == 1 ? 12 : month - 1,
                pmdays = Date.getDaysOfMonth(pyear,pmonth),
                nyear = month == 12 ? year + 1 : year,
                nmonth = month == 12 ? 1 : month + 1;
            for(var r=1;r <= 6;r++)
            {
                var row = this.tableDOM.rows[r];
                for(var j=0;j < 7;j++)
                {
                    d++;
                    var cell = row.cells[j];
                    cell._day = d;
                    var _ymd;
                    if(d <= 0)
                    {
                        _ymd = [pyear,pmonth,pmdays + d];
                        cell.className = j == 0 || j == 6 ? "xhday" : "xday";
                    } else if(d > mdays)
                    {
                        _ymd = [nyear,nmonth,d - mdays];
                        cell.className = j == 0 || j == 6 ? "xhday" : "xday";
                    } else 
                    {
                        _ymd = [year,month,d];
                        cell.className = j == 0 || j == 6 ? "hday" : "day";
                    }
                    cell._ymd = _ymd;
                    if(this.checkDateValid && !this.checkDateValid.call(_ymd))
                    {
                        cell.className += " disabled";
                    }
                    cell.innerHTML = "" + _ymd[2];
                    if(this.curDay == d && month == this.curMonth && year == this.curYear)
                    {
                    }
                }
            }
            this.yearAI.setValue(this.year = year);
            this.monthAI.setValue(this.month = month);
            this.focusedYear = year;
            this.focusedMonth = month;
            this.day = 0;
            delete this._flagSelectedDay;
            delete this.focusedDay;
        }
        if(day > this._mdays)
        {
            day = this._mdays;
        }
        if(day != this.day)
        {
            this.day = day;
        }
        this.enableOkBtn();
    },
    /*xjs.ui.MutiDateAidInputer.setDate*/
    setDate:function(year,month,day)
    {
        if(typeof(year) == "string")
            year = parseInt(year);
        if(typeof(month) == "string")
            month = parseInt(month);
        if(typeof(day) == "string")
            day = parseInt(day);
        if(this.year == year && this.month == month && this.day == day)
            return;
        if(this.year != year || this.month != month)
        {
            var date1 = new Date(year,month - 1,1),
                d = -(this._wday0 = date1.getDay()),
                mdays = this._mdays = Date.getDaysOfMonth(year,month),
                pyear = month == 1 ? year - 1 : year,
                pmonth = month == 1 ? 12 : month - 1,
                pmdays = Date.getDaysOfMonth(pyear,pmonth),
                nyear = month == 12 ? year + 1 : year,
                nmonth = month == 12 ? 1 : month + 1;
            for(var r=1;r <= 6;r++)
            {
                var row = this.tableDOM.rows[r];
                for(var j=0;j < 7;j++)
                {
                    d++;
                    var cell = row.cells[j];
                    cell._day = d;
                    var _ymd;
                    if(d <= 0)
                    {
                        _ymd = [pyear,pmonth,pmdays + d];
                        cell.className = j == 0 || j == 6 ? "xhday" : "xday";
                    } else if(d > mdays)
                    {
                        _ymd = [nyear,nmonth,d - mdays];
                        cell.className = j == 0 || j == 6 ? "xhday" : "xday";
                    } else 
                    {
                        _ymd = [year,month,d];
                        cell.className = j == 0 || j == 6 ? "hday" : "day";
                    }
                    cell._ymd = _ymd;
                    if(this.checkDateValid && !this.checkDateValid.call(_ymd))
                    {
                        cell.className += " disabled";
                    }
                    cell.innerHTML = "" + _ymd[2];
                    if(this.curDay == d && month == this.curMonth && year == this.curYear)
                    {
                    }
                }
            }
            this.yearAI.setValue(this.year = year);
            this.monthAI.setValue(this.month = month);
            this.focusedYear = year;
            this.focusedMonth = month;
            this.day = 0;
            delete this._flagSelectedDay;
            delete this.focusedDay;
        }
        if(day > this._mdays)
        {
            day = this._mdays;
        }
        if(day != this.day)
        {
            this.day = day;
        }
        if(this.flagSelectedDay !== false)
        {
        }
        this.setFocusedDate(year,month,day,true);
        this.enableOkBtn();
    },
    /*xjs.ui.MutiDateAidInputer.setSelectedDay*/
    setSelectedDay:function(day)
    {
        var cell = this._getDayCell(day);
        if(cell)
        {
            Xjs.DOM.addClass(cell,"selectedday");
        }
    },
    /*xjs.ui.MutiDateAidInputer._onDayClick*/
    _onDayClick:function(e)
    {
        var ymd = this._getMouseAtYMD(e);
        if(!ymd)
            return;
        var y = this.yearAI.getValue(),
            m = this.monthAI.getValue();
        this.setFocusedDay(Xjs.ui.DateAidInputer.toYMDay(y,m,ymd[0],ymd[1],ymd[2]));
        this.enableOkBtn();
        if(this.selectOnDayClick)
        {
            this.selectYMD(ymd);
        }
    },
    /*xjs.ui.MutiDateAidInputer.setFocusedDay*/
    setFocusedDay:Xjs.emptyFn,
    /*xjs.ui.MutiDateAidInputer.selectYMD*/
    selectYMD:function(ymd)
    {
        if(ymd)
            try
            {
                var val = ymd[0] + "-" + Xjs.ui.DateAidInputer.toStr2(ymd[1]) + "-" + Xjs.ui.DateAidInputer.toStr2(ymd[2]),
                    hms = this.getHMS();
                if(this.hourDOM)
                    val += " " + Xjs.ui.DateAidInputer.toStr2(hms[0]);
                if(this.minDOM)
                    val += ":" + Xjs.ui.DateAidInputer.toStr2(hms[1]);
                if(this.secDOM)
                    val += ":" + Xjs.ui.DateAidInputer.toStr2(hms[2]);
                if(this.checkDateValid && !this.checkDateValid.call(ymd,hms))
                {
                    return;
                }
                if(this.date2Input)
                {
                    this.date2Input.selectYMD(this,val);
                    return;
                }
                this.setParentValue(val);
                if(!this.isMultiSelectable())
                {
                    this.hideAndFocusParent();
                }
            }catch(ex)
            {
                Xjs.alertErr(ex);
            }
    },
    /*xjs.ui.MutiDateAidInputer.isMultiSelectable*/
    isMultiSelectable:Xjs.trueFn,
    /*xjs.ui.MutiDateAidInputer.setParentValue*/
    setParentValue:function(value)
    {
        this.fireEvent("valueSelected",value);
        if(this.parent && this.parent . setValue)
        {
            this.parent.focus();
            var srcValue = this.parent.getValue(),
                focused = true,
                setValue = value;
            if(srcValue)
            {
                var _value = value,
                    values = null,
                    isStrIn = String.isStrIn(srcValue,_value,this.getMutiValueDelim());
                focused = !isStrIn;
                if(isStrIn)
                {
                    var _values = srcValue.split(this.getMutiValueDelim());
                    values = new Array(_values.length - 1);
                    for(var i=0,j=0;j < values.length && i < _values.length;i++)
                    {
                        if(_value === _values[i])
                        {
                            continue;
                        }
                        values[j++] = _values[i];
                    }
                    values.sort();
                    setValue = values.join(this.getMutiValueDelim());
                } else 
                {
                    setValue = srcValue + this.getMutiValueDelim() + value;
                    values = setValue.split(this.getMutiValueDelim());
                    values.sort();
                    setValue = values.join(this.getMutiValueDelim());
                }
            }
            this.parent.setValue(setValue,undefined,4);
            {
                var selectDate = Date.parseDate(value);
                this.setFocusedDate(selectDate.getFullYear(),selectDate.getMonth() + 1,selectDate.getDate(),focused);
            }
        }
    },
    /*xjs.ui.MutiDateAidInputer.setFocusedDate*/
    setFocusedDate:function(year,month,day,focused)
    {
        if(this.getParentValue() == null && focused != false)
        {
            return;
        }
        if(this.focusedYear === year && this.focusedMonth === month)
        {
            var cell = this._getDayCell(day);
            if(cell)
            {
                if(focused)
                {
                    Xjs.DOM.addClass(cell,"focusedday");
                } else 
                {
                    Xjs.DOM.removeClass(cell,"focusedday");
                }
            }
        }
    },
    /*xjs.ui.MutiDateAidInputer.getParentValue*/
    getParentValue:function()
    {
        if(this.parent && this.parent . getValue)
        {
            return this.parent.getValue();
        }
        return null;
    },
    /*xjs.ui.MutiDateAidInputer.getMutiValueDelim*/
    getMutiValueDelim:function()
    {
        var mutiValueDelim = (this.parent).mutiValueDelim;
        return mutiValueDelim ? mutiValueDelim : ",";
    }
});
/*xjs/ui/PageBody.java*/
Xjs.ui.PageBody=function(cfg){
    Xjs.ui.PageBody.superclass.constructor.call(this,cfg);
};
Xjs.extend(Xjs.ui.PageBody,Xjs.ui.Container,{
  _js$className_:"Xjs.ui.PageBody"
});
/*xjs/ui/PopupMenu.java*/
Xjs.ui.PopupMenu=function(config){
    Xjs.ui.PopupMenu.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.PopupMenu,Xjs.ui.Layer,{
  _js$className_:"Xjs.ui.PopupMenu",
    hideIfOutclick:true,
    /*xjs.ui.PopupMenu.addMenuNode*/
    addMenuNode:function(command,text,node)
    {
        node = Xjs.apply({},node);
        if(command != null)
            node.command = command;
        if(text != null)
            node.text = text;
        var cmdPath = (node.command || "").split("|"),
            p = this;
        node.command = cmdPath[cmdPath.length - 1];
        for(var i=0;i < cmdPath.length;i++)
        {
            var cmd = cmdPath[i];
            if(cmd.length == 0)
                cmd = null;
            if(!p.nodes)
                p.nodes = [];
            var n = p.nodes.length,
                j;
            if(cmd != null)
            {
                for(j = 0;j < n;j++)
                {
                    if(p.nodes[j].command == cmd)
                        break;
                }
            } else 
            {
                j = n;
            }
            if(j >= n)
            {
                p.nodes.push(node.command == "-" ? "-" : node);
            } else if(i == cmdPath.length - 1)
            {
                Xjs.apply(p.nodes[j],node);
            }
            p = p.nodes[j];
        }
    },
    /*xjs.ui.PopupMenu.getMenuNode*/
    getMenuNode:function(command)
    {
        return this.getMenuNodeByCommand(this.nodes,command);
    },
    /*xjs.ui.PopupMenu.getMenuNodeByCommand*/
    getMenuNodeByCommand:function(nodes,command)
    {
        if(nodes != null && nodes.length > 0)
        {
            for(var i=0;i < nodes.length;i++)
            {
                if(nodes[i].command == command)
                {
                    return nodes[i];
                }
                var node = this.getMenuNodeByCommand(nodes[i].nodes,command);
                if(node != null)
                {
                    return node;
                }
            }
        }
        return null;
    },
    /*xjs.ui.PopupMenu._createDOM*/
    _createDOM:function()
    {
        if(this.dom)
            return;
        var dom = document.createElement("div");
        dom.className = "x-menu";
        var domList = Xjs.DOM.createChild(dom,"div","x-menu-list");
        if(this.nodes)
        {
            var _onMouseOver = Function.bindAsEventListener(this._onMouseOver,this),
                _onMouseOut = Function.bindAsEventListener(this._onMouseOut,this),
                _onMouseClick = Function.bindAsEventListener(this._onMouseClick,this);
            for(var i=0;i < this.nodes.length;i++)
            {
                var n = this.nodes[i],
                    text = n.content || n.text,
                    liDOM = n.dom = Xjs.DOM.createChild(domList,"div","x-menu-item-unactive");
                if(n.visible === false)
                    liDOM.style.display = "none";
                if(text == "-" || n == "-")
                {
                    liDOM.className = "x-menu-sep-item";
                    continue;
                }
                liDOM._$node = n;
                var liDOM2 = Xjs.DOM.createChild(liDOM,"div");
                if(n.nodes != null)
                {
                    liDOM2.className = "x-menu-item-arrow";
                }
                var itemTextDOM = n._textDOM = Xjs.DOM.createChild(liDOM2,"span","x-menu-list-item" + (n.className ? " " + n.className : ""));
                itemTextDOM.innerHTML = text;
                liDOM.onmouseover = _onMouseOver;
                liDOM.onmouseout = _onMouseOut;
                liDOM.onclick = _onMouseClick;
                Xjs.ui.Menu._updateBgIcon(n,itemTextDOM);
            }
        }
        this.attachDOM(dom);
    },
    /*xjs.ui.PopupMenu.setCommandEnabled*/
    setCommandEnabled:function(command,enabled)
    {
        Xjs.ui.Menu.setNodeEnabled(Xjs.ui.Menu.getNodeByCommand(this.nodes,command),enabled);
    },
    /*xjs.ui.PopupMenu.hide*/
    hide:function()
    {
        this.hidePopupMenu();
        Xjs.ui.PopupMenu.superclass.hide.call(this);
        if(this.focusCompOnHide)
            this.focusCompOnHide.focus();
        if(this.parentNode)
        {
            if(this._$activeNode)
                this._$activeNode.dom.className = "x-menu-item-unactive";
            delete this.parentNode.activePopupNode;
        }
    },
    /*xjs.ui.PopupMenu.hidePopupMenu*/
    hidePopupMenu:function()
    {
        if(this.activePopupNode)
        {
            if(this.activePopupNode.popupMenu)
                this.activePopupNode.popupMenu.hide();
            delete this.activePopupNode;
        }
    },
    /*xjs.ui.PopupMenu._onMouseOver*/
    _onMouseOver:function(e)
    {
        var n = Xjs.ui.Menu._getNodeByDOM(e.srcElement || e.target);
        if(n && !n.disabled)
        {
            n.dom.className = "x-menu-item-active";
            if(this._$activeNode != null && n != this._$activeNode)
                this._$activeNode.dom.className = "x-menu-item-unactive";
            this._$activeNode = n;
            if(n != this.activePopupNode || !n.popupMenu.isInShowing())
            {
                if(n != this.activePopupNode)
                    this.hidePopupMenu();
                if(n.nodes && !n.disabled)
                {
                    this.showPopupMenu(n);
                }
            }
        }
    },
    /*xjs.ui.PopupMenu._onMouseOut*/
    _onMouseOut:function(e)
    {
        var n = Xjs.ui.Menu._getNodeByDOM(e.srcElement || e.target);
        if(n && (n.popupMenu == null || !n.popupMenu.isInShowing()))
        {
            n.dom.className = "x-menu-item-unactive";
            if(this._$activeNode == n)
                delete this._$activeNode;
        }
    },
    /*xjs.ui.PopupMenu._updateCommandEnabled*/
    _updateCommandEnabled:function()
    {
        for(var i=0;i < this.nodes.length;i++)
        {
            var node = this.nodes[i];
            if(!node.command)
                continue;
            var enabled = undefined,
                pm = this;
            for(;pm != null;pm = pm.parentMenu)
            {
                var nl = pm.listeners != null ? pm.listeners.length : 0;
                for(var j=0;j < nl;j++)
                {
                    if(pm.listeners[j] . isCommandEnabled)
                    {
                        var e = pm.listeners[j].isCommandEnabled(node.command);
                        if(e === true)
                        {
                            if(e !== false)
                                enabled = true;
                        } else if(e === false)
                        {
                            enabled = false;
                        }
                    }
                }
            }
            if(enabled !== undefined)
                Xjs.ui.Menu.setNodeEnabled(node,enabled);
        }
    },
    /*xjs.ui.PopupMenu._onMouseClick*/
    _onMouseClick:function(e)
    {
        var n = Xjs.ui.Menu._getNodeByDOM(e.srcElement || e.target);
        if(n && !n.disabled)
        {
            if(n.checkMode)
            {
                n.checked = !n.checked;
                Xjs.ui.Menu.updateNodeCheckIcon(n);
            }
            if(n.hideParentPopupOnClick !== false)
            {
                if(this.menuPane && n.command)
                {
                    this.menuPane.hidePopupMenu();
                }
                this.hide();
                if(this.parentMenu instanceof Xjs.ui.PopupMenu && n.command)
                {
                    this.parentMenu.hide();
                }
            }
            if(n.command)
            {
                var pm = this;
                for(;pm;pm = pm.parentMenu)
                {
                    pm.fireEventE("performCommand",n.command,n);
                }
            }
        }
    },
    /*xjs.ui.PopupMenu.showPopupMenu*/
    showPopupMenu:function(node)
    {
        if(this.activePopupNode != node)
        {
            this.hidePopupMenu();
        }
        if(node.nodes)
        {
            var menuPane = this.menuPane,
                _this = this;
            setTimeout(function(){
            var pm = Xjs.ui.PopupMenu.showPopupMenu(menuPane,node,2);
            pm.parentMenu = _this;
            _this.activePopupNode = node;
        },10);
        }
    },
    /*xjs.ui.PopupMenu.showAtXY*/
    showAtXY:function(x,y)
    {
        this.alignShow(null,[x,y]);
    },
    /*xjs.ui.PopupMenu.prepareShowing*/
    prepareShowing:function()
    {
        this.hidePopupMenu();
        this._createDOM();
        this._updateCommandEnabled();
    }
});
Xjs.apply(Xjs.ui.PopupMenu,{
    /*xjs.ui.PopupMenu.showPopupMenu*/
    showPopupMenu:function(menuPane,parentNode,position)
    {
        if(!parentNode.nodes)
            return null;
        var pm = parentNode.popupMenu;
        if(!pm)
        {
            pm = parentNode.popupMenu = new Xjs.ui.PopupMenu({parentNode:parentNode,nodes:parentNode.nodes,menuPane:menuPane});
            pm._createDOM();
        }
        if(parentNode.dom && pm.dom)
        {
            var w = Xjs.DOM.getWidth(parentNode.dom);
            if(w > 0)
            {
                pm.dom.style.minWidth = w + "px";
            }
        }
        pm._updateCommandEnabled();
        pm.alignShow(parentNode,position);
        return parentNode.popupMenu;
    }
});
/*xjs/ui/ProgressBar.java*/
Xjs.ui.ProgressBar=function(config){
    Xjs.ui.ProgressBar.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.ProgressBar,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.ProgressBar",
    value:0,
    maxValue:100,
    /*xjs.ui.ProgressBar._createDOM*/
    _createDOM:function(root)
    {
        var out = document.createElement("div");
        out.className = "ui-progbar-out";
        var d = Xjs.DOM.createChild(out,"div","ui-progbar");
        this.sliderDOM = Xjs.DOM.createChild(d,"div","ui-progbar-slider");
        this.percentTextDOM = Xjs.DOM.createChild(d,"div","ui-progbar-text");
        this.sliderDOM.style.width = "0px";
        return out;
    },
    /*xjs.ui.ProgressBar.onAttachDOM*/
    onAttachDOM:function()
    {
        this.sliderDOM = Xjs.DOM.findById("ProgSlider",this.dom);
        if(!this.sliderDOM)
            this.sliderDOM = Xjs.DOM.find(".ui-progbar-slider",this.dom);
        this.percentTextDOM = Xjs.DOM.findById("ProgText",this.dom);
        if(!this.percentTextDOM)
            this.percentTextDOM = Xjs.DOM.find(".ui-progbar-text",this.dom);
        this.promptTextDOM = Xjs.DOM.findById("PromptText",this.dom);
        if(!this.promptTextDOM)
            this.promptTextDOM = Xjs.DOM.find(".ui-progbar-prompt",this.dom);
    },
    /*xjs.ui.ProgressBar.setProgress*/
    setProgress:function(infoText,value,maxValue)
    {
        if(this.dom != null)
        {
            var text,
                percent;
            if(typeof(value) != "number")
                value = this.value;
            if(typeof(maxValue) != "number")
                maxValue = this.maxValue;
            percent = maxValue <= 0 ? 0 : Number.toInt(value * 100 / maxValue);
            if(percent > 100)
                percent = 100;
            else if(percent < 0)
                percent = 0;
            if(this.promptTextDOM)
            {
                Xjs.DOM.setTextContent(this.promptTextDOM,infoText || "");
                infoText = null;
            }
            text = infoText ? infoText + "(" + percent + "%)" : percent + "%";
            this.value = value;
            this.maxValue = maxValue;
            this.percentTextDOM.innerHTML = text;
            this.sliderDOM.style.width = percent + "%";
        }
    }
});
/*xjs/ui/ProgressPane.java*/
Xjs.ui.ProgressPane=function(config){
    Xjs.ui.ProgressPane.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.ProgressPane,Xjs.ui.DialogPane,{
  _js$className_:"Xjs.ui.ProgressPane",
    barCount:1,
    autoScroll:true,
    runLock:0,
    /*xjs.ui.ProgressPane.__init*/
    __init:function()
    {
        Xjs.ui.ProgressPane.superclass.__init.call(this);
        this.frame = true;
        this.collapsible = true;
        this.className = "ui-progpane";
    },
    /*xjs.ui.ProgressPane._createDOM*/
    _createDOM:function(root)
    {
        if(!this.buttons)
            this.buttons = [{text:this.runText || Xjs.ResBundle.getString("UI","Progress.Text"),className:"btn extanim16-0",command:"ok",id:this.id + "_btn_ok",nocloseWindow:true}];
        this.onContentCollapse = this.onResize;
        var dom = Xjs.ui.ProgressPane.superclass._createDOM.call(this,root);
        this.messagePane = new Xjs.ui.MessagePane({id:"msgpane",_rootDOM:dom,autoScroll:this.autoScroll});
        if(this.msgpaneClsName)
            this.messagePane.className = this.msgpaneClsName;
        this.messagePane.getDOM();
        this.barsBox = Xjs.DOM.find("#progressbars",dom);
        if(this.barsBox)
        {
            this.progressBars = [];
            for(var i=0;i < this.barCount;i++)
            {
                var bar = this.progressBars[i] = new Xjs.ui.ProgressBar(null);
                bar.id = "progress_bar" + i;
                var barDOM = Xjs.DOM.find("#progress_bar" + i,dom);
                if(barDOM)
                {
                    bar.attachDOM(barDOM);
                } else 
                {
                    this.barsBox.appendChild(bar.getDOM());
                }
            }
            for(var i=this.barCount;i < 4;i++)
            {
                var barDOM;
                if(barDOM = Xjs.DOM.find("#progress_bar" + i,dom))
                    barDOM.style.display = "none";
            }
        }
        return dom;
    },
    /*xjs.ui.ProgressPane.doOnResize*/
    doOnResize:function()
    {
        if(this.dom.style.height && this.dom.style.height != "auto" && this.messagePane && this.messagePane.dom)
        {
            var h = Xjs.DOM.getHeight(this.dom) - Xjs.DOM.getBorder(this.dom,"tb") - this.messagePane.dom.offsetTop;
            this.messagePane.setHeight(h - 2);
        }
    },
    /*xjs.ui.ProgressPane.setStartEnabled*/
    setStartEnabled:function(enabled)
    {
        var runBtn = this.buttons[0];
        runBtn.setEnabled(enabled);
        runBtn.setClassName("btn extanim16" + (this.runLock <= 0 ? "-0" : "") + (this.cancelable ? " ui-progress-cancelable" : ""));
        this.setToolbarIconEnabled("onClose",enabled);
    },
    /*xjs.ui.ProgressPane.lockStart*/
    lockStart:function(lock)
    {
        if(this.runLock <= 0 && this._htmlCls)
        {
            Xjs.ui.UIUtil.updateHtmlCls(this._htmlCls,true);
            this._htmlCls = null;
        }
        var oldRunlock = this.runLock;
        if(lock)
            this.runLock++;
        else 
            this.runLock--;
        if(this.runLock <= 0 && this._htmlCls)
        {
            Xjs.ui.UIUtil.updateHtmlCls(this._htmlCls,true);
            this._htmlCls = null;
        } else if(this.runLock > 0 && !this._htmlCls)
        {
            this._htmlCls = Xjs.ui.UIUtil.addHtmCls(["ui-in-pregress"]);
        }
        if(oldRunlock == 0 && lock && this.backgroundRun)
        {
            Xjs.ui.ProgressPane.getFixProgress().startProgress();
        }
        this.fireEvent("onLockRunProgress",this.runLock);
        if(this.buttons)
        {
            var runBtn = this.buttons[0];
            this.setStartEnabled(this.runLock <= 0 && this.isAllValid() || this.runLock > 0 && this.cancelable);
            runBtn.setText(this.runLock <= 0 || !this.cancelable ? this.runText || Xjs.ResBundle.getString("UI","Progress.Text") : Xjs.ResBundle.getString("UI","Dlg.Cancel"));
        }
        if(this.runLock == 0)
        {
            if(this.backgroundRun)
            {
                Xjs.ui.ProgressPane.getFixProgress().stopProgress();
            }
            forRetVal:if(this.returnValue)
                {
                    if(this.returnValue instanceof Error)
                    {
                        Xjs.alertErr(this.returnValue);
                        return;
                    }
                    var k = this.fireEventV(0,"forRunProgressValue",this.returnValue);
                    if(k !== undefined)
                    {
                        if(k == null)
                            break forRetVal;
                        this.returnValue = k;
                    }
                    var _jsAction = this.returnValue._jsAction,
                        url;
                    if(_jsAction == "open" && (url = this.returnValue.url))
                    {
                        var target = this.returnValue.target || this.id + "$iframe";
                        window.open(Xjs.toFullURL(url,0),target);
                    }
                    var urls;
                    if(_jsAction == "open" && (urls = this.returnValue.urls))
                    {
                        var target = this.returnValue.target || this.id + "$iframe";
                        for(var i=0;i < urls.length;i++)
                            window.open(Xjs.toFullURL(urls[i],0),target);
                    }
                    if(_jsAction == "viewopen" && (url = this.returnValue.url))
                        this.onViewPrinted(this.returnValue);
                }
            if(this.returnValue !== undefined)
            {
                this.fireEvent("onRunProgress",this.returnValue);
                if(this.closeAfterRun)
                {
                    this.closeModal(null);
                }
            }
            this.saveParamVals("default",2 | 4);
            if(Xjs.onWDocResized)
                Xjs.checkWDocResized();
        }
    },
    /*xjs.ui.ProgressPane.onViewPrinted*/
    onViewPrinted:function(returnValue)
    {
        if(returnValue === undefined)
            returnValue = null;
        var url;
        if(returnValue._jsAction == "viewopen" && (url = returnValue.url))
        {
            var viewurlaf = Xjs.table.util.AbsSelectAttachment.buildOfficeURL(Xjs.toFullURL(url,0),returnValue.title);
            window.open(viewurlaf);
        }
    },
    /*xjs.ui.ProgressPane.setReturnValue*/
    setReturnValue:function(returnValue)
    {
        if(returnValue === undefined)
            returnValue = null;
        this.returnValue = returnValue;
    },
    /*xjs.ui.ProgressPane.setPID*/
    setPID:function(id)
    {
        this.progressID = id;
    },
    /*xjs.ui.ProgressPane.isAllValid*/
    isAllValid:function(ivFields)
    {
        return this.runLock <= 0 && Xjs.ui.ProgressPane.superclass.isAllValid.call(this,ivFields);
    },
    /*xjs.ui.ProgressPane.startProgress*/
    startProgress:function()
    {
        this.lockStart(true);
    },
    /*xjs.ui.ProgressPane.stopProgress*/
    stopProgress:function()
    {
        if(this.runLock > 0)
            this.lockStart(false);
    },
    /*xjs.ui.ProgressPane.setProgress*/
    setProgress:function(k,msgText,value,maxValue)
    {
        if(arguments.length == 1)
        {
            var m = k;
            this.setProgress(m.levl,m.message,m.value,m.maxValue);
            return;
        }
        if(this.backgroundRun)
        {
            Xjs.ui.ProgressPane.getFixProgress().setProgress(k,msgText,value,maxValue);
        }
        if(k >= 1 && k <= 3)
        {
            if(this.progressBars && k - 1 < this.progressBars.length)
            {
                this.progressBars[k - 1].setProgress(msgText,value,maxValue);
            }
        } else if(k == 4)
        {
            if(this.messagePane)
                this.messagePane.addMessage(msgText);
        } else if(k == 6)
        {
            if(this.messagePane)
                this.messagePane.addHTML(msgText);
        } else if(k == -1)
        {
            this.errorText = msgText;
        } else if(k >= 20 && k < 30)
        {
            this.fireEvent("onProgressMessage",k,msgText);
        }
    },
    /*xjs.ui.ProgressPane.$P*/
    $P:function(k,msg,val,maxVal)
    {
        this.setProgress(k,msg,val,maxVal);
    },
    /*xjs.ui.ProgressPane.$PAnchor*/
    $PAnchor:function(url,title,target)
    {
        this.messagePane.addAnchor(Xjs.toFullURL(url,0),title,target);
    },
    /*xjs.ui.ProgressPane.onOk*/
    onOk:function()
    {
        var ra = [],
            c = this.fireEventV(0,"checkRunProgress",ra);
        if(c === false)
            return;
        if(ra.length > 0)
            (new Xjs.util.ConfirmPerform(null,ra,new Xjs.FuncCall(this.run,this))).confirmPerform();
        else 
            this.run();
    },
    /*xjs.ui.ProgressPane.run*/
    run:function()
    {
        {
            var v = this.fireEventV(0,"progressRun");
            if(v)
                return;
        }
        if(this.runLock > 0)
        {
            if(confirm("是否确定取消当前操作"))
            {
                Xjs.RInvoke.rmInvoke("snsoft.ui.controller.UIInvokeController.cancelProgress",this.progressID);
            }
            return;
        }
        var _exception = null;
        delete this.returnValue;
        this.lockStart(true);
        try
        {
            if(this.messagePane)
                this.messagePane.clear();
            if(this.progressBars != null)
                for(var i=0;i < this.progressBars.length;i++)
                    this.progressBars[i].setProgress("",0,0);
            this.fireEvent("beforeRunProgress");
            if(this.runMethod)
            {
                var a = this.buildUIInvokeAjax();
                a.request();
            }
        }catch(e)
        {
            _exception = e;
        }finally
        {
            this.lockStart(false);
        }
        if(_exception && _exception.dummy != true)
        {
            if(this.messagePane)
                this.messagePane.addMessage("错误：" + (_exception.message || _exception.toString()));
            throw _exception;
        }
    },
    /*xjs.ui.ProgressPane.onAjaxPosting*/
    onAjaxPosting:function()
    {
        if(!this.ajaxPostlock)
        {
            this.lockStart(true);
            this.ajaxPostlock = true;
        }
    },
    /*xjs.ui.ProgressPane.onAjaxReady*/
    onAjaxReady:function(ajax,readyStatus)
    {
        if(readyStatus > 2)
        {
            var text = ajax.conn.responseText;
            for(;;)
            {
                var p = text.indexOf(Xjs.ui.ProgressPane.EndPart,this.parsedAjaxRespPos);
                if(p < 0)
                    break;
                var sub = text.substring(this.parsedAjaxRespPos,p + Xjs.ui.ProgressPane.EndPart.length);
                this.parsedAjaxRespPos = p + Xjs.ui.ProgressPane.EndPart.length;
                eval(sub);
            }
            if(readyStatus == 4 && this.ajaxPostlock)
            {
                this.lockStart(false);
                this.ajaxPostlock = false;
            }
        }
    },
    /*xjs.ui.ProgressPane.buildUIInvokeAjax*/
    buildUIInvokeAjax:function()
    {
        var rootUiid = this.rootUiid || this.getRootComponentMID(),
            url = Xjs.RInvoke.buildUIInvokeURL(this.runMethodRPath,this.runMethod.indexOf('.') > 0 ? this.runMethod : "ui~" + rootUiid + "." + this.name + "." + this.runMethod,1);
        this.parsedAjaxRespPos = 0;
        if(this.postArgs)
        {
            if(this.reqParams)
            {
                var q = url.indexOf('?') > 0;
                for(var n in this.reqParams)
                {
                    var v = this.reqParams[n];
                    url += (q ? "&" : "?") + n + "=" + v;
                    q = true;
                }
            }
            return new Xjs.Ajax({url:url,onready:new Xjs.FuncCall(this.onAjaxReady,this),onposting:new Xjs.FuncCall(this.onAjaxPosting,this),contentType:"application/json;charset=utf-8",postBody:Xjs.JSON.encode(this.postArgs)});
        }
        var values = this.getItemValues(1);
        values = Xjs.applyIf(values,this.reqParams);
        var reqParams = {},
            formData = new FormData(),
            nfiles = 0;
        for(var p in values)
        {
            var v = values[p];
            if(v instanceof Xjs.ui.util.FileValue)
            {
                if(!v.inputDom)
                    continue;
                var files = v.inputDom.files;
                if(!files)
                    continue;
                for(var j=0;j < files.length;j++)
                {
                    formData.append(p,files[j]);
                    nfiles++;
                }
                continue;
            }
            var type;
            if((type = typeof(v)) == "string" || type == "number" || type == "boolean")
            {
                reqParams[p] = v;
                formData.append(p,v);
            } else 
            {
                reqParams["__Json_." + p] = v = Xjs.JSON.encode(v,null,0);
                formData.append("__Json_." + p,v);
            }
        }
        return new Xjs.Ajax({url:url,onready:new Xjs.FuncCall(this.onAjaxReady,this),contentType:nfiles > 0 ? null : "application/x-www-form-urlencoded;charset=utf-8",postBody:nfiles > 0 ? formData : Xjs.urlEncode(reqParams)});
    },
    /*xjs.ui.ProgressPane.initToolbar*/
    initToolbar:function()
    {
        Xjs.ui.ProgressPane.superclass.initToolbar.call(this);
    }
});
Xjs.apply(Xjs.ui.ProgressPane,{
    EndPart:";/*$*/\n",
    /*xjs.ui.ProgressPane.getFixProgress*/
    getFixProgress:function()
    {
        if(!Xjs.ui.ProgressPane.fixProgress)
        {
            if(window != window.parent)
                try
                {
                    Xjs.ui.ProgressPane.fixProgress = window.parent.Xjs.ui.ProgressPane.getFixProgress();
                }catch(ex)
                {
                }
            if(!Xjs.ui.ProgressPane.fixProgress)
                Xjs.ui.ProgressPane.fixProgress = new Xjs.ui.FixProgress();
        }
        return Xjs.ui.ProgressPane.fixProgress;
    }
});
Xjs.ui.FixProgress=function(){
    this.fixProgBar = document.createElement("div");
    this.fixProgBar.className = "ui-fix-progbar";
    Xjs.DOM.createChild(this.fixProgBar,"div","ui-fix-progrebar-v");
};
Xjs.apply(Xjs.ui.FixProgress.prototype,{
    /*xjs.ui.FixProgress.removeHtmlCls*/
    removeHtmlCls:function()
    {
        if(this._htmlCls)
        {
            Xjs.ui.UIUtil.updateHtmlCls(this._htmlCls,true);
            this._htmlCls = null;
        }
    },
    /*xjs.ui.FixProgress.setProgress*/
    setProgress:function(k,msgText,value,maxValue)
    {
        if(this.fixProgBar.parentNode != document.body)
        {
            this.startProgress();
        }
        if(maxValue > 0 && k == 1)
        {
            this.fixProgBar.childNodes[0].style.width = value * 100 / maxValue + "%";
        }
    },
    /*xjs.ui.FixProgress.startProgress*/
    startProgress:function()
    {
        if(this.fixProgBar.parentNode != document.body)
        {
            document.body.appendChild(this.fixProgBar);
            this.removeHtmlCls();
            this._htmlCls = Xjs.ui.UIUtil.addHtmCls(["ui-in-fixpregress"]);
            this.fixProgBar.childNodes[0].style.width = "0px";
        }
    },
    /*xjs.ui.FixProgress.stopProgress*/
    stopProgress:function()
    {
        if(this.fixProgBar)
        {
            var _fixProgBar = this.fixProgBar,
                rmFunc = new Xjs.FuncCall(this.removeHtmlCls,this);
            setTimeout(function(){
            rmFunc.func.apply(rmFunc.scorp,[]);
            Xjs.DOM.remove(_fixProgBar);
        },500);
        }
    }
});
/*xjs/ui/Select.java*/
Xjs.ui.Select=function(config){
    Xjs.ui.Select.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.Select,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.Select",
    focusableComp:true,
    isItemComp:true,
    /*xjs.ui.Select._createDOM*/
    _createDOM:function(root)
    {
        var d = Xjs.ui.Select.superclass._createDom0.call(this,root,"select");
        d.onchange = Function.bindAsEventListener(this.onSelChanged,this);
        if(this.id != null)
            d.id = this.id;
        if(this.name != null)
            d.name = this.name;
        if(this.multiple)
            d.multiple = true;
        if(this.rows > 1)
            d.size = this.rows;
        this.selectDOM = d;
        this._addOptions(d,this.getSelectOptions());
        return d;
    },
    /*xjs.ui.Select.setSelectOptions*/
    setSelectOptions:function(selectOptions)
    {
        this.selectOptions = selectOptions;
        if(this.selectDOM != null)
        {
            var v = this.selectDOM.value;
            if(v != null)
                this.value = v;
            this._addOptions(this.selectDOM,this.getSelectOptions());
        }
    },
    /*xjs.ui.Select.getItemCount*/
    getItemCount:function()
    {
        if(this.selectDOM != null)
            return this.selectDOM.options.length;
        return 0;
    },
    /*xjs.ui.Select._addOptions*/
    _addOptions:function(dom,optData)
    {
        (dom).options.length=0;
        delete this._$value;
        if(this.emptyText !== undefined)
        {
            var o = document.createElement("option");
            o.value = "";
            o.text = this.emptyText;
            (dom).options.add(o);
        }
        if(optData)
            for(var i=0;i < optData.length;i++)
            {
                var o = document.createElement("option"),
                    a = optData[i];
                if(!Xjs.isArray(a))
                    a = [a];
                o.value = a[0];
                o.text = a.length < 2 ? a[0] : (this.showCode && a[0] != a[1] ? a[0] + ":" + a[1] : a[1]);
                (dom).options.add(o);
                if(o.value == this.value)
                {
                    o.selected = true;
                }
            }
    },
    /*xjs.ui.Select.setValue*/
    setValue:function(value)
    {
        var oldValue = this.getValue();
        this.value = value;
        delete this._$value;
        if(this.selectDOM)
        {
            if(!this.selectDOM.multiple)
            {
                delete this._$value;
                this.selectDOM.value = value;
                if(oldValue != this.getValue())
                    this.fireEvent("valueChanged",null,1);
                return;
            }
        }
    },
    /*xjs.ui.Select.getValue*/
    getValue:function()
    {
        if(this._$value !== undefined)
            return this._$value;
        if(this.selectDOM)
        {
            var v = this.selectDOM.value;
            if(v != null && this.sqlType == 4)
                v = parseInt(v);
            if(v === "")
                v = null;
            return this._$value = this.value = v;
        }
        return this.value;
    },
    /*xjs.ui.Select.onSelChanged*/
    onSelChanged:function(e)
    {
        this.onChanged(e,4);
    },
    /*xjs.ui.Select.onChanged*/
    onChanged:function(e,o)
    {
        delete this._$value;
        this.fireEvent("valueChanged",e,o);
    }
});
{
    Xjs.UITYPES.select = Xjs.ui.Select;
}/*xjs/ui/SplitPane.java*/
Xjs.ui.SplitPane=function(config){
    Xjs.ui.SplitPane.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.SplitPane,Xjs.ui.Container,{
  _js$className_:"Xjs.ui.SplitPane",
    /*xjs.ui.SplitPane.__init*/
    __init:function()
    {
        Xjs.ui.SplitPane.superclass.__init.call(this);
        this.needRelayoutIfResize = true;
    },
    /*xjs.ui.SplitPane._createDOM*/
    _createDOM:function(root)
    {
        var dom = Xjs.ui.SplitPane.superclass._createDOM.call(this,root);
        this._appendSplitChildCmp(dom,0);
        this._appendSplitChildCmp(dom,1);
        this.dividerDOM = Xjs.DOM.getElementById(dom.childNodes,"divider") || Xjs.DOM.findById("divider",dom);
        if(!this.dividerDOM)
            this.dividerDOM = Xjs.DOM.createChild(dom,"div","x-split-divider");
        if(!this.rightCmp)
        {
            this.dividerDOM.style.display = "none";
        } else 
        {
            this.dividerDOM.onmousedown = Function.bindAsEventListener(this._onMouseDown,this);
        }
        var dvSize = this.dividerSize === undefined ? (this.leftHideable ? 6 : 2) : this.dividerSize,
            divS = this.dividerDOM.style;
        if(this.orientation)
        {
            divS.top = "0px";
            divS.bottom = "0px";
            divS.width = dvSize + "px";
        } else 
        {
            divS.left = "0px";
            divS.right = "0px";
            divS.height = dvSize + "px";
        }
        if(this.leftHideable)
        {
            this.dividerIconDOM = Xjs.DOM.findById("icon",this.dividerDOM);
            if(!this.dividerIconDOM)
                this.dividerIconDOM = Xjs.DOM.createChild(this.dividerDOM,"div",this.orientation == 1 ? "iconleft" : "iconup");
        }
        this.setDiviverCursor();
        return dom;
    },
    /*xjs.ui.SplitPane._appendSplitChildCmp*/
    _appendSplitChildCmp:function(dom,idx)
    {
        if(!this.items || idx >= this.items.length)
            return;
        var cmp = this.items[idx];
        if(idx == 0)
            this.leftCmp = cmp;
        else if(idx == 1)
            this.rightCmp = cmp;
        var d = cmp.getDOM(dom);
        if(this.orientation)
        {
            d.style.top = "0px";
            d.style.bottom = "0px";
        } else 
        {
            d.style.left = "0px";
            d.style.right = "0px";
        }
        d.style.position = "absolute";
    },
    /*xjs.ui.SplitPane.doOnResize*/
    doOnResize:function()
    {
        if(!this.rightCmp)
        {
            if(this.leftCmp)
                this.leftCmp.onResize();
            return;
        }
        var domSize = this.orientation ? Xjs.DOM.getWidth(this.dom) : Xjs.DOM.getHeight(this.dom),
            leftSize,
            sz100 = this.orientation ? Xjs.DOM.getHeight(this.dom) : Xjs.DOM.getWidth(this.dom),
            leftDom = this.leftCmp ? this.leftCmp.dom : null,
            leftAutoSize = false;
        if(!leftDom || leftDom.style.display == "none")
        {
            leftSize = 0;
        } else if(this.leftSize !== undefined)
        {
            if(this.orientation)
                this.leftCmp._setSizeCaseContainerDOM(leftSize = this.leftSize,sz100);
            else 
                this.leftCmp._setSizeCaseContainerDOM(sz100,leftSize = this.leftSize);
        } else if(this.rightSize !== undefined)
        {
            leftSize = domSize - (this.rightSize + 4);
            if(this.orientation)
                this.leftCmp._setSizeCaseContainerDOM(leftSize,sz100);
            else 
                this.leftCmp._setSizeCaseContainerDOM(sz100,leftSize);
        } else 
        {
            leftAutoSize = true;
            if(this.leftCmp . _updateDomSize)
            {
                this.leftCmp._updateDomSize();
            }
            if(this.orientation)
            {
                var findComps = this.leftCmp.findComps(new Xjs.FuncCall(function(v){
            return v instanceof Xjs.ui.GridTable;
        },this),true);
                if(findComps != null && findComps.length == 1)
                {
                    var addWidth = 10;
                    leftSize = findComps[0].getOptimalWidth() + addWidth;
                    if(findComps[0] == this.leftCmp)
                    {
                        var _lastUpszW = findComps[0].__lastUpszW;
                        if(_lastUpszW && leftSize - _lastUpszW.width == addWidth)
                        {
                            leftSize = _lastUpszW.width;
                        }
                    }
                } else 
                {
                    leftSize = Xjs.DOM.getWidth(this.leftCmp.getDOM());
                }
            } else 
            {
                leftSize = Xjs.DOM.getHeight(this.leftCmp.getDOM());
            }
            if(leftSize <= 0 || leftSize >= domSize)
            {
                if(this.rightCmp . _updateDomSize)
                {
                    this.rightCmp._updateDomSize();
                }
                var rightSize = this.orientation ? Xjs.DOM.getWidth(this.rightCmp.getDOM()) : Xjs.DOM.getHeight(this.rightCmp.getDOM());
                if(rightSize <= 0)
                    leftSize = (domSize - 4) / 2;
                else 
                    leftSize = domSize - (rightSize + 4);
            }
            if(leftSize > 0)
            {
                if(this.orientation)
                {
                    this.leftCmp._setSizeCaseContainerDOM(leftSize,sz100);
                } else 
                {
                    this.leftCmp._setSizeCaseContainerDOM(sz100,leftSize);
                }
            }
        }
        var rdomS = this.rightCmp.dom.style,
            divS = this.dividerDOM.style,
            divSize = (this.orientation ? Xjs.DOM.getWidth(this.dividerDOM) : Xjs.DOM.getHeight(this.dividerDOM)) + 2;
        if(leftSize > domSize - divSize)
            leftSize = domSize - divSize;
        if(leftSize < 0)
            leftSize = 0;
        this._leftPos = leftSize;
        if(this.orientation)
        {
            divS.left = leftSize + "px";
            rdomS.left = leftSize + divSize + "px";
            this.rightCmp._setSizeCaseContainerDOM(domSize - (leftSize + divSize),sz100);
        } else 
        {
            divS.top = leftSize + "px";
            rdomS.top = leftSize + divSize + "px";
            this.rightCmp._setSizeCaseContainerDOM(sz100,domSize - (leftSize + divSize));
        }
        if(leftAutoSize && this.leftCmp . onResize)
            this.leftCmp.onResize();
        this._reszCalled = true;
        this.fireEvent("onSplitPaneResized");
    },
    /*xjs.ui.SplitPane.collapse*/
    collapse:function(hidden)
    {
        var leftDom = this.leftCmp ? this.leftCmp.dom : null;
        if(leftDom == null)
            return;
        if(hidden === undefined)
            hidden = leftDom.style.display != "none";
        leftDom.style.display = hidden ? "none" : "block";
        this.setDiviverCursor();
        this.onResize();
    },
    /*xjs.ui.SplitPane.setSplitUnmovable*/
    setSplitUnmovable:function(splitUnmovable)
    {
        this.splitUnmovable = splitUnmovable;
        this.setDiviverCursor();
    },
    /*xjs.ui.SplitPane.setDiviverCursor*/
    setDiviverCursor:function()
    {
        if(!this.dividerDOM)
            return;
        var leftDom = this.leftCmp ? this.leftCmp.dom : null;
        if(!leftDom)
            return;
        var hidden = leftDom.style.display == "none";
        if(this.dividerIconDOM != null)
        {
            this.dividerIconDOM.className = hidden ? (this.orientation == 1 ? "iconright" : "icondown") : (this.orientation == 1 ? "iconleft" : "iconup");
        }
        this.dividerDOM.style.cursor = hidden || this.splitUnmovable ? "auto" : (this.orientation ? "col-resize" : "row-resize");
    },
    /*xjs.ui.SplitPane._onMouseDown*/
    _onMouseDown:function(e)
    {
        var leftDom = this.leftCmp != null ? this.leftCmp.dom : null;
        if(leftDom == null)
            return;
        if((e.srcElement || e.target) == this.dividerIconDOM || leftDom.style.display == "none" || this.splitUnmovable)
        {
            if(this.collapseAble)
                this.collapse();
            return;
        }
        if(!this.splitUnmovable)
        {
            Xjs.DOM.addWMDragListener(this,this._onMouseMove,this._onMouseUp);
            this._deltaMove = this._leftPos - (this.orientation == 1 ? e.clientX : e.clientY);
        }
    },
    /*xjs.ui.SplitPane._onMouseMove*/
    _onMouseMove:function(e)
    {
        {
            if(this.mouseResizeImm)
                this.resizeByMouse(e);
            else 
            {
                var to = (this.orientation ? e.clientX : e.clientY) + this._deltaMove;
                if(this.orientation)
                    this.dividerDOM.style.left = to + "px";
                else 
                    this.dividerDOM.style.top = to + "px";
            }
        }
    },
    /*xjs.ui.SplitPane._onMouseUp*/
    _onMouseUp:function(e)
    {
        this.resizeByMouse(e);
    },
    /*xjs.ui.SplitPane.resizeByMouse*/
    resizeByMouse:function(e)
    {
        var to = (this.orientation ? e.clientX : e.clientY) + this._deltaMove;
        if(to < 0)
            to = 0;
        if(this.rightSize !== undefined)
        {
            var domSize = this.orientation ? Xjs.DOM.getWidth(this.dom) : Xjs.DOM.getHeight(this.dom);
            this.rightSize = domSize - (to + 4);
            if(this.rightSize < 0)
                this.rightSize = 0;
        } else 
        {
            this.leftSize = to;
        }
        this.onResize();
    },
    /*xjs.ui.SplitPane.checkShowing*/
    checkShowing:function(firstFocus,setFirstFocus)
    {
        if(!this._reszCalled)
            this.onResize();
        Xjs.ui.SplitPane.superclass.checkShowing.call(this,firstFocus,setFirstFocus);
    }
});
/*xjs/ui/TabPanel.java*/
Xjs.ui.TabPanel=function(cfg){
    Xjs.ui.TabPanel.superclass.constructor.call(this,cfg);
};
Xjs.extend(Xjs.ui.TabPanel,Xjs.ui.Container,{
  _js$className_:"Xjs.ui.TabPanel",
    curClass:"act",
    ncurClass:"nact",
    tabTagName:"li",
    initSelectedTab:0,
    selectedTab:-1,
    /*xjs.ui.TabPanel.init*/
    init:function(root,contextDOM,initAllTab)
    {
        if(initAllTab === undefined)
            initAllTab = this.initAllTabDOM;
        this.initRoot = root;
        this.initContextDOM = contextDOM;
        if(!this.fnOnTabClicked)
            this.fnOnTabClicked = Function.bindAsEventListener(this.onTabClicked,this);
        var ea = this.tabUL.getElementsByTagName(this.tabTagName);
        if(ea)
        {
            this.tabs = new Array(ea.length);
            for(var i=0;i < ea.length;i++)
            {
                if(ea[i].id && ea[i].id.startsWith("TabOfUIA_"))
                {
                    var c = Xjs.DOM.findById(ea[i].id.substring(5),contextDOM);
                    if(c && i != (this.selectedTab >= 0 ? this.selectedTab : this.initSelectedTab))
                    {
                        c.style.display = "none";
                    }
                }
            }
            for(var i=0;i < ea.length;i++)
            {
                var t = this.tabs[i] = {};
                t.tabDOM = ea[i];
                t.visible = true;
                if(ea[i].id && ea[i].id.startsWith("TabOfUIA_"))
                {
                    var id = ea[i].id.substring(5),
                        c = t.comp = this._getSubComponent(root,id);
                    if(c && (c.visible === false || c.inTabVisible === false))
                        t.visible = false;
                }
                if(!t.visible)
                    t.tabDOM.style.display = "none";
                Xjs.DOM.addListener(ea[i],"click",this.fnOnTabClicked);
                Xjs.DOM.addClass(t.tabDOM,this.ncurClass);
                if(initAllTab || i == (this.selectedTab >= 0 ? this.selectedTab : this.initSelectedTab))
                    this.initTabContentDOM(t);
            }
        } else 
        {
            window.console.log(this.name + " : " + this.tabTagName + " Not found");
        }
    },
    /*xjs.ui.TabPanel._getSubComponent*/
    _getSubComponent:function(root,id)
    {
        if(this.mainUI & 3 || !this.getMainParentComponent())
        {
            return root.getMainComponentById(id);
        } else 
        {
            if(this.items)
                for(var j=0;j < this.items.length;j++)
                {
                    var c = this.items[j];
                    if(c.id == id)
                        return c;
                }
        }
        return null;
    },
    /*xjs.ui.TabPanel.initTabContentDOM*/
    initTabContentDOM:function(t)
    {
        var root = this.initRoot,
            contextDOM = this.initContextDOM,
            forDOM = null,
            contentDOM = null,
            td = t.tabDOM;
        if(!forDOM && td.id)
        {
            if(td.id.startsWith("TabOfUIA_") && root)
            {
                var n = td.id.substring(5),
                    c = this._inInitComp = this._getSubComponent(root,n);
                if(c && (contentDOM = c.getDOM()))
                {
                    forDOM = contentDOM.id;
                }
                if(c && c.visible === false)
                {
                    td.style.display = "none";
                }
            }
        }
        if(forDOM)
        {
            t.id = forDOM;
            t.contentDOM = contentDOM || Xjs.DOM.findById(forDOM,contextDOM);
            if(root)
            {
                this.addUICompsTo(root,t.contentDOM,t.comps = []);
            }
        }
        this._inInitComp = null;
    },
    /*xjs.ui.TabPanel._createDOM*/
    _createDOM:function(root)
    {
        return this._createDom0(root,"div");
    },
    /*xjs.ui.TabPanel.onDomCreated*/
    onDomCreated:function(root)
    {
        Xjs.ui.TabPanel.superclass.onDomCreated.call(this,root);
        this.navToolbar = Xjs.DOM.findById("NavToolbar",this.dom);
        this.tabUL = Xjs.DOM.findById("TabUL",this.navToolbar || this.dom);
        this.init(this.getRootComponent(),root);
        if(this.tabs)
            for(var i=0;i < this.tabs.length;i++)
            {
                var t = this.tabs[i];
                if(i == this.selectedTab)
                    Xjs.DOM.updateClass(t.tabDOM,this.curClass,this.ncurClass);
                else 
                    Xjs.DOM.updateClass(t.tabDOM,this.ncurClass,this.curClass);
                if(t.contentDOM)
                {
                    t.contentDOM.style.display = i == (this.selectedTab >= 0 ? this.selectedTab : this.initSelectedTab) ? "block" : "none";
                }
            }
        var opts = Xjs._uiInited ? 0 : 1;
        setTimeout(this.setActiveTab.createDelegate(this,[this.initSelectedTab,opts],true),1);
    },
    /*xjs.ui.TabPanel.setTabComponent*/
    setTabComponent:function(id,c)
    {
        if(this.tabs)
            for(var i=0;i < this.tabs.length;i++)
            {
                if(this.tabs[i].id == id)
                    this.tabs[i].comps = c instanceof Array ? c : [c];
            }
    },
    /*xjs.ui.TabPanel.setActiveTab*/
    setActiveTab:function(s,opts)
    {
        if(this.tabs && s >= 0 && s < this.tabs.length)
        {
            var oldSelected = this.selectedTab;
            if(this.selectedTab == s)
                return;
            if(s >= 0 && s < this.tabs.length && this.tabs[s].comp instanceof Xjs.ui.LazyComp)
            {
                var _this = this;
                this.tabs[s].comp.loadUI(this._rootDOM).then(function(c){
            _this.tabs[s].comp = c;
            _this.setActiveTab(s);
        });
                return;
            }
            if(this.postITblOnUnselect && this.selectedTab >= 0)
                Xjs.table.Table.postITblsPending(this.tabs[this.selectedTab].comps,1);
            this.fireEvent("onTabbedSelecting",s);
            var hideOldTab = null;
            if(this.selectedTab >= 0 && this.selectedTab < this.tabs.length)
            {
                var t = this.tabs[this.selectedTab];
                Xjs.DOM.updateClass(t.tabDOM,this.ncurClass,this.curClass);
                if(t.contentDOM)
                {
                    if(this.showSeledPageOrd == 1 || this.showSeledPageOrd === undefined)
                        hideOldTab = t;
                    else 
                    {
                        t.contentDOM.style.display = "none";
                        this.checkTabHidden(t);
                    }
                }
            }
            var t = this.tabs[this.selectedTab = s];
            if(!t.contentDOM)
            {
                this.initTabContentDOM(t);
            }
            if(t.comps)
                for(var i=0;i < t.comps.length;i++)
                {
                    var c = t.comps[i];
                    if(!c.dom)
                        c.getDOM();
                }
            Xjs.DOM.updateClass(t.tabDOM,this.curClass,this.ncurClass);
            if(t.contentDOM)
            {
                t.contentDOM.style.display = "block";
            }
            if(hideOldTab)
            {
                hideOldTab.contentDOM.style.display = "none";
                this.checkTabHidden(hideOldTab);
            }
            var headFirstFocus = [null];
            this.checkTabShowing(t,headFirstFocus,!(opts & 1));
            this.doOnResize();
            if(t.comps)
            {
                for(var i=0;i < t.comps.length;i++)
                {
                    var c;
                    if((c = t.comps[i]).onResize)
                        c.onResize();
                }
            }
            Xjs.DOM.onWinResize(1);
            this.fireEvent("onTabbedSelected",oldSelected);
            var wOnTabSeled;
            if(wOnTabSeled = window["onTab_" + this.dom.id + "_Selected"])
            {
                wOnTabSeled.call(window,1);
            }
            if(Xjs.onWDocResized)
                Xjs.checkWDocResized();
            Xjs.ui.Panel.updatePaneBdoySBar(this);
        }
    },
    /*xjs.ui.TabPanel.checkTabShowing*/
    checkTabShowing:function(t,firstFocus,setFirstFocus)
    {
        if(t.comps)
        {
            for(var i=0;i < t.comps.length;i++)
            {
                t.comps[i].checkShowing(firstFocus,setFirstFocus);
            }
        }
    },
    /*xjs.ui.TabPanel.checkTabHidden*/
    checkTabHidden:function(t)
    {
        if(t.comps)
        {
            for(var i=0;i < t.comps.length;i++)
            {
                t.comps[i].checkHidden();
            }
        }
    },
    /*xjs.ui.TabPanel.onTabClicked*/
    onTabClicked:function(e)
    {
        var t = e.srcElement || e.target;
        if(this.tabs)
            for(var i=0;i < this.tabs.length;i++)
            {
                if(this.tabs[i].tabDOM == t || Xjs.DOM.contains(this.tabs[i].tabDOM,t))
                {
                    this.setActiveTab(i);
                    break;
                }
            }
    },
    /*xjs.ui.TabPanel.setTabEnabled*/
    setTabEnabled:function(i,e)
    {
        if(typeof(i) != "number")
        {
            i = this.indexOfItem(i);
        }
        var t = this.tabs[i];
        if(t && t.tabDOM)
            t.tabDOM.disabled = !e;
    },
    /*xjs.ui.TabPanel.isEnable*/
    isEnable:function(i)
    {
        if(typeof(i) != "number")
        {
            i = this.indexOfItem(i);
        }
        var n = this.items ? this.items.length : 0;
        if(i < 0 || i >= n)
        {
            return false;
        }
        var t = this.tabs[i];
        if(t && t.tabDOM)
        {
            return !t.tabDOM.disabled;
        }
        return !this.disabled;
    },
    /*xjs.ui.TabPanel.removeTab*/
    removeTab:function(id)
    {
        var removeIdx = -1;
        if(this.tabs)
            for(var i=0;i < this.tabs.length;i++)
            {
                var t = this.tabs[i];
                if(t.id == id)
                {
                    if(t.contentDOM)
                        t.contentDOM.style.display = "none";
                    if(t.tabDOM && t.tabDOM.parentNode)
                    {
                        t.tabDOM.parentNode.removeChild(t.tabDOM);
                    }
                    removeIdx = i;
                    Array.removeElement(this.tabs,t);
                    break;
                }
            }
        if(this.selectedTab == removeIdx)
        {
            this.selectedTab = -1;
            if(this.tabs && this.tabs.length > 0)
            {
                var toIdx = removeIdx;
                if(toIdx >= this.tabs.length)
                    toIdx = 0;
                this.setActiveTab(toIdx);
            }
        }
    },
    /*xjs.ui.TabPanel.getTabInfo*/
    getTabInfo:function(v)
    {
        if(this.tabs)
        {
            if(typeof(v) == "number")
                return this.tabs[v];
            if(typeof(v) == "string")
                for(var i=0;i < this.tabs.length;i++)
                {
                    var t = this.tabs[i];
                    if(t.id == v)
                        return t;
                }
            if(v instanceof Xjs.ui.Component)
                for(var i=0;i < this.tabs.length;i++)
                {
                    var t = this.tabs[i];
                    if(!t.comps)
                        this.initTabContentDOM(t);
                    if(t.comps.indexOf(v) >= 0)
                    {
                        return t;
                    }
                }
        }
        return null;
    },
    /*xjs.ui.TabPanel.addTabItem*/
    addTabItem:function(item)
    {
        if(!item)
            return;
        this.addChild(item);
        this.addTab(item);
    },
    /*xjs.ui.TabPanel.addTab*/
    addTab:function(comps,title,cdom,tabIdx)
    {
        var comp = comps instanceof Array ? comps[0] : comps;
        if(title == null)
            title = comp.title;
        if(this.tabTagName == null)
            throw new Error("未定义 tabTag");
        var s;
        if(this.tabInnerHtml == null)
            s = title;
        else 
        {
            var p = this.tabInnerHtml.indexOf("${title}");
            if(p < 0)
                throw new Error(this.tabInnerHtml);
            s = this.tabInnerHtml.substring(0,p) + title + this.tabInnerHtml.substring(p + 8);
        }
        var e = document.createElement(this.tabTagName);
        Xjs.DOM.addListener(e,"click",this.fnOnTabClicked);
        e.innerHTML = s;
        e.className = this.ncurClass;
        var tab = {};
        tab.id = comp.id;
        e.id = (this.tabLiIdPrefix || "TabOf") + tab.id;
        tab.comps = comps instanceof Array ? comps : [comps];
        tab.tabDOM = e;
        tab.contentDOM = cdom || comp.getDOM();
        tab.contentDOM.style.display = "none";
        if(tabIdx === undefined)
            tabIdx = -1;
        var before;
        if(this.tabs && tabIdx >= 0 && tabIdx < this.tabs.length)
        {
            before = this.tabs[tabIdx].tabDOM;
        } else if(this.tabs != null && this.tabs.length > 0)
        {
            before = this.tabs[this.tabs.length - 1].tabDOM.nextSibling;
        } else 
        {
            before = null;
        }
        if(this.tabs == null)
            this.tabs = [tab];
        else if(tabIdx >= 0 && tabIdx < this.tabs.length)
        {
            this.tabs.splice(tabIdx,0,tab);
            if(this.selectedTab >= tabIdx)
                this.selectedTab++;
        } else 
        {
            this.tabs.push(tab);
            tabIdx = this.tabs.length - 1;
        }
        this.callOnDomCreated(this,this.appendTabHeaderDom,[e,before]);
    },
    /*xjs.ui.TabPanel.appendTabHeaderDom*/
    appendTabHeaderDom:function(e,before)
    {
        if(before)
        {
            this.tabUL.insertBefore(e,before);
        } else 
        {
            this.tabUL.appendChild(e);
        }
    },
    /*xjs.ui.TabPanel.moveTab*/
    moveTab:function(index,toIndex)
    {
        var nt = this.tabs ? this.tabs.length : 0;
        if(index == toIndex || index < 0 || index >= nt || toIndex < 0 || toIndex >= nt)
            return;
        var k = this.selectedTab >= 0 && this.selectedTab < nt ? this.tabs[this.selectedTab] : null,
            t = this.tabs[index],
            p = t.tabDOM.parentNode;
        if(p)
            p.removeChild(t.tabDOM);
        this.tabs.splice(index,1);
        if(toIndex >= this.tabs.length)
        {
            this.tabs.push(t);
            if(p)
                p.appendChild(t.tabDOM);
        } else 
        {
            this.tabs.splice(toIndex,0,t);
            p.insertBefore(t.tabDOM,this.tabs[toIndex + 1].tabDOM);
        }
        if(k)
            for(var j=0;j < this.tabs.length;j++)
            {
                if(this.tabs[j] == k)
                {
                    this.selectedTab = j;
                    break;
                }
            }
    },
    /*xjs.ui.TabPanel.addUICompsTo*/
    addUICompsTo:function(root,e,to)
    {
        if(e == null)
            return;
        var id = e.id;
        addC:if(id)
            {
                var c;
                if(id.startsWith("UIA_"))
                {
                    c = this._getSubComponent(root,id);
                } else 
                    break addC;
                if(c)
                {
                    if((!this.items || this.items.indexOf(c) >= 0) && !Xjs.ui.TabPanel.isParentCompIn(c,to))
                        to.push(c);
                }
            }
        if(e.childNodes)
            for(var i=0;i < e.childNodes.length;i++)
            {
                this.addUICompsTo(root,e.childNodes[i],to);
            }
    },
    /*xjs.ui.TabPanel.checkShowing*/
    checkShowing:function(firstFocus,setFirstFocus)
    {
        var t = this.tabs ? this.tabs[this.selectedTab] : null;
        if(t)
            this.checkTabShowing(t,firstFocus,setFirstFocus);
    },
    /*xjs.ui.TabPanel.indexOfComp*/
    indexOfComp:function(c)
    {
        if(this.tabs)
            for(var i=0;i < this.tabs.length;i++)
            {
                if(this.tabs[i] && this.tabs[i].comps)
                    for(var j=0;j < this.tabs[i].comps.length;j++)
                    {
                        var p = this.tabs[i].comps[j];
                        if(p == c || p instanceof Xjs.ui.Container && p.isAncestorOf(c))
                            return i;
                    }
            }
        return -1;
    },
    /*xjs.ui.TabPanel.indexOfTabByID*/
    indexOfTabByID:function(tabid)
    {
        if(this.tabs)
            for(var i=0;i < this.tabs.length;i++)
            {
                if(this.tabs[i].tabDOM.id == tabid)
                {
                    return i;
                }
            }
        return -1;
    },
    /*xjs.ui.TabPanel.indexOfTabById*/
    indexOfTabById:function(c)
    {
        if(!this.tabs)
        {
            return -1;
        }
        var r = c.getRootComponent();
        for(var i=0;i < this.tabs.length;i++)
        {
            var ti = this.tabs[i];
            if(!ti.tabDOM.id.startsWith("TabOfUIA_"))
                continue;
            var p = r.getMainComponentByName(ti.tabDOM.id.substring(9));
            if(p && (p == c || p instanceof Xjs.ui.Container && p.isAncestorOf(c)))
            {
                return i;
            }
        }
        return -1;
    },
    /*xjs.ui.TabPanel.setTabVisible*/
    setTabVisible:function(i,visible)
    {
        if(typeof(i) != "number")
        {
            i = this.indexOfItem(i);
        }
        var n = this.items ? this.items.length : 0;
        if(i < 0 || i >= n)
            return;
        if(!this.tabs)
        {
            this.items[i].inTabVisible = visible;
            return;
        }
        if(i == this.selectedTab && !visible)
        {
            for(var j=0;j < n;j++)
            {
                var j1 = (i + j) % n;
                if(j1 == i)
                    continue;
                if(this.tabs[j1].visible)
                {
                    this.setActiveTab(j1);
                    break;
                }
            }
            if(this.selectedTab == i)
            {
                if(this.selectedTab >= 0 && this.selectedTab < n)
                    this.selectedTab = -1;
            }
        }
        if(this.tabs[i].tabDOM)
            this.tabs[i].tabDOM.style.display = visible ? "" : "none";
    },
    /*xjs.ui.TabPanel.isVisible*/
    isVisible:function(i)
    {
        if(typeof(i) != "number")
        {
            i = this.indexOfItem(i);
        }
        var n = this.items ? this.items.length : 0;
        if(i < 0 || i >= n)
        {
            return false;
        }
        if(!this.tabs)
        {
            return this.inTabVisible;
        }
        if(this.tabs[i].tabDOM)
        {
            var style = this.tabs[i].tabDOM.style;
            return style.display != "none" && style.visibility != "hidden";
        }
        return Xjs.ui.TabPanel.superclass.isVisible.call(this);
    },
    /*xjs.ui.TabPanel.doOnResize*/
    doOnResize:function()
    {
        if(!this.dom || this.dom.style.display == "none" || this.dom.style.height == "auto" || this.dom.style.height == "" || !this.tabs)
            return;
        var ti = this.tabs[this.selectedTab];
        if(!ti || !ti.comps || ti.comps.length != 1)
        {
            return;
        }
        var tb = this.navToolbar || this.tabUL,
            h = Xjs.DOM.getHeight(this.dom) - Xjs.DOM.getBorder(this.dom,"tb") - Xjs.DOM.getHeight(tb) - Xjs.DOM.getMargins(tb,"tb");
        ti.comps[0].setHeight(h);
    }
});
Xjs.apply(Xjs.ui.TabPanel,{
    /*xjs.ui.TabPanel.isParentCompIn*/
    isParentCompIn:function(c,a)
    {
        for(var p=c.parent;p;p = p.parent)
        {
            if(a.indexOf(p) >= 0)
                return true;
        }
        return false;
    },
    /*xjs.ui.TabPanel.setTabSelectedByComp*/
    setTabSelectedByComp:function(c)
    {
        if(!c.parent)
            return;
        Xjs.ui.TabPanel.setTabSelectedByComp(c.parent);
        if(c.parent instanceof Xjs.ui.TabPanel)
        {
            var t = c.parent,
                i = t.indexOfComp(c);
            if(i < 0)
                i = t.indexOfTabById(c);
            if(i < 0)
                return;
            t.setActiveTab(i);
        }
    }
});
/*xjs/ui/Toolbar.java*/
Xjs.ui.Toolbar=function(config){
    Xjs.ui.Toolbar.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.Toolbar,Xjs.ui.Container,{
  _js$className_:"Xjs.ui.Toolbar",
    /*xjs.ui.Toolbar._createDOM*/
    _createDOM:function(root)
    {
        var dom = this.contentDom = this._createDom0(root,"div");
        if(this.className)
            dom.className = this.className;
        if(this.closeIcons)
            for(var i=this.closeIcons.length - 1;i >= 0;i--)
            {
                var icon = this.closeIcons[i];
                icon.dom = Xjs.DOM.createChild(this.contentDom,"div",(icon.floatLeft ? "x-lefttool " : "x-tool ") + icon.iconClass);
                icon.dom.onclick = Function.bindAsEventListener(this._onClickClose,this);
            }
        this.addRightTitleDOM();
        if(this.items)
        {
            for(var i=0;i < this.items.length;i++)
            {
                var e = this.items[i].getDOM(root);
                dom.appendChild(e);
            }
        }
        this.titDom = Xjs.DOM.findById("title",dom);
        if(this.titDom)
        {
            Xjs.DOM.setTextContent(this.titDom,this.title);
            if(this.hideTitle)
                this.titDom.style.display = "none";
        }
        return dom;
    },
    /*xjs.ui.Toolbar.setTitle*/
    setTitle:function(title)
    {
        if(this.titDom)
            Xjs.DOM.setTextContent(this.titDom,title);
    },
    /*xjs.ui.Toolbar.setTitleHidden*/
    setTitleHidden:function(h)
    {
        this.hideTitle = h;
        if(this.titDom)
            this.titDom.style.display = this.hideTitle ? "none" : "";
    },
    /*xjs.ui.Toolbar.setRightTitle*/
    setRightTitle:function(rtitle,rtitleColor)
    {
        this.rtitle = rtitle;
        if(rtitleColor !== undefined)
            this.rtitleColor = rtitleColor;
        this.addRightTitleDOM();
    },
    /*xjs.ui.Toolbar.addRightTitleDOM*/
    addRightTitleDOM:function()
    {
        if(!this.contentDom)
            return;
        if(!this.rtitle)
        {
            if(!this.rtitleDOM)
                return;
            this.contentDom.removeChild(this.rtitleDOM);
            this.rtitleDOM = null;
            return;
        }
        if(!this.rtitleDOM)
        {
            this.rtitleDOM = Xjs.DOM.createChild(this.contentDom,"div","x-toolrtitle");
        }
        Xjs.DOM.setTextContent(this.rtitleDOM,this.rtitle);
        this.rtitleDOM.style.color = this.rtitleColor || "";
    },
    /*xjs.ui.Toolbar.setVisibleIf*/
    setVisibleIf:function()
    {
        var v = !!(this.closeIcons && this.closeIcons.length > 0 || this.title);
        if(this.items && !v)
            for(var i=0;i < this.items.length;i++)
            {
                if(this.items[i].isVisible())
                {
                    v = true;
                }
            }
        if(v && this.dom)
            this.dom.style.display = "";
        this.setVisible(v);
    },
    /*xjs.ui.Toolbar.addCloseIcon*/
    addCloseIcon:function()
    {
        this.closeIcons = Array.addElements(this.closeIcons,arguments);
    },
    /*xjs.ui.Toolbar.getCloseIcon*/
    getCloseIcon:function(icon)
    {
        if(!this.closeIcons || !icon)
            return null;
        for(var i=0;i < this.closeIcons.length;i++)
        {
            var iconI = this.closeIcons[i];
            if(icon == iconI || icon == iconI.dom || icon == iconI.command)
                return iconI;
        }
        return null;
    },
    /*xjs.ui.Toolbar.setCloseIconEnabled*/
    setCloseIconEnabled:function(icon,enable)
    {
        var i = this.getCloseIcon(icon);
        if(i && i.dom)
        {
            i.dom.disabled = !enable;
            Xjs.DOM.addOrRemoveClass(i.dom,"ui-disabled",!enable);
        }
    },
    /*xjs.ui.Toolbar.setCloseIconClass*/
    setCloseIconClass:function(_closeIcon,className)
    {
        var closeIcon = this.getCloseIcon(_closeIcon);
        if(closeIcon == null)
            return;
        Xjs.DOM.removeClass(closeIcon.dom,closeIcon.iconClass);
        closeIcon.iconClass = className || "";
        Xjs.DOM.addClass(closeIcon.dom,closeIcon.iconClass);
    },
    /*xjs.ui.Toolbar._onClickClose*/
    _onClickClose:function(e)
    {
        var i = this.getCloseIcon(e.srcElement || e.target);
        if(i && i.command && !i.dom.disabled)
        {
            this.fireEvent(i.command);
        }
    },
    /*xjs.ui.Toolbar.isDomInToolbarCloseIcon*/
    isDomInToolbarCloseIcon:function(e)
    {
        if(this.closeIcons)
            for(var i=0;i < this.closeIcons.length;i++)
            {
                if(e == this.closeIcons[i].dom || Xjs.DOM.contains(this.closeIcons[i].dom,e))
                    return true;
            }
        return false;
    }
});
/*xjs/ui/ToolbarBtn.java*/
Xjs.ui.ToolbarBtn=function(cfg){
    Xjs.ui.ToolbarBtn.superclass.constructor.call(this,cfg);
};
Xjs.extend(Xjs.ui.ToolbarBtn,Xjs.ui.Button,{
  _js$className_:"Xjs.ui.ToolbarBtn",
    className:"ui-btn",
    /*xjs.ui.ToolbarBtn._createDOM*/
    _createDOM:function(root)
    {
        var d = this.btnDom = Xjs.ui.ToolbarBtn.superclass._createDom0.call(this,root,"button");
        if(this.iconClassName)
        {
            var btnHtml = "";
            btnHtml += "<svg class='icon' aria-hidden='true'>";
            btnHtml += "<use xlink:href='#" + this.iconClassName + "'></use>";
            btnHtml += "</svg>";
            d.innerHTML = btnHtml;
        }
        this.textDOM = Xjs.DOM.findById("btn_text",d);
        if(!this.textDOM)
        {
            this.textDOM = Xjs.DOM.createChild(d,"span");
            this.textDOM.id = "btn_text";
            this.textDOM.className = "btn-text";
        }
        if(this.text)
        {
            Xjs.DOM.setTextContent(this.textDOM,this.text);
        }
        if(this.rIconClassName)
            Xjs.DOM.createChild(d,"i",this.rIconClassName);
        if(this.className && this.className.indexOf("ui-head-drop") >= 0)
        {
            var ohtml = d.innerHTML;
            ohtml += "<svg class='icon btn-icon-drop' aria-hidden='true'>";
            ohtml += "<use xlink:href='#icons-biaodan_xiala'></use>";
            ohtml += "</svg>";
            d.innerHTML = ohtml;
        }
        if(!this.command && this.name)
            this.command = this.name;
        if(this.command)
            d.command = this.command;
        d.onclick = Function.bindAsEventListener(this._onClick,this,0,true);
        return d;
    }
});
/*xjs/ui/ToolbarBtnGroup.java*/
Xjs.ui.ToolbarBtnGroup=function(cfg){
    Xjs.ui.ToolbarBtnGroup.superclass.constructor.call(this,cfg);
};
Xjs.extend(Xjs.ui.ToolbarBtnGroup,Xjs.ui.Container,{
  _js$className_:"Xjs.ui.ToolbarBtnGroup",
    className:"ui-btn-group",
    dftBtnCls:"ui-btn",
    popupMenuCls:"ui-popup-menu",
    /*xjs.ui.ToolbarBtnGroup.getBtnListDOM*/
    getBtnListDOM:function()
    {
        return this.btnListDOM;
    },
    /*xjs.ui.ToolbarBtnGroup._createDOM*/
    _createDOM:function(root)
    {
        var dom = Xjs.ui.ToolbarBtnGroup.superclass._createDom0.call(this,root,"div"),
            dftBtnDOM = Xjs.DOM.findById("default_btn",dom);
        if(!dftBtnDOM)
        {
            dftBtnDOM = Xjs.DOM.createChild(dom,"button",this.dftBtnCls + " dft-group-btn");
            dftBtnDOM.id = "default_btn";
            if(this.dftBtnIconCls)
            {
                var iconHtml = "";
                iconHtml += "<svg class='icon' aria-hidden='true'>";
                iconHtml += "<use xlink:href='#" + this.dftBtnIconCls + "'></use>";
                iconHtml += "</svg>";
                dftBtnDOM.innerHTML = iconHtml;
            }
            var span = Xjs.DOM.createChild(dftBtnDOM,"span","btn-text");
            span.id = "btn_text";
            Xjs.DOM.setTextContent(span,this.title);
            Xjs.DOM.createChild(dftBtnDOM,"i","inner-arrow");
        }
        this.btnListDOM = Xjs.DOM.findById("btn_list",dom);
        if(!this.btnListDOM)
        {
            this.btnListDOM = Xjs.DOM.createChild(dom,"div","ui-btn-list");
            this.btnListDOM.id = "btn_list";
        }
        this.appendItemDoms();
        if(this.popupMenuCls)
        {
            dom.onmouseover = Function.bindAsEventListener(this._onMouseOver,this);
            dom.onmouseout = Function.bindAsEventListener(this._onMouseOut,this);
        }
        return dom;
    },
    /*xjs.ui.ToolbarBtnGroup._onMouseOver*/
    _onMouseOver:function(e)
    {
        Xjs.DOM.addClass(this.dom,this.popupMenuCls);
    },
    /*xjs.ui.ToolbarBtnGroup._onMouseOut*/
    _onMouseOut:function(e)
    {
        Xjs.DOM.removeClass(this.dom,this.popupMenuCls);
    },
    /*xjs.ui.ToolbarBtnGroup.appendItemDoms*/
    appendItemDoms:function()
    {
        if(this.items)
        {
            for(var i=0;i < this.items.length;i++)
            {
                var c = this.items[i];
                this.btnListDOM.appendChild(c.getDOM());
            }
        }
    }
});
/*xjs/ui/Tree.java*/
Xjs.ui.Tree=function(cfg){
    Xjs.ui.Tree.superclass.constructor.call(this,cfg);
};
Xjs.extend(Xjs.ui.Tree,Xjs.ui.Menu,{
  _js$className_:"Xjs.ui.Tree",
    focusableComp:true,
    isItemComp:true,
    seledNodeCls:"select",
    openIconClsOpened:"ui_treeRowmOpenIcon",
    openIconClsClosed:"ui_treeRowpOpenIcon",
    leafIconCls:"ui_treeRowDoc",
    iconClsOpened:"ui_treeRowFolderOpen",
    iconClsClosed:"ui_treeRowFolderClosed",
    lineFromLevl:0,
    rowItemClass:"ui_treeRow",
    className:"ui-tree",
    /*xjs.ui.Tree.getOpenIconCls*/
    getOpenIconCls:function(node,pNodes,i)
    {
        if(pNodes == null)
            pNodes = node.parent != null ? node.parent.nodes : this.nodes;
        var n = pNodes.length,
            isLeaf = node.nodes == null || (node.mflags & 2) != 0;
        if(i == null || i < 0)
            i = pNodes.indexOf(node);
        if(i < 0)
            return null;
        var nodeS = "";
        if(isLeaf)
        {
            return null;
        }
        if(!isLeaf)
        {
            nodeS = node.expanded ? this.openIconClsOpened : this.openIconClsClosed;
        }
        if(node.parent == null && i == 0)
        {
            nodeS += " first";
        } else if(i == n - 1)
        {
            nodeS += " last";
        }
        if(this.openIcons != null)
        {
            var level = Xjs.ui.Menu.getNodeLevel(node);
            if(this.openIcons[level] && this.openIcons[level][nodeS])
                return this.openIcons[level][nodeS];
        }
        return "ui_treeRowCell " + nodeS;
    },
    /*xjs.ui.Tree.getIconCls*/
    getIconCls:function(node)
    {
        var isLeaf = node.nodes == null || (node.mflags & 2) != 0;
        if(this.openIcons != null)
        {
            var level = Xjs.ui.Menu.getNodeLevel(node);
            if(this.openIcons[level])
            {
                var nodeS = isLeaf ? "doc" : (node.expanded ? "folderopen" : "folderclosed"),
                    i = this.openIcons[level][nodeS];
                if(i)
                {
                    i = this.getReplacePath(i);
                    return i == "" ? null : i;
                }
            }
        }
        var cls = isLeaf ? this.leafIconCls : (node.expanded ? this.iconClsOpened : this.iconClsClosed);
        return "ui_treeRowCell " + cls;
    },
    /*xjs.ui.Tree.isLast*/
    isLast:function(node)
    {
        if(node.parent != null)
        {
            var nodes = node.parent.nodes;
            if(nodes != null)
            {
                if(node == nodes[nodes.length - 1])
                {
                    return true;
                }
            }
        }
        return false;
    },
    /*xjs.ui.Tree.onExpand*/
    onExpand:function(node)
    {
        if(node.nodes && node.expanded && !node.childrenDom)
        {
            var lineInfo = [];
            for(var p=node;p != null;p = p.parent)
            {
                if(p.openIconDom != null)
                {
                    var ps = p.parent != null ? p.parent.nodes : this.nodes,
                        nj = ps.length,
                        j = ps.indexOf(p);
                    lineInfo.unshift(j < nj - 1);
                }
            }
            node.childrenDom = this.createTreeDOM(node.nodes,node,lineInfo);
            var nextDom = node.dom.nextSibling,
                parentNode = node.dom.parentNode;
            if(nextDom != null)
                parentNode.insertBefore(node.childrenDom,nextDom);
            else 
                parentNode.appendChild(node.childrenDom);
        }
        if(node.openIconDom != null)
            node.openIconDom.className = this.getOpenIconCls(node);
        if(node.iconDom != null)
            node.iconDom.className = this.getIconCls(node);
    },
    /*xjs.ui.Tree.createTreeDOM*/
    createTreeDOM:function(nodes,parent,lineInfo,toDOM)
    {
        this.setSelectedNode(null);
        var dom = toDOM || document.createElement("div");
        if(this.scrollable)
            dom.style.overflow = "auto";
        if(!nodes || !Xjs.isArray(nodes))
            return dom;
        if(!this.fn$OnClickRow)
        {
            this.fn$OnClickRow = Function.bindAsEventListener(this.onClickRow,this,0,true);
            this.fn$OnDblClickRow = Function.bindAsEventListener(this.onDblClickRow,this,0,true);
        }
        var n = nodes.length,
            level = 1 + Xjs.ui.Menu.getNodeLevel(parent),
            rowHeight = this["lv" + level + "RowHeight"] || this.rowHeight,
            hasDblClickRowE = "onTreeDblClickRow" in this;
        for(var i=0;i < n;i++)
        {
            var node = nodes[i];
            node.parent = parent;
            var content = node.content || "",
                itemDom = node.dom = document.createElement("div");
            if(this.menuItemDomID)
            {
                var id = this.menuItemDomID,
                    p = id.indexOf("{LEVL}");
                if(p >= 0)
                    id = id.substring(0,p) + level + id.substring(p + 6);
                p = id.indexOf("{IDX}");
                if(p >= 0)
                    id = id.substring(0,p) + i + id.substring(p + 5);
                itemDom.id = id;
            }
            if(this.rowItemClass)
                itemDom.className = this.rowItemClass;
            if(rowHeight > 0)
                itemDom.style.height = rowHeight + "px";
            itemDom.onclick = this.fn$OnClickRow;
            if(hasDblClickRowE)
                itemDom.ondblclick = this.fn$OnDblClickRow;
            for(var j=this.lineFromLevl;j < lineInfo.length;j++)
            {
                var lineDom = document.createElement("span");
                lineDom.className = "ui_treeRowCell " + (lineInfo[j] ? "ui_treeRowVertLine" : "ui_treeRowBlank");
                itemDom.appendChild(lineDom);
            }
            var isLeaf = node.nodes == null || (node.mflags & 2) != 0;
            if(isLeaf)
                delete node.expanded;
            else 
            {
                if(parent == null && n <= 1)
                    node.expanded = true;
                if(this.dftExpandToLevl && node.expanded === undefined)
                {
                    if(level < this.dftExpandToLevl)
                        node.expanded = true;
                }
            }
            if(level > 0)
            {
                Xjs.DOM.addClass(itemDom,"ui_treeRowChild");
                var vlineDom = document.createElement("span");
                vlineDom.className = "ui_treeRowCell " + (this.isLast(node) ? "ui_treeRowLastNodeLine" : "ui_treeRowNodeLine");
                itemDom.appendChild(vlineDom);
            }
            var openIconCls = this.getOpenIconCls(node,nodes,i);
            if(openIconCls != null)
            {
                var icon1Dom = node.openIconDom = document.createElement("span");
                icon1Dom.className = openIconCls;
                itemDom.appendChild(icon1Dom);
                icon1Dom._$node = node;
                if(!isLeaf)
                {
                    icon1Dom.onclick = this._$toggleExpand;
                }
            }
            var hrefDom = node.href ? document.createElement("a") : null;
            {
                var icon2Cls = this.getIconCls(node);
                if(icon2Cls != null)
                {
                    var icon2Dom = node.iconDom = document.createElement("span");
                    icon2Dom.className = icon2Cls;
                    if(node.url != null)
                        icon2Dom.style.cursor = "pointer";
                    icon2Dom._$node = node;
                    if(!this.clickOnRow)
                        icon2Dom.onclick = this._$openNode;
                    (hrefDom != null ? hrefDom : itemDom).appendChild(icon2Dom);
                }
            }
            {
                var d;
                if(content . getDOM)
                    d = content.getDOM();
                else 
                {
                    d = document.createElement("span");
                    d.innerHTML = content;
                }
                d.className = "ui_treeRowCell ui_treeRowText";
                d._$node = node;
                if(!this.clickOnRow)
                    d.onclick = this._$openNode;
                var dParent = hrefDom != null ? hrefDom : itemDom;
                if(this.checkNode && node.value !== undefined && (!this.lastLevlOnly || node.nodes == null || (node.mflags & 2) != 0))
                {
                    var name = this.name || this.id;
                    {
                        name += "#" + node.value;
                    }
                    var checkDOM = node.checkDOM = Xjs.isIE && Xjs.$browserVer < 9 ? document.createElement("<input name=\"" + name + "\">") : document.createElement("input");
                    checkDOM.className = "ui_treeRowCell";
                    checkDOM.type = "checkbox";
                    checkDOM.value = node.value;
                    checkDOM.name = name;
                    if(node.checked)
                        checkDOM.checked = true;
                    node._$cdom = d;
                    dParent.appendChild(checkDOM);
                    dParent.appendChild(d);
                    if(this._$onCheckClick == null)
                    {
                        this._$onCheckClick = Function.bindAsEventListener(this._onCheckClick,this);
                    }
                    checkDOM.onclick = this._$onCheckClick;
                } else 
                {
                    dParent.appendChild(d);
                }
            }
            if(hrefDom)
            {
                hrefDom.href = node.href;
                hrefDom.target = node.target || this.target || "_blank";
                hrefDom.className = "ui_treeRowCell";
                hrefDom.style.height = rowHeight + "px";
                itemDom.appendChild(hrefDom);
            }
            itemDom._$node = node;
            dom.appendChild(itemDom);
            if(node.expanded)
            {
                if(openIconCls != null)
                    lineInfo.push(i < n - 1);
                node.childrenDom = this.createTreeDOM(node.nodes,node,lineInfo);
                if(openIconCls != null)
                    lineInfo.pop();
                dom.appendChild(node.childrenDom);
            }
        }
        this._updateChecked();
        return dom;
    },
    /*xjs.ui.Tree.onClickRow*/
    onClickRow:function(e)
    {
        if(this.clickOnRow)
        {
            if(Xjs.DOM.hasClass(e.srcElement || e.target,"ui_treeRowOpenIcon"))
                return;
            this._openNode(e);
        }
    },
    /*xjs.ui.Tree.onDblClickRow*/
    onDblClickRow:function(e)
    {
        {
            var n = Xjs.ui.Menu._getNodeByDOM(e.srcElement || e.target);
            this.fireEvent("onTreeDblClickRow",n,e);
        }
    },
    /*xjs.ui.Tree._createMenuDOM*/
    _createMenuDOM:function(toDOM)
    {
        delete this._$value;
        return this.createTreeDOM(this.nodes,null,[],toDOM);
    },
    /*xjs.ui.Tree.recreateTree*/
    recreateTree:function()
    {
        if(!this.dom)
            return;
        Xjs.DOM.removeAllChild(this.dom);
        this.createTreeDOM(this.nodes,null,[],this.dom);
    },
    /*xjs.ui.Tree._onCheckClick*/
    _onCheckClick:function(e)
    {
        var n = Xjs.ui.Menu._getNodeByDOM(e.srcElement || e.target);
        this.forChecked(n);
        this.onChanged();
    },
    /*xjs.ui.Tree.forChecked*/
    forChecked:function(node)
    {
        if(!node || !node.checkDOM)
            return;
        var _$cdom = node._$cdom;
        if(!_$cdom)
            return;
        if(node.checkDOM.checked)
        {
            _$cdom.style.background = "#316AC5";
            _$cdom.style.color = "#ffffff";
            if(!this.multiple && this.lastCheckedNode != node)
            {
                if(this.lastCheckedNode != null)
                {
                    this.lastCheckedNode.checkDOM.checked = false;
                    this.forChecked(this.lastCheckedNode);
                }
                this.lastCheckedNode = node;
            }
            this.lastCheckedNode = node;
        } else 
        {
            _$cdom.style.background = "";
            _$cdom.style.color = "";
        }
    },
    /*xjs.ui.Tree.setAllValueChecked*/
    setAllValueChecked:function(check,flags)
    {
        delete this._$value;
        this.setAllNodesChecked(this.nodes,check,flags);
        if(flags & 1)
            this.onChanged();
    },
    /*xjs.ui.Tree.setAllNodesChecked*/
    setAllNodesChecked:function(a,check,flags)
    {
        if(a)
            for(var i=0;i < a.length;i++)
            {
                if(a[i].checkDOM)
                {
                    a[i].checkDOM.checked = check;
                    this.forChecked(a[i]);
                }
                if(a[i].nodes && (a[i].expanded || !(flags & 2)))
                    this.setAllNodesChecked(a[i].nodes,check,flags);
            }
    },
    /*xjs.ui.Tree.getValue*/
    getValue:function()
    {
        if(this._$value !== undefined)
            return this._$value;
        if(!this.dom || this.getValueMode == 1)
            return this.value;
        return this._$value = this.value = Xjs.ui.Component.getCheckValues(this.dom,1);
    },
    /*xjs.ui.Tree.setValue*/
    setValue:function(value)
    {
        this.value = value;
        var oldValue = this.getValue();
        this._updateChecked();
        if(this.dom != null && oldValue != this.getValue())
            this.fireEvent("valueChanged");
    },
    /*xjs.ui.Tree._updateChecked*/
    _updateChecked:function()
    {
        delete this._$value;
        this._$valueA = this.value != null ? this.value.split(",").sort() : null;
        this._updateNodesChecked(this.nodes);
    },
    /*xjs.ui.Tree._updateNodesChecked*/
    _updateNodesChecked:function(nodes)
    {
        if(nodes == null)
            return;
        var nNodes = nodes.length;
        for(var i=0;i < nNodes;i++)
        {
            var n = nodes[i];
            n.checked = this._$valueA != null && Array.binarySearch(this._$valueA,n.value) >= 0;
            if(n.checkDOM != null && n.checkDOM.checked != n.checked)
            {
                n.checkDOM.checked = n.checked;
                this.forChecked(n);
            }
            this._updateNodesChecked(n.nodes);
        }
    }
});
/*xjs/ui/UTIL.java*/
Xjs.ui.UTIL = {
    /*xjs.ui.UTIL.atRectCenter*/
    atRectCenter:function(x,y,rect,delta)
    {
        var x0 = (rect.left || 0) + rect.width / 2;
        if(x < x0 - delta || x > x0 + delta)
            return false;
        var y0 = (rect.top || 0) + rect.height / 2;
        return y >= y0 - delta && y <= y0 + delta;
    },
    /*xjs.ui.UTIL._atCell*/
    _atCell:function(x,y,cellDOM,delta)
    {
        var y0 = cellDOM.offsetTop + cellDOM.offsetHeight / 2;
        if(y < y0 - delta || y > y0 + delta)
            return false;
        var x0 = cellDOM.offsetLeft + cellDOM.offsetWidth / 2;
        return x >= x0 - delta && x <= x0 + delta;
    }
};
/*xjs/ui/ValueField.java*/
Xjs.ui.ValueField=function(config){
    Xjs.ui.ValueField.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.ValueField,Xjs.ui.Component,{
  _js$className_:"Xjs.ui.ValueField",
    domTag:"div",
    className:"ui-valuefield",
    /*xjs.ui.ValueField.toDisplayText*/
    toDisplayText:function(value)
    {
        var info = {mainComp:null,cell:this,html:!!this.html},
            s = this.renderer ? this.renderer.cellRender(value,info) : Xjs.ui.CellRenderer.defaultRenderer(value,info);
        this._html = info.html;
        return s || "";
    },
    /*xjs.ui.ValueField.onDomCreated*/
    onDomCreated:function(root)
    {
        Xjs.ui.ValueField.superclass.onDomCreated.call(this,root);
        this.dom.tabIndex = 0;
        this.updateHTML();
    },
    /*xjs.ui.ValueField.updateHTML*/
    updateHTML:function()
    {
        if(this.dom)
        {
            var s = this.displayValue || this.toDisplayText(this.value);
            if(s instanceof HTMLElement || s instanceof DocumentFragment)
            {
                Xjs.DOM.removeAllChild(this.dom);
                this.dom.appendChild(s);
            } else if(this._html)
            {
                this.dom.innerHTML = s;
            } else if(this.showMutiline)
            {
                this.dom.innerHTML = Xjs.HtmlUTIL.htmlEncode(s);
            } else 
            {
                Xjs.DOM.setTextContent(this.dom,s);
            }
        }
    },
    /*xjs.ui.ValueField.setValue*/
    setValue:function(value,displayValue,opts)
    {
        var oldValue = this.value;
        this.value = value;
        this.displayValue = displayValue;
        if(this.dom)
            this.updateHTML();
        if(oldValue != this.value)
            this.fireEvent("valueChanged",null,1);
    },
    /*xjs.ui.ValueField.doAidInput*/
    doAidInput:function()
    {
        if(this.aidInputer)
        {
            this.fireEvent("doAidInputing",this.forTblColumn || this);
            this.aidInputer.doAidInput(this,this.getValue(),null);
        }
    },
    /*xjs.ui.ValueField.getValue*/
    getValue:function()
    {
        return this.value;
    }
});
/*xjs/ui/ValueList.java*/
Xjs.ui.ValueList=function(config){
    Xjs.ui.ValueList.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.ValueList,Xjs.ui.ULComponent,{
  _js$className_:"Xjs.ui.ValueList",
    liHTML:"${VALUE}<span id=\"DelItemIcon\"></span>",
    className:"ui-valueinputbox",
    domTag:"div",
    displayValueOutofdate:true,
    /*xjs.ui.ValueList._createDOM*/
    _createDOM:function(root)
    {
        var d = Xjs.ui.ValueList.superclass._createDOM.call(this,root);
        if(this.aidInputer && this.domTag)
        {
            this.comboDOM = Xjs.DOM.createChild(d,"span","ui-input-combobtn");
            this.comboDOM.onclick = Function.bindAsEventListener(this._onComboIconClick,this,0,true);
        }
        d.tabIndex = 0;
        d.onfocus = Function.bindAsEventListener(this._onFocus,this,0,true);
        d.onblur = Function.bindAsEventListener(this._onBlur,this);
        return d;
    },
    /*xjs.ui.ValueList.updateReadonlyStatus*/
    updateReadonlyStatus:function()
    {
        this.updateComboIcon();
        this._updateClass();
    },
    /*xjs.ui.ValueList._updateClass*/
    _updateClass:function()
    {
        if(!this.dom)
            return;
        var cls = this.className;
        if(this.isReadonly())
            cls += " ui-readonly";
        this.dom.className = cls;
    },
    /*xjs.ui.ValueList.onDomCreated*/
    onDomCreated:function(root)
    {
        Xjs.ui.ValueList.superclass.onDomCreated.call(this,root);
        this._updateClass();
    },
    /*xjs.ui.ValueList.isReadonly*/
    isReadonly:function()
    {
        return !!this.readOnly || this.compEditable && this.compEditable.isEditReadonly(this);
    },
    /*xjs.ui.ValueList.isComboVisible*/
    isComboVisible:function()
    {
        return this.aidInputer != null && !this.isReadonly();
    },
    /*xjs.ui.ValueList.updateComboIcon*/
    updateComboIcon:function()
    {
        if(this.comboDOM)
        {
            this.comboDOM.style.display = this.isComboVisible() ? "" : "none";
        }
    },
    /*xjs.ui.ValueList.renderList*/
    renderList:function()
    {
        if(this.ulDOM == null)
            return;
        if(this.displayValueOutofdate)
        {
            this.updateDisplayValues();
        }
        var n = this.values.size(),
            vals = new Array(n);
        for(var j=0;j < vals.length;j++)
        {
            vals[j] = this.values.get(j);
        }
        if(this.displayValCmp)
            vals.sort(this.displayValCmp);
        var i = 0;
        for(;i < n || i < this.ulDOM.childNodes.length;)
        {
            if(i >= n)
            {
                this.ulDOM.removeChild(this.ulDOM.childNodes[i]);
                continue;
            }
            var v1 = vals[i];
            if(i >= this.ulDOM.childNodes.length)
            {
                this.ulDOM.appendChild(this.createLI(v1));
                i++;
                continue;
            }
            var v2 = this.ulDOM.childNodes[i]._value,
                c;
            c = this.displayValCmp ? this.displayValCmp(v1,v2) : Xjs.objCmp(v1,v2);
            if(c == 0)
            {
                i++;
                continue;
            }
            if(c < 0)
            {
                this.ulDOM.insertBefore(this.createLI(v1),this.ulDOM.childNodes[i]);
                i++;
            } else 
            {
                this.ulDOM.removeChild(this.ulDOM.childNodes[i]);
                continue;
            }
        }
    },
    /*xjs.ui.ValueList.setSelectOptions*/
    setSelectOptions:function(selectOptions)
    {
        if(selectOptions != this.selectOptions)
        {
            this.displayValueOutofdate = true;
            this.selectOptions = selectOptions;
            this.dislayValues = {};
        }
    },
    /*xjs.ui.ValueList.updateDisplayValues*/
    updateDisplayValues:function()
    {
        if(this.dislayValues == null)
            this.dislayValues = {};
        var selectOptions = this.selectOptions;
        if(selectOptions == null)
            return;
        this.displayValueOutofdate = false;
        var a = [],
            n = this.values.size();
        for(var i=0;i < n;i++)
        {
            var code = this.values.get(i);
            if(code == null)
                continue;
            if(typeof(code) == "string")
            {
                var p = code.indexOf(':');
                if(p >= 0)
                    code = code.substring(0,p);
            }
            var nm = this.dislayValues[code];
            if(nm == null)
                a.push(code);
        }
        if(a.length > 0)
        {
            if(selectOptions . getCodeNames)
            {
                var codeData = selectOptions,
                    na = codeData.getCodeNames(a);
                if(na != null)
                    for(var j=0;j < a.length;j++)
                        this.dislayValues[a[j]] = na[j];
            } else if(Xjs.isArray(selectOptions))
            {
                var rows = selectOptions;
                for(var j=0;j < a.length;j++)
                {
                    var s = Xjs.ui.ValueList.getSeloptsName(a[j],rows);
                    this.dislayValues[a[j]] = s;
                }
            }
        }
    },
    /*xjs.ui.ValueList.addItem*/
    addItem:function(value,fireChanged)
    {
        if(value == null || this.values.indexOf(value) >= 0)
            return false;
        this.displayValueOutofdate = true;
        this.values.add(value);
        this.renderList();
        if(fireChanged)
            this.onChanged();
        return true;
    },
    /*xjs.ui.ValueList.removeItem*/
    removeItem:function(value,fireChanged)
    {
        if(value == null || this.values.indexOf(value) < 0)
            return false;
        this.displayValueOutofdate = true;
        this.values.remove(value);
        this.renderList();
        if(fireChanged)
            this.onChanged();
        return true;
    },
    /*xjs.ui.ValueList.setValue*/
    setValue:function(value)
    {
        if(this.updateValues(value))
        {
            this.displayValueOutofdate = true;
            this.renderList();
            this.onChanged(null,1);
        }
    },
    /*xjs.ui.ValueList.onItemDelClick*/
    onItemDelClick:function(ev)
    {
        if(this.isReadonly())
            return;
        var target = ev.srcElement || ev.target,
            li = Xjs.DOM.getParentForTag(target,"LI");
        if(li == null)
            return;
        this.removeItem(li._value,true);
    },
    /*xjs.ui.ValueList._onComboIconClick*/
    _onComboIconClick:function(e)
    {
        this.doAidInput();
    },
    /*xjs.ui.ValueList.doAidInput*/
    doAidInput:function()
    {
        if(this.aidInputer)
        {
            this.fireEvent("doAidInputing",this.forTblColumn || this);
            this.aidInputer.doAidInput(this,this.getValue(),this.comboAlignRect == null ? null : {alignRect:this.comboAlignRect});
        }
    },
    /*xjs.ui.ValueList._onFocus*/
    _onFocus:function(e)
    {
        this._focused = true;
        this.fireEvent("focusGained");
    },
    /*xjs.ui.ValueList._onBlur*/
    _onBlur:function(e)
    {
        this._focused = false;
    }
});
Xjs.apply(Xjs.ui.ValueList,{
    /*xjs.ui.ValueList.getSeloptsName*/
    getSeloptsName:function(v,optData)
    {
        if(v == null)
            return null;
        if(optData != null)
            for(var i=0;i < optData.length;i++)
            {
                var a = optData[i];
                if(!Xjs.isArray(a))
                    a = [a];
                var value = a[0];
                if(v == value)
                {
                    return a.length < 2 ? a[0] : a[1];
                }
            }
        return v.toString();
    }
});
/*xjs/ui/canvas/ColorCanvasRender.java*/
Xjs.namespace("Xjs.ui.canvas");
Xjs.ui.canvas.ColorCanvasRender=function(color){
    this.color = color;
};
Xjs.apply(Xjs.ui.canvas.ColorCanvasRender.prototype,{
    /*xjs.ui.canvas.ColorCanvasRender.setShadowColor*/
    setShadowColor:function(shadowColor,shadowDeep,shadowOpts)
    {
        this.shadowColor = shadowColor;
        this.shadowDeep = shadowDeep;
        this.shadowOpts = shadowOpts;
    },
    /*xjs.ui.canvas.ColorCanvasRender.setShape*/
    setShape:function(shape)
    {
        this.shape = shape;
    },
    /*xjs.ui.canvas.ColorCanvasRender.canvasRender*/
    canvasRender:function(ctx,x,y,w,h)
    {
        if(this.shadowColor && this.shadowDeep)
        {
            ctx.fillStyle = this.shadowColor;
            var x1 = x + w,
                y1 = y + this.shadowDeep,
                w1 = this.shadowDeep,
                h1 = this.shadowOpts & 1 ? h - this.shadowDeep : h;
            if(this.shape == 1)
            {
                ctx.beginPath();
                ctx.arc(x1 + w1 / 2,y1 + w1 / 2,w1 / 2,0,2 * Math.PI,false);
                ctx.closePath();
                ctx.fill();
            } else 
                ctx.fillRect(x1,y1,w1,h1);
        }
        ctx.fillStyle = this.color;
        if(this.shape == 1)
        {
            ctx.beginPath();
            ctx.arc(x + w / 2,y + w / 2,w / 2,0,2 * Math.PI,false);
            ctx.closePath();
            ctx.fill();
        } else 
            ctx.fillRect(x,y,w,h);
    },
    /*xjs.ui.canvas.ColorCanvasRender.preparedDraw*/
    preparedDraw:Xjs.trueFn
});
/*xjs/ui/canvas/ImageCanvasRender.java*/
Xjs.ui.canvas.ImageCanvasRender=function(image,srcRect){
    this.image = image;
    this.srcRect = srcRect;
};
Xjs.apply(Xjs.ui.canvas.ImageCanvasRender.prototype,{
    /*xjs.ui.canvas.ImageCanvasRender.canvasRender*/
    canvasRender:function(ctx,x,y,w,h)
    {
        if(this.srcRect == null)
        {
            if(w > 0 && h > 0)
                ctx.drawImage(this.image,x,y,w,h);
            else 
                ctx.drawImage(this.image,x,y);
        } else 
        {
            ctx.drawImage(this.image,this.srcRect.x,this.srcRect.y,this.srcRect.width,this.srcRect.height,x,y,w,h);
        }
    },
    /*xjs.ui.canvas.ImageCanvasRender.preparedDraw*/
    preparedDraw:function()
    {
        return this.image ? this.image.complete : true;
    }
});
/*xjs/ui/img/ImageFileRender.java*/
Xjs.namespace("Xjs.ui.img");
Xjs.ui.img.ImageFileRender=function(params){
    if(!params)
    {
        this.showNuImg = true;
        this.openOnBlank = false;
        this.mode = 3;
    } else 
    {
        this.showNuImg = params.showNuImg == null ? true : params.showNuImg;
        this.openOnBlank = params.openOnBlank == null ? false : params.openOnBlank;
        this.mode = String.obj2int(params.mode,3);
    }
};
Xjs.apply(Xjs.ui.img.ImageFileRender.prototype,{
    /*xjs.ui.img.ImageFileRender.cellRender*/
    cellRender:function(value,info)
    {
        info.cell.html = true;
        info.html = true;
        info.forEdit = false;
        var table = info.cell.table,
            innerfld = this.initAuth(table),
            authparams = [table.dataSet.getTableName(),table.dataSet.getValue(innerfld,info.row),info.cell.name,this.lmso],
            path = value;
        if(Xjs.table.util.AttachmentUrlBuilder.isImageFile(path))
        {
            if(value && !path.endsWith(Xjs.table.util.AttachmentUrlBuilder.encodeZPPrefix) && path.split("|").length == 2)
            {
                path = Xjs.table.util.AttachmentUrlBuilder.encodeURIComponent(path);
            }
            info.className = Xjs.ui.img.TableImagesCellDom.tdPaddingClass;
            info.fclassName = Xjs.ui.img.TableImagesCellDom.tdPaddingClass;
            if(!this.openOnBlank)
            {
                path = path + "#" + this.getImgTitle(info);
            }
            return Xjs.ui.img.ImageFileRender.appendImageDomAndBindFc(path,this.showNuImg,authparams,this.openOnBlank,this.mode);
        } else 
        {
            return Xjs.ui.img.ImageFileRender.appendFileNameDomAndBindFc(path,authparams);
        }
    },
    /*xjs.ui.img.ImageFileRender.getImgTitle*/
    getImgTitle:function(info)
    {
        return "图片";
    },
    /*xjs.ui.img.ImageFileRender.initAuth*/
    initAuth:function(table)
    {
        if(!this.lmso)
        {
            var dataStore = table.dataSet.dataStore;
            this.lmso = dataStore.getClientProp("FileLimitSC_Lmso");
        }
        return table.dataSet.getCuInnerfld();
    }
});
Xjs.apply(Xjs.ui.img.ImageFileRender,{
    /*xjs.ui.img.ImageFileRender._onClickImg*/
    _onClickImg:function(e,imgPath)
    {
        Xjs.ui.img.TableImagesCellDom.appenViewDom([imgPath],null);
    },
    /*xjs.ui.img.ImageFileRender._onClickImgOnBlank*/
    _onClickImgOnBlank:function(e,imgPath)
    {
        window.open(Xjs.table.util.AttachmentUrlBuilder.canlThumbnailPath(true,imgPath));
    },
    /*xjs.ui.img.ImageFileRender.appendImageDomAndBindFc*/
    appendImageDomAndBindFc:function(imgPath,showNuImg,authparams,openOnBlank,mode)
    {
        var dom = Xjs.DOM.createChild(null,"div","ui-opt-imgwrap"),
            imgDOM = Xjs.DOM.createChild(dom,"img","img");
        mode = mode || 3;
        imgDOM.src = Xjs.table.util.AttachmentUrlBuilder.buildDownLoadUrl(imgPath,mode,authparams);
        if(imgPath)
        {
            if(openOnBlank)
            {
                dom.onclick = this._onClickImgOnBlank.createDelegate(this,[imgPath],true);
            } else 
            {
                dom.onclick = this._onClickImg.createDelegate(this,[imgPath],true);
            }
        } else if(!showNuImg)
        {
            return null;
        } else 
        {
            dom.title = "暂无图片";
        }
        return dom;
    },
    /*xjs.ui.img.ImageFileRender.appendFileNameDomAndBindFc*/
    appendFileNameDomAndBindFc:function(path,authparams)
    {
        if(path == null || path == "")
        {
            return null;
        }
        var href = Xjs.table.util.AttachmentUrlBuilder.buildDownLoadUrl(path,1,authparams),
            fileName = Xjs.table.util.AttachmentUrlBuilder.getFileName(path);
        return "<div style=\"text-align: center;\"><a href=\"" + href + "\" target=\"_blank\">" + fileName + "</a></div>";
    }
});
/*xjs/ui/img/TableImagesCellDom.java*/
Xjs.ui.img.TableImagesCellDom$ImgLayer=function(title){
    this.createDOM();
    this.swiper = this.initSwiper();
};
Xjs.apply(Xjs.ui.img.TableImagesCellDom$ImgLayer.prototype,{
    wrap_Id:"UI_Image_View_SwiperWrap",
    cover_Id:"UI_Image_View_SwiperCover",
    container_Id:"UI_Image_View_SwiperWrapper_Container",
    page_Id:"UI_Image_View_SwiperWrapper_pagination",
    prev_Id:"UI_Image_View_SwiperWrapper_prev",
    next_Id:"UI_Image_View_SwiperWrapper_next",
    /*xjs.ui.img.TableImagesCellDom$ImgLayer.createDOM*/
    createDOM:function()
    {
        var coverDom = Xjs.DOM.findById(this.cover_Id,document.body),
            wrapDom = Xjs.DOM.findById(this.wrap_Id,document.body);
        if(!wrapDom || !coverDom)
        {
            this.swiperCover = Xjs.DOM.createChild(document.body,"div","swiper-cover");
            this.swiperWrap = Xjs.DOM.createChild(document.body,"div","swiper-wrapper-box");
            this.swiperWrap.id = this.wrap_Id;
            var wrapper = Xjs.DOM.createChild(this.swiperWrap,"div","swiper-img-wrapper"),
                closeBtn = Xjs.DOM.createChild(wrapper,"span","swiper-wrapper-close");
            closeBtn.onclick = Function.bindAsEventListener(this.hide,this);
            var container = Xjs.DOM.createChild(wrapper,"div","swiper-container"),
                con = Xjs.DOM.createChild(container,"div","swiper-wrapper");
            con.id = this.container_Id;
            var page = Xjs.DOM.createChild(wrapper,"div","swiper-pagination");
            page.id = this.page_Id;
            var prev = Xjs.DOM.createChild(wrapper,"div","swiper-button-prev");
            prev.id = this.prev_Id;
            var next = Xjs.DOM.createChild(wrapper,"div","swiper-button-next");
            next.id = this.next_Id;
        } else 
        {
            this.swiperCover = coverDom;
            this.swiperWrap = wrapDom;
        }
    },
    /*xjs.ui.img.TableImagesCellDom$ImgLayer.updateImagesDom*/
    updateImagesDom:function(imgs,title)
    {
        var conDom = Xjs.DOM.findById(this.container_Id,this.swiperWrap);
        if(!conDom)
        {
            return;
        }
        Xjs.DOM.removeAllChild(conDom);
        for(var i=0;i < imgs.length;i++)
        {
            var p = imgs[i].lastIndexOf("#"),
                src,
                _title;
            if(p > -1)
            {
                _title = imgs[i].substring(p + 1);
                src = imgs[i].substring(0,p);
            } else 
            {
                _title = title;
                src = imgs[i];
            }
            var item = Xjs.DOM.createChild(conDom,"div","swiper-slide"),
                itemTitle = Xjs.DOM.createChild(item,"div","swiper-img-title");
            Xjs.DOM.setTextContent(itemTitle,_title);
            var imgWrap = Xjs.DOM.createChild(item,"div","swiper-wrap-img"),
                itemImg = Xjs.DOM.createChild(imgWrap,"img");
            itemImg.src = Xjs.table.util.AttachmentUrlBuilder.buildDownLoadUrl(src,1,["","",""]);
        }
        var display = "block";
        if(imgs.length == 1)
        {
            display = "none";
        }
        var page = Xjs.DOM.findById(this.page_Id,this.swiperWrap),
            prev = Xjs.DOM.findById(this.prev_Id,this.swiperWrap),
            next = Xjs.DOM.findById(this.next_Id,this.swiperWrap);
        page.style.display = display;
        prev.style.display = display;
        next.style.display = display;
    },
    /*xjs.ui.img.TableImagesCellDom$ImgLayer.updateZIndex*/
    updateZIndex:function(isClose)
    {
        var mask = Xjs.DOM.findAll(".ui-mask",document.body);
        if(!mask || mask.length == 0)
        {
            this.swiperCover.style.zIndex = Xjs.ui.Panel.nextZIndex();
            this.swiperWrap.style.zIndex = Xjs.ui.Panel.nextZIndex() + 1000;
            return;
        }
        this.swiperCover.style.display = "none";
        if(isClose)
        {
            mask[this.lastIndex].style.zIndex = this.lastMax;
            this.swiperWrap.style.zIndex = this.initBoxMax;
        } else 
        {
            var maxIndex = 0,
                max = 0;
            for(var i=0;i < mask.length;i++)
            {
                var zindex = mask[i].style.zIndex;
                if(max < zindex)
                {
                    max = zindex;
                    maxIndex = i;
                }
            }
            maxIndex = String.obj2int(maxIndex,0);
            max = String.obj2int(max,0);
            this.lastIndex = maxIndex;
            this.lastMax = max;
            max += 1000;
            mask[maxIndex].style.zIndex = max;
            this.initBoxMax = this.swiperWrap.style.zIndex;
            this.swiperWrap.style.zIndex = max + 1000;
        }
    },
    /*xjs.ui.img.TableImagesCellDom$ImgLayer.show*/
    show:function(imgs,title)
    {
        this.swiperCover.style.display = "block";
        this.swiperWrap.style.display = "block";
        this.updateZIndex(false);
        this.updateImagesDom(imgs,title);
        this.swiper.slideTo(0,0,false);
        this.swiper.update();
    },
    /*xjs.ui.img.TableImagesCellDom$ImgLayer.initSwiper*/
    initSwiper:function()
    {
        if(!this.swiper)
        {
            var options = {},
                pagination = {};
            pagination.el = ".swiper-pagination";
            pagination.type = "fraction";
            options.pagination = pagination;
            var navigation = {};
            navigation.nextEl = ".swiper-button-next";
            navigation.prevEl = ".swiper-button-prev";
            options.navigation = navigation;
            this.swiper = new Swiper(".swiper-container",options);
        }
        return this.swiper;
    },
    /*xjs.ui.img.TableImagesCellDom$ImgLayer.hide*/
    hide:function()
    {
        this.updateZIndex(true);
        this.swiperCover.style.display = "none";
        this.swiperWrap.style.display = "none";
    }
});
Xjs.ui.img.TableImagesCellDom=function(){};
Xjs.apply(Xjs.ui.img.TableImagesCellDom,{
    tdPaddingClass:" ui-opt-imgcell",
    /*xjs.ui.img.TableImagesCellDom.appenViewDom*/
    appenViewDom:function(imgs,title)
    {
        Xjs.JsLoad.load(Xjs.ROOTPATH + "jslib/swiper/swiper.min.js",2);
        if(!Xjs.ui.img.TableImagesCellDom.layer)
        {
            Xjs.ui.img.TableImagesCellDom.layer = new Xjs.ui.img.TableImagesCellDom$ImgLayer(title);
        }
        if(!title)
        {
            title = "图片";
        }
        Xjs.ui.img.TableImagesCellDom.layer.show(imgs,title);
    }
});
/*xjs/ui/layout/BorderLayout.java*/
Xjs.ui.BorderLayout=function(cfg){
    Xjs.ui.BorderLayout.superclass.constructor.call(this,cfg);
};
Xjs.extend(Xjs.ui.BorderLayout,Xjs.ui.Layout,{
  _js$className_:"Xjs.ui.BorderLayout",
    /*xjs.ui.layout.BorderLayout.attachItemDoms*/
    attachItemDoms:function(parent,indom,root)
    {
        this.parent = parent;
        this.nsOnly = true;
        var a = parent.items;
        this.centers = null;
        if(a)
            for(var i=0;i < a.length;i++)
            {
                var r = a[i].region;
                if(r == "null")
                    continue;
                var e = a[i].getDOM(indom);
                if(!e.parentNode)
                    indom.appendChild(e);
                if(r == "west" || r == "east")
                    this.nsOnly = false;
                else if(r != "north" && r != "south")
                {
                    if(!this.centers)
                        this.centers = [];
                    this.centers.push(a[i]);
                }
            }
        return true;
    },
    /*xjs.ui.layout.BorderLayout.onResize*/
    onResize:function()
    {
        if(!this.centers)
            return;
        var dom = this.parent.getResizePDOM(),
            a = this.parent.items;
        if(this.nsOnly)
        {
            var h = Xjs.DOM.getHeight(dom) - Xjs.DOM.getPadding(dom,"tb") - Xjs.DOM.getBorder(dom,"tb"),
                lastMargin = 0;
            if(a)
                for(var i=0;i < a.length;i++)
                {
                    var c = a[i];
                    if(c.region == "null")
                        continue;
                    var d = c.getDOM(dom);
                    if(!d)
                        continue;
                    if(!Xjs.DOM.isShowing(d))
                        continue;
                    if(this.centers.indexOf(a[i]) < 0)
                        h -= Xjs.DOM.getHeight(d);
                    var m = Xjs.DOM.getMargins(d,"t");
                    h -= m < lastMargin ? lastMargin : m;
                    lastMargin = Xjs.DOM.getMargins(d,"b");
                }
            for(var j=0;j < this.centers.length;j++)
            {
                this.centers[j].setHeight(h - lastMargin);
            }
            return;
        }
        var lx = 0,
            rx = 0,
            ty = 0,
            by = 0,
            th = Xjs.DOM.getHeight(dom),
            tw = Xjs.DOM.getWidth(dom);
        if(a)
            for(var i=0;i < a.length;i++)
            {
                var c = a[i],
                    r = c.region;
                if(r == "null")
                    continue;
                var d = c.getDOM(this.parent.dom);
                if(!d)
                    continue;
                if(d.parentNode != this.parent.dom)
                    this.parent.dom.appendChild(d);
                if(!Xjs.DOM.isShowing(d))
                    continue;
                var h,
                    w;
                d.style.position = "absolute";
                var s = d.style;
                if(r)
                    switch(r)
                    {
                    case "north":
                        s.top = ty + "px";
                        s.left = lx + "px";
                        s.right = rx + "px";
                        h = Xjs.DOM.getHeight(d);
                        th -= h;
                        ty += h;
                        break;
                    case "south":
                        s.bottom = by + "px";
                        s.left = lx + "px";
                        s.right = rx + "bx";
                        h = Xjs.DOM.getHeight(d);
                        th -= h;
                        by += h;
                        break;
                    case "west":
                        s.left = lx + "px";
                        s.top = ty + "px";
                        s.bottom = by + "px";
                        w = Xjs.DOM.getWidth(d);
                        tw -= w;
                        lx += w;
                        break;
                    case "east":
                        s.right = rx + "px";
                        s.top = ty + "px";
                        s.bottom = by + "px";
                        w = Xjs.DOM.getWidth(d);
                        tw -= w;
                        rx += w;
                        break;
                    }
            }
        for(var j=0;j < this.centers.length;j++)
        {
            var c = this.centers[j];
            c.dom.style.top = ty + "px";
            c.dom.style.left = lx + "px";
            c.setSize(tw,th);
        }
    }
});
/*xjs/ui/layout/DefaultLayout.java*/
Xjs.ui.DefaultLayout=function(cfg){
    Xjs.ui.DefaultLayout.superclass.constructor.call(this,cfg);
};
Xjs.extend(Xjs.ui.DefaultLayout,Xjs.ui.Layout,{
  _js$className_:"Xjs.ui.DefaultLayout",
    /*xjs.ui.layout.DefaultLayout.attachItemDoms*/
    attachItemDoms:function(parent,indom,root)
    {
        if(parent.items)
            for(var i=0;i < parent.items.length;i++)
            {
                var c = parent.items[i],
                    _rootDOM,
                    e = c.getDOM((_rootDOM = c._rootDOM) || root);
                if(this.opts & 1 && _rootDOM)
                {
                    indom.appendChild(_rootDOM);
                } else if(e && indom)
                {
                    indom.appendChild(c._getDomToAppendParent(e));
                }
            }
        return true;
    }
});
/*xjs/ui/layout/FitParentSize.java*/
Xjs.namespace("Xjs.ui.layout");
Xjs.ui.layout.FitParentSize=function(comp,cfg){
    this.comp = comp;
    Xjs.apply(this,cfg);
    this.hRemove = Xjs.ui.layout.FitParentSize.toDOM(this.hRemove);
    Xjs.DOM.addOnWinResize(this.onResize,this,null);
};
Xjs.apply(Xjs.ui.layout.FitParentSize.prototype,{
    /*xjs.ui.layout.FitParentSize.onResize*/
    onResize:function()
    {
        if(this.timeout > 0)
        {
            if(!this.fn$doOnResize)
                this.fn$doOnResize = this.doOnResize.createDelegate(this);
            setTimeout(this.fn$doOnResize,this.timeout);
        } else 
        {
            this.doOnResize();
        }
    },
    /*xjs.ui.layout.FitParentSize.doOnResize*/
    doOnResize:function()
    {
        var e = this.comp._getSizeDOM();
        if(!e || !e.parentNode)
            return;
        if(this.flags & 1)
        {
            var h;
            if(this.flags & 4)
            {
                h = Xjs.DOM.getViewportHeight();
                if(this.flags & 0x10)
                {
                    h -= Xjs.DOM.getXY(e,false).y;
                }
            } else 
            {
                h = Xjs.DOM.getHeight(e.parentNode);
                if(this.flags & 0x10)
                    h -= e.offsetTop;
                if(this.flags & 0x100)
                {
                    var n = e;
                    for(;;)
                    {
                        n = n.nextElementSibling || n.nextSibling;
                        if(!n)
                            break;
                        h -= Xjs.DOM.getHeight(n);
                    }
                }
            }
            this.comp.setFitParentHeight(h,this.oheight);
        }
        if(this.flags & 2)
        {
            var w = Xjs.DOM.getWidth(e.parentNode);
            if(this.flags & 0x2000)
            {
                var n = e;
                for(;;)
                {
                    n = e.previousElementSibling;
                    if(!n)
                        break;
                    w -= Xjs.DOM.getWidth(n);
                }
            }
            if(this.flags & 0x200)
            {
                var n = e;
                for(;;)
                {
                    n = e.nextElementSibling;
                    if(!n)
                        break;
                    w -= Xjs.DOM.getWidth(n);
                }
            }
            this.comp.setWidth(w >= 0 ? w : 0);
        }
    }
});
Xjs.apply(Xjs.ui.layout.FitParentSize,{
    /*xjs.ui.layout.FitParentSize.toDOM*/
    toDOM:function(a)
    {
        if(a == null)
            return null;
        var ea = [];
        for(var i=0;i < a.length;i++)
        {
            if(typeof(a[i]) == "string")
                ea[i] = Xjs.DOM.find(a[i],null);
            else 
                ea[i] = a[i];
        }
        return ea;
    },
    /*xjs.ui.layout.FitParentSize.setMaxHeight*/
    setMaxHeight:function(dom,pmaxH,pdom)
    {
        var totalH = Xjs.DOM.getHeight(pdom),
            h = Xjs.DOM.getHeight(dom),
            mh = pmaxH - totalH + h - Xjs.DOM.getPadding(dom,"tb");
        dom.style.maxHeight = mh > 0 ? mh + "px" : "";
    }
});
/*xjs/ui/layout/GridLayout.java*/
Xjs.ui.GridLayout=function(config){
    Xjs.ui.GridLayout.superclass.constructor.call(this,config);
    var opts;
    if(window.xjsConfig && (opts = window.xjsConfig.glayoutOpts))
    {
        Xjs.applyIf(this,opts);
    }
};
Xjs.extend(Xjs.ui.GridLayout,Xjs.ui.Layout,{
  _js$className_:"Xjs.ui.GridLayout",
    borderColor:"#B2B2B2",
    ignoreInvisible:true,
    labelClassB:"td_label td_labelb",
    labelClass:"td_label",
    labelHtml:"<span class=\"lb_flag\">*</span>${TEXT}",
    /*xjs.ui.layout.GridLayout.attachItemDoms*/
    attachItemDoms:function(parent,indom,root)
    {
        var tableDOM = this.createTableDom(parent);
        if(indom)
        {
            indom.appendChild(tableDOM);
        }
        return true;
    },
    /*xjs.ui.layout.GridLayout.createTableDom*/
    createTableDom:function(parent)
    {
        var tableDOM;
        tableDOM = document.createElement("table");
        tableDOM.id = "_GridLayout";
        var cn = this.className || parent.layoutGridClsName;
        if(!cn)
        {
            cn = this.border > 0 ? "ui_bgridlayout" : "ui_gridlayout";
        }
        tableDOM.className = cn;
        if(this.border > 0)
        {
            tableDOM.borderColor = this.borderColor;
        }
        if(this.border)
            tableDOM.border = this.border;
        if(this.cWidths)
        {
            this.tableColGrp = Xjs.DOM.createChild(tableDOM,"colgroup");
        }
        this.tableBody = Xjs.DOM.createChild(tableDOM,"tbody");
        if(this.width != null)
            tableDOM.style.width = this.width;
        if(this.height != null)
            tableDOM.style.height = this.height;
        if(this.align != null)
            tableDOM.align = this.align;
        if(this.createAttachID)
        {
            var mparent = parent;
            for(;mparent != null;mparent = mparent.parent)
            {
                if(mparent.mainUI & 3)
                    break;
            }
            if(mparent)
            {
                this.nmPrefix = "UI_" + mparent.name + "_";
                this.lbNamePewfix = "lb_UI_" + mparent.name + "_";
                this.opNamePewfix = "op_UI_" + mparent.name + "_";
            }
        }
        if(this.cellSpacing >= 0)
            tableDOM.cellSpacing = this.cellSpacing;
        if(this.cellPadding >= 0)
            tableDOM.cellPadding = this.cellPadding;
        this.layoutItems(parent);
        return tableDOM;
    },
    /*xjs.ui.layout.GridLayout.relayoutItems*/
    relayoutItems:function(parent)
    {
        this.layoutItems(parent);
    },
    /*xjs.ui.layout.GridLayout.layoutItems*/
    layoutItems:function(parent)
    {
        var items = parent.items;
        if(parent instanceof Xjs.ui.Panel && parent.btnsLayoutMode == 2 && parent.buttons && parent.buttons.length > 0)
        {
            items = items == null ? [] : Array.cloneArray(items);
            parent._createButtonsDomTo({margin:"0px 4px"},null,null);
            var btns = parent.buttons;
            for(var i=0;i < btns.length;i++)
            {
                items.push(btns[i]);
            }
        }
        if(!this.tableBody)
        {
            return;
        }
        var tableBody = this.tableBody;
        for(;tableBody.rows.length > 0;)
        {
            tableBody.removeChild(tableBody.rows[tableBody.rows.length - 1]);
        }
        var nRows = 0,
            nCols = this.columnCount || 1;
        if(nCols <= 0)
            nCols = 1;
        var rows = [];
        {
            var r = 0,
                c = 0;
            if(items)
                nextItem:for(var i=0;i < items.length;i++)
                    {
                        var comp = items[i],
                            region = comp.region || {};
                        if(this.ignoreInvisible && (!comp.isVisible() && !comp.addIfInvisibleOnLayout))
                            continue;
                        var rowSpan = region.h || 1,
                            colSpan = region.w || 1;
                        if(colSpan > nCols)
                            colSpan = nCols;
                        if(this.posMode == 1)
                        {
                            var x = region.x,
                                y = region.y;
                            if(x === undefined || y === undefined)
                                continue;
                            if(r < y + rowSpan)
                                r = y + rowSpan;
                            for(var j=rows.length;j < r;j++)
                                if(!rows[j])
                                    rows[j] = [];
                            for(var jr=y;jr < y + rowSpan;jr++)
                            {
                                if(rows.length <= jr)
                                    rows[jr] = [];
                                for(var jc=x;jc < x + colSpan;jc++)
                                {
                                    if(rows[jr][jc])
                                    {
                                        window.console.log("布局位置冲突:" + comp.name);
                                        continue nextItem;
                                    }
                                }
                            }
                            for(var jr=y;jr < y + rowSpan;jr++)
                            {
                                for(var jc=x;jc < x + colSpan;jc++)
                                {
                                    if(jr == y && jc == x)
                                        rows[jr][jc] = comp;
                                    else 
                                    {
                                        rows[jr][jc] = " ";
                                    }
                                }
                            }
                            continue;
                        }
                        var newLine = region.newLine || 0;
                        if(newLine & 1 && c > 0)
                        {
                            r++;
                            c = 0;
                        }
                        for(;r < rows.length;)
                        {
                            var ok = c == 0 || c + colSpan <= nCols;
                            if(ok)
                                for(var jr=r;jr < r + rowSpan && jr < rows.length;jr++)
                                {
                                    for(var jc=c;jc < c + colSpan;jc++)
                                    {
                                        if(jc < nCols && rows[r][c])
                                        {
                                            ok = false;
                                            break;
                                        }
                                    }
                                }
                            if(ok)
                                break;
                            c++;
                            if(c >= nCols)
                            {
                                c = 0;
                                r++;
                            }
                        }
                        for(var jr=r;jr < r + rowSpan;jr++)
                        {
                            if(rows.length <= jr)
                                rows[jr] = [];
                            for(var jc=c;jc < c + colSpan;jc++)
                            {
                                if(jr == r && jc == c)
                                    rows[jr][jc] = comp;
                                else 
                                {
                                    rows[jr][jc] = " ";
                                }
                            }
                        }
                        c++;
                        if(newLine & 2 && c > 0)
                        {
                            r++;
                            c = 0;
                        }
                    }
            nRows = c == 0 ? r : r + 1;
            if(nRows < rows.length)
                nRows = rows.length;
        }
        var colInfo = [],
            rowInfo = [],
            uR = 0;
        for(var c=0;c < nCols;c++)
        {
            colInfo[c] = {flags:0};
        }
        for(var r=0;r < nRows;r++)
        {
            rowInfo[r] = {flags:0,from:uR};
            for(var c=0;c < nCols;c++)
            {
                var ocomp = rows[r][c];
                if(ocomp == null || ocomp == " ")
                    continue;
                var comp = ocomp;
                if(!comp.labelComp)
                {
                    var title;
                    if(((title = comp.title) || comp.labelHtml) && !comp.hideTitle)
                    {
                        comp.labelComp = new Xjs.ui.Label(null);
                        comp.labelDOM = null;
                        if(this.lbNamePewfix)
                            comp.labelComp.id = this.lbNamePewfix + comp.name;
                        comp.labelComp.setTextHtmlFmt(comp.labelHtml || this.labelHtml);
                        comp.labelComp.setText(title,comp.labelColor);
                        if(comp.id)
                            comp.labelComp.htmlFor = comp.id;
                        var cn = comp.setLabelClassByRdonlyAndNonblank(null);
                        if(cn)
                            comp.labelComp.className = cn;
                        if(comp.layoutOpComp)
                        {
                            comp.opComp = comp.newDftOpComp(this.opNamePewfix + comp.name,comp.sqlType);
                        }
                    }
                } else 
                {
                    comp.labelComp.setTextHtmlFmt(comp.labelHtml || this.labelHtml);
                    comp.labelComp.setText(comp.title,comp.labelColor);
                }
                if(!comp.labelComp)
                    continue;
                comp.labelComp.setVisible(!(comp.visible === false));
                var region = comp.region || {},
                    colSpan = region.w || 1;
                if(colSpan > nCols)
                    colSpan = nCols;
                var labelPosition = region.labelPosition || comp.labelPosition;
                if(labelPosition == 1)
                    rowInfo[r].flags |= 1;
                else if(labelPosition == 2)
                    colInfo[c + colSpan - 1].flags |= 2;
                else 
                {
                    colInfo[c].flags |= 1;
                    if(comp.layoutOpComp)
                        colInfo[c].flags |= 4;
                }
            }
            uR += rowInfo[r].n = rowInfo[r].flags ? 2 : 1;
        }
        var lC = 0;
        for(var c=0;c < nCols;c++)
        {
            colInfo[c].from = lC;
            var flags = colInfo[c].flags;
            lC += colInfo[c].n = ((flags & 3) == 3 ? 3 : (flags ? 2 : 1)) + ((flags & 4) != 0 ? 1 : 0);
        }
        var rowCount = uR,
            colCount = lC,
            mcolCount = 0,
            cellRows = [];
        for(var r=0;r < rowCount;r++)
            cellRows[r] = [];
        for(var r=0;r < nRows;r++)
        {
            var rfrom = rowInfo[r].from;
            for(var c=0;c < nCols;c++)
            {
                var comp = rows[r][c];
                if(comp == null || comp == " ")
                    continue;
                var region = comp.region || {},
                    rowSpan = region.h || 1,
                    colSpan = region.w || 1;
                if(colSpan > nCols)
                    colSpan = nCols;
                var cfrom = colInfo[c].from,
                    nc = 0,
                    nr = 0;
                for(var j=0;j < colSpan;j++)
                    nc += colInfo[c + j].n;
                for(var j=0;j < rowSpan;j++)
                    nr += rowInfo[r + j].n;
                var fromR = (rowInfo[r].flags & 1) != 0 ? rfrom + 1 : rfrom,
                    nrX = (rowInfo[r].flags & 1) != 0 ? nr - 1 : nr,
                    fromC = cfrom,
                    ncX = nc;
                if(comp.labelComp)
                {
                    var labelPosition = region.labelPosition || comp.labelPosition,
                        lbComp = comp.labelComp;
                    if(labelPosition == 1)
                    {
                        for(var j=0;j < nc;j++)
                        {
                            if(cellRows[rfrom][cfrom + j] != null)
                                throw new Error("ASSERT");
                            cellRows[rfrom][cfrom + j] = j == 0 ? {layoutFor:1,labelPos:1,comp:lbComp,labelForComp:comp,colSpan:nc,rowSpan:1} : {};
                        }
                        if(mcolCount < cfrom + nc)
                            mcolCount = cfrom + nc;
                    } else 
                    {
                        var j0 = rowInfo[r].flags & 1 ? 1 : 0,
                            x = labelPosition == 2 ? cfrom + nc - 1 : cfrom;
                        for(var j=j0;j < nr;j++)
                        {
                            if(cellRows[rfrom + j][x] != null)
                                throw new Error("ASSERT");
                            cellRows[rfrom + j][x] = j == j0 ? {layoutFor:1,labelPos:labelPosition,comp:lbComp,labelForComp:comp,colSpan:1,rowSpan:nr - j0} : {};
                        }
                        if(mcolCount < x + 1)
                            mcolCount = x + 1;
                        ncX--;
                        if(labelPosition != 2)
                        {
                            fromC++;
                            if(colInfo[c].flags & 4 && comp.opComp)
                            {
                                cellRows[rfrom + j0][x + 1] = {layoutFor:3,comp:comp.opComp,colSpan:1,rowSpan:nr - j0};
                                fromC++;
                                ncX--;
                            }
                        }
                    }
                }
                var k = true;
                for(var y=fromR;y < fromR + nrX;y++)
                {
                    for(var x=fromC;x < fromC + ncX;x++)
                    {
                        if(cellRows[y][x] != null)
                        {
                            throw new Error("ASSERT");
                        }
                        cellRows[y][x] = k ? {comp:comp,colSpan:ncX,rowSpan:nrX} : {};
                        k = false;
                    }
                }
                if(mcolCount < fromC + ncX)
                    mcolCount = fromC + ncX;
            }
        }
        if(this.tableColGrp)
        {
            Xjs.DOM.removeAllChild(this.tableColGrp);
            for(var i=0;i < colInfo.length;i++)
            {
                var c = colInfo[i],
                    jd = c.flags & 1 ? 1 : 0;
                if(c.flags & 4)
                    jd++;
                for(var j=0;j < c.n;j++)
                {
                    var col = Xjs.DOM.createChild(this.tableColGrp,"col");
                    if(j == jd && this.cWidths && this.cWidths[i] > 0)
                        col.width = this.cWidths[i];
                }
            }
        }
        for(var r=0;r < rowCount;r++)
        {
            var row = tableBody.insertRow(r),
                cellIdx = 0;
            for(var c=0;c < colCount;c++)
            {
                var xc;
                if((xc = cellRows[r][c]) == null)
                {
                    if(c < mcolCount)
                    {
                        var cell = row.insertCell(cellIdx++);
                        if(this.border > 0)
                        {
                            cell.style.backgroundColor = "#FDFDFD";
                        }
                    }
                    continue;
                }
                var comp = xc.comp;
                if(!comp)
                    continue;
                var cell = row.insertCell(cellIdx++),
                    e = comp.getDOM();
                cell.appendChild(comp._getDomToAppendParent(e));
                if(comp.width == "100%")
                {
                    var pr = Xjs.DOM.getStyle(e,"paddingRight");
                    if(pr)
                        cell.style.paddingRight = pr;
                }
                if(xc.labelForComp && xc.labelForComp.labelBkColor)
                {
                    cell.style.backgroundColor = xc.labelForComp.labelBkColor;
                }
                if(xc.rowSpan > 1)
                    cell.rowSpan = xc.rowSpan;
                if(xc.colSpan > 1)
                    cell.colSpan = xc.colSpan;
                Xjs.apply(cell.style,this.cellStyle);
                if(xc.layoutFor == 1)
                {
                    cell.className = this.border > 0 ? this.labelClassB : this.labelClass;
                    if(xc.labelForComp && xc.labelForComp.labelAlign)
                    {
                        if(xc.labelForComp.labelAlign != "left")
                            cell.align = xc.labelForComp.labelAlign;
                    } else 
                    {
                        cell.align = this.labelAlign || (xc.labelPos == 1 ? "center" : "right");
                    }
                    if(xc.labelForComp && xc.labelForComp.labelVAlign)
                    {
                        cell.vAlign = xc.labelForComp.labelVAlign;
                    } else if(this.labelVAlign)
                    {
                        cell.vAlign = this.labelVAlign;
                    }
                    if(this.labelTDStyles)
                        Xjs.apply(cell.style,this.labelTDStyles);
                    if(comp.region)
                        Xjs.apply(cell.style,comp.region.labelStyle);
                    if(xc.labelForComp && xc.labelForComp.labelTDStyles)
                        Xjs.apply(cell.style,xc.labelForComp.labelTDStyles);
                    if(xc.labelForComp && xc.labelForComp.lbTipIfOvflow)
                    {
                        var clb = new Xjs.ui.Component({dom:cell,tipTextCls:"x-tiptext td_label"});
                        clb.fn$TipText = new Xjs.FuncCall(clb.getTipContentIfOvflow,clb);
                        clb._addShowTipTextMouseListener();
                        Xjs.DOM.addClass(cell,"ui-tipifovflow");
                    }
                    var w = comp.labelTDWidth;
                    if(w === undefined && this.labelTDWidth > 0)
                        w = this.labelTDWidth;
                    if(w > 0)
                    {
                        cell.style.width = w + "px";
                    }
                    w = comp.labelTDMaxWidth;
                    if(w === undefined && this.labelTDMaxWidth > 0)
                        w = this.labelTDMaxWidth;
                    if(w > 0)
                    {
                        cell.style.maxWidth = w + "px";
                    }
                } else if(xc.layoutFor == 3)
                {
                    cell.align = "center";
                } else 
                {
                    var cellClsName = comp.cellClassName;
                    if(this.nmPrefix)
                        cell.id = this.nmPrefix + comp.name;
                    var sqlType = comp.sqlType;
                    if(sqlType >= 91 && sqlType <= 93)
                        cellClsName = "ui-datefield";
                    if(cellClsName)
                        cell.className = cellClsName;
                    if(this.cellTDStyles)
                        Xjs.apply(cell.style,this.cellTDStyles);
                    if(comp.region)
                        Xjs.apply(cell.style,comp.region.cellStyle);
                    if(comp.cellTDStyles)
                        Xjs.apply(cell.style,comp.cellTDStyles);
                }
                if(comp.region)
                {
                    var region = comp.region;
                    if(region.align != null)
                        cell.align = region.align;
                    if(region.valign != null)
                        cell.vAlign = region.valign;
                    var noWrap = region.noWrap || this.noWrap;
                    if(noWrap)
                        cell.noWrap = true;
                } else if(this.noWrap)
                {
                    cell.noWrap = true;
                }
            }
        }
    }
});
/*xjs/ui/util/ComponentMove.java*/
Xjs.ui.ComponentMove=function(config){
    Xjs.ui.ComponentMove.superclass.constructor.call(this,config);
};
Xjs.extend(Xjs.ui.ComponentMove,Xjs.Object,{
  _js$className_:"Xjs.ui.ComponentMove",
    marginSize:50,
    /*xjs.ui.util.ComponentMove.startMouseMove*/
    startMouseMove:function(dom,ev,mode,stopFunc,opts,moveBarCls)
    {
        this.stopFunc = stopFunc;
        Xjs.Event.cancelEvent(ev);
        this.moveMode = mode;
        this.moveDom = dom;
        this.startXY = this.endXY = {x:ev.clientX,y:ev.clientY};
        var size = Xjs.DOM.getSize(dom),
            xy0 = Xjs.DOM.getXY(dom),
            d = this.movingBar = document.createElement("div");
        if(opts & 1)
            d.appendChild(dom.cloneNode(true));
        d.className = moveBarCls || "ui-movingbar";
        this.movingInnerBar = Xjs.DOM.createChild(d,"div");
        d.onmousedown = Function.bindAsEventListener(this._onMouseDown,this);
        Xjs.DOM.addWMDragListener(this,this._onMouseMove,this._onMouseUp);
        this.old_dom_onselectstart = dom.onselectstart;
        this.nameUserSelect = Xjs.DOM.getCSSVenderStyleName("userSelect",dom);
        this.old_dom_UserSelect = dom.style[this.nameUserSelect];
        dom.style[this.nameUserSelect] = "none";
        dom.onselectstart = Xjs.falseFn;
        this.currentRect = this.initRect = {x:xy0.x,y:xy0.y,width:size.width,height:size.height};
        this._moveToRect();
        document.body.appendChild(d);
        Xjs.Event.captureMouse(this.captureDom ? this.moveDom : this.movingBar,false);
        if(ev . preventDefault)
            ev.preventDefault();
    },
    /*xjs.ui.util.ComponentMove._findRect*/
    _findRect:function(ev)
    {
        this.endXY = {x:ev.clientX,y:ev.clientY};
        var r = this.currentRect = {x:this.initRect.x,y:this.initRect.y,width:this.initRect.width,height:this.initRect.height},
            dx = ev.clientX - this.startXY.x,
            dy = ev.clientY - this.startXY.y;
        if((this.moveMode & 2) != 0)
            r.x += dx;
        if((this.moveMode & 10) == 8)
            r.width += dx;
        else if((this.moveMode & 10) == 2)
            r.width -= dx;
        if((this.moveMode & 1) != 0)
            r.y += dy;
        if((this.moveMode & 5) == 4)
            r.height += dy;
        else if((this.moveMode & 5) == 1)
            r.height -= dy;
        if(r.width < 4)
            r.width = 4;
        if(r.height < 4)
            r.height = 4;
    },
    /*xjs.ui.util.ComponentMove._moveToRect*/
    _moveToRect:function()
    {
        var s = this.movingBar.style,
            r = this.currentRect;
        s.left = r.x - this.marginSize + "px";
        s.top = r.y - this.marginSize + "px";
        s.width = r.width + 2 * this.marginSize + "px";
        s.height = r.height + 2 * this.marginSize + "px";
        s = this.movingInnerBar.style;
        s.width = r.width - 4 + "px";
        s.height = r.height - 4 + "px";
        s.left = this.marginSize + "px";
        s.top = this.marginSize + "px";
    },
    /*xjs.ui.util.ComponentMove.setMargineSize*/
    setMargineSize:function(sz)
    {
        this.marginSize = sz;
        this._moveToRect();
    },
    /*xjs.ui.util.ComponentMove.mouseMoveTo*/
    mouseMoveTo:function(ev)
    {
        this._findRect(ev);
        Xjs.Event.cancelEvent(ev,true);
        this._moveToRect();
        if(this.moveListener)
            this.moveListener.onComponentMoved();
    },
    /*xjs.ui.util.ComponentMove.stopMouseMove*/
    stopMouseMove:function(ev)
    {
        if(this.moveDom == null)
            return null;
        this.moveDom.onselectstart = this.old_dom_onselectstart;
        this.moveDom.style[this.nameUserSelect] = this.old_dom_UserSelect;
        Xjs.Event.captureMouse(this.captureDom ? this.moveDom : this.movingBar,true);
        if(ev != null)
            this._findRect(ev);
        document.body.removeChild(this.movingBar);
        delete this.movingBar;
        this.moveDom = null;
        return this.currentRect;
    },
    /*xjs.ui.util.ComponentMove._onMouseDown*/
    _onMouseDown:function(ev)
    {
        this.stopMouseMove(ev);
    },
    /*xjs.ui.util.ComponentMove._onMouseMove*/
    _onMouseMove:function(ev)
    {
        this.mouseMoveTo(ev);
    },
    /*xjs.ui.util.ComponentMove._onMouseUp*/
    _onMouseUp:function(ev)
    {
        if(this.stopFunc)
            this.stopFunc(ev);
        this.stopMouseMove(ev);
    }
});
/*xjs/ui/util/CustomScrollbar.java*/
Xjs.namespace("Xjs.ui.util");
Xjs.ui.util.CustomScrollbar=function(name,boxDOM,flags,cfg,fixBottomH,ajdSize){
    if(cfg)
        Xjs.apply(this,cfg);
    this.name = name;
    this.flags = flags;
    this.boxDOM = boxDOM;
    Xjs.DOM.addClass(boxDOM,"custom-scrollable");
    if(flags & 0x10)
        boxDOM.style.overflow = "hidden";
    boxDOM._customScrollbar = this;
    this.fixBottomH = fixBottomH;
    var fn$MDown = Function.bindAsEventListener(this.onMouseDown,this);
    if(flags & 1)
    {
        this.vbar = Xjs.DOM.createChild(boxDOM,"div","scroll-bar vscroll-bar");
        this.vbar.id = "vscroll-bar";
        this.vbarc = Xjs.DOM.createChild(this.vbar,"div","scroll-cur vscroll-cur");
        this.vbarc.id = "vscroll-cur";
        this.setVValue(0,100,10);
        this.vbar.onmousedown = fn$MDown;
        this.vbar.onselectstart = Xjs.falseFn;
        if(flags & 4)
        {
            var box = boxDOM == document.body ? window : boxDOM;
            if("onmousewheel" in box)
                box.onmousewheel = Function.bindAsEventListener(this.onMouseWheel,this);
            else 
                Xjs.DOM.addListener(box,"DOMMouseScroll",this.onMouseWheel,false,this);
        }
        if(this.topMargin)
            this.vbar.style.top = this.topMargin + "px";
    } else 
    {
        this.vbar = null;
        this.vbarc = null;
    }
    if(flags & 2)
    {
        this.hbar = Xjs.DOM.createChild(boxDOM,"div","scroll-bar hscroll-bar");
        this.hbar.id = "hscroll-bar";
        this.hbarc = Xjs.DOM.createChild(this.hbar,"div","scroll-cur hscroll-cur");
        this.hbarc.id = "hscroll-cur";
        this.setHValue(0,100,10);
        this.hbar.onmousedown = fn$MDown;
        this.hbar.onselectstart = Xjs.falseFn;
    } else 
    {
        this.hbar = null;
        this.hbarc = null;
    }
    if(this.scrollUnit === undefined)
    {
        this.scrollUnit = flags & 8 ? 14 : 1;
    }
    this.updateValue();
    if(boxDOM == document.body)
    {
        Xjs.DOM.addListener(window,"resize",this.onWinResize.createDelegate(this));
    }
};
Xjs.extend(Xjs.ui.util.CustomScrollbar,Xjs.Observable,{
  _js$className_:"Xjs.ui.util.CustomScrollbar",
    /*xjs.ui.util.CustomScrollbar.getVBarWidth*/
    getVBarWidth:function()
    {
        return this.vbar ? Xjs.DOM.getWidth(this.vbar) : 0;
    },
    /*xjs.ui.util.CustomScrollbar.getHBarHeight*/
    getHBarHeight:function()
    {
        return this.hbar ? Xjs.DOM.getHeight(this.hbar) : 0;
    },
    /*xjs.ui.util.CustomScrollbar.updateValue*/
    updateValue:function()
    {
        if(this.flags & 8)
        {
            var pd = Xjs.DOM.getPadding(this.boxDOM,"tb");
            this.setVValue(this.boxDOM.scrollTop,this.boxDOM.scrollHeight - pd,this.boxDOM.offsetHeight - pd);
            pd = Xjs.DOM.getPadding(this.boxDOM,"lr");
            this.setHValue(this.boxDOM.scrollLeft,this.boxDOM.scrollWidth - pd,this.boxDOM.offsetWidth - pd);
        }
    },
    /*xjs.ui.util.CustomScrollbar.onValueChanged*/
    onValueChanged:function(flags)
    {
        if(this.flags & 8)
        {
            this.boxDOM.scrollTop = this.vValue;
            this.boxDOM.scrollLeft = this.hValue;
            if(this.boxDOM == document.body)
                window.scrollTo(this.hValue,this.vValue);
            else 
                this.resetBarPos();
        }
        this.fireEvent("onScrollbarValueChanged");
    },
    /*xjs.ui.util.CustomScrollbar.resetBarPos*/
    resetBarPos:function()
    {
        if(this.vbar)
        {
            var s = this.vbar.style;
            s.top = this.boxDOM.scrollTop + "px";
            s.bottom = -this.boxDOM.scrollTop + "px";
            s.right = -this.boxDOM.scrollLeft + "px";
        }
        if(this.hbar)
        {
            var s = this.hbar.style;
            s.left = this.boxDOM.scrollLeft + "px";
            s.right = -this.boxDOM.scrollLeft + "px";
            s.bottom = -this.boxDOM.scrollTop + "px";
        }
    },
    /*xjs.ui.util.CustomScrollbar.setVValue*/
    setVValue:function(value,maxValue,pgValue,fireChaged)
    {
        if(value > maxValue - pgValue)
            value = maxValue - pgValue;
        if(value < 0)
            value = 0;
        this.vValue = value;
        this.vMaxValue = maxValue;
        this.vPgValue = pgValue;
        if(this.vbarc)
        {
            var s = this.vbarc.style;
            if(maxValue <= 0 || pgValue >= maxValue)
            {
                s.display = "none";
                Xjs.DOM.removeClass(this.boxDOM,"custom-scrollvisible-y");
                return;
            }
            Xjs.DOM.addClass(this.boxDOM,"custom-scrollvisible-y");
            s.display = "";
            var t = value * 100 / maxValue,
                h = pgValue * 100 / maxValue,
                minH = 20 * 100 / this.vbar.offsetHeight;
            if(h < minH)
            {
                h = minH;
                t = value * (100 - minH) / (maxValue - pgValue);
            }
            s.top = t + "%";
            s.height = h + "%";
        }
        if(fireChaged)
            this.onValueChanged(1);
    },
    /*xjs.ui.util.CustomScrollbar.setHValue*/
    setHValue:function(value,maxValue,pgValue,fireChaged)
    {
        if(value > maxValue - pgValue)
            value = maxValue - pgValue;
        if(value < 0)
            value = 0;
        this.hValue = value;
        this.hMaxValue = maxValue;
        this.hPgValue = pgValue;
        if(this.hbarc)
        {
            var s = this.hbarc.style;
            if(maxValue <= 0 || pgValue >= maxValue)
            {
                s.display = "none";
                Xjs.DOM.removeClass(this.boxDOM,"custom-scrollvisible-x");
                return;
            }
            s.display = "";
            Xjs.DOM.addClass(this.boxDOM,"custom-scrollvisible-x");
            var l = value * 100 / maxValue,
                w = pgValue * 100 / maxValue,
                minW = 20 * 100 / this.hbar.offsetWidth;
            if(w < minW)
            {
                w = minW;
                l = value * (100 - minW) / (maxValue - pgValue);
            }
            s.left = l + "%";
            s.width = w + "%";
        }
        if(fireChaged)
            this.onValueChanged(2);
    },
    /*xjs.ui.util.CustomScrollbar.registerMoveEvent*/
    registerMoveEvent:function(start)
    {
        if(start)
        {
            Xjs.DOM.addWMDragListener(this,this.onMouseMove,this.onMouseUp);
            window.onselectstart = Xjs.falseFn;
            this.movingBar.style.visibility = "visible";
            document.body.style.MozUserSelect = "none";
        } else 
        {
            window.onselectstart = null;
            this.movingBar.style.visibility = "";
            document.body.style.MozUserSelect = "";
        }
    },
    /*xjs.ui.util.CustomScrollbar.cancelMoving*/
    cancelMoving:function()
    {
        if(this.moveInterval)
            clearInterval(this.moveInterval);
        this.moveInterval = null;
        if(!this.movingBar)
            return;
        Xjs.Event.captureMouse(this.movingBar,true);
        this.registerMoveEvent(false);
        this.movingBar = null;
        this.startXY = null;
        this.inDrag = false;
    },
    /*xjs.ui.util.CustomScrollbar.onMouseDown*/
    onMouseDown:function(e)
    {
        this.cancelMoving();
        var t = e.target;
        if(Xjs.DOM.contains(this.vbarc,t))
        {
            this.movingBar = this.vbar;
            this.inDrag = true;
            this.movingValue0 = this.vValue;
        } else if(Xjs.DOM.contains(this.hbarc,t))
        {
            this.movingBar = this.hbar;
            this.inDrag = true;
            this.movingValue0 = this.hValue;
        } else if(Xjs.DOM.contains(this.vbar,t))
        {
            this.movingBar = this.vbar;
            this.inDrag = false;
        } else if(Xjs.DOM.contains(this.hbar,t))
        {
            this.movingBar = this.hbar;
            this.inDrag = false;
        } else 
            return;
        this.startXY = {x:e.clientX,y:e.clientY};
        this.registerMoveEvent(true);
        Xjs.Event.captureMouse(this.movingBar,false);
        if(!this.inDrag)
        {
            this.movePage();
            if(!this.fn$movePage)
                this.fn$movePage = this.movePage.createDelegate(this);
            this.moveInterval = setInterval(this.fn$movePage,100);
        }
    },
    /*xjs.ui.util.CustomScrollbar.movePage*/
    movePage:function()
    {
        if(this.movingBar == this.vbar)
        {
            var xy = Xjs.DOM.getXY(this.vbarc,true);
            if(this.startXY.y < xy.y + this.vPgValue / 4)
            {
                this.setVValue(this.vValue - this.vPgValue / 2,this.vMaxValue,this.vPgValue,true);
            } else if(this.startXY.y > xy.y + this.vbarc.offsetHeight - this.vPgValue / 4)
            {
                this.setVValue(this.vValue + this.vPgValue / 2,this.vMaxValue,this.vPgValue,true);
            } else 
            {
                this.cancelMoving();
            }
        } else if(this.movingBar == this.hbar)
        {
            var xy = Xjs.DOM.getXY(this.hbarc,true);
            if(this.startXY.x < xy.x + this.hPgValue / 4)
            {
                this.setHValue(this.hValue - this.hPgValue / 2,this.hMaxValue,this.hPgValue,true);
            } else if(this.startXY.x > xy.x + this.hbarc.offsetWidth - this.hPgValue / 4)
            {
                this.setHValue(this.hValue + this.hPgValue / 2,this.hMaxValue,this.hPgValue,true);
            } else 
            {
                this.cancelMoving();
            }
        }
    },
    /*xjs.ui.util.CustomScrollbar.onMouseMove*/
    onMouseMove:function(ev)
    {
        if(this.movingBar && this.inDrag)
        {
            if(this.movingBar == this.vbar)
            {
                var dy = ev.clientY - this.startXY.y;
                this.setVValue(this.movingValue0 + dy * this.vMaxValue / this.vbar.offsetHeight,this.vMaxValue,this.vPgValue,true);
            } else if(this.movingBar == this.hbar)
            {
                var dx = ev.clientX - this.startXY.x;
                this.setHValue(this.movingValue0 + dx * this.hMaxValue / this.hbar.offsetWidth,this.hMaxValue,this.hPgValue,true);
            }
        }
        Xjs.Event.cancelEvent(ev,true);
    },
    /*xjs.ui.util.CustomScrollbar.onMouseUp*/
    onMouseUp:function(e)
    {
        this.cancelMoving();
    },
    /*xjs.ui.util.CustomScrollbar.onMouseWheel*/
    onMouseWheel:function(e)
    {
        var delta;
        if(e.detail)
        {
            delta = e.detail;
        } else 
        {
            delta = -e.wheelDelta / 120;
        }
        var oldVal = this.vValue;
        this.setVValue(this.vValue + delta * this.scrollUnit,this.vMaxValue,this.vPgValue,true);
        if(oldVal == this.vValue && !(this.flags & 0x20))
            return;
        Xjs.Event.cancelEvent(e,true);
        return false;
    },
    /*xjs.ui.util.CustomScrollbar.onWinResize*/
    onWinResize:function()
    {
        this.updateValue();
    },
    /*xjs.ui.util.CustomScrollbar.bindWEvent*/
    bindWEvent:function()
    {
        if(!this.fonWinScroll && this.flags & 0x40 && Xjs.DOM.isShowing(this.boxDOM))
        {
            this.fonWinScroll = Function.bindAsEventListener(this.checkFix,this);
            Xjs.DOM.addListener(window,"scroll",this.fonWinScroll);
            Xjs.DOM.addListener(window,"resize",this.fonWinScroll);
        }
        this.checkFix();
    },
    /*xjs.ui.util.CustomScrollbar.removeWEvent*/
    removeWEvent:function()
    {
        if(this.fonWinScroll && !Xjs.DOM.isShowing(this.boxDOM))
        {
            Xjs.DOM.removeListener(window,"scroll",this.fonWinScroll);
            Xjs.DOM.removeListener(window,"resize",this.fonWinScroll);
            this.fonWinScroll = null;
        }
    },
    /*xjs.ui.util.CustomScrollbar.checkFix*/
    checkFix:function()
    {
        if(!(this.flags & 0x40))
            return;
        if(!this.fn$checkFix)
            this.fn$checkFix = this.doCheckFix.createDelegate(this);
        setTimeout(this.fn$checkFix,1);
    },
    /*xjs.ui.util.CustomScrollbar.doCheckFix*/
    doCheckFix:function()
    {
        var b = this.boxDOM.getBoundingClientRect(),
            fixBH = this.fixBottomH ? this.fixBottomH.call() : 0,
            fixRW = 0,
            ajdSize = this.ajdSize ? this.ajdSize.call() : 0,
            xy = null;
        if(this.hbar)
        {
            var vh = Xjs.DOM.getViewportHeight() - fixBH,
                bv = b.bottom - ajdSize > vh && b.top < vh;
            Xjs.DOM.addOrRemoveClass(this.hbar,"scroll-fixedbar",bv);
            var hbars = this.hbar.style;
            if(bv)
            {
                hbars.bottom = fixBH + "px";
                hbars.width = Xjs.DOM.getWidth(this.boxDOM) + "px";
                if(!xy)
                    xy = Xjs.DOM.getXY(this.boxDOM,true);
                hbars.left = xy.x + "px";
            } else 
            {
                hbars.bottom = "";
                hbars.width = "";
                hbars.left = "";
            }
        }
        if(this.vbar)
        {
            var vw = Xjs.DOM.getViewportWidth() - fixRW,
                rv = b.right - ajdSize > vw && b.left < vw,
                vbars = this.vbar.style;
            Xjs.DOM.addOrRemoveClass(this.vbar,"scroll-fixedbar",rv);
            if(rv)
            {
                vbars.right = fixRW + "px";
                vbars.height = Xjs.DOM.getHeight(this.boxDOM) + "px";
                if(!xy)
                    xy = Xjs.DOM.getXY(this.boxDOM,true);
                vbars.top = xy.y + "px";
            } else 
            {
                vbars.right = "";
                vbars.height = "";
                vbars.top = "";
            }
        }
    }
});
/*xjs/ui/util/DialogPaneLoader.java*/
Xjs.ui.util.DialogPaneLoader=function(uiid,options,buttons,size,dlgCfg,initVals){
    this.uiid = uiid;
    this.options = options || 0;
    this.buttons = buttons;
    this.size = size;
    this.dlgCfg = dlgCfg;
    this.initVals = initVals;
    if(window.uiHTLMURL)
    {
        this.nmHTMLURL = dlgCfg ? dlgCfg.NAMEUIHTMLURL : null;
        if(this.nmHTMLURL == null)
            this.nmHTMLURL = uiid;
        if(dlgCfg)
            delete dlgCfg.NAMEUIHTMLURL;
    }
    this.uiInitPM = dlgCfg ? dlgCfg._UI_InitParam : null;
    if(dlgCfg)
        delete dlgCfg._UI_InitParam;
    var s = dlgCfg ? dlgCfg.SRootPath : null;
    if(s == null && window.EnvParameter && window.EnvParameter.uiRoot)
    {
        s = Xjs.ui.UIUtil.buildUIRoot(window.EnvParameter.uiRoot);
    }
    this.srootPath = s;
};
Xjs.apply(Xjs.ui.util.DialogPaneLoader.prototype,{
    loadUIOpts:13,
    /*xjs.ui.util.DialogPaneLoader.load*/
    load:function()
    {
        return this.toDialog(Xjs.JsLoad.loadUI(this.uiid,this.srootPath).getUI(0,this.loadUIOpts,this.initVals,this.uiInitPM));
    },
    /*xjs.ui.util.DialogPaneLoader.asynLoad*/
    asynLoad:function()
    {
        var _this = this;
        return Xjs.JsLoad.asynLoadUI(this.uiid).then(function(ui){
            return _this.toDialog(ui.getUI(0,_this.loadUIOpts,_this.initVals,_this.uiInitPM));
        });
    },
    /*xjs.ui.util.DialogPaneLoader.toDialog*/
    toDialog:function(comp)
    {
        comp.setRootComponent(comp);
        var htmlURL = Xjs.ui.UIUtil.getAttachHtmlURL(this.uiid,this.nmHTMLURL,this.srootPath);
        Xjs.ui.AttachUtils.attachToHTML("@" + htmlURL,comp,0);
        var w = null;
        if(comp instanceof Xjs.ui.DialogPane)
        {
            w = comp;
        } else 
        {
            var boxHtml = this.dlgCfg ? this.dlgCfg.UIWinFrameBoxHTML : null;
            if(boxHtml == null)
                boxHtml = "@" + Xjs.getThemePath() + "/xjsres/WindowBox0.html";
            w = new Xjs.ui.Window({buttons:this.buttons,id:"UIA__Window_",title:comp.mtitle || comp.title || "",htmlRes:boxHtml});
            w.itemsLayout = new Xjs.ui.DefaultLayout({opts:1});
            w.rootUiid = this.uiid;
            comp.parent3 = comp.parent;
            w.addChild(comp);
            w.resizeItemsOnResize = true;
            if(comp.pwinUIProps)
                Xjs.apply(w,comp.pwinUIProps);
        }
        w.toolbarClassName = "ui-wtitlebar";
        w.frameClassName = "ui-window ui-wborder";
        w.mainUI = 3;
        {
            if(this.dlgCfg)
            {
                Xjs.apply(w,this.dlgCfg);
            }
            if(!(w.buttons = this.buttons))
            {
                w.buttons = Xjs.ui.Panel.newDefaultButtons(w.id + "_btn_");
            }
            delete w.alignOpts;
            w.closeable = true;
            w.disableAddDlgItems = (this.options & 4) == 0;
            w.moveable = (this.options & 1) == 0;
            w.resizeable = (this.options & 2) == 0;
            if(this.size)
            {
                if(this.size.width > 0)
                    w.width = this.size.width;
                if(this.size.height > 0)
                    w.height = this.size.height;
            }
        }
        return w;
    }
});
/*xjs/ui/util/DOMSlide.java*/
Xjs.ui.util.DOMSlide=function(slideDom,totalTime,interval){
    this.slideDom = slideDom;
    this.totalTime = totalTime;
    this.interval = interval;
};
Xjs.apply(Xjs.ui.util.DOMSlide.prototype,{
    /*xjs.ui.util.DOMSlide.start*/
    start:function(fromLeft,toLeft,fromTop,toTop)
    {
        this.stop();
        this.fromLeft = fromLeft;
        this.toLeft = toLeft;
        this.fromTop = fromTop;
        this.toTop = toTop;
        this.dx = (toLeft - fromLeft) * this.interval / this.totalTime;
        this.dy = (toTop - fromTop) * this.interval / this.totalTime;
        if(this.fnSlide == null)
            this.fnSlide = this.slide.createDelegate(this);
        this.slideDom.style.left = (this.x = fromLeft) + "px";
        this.slideDom.style.top = (this.y = toTop) + "px";
        this.timer = setInterval(this.fnSlide,this.interval);
    },
    /*xjs.ui.util.DOMSlide.stop*/
    stop:function()
    {
        if(this.timer != null)
        {
            clearInterval(this.timer);
            this.timer = null;
            if(this.onSlideStop != null)
                this.onSlideStop.call(this.objOnSlideStop || window);
        }
    },
    /*xjs.ui.util.DOMSlide.slide*/
    slide:function()
    {
        this.x = Math.floor(this.x + this.dx);
        this.y = Math.floor(this.y + this.dy);
        var endX = false,
            endY = false;
        if(this.toLeft > this.fromLeft ? this.x >= this.toLeft : this.x <= this.toLeft)
        {
            this.x = this.toLeft;
            endX = true;
        }
        if(this.toTop > this.fromTop ? this.y >= this.toTop : this.y <= this.toTop)
        {
            this.y = this.toTop;
            endY = true;
        }
        this.slideDom.style.left = this.x + "px";
        this.slideDom.style.top = this.y + "px";
        if(endX && endY)
            this.stop();
    },
    /*xjs.ui.util.DOMSlide.setOnSlideStop*/
    setOnSlideStop:function(onSlideStop,objOnSlideStop)
    {
        this.onSlideStop = onSlideStop;
        this.objOnSlideStop = objOnSlideStop;
    }
});
/*xjs/ui/util/FileValue.java*/
Xjs.ui.util.FileValue=function(fileName){
    this.fileName = fileName;
};
Xjs.apply(Xjs.ui.util.FileValue.prototype,{
    /*xjs.ui.util.FileValue.toString*/
    toString:function()
    {
        return this.fileName;
    }
});
/*xjs/ui/util/HistAidInputer.java*/
Xjs.ui.util.HistAidInputer=function(parent){
    this.parent = parent;
};
Xjs.extend(Xjs.ui.util.HistAidInputer,Xjs.Object,{
  _js$className_:"Xjs.ui.util.HistAidInputer",
    /*xjs.ui.util.HistAidInputer.setValue*/
    setValue:function(v)
    {
        this.parent.setValue(v);
    },
    /*xjs.ui.util.HistAidInputer.focus*/
    focus:function()
    {
        this.parent.focus();
    },
    /*xjs.ui.util.HistAidInputer.getSelectOptions*/
    getSelectOptions:function()
    {
        return this.selOptions;
    },
    /*xjs.ui.util.HistAidInputer.getFilterValue*/
    getFilterValue:function()
    {
        var v = this.parent.getValue();
        return typeof(v) == "string" && v>" " ? v : null;
    },
    /*xjs.ui.util.HistAidInputer.doAidInputer*/
    doAidInputer:function()
    {
        this.dom = this.parent.dom;
        if(!this.dom)
            return;
        var histid = Xjs.ui.util.HistAidInputer.getStoreHistValName(this.parent);
        if(!histid)
        {
            return;
        }
        this.selOptions = Xjs.ui.util.HistAidInputer.loadHistValues(histid);
        if(!this.selOptions || this.selOptions.length == 0)
            return;
        if(!this.aidInputer)
        {
            this.aidInputer = new Xjs.ui.ComboAidInputer({selOptions:1 | 0x10000 | 0x20000000 | 0x80000000,disListFocus:true});
            if(this.filter)
                this.aidInputer.fnGetFilter = new Xjs.FuncCall(this.getFilterValue,this);
            this.ev = {};
        }
        this.aidInputer.doAidInput(this,null,this.ev);
        if(this.filter)
            this.parent.addListener(this);
    },
    /*xjs.ui.util.HistAidInputer.setlectNextVal*/
    setlectNextVal:function(prev)
    {
        var v = this.aidInputer.getRowValue(prev ? -1 : 1,1,true);
        if(v)
            this.parent.setValue(v);
    },
    /*xjs.ui.util.HistAidInputer.valueChanged*/
    valueChanged:function(item,e,setByValue)
    {
        if(this.filter && item == this.parent)
        {
            this.aidInputer.refilter(false);
        }
    },
    /*xjs.ui.util.HistAidInputer.isShowing*/
    isShowing:function()
    {
        return this.aidInputer && this.aidInputer.isInShowing();
    },
    /*xjs.ui.util.HistAidInputer.hide*/
    hide:function()
    {
        if(this.aidInputer)
        {
            this.aidInputer.hide();
            this.parent.removeListener(this);
        }
    },
    /*xjs.ui.util.HistAidInputer.addNotify*/
    addNotify:Xjs.emptyFn,
    /*xjs.ui.util.HistAidInputer.hideAidinputerIfOutclick*/
    hideAidinputerIfOutclick:Xjs.trueFn
});
Xjs.apply(Xjs.ui.util.HistAidInputer,{
    /*xjs.ui.util.HistAidInputer.loadHistValues*/
    loadHistValues:function(id)
    {
        var s = id ? window.localStorage["HIST$." + id] : null;
        if(typeof(s) != "string")
            return [];
        else 
            return s.split("\n");
    },
    /*xjs.ui.util.HistAidInputer.getStoreHistValName*/
    getStoreHistValName:function(c)
    {
        if(c.storeHistValName)
            return c.storeHistValName;
        var mp = c.getMainParentComponent();
        return mp && mp != c && mp.name ? mp.name + "." + c.name : c.name;
    },
    /*xjs.ui.util.HistAidInputer.addStoreHistValName*/
    addStoreHistValName:function(c)
    {
        Xjs.ui.util.HistAidInputer.addHistValue(Xjs.ui.util.HistAidInputer.getStoreHistValName(c),c.getValue(),c.maxStoreHistVals);
    },
    /*xjs.ui.util.HistAidInputer.addHistValue*/
    addHistValue:function(id,val,maxVals)
    {
        if(typeof(val) != "string" || val == "")
            return;
        var a = Xjs.ui.util.HistAidInputer.loadHistValues(id);
        if(a && a[0] == val)
            return;
        for(var i=a.length - 1;i >= 0;i--)
        {
            if(a[i] == val)
                a.splice(i,1);
        }
        a.splice(0,0,val);
        if(maxVals === undefined)
            maxVals = 50;
        if(maxVals > 0)
            for(;a.length > maxVals;)
                a.splice(a.length - 1,1);
        window.localStorage["HIST$." + id] = a.join("\n");
    }
});
/*xjs/ui/util/InitValues.java*/
Xjs.ui.InitValues=function(values,caseEnvParams){
    this.values = values;
    this.caseEnvParams = caseEnvParams;
};
Xjs.apply(Xjs.ui.InitValues.prototype,{
    /*xjs.ui.util.InitValues.get*/
    get:function(name)
    {
        var v = null;
        if(this.caseEnvParams && window.EnvParameter.ReqParameter)
        {
            v = window.EnvParameter.ReqParameter["InitValue." + name];
        }
        if(v == null && this.values)
        {
            if(typeof(this.values.getData) == "function")
            {
                this.values = this.values.getData() || {};
            }
            v = this.values[name];
        }
        if(typeof(v) == "string")
        {
            var reqMap = new Xjs.util.ValueMap(window.EnvParameter.ReqParameter);
            v = String.macroReplace(v,reqMap,"%ReqParam(",")","",",");
        }
        return v;
    },
    /*xjs.ui.util.InitValues.set*/
    set:Xjs.emptyFn
});
/*xjs/ui/util/MutilineTextInputer.java*/
Xjs.ui.MutilineTextInputer=function(config){
    Xjs.ui.MutilineTextInputer.superclass.constructor.call(this,config);
    if(window.xjsConfig && window.xjsConfig.mtextInputOpts)
    {
        Xjs.applyIf(this,window.xjsConfig.mtextInputOpts);
    }
};
Xjs.extend(Xjs.ui.MutilineTextInputer,Xjs.ui.AidInputerWindow,{
  _js$className_:"Xjs.ui.MutilineTextInputer",
    /*xjs.ui.util.MutilineTextInputer.onDomCreated*/
    onDomCreated:function(root)
    {
        Xjs.ui.MutilineTextInputer.superclass.onDomCreated.call(this,root);
        this.firstFocusComp = this.textComp = this.items[0];
        if(this.textComp && this.textComp . setReadonly)
            this.textComp.setReadonly(this.forInput == null || this.forInput.isReadonly());
    },
    /*xjs.ui.util.MutilineTextInputer.initAidInputer*/
    initAidInputer:function(initValue,ev)
    {
        if(this.textComp && this.textComp . setReadonly)
            this.textComp.setReadonly(!this.forInput || this.forInput.isReadonly());
    },
    /*xjs.ui.util.MutilineTextInputer.setValue*/
    setValue:function(value)
    {
        var textComp = this.items[0];
        textComp.setValue(value || "");
    },
    /*xjs.ui.util.MutilineTextInputer.getValue*/
    getValue:function()
    {
        return this.items[0].getValue();
    }
});
Xjs.apply(Xjs.ui.MutilineTextInputer,{
    /*xjs.ui.util.MutilineTextInputer.newInputer*/
    newInputer:function()
    {
        if(Xjs.ui.MutilineTextInputer._$default == null)
        {
            Xjs.ui.MutilineTextInputer._$default = new Xjs.ui.MutilineTextInputer({mainUI:3,name:"mtext",width:620,height:400,fireOnRender:true,mid:"00.MTEXTAI",id:"UIA_mtext",frameClassName:"ui-mutilinetext",htmlRes:"@" + Xjs.getDefResPath() + "/MutilineTextInputer.html"});
            Xjs.ui.MutilineTextInputer._$default.setRootComponent(Xjs.ui.MutilineTextInputer._$default);
            var f = new Xjs.ui.InputField({sqlType:12,name:"text",width:"100%",inputType:"textarea",id:"UIA_mtext_text",selectOnFocus:0,rows:5,updateSizeOpts:3,height:"100%"});
            Xjs.ui.MutilineTextInputer._$default.addChild(f);
        }
        return Xjs.ui.MutilineTextInputer._$default;
    }
});
/*xjs/ui/util/SuccessInfo.java*/
Xjs.ui.SuccessInfo = {
    /*xjs.ui.util.SuccessInfo.createInfoDOM*/
    createInfoDOM:function(infoType,title,message)
    {
        var dom = Xjs.ui.Component.createDomFromRes("@" + Xjs.getTheme() + "/xjsres/MessageBox2.html",null,false),
            e = Xjs.DOM.findById("TITLE",dom);
        if(e)
            Xjs.DOM.setTextContent(e,title);
        e = Xjs.DOM.findById("INFO",dom);
        if(e)
            Xjs.DOM.setTextContent(e,message);
        return dom;
    },
    /*xjs.ui.util.SuccessInfo.showInfo*/
    showInfo:function(toDOM,infoType,title,message,infoClass)
    {
        if(toDOM == null)
            toDOM = document.body;
        if(toDOM != null)
            Xjs.DOM.removeAllChild(toDOM);
        var e = Xjs.ui.Component.appendToTableDOM(Xjs.ui.SuccessInfo.createInfoDOM(infoType,title,message),0xf);
        Xjs.DOM.addClass(e,"ui-msgbox2");
        Xjs.DOM.addClass(e,"ui-" + infoType + "Box");
        if(infoClass)
            Xjs.DOM.addClass(e,infoClass);
        if(toDOM != null)
            toDOM.appendChild(e);
    },
    /*xjs.ui.util.SuccessInfo.showSuccessInfo*/
    showSuccessInfo:function(toDOM,title,message,infoClass)
    {
        Xjs.ui.SuccessInfo.showInfo(toDOM,"Success",title,message,infoClass);
    },
    /*xjs.ui.util.SuccessInfo.showFailInfo*/
    showFailInfo:function(toDOM,title,message,infoClass)
    {
        Xjs.ui.SuccessInfo.showInfo(toDOM,"Fail",title,message,infoClass);
    },
    /*xjs.ui.util.SuccessInfo.showException*/
    showException:function(ex,title,logName)
    {
        if(ex.showMethod)
        {
            ex.showMethod(ex,0,title);
            return;
        }
        Xjs.ui.SuccessInfo.showInfo(null,"Fail",title,ex.description || ex.toString(),ex.infoclass);
        if(logName)
            try
            {
                Xjs.rlog("error",logName,ex.message + "\n" + ex.stack);
            }catch(e)
            {
                window.console.log(e.message);
            }
        if(Xjs.onAppError)
            for(var i=0;i < Xjs.onAppError.length;i++)
            {
                var v = Xjs.onAppError[i].call(window,1,ex);
                if(v)
                    break;
            }
    },
    /*xjs.ui.util.SuccessInfo.showSuccessDialog*/
    showSuccessDialog:function(title,message)
    {
        Xjs.ui.SuccessInfo.showMsgDialog("Success",title,message);
    },
    /*xjs.ui.util.SuccessInfo.showFailDialog*/
    showFailDialog:function(title,message)
    {
        Xjs.ui.SuccessInfo.showMsgDialog("Fail",title,message);
    },
    /*xjs.ui.util.SuccessInfo.showMsgDialog*/
    showMsgDialog:function(infoType,title,message)
    {
        var dialog = new Xjs.ui.Window({buttons:Xjs.ui.Panel.newCloseButton(),cmarginX:0,cmarginY:0,cpaddingX:0,cpaddingY:0,title:title}),
            d = Xjs.ui.SuccessInfo.createInfoDOM(infoType,title,message),
            c = new Xjs.ui.Component();
        c.attachDOM(d);
        dialog.items = [c];
        dialog.showModal();
    }
};
/*xjs/ui/util/UIUtil.java*/
Xjs.ui.util.UIUtil$MessageBoxLayer=function(config){
    Xjs.apply(this,config);
    this.getDOM();
};
Xjs.apply(Xjs.ui.util.UIUtil$MessageBoxLayer.prototype,{
    /*xjs.ui.util.UIUtil$MessageBoxLayer.getDOM*/
    getDOM:function()
    {
        if(!this.dom)
        {
            var root = window.document.body;
            this.dom = this._createDOM(root);
        }
        return this.dom;
    },
    /*xjs.ui.util.UIUtil$MessageBoxLayer._createDOM*/
    _createDOM:function(root)
    {
        var dom = Xjs.DOM.findById("UIA_MsgBoxLayer",root);
        if(!dom)
        {
            dom = Xjs.DOM.createChild(root,"div","ui-msgbox-layer");
            dom.id = "UIA_MsgBoxLayer";
            this.hideLayerTimeOut = setTimeout(this.hide.createDelegate(this),3000);
            dom.onmouseenter = Function.bindAsEventListener(this._onMouseEnter,this);
            dom.onmouseleave = Function.bindAsEventListener(this._onMouseLeave,this);
            Xjs.DOM.addClass(dom,"ui-msgbox-" + this.type);
            Xjs.DOM.createChild(dom,"i","type-icon");
            var msgDOM = Xjs.DOM.createChild(dom,"span","info");
            Xjs.DOM.setTextContent(msgDOM,this.message);
            var closeDOM = Xjs.DOM.createChild(dom,"i","close");
            closeDOM.onclick = Function.bindAsEventListener(this.hide,this);
        }
        return dom;
    },
    /*xjs.ui.util.UIUtil$MessageBoxLayer._onMouseEnter*/
    _onMouseEnter:function()
    {
        clearTimeout(this.hideLayerTimeOut);
    },
    /*xjs.ui.util.UIUtil$MessageBoxLayer._onMouseLeave*/
    _onMouseLeave:function()
    {
        this.hideLayerTimeOut = setTimeout(this.hide.createDelegate(this),3000);
    },
    /*xjs.ui.util.UIUtil$MessageBoxLayer.show*/
    show:function()
    {
        var _this = this;
        setTimeout(function(){
            _this.dom.style.opacity = 1;
        },300);
    },
    /*xjs.ui.util.UIUtil$MessageBoxLayer.hide*/
    hide:function()
    {
        Xjs.DOM.remove(this.dom);
    }
});
Xjs.RInvoke.beansDef["SN-UI.FuncService"]={getUiid:{}};
Xjs.ui.UIUtil = {
    /*xjs.ui.util.UIUtil.buildUIRoot*/
    buildUIRoot:function(uiRoot)
    {
        var uriP = Xjs.ROOTPATH + uiRoot + "/";
        if(window.EnvParameter && window.EnvParameter.wsp)
        {
            uriP += window.EnvParameter.wsp + "/" + (window.EnvParameter.lang || "zh_CN") + "/";
            if(window.EnvParameter.theme)
                uriP += window.EnvParameter.theme + "/";
        }
        return uriP;
    },
    /*xjs.ui.util.UIUtil.loadProgressPane*/
    loadProgressPane:function(p)
    {
        var ui;
        if(p.uiid)
        {
            ui = Xjs.JsLoad.loadUI(p.uiid).getUI(0,13,p.initVals);
            ui.setRootComponent(ui);
            var htmlURL = Xjs.ui.UIUtil.getAttachHtmlURL(p.uiid,null,null);
            if(htmlURL && !(p.options & 0x100))
            {
                ui.attachToHTML("@" + htmlURL,0);
            }
        } else 
        {
            ui = new Xjs.ui.ProgressPane(Xjs.apply({mainUI:3,height:400,width:600,fireOnRender:true,hideParamPane:true,collapsible:false,id:"ProgressPaneFrm",autoScroll:p.autoScroll},p.initVals || {}));
            if(p.title)
                ui.title = p.title;
            ui.attachToHTML("@" + Xjs.getDefResPath() + "/ProgressPane0.html",0);
        }
        ui.reqParams = p.params;
        if(p.options & 8)
            ui.layoutBottomBtnsMode = 2;
        ui.moveable = true;
        ui.backgroundRun = (p.options & 0x200) != 0;
        ui.exInfo = p.exInfo || null;
        if(p.size)
        {
            ui.width = p.size.width;
            ui.height = p.size.height;
        }
        if(p.params)
        {
            Xjs.ui.Component.setCompValues(ui,p.params,1);
        }
        ui.closeable = true;
        ui.closeAfterRun = (p.options & 2) != 0;
        if(p.runMethod)
        {
            ui.runMethod = p.runMethod;
            if(p.postArgs)
                ui.postArgs = p.postArgs;
        }
        if(p.onRunCall || p.onLockRun)
        {
            ui.addListener(Xjs.apply({onRunCall:p.onRunCall,onLockRun:p.onLockRun},Xjs.ui.TempProgressOnRunListebner));
        }
        return ui;
    },
    /*xjs.ui.util.UIUtil.progressRun*/
    progressRun:function(p)
    {
        var ui = Xjs.ui.UIUtil.loadProgressPane(p);
        if(!ui.backgroundRun)
        {
            ui.showModal();
        }
        if((p.options & 0x201) != 0)
        {
            Function.setTimeout(ui.run,ui,1,false);
        }
        return ui;
    },
    /*xjs.ui.util.UIUtil.getAttachHtmlURL*/
    getAttachHtmlURL:function(uiid,nameHTMLURL,srootPath)
    {
        var htmlURL = nameHTMLURL && window.uiHTLMURL ? window.uiHTLMURL[nameHTMLURL] : null;
        if(!htmlURL)
        {
            var url = srootPath || window.location.href,
                p = url.lastIndexOf('?');
            if(p > 0)
                url = url.substring(0,p);
            p = url.lastIndexOf('/');
            if(p > 0)
            {
                return url.substring(0,p + 1) + uiid + ".html.body";
            }
        }
        return htmlURL;
    },
    /*xjs.ui.util.UIUtil.loadDialog*/
    loadDialog:function(uiid,options,buttons,size,dlgCfg,initVals)
    {
        if(!uiid)
            return null;
        return (new Xjs.ui.util.DialogPaneLoader(uiid,options,buttons,size,dlgCfg,initVals)).load();
    },
    /*xjs.ui.util.UIUtil.loadUIComp*/
    loadUIComp:function(uiid,initVals,pm,autoRefresh,opts)
    {
        return Xjs.ui.UIUtil._getUIComp(Xjs.JsLoad.loadUI(uiid),initVals,pm,autoRefresh,opts);
    },
    /*xjs.ui.util.UIUtil._getUIComp*/
    _getUIComp:function(ui,initVals,pm,autoRefresh,opts)
    {
        var comp = ui.getUI(autoRefresh || 0,opts === undefined ? 5 : opts,initVals,pm),
            uiid = comp.mid;
        comp.setRootComponent(comp);
        var htmlURL = Xjs.ui.UIUtil.getAttachHtmlURL(uiid,uiid);
        if(htmlURL)
        {
            Xjs.ui.AttachUtils.attachToHTML("@" + htmlURL,comp,0);
        }
        return comp;
    },
    /*xjs.ui.util.UIUtil.asynLoadUIComp*/
    asynLoadUIComp:function(uiid,initVals,pm,autoRefresh,opts)
    {
        return Xjs.JsLoad.asynLoadUI(uiid).then(function(ui){
            return Xjs.ui.UIUtil._getUIComp(ui,initVals,pm,autoRefresh,opts);
        });
    },
    /*xjs.ui.util.UIUtil.showDialog*/
    showDialog:function(w)
    {
        if(w)
            w.showModal();
    },
    /*xjs.ui.util.UIUtil.showIFrameLayer*/
    showIFrameLayer:function(url,size)
    {
        var ifrm = new Xjs.ui.IFrame({src:url,domStyle:{border:"0px none",width:"100%",height:"100%"}}),
            w = new Xjs.ui.Panel({id:"UIA__Window_",items:[ifrm],domStyle:{background:"white"}});
        w.itemsLayout = new Xjs.ui.DefaultLayout();
        if(size)
        {
            w.width = size.width;
            w.height = size.height;
        }
        w.showModal();
        return w;
    },
    /*xjs.ui.util.UIUtil.showReLogin*/
    showReLogin:function(ex,opts)
    {
        Xjs.ui.UIUtil.showConfirmDialog("重登录","登录信息已经过期,需要重新登录\n(登录后需要重新刚才的操作)",new Xjs.FuncCall(Xjs.ui.UIUtil._showRelogin,null),["ok:重新登录","close:关闭"],4);
    },
    /*xjs.ui.util.UIUtil._showRelogin*/
    _showRelogin:function(src,cmd)
    {
        if(cmd != "ok")
            return;
        var bySSO = false,
            w = window;
        for(;w != null;w = w.parent)
        {
            if(w.EnvParameter && w.EnvParameter.loginFlags !== undefined)
            {
                bySSO = (w.EnvParameter.loginFlags & 0x20) != 0;
                break;
            }
            if(w == w.parent)
                break;
        }
        var url;
        if(bySSO)
        {
            var pm = (window.EnvParameter.wsp || window.EnvParameter.IDWORKSPC || "") + "~" + (window.EnvParameter.SYSID || "") + "~" + (window.EnvParameter.lang || "");
            url = Xjs.ROOTPATH + "ui/sso-open/_iloginok.html?_relogin=" + pm;
        } else 
        {
            var loginPage = null;
            try
            {
                loginPage = Xjs.RInvoke.rmInvoke("snsoft.ui.xjs.XjsLoginUtils.getLoginPage",2);
            }catch(e)
            {
            }
            if(!loginPage)
            {
                loginPage = "Login.html";
            }
            url = Xjs.ROOTPATH + loginPage + "?homepage=_iloginok.html&page-cls=ui-relogin&_aopts=96" + "&wspid=" + (window.EnvParameter.wsp || window.EnvParameter.IDWORKSPC || "") + "&sysid=" + (window.EnvParameter.SYSID || "") + "&lang=" + (window.EnvParameter.lang || "");
        }
        Xjs.ui.UIUtil.showIFrameLayer(url,{width:436,height:253});
    },
    /*xjs.ui.util.UIUtil.showIFrmLogin*/
    showIFrmLogin:function()
    {
        var url = Xjs.ROOTPATH + "Login.html?homepage=_iloginok.html&page-cls=ui-ifrmlogin&_aopts=" + 0x20000 + "&wspid=" + (window.EnvParameter.wsp || window.EnvParameter.IDWORKSPC || "") + "&sysid=" + (window.EnvParameter.SYSID || "") + "&lang=" + (window.EnvParameter.lang || "");
        Xjs.ui.UIUtil.showIFrameLayer(url,{width:800,height:450});
    },
    /*xjs.ui.util.UIUtil.showIFrmModiPWD*/
    showIFrmModiPWD:function()
    {
        var url = Xjs.ROOTPATH + "loginpage/ModiPWD.html?page-cls=ui-ifrmlogin&_aopts=" + 0x20000;
        Xjs.ui.UIUtil.showIFrameLayer(url,{width:800,height:450});
    },
    /*xjs.ui.util.UIUtil.newWindow*/
    newWindow:function(cfg)
    {
        if(!cfg.htmlRes)
            cfg.htmlRes = "@" + Xjs.getThemePath() + "/xjsres/WindowBox0.html";
        if(!cfg.id)
            cfg.id = "UIA__Window_";
        var w = new Xjs.ui.Window(cfg);
        w.mainUI = 3;
        return w;
    },
    /*xjs.ui.util.UIUtil.showMessageBox*/
    showMessageBox:function(type,title,message,onClose,okText,opts,wcfg)
    {
        if(title == null)
        {
            if(type == "error")
            {
                title = Xjs.ResBundle.getString("UI","Dlg.Error");
            } else if(type == "information")
            {
                title = Xjs.ResBundle.getString("UI","Dlg.Info");
            } else if(type == "success")
            {
                title = Xjs.ResBundle.getString("UI","Dlg.Success");
            } else if(type == "question")
            {
                title = Xjs.ResBundle.getString("UI","Dlg.Question");
            }
        }
        if(opts & 0x10)
        {
            Xjs.ui.UIUtil.showMessageBoxLayer(type,message);
            if(onClose)
            {
                setTimeout(function(){
            onClose.call();
        },1);
            }
            return null;
        }
        var w = new Xjs.ui.Window(wcfg);
        w.frame = false;
        w.id = "UIA_MsgBox";
        w.okKeyMode = 1;
        w.htmlRes = "@" + Xjs.getDefResPath() + "/MessageBox.html";
        w.attachBtnKeyup = false;
        w.moveable = (opts & 8) == 0;
        w.mainUI = 3;
        if(okText != null && okText.length > 0)
        {
            var btns = w.buttons = Xjs.ui.Panel.newOkButtons(okText,null);
            for(var i=0;i < btns.length;i++)
            {
                if(btns[i].command != "cancel")
                    btns[i].okCommand = true;
            }
        } else 
        {
            w.buttons = Xjs.ui.Panel.newCloseButton();
        }
        if(onClose)
            w.addListener(opts & 4 ? "onClosed" : (opts & 2 ? "onOk" : "onClosing"),onClose);
        var dom = w.getDOM();
        Xjs.DOM.addClass(dom,"ui-msgbox-" + type);
        var btnDOM = Xjs.DOM.findById("BTN",dom),
            btnParent = btnDOM.parentNode;
        btnParent.removeChild(btnDOM);
        var firstBtn = null;
        for(var i=0;i < w.buttons.length;i++)
        {
            var b = btnDOM.cloneNode(true);
            b.id = "btn_" + w.buttons[i].command;
            Xjs.DOM.addClass(b,w.buttons[i].command);
            var e = Xjs.DOM.findById("CONTENT",b);
            Xjs.DOM.setTextContent(e || b,w.buttons[i].text);
            btnParent.appendChild(b);
            if(firstBtn == null)
                firstBtn = b;
        }
        w.attachButtons(w.dom,w.buttons,"btn_");
        var msgDOM = Xjs.DOM.findById("INFO",dom);
        if(typeof(message) == "string")
        {
            var ms = message;
            if((opts & 1) != 0)
            {
                msgDOM.innerHTML = ms;
            } else 
            {
                var a = ms.split("\n");
                for(var i=0;i < a.length;i++)
                {
                    var s = Xjs.HtmlUTIL.fillPrefixBlank(a[i]),
                        textNode = document.createTextNode(s);
                    msgDOM.appendChild(textNode);
                    msgDOM.appendChild(document.createElement("br"));
                }
            }
        } else if(message instanceof Xjs.ui.Component)
        {
            msgDOM.appendChild(message.getDOM());
        }
        if(title)
        {
            var titleDOM = Xjs.DOM.findById("TITLE",dom);
            Xjs.DOM.setTextContent(titleDOM,title);
        }
        if(firstBtn)
            w.setFirstFocusComp(new Xjs.ui.Component({dom:firstBtn}));
        w.showModal();
        if(firstBtn)
            firstBtn.focus();
        return w;
    },
    /*xjs.ui.util.UIUtil.showMessageBoxLayer*/
    showMessageBoxLayer:function(type,message)
    {
        var layer = new Xjs.ui.util.UIUtil$MessageBoxLayer({type:type,message:message});
        layer.show();
    },
    /*xjs.ui.util.UIUtil.showErrorDialog*/
    showErrorDialog:function(title,message,onClosing,okText,opts)
    {
        Xjs.ui.UIUtil.showMessageBox("error",title,message,onClosing,okText,opts);
    },
    /*xjs.ui.util.UIUtil.showSuccessInfoDialog*/
    showSuccessInfoDialog:function(title,message,onClosing)
    {
        Xjs.ui.UIUtil.showMessageBox("success",title,message,onClosing,null,0);
    },
    /*xjs.ui.util.UIUtil.showInfoDialog*/
    showInfoDialog:function(title,message,onClosing)
    {
        Xjs.ui.UIUtil.showMessageBox("information",title,message,onClosing,null,0);
    },
    /*xjs.ui.util.UIUtil.showYesNoDialog*/
    showYesNoDialog:function(title,message,onOk,okText,opts)
    {
        if(okText == null)
        {
            okText = Xjs.ui.UIUtil.newYesNoBtnText();
        }
        Xjs.ui.UIUtil.showMessageBox("question",title,message,onOk,okText,opts || 0);
    },
    /*xjs.ui.util.UIUtil.newYesNoBtnText*/
    newYesNoBtnText:function()
    {
        var res = Xjs.ResBundle.getRes("UI");
        return ["yes:" + res.get("Dlg.Yes"),"no:" + res.get("Dlg.No"),"cancel:" + res.get("Dlg.Close")];
    },
    /*xjs.ui.util.UIUtil.showConfirmDialog*/
    showConfirmDialog:function(title,message,onOk,okText,opts,wcfg)
    {
        if(okText == null)
        {
            var res = Xjs.ResBundle.getRes("UI");
            okText = ["ok:" + res.get("Dlg.Ok"),"cancel:" + res.get("Dlg.Cancel")];
        }
        Xjs.ui.UIUtil.showMessageBox("question",title,message,onOk,okText,opts || 0);
    },
    /*xjs.ui.util.UIUtil.askChoice*/
    askChoice:function(title,text,defaultValue,onOk,options,size)
    {
        var selOpts = new Array(text.length);
        for(var i=0;i < text.length;i++)
        {
            selOpts[i] = [i,text[i]];
        }
        var idxList = new Xjs.ui.List({id:"idxlist",name:"idxlist",checkVisible:true,showCode:false,labelCheck:true,selectOptions:selOpts,nonBlank:true,value:defaultValue,intValue:true,className:"ui-nobglist ui-askchoice-list"});
        if((options & 1) != 0)
        {
            idxList.multiple = true;
            idxList.arrayValue = true;
        }
        var cfg = {title:title,resizeable:false,itemsLayout:new Xjs.ui.DefaultLayout(),items:[idxList]};
        if(size)
        {
            if(size.width > 0)
                cfg.width = size.width;
            if(size.height > 0)
                cfg.height = size.height;
        }
        var w = Xjs.ui.UIUtil.newWindow(cfg);
        Xjs.DOM.addClass(w.getDOM(),"ui-askchoice-win");
        if(onOk)
        {
            w.addListener("onOk",onOk);
        }
        w.showModal();
    },
    /*xjs.ui.util.UIUtil.loadAidInputer*/
    loadAidInputer:function(codetbl)
    {
        var m = Xjs.RInvoke.rmInvoke("snsoft.ui.tools.UICompParamAccess.getAidInputer",codetbl);
        return m ? Xjs.util.LazyLoadValue.eval(m.aidInputer) : null;
    },
    /*xjs.ui.util.UIUtil.getTempIFrameDOM*/
    getTempIFrameDOM:function()
    {
        if(!Xjs.ui.UIUtil.tempIFrameDOM)
        {
            var ifName = "temp$iframe";
            Xjs.ui.UIUtil.tempIFrameDOM = Xjs.isIE && Xjs.$browserVer < 9 ? document.createElement("<iframe name='" + ifName + "'></iframe>") : document.createElement("iframe");
            Xjs.ui.UIUtil.tempIFrameDOM.name = ifName;
            Xjs.ui.UIUtil.tempIFrameDOM.style.width = "0px";
            Xjs.ui.UIUtil.tempIFrameDOM.style.height = "0px";
            Xjs.ui.UIUtil.tempIFrameDOM.style.display = "none";
            document.body.appendChild(Xjs.ui.UIUtil.tempIFrameDOM);
        }
        return Xjs.ui.UIUtil.tempIFrameDOM;
    },
    /*xjs.ui.util.UIUtil.addWinMsgListener*/
    addWinMsgListener:function(mt,f)
    {
        if(!Xjs.ui.UIUtil.winMsgListeners)
            Xjs.ui.UIUtil.winMsgListeners = {};
        var a = Xjs.ui.UIUtil.winMsgListeners[mt];
        if(!a)
        {
            Xjs.ui.UIUtil.winMsgListeners[mt] = a = [f];
        } else 
        {
            a.push(f);
        }
    },
    /*xjs.ui.util.UIUtil._onWinMessage*/
    _onWinMessage:function(e)
    {
        if(!e.data)
            return;
        var mt = e.data.msgtype;
        if(mt)
        {
            switch(mt)
            {
            case "updateBodyStyle":
                {
                    Xjs.apply(document.body,e.data.style);
                    break;
                }
            case "parentListenWinScroll":
                {
                    window.addEventListener("scroll",Xjs.ui.UIUtil._postParentOnScroll,false);
                    break;
                }
            case "checkCompShowing":
                {
                    if(window._MainUI)
                        window._MainUI.checkShowing(new Array(1),true);
                    break;
                }
            case "onWinResize":
                {
                    if(window._MainUI)
                        window._MainUI.onResize();
                    break;
                }
            case "refreshMainTable":
                {
                    if(window._MainUI)
                    {
                        var t = window._MainUI.getMainComponentByName(e.data.table);
                        if(t)
                            t.refreshTable();
                    }
                    break;
                }
            case "setWinLocation":
                {
                    var url = e.data.url;
                    if(url)
                        window.location.href = url;
                    break;
                }
            case "closeTopLayer":
                {
                    Xjs.ui.Layer.closeTop();
                    break;
                }
            case "addDocCls":
                {
                    Xjs.DOM.addClass(document.documentElement,e.data.cls);
                    break;
                }
            case "removeDocCls":
                {
                    Xjs.DOM.removeClass(document.documentElement,e.data.cls);
                    break;
                }
            case "tablecmd":
                {
                    var cmd = e.data.cmd;
                    if(window._MainUI && Xjs.table.Table)
                    {
                        var tbls = window._MainUI.getMainComponents(Xjs.table.Table);
                        if(tbls && tbls.length > 0)
                        {
                            var t = tbls[0].getToolbarAttachedTable(),
                                f = t["oncmd_" + cmd];
                            if(typeof(f) == "function")
                            {
                                f.call(t);
                            }
                        }
                    }
                    break;
                }
            case "info":
                {
                    var msg = e.data.msg;
                    window.console.log("location = " + window.location);
                    window.console.log("     msg = " + msg);
                    break;
                }
            case "onUserLoginOK":
                {
                    if(!Xjs._uiInited && !(Xjs.ui.UIUtil.winMsgListeners ? Xjs.ui.UIUtil.winMsgListeners[mt] : null))
                    {
                        window.location.reload();
                    }
                    break;
                }
            }
            var a;
            if(a = Xjs.ui.UIUtil.winMsgListeners ? Xjs.ui.UIUtil.winMsgListeners[mt] : null)
            {
                for(var j=0;j < a.length;j++)
                {
                    a[j].call(e.data);
                }
            }
        }
    },
    /*xjs.ui.util.UIUtil._postParentOnScroll*/
    _postParentOnScroll:function(e)
    {
        var r = document.documentElement.getBoundingClientRect(),
            msg = {msgtype:"IFrameScroll",docClientRect:r};
        window.parent.postMessage(msg,"*");
    },
    /*xjs.ui.util.UIUtil.fitPIFrameSize*/
    fitPIFrameSize:function(docSize,flags)
    {
        var pw;
        if(window == (pw = window.parent))
            return;
        init:if(Xjs.ui.UIUtil._iFrmOnParentWin === undefined)
            {
                Xjs.ui.UIUtil._iFrmOnParentWin = null;
                try
                {
                    if(pw.document.domain != document.domain)
                        ;
                }catch(ex)
                {
                    Xjs.ui.UIUtil._iFrmOnParentWin = "cross-domain";
                    break init;
                }
                var ifrms = pw.document.getElementsByTagName("IFRAME");
                if(ifrms)
                    for(var i=0;i < ifrms.length;i++)
                    {
                        if(ifrms[i].contentWindow == window)
                        {
                            Xjs.ui.UIUtil._iFrmOnParentWin = ifrms[i];
                            break;
                        }
                    }
            }
        if(Xjs.ui.UIUtil._iFrmOnParentWin)
        {
            if(Xjs.ui.UIUtil._iFrmOnParentWin == "cross-domain" || flags & 4)
            {
                var msg = {msgtype:"FitIFrameSize",width:docSize.width,height:docSize.height};
                window.parent.postMessage(msg,Xjs.getReqParameter("PWinDomain") || "*");
                return;
            }
            if(flags & 1)
                Xjs.DOM.setHeight(Xjs.ui.UIUtil._iFrmOnParentWin,docSize.height + 20);
            if(flags & 2)
                Xjs.DOM.setWidth(Xjs.ui.UIUtil._iFrmOnParentWin,docSize.width + 20);
        }
    },
    /*xjs.ui.util.UIUtil.getUiid*/
    getUiid:function(funcid)
    {
        var funcService = Xjs.RInvoke.newBean("SN-UI.FuncService");
        return funcService.getUiid(funcid);
    },
    /*xjs.ui.util.UIUtil.buildFuncOpenURI*/
    buildFuncOpenURI:function(funcid,pm)
    {
        var uiid = Xjs.ui.UIUtil.getUiid(funcid);
        return Xjs.ui.UIUtil.buildUIOpenURI(uiid,pm);
    },
    /*xjs.ui.util.UIUtil.buildUIOpenURI*/
    buildUIOpenURI:function(uiid,pm)
    {
        var uri = uiid + ".html";
        ;
        if(uri.indexOf("_v=") < 0 && window.EnvParameter.v)
        {
            uri += (uri.indexOf("?") > 0 ? "&" : "?") + "_v=" + window.EnvParameter.v;
        }
        if(pm)
        {
            var join = "#?";
            for(var nm in pm)
            {
                uri += join + nm + "=" + encodeURIComponent(pm[nm]);
                join = "&";
            }
        }
        return uri;
    },
    /*xjs.ui.util.UIUtil.buildAttachURL*/
    buildAttachURL:function(value,inlineAttachment)
    {
        if(value)
        {
            if(typeof(value) != "string")
                return null;
            var s = value,
                pFN = s.lastIndexOf('|'),
                startUrl = pFN >= 0 ? s.substring(0,pFN) : s,
                url = Xjs.ROOTPATH + "fs/" + window.EnvParameter.wsp;
            if(startUrl.indexOf("fs/") >= 0)
            {
                url += "!" + startUrl.substring(startUrl.indexOf("fs/") + 3);
            } else 
            {
                url += "!" + startUrl;
            }
            url += "?_downloadmode=" + (inlineAttachment ? 1 : 2) + "&_nocache=true&_rnd=" + (new Date()).getTime();
            url += "&filenamex=" + String.hexEncode(value);
            return url;
        }
        return null;
    },
    /*xjs.ui.util.UIUtil.refreshMsgTips*/
    refreshMsgTips:function()
    {
        var mainPage = window.parent.MainPage ? window.parent.MainPage : window.MainPage;
        if(mainPage && mainPage.refreshMsgTips)
        {
            mainPage.refreshMsgTips();
        }
    },
    /*xjs.ui.util.UIUtil.onClickMsgDom*/
    onClickMsgDom:function()
    {
        var mainPage = window.parent.MainPage ? window.parent.MainPage : window.MainPage;
        if(mainPage && mainPage.onClickMsgDom)
        {
            mainPage.onClickMsgDom();
        }
    },
    /*xjs.ui.util.UIUtil.wopenUI*/
    wopenUI:function(title,uiid,pm)
    {
        var uri = Xjs.ui.UIUtil.buildUIOpenURI(uiid,pm);
        if(!Xjs.ui.UIUtil.openInIFrame(title,uri))
            window.open(uri,"_blank");
    },
    /*xjs.ui.util.UIUtil.openInIFrame*/
    openInIFrame:function(title,uri)
    {
        var mainPage;
        if(window.parent != window && (mainPage = Xjs.ui.UIUtil.getHomePage(window)))
        {
            return Xjs.ui.UIUtil.openInIFrameByPage(mainPage,title,uri);
        }
        return false;
    },
    /*xjs.ui.util.UIUtil.reloadLeftMenus*/
    reloadLeftMenus:function()
    {
        var mainPage;
        if(mainPage = Xjs.ui.UIUtil.getHomePage(window))
        {
            mainPage.reloadMenu();
        }
    },
    /*xjs.ui.util.UIUtil.openInIFrameByPage*/
    openInIFrameByPage:function(mainPage,title,uri)
    {
        if(mainPage)
        {
            if(uri.indexOf("://") < 0 && !uri.startsWith("/"))
            {
                var url = document.URL,
                    p0;
                if(url && (p0 = url.indexOf("://")) > 0)
                {
                    var p = url.indexOf('?');
                    if(p > 0)
                        url = url.substring(0,p);
                    p = url.lastIndexOf('/');
                    if(p > p0 + 4)
                        uri = url.substring(0,p + 1) + uri;
                }
            }
            if(mainPage.openWindow)
            {
                mainPage.openWindow(title,uri,uri);
                return true;
            }
            var basHomePage = mainPage.basHomePage;
            if(basHomePage && basHomePage.openWindow)
            {
                basHomePage.openWindow(title,uri,uri);
                return true;
            }
        }
        return false;
    },
    /*xjs.ui.util.UIUtil.setTableShow*/
    setTableShow:function(tblname)
    {
        if(!tblname)
        {
            tblname = Xjs.getReqParameter("initTblname");
        }
        if(!tblname)
        {
            return;
        }
        var s = window.location.pathname.lastIndexOf("/"),
            e = window.location.pathname.lastIndexOf("."),
            muiid = window.location.pathname.substring(s + 1,e).replace(new RegExp("[\\.\\-]","g"),"_"),
            provider = window.UI["$" + muiid];
        if(!provider)
        {
            return;
        }
        var c = provider.$ui.getMainComponentByName(tblname);
        if(!c)
        {
            return;
        }
        var ps = [],
            p = c;
        do {
                ps.push(p);
            }while((p = p.parent) != null);
        for(var i=ps.length - 1;i > 0;i--)
        {
            if(ps[i] instanceof Xjs.ui.TabPanel)
            {
                var j = ps[i].indexOfItem(ps[i - 1]);
                ps[i].setActiveTab(j);
            }
        }
    },
    /*xjs.ui.util.UIUtil.closeSelectedInIFrame*/
    closeSelectedInIFrame:function()
    {
        var mainPage;
        if(window.parent != window && (mainPage = Xjs.ui.UIUtil.getHomePage(window)))
        {
            if(mainPage.closeSelectedWindow)
                return mainPage.closeSelectedWindow();
            var basHomePage = mainPage.basHomePage;
            if(basHomePage && basHomePage.closeSelectedWindow)
                return basHomePage.closeSelectedWindow();
        }
        return false;
    },
    /*xjs.ui.util.UIUtil.fireIWinMessage*/
    fireIWinMessage:function()
    {
        var mainPage;
        if(window.parent != window && (mainPage = Xjs.ui.UIUtil.getHomePage(window)))
        {
            if(mainPage.fireIWinMessage)
            {
                mainPage.fireIWinMessage.apply(mainPage,arguments);
            } else 
            {
                var basHomePage = mainPage.basHomePage;
                if(basHomePage != null && basHomePage.fireIWinMessage)
                {
                    basHomePage.fireIWinMessage.apply(basHomePage,arguments);
                }
            }
        }
    },
    /*xjs.ui.util.UIUtil.onIWinMessage*/
    onIWinMessage:function()
    {
        if(window._MainUI)
            window._MainUI.fireAllMCompEvent.apply(window._MainUI,arguments);
    },
    /*xjs.ui.util.UIUtil.hasTagHtml*/
    hasTagHtml:function(context)
    {
        var contextHtml = document.createElement("div");
        contextHtml.innerHTML = context;
        var childNodes = contextHtml.childNodes;
        if(childNodes && childNodes.length > 0)
        {
            for(var i=0;i < childNodes.length;i++)
            {
                var childNode = childNodes[i],
                    nodeType = childNode.nodeType;
                if(nodeType == 1)
                {
                    return true;
                }
            }
        }
        return false;
    },
    /*xjs.ui.util.UIUtil.getHomePage*/
    getHomePage:function(window)
    {
        if(!window)
            return null;
        try
        {
            var mainPage = window.parent.MainPage;
            if(mainPage)
            {
                return mainPage;
            }
        }catch(e)
        {
            return null;
        }
        if(window == window.parent)
        {
            return null;
        }
        return Xjs.ui.UIUtil.getHomePage(window.parent);
    },
    /*xjs.ui.util.UIUtil.showDelConfirmDialog*/
    showDelConfirmDialog:function(title,functionCall)
    {
        Xjs.ui.UIUtil.showConfirmDialog(title,Xjs.ResBundle.getRes("UI").get("Tbl.DeletePrompt.Content"),functionCall,null);
    },
    /*xjs.ui.util.UIUtil.performConfirm*/
    performConfirm:function(r,onConfirm)
    {
        if(r.type == 1)
        {
            Xjs.ui.UIUtil.showMessageBox("question",r.title,r.prompt,onConfirm,r.confirmMsgBoxBtns == null ? Xjs.ui.UIUtil.newYesNoBtnText() : r.confirmMsgBoxBtns,r.confirmMsgBoxOpts,r.confirmMsgBoxCfg);
        } else if(r.type == 2)
        {
            r.showConfirm.call(onConfirm);
        } else 
        {
            Xjs.ui.UIUtil.showConfirmDialog(r.title,r.prompt,onConfirm,null,r.confirmMsgBoxOpts,r.confirmMsgBoxCfg);
        }
    },
    /*xjs.ui.util.UIUtil._newConfirmPromise1*/
    _newConfirmPromise1:function(r)
    {
        return new Promise(function(resolve,reject){
            var onClose = function(d,cmd){
            var f;
            if((cmd == "yes" || cmd == "ok") && (f = r.perform))
            {
                f.call();
            }
            if(cmd == "yes" || cmd == "ok" || cmd == "no" && r.performIfNo !== false)
            {
                resolve(cmd);
            } else 
            {
                var ex = new Error(cmd);
                ex.dummy = true;
                reject(ex);
            }
        };
            Xjs.ui.UIUtil.performConfirm(r,new Xjs.FuncCall(onClose,window));
        });
    },
    /*xjs.ui.util.UIUtil._newConfirmPromise2*/
    _newConfirmPromise2:function(p,r)
    {
        if(!r)
            return p;
        if(p)
        {
            return p.then(function(cmd){
            return Xjs.ui.UIUtil._newConfirmPromise1(r);
        });
        } else 
        {
            return Xjs.ui.UIUtil._newConfirmPromise1(r);
        }
    },
    /*xjs.ui.util.UIUtil.newConfirmPromise*/
    newConfirmPromise:function()
    {
        var a = arguments;
        if(!a || a.length == 0)
            return null;
        var p = null,
            i = 0;
        if(a[0] instanceof Promise)
        {
            p = a[0];
            i++;
        }
        for(;i < a.length;i++)
        {
            if(a[i] instanceof Array)
            {
                var ra = a[i];
                for(var j=0;j < ra.length;j++)
                {
                    p = Xjs.ui.UIUtil._newConfirmPromise2(p,ra[j]);
                }
            } else 
            {
                p = Xjs.ui.UIUtil._newConfirmPromise2(p,a[i]);
            }
        }
        return p;
    },
    /*xjs.ui.util.UIUtil.addHtmCls*/
    addHtmCls:function(cls)
    {
        var html = document.getElementsByTagName("html")[0],
            c = {};
        for(var i=0;i < cls.length;i++)
        {
            var s = cls[i];
            if(s == null || s == "")
                continue;
            if(s.charCodeAt(0) == 0x2d || s.charCodeAt(0) == 0x7e)
            {
                s = s.substring(1);
                if(!Xjs.DOM.hasClass(html,s))
                {
                    continue;
                }
                if(!c.rmCls)
                {
                    c.rmCls = [];
                }
                c.rmCls.push(s);
            } else 
            {
                if(Xjs.DOM.hasClass(html,s))
                {
                    continue;
                }
                if(!c.addCls)
                {
                    c.addCls = [];
                }
                c.addCls.push(s);
            }
        }
        if(!c.addCls && !c.rmCls)
            return null;
        Xjs.ui.UIUtil.updateHtmlCls(c,false);
        return c;
    },
    /*xjs.ui.util.UIUtil.updateHtmlCls*/
    updateHtmlCls:function(c,restore)
    {
        if(!c)
            return;
        var rmCls = restore ? c.addCls : c.rmCls,
            html = document.getElementsByTagName("html")[0];
        if(rmCls)
            for(var j=0;j < rmCls.length;j++)
            {
                Xjs.DOM.removeClass(html,rmCls[j]);
            }
        var addCls = restore ? c.rmCls : c.addCls;
        if(addCls)
            for(var j=0;j < addCls.length;j++)
            {
                Xjs.DOM.addClass(html,addCls[j]);
            }
    }
};
{
    window.addEventListener("message",Xjs.ui.UIUtil._onWinMessage,false);
}Xjs.ui.TempProgressOnRunListebner = Xjs.applyIf({
    /*xjs.ui.util.TempProgressOnRunListebner.addNotify*/
    addNotify:Xjs.emptyFn,
    /*xjs.ui.util.TempProgressOnRunListebner.onRunProgress*/
    onRunProgress:function(progPane,retValue)
    {
        if(this.onRunCall)
        {
            this.onRunCall.call(retValue);
        }
    },
    /*xjs.ui.util.TempProgressOnRunListebner.onLockRunProgress*/
    onLockRunProgress:function(progPane,lock)
    {
        if(this.onLockRun)
        {
            this.onLockRun.call(progPane,lock);
        }
    },
    /*xjs.ui.util.TempProgressOnRunListebner.onClosed*/
    onClosed:function(progressPane)
    {
        Function.setTimeout(progressPane.removeListener,progressPane,100,false,this);
    }
},Xjs.ui.DefaultProgressPaneListener);
/*xjs/util/ConfirmPerform.java*/
Xjs.namespace("Xjs.util");
Xjs.util.ConfirmPerform=function(title,closeReq,perform){
    this.closeReq = closeReq;
    this.perform = perform;
    this.title = title;
    perform.args = Array.cloneArray(perform.args || []);
    perform.args.push(this);
};
Xjs.apply(Xjs.util.ConfirmPerform.prototype,{
    i:0,
    /*xjs.util.ConfirmPerform.confirmPerform*/
    confirmPerform:function()
    {
        var p = Xjs.ui.UIUtil.newConfirmPromise(this.closeReq),
            perform = this.perform;
        if(!p)
        {
            perform.call();
        } else 
        {
            p.then(function(v){
            perform.call();
        }).catch(function(ex){
            if(!ex.dummy)
                throw ex;
        });
        }
    }
});
/*xjs/util/JsLoad.java*/
Xjs.JsLoad = {
    /*xjs.util.JsLoad.load*/
    load:function(js,mode)
    {
        return Xjs.JsLoad.ajaxLoadJS(Xjs.JsLoad.urlIfUnload({lib:js,m:mode}));
    },
    /*xjs.util.JsLoad.urlIfUnload*/
    urlIfUnload:function(lib)
    {
        var js;
        if(!lib || (js = lib.lib) == "xjs-base")
            return null;
        var mode = lib.m || 0;
        if(mode == 0 || mode == 1)
        {
            if(Xjs.loadedXjs.indexOf(js) >= 0)
            {
                return null;
            }
            var url = Xjs.ROOTPATH + "xjslib";
            if(window._debug_)
                url += "_debug";
            url += "/" + js + ".js";
            if(!window._debug_ && mode == 1)
                url += ".~gzip";
            if(window.EnvParameter && window.EnvParameter.v)
            {
                url += "?_v=" + window.EnvParameter.v;
            }
            return url;
        } else 
        {
            return Xjs.toFullURL(js,2);
        }
    },
    /*xjs.util.JsLoad.ajaxLoadJS*/
    ajaxLoadJS:function(url)
    {
        if(!url)
            return true;
        var ajax = new Xjs.Ajax({url:url,postBody:null,method:"get"});
        ajax.request();
        if(ajax.responseIsSuccess())
        {
            window.eval(ajax.conn.responseText);
            return true;
        }
        throw new Error(url + ":装载失败");
    },
    /*xjs.util.JsLoad._onScriptLoadSuccess*/
    _onScriptLoadSuccess:function(ev)
    {
        var e = ev.srcElement || ev.target;
        e.onload = null;
        e.onerror = null;
        var a = e._promiseCommits;
        delete e._promiseCommits;
        Xjs.promiseCommit(a,e.src);
    },
    /*xjs.util.JsLoad._onScriptLoadFail*/
    _onScriptLoadFail:function(ev)
    {
        var e = ev.srcElement || ev.target;
        e.onload = null;
        e.onerror = null;
        e._loadFail = true;
        var a = e._promiseCommits;
        delete e._promiseCommits;
        Xjs.promiseCommit(a,e.src,true);
    },
    /*xjs.util.JsLoad.asynLoadJS*/
    asynLoadJS:function(url)
    {
        url = Xjs.toFullURL(url,2);
        var s0 = Xjs.DOM.getHeadScriptSrc(url);
        if(s0)
        {
            if(s0._promiseCommits)
            {
                return Xjs.joinPromiseCommit(s0);
            }
            return new Promise(function(resolve,reject){
            if(s0._loadFail)
                reject(s0.src);
            else 
                resolve(s0.src);
        });
        }
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = false;
        s.src = url;
        s.onload = Xjs.JsLoad._onScriptLoadSuccess;
        s.onerror = Xjs.JsLoad._onScriptLoadFail;
        Xjs.DOM.getHead().appendChild(s);
        return Xjs.joinPromiseCommit(s);
    },
    /*xjs.util.JsLoad.loadJsLibsOfVar*/
    loadJsLibsOfVar:function(v)
    {
        var hasVar = null;
        try
        {
            hasVar = eval(v);
        }catch(e)
        {
        }
        if(hasVar)
            return true;
        Xjs.JsLoad.loadJsLibs(Xjs.RInvoke.rmInvoke("snsoft.ui.xjs.XjsLibMeta.rgetJsLibs",v));
        return true;
    },
    /*xjs.util.JsLoad.asynLoadJsLibsOfVar*/
    asynLoadJsLibsOfVar:function(v)
    {
        var hasVar = null;
        try
        {
            hasVar = eval(v);
        }catch(e)
        {
        }
        if(hasVar)
        {
            return new Promise(function(resolve,reject){
            resolve(true);
        });
        }
        return Xjs.JsLoad.asynAjaxLoadLibs(Xjs.RInvoke.rmInvoke("snsoft.ui.xjs.XjsLibMeta.rgetJsLibs",v),0);
    },
    /*xjs.util.JsLoad.loadJsLibs*/
    loadJsLibs:function(libs)
    {
        if(libs)
            for(var i=0;i < libs.length;i++)
            {
                var lib = Xjs.JsLoad.decodeJSLIB(libs[i]);
                Xjs.JsLoad.ajaxLoadJS(Xjs.JsLoad.urlIfUnload(lib));
            }
    },
    /*xjs.util.JsLoad.newObject*/
    newObject:function(clazz)
    {
        if(!Xjs.JsLoad.loadJsLibsOfVar(clazz))
            throw new Error("未定义类型 " + clazz);
        var f = eval(clazz),
            a = Array.prototype.slice.call(arguments,0);
        a[0] = f;
        return new (f.bind.apply(f,a))();
    },
    /*xjs.util.JsLoad.applyStatic*/
    applyStatic:function(m)
    {
        return Xjs.JsLoad.callStatic(m,Array.prototype.slice.call(arguments,1));
    },
    /*xjs.util.JsLoad.getStaicMethod*/
    getStaicMethod:function(m)
    {
        var p = m.lastIndexOf('.');
        if(p < 0)
            throw new Error("无效方法" + m);
        var cls = m.substring(0,p);
        if(!Xjs.JsLoad.loadJsLibsOfVar(cls))
            throw new Error("未定义类型 " + cls);
        return new Xjs.FuncCall(eval(m),eval(cls));
    },
    /*xjs.util.JsLoad.callStatic*/
    callStatic:function(m,a)
    {
        var f = Xjs.JsLoad.getStaicMethod(m);
        return f.apply(a);
    },
    /*xjs.util.JsLoad.loadJsLibOfVar*/
    loadJsLibOfVar:function(v,lib,mode)
    {
        var hasVar = null;
        try
        {
            hasVar = eval(v);
        }catch(e)
        {
        }
        if(hasVar != null)
            return true;
        return Xjs.JsLoad.load(lib,mode);
    },
    /*xjs.util.JsLoad.asynLoadJsLibOfVar*/
    asynLoadJsLibOfVar:function(v,lib,mode)
    {
        var hasVar = null;
        try
        {
            hasVar = eval(v);
        }catch(e)
        {
        }
        if(hasVar)
        {
            return new Promise(function(resolve,reject){
            resolve(true);
        });
        }
        var url = Xjs.JsLoad.urlIfUnload({lib:lib,m:mode});
        return Xjs.JsLoad.asynLoadJS(url).then(function(_v){
            return true;
        });
    },
    /*xjs.util.JsLoad.getBaseReqParameter*/
    getBaseReqParameter:function()
    {
        if(!window.EnvParameter || !window.EnvParameter.dftReqParameter)
            return null;
        var sa = window.EnvParameter.dftReqParameter.substring(1).split("&"),
            s = null;
        for(var i=0;i < sa.length;i++)
        {
            var p = sa[i].indexOf("=");
            if(p <= 0)
                continue;
            var nm = sa[i].substring(0,p);
            if(nm == "wsp" || nm == "lang" || nm == "theme")
            {
                s = s == null ? sa[i] : s + "&" + sa[i];
            }
        }
        return s;
    },
    /*xjs.util.JsLoad.addUICssLinks*/
    addUICssLinks:function(ui)
    {
        if(ui._$cssList)
            for(var j=0;j < ui._$cssList.length;j++)
            {
                var s = ui._$cssList[j];
                if(window.EnvParameter && window.EnvParameter.v)
                {
                    s += "?_v=" + window.EnvParameter.v;
                }
                Xjs.DOM.addHeaderCSSLink(s);
            }
    },
    /*xjs.util.JsLoad.loadUI*/
    loadUI:function(uiid,srootPath)
    {
        var $uiid = "$" + String.replaceInvalidIdPart(uiid),
            ui = window.UI[$uiid];
        if(!ui)
        {
            var s = (srootPath || "") + uiid + ".js";
            if(window.EnvParameter && window.EnvParameter.v)
            {
                s += "?_v=" + window.EnvParameter.v;
            }
            Xjs.JsLoad.ajaxLoadJS(s);
            ui = window.UI[$uiid];
            if(ui == null)
                throw new Error(uiid + ":装载失败");
            Xjs.JsLoad.addUICssLinks(ui);
            ui.status = 1;
            var libs;
            if(libs = Xjs.JsLoad.getUIJSLibs(ui))
                for(var i=0;i < libs.length;i++)
                {
                    Xjs.JsLoad.ajaxLoadJS(Xjs.JsLoad.urlIfUnload(libs[i]));
                }
            ui.status = 2;
        }
        return ui;
    },
    /*xjs.util.JsLoad.asynLoadUI*/
    asynLoadUI:function(uiid,srootPath)
    {
        var $uiid = "$" + String.replaceInvalidIdPart(uiid.replace("~","$"));
        {
            var ui = window.UI[$uiid];
            if(ui)
            {
                if(ui.status != 1)
                {
                    return new Promise(function(resolve,reject){
            resolve(ui);
        });
                } else 
                {
                    return Xjs.JsLoad._newPromiseForUILoad(ui);
                }
            }
        }
        var s = (srootPath || "") + uiid + ".js";
        if(window.EnvParameter && window.EnvParameter.v)
        {
            s += "?_v=" + window.EnvParameter.v;
        }
        return Xjs.JsLoad.asynLoadJS(s).then(function(jsUrl){
            var ui = window.UI[$uiid];
            Xjs.JsLoad.addUICssLinks(ui);
            var urls = Xjs.JsLoad.getUIJSLibs(ui);
            ui.status = 1;
            Xjs.JsLoad.asynAjaxLoadJS(urls,0).then(function(v){
            if(v.fail)
            {
                ui.status = -2;
            } else 
                ui.status = 2;
            Xjs.promiseCommit(ui._promiseCommits,ui);
            delete ui._promiseCommits;
        });
            return Xjs.JsLoad._newPromiseForUILoad(ui);
        });
    },
    /*xjs.util.JsLoad._newPromiseForUILoad*/
    _newPromiseForUILoad:function(ui)
    {
        return Xjs.joinPromiseCommit(ui);
    },
    /*xjs.util.JsLoad.getUIJSLibs*/
    getUIJSLibs:function(ui)
    {
        if(!ui._$jsList)
            return null;
        var n = ui._$jsList.length,
            libs = new Array(n);
        for(var i=0;i < n;i++)
        {
            libs[i] = Xjs.JsLoad.decodeJSLIB(ui._$jsList[i]);
        }
        return libs;
    },
    /*xjs.util.JsLoad.decodeJSLIB*/
    decodeJSLIB:function(lib)
    {
        if(!lib)
            return null;
        var m = 0;
        if(lib.startsWith("zlib:"))
        {
            m = 1;
            lib = lib.substring(5);
        } else if(lib.startsWith("js:"))
        {
            m = 2;
            lib = lib.substring(3);
        } else if(lib.endsWith(".js.~gzip"))
        {
            lib = lib.substring(0,lib.length - 9);
            m = 1;
        } else if(lib.endsWith(".js"))
        {
            lib = lib.substring(0,lib.length - 3);
        }
        return {lib:lib,m:m};
    },
    /*xjs.util.JsLoad.decodeJSLIBs*/
    decodeJSLIBs:function(urls)
    {
        if(!urls)
            return null;
        var a = new Array(urls.length);
        for(var i=0;i < a.length;i++)
            a[i] = Xjs.JsLoad.decodeJSLIB(urls[i]);
        return a;
    },
    /*xjs.util.JsLoad.asynAjaxLoadLibs*/
    asynAjaxLoadLibs:function(libs,opts)
    {
        return Xjs.JsLoad.asynAjaxLoadJS(Xjs.JsLoad.decodeJSLIBs(libs),opts);
    },
    /*xjs.util.JsLoad.asynAjaxLoadJS*/
    asynAjaxLoadJS:function(libs,opts)
    {
        var all = [];
        if(libs)
            for(var i=0;i < libs.length;i++)
            {
                var url = Xjs.JsLoad.urlIfUnload(libs[i]);
                if(!url)
                    continue;
                all.push(Xjs.JsLoad.asynLoadJS(url));
            }
        return Promise.all(all).then(function(urls){
            return {success:urls};
        });
    }
};
/*xjs/util/LazyLoadValue.java*/
Xjs.util.LazyLoadValue=function(cfg){
    Xjs.apply(this,cfg);
};
Xjs.apply(Xjs.util.LazyLoadValue.prototype,{
    /*xjs.util.LazyLoadValue.getValue*/
    getValue:function()
    {
        if(this.val !== undefined)
            return this.val;
        Xjs.JsLoad.loadJsLibs(this.libs);
        if(this.json)
            return this.val = eval(this.json);
        if(this.loader)
            return this.val = this.loader.call();
        return this.val = null;
    }
});
Xjs.apply(Xjs.util.LazyLoadValue,{
    /*xjs.util.LazyLoadValue.eval*/
    eval:function(v)
    {
        return v instanceof Xjs.util.LazyLoadValue ? v.getValue() : v;
    }
});
/*xjs/util/ResBundle.java*/
Xjs.util.ResBundle$Res=function(m){
    this.m = m;
};
Xjs.apply(Xjs.util.ResBundle$Res.prototype,{
    /*xjs.util.ResBundle$Res.get*/
    get:function(key)
    {
        var p = Array.binarySearch(this.m,key,Array.arrayCmpV);
        return p >= 0 ? this.m[p][1] : null;
    },
    /*xjs.util.ResBundle$Res.getArray*/
    getArray:function(keys)
    {
        var names = new Array(keys.length);
        for(var i=0;i < keys.length;i++)
        {
            var p = Array.binarySearch(this.m,keys[i],Array.arrayCmpV);
            if(p < 0)
            {
                continue;
            }
            names[i] = this.m[p][1];
        }
        return names;
    },
    /*xjs.util.ResBundle$Res.set*/
    set:function(name,value)
    {
        throw new Error("No Supported!");
    }
});
Xjs.util.ResBundle$ResMap=function(){};
Xjs.apply(Xjs.util.ResBundle$ResMap.prototype,{
    /*xjs.util.ResBundle$ResMap.get*/
    get:function(key)
    {
        var p = key ? key.indexOf(".") : -1;
        if(p < 0)
            return null;
        return Xjs.ResBundle.getString(key.substring(0,p),key.substring(p + 1));
    },
    /*xjs.util.ResBundle$ResMap.set*/
    set:function(name,value)
    {
        throw new Error("No Supported!");
    }
});
Xjs.ResBundle = {
    /*xjs.util.ResBundle.getStrings*/
    getStrings:function(sysid)
    {
        var lang = window.EnvParameter.lang;
        if(!lang)
        {
            lang = Xjs.getLocalLang("zh").replace("-","_");
        }
        var key = sysid + "_" + lang,
            m = Xjs.ResBundle[key];
        if(!m)
        {
            var p = {};
            p.SYSID = sysid;
            p.LANGUAGE = lang;
            m = Xjs.RInvoke.rmGet("snsoft.bas.util.resbundle.DxResBundle$UIValue.new",p);
            if(m == null)
                m = [];
            Xjs.ResBundle[key]=m;
        }
        return m;
    },
    /*xjs.util.ResBundle.getRes*/
    getRes:function(sysid)
    {
        return new Xjs.util.ResBundle$Res(Xjs.ResBundle.getStrings(sysid));
    },
    /*xjs.util.ResBundle.getStringArray*/
    getStringArray:function(sysid,keys)
    {
        var m = Xjs.ResBundle.getStrings(sysid),
            names = new Array(keys.length);
        for(var i=0;i < keys.length;i++)
        {
            var p = Array.binarySearch(m,keys[i],Array.arrayCmpV);
            if(p < 0)
            {
                continue;
            }
            names[i] = m[p][1];
        }
        return names;
    },
    /*xjs.util.ResBundle.getString*/
    getString:function(sysid,key)
    {
        var m = Xjs.ResBundle.getStrings(sysid),
            p = Array.binarySearch(m,key,Array.arrayCmpV),
            text = p >= 0 ? m[p][1] : null;
        if(text == null || arguments.length <= 2)
            return text;
        var args = new Array(arguments.length - 1);
        args[0] = text;
        for(var j=0;j < arguments.length - 2;j++)
            args[1 + j] = arguments[2 + j];
        return String.format.apply(null,args);
    },
    /*xjs.util.ResBundle.getResMap*/
    getResMap:function()
    {
        if(!Xjs.ResBundle._resMap)
            Xjs.ResBundle._resMap = new Xjs.util.ResBundle$ResMap();
        return Xjs.ResBundle._resMap;
    },
    /*xjs.util.ResBundle.replaceResMacro*/
    replaceResMacro:function(text)
    {
        if(!text || text.indexOf("${RES.") < 0)
            return text;
        return String.macroReplace(text,Xjs.ResBundle.getResMap(),"${RES.","}",null,"?");
    }
};
/*xjs/util/SortedArray.java*/
Xjs.util.SortedArray=function(cmp){
    this.data = [];
    this.cmp = cmp;
};
Xjs.apply(Xjs.util.SortedArray.prototype,{
    /*xjs.util.SortedArray.toArray*/
    toArray:function()
    {
        return this.data;
    },
    /*xjs.util.SortedArray.indexOf*/
    indexOf:function(value)
    {
        return this.cmp ? Array.binarySearch(this.data,value,this.cmp) : Array.binarySearch(this.data,value);
    },
    /*xjs.util.SortedArray.clear*/
    clear:function()
    {
        this.data.length = 0;
    },
    /*xjs.util.SortedArray.size*/
    size:function()
    {
        return this.data.length;
    },
    /*xjs.util.SortedArray.get*/
    get:function(i)
    {
        return this.data[i];
    },
    /*xjs.util.SortedArray.add*/
    add:function(value)
    {
        var p = this.indexOf(value);
        if(p >= 0)
            return p;
        this.data.splice(-(p + 1),0,value);
        return -(p + 1);
    },
    /*xjs.util.SortedArray.remove*/
    remove:function(value)
    {
        var p = this.indexOf(value);
        if(p >= 0)
        {
            this.data.splice(p,1);
        }
    },
    /*xjs.util.SortedArray.removeByIndex*/
    removeByIndex:function(p)
    {
        if(p >= 0 && p < this.data.length)
            this.data.splice(p,1);
    },
    /*xjs.util.SortedArray.join*/
    join:function(s)
    {
        return this.data.join(s);
    }
});
/*xjs/util/Utils.java*/
Xjs.Utils = {
    /*xjs.util.Utils.chnChar2Assic*/
    chnChar2Assic:function(s)
    {
        if(!s)
            return s;
        var a = [],
            n = s.length,
            changed = false;
        for(var i=0;i < n;i++)
        {
            var c = s.charCodeAt(i);
            if(c >= 0xff01 && c <= 0xff5e)
            {
                c = c + 0x21 - 0xff01;
                changed = true;
            }
            a.push(String.fromCharCode(c));
        }
        return changed ? a.join("") : s;
    },
    /*xjs.util.Utils.formatTac*/
    formatTac:function(text)
    {
        var tac = text;
        if(tac == null || (tac = tac.trim()).length == 0)
        {
            return text;
        }
        var prefix = new RegExp("^((if)|(try)|(for)|(while)|(loop)|(proc))(\\s|\\(|$)","g"),
            suffix = new RegExp("^(end)(\\s)","g"),
            middle = new RegExp("^((elif)|(else)|(catch)|(finally))(\\s?|$)","g"),
            lines = tac.split("\n"),
            cnt = 0,
            str = "";
        for(var i=0;i < lines.length;i++)
        {
            var line = lines[i].trim();
            if(prefix.test(line))
            {
                line = String.newString("\t",cnt++) + line;
            } else if(middle.test(line))
            {
                line = String.newString("\t",cnt - 1) + line;
            } else if(suffix.test(line))
            {
                line = String.newString("\t",--cnt) + line;
            } else 
            {
                line = String.newString("\t",cnt) + line;
            }
            if(str.length > 0)
            {
                str += "\n";
            }
            str += line;
            prefix.lastIndex = 0;
            suffix.lastIndex = 0;
            middle.lastIndex = 0;
        }
        return str;
    }
};
/*xjs/util/ValueMap.java*/
Xjs.util.ValueMap=function(values){
    this.values = values == null ? {} : values;
};
Xjs.apply(Xjs.util.ValueMap.prototype,{
    /*xjs.util.ValueMap.get*/
    get:function(name)
    {
        return this.values[name];
    },
    /*xjs.util.ValueMap.set*/
    set:function(name,value)
    {
        if(value != null)
        {
            this.values[name] = value;
        } else 
        {
            delete this.values[name];
        }
    }
});
