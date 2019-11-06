#messageを作成した際のcreateアクションに対しての処理をする。右は受けたデータ。左でjson型で返している。
#message.jsに帰ってく

json.content    @message.content
json.image      @message.image.url
json.created_at @message.created_at
json.user_name  @message.user.name
#idもデータとして渡す
json.id         @message.id
#jsonはjson型に直すって意味。.〜はjsで使うための命名
#@messageはmessage_controllerのcreateアクションで渡された値のこと。.〜は渡されたデータの中のカラム名的なやつ。
#@message.user.nameはmessageモデルにアソシエーションされているuserからnameを取り出してくるの意味。