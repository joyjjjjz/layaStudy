/**
 * 游戏角色对象管理器
 * @author 后天 2017.9.29
 *
 */
var LogicManager = /** @class */ (function () {
    function LogicManager() {
        this.m_EntityList = []; //游戏对象列表
        this.m_dwCheckHideActorTick = 0; //检查超出显示范围的角色的时间
        this.m_nMovePolicy = LogicManager.MP_INTELLIGENT; //移动方式
        this.m_ClearFreeMemoryTick = 0; //清理无用资源时间戳
    }
    LogicManager.GetInstance = function () {
        return LogicManager._Instance;
    };
    LogicManager.prototype.Init = function () {
        Entity.HumanAction.Init(); //初始化角色动作帧信息
        Entity.StdMonsterAction.Init(); //初始化怪物动作帧信息
        GameMap.CustomGameMap.Init(); //初始化地图信息
        UI.UIManager.Init(); //初始化UI界面管理器
        // Net.MainSocket.Init();  //初始化websocket
        // NetSystem.NetSystemManager.Init();  //初始化网络派发消息
    };
    /**
     * 更新函数
     * 此函数内会循环更新所有的角色对象
     * @param nCurrentTick 当前时间戳
     *
     */
    LogicManager.prototype.Update = function (nCurrentTick) {
        var pCfg = Config.GlobalConfig._Instance;
        Config.GlobalConfig.s_dwUpdateTick = nCurrentTick;
        //更新网络
        //Net.MainSocket.GetInstance().Update(nCurrentTick);
        // if(nCurrentTick - pCfg._nCurrentFrameTick >= pCfg._nFrameTick)
        // {
        //      console.log("延迟过高,下一帧执行!Socket.Updtae"+(nCurrentTick - pCfg._nCurrentFrameTick).toString());
        //     return;
        // }
        //更新地图
        GameMap.CustomGameMap.GetInstance().Update(nCurrentTick);
        //  if(nCurrentTick - pCfg._nCurrentFrameTick >= pCfg._nFrameTick)
        // {
        //      console.log("延迟过高,下一帧执行!Gamemap.Updtae"+(nCurrentTick - pCfg._nCurrentFrameTick).toString());
        //     return;
        // }
        //检查超出显示区域的角色、技能特效、掉落物品以及地图事件
        var CHECKHIDEACTORTIME = 2000; //检查超出显示范围的时间间隔
        //更新所有角色
        //必须降序循环，因为数据可能会从中删除
        for (var i = this.m_EntityList.length - 1; i > -1; --i) {
            var pEntity = this.m_EntityList[i];
            if (pEntity.IsDisappeared()) {
                if (pEntity.parent != null) {
                    GameMap.CustomGameMap.GetInstance().RemoveObject(pEntity);
                }
                this.m_EntityList.splice(i, 1);
                pEntity.Destory();
                pEntity = null;
            }
            else {
                pEntity.Update(nCurrentTick);
            }
            // if(nCurrentTick - pCfg._nCurrentFrameTick >= pCfg._nFrameTick)
            // {
            //     console.log("延迟过高,下一帧执行!pEntity.Updtae"+(nCurrentTick - pCfg._nCurrentFrameTick).toString());
            //     return;
            // }
        }
        /**
         * 将主角在所有角色处理之后再进行更新是便于先将服务器发送的各个角色的数据处理完成，
         * 再更新主角，则会在主角的思考函数中使用各个角色最新的状态进行计算以获得正确的处
         * 理结果。
         * 例如，在自动打怪的状态中，一个怪物被攻击且只有0体力，但此时角色死亡的消息在角色
         * 消息队列中还尚未进行处理，即角色需要等待下一个消息循环后才会“死亡”，则此时如果
         * 先调用主角的更新，则主角依旧会攻击这个“等待死亡”的角色；只有把主角的更新函数在其
         * 他角色更新之后再调用，才可避免此问题。
         */
        if (Entity.Player.GetInstance() != null) {
            Entity.Player.GetInstance().Update(nCurrentTick);
        }
        // if(nCurrentTick - pCfg._nCurrentFrameTick >= pCfg._nFrameTick)
        // {
        //     console.log("延迟过高,下一帧执行!Player.Updtae"+(nCurrentTick - pCfg._nCurrentFrameTick).toString());
        //     return;
        // }
        //更新UI
        UI.UIManager.GetInstance().Update(nCurrentTick);
        // if(nCurrentTick - pCfg._nCurrentFrameTick >= pCfg._nFrameTick)
        // {
        //     console.log("延迟过高,下一帧执行!UI.Updtae"+(nCurrentTick - pCfg._nCurrentFrameTick).toString());
        //     return;
        // }
        //清理内存无用资源
        this.CheckFreeMemory(nCurrentTick);
    };
    /**
 * 创建角色
 * @param handle 实体句柄
 * @param type 实体类型
 * @param propSet 属性集合
 * @return
 *
 */
    LogicManager.prototype.CreateEntity = function (handle, type, propSet) {
        var pEntity = null;
        switch (type) {
            case Entity.EntityType.Player:
                {
                    pEntity = new Entity.Player(handle);
                    Entity.Player.SetInsatnce(pEntity);
                    break;
                }
            case Entity.EntityType.Npc:
                {
                    pEntity = new Entity.Npc(handle);
                    break;
                }
            case Entity.EntityType.Monster:
                {
                    pEntity = new Entity.Monster(handle);
                    break;
                }
            case Entity.EntityType.Human:
                {
                    pEntity = new Entity.Human(handle);
                    break;
                }
            case Entity.EntityType.DropItem:
                {
                    pEntity = new Entity.DropItem(handle);
                    break;
                }
        }
        if (pEntity == null) {
            return null;
        }
        //if(type != Entity.EntityType.Player)
        //{
        var x = propSet.GetIntProperty(Entity.enPropEntity.PROP_ENTITY_POSX);
        var y = propSet.GetIntProperty(Entity.enPropEntity.PROP_ENTITY_POSY);
        pEntity.SetCurrentXY(x, y);
        pEntity.PostCharMessage(Entity.ActorMessages.AM_PROPERTY_CHANGE, 0, 0, 0, propSet);
        GameMap.CustomGameMap.GetInstance().AddObject(pEntity); //加入到地图显示对象
        if (pEntity.GetEntityType() != Entity.EntityType.Player) {
            this.m_EntityList.push(pEntity);
        }
        // }
        return pEntity;
    };
    LogicManager.prototype.CheckFouceTarget = function (x, y) {
        var rect = new Laya.Rectangle();
        var NORMAL_WIDTH = 60; //默认的宽度 用于没有加载到的精灵矩形碰撞
        var NORMAL_HEIGHT = 130; //默认的高度用于没有加载到的精灵矩形碰撞
        for (var i = 0; i < this.m_EntityList.length; i++) {
            var pEntity = this.m_EntityList[i];
            if (pEntity.IsDie() == false && pEntity.IsDisappeared() == false) {
                switch (pEntity.GetEntityType()) {
                    case Entity.EntityType.Monster:
                    case Entity.EntityType.Npc:
                        {
                            var ModelAni = pEntity.GetModelAni();
                            var glop = new Laya.Point(0, 0);
                            var sprite = ModelAni.GetCurrentFrameSprite();
                            if (sprite == null) {
                                continue;
                            }
                            if (sprite.hitTestPoint(x, y)) {
                                return pEntity;
                            }
                            break;
                        }
                    case Entity.EntityType.DropItem://掉落道具
                        {
                            var pDropItem = pEntity;
                            if (pDropItem.GetSpriteIcon() != null) {
                                if (pDropItem.GetSpriteIcon().hitTestPoint(x, y)) {
                                    return pEntity;
                                }
                            }
                            break;
                        }
                }
            }
        }
        return null;
    };
    LogicManager.prototype.GetScreenDirection = function (x, y) {
        var pPlay = Entity.Player.GetInstance();
        if (pPlay == null) {
            return 0;
        }
        var point = GameMap.CustomGameMap.GetInstance().GetGlobalPoint(pPlay.x, pPlay.y);
        var angle = GameMap.CustomMap.CalcAngle(point.x, point.y + GameMap.CustomRenderMap.MAP_VERTICAL_OFFSET_COORD * GameMap.CustomMap.MAPCELLUNITHEIGHT, x, y);
        angle = Math.floor(angle);
        angle += 23;
        angle /= (360 / 8);
        angle = Math.floor(angle);
        return angle & 7;
    };
    LogicManager.prototype.OnMouseDown = function (x, y) {
        var pPlay = Entity.Player.GetInstance();
        if (pPlay == null) {
            return false;
        }
        var pEntity = this.CheckFouceTarget(x, y);
        if (pEntity != null && pPlay.CanAttack(pEntity)) {
            //选中后再单击就是攻击
            if (pPlay.GetSelectTarget() == pEntity) {
                pPlay.SetAttackTarget(pEntity);
            }
            else {
                //设置为选中
                pPlay.SetSelectTarget(pEntity);
            }
            return false;
        }
        else if (pEntity != null && pEntity.GetEntityType() == Entity.EntityType.Npc) {
            // let msgNpcPack = new ClientMsgPack.LogicPack.NpcTalkMsgPack();
            // msgNpcPack._Handle = pEntity.GetHandle();
            // Net.MsgSender.SendDataByPack(msgNpcPack);
            return false;
        }
        else if (pEntity == null || (pEntity != null && pEntity.GetEntityType() == Entity.EntityType.DropItem)) {
            if (pEntity != null) {
                pPlay.AutoFindPath(pEntity.GetCurentX(), pEntity.GetCurrentY(), null, null);
                return false;
            }
            else {
                var MouseCoord = GameMap.CustomGameMap.GetInstance().ScreenToCoord(x, y);
                pEntity = LogicManager._Instance.FindEntityByXY(MouseCoord.x, MouseCoord.y);
                if (pEntity != null && pEntity.GetEntityType() == Entity.EntityType.DropItem) {
                    pPlay.AutoFindPath(pEntity.GetCurentX(), pEntity.GetCurrentY(), null, null);
                    return false;
                }
            }
        }
        if (this.m_nMovePolicy == LogicManager.MP_INTELLIGENT ||
            this.m_nMovePolicy == LogicManager.MP_MANUAL) {
            pPlay.StartPassiveMoving(this.GetScreenDirection(x, y));
        }
        return true;
    };
    //虚拟摇杆移动
    LogicManager.prototype.JoyMouseMove = function (dir) {
        var play = Entity.Player.GetInstance();
        play.StartPassiveMoving(dir);
    };
    LogicManager.prototype.OnMouseUp = function (x, y) {
        var pPlay = Entity.Player.GetInstance();
        if (pPlay == null) {
            return;
        }
        if (pPlay.GetAutoPath() != null) {
            return;
        }
        if (pPlay.IsPassiveMoving()) {
            pPlay.StopAction();
        }
    };
    LogicManager.prototype.FindEntity = function (handle) {
        if (Entity.Player.GetInstance() != null) {
            if (Entity.Player.GetInstance().GetHandle() == handle) {
                return Entity.Player.GetInstance();
            }
        }
        for (var i = 0; i < this.m_EntityList.length; i++) {
            var pEntity = this.m_EntityList[i];
            if (pEntity.GetHandle() == handle) {
                return pEntity;
            }
        }
        return null;
    };
    LogicManager.prototype.FindEntityByXY = function (x, y) {
        for (var i = 0; i < this.m_EntityList.length; i++) {
            var pEntity = this.m_EntityList[i];
            if (pEntity.GetCurentX() == x &&
                pEntity.GetCurrentY() == y) {
                return pEntity;
            }
        }
        return null;
    };
    LogicManager.prototype.CheckFreeMemory = function (nCurrentTick) {
        if (nCurrentTick >= this.m_ClearFreeMemoryTick) {
            GameMap.MapResManager._Instance.ClearFreeMemory();
            this.m_ClearFreeMemoryTick = nCurrentTick + Config.GlobalConfig._Instance._nClearFreeMemoryTime;
        }
        //清理无用音效
        SoundManager.GetInstance().Upadte(nCurrentTick);
        //清理无用资源包
        Resources.ResourcesManager._Instance.Update(nCurrentTick);
    };
    LogicManager.prototype.GetNearEntity = function (EntityType) {
        var nDis = 999;
        var pLastEntity = null;
        var pPlayer = Entity.Player.GetInstance();
        for (var i = 0; i < this.m_EntityList.length; i++) {
            var pEntity = this.m_EntityList[i];
            for (var j = 0; j < EntityType.length; j++) {
                if (pEntity.GetEntityType() == EntityType[j]) {
                    if (!pEntity.IsDisappeared() && !pEntity.IsDie()) {
                        var n = pEntity.GetDistance(pPlayer.GetCurentX(), pPlayer.GetCurrentY());
                        if (n < nDis) {
                            nDis = n;
                            pLastEntity = pEntity;
                        }
                    }
                }
            }
        }
        return pLastEntity;
    };
    LogicManager.MP_INTELLIGENT = 0; //智能移动
    LogicManager.MP_AUTO = 1; //自动移动
    LogicManager.MP_MANUAL = 2; //手动移动
    LogicManager._Instance = new LogicManager();
    return LogicManager;
}());
//# sourceMappingURL=LogicManager.js.map