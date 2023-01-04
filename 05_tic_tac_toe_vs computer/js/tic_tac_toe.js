"use strict";

// flagがtrueの場合はcatのターン、falseの場合はpandaのターン
let flag = true;

// ターン数カウンター
let counter = 9;

const squares = document.getElementsByClassName("square");

const squareArray = Array.from(squares);

// squareの要素を取得
const a_1 = document.getElementById("a_1")
const a_2 = document.getElementById("a_2")
const a_3 = document.getElementById("a_3")
const b_1 = document.getElementById("b_1")
const b_2 = document.getElementById("b_2")
const b_3 = document.getElementById("b_3")
const c_1 = document.getElementById("c_1")
const c_2 = document.getElementById("c_2")
const c_3 = document.getElementById("c_3")

// Newganeボタンを取得
const newgamebtn_display = document.getElementById("newgame-btn")
const newgamebtn = document.getElementById("btn90");

const line1 = JudgLing(squareArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLing(squareArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLing(squareArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLing(squareArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLing(squareArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLing(squareArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLing(squareArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLing(squareArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;

// メッセージ
const msgtxt1 = '<p class="image"><img src="./img/cat.png" width="61px" height="61px"></p><p class="text">Cat Attack!(your turn)</p>';
const msgtxt2 = '<p class="image"><img src="./img/panda.png" width="61px" height="61px"></p><p class="text">Panda Attack!(computer turn)</p>';
const msgtxt3 = '<p class="image"><img src="./img/cat.png" width="61px" height="61px"></p><p class="text animate__animated animate__lightSpeedInLeft">Cat Win!</p>';
const msgtxt4 = '<p class="image"><img src="./img/panda.png" width="61px" height="61px"></p><p class="text animate__animated animate__lightSpeedInRight">Panda Win!</p>';
const msgtxt5 = '<p class="image"><img src="./img/cat.png" width="61px" height="61px"><img src="./img/panda.png" width="61px" height="61px"></p><p class="text animate__bounceIn">Draw!</p>';

// サウンド
let gameSound = ["sound/click_sound1.mp3", "sound/click_sound2.mp3", "sound/cat_sound.mp3", "sound/panda_sound.mp3", "sound/draw_sound.mp3"];

// ページ本体が読み込まれたタイミングで実行する
window.addEventListener("DOMContentLoaded", function() {
    setMessage("cat-turn");

    // squareがクリック可能かを判断するクラスを追加
    squareArray.forEach(function(square) {
        square.classList.add("js-clickable");
    });
}, false)

// squareをクリックしたときのイベント
squareArray.forEach(function(square) {
    square.addEventListener('click', () => {
        let gameOverFlag = isSelect(square);

        // GameOverではない場合、パンダのターン
        if (gameOverFlag === '0') {
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable");
            setTimeout(function() {
                pandaTurn();
            }, 500);
        }
    });
});

// クリックしたsquareにはcatかpandaを表示
function isSelect(selectSquare) {
    let gameOverFlag = "0";

    if (flag === true) {

        // クリックサウンド
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play(); // 再生

        selectSquare.classList.add("js-cat-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");

        // cat win
        if (isWinner('cat')) {
            setMessage('cat-win');
            gameOver('cat');
            return gameOverFlag = "1";
        }

        setMessage('panda-turn');
        flag = false;
    } else {

        // クリックサウンド
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play(); // 再生

        selectSquare.classList.add("js-panda-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");

        // panda win
        if (isWinner('panda')) {
            setMessage('panda-win');
            gameOver('panda');
            return gameOverFlag = "1";
        }

        setMessage('cat-turn');
        flag = true;
    }

    counter--;

    if (counter === 0) {
        setMessage("draw")
        gameOver('draw');
        return gameOverFlag = "1";
    }

    return gameOverFlag = "0";
}

// メッセージ切り替え関数
function setMessage(id) {
    const msgtext = document.getElementById("msgtext");
    switch (id) {
        case 'cat-turn':
            msgtext.innerHTML = msgtxt1;
            break;
        case 'panda-turn':
            msgtext.innerHTML = msgtxt2;
            break;
        case 'cat-win':
            msgtext.innerHTML = msgtxt3;
            break;
        case 'panda-win':
            msgtext.innerHTML = msgtxt4;
            break;
        case 'draw':
            msgtext.innerHTML = msgtxt5;
            break;
        default:
            msgtext.innerHTML = msgtxt1;
    }
}

function JudgLing(targetArray, idArray) {
    return targetArray.filter(function(e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

function isWinner(symbol) {
    const result = lineArray.some(function(line) {
        const subResult = line.every(function(square) {
            if (symbol === 'cat') {
                return square.classList.contains("js-cat-checked");
            }

            if (symbol === 'panda') {
                return square.classList.contains("js-panda-checked");
            }
        });

        if (subResult) {
            winningLine = line;
        }

        return subResult;
    });

    return result;
}

function gameOver(status) {

    // GameOver サウンド
    let w_sound;
    switch (status) {
        case 'cat':
            w_sound = gameSound[2];
            break;
        case 'panda':
            w_sound = gameSound[3];
            break;
        case 'draw':
            w_sound = gameSound[4];
            break;
    }

    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play(); // 再生

    // all square unclickable
    // squareArray.forEach(function(square) {
    //     square.classList.add('js-unclickable');
    // });

    // square-boxをクリックできないようにする
    squaresBox.classList.add("js-unclickable");

    // display New Game button: display
    newgamebtn_display.classList.remove("js-hidden");

    // winEffect
    if (status === 'cat') {
        // winner-line high-light
        if (winningLine) {
            winningLine.forEach(function(square) {
                square.classList.add('js-cat_hightLight');
            });
        }

        // cat win! ==> snow color is pink
        $(document).snowfall({
            flakeColor: "rgb(255, 40, 245)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    } else if (status === 'panda') {
        // winner-line high-light
        if (winningLine) {
            winningLine.forEach(function(square) {
                square.classList.add('js-panda_hightLight');
            });
        }

        // panda win! ==> snow color is blue
        $(document).snowfall({
            flakeColor: "rgb(175, 238, 238)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    }
}

// NewGameボタンをクリックしたとき、ゲームを初期化
newgamebtn.addEventListener("click", function(e) {
    flag = true;
    counter = 9;
    winningLine = null;

    // 9個のマス目のクラス名をリセット
    squareArray.forEach(function(square) {
        square.setAttribute("class", "square js-clickable");
    })

    // square-boxをクリックできるようにする
    squaresBox.classList.remove("js-unclickable");

    // メッセージのリセット
    setMessage("cat-turn");

    // NewGameボタンを非表示にする
    newgamebtn_display.classList.add("js-hidden");

    // snowfall stop
    $(document).snowfall("clear");
}, false)

// conputerのロジック
function pandaTurn() {
    // Gameが続けるフラグ
    let gameOverFlag = "0";

    // クリック可能なマス目を抽出する
    const pandaSquare = squareArray.filter(function(square) {
        return square.classList.contains("js-clickable");
    })

    // クリックできるマス目の中から、1つをランダムに選ぶ
    let n = Math.floor(Math.random() * pandaSquare.length);

    gameOverFlag = isSelect(pandaSquare[n]);

    // Gameが続ける場合
    if (gameOverFlag === "0") {
        // square-boxをクリックできるようにする
        squaresBox.classList.remove("js-unclickable");
    }
}