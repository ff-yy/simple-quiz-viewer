// URLを取得
var url = new URL(window.location.href);

// URLSearchParamsオブジェクトを取得
var params = url.searchParams;
var number = parseInt(params.get('num'));

document.getElementById("num").innerText = number;

// CSVの読み込み
function import_csv(csv_path) {
    fetch(csv_path)
    .then((res) => {
        if(!res.ok) {
            console.log('正常にリクエストを処理できませんでした。');
        }
        return res.text();
    })
    .then((csv_data) => {
        convert_array(csv_data);
    })
    .catch((error) => {
        console.log('エラーが発生しました。');
    })
}

// テキストデータを配列に変換 と 各要素に代入
function convert_array(csv_data) {
    let data_array = [];
    const data_string = csv_data.split('\n');
    for (let i = 0; i < data_string.length; i++) {
        data_array[i] = data_string[i].split(',');
    }
    console.log(data_array[number]);

    document.getElementById("question").innerText = data_array[number][3];
    document.getElementById("answer").innerText = data_array[number][4];
    document.getElementById("comment").innerText = data_array[number][5];
}

function showClick() {
    document.getElementById("answer").style.display ="block";
    document.getElementById("comment").style.display ="block";
}
function prevClick() {
    location.href = "?num=" + (number - 1);
}
function nextClick() {
    location.href = "?num=" + (number + 1);
}

import_csv("./quiz.csv");

document.getElementById("answer").style.display ="none";
document.getElementById("comment").style.display ="none";

document.getElementById("show").onclick = showClick;
document.getElementById("prev").onclick = prevClick;
document.getElementById("next").onclick = nextClick;

document.addEventListener('keydown', keyEvent);

function keyEvent(e) {
	if(e.code == 'Space'){
		showClick();
	}
    else if(e.code === 'ArrowLeft') {
        prevClick();
    }    else if(e.code == 'ArrowRight') {
        nextClick();
    }

	return false; 
}