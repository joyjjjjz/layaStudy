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
//实体出现怪物
//@author 后天 2017.10.9
var ClientMsgPack;
(function (ClientMsgPack) {
    var LogicPack;
    (function (LogicPack) {
        var EntityAppearMonsterMsgPack = /** @class */ (function (_super) {
            __extends(EntityAppearMonsterMsgPack, _super);
            function EntityAppearMonsterMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._bType = 0; //实体类型
                _this._bRace = 0; //实体种族
                _this._Handle = 0; //实体句柄
                _this._szName = ""; //实体名称
                _this._nX = 0; //坐标X
                _this._nY = 0; //坐标Y
                _this._nModelID = 0; //模型ID
                _this._bDir = 0; //方向
                _this._bLevel = 0; //等级
                _this._nHP = 0; //血量
                _this._nMP = 0; //魔法
                _this._nMaxHP = 0; //最大血量
                _this._nMaxMP = 0; //最大魔法
                _this._nMoveSpeed = 0; //移动速度
                _this._nAttackSpeed = 0; //攻击速度
                _this._nState = 0; //状态
                _this._nColor = 0; //颜色
                _this._nLookColor = 0;
                _this._bMonsterType = 0; //怪物类型
                _this._nMonsterID = 0; //怪物id 
                _this._bTitle = 0; //头衔
                _this._bHitPause = 0; //怪物的官职和攻击类型
                _this._ListEffect = new Array(); //特效
                return _this;
            }
            EntityAppearMonsterMsgPack.prototype.DeSerialize = function (pack) {
                this._bType = pack.ReadUByte();
                this._bRace = pack.ReadUByte();
                this._Handle = pack.ReadDouble();
                this._szName = pack.ReadCustomString();
                this._nX = pack.ReadUInt16();
                this._nY = pack.ReadUInt16();
                this._nModelID = pack.ReadInt32();
                this._bDir = pack.ReadUByte();
                this._bLevel = pack.ReadUByte();
                this._nHP = pack.ReadUInt32();
                this._nMP = pack.ReadUInt32();
                this._nMaxHP = pack.ReadUInt32();
                this._nMaxMP = pack.ReadUInt32();
                this._nMoveSpeed = pack.ReadUInt16();
                this._nAttackSpeed = pack.ReadUInt16();
                this._nState = pack.ReadInt32();
                this._nColor = pack.ReadUInt32();
                this._nLookColor = pack.ReadUInt32();
                this._bMonsterType = pack.ReadUByte();
                this._nMonsterID = pack.ReadInt32();
                this._bTitle = pack.ReadUByte();
                this._bHitPause = pack.ReadUByte();
                var nEffCount = pack.ReadUByte();
                for (var i = 0; i < nEffCount; i++) {
                    var pEff = new ClientMsgPack.EffectInfoMsgPack();
                    pEff.DeSerialize(pack);
                    this._ListEffect.push(pEff);
                }
            };
            return EntityAppearMonsterMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LogicPack.EntityAppearMonsterMsgPack = EntityAppearMonsterMsgPack;
    })(LogicPack = ClientMsgPack.LogicPack || (ClientMsgPack.LogicPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=EntityAppearMonsterMsgPack.js.map