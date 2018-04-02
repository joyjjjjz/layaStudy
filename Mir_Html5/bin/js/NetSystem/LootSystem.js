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
var NetSystem;
(function (NetSystem) {
    var LootSystem = /** @class */ (function (_super) {
        __extends(LootSystem, _super);
        function LootSystem() {
            var _this = _super.call(this) || this;
            _this.m_NetProcess[ClientMsgPack.PackType.LootSystem.sDropItemAppear] = _this.OnDropItemAppear;
            _this.m_NetProcess[ClientMsgPack.PackType.LootSystem.sDropItemDisappear] = _this.OnDropItemDisappear;
            return _this;
        }
        LootSystem.prototype.OnDropItemAppear = function (pack) {
            var msgDropItem = new ClientMsgPack.LogicPack.EntityAppearDropItemMsgPack();
            msgDropItem.DeSerialize(pack);
            var propSet = new Entity.PropertySet();
            propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_POSX, msgDropItem._nX);
            propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_POSY, msgDropItem._nY);
            var pEntity = LogicManager.GetInstance().CreateEntity(msgDropItem._nPacketId, Entity.EntityType.DropItem, propSet);
            if (pEntity != null) {
                var pDropItem = pEntity;
                pDropItem.SetEntityName(msgDropItem._szItemName);
                pDropItem.SetItemInfo(msgDropItem);
            }
        };
        LootSystem.prototype.OnDropItemDisappear = function (pack) {
            var msg = new ClientMsgPack.LootPack.DropItemDisappearMsgPack();
            msg.DeSerialize(pack);
            var pDropItemEntity = LogicManager.GetInstance().FindEntity(msg._nPacketId);
            if (pDropItemEntity != null) {
                pDropItemEntity.PostCharMessage(Entity.ActorMessages.AM_DISAPPEAR, 0, 0, 0, null);
            }
        };
        return LootSystem;
    }(NetSystem.BaseNetSystem));
    NetSystem.LootSystem = LootSystem;
})(NetSystem || (NetSystem = {}));
//# sourceMappingURL=LootSystem.js.map