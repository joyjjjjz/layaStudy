// 程序入口
import Sprite = Laya.Sprite;
import Texture = laya.resource.Texture
import HTMLCanvas = laya.resource.HTMLCanvas
import Browser = laya.utils.Browser
import WebGL = laya.webgl.WebGL;
     
class GameMain{
    private sp: Sprite;
    constructor()
    {
        //初始化引擎
        Laya.init(Browser.width, Browser.height,WebGL);
        //设置背景颜色
        Laya.stage.bgColor = "#ffcccc";
        //设置舞台CLICK，该CLICK作为截屏的开关，点击舞台，对舞台对应的canvas区域进行截屏
        Laya.stage.on(laya.events.Event.CLICK, this, this.onClick);
        //随意绘制显示对象
        this.sp = new Sprite();
        this.sp.loadImage("../src_dir/comp/scene/login.png");
        Laya.stage.addChild(this.sp); 

        Laya.timer.once(100, this, this.onClick);        
    }

    onClick():void
    {
        //HTMLCanvas 是 Html Canvas 的代理类，封装了 Canvas 的属性和方法。。请不要直接使用 new HTMLCanvas！
        //此处将canvas指定区域进行截屏
        var htmlC:HTMLCanvas = this.sp.drawToCanvas(300,300,0,0);
        //获取截屏区域的texture
        var _texture:Texture = new Texture(htmlC);
            
        //将截屏的texture进行draw绘制并显示到舞台
        var sp2:Sprite = new Sprite();
        sp2.x = 300;
        sp2.graphics.drawTexture(_texture,0,0,300,300);
        // Laya.stage.addChild(sp2);

        var a = document.createElement("a");
        a.href = htmlC.getCanvas().toDataURL();
        a.download = "test444";
        a.click();        
    }    
}
new GameMain();
