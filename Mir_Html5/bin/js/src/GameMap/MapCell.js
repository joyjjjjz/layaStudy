/**
 *	地图坐标单元格数据对象类
 * @author 后天 2017.9.28
 *
 */
var GameMap;
(function (GameMap) {
    var MapCell = /** @class */ (function () {
        function MapCell() {
            this._nBkImgIdx = 0; //背景层图片编号
            this._nFtImgIdx = 0; //物体层图片编号
            this._nFtObjIdx = 0; //物体层图片分类编号
            this._nFlags = 0; //标识
            this._bkImg = null; //地砖背景
        }
        return MapCell;
    }());
    GameMap.MapCell = MapCell;
})(GameMap || (GameMap = {}));
//# sourceMappingURL=MapCell.js.map