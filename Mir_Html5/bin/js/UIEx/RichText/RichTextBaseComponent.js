var UI;
(function (UI) {
    var RichTextBaseComponent = /** @class */ (function () {
        function RichTextBaseComponent(parent) {
            this.m_Parent = parent;
            this.m_ComponentType = UI.RichTextComponentType.Normal;
        }
        RichTextBaseComponent.prototype.Destory = function () {
            this.m_Parent = null;
        };
        RichTextBaseComponent.prototype.ProcessStr = function (szStr, arrAttr) {
        };
        RichTextBaseComponent.prototype.GetUIHeight = function () {
            return 0;
        };
        RichTextBaseComponent.prototype.GetUIWidth = function () {
            return 0;
        };
        RichTextBaseComponent.prototype.Show = function (nX, nY) {
        };
        RichTextBaseComponent.prototype.Update = function (nCurrentTick) {
        };
        return RichTextBaseComponent;
    }());
    UI.RichTextBaseComponent = RichTextBaseComponent;
})(UI || (UI = {}));
//# sourceMappingURL=RichTextBaseComponent.js.map