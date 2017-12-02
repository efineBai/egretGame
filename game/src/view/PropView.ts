/**
 * 道具视图
 */
class PropView extends egret.Sprite {

	private _view_box: egret.Bitmap;
	private _view_activate: egret.Bitmap;
	private _numText: egret.BitmapText;
	public proptype: number = -1;
	public id: number = -1;

	public constructor(type: number) {
		super();
		this.proptype = type;
	}

	private init() {
		this.createView();
		this.createNumText();
		this.addChild(this._view_activate);
		this.addChild(this._view_box);
		this.addChild(this._numText);
		this.setActivateState(false);
	}

	private createNumText() {
		this._numText = new egret.BitmapText();
		this._numText.font = RES.getRes("number_fnt");
		this._numText.x = this._view_activate.width - 31;
	}

	private createView() {
		var _interval: number = 15;
		var _width: number = (GameData.stageW - _interval * 6) / 5;
		if (!this._view_activate) {
			this._view_activate = new egret.Bitmap();
			this._view_activate.texture = RES.getRes(this.getActivateTexture(this.proptype));
			this._view_activate.width = _width;
			this._view_activate.height = _width;
		}
		if (!this._view_box) {
			this._view_box = new egret.Bitmap();
			this._view_box.texture = RES.getRes("propbox_png");
			this._view_box.width = this._view_activate.width + 10;
			this._view_box.height = this._view_activate.height + 10;
			this._view_box.x = -5;
			this._view_box.y = -5;
		}
	}

	private _num: number = 0;
	public get num() {
		return this._num;
	}
	public set num(val: number) {
		this._num = val;
		this._numText.text = val.toString();
		if (val <= 0) {
			this.setActivateState(false);
		} else {
			this.setActivateState(true);
		}
	}

	private setActivateState(val: boolean) {
		this.touchEnabled = val;
		if (val) {
			this._view_activate.texture = RES.getRes(this.getActivateTexture(this.proptype));
			this._view_box.texture = RES.getRes("propbox_png");
			this._numText.font = RES.getRes("number_fnt");
		} else {
			this._view_activate.texture = RES.getRes(this.getActivateTexture(this.proptype));
			this._view_box.texture = RES.getRes("propboxdisable_png");
			this._numText.font = RES.getRes("numberdisable_fnt");
		}
	}

	private getActivateTexture(type: number): string {
		var texturename: string = "";
		switch (type) {
			case 0:
				texturename = "samecolor_png";
				break;
			case 1:
				texturename = "boom_png";
				break;
			case 2:
				texturename = "allrow_png";
				break;
			case 3:
				texturename = "allcloumn_png";
				break;
			case 4:
				texturename = "one_png";
				break;
		}
		return texturename;
	}

	private getDisableTexture(type: number): string {
		var texturename: string = "";
		switch (type) {
			case 0:
				texturename = "samecolor_disable_png";
				break;
			case 1:
				texturename = "boom_disable_png";
				break;
			case 2:
				texturename = "allrow_disable_png";
				break;
			case 3:
				texturename = "allcloumn_disable_png";
				break;
			case 4:
				texturename = "one_disable_png";
				break;
		}
		return texturename;
	}

	public setFocus(val: boolean) {
		if(val){
			this._view_box.texture = RES.getRes("propboxactive_png");
		}else {
			this._view_box.texture = RES.getRes("propbox_png");
		}
	}

}

