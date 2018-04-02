/**
 * 通用行为定义
 * @author 后天
 *
 */
var Entity;
(function (Entity) {
    var StandardActions = /** @class */ (function () {
        function StandardActions() {
        }
        StandardActions.GetSRPackageByAction = function (action, isHuman) {
            if (isHuman === void 0) { isHuman = false; }
            switch (action) {
                case StandardActions.SA_IDLE:
                    return StandardActions.AP_IDLE;
                case StandardActions.SA_WALK:
                    return StandardActions.AP_WALK;
                case StandardActions.SA_RUN:
                case StandardActions.SA_BACKSTEP:
                    return StandardActions.AP_RUN;
                case StandardActions.SA_SPRINT:
                case StandardActions.SA_SPRINT_START:
                    return isHuman ? StandardActions.AP_RUN : StandardActions.AP_WALK;
                case StandardActions.SA_SPRINT_NEW:
                    return StandardActions.AP_ATTACK;
                case StandardActions.SA_READY_ATTACK:
                    return StandardActions.AP_READERATTACK;
                case StandardActions.SA_NORMHIT:
                case StandardActions.SA_HIT1:
                    {
                        return StandardActions.AP_ATTACK;
                    }
                case StandardActions.SA_PREPARESKILL:
                case StandardActions.SA_SPELL:
                case StandardActions.SA_HIT2:
                case StandardActions.SA_HIT3:
                case StandardActions.SA_READY_SPELL:
                    return isHuman ? StandardActions.AP_SPELL : StandardActions.AP_ATTACK;
                case StandardActions.SA_STRUCK:
                    return 5;
                case StandardActions.SA_DIE:
                case StandardActions.SA_DEATH:
                    return StandardActions.AP_DEATH;
                case StandardActions.SA_HORSE_IDLE:
                    return StandardActions.AP_HORSE_IDLE;
                case StandardActions.SA_HORSE_RUN:
                    return StandardActions.AP_HORSE_RUN;
                case StandardActions.SA_HORSE_STAND_IDLE:
                case StandardActions.SA_HORSE_STAND_RUN:
                    return StandardActions.AP_IDLE;
                case StandardActions.SA_SWIMMING_IDLE:
                    return StandardActions.AP_SWIMMING_IDLE;
                case StandardActions.SA_SWIMMING_RUN:
                    return StandardActions.AP_SWIMMING_RUN;
                case StandardActions.SA_SWIMMING_KISS:
                    return StandardActions.AP_SWIMMING_KISS;
                case StandardActions.SA_LAND_KISS:
                    return StandardActions.AP_LAND_KISS;
                case StandardActions.SA_CARRIER_IDLE:
                    return StandardActions.AP_CARRIER_IDLE;
                case StandardActions.SA_CARRIER_RUN:
                    return StandardActions.AP_CARRIER_RUN;
                case StandardActions.SA_DONGFANG:
                    return StandardActions.AP_DONGFANG;
                case StandardActions.SA_READYJUMP:
                case StandardActions.SA_JUMP:
                    return StandardActions.AP_ATTACK;
                case StandardActions.SA_ROTATE:
                    return StandardActions.AP_ROTATE;
                case StandardActions.SA_DIVINESWORD:
                    return StandardActions.AP_DIVIESWORD;
                default:
                    return StandardActions.AP_IDLE;
            }
        };
        /**
         * 动作值定义
         */
        StandardActions.SA_IDLE = 0; //站立
        StandardActions.SA_WALK = 1; //走
        StandardActions.SA_RUN = 2; //跑
        StandardActions.SA_READYJUMP = 3; //准备跳跃
        StandardActions.SA_JUMP = 4; //跳跃
        StandardActions.SA_READY_ATTACK = 5; //准备攻击
        StandardActions.SA_STRUCK = 6; //被攻击
        StandardActions.SA_NORMHIT = 7; //普通攻击
        StandardActions.SA_SPELL = 8; //技能攻击（本地逻辑动作，会转转换为具体的技能动作）
        StandardActions.SA_PREPARESKILL = 9; //准备技能（吟唱）
        StandardActions.SA_HIT1 = 10; //攻击
        StandardActions.SA_HIT2 = 11; //攻击
        StandardActions.SA_HIT3 = 12; //攻击
        StandardActions.SA_COLLECT = 13; //采集
        StandardActions.SA_DIE = 14; //死亡倒下
        StandardActions.SA_DEATH = 15; //死亡（躺着的尸体状体）
        StandardActions.SA_BACKSTEP = 16; //后退
        StandardActions.SA_READY_COLLECT = 17; //采集之后的攻击停留
        StandardActions.SA_STRUCK_FLY = 18; //被击飞
        StandardActions.SA_SPRINT = 19; //冲刺
        StandardActions.SA_SPRINT_START = 20; //冲刺起步
        StandardActions.SA_READY_SPELL = 21; //准备施法
        StandardActions.SA_HORSE_IDLE = 22; //马上站立
        StandardActions.SA_HORSE_RUN = 23; //马上跑
        StandardActions.SA_HORSE_STAND_IDLE = 24; //马上站立 空闲
        StandardActions.SA_HORSE_STAND_RUN = 25; //马上站立 跑
        StandardActions.SA_SWIMMING_IDLE = 26; //游泳中的站立
        StandardActions.SA_SWIMMING_RUN = 27; //游泳中的跑
        StandardActions.SA_SWIMMING_KISS = 28; //游泳中的kiss
        StandardActions.SA_LAND_KISS = 29; //陆地上的kiss
        StandardActions.SA_CARRIER_IDLE = 30; //载具的站立
        StandardActions.SA_CARRIER_RUN = 31; //载具中的跑
        StandardActions.SA_DONGFANG = 32; //洞房
        StandardActions.SA_SPRINT_NEW = 33; //冲锋
        StandardActions.SA_ROTATE = 34; //旋转
        StandardActions.SA_READYDIVINESWORD = 35; //准备万剑归宗
        StandardActions.SA_DIVINESWORD = 36; //万剑归宗
        StandardActions.SA_MINING = 37; //挖矿
        //动作包的定义
        StandardActions.AP_IDLE = 0; //站立的动作包
        StandardActions.AP_WALK = 1; //走的动作包类型
        StandardActions.AP_RUN = 2; //跑的动作包类型   
        StandardActions.AP_READERATTACK = 3; //准备攻击的动作包类型   
        StandardActions.AP_ATTACK = 4; //攻击的动作包类型  
        StandardActions.AP_SPELL = 5; //施法的动作包类型
        StandardActions.AP_DEATH = 7; //死亡的动作包类型
        StandardActions.AP_JUMP = 18; //跳跃
        StandardActions.AP_DIVIESWORD = 8; //万剑归宗
        StandardActions.AP_ROTATE = 9; //旋转
        StandardActions.AP_HORSE_IDLE = 10; //马上站立
        StandardActions.AP_HORSE_RUN = 10; //马上跑  
        StandardActions.AP_SWIMMING_IDLE = 11; //游泳站立
        StandardActions.AP_SWIMMING_RUN = 12; //游泳跑 
        StandardActions.AP_SWIMMING_KISS = 13; //游泳kiss
        StandardActions.AP_LAND_KISS = 14; //陆地kiss
        StandardActions.AP_CARRIER_IDLE = 15; //载具的站立
        StandardActions.AP_CARRIER_RUN = 16; //载具中的跑
        StandardActions.AP_DONGFANG = 17; //洞房
        StandardActions.AP_ACTION_PART_COUNT = 18; //动作部件资源包
        return StandardActions;
    }());
    Entity.StandardActions = StandardActions;
})(Entity || (Entity = {}));
//# sourceMappingURL=StandardActions.js.map