setInterval(() => {
    sendChatMessage()
}, 1000);

var message = "草";
function sendChatMessage() {
    window.postMessage(message, 'https://miswhiramon.github.io//');
  }


window.addEventListener('message', function(event) {
    var message = event.data;
    var kusa = document.getElementById("kusa");
    kusa.textContent = message;
  }, false);