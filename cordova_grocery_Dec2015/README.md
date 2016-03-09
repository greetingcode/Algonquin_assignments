# Cordova Grocery app

## Description

This is a grocery application that was made as an assignmet at **Algonquin College**. 
The application is design to help users to record things to buy so that users do not forget what to buy at the grocery store.

## Instruction

To place it onto your android phone to test it, you have to use the **_Cordova_** platform. 
You **must** have cordova installed on your computer.

1. create a project with cordova
      
      ```bash
      
      cordova create 'name of the project'
      ```
2. add android platform with cordova
      ```bash
      
      cordova platform add android
      ```

3. fork this github repository and move the www folder with this folder in the cordova project directory. 
4. plug your android device onto your computer
5. in the command line, type 
      ```bash
      
      cordova run android
      ```

Now, you will see this grocery application running on your android device. 

This is how some of the code works. 

```javascript
      document.addEventListener("DOMContentLoaded", init);
```

Wait until all the DOM content is loaded and fire the _init_ function

```javascript  
  function init() {
      //load css page
      var css = document.createElement("link");
      css.setAttribute("rel", "stylesheet");
      css.setAttribute("href", "css/main.css");
      css.addEventListener("load", loadCount);
      document.querySelector("head").appendChild(css);
  
      //load jquery libray
      var jq = document.createElement("script");
      jq.addEventListener("load", loadCount);
      jq.setAttribute("src", "jquery.min.js");
      document.querySelector("head").appendChild(jq);
  
      var beautifier = document.createElement("script");
      beautifier.addEventListener("load", loadCount);
      beautifier.setAttribute("src", "beautify.js");
      document.querySelector("head").appendChild(beautifier);
      
  
  }
``` 

fire the _loadCount_ function each time one of the three elements are loaded
```javascript
  function loadCount() {
      scriptsLoaded++;
      if (scriptsLoaded === 3) {
          //both jquery and css are loaded.
          if (localStorage) {
              //localStorage supported?
              appStarter();
              save();
          } else {
              alert("Your device/browser does not support localStorage");
          }
      }
  }
```
the _loadCount_ function will check if the device supports localStorage when the three elements are all loaded.
If your device or browser that runs this code supports the localStorage, execution of lines after this function will start.


## Author

Minseok Kim, the first year student in the Mobile Development and Design Program at Algonquin College

[Visit Algonquin College](www.algonquincollege.com)
