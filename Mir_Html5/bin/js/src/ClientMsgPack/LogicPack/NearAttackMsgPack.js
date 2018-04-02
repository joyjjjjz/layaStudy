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
//普通攻击
var ClientMsgPack;
(function (ClientMsgPack) {
    var LogicPack;
    (function (LogicPack) {
        var NearAttackMsgPackRet = /** @class */ (function (_super) {
            __extends(NearAttackMsgPackRet, _super);
            function NearAttackMsgPackRet() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._Handle = 0;
                _this._bLevel = 0;
                _this._bDir = 0;
                _this._nAuxParam = 0;
                _this._nMusicID = 0;
                _this._Target = 0;
                _this._bAttackIndex = 0;
                return _this;
            }
            NearAttackMsgPackRet.prototype.DeSerialize = function (pack) {
                this._Handle = pack.ReadDouble();
                this._bLevel = pack.ReadUByte();
                this._bDir = pack.ReadUByte();
                this._nAuxParam = pack.ReadUInt16();
                this._nMusicID = pack.ReadUInt16();
                this._Target = pack.ReadDouble();
                this._bAttackIndex = pack.ReadUByte();
            };
            return NearAttackMsgPackRet;
        }(ClientMsgPack.BaseMsgPack));
        LogicPack.NearAttackMsgPackRet = NearAttackMsgPackRet;
    })(LogicPack = ClientMsgPack.LogicPack || (ClientMsgPack.LogicPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=NearAttackMsgPack.js.map