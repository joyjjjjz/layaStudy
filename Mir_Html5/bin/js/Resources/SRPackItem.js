/*
*动画包资源项
@author 后天 2017.9.28 22:06
*/
var Resources;
(function (Resources) {
    var SRPackItem = /** @class */ (function () {
        function SRPackItem() {
            this._nOffset = 0; //文件偏移点
            this._nDataSize = 0; //二进制数据长度
            this._Data = null; //Base64编码数据
            this._nOffsetPoint = new Laya.Point(); //坐标偏移点
            this._ArrSprite = [];
            this._nWidth = 0; //纹理宽度- 这个成员是无效的。
            this._nHeight = 0; //纹理高度 这个成员是无效的。
        }
        SRPackItem.prototype.Destory = function () {
            for (var i = 0; i < this._ArrSprite.length; i++) {
                var sprite = this._ArrSprite[i];
                sprite.destroy();
            }
            this._ArrSprite = [];
            this._Data = null;
            this._nDataSize = 0;
            this._nOffset = 0;
        };
        SRPackItem.prototype.GetSprite = function () {
            for (var i = 0; i < this._ArrSprite.length; i++) {
                if (this._ArrSprite[i].parent == null) {
                    return this._ArrSprite[i];
                }
            }
            var sprite = Laya.Sprite.fromImage(this._Data);
            this._ArrSprite.push(sprite);
            sprite.pos(this._nOffsetPoint.x, this._nOffsetPoint.y);
            return sprite;
        };
        SRPackItem.prototype.CheckFree = function () {
            for (var i = 0; i < this._ArrSprite.length; i++) {
                var sprite = this._ArrSprite[i];
                if (sprite.parent != null) {
                    return false;
                }
            }
            return true;
        };
        return SRPackItem;
    }());
    Resources.SRPackItem = SRPackItem;
})(Resources || (Resources = {}));
//# sourceMappingURL=SRPackItem.js.map