/**
 * 角色相关消息（非动作消息）
 * @author 后天 2017.9.30 21：47
 *
 */
var Entity;
(function (Entity) {
    var ActorMessages;
    (function (ActorMessages) {
        ActorMessages[ActorMessages["AM_HEAR"] = 40] = "AM_HEAR";
        ActorMessages[ActorMessages["AM_VIP_FACE"] = 41] = "AM_VIP_FACE";
        ActorMessages[ActorMessages["AM_FEATURECHANGED"] = 42] = "AM_FEATURECHANGED";
        ActorMessages[ActorMessages["AM_USERNAME"] = 43] = "AM_USERNAME";
        ActorMessages[ActorMessages["AM_USER_FIGTHTYPE"] = 44] = "AM_USER_FIGTHTYPE";
        ActorMessages[ActorMessages["AM_LEVELUP"] = 45] = "AM_LEVELUP";
        ActorMessages[ActorMessages["AM_ACHIEVETITLE"] = 46] = "AM_ACHIEVETITLE";
        ActorMessages[ActorMessages["AM_MISSED"] = 60] = "AM_MISSED";
        ActorMessages[ActorMessages["AM_DAMAGE"] = 61] = "AM_DAMAGE";
        ActorMessages[ActorMessages["AM_ABSORB_DAMAGE"] = 62] = "AM_ABSORB_DAMAGE";
        ActorMessages[ActorMessages["AM_UNDER_ATTACK"] = 63] = "AM_UNDER_ATTACK";
        ActorMessages[ActorMessages["AM_LEVELUP_OTHER"] = 1110] = "AM_LEVELUP_OTHER";
        ActorMessages[ActorMessages["AM_EXP_CHANGE_OTHER"] = 1111] = "AM_EXP_CHANGE_OTHER";
        ActorMessages[ActorMessages["AM_HEALTHSPELLCHANGED"] = 53] = "AM_HEALTHSPELLCHANGED";
        ActorMessages[ActorMessages["AM_HEALTHSPELLCHANGED_BANG"] = 56] = "AM_HEALTHSPELLCHANGED_BANG";
        ActorMessages[ActorMessages["AM_SPACEMOVE_HIDE"] = 800] = "AM_SPACEMOVE_HIDE";
        ActorMessages[ActorMessages["AM_SPACEMOVE_SHOW"] = 801] = "AM_SPACEMOVE_SHOW";
        ActorMessages[ActorMessages["AM_SPACEMOVE_SHOW2"] = 807] = "AM_SPACEMOVE_SHOW2";
        ActorMessages[ActorMessages["AM_GHOST"] = 803] = "AM_GHOST";
        ActorMessages[ActorMessages["AM_SETPOSITION"] = 1145] = "AM_SETPOSITION";
        ActorMessages[ActorMessages["AM_ACTORSPEED"] = 1120] = "AM_ACTORSPEED";
        ActorMessages[ActorMessages["AM_NPCROLESTATE"] = 1151] = "AM_NPCROLESTATE";
        ActorMessages[ActorMessages["AM_SENDDYNAMICEFFECTS"] = 1208] = "AM_SENDDYNAMICEFFECTS";
        ActorMessages[ActorMessages["AM_DELDYNAMICEFFECT"] = 1244] = "AM_DELDYNAMICEFFECT";
        ActorMessages[ActorMessages["AM_UPDATEAPPENDSTATUS"] = 1229] = "AM_UPDATEAPPENDSTATUS";
        ActorMessages[ActorMessages["AM_DELTYPEDAPPENDSTATUS"] = 1230] = "AM_DELTYPEDAPPENDSTATUS";
        ActorMessages[ActorMessages["AM_UPDATEAPPENDSTATUSVALUE"] = 1231] = "AM_UPDATEAPPENDSTATUSVALUE";
        ActorMessages[ActorMessages["AM_DELSKILLSTATUS"] = 1268] = "AM_DELSKILLSTATUS";
        ActorMessages[ActorMessages["AM_TEAMMSG"] = 101] = "AM_TEAMMSG";
        ActorMessages[ActorMessages["AM_MONSTERSAY"] = 106] = "AM_MONSTERSAY";
        ActorMessages[ActorMessages["AM_CHANGENAMECOLOR"] = 656] = "AM_CHANGENAMECOLOR";
        ActorMessages[ActorMessages["AM_PROPERTY_CHANGE"] = 10000] = "AM_PROPERTY_CHANGE";
        ActorMessages[ActorMessages["AM_BANGSTRUCK"] = 10001] = "AM_BANGSTRUCK";
        ActorMessages[ActorMessages["AM_HEMOPHAGIA"] = 10002] = "AM_HEMOPHAGIA";
        ActorMessages[ActorMessages["AM_BANGBOSSSTRUCK"] = 10003] = "AM_BANGBOSSSTRUCK";
        ActorMessages[ActorMessages["AM_DEFEATBANG"] = 10004] = "AM_DEFEATBANG";
        ActorMessages[ActorMessages["AM_DISAPPEAR"] = 10005] = "AM_DISAPPEAR";
    })(ActorMessages = Entity.ActorMessages || (Entity.ActorMessages = {}));
})(Entity || (Entity = {}));
//# sourceMappingURL=ActorMessages.js.map