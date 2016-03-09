
var scriptsLoaded = 0;
var grocery_kim00341 = "grocery_kim00341";
var itemArr = [];
var i = 0;

document.addEventListener("DOMContentLoaded", init);

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

function save() {

    if (itemArr === []) {
        localStorage.clear();
    } else {
        localStorage.setItem(grocery_kim00341, JSON.stringify(itemArr));
    }
}

function appStarter() {

    $('#clear').click(function () {
        i = 0;
        localStorage.clear();
        itemArr = [];
        $('tr').remove();
        $('#typeItem').css('display', 'none');
    });

    //"delete" Button clicked
    $('#delete').click(function () {
        //collect unchecked items from itemArr
        var uncheckedItem = itemArr.filter(function (obj) {
            return obj.checked === '';
        });

        var checkedItem = [];
        checkedItem = itemArr.filter(function (obj) {
            return obj.checked === 'checked';
        });

        itemArr = uncheckedItem;
        save();

        $("tr").each(function () {
            $('input[type="checkbox"]').each(function () {
                if ($(this).prop("checked") === true) {
                    $(this).closest('tr').remove();
                    i--;
                }
            });
        });

    });

    var checker = localStorage.getItem(grocery_kim00341);
    if (checker || checker === "") {
        keyExist();
    } else {
        keyNotExist();
    }
}

function keyExist() {

    itemArr = JSON.parse(localStorage.getItem(grocery_kim00341));
    i = itemArr.length;
    $('#typeItem').css('display', 'block');

    localStorageDisplay();
    addItem();
}

function localStorageDisplay() {
    var x = "";
    for (var j = 0; j < itemArr.length; j++) {
        x =
            '<tr id="row' + j + '">' +
            '<td><input type="checkbox" class="checkbox" id="check' + j + '"' + itemArr[j].checked + '><label>' +
            itemArr[j].description + '</label></td>' +
            '</tr>';
        $('#unchecked-item').append(x);
    }
    checkBox();
}


function keyNotExist() {
    addItem();
    localStorage.setItem(grocery_kim00341, JSON.stringify(itemArr));
}

function addItem() {

    $('#addItem').click(function () {
        $('#typeItem').css('display', 'block');

        var typeItemText = $('#typeItem').val();
        if (typeItemText !== '') {
            item = {};
            item.id = i;
            item.checked = '';
            item.description = typeItemText;
            itemArr.push(item);

            $('#unchecked-item').append(
                '<tr id="row' + i + '">' +
                '<td><input type="checkbox" id="check' + i + '"><label>' + itemArr[i].description + '</label></td>' +
                '</tr>'
            );

            i++;
            $('#typeItem').val('');
        }
        checkBox();
        save();
    });
}

function checkBox() {

    $('input[type="checkbox"]').off('change').on('change', function () {
        var $this = $(this)[0].id.split("check")[1];
        console.log($this);
        if (itemArr[$this].checked === '') {
            itemArr[$this].checked = 'checked';
        } else {
            itemArr[$this].checked = '';
        }
        save();
    });
}