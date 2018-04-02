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
var Config;
(function (Config) {
    var ItemConfig = /** @class */ (function (_super) {
        __extends(ItemConfig, _super);
        function ItemConfig() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.m_ArrItem = [];
            return _this;
        }
        ItemConfig.prototype.Load = function (data) {
            this.m_ArrItem = [];
            var pack = new Net.Packet(data);
            var nCount = pack.ReadInt32();
            for (var i = 0; i < nCount; i++) {
                var pStdItem = new Config.StdItem();
                pStdItem.DeSerialize(pack);
                this.m_ArrItem[pStdItem._nID] = pStdItem;
            }
        };
        ItemConfig.prototype.FindItemById = function (nId) {
            if (this.m_ArrItem[nId] != null) {
                return this.m_ArrItem[nId];
            }
            return null;
        };
        ItemConfig.GetItemTips = function (pUserItem) {
            if (pUserItem == null) {
                return "";
            }
            var pStdItem = Config.ConfigManager.GetInstance().GetItemConfig().FindItemById(pUserItem._wItemId);
            if (pStdItem == null) {
                return "";
            }
            var ret = "";
            ret = "<(type:1,color:FF0000)" + pStdItem.GetItemTypeName() + ">\\";
            if (pStdItem._Vocation != Config.Vocation.Normal) {
                var szVocation = "";
                switch (pStdItem._Vocation) {
                    case Config.Vocation.Warrion:
                        {
                            szVocation = "战士";
                            break;
                        }
                    case Config.Vocation.Mage:
                        {
                            szVocation = "法师";
                            break;
                        }
                    case Config.Vocation.Tao:
                        {
                            szVocation = "道士";
                            break;
                        }
                }
                ret += "<(type:1)职业需求: " + szVocation + ">\\";
            }
            if (pStdItem._nNeedLevel > 0) {
                ret += "<(type:1)等级需求: " + pStdItem._nNeedLevel + ">\\";
            }
            var nMinAttack = pStdItem.GetOtherAttr(Entity.enPropEntity.PROP_CREATURE_PHYSICAL_ATTACK_MIN);
            var nMaxAttack = pStdItem.GetOtherAttr(Entity.enPropEntity.PROP_CREATURE_PHYSICAL_ATTACK_MAX);
            if (nMinAttack > 0 || nMaxAttack > 0) {
                ret = ret + "<(type:1)物理攻击: ><(type:1)" + nMinAttack.toString() + "-" + nMaxAttack.toString() + ">\\";
            }
            var nMinMagicAttack = pStdItem.GetOtherAttr(Entity.enPropEntity.PROP_CREATURE_MAGIC_ATTACK_MIN);
            var nMaxMagicAttack = pStdItem.GetOtherAttr(Entity.enPropEntity.PROP_CREATURE_MAGIC_ATTACK_MAX);
            if (nMinMagicAttack > 0 || nMaxMagicAttack > 0) {
                ret = ret + "<(type:1)魔法攻击: ><(type:1)" + nMinMagicAttack.toString() + "-" + nMaxMagicAttack.toString() + ">\\";
            }
            var nMinDefense = pStdItem.GetOtherAttr(Entity.enPropEntity.PROP_CREATURE_PYSICAL_DEFENCE_MIN);
            var nMaxDefense = pStdItem.GetOtherAttr(Entity.enPropEntity.PROP_CREATURE_PYSICAL_DEFENCE_MAX);
            if (nMinDefense > 0 || nMaxDefense > 0) {
                ret = ret + "<(type:1)物理防御:><(type:1)" + nMinDefense.toString() + "-" + nMaxDefense.toString() + ">\\";
            }
            var nMinMagicDefense = pStdItem.GetOtherAttr(Entity.enPropEntity.PROP_CREATURE_MAGIC_DEFENCE_MIN);
            var nMaxMagicDefense = pStdItem.GetOtherAttr(Entity.enPropEntity.PROP_CREATURE_MAGIC_DEFENCE_MAX);
            if (nMinMagicDefense > 0 || nMaxMagicDefense > 0) {
                ret = ret + "<(type:1)魔法防御:><(type:1)" + nMinMagicDefense.toString() + "-" + nMaxMagicDefense.toString() + ">\\";
            }
            //准确
            var nHit = pStdItem.GetOtherAttr(Entity.enPropEntity.PROP_CREATURE_HITVALUE);
            if (nHit > 0) {
                ret = ret + "<(type:1)准确:><(type:1)" + nHit.toString() + ">\\";
            }
            //敏捷
            var nDod = pStdItem.GetOtherAttr(Entity.enPropEntity.PROP_CREATURE_DODVALUE);
            if (nDod > 0) {
                ret = ret + "<(type:1)敏捷:><(type:1)" + nHit.toString() + ">\\";
            }
            //描述需要自动分行
            if (pStdItem._szDesc.length > 0) {
                var nWidth = 320;
                var pItemTipsDialog = UI.UIManager.GetInstance().GetItemTipsDialog();
                if (pItemTipsDialog != null) {
                    var nWidth_1 = pItemTipsDialog.width;
                }
                var szDesc = pStdItem._szDesc;
                var lineCount = parseInt((nWidth / Config.GlobalConfig._Instance._nFontSize).toString()) - 1 /*不填满宽度-减去一个文字*/;
                var nLoop = parseInt((pStdItem._szDesc.length / lineCount).toString()) + 1;
                for (var i = 0; i < nLoop; i++) {
                    ret = ret + "<(type:1,color:FFFF2A)" + szDesc.substr(0, lineCount) + ">\\";
                    szDesc = szDesc.substr(lineCount, szDesc.length - lineCount);
                }
            }
            return ret;
        };
        return ItemConfig;
    }(Config.BaseConfig));
    Config.ItemConfig = ItemConfig;
})(Config || (Config = {}));
//# sourceMappingURL=ItemConfig.js.map