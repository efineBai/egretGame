class LevelRequire {

	public reqireElements : LevelRequireElement[];

	public constructor() {
		this.reqireElements = [];
	}

	//获取有多少钟元素类型需要消除
	public getLevelReqNum(): number{
		return this.reqireElements.length;
	}

	// 添加过关使用的元素类型
	public addElement(type: string, num : number) {
		var ele: LevelRequireElement = new LevelRequireElement();
		ele.num = num;
		ele.type = type;
		this.reqireElements.push(ele);
	}

	// 初始化
	public openChange() {
		this.reqireElements = [];
	}

	// 更新剩余需要消除的数量
	public changeReqNum(type:string, num: number) {
		var l : number = this.getLevelReqNum();
		for(var i =0; i < l ; i++) {
			if(this.reqireElements[i].type = type) {
				this.reqireElements[i].num -= num;
				return;
			}
		}
	}

	// 是否满足了过关条件
	public isClear():boolean{
		var l : number = this.getLevelReqNum();
		for(var i =0; i < l ; i++) {
			if(this.reqireElements[i].num > 0) {
				return false;
			}
		}
		return true;
	}

}