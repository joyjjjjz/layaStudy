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
//其他角色实体出现
var ClientMsgPack;
(function (ClientMsgPack) {
    var LogicPack;
    (function (LogicPack) {
        var EntityAppearActorMsgPack = /** @class */ (function (_super) {
            __extends(EntityAppearActorMsgPack, _super);
            function EntityAppearActorMsgPack() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._Handle = 0; //实体句柄
                _this._szName = ""; //实体名称
                _this._bTransport = 0; //是否是传送显示 默认为0
                _this._nX = 0; //x坐标
                _this._nY = 0; //Y坐标
                _this._nModelID = 0; //模型ID
                _this._nHP = 0; //当前血量
                _this._nMP = 0; //当前魔法
                _this._nMaxHP = 0; //最大血量
                _this._nMaxMP = 0; //最大魔法
                _this._nInner = 0; //当前内功值
                _this._nMaxInner = 0; //最大内功值
                _this._nMoveSpeed = 0; //移动速度
                _this._bSex = 0; //性别
                _this._bVocation = 0; //职业
                _this._bLevel = 0; //等级
                _this._nCircle = 0; //转生等级
                _this._nApotheoLevel = 0; //封神等级
                _this._nWeaponApr = 0; //武器外观
                _this._nMountApr = 0; //坐骑外观
                _this._nSwingApr = 0; //翅膀外观
                _this._nMagicItemID = 0; //法宝外观ID
                _this._nFootPrint = 0; //足迹斗笠外观
                _this._nSocialMask = 0; //社会关系
                _this._nIconID = 0; //头像ID
                _this._nAttackSpeed = 0; //攻击速度
                _this._bDir = 0; //方向
                _this._nState = 0; //状态
                _this._bCurTitle = 0; //玩家称号
                _this._nVipLevel = 0; //VIP等级
                _this._nTeamID = 0; //队伍ID
                _this._nCampID = 0; //阵营ID
                _this._nHeadTitle = 0; //头衔
                _this._nMountLevel = 0; //坐骑等级
                _this._nMountID = 0; //坐骑ID
                _this._nCurrentHeadTitle = 0; //当前称号
                _this._nOffice = 0; //官职
                _this._nLookNameColor = 0; //观察者名字颜色
                _this._nColor = 0; //名称颜色
                _this._nWardrobe = 0; //衣橱
                _this._bShowMaked = 0; //蒙面巾
                _this._nTitleID = 0; //头衔ID 第二个头衔
                _this._nAreaEffectID = 0; //区域特效ID
                _this._nLeftSpecialRing = 0; //左特戒ID
                _this._nRightSpecialRing = 0; //右特戒ID
                _this._bGuildType = 0; //行会关系
                return _this;
            }
            EntityAppearActorMsgPack.prototype.DeSerialize = function (pack) {
                this._Handle = pack.ReadDouble();
                this._szName = pack.ReadCustomString();
                this._bTransport = pack.ReadByte();
                this._nX = pack.ReadUInt16();
                this._nY = pack.ReadUInt16();
                this._nModelID = pack.ReadInt32();
                this._nHP = pack.ReadUInt32();
                this._nMP = pack.ReadUInt32();
                this._nMaxHP = pack.ReadUInt32();
                this._nMaxMP = pack.ReadUInt32();
                this._nInner = pack.ReadUInt32();
                this._nMaxInner = pack.ReadUInt32();
                this._nMoveSpeed = pack.ReadUInt16();
                this._bSex = pack.ReadUByte();
                this._bVocation = pack.ReadUByte();
                this._bLevel = pack.ReadUByte();
                this._nCircle = pack.ReadUInt32();
                this._nApotheoLevel = pack.ReadUInt32();
                this._nWeaponApr = pack.ReadUInt32();
                this._nMountApr = pack.ReadUInt32();
                this._nSwingApr = pack.ReadUInt32();
                this._nMagicItemID = pack.ReadUInt32();
                this._nFootPrint = pack.ReadUInt32();
                this._nSocialMask = pack.ReadUInt32();
                this._nIconID = pack.ReadUInt16();
                this._nAttackSpeed = pack.ReadUInt16();
                this._bDir = pack.ReadUByte();
                this._nState = pack.ReadUInt32();
                this._bCurTitle = pack.ReadUByte();
                this._nVipLevel = pack.ReadUInt32();
                this._nTeamID = pack.ReadUInt32();
                this._nCampID = pack.ReadUByte();
                this._nHeadTitle = pack.ReadUInt32();
                this._nMountLevel = pack.ReadUInt32();
                this._nMountID = pack.ReadUInt32();
                this._nCurrentHeadTitle = pack.ReadUInt32();
                this._nOffice = pack.ReadUInt32();
                this._nLookNameColor = pack.ReadUInt32();
                this._nColor = pack.ReadUInt32();
                this._nWardrobe = pack.ReadUInt32();
                this._bShowMaked = pack.ReadUByte();
                this._nTitleID = pack.ReadUInt32();
                this._nAreaEffectID = pack.ReadUInt32();
                this._nLeftSpecialRing = pack.ReadUInt16();
                this._nRightSpecialRing = pack.ReadUInt16();
                this._bGuildType = pack.ReadUByte();
            };
            return EntityAppearActorMsgPack;
        }(ClientMsgPack.BaseMsgPack));
        LogicPack.EntityAppearActorMsgPack = EntityAppearActorMsgPack;
    })(LogicPack = ClientMsgPack.LogicPack || (ClientMsgPack.LogicPack = {}));
})(ClientMsgPack || (ClientMsgPack = {}));
//# sourceMappingURL=EntityAppearActorMsgPack.js.map