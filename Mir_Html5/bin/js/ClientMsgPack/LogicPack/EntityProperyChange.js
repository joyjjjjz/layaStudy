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
        var EntityProperyChange = /** @class */ (function (_super) {
            __extends(EntityProperyChange, _super);
            function EntityProperyChange() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._Handle = 0;
                _this._PropSet = new Entity.PropertySet();
                return _this;
            }
            EntityProperyChange.prototype.DeSerialize = function (pack) {
                this._Handle = pack.ReadDouble();
                var nCount = pack.ReadUByte();
                this._PropSet.ReadMultiProperty(nCount, pack);
            };
            return EntityProperyChange;
        }(ClientMsgPack.BaseMsgPack));
        LogicPack.EntityProperyChange = EntityProperyChange;
    })(LogicPack = ClientMsgPack.LogicPack || (ClientMsgPack.LogicPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=EntityProperyChange.js.map