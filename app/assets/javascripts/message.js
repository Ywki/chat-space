//message_controllerがアクションを行う際にcontrollerが動く前に起動する。
//message_controllerから返ってきたデータの処理を行う。


$(document).on('turbolinks:load', function(){
  //全構文をくくっているfunction
  function buildPost(message){
    //
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                  </div>
                </div>`
    //message_controllerからjs用にmessageデータがきた時の画面実装
    return html;
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    //#new_message=form class=new_message、id=new_message、action="/groups/2/messages"などの情報を持っている。※コンソール参照。
    //submitボタンを押したら #new_message が動く。
    //eはeventのことで、引数。
    //preventDefault()=ブラウザ側で勝手にリクエストが送られるのを防ぐ、jsのリクエストのみで送信されるイベントで発火させる。
    //メッセージ投稿formのid:#new_messageを指定する
    var formData = new FormData(this);
    //thisは$("#new_message")のこと。このクラスではthisが全て$("#new_message")。
    //FormDataは新しく生成したクラス。メソッドの様な認識でOK。入力されたnew_messageデータをformDataへ代入する。
    var url = $(this).attr('action')
    //.attr = this(new_message)の中のactionのデータを取ってくる。urlへ代入する。
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    //jsからajaxで指定したキーをコントローラーへ送る。
    //urlはrake routesのurlのこと。上で定義した var url = $(this).attr('action')。
    //typeはHTTPメソッド。rake routesのcreateアクションを参考にする。
    //dataは上で代入したvar formData = new FormData(this);。
    //dataTypeはjson型に変換する指示をだしている。
    //processDataとcontentTypeはFormDataを使う際に入れる。ajaxにはajax送信に適した形でデータを再生形する機能がある。でもFormDataはすでにデータを送っているので、キャンセルする。


    .done(function(message) {
      //jbuilderを通してcontrollerから返ってきたデータが正しければ起動する。
      //messageは名前付け。下に渡すために名前つけている。ここにはjbuilderから送られてきた情報が全て入っている。
      var html = buildPost(message);
      //buildPostは変数。名前に指定はない。最上部のfunctionで名前付けしたやつ。
      //messageは上から値を受け取るために書いている。
      //htmlにbuildPost(message)を代入。
      $(".contents__right-main").append(html);
      //どこに更新する内容を表示させたいかクラス指定。
      //上記で代入されたデータを指定したクラスに表示。
      $('.contents__right-main').animate({scrollTop: $('.contents__right-main')[0].scrollHeight});
      //$(".contents__right-bottom-send")=最新の投稿へスクロールしたい画面のクラス名
      //
      $(".contents__right-bottom-send").prop("disabled", false);
      //はじめに発火させたいクラスを設定する。
      //.prop=attrの様な役割。
      //("disabled", false)で発火後の機能停止をキャンセルする
      $(message_content).val("")
      //message_contentクラスのデータをイベント発火後に空にする。
    })
    .fail(function(){
      alert("エラー")
      //jbuilderを通してcontroller(messages_controller)から返ってきたデータが正しくなければエラーを返す。
    })
  })
});