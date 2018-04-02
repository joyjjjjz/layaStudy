var Config;
(function (Config) {
    var StdEffect = /** @class */ (function () {
        function StdEffect() {
            this._nID = 0; //特效id
            this._ShowPos = Config.EffectShowPos.Entity; //特效显示位置
            this._Type = Config.EffectType.meNone;
            this._nDuration = 0; //显示类型
            this._nSoundId = 0; //特效id
        }
        StdEffect.prototype.DeSerialize = function (pack) {
            this._nID = pack.ReadInt32();
            this._ShowPos = pack.ReadUByte();
            this._Type = pack.ReadUByte();
            this._nDuration = pack.ReadInt32();
            this._nSoundId = pack.ReadInt32();
        };
        return StdEffect;
    }());
    Config.StdEffect = StdEffect;
})(Config || (Config = {}));
//# sourceMappingURL=StdEffect.js.map