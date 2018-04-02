
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;                  
module ui {
    export class GameInfoUI extends View {
		public pauseBtn:laya.ui.Button;
		public levelLabel:laya.ui.Label;
		public scoreLabel:laya.ui.Label;
		public hpLabel:laya.ui.Label;
		public infoLabel:laya.ui.Label;

        public static  uiView:any ={"type":"View","child":[{"props":{"x":403,"y":10,"skin":"war/btn_pause.png","stateNum":"1","var":"pauseBtn"},"type":"Button"},{"props":{"x":107,"y":24,"text":"Level:50","color":"#f3e9e9","width":91,"height":25,"fontSize":20,"var":"levelLabel"},"type":"Label"},{"props":{"x":210,"y":24,"text":"Score:100","color":"#f8dd18","width":154,"height":25,"fontSize":20,"var":"scoreLabel"},"type":"Label"},{"props":{"x":24,"y":24,"text":"Hp:10","color":"#62f81c","width":74,"height":25,"fontSize":20,"var":"hpLabel"},"type":"Label"},{"props":{"x":44,"y":408,"text":"战斗结束","width":392,"height":102,"var":"infoLabel","align":"center","color":"#ffffff","fontSize":30,"wordWrap":true},"type":"Label"}],"props":{"width":480,"height":852}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameInfoUI.uiView);
        }
    }
}
