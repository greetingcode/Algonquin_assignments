//There are two versions of the weather widget in this js file: versionOne and versionTwo.
//Each version can be transferable by commeding out code for the other version.
//versionOne starts from line 5, and versionTwo starts from line 223.

//versionOne starts from here.

var scriptsLoaded = 0;
var forecastData = null;
var time = null;
var hours = null;
var date = null;
var month = null;
var dateAndMonth = null;
var apparentTemberature = null;
var firstIcon = null;
var iconMap= null;
var clss = null;
var firstR = null;
var secondR = null;
var timeUr = null;

document.addEventListener("DOMContentLoaded", init);
//we wait for the document to be loaded and not running function yet.

function init(){
    var css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("href", "weathericoncss/weather-icons.min.css");
    css.addEventListener("load", loadCount); //css page is loaded?
    document.querySelector("head").appendChild(css);

    var jq = document.createElement("script");
    jq.addEventListener("load", loadCount);
    jq.setAttribute("src","//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
    document.querySelector("head").appendChild(jq);
}

function loadCount() {
    scriptsLoaded++;
    if (scriptsLoaded === 2) {
        fetchWidgetData();
    }
}

function fetchWidgetData(){
    var xhr = $.ajax({
        url : "https://api.forecast.io/forecast/b4d034f04ed159fc7f33f2bb891e315b/45.348391,-75.757045?units=ca&exclude=daily,minutely,flags,alerts",
        dataType: "jsonp",
        type: "POST"}).done(fetchSucceeded).fail(fetchFailed);
}

function fetchSucceeded(xhrdata) {
    forecastData = xhrdata;
    console.log(forecastData);
    buildFrameOne();
}

function fetchFailed() {
    console.log("You failed");
}

function genElement(element, target) {
    $(element).appendTo(target);
}

function genEleCss(target, element, classname) {
    $(target).append(element).addClass(classname);
}

function buildFrameOne() {
    varContainer(); //function to put necessary values into the global variables
    $('.main').css('max-width', '800').css('min-width', '500');
    $('.weather-forecast').css('max-width', '800').css('min-width', '500');
    genElement(
        '<h1>Algonquin College</h1>' +
        '<h3>Weather Widget</h3>' +
        '<p>Current Conditions for today, ' + dateAndMonth +"</p>" +
        '<i id="firstIcon"></i>' +
        '<p>Temperature '+ apparentTemberature + ' C</p>' +
        '<p>'+ forecastData.currently.summary + '</p>',
        '.weather-forecast');
    $('#firstIcon').addClass(iconMap[forecastData.currently.icon]).css('font-size','5em');
    genEleCss(clss, '<table>');
    genEleCss('table', '<tbody>', 'firstT'); //creating table frames

    $('table').append(firstR);
    $('table').append(secondR);
    $('.secondR').append(
        '<td class="timeSet">' +
        '</td>' +
        '<td class="icons">' +
        '</td>' +
        '<td>' +
        '<table class="secondT">' +
        '</table>' +
        '</td>'
    );
    $('.timeSet').append(timeUr);

    buildFrameTwo();
}

//data storage
function varContainer() {
    time = new Date($.now()); //top
    hours = time.getHours(); //top
    date = time.getDate(); //top
    month = time.getMonth() + 1; //top
    dateAndMonth = date + "/" + month;
    apparentTemberature = forecastData.currently.temperature;
    firstIcon = forecastData.currently.icon;
    iconMap = {
        "clear-day": "wi wi-day-sunny",
        "partly-cloudy-day": "wi wi-day-cloudy",
        "clear-night": "wi wi-night-clear",
        "partly-cloudy-night": "wi wi-night-alt-cloudy",
        "windrain": "wi wi-rain-wind",
        "fog": "wi wi-fog",
        "snow": "wi wi-snow",
        "sleet": "wi wi-snowflake-cold",
        "hail": "wi wi-hail",
        "thunderstorm": "wi wi-storm-showers",
        "tornado": "wi wi-tornado",
        "drizzle": "wi wi-showers"
    };

    clss = '.weather-forecast'; //top
    firstR = $('<tr>').addClass('firstR');
    secondR = $('<tr>').addClass('secondR');
    timeUr = $('<ul>').addClass('time');
}

function buildFrameTwo() {
    var tableIcon = forecastData.currently.icon;
    var iconCon = $('<i>').addClass(iconMap[tableIcon]); //for the first(current) widget
    $('.icons').append(iconCon);
    $('.dataset').append('<table class="secondT">');
    $('.secondT').append(
        '<tr>' +
            '<td>Humidity</td>' + '<td id="humidity"></td>' +
        '</tr>' +
        '<tr>' +
            '<td>Wind Speed</td>' + '<td id="windspeed"></td>' +
        '</tr>' +
        '<tr>' +
            '<td>Temperature</td>' + '<td id="temperature"></td>' +
        '</tr>' +
        '<tr>' +
            '<td>Cloud Cover</td>' + '<td id="cloudcover"></td>' +
        '</tr>' +
        '<tr>' +
            '<td>Summary</td>' + '<td id="summary"></td>' +
        '</tr>'
    ); //creating another table frames for forecast data

    for (var i = hours; i < 24; i++) {
        genElement('<li></li>', '.time');
        if (hours == 23) {
            break;
        }
    } //creating lists that countain time texts. The number of list element depends on the current time.
    // console.log(hours);

    var tableTime = hours;
    $('li').each(function () {
        $(this).append(tableTime++ + ':00').css('list-style', 'none');
    }); //display time

    putFirstData(); //display forecast data for the current hour}
}

function putFirstData() {
    $('.firstR').append('<td>' + '&nbsp' + hours + ':00' + '</td><td colspan="2">' + '&nbsp&nbsp&nbsp' + dateAndMonth + '&nbsp&nbsp&nbsp&nbsp' + ' Current Weather</td>');
    $('#humidity').append(Math.round((forecastData.currently.humidity*100)) + '%');
    $('#cloudcover').append(Math.round((forecastData.currently.cloudCover*100)) + '%');
    $('#temperature').append(forecastData.currently.temperature + ' C');
    $('#windspeed').append(forecastData.currently.windSpeed + ' km/h');
    $('#summary').append(forecastData.currently.summary);

    bgdImage(hours);
    clickTimeList();
}

function bgdImage(variable) {
    $('table.firstT').removeAttr('id');

    if(variable<18) {
        $('table.firstT').attr('id', 'dayImage');
        $('table').css('color', 'gold');

    } else{
        $('table.firstT').attr('id', 'nightImage');
        $('table').css('color', 'white');
    }
}

function clickTimeList() {
    $('li').on("click", function (el) {
        $('li').removeClass('clicked');
        $(this).addClass('clicked');
        var timeNumber = $(el.currentTarget).text();
        var bgdCounter = timeNumber.split(":")[0];
        var realTime = (timeNumber.split(":")[0]) - hours;
        console.log(realTime);
        bgdImage(bgdCounter);
        putSecondData(realTime, timeNumber);
    });
}

function putSecondData(input1, input2) {
    var flexibleIcon = forecastData.hourly.data[input1].icon;
    var newIcon = $('<i>').addClass(iconMap[flexibleIcon]);
    $('.icons').html(newIcon);
    $('.firstR').html('<td>' + '&nbsp' + input2 + '</td><td colspan="2">' + '&nbsp&nbsp&nbsp' + dateAndMonth + '&nbsp&nbsp&nbsp' + ' Weather Prediction</td>');
    $('#humidity').text(Math.round((forecastData.hourly.data[input1].humidity*100)) + '%');
    $('#cloudcover').text(Math.round((forecastData.hourly.data[input1].cloudCover*100)) + '%');
    $('#temperature').text(forecastData.hourly.data[input1].temperature + ' C');
    $('#windspeed').text(forecastData.hourly.data[input1].windSpeed + ' km/h');
    $('#summary').text(forecastData.hourly.data[input1].summary);
}
//
//
//versionTwo starts from here.
//
//var scriptsLoaded = 0;
//var forecastData = null;
//var time = null;
//var hours = null;
//var date = null;
//var month = null;
//var dateAndMonth = null;
//var apparentTemberature = null;
//var firstIcon = null;
//var iconMap= null;
//var clss = null;
//
//document.addEventListener("DOMContentLoaded", init);
////we wait for the document to be loaded and not running function yet.
//
//function init(){
//    var css = document.createElement("link");
//    css.setAttribute("rel", "stylesheet");
//    css.setAttribute("href", "weathericoncss/weather-icons.min2.css");
//    css.addEventListener("load", loadCount); //css page is loaded?
//    document.querySelector("head").appendChild(css);
//
//    var jq = document.createElement("script");
//    jq.addEventListener("load", loadCount);
//    jq.setAttribute("src","//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
//    document.querySelector("head").appendChild(jq);
//}
//
//function loadCount(){
//    scriptsLoaded++;
//    if(scriptsLoaded === 2){
//        fetchWidgetData();
//    }
//}
//
//
//function fetchWidgetData() {
//    var xhr = $.ajax({
//        url : "https://api.forecast.io/forecast/b4d034f04ed159fc7f33f2bb891e315b/45.348391,-75.757045?units=ca&exclude=daily,minutely,flags,alerts",
//        dataType: "jsonp",
//        type: "POST"}).done(fetchSucceeded).fail(fetchFailed);
//}
//
//function fetchSucceeded(xhrdata) {
//    forecastData = xhrdata;
//    console.log(forecastData);
//    buildFrameOne();
//}
//
//function fetchFailed() {
//    console.log("You failed");
//}
//
//function genElement(element, target) {
//    $(element).appendTo(target);
//}
//
//function genEleCss(target, element, classname) {
//    $(target).append(element).addClass(classname);
//}
//
//function valueStorage() {
//    time = new Date($.now());
//    hours = time.getHours();
//    date = time.getDate();
//    month = time.getMonth() + 1;
//    dateAndMonth = date + "/" + month;
//    apparentTemberature = forecastData.currently.apparentTemperature;
//    firstIcon = forecastData.currently.icon;
//    iconMap= {
//        "clear-day": "wi wi-day-sunny",
//        "partly-cloudy-day": "wi wi-day-cloudy",
//        "clear-night": "wi wi-night-clear",
//        "partly-cloudy-night": "wi wi-night-alt-cloudy",
//        "windrain": "wi wi-rain-wind",
//        "fog": "wi wi-fog",
//        "snow": "wi wi-snow",
//        "sleet": "wi wi-snowflake-cold",
//        "hail": "wi wi-hail",
//        "thunderstorm": "wi wi-storm-showers",
//        "tornado": "wi wi-tornado"
//    };
//    clss = '.weather-forecast';
//}
//
//function buildFrameOne() {
//    valueStorage();
//
//    genElement(
//        '<h1>Algonquin College</h1>' +
//        '<h3>Weather Widget</h3>' +
//        '<p>Current Conditions for today, ' + dateAndMonth +"</p>" +
//        '<i id="firstIcon"></i>' +
//        '<p>Temperature '+ apparentTemberature + ' C</p>' +
//        '<p>'+ forecastData.currently.summary + '</p>' +
//        '<table><tr></tr></table>',
//        '.weather-forecast');
//
//    $('table').addClass('firstT');
//
//    $('#firstIcon').addClass(iconMap[forecastData.currently.icon]).css('font-size','5em');
////    $('table').css('max-width', '800').css('min-width', '500').css('border', '1px solid black');
//    $('tr').append('<td>Time</td><td>Humidity</td><td>Cloud Cover</td><td>Temperature</td><td>Wind Speed</td><td>Icon</td><td>Summary</td>');
//
//    for(var i=hours; i<24; i++) {
//        genElement('<tr class="dataset"></tr>', 'table');
//        if(hours == 23) {
//            break;
//        }
//    }
//
//    var counter = 0;
//    var tableTime = hours;
//    $('.dataset').each(function() {
//        $(this).append('<td>' + tableTime++ + ':00</td>');
//        $(this).append('<td>' + Math.round((forecastData.hourly.data[counter].humidity*100)) + '%</td>');
//        $(this).append('<td>' + Math.round((forecastData.hourly.data[counter].cloudCover*100)) + '%</td>');
//        $(this).append('<td>' + forecastData.hourly.data[counter].temperature + ' C</td>');
//        $(this).append('<td>' + forecastData.hourly.data[counter].windSpeed + ' km/h</td>');
//        var tableIcon = forecastData.hourly.data[counter].icon;
//        var iconCon = $('<i>').addClass(iconMap[tableIcon]);
//        $(this).append(iconCon);
//        $(this).append('<td>' + forecastData.hourly.data[counter].summary + '</td>');
//        counter++;
//    });
//
//    $('table').css('text-align', 'left');
//    $('td').css('margin', 'auto').css('padding', '0 30px 0 5px');
//}