/**
 * 动作帧定义
 * @author 后天
*/
var Entity;
(function (Entity) {
    var HumanAction = /** @class */ (function () {
        function HumanAction() {
        }
        HumanAction.Init = function () {
            HumanAction.HAIdle = new Entity.ActionAnimation(0, 8, 2400);
            HumanAction.HAMove = new Entity.ActionAnimation(64, 8, 560);
            HumanAction.HARUN = new Entity.ActionAnimation(128, 12, 660);
            HumanAction.HAHit = new Entity.ActionAnimation(232, 7, 600);
            HumanAction.HAReadyAttack = new Entity.ActionAnimation(224, 1, 600);
            HumanAction.HASpell = new Entity.ActionAnimation(288, 6, 600);
        };
        /**
     * 根据类型和方向获取对应的动作
     * @param type
     * @return
     *
     */
        HumanAction.GetDirActionByType = function (type) {
            switch (type) {
                case Entity.StandardActions.SA_IDLE:
                    {
                        return HumanAction.HAIdle;
                    }
                case Entity.StandardActions.SA_WALK:
                    {
                        return HumanAction.HAMove;
                    }
                case Entity.StandardActions.SA_RUN:
                    {
                        return HumanAction.HARUN;
                    }
                case Entity.StandardActions.SA_NORMHIT:
                case Entity.StandardActions.SA_HIT1:
                    {
                        return HumanAction.HAHit;
                    }
                case Entity.StandardActions.SA_READY_ATTACK:
                    {
                        return HumanAction.HAReadyAttack;
                    }
                case Entity.StandardActions.SA_SPELL:
                    {
                        return HumanAction.HASpell;
                    }
            }
            return null;
        };
        HumanAction.HAIdle = null;
        HumanAction.HAMove = null; //
        HumanAction.HARUN = null; //跑步
        HumanAction.HAHit = null; //普通攻击动作
        HumanAction.HAReadyAttack = null; //攻击停顿
        HumanAction.HASpell = null; //施法
        return HumanAction;
    }());
    Entity.HumanAction = HumanAction;
})(Entity || (Entity = {}));
//# sourceMappingURL=HumanAction.js.map