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
var Entity;
(function (Entity) {
    var Human = /** @class */ (function (_super) {
        __extends(Human, _super);
        function Human(handle) {
            var _this = _super.call(this, handle) || this;
            /**
     * 角色在攻击之后需要停留一段时间，此事件称为反映时间，即为角色两次攻击之间的间隔时间
     * 若停留期间内有来自服务器的消息则会处理服务器的消息否则在停留超过AttackPuase时间后则会调整为空闲动作
     * 在LocalPlayer类中进行本地控制处理的时候会判断AttackPuase的值，若处于攻击后的等待时间中则暂时不处理本地操作的控制
     * 此值为-1表示等待设定攻击停留时间，为0表示不处于攻击停留状态，否则表示攻击停留的具体时间
    **/
            _this.m_nEndAttackPause = Entity.tagAttackPause.Idle;
            /**
     * 自动完成攻击停留的时间。当m_nEndAttackPause到期，则AttackPause结束，但为了更好呈现其他玩家连续攻击的动作连贯性，
     * 避免进入IDLE动作再发起攻击而引起的动作不协调问题，同时在进行最后一下攻击后能够以准备动作多保持一段时间，在设置为攻击
     * 停留动作的时候会设置此值为2秒或更长，在此时间到期后才将角色设置为IDLE动作。
     **/
            _this.m_nCompleteAttackPause = 0;
            _this.m_WeaponModleActionPartPack = []; //武器动作部件资源包
            _this.m_WeaponModelAni = new Common.Animation(null, 0, 0, 0, -1); //角色武器动画
            _this.m_ShadowModelAni = new Common.Animation(null, 0, 0, 0, -1); //角色影子动画
            _this.m_Type = Entity.EntityType.Human;
            _this.m_Appearance.addChild(_this.m_WeaponModelAni);
            _this.m_Appearance.addChild(_this.m_ShadowModelAni);
            return _this;
        }
        Human.prototype.SetWeaponModelIndex = function (nWeaponModelIndex) {
            if (nWeaponModelIndex <= 0) {
                return;
            }
            if (this.GetWeaponModelIndex() != nWeaponModelIndex) {
                this.m_WeaponModleActionPartPack = [];
            }
            nWeaponModelIndex = nWeaponModelIndex * 100;
            var nPart = Entity.StandardActions.GetSRPackageByAction(this.m_nAction, true);
            var pack = Resources.ResourcesManager._Instance.GetWeaponPackage(nWeaponModelIndex + nPart, this.GetSex());
            if (pack != null) {
                this.m_WeaponModleActionPartPack[nPart] = pack;
            }
        };
        Human.prototype.GetSex = function () {
            return this.m_PropSet.GetIntProperty(Entity.enPropEntity.PROP_ACTOR_SEX);
        };
        Human.prototype.GetWeaponModelIndex = function () {
            return this.m_PropSet.GetIntProperty(Entity.enPropEntity.PROP_ACTOR_WEAPONAPPEARANCE);
        };
        Human.prototype.SetModelIndex = function (nModelIndex) {
            if (nModelIndex < 0) {
                return;
            }
            if (this.GetModelIndex() != nModelIndex) {
                this.m_nModleActionPartPack = [];
            }
            var bodyIndex = nModelIndex * 100;
            var nPart = Entity.StandardActions.GetSRPackageByAction(this.m_nAction, true);
            var pack = Resources.ResourcesManager._Instance.GetHumanPackage(bodyIndex + nPart);
            if (pack != null) {
                this.m_nModleActionPartPack[nPart] = pack;
            }
        };
        Human.prototype.CheckNeedLoadBodyAction = function (nAction, isHuman) {
            if (isHuman === void 0) { isHuman = false; }
            var ret = _super.prototype.CheckNeedLoadBodyAction.call(this, nAction, true);
            //加载武器
            if (this.GetWeaponModelIndex() > 0) {
                this.CheckNeedWeaponAction(nAction, true);
            }
            this.CheckNeedShadowAction(nAction, true);
            return ret;
        };
        Human.prototype.CheckNeedShadowAction = function (nAction, isHuman) {
            if (isHuman === void 0) { isHuman = false; }
            if (this.m_ShadowModlePack == null) {
                this.m_ShadowModelAni.SetPack(null);
                var pack = Resources.ResourcesManager._Instance.GetHumanShadowPackage(this.GetSex());
                if (pack != null) {
                    this.m_ShadowModlePack = pack;
                }
                if (pack != null && pack.GetFrameCount() > 0) {
                    this.m_ShadowModelAni.SetPack(pack);
                }
                return true;
            }
            if (this.m_ShadowModelAni.GetPack() != this.m_ShadowModlePack) {
                this.m_ShadowModelAni.SetPack(this.m_ShadowModlePack);
            }
            return false;
        };
        Human.prototype.CheckNeedWeaponAction = function (nAction, isHuman) {
            if (isHuman === void 0) { isHuman = false; }
            var part = Entity.StandardActions.GetSRPackageByAction(nAction, isHuman);
            var pack = this.m_WeaponModleActionPartPack[part];
            if (pack == null || pack.GetFrameCount() == 0) {
                this.m_WeaponModelAni.SetPack(null);
                this.SetWeaponModelIndex(this.GetWeaponModelIndex());
                pack = this.m_WeaponModleActionPartPack[part];
                if (pack != null && pack.GetFrameCount() > 0) {
                    this.m_WeaponModelAni.SetPack(pack);
                }
                return true;
            }
            this.m_WeaponModelAni.SetPack(pack);
            return false;
        };
        Human.prototype.UpdateAimation = function (nCurrentTick) {
            _super.prototype.UpdateAimation.call(this, nCurrentTick);
            if (this.GetWeaponModelIndex() > 0) {
                this.m_WeaponModelAni.Update(nCurrentTick);
            }
            this.m_ShadowModelAni.Update(nCurrentTick);
        };
        Human.prototype.SetAction = function (nAction, nDir) {
            if (nAction < 0) {
                nAction = 0;
            }
            var nOldAction = nAction;
            var nOldDir = this.GetDirection();
            this.m_nAction = nAction;
            this.SetDirection(nDir);
            if (this.CheckNeedLoadBodyAction(nAction, true)) {
                return;
            }
            var actionAnimation = Entity.HumanAction.GetDirActionByType(nAction);
            if (actionAnimation == null) {
                throw new Error("Human Get Action Error!" + nAction);
            }
            var nFrameCount = actionAnimation._nFrameCount;
            var nFrameStart = actionAnimation._nFrameStart + nDir * nFrameCount;
            var bodyFrameStart = nDir * nFrameCount;
            var dwActionTime = actionAnimation._nActionTime;
            switch (nAction) {
                case Entity.StandardActions.SA_WALK:
                case Entity.StandardActions.SA_RUN:
                    {
                        dwActionTime = this.GetMoveSpeed();
                        break;
                    }
                case Entity.StandardActions.SA_IDLE: //空闲状态
                    {
                        break;
                    }
                case Entity.StandardActions.SA_NORMHIT:
                case Entity.StandardActions.SA_HIT1:
                    {
                        this.m_nEndAttackPause = -1; //攻击动作停顿
                        break;
                    }
                case Entity.StandardActions.SA_READY_ATTACK: //攻击停顿
                    {
                        nFrameCount = 1;
                        dwActionTime = Config.GlobalConfig.HITPAUSETIME;
                        break;
                    }
                case Entity.StandardActions.SA_SPELL: //技能攻击
                    {
                        this.m_nEndAttackPause = -1; //施法动作停顿
                        break;
                    }
            }
            var dwInterval = dwActionTime / nFrameCount;
            var nEndFrame = bodyFrameStart + nFrameCount;
            if (nOldAction != this.m_nAction || nOldDir != this.GetDirection() ||
                bodyFrameStart != this.m_nModelAni.GetStartFrame() || this.m_nModelAni.GetEndFrame() != nEndFrame) {
                this.m_nModelAni.SetStartFrame(bodyFrameStart);
                this.m_nModelAni.SetEndFrame(nEndFrame);
                this.m_nModelAni.SetFrameRate(dwInterval);
                this.m_nModelAni.SetCurrentFrame(bodyFrameStart);
            }
            //更新武器动画
            if (nOldAction != this.m_nAction || nOldDir != this.GetDirection() ||
                bodyFrameStart != this.m_WeaponModelAni.GetStartFrame() || this.m_WeaponModelAni.GetEndFrame() != nEndFrame) {
                this.m_WeaponModelAni.SetStartFrame(bodyFrameStart);
                this.m_WeaponModelAni.SetEndFrame(nEndFrame);
                this.m_WeaponModelAni.SetFrameRate(dwInterval);
                this.m_WeaponModelAni.SetCurrentFrame(bodyFrameStart);
            }
            //更新影子动画
            if (nOldAction != this.m_nAction || nOldDir != this.GetDirection() ||
                bodyFrameStart != this.m_ShadowModelAni.GetStartFrame() || this.m_ShadowModelAni.GetEndFrame() != nEndFrame) {
                this.m_ShadowModelAni.SetStartFrame(nFrameStart);
                this.m_ShadowModelAni.SetEndFrame(nFrameStart + nEndFrame);
                this.m_ShadowModelAni.SetFrameRate(dwInterval);
                this.m_ShadowModelAni.SetCurrentFrame(nFrameStart);
            }
            if (this.m_nAction != Entity.StandardActions.SA_IDLE && this.m_nAction != Entity.StandardActions.SA_DEATH) {
                this.m_nNextActionTime = Config.GlobalConfig.s_dwUpdateTick + dwActionTime;
            }
            this.SwitchDirIndex();
            // console.log("下一次时间:"+dwActionTime)
            _super.prototype.SetAction.call(this, nAction, nDir);
        };
        Human.prototype.UpdatePropertys = function (id, value) {
            _super.prototype.UpdatePropertys.call(this, id, value);
            switch (id) {
                case Entity.enPropEntity.PROP_ACTOR_WEAPONAPPEARANCE:
                    {
                        this.SetWeaponModelIndex(parseInt(value));
                        break;
                    }
            }
        };
        //更换武器和衣服的Z轴顺序
        Human.prototype.SwitchDirIndex = function () {
            var DirLayerList = [];
            switch (this.GetDirection()) {
                case 0:
                case 6:
                case 7:
                case 5:
                    {
                        DirLayerList.push(this.m_ShadowModelAni);
                        DirLayerList.push(this.m_WeaponModelAni);
                        DirLayerList.push(this.m_nModelAni);
                        break;
                    }
                case 1:
                    {
                        DirLayerList.push(this.m_ShadowModelAni);
                        DirLayerList.push(this.m_nModelAni);
                        DirLayerList.push(this.m_WeaponModelAni);
                        break;
                    }
                case 2:
                    {
                        var type = Entity.StandardActions.GetSRPackageByAction(this.m_nAction, true);
                        if (type == Entity.StandardActions.AP_CARRIER_IDLE || type == Entity.StandardActions.AP_WALK ||
                            type == Entity.StandardActions.AP_ATTACK || type == Entity.StandardActions.AP_RUN) {
                            DirLayerList.push(this.m_ShadowModelAni);
                            DirLayerList.push(this.m_nModelAni);
                            DirLayerList.push(this.m_WeaponModelAni);
                        }
                        break;
                    }
                case 3:
                case 4:
                    {
                        DirLayerList.push(this.m_ShadowModelAni);
                        DirLayerList.push(this.m_nModelAni);
                        DirLayerList.push(this.m_WeaponModelAni);
                        break;
                    }
            }
            for (var i = 0; i < DirLayerList.length; i++) {
                DirLayerList[i].zOrder = i + 1;
            }
        };
        Human.prototype.GetJob = function () {
            return this.GetIntProperty(Entity.enPropEntity.PROP_ACTOR_VOCATION);
        };
        Human.prototype.SetToIdleAction = function () {
            if (this.m_nEndAttackPause == 0) {
                if (!this.IsDie()) {
                    // if(this.m_nAction != StandardActions.SA_IDLE)
                    {
                        this.SetAction(Entity.StandardActions.SA_IDLE, this.GetDirection());
                    }
                }
            }
            //检查攻击停留的超时，主要用于允许主角的下一次本地逻辑控制
            else if (this.m_nEndAttackPause > 0 && Config.GlobalConfig.s_dwUpdateTick >= this.m_nEndAttackPause) {
                this.m_nEndAttackPause = 0;
            }
            //等待设置为攻击停留
            else if (this.m_nEndAttackPause == -1) {
                this.SetToReadyAction(Entity.StandardActions.SA_READY_ATTACK);
            }
            //施法停留
            else if (this.m_nEndAttackPause == -3) {
                this.SetToReadyAction(Entity.StandardActions.SA_PREPARESKILL);
            }
        };
        /**
        * 设置为攻击、采集后的停留动作
        *
        */
        Human.prototype.SetToReadyAction = function (nAction) {
            switch (nAction) {
                case Entity.StandardActions.SA_PREPARESKILL:
                    {
                        nAction = Entity.StandardActions.SA_READY_ATTACK;
                        break;
                    }
                case Entity.StandardActions.SA_READY_ATTACK:
                    {
                        nAction = Entity.StandardActions.SA_READY_ATTACK;
                        break;
                    }
            }
            this.m_nEndAttackPause = Config.GlobalConfig.s_dwUpdateTick + Config.GlobalConfig.HITPAUSETIME;
            this.SetAction(nAction, this.GetDirection());
        };
        return Human;
    }(Entity.CustomEntity));
    Entity.Human = Human;
})(Entity || (Entity = {}));
//# sourceMappingURL=Human.js.map