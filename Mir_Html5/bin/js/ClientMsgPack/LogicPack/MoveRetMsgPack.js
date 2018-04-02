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
    var LogicPack;
    (function (LogicPack) {
        var MoveRetMsgPack = /** @class */ (function (_super) {
            __extends(MoveRetMsgPack, _super);
            function MoveRetMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._Handle = 0; //实体句柄
                _this._nSrcPosX = 0; //目标X
                _this._nSrcPosY = 0; //目标Y
                _this._nDir = 0; //方向
                _this._ucMode = 0; //跑步模式
                return _this;
            }
            MoveRetMsgPack.prototype.DeSerialize = function (pack) {
                this._Handle = pack.ReadDouble();
                this._nSrcPosX = pack.ReadUInt16();
                this._nSrcPosY = pack.ReadUInt16();
                this._nDir = pack.ReadUByte();
                this._ucMode = pack.ReadUByte();
            };
            return MoveRetMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LogicPack.MoveRetMsgPack = MoveRetMsgPack;
    })(LogicPack = ClientMsgPack.LogicPack || (ClientMsgPack.LogicPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=MoveRetMsgPack.js.map