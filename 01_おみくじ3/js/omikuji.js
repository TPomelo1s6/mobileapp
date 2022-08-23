"use strict";

// ランダム変数
var n = 0;
// 前回のランダム数の値
var nBefore = 0;
window.addEventListener("DOMContentLoaded",
    function () {
        $("header").textillate({
            loop: false, // ループのオンオフ
            minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
            initialDelay: 2000, // 遅延時間
            autoStart: true, // アニメーションを自動的にスタート
            in: { // フェードインのエフェクトの詳細設定
                effect: "fadeInLeftBig", // エフェクトの名前(animate.css参照)
                delayScale: 1.5, // 遅延時間の指数
                delay: 50, // 文字ごとの遅延時間
                sync: false, // trueはアニメーションをすべての文字に同時に適用
                shuffle: true // trueは文字を順番にではなく、ランダムに
            }
        });

        // おみくじボタン(id="btn1") ボヤァと表示させる
        $(function () {
            ScrollReveal().reveal("#btn1", { duration: 9000 });
        });

        setTimeout(
            function () {
                let popMessage = "いらっしゃいませ！おみくじ引いてって！"
                window.alert(popMessage);
            },
            "5000"
        );
    }, false

);

let soundEndFlag = "0";
const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");
const omikujiTextImage = document.getElementById("omikujiTextImage");
btn1.addEventListener("click",
    function () {
        if (soundEndFlag === "1") {
            soundControl("end", "");
        }
        // 背景サウンドの配列
        let resultSound = ["sound/omikuji_sound1.mp3", "sound/omikuji_sound2.mp3", "sound/omikuji_sound3.mp3", "sound/omikuji_sound4.mp3", "sound/omikuji_sound5.mp3"];
        // 文字写真の配列
        let resultText = ["img/daikichi.png", "img/chukichi.png", "img/syokichi.png", "img/suekichi.png", "img/daikyo.png"];
        // 降る写真の配列
        let resultImage = ["img/redLeaves1.png", "img/redLeaves2.png", "img/redLeaves3.png", "img/redLeaves4.png", "img/water2.png"];
        // 最大速度の配列
        let resultMaxSpeed = [6, 6, 4, 4, 5];
        // 最大サイズの配列
        let resultMaxSize = [30, 30, 20, 20, 30];
        // 同じ内容が続けて出ない
        while (n === nBefore) {
            n = Math.floor(Math.random() * resultText.length);
        }
        // 前回のランダム数を保存する
        nBefore = n;

        // 文字写真を取得する
        omikujiTextImage.src = resultText[n];

        omikujiTextImage.classList.add("omikujiPaper");
        omikujiTextImage.addEventListener("animationend",
            function () {
                omikujiTextImage.classList.remove("omikujiPaper");
            }, false
        );

        w_sound = resultSound[n];
        soundControl("start", w_sound);
        soundEndFlag = "1";

        // snowfall stop
        $(document).snowfall("clear");

        // jQueryのsnowfall
        $(document).ready(function () {
            $(document).snowfall({
                maxSpeed: resultMaxSpeed[n], // 最大速度
                minSpeed: 1, // 最小速度
                maxSize: resultMaxSize[n], // 最大サイズ
                minSize: 1, // 最小サイズ
                image: resultImage[n]
            });
        });

    }, false
);

let w_sound;
let music;
function soundControl(status, w_sound) {
    if (status === "start") {
        music = new Audio(w_sound);
        music.currentTime = 0;
        music.play();
    } else if (status === "end") {
        music.pause();
        music.currentTime = 0;
    }
}