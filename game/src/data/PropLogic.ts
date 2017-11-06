class PropLogic {
	public static useProp(type:number, location:number){
		switch(type) {
			case 0:
				PropLogic.sameColor(location);
			break;
			case 1:
				PropLogic.boom(location);
			break;
			case 2:
				PropLogic.sameRow(location);
			break;
			case 3:
				PropLogic.sameColumn(location);
				break;
			case 4:
				PropLogic.sameRow(location);
				break;
						
		}
	}

	private static sameColor(location: number) {
		LinkLogic.lines = [];
		var type:string = GameData.elements[GameData.mapData[location/GameData.maxColumn][location % GameData.maxColumn]].type;
		var arr: number[]; // 被消除的元素
		for(var i=0; i < GameData.maxRow; i++) {
			for(var j=0; j< GameData.maxColumn; i++) {
				if(GameData.elements[GameData.mapData[i][j]].type ==  type) {
					arr.push(GameData.mapData[i][j]);
				}
			}
		}
		LinkLogic.lines.push(arr);
	}

	private static boom(location: number) {
		LinkLogic.lines= [];
		var arr: number[] = [];
		var x = location % GameData.maxColumn;
		var y = location / GameData.maxColumn;
		
	// 	   *
	//    *#*
	//     *	
		if(x>0 && GameData.mapData[x-1][y]!= -1) {
			arr.push(GameData.mapData[x-1][y]);
		}
		if(y>0 && GameData.mapData[x][y-1]!=-1) {
			arr.push(GameData.mapData[x][y-1]);
		}
		if(x+1 < GameData.maxRow && GameData.mapData[x+1][y]!=-1) {
			arr.push(GameData.mapData[x+1][y]);
		}
		if(y+1< GameData.maxColumn && GameData.mapData[x][y+1]!=-1) {
			arr.push(GameData.mapData[x][y+1]);
		}
		LinkLogic.lines.push(arr);
	}

	private static oneBlock(location: number) {
		var arr:number[] = [];
		arr.push(location);
		LinkLogic.lines.push(arr);
	}

	private static sameRow(location: number) {
		var x = Math.floor(location / GameData.maxColumn);
		LinkLogic.lines.push(GameData.mapData[x]);
	}

	private static sameColumn(location: number) {
		var y = Math.floor(location % GameData.maxColumn);
		var arr:number[] = [];
		for(var x=0; x< GameData.maxRow; x++) {
			arr.push(GameData.mapData[x][y]);
		}
		LinkLogic.lines.push(arr);
	}
}