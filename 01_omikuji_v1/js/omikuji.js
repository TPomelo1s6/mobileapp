"use strict";

// ランダム変数
var n = 0;
// 前回のランダム変数の値
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

const btn1 = document.getElementById("btn1");
btn1.addEventListener("click",
    function () {
        // let n = Math.floor(Math.random() * 3);

        // switch (n) {
        //     case 0:
        //         btn1.textContent = "大当たり!";
        //         btn1.style.color = "#FF0000";
        //         btn1.style.fontSize = "50px";
        //     break;
        //     case 1:
        //         btn1.textContent = "当たり!";
        //         btn1.style.color = "#fff001";
        //         btn1.style.fontSize = "40px";
        //     break;
        //     case 2:
        //         btn1.textContent = "残念...";
        //         btn1.style.color = "#333333";
        //         btn1.style.fontSize = "20px";
        //     break;
        // }
        let resultText = ["大吉!!!!!!", "吉!!!!", "中吉!!!", "小吉!!", "末吉!", "凶"];
        let resultColor = ["#ff0000", "#c71585", "#ff1493", "#ff69b4", "#ff8c00", "#1e90ff"];
        let resultFontSize = ["50px", "40px", "35px", "30px", "25px", "15px"];

        // 同じ内容が続けて出ない
        while (n === nBefore) {
            n = Math.floor(Math.random() * resultText.length);
        }
        // 前回のランダム変数の値を保存する
        nBefore = n;
        
        btn1.textContent = resultText[n];
        btn1.style.color = resultColor[n];
        btn1.style.fontSize = resultFontSize[n];

        // snowfall stop
        $(document).snowfall("clear");

        // jQueryのsnowfall
        $(document).ready(function () {
            $(document).snowfall({
                maxSpeed: 5, // 最大速度
                minSpeed: 1, // 最小速度
                maxSize: 30, // 最大サイズ
                minSize: 3, // 最小サイズ
                image: 'img/rose.webp'
            });
        });

    }, false
);
