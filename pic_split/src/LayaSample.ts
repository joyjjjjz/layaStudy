// 程序入口
import Sprite = Laya.Sprite;
import Texture = laya.resource.Texture
import HTMLCanvas = laya.resource.HTMLCanvas
import Browser = laya.utils.Browser
import WebGL = laya.webgl.WebGL;
import Handler = laya.utils.Handler
     
class GameMain{
    private sp: Sprite;
    private srcFile: string = "res/atlas/comp/scene/login"
    private prefix: string
    private index:number = 0
    private datas = []

    constructor()
    {
        Laya.init(Browser.width, Browser.height,WebGL);
        Laya.stage.bgColor = "#ffcccc";
        Laya.stage.on(laya.events.Event.CLICK, this, this.onClick); 
        Laya.loader.load(this.srcFile + ".json", Handler.create(this, this.onJsonLoaded), null, Laya.Loader.JSON);
    }
        
    onJsonLoaded():void
    {
        const path = this.srcFile + ".json"
        const json:JSON=Laya.loader.getRes(path);
        const datas = json["frames"]
        for (let pic in datas)
        {
            const data = datas[pic]
            const sourceSize = data.sourceSize
            const h=sourceSize.h, w=sourceSize.w
            const add = [pic, h, w]
            this.datas.push(add)
            console.log("add data:[pic, h, w]:", pic, h, w)
        }
        this.prefix = json["meta"]["prefix"]

        Laya.loader.clearRes(path)
        Laya.loader.load(path, Handler.create(this, this.onPicLoaded), null, Laya.Loader.ATLAS);
    }

    onPicLoaded():void
    {
        console.log("on pic loaded", this.srcFile)
        this.index = 0
        this.checkCreateFile()
    }

    checkCreateFile():void
    {
        if(this.index >= this.datas.length)
            return
        
        const data = this.datas[this.index]
        const pic = data[0]
        const h = data[1]
        const w = data[2]
        var loadPic 
        // loadPic = "comp/scene/login/btn_enter.png"
        loadPic = this.prefix + pic
        this.sp = new Sprite();
        this.sp.loadImage(loadPic);
        console.log("load image:", loadPic)
        Laya.stage.addChild(this.sp); 

        var img:Laya.Image = new Laya.Image();
        img.skin = loadPic;
        //添加到舞台上显示
        // Laya.stage.addChild(img);

        Laya.timer.once(100, this, this.onClick);    
    }           

    onClick():void
    {
        //HTMLCanvas 是 Html Canvas 的代理类，封装了 Canvas 的属性和方法。。请不要直接使用 new HTMLCanvas！
        //此处将canvas指定区域进行截屏
        var htmlC:HTMLCanvas = this.sp.drawToCanvas(300,300,0,0);
        //获取截屏区域的texture
        var _texture:Texture = new Texture(htmlC);

        var a = document.createElement("a");
        a.href = htmlC.getCanvas().toDataURL();
        a.download = "test444";
        a.click();        
    }    
}
new GameMain();
