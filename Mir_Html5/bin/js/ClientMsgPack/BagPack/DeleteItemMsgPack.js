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
    var BagPack;
    (function (BagPack) {
        var DeleteItemMsgPack = /** @class */ (function (_super) {
            __extends(DeleteItemMsgPack, _super);
            function DeleteItemMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._Series = 0; //道具序列号
                return _this;
            }
            DeleteItemMsgPack.prototype.Serialize = function () {
                var pack = new Net.Packet();
                pack.WriteCmd(ClientMsgPack.PackType.BagSystem.id, ClientMsgPack.PackType.BagSystem.cDeleteItem);
                pack.WriteDouble(this._Series);
                return pack.GetBuffer();
            };
            return DeleteItemMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        BagPack.DeleteItemMsgPack = DeleteItemMsgPack;
        var DeleteItemRetMsgPack = /** @class */ (function (_super) {
            __extends(DeleteItemRetMsgPack, _super);
            function DeleteItemRetMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._Series = 0;
                return _this;
            }
            DeleteItemRetMsgPack.prototype.DeSerialize = function (pack) {
                this._Series = pack.ReadDouble();
            };
            return DeleteItemRetMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        BagPack.DeleteItemRetMsgPack = DeleteItemRetMsgPack;
    })(BagPack = ClientMsgPack.BagPack || (ClientMsgPack.BagPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=DeleteItemMsgPack.js.map