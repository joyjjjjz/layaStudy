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
//挥洒特效
var Entity;
(function (Entity) {
    var SwayEffect = /** @class */ (function (_super) {
        __extends(SwayEffect, _super);
        function SwayEffect(pack, nStartFrame, nEndFrame, nFrameRate, nPlayCount) {
            return _super.call(this, pack, nStartFrame, nEndFrame, nFrameRate, nPlayCount) || this;
        }
        return SwayEffect;
    }(Common.Animation));
    Entity.SwayEffect = SwayEffect;
})(Entity || (Entity = {}));
//# sourceMappingURL=SwayEffect.js.map