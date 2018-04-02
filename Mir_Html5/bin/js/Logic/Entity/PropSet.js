/*
*   实体属性集合
*   @author 后天
*/
var Entity;
(function (Entity) {
    var PropSet = /** @class */ (function () {
        function PropSet() {
            this.m_ArrProp = [];
        }
        PropSet.prototype.SetProperty = function (propType, value) {
            this.m_ArrProp[propType] = value;
        };
        PropSet.prototype.GetIntProperty = function (propType) {
            if (this.m_ArrProp[propType] == null) {
                return 0;
            }
            return parseInt(this.m_ArrProp[propType].toString());
        };
        PropSet.prototype.GetProperty = function (propType) {
            if (this.m_ArrProp[propType] == null) {
                return 0;
            }
            return this.m_ArrProp[propType];
        };
        return PropSet;
    }());
    Entity.PropSet = PropSet;
})(Entity || (Entity = {}));
//# sourceMappingURL=PropSet.js.map