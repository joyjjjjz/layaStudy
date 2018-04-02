var Entity;
(function (Entity) {
    var tagAttackPause;
    (function (tagAttackPause) {
        tagAttackPause[tagAttackPause["Idle"] = 0] = "Idle";
        tagAttackPause[tagAttackPause["Attack"] = -1] = "Attack";
        tagAttackPause[tagAttackPause["Collect"] = -2] = "Collect";
        tagAttackPause[tagAttackPause["Spell"] = -3] = "Spell";
    })(tagAttackPause = Entity.tagAttackPause || (Entity.tagAttackPause = {}));
})(Entity || (Entity = {}));
//# sourceMappingURL=AttackPase.js.map