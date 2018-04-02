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
        var EntityDamageMsgPack = /** @class */ (function (_super) {
            __extends(EntityDamageMsgPack, _super);
            function EntityDamageMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._Handle = 0; //实体句柄
                _this._nDamage = 0; //伤害值
                _this._nSoundID = 0; //音效id
                return _this;
            }
            EntityDamageMsgPack.prototype.DeSerialize = function (pack) {
                this._Handle = pack.ReadDouble();
                this._nDamage = pack.ReadInt32();
                this._nSoundID = pack.ReadUInt16();
            };
            return EntityDamageMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        SkillPack.EntityDamageMsgPack = EntityDamageMsgPack;
    })(SkillPack = ClientMsgPack.SkillPack || (ClientMsgPack.SkillPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=EntityDamageMsgPack.js.map