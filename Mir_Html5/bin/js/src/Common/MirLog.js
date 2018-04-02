/**
 *  日志类-用于控制台输出日志与抛出异常
 * @author 后天 2017.9.28
 * */
var Common;
(function (Common) {
    var MirLogType;
    (function (MirLogType) {
        MirLogType[MirLogType["Tips"] = 0] = "Tips";
        MirLogType[MirLogType["Waring"] = 1] = "Waring";
        MirLogType[MirLogType["Error"] = 2] = "Error";
    })(MirLogType = Common.MirLogType || (Common.MirLogType = {}));
    var MirLog = /** @class */ (function () {
        function MirLog() {
        }
        MirLog.Log = function (type, text) {
            console.log(text);
            if (type == MirLogType.Error) {
                throw new Error(text);
            }
            var pLogDialog = UI.UIManager.GetInstance().GetLogDialog();
            if (pLogDialog != null) {
                pLogDialog.AddLog(type, text);
            }
        };
        return MirLog;
    }());
    Common.MirLog = MirLog;
})(Common || (Common = {}));
//# sourceMappingURL=MirLog.js.map