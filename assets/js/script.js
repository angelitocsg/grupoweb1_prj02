function load_chat() {
  var divdest = $('#myContainer');
  $.get("chat.html", function(result) {
      divdest.html(result);
      get_users();
      get_messages();
      setInterval(get_messages, 3000);
      setInterval(get_users, 5000);
  });
}

function get_users() {
  var divdest = $('#online_users');
  $.get(prefix + "./users", function(result) {
      users_json = JSON.parse(result);
      var users = '';
      for (var k in users_json) {
          users += '<li class="list-group-item">' + users_json[k] + '</li>';
      }
      users = '<ul class="list-group">' + users +'</ul>';
      divdest.html(users);
      console.log('Carregando usuários conectados...');
  });
}

function get_messages(field) {
  var divdest = $('#msg-container');
  $.get(prefix + "./messages?nickname=" + chat_user, function(result) {
      messages_json = JSON.parse(result);
      countx = messages_json.length;
      if (countx != count) { count = countx; setTimeout(scrolldown, 100); }
      var messages = '<p></p>';
      for (var k in messages_json) {
        item = messages_json[k];
        if (item.user == chat_user) {
          messages += '<p class="msg msg-right">';
          messages += '    <span class="msg-data">[' + item.datetime + '] Você diz:</span><br>';
          messages += '    <span class="msg-text">' + item.textmsg + '</span>';
          messages += '</p>';
        } else {
          messages += '<p class="msg msg-left">';
          messages += '    <span class="msg-data">[' + item.datetime + '] ' + item.user + ' diz:</span><br>';
          messages += '    <span class="msg-text">' + item.textmsg + '</span>';
          messages += '</p>';
        }
      }
      divdest.html(messages);
      console.log('Carregando mensagens...');
  });
}

function scrolldown() {
    var comp = document.getElementById("scroll-down");
    comp.scrollTo(0,comp.scrollHeight);
}
