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
    var RichTextLabel = /** @class */ (function (_super) {
        __extends(RichTextLabel, _super);
        function RichTextLabel(parent) {
            var _this = _super.call(this, parent) || this;
            _this.m_szLink = "";
            _this.m_Label = new Laya.Label();
            _this.m_Label.font = Config.GlobalConfig._Instance._szFont;
            _this.m_Label.fontSize = Config.GlobalConfig._Instance._nFontSize;
            _this.m_ComponentType = UI.RichTextComponentType.Label;
            _this.m_Label.color = "#FFFFFF"; //默认白色
            return _this;
            //this.m_Label.stroke = 1;
            //this.m_Label.strokeColor = "#060606";
        }
        RichTextLabel.prototype.Destory = function () {
            _super.prototype.Destory.call(this);
            this.m_Label.removeSelf();
            if (this.m_szLink.length > 0) {
                this.m_Label.off(Laya.Event.CLICK, this, this.OnClick);
            }
            this.m_Label = null;
        };
        RichTextLabel.prototype.SetColor = function (szColor) {
            this.m_Label.color = szColor;
        };
        RichTextLabel.prototype.ProcessStr = function (szStr, arrAttr) {
            for (var i = 0; i < arrAttr.length; i++) {
                var arr = arrAttr[i].split(":");
                if (arr.length > 1) {
                    switch (arr[0]) {
                        case "color":
                            {
                                this.m_Label.color = "#" + arr[1];
                                break;
                            }
                        case "link":
                            {
                                this.m_szLink = arr[1];
                                if (this.m_szLink.length > 0) {
                                    this.m_Label.underline = true; //显示下划线并且添加单击事件
                                    this.m_Label.underlineColor = "#33FF00"; //默认绿色
                                    this.m_Label.mouseEnabled = true;
                                    this.m_Label.on(Laya.Event.CLICK, this, this.OnClick);
                                }
                                break;
                            }
                    }
                }
            }
            this.m_Label.text = szStr;
        };
        RichTextLabel.prototype.OnClick = function () {
            //执行脚本
        };
        RichTextLabel.prototype.GetUIHeight = function () {
            return this.m_Label.fontSize;
        };
        RichTextLabel.prototype.GetUIWidth = function () {
            return this.m_Label.text.length * Config.GlobalConfig._Instance._nFontSize;
        };
        RichTextLabel.prototype.Show = function (nX, nY) {
            this.m_Parent.addChild(this.m_Label);
            this.m_Label.pos(nX, nY);
        };
        return RichTextLabel;
    }(UI.RichTextBaseComponent));
    UI.RichTextLabel = RichTextLabel;
})(UI || (UI = {}));
//# sourceMappingURL=RichTextLabel.js.map