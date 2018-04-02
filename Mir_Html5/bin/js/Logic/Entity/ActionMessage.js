var Entity;
(function (Entity) {
    var ActionMessage = /** @class */ (function () {
        function ActionMessage(nAction, data) {
            this._nAction = 0; //动作
            this._Data = null; //数据
            this._nAction = nAction;
            this._Data = data;
        }
        return ActionMessage;
    }());
    Entity.ActionMessage = ActionMessage;
})(Entity || (Entity = {}));
//# sourceMappingURL=ActionMessage.js.map