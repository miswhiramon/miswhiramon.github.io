/*
setInterval(() => {
    sendChatMessage()
}, 1000);
*/
//var message = "草";
var userInfo = { username:"田村", message:"草"};
function sendChatMessage() {
    window.postMessage(userInfo, 'https://miswhiramon.github.io/');
  }

var kusa_counter = 0;

window.addEventListener('message', function(event) {
    var username = event.data.username;
    var message = event.data.message;
    var kusa = document.getElementById("kusa");
    var kusa_user = document.getElementById("kusa_username");
    var kusa_user_list = document.getElementById("kusa_list");
    var user = document.createElement("li");
    user.innerHTML = "<h3><font color = 'blue'>"+username+"</font></h3>";
    if(message=="草"){
        kusa_counter+=1;
        kusa_user.textContent = "草発言者:" + username;

        kusa_user_list.appendChild(user);

    }
    kusa.textContent = kusa_counter;
    
  }, false);

//全部のタグを取りたいときはSelectorAllを使う
//<div>でid設定可能
//querySelector('#message');とgetElementByID("message");は同じ
const para = document.querySelector('p');

para.addEventListener('click', updateName);

function updateName() {
    let name = prompt('追加したい草の本数を入力');
    var kusa = document.getElementById("kusa");
    kusa_counter += parseInt(name)
    kusa.textContent += kusa_counter
    //para.textContent = name +"本";
}