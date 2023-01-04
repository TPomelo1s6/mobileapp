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

        td1.innerHTML = "<input name='radio1' type='radio'>";
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
            selectRadioBtn(); // テーブルからデータを選択
        }, false);
};

// テーブルからデータを選択
function selectRadioBtn() {
    let w_sel = "0"; // 選択されていれば、”１”にする
    const radio1 = document.getElementsByName("radio1");
    const table1 = document.getElementById("table1");

    for (let i = 0; i < radio1.length; i++) {
        if (radio1[i].checked) {
            document.getElementById("textKev").value = table1.rows[i + 1].cells[1].firstChild.data;
            document.getElementById("textMemo").value = table1.rows[i + 1].cells[2].firstChild.data;
            return w_sel = "1";
        }
    }

    window.alert("1つ選択（select）してください");
};

// localStorageから１件削除
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_sel = 0;
            w_sel = selectRadioBtn();

            if (w_sel === "1") {
                const key = document.getElementById("textKev").value;
                const value = document.getElementById("textMemo").value;
                let w_confirm = confirm("LocalStorageから\n" + key + " " + value + "\nを削除（delete）しますか？");

                if (w_confirm) {
                    localStorage.removeItem(key);
                    viweStorage();
                    let w_msg = "LocalStorageから" + key + " " + value + "を削除（delete）しました";
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