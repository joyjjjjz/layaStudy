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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameInfoUI = /** @class */ (function (_super) {
        __extends(GameInfoUI, _super);
        function GameInfoUI() {
            return _super.call(this) || this;
        }
        GameInfoUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameInfoUI.uiView);
        };
        GameInfoUI.uiView = { "type": "View", "child": [{ "props": { "x": 403, "y": 10, "skin": "war/btn_pause.png", "stateNum": "1", "var": "pauseBtn" }, "type": "Button" }, { "props": { "x": 107, "y": 24, "text": "Level:50", "color": "#f3e9e9", "width": 91, "height": 25, "fontSize": 20, "var": "levelLabel" }, "type": "Label" }, { "props": { "x": 210, "y": 24, "text": "Score:100", "color": "#f8dd18", "width": 154, "height": 25, "fontSize": 20, "var": "scoreLabel" }, "type": "Label" }, { "props": { "x": 24, "y": 24, "text": "Hp:10", "color": "#62f81c", "width": 74, "height": 25, "fontSize": 20, "var": "hpLabel" }, "type": "Label" }, { "props": { "x": 44, "y": 408, "text": "战斗结束", "width": 392, "height": 102, "var": "infoLabel", "align": "center", "color": "#ffffff", "fontSize": 30, "wordWrap": true }, "type": "Label" }], "props": { "width": 480, "height": 852 } };
        return GameInfoUI;
    }(View));
    ui.GameInfoUI = GameInfoUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map