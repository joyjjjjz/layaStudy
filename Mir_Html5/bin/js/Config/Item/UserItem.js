var Config;
(function (Config) {
    var UserItem = /** @class */ (function () {
        function UserItem() {
            this._Series = 0; //道具唯一序列号
            this._wItemId = 0; //对应的标准物品ID
            this._btQuality = 0; //物品的品质等级
            this._btStrong = 0; //物品的强化等级
            this._btStrongLimit = 0; //物品的当前强化等级上限
            this._wDura = 0; //物品耐久度
            this._wDuraMax = 0; //物品的耐久度上限
            this._btHoles = new Array(); //物品的镶嵌槽列表
            this._btReserve1 = 0; //保留1
            this._wInsureTimes = 0; //装备投保次数
            this._Time = 0; //物品的使用时间
            this._smithAttrs = new Array(); //精锻属性表
            this._initAttrs = 0; //初始化属性
            this._btCount = 0; //此物品的数量，默认为1，当多个物品堆叠在一起的时候此值表示此沓物品的数量
            this._btFlag = 0; //物品标志，使用比特位标志物品的标志，例如绑定否
            this._btLuck = 0; //动态的幸运值或者诅咒值,祝福油加幸运，杀人减幸运
            this._btSmithCount = 0; //精锻度
            this._btDeportId = 0; //装备穿戴的位置
            this._btHandPos = 0; //是左右还是右手
            this._btSharp = 0; //锋利值
            this._btCircleForge = 0;
            this._wTypeValue = 0; //物品使用的冻结时间或者使用次数
            this._nAppraisal = 0; //物品的血炼等级
            this._btTheBestLevel = 0; //极品等级
            this._nSceneTag = 0; ////低十六位为场景id 高十六位为怪物id
            this._sActorName = ""; //道具第一次拥有者
            this._btTaoStrong = 0; //道士宝宝强化点
            this._nRealInjury = 0; //	对实体造成的真实伤害
            this._btReserve = 0; //用于追踪内存的使用，防止内存2次释放
        }
        UserItem.prototype.DeSerialize = function (pack) {
            this._Series = pack.ReadDouble();
            this._wItemId = pack.ReadInt32();
            this._btQuality = pack.ReadUByte();
            this._btStrong = pack.ReadUByte();
            this._btStrongLimit = pack.ReadUByte();
            this._wDura = pack.ReadUInt16();
            this._wDuraMax = pack.ReadUInt16();
            for (var i = 0; i < UserItem.MaxItemHole; i++) {
                this._btHoles.push(pack.ReadUByte());
            }
            this._btReserve1 = pack.ReadUByte();
            this._wInsureTimes = pack.ReadUInt16();
            this._Time = pack.ReadUInt32();
            for (var i = 0; i < UserItem.MaxSmithAttrCount; i++) {
                this._smithAttrs.push(pack.ReadInt32());
            }
            this._initAttrs = pack.ReadInt32();
            this._btCount = pack.ReadUByte();
            this._btFlag = pack.ReadUByte();
            this._btLuck = pack.ReadUByte();
            this._btSmithCount = pack.ReadUInt16();
            this._btDeportId = pack.ReadUByte();
            this._btHandPos = pack.ReadByte();
            this._btSharp = pack.ReadByte();
            this._btCircleForge = pack.ReadByte();
            this._wTypeValue = pack.ReadUInt16();
            this._nAppraisal = pack.ReadUInt32();
            this._btTheBestLevel = pack.ReadByte();
            this._nSceneTag = pack.ReadUInt32();
            this._sActorName = pack.ReadCustomString();
            this._btTaoStrong = pack.ReadByte();
            this._nRealInjury = pack.ReadUInt32();
            this._btReserve = pack.ReadByte();
        };
        UserItem.MaxItemHole = 5; //物品的最大镶嵌槽
        UserItem.MaxSmithAttrCount = 3; //最大精锻属性个数
        UserItem.ACTOR_NAME_BUFF_LENGTH = 33; //最大名称数量
        return UserItem;
    }());
    Config.UserItem = UserItem;
})(Config || (Config = {}));
//# sourceMappingURL=UserItem.js.map