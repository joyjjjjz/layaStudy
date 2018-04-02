var Resources;
(function (Resources) {
    var ResSprite = /** @class */ (function () {
        function ResSprite(texture) {
            if (texture === void 0) { texture = null; }
            this._szFile = "";
            this._Texture = null;
            this._ArrSprite = new Array();
            this._Texture = texture;
            if (this._Texture != null) {
                this.GetSprite(); //初始化一张精灵
            }
        }
        ResSprite.prototype.SetTexture = function (pTex) {
            this._Texture = pTex;
            if (this._Texture != null) {
                for (var i = 0; i < this._ArrSprite.length; i++) {
                    if (this._ArrSprite[i].texture == null) {
                        this._ArrSprite[i].texture = pTex;
                        //需要设置点击区域,以相应单击事件
                        // this._ArrSprite[i].scale(1,1);
                        this._ArrSprite[i].hitArea = new laya.maths.Rectangle(0, 0, pTex.width, pTex.height);
                    }
                }
            }
        };
        ResSprite.prototype.Destory = function () {
            for (var i = 0; i < this._ArrSprite.length; i++) {
                var s = this._ArrSprite[i];
                s.texture = null;
                s.hitArea = null;
                s.destroy();
            }
            this._ArrSprite = [];
            this._Texture = null;
        };
        ResSprite.prototype.GetSprite = function () {
            for (var i = 0; i < this._ArrSprite.length; i++) {
                if (this._ArrSprite[i].parent == null) {
                    this._ArrSprite[i].scale(1, 1);
                    this._ArrSprite[i].pos(0, 0);
                    this._ArrSprite[i].hitArea = new laya.maths.Rectangle(0, 0, this._Texture.width, this._Texture.height);
                    return this._ArrSprite[i];
                }
            }
            var sprite = new Laya.Sprite();
            sprite.texture = this._Texture;
            //需要设置点击区域,以相应单击事件
            sprite.scale(1, 1);
            sprite.pos(0, 0);
            if (this._Texture != null) {
                sprite.hitArea = new laya.maths.Rectangle(0, 0, this._Texture.width, this._Texture.height);
            }
            this._ArrSprite.push(sprite);
            return sprite;
        };
        ResSprite.prototype.CheckFreeMemory = function () {
            if (this._ArrSprite == null) {
                return true;
            }
            for (var i = 0; i < this._ArrSprite.length; i++) {
                if (this._ArrSprite[i].parent != null) {
                    return false;
                }
            }
            this.Destory();
            return true;
        };
        return ResSprite;
    }());
    Resources.ResSprite = ResSprite;
})(Resources || (Resources = {}));
//# sourceMappingURL=ResSprite.js.map