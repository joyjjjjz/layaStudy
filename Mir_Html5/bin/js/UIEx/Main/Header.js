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
    var Header = /** @class */ (function (_super) {
        __extends(Header, _super);
        function Header() {
            var _this = _super.call(this) || this;
            _this.m_label_level.text = "111";
            _this.on(Laya.Event.CLICK, _this, _this.OnDialogClick);
            return _this;
        }
        Header.prototype.OnDialogClick = function () {
        };
        Header.prototype.UpdateHPProgress = function (nHP, nMaxHP) {
            this.m_progress_hp.value = nHP / nMaxHP;
            this.m_label_hp.text = nHP.toString() + "/" + nMaxHP.toString();
        };
        Header.prototype.UpdateMPProgress = function (nMP, nMaxMP) {
            this.m_progress_mp.value = nMP / nMaxMP;
            this.m_label_mp.text = nMP.toString() + "/" + nMaxMP.toString();
        };
        Header.prototype.UpdateLevel = function (nLevel) {
            this.m_label_level.text = nLevel.toString();
        };
        Header.prototype.UpdateJob = function (nJob) {
            var str = "无";
            switch (nJob) {
                case Config.Vocation.Warrion:
                    {
                        str = "战";
                        break;
                    }
                case Config.Vocation.Mage:
                    {
                        str = "法";
                        break;
                    }
                case Config.Vocation.Tao:
                    {
                        str = "道";
                        break;
                    }
            }
            this.m_label_job.text = str;
        };
        return Header;
    }(ui.Main.HeaderUI));
    UI.Header = Header;
})(UI || (UI = {}));
//# sourceMappingURL=Header.js.map