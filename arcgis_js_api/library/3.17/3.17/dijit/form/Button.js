//>>built
require({cache:{"url:dijit/form/templates/Button.html":'\x3cspan class\x3d"dijit dijitReset dijitInline" role\x3d"presentation"\r\n\t\x3e\x3cspan class\x3d"dijitReset dijitInline dijitButtonNode"\r\n\t\tdata-dojo-attach-event\x3d"ondijitclick:__onClick" role\x3d"presentation"\r\n\t\t\x3e\x3cspan class\x3d"dijitReset dijitStretch dijitButtonContents"\r\n\t\t\tdata-dojo-attach-point\x3d"titleNode,focusNode"\r\n\t\t\trole\x3d"button" aria-labelledby\x3d"${id}_label"\r\n\t\t\t\x3e\x3cspan class\x3d"dijitReset dijitInline dijitIcon" data-dojo-attach-point\x3d"iconNode"\x3e\x3c/span\r\n\t\t\t\x3e\x3cspan class\x3d"dijitReset dijitToggleButtonIconChar"\x3e\x26#x25CF;\x3c/span\r\n\t\t\t\x3e\x3cspan class\x3d"dijitReset dijitInline dijitButtonText"\r\n\t\t\t\tid\x3d"${id}_label"\r\n\t\t\t\tdata-dojo-attach-point\x3d"containerNode"\r\n\t\t\t\x3e\x3c/span\r\n\t\t\x3e\x3c/span\r\n\t\x3e\x3c/span\r\n\t\x3e\x3cinput ${!nameAttrSetting} type\x3d"${type}" value\x3d"${value}" class\x3d"dijitOffScreen"\r\n\t\tdata-dojo-attach-event\x3d"onclick:_onClick"\r\n\t\ttabIndex\x3d"-1" aria-hidden\x3d"true" data-dojo-attach-point\x3d"valueNode"\r\n/\x3e\x3c/span\x3e\r\n'}});
define("dijit/form/Button","require dojo/_base/declare dojo/dom-class dojo/has dojo/_base/kernel dojo/_base/lang dojo/ready ./_FormWidget ./_ButtonMixin dojo/text!./templates/Button.html ../a11yclick".split(" "),function(f,d,g,c,h,e,b,k,l,m){c("dijit-legacy-requires")&&b(0,function(){f(["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"])});b=d("dijit.form.Button"+(c("dojo-bidi")?"_NoBidi":""),[k,l],{showLabel:!0,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",
type:"class"},baseClass:"dijitButton",templateString:m,_setValueAttr:"valueNode",_setNameAttr:function(a){this.valueNode&&this.valueNode.setAttribute("name",a)},postCreate:function(){this.inherited(arguments);this._setLabelFromContainer()},_setLabelFromContainer:function(){this.containerNode&&!this.label&&(this.label=e.trim(this.containerNode.innerHTML));this.onLabelSet()},_setShowLabelAttr:function(a){this.containerNode&&g.toggle(this.containerNode,"dijitDisplayNone",!a);this._set("showLabel",a)},
setLabel:function(a){h.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");this.set("label",a)},onLabelSet:function(){this.inherited(arguments);!this.showLabel&&!("title"in this.params)&&(this.titleNode.title=e.trim(this.containerNode.innerText||this.containerNode.textContent||""))}});c("dojo-bidi")&&(b=d("dijit.form.Button",b,{onLabelSet:function(){this.inherited(arguments);this.titleNode.title&&this.applyTextDir(this.titleNode,this.titleNode.title)},
_setTextDirAttr:function(a){this._created&&this.textDir!=a&&(this._set("textDir",a),this._setLabelAttr(this.label))}}));return b});