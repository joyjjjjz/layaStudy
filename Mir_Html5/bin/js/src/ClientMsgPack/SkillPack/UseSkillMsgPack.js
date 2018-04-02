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
        var UseSkillMsgPack = /** @class */ (function (_super) {
            __extends(UseSkillMsgPack, _super);
            function UseSkillMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._nSkillID = 0; //技能id
                _this._Handle = 0; //攻击的实体句柄
                _this._nX = 0; //鼠标点X坐标
                _this._nY = 0; //鼠标点Y坐标
                _this._bDir = 0; //方向
                return _this;
            }
            UseSkillMsgPack.prototype.Serialize = function () {
                var pack = new Net.Packet();
                pack.WriteCmd(ClientMsgPack.PackType.SkillSystem.id, ClientMsgPack.PackType.SkillSystem.cUseSkill);
                pack.WriteUInt16(this._nSkillID);
                pack.WriteDouble(this._Handle);
                pack.WriteUInt16(this._nX);
                pack.WriteUInt16(this._nY);
                pack.WriteUByte(this._bDir);
                return pack.GetBuffer();
            };
            return UseSkillMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        SkillPack.UseSkillMsgPack = UseSkillMsgPack;
        var UseSkillRetMsgPack = /** @class */ (function (_super) {
            __extends(UseSkillRetMsgPack, _super);
            function UseSkillRetMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._Handle = 0; //实体句柄
                _this._nSkillId = 0; //技能id
                _this._bLevel = 0; //等级
                _this._bDir = 0; //方向
                _this._nMusicId = 0; //音效id
                return _this;
            }
            UseSkillRetMsgPack.prototype.DeSerialize = function (pack) {
                this._Handle = pack.ReadDouble();
                this._nSkillId = pack.ReadUInt16();
                this._bLevel = pack.ReadUByte();
                this._bDir = pack.ReadUByte();
                this._nMusicId = pack.ReadUInt16();
            };
            return UseSkillRetMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        SkillPack.UseSkillRetMsgPack = UseSkillRetMsgPack;
    })(SkillPack = ClientMsgPack.SkillPack || (ClientMsgPack.SkillPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=UseSkillMsgPack.js.map