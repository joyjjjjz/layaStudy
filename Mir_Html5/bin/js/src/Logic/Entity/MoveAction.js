/*用于确认移动控制具体应当实施的行为的数据类型
--@author 后天
--time 2017.10.3
*/
var Entity;
(function (Entity) {
    var MoveAction = /** @class */ (function () {
        function MoveAction() {
            this._nAction = 0; //移动的行为
            this._nIdent = 0; //移动的消息
            this._nDir = 0; //方向
            this._nStep = 0; //移动的步伐
            this._nMoveSpeed = 0; //移动速度
            this._nTargetX = 0; //目标位置X
            this._nTargetY = 0; //目标位置Y
        }
        return MoveAction;
    }());
    Entity.MoveAction = MoveAction;
})(Entity || (Entity = {}));
//# sourceMappingURL=MoveAction.js.map