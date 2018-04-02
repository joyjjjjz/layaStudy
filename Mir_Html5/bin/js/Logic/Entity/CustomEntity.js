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
    var CustomEntity = /** @class */ (function (_super) {
        __extends(CustomEntity, _super);
        /**
        * 计算当前坐标与另一个坐标的方向
        * @param handle	实体句柄
        *
        */
        function CustomEntity(handle) {
            var _this = _super.call(this) || this;
            _this.m_nHandle = 0; //实体句柄
            _this.m_CharMsgList = []; //角色非行为消息队列
            _this.m_ActionMsgList = []; //角色动作消息队列
            _this.m_nModelAni = new Common.Animation(null, 0, 0, 0, -1); //角色模型动画
            _this.m_nModleActionPartPack = []; //身体动作部件资源包
            _this.m_PropSet = new Entity.PropertySet(); //属性集
            _this.m_sEntityName = ""; //实体名称
            _this.m_nAction = 0; //实体当前动作
            _this.m_nNextActionTime = 0; //下一帧动作时间
            _this.m_nDestX = 0; //移动的目的坐标X,如果角色不处于移动状态则此值等于m_nCurrentX
            _this.m_nDestY = 0; //移动的目的坐标Y,如果角色不处于移动状态则此值等于m_nCurrentY
            _this.m_EffectList = null; //战士挥砍特效 同步帧数
            _this.m_nHandle = handle;
            _this.m_EffectList = new Array();
            _this.m_Appearance = new Laya.Sprite();
            _this.addChild(_this.m_Appearance);
            _this.m_Appearance.addChild(_this.m_nModelAni); //身体动画
            _this.m_nModelAni.zOrder = 1; //ｚ轴
            _this.m_UIContainer = new Laya.Sprite();
            _this.m_Appearance.addChild(_this.m_UIContainer);
            _this.m_UIContainer.x = -CustomEntity.DefalutWidth / 2;
            _this.m_UIContainer.y = -CustomEntity.DefalutHeight;
            _this.m_TextName = new Laya.TextInput();
            _this.m_TextName.mouseEnabled = false;
            //血条进度条
            var pCfg = Config.GlobalConfig._Instance;
            _this.m_ProgressHP = new Laya.ProgressBar(pCfg._szHPProgressUrl[0]);
            _this.m_ProgressHP.value = 100;
            _this.m_UIContainer.addChild(_this.m_ProgressHP);
            _this.m_ProgressHP.pos(0, 0);
            //名称标签
            _this.m_TextName.font = pCfg._szFont;
            _this.m_TextName.fontSize = pCfg._nFontSize;
            _this.m_TextName.width = CustomEntity.DefalutWidth * 2;
            _this.m_TextName.align = "center";
            _this.m_TextName.color = "#ffffff";
            _this.m_TextName.pos(-CustomEntity.DefalutWidth / 2, _this.m_ProgressHP.y + -pCfg._nFontSize - 10);
            _this.m_UIContainer.addChild(_this.m_TextName);
            _this.m_UIContainer.zOrder = 1000; //在最顶层
            return _this;
        }
        CustomEntity.prototype.GetHandle = function () {
            return this.m_nHandle;
        };
        CustomEntity.prototype.GetAppearance = function () {
            return this.m_Appearance;
        };
        CustomEntity.prototype.Update = function (nCurrentTick) {
            //  console.log("CustomEntity:Update_begin");
            _super.prototype.Update.call(this, nCurrentTick);
            // console.log("CustomEntity:Update_end");
            //处理实体消息
            if (this.m_CharMsgList.length > 0) {
                var msg = this.m_CharMsgList[0];
                this.DispatchActorMsg(msg);
                this.m_CharMsgList.splice(0, 1);
            }
            //状态机处理，取下一个实体动作信息
            if (nCurrentTick >= this.m_nNextActionTime || this.m_ActionMsgList.length > 0) {
                //------------------------------------------------
                //神奇代码，勿动！！！！！
                //2017.10.8-01:11
                if (this.m_nAction == Entity.StandardActions.SA_WALK || this.m_nAction == Entity.StandardActions.SA_RUN) {
                    if (this.m_dwMoveStartTick > 0) {
                        this.UpdateAimation(nCurrentTick);
                        return;
                    }
                }
                //--------------------------------------------------
                var nAction = this.m_nAction;
                this.m_nAction = -1;
                if (this.m_ActionMsgList.length > 0) {
                    var msg = this.m_ActionMsgList[0];
                    this.DispatchAcionMsg(msg);
                    this.m_ActionMsgList.splice(0, 1);
                }
                if (this.m_nAction == -1) {
                    this.m_nAction = nAction;
                    this.SetToIdleAction();
                }
            }
            this.UpdateAimation(nCurrentTick);
            //更新挥砍特效
            for (var i = this.m_EffectList.length - 1; i > 0; i--) {
                var pAni = this.m_EffectList[i];
                pAni.Update(nCurrentTick);
                if (pAni.parent == null) {
                    this.m_EffectList.splice(i, 1);
                }
            }
        };
        CustomEntity.prototype.Destory = function () {
            this.removeSelf();
            this.m_Appearance.removeSelf();
            this.m_UIContainer.removeSelf();
            this.m_UIContainer.destroy();
            this.m_UIContainer = null;
            this.m_ProgressHP.removeSelf();
            this.m_ProgressHP.destroy();
            this.m_ProgressHP = null;
            this.m_TextName.removeSelf();
            this.m_TextName.destroy();
            this.m_TextName = null;
            this.m_nModelAni.Destory();
            this.m_nModelAni = null;
            for (var i = 0; i < this.m_EffectList.length; i++) {
                var pAnimation = this.m_EffectList[i];
                pAnimation.Destory();
            }
            this.m_EffectList = null;
        };
        CustomEntity.prototype.UpdateAimation = function (nCurrentTick) {
            this.m_nModelAni.Update(nCurrentTick);
        };
        /**
         * 投递来自服务器的角色消息
         * @param Ident
         * @param Param
         * @param Tag
         * @param Series
         * @param Data
         *
         */
        CustomEntity.prototype.PostCharMessage = function (Ident, Param, Tag, Series, Data) {
            if (Data === void 0) { Data = null; }
            var msg = new Entity.ActorMessage(Ident, Param, Tag, Series, Data);
            this.m_CharMsgList.push(msg);
        };
        //投递动作消息
        CustomEntity.prototype.PostActionMessage = function (nAction, Data) {
            var msg = new Entity.ActionMessage(nAction, Data);
            this.m_ActionMsgList.push(msg);
        };
        CustomEntity.prototype.DispatchActorMsg = function (msg) {
            switch (msg._Ident) {
                case Entity.ActorMessages.AM_PROPERTY_CHANGE://实体属性被改变
                    {
                        if (msg._Data == null) {
                            break;
                        }
                        this.ChangePropertys(msg._Data);
                        break;
                    }
                case Entity.ActorMessages.AM_DISAPPEAR://实体消失
                    {
                        this.m_boDisappeared = true;
                        break;
                    }
            }
        };
        CustomEntity.prototype.DispatchAcionMsg = function (msg) {
            switch (msg._nAction) {
                case Entity.StandardActions.SA_IDLE:
                    {
                        this.SetAction(msg._nAction, this.GetDirection());
                        break;
                    }
                case Entity.StandardActions.SA_WALK:
                    {
                        var data = msg._Data;
                        this.SetAction(Entity.StandardActions.SA_WALK, data.dir);
                        var Pos = GameMap.CustomMap.CalcForwardPosition(data.x, data.y, data.dir, 1);
                        if (this.m_nCurrentX != data.x || this.m_nCurrentY != data.y) {
                            this.SetCurrentXY(data.x, data.y);
                        }
                        this.MoveTo(Pos.x, Pos.y, this.GetMoveSpeed());
                        break;
                    }
                case Entity.StandardActions.SA_RUN:
                    {
                        var data = msg._Data;
                        this.SetAction(Entity.StandardActions.SA_RUN, data.dir);
                        var Pos = GameMap.CustomMap.CalcForwardPosition(data.x, data.y, data.dir, 2);
                        if (this.m_nCurrentX != data.x || this.m_nCurrentY != data.y) {
                            this.SetCurrentXY(data.x, data.y);
                        }
                        this.MoveTo(Pos.x, Pos.y, this.GetMoveSpeed());
                        break;
                    }
                case Entity.StandardActions.SA_NORMHIT:
                    {
                        var data = msg._Data;
                        this.SetAction(Entity.StandardActions.SA_NORMHIT, data.dir);
                        break;
                    }
                case Entity.StandardActions.SA_DEATH:
                    {
                        var data = msg._Data;
                        this.SetAction(Entity.StandardActions.SA_DEATH, data.dir);
                        break;
                    }
                case Entity.StandardActions.SA_DIE:
                    {
                        this.m_UIContainer.visible = false; //死亡后隐藏ui
                        var data = msg._Data;
                        this.SetAction(Entity.StandardActions.SA_DIE, data.dir);
                        break;
                    }
                case Entity.StandardActions.SA_SPELL:
                    {
                        var data = msg._Data;
                        this.SetAction(Entity.StandardActions.SA_SPELL, data.dir);
                        break;
                    }
            }
        };
        CustomEntity.prototype.MoveTo = function (X, Y, speed) {
            if (speed === void 0) { speed = 0; }
            _super.prototype.MoveTo.call(this, X, Y, speed);
            this.SetDestXY(X, Y);
        };
        /**
         * 依据当前角色的状态设置为空闲动作
         *
         */
        CustomEntity.prototype.SetToIdleAction = function () {
            if (this.IsDie()) {
                this.SetAction(Entity.StandardActions.SA_DEATH, this.GetDirection());
            }
            else {
                this.SetAction(Entity.StandardActions.SA_IDLE, this.GetDirection());
            }
        };
        CustomEntity.prototype.ChangePropertys = function (propSet) {
            var a = Entity.enPropEntity.PROP_ENTITY_DIR;
            var arr = propSet.GetPropertyToArray();
            for (var i = 0; i < arr.length; i++) {
                var id = parseInt(arr[i].id);
                var value = arr[i].value;
                this.UpdatePropertys(id, value);
                this.m_PropSet.SetProperty(id, value);
            }
        };
        CustomEntity.prototype.UpdatePropertys = function (id, value) {
            switch (id) {
                case Entity.enPropEntity.PROP_ENTITY_DIR:
                    {
                        this.SetDirection(parseInt(value));
                        break;
                    }
                case Entity.enPropEntity.PROP_ENTITY_MODELID:
                    {
                        this.SetModelIndex(parseInt(value));
                        break;
                    }
                case Entity.enPropEntity.PROP_CREATURE_MOVEONESLOTTIME:
                    {
                        this.SetMoveSpeed(parseInt(value));
                        break;
                    }
                case Entity.enPropEntity.PROP_CREATURE_HP:
                    {
                        var nCurrentValue = this.m_PropSet.GetIntProperty(Entity.enPropEntity.PROP_CREATURE_HP);
                        var nNewValue = parseInt(value);
                        var nMaxValue = this.GetIntProperty(Entity.enPropEntity.PROP_CREATURE_MAXHP);
                        UI.DamageEff.GetInstance().MakeDamageEffect(this, nNewValue - nCurrentValue);
                        this.ChangeHpProgress(nNewValue, nMaxValue);
                        break;
                    }
                case Entity.enPropEntity.PROP_CREATURE_MAXHP:
                    {
                        var nNewValue = parseInt(value);
                        var nCurrentValue = this.GetIntProperty(Entity.enPropEntity.PROP_CREATURE_HP);
                        this.ChangeHpProgress(nCurrentValue, nNewValue);
                        break;
                    }
            }
        };
        CustomEntity.prototype.GetModelIndex = function () {
            return this.m_PropSet.GetIntProperty(Entity.enPropEntity.PROP_ENTITY_MODELID);
        };
        CustomEntity.prototype.SetModelIndex = function (nModelIndex) {
        };
        CustomEntity.prototype.GetEntityType = function () {
            return this.m_Type;
        };
        CustomEntity.prototype.GetEntityName = function () {
            return this.m_sEntityName;
        };
        CustomEntity.prototype.SetEntityName = function (sName) {
            this.m_sEntityName = sName;
            this.m_TextName.text = this.m_sEntityName;
        };
        CustomEntity.prototype.SetDirection = function (nDir) {
            nDir = nDir % 8;
            if (this.GetDirection() != nDir) {
                this.m_nDirection = nDir;
                this.SetAction(this.m_nAction, this.m_nDirection);
            }
        };
        CustomEntity.prototype.SetAction = function (nAction, nDir) {
            this.m_nAction = nAction;
        };
        CustomEntity.prototype.GetModelAni = function () {
            return this.m_nModelAni;
        };
        CustomEntity.prototype.IsDie = function () {
            return this.m_PropSet.GetIntProperty(Entity.enPropEntity.PROP_CREATURE_HP) == 0 ? true : false;
        };
        CustomEntity.prototype.CheckNeedLoadBodyAction = function (nAction, isHuman) {
            if (isHuman === void 0) { isHuman = false; }
            var part = Entity.StandardActions.GetSRPackageByAction(nAction, isHuman);
            var pack = this.m_nModleActionPartPack[part];
            if (pack == null || pack.GetFrameCount() == 0) {
                this.m_nModelAni.SetPack(null);
                this.SetModelIndex(this.GetModelIndex());
                pack = this.m_nModleActionPartPack[part];
                if (pack != null && pack.GetFrameCount() > 0) {
                    this.m_nModelAni.SetPack(pack);
                }
                return true;
            }
            this.m_nModelAni.SetPack(pack);
            return false;
        };
        CustomEntity.prototype.SetCurrentXY = function (X, Y) {
            _super.prototype.SetCurrentXY.call(this, X, Y);
            //遮挡透明
            this.AlphaAppearanceCurrentPoint(X, Y);
            this.SetDestXY(X, Y);
        };
        CustomEntity.prototype.SetDestXY = function (nDestX, nDestY) {
            this.m_nDestX = nDestX;
            this.m_nDestY = nDestY;
        };
        /**
 * 判断在当前点是否需要半透明身体
 * @param X
 * @param Y
 *
 */
        CustomEntity.prototype.AlphaAppearanceCurrentPoint = function (X, Y) {
            switch (this.m_Type) {
                case Entity.EntityType.Human:
                case Entity.EntityType.Npc:
                case Entity.EntityType.Player:
                case Entity.EntityType.Monster:
                    {
                        if (GameMap.CustomGameMap.GetInstance().Hidden(X, Y)) {
                            this.alpha = CustomEntity.Map_Hidden_Alpha;
                        }
                        else {
                            this.alpha = 1;
                        }
                        break;
                    }
            }
        };
        CustomEntity.prototype.GetIntProperty = function (propType) {
            return this.m_PropSet.GetIntProperty(propType);
        };
        CustomEntity.prototype.ChangeHpProgress = function (nHp, nMaxHp) {
            // let hp:number = this.GetIntProperty(enPropEntity.PROP_CREATURE_HP);
            // let maxhp:number = this.GetIntProperty(enPropEntity.PROP_CREATURE_MAXHP);
            this.m_ProgressHP.value = nHp / nMaxHp;
        };
        CustomEntity.prototype.AddEffectById = function (nEffectId) {
            var pStdEffect = Config.ConfigManager.GetInstance().GetEffectConfig().GetEffectByID(nEffectId);
            if (pStdEffect != null) {
                this.AddEffect(pStdEffect._nID, pStdEffect._ShowPos, pStdEffect._Type, pStdEffect._nDuration);
            }
        };
        CustomEntity.prototype.AddEffect = function (nEffectId, showPos, type, nDuration) {
            var pEffect = null;
            var pack = Resources.ResourcesManager._Instance.GetSkillEffectPackage(nEffectId);
            //特效并没有加载完成
            if (pack.GetFrameCount() <= 0) {
                return;
            }
            switch (type) {
                case Config.EffectType.meOnWeapon://挥洒八方向特效
                    {
                        var nFrameCount = pack.GetFrameCount() / 8;
                        var nStartFrame = nFrameCount * this.GetDirection();
                        var nEndFrame = nFrameCount * this.GetDirection() + nFrameCount;
                        pEffect = new Common.Animation(pack, nStartFrame, nEndFrame, 0, 1);
                        break;
                    }
                case Config.EffectType.meKeepOnBody:
                case Config.EffectType.meKeepOnFeet://脚下持续
                    {
                        var nStartFrame = 0;
                        var nEndFrame = pack.GetFrameCount();
                        pEffect = new Common.Animation(pack, nStartFrame, nEndFrame, 0, 1);
                        break;
                    }
            }
            if (pEffect != null) {
                this.addChild(pEffect);
                this.m_EffectList.push(pEffect);
            }
            var pStdEffect = Config.ConfigManager.GetInstance().GetEffectConfig().GetEffectByID(nEffectId);
            if (pStdEffect != null && pStdEffect._nSoundId > 0) {
                SoundManager.GetInstance().PlayEffectSound(pStdEffect._nSoundId);
            }
        };
        CustomEntity.prototype.GetDistance = function (nPosX, nPosY) {
            var nCurPosX = this.GetCurentX() - nPosX;
            var nCurPosY = this.GetCurrentY() - nPosY;
            var nDis = nCurPosX * nCurPosX + nCurPosY * nCurPosY;
            ;
            return Math.sqrt(nDis);
        };
        CustomEntity.Map_Hidden_Alpha = 0.6; //在需要透明的地图点上时,人物的透明度
        CustomEntity.DefalutHeight = 120; //默认身体高度
        CustomEntity.DefalutWidth = 58; //默认身体宽度
        return CustomEntity;
    }(GameMap.MapMoveObject));
    Entity.CustomEntity = CustomEntity;
})(Entity || (Entity = {}));
//# sourceMappingURL=CustomEntity.js.map