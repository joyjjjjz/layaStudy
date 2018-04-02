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
        var CreateActorMsgPack = /** @class */ (function (_super) {
            __extends(CreateActorMsgPack, _super);
            function CreateActorMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._szName = ""; //角色名称
                _this._bSex = 0; //性别
                _this._bJob = 0; //职业
                _this._bFace = 0; //头像
                _this._bZY = 0; //阵营
                _this._szToken = ""; //运营商统计
                _this._nAdId = 0;
                return _this;
            }
            CreateActorMsgPack.prototype.Serialize = function () {
                var pack = new Net.Packet();
                pack.WriteCmd(ClientMsgPack.PackType.LoginSystem.id, ClientMsgPack.PackType.LoginSystem.cCreateActor);
                pack.WriteCustomString(this._szName);
                pack.WriteUByte(this._bSex);
                pack.WriteUByte(this._bJob);
                pack.WriteUByte(this._bFace);
                pack.WriteUByte(this._bZY);
                pack.WriteCustomString(this._szToken);
                pack.WriteInt32(this._nAdId);
                return pack.GetBuffer();
            };
            return CreateActorMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LoginPack.CreateActorMsgPack = CreateActorMsgPack;
        var CreateRoleRetCode;
        (function (CreateRoleRetCode) {
            CreateRoleRetCode[CreateRoleRetCode["Success"] = 0] = "Success";
            CreateRoleRetCode[CreateRoleRetCode["NameInvalid"] = 1] = "NameInvalid";
            CreateRoleRetCode[CreateRoleRetCode["NameServerError"] = 2] = "NameServerError";
            CreateRoleRetCode[CreateRoleRetCode["NameServerExError"] = 3] = "NameServerExError";
            CreateRoleRetCode[CreateRoleRetCode["NameUse"] = 4] = "NameUse";
            CreateRoleRetCode[CreateRoleRetCode["Assignedend"] = 109] = "Assignedend";
            CreateRoleRetCode[CreateRoleRetCode["JobError"] = 111] = "JobError";
            CreateRoleRetCode[CreateRoleRetCode["ServerError"] = 113] = "ServerError";
            CreateRoleRetCode[CreateRoleRetCode["TimeOut"] = 65535] = "TimeOut";
        })(CreateRoleRetCode = LoginPack.CreateRoleRetCode || (LoginPack.CreateRoleRetCode = {}));
        var CreateActorRetMsgPack = /** @class */ (function (_super) {
            __extends(CreateActorRetMsgPack, _super);
            function CreateActorRetMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._nActorId = 0; //角色id
                _this._nRetCode = 0; //返回码
                return _this;
            }
            CreateActorRetMsgPack.prototype.DeSerialize = function (pack) {
                this._nActorId = pack.ReadUInt32();
                this._nRetCode = pack.ReadUByte();
            };
            return CreateActorRetMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LoginPack.CreateActorRetMsgPack = CreateActorRetMsgPack;
    })(LoginPack = ClientMsgPack.LoginPack || (ClientMsgPack.LoginPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=CreateActorMsgPack.js.map