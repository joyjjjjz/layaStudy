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
    var LoginPack;
    (function (LoginPack) {
        var SimplePlayerInfo = /** @class */ (function () {
            function SimplePlayerInfo() {
                this._szName = "";
                this._bFaceId = 0; //头像
                this._bSex = 0; //性别
                this._bLevel = 0; //等级
                this._bJob = 0; //职业
                this._bCamp = 0; //阵营
                this._bCircle = 0; //转生
                this._nApoteoSize = 0; //封神 
                this._szGuildName = ""; //行会名  
                this._bState = 0; //0 角色被删 1 被封号 2 正常
            }
            SimplePlayerInfo.prototype.Serialize = function (pack) {
                this._nActorId = pack.ReadUInt32();
                this._szName = pack.ReadCustomString();
                this._bFaceId = pack.ReadUByte();
                this._bSex = pack.ReadUByte();
                this._bLevel = pack.ReadUByte();
                this._bJob = pack.ReadUByte();
                this._bCamp = pack.ReadUByte();
                this._bCircle = pack.ReadUByte();
                this._nApoteoSize = pack.ReadUByte();
                this._szGuildName = pack.ReadCustomString();
                this._bState = pack.ReadUByte();
            };
            return SimplePlayerInfo;
        }());
        LoginPack.SimplePlayerInfo = SimplePlayerInfo;
        var QueryRoleRetMsgPack = /** @class */ (function (_super) {
            __extends(QueryRoleRetMsgPack, _super);
            function QueryRoleRetMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._nAccountId = 0; //帐号id
                _this._nCount = 0; //数量
                _this._ArrSimplePlayerInfo = [];
                _this._bSelectIndex = 0; //当前选中的角色索引
                return _this;
            }
            QueryRoleRetMsgPack.prototype.DeSerialize = function (pack) {
                this._nAccountId = pack.ReadUInt32();
                this._nCount = pack.ReadUByte();
                for (var i = 0; i < this._nCount; i++) {
                    var info = new SimplePlayerInfo();
                    info.Serialize(pack);
                    this._ArrSimplePlayerInfo.push(info);
                }
                this._bSelectIndex = pack.ReadUByte();
            };
            return QueryRoleRetMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LoginPack.QueryRoleRetMsgPack = QueryRoleRetMsgPack;
    })(LoginPack = ClientMsgPack.LoginPack || (ClientMsgPack.LoginPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=QueryRoleRetMsgPack.js.map