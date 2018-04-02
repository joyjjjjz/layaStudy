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
    var LootPack;
    (function (LootPack) {
        var DropItemDisappearMsgPack = /** @class */ (function (_super) {
            __extends(DropItemDisappearMsgPack, _super);
            function DropItemDisappearMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._nPacketId = 0;
                return _this;
            }
            DropItemDisappearMsgPack.prototype.DeSerialize = function (pack) {
                this._nPacketId = pack.ReadInt32();
            };
            return DropItemDisappearMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LootPack.DropItemDisappearMsgPack = DropItemDisappearMsgPack;
    })(LootPack = ClientMsgPack.LootPack || (ClientMsgPack.LootPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=DropItemDisappearMsgPack.js.map