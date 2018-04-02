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
    var Shortcut = /** @class */ (function (_super) {
        __extends(Shortcut, _super);
        function Shortcut() {
            var _this = _super.call(this) || this;
            _this.m_btn_role.on(Laya.Event.CLICK, _this, _this.OnRoleBtnClick);
            _this.m_btn_skill.on(Laya.Event.CLICK, _this, _this.OnSkillBtnClick);
            return _this;
        }
        Shortcut.prototype.OnRoleBtnClick = function () {
            UI.UIManager.GetInstance().ShowDialog(UI.UIDialogID.Role);
        };
        Shortcut.prototype.OnSkillBtnClick = function () {
            UI.UIManager.GetInstance().ShowDialog(UI.UIDialogID.Skill);
        };
        return Shortcut;
    }(ui.Main.shortcutUI));
    UI.Shortcut = Shortcut;
})(UI || (UI = {}));
//# sourceMappingURL=Shortcut.js.map