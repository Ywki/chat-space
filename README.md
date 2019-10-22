## users テーブル
|Column|Type|Options|
|------|----|-------|
|nick_name|strings|null :false, unique: true, index|
|email|strings|null :false, unique: true|
|password|strings|null :false, unique: true|

### Association
- has_meny :post
- has_meny :users_groups
- has_meny :groups, through :users_groups


## groups テーブル
|Column|Type|Options|
|------|----|-------|
|group_name|strings|null :false|

### Association
- has_meny :post
- has_meny :users_groups
- has_meny :users, through :users_groups


## posts テーブル
|Column|Type|Options|
|------|----|-------|
|post|text|null :faise|
|image|text||
|user_id|integer|null :false|
|group_id|integer|null :false|

### Association
- belongs_to :user
- belongs_to :group


## users_groups テーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null :false, foreign_key: true|
|group_id|integer|null :false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group