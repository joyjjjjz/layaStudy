/**
 * 网络协议处理消息系统
 */
var NetSystem;
(function (NetSystem) {
    var NetSystemManager = /** @class */ (function () {
        function NetSystemManager() {
            this.m_ArrSystem = [];
            this.m_ArrSystem[ClientMsgPack.PackType.LoginSystem.id] = new NetSystem.LoginSystem();
            this.m_ArrSystem[ClientMsgPack.PackType.LogicSystem.id] = new NetSystem.LogicSystem();
            this.m_ArrSystem[ClientMsgPack.PackType.SkillSystem.id] = new NetSystem.SkillSystsem();
            this.m_ArrSystem[ClientMsgPack.PackType.BagSystem.id] = new NetSystem.BagSystem();
            this.m_ArrSystem[ClientMsgPack.PackType.EquipSystem.id] = new NetSystem.EquipSystem();
        }
        NetSystemManager.Init = function () {
            NetSystemManager._Instance = new NetSystemManager();
        };
        NetSystemManager.GetInstance = function () {
            return NetSystemManager._Instance;
        };
        NetSystemManager.prototype.GetSystemId = function (nSysId) {
            if (this.m_ArrSystem[nSysId] != null) {
                var pSys = this.m_ArrSystem[nSysId];
                if (pSys.m_Player == null) {
                    pSys.m_Player = Entity.Player.GetInstance();
                }
                return pSys;
            }
            return null;
        };
        NetSystemManager.prototype.GetSkillSystem = function () {
            var pBaseSys = this.GetSystemId(ClientMsgPack.PackType.SkillSystem.id);
            if (pBaseSys != null) {
                return pBaseSys;
            }
            return null;
        };
        NetSystemManager.prototype.GetBagSystem = function () {
            var pBaseSys = this.GetSystemId(ClientMsgPack.PackType.BagSystem.id);
            if (pBaseSys != null) {
                return pBaseSys;
            }
            return null;
        };
        NetSystemManager.prototype.GetEquipSystem = function () {
            var pBaseSys = this.GetSystemId(ClientMsgPack.PackType.EquipSystem.id);
            if (pBaseSys != null) {
                return pBaseSys;
            }
            return null;
        };
        NetSystemManager.prototype.ProcessNetData = function (data) {
            var pack = new Net.Packet(data);
            var nSysId = pack.ReadUByte();
            var nCmdId = pack.ReadUByte();
            // console.log("sysid:"+nSysId+"cmdid:"+nCmdId);
            if (this.m_ArrSystem[nSysId] != null) {
                this.m_ArrSystem[nSysId].Process(nCmdId, pack);
            }
        };
        NetSystemManager._Instance = null;
        return NetSystemManager;
    }());
    NetSystem.NetSystemManager = NetSystemManager;
})(NetSystem || (NetSystem = {}));
//# sourceMappingURL=NetSystemManager.js.map