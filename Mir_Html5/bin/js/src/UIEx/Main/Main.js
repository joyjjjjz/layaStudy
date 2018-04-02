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
    var Main = /** @class */ (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = _super.call(this) || this;
            _this.m_image_header.on(Laya.Event.CLICK, _this, _this.onImageHeaderClick);
            return _this;
        }
        Main.prototype.onImageHeaderClick = function () {
            return;
        };
        return Main;
    }(ui.Main.mainUI));
    UI.Main = Main;
})(UI || (UI = {}));
//# sourceMappingURL=Main.js.map