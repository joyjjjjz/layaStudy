var Config;
(function (Config) {
    var StdNpc = /** @class */ (function () {
        function StdNpc() {
            this._nID = 0; //NPCID
            this._szName = ""; //NPC名称
            this._nMapID = 0; //所在地图ID
            this._nX = 0; //所在地图X
            this._nY = 0; //所在地图Y
            this._nDir = 0; //方向
        }
        StdNpc.prototype.DeSerialize = function (pack) {
            this._nID = pack.ReadInt32();
            this._szName = pack.ReadCustomString();
            this._nMapID = pack.ReadInt32();
            this._nX = pack.ReadInt32();
            this._nY = pack.ReadInt32();
            this._nDir = pack.ReadUByte();
        };
        return StdNpc;
    }());
    Config.StdNpc = StdNpc;
})(Config || (Config = {}));
//# sourceMappingURL=StdNpc.js.map