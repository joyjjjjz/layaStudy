/*
* 全局UI管理器
*@author 后天 2017.10.5
*/
var UI;
(function (UI) {
    var UIManager = /** @class */ (function () {
        function UIManager() {
            this.m_LoadItem = []; //加载的项目
            this.m_Dialog = [];
            this.m_MapRootLayer = null; //地图主场景
            this.m_LoadingDialog = []; //记录游戏内对话框是否正在加载- 防止重复加载
            var pCfg = Config.GlobalConfig._Instance;
            this.m_LoadItem =
                [
                    //{ url: "res/atlas/comp/main/log.json",type: Laya.Loader.ATLAS,id:UIDialogID.Log,x:0,y:pCfg._nHeight - 400,visible:true,},
                    { url: "res/atlas/comp/scene/loading.json", type: Laya.Loader.ATLAS, id: UI.UIDialogID.Loading, x: 0, y: 0 },
                ];
            Laya.loader.load(this.m_LoadItem, Laya.Handler.create(this, this.onLoadedUI));
        }
        UIManager.Init = function () {
            UIManager._Instance = new UIManager();
        };
        UIManager.GetInstance = function () {
            return UIManager._Instance;
        };
        UIManager.prototype.LoadMainLayer = function (arrItem) {
            var pCfg = Config.GlobalConfig._Instance;
            this.m_LoadItem =
                [
                    { url: "res/atlas/comp/scene/login.json", type: Laya.Loader.ATLAS, id: UI.UIDialogID.Login, x: 0, y: 0, visible: false, },
                    { url: "res/atlas/comp/main/main.atlas", type: Laya.Loader.ATLAS, id: UI.UIDialogID.Main, x: 0, y: 0, visible: true, },
                    { url: "res/atlas/comp/main/header.json", type: Laya.Loader.ATLAS, id: UI.UIDialogID.Header, x: 0, y: 33, visible: true, },
                    { url: "res/atlas/comp/main/joy.json", type: Laya.Loader.ATLAS, id: UI.UIDialogID.Joy, x: 100, y: pCfg._nSceneHeight - 200, visible: true, },
                    { url: "res/atlas/comp/main/joybtn.json", type: Laya.Loader.ATLAS, id: UI.UIDialogID.JoyBtn, x: pCfg._nSceneWidth - 300, y: pCfg._nSceneHeight - 300, visible: true, },
                    { url: "res/atlas/comp/main/npctalk.json", type: Laya.Loader.ATLAS, id: UI.UIDialogID.NpcTalk, x: (pCfg._nWidth - 481) / 2, y: (pCfg._nHeight - 304) / 2, visible: false, },
                    { url: "res/atlas/comp/main/minimap.json", type: Laya.Loader.ATLAS, id: UI.UIDialogID.MiniMap, x: pCfg._nWidth - 160, y: 33, visible: true, },
                    { url: "res/atlas/comp/main/topheader.json", type: Laya.Loader.ATLAS, id: UI.UIDialogID.TopHeader, x: 0, y: 0, visible: true, },
                    { url: "res/atlas/comp/main/shortcut.json", type: Laya.Loader.ATLAS, id: UI.UIDialogID.Shortcut, x: 400, y: 35, visible: true, },
                    { url: "res/atlas/comp/main/other.atlas", type: Laya.Loader.ATLAS, id: UI.UIDialogID.Normal, x: 0, y: 0, visible: false, },
                ];
            //console.log("scenewidth:"+pCfg._nSceneWidth+" sceneheight:"+pCfg._nSceneHeight+"swidth:"+Laya.Browser.clientWidth+"sheight:"+Laya.Browser.clientHeight);
            for (var i = 0; i < this.m_LoadItem.length; i++) {
                arrItem.push(this.m_LoadItem[i]);
            }
        };
        //初始化游戏主场景
        UIManager.prototype.InitMainLayer = function () {
            if (this.m_SceneCreateRole != null) {
                Laya.stage.removeChild(this.m_SceneCreateRole);
                this.m_SceneCreateRole.destroy();
                this.m_SceneCreateRole = null;
            }
            if (this.m_SceneLogin != null) {
                Laya.stage.removeChild(this.m_SceneLogin);
                this.m_SceneLogin.destroy();
                this.m_SceneLogin = null;
            }
            if (this.m_MapRootLayer != null) {
                Laya.stage.removeChild(this.m_MapRootLayer);
                this.m_MapRootLayer.destroy();
            }
            if (this.m_SceneLoading != null) {
                Laya.stage.removeChild(this.m_SceneLoading);
                this.m_SceneLoading.destroy();
                this.m_SceneLoading = null;
            }
            //显示UI
            for (var i = 0; i < this.m_LoadItem.length; i++) {
                var pItem = this.m_LoadItem[i];
                //if(pItem.visible == true)
                {
                    var pDialog = this.m_Dialog[pItem.id];
                    if (pDialog != null) {
                        pDialog.visible = pItem.visible;
                        Laya.stage.addChild(pDialog);
                        pDialog.zOrder = 1000;
                        pDialog.pos(pItem.x, pItem.y);
                    }
                }
            }
            this.m_MapRootLayer = new Laya.Sprite();
            Laya.stage.addChild(this.m_MapRootLayer);
            var pMap = GameMap.CustomGameMap.GetInstance();
            pMap.SetDisplayContainer(this.m_MapRootLayer);
            var pCfg = Config.GlobalConfig._Instance;
            pMap.SetDisplaySize(pCfg._nWidth, pCfg._nHeight);
            //loadingdialog框
            var pLoadingDialog = new UI.LoadingDialog();
            this.m_Dialog[UI.UIDialogID.LoadingDialog] = pLoadingDialog;
            this.InitDialogInfo();
        };
        //初始化对话框信息- 进入游戏后点击按钮才加载的
        UIManager.prototype.InitDialogInfo = function () {
            this.m_LoadItem =
                [
                    { url: "res/atlas/comp/dialog/role.json", type: Laya.Loader.ATLAS, id: UI.UIDialogID.Role, x: 0, y: 0, visible: true },
                    { url: "res/atlas/comp/dialog/skill.json", type: Laya.Loader.ATLAS, id: UI.UIDialogID.Skill, x: 0, y: 0, visible: true },
                    { url: "res/atlas/comp/dialog/map.json", type: Laya.Loader.ATLAS, id: UI.UIDialogID.Map, x: 0, y: 0, visible: true },
                    { url: "res/atlas/comp/dialog/itemtips.atlas", type: Laya.Loader.ATLAS, id: UI.UIDialogID.ItemTips, x: 0, y: 0, visible: true },
                ];
        };
        //加载创建角色场景
        UIManager.prototype.LoadCreateRoleScene = function () {
            this.m_LoadItem =
                [
                    { url: "res/atlas/comp/scene/createrole.json", type: Laya.Loader.ATLAS, id: UI.UIDialogID.CreateRole, x: 0, y: 0 },
                ];
            Laya.loader.load(this.m_LoadItem, Laya.Handler.create(this, this.onLoadedUI));
        };
        UIManager.prototype.GetHeaderDialog = function () {
            return this.m_Dialog[UI.UIDialogID.Header];
        };
        UIManager.prototype.GetJoyDialog = function () {
            return this.m_Dialog[UI.UIDialogID.Joy];
        };
        UIManager.prototype.GetNpcDialog = function () {
            return this.m_Dialog[UI.UIDialogID.NpcTalk];
        };
        UIManager.prototype.GetMiniMapDialog = function () {
            return this.m_Dialog[UI.UIDialogID.MiniMap];
        };
        UIManager.prototype.GetTopHeaderDialog = function () {
            return this.m_Dialog[UI.UIDialogID.TopHeader];
        };
        UIManager.prototype.GetLogDialog = function () {
            return null;
            // return this.m_Dialog[UIDialogID.Log] as UI.Log;
        };
        UIManager.prototype.GetItemTipsDialog = function () {
            if (this.m_Dialog[UI.UIDialogID.ItemTips] == null) {
                return null;
            }
            return this.m_Dialog[UI.UIDialogID.ItemTips];
        };
        UIManager.prototype.CreateUI = function (pItem, isShow) {
            if (isShow === void 0) { isShow = false; }
            switch (pItem.id) {
                case UI.UIDialogID.Login:
                    {
                        this.m_SceneLogin = new UI.Login();
                        Laya.stage.removeChild(this.m_SceneLoading);
                        Laya.stage.addChild(this.m_SceneLogin);
                        break;
                    }
                case UI.UIDialogID.CreateRole:
                    {
                        this.m_SceneLogin.destroy();
                        Laya.stage.removeChild(this.m_SceneLogin);
                        this.m_SceneCreateRole = new UI.CreateRole();
                        Laya.stage.addChild(this.m_SceneCreateRole);
                        break;
                    }
                case UI.UIDialogID.Loading:
                    {
                        this.m_SceneLoading = new UI.Loading();
                        //载入加载场景，加载配置文件资源
                        Laya.stage.addChild(this.m_SceneLoading);
                        this.m_SceneLoading.zOrder = 1000;
                        this.m_SceneLoading.Init();
                        //日志对话框
                        // let pLogDialog:UI.Log = new UI.Log();
                        // this.m_Dialog[UIDialogID.Log] = pLogDialog;
                        // Laya.stage.addChild(pLogDialog);
                        // pLogDialog.pos(200,0);
                        // pLogDialog.zOrder = 1001;
                        break;
                    }
            }
            var ui = null;
            switch (pItem.id) {
                case UI.UIDialogID.Header:
                    {
                        ui = new UI.Header();
                        break;
                    }
                case UI.UIDialogID.Joy:
                    {
                        ui = new UI.Joy();
                        break;
                    }
                case UI.UIDialogID.JoyBtn:
                    {
                        ui = new UI.Joybtn();
                        break;
                    }
                case UI.UIDialogID.NpcTalk:
                    {
                        ui = new UI.NpcTalk();
                        break;
                    }
                case UI.UIDialogID.MiniMap:
                    {
                        ui = new UI.MiniMap();
                        break;
                    }
                case UI.UIDialogID.TopHeader:
                    {
                        ui = new UI.TopHeader();
                        break;
                    }
                case UI.UIDialogID.Shortcut:
                    {
                        ui = new UI.Shortcut();
                        break;
                    }
                case UI.UIDialogID.Role:
                    {
                        ui = new UI.Role();
                        break;
                    }
                case UI.UIDialogID.Skill:
                    {
                        ui = new UI.Skill();
                        break;
                    }
                // case UIDialogID.Log:
                // {
                //     ui = new UI.Log();
                //     isShow = true;
                //     break;
                // }
                case UI.UIDialogID.Map:
                    {
                        ui = new UI.Map();
                        break;
                    }
                case UI.UIDialogID.ItemTips:
                    {
                        ui = new UI.ItemTips();
                        break;
                    }
                case UI.UIDialogID.Main:
                    {
                        ui = new UI.Main();
                        break;
                    }
            }
            if (ui != null) {
                this.m_Dialog[pItem.id] = ui;
                if (isShow) {
                    Laya.stage.addChild(ui);
                    ui.pos(pItem.x, pItem.y);
                    ui.zOrder = 1000; //最优先层
                    //日志在最高层
                    // if(pItem.id == UIDialogID.Log)
                    // {
                    //     ui.zOrder = 10000;
                    // }
                    //物品tips
                    if (pItem.id == UI.UIDialogID.ItemTips) {
                        ui.ShowItem(Config.GlobalConfig._Instance._CurrentShowItem, Config.GlobalConfig._Instance._ShowItemTipsType);
                    }
                }
            }
        };
        UIManager.prototype.onLoadedUI = function () {
            for (var i in this.m_LoadItem) {
                var pItem = this.m_LoadItem[i];
                this.CreateUI(pItem);
            }
        };
        UIManager.prototype.OnMouseDown = function () {
        };
        UIManager.prototype.OnMouseUp = function () {
            if (this.GetJoyDialog() != null) {
                this.GetJoyDialog().OnJoyMouseUp();
            }
        };
        UIManager.prototype.Update = function (nCurrentTick) {
            var pJoyDialog = this.GetJoyDialog();
            if (pJoyDialog != null) {
                pJoyDialog.Update(nCurrentTick);
            }
            var pItemTips = this.GetItemTipsDialog();
            if (pItemTips != null && pItemTips.parent != null) {
                pItemTips.Update(nCurrentTick);
            }
        };
        //加载对话框完成
        UIManager.prototype.onLoadedDialog = function (e) {
            var pLoadingDialog = this.m_Dialog[UI.UIDialogID.LoadingDialog];
            if (pLoadingDialog != null) {
                pLoadingDialog.removeSelf();
            }
            this.CreateUI(e, true);
        };
        UIManager.prototype.onLoadedDialogProgress = function (v) {
            var pLoadingDialog = this.m_Dialog[UI.UIDialogID.LoadingDialog];
            if (pLoadingDialog != null) {
                pLoadingDialog.UpdateProgress(v);
            }
        };
        UIManager.prototype.HideDialog = function (nDialogId) {
            if (this.m_Dialog[nDialogId] != null) {
                var pDialog = this.m_Dialog[nDialogId];
                Laya.stage.removeChild(pDialog);
            }
        };
        UIManager.prototype.ShowDialog = function (nDialogId) {
            if (this.m_Dialog[nDialogId] != null) {
                var pDialog = this.m_Dialog[nDialogId];
                Laya.stage.addChild(pDialog);
                return;
            }
            if (this.m_LoadingDialog[nDialogId] != null) {
                return;
            }
            var pLoadingDialog = this.m_Dialog[UI.UIDialogID.LoadingDialog];
            if (pLoadingDialog != null && pLoadingDialog.parent != null) {
                return;
            }
            for (var i = 0; i < this.m_LoadItem.length; i++) {
                if (this.m_LoadItem[i].id == nDialogId) {
                    Laya.stage.addChild(pLoadingDialog);
                    var asset = [];
                    asset.push(this.m_LoadItem[i]);
                    this.m_LoadingDialog[nDialogId] = true;
                    Laya.loader.load(asset, Laya.Handler.create(this, this.onLoadedDialog, [this.m_LoadItem[i]]), Laya.Handler.create(this, this.onLoadedDialogProgress));
                    break;
                }
            }
        };
        UIManager._Instance = null;
        return UIManager;
    }());
    UI.UIManager = UIManager;
})(UI || (UI = {}));
//# sourceMappingURL=UIManager.js.map