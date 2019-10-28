## users テーブル
|Column|Type|Options|
|------|----|-------|
|nick_name|strings|null :false, unique: true, index: true|
|email|strings|null :false, unique: true|
|password|strings|null :false, unique: true|

### Association
- has_many :posts
- has_many :users_groups
- has_many :groups, through: :users_groups


## groups テーブル
|Column|Type|Options|
|------|----|-------|
|name|strings|null :false|

### Association
- has_many :posts
- has_many :users_groups
- has_many :users, through: :users_groups


## posts テーブル
|Column|Type|Options|
|------|----|-------|
|post|text||
|image|text||
|user_id|references|null :false, foreign_key: true|
|group_id|references|null :false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## users_groups テーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null :false, foreign_key: true|
|group_id|references|null :false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group