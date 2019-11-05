class MessagesController < ApplicationController
  before_action :set_group
  #コントローラーがアクションを行う前にprivateのset_groupが起動する。

  def index
    @group = Group.find(params[:group_id])
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    #新メッセージ・編集情報・情報更新の登録じにアクションする
    @message = @group.messages.new(message_params)
    #()のmessage_paramsはprivateのmessage_paramsのこと。
    if @message.save
      #メッセージが保存された場合に以下作動
      respond_to do |format|
      #返ってきた情報がhtmlかjsonかで処理を変える。
      format.html { redirect_to group_messages_path, notice: "メッセージを送信しました" }
      #group_messages_pathへ戻る。
      format.json
      end
    else
      #メッセージが保存されなかった場合に以下作動
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
      #
    end
  end

  def edit
    #編集画面の立ち上げアクション
  end

  def update
    #情報更新時にアクションする
  end

  private
  #ここ以下のクラスで定義したものは外部からのアクセスを限定する。また外部からの影響を受けない。

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end
  #requireは受け取るクラスの値のキーを設定できる。
  #permitで許可したカラムの受け入れをする。
  #.mergeでは直近のuser.idを取得。ログイン中のユーザーに関して、左記を行う。
  
  def set_group
    @group = Group.find(params[:group_id])
  end
  #.find(params[:group_id])= Groupからパラメーター内にあるgroup_idを取ってくる。@groupに代入する。

end