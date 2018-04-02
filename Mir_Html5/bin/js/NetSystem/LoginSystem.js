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
var NetSystem;
(function (NetSystem) {
    var LoginSystem = /** @class */ (function (_super) {
        __extends(LoginSystem, _super);
        function LoginSystem() {
            var _this = _super.call(this) || this;
            _this.m_NetProcess[ClientMsgPack.PackType.LoginSystem.sQueryRole] = _this.OnQueryRole;
            _this.m_NetProcess[ClientMsgPack.PackType.LoginSystem.sCreateActor] = _this.OnCreateRole;
            return _this;
        }
        // public Process(nCmdId:number,pack:Net.Packet):void
        // {
        // }
        LoginSystem.prototype.OnQueryRole = function (pack) {
            var pCfg = Config.GlobalConfig._Instance;
            var msgPack = new ClientMsgPack.LoginPack.QueryRoleRetMsgPack();
            msgPack.DeSerialize(pack);
            var nAccountId = msgPack._nAccountId;
            pCfg._nAccountId = nAccountId;
            //没有角色，载入创建角色场景
            if (msgPack._nCount == 0) {
                UI.UIManager.GetInstance().LoadCreateRoleScene();
            }
            else {
                //取第一个角色进入游戏
                var info = msgPack._ArrSimplePlayerInfo[0];
                var msgEnterPack = new ClientMsgPack.LogicPack.EnterGameMsgPack();
                msgEnterPack._nAccountId = pCfg._nAccountId;
                pCfg._nActorId = info._nActorId;
                msgEnterPack._nActorId = pCfg._nActorId;
                Net.MsgSender.SendDataByPack(msgEnterPack);
            }
        };
        LoginSystem.prototype.OnCreateRole = function (pack) {
            var msgPack = new ClientMsgPack.LoginPack.CreateActorRetMsgPack();
            msgPack.DeSerialize(pack);
            //创建成功.进入游戏
            if (msgPack._nRetCode == ClientMsgPack.LoginPack.CreateRoleRetCode.Success) {
                var pCfg = Config.GlobalConfig._Instance;
                pCfg._nActorId = msgPack._nActorId;
                var msgEnterPack = new ClientMsgPack.LogicPack.EnterGameMsgPack();
                msgEnterPack._nAccountId = pCfg._nAccountId;
                msgEnterPack._nActorId = pCfg._nActorId;
                Net.MsgSender.SendDataByPack(msgEnterPack);
            }
        };
        return LoginSystem;
    }(NetSystem.BaseNetSystem));
    NetSystem.LoginSystem = LoginSystem;
})(NetSystem || (NetSystem = {}));
//# sourceMappingURL=LoginSystem.js.map