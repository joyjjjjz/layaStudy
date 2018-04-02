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
/**
 * 游戏地图绘制类
 * 实现有地图的绘制和资源的管理
 * 		地图的绘制方式为：只显示屏幕内可以看到的图片，超出的图片不予显示；
 * 当地图的位置发生了变化的时候，会重新铺设新显示区域的图片并删除不可显示
 * 区域的图片
 * @author 后天 2017.9.28
 *
 */
var GameMap;
(function (GameMap) {
    var CustomRenderMap = /** @class */ (function (_super) {
        __extends(CustomRenderMap, _super);
        function CustomRenderMap() {
            var _this = _super.call(this) || this;
            _this.m_nCurrentX = 0; //当前X坐标
            _this.m_nCurrentY = 0; //当前Y坐标
            _this.m_nHCellCount = 0; //地图水平方向半个显示区域可以容纳的坐标数量
            _this.m_nVCellCount = 0; //地图竖直方向半个显示区域可以容纳的坐标数量
            _this.m_nShowContentX = 0; //当前地图显示内容的中心的X坐标
            _this.m_nShowContentY = 0; //当前地图显示内容的中心的Y坐标
            _this.m_nDisplayWidth = 0; //地图显示区域的像素宽度
            _this.m_nDisplayHeight = 0; //地图显示区域的像素高度
            _this.m_nDisplayCenterX = 0; //显示区域中心的X像素位置
            _this.m_nDisplayCenterY = 0; //显示区域中心的Y像素位置 
            _this.m_nLayersOffsetX = 0; //除背景外的各个层的微偏移量X（可做场景震动效果）
            _this.m_nLayersOffsetY = 0; //除背景外的各个层的微偏移量Y（可做场景震动效果）
            _this.m_DiplayContainer = null; //地图的显示容器对象
            _this.m_MapLayerRoot = new Laya.Sprite();
            _this.m_Ground = new Laya.Sprite();
            _this.m_MapLayerRoot.addChild(_this.m_Ground);
            _this.m_Object = new Laya.Sprite();
            _this.m_MapLayerRoot.addChild(_this.m_Object);
            return _this;
        }
        CustomRenderMap.prototype.GetMapLayerRoot = function () {
            return this.m_MapLayerRoot;
        };
        CustomRenderMap.prototype.GetDisplayContainer = function () {
            return this.m_DiplayContainer;
        };
        /**
         * m_DisplayerContainer的修改器
         * @param container
         * 修改m_DisplayerContainer后会自动将内部向其增加的DisplayObject移除，
         * 若新的Container非空则会将这些DisplayObject添加到新的Container中
         */
        CustomRenderMap.prototype.SetDisplayContainer = function (container) {
            if (this.m_MapLayerRoot.parent) {
                this.m_MapLayerRoot.parent.removeChild(this.m_MapLayerRoot);
            }
            this.m_DiplayContainer = container;
            if (container) {
                container.addChild(this.m_MapLayerRoot);
            }
        };
        /**
        *设置当前中心位置的X和Y坐标
        * @param x
        * @param y
        *
        */
        CustomRenderMap.prototype.SetCurrentPosition = function (x, y) {
            if (x < 0 || y < 0 || x >= this.m_nWidth || y >= this.m_nHeight) {
                return;
            }
            if (this.m_nCurrentX == x && this.m_nCurrentY == y)
                return;
            this.m_nCurrentX = x;
            this.m_nCurrentY = y;
            //更新地图显示内容
            this.ShowMapContent(x, y);
        };
        /**
         * 以x,y为中心坐标刷新地图显示内容
         * @param x
         * @param y
         *
         */
        CustomRenderMap.prototype.ShowMapContent = function (x, y) {
            //检查小地图的显示区域是否需要更新
            // this.CheckCopyMinimap( x, y );
            //重新计算和分布地图显示区域
            this.RebuildDisplayArea(x, y);
            //更新地图各个层在displayContainer中的位置
            //注意由于坐标是自左向右和自上向下为轴向，所以此处应当采用x和y坐标的负值
            this.SetLayersPosition(-x * GameMap.CustomMap.MAPCELLUNITWIDTH, -y * GameMap.CustomMap.MAPCELLUNITHEIGHT);
            //保存显示更新坐标
            this.m_nShowContentX = x;
            this.m_nShowContentY = y;
        };
        /**
         *	重新构建地图当前的显示区域
         *	包括背景层和建筑层
         *
         */
        CustomRenderMap.prototype.RebuildDisplayArea = function (x, y) {
            //删除超出显示区域的地砖图片和物体图片
            this.RemoveOutOfDisplaySizeImages(x, y);
            //重新铺设显示区域内的地转和物体
            this.ReDistributeMapLayers(x, y);
        };
        /**
         * 移动地图所有层
         * @param x	水平方向的像素坐标
         * @param y	竖直方向的像素坐标
         *
         */
        CustomRenderMap.prototype.SetLayersPosition = function (x, y) {
            this.m_MapLayerRoot.x = x + this.m_nDisplayCenterX + this.m_nLayersOffsetX;
            if (CustomRenderMap.CANMOVETOEDGE) {
                if (this.m_MapLayerRoot.x > 0)
                    this.m_MapLayerRoot.x = 0;
                else if (this.m_MapLayerRoot.x < this.m_nDisplayWidth - this.m_nWidthPixel)
                    this.m_MapLayerRoot.x = this.m_nDisplayWidth - this.m_nWidthPixel;
            }
            this.m_MapLayerRoot.y = y + this.m_nDisplayCenterY + this.m_nLayersOffsetY;
            if (CustomRenderMap.CANMOVETOEDGE) {
                if (this.m_MapLayerRoot.y > 0)
                    this.m_MapLayerRoot.y = 0;
                else if (this.m_MapLayerRoot.y < this.m_nDisplayHeight - this.m_nHeightPixel)
                    this.m_MapLayerRoot.y = this.m_nDisplayHeight - this.m_nHeightPixel;
            }
        };
        /**
        *从某个DisplayObjectContainer中移除超出显示范围的Image
        *
        */
        CustomRenderMap.prototype.RemoveOutOfDisplaySizeImages = function (x, y) {
            //计算出当前显示区域的显示的坐标范围
            var range = this.CalcMapContentRange(x, y);
            var left = range._nX;
            var top = range._nY;
            var right = range._nRight;
            var bottom = range._nBottom;
            //将坐标转化为像素
            left *= GameMap.CustomMap.MAPCELLUNITWIDTH;
            top *= GameMap.CustomMap.MAPCELLUNITHEIGHT;
            right *= GameMap.CustomMap.MAPCELLUNITWIDTH;
            bottom *= GameMap.CustomMap.MAPCELLUNITHEIGHT;
            //删除地表层中x或y超出显示范围的显示对象
            //注意必须是降序循环，因为有删除操作
            for (var i = this.m_Ground.numChildren - 1; i > -1; --i) {
                var img = this.m_Ground.getChildAt(i);
                if (img && (img.x < left || img.y < top || img.x > right || img.y > bottom)) {
                    this.m_Ground.removeChildAt(i);
                    var cell = this.m_Cells[(img.y / GameMap.CustomMap.MAPCELLUNITHEIGHT) * this.m_nWidth + (img.x / GameMap.CustomMap.MAPCELLUNITWIDTH)];
                    if (cell._bkImg == img) {
                        cell._bkImg = null;
                    }
                    else {
                        throw new Error("removeOutOfDisplaySizeImages::cell.bkImg != img");
                    }
                }
            }
        };
        /**
         * 计算以x,y为中心的地图内容显示区域范围
         * @param x
         * @param y
         * @return
         *
         */
        CustomRenderMap.prototype.CalcMapContentRange = function (x, y) {
            var result = new Common.Rectangle();
            result._nX = x - this.m_nHCellCount - this.MAPTILEHBLOCK;
            result._nY = y - this.m_nVCellCount - this.MAPTILEVBLOCK - CustomRenderMap.MAP_VERTICAL_OFFSET_COORD;
            result._nRight = x + this.m_nHCellCount + this.MAPTILEHBLOCK;
            result._nBottom = y + this.m_nVCellCount + this.MAPTILEVBLOCK - CustomRenderMap.MAP_VERTICAL_OFFSET_COORD;
            if (result._nX < 0)
                result._nX = 0;
            if (result._nY < 0)
                result._nY = 0;
            //由于地表层的铺设在地图编辑器中规定为必须铺设在X为MAPTILEHBLOCK的倍数，Y为MAPTILEVBLOCK倍数的位置上
            //所以为了避免显示区域的起始位置不在MAPTILEHBLOCK或MAPTILEVBLOCK的整倍数上而造成边沿区域没有图像的情况，
            //固应当将left和top都对分别对齐到MAPTILEHBLOCK和MAPTILEVBLOCK的整倍数上
            result._nX -= result._nX % this.MAPTILEHBLOCK;
            result._nY -= result._nY % this.MAPTILEVBLOCK;
            if (result._nRight >= this.m_nWidth)
                result._nRight = this.m_nWidth - 1;
            if (result._nBottom >= this.m_nHeight)
                result._nBottom = this.m_nHeight - 1;
            return result;
        };
        /**
         *	重新铺设背景层和建筑层在显示区域中没有显示的位置
         *
         */
        CustomRenderMap.prototype.ReDistributeMapLayers = function (x, y) {
            // var sp: Sprite;
            // var left: int, top: int, right: int, bottom: int, x: int, y: int;
            // var cell: MapCell;
            // var img: CloneableBitmap;
            // var bdBmp: MapBuildingBitmap;
            // var pxStart: int, pyStart: int, px: int, py: int;
            // var px_inc: int, py_inc: int;
            // var cellStart: int, cellIndex: int;
            /**计算背景层需要铺设的坐标区域
             * 需要注意的是，地转的铺设要比显示区域最左上端的坐标再分别向上MAPTILEVBLOCK坐标且向左MAPTILEHBLOCK个坐标，
             * 因为一个地转块的大小是MAPTILEHBLOCK x MAPTILEVBLOCK坐标，如果直接从显示区域的首个可见坐标处开始铺设
             * 地转则可能会造成边缘空白的黑快区域
             * 另外铺设地砖的终止坐标也要增加X:MAPTILEHBLOCK和Y:MAPTILEVBLOCK坐标以便于预读图像资源
             * **/
            var range = this.CalcMapContentRange(x, y);
            var left = range._nX;
            var top = range._nY;
            var right = range._nRight;
            var bottom = range._nBottom;
            //计算出铺设图片的启示像素坐标
            var pxStart = left * GameMap.CustomMap.MAPCELLUNITWIDTH;
            var pyStart = top * GameMap.CustomMap.MAPCELLUNITHEIGHT;
            //开始铺设地转
            y = top;
            var py = pyStart;
            var cellStart = top * this.m_nWidth + left;
            var px_inc = GameMap.CustomMap.MAPCELLUNITWIDTH * this.MAPTILEHBLOCK;
            var py_inc = GameMap.CustomMap.MAPCELLUNITHEIGHT * this.MAPTILEVBLOCK;
            while (y <= bottom) {
                x = left;
                var px = pxStart;
                var cellIndex = cellStart;
                while (x <= right) {
                    var cell = this.m_Cells[cellIndex];
                    if (cell != null && cell._nBkImgIdx > 0 && cell._bkImg == null) {
                        var img = GameMap.MapResManager._Instance.GetTileImg(cell._nBkImgIdx);
                        if (img) {
                            this.m_Ground.addChild(img);
                            img.x = px;
                            img.y = py;
                            cell._bkImg = img;
                        }
                    }
                    x += this.MAPTILEHBLOCK;
                    px += px_inc;
                    cellIndex += this.MAPTILEHBLOCK;
                }
                y += this.MAPTILEVBLOCK;
                py += py_inc;
                cellStart += this.m_nWidth * this.MAPTILEVBLOCK;
            }
        };
        /**
         *设置地图显示区域大小
         * @param width 显示区域宽度
         * @param height 显示区域高度
         *
         */
        CustomRenderMap.prototype.SetDisplaySize = function (width, height) {
            if (width != this.m_nDisplayWidth || height != this.m_nDisplayHeight) {
                this.m_nDisplayWidth = width;
                this.m_nDisplayHeight = height;
                /**
                 * 计算显示区域的中心位置（非绝对中心)
                 * 由于人是处于一个坐标的中心的(x+32:y+16)所以需要将中心位置向左和向上偏移半个坐标的像素大小
                 * ***/
                this.m_nDisplayCenterX = width / 2 - GameMap.CustomMap.MAPCELLUNITWIDTH / 2;
                this.m_nDisplayCenterY = height / 2 - GameMap.CustomMap.MAPCELLUNITHEIGHT / 2;
                //重新计算1/4个显示区域内的水平和数值方向的坐标数量
                this.m_nHCellCount = width / GameMap.CustomMap.MAPCELLUNITWIDTH;
                if (this.m_nDisplayWidth % GameMap.CustomMap.MAPCELLUNITWIDTH)
                    this.m_nHCellCount++;
                this.m_nVCellCount = this.m_nDisplayCenterY / GameMap.CustomMap.MAPCELLUNITHEIGHT;
                if (this.m_nDisplayHeight % GameMap.CustomMap.MAPCELLUNITHEIGHT)
                    this.m_nVCellCount++;
                //横版地图的地图显示中心要向下偏移一个坐标的高度
                this.m_nDisplayCenterY += GameMap.CustomMap.MAPCELLUNITHEIGHT * CustomRenderMap.MAP_VERTICAL_OFFSET_COORD;
                //更新地图显示内容
                this.UpdateMapContent();
            }
        };
        /**
         * 更新本次显示地图的内容
         *
         */
        CustomRenderMap.prototype.UpdateMapContent = function () {
            this.ShowMapContent(this.m_nShowContentX, this.m_nShowContentY);
        };
        /**
         * 向地图中添加一个显示对象
         * @param obj 要添加的显示对象
         *
         */
        CustomRenderMap.prototype.AddObject = function (obj) {
            this.m_Object.addChildAt(obj, obj.CalcDisplayIndex(this.m_Object));
        };
        /**
         * 从地图中删除一个显示对象
         * @param obj 要删除的显示对象
         *
         */
        CustomRenderMap.prototype.RemoveObject = function (obj) {
            this.m_Object.removeChild(obj);
        };
        /**
 *在当前场景中转换屏幕像素坐标到地图坐标
 * @param x	基于displayContainer的像素坐标X
 * @param y	基于displayContainer的像素坐标Y
 * @return
 *
 */
        CustomRenderMap.prototype.ScreenToCoord = function (x, y) {
            var pt = new Laya.Point(Math.floor(x - this.m_MapLayerRoot.x) / GameMap.CustomMap.MAPCELLUNITWIDTH, Math.floor(y - this.m_MapLayerRoot.y) / GameMap.CustomMap.MAPCELLUNITHEIGHT);
            if (pt.x < 0)
                pt.x = 0;
            if (pt.x >= this.m_nWidth)
                pt.x = this.m_nWidth - 1;
            if (pt.y < 0)
                pt.y = 0;
            if (pt.y >= this.m_nHeight)
                pt.y = this.m_nHeight - 1;
            pt.x = Math.floor(pt.x);
            pt.y = Math.floor(pt.y);
            return pt;
        };
        CustomRenderMap.MAP_VERTICAL_OFFSET_COORD = -1; //地图Y方向中心位置坐标偏移量（全局）
        CustomRenderMap.CANMOVETOEDGE = true; //主角是否支持边缘移动    
        return CustomRenderMap;
    }(GameMap.CustomMap));
    GameMap.CustomRenderMap = CustomRenderMap;
})(GameMap || (GameMap = {}));
//# sourceMappingURL=CustomRenderMap.js.map