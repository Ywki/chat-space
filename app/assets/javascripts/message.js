$(function(){
  function buildPost(message){
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                    ${message.user_id}
                    </div>
                    <div class="upper-message__date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                  ${message.content}
                  <p class="lower-message__content">
                  </p>
                  </div>
                </div>`
    return html;
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildPost(message);
      $(".contents__right-main").append(html);
      $('.contents__right-main').animate({scrollTop: $('.contents__right-main')[0].scrollHeight});
      $(".contents__right-bottom-send").prop("disabled", false);
      $(message_content).val("")
    })
    .fail(function(){
      alert("エラー")
    })
  })
});