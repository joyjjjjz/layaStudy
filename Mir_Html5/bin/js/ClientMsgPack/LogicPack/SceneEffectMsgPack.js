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
        var SceneEffectMsgPack = /** @class */ (function (_super) {
            __extends(SceneEffectMsgPack, _super);
            function SceneEffectMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._SendHandle = 0; //创建特效的实体
                _this._nID = 0; //特效的id
                _this._nX = 0; //特效的X坐标
                _this._nY = 0; //特效的Y坐标
                _this._nDuration = 0; //特效持续时间
                _this._bEffPath = 0; //判断是语言版本的特效
                return _this;
            }
            SceneEffectMsgPack.prototype.DeSerialize = function (pack) {
                this._SendHandle = pack.ReadDouble();
                this._bEffType = pack.ReadUByte();
                this._nID = pack.ReadUInt16();
                this._nX = pack.ReadUInt16();
                this._nY = pack.ReadUInt16();
                this._nDuration = pack.ReadUInt32();
                this._bEffPath = pack.ReadUByte();
            };
            return SceneEffectMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LogicPack.SceneEffectMsgPack = SceneEffectMsgPack;
    })(LogicPack = ClientMsgPack.LogicPack || (ClientMsgPack.LogicPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=SceneEffectMsgPack.js.map