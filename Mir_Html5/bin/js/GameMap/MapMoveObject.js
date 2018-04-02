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
 * 地图中可移动的现实对象类，怪物、人物等会移动的物体都继承此类
 * @author 后天
 *
 */
var GameMap;
(function (GameMap) {
    var MapMoveObject = /** @class */ (function (_super) {
        __extends(MapMoveObject, _super);
        function MapMoveObject() {
            var _this = _super.call(this) || this;
            _this.m_dwMoveSpeed = 1000; //实体移动速度
            _this.m_dwMoveStartTick = 0; //移动开始的时间，若为0表示当前没有在移动
            _this.m_dwMoveEndTick = 0; //移动结束的时间
            _this.m_nMoveTargetX = 0; //移动的目的坐标X
            _this.m_nMoveTargetY = 0; //移动的目的坐标Y
            _this.m_nDirection = 0; //当前方向
            _this.m_dMoveLongX = 0; //X方向上每毫秒的移动长度（像素单位）
            _this.m_dMoveLongY = 0; //Y方向上每毫秒的移动长度（像素单位）
            _this.m_boDisappeared = false; //实体是否消失
            return _this;
        }
        MapMoveObject.prototype.GetMoveSpeed = function () {
            return this.m_dwMoveSpeed;
        };
        MapMoveObject.prototype.SetMoveSpeed = function (nMoveSpeed) {
            this.m_dwMoveSpeed = nMoveSpeed;
        };
        MapMoveObject.prototype.Update = function (nCurrentTick) {
            //如果正在移动则处理移动
            if (this.m_dwMoveStartTick > 0) {
                if (nCurrentTick < this.m_dwMoveEndTick) {
                    this.ProcessMove(nCurrentTick - this.m_dwMoveStartTick);
                }
                else {
                    this.EndMove();
                }
            }
        };
        /**
         *  重载父类设置坐标的函数，以便在移动期间进行设定坐标的操作时可以停止移动
         * @param X
         * @param Y
         *
         */
        MapMoveObject.prototype.SetCurrentXY = function (X, Y) {
            //如果正在移动则终止移动
            if (this.m_dwMoveStartTick > 0) {
                this.EndMove();
            }
            _super.prototype.SetCurrentXY.call(this, X, Y);
        };
        //是否正在移动
        MapMoveObject.prototype.IsMoving = function () {
            return this.m_dwMoveStartTick != 0;
        };
        //是否消失了
        MapMoveObject.prototype.IsDisappeared = function () {
            return this.m_boDisappeared;
        };
        /**
         * 移动
         * @param X 目标坐标X
         * @param Y 目标坐标Y
         * @param speed 实际的移动速度，单位是毫秒
         */
        MapMoveObject.prototype.MoveTo = function (X, Y, speed) {
            if (speed === void 0) { speed = 0; }
            if (X == this.m_nCurrentX && Y == this.m_nCurrentY)
                return;
            //先终止移动
            if (this.m_dwMoveStartTick > 0) {
                if (X == this.m_nMoveTargetX && Y == this.m_nMoveTargetY)
                    return;
                this.EndMove();
            }
            //移动之前就先进行针对新坐标的排序操作
            this.SortOnContainer(this.m_nCurrentX, X, this.m_nCurrentY, Y);
            //判断是否使用默认速度
            var mSpeed;
            if (speed == 0)
                mSpeed = this.m_dwMoveSpeed;
            else
                mSpeed = speed;
            //计算移动所需的相关数据
            this.m_nMoveTargetX = X;
            this.m_nMoveTargetY = Y;
            //console.log("移动坐标x:"+this.m_nMoveTargetX+"移动坐标y:"+this.m_nMoveTargetY);
            this.m_dwMoveStartTick = Config.GlobalConfig.s_dwUpdateTick;
            this.m_dwMoveEndTick = this.m_dwMoveStartTick + mSpeed;
            //计算x和y方向每毫秒的移动距离（像素单位）
            this.m_dMoveLongX = Number((X - this.m_nCurrentX) * GameMap.CustomMap.MAPCELLUNITWIDTH) / mSpeed;
            this.m_dMoveLongY = Number((Y - this.m_nCurrentY) * GameMap.CustomMap.MAPCELLUNITHEIGHT) / mSpeed;
        };
        /**
         * 移动完成后的处理函数
         *
         */
        MapMoveObject.prototype.EndMove = function () {
            if (this.m_dwMoveStartTick > 0) {
                this.m_dwMoveStartTick = 0;
                this.SetCurrentXY(this.m_nMoveTargetX, this.m_nMoveTargetY);
            }
        };
        /**
         * 处理移动过程的位置变更
         * @param MovedTick 自开始移动到现在的时间（ms）
         *
         */
        MapMoveObject.prototype.ProcessMove = function (MovedTick) {
            var x = (this.m_nCurrentX + 0.5) * GameMap.CustomMap.MAPCELLUNITWIDTH + this.m_dMoveLongX * MovedTick;
            var y = (this.m_nCurrentY + 0.5) * GameMap.CustomMap.MAPCELLUNITHEIGHT + this.m_dMoveLongY * MovedTick;
            this.x = Math.floor(x);
            this.y = Math.floor(y);
        };
        MapMoveObject.prototype.SetDirection = function (nDir) {
            this.m_nDirection = nDir;
        };
        MapMoveObject.prototype.GetDirection = function () {
            return this.m_nDirection;
        };
        return MapMoveObject;
    }(GameMap.MapDisplayObject));
    GameMap.MapMoveObject = MapMoveObject;
})(GameMap || (GameMap = {}));
//# sourceMappingURL=MapMoveObject.js.map