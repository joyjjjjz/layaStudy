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
var NetSystem;
(function (NetSystem) {
    var SkillSystsem = /** @class */ (function (_super) {
        __extends(SkillSystsem, _super);
        function SkillSystsem() {
            var _this = _super.call(this) || this;
            _this.m_ArrUserSkillInfo = null;
            _this.m_NetProcess[ClientMsgPack.PackType.SkillSystem.sEntityDamage] = _this.OnEntityDamage;
            return _this;
        }
        SkillSystsem.prototype.Process = function (nCmdId, pack) {
            if (nCmdId == ClientMsgPack.PackType.SkillSystem.sGetSkillList) {
                this.OnGetSkillInfo(pack);
            }
            else {
                _super.prototype.Process.call(this, nCmdId, pack);
            }
        };
        SkillSystsem.prototype.OnEntityDamage = function (pack) {
            var msg = new ClientMsgPack.SkillPack.EntityDamageMsgPack();
            msg.DeSerialize(pack);
            var pEntity = LogicManager.GetInstance().FindEntity(msg._Handle);
            if (pEntity != null) {
            }
        };
        SkillSystsem.prototype.OnGetSkillInfo = function (pack) {
            this.m_ArrUserSkillInfo = new Array();
            var msg = new ClientMsgPack.SkillPack.GetSkillInfoMsgPackRet();
            msg.DeSerialize(pack);
            for (var i = 0; i < msg._SkillList.length; i++) {
                this.m_ArrUserSkillInfo.push(msg._SkillList[i]);
            }
            Common.MirLog.Log(Common.MirLogType.Tips, "收到技能消息,技能数量:" + this.m_ArrUserSkillInfo.length);
        };
        SkillSystsem.prototype.GetNextUseSkill = function (pAttackEntity) {
            if (pAttackEntity === void 0) { pAttackEntity = null; }
            if (this.m_ArrUserSkillInfo == null) {
                return null;
            }
            for (var i = 0; i < this.m_ArrUserSkillInfo.length; i++) {
                var pUserSkill = this.m_ArrUserSkillInfo[i];
                if (this.CheckNeedSkill(pUserSkill._nSkillID)) {
                    if (pAttackEntity != null) {
                        var pStdSkill = Config.ConfigManager.GetInstance().GetSkillConfig().GetStdSkillByID(pUserSkill._nSkillID, pUserSkill._bLevel);
                        if (pStdSkill != null) {
                            //判定该技能攻击距离是否足够
                            if (this.m_Player.GetCurentX() - pAttackEntity.GetCurentX() <= pStdSkill._nDistance &&
                                this.m_Player.GetCurrentY() - pAttackEntity.GetCurrentY() <= pStdSkill._nDistance) {
                                return pUserSkill;
                            }
                        }
                    }
                    else {
                        return pUserSkill;
                    }
                }
            }
            return null;
        };
        //检测是否可以使用该技能
        SkillSystsem.prototype.CheckNeedSkill = function (nSkillId) {
            var pSkillCfg = Config.ConfigManager.GetInstance().GetSkillConfig();
            var pUserSkill = this.GetUserSkillByID(nSkillId);
            if (pUserSkill == null) {
                return false;
            }
            var pStdSkill = pSkillCfg.GetStdSkillByID(nSkillId, pUserSkill._bLevel);
            if (pStdSkill == null) {
                return false;
            }
            //判断冷却时间
            if (Config.GlobalConfig.s_dwUpdateTick < pUserSkill._nUseCD) {
                return false;
            }
            //魔法值不足
            // if(this.m_Player.GetIntProperty(Entity.enPropEntity.PROP_CREATURE_HP) < pStdSkill._nNeedMp)
            // {
            //     return false;
            // }
            return true;
        };
        SkillSystsem.prototype.GetSkillLevel = function (nSkillId) {
            for (var i = 0; i < this.m_ArrUserSkillInfo.length; i++) {
                if (this.m_ArrUserSkillInfo[i]._nSkillID == nSkillId) {
                    return this.m_ArrUserSkillInfo[i]._bLevel;
                }
            }
            return 0;
        };
        SkillSystsem.prototype.GetUserSkillByID = function (nSkillId) {
            for (var i = 0; i < this.m_ArrUserSkillInfo.length; i++) {
                if (this.m_ArrUserSkillInfo[i]._nSkillID == nSkillId) {
                    return this.m_ArrUserSkillInfo[i];
                }
            }
            return null;
        };
        //硬编码
        SkillSystsem.CISHA_SKILLID = 2; //刺杀剑术技能id
        return SkillSystsem;
    }(NetSystem.BaseNetSystem));
    NetSystem.SkillSystsem = SkillSystsem;
})(NetSystem || (NetSystem = {}));
//# sourceMappingURL=SkillSystem.js.map