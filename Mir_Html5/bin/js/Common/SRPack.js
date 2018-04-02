/*
*动画资源包解析
* @author 2017.9.28 21:59
*/
var Common;
(function (Common) {
    var SRPack = /** @class */ (function () {
        function SRPack() {
            this.m_sFile = "";
            this.m_ArrItem = [];
        }
        SRPack.prototype.Load = function (sFile, bytes) {
            this.m_ArrItem = [];
            this.m_sFile = sFile;
            bytes.endian = "littleEndian";
            var nVersion = bytes.getUint32();
            if (nVersion != SRPack.VERSION) {
                Common.MirLog.Log(Common.MirLogType.Error, "版本号不匹配" + nVersion + "file:" + this.m_sFile);
                return false;
            }
            var nLen = bytes.getByte();
            bytes.pos += nLen;
            var base = new Base64();
            var nCount = bytes.getUint32();
            var pItem = null;
            for (var i = 0; i < nCount; i++) {
                pItem = new Common.SRPackItem();
                pItem._nOffset = bytes.getUint32();
                pItem._nDataSize = bytes.getUint32() ^ SRPack.DATASIZEKEY;
                this.m_ArrItem.push(pItem);
            }
            var data = new Laya.Byte();
            data.endian = bytes.endian;
            for (var i = 0; i < nCount; i++) {
                pItem = this.m_ArrItem[i];
                bytes.pos = pItem._nOffset;
                data.clear();
                data.pos = 0;
                var arrBuffer = null;
                data.writeArrayBuffer(bytes.__getBuffer(), bytes.pos, pItem._nDataSize);
                arrBuffer = data.__getBuffer();
                //最后一个文件不创建纹理最后一个为所有图片的偏移文件
                if (i != nCount - 1) {
                    var str = base.encode(arrBuffer);
                    str = "data:image/png;base64," + str;
                    pItem._Data = str;
                }
                else {
                    pItem._Data = arrBuffer;
                }
            }
            //最后一个为所有图片的偏移文件
            pItem = this.m_ArrItem.pop();
            data.clear();
            data.pos = 0;
            data.writeArrayBuffer(pItem._Data, 0, pItem._nDataSize);
            data.pos = 0;
            for (var i = 0; i < this.m_ArrItem.length; i++) {
                pItem = this.m_ArrItem[i];
                var x = data.getInt16();
                var y = data.getInt16();
                pItem._nOffsetPoint.x = x;
                pItem._nOffsetPoint.y = y;
            }
            return true;
        };
        SRPack.prototype.GetSpriteByIndex = function (nIndex) {
            if (nIndex < 0 || nIndex >= this.m_ArrItem.length) {
                return null;
            }
            return this.m_ArrItem[nIndex].GetSprite();
        };
        SRPack.VERSION = 0x11111111;
        SRPack.DATASIZEKEY = 0x20070F0F;
        return SRPack;
    }());
    Common.SRPack = SRPack;
})(Common || (Common = {}));
//# sourceMappingURL=SRPack.js.map