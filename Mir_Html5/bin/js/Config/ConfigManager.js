var Config;
(function (Config) {
    var ConfigManager = /** @class */ (function () {
        function ConfigManager() {
            this.m_LoadItem = [];
        }
        ConfigManager.GetInstance = function () {
            if (ConfigManager._Instance == null) {
                ConfigManager._Instance = new ConfigManager();
            }
            return ConfigManager._Instance;
        };
        ConfigManager.prototype.LoadConfig = function (arrItem) {
            this.m_LoadItem =
                [
                    { url: "data/config/skill.dat", type: Laya.Loader.BUFFER, CType: Config.ConfigType.Skill },
                    { url: "data/config/effect.dat", type: Laya.Loader.BUFFER, CType: Config.ConfigType.Effect },
                    { url: "data/config/item.dat", type: Laya.Loader.BUFFER, CType: Config.ConfigType.Item },
                    { url: "data/config/npc.dat", type: Laya.Loader.BUFFER, CType: Config.ConfigType.Npc },
                ];
            for (var i = 0; i < this.m_LoadItem.length; i++) {
                arrItem.push(this.m_LoadItem[i]);
            }
        };
        ConfigManager.prototype.GetSkillConfig = function () {
            return this.m_ArrCfg[Config.ConfigType.Skill];
        };
        ConfigManager.prototype.GetEffectConfig = function () {
            return this.m_ArrCfg[Config.ConfigType.Effect];
        };
        ConfigManager.prototype.GetItemConfig = function () {
            return this.m_ArrCfg[Config.ConfigType.Item];
        };
        ConfigManager.prototype.GetNpcConfig = function () {
            return this.m_ArrCfg[Config.ConfigType.Npc];
        };
        ConfigManager.prototype.OnLoaded = function () {
            this.m_ArrCfg = new Array();
            for (var i = 0; i < this.m_LoadItem.length; i++) {
                var pData = Laya.Loader.getRes(this.m_LoadItem[i].url);
                if (pData != null) {
                    var pCfg = null;
                    switch (this.m_LoadItem[i].CType) {
                        case Config.ConfigType.Skill://技能配置文件
                            {
                                pCfg = new Config.SkillConfig();
                                break;
                            }
                        case Config.ConfigType.Effect://特效配置文件
                            {
                                pCfg = new Config.EffectConfig();
                                break;
                            }
                        case Config.ConfigType.Item://道具配置文件
                            {
                                pCfg = new Config.ItemConfig();
                                break;
                            }
                        case Config.ConfigType.Npc://npc配置文件
                            {
                                pCfg = new Config.NpcConfig();
                                break;
                            }
                    }
                    if (pCfg != null) {
                        pCfg.Load(pData);
                    }
                    this.m_ArrCfg[this.m_LoadItem[i].CType] = pCfg;
                }
            }
        };
        ConfigManager._Instance = null;
        return ConfigManager;
    }());
    Config.ConfigManager = ConfigManager;
})(Config || (Config = {}));
//# sourceMappingURL=ConfigManager.js.map