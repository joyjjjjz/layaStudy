/**
 * 角色类
 */
class Role extends Laya.Sprite {
    //是否缓存了动画
    private static cached: boolean = false;
    //定义飞机的身体
    private body: Laya.Animation;
    //定义飞机类型
    public type: string;
    //阵营,0：我方，1：敌方
    public camp: number;
    //血量
    public hp: number;
    //飞行速度
    public speed: number;
    //攻击半径
    public hitRadius: number = 0;
    //射击类型
    public shootType: number = 0;
    //射击间隔
    public shootInterval: number = 400;
    //下次射击时间
    public shootTime: number = Laya.Browser.now() + 100;
    //当前动作
    public action: string;
    /**0：普通，1：子弹，2：弹药，3：补给品 */
    public heroType: number = 0;

    constructor() {
        super();
    }

    public init(type: string, camp: number, hp: number, speed: number, hitRadius: number, heroType: number = 0): void {
        //初始化角色属性
        this.type = type;
        this.camp = camp;
        this.hp = hp;
        this.speed = speed;
        this.hitRadius = hitRadius;
        this.heroType = heroType;

        //显示碰撞区域
        //this.graphics.clear();
        //this.graphics.drawCircle(0, 0, hitRadius, null, "#ff0000")

        //缓存公用动画模板，减少对象创建开销
        if (!Role.cached) {
            Role.cached = true;
            //缓存hero_fly动画
            Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
            //缓存hero_down动画
            Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], "hero_down");

            //缓存enemy1_fly动画
            Laya.Animation.createFrames(["war/enemy1_fly1.png"], "enemy1_fly");
            //缓存enemy1_down动画
            Laya.Animation.createFrames(["war/enemy1_down1.png", "war/enemy1_down2.png", "war/enemy1_down3.png", "war/enemy1_down4.png"], "enemy1_down");

            //缓存enemy2_fly动画
            Laya.Animation.createFrames(["war/enemy2_fly1.png"], "enemy2_fly");
            //缓存enemy2_down动画
            Laya.Animation.createFrames(["war/enemy2_down1.png", "war/enemy2_down2.png", "war/enemy2_down3.png", "war/enemy2_down4.png"], "enemy2_down");
            //缓存enemy2_hit动画
            Laya.Animation.createFrames(["war/enemy2_hit.png"], "enemy2_hit");

            //缓存enemy3_fly动画
            Laya.Animation.createFrames(["war/enemy3_fly1.png", "war/enemy3_fly2.png"], "enemy3_fly");
            //缓存enemy3_down动画
            Laya.Animation.createFrames(["war/enemy3_down1.png", "war/enemy3_down2.png", "war/enemy3_down3.png", "war/enemy3_down4.png", "war/enemy3_down5.png", "war/enemy3_down6.png"], "enemy3_down");
            //缓存enemy3_hit动画
            Laya.Animation.createFrames(["war/enemy3_hit.png"], "enemy3_hit");

            //缓存子弹动画
            Laya.Animation.createFrames(["war/bullet1.png"], "bullet1_fly");
            //缓存UFO1
            Laya.Animation.createFrames(["war/ufo1.png"], "ufo1_fly");
            //缓存UFO2
            Laya.Animation.createFrames(["war/ufo2.png"], "ufo2_fly");
        }

        if (!this.body) {
            //创建一个动画作为飞机的身体
            this.body = new Laya.Animation();
            //动画播放时间间隔
            this.body.interval = 50;
            //把机体添加到容器内
            this.addChild(this.body);

            //增加动画播放完成监听
            this.body.on("complete", this, this.onPlayComplete);
        }
        //播放飞行动画
        this.playAction("fly");
    }

    onPlayComplete(): void {
        //如果是击毁动画，则隐藏对象
        if (this.action === "down") {
            //停止动画播放
            this.body.stop();
            //隐藏显示，通过此标记，在下帧进行回收
            this.visible = false;
        } else if (this.action === "hit") {
            //如果是被击动画播放完毕，则接着播放飞行动画
            this.playAction("fly");
        }
    }

    playAction(action: string): void {
        //纪录当前播放动画类型
        this.action = action;
        //根据类型播放动画
        this.body.play(0, true, this.type + "_" + action);
        //获取动画大小区域
        var bound: Laya.Rectangle = this.body.getBounds();
        //设置机身剧中
        this.body.pos(-bound.width / 2, -bound.height / 2);
    }
}