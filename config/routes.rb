Rails.application.routes.draw do
  devise_for :users
  root to: "groups#index"
  #groups()を基本ページにする。
  resources :users, only: [:edit, :update, :index]
  #users_controllerで編集、更新、一覧アクションを使える様にする
  resources :groups, only: [:new, :create, :edit, :update, :index] do
    resources :messages, only: [:index, :edit, :update, :create]
  #groups_controllerで新規作成、データ追加、編集、更新、一覧を使える様にして、且つグループの中のmessageで一覧、編集、更新、データ追加をする。
  end
end