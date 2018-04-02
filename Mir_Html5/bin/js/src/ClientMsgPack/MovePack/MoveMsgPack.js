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
var ClientMsgPack;
(function (ClientMsgPack) {
    var MovePack;
    (function (MovePack) {
        var MoveMsgPack = /** @class */ (function (_super) {
            __extends(MoveMsgPack, _super);
            function MoveMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._nMoveType = 0; //移动类型
                _this._nX = 0; //X坐标
                _this._nY = 0; //Y坐标
                _this._nDir = 0; //方向
                _this._nTimer = 0; //时间戳
                return _this;
            }
            MoveMsgPack.prototype.Serialize = function () {
                var pack = new Net.Packet();
                pack.WriteByte(ClientMsgPack.PackType.MoveSystem.id);
                pack.WriteByte(this._nMoveType);
                pack.WriteUInt16(this._nX);
                pack.WriteUInt16(this._nY);
                pack.WriteUInt16(this._nDir);
                pack.WriteUInt32(this._nTimer);
                return pack.GetBuffer();
            };
            return MoveMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        MovePack.MoveMsgPack = MoveMsgPack;
    })(MovePack = ClientMsgPack.MovePack || (ClientMsgPack.MovePack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=MoveMsgPack.js.map