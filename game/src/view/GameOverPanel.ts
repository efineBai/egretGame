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
		//http://v.youku.com/v_show/id_XMTQ2MDAwMDgwNA==.html?spm=a2h0j.8191423.playlist_content.5!22~5~5~A&&f=26096534&from=y1.2-3.4.22
	}
}