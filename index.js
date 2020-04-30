/*
setInterval(() => {
    sendChatMessage()
}, 1000);

//var message = "草";
var userInfo = { username:"田村", message:"草"};
function sendChatMessage() {
    window.postMessage(userInfo, 'https://miswhiramon.github.io/');
}*/

//var kusa_counter = 0;
//var all_comment_counter = 0;
var all_choice_counter = 0;

var keyword_counter = 0;
var checkword = "";
var counter_enable = false;

//最初に一回だけ実行したいもの
function init(){
    //グラフの描画
    org_choice_label=["A","B","C","D","E","F","G","H","I","J"];
    org_counter_array=[20,20,20,20,20,20,20,20,20,20];
    choice_label=org_choice_label.slice(0,4);
    counter_array=org_counter_array.slice(0,4);
    all_choice_counter=1;
    make_sample=true;
    drawBarChart();

    time_value.innerHTML = "<h3><font color = blue> 60</font></h3>";


    addForm(0);
    addForm(1);
    addForm(2);
    addForm(3);

}

init();

/*function addForm(i) {
  var input_data = document.createElement('input');
  input_data.type = 'text';
  input_data.id = 'inputform_' + i;
  input_data.placeholder = 'フォーム-' + i;
  var parent = document.getElementById('form_area');
  parent.appendChild(input_data);
  i++;
}*/

function addForm(i) {
    var parent = document.getElementById('form_area');
    parent.insertAdjacentHTML('beforeend',`
    <div>
        <div class="row">
            <div class="col-1 d-flex align-items-center">` + org_choice_label[i] + `</div>
            <div class="col-4 d-flex align-items-center">
                <input type="text" placeholder="選択肢`+Hankaku2zenkaku(String(i))+`を入力" id=`+i+`>
            </div>
            <div class="col-1 d-flex align-items-center">
                <div class="batsu d-flex align-items-center" >×</div>
            </button>
        </div>
        
    </div>
    `);
    i++;
}

function Hankaku2zenkaku(str) {
    return str.replace(/[A-Za-z0-9]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
    });
}



window.addEventListener('message', function(event) {
    //eventにはYoutubeのページ情報が入っている。なのでevent.originとすればurlも取得できる
    //コメントのユーザー名
    var username = event.data.username;
    //コメント
    var message = event.data.message;
    /*
    var kusa = document.getElementById("kusa");
    var kusa_user = document.getElementById("kusa_username");
    var kusa_user_list = document.getElementById("kusa_list");
    var user = document.createElement("li");
    user.innerHTML = "<h3><font color = 'blue'>"+username+"</font></h3>";
    */

    var keyword_count = document.getElementById("keyword_count");

    all_comment_counter += 1;

    /*if(message=="草" && counter_enable){
        kusa_counter+=1;
        kusa_user.textContent = "草発言者:" + username;
        kusa_user_list.appendChild(user);
    }
    if(message==checkword && counter_enable){
        keyword_counter+=1;
    }*/

    //messageが選択肢のうちどれなのかを判定
    for(var i=0;i<num_choice;i++){
        var temp = message.toUpperCase();
        if(temp==org_choice_label[i] && counter_enable){
            all_choice_counter+=1;
            counter_array[i]+=1;
        }
    }
    
    if(counter_enable){
        /*kusa.innerHTML =  "草:" + kusa_counter + "<br>" + "総コメント数" + all_comment_counter 
        + "<br>" + "草割合:" + kusa_counter/all_comment_counter*100 + "%<br>";

        keyword_count.innerHTML = checkword + ":" + keyword_counter + "<br>" 
        + checkword + "割合" + keyword_counter/all_comment_counter*100 + "%<br>";*/
        drawPieChart();
        drawBarChart();
    }    
  }, false);


function start_vote(){
    //各変数初期化
    kusa_counter = 0;
    all_comment_counter = 0;
    all_choice_counter = 0;
    keyword_counter = 0;
    org_choice_label=["A","B","C","D","E","F","G","H","I","J"];
    org_counter_array=[0,0,0,0,0,0,0,0,0,0];
    choice_label=org_choice_label.slice(0,num_choice);
    counter_array=org_counter_array.slice(0,num_choice);
    make_sample=false;

    var timer_value = document.getElementById("timer_value");
    //投票時間
    var time = vote_time;
    timer_value.textContent = "投票終了まであと:"+time+"[sec]";
    var log = function(){
        timer_value.textContent= "投票終了まであと:"+time+"[sec]";
        time -= 1;
        counter_enable = true;
        if(time<0){
            clearInterval(timer);
            counter_enable = false;
            
        }
    };
    // 1秒ごとに"test"と表示されるタイマー
    var timer = setInterval(log, 1000);
}


function back_color(){
    var body=document.body;
    if(body.style.backgroundColor ==''){        
        body.style.backgroundColor ='rgb(0,200,0)';
    }else{
        body.style.backgroundColor = '';
    }    
}



//全部のタグを取りたいときはSelectorAllを使う
//<div>でid設定可能
//querySelector('#message');とgetElementByID("message");は同じ
/*const para = document.querySelector('p');

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
}*/


var org_choice_label=["A","B","C","D","E","F","G","H","I","J"];
var org_counter_array
var choice_label=org_choice_label.slice(0,num_choice);
var counter_array

//投票の選択肢,2~10択
//何択投票にするか
var num_choice = 4;
var button_value = document.getElementById("button_value");
var make_sample
button_value.innerHTML = "<h3><font color = blue> " + num_choice + "</font></h3>";
function plus_or_minus(flag){
    if(flag==1 && num_choice<10){
        num_choice += 1;
        
        org_choice_label=["A","B","C","D","E","F","G","H","I","J"];
        org_counter_array=[20,20,20,20,20,20,20,20,20,20];
        choice_label=org_choice_label.slice(0,num_choice);
        counter_array=org_counter_array.slice(0,num_choice);
        all_choice_counter=1;
        make_sample=true;
        drawBarChart();
    }else if(flag==-1 && num_choice>2){
        num_choice -= 1;
        
        org_choice_label=["A","B","C","D","E","F","G","H","I","J"];
        org_counter_array=[20,20,20,20,20,20,20,20,20,20];
        choice_label=org_choice_label.slice(0,num_choice);
        counter_array=org_counter_array.slice(0,num_choice);
        all_choice_counter=1;
        make_sample=true;
        drawBarChart();
    }
    //button_value.textContent = "選択肢の数:"+num_choice;
    button_value.innerHTML = "<h3><font color = blue> " + num_choice + "</font></h3>";
}

var vote_time=60;
function time_manage(flag){
    if(flag==1 && vote_time<990){
        vote_time+=10;
    }else if(flag==-1 && vote_time>20){
        vote_time-=10;
    }
    time_value.innerHTML = "<h3><font color = blue> " + vote_time + "</font></h3>";

}


document.getElementById("second_stage").style.display="none";
//ページ遷移用の関数
function first2second(){
    document.getElementById("first_stage").style.display="none";
    document.getElementById("second_stage").style.display="block";
}

function second2first(){
    document.getElementById("second_stage").style.display="none";
    document.getElementById("first_stage").style.display="block";
}