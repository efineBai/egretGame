// TypeScript file
class ElementViewManage extends egret.EventDispatcher {
    private _layer: egret.Sprite;
    public constructor(elementLayer: egret.Sprite) {
        super();
        this._layer = elementLayer;
        this.init();
    }

    // 初始化所有的elementview
    private elementViews: ElementView[];
    private init() {
        this.elementViews = new Array();
        var el: ElementView;
        for (var i: number = 0; i < GameData.maxRow * GameData.maxColumn; i++) {
            el = new ElementView(this._layer);
            el.id = i;
            el.location = GameData.elements[i].location;
            this.elementViews.push(el);
            el.addEventListener(ElementViewManagerEvent.REMOVE_ANIMATION_OVER, this.removeAniOver, this);
            el.addEventListener(egret.TouchEvent.TOUCH_TAP, this.eleTap, this);
            el.addEventListener(ElementViewManagerEvent.UPDATE_MAP, this.updateMap, this);
            el.addEventListener(ElementViewManagerEvent.UPDATE_VEW_OVER, this.moveNewLocationOver, this);
        }
    }

    private removenum: number = 0;
    private removeAniOver(evt: ElementViewManagerEvent) {
        this.removenum++;
        if (this.removenum == 2) {
            this.removenum = 0;
            this.dispatchEvent(evt);
        }
    }

    private _currentTapID: number = -1;
    private eleTap(evt: ElementViewManagerEvent) {
        if (PropViewManager.propType == -1) { // 判断是否有选中使用道具
            if (evt.currentTarget instanceof ElementView) {
                var ev: ElementView = <ElementView>evt.currentTarget;
                if (this._currentTapID != -1) {
                    if (ev.id == this._currentTapID) {
                        ev.setFocus(false);
                        this._currentTapID = -1;
                    } else {
                        var event: ElementViewManagerEvent = new ElementViewManagerEvent(ElementViewManagerEvent.TAP_TWO_ELEMENT);
                        this.dispatchEvent(event);
                    }
                } else {
                    ev.setFocus(true);
                    this._currentTapID = ev.id;
                }
            }
        } else {
            if (this._currentTapID != -1) {
                // 使用道具点击了一个元素
                this._currentTapID = -1;
            } 
            var evts: ElementViewManagerEvent = new ElementViewManagerEvent(ElementViewManagerEvent.USE_PROP_CLICK);
            evts.propToElementLocation = (<ElementView>evt.currentTarget).location;
            this.dispatchEvent(evts);
        }
    }

    public setNewElementFocus(location: number) {
        this.elementViews[this._currentTapID].setFocus(false);
        this.elementViews[location].setFocus(true);
        this._currentTapID = location;
    }

    public changeLocationAndBack(id1: number, id2: number) {
        if(this.elementViews[id1].focus) {
            this.elementViews[id1].setFocus(false);
            if(this._layer.getChildIndex(this.elementViews[id1])< this._layer.getChildIndex(this.elementViews[id2])){
                this._layer.swapChildren(this.elementViews[id1], this.elementViews[id2]);
            }
            this.elementViews[id1].moveAndBack(this.elementViews[id2].location, true);
            this.elementViews[id2].moveAndBack(this.elementViews[id1].location);
        } else {
            this.elementViews[id2].setFocus(false);
            if(this._layer.getChildIndex(this.elementViews[id2])< this._layer.getChildIndex(this.elementViews[id1])){
                this._layer.swapChildren(this.elementViews[id2], this.elementViews[id1]);
            }
            this.elementViews[id2].moveAndBack(this.elementViews[id1].location, true);
            this.elementViews[id1].moveAndBack(this.elementViews[id2].location);
        }
        this._currentTapID = -1;
    }

