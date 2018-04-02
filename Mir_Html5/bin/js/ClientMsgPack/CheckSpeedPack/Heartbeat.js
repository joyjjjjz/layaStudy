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
    var CheckSpeedPack;
    (function (CheckSpeedPack) {
        var Heartbeat = /** @class */ (function (_super) {
            __extends(Heartbeat, _super);
            function Heartbeat() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._nTick = 0;
                return _this;
            }
            Heartbeat.prototype.Serialize = function () {
                var pack = new Net.Packet();
                pack.WriteCmd(ClientMsgPack.PackType.CheckSpeedSystem.id, ClientMsgPack.PackType.CheckSpeedSystem.cHeartbeat);
                pack.WriteUInt32(this._nTick);
                return pack.GetBuffer();
            };
            return Heartbeat;
        }(ClientMsgPack.BaseMsgPack));
        CheckSpeedPack.Heartbeat = Heartbeat;
    })(CheckSpeedPack = ClientMsgPack.CheckSpeedPack || (ClientMsgPack.CheckSpeedPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=Heartbeat.js.map