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
//实体出现 NPC
//@author 后天 2017.10.9
var ClientMsgPack;
(function (ClientMsgPack) {
    var LogicPack;
    (function (LogicPack) {
        var EntityAppearNpcMsgPack = /** @class */ (function (_super) {
            __extends(EntityAppearNpcMsgPack, _super);
            function EntityAppearNpcMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._bType = 0; //实体类型
                _this._bRace = 0; //实体种族 //目前和类型是一致的
                _this._Handle = 0; //实体句柄
                _this._szName = ""; //实体名称
                _this._nX = 0; //坐标X
                _this._nY = 0; //坐标Y
                _this._nID = 0; //npcid
                _this._bDir = 0; //方向
                _this._bFuncType = 0; //？
                _this._bQuestState = 0; //任务状态
                return _this;
            }
            EntityAppearNpcMsgPack.prototype.DeSerialize = function (pack) {
                this._bType = pack.ReadByte();
                this._bRace = pack.ReadByte();
                this._Handle = pack.ReadDouble();
                this._szName = pack.ReadCustomString();
                this._nX = pack.ReadUInt16();
                this._nY = pack.ReadUInt16();
                this._nID = pack.ReadUInt32();
                this._bDir = pack.ReadByte();
                this._bFuncType = pack.ReadByte();
                this._bQuestState = pack.ReadByte();
            };
            return EntityAppearNpcMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LogicPack.EntityAppearNpcMsgPack = EntityAppearNpcMsgPack;
    })(LogicPack = ClientMsgPack.LogicPack || (ClientMsgPack.LogicPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=EntityAppearNpcMsgPack.js.map