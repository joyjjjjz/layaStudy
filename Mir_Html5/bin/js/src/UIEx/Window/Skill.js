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
    var Skill = /** @class */ (function (_super) {
        __extends(Skill, _super);
        function Skill() {
            var _this = _super.call(this) || this;
            _this.on(Laya.Event.ADDED, _this, _this.OnLoaded);
            _this.on(Laya.Event.REMOVED, _this, _this.OnRemove);
            return _this;
        }
        Skill.prototype.OnLoaded = function () {
            this.m_btn_close.on(Laya.Event.CLICK, this, this.OnBtnClose);
        };
        Skill.prototype.OnRemove = function () {
            this.m_btn_close.off(Laya.Event.CLICK, this, this.OnBtnClose);
        };
        Skill.prototype.OnBtnClose = function () {
            UI.UIManager.GetInstance().HideDialog(UI.UIDialogID.Skill);
        };
        return Skill;
    }(ui.Window.skillUI));
    UI.Skill = Skill;
})(UI || (UI = {}));
//# sourceMappingURL=Skill.js.map