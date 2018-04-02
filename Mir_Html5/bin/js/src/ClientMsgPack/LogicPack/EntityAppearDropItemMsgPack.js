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
        var EntityAppearDropItemMsgPack = /** @class */ (function (_super) {
            __extends(EntityAppearDropItemMsgPack, _super);
            function EntityAppearDropItemMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._nPacketId = 0;
                _this._szItemName = ""; //道具名称
                _this._nItemId = 0; //道具id
                _this._nCount = 0; //道具数量
                _this._bCircle = 0;
                _this._btStrong = 0; //强化等级
                _this._nX = 0; //坐标x
                _this._nY = 0; //坐标Y
                _this._nIcon = 0; //图标
                _this._bShowLootTips = false; //是否显示拾取tips
                _this._nMasterActorId = 0; //所属玩家id
                _this._bExpire = false; //是否到期
                _this._bTeam = false; //是否是队伍的
                return _this;
            }
            EntityAppearDropItemMsgPack.prototype.DeSerialize = function (pack) {
                this._nPacketId = pack.ReadUInt32();
                this._szItemName = pack.ReadCustomString();
                this._nItemId = pack.ReadInt32();
                this._nCount = pack.ReadUInt16();
                this._bCircle = pack.ReadUByte();
                this._btStrong = pack.ReadUByte();
                this._nX = pack.ReadUInt16();
                this._nY = pack.ReadUInt16();
                this._nIcon = pack.ReadUInt16();
                this._bShowLootTips = pack.ReadUByte() == 1 ? true : false;
                this._nMasterActorId = pack.ReadUInt32();
                this._bExpire = pack.ReadUByte() == 1 ? true : false;
                this._bTeam = pack.ReadUByte() == 1 ? true : false;
            };
            return EntityAppearDropItemMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LogicPack.EntityAppearDropItemMsgPack = EntityAppearDropItemMsgPack;
    })(LogicPack = ClientMsgPack.LogicPack || (ClientMsgPack.LogicPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=EntityAppearDropItemMsgPack.js.map