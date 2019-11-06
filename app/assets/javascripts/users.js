//user関連のjs動作をここでする。冒頭はfunctionでメソッド定義。

$(document).on('turbolinks:load', function() {
  //画面の遷移スピードを設定できる機能がデフォルトでjqueryにあって、その副作用で2回目の発火がしない様になっている。
  //turbolinks:loadで全体を囲むとロードしても正常な発火をする様になる。
  
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }

  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }

  $("#user-search-field").on("keyup", function() {
    //検索入力のタグである 「#user-search-field」 を指定しjQueryオブジェクトを取得。keyup=テキストフィールドに文字が入力されるたびにイベントを発火。
    let input = $("#user-search-field").val();
    //val=フォームの値を取得する時に使用するメソッド。値を取得し、コンソールに表示されるようなものにする。
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    //rake routesのusersでHTTPメソッドはGET、URIは/users。dataはusers_controllerのparamsの「入力されたkeyword」。datatypeをjsonへ変換。
      .done(function(users) {
        //jsonが返ってきたら発火。
        $("#user-search-result").empty();
        //検索発火後、emptyで検索結果を空にする。
        if (users.length !== 0) {
          //ユーザーが0じゃなかった場合に発火する。
          users.forEach(function(user) {
            //ユーザーを一覧で表示する
            addUser(user);
            //functionで定義したものを呼び出している。ユーザーネーム・ユーザーID・
          });
        } else if (input.length == 0) {
          //入力が0だったら発火する。
          return false;
        } else {
          addNoUser();
          //上記以外だったら発火する。
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
        //jsonじゃなかったら発火
      });
  });

  $("#user-search-result").on("click", ".chat-group-user__btn--add", function() {
    //追加ボタンを押したらdocumentが発火する。
    const userName = $(this).attr("data-user-name");
    //document(this)のデータからdata-user-nameを取り出してuserNameへ代入。
    const userId = $(this).attr("data-user-id");
    //document(this)のデータからdata-user-idを取り出してuserIdへ代入。
    $(this)
      .parent()
      .remove();
    //thisは.chat-group-user__btn--addのクラスを取ってくる。
    //.parent()で親要素「chat-group-user clearfix」を呼び出す。.remove()で親要素を削除する。※この動作で追加一覧から消える。
    addDeleteUser(userName, userId);
    addMember(userId);
  });

  $(".js-add-user").on("click", ".chat-group-user__btn--remove", function() {
    //追加ボタンを押したらdocumentが発火する。
    $(this)
      .parent()
      .remove();
    //this=.chat-group-user__btn--remove。.parent()で「chat-group-user clearfix」を呼び出して.remove()で削除。※メンバー一覧から消える。
  });
});