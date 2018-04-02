var Config;
(function (Config) {
    var GlobalConfig = /** @class */ (function () {
        function GlobalConfig() {
            this._szUrl = "data/";
            this._nWidth = 1136; //设计屏幕宽度 1136
            this._nHeight = 640; //设计屏幕高度640
            this._szUser = ""; //用户帐号
            this._szPasswd = ""; //用户密码
            this._nAccountId = 0; //帐号id
            this._nActorId = 0; //角色id
            this._nHeartBeatTime = 15000; //每十五秒发一次心跳包
            this._szFont = "SimSun"; //游戏字体
            this._nFontSize = 16; //默认字体大小
            this._nClearFreeMemoryTime = 1000 * 60; //一分钟清理一次无用资源
            this._nFrameTick = 35; //帧固定运行时间- 每一帧就限定这个时间- 超过会闪屏
            this._nCurrentFrameTick = 0; //记录每一帧的最后运行时间
            this._szHPProgressUrl = ["res/ui/progress/progressBar_hp.png", "res/ui/progress/progressBar_hp$bar.png"]; //血量进度条地址
            //运行时
            this._CurrentShowItem = null; //当前要显示的道具tips信息
            this._ShowItemTipsType = 0; //当前要显示的道具tips类型
        }
        GlobalConfig.prototype.SetCurrentShowItem = function (pUserItem, showType) {
            this._CurrentShowItem = pUserItem;
            this._ShowItemTipsType = showType;
        };
        GlobalConfig._Instance = new GlobalConfig();
        GlobalConfig.s_dwUpdateTick = 0;
        GlobalConfig.HITPAUSETIME = 400; //攻击停留速度
        return GlobalConfig;
    }());
    Config.GlobalConfig = GlobalConfig;
})(Config || (Config = {}));
//# sourceMappingURL=GlobalConfig.js.map