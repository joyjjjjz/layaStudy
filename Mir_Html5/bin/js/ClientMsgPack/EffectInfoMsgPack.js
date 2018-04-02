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
    var EffectInfoMsgPack = /** @class */ (function (_super) {
        __extends(EffectInfoMsgPack, _super);
        function EffectInfoMsgPack() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._bType = 0; //特效类型
            _this._nID = 0; //特效ID
            _this._nDuration = 0; //特效持续时间
            return _this;
        }
        EffectInfoMsgPack.prototype.DeSerialize = function (pack) {
            this._bType = pack.ReadUByte();
            this._nID = pack.ReadUInt16();
            this._nDuration = pack.ReadUInt32();
        };
        return EffectInfoMsgPack;
    }(ClientMsgPack.BaseMsgPack));
    ClientMsgPack.EffectInfoMsgPack = EffectInfoMsgPack;
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=EffectInfoMsgPack.js.map