//message_controllerがアクションを行う際にcontrollerが動く前に起動する。
//message_controllerから返ってきたデータの処理を行う。


$(document).on('turbolinks:load', function(){
  //全構文をくくっているfunction
  function buildPost(message){

    //ここのmessageは名前付け
    image = message.image ? `<img class= "lower-message__image" src=${message.image} >` : "";
    //ここのlower-message__imageは「views/messages/_messages.html.haml」の下部から引っ張ってきてる感じ。
    var html = `<div class="message" data-message-id="${message.id}">
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
                      ${image}
                  </div>
                </div>`
    //message_controllerからjs用にmessageデータがきた時の画面実装
    //class="message" の隣には「views/messages/_messages.html.haml」の上記に記入したdata-message-id="${message.id}"を追加
    //上の下部にある${image}は「var html」の上のimageを引っ張ってきてるっぽい。
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
      $("#new_message")[0].reset();
      //message_contentクラスのデータをイベント発火後に空にする。
    })
    .fail(function(){
      alert("エラー")
      //jbuilderを通してcontroller(messages_controller)から返ってきたデータが正しくなければエラーを返す。
    })
  })

    //以下自動更新の記述
    var reloadMessages = function () {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        //今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
        var last_message_id = $('.message:last').data("message-id");
        //dataメソッドで「.message〜にある:last」最後のカスタムデータ属性を取得しlast_message_idに代入。
        // var group_id = $(".group").data("group-id");
      
        $.ajax({
          url: "api/messages",
          //サーバを指定。今回はapi/message_controllerに処理を飛ばす。apiがどこからきてるのかわからん。rake routesにはなかった。
          type: 'get',
          dataType: 'json',
          //データはjson型で返す
          data: {id: last_message_id}
          //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
        })
        .done(function (messages) {
          //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
          var insertHTML = '';
          //追加するHTMLの入れ物を作る
          messages.forEach(function (message) {
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
            insertHTML = buildPost(message); 
            //ここのbuildPost(message)は最上記から引っ張ってきている。
            //メッセージが入ったHTMLを取得
            $('.contents__right-main').append(insertHTML);
            //メッセージを追加
          })
          $('.contents__right-main').animate({scrollTop: $('.contents__right-main')[0].scrollHeight}, 'fast');
          //最新のメッセージが一番下に表示されようにスクロールする。
        })
        .fail(function () {
          alert('自動更新に失敗しました');
          //ダメだったらアラートを出す
        });
      }
    };
  setInterval(reloadMessages, 5000);
  //5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。setInterval=第一引数に動かしたい関数名を、第二引数に動かす間隔をミリ秒単位で渡す
});