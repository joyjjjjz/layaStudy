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
/**
 * 本地玩家类
 * 此类在游戏中只能被构造一次！
 * @author 后天 2017.9.30
 *
 */
var Entity;
(function (Entity) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player(handle) {
            var _this = _super.call(this, handle) || this;
            _this.m_boPassiveMoving = false; //是否在被动移动中
            _this.m_nPassiveMoveDir = 0; //被动移动的方向
            _this.m_nNextAction = Entity.StandardActions.AP_IDLE; //下一个动作
            _this.m_nNextDirection = 0;
            _this.m_dwActionTimeOut = 0; //当前动作超时时间
            _this.m_nMoveType = Player.MOVE_TYPE_WALK;
            _this.m_nNextPassTime = 0; //下一次移动时间戳
            _this.m_MoveAction = new Entity.MoveAction(); //包含移动的方向和步伐
            _this.m_nLastActionTime = 0;
            _this.m_nOldX = 0;
            _this.m_nOldY = 0;
            _this.m_AttackTarget = null; //攻击对象
            _this.m_SelectTarget = null; //当前选中对象
            _this.m_SelectAnimation = null; //选中动画- 焦点角色脚下的
            _this.m_NextUseSkill = null; //下一个动作攻击技能
            _this.m_ArrAutoPath = null; //自动寻路路径
            _this.m_AutoPathNpcInfo = null; //自动寻路npc信息
            _this.m_AutoPathEntityHandle = null; //自动寻路实体信息
            _this.m_Type = Entity.EntityType.Player;
            return _this;
        }
        Player.SetInsatnce = function (play) {
            Player._Instance = play;
        };
        Player.GetInstance = function () {
            return Player._Instance;
        };
        Player.prototype.StartPassiveMoving = function (dir) {
            this.m_boPassiveMoving = true;
            this.m_nPassiveMoveDir = dir;
            this.SetAttackTarget(null);
        };
        Player.prototype.StopAction = function () {
            this.m_boPassiveMoving = false;
            this.m_nPassiveMoveDir = 0;
            this.m_nNextAction = Entity.StandardActions.SA_IDLE;
            if (this.m_ArrAutoPath != null) {
                this.m_ArrAutoPath = null;
                this.m_AutoPathNpcInfo = null;
                this.m_AutoPathEntityHandle = 0;
            }
        };
        Player.prototype.GetAutoPath = function () {
            return this.m_ArrAutoPath;
        };
        Player.prototype.IsPassiveMoving = function () {
            return this.m_boPassiveMoving;
        };
        /**
         * 依据当前角色的状态设置为空闲动作
         * 若等待设置下一个动作（存在本地玩家的控制指令）则设置为下一个动作
         * ★★★★★在LocalPlayer中，此函数也是本地控制逻辑的驱动函数
         */
        Player.prototype.SetToIdleAction = function () {
            if (this.m_dwActionTimeOut == 0 && this.IsDie() == false) {
                //若非处于攻击停留状态才可处理本地控制的操作
                if (this.m_nEndAttackPause == Entity.tagAttackPause.Idle) {
                    this.m_nNextAction = Entity.StandardActions.SA_IDLE;
                    //--通过逻辑处理获取下一个行为
                    this.Think();
                    // --如果下一个行为不是空闲行为则执行下一个行为
                    if (this.m_nNextAction != Entity.StandardActions.SA_IDLE) {
                        if (this.DoNextAction()) {
                            return;
                        }
                    }
                }
            }
            _super.prototype.SetToIdleAction.call(this);
        };
        /**
         * 自动控制的逻辑处理函数
         * 函数内会根据角色当前的状态来决定下一个行为
         * 攻击、寻路等都属于自动控制的范畴
         *
         */
        Player.prototype.Think = function () {
            var isWalk = false;
            var nTime = Config.GlobalConfig.s_dwUpdateTick;
            var step = Player.NORMAL_RUN_STEP;
            if (this.m_boPassiveMoving == true) {
                if (this.m_nNextPassTime <= nTime) {
                    var MouseCoord = GameMap.CustomGameMap.GetInstance().ScreenToCoord(Laya.stage.mouseX, Laya.stage.mouseY);
                    var w = this.m_nCurrentX - MouseCoord.x;
                    var h = this.m_nCurrentY - MouseCoord.y;
                    if ((w * w + h * h) <= 8) {
                        isWalk = true;
                    }
                    this.m_nMoveType = isWalk == true ? Player.MOVE_TYPE_WALK : Player.MOVE_TYPE_RUN;
                    if (this.m_nMoveType != Player.MOVE_TYPE_RUN) {
                        step = Player.NORMAL_MOVE_STEP;
                    }
                    if (this.DoMove(step, this.m_nPassiveMoveDir) == true) {
                        this.m_nNextPassTime = nTime + this.GetMoveSpeed();
                    }
                }
            }
            else if (this.m_AttackTarget > 0) {
                var pAttackEntity = this.GetAttackTarget();
                if (pAttackEntity != null && !pAttackEntity.IsDie() && !pAttackEntity.IsDisappeared()) {
                    this.m_NextUseSkill = null;
                    if (this.m_NextUseSkill == null) {
                        console.log("m_NextUseSkill == null");
                    }
                    if (Math.abs(pAttackEntity.GetCurentX() - this.GetCurentX()) > this.GetAttackDisance() ||
                        Math.abs(pAttackEntity.GetCurrentY() - this.GetCurrentY()) > this.GetAttackDisance()) {
                        this.m_NextUseSkill = null;
                        //如果与攻击对象在同一个坐标点-走一格拉开距离
                        if (pAttackEntity.GetCurentX() == this.GetCurentX() &&
                            pAttackEntity.GetCurrentY() == this.GetCurrentY()) {
                            for (var i = 0; i < 7; i++) {
                                if (this.DoMove(1, i) == true) {
                                    this.m_nNextPassTime = nTime + this.GetMoveSpeed();
                                    break;
                                }
                            }
                        }
                        else {
                            var path = GameMap.CustomGameMap.GetInstance().GetMapPath().
                                FindPath(this.GetCurentX(), this.GetCurrentY(), pAttackEntity.GetCurentX(), pAttackEntity.GetCurrentY());
                            if (path != null && path.length > 0) {
                                //结束坐标也不放进去
                                path.splice(0, this.GetAttackDisance());
                                path.pop();
                                if (path.length > 0) {
                                    //定义跑和走
                                    var Point1 = path[path.length - 1];
                                    var nDir = GameMap.CustomGameMap.CalcForwardDirection(this.GetCurentX(), this.GetCurrentY(), Point1.x, Point1.y);
                                    var nStep = 1;
                                    if (path.length > 1) {
                                        //直线，切换到跑
                                        var Point2 = path[path.length - 2];
                                        if (nDir == GameMap.CustomGameMap.CalcForwardDirection(this.GetCurentX(), this.GetCurrentY(), Point2.x, Point2.y)) {
                                            nStep = 2;
                                        }
                                    }
                                    if (this.DoMove(nStep, nDir) == true) {
                                        this.m_nNextPassTime = nTime + this.GetMoveSpeed();
                                    }
                                }
                            }
                        }
                    }
                    else {
                        var nAttackDir = GameMap.CustomMap.CalcForwardDirection(this.m_nCurrentX, this.m_nCurrentY, pAttackEntity.GetCurentX(), pAttackEntity.GetCurrentY());
                        //技能攻击
                        if (this.m_NextUseSkill != null) {
                            this.RawSetNextAction(Entity.StandardActions.SA_SPELL, nAttackDir);
                        }
                        else {
                            this.RawSetNextAction(Entity.StandardActions.SA_NORMHIT, nAttackDir);
                        }
                    }
                }
            }
            else if (this.m_ArrAutoPath != null) //自动寻路
             {
                if (this.m_ArrAutoPath.length == 0) {
                    //寻路与npc对话
                    if (this.m_AutoPathNpcInfo != null) {
                        var pNpcEntity = LogicManager.GetInstance().FindEntityByXY(this.m_AutoPathNpcInfo._nX, this.m_AutoPathNpcInfo._nY);
                        if (pNpcEntity != null) {
                            // let msgNpcPack = new ClientMsgPack.LogicPack.NpcTalkMsgPack();
                            // msgNpcPack._Handle = pNpcEntity.GetHandle();
                            // Net.MsgSender.SendDataByPack(msgNpcPack);
                        }
                    }
                    else if (this.m_AutoPathEntityHandle > 0) {
                        var pEntity = LogicManager.GetInstance().FindEntity(this.m_AutoPathEntityHandle);
                        if (pEntity != null) {
                            switch (pEntity.GetEntityType()) {
                                case Entity.EntityType.DropItem: //拾取道具
                                    {
                                        // let pDropItem:Entity.DropItem = pEntity as Entity.DropItem;
                                        // Net.MsgSender.SendLootItem(pDropItem.GetPacketId());
                                        break;
                                    }
                            }
                        }
                    }
                    this.StopAction();
                }
                else {
                    //定义跑和走
                    var Point1 = this.m_ArrAutoPath[this.m_ArrAutoPath.length - 1];
                    var nDir = GameMap.CustomGameMap.CalcForwardDirection(this.GetCurentX(), this.GetCurrentY(), Point1.x, Point1.y);
                    var nStep = Player.NORMAL_MOVE_STEP;
                    if (this.m_ArrAutoPath.length > 1) {
                        //直线，切换到跑
                        var Point2 = this.m_ArrAutoPath[this.m_ArrAutoPath.length - 2];
                        if (nDir == GameMap.CustomGameMap.CalcForwardDirection(this.GetCurentX(), this.GetCurrentY(), Point2.x, Point2.y)) {
                            nStep = Player.NORMAL_RUN_STEP;
                        }
                    }
                    if (this.DoMove(nStep, nDir) == true) {
                        this.m_nNextPassTime = nTime + this.GetMoveSpeed();
                    }
                    //弹出
                    this.m_ArrAutoPath.pop();
                    if (nStep == Player.NORMAL_RUN_STEP) {
                        this.m_ArrAutoPath.pop();
                    }
                }
            }
        };
        //取角色攻击距离
        Player.prototype.GetAttackDisance = function () {
            if (this.m_NextUseSkill != null) {
                var pStdSkill = Config.ConfigManager.GetInstance().GetSkillConfig().
                    GetStdSkillByID(this.m_NextUseSkill._nSkillID, this.m_NextUseSkill._bLevel);
                if (pStdSkill != null) {
                    return pStdSkill._nDistance;
                }
            }
            return 1;
        };
        /**
         * 尝试向指定的方向移动指定的距离
         * @param nStep 移动距离，如果为0则函数内自行决定移动的步伐
         * @param nDir 移动步伐
         * @return
         *
         */
        Player.prototype.DoMove = function (nStep, nDir) {
            this.m_MoveAction._nDir = nDir;
            if (nStep != 0) {
                this.m_MoveAction._nStep = nStep;
            }
            else {
                if (this.m_nMoveType == Player.MOVE_TYPE_RUN) {
                    this.m_MoveAction._nStep = Player.NORMAL_RUN_STEP;
                }
                else {
                    this.m_MoveAction._nStep = Player.NORMAL_MOVE_STEP;
                }
            }
            //--这里先判断移动的目的点有无角色,有的话就只走一格
            if (this.m_MoveAction._nStep >= Player.NORMAL_RUN_STEP) {
                var point = GameMap.CustomMap.CalcForwardPosition(this.m_nCurrentX, this.m_nCurrentY, nDir, this.m_MoveAction._nStep);
                if (LogicManager.GetInstance().FindEntityByXY(point.x, point.y) != null) {
                    this.m_MoveAction._nStep = Player.NORMAL_MOVE_STEP;
                }
            }
            //确认移动的实际距离和方向并生成动作消息和向服务器发送的消息
            //不可走的时候判断是否可以挖矿
            if (this.ConfimMoveAction(this.m_MoveAction) == false) {
                return false;
            }
            this.RawSetNextAction(this.m_MoveAction._nAction, this.m_MoveAction._nDir);
            return true;
        };
        /**
     * 设置下一个动作（当前动作完成后的下一个动作）
     * */
        Player.prototype.RawSetNextAction = function (nAction, nDir) {
            this.m_nNextAction = nAction;
            this.m_nNextDirection = nDir;
        };
        Player.prototype.DoNextAction = function () {
            //--保存当前位置
            this.m_nOldX = this.m_nCurrentX;
            this.m_nOldY = this.m_nCurrentY;
            var nActionBlockTime = 0; //行为阻塞时间
            //处理如何实施新动作
            var nAction = this.m_nNextAction;
            var nDir = this.m_nNextDirection;
            this.m_nAction = nAction;
            this.SetDirection(nDir);
            switch (nAction) {
                case Entity.StandardActions.SA_WALK:
                case Entity.StandardActions.SA_RUN:
                    {
                        var nSpeed = this.m_MoveAction._nMoveSpeed;
                        if (nAction == Entity.StandardActions.SA_WALK) {
                            nSpeed = nSpeed * 2; //这里要特殊乘2  之前走2步 500  走1步 250   其实速度是一样的
                        }
                        nDir = this.m_MoveAction._nDir;
                        var getdir = GameMap.CustomMap.CalcForwardDirection(this.m_nCurrentX, this.m_nCurrentY, this.m_MoveAction._nTargetX, this.m_MoveAction._nTargetY);
                        this.MoveTo(this.m_MoveAction._nTargetX, this.m_MoveAction._nTargetY, nSpeed);
                        GameMap.CustomGameMap.GetInstance().MoveBy(nDir, this.m_MoveAction._nStep, nSpeed);
                        nActionBlockTime = 0; //移动不锁定动作
                        //移动类型
                        var moveType = nAction == Entity.StandardActions.SA_WALK ? 0 : 1;
                        // Net.MsgSender.SendMove(moveType,this.m_nCurrentX,this.m_nCurrentY,nDir);
                        // let msgPack:ClientMsgPack.MovePack.MoveMsgPack = new ClientMsgPack.MovePack.MoveMsgPack();
                        SoundManager.GetInstance().PlayGameSound(nAction == Entity.StandardActions.SA_WALK ? SoundManager.GAME_WALK : SoundManager.GAME_RUN);
                        break;
                    }
                case Entity.StandardActions.SA_NORMHIT:
                    {
                        if (this.m_AttackTarget > 0) {
                            var pAttackEntity = this.GetAttackTarget();
                            if (pAttackEntity != null) {
                                //Net.MsgSender.SendNormalHit(pAttackEntity.GetHandle());
                            }
                        }
                        SoundManager.GetInstance().PlayGameSound(SoundManager.GAME_NORMAL_ATTACK);
                        nActionBlockTime = 1000;
                        break;
                    }
                case Entity.StandardActions.SA_SPELL:
                    {
                        var pStdSkill = Config.ConfigManager.GetInstance().GetSkillConfig().
                            GetStdSkillByID(this.m_NextUseSkill._nSkillID, this.m_NextUseSkill._bLevel);
                        if (pStdSkill != null) {
                            nAction = pStdSkill._nAction; //动作
                            //特效
                            if (pStdSkill._nSpellEff > 0) {
                                this.AddEffectById(pStdSkill._nSpellEff);
                            }
                            this.m_NextUseSkill._nUseCD = Config.GlobalConfig.s_dwUpdateTick + pStdSkill._nCD; //冷却时间
                            //发送使用技能消息
                            switch (pStdSkill.SkillType) {
                                case Config.SkillType.SingleAttack:
                                    {
                                        var pAttackEntity = this.GetAttackTarget();
                                        if (pAttackEntity != null) {
                                            //Net.MsgSender.SendUseSkill(pStdSkill._nID,pAttackEntity.GetHandle(),0,0,this.GetDirection());
                                        }
                                        break;
                                    }
                            }
                        }
                        this.m_NextUseSkill = null; //置空，等待下一次施法
                        break;
                    }
            }
            if (nActionBlockTime > 0) {
                this.m_dwActionTimeOut = Config.GlobalConfig.s_dwUpdateTick + nActionBlockTime;
            }
            //设置动作
            if (nAction > -1) {
                this.SetAction(nAction, nDir);
            }
            //更新动作执行时间
            this.m_nLastActionTime = Config.GlobalConfig.s_dwUpdateTick;
            return true;
        };
        Player.prototype.ConfimMoveAction = function (move) {
            var MoveTestDirections = [0, 1, -1]; //移动测试的方向的顺序 
            while (move._nStep > 0) {
                for (var i = 0; i < MoveTestDirections.length; i++) {
                    var dir = (move._nDir + MoveTestDirections[i]) & 7;
                    //前方目的地可移动
                    if (this.CanMoveForward(dir, move._nStep) == true) {
                        move._nDir = dir;
                        var pos = GameMap.CustomMap.CalcForwardPosition(this.m_nCurrentX, this.m_nCurrentY, dir, move._nStep);
                        move._nTargetX = pos.x;
                        move._nTargetY = pos.y;
                        switch (move._nStep) {
                            case 2:
                                {
                                    this.m_MoveAction._nAction = Entity.StandardActions.SA_RUN;
                                    this.m_MoveAction._nMoveSpeed = this.GetMoveSpeed();
                                    break;
                                }
                            default:
                                {
                                    this.m_MoveAction._nAction = Entity.StandardActions.SA_WALK;
                                    this.m_MoveAction._nMoveSpeed = this.GetMoveSpeed() / 2;
                                    break;
                                }
                        }
                        return true;
                    }
                }
                move._nStep--;
            }
            return false;
        };
        Player.prototype.CanMoveForward = function (nDir, nStep) {
            while (nStep > 0) {
                var pos = GameMap.CustomMap.CalcForwardPosition(this.m_nCurrentX, this.m_nCurrentY, nDir, nStep);
                if (GameMap.CustomGameMap.GetInstance().Moveable(pos.x, pos.y) == false) {
                    return false;
                }
                // if(LogicManager._Instance.CheckCanCross(pos.x,pos.y) == false)
                // {
                //     return false;
                // }
                nStep--;
            }
            return true;
        };
        Player.prototype.Update = function (nCurrentTick) {
            //上一个行为超时，则解除行为锁
            //console.log("Player.Update");
            if (this.m_dwActionTimeOut > 0 && nCurrentTick >= this.m_dwActionTimeOut) {
                this.m_dwActionTimeOut = 0;
            }
            //选中特效的播放
            if (this.m_SelectAnimation != null && this.m_SelectAnimation.parent != null) {
                this.m_SelectAnimation.Update(nCurrentTick);
            }
            _super.prototype.Update.call(this, nCurrentTick);
        };
        Player.prototype.GetAttackTarget = function () {
            if (this.m_AttackTarget <= 0)
                return null;
            var pEntity = LogicManager.GetInstance().FindEntity(this.m_AttackTarget);
            if (pEntity == null) {
                this.m_AttackTarget = 0;
            }
            return pEntity;
        };
        Player.prototype.SetAttackTarget = function (pEntity) {
            if (pEntity == null) {
                this.m_AttackTarget = 0;
            }
            else {
                this.m_AttackTarget = pEntity.GetHandle();
            }
            if (this.m_AttackTarget > 0 && this.m_SelectTarget != this.m_AttackTarget) {
                this.SetSelectTarget(pEntity);
            }
        };
        Player.prototype.SetSelectTarget = function (pEntity) {
            if (pEntity == null) {
                this.m_SelectTarget = 0;
            }
            else {
                this.m_SelectTarget = pEntity.GetHandle();
            }
            if (this.m_SelectAnimation == null) {
                var pack = Resources.ResourcesManager._Instance.GetOtherEffect("focus");
                if (pack != null && pack.GetFrameCount() > 0) {
                    this.m_SelectAnimation = new Common.Animation(pack, 0, pack.GetFrameCount(), 80, -1);
                }
            }
            if (this.m_SelectAnimation != null && this.m_SelectAnimation.parent != null) {
                this.m_SelectAnimation.parent.removeChild(this.m_SelectAnimation);
            }
            if (pEntity != null) {
                pEntity.GetAppearance().addChild(this.m_SelectAnimation);
            }
        };
        Player.prototype.GetSelectTarget = function () {
            if (this.m_SelectTarget <= 0)
                return null;
            var pEntity = LogicManager.GetInstance().FindEntity(this.m_SelectTarget);
            if (pEntity == null) {
                this.m_SelectTarget = 0;
            }
            return pEntity;
        };
        Player.prototype.CanAttack = function (pEntity) {
            if (pEntity.GetEntityType() == Entity.EntityType.Npc) {
                return false;
            }
            if (pEntity.GetEntityType() == Entity.EntityType.DropItem) {
                return false;
            }
            return true;
        };
        Player.prototype.SetCurrentXY = function (X, Y) {
            _super.prototype.SetCurrentXY.call(this, X, Y);
            var pMiniMapDialog = UI.UIManager.GetInstance().GetMiniMapDialog();
            if (pMiniMapDialog != null) {
                pMiniMapDialog.SetMapPoint(X, Y);
            }
            //捡取该坐标点的道具
            var pEntity = LogicManager.GetInstance().FindEntityByXY(X, Y);
            if (pEntity != null) {
                switch (pEntity.GetEntityType()) {
                    case Entity.EntityType.DropItem:
                        {
                            //Net.MsgSender.SendLootItem((pEntity as Entity.DropItem).GetPacketId());
                            break;
                        }
                }
            }
        };
        Player.prototype.AutoFindPath = function (nX, nY, pStdNpc, pEntity) {
            if (pStdNpc === void 0) { pStdNpc = null; }
            if (pEntity === void 0) { pEntity = null; }
            var point = new Laya.Point(nX, nY);
            if (pStdNpc != null) {
                for (var i = 0; i < 8; i++) {
                    point = GameMap.CustomMap.CalcForwardPosition(nX, nY, i, 2);
                    if (GameMap.CustomGameMap.GetInstance().Moveable(point.x, point.y)) {
                        break;
                    }
                }
            }
            this.StopAction();
            this.m_ArrAutoPath = GameMap.CustomGameMap.GetInstance().GetMapPath().FindPath(this.GetCurentX(), this.GetCurrentY(), point.x, point.y);
            //弹出起点坐标
            if (this.m_ArrAutoPath != null) {
                this.m_ArrAutoPath.pop();
            }
            this.m_AutoPathNpcInfo = pStdNpc;
            if (pEntity != null) {
                this.m_AutoPathEntityHandle = pEntity.GetHandle();
            }
        };
        Player.prototype.UpdatePropertys = function (id, value) {
            _super.prototype.UpdatePropertys.call(this, id, value);
            switch (id) {
                case Entity.enPropEntity.PROP_CREATURE_LEVEL: //更新等级
                    {
                        var pHeaderDialog = UI.UIManager.GetInstance().GetHeaderDialog();
                        if (pHeaderDialog != null) {
                            pHeaderDialog.UpdateLevel(parseInt(value));
                        }
                        break;
                    }
                case Entity.enPropEntity.PROP_ACTOR_VOCATION: //更新职业
                    {
                        var pHeaderDialog = UI.UIManager.GetInstance().GetHeaderDialog();
                        if (pHeaderDialog != null) {
                            pHeaderDialog.UpdateJob(value);
                        }
                        break;
                    }
                case Entity.enPropEntity.PROP_CREATURE_HP: //更新当前血量
                    {
                        var pHeaderDialog = UI.UIManager.GetInstance().GetHeaderDialog();
                        if (pHeaderDialog != null) {
                            pHeaderDialog.UpdateHPProgress(parseInt(value), this.GetIntProperty(Entity.enPropEntity.PROP_CREATURE_MAXHP));
                        }
                        break;
                    }
                case Entity.enPropEntity.PROP_CREATURE_MAXHP: //最大血量
                    {
                        var pHeaderDialog = UI.UIManager.GetInstance().GetHeaderDialog();
                        if (pHeaderDialog != null) {
                            pHeaderDialog.UpdateHPProgress(this.GetIntProperty(Entity.enPropEntity.PROP_CREATURE_HP), parseInt(value));
                        }
                        break;
                    }
                case Entity.enPropEntity.PROP_CREATURE_MP:
                    {
                        var pHeaderDialog = UI.UIManager.GetInstance().GetHeaderDialog();
                        if (pHeaderDialog != null) {
                            pHeaderDialog.UpdateMPProgress(parseInt(value), this.GetIntProperty(Entity.enPropEntity.PROP_CREATURE_MAXMP));
                        }
                        break;
                    }
                case Entity.enPropEntity.PROP_CREATURE_MAXMP: //最大血量
                    {
                        var pHeaderDialog = UI.UIManager.GetInstance().GetHeaderDialog();
                        if (pHeaderDialog != null) {
                            pHeaderDialog.UpdateHPProgress(this.GetIntProperty(Entity.enPropEntity.PROP_CREATURE_MP), parseInt(value));
                        }
                        break;
                    }
                case Entity.enPropEntity.PROP_ACTOR_COIN: //金币
                    {
                        var pTopHeaderDialog = UI.UIManager.GetInstance().GetTopHeaderDialog();
                        if (pTopHeaderDialog != null) {
                            pTopHeaderDialog.SetGold(parseInt(value));
                        }
                        break;
                    }
                case Entity.enPropEntity.PROP_ACTOR_BIND_COIN: //绑定金币
                    {
                        var pTopHeaderDialog = UI.UIManager.GetInstance().GetTopHeaderDialog();
                        if (pTopHeaderDialog != null) {
                            pTopHeaderDialog.SetBindGold(parseInt(value));
                        }
                        break;
                    }
                case Entity.enPropEntity.PROP_ACTOR_YUANBAO: //元宝
                    {
                        var pTopHeaderDialog = UI.UIManager.GetInstance().GetTopHeaderDialog();
                        if (pTopHeaderDialog != null) {
                            pTopHeaderDialog.SetYuanBao(parseInt(value));
                        }
                        break;
                    }
                case Entity.enPropEntity.PROP_ACTOR_BIND_YUANBAO: //绑定元宝
                    {
                        var pTopHeaderDialog = UI.UIManager.GetInstance().GetTopHeaderDialog();
                        if (pTopHeaderDialog != null) {
                            pTopHeaderDialog.SetBindYuanBao(parseInt(value));
                        }
                        break;
                    }
            }
        };
        Player.NORMAL_MOVE_STEP = 1; //▲▲▲规定常规移动的最大距离
        Player.NORMAL_RUN_STEP = 2; //▲▲▲规定常规跑动的最大距离
        Player.MOVE_TYPE_WALK = 0;
        Player.MOVE_TYPE_RUN = 1;
        Player._Instance = null;
        return Player;
    }(Entity.Human));
    Entity.Player = Player;
})(Entity || (Entity = {}));
//# sourceMappingURL=Player.js.map