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
    var CreateRole = /** @class */ (function (_super) {
        __extends(CreateRole, _super);
        function CreateRole() {
            var _this = _super.call(this) || this;
            _this.m_Job = 0;
            _this.m_Sex = 0;
            _this.m_ArrImage = [];
            //灰色滤镜
            //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，灰图
            var grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0];
            //创建一个颜色滤镜对象，灰图
            _this.m_GrayscaleFilter = new Laya.ColorFilter(grayscaleMat);
            _this.m_ArrImage.push({ image: _this.m_warrior_man, job: 1, sex: 0 });
            _this.m_ArrImage.push({ image: _this.m_warrior_woman, job: 1, sex: 1 });
            _this.m_ArrImage.push({ image: _this.m_mage_man, job: 2, sex: 0 });
            _this.m_ArrImage.push({ image: _this.m_mage_woman, job: 2, sex: 1 });
            _this.m_ArrImage.push({ image: _this.m_tao_man, job: 3, sex: 0 });
            _this.m_ArrImage.push({ image: _this.m_tao_woman, job: 3, sex: 1 });
            //默认为男战士
            _this.SetSelectIndex(1, 0);
            for (var i = 0; i < _this.m_ArrImage.length; i++) {
                _this.m_ArrImage[i].image.on(Laya.Event.CLICK, _this, _this.OnImageClick);
            }
            //创建角色按钮
            _this.m_ImageCreate.on(Laya.Event.CLICK, _this, _this.OnCreateRole);
            return _this;
        }
        CreateRole.prototype.OnCreateRole = function () {
            // let msg:ClientMsgPack.LoginPack.CreateActorMsgPack = new ClientMsgPack.LoginPack.CreateActorMsgPack();
            // msg._szName = this.m_TextName.text;
            // msg._bJob = this.m_Job;
            // msg._bSex = this.m_Sex;
            // Net.MsgSender.SendDataByPack(msg);
        };
        CreateRole.prototype.OnImageClick = function (e) {
            for (var i = 0; i < this.m_ArrImage.length; i++) {
                if (e.target == this.m_ArrImage[i].image) {
                    this.SetSelectIndex(this.m_ArrImage[i].job, this.m_ArrImage[i].sex);
                    break;
                }
            }
        };
        CreateRole.prototype.SetSelectIndex = function (job, sex) {
            for (var i = 0; i < this.m_ArrImage.length; i++) {
                if (this.m_ArrImage[i].job == job && this.m_ArrImage[i].sex == sex) {
                    this.m_ArrImage[i].image.filters = null;
                }
                else {
                    this.m_ArrImage[i].image.filters = [this.m_GrayscaleFilter];
                }
            }
            this.m_Job = job;
            this.m_Sex = sex;
        };
        return CreateRole;
    }(ui.Scene.createroleUI));
    UI.CreateRole = CreateRole;
})(UI || (UI = {}));
//# sourceMappingURL=CreateRole.js.map