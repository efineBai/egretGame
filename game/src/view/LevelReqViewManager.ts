class LevelReqViewManager {
	private _layer: egret.Sprite;
	public constructor(layer: egret.Sprite) {
		this._layer = layer;
		this.init();
	}

	private elements: LevelElementView[];
	private init() {
		this.elements = new Array();
	}

	private stepNumText: egret.BitmapText;
	public createCurrentLevelReq() {
		var len: number =  GameData.levelReq.getLevelReqNum();
		var el: LevelElementView;
		for(var i: number = 0; i< len; i++) {
			if(this.elements.length<= i) {
				el = new LevelElementView();
				this.elements.push(el);
			} else {
				el = this.elements[i];
			}
			el.eleType = GameData.levelReq.reqireElements[i].type;
			el.setTexture("e"+ el.eleType+"_png");
			el.x = 43 + (5 + el.width) *i;
			el.y = 95;
			el.num = GameData.levelReq.reqireElements[i].num;
			this._layer.addChild(el);
		}

		if(!this.stepNumText) {
			this.stepNumText = new egret.BitmapText();
			this.stepNumText.font = RES.getRes("number_font");
			this.stepNumText.x = GameData.stageW -95;
			this.stepNumText.y = 90;
			this.stepNumText.scaleX = 1.5;
			this.stepNumText.scaleY = 1.5;
			this._layer.addChild(this.stepNumText);
			this.stepNumText.text = GameData.stepNum.toString();
		}
	}

	// 判断是否存在指定的类型
	public haveReqType(type: string): boolean {
		var  l: number = this.elements.length;
		for(var i=0; i< l; i++) {
			if(this.elements[i].eleType == type) {
				return true;
			}
		}
		return false;
	}

	// 通过类型，获取当前元素在视图中的位置信息
	public getPointByType(type: string): egret.Point {
		var p: egret.Point = new egret.Point();
		var l: number = this.elements.length;
		for(var i: number = 0; i< l; i++) {
			if(this.elements[i].eleType ==  type) {
				p.x = this.elements[i].x + this.elements[i].width /2;
				p.y = this.elements[i].y + this.elements[i].height /2;
			}
		}
		return p;
	} 

	public update(){
		var len: number = GameData.levelReq.getLevelReqNum();
		for(var i: number= 0; i< len; i++) {
			this.elements[i].num = GameData.levelReq.reqireElements[i].num;
		}
	}

	public updateStep(){
		this.stepNumText.text = GameData.stepNum.toString();
	}

}