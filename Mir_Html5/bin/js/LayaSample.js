// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        //private sMapAddr:string  = "http://cdn.zr2.51.com/v1/map/122BiQiCheng.wwm";
        this.sMapAddr = "./data/map/122BiQiCheng.wwm";
        this.Ani = null;
        this.m_bMouseMove = false;
        this.m_nFrameTick = 0;
        this.rich = null;
        this.m_Sprite = null;
        console.log("main start");
        //Laya.timer.loop(5000,this,this.onTimerStart);
        // this.onTimerStart();
        this.OnStart();
    }
    GameMain.prototype.OnStart = function () {
        var pCfg = Config.GlobalConfig._Instance;
        Laya.init(pCfg._nWidth, pCfg._nHeight, Laya.WebGL);
        var nWidth = Laya.Browser.clientWidth;
        //laya.resource.ResourceManager.systemResourceManager.autoRelease = false; 
        Laya.stage.scaleMode = "exactfit";
        //Laya.stage.scaleMode =  "fixedauto"; //
        Laya.stage.screenMode = "horizontal"; //横屏
        Laya.stage.frameRate = "slow";
        //   console.log("缩放系数X:"+Laya.stage.clientScaleX+ "缩放系数Y:"+Laya.stage.clientScaleY);
        // pCfg._nSceneWidth = Laya.Browser.clientWidth;
        // pCfg._nSceneHeight = Laya.Browser.clientHeight;
        pCfg._nSceneWidth = pCfg._nWidth;
        pCfg._nSceneHeight = pCfg._nHeight;
        var Stat = Laya.Stat;
        Stat.show(0, 0);
        var loader = [];
        LogicManager.GetInstance().Init();
        Laya.timer.loop(30, this, this.OnLogicRun);
        //添加键盘按下事件,一直按着某按键则会不断触发
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
        //添加键盘抬起事件
        Laya.stage.on(Laya.Event.KEY_UP, this, this.onKeyUp);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.OnMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.OnMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.OnMouseMove);
        //Laya.stage.on(Laya.Event.RESIZE,this,this.OnReSize);
        //测试富文本
        //<(type:2,file:data/yiyi.jpg,width:640,height:826)>
        // this.rich =  new UI.RichText();
        // let str:string = "<(type:1,color:FFFFFF,link:showwin)一个超文本链接><(type:1,color:FFFFFF)攻击属性><(type:3,width:100,height:100,index:1)>";
        // str +="\\"+str;
        // this.rich.SetText(str);
        // this.rich .stage.addChild(this.rich );
        // this.rich .pos(200,200);
        // this.rich .zOrder = 100000;
        //测试精灵点击事件
        // let a:Laya.Sprite = new Laya.Sprite();
        // this.m_Sprite = new Laya.Sprite();
        // //this.m_Sprite.loadImage("./data/yiyi.JPG");
        // this.m_Sprite.on(Laya.Event.CLICK,this,this.onImageClick);
        // a.addChild(this.m_Sprite);
        // Laya.stage.addChild(a);
        // a.pos(100,100);
        // a.zOrder = 10000;
        // let rect = this.m_Sprite.hitArea;
        // Laya.loader.load("./data/yiyi.JPG",Laya.Handler.create(this,this.onLoadImage));
    };
    // private OnReSize():void
    // {
    //     let nWidth:number = Laya.Browser.width;
    //     let nHeight:number = Laya.Browser.height;
    //     let pCfg = Config.GlobalConfig._Instance;
    //     pCfg._nWidth = pCfg._nSceneWidth = Laya.Browser.width;
    //     pCfg._nHeight = pCfg._nSceneHeight = Laya.Browser.height;
    //     Laya.stage.setScreenSize(nWidth,nHeight);
    // }
    GameMain.prototype.onTimerStart = function () {
        var pCfg = Config.GlobalConfig._Instance;
        pCfg._nWidth = pCfg._nSceneWidth = Laya.Browser.width;
        pCfg._nHeight = pCfg._nSceneHeight = Laya.Browser.height;
    };
    // private onLoadImage(data):void
    // {
    //     this.m_Sprite.texture = data as Laya.Texture;
    //     this.m_Sprite.hitArea = new laya.maths.Rectangle(0,0,this.m_Sprite.texture.width,this.m_Sprite.texture.height);
    //    //console.log("11111");
    // }
    // private onImageClick():void
    // {
    //     console.log("onImageClick");
    //     let a:number = 0;
    //     a++;
    // }
    GameMain.prototype.OnMouseMove = function (e) {
        var touches = e.touches;
        if (this.m_bMouseMove) {
            LogicManager.GetInstance().OnMouseDown(Laya.stage.mouseX, Laya.stage.mouseY);
        }
    };
    GameMain.prototype.OnMouseUp = function (e) {
        if (e.target == Laya.stage) {
            UI.UIManager.GetInstance().OnMouseUp(); //恢复摇杆
            LogicManager.GetInstance().OnMouseUp(Laya.stage.mouseX, Laya.stage.mouseY);
        }
        this.m_bMouseMove = false;
    };
    GameMain.prototype.OnMouseDown = function (e) {
        //单击了除了UI之外的位置
        if (e.target == Laya.stage) {
            var ret = LogicManager.GetInstance().OnMouseDown(Laya.stage.mouseX, Laya.stage.mouseY);
            if (ret) {
                this.m_bMouseMove = true;
            }
        }
    };
    /**键盘按下处理*/
    GameMain.prototype.onKeyDown = function (e) {
        var keyCode = e["keyCode"];
        //this.m_nKeyCode = keyCode;
    };
    /**键盘抬起处理*/
    GameMain.prototype.onKeyUp = function (e) {
        var keyCode = e["keyCode"];
        switch (keyCode) {
            case 38: //上光标键
                {
                    // let Player:Entity.Player =Entity.Player.GetInstance();
                    // let pPath:GameMap.MapPath  = GameMap.CustomGameMap.GetInstance().GetMapPath();
                    // let ret:Laya.Point[] = pPath.FindPath(Player.GetCurentX(),Player.GetCurrentY(),100,135);
                    // if(ret != null)
                    // {
                    // }
                    // this.Map.MoveTo(100,105,400);
                    break;
                }
        }
    };
    GameMain.prototype.OnLogicRun = function () {
        var nCurrentTime = Laya.timer.currTimer;
        // if(this.Ani != null)
        // {
        //     this.Ani.Update(nCurrentTime);
        // }
        //标准间隔
        var pCfg = Config.GlobalConfig._Instance;
        LogicManager.GetInstance().Update(nCurrentTime);
        pCfg._nCurrentFrameTick = nCurrentTime;
        if (this.rich != null) {
            this.rich.Update(nCurrentTime);
        }
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map