class GameBackground extends egret.Sprite{
	public constructor() {
		super();
	}

	// 用于关卡更新背景
	public changeBackground(){
		this.cacheAsBitmap = false;
		this.removeChildren();
		this.createBgImage();
		this.createMapBg();
		this.createLevelReqBg();
		this.createStepBg();
		this.cacheAsBitmap = true;
	}

	private bgImage: egret.Bitmap;
	private girdBg: egret.Bitmap[];
	private createBgImage(){
		if(!this.bgImage) {
			this.bgImage = new egret.Bitmap();
		}
		this.bgImage.texture = RES.getRes(GameData.levelBackgroundName);
		this.bgImage.width = GameData.stageW;
		this.bgImage.height = GameData.stageH;
		this.addChild(this.bgImage);

		var propbg: egret.Bitmap = new egret.Bitmap();
		propbg.texture = RES.getRes("");
		propbg.width = GameData.stageW;
		propbg.height = GameData.stageH /5 + 20;
		propbg.y = GameData.stageH - propbg.height;
		this.addChild(propbg);

		

	}

	private createMapBg(){
		if(!this.girdBg) {
			this.girdBg = new Array();
		}
		var gird: egret.Bitmap;
		var girdwidth: number = (GameData.stageW - 40)/ GameData.maxColumn;
		var startY: number = (GameData.stageH -(GameData.stageH - 30)/6 -60) - girdwidth * GameData.maxColumn;
		for(var i ; i < GameData.maxRow; i++) {
			for(var j; j< GameData.maxColumn; j++) {
				if(GameData.mapData[i][j] != -1) {
					if(this.girdBg.length < (i*GameData.maxColumn + j)){
						gird = new egret.Bitmap;
						this.girdBg.push(gird); 
					} else {
						gird = this.girdBg[i*GameData.maxColumn + j];
					}
					gird.width = girdwidth;
					gird.height = girdwidth;
					gird.x = 20+ girdwidth * j;
					gird.y = startY + girdwidth * i; 
					if(i%2 == j%2) {
						gird.texture = RES.getRes("");
					} else {
						gird.texture = RES.getRes("");
					}
					this.addChild(gird);
				}
			}
		}
	}

	private createLevelReqBg(){
		var girdwidth: number = (GameData.stageW - 40)/ GameData.maxColumn;
		var bg: egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes("");
		bg.width = GameData.levelReq.getLevelReqNum() * girdwidth + 20;
		bg.height = girdwidth + 60;
		bg.x = 20;
		bg.y = 50;
		this.addChild(bg);

		var bgtxt: egret.Bitmap = new egret.Bitmap();
		bgtxt.texture = RES.getRes("");
		bgtxt.x = bg.x +(bg.width - bgtxt.width)/2;
		bgtxt.y = bg.y -18;
		this.addChild(bgtxt);
	}

	private createStepBg(){
		var bg: egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes("");
		bg.width = 100;
		bg.height = 100;
		bg.x = GameData.stageW - 110;
		bg.y = 50;
		this.addChild(bg);

		var bgtxt: egret.Bitmap = new egret.Bitmap();
		bgtxt.texture = RES.getRes("");
		bgtxt.x = bg.x + (bg.width - bgtxt.width)/2;
		bgtxt.y = bg.y + 10;
		this.addChild(bgtxt);
	}
}