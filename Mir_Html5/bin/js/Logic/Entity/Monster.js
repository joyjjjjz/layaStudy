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
    var Monster = /** @class */ (function (_super) {
        __extends(Monster, _super);
        function Monster(handle) {
            var _this = _super.call(this, handle) || this;
            _this.m_Type = Entity.EntityType.Monster;
            return _this;
        }
        Monster.prototype.SetModelIndex = function (nModelIndex) {
            if (nModelIndex < 0) {
                return;
            }
            if (this.GetModelIndex() != nModelIndex) {
                this.m_nModleActionPartPack = [];
            }
            var bodyIndex = nModelIndex * 100;
            var nPart = Entity.StandardActions.GetSRPackageByAction(this.m_nAction, true);
            var pack = Resources.ResourcesManager._Instance.GetMonsterPackage(bodyIndex + nPart);
            if (pack != null) {
                this.m_nModleActionPartPack[nPart] = pack;
            }
        };
        Monster.prototype.SetAction = function (nAction, nDir) {
            if (nAction < 0) {
                nAction = 0;
            }
            var nOldAction = nAction;
            var nOldDir = this.GetDirection();
            this.m_nAction = nAction;
            var is5dir = true;
            this.SetDirection(nDir);
            if (is5dir && nDir >= 5) {
                nDir = 8 - nDir;
            }
            if (this.CheckNeedLoadBodyAction(nAction, true)) {
                return;
            }
            var actionAnimation = Entity.StdMonsterAction.GetDirActionByType(nAction);
            if (actionAnimation == null) {
                return;
            }
            var nFrameCount = actionAnimation._nFrameCount;
            var nFrameStart = actionAnimation._nFrameStart + nDir * nFrameCount;
            var bodyFrameStart = nDir * nFrameCount;
            var dwActionTime = actionAnimation._nActionTime;
            //取消最后一帧停顿状态
            this.m_nModelAni.SetEndFramePasue(false);
            switch (nAction) {
                case Entity.StandardActions.SA_WALK:
                case Entity.StandardActions.SA_RUN:
                    {
                        dwActionTime = this.GetMoveSpeed();
                        break;
                    }
                case Entity.StandardActions.SA_IDLE://空闲状态
                    {
                        break;
                    }
                case Entity.StandardActions.SA_NORMHIT:
                case Entity.StandardActions.SA_HIT1:
                case Entity.StandardActions.SA_HIT2:
                case Entity.StandardActions.SA_HIT3:
                    {
                        dwActionTime = this.GetAttackSpeed();
                        break;
                    }
                case Entity.StandardActions.SA_DEATH:
                    {
                        nFrameStart = actionAnimation._nFrameStart + nDir * nFrameCount + (actionAnimation._nFrameCount - 1);
                        nFrameCount = 1;
                    }
                case Entity.StandardActions.SA_DIE:
                    {
                        //死亡最后一帧停顿下来，然后触发sa_death状态，防止动画闪烁
                        this.m_nModelAni.SetEndFramePasue(true);
                        break;
                    }
            }
            var dwInterval = dwActionTime / nFrameCount;
            if (bodyFrameStart != nFrameStart) {
                bodyFrameStart = nFrameStart;
            }
            var nEndFrame = bodyFrameStart + nFrameCount;
            if (nOldAction != this.m_nAction || nOldDir != this.GetDirection() ||
                bodyFrameStart != this.m_nModelAni.GetStartFrame() || this.m_nModelAni.GetEndFrame() != nEndFrame) {
                this.m_nModelAni.SetStartFrame(bodyFrameStart);
                this.m_nModelAni.SetEndFrame(nEndFrame);
                this.m_nModelAni.SetFrameRate(dwInterval);
                this.m_nModelAni.SetCurrentFrame(bodyFrameStart);
                this.m_nModelAni.scaleX = (this.GetDirection() <= 4) && is5dir ? 1 : -1;
            }
            if (this.m_nAction != Entity.StandardActions.SA_IDLE && this.m_nAction != Entity.StandardActions.SA_DEATH) {
                this.m_nNextActionTime = Config.GlobalConfig.s_dwUpdateTick + dwActionTime;
            }
            _super.prototype.SetAction.call(this, nAction, nDir);
        };
        Monster.prototype.GetAttackSpeed = function () {
            return this.m_PropSet.GetIntProperty(Entity.enPropEntity.PROP_CREATURE_ATTACK_SPEED);
        };
        return Monster;
    }(Entity.CustomEntity));
    Entity.Monster = Monster;
})(Entity || (Entity = {}));
//# sourceMappingURL=Monster.js.map