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
        var GetSkillInfoMsgPack = /** @class */ (function (_super) {
            __extends(GetSkillInfoMsgPack, _super);
            function GetSkillInfoMsgPack() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GetSkillInfoMsgPack.prototype.Serialize = function () {
                var pack = new Net.Packet();
                pack.WriteCmd(ClientMsgPack.PackType.SkillSystem.id, ClientMsgPack.PackType.SkillSystem.cGetSkillList);
                return pack.GetBuffer();
            };
            return GetSkillInfoMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        SkillPack.GetSkillInfoMsgPack = GetSkillInfoMsgPack;
        var GetSkillInfoMsgPackRet = /** @class */ (function (_super) {
            __extends(GetSkillInfoMsgPackRet, _super);
            function GetSkillInfoMsgPackRet() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GetSkillInfoMsgPackRet.prototype.DeSerialize = function (pack) {
                this._SkillList = new Array();
                var nCount = pack.ReadUByte();
                for (var i = 0; i < nCount; i++) {
                    var pUserSkill = new Config.UserSkillInfo();
                    pUserSkill.DeSerialize(pack);
                    this._SkillList.push(pUserSkill);
                }
            };
            return GetSkillInfoMsgPackRet;
        }(ClientMsgPack.BaseMsgPack));
        SkillPack.GetSkillInfoMsgPackRet = GetSkillInfoMsgPackRet;
    })(SkillPack = ClientMsgPack.SkillPack || (ClientMsgPack.SkillPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=GetSkillInfoMsgPack.js.map