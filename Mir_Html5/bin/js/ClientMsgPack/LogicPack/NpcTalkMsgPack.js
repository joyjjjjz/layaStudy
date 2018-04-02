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
        var NpcTalkMsgPack = /** @class */ (function (_super) {
            __extends(NpcTalkMsgPack, _super);
            function NpcTalkMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._Handle = 0; //npc实体句柄
                _this._szFuncNmae = ""; //回调函数名称
                return _this;
            }
            NpcTalkMsgPack.prototype.Serialize = function () {
                var pack = new Net.Packet();
                pack.WriteCmd(ClientMsgPack.PackType.LogicSystem.id, ClientMsgPack.PackType.LogicSystem.cNpcTalk);
                pack.WriteDouble(this._Handle);
                pack.WriteCustomString(this._szFuncNmae);
                return pack.GetBuffer();
            };
            return NpcTalkMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LogicPack.NpcTalkMsgPack = NpcTalkMsgPack;
        var NpcTalkMsgPackRet = /** @class */ (function (_super) {
            __extends(NpcTalkMsgPackRet, _super);
            function NpcTalkMsgPackRet() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._nType = 0;
                _this._Handle = 0;
                _this._szStr = "";
                return _this;
            }
            NpcTalkMsgPackRet.prototype.DeSerialize = function (pack) {
                this._nType = pack.ReadUByte();
                this._Handle = pack.ReadDouble();
                this._szStr = pack.ReadCustomString();
            };
            return NpcTalkMsgPackRet;
        }(ClientMsgPack.BaseMsgPack));
        LogicPack.NpcTalkMsgPackRet = NpcTalkMsgPackRet;
    })(LogicPack = ClientMsgPack.LogicPack || (ClientMsgPack.LogicPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=NpcTalkMsgPack.js.map