var Config;
(function (Config) {
    var UserSkillInfo = /** @class */ (function () {
        function UserSkillInfo() {
            this._nSkillID = 0; //技能id
            this._bLevel = 0; //技能等级
            this._nMiJIID = 0; //秘籍id
            this._nTick = 0; //冷却时间
            this._nExp = 0; //经验
            this._nMiJITime = 0; //秘籍过期时间
            this._bClose = 0; //是否停用
            //客户端用
            this._nUseCD = 0;
        }
        UserSkillInfo.prototype.DeSerialize = function (pack) {
            this._nSkillID = pack.ReadUInt16();
            this._bLevel = pack.ReadUByte();
            this._nMiJIID = pack.ReadUInt16();
            this._nTick = pack.ReadInt32();
            this._nExp = pack.ReadInt32();
            this._nMiJITime = pack.ReadUInt32();
            this._bClose = pack.ReadUByte();
        };
        return UserSkillInfo;
    }());
    Config.UserSkillInfo = UserSkillInfo;
})(Config || (Config = {}));
//# sourceMappingURL=UserSkillInfo.js.map