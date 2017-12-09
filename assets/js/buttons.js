$("#btnEnter").click(function() {
    chat_user = $("#nickname").val();
    console.log("nickname: " + chat_user);
    $.post(prefix + "./user",
        { nickname: chat_user },
        function(result) { console.log(result); if (result == "OK") load_chat(); else {
            $("#modal-message").html(result);
            $("#exampleModal").modal('show');
            console.log(result);
        } }
    );
});
$("#nickname").keypress(function(e) {
    if (e.which == 13)
        $("#btnEnter").click();
});

$("#btnDisconnect").click(function() {
    $.get(prefix + "./reset_users", function(result) {
        $("#modal-message").html(result);
        $("#exampleModal").modal('show');
        console.log(result);
    });
});

$("#btnResetMessages").click(function() {
    $.get(prefix + "./reset_messages", function(result) {
        $("#modal-message").html(result);
        $("#exampleModal").modal('show');
        console.log(result);
    });
});

$("#btnSendMessage").click(function() {
  var field = "#txtMessage";
  var p_message = $(field).val();
  $(field).val('');
  if (p_message == '') return;

  console.log(chat_user);
  $.post(prefix + "./send",
    { nickname: chat_user, textmsg: p_message },
    function(result) {
        if (result == "OK") {
            console.log('Mensagem enviada.');
            get_messages();
            setTimeout(scrolldown, 100);
        } else {
            alert(result);
        }
    });
});
$("#txtMessage").keypress(function(e) {
    if (e.which == 13)
        $("#btnSendMessage").click();
});
