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
        var LoginMsgPack = /** @class */ (function (_super) {
            __extends(LoginMsgPack, _super);
            function LoginMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._szUser = ""; //帐号名
                _this._szPaswd = ""; //密码 MD5加密
                _this._nGameSpanId = 0; //
                _this._nServerID = 0; //服务器id
                _this._szSign = ""; //
                _this._szTime = ""; //时间
                _this._szIdentity = "";
                return _this;
            }
            LoginMsgPack.prototype.Serialize = function () {
                var pack = new Net.Packet();
                pack.WriteCmd(ClientMsgPack.PackType.LoginSystem.id, ClientMsgPack.PackType.LoginSystem.cLogin);
                pack.WriteCustomString(this._szUser);
                pack.WriteCustomString(this._szPaswd);
                pack.WriteUInt32(this._nGameSpanId);
                pack.WriteUInt32(this._nServerID);
                pack.WriteCustomString(this._szSign);
                pack.WriteCustomString(this._szTime);
                pack.WriteCustomString(this._szIdentity);
                return pack.GetBuffer();
            };
            return LoginMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LoginPack.LoginMsgPack = LoginMsgPack;
    })(LoginPack = ClientMsgPack.LoginPack || (ClientMsgPack.LoginPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=LoginMsgPack.js.map