// 程序入口
class GameMain{
    constructor()
    {
        //创建舞台，默认背景色是黑色的
        Laya.init(600, 300); 
        var txt = new Laya.Text(); 
        //设置文本内容
        txt.text = "Hello Layabox";  
        //设置文本颜色为白色，默认颜色为黑色
        txt.color = "#ffffff";  
        //将文本内容添加到舞台 
        Laya.stage.addChild(txt);
    }
}
new GameMain();