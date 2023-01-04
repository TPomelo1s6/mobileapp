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
                alert("Key、Memoはいずれも必須です。");
                return;
            } else {
                let w_confirm = confirm("LocalStorageに\n「" + key + " " + value + "」\nを保存しますか？");

                if (w_confirm) {
                    localStorage.setItem(key, value);
                    viweStorage();
                    let w_msg = "LocalStorageに" + key + " " + value + "を保存しました";
                    window.alert(w_msg);
                    document.getElementById("textKev").value = "";
                    document.getElementById("textMemo").value = "";
                }
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

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='check1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
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
            window.alert("1つ選択（select）してください");
        }
    }

    if (model === document.getElementById("del")) {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            window.alert("1つ以上選択（select）してください");
        }
    }
};

// localStorageから１件以上削除
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const check1 = document.getElementsByName("check1");
            const table1 = document.getElementById("table1");
            let w_cnt = 0;
            w_cnt = selectCheckBox(del);

            if (w_cnt >= 1) {

                let w_confirm = confirm("LocalStorageから選択されている" + w_cnt + "件を削除（delete）しますか？");

                if (w_confirm) {
                    for (let i = 0; i < check1.length; i++) {
                        if (check1[i].checked) {
                            localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                        }
                    }
                    viweStorage();
                    let w_msg = "LocalStorageから" + w_cnt + "件を削除（delete）しました";
                    window.alert(w_msg);
                    document.getElementById("textKev").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        }, false);
};

// localStorageからすべて削除
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_confirm = confirm("LocalStorageのデータをすべて（all clear）削除します。\nよろしいですか？");

            if (w_confirm === true) {
                localStorage.clear();
                viweStorage();
                let w_msg = "LocalStorageのデータをすべて削除（all clear）しました";
                window.alert(w_msg);
                document.getElementById("textKev").value = "";
                document.getElementById("textMemo").value = "";
            }
        }, false);
};