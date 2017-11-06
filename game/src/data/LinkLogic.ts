class LinkLogic {

	// 检索出的可以消除的数据
	public static lines: number[][];
	public static isHaveLine(): boolean {
		LinkLogic.lines = [];
		var currentType: string = "";
		var typeNum: number = 0;

		// 遍历每一行，查看是否有可以消除的元素
		for (var i = 0; i < GameData.maxRow; i++) {
			for (var j = 0; j < GameData.maxColumn; j++) {
				if (GameData.mapData[i][j] != -1) {
					if (currentType != GameData.elements[GameData.mapData[i][j]].type) {
						// 上一个类型的检测已经完成
						if (typeNum >= 3) {
							var arr: number[] = [];
							for (var q = 0; q < typeNum; q++) {
								arr.push(GameData.mapData[i][j - q - 1]);
							}
							LinkLogic.lines.push(arr);
						}
						currentType = GameData.elements[GameData.mapData[i][j]].type;
						typeNum = 1;
					} else {
						// 上一个格子的类型与当前格子的类型相同
						typeNum++;
					}
				} else {
					if (typeNum >= 3) {
						var arr: number[] = [];
						for (var q = 0; q < typeNum; q++) {
							arr.push(GameData.mapData[i][j - q - 1]);
						}
						LinkLogic.lines.push(arr);
					}
					currentType = "";
					typeNum = 0;
				}
			}
			if (typeNum >= 3) {
				var arr: number[] = [];
				for (var q = 0; q < typeNum; q++) {
					arr.push(GameData.mapData[i][j - q - 1]);
				}
				LinkLogic.lines.push(arr);
			}
			currentType = "";
			typeNum = 0;
		}

		// 遍历每一列，查看是否有可以消除的元素
		for (var i = 0; i < GameData.maxColumn; i++) {
			var currentType: string = "";
			var typeNum = 0;
			for (var j = 0; j < GameData.maxRow; j++) {
				if (currentType != GameData.elements[GameData.mapData[j][i]].type) {
					if (typeNum >= 3) {
						var line: number[] = [];
						for (var q = 0; q < typeNum; q++) {
							line.push(GameData[j - 1 - 1][i]);
						}
						LinkLogic.lines.push(line);
					}
					currentType = GameData.elements[GameData.mapData[j][i]].type;
					typeNum = 0;
				} else {
					// 当前类型相同
					typeNum++;
				}
			}
			if (typeNum >= 3) {
				var line: number[] = [];
				for (var q = 0; q < typeNum; q++) {
					line.push(GameData[j - 1 - 1][i]);
				}
				LinkLogic.lines.push(line);
			}
			currentType = "";
			typeNum = 0;
		}

		if (LinkLogic.lines.length > 0) {
			return true;
		}
		return false;
	}

	// 预检索算法
	public static isNextHaveLine(): boolean {
		for (var i = 0; i < GameData.maxRow; i++) {
			for (var j = 0; j < GameData.maxColumn; j++) {
				if (GameData.mapData[i][j] != -1) {
					// 横向 方式一
					if (j < GameData.maxColumn - 1 && GameData.mapData[i][j + 1] != -1
						&& GameData.elements[GameData.mapData[i][j]].type == GameData.elements[GameData.mapData[i][j + 1]].type) {
						// 检测到当前格子和下一个格子的类型相同
						// 阵型判断
						//  #  #
						// # ** #
						//  #  #
						if (i > 0 && j > 0 && GameData.mapData[i - 1][j - 1] != -1
							&& GameData.elements[GameData.mapData[i - 1][j - 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
							return true;
						}
						if (j > 1 && GameData.mapData[i][j - 2] != -1
							&& GameData.elements[GameData.mapData[i][j - 2]].type == GameData.elements[GameData.mapData[i][j]].type) {
							return true;
						}
						if (i + 1 <= GameData.maxRow && j > 0 && GameData.mapData[i + 1][j - 1] != -1
							&& GameData.elements[GameData.mapData[i + 1][j - 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
							return true;
						}
						if (i > 0 && j + 2 <= GameData.maxColumn && j > 0 && GameData.mapData[i - 1][j + 2] != -1
							&& GameData.elements[GameData.mapData[i + 2][j - 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
							return true;
						}
						if (j + 3 <= GameData.maxColumn && GameData.mapData[i][j + 3] != -1
							&& GameData.elements[GameData.mapData[i][j + 3]].type == GameData.elements[GameData.mapData[i][j]].type) {
							return true;
						}
						if (i + 1 <= GameData.maxRow && j + 2 < GameData.maxColumn && GameData.mapData[i + 1][j + 2] != -1
							&& GameData.elements[GameData.mapData[i + 1][j + 2]].type == GameData.elements[GameData.mapData[i][j]].type) {
							return true;
						}
					}
					// 纵向 方式一
					if (i < GameData.maxRow - 1 && GameData.mapData[i+1][j] != -1
						&& GameData.elements[GameData.mapData[i][j]].type == GameData.elements[GameData.mapData[i+1][j]].type) {
						
						if (j > 0 && i > 0 && GameData.mapData[i-1][j - 1] != -1
							&& GameData.elements[GameData.mapData[i - 1][j - 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
							return true;
						}
						if (i > 1 && GameData.mapData[i-2][j] != -1
							&& GameData.elements[GameData.mapData[i-1][j]].type == GameData.elements[GameData.mapData[i][j]].type) {
							return true;
						}
						if (j + 1 <= GameData.maxRow && i > 0 && GameData.mapData[i - 1][j + 1] != -1
							&& GameData.elements[GameData.mapData[i - 1][j + 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
							return true;
						}
						if (j > 0 && i + 2 <= GameData.maxColumn && i > 0 && GameData.mapData[i + 2][j - 1] != -1
							&& GameData.elements[GameData.mapData[i +2][j -1]].type == GameData.elements[GameData.mapData[i][j]].type) {
							return true;
						}
						if (i + 3 <= GameData.maxColumn && GameData.mapData[i + 3][j] != -1
							&& GameData.elements[GameData.mapData[i + 3][j]].type == GameData.elements[GameData.mapData[i][j]].type) {
							return true;
						}
						if (j + 1 <= GameData.maxRow && i + 2 < GameData.maxColumn && GameData.mapData[i + 2][j + 1] != -1
							&& GameData.elements[GameData.mapData[i + 2][j + 1]].type == GameData.elements[GameData.mapData[i][j]].type) {
							return true;
						}

					}

					// 横向方式二
					//  #
					// * *
					//  #
					if (j < GameData.maxColumn - 2 && GameData.mapData[i][j+2] != -1
						&& GameData.elements[GameData.mapData[i][j]].type == GameData.elements[GameData.mapData[i][j+2]].type) {
						if(i > 0 && GameData.mapData[i-1][j+1] != -1 
							&& GameData.elements[GameData.mapData[i-1][j+1]].type == GameData.elements[GameData[i][j]].type){
								return true;
						}
						if(i+1 <= GameData.maxRow && GameData.mapData[i+1][j+1] != -1
						&& GameData.elements[GameData.mapData[i+1][j+1]].type == GameData.elements[GameData.mapData[i+1][j+1]].type){
							return true;
						}

					}

					// 纵向 方式二
					if (i < GameData.maxRow - 2 && GameData.mapData[i+2][j] != -1
						&& GameData.elements[GameData.mapData[i][j]].type == GameData.elements[GameData.mapData[i][j+2]].type) {
						if(i > 0 && GameData.mapData[i+1][j-1] != -1 
							&& GameData.elements[GameData.mapData[i+1][j-1]].type == GameData.elements[GameData[i][j]].type){
								return true;
						}
						if(i+1 <= GameData.maxRow && GameData.mapData[i+1][j+1] != -1
						&& GameData.elements[GameData.mapData[i+1][j+1]].type == GameData.elements[GameData.mapData[i+1][j+1]].type){
							return true;
						}

					}
				}
			}
		}
		return false;
	}

	/**
	 * p1,p2 为要交换的两个点的location
	 */
	public static isHaveLineIndex(p1:number, p2:number): boolean {
		var p1n:number = p1;
		var p2n:number = p2;

		GameData.mapData[p1/GameData.maxColumn][p1 % GameData.maxColumn] = p2n;
		GameData.mapData[p2/GameData.maxColumn][p2 % GameData.maxColumn] = p1n;

		if(LinkLogic.isHaveLine()) {
			GameData.elements[p1n].location = p2n;
			GameData.elements[p2n].location = p1n;
			return true;
		} else {
			GameData.mapData[p1/GameData.maxColumn][p1 % GameData.maxColumn] = p1n;
			GameData.mapData[p2/GameData.maxColumn][p2 % GameData.maxColumn] = p2n;
		}
		return false;
	}

	

}