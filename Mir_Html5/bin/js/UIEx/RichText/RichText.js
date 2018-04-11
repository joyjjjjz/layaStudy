var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI;
(function (UI) {
    //富文本类
    //如果该富文本有特效动画类，记得Update
    var RichTextLine = /** @class */ (function () {
        function RichTextLine() {
            this._nUIHeight = 0;
            this._ListComponent = new Array();
        }
        RichTextLine.prototype.Destory = function () {
            for (var i = 0; i < this._ListComponent.length; i++) {
                this._ListComponent[i].Destory();
            }
            this._ListComponent.splice(0, this._ListComponent.length);
            this._ListComponent = null;
        };
        RichTextLine.prototype.GetWidth = function () {
            var nWidth = 0;
            for (var i = 0; i < this._ListComponent.length; i++) {
                nWidth += this._ListComponent[i].GetUIWidth();
            }
            return nWidth;
        };
        RichTextLine.prototype.Update = function (nCurrentTick) {
            for (var i = 0; i < this._ListComponent.length; i++) {
                this._ListComponent[i].Update(nCurrentTick);
            }
        };
        return RichTextLine;
    }());
    UI.RichTextLine = RichTextLine;
    //富文本,需要手动换行
    var RichText = /** @class */ (function (_super) {
        __extends(RichText, _super);
        function RichText() {
            var _this = _super.call(this) || this;
            _this.m_nShowX = 0; //X坐标显示位置
            _this.m_nShowY = 0; //Y坐标显示位置
            _this.m_ListText = new Array();
            return _this;
        }
        RichText.prototype.GetWidth = function () {
            var nWidth = 0;
            for (var i = 0; i < this.m_ListText.length; i++) {
                if (this.m_ListText[i].GetWidth() > nWidth) {
                    nWidth = this.m_ListText[i].GetWidth();
                }
            }
            return nWidth;
        };
        RichText.prototype.GetHeight = function () {
            var nHeight = 0;
            for (var i = 0; i < this.m_ListText.length; i++) {
                nHeight += this.m_ListText[i]._nUIHeight;
            }
            return nHeight;
        };
        RichText.prototype.Destory = function () {
            for (var i = 0; i < this.m_ListText.length; i++) {
                this.m_ListText[i].Destory();
            }
            this.m_ListText.splice(0, this.m_ListText.length);
            this.m_ListText = null;
            this.removeSelf();
        };
        RichText.prototype.SetText = function (str) {
            this.m_nShowX = this.m_nShowY = 0;
            for (var i = 0; i < this.m_ListText.length; i++) {
                this.m_ListText[i].Destory();
            }
            this.m_ListText.splice(0, this.m_ListText.length);
            var arrStr = str.split('\\');
            for (var i = 0; i < arrStr.length - 1; i++) {
                //换行
                if (arrStr[i].length <= 0) {
                    this.m_nShowY += Config.GlobalConfig._Instance._nFontSize;
                }
                this.AddText(arrStr[i]);
            }
        };
        RichText.prototype.AddText = function (str, bWrap) {
            if (bWrap === void 0) { bWrap = true; }
            var listText = null;
            //是否换行
            if (bWrap) {
                listText = new RichTextLine();
            }
            else {
                if (this.m_ListText.length > 0) {
                    listText = this.m_ListText[this.m_ListText.length - 1];
                }
                else {
                    listText = new RichTextLine();
                }
            }
            while (true) {
                var pos = str.indexOf(">");
                if (pos < 0 || pos >= str.length) {
                    break;
                }
                var szLine = str.substr(0, pos + 1);
                var typeStartPos = szLine.indexOf("(");
                var typeEndPos = szLine.indexOf(")");
                if (typeStartPos < 0 || typeEndPos < 0) {
                    str = str.substr(pos + 1);
                    continue;
                }
                var szType = szLine.substr(typeStartPos + 1, typeEndPos - typeStartPos - 1);
                var szArr = szType.split(",");
                var szLineEx = "";
                if (typeEndPos + 1 != szLine.length - 1) {
                    szLineEx = szLine.substr(typeEndPos + 1);
                    szLineEx = szLineEx.substr(0, szLineEx.length - 1);
                }
                if (szArr.length <= 0) {
                    str = str.substr(pos + 1);
                    continue;
                }
                var ui_1 = null;
                var szAttr = szArr[0].split(":");
                if (szAttr.length <= 1) {
                    str = str.substr(pos + 1);
                    continue;
                }
                switch (parseInt(szAttr[1])) {
                    case UI.RichTextComponentType.Label: //标签
                        {
                            ui_1 = new UI.RichTextLabel(this);
                            break;
                        }
                    case UI.RichTextComponentType.Image: //图片
                        {
                            ui_1 = new UI.RichTextImage(this);
                            break;
                        }
                    case UI.RichTextComponentType.Emotion: //表情
                        {
                            ui_1 = new UI.RichTextAnimation(this, UI.RichTextAnimationType.Emotion);
                            break;
                        }
                    default:
                        {
                            str = str.substr(pos + 1);
                            continue;
                        }
                }
                if (ui_1 != null) {
                    szArr.splice(0, 1);
                    ui_1.ProcessStr(szLineEx, szArr);
                    listText._ListComponent.push(ui_1);
                    if (ui_1.GetUIHeight() > listText._nUIHeight) {
                        listText._nUIHeight = ui_1.GetUIHeight();
                    }
                }
                if (pos + 1 >= str.length) {
                    break;
                }
                str = str.substr(pos + 1);
            }
            if (listText._ListComponent.length > 0) {
                //显示出来。
                for (var i = 0; i < listText._ListComponent.length; i++) {
                    var ui_2 = listText._ListComponent[i];
                    ui_2.Show(this.m_nShowX, this.m_nShowY);
                    this.m_nShowX += ui_2.GetUIWidth();
                }
                this.m_nShowY = this.m_nShowY + listText._nUIHeight;
                this.m_nShowX = 0;
                this.m_ListText.push(listText);
            }
        };
        RichText.prototype.Update = function (nCurrentTick) {
            for (var i = 0; i < this.m_ListText.length; i++) {
                this.m_ListText[i].Update(nCurrentTick);
            }
        };
        return RichText;
    }(Laya.Sprite));
    UI.RichText = RichText;
})(UI || (UI = {}));
//# sourceMappingURL=RichText.js.map