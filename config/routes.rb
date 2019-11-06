Rails.application.routes.draw do
  devise_for :users
  root to: "groups#index"
  #groups()を基本ページにする。
  resources :users, only: [:edit, :update, :index]
  #users_controllerで編集、更新、一覧アクションを使える様にする
  resources :groups, only: [:new, :create, :edit, :update, :index] do
    resources :messages, only: [:index, :edit, :update, :create]
  #groups_controllerで新規作成、データ追加、編集、更新、一覧を使える様にして、且つグループの中のmessageで一覧、編集、更新、データ追加をする。
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
    #controllersディレクトリ直下にさらにディレクトリを作成したので、ルーティングをそれに対応させるために「namespace :ディレクトリ名 do ~ end」を使う。ディレクトリ内のコントローラのアクションを指定できる
    #ターミナルからrails routesコマンドなどでルーティングを確認すると、/groups/:id/api/messagesというパスでリクエストを受け付け、api/messages_controller.rbのindexアクションが動くようになっている
    #defaultsオプションを利用して、このルーティングが来たらjson形式でレスポンスするよう指定して
  end
end