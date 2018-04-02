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
    var Joybtn = /** @class */ (function (_super) {
        __extends(Joybtn, _super);
        function Joybtn() {
            var _this = _super.call(this) || this;
            _this.m_btn_normalatk.on(Laya.Event.CLICK, _this, _this.OnNormalAtkClick);
            return _this;
        }
        Joybtn.prototype.OnNormalAtkClick = function () {
            var pPlayer = Entity.Player.GetInstance();
            //有选中对象了，攻击选中对象
            var pEntity = pPlayer.GetSelectTarget();
            if (pEntity != null && !pEntity.IsDie() && !pEntity.IsDisappeared()) {
                pPlayer.SetAttackTarget(pPlayer.GetSelectTarget());
                return;
            }
            pEntity = LogicManager.GetInstance().GetNearEntity([Entity.EntityType.Monster]);
            if (pEntity != null) {
                pPlayer.SetAttackTarget(pEntity);
            }
        };
        return Joybtn;
    }(ui.Main.joybtnUI));
    UI.Joybtn = Joybtn;
})(UI || (UI = {}));
//# sourceMappingURL=Joybtn.js.map