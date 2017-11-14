class LevelElementView extends egret.Sprite{
	public constructor() {
		super();
		this.init();
	}

	private init(){
		this.touchChildren = false;
		if(!this.bitmap) {
			this.bitmap = new egret.Bitmap();
		}
		var bitwidth: number = (GameData.stageW -40) / GameData.maxColumn;
		this.width = this.height = bitwidth;
		this.addChild(this.bitmap);

		this.bitText = new egret.BitmapText();
		this.bitText.font =  RES.getRes("font");
		this.bitText.text = "0";
		this.bitText.x = (this.bitmap.width - this.bitText.width)/ 2;
		this.bitText.y = this.bitmap.y + this.bitmap.height - this.bitText.height/2;
		this.addChild(this.bitText);
	}

	public eleType: string = "";

	private checkmarkBit: egret.Bitmap ; // 对勾
	private bitmap: egret.Bitmap; // 元素
	private bitText: egret.BitmapText;

	public set num(val: number) {
		if(val<=0) {
			 if(!this.checkmarkBit){
				 this.checkmarkBit = new egret.Bitmap();
				 this.checkmarkBit.texture = RES.getRes("checkmark_png");
				 this.checkmarkBit.x = (this.bitmap.width - this.checkmarkBit.width) /2;
				 this.checkmarkBit.y = this.bitmap.height + this.bitmap.y - this.checkmarkBit.height/2;
				 this.addChild(this);
				 this.removeChild(this.bitText);
			 }
		} else {
			this.bitText.text = val.toString();
		}
	}

	public get num(): number{
		return Number(this.bitText.text);
	}

	public setTexture(val : string) {
		this.bitmap.texture = RES.getRes(val);
	}

}