json.array! @users do |user|
#jsonで配列の値を送る。userの値を配列で送っている。
  json.id user.id
  json.name user.name
  #userのidをjsonのidに。userのnameをjsonのnameに変換している。
end