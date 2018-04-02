// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        this._ArrSprite = null;
        Laya.init(600, 400);
        var stat = Laya.Stat;
        stat.show(0, 0);
        Laya.loader.load("yiyi.jpg", Laya.Handler.create(this, this.onLoadTexture));
        var btn = new Laya.Label("创建精灵");
        btn.color = "#FFFFFF";
        Laya.stage.addChild(btn);
        btn.pos(100, 100);
        btn.zOrder = 100;
        btn.on(Laya.Event.CLICK, this, this.OnCreateSprite);
    }
    GameMain.prototype.onLoadTexture = function (data) {
        this._Texture = data;
    };
    GameMain.prototype.OnCreateSprite = function () {
        var res = Laya.loader.getRes("yiyi.jpg");
        if (this._ArrSprite != null) {
            for (var i = 0; i < 100; i++) {
                var sprite = this._ArrSprite[i];
                sprite.removeSelf();
                sprite.texture.destroy();
                res = Laya.loader.getRes("yiyi.jpg");
                sprite.destroy();
            }
            this._ArrSprite = null;
            res = Laya.loader.getRes("yiyi.jpg");
        }
        else {
            this._ArrSprite = new Array();
            for (var i = 0; i < 100; i++) {
                var sprite = new Laya.Sprite();
                sprite.texture = this._Texture;
                Laya.stage.addChild(sprite);
                this._ArrSprite.push(sprite);
            }
        }
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map