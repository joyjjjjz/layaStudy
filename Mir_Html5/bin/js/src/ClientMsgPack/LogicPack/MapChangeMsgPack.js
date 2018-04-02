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
var ClientMsgPack;
(function (ClientMsgPack) {
    var LogicPack;
    (function (LogicPack) {
        var MapChangeMsgPack = /** @class */ (function (_super) {
            __extends(MapChangeMsgPack, _super);
            function MapChangeMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._szMapName = ""; //地图名称
                _this._szMapFile = ""; //地图文件名称
                _this._nMapID = 0; //地图id
                _this._nX = 0; //X坐标
                _this._nY = 0; //Y坐标
                _this._bFbId = 0; //副本的id.为0的时候是指在普通场景
                _this._bSelfChange = false; //是不是自己手动传送,是的话要检测要不要做某些东西
                return _this;
            }
            MapChangeMsgPack.prototype.DeSerialize = function (pack) {
                this._szMapName = pack.ReadCustomString();
                this._szMapFile = pack.ReadCustomString();
                this._nMapID = pack.ReadUInt16();
                this._nX = pack.ReadUInt16();
                this._nY = pack.ReadUInt16();
                this._bFbId = pack.ReadUByte();
                this._bSelfChange = pack.ReadBoolean();
            };
            return MapChangeMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LogicPack.MapChangeMsgPack = MapChangeMsgPack;
    })(LogicPack = ClientMsgPack.LogicPack || (ClientMsgPack.LogicPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=MapChangeMsgPack.js.map