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
    var RichTextAnimationType;
    (function (RichTextAnimationType) {
        RichTextAnimationType[RichTextAnimationType["Emotion"] = 0] = "Emotion";
    })(RichTextAnimationType = UI.RichTextAnimationType || (UI.RichTextAnimationType = {}));
    var RichTextAnimation = /** @class */ (function (_super) {
        __extends(RichTextAnimation, _super);
        function RichTextAnimation(parent, aniType) {
            var _this = _super.call(this, parent) || this;
            _this.m_nWidth = 0;
            _this.m_nHeight = 0;
            _this.m_nIndex = 0; //动画包索引
            _this.m_Animation = null;
            _this.m_nPosX = 0;
            _this.m_nPosY = 0;
            _this.m_AniType = aniType;
            return _this;
        }
        RichTextAnimation.prototype.Destory = function () {
            _super.prototype.Destory.call(this);
            if (this.m_Animation != null) {
                this.m_Animation.removeSelf();
                this.m_Animation.Destory();
            }
            this.m_Animation = null;
        };
        RichTextAnimation.prototype.ProcessStr = function (szStr, arrAttr) {
            for (var i = 0; i < arrAttr.length; i++) {
                var arr = arrAttr[i].split(":");
                if (arr.length > 1) {
                    switch (arr[0]) {
                        case "index":
                            {
                                this.m_nIndex = parseInt(arr[1]);
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
        RichTextAnimation.prototype.GetUIHeight = function () {
            return this.m_nHeight;
        };
        RichTextAnimation.prototype.GetUIWidth = function () {
            return this.m_nWidth;
        };
        RichTextAnimation.prototype.Show = function (nX, nY) {
            this.m_nPosX = nX;
            this.m_nPosY = nY;
        };
        RichTextAnimation.prototype.Update = function (nCurrentTick) {
            if (this.m_nIndex <= 0)
                return;
            var pack = null;
            switch (this.m_AniType) {
                case RichTextAnimationType.Emotion:
                    {
                        pack = Resources.ResourcesManager._Instance.GetEmotionPackage(this.m_nIndex);
                        break;
                    }
            }
            if (pack != null && pack.GetFrameCount() > 0) {
                if (this.m_Animation == null) {
                    this.m_Animation = new Common.Animation(pack, 0, pack.GetFrameCount(), 80, -1);
                    this.m_Parent.addChild(this.m_Animation);
                    this.m_Animation.pos(this.m_nPosX, this.m_nPosY);
                }
            }
            if (this.m_Animation != null) {
                this.m_Animation.Update(nCurrentTick);
            }
        };
        return RichTextAnimation;
    }(UI.RichTextBaseComponent));
    UI.RichTextAnimation = RichTextAnimation;
})(UI || (UI = {}));
//# sourceMappingURL=RichTextAnimation.js.map