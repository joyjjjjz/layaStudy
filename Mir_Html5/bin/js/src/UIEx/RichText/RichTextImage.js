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
    var RichTextImage = /** @class */ (function (_super) {
        __extends(RichTextImage, _super);
        function RichTextImage(parent) {
            var _this = _super.call(this, parent) || this;
            _this.m_nWidth = 0;
            _this.m_nHeight = 0;
            _this.m_Sprite = null;
            _this.m_ComponentType = UI.RichTextComponentType.Image;
            return _this;
        }
        RichTextImage.prototype.Destory = function () {
            _super.prototype.Destory.call(this);
            if (this.m_Sprite != null) {
                this.m_Sprite.removeSelf();
            }
            this.m_Sprite = null;
        };
        RichTextImage.prototype.ProcessStr = function (szStr, arrAttr) {
            for (var i = 0; i < arrAttr.length; i++) {
                var arr = arrAttr[i].split(":");
                if (arr.length > 1) {
                    switch (arr[0]) {
                        case "file":
                            {
                                this.m_Sprite = Resources.ResourcesManager._Instance.GetSpriteForURL(arr[1]);
                                break;
                            }
                        case "width":
                            {
                                this.m_nWidth = parseInt(arr[1]);
                                break;
                            }
                        case "height":
                            {
                                this.m_nHeight = parseInt(arr[1]);
                                break;
                            }
                    }
                }
            }
        };
        RichTextImage.prototype.GetUIHeight = function () {
            return this.m_nHeight;
        };
        RichTextImage.prototype.GetUIWidth = function () {
            return this.m_nWidth;
        };
        RichTextImage.prototype.Show = function (nX, nY) {
            if (this.m_Sprite == null) {
                return;
            }
            this.m_Parent.addChild(this.m_Sprite);
            this.m_Sprite.pos(nX, nY);
        };
        return RichTextImage;
    }(UI.RichTextBaseComponent));
    UI.RichTextImage = RichTextImage;
})(UI || (UI = {}));
//# sourceMappingURL=RichTextImage.js.map