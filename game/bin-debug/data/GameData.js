var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    GameData.initData = function () {
        for (var i = 0; i < GameData.maxRow; i++) {
            var arr = [];
            for (var j = 0; j < GameData.maxColumn; j++) {
                arr[j] = -2;
            }
            GameData.mapData.push(arr);
        }
        GameData.levelReq = new LevelRequire();
        GameData.elements = [];
        GameData.unusedElements = [];
        var len = GameData.maxRow * GameData.maxColumn;
        for (var q = 0; q < len; q++) {
            var ele = new GameElement();
            ele.id = q;
            GameData.elements.push(ele);
            GameData.unusedElements.push(q);
        }
        // egret.MainContext
    };
    GameData.stepNum = 0; // 玩家走的步数
    GameData.levelStepNum = 0; // level规定的最大数量
    GameData.levelBackgroundName = "";
    GameData.maxRow = 8;
    GameData.maxColumn = 8;
    GameData.currentElementNum = 0; // 当前地图可用的元素的数量
    GameData.stageW = 0;
    GameData.stateH = 0;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map