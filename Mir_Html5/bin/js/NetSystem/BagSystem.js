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
    var BagSystem = /** @class */ (function (_super) {
        __extends(BagSystem, _super);
        function BagSystem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.m_ArrItem = new Array();
            return _this;
        }
        BagSystem.prototype.Process = function (nCmdId, pack) {
            switch (nCmdId) {
                case ClientMsgPack.PackType.BagSystem.sInitBagItem://包裹数据
                    {
                        this.OnQueryBag(pack);
                        break;
                    }
                case ClientMsgPack.PackType.BagSystem.sDelItem://删除道具返回
                    {
                        this.OnDeleteItem(pack);
                        break;
                    }
                case ClientMsgPack.PackType.BagSystem.sAddItem://增加道具
                    {
                        this.OnAddItem(pack);
                        break;
                    }
                default:
                    {
                        _super.prototype.Process.call(this, nCmdId, pack);
                        break;
                    }
            }
        };
        BagSystem.prototype.GetArrItem = function () {
            return this.m_ArrItem;
        };
        BagSystem.prototype.OnQueryBag = function (pack) {
            this.m_ArrItem.splice(0, this.m_ArrItem.length);
            var nCount = pack.ReadInt16();
            for (var i = 0; i < nCount; i++) {
                var userItem = new Config.UserItem();
                userItem.DeSerialize(pack);
                this.m_ArrItem.push(userItem);
            }
        };
        BagSystem.prototype.DeleteItemBySeries = function (series) {
            for (var i = 0; i < this.m_ArrItem.length; i++) {
                if (this.m_ArrItem[i]._Series == series) {
                    this.m_ArrItem.splice(i, 1);
                    break;
                }
            }
        };
        BagSystem.prototype.OnDeleteItem = function (pack) {
            var msg = new ClientMsgPack.BagPack.DeleteItemRetMsgPack();
            msg.DeSerialize(pack);
            this.DeleteItemBySeries(msg._Series);
            UI.UIManager.GetInstance().HideDialog(UI.UIDialogID.ItemTips);
        };
        BagSystem.prototype.OnAddItem = function (pack) {
            var msg = new ClientMsgPack.BagPack.AddItemMsgPack();
            msg.DeSerialize(pack);
            this.m_ArrItem.push(msg._pUserItem);
        };
        return BagSystem;
    }(NetSystem.BaseNetSystem));
    NetSystem.BagSystem = BagSystem;
})(NetSystem || (NetSystem = {}));
//# sourceMappingURL=BagSystem.js.map