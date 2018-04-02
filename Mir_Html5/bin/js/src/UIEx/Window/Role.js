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
    var Role = /** @class */ (function (_super) {
        __extends(Role, _super);
        function Role() {
            var _this = _super.call(this) || this;
            _this.m_ItemGrid = new Array();
            _this.on(Laya.Event.ADDED, _this, _this.OnLoaded);
            _this.on(Laya.Event.REMOVED, _this, _this.OnRemove);
            return _this;
        }
        Role.prototype.OnLoaded = function () {
            this.m_btn_close.on(Laya.Event.CLICK, this, this.OnBtnClose);
            // let arrItem:Array<Config.UserItem> = NetSystem.NetSystemManager.GetInstance().GetBagSystem().GetArrItem();
            // let nX:number= 460;
            // let nY:number = 150;
            // for(let i:number = 0;i < arrItem.length;i++)
            // {
            //     let pItemGrid:UI.ItemGrid= new UI.ItemGrid(true);
            //     pItemGrid.SetItem(arrItem[i]);
            //     this.m_ItemGrid.push(pItemGrid);
            //     this.addChild(pItemGrid);
            //     pItemGrid.pos(nX,nY);
            //     nX += 60;
            //     pItemGrid.zOrder = 100;
            // }
        };
        Role.prototype.OnRemove = function () {
            for (var i = 0; i < this.m_ItemGrid.length; i++) {
                var pItemGrid = this.m_ItemGrid[i];
                pItemGrid.removeSelf();
                pItemGrid.Destory();
            }
            //   this.m_ItemGrid.removeSelf();
            //   this.m_ItemGrid.Destory();
            this.m_ItemGrid.splice(0, this.m_ItemGrid.length);
            this.m_btn_close.off(Laya.Event.CLICK, this, this.OnBtnClose);
        };
        Role.prototype.OnBtnClose = function () {
            UI.UIManager.GetInstance().HideDialog(UI.UIDialogID.Role);
        };
        return Role;
    }(ui.Window.roleUI));
    UI.Role = Role;
})(UI || (UI = {}));
//# sourceMappingURL=Role.js.map