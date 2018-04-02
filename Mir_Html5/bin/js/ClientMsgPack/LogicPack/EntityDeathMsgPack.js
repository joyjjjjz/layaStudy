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
        var EntityDeathMsgPack = /** @class */ (function (_super) {
            __extends(EntityDeathMsgPack, _super);
            function EntityDeathMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._DeathHandle = 0; //死亡实体句柄
                _this._KillHandle = 0; //击杀者句柄
                _this._nSoundId = 0; //音效id
                return _this;
            }
            EntityDeathMsgPack.prototype.DeSerialize = function (pack) {
                this._DeathHandle = pack.ReadDouble();
                this._KillHandle = pack.ReadDouble();
                this._nSoundId = pack.ReadUInt16();
            };
            return EntityDeathMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LogicPack.EntityDeathMsgPack = EntityDeathMsgPack;
    })(LogicPack = ClientMsgPack.LogicPack || (ClientMsgPack.LogicPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=EntityDeathMsgPack.js.map