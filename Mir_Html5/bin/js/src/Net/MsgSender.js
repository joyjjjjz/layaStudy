var Net;
(function (Net) {
    var MsgSender = /** @class */ (function () {
        function MsgSender() {
        }
        MsgSender.SendFirstSelfSalt = function () {
            var nSeed = Net.MainSocket.GetInstance().GetEncypt().GetSelfSalt();
            var Pack = new Net.Packet();
            Pack.WriteUInt32(nSeed);
            Net.MainSocket.GetInstance().SendData(Pack.GetBuffer(), false);
        };
        MsgSender.SendLoginGame = function (szUser, szPaswd) {
            var loginPack = new ClientMsgPack.LoginPack.LoginMsgPack();
            loginPack._szUser = szUser;
            loginPack._szPaswd = szPaswd;
            MsgSender.SendDataByPack(loginPack);
        };
        MsgSender.SendHeartbeat = function (nCurrentTick) {
            var heartPack = new ClientMsgPack.CheckSpeedPack.Heartbeat();
            heartPack._nTick = nCurrentTick;
            MsgSender.SendDataByPack(heartPack);
        };
        MsgSender.SendMove = function (type, nCurrentX, nCurrentY, nDir) {
            var movePack = new ClientMsgPack.MovePack.MoveMsgPack();
            movePack._nMoveType = type == 0 ? ClientMsgPack.PackType.MoveSystem.cWalk : ClientMsgPack.PackType.MoveSystem.cRun;
            movePack._nDir = nDir;
            movePack._nX = nCurrentX;
            movePack._nY = nCurrentY;
            movePack._nTimer = Laya.timer.currTimer;
            MsgSender.SendDataByPack(movePack);
        };
        MsgSender.SendDataByPack = function (msgPack) {
            var buff = msgPack.Serialize();
            Net.MainSocket.GetInstance().SendData(buff);
        };
        MsgSender.SendNormalHit = function (handle) {
            var msg = new ClientMsgPack.SkillPack.NormalHitMsgPack();
            msg._Handle = handle;
            MsgSender.SendDataByPack(msg);
        };
        //第一次登录游戏后请求
        MsgSender.SendQueryFirstData = function () {
            //请求技能信息
            var msgQuerySkill = new ClientMsgPack.SkillPack.GetSkillInfoMsgPack();
            MsgSender.SendDataByPack(msgQuerySkill);
            //请求包裹数据
            var msgQueryBag = new ClientMsgPack.BagPack.QueryBagMsgPack();
            MsgSender.SendDataByPack(msgQueryBag);
            //请求装备数据
            var msgQueryEquip = new ClientMsgPack.EquipPack.QueryEquipPack();
            MsgSender.SendDataByPack(msgQueryEquip);
        };
        MsgSender.SendUseSkill = function (nSkillId, handle, nX, nY, nDir) {
            var msg = new ClientMsgPack.SkillPack.UseSkillMsgPack();
            msg._nSkillID = nSkillId;
            msg._Handle = handle;
            msg._nX = nX;
            msg._nY = nY;
            msg._bDir = nDir;
            MsgSender.SendDataByPack(msg);
        };
        return MsgSender;
    }());
    Net.MsgSender = MsgSender;
})(Net || (Net = {}));
//# sourceMappingURL=MsgSender.js.map