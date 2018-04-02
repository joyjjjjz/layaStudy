var ClientMsgPack;
(function (ClientMsgPack) {
    var PackType;
    (function (PackType) {
        var LogicSystem = /** @class */ (function () {
            function LogicSystem() {
            }
            LogicSystem.id = 0;
            LogicSystem.cLogin = 1; //登录游戏
            LogicSystem.cBigFightLogin = 111; //传奇大乱斗进入房间
            LogicSystem.cNpcTalk = 5; //npc说话
            LogicSystem.sEntityAppear = 2; //实体出现
            LogicSystem.sCreateMainActor = 3; //创建主角
            LogicSystem.sOtherPlayerAppear = 4; //其他玩家出现
            LogicSystem.sEntityDisappear = 5; //实体消失
            LogicSystem.sProperyChange = 6; //属性被改变
            LogicSystem.sMainProperyChange = 7; //主角属性被改变
            LogicSystem.sMainActorPos = 8; //设置主角位置
            LogicSystem.sEntityWalk = 9; //其他实体走路
            LogicSystem.sNpcTalk = 11; //npc对话
            LogicSystem.sChangeMap = 13; //更改地图
            LogicSystem.sEntityRun = 15; //其他实体跑步
            LogicSystem.sUseSkill = 18; //使用技能
            LogicSystem.sAddActorEffect = 19; //增加实体特效
            LogicSystem.sOperatorResult = 24; //公共操作结果
            LogicSystem.sNormalAttack = 26; //普通攻击
            LogicSystem.sSceneEffect = 32; //场景特效
            LogicSystem.sEntityDeath = 35; //实体死亡
            LogicSystem.sSpecialMove = 54; //野蛮冲撞
            LogicSystem.sSpecialMoveBack = 55; //野蛮冲撞后退
            LogicSystem.sSyncTrackTo = 56; //同步连击轨迹信息
            return LogicSystem;
        }());
        PackType.LogicSystem = LogicSystem;
        //移动子系统
        var MoveSystem = /** @class */ (function () {
            function MoveSystem() {
            }
            MoveSystem.id = 1;
            MoveSystem.cWalk = 1; //走路
            MoveSystem.cRun = 2; //跑步
            MoveSystem.sAutoNpc = 1; //通知前端自动寻路到npc
            MoveSystem.sAutoFindPathKillMonster = 2; //通知前端走到目的地后打怪
            return MoveSystem;
        }());
        PackType.MoveSystem = MoveSystem;
        //技能子系统
        var SkillSystem = /** @class */ (function () {
            function SkillSystem() {
            }
            SkillSystem.id = 5;
            SkillSystem.cGetSkillList = 1; //获取技能列表
            SkillSystem.cUseSkill = 2; //使用技能
            SkillSystem.cNearAttack = 6; //近身攻击
            SkillSystem.sGetSkillList = 1; //技能列表信息
            SkillSystem.sEntityDamage = 7; //实体收到伤害 显示伤害
            return SkillSystem;
        }());
        PackType.SkillSystem = SkillSystem;
        //装备子系统
        var EquipSystem = /** @class */ (function () {
            function EquipSystem() {
            }
            EquipSystem.id = 7;
            EquipSystem.cTakeOnEquip = 1; //穿上装备
            EquipSystem.cTakeOffEquipForSeries = 2; //脱下一件装备从序列号
            EquipSystem.cTakeOffEquipForPos = 3; //脱下一件装备从装备位置
            EquipSystem.cGetEquipInfo = 4; //获取自身装备信息
            EquipSystem.sTakeOnEquip = 1; //穿上装备返回
            EquipSystem.sTakeOffEquip = 2; //脱下装备返回
            EquipSystem.sGetEquipInfo = 3; //获取自身装备信息返回
            return EquipSystem;
        }());
        PackType.EquipSystem = EquipSystem;
        //背包子系统
        var BagSystem = /** @class */ (function () {
            function BagSystem() {
            }
            BagSystem.id = 8;
            BagSystem.cDeleteItem = 1; //删除背包道具
            BagSystem.cQueryBag = 2; //获取背包列表
            BagSystem.cUseItem = 7; //使用道具
            BagSystem.sInitBagItem = 4; //初始化玩家的背包
            BagSystem.sDelItem = 1; //背包删除道具
            BagSystem.sAddItem = 2; //背包增加道具
            return BagSystem;
        }());
        PackType.BagSystem = BagSystem;
        //快捷栏子系统
        var ShortuctSystem = /** @class */ (function () {
            function ShortuctSystem() {
            }
            ShortuctSystem.id = 134;
            ShortuctSystem.cSetShortcut = 1; //设置一个快捷键
            ShortuctSystem.cGetShortcutAll = 2; //获取技能快捷键
            ShortuctSystem.sSetShortcut = 1;
            ShortuctSystem.sGetAllShortcut = 2; //返回快捷键数据
            return ShortuctSystem;
        }());
        PackType.ShortuctSystem = ShortuctSystem;
        var ChatSystem = /** @class */ (function () {
            function ChatSystem() {
            }
            ChatSystem.id = 9;
            ChatSystem.cSendChat = 1; //玩家说话
            return ChatSystem;
        }());
        PackType.ChatSystem = ChatSystem;
        //任务子系统
        var QuestSystem = /** @class */ (function () {
            function QuestSystem() {
            }
            QuestSystem.id = 6;
            QuestSystem.sAcceptQuest = 2; //接任务
            QuestSystem.sUpdateTitle = 18; //更新任务内容
            return QuestSystem;
        }());
        PackType.QuestSystem = QuestSystem;
        //掉落子系统
        var LootSystem = /** @class */ (function () {
            function LootSystem() {
            }
            LootSystem.id = 15;
            LootSystem.cLootDropItem = 9; //拾取一个道具
            LootSystem.sDropItemAppear = 10; //掉落道具出现
            LootSystem.sDropItemDisappear = 11; //掉落道具消失
            return LootSystem;
        }());
        PackType.LootSystem = LootSystem;
        //登录子系统
        var LoginSystem = /** @class */ (function () {
            function LoginSystem() {
            }
            LoginSystem.id = 255;
            LoginSystem.cLogin = 1; //登录游戏
            LoginSystem.cQueryRoleList = 3; //查询角色列表
            LoginSystem.cCreateActor = 4; //创建角色
            LoginSystem.cDeleteActor = 5; //删除角色
            LoginSystem.cGetRandomName = 6; //获取随机角色名称
            LoginSystem.cHasSecondPassword = 7; //是否有二次密码
            LoginSystem.sQueryRole = 2; //查询角色
            LoginSystem.sCreateActor = 3; //创建角色
            LoginSystem.sDeleteActor = 4; //删除角色
            LoginSystem.sRandomName = 5; //下发随机名字
            return LoginSystem;
        }());
        PackType.LoginSystem = LoginSystem;
        //综合子系统
        var KernelSystem = /** @class */ (function () {
            function KernelSystem() {
            }
            KernelSystem.id = 26;
            KernelSystem.sOpenDay = 28; //下发开服天数
            return KernelSystem;
        }());
        PackType.KernelSystem = KernelSystem;
        //心跳包系统
        var CheckSpeedSystem = /** @class */ (function () {
            function CheckSpeedSystem() {
            }
            CheckSpeedSystem.id = 60;
            CheckSpeedSystem.cHeartbeat = 0; //发送心跳包
            return CheckSpeedSystem;
        }());
        PackType.CheckSpeedSystem = CheckSpeedSystem;
        //其他子系统
        var OtherSystem = /** @class */ (function () {
            function OtherSystem() {
            }
            OtherSystem.id = 139;
            OtherSystem.cContinueQuest = 146; //继续任务
            OtherSystem.cCreateMainActor = 3; //创建主角
            OtherSystem.sSendServerTime = 8; //下发服务器时间 参数: uint 逻辑短日期时间值 uint 服务器开区短日期时间值 uint 法师与道士抬手施法速度
            return OtherSystem;
        }());
        PackType.OtherSystem = OtherSystem;
        //好友子系统
        var FriendSystem = /** @class */ (function () {
            function FriendSystem() {
            }
            FriendSystem.id = 41;
            return FriendSystem;
        }());
        PackType.FriendSystem = FriendSystem;
    })(PackType = ClientMsgPack.PackType || (ClientMsgPack.PackType = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=PackType.js.map