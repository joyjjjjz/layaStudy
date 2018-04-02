/*
    地图地砖资源管理器
    @author 后天 2017.9.28
*/
var GameMap;
(function (GameMap) {
    var MapResManager = /** @class */ (function () {
        function MapResManager() {
            this.m_ArrTile = [];
        }
        //清理无用纹理
        MapResManager.prototype.ClearFreeMemory = function () {
            for (var key in this.m_ArrTile) {
                var sprite = this.m_ArrTile[key];
                if (sprite != null && sprite.parent == null) {
                    if (sprite.texture != null) {
                        sprite.texture.destroy(true);
                    }
                    sprite.destroy();
                    this.m_ArrTile[key] = null;
                }
            }
        };
        MapResManager.prototype.GetTileImg = function (bkImgIndex) {
            var s = bkImgIndex.toString();
            while (s.length < 5) {
                s = "0" + s;
            }
            s = MapResManager.RESURL + Math.floor(bkImgIndex / 10000) + "/" + Math.floor(((bkImgIndex % 10000) / 1000)) + "/" + s + ".jpg";
            if (this.m_ArrTile[s] != null) {
                return this.m_ArrTile[s];
            }
            var pImg = new Laya.Sprite();
            this.m_ArrTile[s] = pImg;
            Laya.loader.load(s, Laya.Handler.create(this, this.OnLoadImage));
            return pImg;
        };
        MapResManager.prototype.OnLoadImage = function (data) {
            if (data != null) {
                var pTex = data;
                if (this.m_ArrTile[pTex.url] != null) {
                    var pSprite = this.m_ArrTile[pTex.url];
                    if (pSprite != null) {
                        pSprite.texture = pTex;
                    }
                }
            }
        };
        MapResManager._Instance = new MapResManager();
        //private static readonly RESURL:string = "http://cdn.zr2.51.com/v1/map/tiles/";
        MapResManager.RESURL = "./data/map/map/tiles/";
        return MapResManager;
    }());
    GameMap.MapResManager = MapResManager;
})(GameMap || (GameMap = {}));
//# sourceMappingURL=MapResManager.js.map