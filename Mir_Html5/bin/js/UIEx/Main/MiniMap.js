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
    var MiniMap = /** @class */ (function (_super) {
        __extends(MiniMap, _super);
        function MiniMap() {
            var _this = _super.call(this) || this;
            _this.m_image_bg.on(Laya.Event.CLICK, _this, _this.onImageBGClick);
            return _this;
        }
        MiniMap.prototype.SetMapName = function (szMapName) {
            this.m_label_mapname.text = szMapName;
        };
        MiniMap.prototype.SetMapPoint = function (nX, nY) {
            this.m_label_point.text = nX.toString() + " " + nY.toString();
        };
        MiniMap.prototype.onImageBGClick = function () {
            UI.UIManager.GetInstance().ShowDialog(UI.UIDialogID.Map);
        };
        return MiniMap;
    }(ui.Main.minimapUI));
    UI.MiniMap = MiniMap;
})(UI || (UI = {}));
//# sourceMappingURL=MiniMap.js.map