    public changeLocationAndScale(id1: number, id2: number) {
        if(this.elementViews[id1].focus) {
            this.elementViews[id1].setFocus(false);
            if(this._layer.getChildIndex(this.elementViews[id1])< this._layer.getChildIndex(this.elementViews[id2])){
                this._layer.swapChildren(this.elementViews[id1], this.elementViews[id2]);
            }
            this.elementViews[id1].moveAndScale(this.elementViews[id2].location, true);
            this.elementViews[id2].moveAndScale(this.elementViews[id1].location);
        } else {
            this.elementViews[id2].setFocus(false);
            if(this._layer.getChildIndex(this.elementViews[id2])< this._layer.getChildIndex(this.elementViews[id1])){
                this._layer.swapChildren(this.elementViews[id2], this.elementViews[id1]);
            }
            this.elementViews[id2].moveAndScale(this.elementViews[id1].location, true);
            this.elementViews[id1].moveAndScale(this.elementViews[id2].location);
        }
        this._currentTapID = -1;
    }


    // 显示所有元素并播放下落动画
    public showAllElements(){
        this._layer.removeChildren();
        var girdWidth: number = (GameData.stageW - 40)/ GameData.maxColumn;
        var startY: number = (GameData.stageH - ((GameData.stageW -30)/6 -60) - girdWidth* GameData.maxColumn );
        var ele: ElementView;
        for(var i: number = 0; i< GameData.maxRow;i++) {
            for(var j: number =0; j<GameData.maxColumn; j++ ) {
                if(GameData.mapData[i][j] != -1) {
                    ele = this.elementViews[GameData.mapData[i][j]];
                    ele.setTexture("e"+ GameData.elements[GameData.mapData[i][j]].type + "_png");
                    ele.x = ele.targetX();
                    ele.y = startY - ele.width;
                    ele.show((50* GameData.maxColumn * GameData.maxRow - 50* GameData.unmapnum) - (i*GameData.maxColumn + j)* 50)
                }
            }
        }
    }

    private moveeleNum: number = 0 ;
    // 消除过关条件
    public playReqRemoveAni(id: number, tx: number, ty: number) {
        this.moveeleNum++;
        var el: ElementView = this.elementViews[id];
        if(el.parent) {
            this._layer.setChildIndex(el, this._layer.numChildren);
        }
        el.playCruveMove(tx, ty);
    }

    // 播放放大动画，播放后直接删除，用于可删除元素，非过关条件
    public playRemoveAni(id: number) {
        this.moveeleNum ++;
        var el: ElementView = this.elementViews[id];
        if(el.parent) {
            this._layer.setChildIndex(el, this._layer.numChildren); // 会将el放置在最上层
        }
        el.playRemoveAni();
    }

    // 删除动画完成， 更新地图元素
    private updateMap(evt: ElementViewManagerEvent) {
        this.moveeleNum--;
        if(this.moveeleNum == 0) {
            this.dispatchEvent(evt);
        }
    }

    public updateMapData() {
        var len: number = this.elementViews.length;
        this.moveLocElementNum = 0;
        for(var i: number =0; i < len; i++) {
            this.elementViews[i].location = GameData.elements[i].location;
            this.elementViews[i].setTexture("e"+ GameData.elements[i].type + "_png");
            this.elementViews[i].moveNewLocation();
        }
    }

    public updateOrder(){
        // 乱序移动命令触发
        var len: number = this.elementViews.length;
        egret.Tween.removeAllTweens(); // 暂停当前所有动画
        for(var i: number = 0; i< len; i++) {
            this.elementViews[i].location = GameData.elements[i].location;
            this.elementViews[i].move();
        }
    }

    private moveLocElementNum: number = 0;
    private moveNewLocationOver(evt: ElementViewManagerEvent) {
        this.moveLocElementNum ++;
        if(this.moveLocElementNum ==  (GameData.maxRow* GameData.maxColumn )) { //？？？ 不用 -GameData.unusedNum
            var evt: ElementViewManagerEvent = new ElementViewManagerEvent(ElementViewManagerEvent.UPDATE_VEW_OVER);
            this.dispatchEvent(evt);
        }
    }
}