var Resources;
(function (Resources) {
    var ResourcesManager = /** @class */ (function () {
        function ResourcesManager() {
            this.m_ArrSprite = []; //碎图片资源包
            //需要定时释放的资源包
            this.m_FreePackGroup = new Array();
            this.m_nLastFreeTick = 0;
            this.m_NpcGroup = new Resources.SRPackGroup("npc");
            this.m_HumanGroup = new Resources.SRPackGroup("human/Xmodel");
            this.m_WeaponBoyGroup = new Resources.SRPackGroup("human/Xweapon/boy");
            this.m_WeaponGirlGroup = new Resources.SRPackGroup("human/Xweapon/girl");
            this.m_ShadowGroup = new Resources.SRPackGroup("human/shadow");
            this.m_MonsterGroup = new Resources.SRPackGroup("monster");
            this.m_SkillEffect = new Resources.SRPackGroup("skilleffect");
            this.m_OtherEffect = new Resources.SRPackGroup("othereffect");
            this.m_EmotionGroup = new Resources.SRPackGroup("emotion");
            //加入到定时释放中
            this.m_FreePackGroup.push(this.m_NpcGroup);
            this.m_FreePackGroup.push(this.m_HumanGroup);
            this.m_FreePackGroup.push(this.m_WeaponBoyGroup);
            this.m_FreePackGroup.push(this.m_WeaponGirlGroup);
            this.m_FreePackGroup.push(this.m_ShadowGroup);
            this.m_FreePackGroup.push(this.m_MonsterGroup);
            this.m_FreePackGroup.push(this.m_SkillEffect);
            this.m_FreePackGroup.push(this.m_OtherEffect);
            this.m_FreePackGroup.push(this.m_EmotionGroup);
        }
        ResourcesManager.prototype.Update = function (nCurrentTick) {
            if (this.m_nLastFreeTick == 0) {
                this.m_nLastFreeTick = nCurrentTick + ResourcesManager.FREETIME;
            }
            if (nCurrentTick >= this.m_nLastFreeTick) {
                for (var i = 0; i < this.m_FreePackGroup.length; i++) {
                    var packGroup = this.m_FreePackGroup[i];
                    packGroup.CheckFreeMemory();
                }
                //碎图片
                for (var key in this.m_ArrSprite) {
                    if (this.m_ArrSprite[key] != null &&
                        this.m_ArrSprite[key].CheckFreeMemory()) {
                        this.m_ArrSprite[key] = null;
                    }
                }
                this.m_nLastFreeTick = nCurrentTick + ResourcesManager.FREETIME;
            }
        };
        ResourcesManager.prototype.GetNpcPack = function (nIndex) {
            return this.m_NpcGroup.GetPack(nIndex);
        };
        ResourcesManager.prototype.GetHumanPackage = function (nIndex) {
            return this.m_HumanGroup.GetPack(nIndex);
        };
        ResourcesManager.prototype.GetHumanShadowPackage = function (nSex) {
            return this.m_ShadowGroup.GetPack(nSex);
        };
        ResourcesManager.prototype.GetEmotionPackage = function (nIndex) {
            return this.m_EmotionGroup.GetPack(nIndex);
        };
        ResourcesManager.prototype.GetWeaponPackage = function (nIndex, nSex) {
            if (nSex == 0) {
                return this.m_WeaponBoyGroup.GetPack(nIndex);
            }
            return this.m_WeaponGirlGroup.GetPack(nIndex);
        };
        ResourcesManager.prototype.GetMonsterPackage = function (nIndex) {
            return this.m_MonsterGroup.GetPack(nIndex);
        };
        ResourcesManager.prototype.GetSkillEffectPackage = function (nIndex) {
            return this.m_SkillEffect.GetPack(nIndex);
        };
        ResourcesManager.prototype.GetOtherEffect = function (szName) {
            return this.m_OtherEffect.GetPackByName(szName);
        };
        ResourcesManager.prototype.GetSpriteForURL = function (szUrl) {
            if (this.m_ArrSprite[szUrl] != null) {
                return this.m_ArrSprite[szUrl].GetSprite();
            }
            this.GetResSprite(szUrl);
            var pResSprite = new Resources.ResSprite();
            this.m_ArrSprite[szUrl] = pResSprite;
            return pResSprite.GetSprite();
        };
        ResourcesManager.prototype.GetMiniMapImage = function (szMapFile) {
            szMapFile = szMapFile.substr(0, szMapFile.length - 4);
            var sFile = "data/" + szMapFile + ".jpg";
            if (this.m_ArrSprite[sFile] != null) {
                return this.m_ArrSprite[sFile].GetSprite();
            }
            return this.GetSpriteForURL(sFile);
        };
        ResourcesManager.prototype.GetItemIconImage = function (nItemIconId) {
            var sFile = "data/itemicon/" + nItemIconId.toString() + ".png";
            if (this.m_ArrSprite[sFile] != null) {
                return this.m_ArrSprite[sFile].GetSprite();
            }
            return this.GetSpriteForURL(sFile);
        };
        ResourcesManager.prototype.GetResSprite = function (szFile) {
            Laya.loader.load(szFile, Laya.Handler.create(this, this.onLoadedResSprite));
        };
        ResourcesManager.prototype.onLoadedResSprite = function (data) {
            var pTex = data;
            if (pTex != null) {
                var pResSprite = this.m_ArrSprite[pTex.url];
                pResSprite.SetTexture(pTex);
            }
        };
        ResourcesManager._Instance = new ResourcesManager();
        ResourcesManager.FREETIME = 60 * 1000 * 1; //三分钟释放一次
        return ResourcesManager;
    }());
    Resources.ResourcesManager = ResourcesManager;
})(Resources || (Resources = {}));
//# sourceMappingURL=ResourcesManager.js.map