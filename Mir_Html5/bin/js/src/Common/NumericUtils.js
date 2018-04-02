/**
 * 数字工具类
 * @author 后天 2017.9.28
 *
 */
var Common;
(function (Common) {
    var NumericUtils = /** @class */ (function () {
        function NumericUtils() {
        }
        /**
         * 将两个16位数据组合为一个32位数据
         * @param lo 低位
         * @param hi 高位
         * @return
         *
         */
        NumericUtils.MakeLong = function (lo, hi) {
            return (lo & 0xFFFF) | ((hi << 16) & 0xFFFF0000);
        };
        return NumericUtils;
    }());
    Common.NumericUtils = NumericUtils;
})(Common || (Common = {}));
//# sourceMappingURL=NumericUtils.js.map