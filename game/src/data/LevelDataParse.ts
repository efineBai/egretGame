class LevelDataParse {
	
	public static parseLevelGameData(val:any) {
		GameData.levelStepNum = val.step;
		GameData.elementType = val.element;
		GameData.levelBackgroundName = val.levelbgimg;
		LevelDataParse.parseLevelReq(val.levelReq);
	}


	private static parseLevelReq(val: any) {
		GameData.levelReq.openChange();
		var len:number = val.length;
		for(var i=0; i < len; i++) {
			GameData.levelReq.addElement(val[i].type, val[i].num);
		}
		

	}
}