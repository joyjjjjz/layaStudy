var Common;
(function (Common) {
    /*
    * CRC16加解密
    * @author 后天 1027.10.3
    */
    var CRC16 = /** @class */ (function () {
        function CRC16() {
        }
        CRC16.MakeCrcTable = function () {
            var c = 0;
            var crcTable = [];
            for (var i = 0; i < 256; i++) {
                c = ((i << 8) & 0xFFFFFF00);
                for (var j = 0; j < 8; j++) {
                    c = (c & 0x8000) > 0 ? ((c << 1) & 0xFFFFFFFE) ^ CRC16.POLYNOMIAL : ((c << 1) & 0xFFFFFFFE);
                }
                crcTable[i] = c;
            }
            return crcTable;
        };
        CRC16.CRCBitReflect = function (pInput, pBits) {
            var x = 0;
            pBits--;
            var result = 0;
            for (var i = 0; i <= pBits; i++) {
                x = pBits - i;
                if ((pInput & 1) > 0) {
                    result |= (1 << x) & CRC16.DropBits[x];
                }
                pInput = (pInput >> 1) & 0x7FFFFFFF;
            }
            return result;
        };
        CRC16.Update = function (pBytes, pOffset, pLen) {
            if (pOffset === void 0) { pOffset = 0; }
            if (pLen === void 0) { pLen = 0; }
            pLen = pLen > 0 ? pLen : pBytes.byteLength;
            var c = 0;
            var index = 0;
            for (var i = pOffset; i < pLen; i++) {
                index = (CRC16.CRCBitReflect(pBytes[i], 8) & 0xFF) ^ ((c >> 8) & 0x00FFFFFF);
                index = index & 0xFF;
                c = CRC16.CRCTable[index] ^ ((c << 8) & 0xFFFFFF00);
            }
            var result = (CRC16.CRCBitReflect(c, 16) ^ 0) & 0xFFFF;
            return result;
        };
        CRC16.POLYNOMIAL = 0x1021;
        CRC16.CRCTable = CRC16.MakeCrcTable();
        CRC16.DropBits = [0xFFFFFFFF, 0xFFFFFFFE, 0xFFFFFFFC, 0xFFFFFFF8,
            0xFFFFFFF0, 0xFFFFFFE0, 0xFFFFFFC0, 0xFFFFFF80,
            0xFFFFFF00, 0xFFFFFE00, 0xFFFFFC00, 0xFFFFF800,
            0xFFFFF000, 0xFFFFE000, 0xFFFFC000, 0xFFFF8000];
        return CRC16;
    }());
    Common.CRC16 = CRC16;
})(Common || (Common = {}));
//# sourceMappingURL=CRC16.js.map