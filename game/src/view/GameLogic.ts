class GameLogic {
	private _gameStage: egret.Sprite;
	public constructor(gameStage: egret.Sprite) {
		this._gameStage = gameStage;
		this.init();
	}

	private evm: ElementViewManage;
	private levm: LevelReqViewManager;
	private mapc: MapControl;
	private pvm: PropViewManager;
	private init(){
		GameData.initData();
		var leveldata = RES.getRes("l1");
		MapDataParse.createMapData(leveldata.map);
		LevelDataParse.parseLevelGameData(leveldata);

		this.mapc = new MapControl();
		this.mapc.createElementAllMap();

		var gbg: GameBackground = new GameBackground();
		this._gameStage.addChild(gbg);
		gbg.changeBackground();

		var lec: egret.Sprite = new egret.Sprite();
		this._gameStage.addChild(lec);
		this.levm = new LevelReqViewManager(lec);
		this.levm.createCurrentLevelReq();

		var pvmc: egret.Sprite = new egret.Sprite();
		this._gameStage.addChild(pvmc);
		this.pvm = new PropViewManager(pvmc);

		var cc: egret.Sprite = new egret.Sprite();
		this._gameStage.addChild(cc);
		this.evm = new ElementViewManage(cc);
		this.evm.showAllElements();
		this.evm.addEventListener(ElementViewManagerEvent.TAP_TWO_ELEMENT, this.viewTouchTap , this);
		this.evm.addEventListener(ElementViewManagerEvent.REMOVE_ANIMATION_OVER, this.removeAniOver , this);
		this.evm.addEventListener(ElementViewManagerEvent.UPDATE_MAP, this.createNewElement , this);
		this.evm.addEventListener(ElementViewManagerEvent.UPDATE_VEW_OVER, this.checkOtherElement , this);
		this.evm.addEventListener(ElementViewManagerEvent.USE_PROP_CLICK, this.usePropClick , this);
	}

	// 存在两个被tap的元素
	private viewTouchTap(evt: ElementViewManagerEvent) {
		var rel: boolean =  LinkLogic.canMove(evt.ele1, evt.ele2);
		console.log("位置上是否可以交换"+ rel, evt.ele1, evt.ele2);
		if(rel) {
			var linerel: boolean = LinkLogic.isHaveLineIndex(GameData.elements[evt.ele1].location, 
								GameData.elements[evt.ele2].location);
			console.log("移动后是否能消除", linerel);
			if(linerel) {
				this.evm.changeLocationAndScale(evt.ele1, evt.ele2);
				GameData.stepNum --;
				this.levm.updateStep();
			} else {
				this.evm.changeLocationAndBack(evt.ele1, evt.ele2);
			}					 
		} else {
			this.evm.setNewElementFocus(evt.ele2);
		}

	}

	// 存在两个元素交换位置的动画播放完成，然后进行消除
	private removeAniOver(evt: ElementViewManagerEvent) {
		console.log("需要消除", LinkLogic.lines);
		var len: number = LinkLogic.lines.length;
		var rel: boolean;
		for(var i: number =0; i< len; i++) {
			var etype: string ="";
			var l: number = LinkLogic.lines[i].length;
			for(var j: number = 0; j < l ; j++) {
				etype =  GameData.elements[LinkLogic.lines[i][j]].type;
				rel = this.levm.haveReqType(etype);
				if(rel) {
					var p: egret.Point = this.levm.getPointByType(etype);
					GameData.levelReq.changeReqNum(etype, 1);
					this.levm.update();
					this.evm.playReqRemoveAni(LinkLogic.lines[i][j], p.x, p.y);
				} else {
					this.evm.playRemoveAni(LinkLogic[i][j]);
				}
			}
		}
	}



	// 创建新的元素并刷新视图
	private createNewElement(evt: ElementViewManagerEvent) {
		this.mapc.updateMapLocation();
		this.evm.updateMapData();
	}


	// 删除动画完成后，检测是否有新的可以消除的元素
	private checkOtherElement(evt: ElementViewManagerEvent) {
		if(LinkLogic.isHaveLine) {
			this.removeAniOver(null);
		} else {
			if(!LinkLogic.isNextHaveLine()) {
				var rel: boolean = false;
				var next: boolean = true;
				while(next) {
					LinkLogic.chane
				}
			} 
		}
	}

	// 存在两个被tap的元素
	private usePropClick(evt: ElementViewManagerEvent) {
		
	}
}