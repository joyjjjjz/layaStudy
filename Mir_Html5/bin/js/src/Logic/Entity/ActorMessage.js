/**
 * 角色消息类，用于保存角色自服务器处收来的消息
 * @author 后天
 *
 */
var Entity;
(function (Entity) {
    var ActorMessage = /** @class */ (function () {
        function ActorMessage(ident, param, tag, series, data) {
            if (data === void 0) { data = null; }
            this._Param = 0;
            this._Tag = 0;
            this._Series = 0;
            this._Data = null;
            this._Ident = ident;
            this._Param = param;
            this._Tag = tag;
            this._Series = series;
            this._Data = data;
        }
        return ActorMessage;
    }());
    Entity.ActorMessage = ActorMessage;
})(Entity || (Entity = {}));
//# sourceMappingURL=ActorMessage.js.map