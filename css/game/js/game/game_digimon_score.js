// 遊戲控制類
var Game = {

    // 遊戲背景
    gamePanel: null,

    // 分數
    score: 0,
    score1: 100,

    // 時間
    time: 0,
    lastTime: 0,
    thisTime: 0,

    // 圖片對映表
    pieceMap: null,

    // 圖片列表
    pieceList: [],

    // 圖片列表不包含圖片
    pieceImgList: [],

    // 圖片隨機數列表
    randomList: [],

    // 軌跡列表
    trackList: [],

    // 遊戲是否開始
    isGameBigin: false,

    // 遊戲是否結束
    isGameOver: false,

    // 遊戲是否重置
    isGameReset: false,

    // 圖片元素是否第一次點選
    isFirstClick: true,
    
    ReachedPair: 0,

    // 開始遊戲
    start: function() {

        document.getElementById("start").disabled = true;
        document.getElementById("reset").disabled = false;

        if (this.isGameReset) {

            this.isGameOver = false;
            this.startTime();

            return;

        } else if (this.isGameBegin) {

            return;

        } else {

            this.init();

            return;

        }

    },

    reset: function() {

        document.getElementById("start").disabled = false;
        document.getElementById("reset").disabled = false;

        this.clear();
        this.initPieces();
        this.initImgPieces();
        this.time = 0;
        this.lastTime = 0;
        document.getElementById("time_scoreMode").innerHTML = 0;

        this.score = 0;
        this.score1 = 100;
        document.getElementById("score").innerHTML = 0;

        this.isGameReset = true;
        this.isGameBegin = true;
        
        this.ReachedPair = 0;
    },

    // 初始化
    init: function() {

        if (this.isGameBegin) {

            return;

        }

        this.pieceMap = new Map();

        var _this = this;

        this.time = 0;
        this.startTime();

        this.gamePanel = document.getElementById("pieces");

        this.initPieces();
        this.initImgPieces();

        this.isGameBegin = true;

    },

    // 將隨機生成的150張圖片新增進畫布
    initPieces: function() {

        var _this = this;

        this.initRandomList();

        // 打亂隨機列表排序
        this.messRandomList();

        for (var i = 0; i < 204; i++) {

            var piece = new Piece(this);
            this.pieceList.push(piece);

            var x = (i % 17);
            var y = Math.floor(i / 17);

            this.pieceMap.put(x + "," + y, piece);

            piece.setPosition(x, y);
            this.gamePanel.appendChild(piece.dom);

            if (x == 0 || x == 16 || y == 0 || y == 11) {

                piece.track = document.createElement("div");
                piece.track.className = "track";
                piece.dom.appendChild(piece.track);
                piece.isTracked = true;

                continue;

            } else {

                if (x == 1 || x == 15 || y == 1 || y == 10) {

                    piece.setAtEdge(true);

                }

                this.pieceImgList.push(piece);

            }

        }

    },

    // 初始化圖片
    initImgPieces: function() {
        
        for (var i = 0; i < this.pieceImgList.length; i++) {

            this.pieceImgList[i].initImg();
            this.pieceImgList[i].img.src = "img/game/pieces/digimon/" + this.randomList[i] + ".png"
            this.pieceImgList[i].img.style = "border: 1px white ridge;"
            this.pieceImgList[i].setImgSrc(this.pieceImgList[i].img.src);

            //執行圖片點選事件
            this.pieceImgList[i].onClick();

        }

    },

    // 初始化隨機表
    initRandomList: function() {

        // 獲取隨機數列，成雙出現
        for (var i = 0; i < 75; i++) {

            var random = parseInt(Math.random() * 22 * 10000, 10);
            var number = random % 23;
            this.randomList.push(number);
            this.randomList.push(number);

        }

    },

    // 打亂隨機表
    messRandomList: function() {

        for (var i = 0; i < this.randomList.length; i++) {

            var random = parseInt(Math.random() * 15 * 10000, 10);
            var number = random % 150;

            var temp;
            temp = this.randomList[i];
            this.randomList[i] = this.randomList[number];
            this.randomList[number] = temp;

        }

    },

    // 開始計時
    startTime: function() {

        var _this = this;

        if (this.isGameOver) {

            return;

        } else {

            this.time++;
            document.getElementById("time_scoreMode").innerHTML = this.time;
            this.isGameBegin = true;
            setTimeout(function() { _this.startTime(); }, 1000);

        }

    },

    // 清除
    clear: function() {

        for (var i = 0; i < this.pieceList.length; i++) {

            this.gamePanel.removeChild(this.pieceList[i].dom);

        }

        this.pieceList = [];
        this.randomList = [];
        this.pieceImgList = [];

        this.isGameOver = true;
        this.isGameBegin = false;

    }

}

window.onload = function() {

    document.getElementById("start").disabled = false;
    document.getElementById("reset").disabled = true;

}

// 遊戲開始入口
function Start() {

    Game.start();

}

// 遊戲重置入口
function Reset() {

    Game.reset();

}