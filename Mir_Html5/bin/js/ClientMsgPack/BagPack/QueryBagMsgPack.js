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
        var QueryBagMsgPack = /** @class */ (function (_super) {
            __extends(QueryBagMsgPack, _super);
            function QueryBagMsgPack() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            QueryBagMsgPack.prototype.Serialize = function () {
                var pack = new Net.Packet();
                pack.WriteCmd(ClientMsgPack.PackType.BagSystem.id, ClientMsgPack.PackType.BagSystem.cQueryBag);
                return pack.GetBuffer();
            };
            return QueryBagMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        BagPack.QueryBagMsgPack = QueryBagMsgPack;
    })(BagPack = ClientMsgPack.BagPack || (ClientMsgPack.BagPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=QueryBagMsgPack.js.map