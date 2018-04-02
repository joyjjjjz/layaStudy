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
/*
* 资源包动画
*@author 后天 2017.9.29
*/
var Common;
(function (Common) {
    var Animation = /** @class */ (function (_super) {
        __extends(Animation, _super);
        /**
        *	构造函数
        * @param pack	资源包
        * @param nStartFrame 起始帧数
        * @param nEndFrame 结束帧数
        * @param nFrameRate 帧率
        * @param nPlayCount 播放次数 -1 为无限循环
        * @return  该坐标位置的坐标对象
        *
        */
        function Animation(pack, nStartFrame, nEndFrame, nFrameRate, nPlayCount) {
            var _this = _super.call(this) || this;
            _this.m_nPlayIndex = 0; //播放次数计次
            _this.m_nPlayCount = 0; //播放次数
            _this.m_nStartFrame = 0; //开始帧数
            _this.m_nEndFrame = 0; //结束帧数
            _this.m_nFrameRate = 0; //帧率
            _this.m_Pack = null; //资源包
            _this.m_CurrentSprite = null; //当前动画显示精灵
            _this.m_nLastUpdateTime = 0;
            _this.m_nCurrentFrame = 0; //当前帧
            _this.m_nCurrentFrameWidth = 0; //当前帧宽度
            _this.m_nCurrentFrameHeight = 0; //当前帧高度
            _this.m_bEndFramePasue = false; //最后一帧是否停顿- 永久停留在最后一帧
            _this.m_Pack = pack;
            _this.m_nEndFrame = nEndFrame;
            _this.m_nStartFrame = nStartFrame;
            _this.m_nFrameRate = nFrameRate;
            if (_this.m_nFrameRate <= 0) {
                _this.m_nFrameRate = Animation.DefaultFrameInterval;
            }
            _this.m_nPlayCount = nPlayCount;
            _this.m_nCurrentFrame = _this.m_nStartFrame;
            return _this;
        }
        Animation.prototype.GetPack = function () {
            return this.m_Pack;
        };
        Animation.prototype.Destory = function () {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            if (this.m_CurrentSprite != null) {
                this.m_CurrentSprite.removeSelf();
            }
            this.m_CurrentSprite = null;
            this.m_Pack = null;
            this.m_nPlayIndex = 0;
            this.m_nPlayCount = 0;
            this.m_nStartFrame = 0;
            this.m_nEndFrame = 0;
            this.destroy();
        };
        Animation.prototype.SetPack = function (pack) {
            this.m_Pack = pack;
            if (this.m_Pack == null) {
                if (this.m_CurrentSprite != null && this.m_CurrentSprite.parent != null) {
                    this.removeChild(this.m_CurrentSprite);
                    this.m_CurrentSprite = null;
                    this.m_nCurrentFrameWidth = 0;
                    this.m_nCurrentFrameHeight = 0;
                }
            }
        };
        Animation.prototype.GetCurrentFrameSprite = function () {
            return this.m_CurrentSprite;
        };
        Animation.prototype.GetCurrentFrameWidth = function () {
            return this.m_nCurrentFrameWidth;
        };
        Animation.prototype.SetEndFramePasue = function (bEndFramePasue) {
            this.m_bEndFramePasue = bEndFramePasue;
        };
        Animation.prototype.GetCurrentFrameHeight = function () {
            return this.m_nCurrentFrameHeight;
        };
        Animation.prototype.GetCurrentFrame = function () {
            return this.m_nCurrentFrame;
        };
        Animation.prototype.SetCurrentFrame = function (nFrame) {
            this.m_nCurrentFrame = nFrame;
            this.m_nLastUpdateTime = Config.GlobalConfig.s_dwUpdateTick;
        };
        Animation.prototype.SetEndFrame = function (nEndFrame) {
            this.m_nEndFrame = nEndFrame;
        };
        Animation.prototype.GetEndFrame = function () {
            return this.m_nEndFrame;
        };
        Animation.prototype.SetStartFrame = function (nStartFrame) {
            this.m_nStartFrame = nStartFrame;
        };
        Animation.prototype.GetStartFrame = function () {
            return this.m_nStartFrame;
        };
        Animation.prototype.SetFrameRate = function (nFrameRate) {
            this.m_nFrameRate = nFrameRate;
        };
        Animation.prototype.GetFrameRate = function () {
            return this.m_nFrameRate;
        };
        Animation.prototype.Update = function (nCurrentTime) {
            if (this.m_Pack == null || this.parent == null || this.m_Pack.GetFrameCount() <= 0) {
                return;
            }
            if (nCurrentTime >= this.m_nLastUpdateTime) {
                this.m_nCurrentFrame++;
                if (this.m_nCurrentFrame >= this.m_nEndFrame) {
                    this.m_nPlayIndex++;
                    if (this.m_nPlayCount != Animation.LOOPCOUNT) {
                        if (this.m_nPlayIndex >= this.m_nPlayCount) {
                            if (this.parent != null) {
                                this.parent.removeChild(this);
                                this.parent = null;
                            }
                            return;
                        }
                        else {
                            this.m_nCurrentFrame = this.m_nStartFrame;
                        }
                    }
                    else {
                        this.m_nCurrentFrame = this.m_nStartFrame;
                    }
                    //最后一帧是否停顿
                    if (this.m_bEndFramePasue) {
                        this.m_nCurrentFrame = this.m_nEndFrame - 1;
                    }
                }
                this.m_nLastUpdateTime = nCurrentTime + this.m_nFrameRate;
                if (this.m_CurrentSprite != null && this.m_CurrentSprite.parent != null) {
                    this.removeChild(this.m_CurrentSprite);
                    this.m_CurrentSprite = null;
                    this.m_nCurrentFrameWidth = 0;
                    this.m_nCurrentFrameHeight = 0;
                }
                this.m_CurrentSprite = this.m_Pack.GetSpriteByIndex(this.m_nCurrentFrame);
                if (this.m_CurrentSprite != null) {
                    this.m_nCurrentFrameWidth = this.m_Pack.GetSpriteByIndexWidth(this.m_nCurrentFrame);
                    this.m_nCurrentFrameHeight = this.m_Pack.GetSpriteByIndexHeight(this.m_nCurrentFrame);
                    this.addChild(this.m_CurrentSprite);
                }
            }
        };
        Animation.DefaultFrameInterval = 80; //默认动画每秒帧数
        Animation.LOOPCOUNT = -1; //无限循环次数标识
        return Animation;
    }(Laya.Sprite));
    Common.Animation = Animation;
})(Common || (Common = {}));
//# sourceMappingURL=Animation.js.map