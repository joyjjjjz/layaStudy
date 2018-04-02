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
    var TopHeader = /** @class */ (function (_super) {
        __extends(TopHeader, _super);
        function TopHeader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopHeader.prototype.SetGold = function (nGold) {
            this.m_label_gold.text = nGold.toString();
        };
        TopHeader.prototype.SetYuanBao = function (nYuanBao) {
            this.m_label_yuanbao.text = nYuanBao.toString();
        };
        TopHeader.prototype.SetBindGold = function (nBindGold) {
            this.m_label_bindgold.text = nBindGold.toString();
        };
        TopHeader.prototype.SetBindYuanBao = function (nBindYuanBao) {
            this.m_label_bindyuanbao.text = nBindYuanBao.toString();
        };
        return TopHeader;
    }(ui.Main.topheaderUI));
    UI.TopHeader = TopHeader;
})(UI || (UI = {}));
//# sourceMappingURL=TopHeader.js.map