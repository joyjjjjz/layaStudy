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
    var NpcTalk = /** @class */ (function (_super) {
        __extends(NpcTalk, _super);
        function NpcTalk() {
            var _this = _super.call(this) || this;
            _this.m_Handle = 0; //npc句柄
            _this.m_nType = 0; //npc类型
            _this.m_ArrSelect = null;
            _this.m_ArrSelectCallBack = null;
            _this.m_ArrSelect = new Array();
            _this.m_ArrSelectCallBack = new Array();
            _this.m_ArrSelect.push(_this.m_text_select1);
            _this.m_ArrSelect.push(_this.m_text_select2);
            _this.m_ArrSelect.push(_this.m_text_select3);
            _this.m_ArrSelect.push(_this.m_text_select4);
            _this.m_ArrSelect.push(_this.m_text_select5);
            for (var i = 0; i < _this.m_ArrSelect.length; i++) {
                _this.m_ArrSelect[i].on(Laya.Event.MOUSE_UP, _this, _this.OnSelectClick, [i]);
            }
            _this.m_btnClose.on(Laya.Event.CLICK, _this, _this.OnBtnClose);
            return _this;
        }
        NpcTalk.prototype.OnBtnClose = function () {
            this.visible = false;
        };
        NpcTalk.prototype.OnSelectClick = function (nIndex) {
            if (nIndex >= this.m_ArrSelectCallBack.length ||
                this.m_ArrSelectCallBack[nIndex] == null ||
                this.m_ArrSelectCallBack[nIndex].length <= 0) {
                return;
            }
            // let msg:ClientMsgPack.LogicPack.NpcTalkMsgPack = new ClientMsgPack.LogicPack.NpcTalkMsgPack();
            // msg._Handle = this.m_Handle;
            // msg._szFuncNmae = this.m_ArrSelectCallBack[nIndex];
            // Net.MsgSender.SendDataByPack(msg);
        };
        NpcTalk.prototype.Update = function (handle, type, str) {
            this.m_text_npctalk.text = null;
            for (var i = 0; i < this.m_ArrSelect.length; i++) {
                this.m_ArrSelect[i].text = "";
            }
            this.m_Link = new Array();
            this.m_Handle = handle;
            this.m_nType = type;
            var arr = str.split(UI.NpcTalk.SPLIT);
            if (arr.length <= 0) {
                return false;
            }
            this.m_text_npctalk.text = arr[0];
            this.m_ArrSelectCallBack.splice(0, this.m_ArrSelectCallBack.length - 1);
            if (arr.length > 1) {
                arr = arr[1].split(" ");
                for (var i = 0; i < arr.length; i++) {
                    var line = arr[i].substr(1, arr[i].length - 2);
                    var arrselect = line.split(NpcTalk.SPLITSELECT);
                    if (i >= this.m_ArrSelect.length) {
                        break;
                    }
                    this.m_ArrSelect[i].text = arrselect[0];
                    this.m_ArrSelectCallBack.push(arrselect[1]);
                }
            }
            return true;
        };
        NpcTalk.SPLIT = "&&";
        NpcTalk.SPLITSELECT = "/@";
        return NpcTalk;
    }(ui.Main.npctalkUI));
    UI.NpcTalk = NpcTalk;
})(UI || (UI = {}));
//# sourceMappingURL=NpcTalk.js.map