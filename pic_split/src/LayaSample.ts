// 程序入口
import Sprite = Laya.Sprite;
import Texture = laya.resource.Texture
import HTMLCanvas = laya.resource.HTMLCanvas
import Browser = laya.utils.Browser
import WebGL = laya.webgl.WebGL;
import Handler = laya.utils.Handler
     
class GameMain{
    private sp: Sprite;
    private srcData: string = "res/atlas/srcList.data"
    private srcFileList = []
    private fileIndex:number = 0

    private srcFile: string = "res/atlas/comp/scene/login"
    private prefix: string
    private picIndex:number = 0
    private datas = []

    constructor()
    {
        Laya.init(Browser.width, Browser.height,WebGL);
        Laya.stage.bgColor = "#ffcccc";
        Laya.stage.on(laya.events.Event.CLICK, this, this.onClick); 
       
        Laya.loader.load(this.srcData, Handler.create(this, this.onSrcDataLoaded), null, Laya.Loader.TEXT);
    }

    onSrcDataLoaded():void
    {
        const strData = Laya.loader.getRes(this.srcData)
        this.srcFileList = strData.split("\n")
        this.fileIndex = 0

        this.checkLoadJson()
    }

    checkLoadJson():void
    {
        if(this.fileIndex >= this.srcFileList.length - 1)
            return

        this.srcFile = this.srcFileList[this.fileIndex]
        // console.log("*******check load json:", this.fileIndex, this.srcFileList.length, this.srcFile)
        this.fileIndex = this.fileIndex + 1

        Laya.loader.load(this.srcFile + ".json", Handler.create(this, this.onJsonLoaded), null, Laya.Loader.JSON);
    }
        
    onJsonLoaded():void
    {
        this.datas = []

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
            // console.log("add data:[pic, h, w]:", pic, h, w)
        }
        this.prefix = json["meta"]["prefix"]

        Laya.loader.clearRes(path)
        Laya.loader.load(path, Handler.create(this, this.onPicLoaded), null, Laya.Loader.ATLAS);
    }

    onPicLoaded():void
    {
        console.log("==========on pic loaded", this.srcFile)
        this.picIndex = 0
        this.checkCreateFile()
    }

    checkCreateFile():void
    {
        if(this.picIndex >= this.datas.length)
        {
            this.checkLoadJson()
            return
        }
        
        const data = this.datas[this.picIndex]
        const loadPic = this.prefix + data[0]
        this.sp = new Sprite();
        this.sp.loadImage(loadPic);
        console.log("load image:", loadPic)
        Laya.stage.addChild(this.sp); 

        Laya.timer.once(1, this, this.onClick);    
    }           

    onClick():void
    {
        //HTMLCanvas 是 Html Canvas 的代理类，封装了 Canvas 的属性和方法。。请不要直接使用 new HTMLCanvas！
        //此处将canvas指定区域进行截屏
        const data = this.datas[this.picIndex]
        const pic = data[0]
        const h = data[1]
        const w = data[2]
        const loadPic = this.srcFile + "/" + pic

        var htmlC:HTMLCanvas = this.sp.drawToCanvas(w,h,0,0);
        //获取截屏区域的texture
        var _texture:Texture = new Texture(htmlC);

        var a = document.createElement("a");
        a.href = htmlC.getCanvas().toDataURL();
        a.download = loadPic;
        a.click();    

        this.picIndex = this.picIndex + 1
        this.checkCreateFile()    
    }    
}
new GameMain();
