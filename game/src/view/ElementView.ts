// TypeScript file
class ElementView extends egret.Sprite {
    private thisparent:egret.Sprite;
    public constructor(tparent: egret.Sprite) {
        super();
        this.thisparent = tparent;
        this.init();
    }

    public location: number = 0;
    public _id: number = -1;
    public get id(): number {
        return this._id;
    }
    public set id(val: number) {
        this._id = val;
    }
    private bitmap: egret.Bitmap;
    private init(){
        this.touchEnabled = true;
        this.touchChildren = false;
        this.bitmap = new egret.Bitmap;
        var bitwidth: number = (GameData.stageW - 40) / GameData.maxColumn;
        this.bitmap.width = bitwidth - 10;
        this.bitmap.height = bitwidth - 10;
        this.bitmap.x = -1* bitwidth /2;
        this.bitmap.y = -1* bitwidth /2;
        this.addChild(this.bitmap);
    }

    public setTexture(val: string) {
        this.bitmap.texture = RES.getRes(val); 
    }


    //  焦点相关的操作
    private _focus: boolean =  false;
    public get focus() {
        return this._focus;
    }
    private _focusMc: egret.MovieClip;

    public setFocus(val : boolean) {
        if(this._focus != val) {
            // 状态发生了改变
            if(!this._focusMc){
                // 如果focusMovieClip还未被定义，先创建MovieClip
                var text = RES.getRes("foucsmc_png");
                var data = RES.getRes("focusmc_json");
                var mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, text);
                this._focusMc = new egret.MovieClip(mcf.generateMovieClipData("focusmc"));
                this._focusMc.width = this.bitmap.width;
                this._focusMc.height = this.bitmap.height;
                this._focusMc.x = this._focusMc.width / -2;
                this._focusMc.y =  this._focusMc.height / -2;
            }

            if(val) {
                this.addChild(this._focusMc);
                this._focusMc.play(-1);
            } else {
                if(this._focusMc.parent) {
                    this._focusMc.stop();
                    this.removeChild(this._focusMc);
                }
            }

        }
    }


    //  动画
    public speed: number = 700;

    // 移动到当前location位置
    public move(){
        var tw: egret.Tween = egret.Tween.get(this);
        tw.to({x: this.targetX(), y: this.targetY}, this.speed, egret.Ease.bounceOut);
    }

    // 新产生当前的element， 从上进行滑落
    public show(wait: number) {
        var tw: egret.Tween = egret.Tween.get(this);
        tw.wait(wait, false);
        tw.call(this.addThisToParent, this);
        tw.to({x: this.targetX(), y: this.targetY()}, this.speed, egret.Ease.bounceOut);
    }
    private addThisToParent(){
        if(this.parent) {
            this.parent.addChild(this);
        }
    }

    // 移动元素后，发现没有可以消除的元素
    public moveAndBack(location: number, isScale: boolean = false){
        var girdwidth: number = (GameData.stageW -40)/ GameData.maxColumn;
        var xx: number = 20 + girdwidth*(location % GameData.maxColumn) + girdwidth/2 + 5;
        var startY: number = (GameData.stageH -(GameData.stageH - 30)/6 -60) - girdwidth * GameData.maxColumn;
        var yy: number = startY + girdwidth*( Math.floor(location / GameData.maxColumn)) + girdwidth/ 2 + 5;
        
        var tw: egret.Tween = egret.Tween.get(this);
        if(isScale) {
            tw.to({x:xx, y: yy, scaleX: 1.2, scaleY: 1.2},300, egret.Ease.cubicOut).call(this.back, this);
        } else {
            tw.to({x:xx, y: yy, scaleX: 0.8, scaleY: 0.8},300, egret.Ease.cubicOut).call(this.back, this);
        }
    }

    private back(){
        var tw: egret.Tween = egret.Tween.get(this);
        tw.to({x: this.targetX(), y: this.targetY(), scaleX:1, scaleY:1},300, egret.Ease.cubicOut);
    }

    // 移动到一个位置，然后变回原来的大小
    public moveAndScale(location: number, isScale: boolean=  false){
         var girdwidth: number = (GameData.stageW -40)/ GameData.maxColumn;
        var xx: number = 20 + girdwidth*(location % GameData.maxColumn) + girdwidth/2 + 5;
        var startY: number = (GameData.stageH -(GameData.stageH - 30)/6 -60) - girdwidth * GameData.maxColumn;
        var yy: number = startY + girdwidth*( Math.floor(location / GameData.maxColumn)) + girdwidth/ 2 + 5;
        
        var tw: egret.Tween = egret.Tween.get(this);
        if(isScale) {
            tw.to({x:xx, y: yy, scaleX: 1.2, scaleY: 1.2},300, egret.Ease.cubicOut).call(this.backScale, this);
        } else {
            tw.to({x:xx, y: yy, scaleX: 0.8, scaleY: 0.8},300, egret.Ease.cubicOut).call(this.backScale, this);
        }
    }
    private backScale(){
        var tw: egret.Tween = egret.Tween.get(this);
        tw.to({scaleX:1, scaleY:1}, 300, egret.Ease.backOut).call(this.canRemove, this);
    }

    private canRemove(){
        var event: ElementViewManagerEvent = new ElementViewManagerEvent(ElementViewManagerEvent.REMOVE_ANIMATION_OVER);
        this.dispatchEvent(event);
    }

    // 播放消除卡片到过关条件
    public playCruveMove(tx: number, ty: number){
         var tw: egret.Tween = egret.Tween.get(this);
        tw.to({x:tx,y:ty}, 300, egret.Ease.quartOut).call(this.overCurveMove, this);
    }

    private overCurveMove(){
        if(this.parent){
            this.parent.removeChild(this);
        }
        var event: ElementViewManagerEvent = new ElementViewManagerEvent(ElementViewManagerEvent.UPDATE_MAP);
        this.dispatchEvent(event);
    }

    // 删除非过关条件的卡片
    public playRemoveAni(){
         var tw: egret.Tween = egret.Tween.get(this);
        tw.to({scaleX:1.4, scaleY:1.4}, 300, egret.Ease.cubicInOut).
            to({scaleX:0.1, scaleY:0.1}, 300, egret.Ease.cubicInOut).
            call(this.removeAniCall, this);
    }
    private removeAniCall(){
        if(this.parent){
            this.parent.removeChild(this);
        }
        var event: ElementViewManagerEvent = new ElementViewManagerEvent(ElementViewManagerEvent.UPDATE_MAP);
        this.dispatchEvent(event);
    }

    public moveNewLocation(){
        if(!this.parent){
            var girdwidth: number = (GameData.stageW -40)/ GameData.maxColumn;
            var startY: number = (GameData.stageH -(GameData.stageH - 30)/6 -60) - girdwidth * GameData.maxColumn;
            this.y = startY - this.width;
            this.x =  this.targetX();
            this.scaleX = 1;
            this.scaleY = 1;
            this.thisparent.addChild(this);
        }
        egret.Tween.get(this).to({x: this.targetX(), y: this.targetY()}, this.speed, egret.Ease.bounceOut).call(this.moveNewLocationOver, this);
    }
    private moveNewLocationOver(){
        var event: ElementViewManagerEvent = new ElementViewManagerEvent(ElementViewManagerEvent.UPDATE_VEW_OVER);
        this.dispatchEvent(event);
    }


    // 获取当前location对应的x 的位置
    public targetX(){
        var girdwidth: number = (GameData.stageW -40)/ GameData.maxColumn;
        var xx: number = 20 + girdwidth*(this.location % GameData.maxColumn) + girdwidth/2 + 5;
        return xx;
    }

    // 获取当前location对应的y 的位置
    public targetY(){
        var girdwidth: number = (GameData.stageW -40)/ GameData.maxColumn;
        var startY: number = (GameData.stageH -(GameData.stageH - 30)/6 -60) - girdwidth * GameData.maxColumn;
        var yy: number = startY + girdwidth*( Math.floor(this.location / GameData.maxColumn)) + girdwidth/ 2 + 5;
        return yy;
    }

    
}