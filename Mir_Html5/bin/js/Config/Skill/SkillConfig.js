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
var Config;
(function (Config) {
    var SkillType;
    (function (SkillType) {
        SkillType[SkillType["Normal"] = 0] = "Normal";
        SkillType[SkillType["SingleAttack"] = 1] = "SingleAttack";
        SkillType[SkillType["GroupAttack"] = 2] = "GroupAttack";
        SkillType[SkillType["KaiTianZhan"] = 3] = "KaiTianZhan";
        SkillType[SkillType["YeManChongZhuang"] = 4] = "YeManChongZhuang";
        SkillType[SkillType["Track"] = 6] = "Track";
    })(SkillType = Config.SkillType || (Config.SkillType = {}));
    var SkillAttackType;
    (function (SkillAttackType) {
        SkillAttackType[SkillAttackType["PHYSICAL_ATTACK"] = 0] = "PHYSICAL_ATTACK";
        SkillAttackType[SkillAttackType["MAGIC_ATTACK"] = 1] = "MAGIC_ATTACK";
        SkillAttackType[SkillAttackType["WIZARD_ATTACK"] = 2] = "WIZARD_ATTACK";
    })(SkillAttackType = Config.SkillAttackType || (Config.SkillAttackType = {}));
    var SkillCenterType;
    (function (SkillCenterType) {
        SkillCenterType[SkillCenterType["Self"] = 1] = "Self";
        SkillCenterType[SkillCenterType["Pos"] = 2] = "Pos";
    })(SkillCenterType = Config.SkillCenterType || (Config.SkillCenterType = {}));
    var SkillConfig = /** @class */ (function (_super) {
        __extends(SkillConfig, _super);
        function SkillConfig() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkillConfig.prototype.Load = function (data) {
            this.m_ArrSkill = new Array();
            var pack = new Net.Packet(data);
            var nCount = pack.ReadUByte();
            for (var i = 0; i < nCount; i++) {
                var nSkillLevel = pack.ReadUByte();
                for (var j = 0; j < nSkillLevel; j++) {
                    var pStdSkill = new Config.StdSkill();
                    pStdSkill.DeSerialize(pack);
                    this.m_ArrSkill.push(pStdSkill);
                }
            }
        };
        SkillConfig.prototype.GetStdSkillByID = function (nSkillId, nLevel) {
            for (var i = 0; i < this.m_ArrSkill.length; i++) {
                var pStdSkill = this.m_ArrSkill[i];
                if (pStdSkill._nID == nSkillId && pStdSkill._bLevel == nLevel) {
                    return pStdSkill;
                }
            }
            return null;
        };
        return SkillConfig;
    }(Config.BaseConfig));
    Config.SkillConfig = SkillConfig;
})(Config || (Config = {}));
//# sourceMappingURL=SkillConfig.js.map