class GameOverPanel extends egret.Sprite{
	public constructor() {
		super();
	}
	private _view: egret.Bitmap;
	private _isSuccess: boolean = false;
	public show(isSuccess: boolean) {
		this._isSuccess = isSuccess;
		this._view = new egret.Bitmap();
		this._view.texture = RES.getRes("levelReqBg_png");
		this._view.width = GameData.stageW -30;
		this._view.height = GameData.stageH/2;
		this._view.x = this._view.width/-2;
		this._view.y = this._view.height /-2;	
		this.addChild(this._view);

		this.x = GameData.stageW /2;
		this.y = GameData.stageH /2;
		this.scaleX = 0.1;
		this.scaleY = 0.1;
		egret.Tween.get(this).to({scaleX:1, scaleY: 1}, 700, egret.Ease.bounceOut).call(this.playStarAni);
	}

	private playStarAni(){
		var gameover: egret.Bitmap = new egret.Bitmap();
		gameover.texture = RES.getRes("gameoverTitle_png");
		gameover.width = this._view.width/2;
		gameover.height = 60;
		gameover.x = this._view.x +(this._view.width - gameover.width)/2;
		gameover.y = this._view.y ;
		gameover.scaleX = 0;
		gameover.scaleY = 0;
		this.addChild(gameover);
		egret.Tween.get(gameover).to({scaleX:1, scaleY:1}, 700, egret.Ease.bounceOut);

		console.log("播放结果动画");
		if(!this._isSuccess) {
			var chengzi: egret.Bitmap = new egret.Bitmap();
			chengzi.texture = RES.getRes("chengzi_png");
			chengzi.width = (this._view.width)/2;
			chengzi.height = chengzi.width;
			chengzi.x = (GameData.stageW - chengzi.width*2)/3 + this._view.x;
			chengzi.y = 15 + this._view.y;
			chengzi.scaleX = 1.5;
			chengzi.scaleY = 1.5;
			chengzi.alpha = 0;
			this.addChild(chengzi);
			egret.Tween.get(chengzi).to({scaleX:1, scaleY:1, alpha:1},700, egret.Ease.circIn);

			var gongzi: egret.Bitmap = new egret.Bitmap();
			gongzi.texture = RES.getRes("gongzi_png");
			gongzi.width = (this._view.width)/2;
			gongzi.height = gongzi.width;
			gongzi.x = (GameData.stageW - gongzi.width*2)/3*2 + this._view.x;
			gongzi.y = 15 + this._view.y;
			gongzi.scaleX = 1.5;
			gongzi.scaleY = 1.5;
			gongzi.alpha = 0;
			this.addChild(gongzi);
			egret.Tween.get(gongzi).to({scaleX:1, scaleY:1, alpha:1},700, egret.Ease.circIn);
			 
		} else {
			var shizi: egret.Bitmap = new egret.Bitmap();
			shizi.texture = RES.getRes("shizi_png");
			shizi.width = (this._view.width)/2;
			shizi.height = shizi.width;
			shizi.x = (GameData.stageW - shizi.width*2)/3 + this._view.x;
			shizi.y = 15 + this._view.y;
			shizi.scaleX = 1.5;
			shizi.scaleY = 1.5;
			shizi.alpha = 0;
			this.addChild(shizi);
			egret.Tween.get(shizi).to({scaleX:1, scaleY:1, alpha:1},700, egret.Ease.circIn);

			var baizi: egret.Bitmap = new egret.Bitmap();
			baizi.texture = RES.getRes("baizi_png");
			baizi.width = (this._view.width)/2;
			baizi.height = baizi.width;
			baizi.x = (GameData.stageW - baizi.width*2)/3*2 + this._view.x;
			baizi.y = 15 + this._view.y;
			baizi.scaleX = 1.5;
			baizi.scaleY = 1.5;
			baizi.alpha = 0;
			this.addChild(baizi);
			egret.Tween.get(baizi).to({scaleX:1, scaleY:1, alpha:1},700, egret.Ease.circIn);
		}
	}
}