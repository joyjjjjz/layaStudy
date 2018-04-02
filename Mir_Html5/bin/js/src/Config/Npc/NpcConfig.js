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
    var NpcConfig = /** @class */ (function (_super) {
        __extends(NpcConfig, _super);
        function NpcConfig() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NpcConfig.prototype.Load = function (data) {
            this.m_ArrNpc = new Array();
            var pack = new Net.Packet(data);
            var nCount = pack.ReadInt32();
            for (var i = 0; i < nCount; i++) {
                var pStdNpc = new Config.StdNpc();
                pStdNpc.DeSerialize(pack);
                this.m_ArrNpc.push(pStdNpc);
            }
        };
        NpcConfig.prototype.GetMapAllNpc = function (nMapId) {
            var ret = new Array();
            for (var i = 0; i < this.m_ArrNpc.length; i++) {
                if (this.m_ArrNpc[i]._nMapID == nMapId) {
                    ret.push(this.m_ArrNpc[i]);
                }
            }
            return ret;
        };
        NpcConfig.prototype.GetMapNpcByXY = function (nMapId, nX, nY) {
            for (var i = 0; i < this.m_ArrNpc.length; i++) {
                var pStdNpc = this.m_ArrNpc[i];
                if (pStdNpc._nMapID == nMapId && nX == pStdNpc._nX && nY == pStdNpc._nY) {
                    return pStdNpc;
                }
            }
            return null;
        };
        return NpcConfig;
    }(Config.BaseConfig));
    Config.NpcConfig = NpcConfig;
})(Config || (Config = {}));
//# sourceMappingURL=NpcConfig.js.map