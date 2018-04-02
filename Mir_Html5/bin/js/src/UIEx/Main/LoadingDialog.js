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
var UI;
(function (UI) {
    var LoadingDialog = /** @class */ (function (_super) {
        __extends(LoadingDialog, _super);
        function LoadingDialog() {
            return _super.call(this) || this;
        }
        LoadingDialog.prototype.UpdateProgress = function (v) {
            var nValue = parseInt((v * 100).toString());
            this.m_label_progress.text = "正在加载中" + nValue.toString() + "%";
        };
        return LoadingDialog;
    }(ui.Main.loadingUI));
    UI.LoadingDialog = LoadingDialog;
})(UI || (UI = {}));
//# sourceMappingURL=LoadingDialog.js.map