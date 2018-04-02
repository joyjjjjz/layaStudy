var Config;
(function (Config) {
    var StdSkill = /** @class */ (function () {
        function StdSkill() {
            this._nID = 0; //技能id
            this._szName = ""; //技能名称
            this._szDesc = ""; //技能描述
            this._nAction = 0; //所需职业
            this._bLevel = 0; //技能等级
            this.SkillType = Config.SkillType.Normal; //技能类型
            this._nRange = 0; //攻击范围
            this._nDistance = 0; //攻击距离
            this._nSpellEff = 0; //施法特效
            this._nTargetEff = 0; //目标受击特效
            this.AttackType = Config.SkillAttackType.PHYSICAL_ATTACK; //攻击类型
            this.CenterType = Config.SkillCenterType.Pos; //中心点类型
            this._nCD = 0; //冷却时间
            this._nNeedMp = 0; //需要蓝量
        }
        StdSkill.prototype.DeSerialize = function (pack) {
            this._nID = pack.ReadInt32();
            this._szName = pack.ReadCustomString();
            this._szDesc = pack.ReadCustomString();
            this._nNeedJob = pack.ReadUByte();
            this._nAction = pack.ReadUInt16();
            this._bLevel = pack.ReadUByte();
            this.SkillType = pack.ReadUByte();
            this._nRange = pack.ReadInt32();
            this._nDistance = pack.ReadInt32();
            this._nSpellEff = pack.ReadInt32();
            this._nTargetEff = pack.ReadInt32();
            this.AttackType = pack.ReadUByte();
            this.CenterType = pack.ReadUByte();
            this._nCD = pack.ReadUInt16();
        };
        return StdSkill;
    }());
    Config.StdSkill = StdSkill;
})(Config || (Config = {}));
//# sourceMappingURL=StdSkill.js.map