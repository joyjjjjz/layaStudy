/**
 * A星寻路
 * @author 后天 2017.10.4
 */
var GameMap;
(function (GameMap) {
    var TTree = /** @class */ (function () {
        function TTree() {
            this.nH = 0;
            this.nX = 0;
            this.nY = 0;
            this.nDir = 0;
            this.Father = null;
        }
        return TTree;
    }());
    var TLink = /** @class */ (function () {
        function TLink() {
            this.node = null;
            this.next = null;
            this.nF = 0;
        }
        return TLink;
    }());
    var MaskInfo = /** @class */ (function () {
        function MaskInfo() {
        }
        MaskInfo.MASK_FLAG_OPEN = 1;
        MaskInfo.MASK_FLAG_CLOSE = 0;
        MaskInfo.MASK_TYPE_MAP = 1;
        MaskInfo.MASK_TYPE_MONSTER = 2;
        return MaskInfo;
    }());
    GameMap.MaskInfo = MaskInfo;
    var MapPath = /** @class */ (function () {
        function MapPath(nWidth, nHeight) {
            this.m_nWidth = 0; //宽度
            this.m_nHeight = 0; //高度
            this.m_MapData = [];
            this.m_PassPoint = [];
            this.m_Queue = new TLink();
            this.m_nWidth = nWidth;
            this.m_nHeight = nHeight;
            for (var i = 0; i < this.m_nWidth * this.m_nHeight; i++) {
                var pMaskInfo = new MaskInfo();
                pMaskInfo._nFlag = MaskInfo.MASK_FLAG_OPEN;
                pMaskInfo._bType = 0;
                this.m_MapData.push(pMaskInfo);
                this.m_PassPoint.push(0);
            }
        }
        MapPath.prototype.Destory = function () {
            this.m_MapData = [];
            this.m_PassPoint = [];
        };
        MapPath.prototype.SetPointMaskByIndex = function (nIndex, nTag, nType) {
            this.m_MapData[nIndex]._bType = nType;
            this.m_MapData[nIndex]._nFlag = nTag;
        };
        MapPath.prototype.SetPointMask = function (nX, nY, nTag, nType) {
            if (nX < 0 || nY < 0) {
                return;
            }
            if (nX >= this.m_nWidth || nY >= this.m_nHeight) {
                return;
            }
            var pMaskInfo = this.GetMaskInfo(nX, nY);
            //地图阻挡是不会动态改变的
            if (pMaskInfo._bType == MaskInfo.MASK_TYPE_MAP) {
                return;
            }
            pMaskInfo._nFlag = nTag;
            pMaskInfo._bType = nType;
        };
        MapPath.prototype.GetMaskInfo = function (nX, nY) {
            return this.m_MapData[nY * this.m_nWidth + nX];
        };
        MapPath.prototype.GetFromQueue = function () {
            var bestchoice;
            var Next;
            bestchoice = this.m_Queue.next.node;
            Next = this.m_Queue.next.next;
            this.m_Queue.next = null;
            this.m_Queue.next = Next;
            return bestchoice;
        };
        MapPath.prototype.InitQueue = function () {
            this.m_Queue = new TLink();
            this.m_Queue.node = null;
            this.m_Queue.nF = -1;
            this.m_Queue.next = new TLink();
            this.m_Queue.next.nF = 0xfffffff;
            this.m_Queue.next.node = null;
            this.m_Queue.next.next = null;
        };
        MapPath.prototype.EnterQueue = function (node, nf) {
            var p = this.m_Queue;
            var Father = p;
            while (nf > p.nF) {
                Father = p;
                p = p.next;
                if (p == null)
                    break;
            }
            var q = new TLink();
            q.nF = nf;
            q.node = node;
            q.next = p;
            Father.next = q;
        };
        // 估价函数,估价 x,y 到目的地的距离,估计值必须保证比实际值小		
        MapPath.prototype.Judge = function (nX, nY, nEndX, nEndY) {
            var x = nEndX - nX;
            var y = nEndY - nY;
            return Math.abs(x) + Math.abs(y);
        };
        MapPath.prototype.FindPath = function (nScrX, nSrcY, nDestX, nDestY) {
            if (this.GetMaskInfo(nDestX, nDestY)._nFlag == MaskInfo.MASK_FLAG_CLOSE) {
                return null;
            }
            for (var i = 0; i < this.m_PassPoint.length; i++) {
                this.m_PassPoint[i] = 0xFFFFFFFF;
            }
            this.InitQueue();
            var root = new TTree();
            root.nX = nScrX;
            root.nY = nSrcY;
            root.nH = 0;
            root.Father = null;
            this.EnterQueue(root, this.Judge(nScrX, nSrcY, nDestX, nDestY));
            var nEndx = nDestX;
            var nEndy = nDestY;
            var ii = 0;
            var nIndex = 0;
            var bTry = false;
            while (true) {
                root = this.GetFromQueue(); //将第一个弹出
                ii++;
                if (ii == 86610)
                    ii = 0;
                if (root == null)
                    break;
                nIndex++;
                var x = root.nX;
                var y = root.nY;
                if (x == nEndx && y == nEndy) {
                    break;
                }
                bTry = false;
                if (this.Trytile(x, y - 1, nEndx, nEndy, root, 0))
                    bTry = true; //尝试向上移动
                if (this.Trytile(x + 1, y - 1, nEndx, nEndy, root, 1))
                    bTry = true; //尝试向右上移动
                if (this.Trytile(x + 1, y, nEndx, nEndy, root, 2))
                    bTry = true; //尝试向右移动
                if (this.Trytile(x + 1, y + 1, nEndx, nEndy, root, 3))
                    bTry = true; //尝试向右下移动
                if (this.Trytile(x, y + 1, nEndx, nEndy, root, 4))
                    bTry = true; //尝试向下移动
                if (this.Trytile(x - 1, y + 1, nEndx, nEndy, root, 5))
                    bTry = true; //尝试向左下移动
                if (this.Trytile(x - 1, y, nEndx, nEndy, root, 6))
                    bTry = true; //尝试向左移动
                if (this.Trytile(x - 1, y - 1, nEndx, nEndy, root, 7))
                    bTry = true; //尝试向左上移动
            }
            if (root == null)
                return null;
            var ret = [];
            //起始坐标点不放进去
            var temp = new Laya.Point(root.nX, root.nY);
            ret.push(temp);
            var p = root;
            root = root.Father;
            while (root != null) {
                temp = new Laya.Point(root.nX, root.nY);
                ret.push(temp);
                root = root.Father;
            }
            return ret;
        };
        // 尝试下一步移动到 x,y 可行否
        MapPath.prototype.Trytile = function (x, y, end_x, end_y, father, dir) {
            var p;
            var h;
            var Result = false;
            if (x >= this.m_nWidth || y >= this.m_nHeight || x < 0 || y < 0) {
                return Result;
            }
            if (this.GetMaskInfo(x, y)._nFlag == MaskInfo.MASK_FLAG_CLOSE) {
                return Result;
            }
            p = father;
            while (p != null) {
                if (x == p.nX && y == p.nY) {
                    return false;
                }
                p = p.Father;
            }
            if (dir == 0 || dir == 2 || dir == 4 || dir == 6) {
                h = father.nH + 10;
            }
            else {
                h = father.nH + 14;
            }
            if (h >= this.m_PassPoint[x * this.m_nHeight + y]) {
                return false; //// 如果曾经有更好的方案移动到 (x,y) 失败
            }
            this.m_PassPoint[x * this.m_nHeight + y] = h; // 记录这次到 (x,y) 的距离为历史最佳距离
            p = new TTree();
            p.Father = father;
            p.nH = h;
            p.nX = x;
            p.nY = y;
            p.nDir = dir;
            this.EnterQueue(p, p.nH + this.Judge(x, y, end_x, end_y));
            return true;
        };
        return MapPath;
    }());
    GameMap.MapPath = MapPath;
})(GameMap || (GameMap = {}));
//# sourceMappingURL=MapPath.js.map