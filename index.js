/*
setInterval(() => {
    sendChatMessage()
}, 1000);

//var message = "草";
var userInfo = { username:"田村", message:"草"};
function sendChatMessage() {
    window.postMessage(userInfo, 'https://miswhiramon.github.io/');
  }*/

var kusa_counter = 0;
var all_comment_counter = 0;

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

    all_comment_counter += 1;

    if(message=="草"){
        kusa_counter+=1;
        kusa_user.textContent = "草発言者:" + username;
        kusa_user_list.appendChild(user);
    }
    if(message==checkword){
        keyword_counter+=1;
        keyword_count.innerHTML = checkword + ":" + keyword_counter + "<br>" 
        + checkword + "割合" + keyword_counter/all_comment_counter*100 + "%<br>";
    }
    kusa.innerHTML =  "草:" + kusa_counter + "<br>" + "総コメント数" + all_comment_counter 
    + "<br>" + "草割合:" + kusa_counter/all_comment_counter*100 + "%<br>";

    if(all_comment_counter%3==0){
        drawchart();
    }    
  }, false);

//timerの表示
var timer = document.getElementById("timer");
var time = 0;
timer.textContent = "Counter:"+time;
var log = function(){
    console.log("test");
    timer.textContent= "Counter:"+time;
    time += 1;
};

var timer = setInterval(log, 1000);
// 1秒ごとに"test"と表示されるタイマー



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

function drawchart(){
    
    var data = [kusa_counter, keyword_counter, all_comment_counter];
    var labels = ["草", checkword ,"All comments"];
    var color = ["red", "yellow", "blue"];
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
        labels: labels,
        datasets: [{
            backgroundColor: color,
            data: data
        }]
        },
        options: {
        title: {
            display: true,
            text: '投票 割合'
        },
        animation: {
            animateRotate: false
        }
        }
    });
}

//何択投票にするか
var num_choice = 4;
var button_value = document.getElementById("button_value");
button_value.textContent = "選択肢の数:"+num_choice;
function plus_or_minus(flag){
    if(flag==1 && num_choice<10){
        num_choice += 1;
    }else if(flag==-1 && num_choice>2){
        num_choice -= 1;
    }
    button_value.textContent = "選択肢の数:"+num_choice;
}

