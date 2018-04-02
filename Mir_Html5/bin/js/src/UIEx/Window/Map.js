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
    var Map = /** @class */ (function (_super) {
        __extends(Map, _super);
        function Map() {
            var _this = _super.call(this) || this;
            _this.m_ImageMap = null;
            _this.m_PathSprite = null;
            _this.on(Laya.Event.ADDED, _this, _this.OnLoaded);
            _this.on(Laya.Event.REMOVED, _this, _this.OnRemove);
            return _this;
        }
        Map.prototype.OnLoaded = function () {
            this.m_btn_close.on(Laya.Event.CLICK, this, this.OnBtnClose);
            this.m_list_npc.array = [];
            var nMapId = GameMap.CustomGameMap.GetInstance().GetMapId();
            this.m_arrNpc = Config.ConfigManager.GetInstance().GetNpcConfig().GetMapAllNpc(nMapId);
            if (this.m_arrNpc.length > 0) {
                var arr = new Array();
                for (var i = 0; i < this.m_arrNpc.length; i++) {
                    arr.push({ label: { text: this.m_arrNpc[i]._szName }, });
                }
                this.m_list_npc.array = arr;
            }
            this.m_list_npc.on(Laya.Event.CLICK, this, this.onListNpcClick);
            this.m_ImageMap = Resources.ResourcesManager._Instance.GetMiniMapImage(GameMap.CustomGameMap.GetInstance().GetmapFile());
            this.m_image_bg.addChild(this.m_ImageMap);
            this.m_image_bg.on(Laya.Event.CLICK, this, this.onMiniMapImageClick);
            //路径点精灵
            if (this.m_PathSprite == null) {
                this.m_PathSprite = new Laya.Sprite();
            }
            this.m_image_bg.addChild(this.m_PathSprite);
            Laya.timer.loop(500, this, this.onDrawPathPoint);
        };
        Map.prototype.OnRemove = function () {
            this.m_list_npc.array = [];
            this.m_arrNpc = null;
            this.m_btn_close.off(Laya.Event.CLICK, this, this.OnBtnClose);
            this.m_list_npc.off(Laya.Event.CLICK, this, this.onListNpcClick);
            if (this.m_ImageMap != null) {
                this.m_ImageMap.removeSelf();
                this.m_image_bg.off(Laya.Event.CLICK, this, this.onMiniMapImageClick);
                this.m_ImageMap = null;
            }
            Laya.timer.clear(this, this.onDrawPathPoint);
            this.m_PathSprite.removeSelf();
            //清除路径点
            this.m_PathSprite.graphics.clear();
        };
        Map.prototype.onListNpcClick = function (e) {
            var nIndex = this.m_list_npc.selectedIndex;
            if (nIndex >= 0 && nIndex < this.m_arrNpc.length) {
                var play = Entity.Player.GetInstance();
                if (play != null) {
                    var pStdNpc = this.m_arrNpc[nIndex];
                    play.AutoFindPath(pStdNpc._nX, pStdNpc._nY, pStdNpc);
                }
            }
        };
        Map.prototype.onMiniMapImageClick = function (e, ees) {
            if (this.m_ImageMap.texture == null) {
                return;
            }
            var pGameMap = GameMap.CustomGameMap.GetInstance();
            var nMapWidth = pGameMap.GetMapWidth();
            var nMapHeight = pGameMap.GetMapHeight();
            var fRateX = this.m_ImageMap.texture.width / nMapWidth;
            var fRateY = this.m_ImageMap.texture.height / nMapHeight;
            var point = new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY);
            point = this.m_ImageMap.globalToLocal(point, false);
            var nX = parseInt((point.x / fRateX).toString());
            var nY = parseInt((point.y / fRateY).toString());
            if (pGameMap.Moveable(nX, nY)) {
                var pStdNpc = Config.ConfigManager.GetInstance().GetNpcConfig().GetMapNpcByXY(pGameMap.GetMapId(), nX, nY);
                var pPlayer = Entity.Player.GetInstance();
                if (pPlayer != null) {
                    pPlayer.AutoFindPath(nX, nY, pStdNpc);
                }
            }
        };
        Map.prototype.OnBtnClose = function () {
            UI.UIManager.GetInstance().HideDialog(UI.UIDialogID.Map);
        };
        //绘制寻路路径点
        Map.prototype.onDrawPathPoint = function () {
            this.m_PathSprite.graphics.clear();
            var pPlayer = Entity.Player.GetInstance();
            if (pPlayer != null && this.m_ImageMap.texture != null) {
                var pGameMap = GameMap.CustomGameMap.GetInstance();
                var nMapWidth = pGameMap.GetMapWidth();
                var nMapHeight = pGameMap.GetMapHeight();
                var fRateX = this.m_ImageMap.texture.width / nMapWidth;
                var fRateY = this.m_ImageMap.texture.height / nMapHeight;
                var listAutoPath = pPlayer.GetAutoPath();
                if (listAutoPath != null) {
                    for (var i = 0; i < listAutoPath.length; i++) {
                        var point = listAutoPath[i];
                        var nX = parseInt((fRateX * point.x).toString());
                        var nY = parseInt((fRateY * point.y).toString());
                        this.m_PathSprite.graphics.drawCircle(nX, nY, 1, "#00ffff");
                    }
                }
            }
        };
        return Map;
    }(ui.Window.MapUI));
    UI.Map = Map;
})(UI || (UI = {}));
//# sourceMappingURL=Map.js.map