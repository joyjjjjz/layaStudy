/*
*   实体类型
*   @author 后天 2017.9.30
*/
var Entity;
(function (Entity) {
    var EntityType;
    (function (EntityType) {
        EntityType[EntityType["Player"] = -1] = "Player";
        EntityType[EntityType["Human"] = 0] = "Human";
        EntityType[EntityType["Monster"] = 1] = "Monster";
        EntityType[EntityType["Npc"] = 2] = "Npc";
        EntityType[EntityType["DropItem"] = 3] = "DropItem";
    })(EntityType = Entity.EntityType || (Entity.EntityType = {}));
})(Entity || (Entity = {}));
//# sourceMappingURL=EntityType.js.map