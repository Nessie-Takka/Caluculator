//グローバル変数
var dn = "0";   //DisplayNumber　文字列
var op1;    //保存している第1オペランド(1 + 2ならば1に相当する値)　画面に表示される値
var operator;    //保存している演算子
var lastKey = false;    //最後に押したキーが数字ならtrue

//display関数を定義。引数はtrueかfalse(true or falseでtof)
const display = (tof) => {
    //最後に押したキーに関して
    lastKey = tof;
    document.getElementById("display").value = dn;
}
//ACボタンを押したときの挙動
const allClear = () => {
    dn = "0"; //ディスプレイにはゼロ
    op1 = undefined; //第1オペランドに属さない
    operator = undefined; //演算子でもない
    display(false);
}
const calculate = () => {
    switch (operator) {
        //parseFloat(dn)は文字列を数値に変換
        //+ボタンを押したとき
        case 1:
            op1 += parseFloat(dn);    //第一オペランドに画面上の数値を足す
            break;
        //ーボタンを押したとき
        case 2:
            op1 -= parseFloat(dn);
            break;
        //×ボタンを押したとき
        case 3:
            op1 *= parseFloat(dn);
            break;
        //÷ボタンを押したとき
        case 4:
            op1 /= parseFloat(dn);
            break;
    }
    dn = String(op1);//画面に表示される値を文字列に変換
}

//数字ボタンを押したときの処理
const numKey = (num) => {
    //数字ボタンを押すと、それに対応した内容がchに格納される。10は"."に対応。
    let ch = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."][num];
    //最後に押したキーが計算記号なら
    if (lastKey === false) {
        //10のときは0.と表示し、それ以外は数字をディスプレイに表示
        if (num > 9) {
            dn = "0."
        } else {
            dn = ch
        }
    } else {//最後に押したキーが数字なら
        //10(ピリオド)を押したとき、ピリオドの数を数えてゼロのときのみ"."を追加。それ以外は何も処理しない。
        if (num > 9) {
            if (dn.indexOf(".") = 0) dn += ".";
        } else {//数字ボタンを押したとき
            //  ディスプレイに表示されている数字が0のとき
            if (dn === "0") {
                //押した数字を表示
                dn = ch;
            } else {//ディスプレイに表示されている数字が0以外のとき
                dn += ch; //  表示中の数字列の右端に追加する
            }
        }
    }
    //入力内容をディスプレイに表示する
    display(true);
}

//演算子ボタンを押したとき
const operate = (e) => {
    //保存されている演算子が存在しかつイコール以外で、かつ最後に押したキーが演算子またはイコールのときは計算する
    if (operator !== undefined && operator != 5 && (lastKey || e === 5)) calculate();
    operator = e;
    op1 = parseFloat(dn);//演算子ボタンを押したとき、画面に表示されている文字を数字に変換
    display(false); //演算子ボタンは表示させない
}