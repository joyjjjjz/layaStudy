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
    var EquipPack;
    (function (EquipPack) {
        var QueryEquipPack = /** @class */ (function (_super) {
            __extends(QueryEquipPack, _super);
            function QueryEquipPack() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            QueryEquipPack.prototype.Serialize = function () {
                var pack = new Net.Packet();
                pack.WriteCmd(ClientMsgPack.PackType.EquipSystem.id, ClientMsgPack.PackType.EquipSystem.cGetEquipInfo);
                return pack.GetBuffer();
            };
            return QueryEquipPack;
        }(ClientMsgPack.BaseMsgPack));
        EquipPack.QueryEquipPack = QueryEquipPack;
        var QueryEquipRetPack = /** @class */ (function (_super) {
            __extends(QueryEquipRetPack, _super);
            function QueryEquipRetPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._ListEquip = new Array();
                return _this;
            }
            QueryEquipRetPack.prototype.DeSerialize = function (pack) {
                var nCount = pack.ReadUByte();
                for (var i = 0; i < nCount; i++) {
                    var pUserItem = new Config.UserItem();
                    pUserItem.DeSerialize(pack);
                    this._ListEquip.push(pUserItem);
                }
            };
            return QueryEquipRetPack;
        }(ClientMsgPack.BaseMsgPack));
        EquipPack.QueryEquipRetPack = QueryEquipRetPack;
    })(EquipPack = ClientMsgPack.EquipPack || (ClientMsgPack.EquipPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=QueryEquipPack.js.map