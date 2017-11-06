var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LevelRequire = (function () {
    function LevelRequire() {
        this.reqireElements = [];
    }
    //获取有多少钟元素类型需要消除
    LevelRequire.prototype.getLevelReqNum = function () {
        return this.reqireElements.length;
    };
    // 添加过关使用的元素类型
    LevelRequire.prototype.addElement = function (type, num) {
        var ele = new LevelRequireElement();
        ele.num = num;
        ele.type = type;
        this.reqireElements.push(ele);
    };
    // 初始化
    LevelRequire.prototype.openChange = function () {
        this.reqireElements = [];
    };
    // 更新剩余需要消除的数量
    LevelRequire.prototype.changeReqNum = function (type, num) {
        var l = this.getLevelReqNum();
        for (var i = 0; i < l; i++) {
            if (this.reqireElements[i].type = type) {
                this.reqireElements[i].num -= num;
                return;
            }
        }
    };
    // 是否满足了过关条件
    LevelRequire.prototype.isClear = function () {
        var l = this.getLevelReqNum();
        for (var i = 0; i < l; i++) {
            if (this.reqireElements[i].num > 0) {
                return false;
            }
        }
        return true;
    };
    return LevelRequire;
}());
__reflect(LevelRequire.prototype, "LevelRequire");
//# sourceMappingURL=LevelRequire.js.map