function drawPieChart(){
    
    var data = [kusa_counter, keyword_counter, all_comment_counter];    
    var labels = ["草", checkword ,"All comments"];

    var color = ["red", "yellow", "blue",""];
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
        animation: false
        }
    });
}

var myBarChart;

function drawBarChart(){
    var ctx = document.getElementById("myBarChart");

    
    /*var data = [kusa_counter, keyword_counter, all_comment_counter];
    var proportion = data.map(function(num){
        return 100*(num/all_comment_counter);
    })
    var labels = ["草", checkword ,"All comments"];
    */
    var data = counter_array;
    var proportion = data.map(function(num){
        return 100*(num/all_choice_counter);
    })
    /*if(make_sample){
        proportion=counter_array;
    }*/
    var labels = choice_label;

    
    if (myBarChart) {
        myBarChart.destroy();
    }
    myBarChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
        labels: labels,
        //labelsData: ["100","200","300"],
        datasets: [
            {
                label: 'コメント割合',
                data: proportion,
                backgroundColor: "rgba(219,39,91,0.5)"
            }
        ]
        },
        options: {
            /*title: {
                display: true,
                text: 'コメント数'
            },*/
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 100,                  
                        stepSize: 20
                    }
                    }],
                yAxes: [{
                ticks: {
                    callback: function(value, index, values){
                    return  value
                    }
                }
                }]
            },
            tooltips:{
                enabled: false, //ここにfalseを指定
            },
            animation: {
                duration: 0,
                onComplete: function () {
                    //canvasを取得
                    var ctx = this.chart.ctx;
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    this.data.datasets.forEach(function (dataset) {
                        for (var i = 0; i < dataset.data.length; i++) {
                            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                            console.log(dataset.data[i] + ":" + model.x + ":" + model.y);
                            ctx.fillText(dataset.data[i].toFixed(1)+"%", model.x*1.05+15, model.y*1.05);
                        }
                    });
                }
            }
        }
    });    
}