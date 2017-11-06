class GameBackground extends egret.Sprite{
	public constructor() {
		super();
	}

	private bgImage: egret.Bitmap;
	private girBg: egret.Bitmap[];
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
}