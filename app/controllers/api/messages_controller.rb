#WebAPIがここ。jsonをレスポンスするアクション。WebAPIにあたるアクションを書くコントローラのファイルは全て「api」というディレクトリに置くのがお作法だそう。

class Api::MessagesController < ApplicationController
  #Rubyのクラス名は、::で繋げて装飾することができる。名前空間またはnamespaceという。
  #名前空間をつけることにより、同様のクラス名で名付けたクラスを作ってもそれらを区別することができ
  def index
    group = Group.find(params[:group_id])
    #ルーティングでの設定によりparamsの中にgroup_idというキーでグループのidが入るので、これを元にDBからグループを取得する
    #group_idからグループを.findで探して、groupに代入。
    #last_message_id = params[:id].to_i
    #ajaxで送られてくる最後のメッセージのid番号を変数に代入
    @messages = group.messages.includes(:user).where("id > ?", params[:id])
    #messageが取ってきている値が「id」のため、params[:id]を取ってきて"id > ?"の?に入れて@messageに返している。
    #取得したグループでのメッセージ達から、idがlast_message_idよりも新しい(大きい)メッセージ達のみを取得
    #whereメソッドを使ってidを検索条件にする。
  end
end