var Net;
(function (Net) {
    var GamePackEx = /** @class */ (function () {
        function GamePackEx() {
            this.m_Stream = new Laya.Byte();
            this.m_ReadStream = new Laya.Byte();
            this.m_WriteStream = new Laya.Byte();
            this.m_Stream.endian = "littleEndian";
            this.m_ReadStream.endian = "littleEndian";
            this.m_WriteStream.endian = "littleEndian";
            this.m_ListData = new Array();
        }
        GamePackEx.prototype.ProcessData = function (data) {
            if (data == null) {
                return;
            }
            this.m_Stream.writeArrayBuffer(data);
            this.m_ReadStream.clear();
            this.m_ReadStream.pos = 0;
            this.m_ReadStream.writeArrayBuffer(this.m_Stream.__getBuffer());
            this.m_ReadStream.pos = 0;
            var SHORTSIZEOF = 2; //短整数字节大小
            var INTSIZEOF = 4; //整数型字节大小
            var nCurPos = 0; //记录当前流位置
            while (true) {
                if (this.m_ReadStream.pos + SHORTSIZEOF > this.m_ReadStream.length) {
                    break;
                }
                var nTag = this.m_ReadStream.getUint16();
                nCurPos += SHORTSIZEOF;
                if (nTag != GamePackEx.DEFAULT_TAG) {
                    continue;
                }
                var nLen = this.m_ReadStream.getUint16();
                nCurPos += SHORTSIZEOF;
                //    //预留4字节
                this.m_ReadStream.getUint32();
                nCurPos += INTSIZEOF;
                //读取消息消耗时间
                this.m_ReadStream.getUint32();
                nCurPos += INTSIZEOF;
                this.m_ReadStream.getUint32();
                nCurPos += INTSIZEOF;
                if (nLen > this.m_ReadStream.length - nCurPos) {
                    return;
                }
                nCurPos += nLen;
                this.m_WriteStream.clear();
                this.m_WriteStream.pos = 0;
                this.m_WriteStream.writeArrayBuffer(this.m_ReadStream.__getBuffer(), this.m_ReadStream.pos, nLen);
                var buffer = this.m_WriteStream.__getBuffer();
                this.m_ListData.push(buffer);
                if (nCurPos == this.m_ReadStream.length) {
                    break;
                }
            }
            var rema_Len = this.m_ReadStream.length - nCurPos;
            if (rema_Len > 0) {
                this.m_WriteStream.clear();
                this.m_WriteStream.pos = 0;
                this.m_WriteStream.writeArrayBuffer(this.m_ReadStream.__getBuffer(), nCurPos, rema_Len);
            }
            this.m_Stream.clear();
            this.m_Stream.pos = 0;
            if (rema_Len > 0) {
                this.m_Stream.writeArrayBuffer(this.m_WriteStream.__getBuffer(), 0, this.m_WriteStream.length);
            }
        };
        GamePackEx.prototype.GetData = function () {
            if (this.m_ListData.length > 0) {
                var buff = this.m_ListData.splice(0, 1);
                return buff[0];
            }
            return null;
        };
        GamePackEx.DEFAULT_TAG = 0xCCEE;
        return GamePackEx;
    }());
    Net.GamePackEx = GamePackEx;
})(Net || (Net = {}));
//# sourceMappingURL=GamePackEx.js.map