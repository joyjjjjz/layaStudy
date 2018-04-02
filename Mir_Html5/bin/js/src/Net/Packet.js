var Net;
(function (Net) {
    var Packet = /** @class */ (function () {
        function Packet(data) {
            if (data === void 0) { data = null; }
            this.m_Byte = new Laya.Byte();
            this.m_Byte.endian = "littleEndian";
            if (data != null) {
                this.m_Byte.writeArrayBuffer(data);
                this.m_Byte.pos = 0;
            }
        }
        Packet.prototype.WriteCmd = function (nSysId, nCmdId) {
            this.m_Byte.writeByte(nSysId);
            this.m_Byte.writeByte(nCmdId);
        };
        Packet.prototype.WriteCustomString = function (str) {
            this.m_Byte.writeUTFString(str);
            this.m_Byte.writeByte(0);
        };
        Packet.prototype.ReadCustomString = function () {
            var ret = this.m_Byte.readUTFString();
            this.m_Byte.readByte();
            return ret;
        };
        Packet.prototype.ReadInt64 = function () {
            var ret = (this.m_Byte.getFloat64());
            return ret;
        };
        Packet.prototype.WriteDouble = function (value) {
            this.m_Byte.writeFloat64(value);
        };
        Packet.prototype.WriteInt32 = function (value) {
            this.m_Byte.writeInt32(value);
        };
        Packet.prototype.ReadInt32 = function () {
            return this.m_Byte.getInt32();
        };
        Packet.prototype.WriteUInt32 = function (value) {
            this.m_Byte.writeUint32(value);
        };
        Packet.prototype.ReadUInt32 = function () {
            return this.m_Byte.getUint32();
        };
        Packet.prototype.WriteInt16 = function (value) {
            this.m_Byte.writeInt16(value);
        };
        Packet.prototype.ReadInt16 = function () {
            return this.m_Byte.getInt16();
        };
        Packet.prototype.WriteUInt16 = function (value) {
            this.m_Byte.writeUint16(value);
        };
        Packet.prototype.ReadUInt64 = function () {
            return this.m_Byte.getUint16();
        };
        Packet.prototype.ReadUInt16 = function () {
            return this.m_Byte.getUint16();
        };
        Packet.prototype.ReadDouble = function () {
            return this.m_Byte.getFloat64();
        };
        Packet.prototype.ReadBoolean = function () {
            return this.m_Byte.getUint8() == 1 ? true : false;
        };
        Packet.prototype.WriteBoolean = function (value) {
            this.m_Byte.writeUint8(value == true ? 1 : 0);
        };
        Packet.prototype.ReadFloat = function () {
            return this.m_Byte.getFloat32();
        };
        Packet.prototype.WriteFloat = function (value) {
            this.m_Byte.writeFloat32(value);
        };
        Packet.prototype.WriteByte = function (value) {
            this.m_Byte.writeByte(value);
        };
        Packet.prototype.ReadByte = function () {
            return this.m_Byte.readByte();
        };
        Packet.prototype.WriteUByte = function (value) {
            this.m_Byte.writeUint8(value);
        };
        Packet.prototype.ReadUByte = function () {
            return this.m_Byte.getUint8();
        };
        Packet.prototype.GetBuffer = function () {
            return this.m_Byte.__getBuffer();
        };
        Packet.prototype.Clear = function (pos) {
            if (pos === void 0) { pos = 0; }
            this.m_Byte.clear();
            this.m_Byte.pos = pos;
        };
        Packet.prototype.GetPos = function () {
            return this.m_Byte.pos;
        };
        Packet.prototype.SetPos = function (value) {
            this.m_Byte.pos = value;
        };
        return Packet;
    }());
    Net.Packet = Packet;
})(Net || (Net = {}));
//# sourceMappingURL=Packet.js.map