var NetSystem;
(function (NetSystem) {
    var BaseNetSystem = /** @class */ (function () {
        function BaseNetSystem() {
            this.m_NetProcess = new Array();
            this.m_Player = Entity.Player.GetInstance();
        }
        BaseNetSystem.prototype.Process = function (nCmdId, pack) {
            //这是调用函数，并不是调用该类的方法，所以在类里面有赋值的类成员变量是无效的，如果需要赋值，重载Process处理
            //2017.10.15
            if (this.m_NetProcess[nCmdId] != null) {
                this.m_NetProcess[nCmdId](pack);
            }
        };
        return BaseNetSystem;
    }());
    NetSystem.BaseNetSystem = BaseNetSystem;
})(NetSystem || (NetSystem = {}));
//# sourceMappingURL=BaseNetSystem.js.map