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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var Main;
    (function (Main) {
        var HeaderUI = /** @class */ (function (_super) {
            __extends(HeaderUI, _super);
            function HeaderUI() {
                return _super.call(this) || this;
            }
            HeaderUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Main.HeaderUI.uiView);
            };
            HeaderUI.uiView = { "type": "Dialog", "props": { "width": 305, "height": 128 }, "child": [{ "type": "Image", "props": { "y": -10, "x": 80, "staticCache": true, "skin": "comp/main/header/image_fightbg.png", "cacheAs": "bitmap" } }, { "type": "Image", "props": { "y": 16, "x": 4, "staticCache": true, "skin": "comp/main/header/image_tao.png", "cacheAs": "bitmap" } }, { "type": "Image", "props": { "y": -2, "x": 81, "staticCache": true, "skin": "comp/main/header/image_fight.png", "cacheAs": "bitmap" } }, { "type": "Image", "props": { "y": 0, "x": 0, "visible": true, "staticCache": true, "skin": "comp/main/header/bg_header.png", "mouseThrough": true, "mouseEnabled": true, "hitTestPrior": true, "cacheAs": "bitmap" } }, { "type": "Label", "props": { "y": 104, "x": 75, "width": 29, "var": "m_label_level", "text": "1", "strokeColor": "#0a0909", "stroke": 1, "height": 19, "fontSize": 19, "font": "SimSun", "color": "#f9f3f3", "align": "center" } }, { "type": "Label", "props": { "y": 5, "x": 5, "width": 23, "var": "m_label_job", "text": "法", "strokeColor": "#0d0d0d", "stroke": 1, "height": 12, "fontSize": 20, "font": "SimSun", "color": "#f8f1f1" } }, { "type": "ProgressBar", "props": { "y": 38, "x": 89, "var": "m_progress_hp", "value": 1, "skin": "comp/main/header/progressBar_hp.png", "mouseEnabled": false } }, { "type": "ProgressBar", "props": { "y": 54, "x": 96, "var": "m_progress_mp", "value": 1, "skin": "comp/main/header/progressBar_mp.png", "mouseEnabled": false } }, { "type": "Label", "props": { "y": 35, "x": 94, "width": 157, "var": "m_label_hp", "text": "1000/1000", "strokeColor": "#060606", "stroke": 1, "height": 12, "fontSize": 20, "font": "SimSun", "color": "#f9f1f1", "align": "center" } }, { "type": "Label", "props": { "y": 52, "x": 95, "width": 157, "var": "m_label_mp", "text": "1000/1000", "strokeColor": "#060606", "stroke": 1, "height": 12, "fontSize": 20, "font": "SimSun", "color": "#f9f1f1", "align": "center" } }, { "type": "Button", "props": { "y": 78, "x": 110, "stateNum": 1, "skin": "comp/main/header/button_pk.png", "labelStroke": 1, "labelSize": 20, "labelColors": "#f9f3f3", "labelAlign": "center", "label": "和平" } }, { "type": "Button", "props": { "y": 78, "x": 177, "var": "m_btn_buff", "stateNum": 1, "skin": "comp/main/header/button_buff.png", "labelStroke": 1, "labelSize": 18, "labelColors": "#f9f3f3", "labelAlign": "center", "label": "BUFF" } }] };
            return HeaderUI;
        }(Dialog));
        Main.HeaderUI = HeaderUI;
    })(Main = ui.Main || (ui.Main = {}));
})(ui || (ui = {}));
(function (ui) {
    var Main;
    (function (Main) {
        var joyUI = /** @class */ (function (_super) {
            __extends(joyUI, _super);
            function joyUI() {
                return _super.call(this) || this;
            }
            joyUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Main.joyUI.uiView);
            };
            joyUI.uiView = { "type": "Dialog", "props": { "width": 123, "height": 123 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "comp/main/joy/image_joybg.png" } }, { "type": "Image", "props": { "y": 40, "x": 39, "var": "m_joy", "skin": "comp/main/joy/image_dir.png", "scaleY": 1, "scaleX": 1 } }] };
            return joyUI;
        }(Dialog));
        Main.joyUI = joyUI;
    })(Main = ui.Main || (ui.Main = {}));
})(ui || (ui = {}));
(function (ui) {
    var Main;
    (function (Main) {
        var joybtnUI = /** @class */ (function (_super) {
            __extends(joybtnUI, _super);
            function joybtnUI() {
                return _super.call(this) || this;
            }
            joybtnUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Main.joybtnUI.uiView);
            };
            joybtnUI.uiView = { "type": "Dialog", "props": { "width": 300, "height": 300 }, "child": [{ "type": "Image", "props": { "y": 161, "x": 158, "skin": "comp/main/joybtn/image_joybtnbg.png" } }, { "type": "Image", "props": { "y": 169, "x": 164, "var": "m_btn_normalatk", "skin": "comp/main/joybtn/image_joybtn.png" } }, { "type": "Button", "props": { "y": 154, "x": 260, "var": "m_btn_selectplayer", "stateNum": 1, "skin": "comp/main/joybtn/button_selectplayer.png" }, "child": [{ "type": "Image", "props": { "y": 40, "x": 16, "skin": "comp/main/joybtn/image_player.png", "mouseThrough": true, "mouseEnabled": false } }] }, { "type": "Button", "props": { "y": 260, "x": 149, "var": "m_btn_selectmonster", "stateNum": 1, "skin": "comp/main/joybtn/button_selectmonster.png" }, "child": [{ "type": "Image", "props": { "y": 14, "x": 41, "skin": "comp/main/joybtn/image_monster.png", "mouseThrough": true, "mouseEnabled": false } }] }] };
            return joybtnUI;
        }(Dialog));
        Main.joybtnUI = joybtnUI;
    })(Main = ui.Main || (ui.Main = {}));
})(ui || (ui = {}));
(function (ui) {
    var Main;
    (function (Main) {
        var loadingUI = /** @class */ (function (_super) {
            __extends(loadingUI, _super);
            function loadingUI() {
                return _super.call(this) || this;
            }
            loadingUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Main.loadingUI.uiView);
            };
            loadingUI.uiView = { "type": "Dialog", "props": { "width": 1136, "height": 640 }, "child": [{ "type": "Image", "props": { "y": 175, "x": 394, "skin": "comp/main/other/image_yiyi.png" } }, { "type": "Label", "props": { "y": 338, "x": 464, "width": 296, "var": "m_label_progress", "text": "正在加载", "height": 21, "fontSize": 32, "font": "SimSun", "color": "#f6f0ef", "bold": true, "align": "left" } }] };
            return loadingUI;
        }(Dialog));
        Main.loadingUI = loadingUI;
    })(Main = ui.Main || (ui.Main = {}));
})(ui || (ui = {}));
(function (ui) {
    var Main;
    (function (Main) {
        var logUI = /** @class */ (function (_super) {
            __extends(logUI, _super);
            function logUI() {
                return _super.call(this) || this;
            }
            logUI.prototype.createChildren = function () {
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                _super.prototype.createChildren.call(this);
                this.createView(ui.Main.logUI.uiView);
            };
            logUI.uiView = { "type": "Dialog", "props": { "width": 320, "height": 320 }, "child": [{ "type": "Button", "props": { "y": 6, "x": 231, "var": "m_btn_clear", "skin": "comp/main/log/button.png", "label": "清除" } }, { "type": "HTMLDivElement", "props": { "y": 39, "x": 4, "width": 313, "var": "m_text_log", "innerHTML": "htmlText", "height": 272 } }] };
            return logUI;
        }(Dialog));
        Main.logUI = logUI;
    })(Main = ui.Main || (ui.Main = {}));
})(ui || (ui = {}));
(function (ui) {
    var Main;
    (function (Main) {
        var mainUI = /** @class */ (function (_super) {
            __extends(mainUI, _super);
            function mainUI() {
                return _super.call(this) || this;
            }
            mainUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Main.mainUI.uiView);
            };
            mainUI.uiView = { "type": "Dialog", "props": { "width": 1136, "mouseThrough": true, "mouseEnabled": true, "height": 640 }, "child": [{ "type": "Image", "props": { "y": 6, "x": 0, "var": "m_image_header", "skin": "comp/main/main/image_top.png" } }] };
            return mainUI;
        }(Dialog));
        Main.mainUI = mainUI;
    })(Main = ui.Main || (ui.Main = {}));
})(ui || (ui = {}));
(function (ui) {
    var Main;
    (function (Main) {
        var minimapUI = /** @class */ (function (_super) {
            __extends(minimapUI, _super);
            function minimapUI() {
                return _super.call(this) || this;
            }
            minimapUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Main.minimapUI.uiView);
            };
            minimapUI.uiView = { "type": "Dialog", "props": { "width": 159, "height": 70 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "m_image_bg", "skin": "comp/main/minimap/image_bg.png" } }, { "type": "Label", "props": { "y": 3, "x": 5, "width": 143, "var": "m_label_mapname", "text": "卡诺萨城", "stroke": 2, "mouseThrough": true, "mouseEnabled": false, "height": 26, "fontSize": 33, "font": "SimSun", "color": "#e8f10c", "align": "center" } }, { "type": "Label", "props": { "y": 34, "x": 5, "width": 143, "var": "m_label_point", "text": "100 100", "stroke": 2, "mouseThrough": true, "mouseEnabled": false, "height": 26, "fontSize": 33, "font": "SimSun", "color": "#e8f10c", "align": "center" } }] };
            return minimapUI;
        }(Dialog));
        Main.minimapUI = minimapUI;
    })(Main = ui.Main || (ui.Main = {}));
})(ui || (ui = {}));
(function (ui) {
    var Main;
    (function (Main) {
        var npctalkUI = /** @class */ (function (_super) {
            __extends(npctalkUI, _super);
            function npctalkUI() {
                return _super.call(this) || this;
            }
            npctalkUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Main.npctalkUI.uiView);
            };
            npctalkUI.uiView = { "type": "Dialog", "props": { "width": 481, "height": 304 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "comp/main/npctalk/image_bg.png" } }, { "type": "Image", "props": { "y": 31, "x": 10, "skin": "comp/main/npctalk/image_head1.png" } }, { "type": "Image", "props": { "y": 169, "x": 342, "skin": "comp/main/npctalk/image_head.jpg" } }, { "type": "TextInput", "props": { "y": 21, "x": 142, "wordWrap": false, "width": 329, "var": "m_text_npctalk", "type": "text", "strokeColor": "#050100", "stroke": 2, "skin": "comp/textinput.png", "multiline": true, "mouseEnabled": false, "height": 145, "fontSize": 18, "font": "SimSun", "editable": false, "color": "#f3f308" } }, { "type": "Label", "props": { "y": 171, "x": 17, "width": 315, "var": "m_text_select1", "underline": true, "text": "label", "height": 22, "fontSize": 18, "font": "SimSun", "color": "#e1f404" } }, { "type": "Label", "props": { "y": 198, "x": 16, "width": 315, "var": "m_text_select2", "underline": true, "text": "label", "height": 22, "fontSize": 18, "font": "SimSun", "color": "#e1f404" } }, { "type": "Label", "props": { "y": 224, "x": 16, "width": 315, "var": "m_text_select3", "underline": true, "text": "label", "height": 22, "fontSize": 18, "font": "SimSun", "color": "#e1f404" } }, { "type": "Label", "props": { "y": 250, "x": 16, "width": 315, "var": "m_text_select4", "underline": true, "text": "label", "height": 22, "fontSize": 18, "font": "SimSun", "color": "#e1f404" } }, { "type": "Label", "props": { "y": 276, "x": 16, "width": 315, "var": "m_text_select5", "underline": true, "text": "label", "height": 22, "fontSize": 18, "font": "SimSun", "color": "#e1f404" } }, { "type": "Button", "props": { "y": 4, "x": 454, "width": 18, "var": "m_btnClose", "stateNum": 1, "skin": "comp/main/npctalk/button_close.jpg", "height": 17 } }] };
            return npctalkUI;
        }(Dialog));
        Main.npctalkUI = npctalkUI;
    })(Main = ui.Main || (ui.Main = {}));
})(ui || (ui = {}));
(function (ui) {
    var Main;
    (function (Main) {
        var shortcutUI = /** @class */ (function (_super) {
            __extends(shortcutUI, _super);
            function shortcutUI() {
                return _super.call(this) || this;
            }
            shortcutUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Main.shortcutUI.uiView);
            };
            shortcutUI.uiView = { "type": "Dialog", "props": {}, "child": [{ "type": "Button", "props": { "y": -2, "x": 3, "var": "m_btn_role", "stateNum": 1, "skin": "comp/main/shortcut/button_role.png" }, "child": [{ "type": "Image", "props": { "y": 54, "x": 4, "skin": "comp/main/shortcut/image_role.png" } }] }, { "type": "Button", "props": { "y": -9, "x": 83, "var": "m_btn_bag", "stateNum": 1, "skin": "comp/main/shortcut/button_bag.png" }, "child": [{ "type": "Image", "props": { "y": 61, "x": 16, "skin": "comp/main/shortcut/image_bag.png" } }] }, { "type": "Button", "props": { "y": 2, "x": 173, "var": "m_btn_skill", "stateNum": 1, "skin": "comp/main/shortcut/button_skill.png" }, "child": [{ "type": "Image", "props": { "y": 52, "x": 19, "skin": "comp/main/shortcut/image_skill.png" } }] }, { "type": "Button", "props": { "y": 0, "x": 270, "var": "m_btn_friend", "stateNum": 1, "skin": "comp/main/shortcut/button_friend.png" }, "child": [{ "type": "Image", "props": { "y": 53, "x": 16, "skin": "comp/main/shortcut/image_friend.png" } }] }, { "type": "Button", "props": { "y": 4, "x": 359, "var": "m_btn_guild", "stateNum": 1, "skin": "comp/main/shortcut/button_guild.png" }, "child": [{ "type": "Image", "props": { "y": 48, "x": 22, "skin": "comp/main/shortcut/image_guild.png" } }] }, { "type": "Button", "props": { "y": 1, "x": 457, "var": "m_btn_system", "stateNum": 1, "skin": "comp/main/shortcut/button_system.png" }, "child": [{ "type": "Image", "props": { "y": 52, "x": 18, "skin": "comp/main/shortcut/image_system.png" } }] }] };
            return shortcutUI;
        }(Dialog));
        Main.shortcutUI = shortcutUI;
    })(Main = ui.Main || (ui.Main = {}));
})(ui || (ui = {}));
(function (ui) {
    var Main;
    (function (Main) {
        var topheaderUI = /** @class */ (function (_super) {
            __extends(topheaderUI, _super);
            function topheaderUI() {
                return _super.call(this) || this;
            }
            topheaderUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Main.topheaderUI.uiView);
            };
            topheaderUI.uiView = { "type": "Dialog", "props": { "width": 1136, "height": 33 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1334, "skin": "comp/main/topheader/image_bg.png" } }, { "type": "Image", "props": { "y": 5, "x": 20, "skin": "comp/main/topheader/image_textbg.png" } }, { "type": "Image", "props": { "y": 5, "x": 180, "skin": "comp/main/topheader/image_textbg.png" } }, { "type": "Image", "props": { "y": 5, "x": 340, "skin": "comp/main/topheader/image_textbg.png" } }, { "type": "Image", "props": { "y": 5, "x": 500, "skin": "comp/main/topheader/image_textbg.png" } }, { "type": "Image", "props": { "y": 8, "x": 26, "skin": "comp/main/topheader/image_gold.png" } }, { "type": "Image", "props": { "y": 10, "x": 185, "skin": "comp/main/topheader/image_yuanbao.png" } }, { "type": "Image", "props": { "y": 7, "x": 345, "skin": "comp/main/topheader/image_bindgold.png" } }, { "type": "Image", "props": { "y": 9, "x": 504, "skin": "comp/main/topheader/image_bindyuanbao.png" } }, { "type": "Label", "props": { "y": 5, "x": 48, "width": 95, "var": "m_label_gold", "text": "111111", "strokeColor": "#0a0909", "stroke": 1, "height": 25, "fontSize": 25, "font": "SimSun", "color": "#fbf6f6", "align": "left" } }, { "type": "Label", "props": { "y": 5, "x": 210, "width": 95, "var": "m_label_yuanbao", "text": "111111", "strokeColor": "#0a0909", "stroke": 1, "height": 25, "fontSize": 25, "font": "SimSun", "color": "#fbf6f6", "align": "left" } }, { "type": "Label", "props": { "y": 5, "x": 369, "width": 95, "var": "m_label_bindgold", "text": "111111", "strokeColor": "#0a0909", "stroke": 1, "height": 25, "fontSize": 25, "font": "SimSun", "color": "#fbf6f6", "align": "left" } }, { "type": "Label", "props": { "y": 5, "x": 532, "width": 95, "var": "m_label_bindyuanbao", "text": "111111", "strokeColor": "#0a0909", "stroke": 1, "height": 25, "fontSize": 25, "font": "SimSun", "color": "#fbf6f6", "align": "left" } }] };
            return topheaderUI;
        }(Dialog));
        Main.topheaderUI = topheaderUI;
    })(Main = ui.Main || (ui.Main = {}));
})(ui || (ui = {}));
(function (ui) {
    var Scene;
    (function (Scene) {
        var createroleUI = /** @class */ (function (_super) {
            __extends(createroleUI, _super);
            function createroleUI() {
                return _super.call(this) || this;
            }
            createroleUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Scene.createroleUI.uiView);
            };
            createroleUI.uiView = { "type": "View", "props": { "width": 1024, "height": 768 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "comp/scene/createrole/00000.png" } }, { "type": "Image", "props": { "y": 158, "x": 110, "var": "m_warrior_man", "skin": "comp/scene/createrole/00011.png" } }, { "type": "Image", "props": { "y": 157, "x": 242, "var": "m_warrior_woman", "skin": "comp/scene/createrole/00009.png" } }, { "type": "Image", "props": { "y": 155, "x": 374, "var": "m_mage_man", "skin": "comp/scene/createrole/00007.png" } }, { "type": "Image", "props": { "y": 159, "x": 506, "var": "m_mage_woman", "skin": "comp/scene/createrole/00005.png" } }, { "type": "Image", "props": { "y": 156, "x": 637, "var": "m_tao_man", "skin": "comp/scene/createrole/00015.png" } }, { "type": "Image", "props": { "y": 158, "x": 768, "var": "m_tao_woman", "skin": "comp/scene/createrole/00013.png" } }, { "type": "Image", "props": { "y": 555, "x": 371, "var": "m_ImageCreate", "skin": "comp/scene/createrole/00355.png" } }, { "type": "TextInput", "props": { "y": 520, "x": 409, "width": 157, "var": "m_TextName", "type": "text", "text": "后天", "skin": "comp/textinput.png", "height": 22, "fontSize": 21, "font": "SimSun", "color": "#ffffff" } }] };
            return createroleUI;
        }(View));
        Scene.createroleUI = createroleUI;
    })(Scene = ui.Scene || (ui.Scene = {}));
})(ui || (ui = {}));
(function (ui) {
    var Scene;
    (function (Scene) {
        var loadingUI = /** @class */ (function (_super) {
            __extends(loadingUI, _super);
            function loadingUI() {
                return _super.call(this) || this;
            }
            loadingUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Scene.loadingUI.uiView);
            };
            loadingUI.uiView = { "type": "View", "props": { "width": 1136, "height": 640 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "comp/scene/loading/iamge_bg.png" } }, { "type": "ProgressBar", "props": { "y": 613, "x": 258, "var": "m_Progress", "skin": "comp/scene/loading/progressBar_q.png" }, "child": [{ "type": "Image", "props": { "y": -32, "x": -37, "skin": "comp/scene/loading/GameStart_ProgressBar_Bg.png" } }] }] };
            return loadingUI;
        }(View));
        Scene.loadingUI = loadingUI;
    })(Scene = ui.Scene || (ui.Scene = {}));
})(ui || (ui = {}));
(function (ui) {
    var Scene;
    (function (Scene) {
        var LoginUI = /** @class */ (function (_super) {
            __extends(LoginUI, _super);
            function LoginUI() {
                return _super.call(this) || this;
            }
            LoginUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Scene.LoginUI.uiView);
            };
            LoginUI.uiView = { "type": "View", "props": { "width": 1136, "height": 640 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "comp/scene/login/image_bg.png" } }, { "type": "Image", "props": { "y": 227, "x": 405, "skin": "comp/scene/login/image_login.png" }, "child": [{ "type": "Button", "props": { "y": 146, "x": 117, "var": "m_btnEnter", "skin": "comp/scene/login/btn_enter.png" } }, { "type": "TextInput", "props": { "y": 101, "x": 83, "width": 149, "var": "m_TextPaswd", "text": "yiyibushe", "skin": "comp/textinput.png", "height": 22, "fontSize": 18, "font": "SimSun", "color": "#ffffff" } }, { "type": "TextInput", "props": { "y": 67, "x": 83, "width": 149, "var": "m_TextUser", "text": "yiyi", "skin": "comp/textinput.png", "height": 22, "fontSize": 18, "font": "SimSun", "color": "#ffffff" } }] }] };
            return LoginUI;
        }(View));
        Scene.LoginUI = LoginUI;
    })(Scene = ui.Scene || (ui.Scene = {}));
})(ui || (ui = {}));
(function (ui) {
    var Window;
    (function (Window) {
        var itemtipsUI = /** @class */ (function (_super) {
            __extends(itemtipsUI, _super);
            function itemtipsUI() {
                return _super.call(this) || this;
            }
            itemtipsUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Window.itemtipsUI.uiView);
            };
            itemtipsUI.uiView = { "type": "Dialog", "props": {}, "child": [{ "type": "Image", "props": { "y": 1, "x": 1, "width": 318, "var": "m_image_bg", "skin": "comp/dialog/itemtips/image_bg.png", "sizeGrid": "11,11,11,11", "height": 78, "alpha": 0.5 } }, { "type": "Label", "props": { "y": 14, "x": 93, "width": 103, "var": "m_label_name", "text": "斩首者", "strokeColor": "#080808", "stroke": 1, "mouseEnabled": false, "height": 25, "fontSize": 24, "font": "SimSun", "color": "#f8f3f3", "align": "center" } }, { "type": "Label", "props": { "y": 51, "x": 98, "width": 103, "underlineColor": "#080808", "text": "糖糖糖糖糖糖糖糖糖糖糖糖糖糖", "strokeColor": "#060606", "stroke": 1, "height": 25, "color": "#f8f3f3" } }, { "type": "Button", "props": { "y": 3, "x": 268, "var": "m_btn_close", "stateNum": 1, "skin": "comp/main/other/button_close.png" } }, { "type": "Image", "props": { "y": 8, "x": 12, "width": 64, "var": "m_image_icon", "skin": "comp/dialog/itemtips/image_bg.png", "height": 64 } }, { "type": "Image", "props": { "y": 99, "x": 215, "visible": false, "skin": "comp/dialog/itemtips/image_egg.jpg" } }, { "type": "Button", "props": { "y": 42, "x": 96, "var": "m_btn_1", "stateNum": 1, "skin": "comp/main/other/button_1.png", "labelSize": 28, "labelFont": "SimSun", "labelColors": "FFFFFF", "label": "label" } }] };
            return itemtipsUI;
        }(Dialog));
        Window.itemtipsUI = itemtipsUI;
    })(Window = ui.Window || (ui.Window = {}));
})(ui || (ui = {}));
(function (ui) {
    var Window;
    (function (Window) {
        var MapUI = /** @class */ (function (_super) {
            __extends(MapUI, _super);
            function MapUI() {
                return _super.call(this) || this;
            }
            MapUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Window.MapUI.uiView);
            };
            MapUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 146, "x": 224, "skin": "comp/dialog/map/image_bg.png" } }, { "type": "Image", "props": { "y": 194, "x": 266, "var": "m_image_bg", "skin": "comp/dialog/map/image_ng.png" } }, { "type": "Image", "props": { "y": 234, "x": 963, "skin": "comp/dialog/map/image_jiu.png" } }, { "type": "List", "props": { "y": 277, "x": 961, "width": 124, "var": "m_list_npc", "vScrollBarSkin": "comp/dialog/map/vscroll.png", "selectEnable": true, "repeatX": 1, "height": 336 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "renderType": "render" }, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "text": "依依", "strokeColor": "#080808", "stroke": 1, "name": "label", "fontSize": 18, "font": "SimSun", "color": "#f6f0ef" } }] }] }, { "type": "Button", "props": { "y": 150, "x": 1139, "var": "m_btn_close", "stateNum": 1, "skin": "comp/main/other/button_close.png" } }] };
            return MapUI;
        }(Dialog));
        Window.MapUI = MapUI;
    })(Window = ui.Window || (ui.Window = {}));
})(ui || (ui = {}));
(function (ui) {
    var Window;
    (function (Window) {
        var roleUI = /** @class */ (function (_super) {
            __extends(roleUI, _super);
            function roleUI() {
                return _super.call(this) || this;
            }
            roleUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Window.roleUI.uiView);
            };
            roleUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 125, "x": 180, "skin": "comp/dialog/role/image_bg.png" } }, { "type": "Button", "props": { "y": 129, "x": 1112, "var": "m_btn_close", "stateNum": 1, "skin": "comp/main/other/button_close.png" } }, { "type": "Image", "props": { "y": 166, "x": 207, "width": 468, "skin": "comp/dialog/role/image_nk.png", "sizeGrid": "15,15,16,16", "height": 468 } }, { "type": "Image", "props": { "y": 167, "x": 672, "width": 468, "skin": "comp/dialog/role/image_nk.png", "sizeGrid": "15,15,16,16", "height": 360 } }, { "type": "Image", "props": { "y": 521, "x": 674, "width": 468, "skin": "comp/dialog/role/image_nk.png", "sizeGrid": "15,15,16,16", "height": 107 } }, { "type": "Button", "props": { "y": 533, "x": 687, "stateNum": 1, "skin": "comp/dialog/role/button_style.png", "label": "label" } }, { "type": "Button", "props": { "y": 537, "x": 832, "stateNum": 1, "skin": "comp/dialog/role/button_style.png", "label": "label" } }, { "type": "Button", "props": { "y": 531, "x": 975, "stateNum": 1, "skin": "comp/dialog/role/button_style.png", "label": "label" } }, { "type": "Image", "props": { "y": 208, "x": 197, "skin": "comp/dialog/role/image_bg2.png" } }, { "type": "Image", "props": { "y": -23, "x": 312, "skin": "comp/yiyi.JPG" } }] };
            return roleUI;
        }(Dialog));
        Window.roleUI = roleUI;
    })(Window = ui.Window || (ui.Window = {}));
})(ui || (ui = {}));
(function (ui) {
    var Window;
    (function (Window) {
        var skillUI = /** @class */ (function (_super) {
            __extends(skillUI, _super);
            function skillUI() {
                return _super.call(this) || this;
            }
            skillUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Window.skillUI.uiView);
            };
            skillUI.uiView = { "type": "Dialog", "props": { "width": 1136, "height": 640 }, "child": [{ "type": "Image", "props": { "y": 74, "x": 120, "skin": "comp/dialog/skill/image_bg.png" } }, { "type": "Button", "props": { "y": 77, "x": 1042, "var": "m_btn_close", "stateNum": 1, "skin": "comp/main/other/button_close.png" } }, { "type": "Image", "props": { "y": 208, "x": 192, "skin": "comp/dialog/skill/image_bg2.png" } }] };
            return skillUI;
        }(Dialog));
        Window.skillUI = skillUI;
    })(Window = ui.Window || (ui.Window = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map