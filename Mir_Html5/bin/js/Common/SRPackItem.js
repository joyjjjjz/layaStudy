/*
*动画包资源项
@author 后天 2017.9.28 22:06
*/
var Common;
(function (Common) {
    var SRPackItem = /** @class */ (function () {
        function SRPackItem() {
            this._nOffset = 0; //文件偏移点
            this._nDataSize = 0; //二进制数据长度
            this._Data = null; //Base64编码数据
            this._nOffsetPoint = new Laya.Point(); //坐标偏移点
            this._ArrSprite = [];
        }
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
        return SRPackItem;
    }());
    Common.SRPackItem = SRPackItem;
})(Common || (Common = {}));
//# sourceMappingURL=SRPackItem.js.map