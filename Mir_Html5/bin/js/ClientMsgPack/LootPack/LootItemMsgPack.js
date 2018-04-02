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
        var LootItemMsgPack = /** @class */ (function (_super) {
            __extends(LootItemMsgPack, _super);
            function LootItemMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._nPacketId = 0;
                return _this;
            }
            LootItemMsgPack.prototype.Serialize = function () {
                var pack = new Net.Packet();
                pack.WriteCmd(ClientMsgPack.PackType.LootSystem.id, ClientMsgPack.PackType.LootSystem.cLootDropItem);
                pack.WriteUInt32(this._nPacketId);
                return pack.GetBuffer();
            };
            return LootItemMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LootPack.LootItemMsgPack = LootItemMsgPack;
    })(LootPack = ClientMsgPack.LootPack || (ClientMsgPack.LootPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=LootItemMsgPack.js.map