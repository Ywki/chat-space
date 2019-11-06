//テキストフィールドに文字が入力されるたびにイベントが呼び出されるための記述
//app/views/tweets/index.html.erbのform部分に対しての実装

$(function() {
  $(".search-input").on("keyup", function() {
    var input = $(".search-input").val();
  });
  //app/views/tweets/index.html.erbのform部分にあるクラス「search-input」を使う。
  //".search-input”の部分のテキストフィールドがkeyupしたら、テキストフィールドの文字を取得して変数inputに代入する。
  //val()でフォームの値を取得
});