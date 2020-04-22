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
var all_comment_conter = 0;

var keyword_counter = 0;
var checkword = "";

window.addEventListener('message', function(event) {
    var username = event.data.username;
    var message = event.data.message;
    var kusa = document.getElementById("kusa");
    var kusa_user = document.getElementById("kusa_username");
    var kusa_user_list = document.getElementById("kusa_list");
    var user = document.createElement("li");
    user.innerHTML = "<h3><font color = 'blue'>"+username+"</font></h3>";

    var keyword_count = document.getElementById("keyword_count");

    all_comment_conter += 1;

    if(message=="草"){
        kusa_counter+=1;
        kusa_user.textContent = "草発言者:" + username;
        kusa_user_list.appendChild(user);
    }
    if(message==checkword){
        keyword_counter+=1;
        keyword_count.innerHTML = checkword + ":" + keyword_counter + "<br>" 
        + checkword + "割合" + keyword_counter/all_comment_conter*100 + "%<br>";
    }
    kusa.innerHTML =  "草:" + kusa_counter + "<br>" + "総コメント数" + all_comment_conter 
    + "<br>" + "草割合:" + kusa_counter/all_comment_conter*100 + "%<br>";

    
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

function onButtonClick(){
    keyword_counter = 0;
    checkword = keyword_form.input_word.value;
    var keyword = document.getElementById("keyword_value");
    keyword.textContent = checkword;
}