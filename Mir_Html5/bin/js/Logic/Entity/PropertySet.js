/*
*   实体属性集合
*   @author 后天
*/
var Entity;
(function (Entity) {
    var PropertySet = /** @class */ (function () {
        function PropertySet() {
            this.m_ArrProp = [];
        }
        PropertySet.prototype.Clear = function () {
            this.m_ArrProp = [];
        };
        PropertySet.prototype.SetProperty = function (propType, value) {
            this.m_ArrProp[propType] = value;
        };
        PropertySet.prototype.GetIntProperty = function (propType) {
            if (this.m_ArrProp[propType] == null) {
                return 0;
            }
            return parseInt(this.m_ArrProp[propType].toString());
        };
        PropertySet.prototype.GetProperty = function (propType) {
            if (this.m_ArrProp[propType] == null) {
                return 0;
            }
            return this.m_ArrProp[propType];
        };
        PropertySet.prototype.GetPropertyToArray = function () {
            var ret = [];
            for (var i in this.m_ArrProp) {
                ret.push({ id: i, value: this.m_ArrProp[i] });
            }
            return ret;
        };
        PropertySet.prototype.ReadMultiProperty = function (nCount, pack) {
            for (var i = 0; i < nCount; i++) {
                var propId = pack.ReadUByte();
                this.ReadProperty(propId, pack);
            }
        };
        PropertySet.prototype.ReadProperty = function (propId, pack) {
            var type = Entity.ActorProperties.GetDataType(propId);
            switch (type) {
                case Entity.PropertyDataType.DOUBLE:
                    {
                        this.m_ArrProp[propId] = pack.ReadDouble();
                        break;
                    }
                case Entity.PropertyDataType.FLOAT:
                    {
                        this.m_ArrProp[propId] = pack.ReadFloat();
                        break;
                    }
                case Entity.PropertyDataType.INT:
                    {
                        this.m_ArrProp[propId] = pack.ReadInt32();
                        break;
                    }
                case Entity.PropertyDataType.STRING:
                    {
                        this.m_ArrProp[propId] = pack.ReadCustomString();
                        break;
                    }
                case Entity.PropertyDataType.UINT:
                    {
                        this.m_ArrProp[propId] = pack.ReadUInt32();
                        break;
                    }
                default:
                    {
                        throw new Error("ReadProperty error normal type" + type.toString());
                    }
            }
        };
        return PropertySet;
    }());
    Entity.PropertySet = PropertySet;
})(Entity || (Entity = {}));
//# sourceMappingURL=PropertySet.js.map