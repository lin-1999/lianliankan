// 遊戲控制類
var Game = {

    // 遊戲背景
    gamePanel: null,

    // 時間
    time: 101,
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
    
    isShowResult: false,

    ReachedPair: 0,
    
    recondCount: 0,

    // 開始遊戲
    start: function() {

        document.getElementById("start").disabled = true;
        document.getElementById("reset").disabled = false;

        if (this.isGameReset) {

            this.isShowResult = false;
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
    
    quick: function() {
        
        this.isGameOver = true;
        this.isShowResult = true;
        
        if  (this.isShowResult) {
            var popup = document.getElementById("gameNotOver");
            document.getElementById("result").innerHTML = "100秒";
            popup.setAttribute("id", "gameOver");
        }

    },

    reset: function() {

        document.getElementById("start").disabled = false;
        document.getElementById("reset").disabled = false;

        this.clear();
        this.initPieces();
        this.initImgPieces();
        this.time = 101;
        this.lastTime = 0;
        document.getElementById("time_timeMode").innerHTML = 100;

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

        this.time = 101;
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
            this.pieceImgList[i].img.src = "img/game/pieces/default/" + this.randomList[i] + ".png";
            this.pieceImgList[i].img.style = "border: 1px white ridge; cursor: pointer;";
            this.pieceImgList[i].img.addEventListener("click", playButtonSound, false);
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
        
        if (this.time == 0) {
            this.isGameOver = true;
            this.isShowResult = true;
        }
        
        if  (this.isShowResult) {
            var popup = document.getElementById("gameNotOver");
            var result = "";
            result += this.time;
            result += "秒"
            document.getElementById("result").innerHTML = result;
            popup.setAttribute("id", "gameOver");
        }

        if (this.isGameOver) {
            
            return;

        } else {

            this.time--;
            document.getElementById("time_timeMode").innerHTML = this.time;
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

var isPlaying;
var back_music;
var buttonSound;

window.onload = function() {
    document.getElementById("start").disabled = false;
    document.getElementById("reset").disabled = true;
    document.getElementById("home").addEventListener("click", backHome, false);
    document.getElementById("backHome").addEventListener("click", backHome, false);
    document.getElementById("start").addEventListener("click", playButtonSound, false);
    document.getElementById("reset").addEventListener("click", playButtonSound, false);
    document.getElementById("quick").addEventListener("click", playButtonSound, false);
    document.getElementById("oneMore").addEventListener("click", oneMoreGame, false);
    back_music = document.getElementById("default_music");
    buttonSound = document.getElementById("button_sound");
    isPlaying = false;
}

// 遊戲開始入口
function Start() { Game.start(); }

// 遊戲重置入口
function Reset() { Game.reset(); }

function Quick() { Game.quick(); }

function music(){
    buttonSound.play();
    
    if(!isPlaying){
        back_music.play();
        isPlaying = true;
        document.getElementById("music").value = "暫停音樂";
    }
    else{
        back_music.pause();
        isPlaying = false;
        document.getElementById("music").value = "播放音樂";
    }
}

function backHome() {
    buttonSound.play();
    
    setTimeout(function(){ location.href = 'index.html'; }, 200);
}

function oneMoreGame() {
    buttonSound.play();
    
    setTimeout(function(){ location.href = 'game_default_time.html'; }, 200);
}

function playButtonSound() { buttonSound.play(); }
