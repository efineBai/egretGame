class MapControl {
	public constructor() {
	}

	public createElementAllMap() {
		this.createAllMap();
	}

	private createAllMap() {
		var len: number = GameData.maxRow * GameData.maxColumn;
		var type: string = "";
		var haveLink: boolean = true;
		var id: number = 0;
		var ztype: string = "";
		var htype: string = "";
		for (var i = 0; i < GameData.maxRow; i++) {
			for (var j = 0; j < GameData.maxColumn; j++) {
				while (haveLink) {
					type = this.createType();
					// 生成元素的时候确保没有可以消除的
					if (i > 1 && GameData.mapData[i - 1][j] != -1 && GameData.mapData[i - 2][j] != -1) {
						if (GameData.elements[GameData.mapData[i - 1][j]].type == GameData.elements[GameData.mapData[i - 2][j]].type) {
							ztype = GameData.elements[GameData.mapData[i - 1][j]].type;
						}
					}
					if (j > 1 && GameData.mapData[i][j - 1] != -1 && GameData.mapData[i][j - 1] != -1) {
						if (GameData.elements[GameData.mapData[i][j - 1]].type == GameData.elements[GameData.mapData[i][j - 1]].type) {
							htype = GameData.elements[GameData.mapData[i][j - 1]].type;
						}
					}

					if (type != ztype && type != htype) {
						haveLink = false;
					}
				}
				id = GameData.unusedElements[0];
				GameData.elements[id].type = type;
				GameData.elements[id].location = i * GameData.maxRow + j;
				GameData.unusedElements.shift();
				haveLink = true;
				ztype = "";
				htype = "";

			}
		}

	}

	public createElements(num: number): string[] {
		var types: string[] = [];
		for (var i = 0; i < num; i++) {
			types.push(this.createType());
		}
		return types;
	}

	public changeTypeById(id: number) {
		GameData.elements[id].type = this.createType();
	}

	// 消除方块后，重新挪动位置
	public updateMapLocation() {
		var ids: number[] = []; // 记录了所有修改的元素id
		var len: number = LinkLogic.lines.length;
		// 将消除的元素变成 新的元素
		for (var i = 0; i < len; i++) {
			var l: number = LinkLogic.lines[i].length;
			for (var j = 0; j < l; j++) {
				var ret: boolean = false;
				var ll: number = ids.length;
				for (var r = 0; r < ll; r++) {
					if (ids[r] == LinkLogic.lines[i][j]) {
						// 如果要修改的元素已经存在于ids中，也就是已经记录过则不再进行处理
						ret = true;
					}
				}
				if (!ret) {
					this.changeTypeById(LinkLogic.lines[i][j]);
					ids.push(LinkLogic.lines[i][j]);
				}
			}
		}

		len = ids.length;// 消除的元素个数
		// 获取需要移动的列的列表
		var colarr: number[] = [];
		for (i = 0; i < len; i++) {
			ret = false;
			for (j = 0; j < colarr.length; j++) {
				if(colarr[j] == GameData.elements[ids[i]].location % GameData.maxRow){
					ret = true;
				}
			}
			if(!ret){
				colarr.push(GameData.elements[ids[i]].location % GameData.maxRow);
			}
		}

		var colEleIds: number[];
		for(i=0; i< colarr.length; i++) {
			var newcolIds: number [] = [];
			var removeids: number[] = [];
			for(j = GameData.maxRow-1; j>=0; j--){
				ret = false;
				for(var q=0; q< ids.length; q++){
					if(GameData.mapData[j][colarr[i]] == ids[q]){
						removeids.push(ids[q]);
						ret = true;
					}
				}
				if(!ret) {
					newcolIds.push(GameData[j][colarr[i]]);
				}
			}
			// 由于已经把删除的元素的替换为了新的方块，但是还放在原有的位置，现在就是
			newcolIds.concat(removeids);
			for(j=0; j< GameData.maxRow; j++) {
				GameData.mapData[j][colarr[i]] = newcolIds[0];
				GameData.elements[newcolIds[0]].location = j* GameData.maxColumn + colarr[i];
				newcolIds.shift();
			}
		}

	}


	private createType(): string {
		return GameData.elementType[Math.floor(Math.random() * GameData.elementType.length)].toString();
	}
}