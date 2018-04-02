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
 * 游戏地图操作类，游戏中实际可用的地图类
 * @author 后天 2017.9.29
 *
 */
var GameMap;
(function (GameMap) {
    var CustomGameMap = /** @class */ (function (_super) {
        __extends(CustomGameMap, _super);
        function CustomGameMap() {
            var _this = _super.call(this) || this;
            _this.m_MoveTargetPos = null; //移动的目的地坐标，为null表示当前不在移动中
            _this.m_nMoveDir = 0; //移动的方向
            _this.m_nMoveStartTick = 0; //开始移动的时间
            _this.m_nMoveEndTick = 0; //移动完成的时间
            _this.m_dMoveSpeedH = 0; //水平方向的移动速度（每毫秒移动多少像素)
            _this.m_dMoveSpeedV = 0; //竖直方向的移动速度（每毫秒移动多少像素)
            _this.m_sMapName = ""; //地图名称
            _this.m_nMapID = 0; //地图id
            _this.m_szMapFile = ""; //地图路径
            //场景层特效
            _this.m_EffectLayer = new Laya.Sprite();
            _this.m_MapLayerRoot.addChild(_this.m_EffectLayer);
            _this.m_ArrEffect = new Array();
            return _this;
        }
        CustomGameMap.Init = function () {
            CustomGameMap._Instance = new CustomGameMap();
        };
        CustomGameMap.GetInstance = function () {
            return CustomGameMap._Instance;
        };
        CustomGameMap.prototype.LoadMap = function (szMapFile, szMapName, nMapId) {
            this.m_sMapName = szMapName;
            this.m_nMapID = nMapId;
            this.m_szMapFile = szMapFile;
            var assat = [];
            assat.push({
                url: Config.GlobalConfig._Instance._szUrl + szMapFile,
                type: Laya.Loader.BUFFER,
            });
            Laya.loader.load(assat, Laya.Handler.create(this, this.OnLoadMap));
        };
        CustomGameMap.prototype.GetMapId = function () {
            return this.m_nMapID;
        };
        CustomGameMap.prototype.GetmapFile = function () {
            return this.m_szMapFile;
        };
        CustomGameMap.prototype.OnLoadMap = function () {
            var data = Laya.loader.getRes(Config.GlobalConfig._Instance._szUrl + this.m_szMapFile);
            var bytes = new Laya.Byte(data);
            this.Load(bytes);
            var pPlayer = Entity.Player.GetInstance();
            this.SetCurrentPosition(pPlayer.GetCurentX(), pPlayer.GetCurrentY());
        };
        /**
         *	地图移动等操作的更新函数
         * 	周期性的处理或移动等操作必须由使用者调用update函数当做事件驱动来执行更新
         * @param CurrentTick 当前系统运行时间
         */
        CustomGameMap.prototype.Update = function (CurrentTick) {
            //如果移动的目的坐标存在，则处理移动或完成移动
            if (this.m_MoveTargetPos != null) {
                //仍在移动
                if (CurrentTick < this.m_nMoveEndTick) {
                    this.ProcessMove(CurrentTick);
                }
                else {
                    //完成移动
                    this.EndMove();
                }
            }
            //更新特效
            for (var i = this.m_ArrEffect.length - 1; i > 0; i--) {
                var pAni = this.m_ArrEffect[i];
                pAni.Update(CurrentTick);
                if (pAni.parent == null) {
                    this.m_ArrEffect.splice(i, 1);
                }
            }
        };
        /**
         * 覆盖函数——设置当前中心位置的X和Y坐标
         * @param x
         * @param y
         *
         */
        CustomGameMap.prototype.SetCurrentPosition = function (x, y) {
            //如果正在移动则首先停止移动
            if (this.m_MoveTargetPos != null) {
                this.EndMove();
            }
            _super.prototype.SetCurrentPosition.call(this, x, y);
        };
        /**
         *使地图向x,y坐标以speed速度移动
         * @param x, y	移动的目的坐标
         * @param speed	移动的速度，指在多少毫秒内完成移动
         *
         */
        CustomGameMap.prototype.MoveTo = function (x, y, speed) {
            if (this.m_MoveTargetPos != null) {
                return;
            }
            //计算移动后的目标位置
            if (x < 0 || y < 0 || x >= this.m_nWidth || y >= this.m_nHeight) {
                throw new Error("无法将地图向(" + x + "," + y + ")位置移动");
            }
            this.m_MoveTargetPos = new Laya.Point(x, y);
            this.m_nMoveDir = GameMap.CustomMap.CalcForwardDirection(this.m_nCurrentX, this.m_nCurrentY, x, y);
            this.m_nMoveStartTick = Config.GlobalConfig.s_dwUpdateTick;
            this.m_nMoveEndTick = this.m_nMoveStartTick + speed;
            //计算水平和竖直方向移动的速度
            this.m_dMoveSpeedH = (this.m_nCurrentX - x) * GameMap.CustomMap.MAPCELLUNITWIDTH / speed;
            this.m_dMoveSpeedV = (this.m_nCurrentY - y) * GameMap.CustomMap.MAPCELLUNITHEIGHT / speed;
        };
        /**
         *使地图向direction方向移动step坐标
         * @param direction	移动的方向，游戏具有8个方向，0点钟方向为0方向，6点钟方向为4方向，以此类推
         * @param step	移动的距离，单位是坐标，移动的距离必须小于4坐标
         * @param speed	移动的速度，指在多少毫秒内完成移动
         *
         */
        CustomGameMap.prototype.MoveBy = function (direction, step, speed) {
            if (step <= 0 || step > 3) {
                throw new Error("移动的距离超出最大设计范围:" + step);
            }
            if (this.m_MoveTargetPos != null) {
                return;
            }
            //计算移动后的目标位置
            this.m_MoveTargetPos = GameMap.CustomMap.CalcForwardPosition(this.m_nCurrentX, this.m_nCurrentY, direction, step);
            //console.log("mapx:"+this.m_MoveTargetPos.x+"mapy:"+this.m_MoveTargetPos.y);
            if (this.m_MoveTargetPos.x < 0 || this.m_MoveTargetPos.y < 0 ||
                this.m_MoveTargetPos.x >= this.m_nWidth || this.m_MoveTargetPos.y >= this.m_nHeight) {
                throw new Error("无法将地图向" + direction + "方向移动" + step);
            }
            this.m_nMoveDir = direction;
            this.m_nMoveStartTick = Config.GlobalConfig.s_dwUpdateTick;
            this.m_nMoveEndTick = this.m_nMoveStartTick + speed;
            //计算水平和竖直方向移动的速度
            this.m_dMoveSpeedH = (this.m_nCurrentX - this.m_MoveTargetPos.x) * GameMap.CustomMap.MAPCELLUNITWIDTH / speed;
            this.m_dMoveSpeedV = (this.m_nCurrentY - this.m_MoveTargetPos.y) * GameMap.CustomMap.MAPCELLUNITHEIGHT / speed;
        };
        /**
         * 停止场景移动
         *
         */
        CustomGameMap.prototype.StopMove = function () {
            this.EndMove();
        };
        /**
         *完成移动，将当前坐标设置为m_MoveTargetPos并将m_MoveTargetPos设为null;
         *
         */
        CustomGameMap.prototype.EndMove = function () {
            if (this.m_MoveTargetPos != null) {
                //要使用一个中间变量保存m_MoveTargetPos并将m_MoveTargetPos置空
                //放置在调用setCurrentPosition后再次调用endMove造成死递归
                var targetPos = this.m_MoveTargetPos;
                this.m_MoveTargetPos = null;
                this.SetCurrentPosition(targetPos.x, targetPos.y);
            }
        };
        /******************************************************************
         *
         * 以下函数均为似有和保护函数
         *
         * ***************************************************************/
        /**
         *	处理移动过程
         * @param CurrentTick 当前时间
         */
        CustomGameMap.prototype.ProcessMove = function (CurrentTick) {
            var nMovedTick = CurrentTick - this.m_nMoveStartTick; //计算得已移动的时间
            var nXMoved = this.m_dMoveSpeedH * nMovedTick;
            var nYMoved = this.m_dMoveSpeedV * nMovedTick;
            var offx = -this.m_nCurrentX * GameMap.CustomMap.MAPCELLUNITWIDTH + nXMoved;
            var offy = -this.m_nCurrentY * GameMap.CustomMap.MAPCELLUNITHEIGHT + nYMoved;
            offx = Math.ceil(offx);
            offy = Math.ceil(offy);
            this.SetLayersPosition(offx, offy);
        };
        CustomGameMap.prototype.GetGlobalPoint = function (x, y) {
            var point = new Laya.Point(x, y);
            this.m_MapLayerRoot.localToGlobal(point);
            return point;
        };
        CustomGameMap.prototype.AddEffect = function (nEffId, type, nX, nY, nDuration) {
            var pEffect = null;
            var pack = Resources.ResourcesManager._Instance.GetSkillEffectPackage(nEffId);
            //特效并没有加载完成
            if (pack.GetFrameCount() <= 0) {
                return;
            }
            switch (type) {
                case Config.EffectType.meKeepOnBody:
                case Config.EffectType.meKeepOnFeet:
                case Config.EffectType.meExplode:
                    {
                        var nStartFrame = 0;
                        var nEndFrame = pack.GetFrameCount();
                        pEffect = new Common.Animation(pack, nStartFrame, nEndFrame, 0, 1);
                        break;
                    }
            }
            if (pEffect != null) {
                this.m_EffectLayer.addChild(pEffect);
                pEffect.x = (nX + 0.5) * GameMap.CustomMap.MAPCELLUNITWIDTH;
                pEffect.y = (nY + 0.5) * GameMap.CustomMap.MAPCELLUNITHEIGHT;
                this.m_ArrEffect.push(pEffect);
                //播放音效
                var pStdEffect = Config.ConfigManager.GetInstance().GetEffectConfig().GetEffectByID(nEffId);
                if (pStdEffect != null && pStdEffect._nSoundId > 0) {
                    SoundManager.GetInstance().PlayEffectSound(pStdEffect._nSoundId);
                }
            }
        };
        CustomGameMap._Instance = null;
        return CustomGameMap;
    }(GameMap.CustomRenderMap));
    GameMap.CustomGameMap = CustomGameMap;
})(GameMap || (GameMap = {}));
//# sourceMappingURL=CustomGameMap.js.map