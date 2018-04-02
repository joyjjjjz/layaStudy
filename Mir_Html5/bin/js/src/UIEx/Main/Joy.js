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
var UI;
(function (UI) {
    var Joy = /** @class */ (function (_super) {
        __extends(Joy, _super);
        function Joy() {
            var _this = _super.call(this) || this;
            _this.m_OldPoint = new Laya.Point();
            _this.m_bJoyMove = false;
            _this.on(Laya.Event.MOUSE_DOWN, _this, _this.OnJoyMouseDown);
            //   this.on(Laya.Event.MOUSE_MOVE,this,this.OnJoyMouseMove);
            _this.on(Laya.Event.MOUSE_UP, _this, _this.OnJoyMouseUp);
            //算出原点
            _this.m_OldPoint.x = _this.width / 2 - _this.m_joy.width / 2;
            _this.m_OldPoint.y = _this.height / 2 - _this.m_joy.height / 2;
            _this.m_joy.pos(_this.m_OldPoint.x, _this.m_OldPoint.y);
            _this.m_DragRect = new Laya.Rectangle(0, 0, _this.width - _this.m_joy.width, _this.height - _this.m_joy.height);
            return _this;
        }
        Joy.prototype.OnJoyMouseDown = function () {
            this.m_bJoyMove = true;
            this.m_joy.startDrag(this.m_DragRect, false, 0, 300, null, true);
        };
        Joy.prototype.Update = function (nCurrentTick) {
            if (this.m_bJoyMove) {
                if (Math.abs(this.m_OldPoint.x - this.m_joy.x) >= Joy.MOVEDIS &&
                    Math.abs(this.m_OldPoint.y - this.m_joy.y) >= Joy.MOVEDIS) {
                    var nDir = GameMap.CustomGameMap.CalcDirection(this.m_OldPoint.x, this.m_OldPoint.y, this.m_joy.x, this.m_joy.y);
                    var player = Entity.Player.GetInstance();
                    if (player != null) {
                        player.StartPassiveMoving(nDir);
                    }
                }
            }
        };
        Joy.prototype.OnJoyMouseUp = function () {
            this.m_joy.stopDrag();
            this.m_bJoyMove = false;
            this.m_joy.pos(this.m_OldPoint.x, this.m_OldPoint.y);
            var player = Entity.Player.GetInstance();
            if (player != null && this.m_bJoyMove) {
                player.StopAction();
            }
        };
        Joy.MOVEDIS = 5; //按住虚拟摇杆后的移动间距
        return Joy;
    }(ui.Main.joyUI));
    UI.Joy = Joy;
})(UI || (UI = {}));
//# sourceMappingURL=Joy.js.map