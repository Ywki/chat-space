json.array! @messages do |message|
  json.content      message.content
  json.image        message.image.url
  json.date         message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")
  json.user_name    message.user.name
  json.id           message.id
end
#jbuilder:array!=JavaScript側に配列で値を送ることが可能になる