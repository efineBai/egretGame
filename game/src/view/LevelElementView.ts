class LevelElementView extends egret.Sprite{
	public constructor() {
		super();
		this.init();
	}

	private init(){

	}

	public eleType: string = "";

	private checkmarkBit ;
	private bitText;

	public set num(val: number) {
		if(val<=0) {
			 if(!this.checkmarkBit){
				 this.checkmarkBit = new egret.Bitmap();
				 this.checkmarkBit.texture = RES.getRes("checkmark_png");
				 this.checkmarkBit.x = (this.cacheAsBitmap.width)
			 }
		}
	}
}