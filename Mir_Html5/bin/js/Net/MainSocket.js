var Net;
(function (Net) {
    var MainSocket = /** @class */ (function () {
        function MainSocket() {
            this.m_Socket = null;
            this.m_Stream = new Laya.Byte();
            this.m_GamePack = new Net.GamePackEx();
            this.m_Encrypt = new Net.Encrypt();
            this.HEADER_CHECK_KEY = 0;
            this.m_QueneSocketEvent = [];
            this.m_HeartbeastTick = 0; //心跳包
            this.m_bOpenHeartbeast = false; //是否开启了心跳包
        }
        MainSocket.Init = function () {
            MainSocket._Instance = new MainSocket();
        };
        MainSocket.GetInstance = function () {
            return MainSocket._Instance;
        };
        MainSocket.prototype.GetEncypt = function () {
            return this.m_Encrypt;
        };
        MainSocket.prototype.Connect = function (szIp, nPort) {
            this.HEADER_CHECK_KEY = 0;
            this.m_SocketState = Net.SocketState.INIT;
            if (this.m_Socket != null && this.m_Socket.connected) {
                this.m_Socket.close();
            }
            this.m_Socket = new Laya.Socket();
            this.m_Socket.endian = "littleEndian";
            this.m_Socket.connect(szIp, nPort);
            this.m_Socket.on(Laya.Event.OPEN, this, this.OnSocketOpen);
            this.m_Socket.on(Laya.Event.CLOSE, this, this.OnSocketClose);
            this.m_Socket.on(Laya.Event.MESSAGE, this, this.OnMessageReveived);
            this.m_Socket.on(Laya.Event.ERROR, this, this.OnConnectError);
        };
        MainSocket.prototype.OnMessageReveived = function (message) {
            var e = new Net.ClientSocketEvent();
            e._Type = Net.CLIENTSOCKETEVENT_TYPE.ONRECEIVE;
            var pack = new Net.Packet(message);
            e._Data = pack.GetBuffer();
            this.m_QueneSocketEvent.push(e);
            this.m_Socket.input.clear();
        };
        MainSocket.prototype.OnSocketOpen = function () {
            var e = new Net.ClientSocketEvent();
            e._Type = Net.CLIENTSOCKETEVENT_TYPE.ONCONNECT;
            this.m_QueneSocketEvent.push(e);
            console.log("onSocketOpen");
        };
        MainSocket.prototype.OnSocketClose = function () {
            console.log("onSocketClose");
        };
        MainSocket.prototype.OnConnectError = function (e) {
            console.log("onConnectError");
        };
        MainSocket.prototype.SendData = function (data, bEncode) {
            if (bEncode === void 0) { bEncode = true; }
            if (!this.m_Socket.connected) {
                return;
            }
            if (bEncode) {
                var sendData = this.StructurePack(data);
                this.m_Socket.send(sendData);
            }
            else {
                this.m_Socket.send(data);
            }
            this.m_Socket.flush();
        };
        MainSocket.prototype.StructurePack = function (data) {
            var dataCK = this.m_Encrypt.GetCRC16(data, data.byteLength);
            //包头
            var PackHead = new Net.Packet();
            PackHead.WriteUInt16(Net.GamePackEx.DEFAULT_TAG);
            PackHead.WriteUInt16(data.byteLength);
            PackHead.WriteUInt16(dataCK);
            PackHead.WriteUInt16(this.HEADER_CHECK_KEY);
            this.HEADER_CHECK_KEY++;
            if (this.HEADER_CHECK_KEY > 0xFFFF) {
                this.HEADER_CHECK_KEY = 0;
            }
            PackHead.WriteUInt32(0);
            PackHead.WriteUInt32(0);
            var HeaderBytes = PackHead.GetBuffer();
            //先不写crc16校验
            //let headerCRC:number = this.m_Encrypt.GetCRC16(HeaderBytes,HeaderBytes.byteLength);
            var pack = new Laya.Byte();
            pack.writeArrayBuffer(HeaderBytes);
            pack.writeArrayBuffer(data);
            return pack.__getBuffer();
        };
        MainSocket.prototype.Update = function (nCurrentTick) {
            if (this.m_Socket == null || this.m_Socket.connected == false) {
                return;
            }
            if (this.m_QueneSocketEvent.length > 0) {
                var e = this.m_QueneSocketEvent[0];
                this.m_QueneSocketEvent.splice(0, 1);
                switch (e._Type) {
                    case Net.CLIENTSOCKETEVENT_TYPE.ONCONNECT://连接事件
                        {
                            Net.MsgSender.SendFirstSelfSalt(); //发送第一次校验包
                            this.m_SocketState = Net.SocketState.CHECKING; //经验状态
                            break;
                        }
                    case Net.CLIENTSOCKETEVENT_TYPE.ONRECEIVE://数据到达事件
                        {
                            if (this.m_SocketState < Net.SocketState.COMMUNICATION) {
                                this.m_SocketState = Net.SocketState.COMMUNICATION;
                                var pack = new Net.Packet(e._Data);
                                var seed = pack.ReadUInt32();
                                this.m_Encrypt.SetTargetSalt(seed);
                                //发送校验码
                                pack.Clear();
                                pack.WriteUInt16(0xFFFF);
                                this.m_Socket.send(pack.GetBuffer());
                                this.m_Socket.flush();
                                //登录游戏
                                var pCfg = Config.GlobalConfig._Instance;
                                Net.MsgSender.SendLoginGame(pCfg._szUser, pCfg._szPasswd);
                                this.m_HeartbeastTick = nCurrentTick + Config.GlobalConfig._Instance._nHeartBeatTime;
                                this.m_bOpenHeartbeast = true;
                                break;
                            }
                            //正常通讯状态- 处理网络数据包
                            this.m_GamePack.ProcessData(e._Data);
                            break;
                        }
                }
            }
            var pData = this.m_GamePack.GetData();
            if (pData != null) {
                NetSystem.NetSystemManager.GetInstance().ProcessNetData(pData);
            }
            //心跳包
            if (this.m_bOpenHeartbeast == true && nCurrentTick >= this.m_HeartbeastTick) {
                this.m_HeartbeastTick = nCurrentTick + Config.GlobalConfig._Instance._nHeartBeatTime;
                Net.MsgSender.SendHeartbeat(nCurrentTick);
            }
        };
        MainSocket._Instance = null;
        return MainSocket;
    }());
    Net.MainSocket = MainSocket;
})(Net || (Net = {}));
//# sourceMappingURL=MainSocket.js.map