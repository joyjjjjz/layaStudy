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
    var ShowItemTipsType;
    (function (ShowItemTipsType) {
        ShowItemTipsType[ShowItemTipsType["RoleEquip"] = 1] = "RoleEquip";
        ShowItemTipsType[ShowItemTipsType["RoleBag"] = 2] = "RoleBag";
    })(ShowItemTipsType = UI.ShowItemTipsType || (UI.ShowItemTipsType = {}));
    var ItemTips = /** @class */ (function (_super) {
        __extends(ItemTips, _super);
        function ItemTips() {
            var _this = _super.call(this) || this;
            _this.m_SpriteIcon = null;
            _this.m_pUserItem = null;
            _this.m_nBgOldHeight = 0; //九宫格背景的原始高度，物品tips会根据高度变化
            _this.m_ShowType = 0;
            _this.on(Laya.Event.ADDED, _this, _this.OnLoaded);
            _this.on(Laya.Event.REMOVED, _this, _this.OnRemove);
            _this.m_nBgOldHeight = _this.m_image_bg.height;
            return _this;
        }
        ItemTips.prototype.ShowItem = function (pUserItem, showType) {
            var pStdItem = Config.ConfigManager.GetInstance().GetItemConfig().FindItemById(pUserItem._wItemId);
            if (pStdItem != null) {
                this.m_label_name.text = pStdItem.GetShowName();
                this.m_label_name.color = pStdItem.GetNameColor();
                this.m_SpriteIcon = Resources.ResourcesManager._Instance.GetItemIconImage(pStdItem._nIcon);
                this.addChild(this.m_SpriteIcon);
                this.m_SpriteIcon.pos(this.m_image_icon.x, this.m_image_icon.y);
                this.m_SpriteIcon.zOrder = 100;
                this.m_RichText = new UI.RichText();
                this.addChild(this.m_RichText);
                this.m_RichText.pos(12, 80);
                this.m_RichText.SetText(Config.ItemConfig.GetItemTips(pUserItem));
            }
            this.m_pUserItem = pUserItem;
            var nSceneWidth = Config.GlobalConfig._Instance._nWidth;
            var nSceneHeight = Config.GlobalConfig._Instance._nHeight;
            this.pos(nSceneWidth / 2 - this.width / 2, nSceneHeight / 2 - this.height / 2);
            //更改按钮标题
            switch (showType) {
                case ShowItemTipsType.RoleBag:
                    {
                        this.m_btn_1.label = "丢弃";
                        break;
                    }
            }
            this.m_ShowType = showType;
            this.m_image_bg.height = this.m_nBgOldHeight + this.m_RichText.GetHeight() + 5 /*多加5个像素*/;
        };
        ItemTips.prototype.OnLoaded = function () {
            this.m_btn_close.on(Laya.Event.CLICK, this, this.onClose);
            this.m_btn_1.on(Laya.Event.CLICK, this, this.onBtn1Click);
        };
        ItemTips.prototype.OnRemove = function () {
            this.m_btn_close.off(Laya.Event.CLICK, this, this.onClose);
            if (this.m_SpriteIcon != null) {
                this.m_SpriteIcon.removeSelf();
            }
            this.m_pUserItem = null;
            if (this.m_RichText != null) {
                this.m_RichText.removeSelf();
                this.m_RichText.Destory();
            }
            this.m_btn_1.off(Laya.Event.CLICK, this, this.onBtn1Click);
            this.m_RichText = null;
        };
        ItemTips.prototype.onBtn1Click = function () {
            switch (this.m_ShowType) {
                case ShowItemTipsType.RoleBag://丢弃
                    {
                        //Net.MsgSender.SendDeleteItem(this.m_pUserItem._Series);
                        break;
                    }
            }
        };
        ItemTips.prototype.onClose = function () {
            UI.UIManager.GetInstance().HideDialog(UI.UIDialogID.ItemTips);
        };
        ItemTips.prototype.Update = function (nCurrentTick) {
            if (this.m_RichText != null) {
                this.m_RichText.Update(nCurrentTick);
            }
        };
        return ItemTips;
    }(ui.Window.itemtipsUI));
    UI.ItemTips = ItemTips;
})(UI || (UI = {}));
//# sourceMappingURL=ItemTips.js.map