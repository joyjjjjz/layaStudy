/**
 * 标准怪物动作值以及动画帧定义
 * @author 后天 2017.10.4
 *
 */
var Entity;
(function (Entity) {
    var StdMonsterAction = /** @class */ (function () {
        function StdMonsterAction() {
        }
        StdMonsterAction.Init = function () {
            StdMonsterAction.SMIdle = new Entity.ActionAnimation(0, 5, 1200);
            StdMonsterAction.SMMove = new Entity.ActionAnimation(0, 8, 500);
            StdMonsterAction.SMAttack = new Entity.ActionAnimation(0, 7, 400);
            StdMonsterAction.SMDie = new Entity.ActionAnimation(0, 4, 400);
            StdMonsterAction.SMStruct = new Entity.ActionAnimation(0, 4, 300);
        };
        /**
        * 根据类型和方向获取对应的动作
        * @param type
        * @param dir
        * @return
        *
        */
        StdMonsterAction.GetDirActionByType = function (type) {
            switch (type) {
                case Entity.StandardActions.SA_IDLE:
                    {
                        return StdMonsterAction.SMIdle;
                    }
                case Entity.StandardActions.SA_WALK:
                case Entity.StandardActions.SA_RUN:
                    {
                        return StdMonsterAction.SMMove;
                    }
                case Entity.StandardActions.SA_NORMHIT:
                case Entity.StandardActions.SA_HIT1:
                case Entity.StandardActions.SA_HIT2:
                case Entity.StandardActions.SA_HIT3:
                    {
                        return StdMonsterAction.SMAttack;
                    }
                case Entity.StandardActions.SA_DIE:
                case Entity.StandardActions.SA_DEATH:
                    {
                        return StdMonsterAction.SMDie;
                    }
            }
        };
        StdMonsterAction.SMIdle = null; //休闲
        StdMonsterAction.SMMove = null; //移动
        StdMonsterAction.SMAttack = null; //攻击
        StdMonsterAction.SMDie = null; //死亡
        StdMonsterAction.SMStruct = null; //受击
        return StdMonsterAction;
    }());
    Entity.StdMonsterAction = StdMonsterAction;
})(Entity || (Entity = {}));
//# sourceMappingURL=StdMonAction.js.map