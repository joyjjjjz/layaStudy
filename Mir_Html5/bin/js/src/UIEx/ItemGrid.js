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
    //物品格子显示容器. 2017.11.3
    var ItemGrid = /** @class */ (function (_super) {
        __extends(ItemGrid, _super);
        function ItemGrid(showBG) {
            if (showBG === void 0) { showBG = false; }
            var _this = _super.call(this) || this;
            _this.m_SpriteIcon = null;
            _this.m_pUserItem = null;
            _this.m_ShowItemTipsType = UI.ShowItemTipsType.RoleBag; //格子类型
            _this.m_bgSprite = null; //格子背景
            if (showBG) {
                _this.m_bgSprite = Resources.ResourcesManager._Instance.GetSpriteForURL("data/itemicon/grid_bg.png");
                _this.addChild(_this.m_bgSprite);
            }
            return _this;
            //  this.setBounds(new laya.maths.Rectangle(0,0,100,100));
            //  this.on(Laya.Event.CLICK,this,this.onItemClick);
        }
        ItemGrid.prototype.Destory = function () {
            if (this.m_SpriteIcon != null) {
                this.m_SpriteIcon.removeSelf();
                this.m_SpriteIcon.off(Laya.Event.CLICK, this, this.onItemClick);
                this.m_SpriteIcon = null;
            }
            if (this.m_bgSprite != null) {
                this.m_bgSprite.removeSelf();
            }
            this.m_pUserItem = null;
            this.m_bgSprite = null;
        };
        ItemGrid.prototype.SetItem = function (pUserItem) {
            this.m_pUserItem = pUserItem;
            this.Show();
        };
        ItemGrid.prototype.SetItemByItemID = function (nItemID) {
            this.m_pUserItem = new Config.UserItem();
            this.m_pUserItem._wItemId = nItemID;
            this.Show();
        };
        ItemGrid.prototype.Show = function () {
            if (this.m_SpriteIcon != null) {
                this.m_SpriteIcon.removeSelf();
                this.m_SpriteIcon = null;
                this.m_SpriteIcon.off(Laya.Event.CLICK, this, this.onItemClick);
            }
            if (this.m_pUserItem == null) {
                return;
            }
            var pStdItem = Config.ConfigManager.GetInstance().GetItemConfig().FindItemById(this.m_pUserItem._wItemId);
            if (pStdItem != null) {
                this.m_SpriteIcon = Resources.ResourcesManager._Instance.GetItemIconImage(pStdItem._nIcon);
                this.m_SpriteIcon.on(Laya.Event.CLICK, this, this.onItemClick);
                this.addChild(this.m_SpriteIcon);
                this.m_SpriteIcon.zOrder = 11; //在最顶层
            }
        };
        ItemGrid.prototype.SetShowItemTipsType = function (type) {
            this.m_ShowItemTipsType = type;
        };
        ItemGrid.prototype.onItemClick = function () {
            if (this.m_pUserItem != null) {
                var pItemTipsDialog = UI.UIManager.GetInstance().GetItemTipsDialog();
                if (pItemTipsDialog != null) {
                    UI.UIManager.GetInstance().ShowDialog(UI.UIDialogID.ItemTips);
                    pItemTipsDialog.ShowItem(this.m_pUserItem, this.m_ShowItemTipsType);
                }
                else {
                    UI.UIManager.GetInstance().ShowDialog(UI.UIDialogID.ItemTips);
                    //this.ShowDialog(UIDialogID.ItemTips);
                    Config.GlobalConfig._Instance.SetCurrentShowItem(this.m_pUserItem, this.m_ShowItemTipsType);
                }
            }
        };
        return ItemGrid;
    }(Laya.Sprite));
    UI.ItemGrid = ItemGrid;
})(UI || (UI = {}));
//# sourceMappingURL=ItemGrid.js.map