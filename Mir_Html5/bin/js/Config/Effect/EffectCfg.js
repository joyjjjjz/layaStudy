var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Config;
(function (Config) {
    var EffectType;
    (function (EffectType) {
        EffectType[EffectType["meNone"] = 0] = "meNone";
        EffectType[EffectType["meFly"] = 3] = "meFly";
        EffectType[EffectType["meExplode"] = 4] = "meExplode";
        EffectType[EffectType["meKeepOnFeet"] = 5] = "meKeepOnFeet";
        EffectType[EffectType["meKeepOnBody"] = 6] = "meKeepOnBody";
    })(EffectType = Config.EffectType || (Config.EffectType = {}));
    var EffectShowPos;
    (function (EffectShowPos) {
        EffectShowPos[EffectShowPos["Entity"] = 1] = "Entity";
        EffectShowPos[EffectShowPos["Scene"] = 2] = "Scene";
    })(EffectShowPos = Config.EffectShowPos || (Config.EffectShowPos = {}));
    var EffectConfig = /** @class */ (function (_super) {
        __extends(EffectConfig, _super);
        function EffectConfig() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.m_ArrEffect = null;
            return _this;
        }
        EffectConfig.prototype.Load = function (data) {
            this.m_ArrEffect = new Array();
            var pack = new Net.Packet(data);
            var nCount = pack.ReadUByte();
            for (var i = 0; i < nCount; i++) {
                var pStdEff = new Config.StdEffect();
                pStdEff.DeSerialize(pack);
                this.m_ArrEffect.push(pStdEff);
            }
        };
        EffectConfig.prototype.GetEffectByID = function (nEffectId) {
            for (var i = 0; i < this.m_ArrEffect.length; i++) {
                if (this.m_ArrEffect[i]._nID = nEffectId) {
                    return this.m_ArrEffect[i];
                }
            }
            return null;
        };
        return EffectConfig;
    }(Config.BaseConfig));
    Config.EffectConfig = EffectConfig;
})(Config || (Config = {}));
//# sourceMappingURL=EffectCfg.js.map