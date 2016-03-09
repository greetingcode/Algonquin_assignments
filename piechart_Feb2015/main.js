/**
 * Created by Min on 2016-02-22.
 */

document.addEventListener('DOMContentLoaded', init);

function init() {
    callJSON('browsers.json');
}

function callJSON(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            //success
            window.chartData = JSON.parse(request.responseText);

            if(chartData) {
                sortOutData();
                drawCharts();
             }
        }
    };
    request.onerror = function() {
        console.log('error! it failed to fetch the data');
    };
    request.send();
}

function sortOutData() {
    var valArr = [];
    var j = 0;
    var total = 0;
    var segments = chartData.segments;
    while(j<segments.length) {
        total += segments[j].value;
        valArr.push(segments[j].value);
        j++;
    }
    chartData.total = total;
    chartData.values = valArr;

    for (var i=0;i<segments.length;i++) {
        segments[i].percentage = Math.round((segments[i].value / chartData.total) * 100);
    }
}

function drawCharts() {
    loadCanvas('firstChart');
    loadCanvas('secondChart');

    var check = typeof(document.querySelector('#firstChart')) && typeof(document.querySelector('#secondChart'));
    if ( check != undefined && check != null) {

        try {
            window.canvas = document.getElementById('firstChart');

            // if canvas element doesn't exist...
            if(!canvas) {
                console.log('Canvas not found.');
            } else {
                // if the getContext method doesn't exist (old browser)
                if(!canvas.getContext) {
                    console.log('Context not supported.');
                } else {
                    window.context = canvas.getContext('2d');

                    // if this particular context isn't supported
                    if(!context)
                    { console.log('Context 2D not available.'); }
                    else {
                        drawFirstChart();
                        drawSecondChart();
                    }
                }
            }
        }
        catch(err) {
            console.log(err);
        }
    }
}

function loadCanvas(tag) {
    var canvas = document.createElement('canvas');
    canvas.className = tag;
    canvas.id = tag;
    canvas.height = 400;
    canvas.width= 400;
    document.querySelector('body').appendChild(canvas);
}

function drawFirstChart() {
    var total = chartData.total;
    context.clearRect(0, 0, canvas.width, canvas.height);
    //setDefaultStyles();

    var cx = canvas.width/2; //x-coordinate
    var cy = canvas.height/2; //y-coordinate
    //setting as (0, 0) in the graph;

    var radius = 100;
    var currentAngle = 0;
    var segments = chartData.segments;

    for(var i=0; i<segments.length; i++){
        var value = segments[i].value;
        var pct = segments[i].value/total;

        //draw the arc

        var endAngle = currentAngle + (pct * (Math.PI * 2));
        context.moveTo(cx, cy);
        context.beginPath();
        context.fillStyle = segments[i].color;

        var R = 0;

        if (value === Math.max.apply(null, chartData.values)) {
            R = radius*1.2;
        } else if (value === Math.min.apply(null, chartData.values)) {
            R = radius*0.8;
        } else {
            R = radius;
        }

        context.arc(cx, cy, R, currentAngle, endAngle, false);
        context.lineTo(cx, cy);
        context.fill();
        context.strokeStyle = 'green';
        context.stroke();


        //draw the lines that will point to the values
        context.save();

        context.translate(cx, cy);//make the middle of the circle the (0,0) point
        context.strokeStyle = 'green';
        context.lineWidth = 1;
        context.beginPath();
        var midAngle = (currentAngle + endAngle)/2;//middle of two angles
        context.moveTo(0,0);//this value is to start at the middle of the circle
        var dx = Math.cos(midAngle) * (1.4 * radius);
        var dy = Math.sin(midAngle) * (1.4 * radius);
        context.moveTo(dx, dy);
        //ending points for the lines
        var dx = Math.cos(midAngle) * (radius - 35); //30px beyond radius
        var dy = Math.sin(midAngle) * (radius - 35);
        context.lineTo(dx, dy);
        context.stroke();
        //text
        var tx = Math.cos(midAngle) * (radius + 55); //30px beyond radius
        var ty = Math.sin(midAngle) * (radius + 55);
        context.font = 'bold 12px Arial';
        context.fillStyle = 'green';
        context.fillText(chartData.segments[i].label, tx-10, ty);

        context.restore();
        currentAngle = endAngle;
    }
}

function drawSecondChart() {
    var secondChart = document.getElementById('secondChart').getContext('2d');
    for (var i=0; i<chartData.segments.length;i++) {

        var zero = canvas.width * 0.8;
        var dx = zero * (chartData.segments[i].percentage)/100;
        var dy = 20;

        secondChart.fillStyle = chartData.segments[i].color;
        secondChart.strokeStyle = chartData.segments[i].color;
        secondChart.beginPath();
        secondChart.rect(35, 30 + i*50, dx, dy);
        secondChart.fill();
        secondChart.stroke();


        secondChart.font = 'bold 12px Arial';
        secondChart.fillStyle = 'green';
        secondChart.fillText(chartData.segments[i].label + '   ' + chartData.segments[i].percentage + '%', 35, 65 + i*50);


        secondChart.rect(35+dx, 30 + i*50, zero-dx, dy);
        secondChart.stroke();
    }


}