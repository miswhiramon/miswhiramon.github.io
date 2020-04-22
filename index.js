setInterval(() => {
    sendChatMessage()
}, 1000);

var message = "草";
function sendChatMessage() {
    window.postMessage(message, 'https://miswhiramon.github.io/');
  }

var kusa_counter = 0;
window.addEventListener('message', function(event) {
    var message = event.data;
    var kusa = document.getElementById("kusa");
    if(message=="草"){
        kusa_counter+=1;
    }
    kusa.textContent = kusa_counter;
  }, false);


const para = document.querySelector('p');

para.addEventListener('click', updateName);

function updateName() {
    let name = prompt('追加したい草の本数を入力');
    para.textContent = name +"本";
}