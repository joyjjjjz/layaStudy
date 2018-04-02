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
    var LogicSystem = /** @class */ (function (_super) {
        __extends(LogicSystem, _super);
        function LogicSystem() {
            var _this = _super.call(this) || this;
            _this.m_NetProcess[ClientMsgPack.PackType.LogicSystem.sCreateMainActor] = _this.OnCreateMainActor; //创建主角
            _this.m_NetProcess[ClientMsgPack.PackType.LogicSystem.sChangeMap] = _this.OnMapChange; //地图被改变
            _this.m_NetProcess[ClientMsgPack.PackType.LogicSystem.sEntityDisappear] = _this.OnEntityDisappear; //实体消失
            _this.m_NetProcess[ClientMsgPack.PackType.LogicSystem.sOtherPlayerAppear] = _this.OnOtherPlayerApper; //其他角色出现
            _this.m_NetProcess[ClientMsgPack.PackType.LogicSystem.sEntityWalk] = _this.OnEntityWalk; //实体走路
            _this.m_NetProcess[ClientMsgPack.PackType.LogicSystem.sEntityRun] = _this.OnEntityRun; //实体跑步
            _this.m_NetProcess[ClientMsgPack.PackType.LogicSystem.sEntityAppear] = _this.OnEntityAppear; //实体出现
            _this.m_NetProcess[ClientMsgPack.PackType.LogicSystem.sNormalAttack] = _this.OnNormalAttack; //普通攻击
            _this.m_NetProcess[ClientMsgPack.PackType.LogicSystem.sProperyChange] = _this.OnEntityProperyChange; //实体属性被改变
            _this.m_NetProcess[ClientMsgPack.PackType.LogicSystem.sEntityDeath] = _this.OnEntityDeath; //实体死亡
            _this.m_NetProcess[ClientMsgPack.PackType.LogicSystem.sUseSkill] = _this.OnEntityUseSkill; //使用技能
            _this.m_NetProcess[ClientMsgPack.PackType.LogicSystem.sAddActorEffect] = _this.OnAddEntityEffect; //增加实体特效
            _this.m_NetProcess[ClientMsgPack.PackType.LogicSystem.sNpcTalk] = _this.OnNpcTalk; //npc对话
            _this.m_NetProcess[ClientMsgPack.PackType.LogicSystem.sSceneEffect] = _this.OnSceneEffect; //场景特效
            return _this;
        }
        LogicSystem.prototype.OnCreateMainActor = function (pack) {
            var handle = pack.ReadDouble();
            var nLen = pack.ReadUInt16();
            var propSet = new Entity.PropertySet();
            for (var i = 0; i < Entity.enPropEntity.PROP_MAX_ACTOR; i++) {
                propSet.ReadProperty(i, pack);
            }
            var szName = pack.ReadCustomString();
            var szLoginIp = pack.ReadCustomString();
            LogicManager.GetInstance().CreateEntity(handle, Entity.EntityType.Player, propSet);
            var pPlayer = Entity.Player.GetInstance();
            pPlayer.PostActionMessage(Entity.StandardActions.SA_IDLE, null);
            pPlayer.SetEntityName(szName);
            //Net.MsgSender.SendQueryFirstData();
            //创建主界面ui
            UI.UIManager.GetInstance().InitMainLayer();
        };
        LogicSystem.prototype.OnMapChange = function (pack) {
            var msgPack = new ClientMsgPack.LogicPack.MapChangeMsgPack();
            msgPack.DeSerialize(pack);
            //会加载地图文件，加载成功后根据主角的坐标设置地图坐标
            GameMap.CustomGameMap.GetInstance().LoadMap(msgPack._szMapFile, msgPack._szMapName, msgPack._nMapID);
            //设置主角位置
            var pPlayer = Entity.Player.GetInstance();
            pPlayer.SetCurrentXY(msgPack._nX, msgPack._nY);
            var pMiniMap = UI.UIManager.GetInstance().GetMiniMapDialog();
            if (pMiniMap != null) {
                pMiniMap.SetMapName(msgPack._szMapName);
            }
        };
        LogicSystem.prototype.OnEntityDisappear = function (pack) {
            var msgPack = new ClientMsgPack.LogicPack.EntityDisappearMsgPack();
            msgPack.DeSerialize(pack);
            var pEntity = LogicManager.GetInstance().FindEntity(msgPack._Handle);
            if (pEntity != null) {
                pEntity.PostCharMessage(Entity.ActorMessages.AM_DISAPPEAR, 0, 0, 0, null);
            }
        };
        LogicSystem.prototype.OnOtherPlayerApper = function (pack) {
            var msg = new ClientMsgPack.LogicPack.EntityAppearActorMsgPack();
            msg.DeSerialize(pack);
            var propSet = new Entity.PropertySet();
            propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_MODELID, msg._nModelID);
            propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_POSX, msg._nX);
            propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_POSY, msg._nY);
            propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_DIR, msg._bDir);
            propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_HP, msg._nHP);
            propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_MP, msg._nMP);
            propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_MAXHP, msg._nMaxHP);
            propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_MAXMP, msg._nMaxMP);
            propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_MOVEONESLOTTIME, msg._nMoveSpeed);
            propSet.SetProperty(Entity.enPropEntity.PROP_ACTOR_WEAPONAPPEARANCE, msg._nWeaponApr);
            var pEntity = LogicManager.GetInstance().CreateEntity(msg._Handle, Entity.EntityType.Human, propSet);
            if (pEntity != null) {
                pEntity.SetEntityName(msg._szName);
            }
        };
        LogicSystem.prototype.OnEntityWalk = function (pack) {
            LogicSystem.OnEntityMove(0, pack);
        };
        LogicSystem.prototype.OnEntityRun = function (pack) {
            LogicSystem.OnEntityMove(1, pack);
        };
        //实体移动
        LogicSystem.OnEntityMove = function (type, pack) {
            var msg = new ClientMsgPack.LogicPack.MoveRetMsgPack();
            msg.DeSerialize(pack);
            var pEntity = LogicManager.GetInstance().FindEntity(msg._Handle);
            if (pEntity != null) {
                var nAction = type == 0 ? Entity.StandardActions.SA_WALK : Entity.StandardActions.SA_RUN;
                pEntity.PostActionMessage(nAction, { x: msg._nSrcPosX, y: msg._nSrcPosY, dir: msg._nDir });
            }
        };
        LogicSystem.prototype.OnEntityAppear = function (pack) {
            var type = pack.ReadUByte();
            pack.SetPos(pack.GetPos() - 1);
            switch (type) {
                case Entity.EntityType.Npc://npc
                    {
                        var npcMsg = new ClientMsgPack.LogicPack.EntityAppearNpcMsgPack();
                        npcMsg.DeSerialize(pack);
                        var propSet = new Entity.PropertySet();
                        propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_MODELID, npcMsg._nID);
                        propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_POSX, npcMsg._nX);
                        propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_POSY, npcMsg._nY);
                        var pNpc = LogicManager.GetInstance().CreateEntity(npcMsg._Handle, Entity.EntityType.Npc, propSet);
                        if (pNpc != null) {
                            pNpc.SetEntityName(npcMsg._szName);
                        }
                        break;
                    }
                case Entity.EntityType.Monster://怪物
                    {
                        var monsterMsg = new ClientMsgPack.LogicPack.EntityAppearMonsterMsgPack();
                        monsterMsg.DeSerialize(pack);
                        var propSet = new Entity.PropertySet();
                        propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_ID, monsterMsg._nMonsterID);
                        propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_MODELID, monsterMsg._nModelID);
                        propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_POSX, monsterMsg._nX);
                        propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_POSY, monsterMsg._nY);
                        propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_DIR, monsterMsg._bDir);
                        propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_LEVEL, monsterMsg._bLevel);
                        propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_HP, monsterMsg._nHP);
                        propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_MP, monsterMsg._nMP);
                        propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_MAXHP, monsterMsg._nMaxHP);
                        propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_MAXMP, monsterMsg._nMaxMP);
                        propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_MOVEONESLOTTIME, monsterMsg._nMoveSpeed);
                        propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_ATTACK_SPEED, monsterMsg._nAttackSpeed);
                        var pMonster = LogicManager.GetInstance().CreateEntity(monsterMsg._Handle, Entity.EntityType.Monster, propSet);
                        if (pMonster != null) {
                            pMonster.SetEntityName(monsterMsg._szName);
                        }
                        break;
                    }
            }
        };
        LogicSystem.prototype.OnNormalAttack = function (pack) {
            var msg = new ClientMsgPack.LogicPack.NearAttackMsgPackRet();
            msg.DeSerialize(pack);
            var pAttack = LogicManager.GetInstance().FindEntity(msg._Handle);
            if (pAttack != null) {
                pAttack.PostActionMessage(Entity.StandardActions.SA_NORMHIT, { dir: msg._bDir });
            }
        };
        LogicSystem.prototype.OnEntityProperyChange = function (pack) {
            var msg = new ClientMsgPack.LogicPack.EntityProperyChange();
            msg.DeSerialize(pack);
            var pEntity = LogicManager.GetInstance().FindEntity(msg._Handle);
            if (pEntity != null) {
                pEntity.PostCharMessage(Entity.ActorMessages.AM_PROPERTY_CHANGE, 0, 0, 0, msg._PropSet);
            }
        };
        LogicSystem.prototype.OnEntityDeath = function (pack) {
            var msg = new ClientMsgPack.LogicPack.EntityDeathMsgPack();
            msg.DeSerialize(pack);
            var pDeathEntity = LogicManager.GetInstance().FindEntity(msg._DeathHandle);
            if (pDeathEntity != null) {
                var nDeathDir = 0;
                var pKillEntity = LogicManager.GetInstance().FindEntity(msg._KillHandle);
                if (pKillEntity != null) {
                    nDeathDir = GameMap.CustomMap.GetBackDirection(pKillEntity.GetDirection());
                    pDeathEntity.PostActionMessage(Entity.StandardActions.SA_DIE, { dir: nDeathDir });
                }
            }
        };
        LogicSystem.prototype.OnEntityUseSkill = function (pack) {
            var msg = new ClientMsgPack.SkillPack.UseSkillRetMsgPack();
            msg.DeSerialize(pack);
            var pEntity = LogicManager.GetInstance().FindEntity(msg._Handle);
            if (pEntity != null) {
                var pStdSkill = Config.ConfigManager.GetInstance().GetSkillConfig().GetStdSkillByID(msg._nSkillId, msg._bLevel);
                if (pStdSkill != null) {
                    pEntity.PostActionMessage(pStdSkill._nAction, { dir: msg._bDir });
                }
            }
        };
        LogicSystem.prototype.OnAddEntityEffect = function (pack) {
            var msg = new ClientMsgPack.LogicPack.AddEntityEffectMsgPack();
            msg.DeSerialize(pack);
            var pEntity = LogicManager.GetInstance().FindEntity(msg._Handle);
            if (pEntity != null) {
                pEntity.AddEffect(msg._nEffId, Config.EffectShowPos.Entity, msg._bEffType, msg._nDuration);
            }
        };
        LogicSystem.prototype.OnNpcTalk = function (pack) {
            var msg = new ClientMsgPack.LogicPack.NpcTalkMsgPackRet();
            msg.DeSerialize(pack);
            var pNpcDialog = UI.UIManager.GetInstance().GetNpcDialog();
            if (pNpcDialog.Update(msg._Handle, msg._nType, msg._szStr)) {
                if (pNpcDialog.visible == false) {
                    pNpcDialog.visible = true;
                }
            }
        };
        LogicSystem.prototype.OnSceneEffect = function (pack) {
            var msg = new ClientMsgPack.LogicPack.SceneEffectMsgPack();
            msg.DeSerialize(pack);
            GameMap.CustomGameMap.GetInstance().AddEffect(msg._nID, msg._bEffType, msg._nX, msg._nY, msg._nDuration);
        };
        return LogicSystem;
    }(NetSystem.BaseNetSystem));
    NetSystem.LogicSystem = LogicSystem;
})(NetSystem || (NetSystem = {}));
//# sourceMappingURL=LogicSystem.js.map