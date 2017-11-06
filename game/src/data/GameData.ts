class GameData {

	// 当前地图中空白地图块的数量
	public static unmapnum: number;
	// 地图数据
	public static mapData: number[][]; // -1为初始化的值， -2为不可用的地图
	public static stepNum: number=0; // 玩家走的步数
	public static levelStepNum: number=0; // level规定的最大数量
	public static elementType: number[];
	public static levelReq: LevelRequire;
	public static elements: GameElement[];
	public static unusedElements: number[];  // 未使用的元素的id
	public static levelBackgroundName: string ="";

	public static maxRow = 8;
	public static maxColumn = 8;
	public static currentElementNum = 0; // 当前地图可用的元素的数量

	public static initData(){
		for( var i=0;i <GameData.maxRow;i++) {
			var arr:number[] = [];
			for(var j=0; j<GameData.maxColumn; j++) {
				arr[j]= -2;
			}
			GameData.mapData.push(arr);
		}

		GameData.levelReq = new LevelRequire();

		GameData.elements = [];
		GameData.unusedElements = [];

		var len: number = GameData.maxRow * GameData.maxColumn;
		for(var q = 0; q < len; q++) {
			var ele: GameElement = new GameElement();
			ele.id = q;
			GameData.elements.push(ele);
			GameData.unusedElements.push(q);
		}

		GameData.stageW = egret.MainContext.instance.stage.stageWidth;
		GameData.stageH = egret.MainContext.instance.stage.stageHeight;

	}

	public static stageW: number = 0;
	public static stageH: number = 0;
}