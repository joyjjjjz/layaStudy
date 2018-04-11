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
var GameMap;
(function (GameMap) {
    /**
 * 地图显示对象的基础类，地图中的物品、角色等对象都将继承此类
 * 当对象的地图坐标发生变化后，会自动在显示容器中重新排序
 * ★★★★ 父容器中的所有显示对象必须都是此类型或此类型的子类型，不得与其他类型的显示组件混合放在同一和显示容器中!
 * ★★★★ 排序的规则是：
 * 		Y坐标大的显示在前面，如果Y坐标相同则X坐标小的显示在前面，对于相同坐标的对象，排序等级越高的显示在前面
 * ★★★★ 不能使用addChild将此对象添加到显示容器中！
 * ★★★★ 必须使用addChildAt，其中索引通过调用函数calcDisplayIndex来计算
 * @author 后天 2017.9.30
 *
 */
    var MapDisplayObject = /** @class */ (function (_super) {
        __extends(MapDisplayObject, _super);
        function MapDisplayObject() {
            var _this = _super.call(this) || this;
            _this.m_nCurrentX = 0; //当前地图坐标X
            _this.m_nCurrentY = 0; //当前地图坐标Y
            _this.m_nSortLevel = 0; //对于处于同一坐标的排序优先级，优先级越大的越排到前面
            _this.m_nSortRowLevel = 0; //对于处于同坐标行（Row）的排序优先级，优先级越大的越排到前面，此优先级高于m_nShortLevel
            return _this;
        }
        MapDisplayObject.prototype.GetCurentX = function () {
            return this.m_nCurrentX;
        };
        MapDisplayObject.prototype.GetCurrentY = function () {
            return this.m_nCurrentY;
        };
        /**
                 * 设定当前坐标位置
                 * 会基于新的Y值在显示容器中重新排序
                 * @param X
                 * @param Y
                 *
                 */
        MapDisplayObject.prototype.SetCurrentXY = function (X, Y) {
            if (X != this.m_nCurrentX || Y != this.m_nCurrentY) {
                this.SortOnContainer(this.m_nCurrentX, X, this.m_nCurrentY, Y);
            }
            this.m_nCurrentX = X;
            this.m_nCurrentY = Y;
            //console.log("最终目标x:"+this.m_nCurrentX+"最终目标Y:"+this.m_nCurrentY);
            this.x = GameMap.CustomMap.MAPCELLUNITWIDTH * (X + 0.5);
            this.y = GameMap.CustomMap.MAPCELLUNITHEIGHT * (Y + 0.5);
        };
        /**
         * 状态处理函数，子类如果需要周期或循环性的处理某些逻辑则应当覆盖此函数
         * @param CurrentTick 当前系统运行时间
         *
         */
        MapDisplayObject.prototype.Update = function (nCurrentTick) {
        };
        /**
 * 计算在显示容器中的显示顺序
 * 此函数的设计初衷是向CustomRenderMap提供插入地图物体的索引值的计算功能
 * @param Container  显示容器
 * @return
 *
 */
        MapDisplayObject.prototype.CalcDisplayIndex = function (Container) {
            var nIndex = Container.numChildren - 1;
            var mapObj;
            //先基于Y坐标排序
            while (nIndex > -1) {
                mapObj = Container.getChildAt(nIndex);
                //使用<=判断，会终止在新的Y坐标行中的第一个对象的前面
                if (mapObj != null && mapObj.m_nCurrentY <= this.m_nCurrentY)
                    break;
                nIndex--;
            }
            //再基于X坐标排序
            //由于是终止在新的Y坐标行中的第一个对象的前面，
            //所以这里应当继续在同Y行中尝试向后移动，直到遇到Y坐标不同或X坐标大于等于自身X坐标的对象
            while (nIndex > -1) {
                mapObj = Container.getChildAt(nIndex);
                if (mapObj.m_nSortRowLevel < this.m_nSortRowLevel)
                    break;
                else if (mapObj.m_nSortRowLevel == this.m_nSortRowLevel) {
                    if (mapObj.m_nCurrentY != this.m_nCurrentY)
                        break;
                    if (mapObj.m_nCurrentX > this.m_nCurrentX)
                        break;
                    else if (mapObj.m_nCurrentX == this.m_nCurrentX) {
                        //对于相同位置的角色，优先级小的排列在后面
                        if (mapObj.m_nSortLevel <= this.m_nSortLevel)
                            break;
                    }
                }
                nIndex--;
            }
            return nIndex + 1;
        };
        /*********************************************
 * 以下为私有和保护函数
 ********************************************/
        /**
         * 基于自身的的地图坐标坐标在显示容器中排序
         * @param OldY
         * @param NewY
         *
         */
        MapDisplayObject.prototype.SortOnContainer = function (OldX, NewX, OldY, NewY) {
            var myParent = this.parent;
            if (!myParent)
                return;
            var mapObj;
            var nIndex, nOldIndex, nY;
            var nCount = myParent.numChildren;
            nOldIndex = myParent.getChildIndex(this);
            nIndex = nOldIndex;
            //Y坐标减少了，显示顺序应当向后移动
            if (NewY < OldY) {
                nIndex--;
                while (nIndex > -1) {
                    mapObj = myParent.getChildAt(nIndex);
                    //使用<=判断，会终止在新的Y坐标行中的第一个对象的前面
                    if (mapObj.m_nCurrentY <= NewY)
                        break;
                    nIndex--;
                }
                //由于是终止在新的Y坐标行中的第一个对象的前面，
                //所以这里应当继续在同Y行中尝试向后移动，直到遇到Y坐标不同或X坐标大于等于自身X坐标的对象
                while (nIndex > -1) {
                    mapObj = myParent.getChildAt(nIndex);
                    if (mapObj.m_nSortRowLevel < this.m_nSortRowLevel)
                        break;
                    else if (mapObj.m_nSortRowLevel == this.m_nSortRowLevel) {
                        if (mapObj.m_nCurrentY != NewY)
                            break;
                        if (mapObj.m_nCurrentX > NewX)
                            break;
                        else if (mapObj.m_nCurrentX == NewX) {
                            //对于相同位置的角色，优先级小的排列在后面
                            if (mapObj.m_nSortLevel <= this.m_nSortLevel)
                                break;
                        }
                    }
                    nIndex--;
                }
                nIndex++;
            }
            //Y坐标增加了，显示顺序应当向上移动
            else if (NewY > OldY) {
                nIndex++;
                while (nIndex < nCount) {
                    mapObj = myParent.getChildAt(nIndex);
                    //使用>=判断，会终止在新的Y坐标行中最后一个对象的后面
                    if (mapObj.m_nCurrentY >= NewY)
                        break;
                    nIndex++;
                }
                //由于是终止在新的Y坐标行中最后一个对象的后面，
                //所以这里应当继续在同Y行中尝试向前移动，直到遇到Y坐标不同或X坐标小于等于自身X坐标的对象
                while (nIndex < nCount) {
                    mapObj = myParent.getChildAt(nIndex);
                    if (mapObj.m_nSortRowLevel > this.m_nSortRowLevel)
                        break;
                    else if (mapObj.m_nSortRowLevel == this.m_nSortRowLevel) {
                        if (mapObj.m_nCurrentY != NewY)
                            break;
                        if (mapObj.m_nCurrentX < NewX)
                            break;
                        else if (mapObj.m_nCurrentX == NewX) {
                            //对于相同位置的角色，优先级小的排列在后面
                            if (mapObj.m_nSortLevel >= this.m_nSortLevel)
                                break;
                        }
                    }
                    nIndex++;
                }
                nIndex--;
            }
            //Y方向没有变化，X方向坐标减少了，显示顺序应当向前移动
            else if (NewX < OldX) {
                nIndex++;
                while (nIndex < nCount) {
                    mapObj = myParent.getChildAt(nIndex);
                    if (mapObj.m_nSortRowLevel > this.m_nSortRowLevel)
                        break;
                    else if (mapObj.m_nSortRowLevel == this.m_nSortRowLevel) {
                        if (mapObj.m_nCurrentY != NewY)
                            break;
                        if (mapObj.m_nCurrentX < NewX)
                            break;
                        else if (mapObj.m_nCurrentX == NewX) {
                            //对于相同位置的角色，优先级小的排列在后面
                            if (mapObj.m_nSortLevel >= this.m_nSortLevel)
                                break;
                        }
                    }
                    nIndex++;
                }
                nIndex--;
            }
            //Y方向没有变化，X方向坐标增加了，显示顺序应当向后移动
            else if (NewX > OldX) {
                nIndex--;
                while (nIndex > -1) {
                    mapObj = myParent.getChildAt(nIndex);
                    if (mapObj.m_nSortRowLevel < this.m_nSortRowLevel)
                        break;
                    else if (mapObj.m_nSortRowLevel == this.m_nSortRowLevel) {
                        if (mapObj.m_nCurrentY != NewY)
                            break;
                        if (mapObj.m_nCurrentX > NewX)
                            break;
                        else if (mapObj.m_nCurrentX == NewX) {
                            //对于相同位置的角色，优先级小的排列在后面
                            if (mapObj.m_nSortLevel <= this.m_nSortLevel)
                                break;
                        }
                    }
                    nIndex--;
                }
                nIndex++;
            }
            if (nIndex != nOldIndex) {
                myParent.setChildIndex(this, nIndex);
            }
        };
        return MapDisplayObject;
    }(Laya.Sprite));
    GameMap.MapDisplayObject = MapDisplayObject;
})(GameMap || (GameMap = {}));
//# sourceMappingURL=MapDisplayObject.js.map