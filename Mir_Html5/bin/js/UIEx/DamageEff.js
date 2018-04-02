var UI;
(function (UI) {
    /*
    *飘血特效
    *@author 2017.10.11
    */
    var DamageEff = /** @class */ (function () {
        function DamageEff() {
            this.m_loadItem = [];
            this.m_Number = [];
            this.m_RootLayer = null;
        }
        DamageEff.prototype.Init = function (loadingItem) {
            this.m_RootLayer = new Laya.Sprite();
            Laya.stage.addChild(this.m_RootLayer);
            this.m_RootLayer.zOrder = 999; //低于UI层
            var str = "";
            for (var i = 0; i < 12; i++) {
                str = "data/other/hit1/HitNum1_" + i + ".png";
                var item = { url: str, type: Laya.Loader.IMAGE };
                this.m_loadItem.push(item);
                loadingItem.push(item);
            }
        };
        DamageEff.GetInstance = function () {
            if (DamageEff._Instance == null) {
                DamageEff._Instance = new DamageEff();
            }
            return DamageEff._Instance;
        };
        DamageEff.prototype.OnLoaded = function () {
            this.m_Number = [];
            for (var i = 0; i < this.m_loadItem.length; i++) {
                var pTex = Laya.loader.getRes(this.m_loadItem[i].url);
                this.m_Number.push(pTex);
            }
        };
        DamageEff.prototype.MakeDamageEffect = function (pEntity, nValue) {
            if (nValue == 0)
                return;
            //可以优化的，把用过的sprite加入到缓存中，因为飘血太过于频繁了
            var s = new Laya.Sprite();
            var nValueStr = nValue.toString();
            var AddImageIndex = 10;
            var DecImageIndex = 11;
            var numbSprite = new Laya.Sprite();
            if (nValue > 0) {
                numbSprite.texture = this.m_Number[AddImageIndex];
            }
            else if (nValue < 0) {
                numbSprite.texture = this.m_Number[DecImageIndex];
            }
            if (numbSprite.texture == null) {
                return;
            }
            s.addChild(numbSprite);
            var offsetX = numbSprite.texture.width;
            for (var i = 1; i < nValueStr.length; i++) {
                var n = parseInt(nValueStr[i]);
                var numbSprite_1 = new Laya.Sprite();
                numbSprite_1.texture = this.m_Number[n];
                if (numbSprite_1.texture == null) {
                    return;
                }
                s.addChild(numbSprite_1);
                numbSprite_1.x = offsetX + 2;
                offsetX += numbSprite_1.texture.width;
            }
            this.m_RootLayer.addChild(s);
            var nScenePoint = new Laya.Point();
            pEntity.localToGlobal(nScenePoint);
            s.x = nScenePoint.x - Entity.CustomEntity.DefalutWidth / 2;
            s.y = nScenePoint.y - Entity.CustomEntity.DefalutHeight;
            Laya.Tween.to(s, { y: s.y - 50 }, 1000, null, Laya.Handler.create(this, this.OnComplete, [s]));
        };
        DamageEff.prototype.OnComplete = function (arg) {
            var s = arg;
            if (s) {
                this.m_RootLayer.removeChild(s);
                s.texture = null;
                s.destroy();
            }
        };
        DamageEff._Instance = null;
        return DamageEff;
    }());
    UI.DamageEff = DamageEff;
})(UI || (UI = {}));
//# sourceMappingURL=DamageEff.js.map