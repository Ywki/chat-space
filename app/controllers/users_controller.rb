#user情報を扱うコントローラー。

class UsersController < ApplicationController

  def index
    return nil if params[:keyword] == ""
    #return=return以降の関数が空白の場合は何も動作しない。
    #paramsにkeywordが入れば下へ進んでいく。上の表記はこれで1セット。
    @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    #?はあいまい検索をするときに使う。
    #LIKE=文字検索のこと。転じてname LIKEで名前検索を指示する。name LIKEのnameはカラム名。nameじゃなくてmessageとかもいける。
    #%#{params[:keyword]}%=入力されたパラメーターのキーワードを検索する。
    #.where.not(id: current_user.id)=直近ログインしているユーザーを除いたユーザーを検索指示の中から10人まで表示
    #@usersに検索された自分以外のユーザーを10人候補に挙げて代入する。
    respond_to do |format|
      format.html
      format.json
    end
  end
  #ajaxから送られてきた情報でhtmlの場合、jsonの場合で振り分け。
  
  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end
  #privateのuser_paramsを取ってきて、情報を更新する。更新後にメイン画面へ戻る。
  #それ以外は編集アクションへ進む。

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
#.require(:user)でユーザーテーブルを指定。.permit(:name, :email)で名前カラムとメールカラムの受け入れ。