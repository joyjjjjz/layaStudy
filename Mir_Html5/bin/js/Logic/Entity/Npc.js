/**
 * npc实体类
 * @author 后天 2017.9.30
 */
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
var Entity;
(function (Entity) {
    var Npc = /** @class */ (function (_super) {
        __extends(Npc, _super);
        function Npc(handle) {
            var _this = _super.call(this, handle) || this;
            _this.m_Type = Entity.EntityType.Npc;
            _this.m_ProgressHP.visible = false; //npc是没有血量的
            return _this;
        }
        Npc.prototype.Update = function (nCurrentTick) {
            if (this.m_nModleActionPartPack[Entity.StandardActions.AP_IDLE] != null &&
                this.m_nModelAni.GetEndFrame() == 0 &&
                this.m_nModleActionPartPack[Entity.StandardActions.AP_IDLE].GetFrameCount() > 0) {
                this.m_nModelAni.SetEndFrame(this.m_nModleActionPartPack[Entity.StandardActions.AP_IDLE].GetFrameCount());
            }
            _super.prototype.Update.call(this, nCurrentTick);
        };
        Npc.prototype.SetModelIndex = function (nModelIndex) {
            if (this.GetModelIndex() != nModelIndex && nModelIndex > 0) {
                this.m_nModleActionPartPack[Entity.StandardActions.AP_IDLE] = Resources.ResourcesManager._Instance.GetNpcPack(nModelIndex);
                this.m_nModelAni.SetPack(this.m_nModleActionPartPack[Entity.StandardActions.AP_IDLE]);
                this.m_nModelAni.SetCurrentFrame(0);
                this.m_nModelAni.SetFrameRate(100);
                this.m_nModelAni.SetStartFrame(0);
                this.m_nModelAni.SetEndFrame(this.m_nModleActionPartPack[Entity.StandardActions.AP_IDLE].GetFrameCount());
            }
        };
        //NPC是不死的
        Npc.prototype.IsDie = function () {
            return false;
        };
        return Npc;
    }(Entity.CustomEntity));
    Entity.Npc = Npc;
})(Entity || (Entity = {}));
//# sourceMappingURL=Npc.js.map