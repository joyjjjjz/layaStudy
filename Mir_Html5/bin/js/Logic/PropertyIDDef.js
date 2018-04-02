/*
* 实体属性定义
* @author 后天 2017.9.28
**/
var Logic;
(function (Logic) {
    var enPropEntity;
    (function (enPropEntity) {
        enPropEntity[enPropEntity["PROP_ENTITY_ID"] = 0] = "PROP_ENTITY_ID";
        enPropEntity[enPropEntity["PROP_ENTITY_POSX"] = 1] = "PROP_ENTITY_POSX";
        enPropEntity[enPropEntity["PROP_ENTITY_POSY"] = 2] = "PROP_ENTITY_POSY";
        enPropEntity[enPropEntity["PROP_ENTITY_MODELID"] = 3] = "PROP_ENTITY_MODELID";
        enPropEntity[enPropEntity["PROP_ENTITY_ICON"] = 4] = "PROP_ENTITY_ICON";
        enPropEntity[enPropEntity["PROP_ENTITY_DIR"] = 5] = "PROP_ENTITY_DIR";
        enPropEntity[enPropEntity["PROP_CREATURE_LEVEL"] = 6] = "PROP_CREATURE_LEVEL";
        enPropEntity[enPropEntity["PROP_CREATURE_HP"] = 7] = "PROP_CREATURE_HP";
        enPropEntity[enPropEntity["PROP_CREATURE_MP"] = 8] = "PROP_CREATURE_MP";
        enPropEntity[enPropEntity["PROP_CREATURE_STATE"] = 9] = "PROP_CREATURE_STATE";
        enPropEntity[enPropEntity["PROP_CREATURE_COLOR"] = 10] = "PROP_CREATURE_COLOR";
        //下面这些是战斗属性
        enPropEntity[enPropEntity["PROP_CREATURE_MAXHP"] = 11] = "PROP_CREATURE_MAXHP";
        enPropEntity[enPropEntity["PROP_CREATURE_MAXMP"] = 12] = "PROP_CREATURE_MAXMP";
        enPropEntity[enPropEntity["PROP_CREATURE_PHYSICAL_ATTACK_MIN"] = 13] = "PROP_CREATURE_PHYSICAL_ATTACK_MIN";
        enPropEntity[enPropEntity["PROP_CREATURE_PHYSICAL_ATTACK_MAX"] = 14] = "PROP_CREATURE_PHYSICAL_ATTACK_MAX";
        enPropEntity[enPropEntity["PROP_CREATURE_MAGIC_ATTACK_MIN"] = 15] = "PROP_CREATURE_MAGIC_ATTACK_MIN";
        enPropEntity[enPropEntity["PROP_CREATURE_MAGIC_ATTACK_MAX"] = 16] = "PROP_CREATURE_MAGIC_ATTACK_MAX";
        enPropEntity[enPropEntity["PROP_CREATURE_WIZARD_ATTACK_MIN"] = 17] = "PROP_CREATURE_WIZARD_ATTACK_MIN";
        enPropEntity[enPropEntity["PROP_CREATURE_WIZARD_ATTACK_MAX"] = 18] = "PROP_CREATURE_WIZARD_ATTACK_MAX";
        enPropEntity[enPropEntity["PROP_CREATURE_PYSICAL_DEFENCE_MIN"] = 19] = "PROP_CREATURE_PYSICAL_DEFENCE_MIN";
        enPropEntity[enPropEntity["PROP_CREATURE_PYSICAL_DEFENCE_MAX"] = 20] = "PROP_CREATURE_PYSICAL_DEFENCE_MAX";
        enPropEntity[enPropEntity["PROP_CREATURE_MAGIC_DEFENCE_MIN"] = 21] = "PROP_CREATURE_MAGIC_DEFENCE_MIN";
        enPropEntity[enPropEntity["PROP_CREATURE_MAGIC_DEFENCE_MAX"] = 22] = "PROP_CREATURE_MAGIC_DEFENCE_MAX";
        enPropEntity[enPropEntity["PROP_CREATURE_HITVALUE"] = 23] = "PROP_CREATURE_HITVALUE";
        enPropEntity[enPropEntity["PROP_CREATURE_DODVALUE"] = 24] = "PROP_CREATURE_DODVALUE";
        enPropEntity[enPropEntity["PROP_CREATURE_MAGIC_HITRATE"] = 25] = "PROP_CREATURE_MAGIC_HITRATE";
        enPropEntity[enPropEntity["PROP_CREATURE_MAGIC_DOGERATE"] = 26] = "PROP_CREATURE_MAGIC_DOGERATE";
        enPropEntity[enPropEntity["PROP_CREATURE_TOXIC_DOGERATE"] = 27] = "PROP_CREATURE_TOXIC_DOGERATE";
        enPropEntity[enPropEntity["PROP_CREATURE_HP_RENEW"] = 28] = "PROP_CREATURE_HP_RENEW";
        enPropEntity[enPropEntity["PROP_CREATURE_MP_RENEW"] = 29] = "PROP_CREATURE_MP_RENEW";
        enPropEntity[enPropEntity["PROP_CREATURE_TOXIC_RENEW"] = 30] = "PROP_CREATURE_TOXIC_RENEW";
        enPropEntity[enPropEntity["PROP_CREATURE_LUCK"] = 31] = "PROP_CREATURE_LUCK";
        enPropEntity[enPropEntity["PROP_CREATURE_CURSE"] = 32] = "PROP_CREATURE_CURSE";
        enPropEntity[enPropEntity["PROP_CREATURE_MOVEONESLOTTIME"] = 33] = "PROP_CREATURE_MOVEONESLOTTIME";
        enPropEntity[enPropEntity["PROP_CREATURE_ATTACK_SPEED"] = 34] = "PROP_CREATURE_ATTACK_SPEED";
    })(enPropEntity || (enPropEntity = {}));
})(Logic || (Logic = {}));
//# sourceMappingURL=PropertyIDDef.js.map