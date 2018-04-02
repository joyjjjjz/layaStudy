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
    var SkillPack;
    (function (SkillPack) {
        var NormalHitMsgPack = /** @class */ (function (_super) {
            __extends(NormalHitMsgPack, _super);
            function NormalHitMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._Handle = 0;
                return _this;
            }
            NormalHitMsgPack.prototype.Serialize = function () {
                var pack = new Net.Packet();
                pack.WriteCmd(ClientMsgPack.PackType.SkillSystem.id, ClientMsgPack.PackType.SkillSystem.cNearAttack);
                pack.WriteDouble(this._Handle);
                return pack.GetBuffer();
            };
            return NormalHitMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        SkillPack.NormalHitMsgPack = NormalHitMsgPack;
    })(SkillPack = ClientMsgPack.SkillPack || (ClientMsgPack.SkillPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=NormalHitMsgPack.js.map