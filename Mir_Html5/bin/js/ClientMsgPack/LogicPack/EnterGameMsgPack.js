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
        var EnterGameMsgPack = /** @class */ (function (_super) {
            __extends(EnterGameMsgPack, _super);
            function EnterGameMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._nAccountId = 0; //帐号id
                _this._nActorId = 0; //角色id
                _this._nBirthPoint = 0; //出生点id
                return _this;
            }
            EnterGameMsgPack.prototype.Serialize = function () {
                var pack = new Net.Packet();
                pack.WriteCmd(ClientMsgPack.PackType.LogicSystem.id, ClientMsgPack.PackType.LogicSystem.cLogin);
                pack.WriteUInt32(this._nAccountId);
                pack.WriteUInt32(this._nActorId);
                pack.WriteUInt32(this._nBirthPoint);
                return pack.GetBuffer();
            };
            return EnterGameMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LogicPack.EnterGameMsgPack = EnterGameMsgPack;
    })(LogicPack = ClientMsgPack.LogicPack || (ClientMsgPack.LogicPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=EnterGameMsgPack.js.map