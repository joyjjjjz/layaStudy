var Config;
(function (Config) {
    var StdItemType;
    (function (StdItemType) {
        StdItemType[StdItemType["itUndefinedType"] = 0] = "itUndefinedType";
        StdItemType[StdItemType["itWeapon"] = 1] = "itWeapon";
        StdItemType[StdItemType["itDress"] = 2] = "itDress";
        StdItemType[StdItemType["itHelmet"] = 3] = "itHelmet";
        StdItemType[StdItemType["itNecklace"] = 4] = "itNecklace";
        StdItemType[StdItemType["itDecoration"] = 5] = "itDecoration";
        StdItemType[StdItemType["itBracelet"] = 6] = "itBracelet";
        StdItemType[StdItemType["itRing"] = 7] = "itRing";
        StdItemType[StdItemType["itGirdle"] = 8] = "itGirdle";
        StdItemType[StdItemType["itShoes"] = 9] = "itShoes";
        StdItemType[StdItemType["itEquipDiamond"] = 10] = "itEquipDiamond";
        StdItemType[StdItemType["itMeterial"] = 11] = "itMeterial";
        StdItemType[StdItemType["itFashionDress"] = 12] = "itFashionDress";
        StdItemType[StdItemType["itSwing"] = 13] = "itSwing";
        StdItemType[StdItemType["itWeaponExtend"] = 14] = "itWeaponExtend";
        StdItemType[StdItemType["itFootPrint"] = 15] = "itFootPrint";
        StdItemType[StdItemType["itShield"] = 16] = "itShield";
        StdItemType[StdItemType["itSeal"] = 17] = "itSeal";
        StdItemType[StdItemType["itSpecialRing"] = 18] = "itSpecialRing";
        StdItemType[StdItemType["itMagicWeapon"] = 19] = "itMagicWeapon";
        StdItemType[StdItemType["itEarring"] = 20] = "itEarring";
        StdItemType[StdItemType["itShoulderPads"] = 21] = "itShoulderPads";
        StdItemType[StdItemType["itElbowPads"] = 22] = "itElbowPads";
        StdItemType[StdItemType["itKneecap"] = 23] = "itKneecap";
        StdItemType[StdItemType["itAnklePad"] = 24] = "itAnklePad";
        StdItemType[StdItemType["itHeartMirror"] = 25] = "itHeartMirror";
        StdItemType[StdItemType["itMaskedVeil"] = 26] = "itMaskedVeil";
        StdItemType[StdItemType["itRelease"] = 27] = "itRelease";
        StdItemType[StdItemType["itZodiacShu"] = 28] = "itZodiacShu";
        StdItemType[StdItemType["itZodiacNiu"] = 29] = "itZodiacNiu";
        StdItemType[StdItemType["itZodiacHu"] = 30] = "itZodiacHu";
        StdItemType[StdItemType["itZodiacTu"] = 31] = "itZodiacTu";
        StdItemType[StdItemType["itZodiacLong"] = 32] = "itZodiacLong";
        StdItemType[StdItemType["itZodiacShe"] = 33] = "itZodiacShe";
        StdItemType[StdItemType["itZodiacMa"] = 34] = "itZodiacMa";
        StdItemType[StdItemType["itZodiacYang"] = 35] = "itZodiacYang";
        StdItemType[StdItemType["itZodiacHou"] = 36] = "itZodiacHou";
        StdItemType[StdItemType["itZodiacJi"] = 37] = "itZodiacJi";
        StdItemType[StdItemType["itZodiacGou"] = 38] = "itZodiacGou";
        StdItemType[StdItemType["itZodiacZhu"] = 39] = "itZodiacZhu";
        StdItemType[StdItemType["itGodHelmetPos"] = 40] = "itGodHelmetPos";
        StdItemType[StdItemType["itGodNecklacePos"] = 41] = "itGodNecklacePos";
        StdItemType[StdItemType["itGodLeftBraceletPos"] = 42] = "itGodLeftBraceletPos";
        StdItemType[StdItemType["itGodRightBraceletPos"] = 43] = "itGodRightBraceletPos";
        StdItemType[StdItemType["itGodLeftRingPos"] = 44] = "itGodLeftRingPos";
        StdItemType[StdItemType["itGodRightRingPos"] = 45] = "itGodRightRingPos";
        StdItemType[StdItemType["itGodGirdlePos"] = 46] = "itGodGirdlePos";
        StdItemType[StdItemType["itGodShoesPos"] = 47] = "itGodShoesPos";
        StdItemType[StdItemType["itSpecialRingEx"] = 48] = "itSpecialRingEx";
        StdItemType[StdItemType["itEquipMax"] = 49] = "itEquipMax";
        StdItemType[StdItemType["itHeroEquipMin"] = 49] = "itHeroEquipMin";
        StdItemType[StdItemType["itHeroNecklace"] = 50] = "itHeroNecklace";
        StdItemType[StdItemType["itHeroCuff"] = 51] = "itHeroCuff";
        StdItemType[StdItemType["itHeroDecorations"] = 52] = "itHeroDecorations";
        StdItemType[StdItemType["itHeroBelt"] = 53] = "itHeroBelt";
        StdItemType[StdItemType["itHeroShoes"] = 54] = "itHeroShoes";
        //itHeroArmor =53,             //英雄的护甲 
        StdItemType[StdItemType["itHeroEquipMax"] = 55] = "itHeroEquipMax";
        StdItemType[StdItemType["itQuestItem"] = 101] = "itQuestItem";
        StdItemType[StdItemType["itFunctionItem"] = 102] = "itFunctionItem";
        StdItemType[StdItemType["itMedicaments"] = 103] = "itMedicaments";
        StdItemType[StdItemType["itFastMedicaments"] = 104] = "itFastMedicaments";
        StdItemType[StdItemType["itItemDiamond"] = 105] = "itItemDiamond";
        StdItemType[StdItemType["itItemEquivalence"] = 106] = "itItemEquivalence";
        StdItemType[StdItemType["itItemEquipEnhance"] = 107] = "itItemEquipEnhance";
        StdItemType[StdItemType["itItemSkillMiji"] = 108] = "itItemSkillMiji";
        StdItemType[StdItemType["itItemPetSkill"] = 109] = "itItemPetSkill";
        StdItemType[StdItemType["itPetMedicaments"] = 110] = "itPetMedicaments";
        StdItemType[StdItemType["itPetFastMedicaments"] = 111] = "itPetFastMedicaments";
        StdItemType[StdItemType["itPetSkinChange"] = 112] = "itPetSkinChange";
        StdItemType[StdItemType["itHpPot"] = 113] = "itHpPot";
        StdItemType[StdItemType["itMine"] = 114] = "itMine";
        StdItemType[StdItemType["itMagicItem"] = 115] = "itMagicItem";
        StdItemType[StdItemType["itMagicBead"] = 116] = "itMagicBead";
        StdItemType[StdItemType["itMagicEquip"] = 117] = "itMagicEquip";
        StdItemType[StdItemType["itGild"] = 118] = "itGild";
        StdItemType[StdItemType["itZodiac"] = 119] = "itZodiac";
        StdItemType[StdItemType["itRuneDebris"] = 120] = "itRuneDebris";
        StdItemType[StdItemType["itItemTypeCount"] = 121] = "itItemTypeCount";
    })(StdItemType = Config.StdItemType || (Config.StdItemType = {}));
    var StdItem = /** @class */ (function () {
        function StdItem() {
            this._nID = 0; //道具id
            this._szName = ""; //道具名称
            this._szDesc = ""; //道具描述
            this._Type = StdItemType.itUndefinedType; //道具类型
            this._nIcon = 0; //图标编号
            this._nShape = 0; //外观编号
            this._nAmount = 0; //最大叠加数量
            this._OtherAttr = [];
            this._RateAttr = [];
        }
        StdItem.prototype.DeSerialize = function (pack) {
            this._OtherAttr = [];
            this._RateAttr = [];
            this._nID = pack.ReadInt32();
            this._szName = pack.ReadCustomString();
            this._szDesc = pack.ReadCustomString();
            this._Type = pack.ReadUByte();
            this._nIcon = pack.ReadInt32();
            this._nShape = pack.ReadInt32();
            this._nAmount = pack.ReadInt32();
            this._Vocation = pack.ReadUByte();
            this._Sex = pack.ReadUByte();
            this._nNeedLevel = pack.ReadUByte();
            //基础属性
            var nAmount = pack.ReadUByte();
            for (var i = 0; i < nAmount; i++) {
                var nType = pack.ReadUByte();
                var nValue = pack.ReadInt32();
                this._OtherAttr.push({ type: nType, value: nValue });
            }
            //倍率属性
            nAmount = pack.ReadUByte();
            for (var i = 0; i < nAmount; i++) {
                var nType = pack.ReadUByte();
                var fValue = pack.ReadFloat();
                this._RateAttr.push({ type: nType, value: fValue });
            }
        };
        StdItem.prototype.GetOtherAttr = function (type) {
            for (var i = 0; i < this._OtherAttr.length; i++) {
                var pObj = this._OtherAttr[i];
                if (pObj.type == type) {
                    return parseInt(pObj.value);
                }
            }
            return 0;
        };
        StdItem.prototype.GetShowName = function () {
            var szIndex = this._nID.toString();
            var nIndex = parseInt(szIndex.substr(szIndex.length - 1, 1));
            switch (nIndex) {
                case 1:
                    {
                        return "良品" + this._szName;
                    }
                case 2:
                    {
                        return "上品" + this._szName;
                    }
                case 3:
                    {
                        return "精品" + this._szName;
                    }
                case 4:
                    {
                        return "极品" + this._szName;
                    }
                default:
                    {
                        return this._szName;
                    }
            }
        };
        StdItem.prototype.GetNameColor = function () {
            var szIndex = this._nID.toString();
            var nIndex = parseInt(szIndex.substr(szIndex.length - 1, 1));
            switch (nIndex) {
                case 1:
                    {
                        return "#33FF00";
                    }
                case 2:
                    {
                        return "#0033CC";
                    }
                case 3:
                    {
                        return "#FF0000";
                    }
                case 4:
                    {
                        return "#D926C7";
                    }
                default:
                    {
                        return "#FFFFFF";
                    }
            }
        };
        StdItem.prototype.GetItemTypeName = function () {
            switch (this._Type) {
                case StdItemType.itWeapon:
                    {
                        return "武器";
                    }
                case StdItemType.itDress:
                    {
                        return "衣服";
                    }
                case StdItemType.itHelmet:
                    {
                        return "头盔";
                    }
                case StdItemType.itNecklace:
                    {
                        return "项链";
                    }
                case StdItemType.itDecoration:
                    {
                        return "护符";
                    }
                case StdItemType.itBracelet:
                    {
                        return "手镯";
                    }
                case StdItemType.itRing:
                    {
                        return "戒指";
                    }
                case StdItemType.itGirdle:
                    {
                        return "腰带";
                    }
                case StdItemType.itShoes:
                    {
                        return "鞋子";
                    }
            }
            return "特殊物品";
        };
        return StdItem;
    }());
    Config.StdItem = StdItem;
})(Config || (Config = {}));
//# sourceMappingURL=StdItem.js.map