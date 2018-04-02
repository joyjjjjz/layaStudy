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
        var AddItemMsgPack = /** @class */ (function (_super) {
            __extends(AddItemMsgPack, _super);
            function AddItemMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._pUserItem = null;
                return _this;
            }
            AddItemMsgPack.prototype.DeSerialize = function (pack) {
                this._pUserItem = new Config.UserItem();
                this._pUserItem.DeSerialize(pack);
            };
            return AddItemMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        BagPack.AddItemMsgPack = AddItemMsgPack;
    })(BagPack = ClientMsgPack.BagPack || (ClientMsgPack.BagPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=AddItemMsgPack.js.map