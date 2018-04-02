var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI;
(function (UI) {
    var Log = /** @class */ (function (_super) {
        __extends(Log, _super);
        function Log() {
            var _this = _super.call(this) || this;
            _this.m_sLog = "";
            _this.m_btn_clear.on(Laya.Event.CLICK, _this, _this.OnBtnClear);
            _this.m_btn_clear.visible = false;
            _this.m_text_log.style.font = Config.GlobalConfig._Instance._szFont;
            _this.m_text_log.style.fontSize = Config.GlobalConfig._Instance._nFontSize;
            _this.m_text_log.innerHTML = "";
            return _this;
        }
        Log.prototype.AddLog = function (type, szStr) {
            this.m_sLog += "<br/><span color='#FFFFFF'>" + szStr + "</span>";
            this.m_text_log.innerHTML = this.m_sLog;
        };
        Log.prototype.AddLogByte = function (type, buff) {
            // let str:string = "";
            // let pack:Net.Packet = new Net.Packet(buff);
            // for(let i:number = 0;i < buff.byteLength;i++)
            // {
            //     str = str+pack.ReadUByte().toString()+",";
            // }
            // console.log(str);
            // this.m_text_log.text += str;
        };
        Log.prototype.OnBtnClear = function () {
            this.m_text_log.innerHTML = "";
            // let pack:Net.Packet = new Net.Packet();
            // pack.WriteCustomString(this.m_text_log.text);
            // this.AddLogByte(Common.MirLogType.Tips,pack.GetBuffer());
            //this.m_text_log.text = "";
        };
        return Log;
    }(ui.Main.logUI));
    UI.Log = Log;
})(UI || (UI = {}));
//# sourceMappingURL=Log.js.map