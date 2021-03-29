Xjs.loadedXjs.push("tools/LocalSettings");
/*snsoftx/tools/LocalSettings.java*/
Xjs.namespace("snsoftx.tools");
snsoftx.tools.LocalSettings$Settings=function(namePrefix,items){
    this.namePrefix = namePrefix;
    this.items = items;
};
Xjs.apply(snsoftx.tools.LocalSettings$Settings.prototype,{
    /*snsoftx.tools.LocalSettings$Settings.getItemValue*/
    getItemValue:function(name)
    {
        return window.localStorage[(this.namePrefix || "") + name];
    },
    /*snsoftx.tools.LocalSettings$Settings.setItemValue*/
    setItemValue:function(name,value)
    {
        window.localStorage[(this.namePrefix || "") + name] = value;
    }
});
snsoftx.tools.LocalSettings=function(settings,cfgTbl,updateBtn){
    this.settings = settings;
    var tbody = Xjs.DOM.find("table#" + (cfgTbl || "LocalSettingsTbl") + " >tbody",null);
    this.cfgItems = new Array(settings.items.length);
    for(var r=0;r < this.cfgItems.length;r++)
    {
        var row = tbody.insertRow(r),
            i = this.cfgItems[r] = Xjs.apply({},settings.items[r]),
            cell = row.insertCell(0);
        Xjs.DOM.setTextContent(cell,i.title || i.name);
        cell = row.insertCell(1);
        if(i.height > 0)
        {
            i.valueDOM = document.createElement("textarea");
        } else 
        {
            i.valueDOM = document.createElement("input");
            i.valueDOM.type = "text";
        }
        i.valueDOM.style.width = (i.width || 800) + "px";
        if(i.height > 0)
        {
            i.valueDOM.style.height = i.height + "px";
        }
        i.valueDOM.value = settings.getItemValue(i.name) || i.defaultValue || "";
        cell.appendChild(i.valueDOM);
        if(i.defaultValue)
        {
            cell.appendChild(document.createElement("br"));
            var e = Xjs.DOM.createChild(cell,"span");
            Xjs.DOM.setTextContent(e,"缺省值：" + i.defaultValue);
        }
    }
    var btn = Xjs.DOM.findById(updateBtn || "UpdateSettingsBtn",null);
    btn.onclick = Function.bindAsEventListener(this.updateSettings,this,0,true);
};
Xjs.apply(snsoftx.tools.LocalSettings.prototype,{
    /*snsoftx.tools.LocalSettings.updateSettings*/
    updateSettings:function()
    {
        for(var r=0;r < this.cfgItems.length;r++)
        {
            var i = this.cfgItems[r];
            this.settings.setItemValue(i.name,i.valueDOM.value.trim());
        }
        alert("配置保存成功");
    }
});
