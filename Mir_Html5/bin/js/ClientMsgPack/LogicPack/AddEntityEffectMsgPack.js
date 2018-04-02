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
        var AddEntityEffectMsgPack = /** @class */ (function (_super) {
            __extends(AddEntityEffectMsgPack, _super);
            function AddEntityEffectMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._SendHandle = 0; //发送的实体句柄
                _this._Handle = 0; //增加特效的实体句柄
                _this._bEffType = 0; //特效类型
                _this._nEffId = 0; //特效id
                _this._nDuration = 0; //持续时间
                return _this;
            }
            AddEntityEffectMsgPack.prototype.DeSerialize = function (pack) {
                this._SendHandle = pack.ReadDouble();
                this._Handle = pack.ReadDouble();
                this._bEffType = pack.ReadUByte();
                this._nEffId = pack.ReadUInt16();
                this._nDuration = pack.ReadUInt32();
            };
            return AddEntityEffectMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LogicPack.AddEntityEffectMsgPack = AddEntityEffectMsgPack;
    })(LogicPack = ClientMsgPack.LogicPack || (ClientMsgPack.LogicPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=AddEntityEffectMsgPack.js.map