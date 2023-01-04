"user strict";

// ページ本体が読み込まれたタイミングで実行するコード
document.addEventListener("DOMContentLoaded",
    function () {
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装れていません");
            return;
        } else {
            viweStorage();
            saveLocalStorage();
            delLocalStorage();
            allClearLocalStorage();
            selectTable();
        }
    }, false);

// localStorageへの保存
function saveLocalStorage() {
    document.getElementById("save").addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKev").value;
            const value = document.getElementById("textMemo").value;

            if (key == "" || value == "") {
                soundType(s_error);
                Swal.fire({
                    title: "Memo app",
                    html: "Key、Memoはいずれも必須です。",
                    type: "error",
                    allowOutsideClick: false
                });
                return;
            } else {
                let w_msg = "LocalStorageに\n「" + key + " " + value + "」\nを保存しますか？";
                soundType(s_question);
                Swal.fire({
                    title: "Memo app",
                    html: w_msg,
                    type: "question",
                    showCancelButton: true
                }).then(function (result) {
                    if (result.value === true) {
                        soundType(s_ok);
                        localStorage.setItem(key, value);
                        viweStorage();
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存しました";
                        Swal.fire({
                            title: "Memo app",
                            html: w_msg,
                            type: "success",
                            allowOutsideClick: false
                        });
                        document.getElementById("textKev").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }
        }, false);
};

// localStorageすべての情報の取得
function viweStorage() {
    const list = document.getElementById("list");
    // htmlのテーブル初期化
    while (list.rows[0]) list.deleteRow(0);

    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        // localStorageキーと値を表示
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name='check1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img  class='trash' src='./img/trash_icon.png'>"
    }

    // JQueryのplugin tablesorterを使ってターブルのソート
    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });

    $("#table1").trigger("update");
};

// データ選択
function selectTable() {
    const select = document.getElementById("select");

    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectCheckBox(select); // テーブルからデータを選択
        }, false);
};

// テーブルからデータを選択
function selectCheckBox(model) {
    let w_cnt = 0;
    const check1 = document.getElementsByName("check1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < check1.length; i++) {
        if (check1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }

    document.getElementById("textKev").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;

    if (model === document.getElementById("select")) {
        if (w_cnt === 1) {
            return w_cnt;
        } else {
            soundType(s_error);
            Swal.fire({
                title: "Memo app",
                html: "1つ選択（select）してください",
                type: "error",
                allowOutsideClick: false
            });
        }
    }

    if (model === document.getElementById("del")) {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            soundType(s_error);
            Swal.fire({
                title: "Memo app",
                html: "1つ以上選択（select）してください",
                type: "error",
                allowOutsideClick: false
            });
        }
    }
};

// localStorageから１件以上削除
function delLocalStorage() {
    const del = document.getElementById("del");
    const table1 = document.getElementById("table1");

    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const check1 = document.getElementsByName("check1");
            let w_cnt = 0;
            w_cnt = selectCheckBox(del);

            if (w_cnt >= 1) {

                soundType(s_question);
                let w_confirm = "LocalStorageから選択されている" + w_cnt + "件を削除（delete）しますか？";
                Swal.fire({
                    title: "Memo app",
                    html: w_confirm,
                    type: "question",
                    showCancelButton: true
                }).then(function (result) {
                    if (result.value === true) {

                        soundType(s_delete);
                        for (let i = 0; i < check1.length; i++) {
                            if (check1[i].checked) {
                                localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                            }
                        }
                        viweStorage();
                        let w_msg = "LocalStorageから" + w_cnt + "件を削除（delete）しました";
                        Swal.fire({
                            title: "Memo app",
                            html: w_msg,
                            type: "success",
                            allowOutsideClick: false
                        });

                        document.getElementById("textKev").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }
        }, false);

    table1.addEventListener("click", function (e) {
        if (e.target.classList.contains("trash") === true) {

            e.preventDefault();
            soundType(s_question);
            let index = e.target.parentNode.parentNode.sectionRowIndex;
            const key = table1.rows[index + 1].cells[1].firstChild.data;
            const value = table1.rows[index + 1].cells[2].firstChild.data;

            let w_confirm = "LocalStorageから\n「" + key + " " + value + "」\nを削除（delete）しますか？";

            Swal.fire({
                title: "Memo app",
                html: w_confirm,
                type: "question",
                showCancelButton: true
            }).then(function (result) {
                if (result.value === true) {

                    soundType(s_delete);
                    localStorage.removeItem(table1.rows[index + 1].cells[1].firstChild.data);
                    viweStorage();
                    let w_msg = "LocalStorageから\n「" + key + " " + value + "」\nを削除（delete）しました";
                    Swal.fire({
                        title: "Memo app",
                        html: w_msg,
                        type: "success",
                        allowOutsideClick: false
                    });

                    document.getElementById("textKev").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }
    })
};

// localStorageからすべて削除
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            soundType(s_question);
            let w_confirm = "LocalStorageのデータをすべて（all clear）削除します。\nよろしいですか？";

            Swal.fire({
                title: "Memo app",
                html: w_confirm,
                type: "question",
                showCancelButton: true
            }).then(function (result) {
                if (result.value === true) {

                    soundType(s_delete);
                    localStorage.clear();
                    viweStorage();
                    let w_msg = "LocalStorageのデータをすべて削除（all clear）しました";
                    Swal.fire({
                        title: "Memo app",
                        html: w_msg,
                        type: "success",
                        allowOutsideClick: false
                    });

                    document.getElementById("textKev").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }, false);
};

// サウンド
function soundType(sound) {
    if (soundEndFlag === "1") {
        soundControl("end", "");
    }

    soundControl("start", sound);
    soundEndFlag = "1";
}

let s_error = "./sound/error.mp3";
let s_question = "./sound/question.mp3";
let s_delete = "./sound/delete.mp3";
let s_ok = "./sound/ok.mp3";

let soundEndFlag = "0";
let music;
function soundControl(status, sound) {
    if (status === "start") {
        music = new Audio(sound);
        music.currentTime = 0;
        music.play();
    } else if (status === "end") {
        music.pause();
        music.currentTime = 0;
    }
}