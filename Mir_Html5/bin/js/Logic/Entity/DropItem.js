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
//掉落道具的实体
var Entity;
(function (Entity) {
    var DropItem = /** @class */ (function (_super) {
        __extends(DropItem, _super);
        function DropItem(handle) {
            var _this = _super.call(this, handle) || this;
            _this.m_nPacketId = 0;
            _this.m_SpriteIcon = null;
            _this.m_Type = Entity.EntityType.DropItem;
            _this.m_ProgressHP.visible = false;
            _this.m_TextName.pos(-Entity.CustomEntity.DefalutWidth / 2, 92);
            return _this;
        }
        DropItem.prototype.Destory = function () {
            if (this.m_SpriteIcon != null) {
                this.m_SpriteIcon.removeSelf();
            }
            this.m_SpriteIcon = null;
            _super.prototype.Destory.call(this);
        };
        DropItem.prototype.GetSpriteIcon = function () {
            return this.m_SpriteIcon;
        };
        // public SetItemInfo(msg:ClientMsgPack.LogicPack.EntityAppearDropItemMsgPack):void
        // {
        //     this.m_nPacketId = msg._nPacketId;
        //     let pStdItem:Config.StdItem = Config.ConfigManager.GetInstance().GetItemConfig().FindItemById(msg._nItemId);
        //     if(pStdItem != null)
        //     {
        //         this.m_SpriteIcon = Resources.ResourcesManager._Instance.GetItemIconImage(msg._nIcon);
        //         this.m_SpriteIcon.scale(0.5,0.5);
        //         this.m_SpriteIcon.hitArea = null;
        //         this.m_Appearance.addChild(this.m_SpriteIcon);
        //         this.m_SpriteIcon.pos(-16,-16);
        //     }
        // }
        DropItem.prototype.IsDie = function () {
            return false;
        };
        DropItem.prototype.GetPacketId = function () {
            return this.m_nPacketId;
        };
        return DropItem;
    }(Entity.CustomEntity));
    Entity.DropItem = DropItem;
})(Entity || (Entity = {}));
//# sourceMappingURL=DropItem.js.map