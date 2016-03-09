/**
 * Created by Min.
 */
'use strict';

//key: AIzaSyAMZ0kGrjVyCs4fpNXW01kKAY2XfRXHRIM

document.addEventListener('DOMContentLoaded', init);

function init() {
  getLocation();
}

function getLocation() {

  if (navigator.geolocation) {              // geolocation support check
    let options = {
      enableHighAccuracy: true,
      timeout: 6000,
      maximumAge: 60000
    };
    navigator.geolocation.getCurrentPosition(reportPosition, gpsError, options);

  } else {              // geolocation not supported. Notice given to the user
    document.write('<p>Geolocation is not supported</p>');
  }
}

function reportPosition(position) {                 // fetching the current location

  let pos = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    width: 400,
    height: 400,
    key: 'AIzaSyAMZ0kGrjVyCs4fpNXW01kKAY2XfRXHRIM'
  };

  console.dir(position);
  let lat = pos.latitude;
  let long = pos.longitude;
  let urlString = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
    lat + ',' + long +
    '&zoom=14&size=' + pos.width + 'x' + pos.height +
    '&maptype=roadmap&markers=color:red%7C' +
    lat + ',' + long +
    '&key=' + pos.key;
    // dimensions and zoom; 400*400 and level 14

  displayGeolocation(urlString, lat, long, 400, 400);

}

function displayGeolocation(urlString, latitude, longitude, w, h) {                 // static map of the location and marker
  let geolocation = document.querySelector('#geolocation');
  geolocation.innerHTML = '<p>Latitude is ' + latitude +
    '°<br>Longitude is ' + longitude + '</p>';

  let canvas = document.createElement('canvas');                 // dynamically creating canvas tag
  canvas.width = w;
  canvas.height = h;
  geolocation.appendChild(canvas);         // appended to the page

  let img = new Image();
  img.onload = function() {
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
  };            // image is drawn onto the canvas after it's loaded
  img.src = urlString;
}

function gpsError(error) {
  alert("Error: " + error.code);
  console.log(error);

}
