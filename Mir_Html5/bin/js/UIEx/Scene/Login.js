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
    var Login = /** @class */ (function (_super) {
        __extends(Login, _super);
        function Login() {
            var _this = _super.call(this) || this;
            _this.m_TextPaswd.type = "password";
            _this.m_TextUser.text = "yiyi";
            _this.m_TextPaswd.text = "a";
            _this.m_btnEnter.on(Laya.Event.CLICK, _this, _this.OnEnterClick);
            return _this;
        }
        Login.prototype.OnEnterClick = function () {
            var propSet = new Entity.PropertySet();
            var handle = 0;
            propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_POSX, 186);
            propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_POSY, 159);
            propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_MODELID, 137);
            propSet.SetProperty(Entity.enPropEntity.PROP_ACTOR_WEAPONAPPEARANCE, 28);
            propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_HP, 100);
            propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_MAXHP, 100);
            propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_MP, 100);
            propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_ATTACK_SPEED, 500);
            propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_MAXMP, 100);
            propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_MOVEONESLOTTIME, 400);
            LogicManager.GetInstance().CreateEntity(handle, Entity.EntityType.Player, propSet);
            var pPlayer = Entity.Player.GetInstance();
            pPlayer.PostActionMessage(Entity.StandardActions.SA_IDLE, null);
            pPlayer.SetEntityName("后天");
            //加载地图文件，加载成功后根据主角的坐标设置地图坐标
            GameMap.CustomGameMap.GetInstance().LoadMap("map/map/1LeiMingDaLu.wwm", "雷鸣大陆", 1);
            //设置主角位置
            pPlayer.SetCurrentXY(186, 159);
            var pMiniMap = UI.UIManager.GetInstance().GetMiniMapDialog();
            if (pMiniMap != null) {
                pMiniMap.SetMapName("雷鸣大陆");
            }
            //创建怪物
            for (var i = 0; i < 20; i++) {
                handle++;
                propSet = new Entity.PropertySet();
                propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_MODELID, 20);
                propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_POSX, pPlayer.GetCurentX() - 5 + parseInt((Math.random() * 10).toString()));
                propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_POSY, pPlayer.GetCurrentY() - 5 + parseInt((Math.random() * 10).toString()));
                propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_HP, 100);
                propSet.SetProperty(Entity.enPropEntity.PROP_ENTITY_DIR, parseInt((Math.random() * 10).toString()) % 7);
                propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_MAXHP, 100);
                propSet.SetProperty(Entity.enPropEntity.PROP_CREATURE_MOVEONESLOTTIME, 1000);
                var pMonster = LogicManager.GetInstance().CreateEntity(handle, Entity.EntityType.Monster, propSet);
                pMonster.SetEntityName("后天的宝宝");
            }
            //创建主界面ui
            UI.UIManager.GetInstance().InitMainLayer();
        };
        return Login;
    }(ui.Scene.LoginUI));
    UI.Login = Login;
})(UI || (UI = {}));
//# sourceMappingURL=Login.js.map