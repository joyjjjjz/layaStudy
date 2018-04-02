/**
 * 数据加密解密处理类
 * @author 后天 2017.10.3
 *
 */
var Net;
(function (Net) {
    var Encrypt = /** @class */ (function () {
        function Encrypt() {
            this.m_nSelfSalt = 0;
            this.m_nTargetSalt = 0;
            this.m_nKey = 0;
            this.m_KeyBuff = []; //sizeof 4
            this.m_nSelfSalt = this.MakeSalt();
        }
        Encrypt.prototype.MakeSalt = function () {
            var d = Laya.timer.currTimer;
            var v = Math.random() * d;
            return parseInt(v.toString());
        };
        Encrypt.prototype.GetSelfSalt = function () {
            return this.m_nSelfSalt;
        };
        Encrypt.prototype.GetTargetSalt = function () {
            return this.m_nTargetSalt;
        };
        Encrypt.prototype.GetCRC16 = function (pBytes, pLen) {
            return Common.CRC16.Update(pBytes, 0, pLen);
        };
        Encrypt.prototype.SetTargetSalt = function (pSalt) {
            this.m_nTargetSalt = pSalt;
            this.MakeKey();
        };
        Encrypt.prototype.GetCheckKey = function () {
            var bytes = new Laya.Byte();
            bytes.writeUint32(this.m_nKey);
            var ck = Common.CRC16.Update(bytes.__getBuffer());
            return ck;
        };
        Encrypt.prototype.MakeKey = function () {
            this.m_nKey = (this.m_nSelfSalt ^ this.m_nTargetSalt) + this.m_nSelfSalt + 8654;
            var bytes = new Laya.Byte();
            for (var i = 0; i < 4; i++) {
                bytes.clear();
                bytes.pos = 0;
                this.m_KeyBuff[i] = (this.m_nKey & (0xFF << (i << 3))) >> (i << 3);
                bytes.writeUint32(this.m_KeyBuff[i]);
                bytes.pos = 0;
                this.m_KeyBuff[i] = bytes._getUInt8(0);
            }
        };
        Encrypt.prototype.Encode = function (pInBuff, pOffset, pLength) {
            if (pOffset === void 0) { pOffset = 0; }
            if (pLength === void 0) { pLength = 0; }
            if (pOffset >= pInBuff.byteLength) {
                return 0;
            }
            var end = pLength > 0 ? pOffset + pLength : pInBuff.byteLength;
            if (end > pInBuff.byteLength) {
                end = pInBuff.byteLength;
            }
            for (var i = pOffset; i < end; i++) {
                pInBuff[i] ^= this.m_KeyBuff[i % 4];
            }
            return end - pOffset;
        };
        return Encrypt;
    }());
    Net.Encrypt = Encrypt;
})(Net || (Net = {}));
//# sourceMappingURL=Encrypt.js.map