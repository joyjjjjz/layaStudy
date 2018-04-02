/**
 * 动作动画帧范围类
 * @author 后天 2017.10.2
 *
 */
var Entity;
(function (Entity) {
    var ActionAnimation = /** @class */ (function () {
        function ActionAnimation(nFrameStart, nFrameCount, nActionTime) {
            this._nFrameStart = 0; //帧起始
            this._nFrameCount = 0; //帧数量
            this._nActionTime = 0; //动作的周期时间，完成此动作所需要的时间
            this._nFrameStart = nFrameStart;
            this._nFrameCount = nFrameCount;
            this._nActionTime = nActionTime;
        }
        return ActionAnimation;
    }());
    Entity.ActionAnimation = ActionAnimation;
})(Entity || (Entity = {}));
//# sourceMappingURL=ActionAnimation.js.map