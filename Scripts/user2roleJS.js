window.addEventListener("load", Init, false);

var obj;
var backString;

function Init() {
    getAllRole();
    var select = document.getElementsByTagName("A");
    for (var i = 0; i < select.length; i++) {
        if (select[i].innerHTML == "选择") {
            select[i].addEventListener("click", selectedUser, false);
        }
    }
    createRole();
    document.getElementById("chooseAll").addEventListener("click", chooseAll, false);
    document.getElementById("bindFrm").addEventListener("submit", recordRole, false);
}

function recordRole() {
    var hidden = document.getElementById("updateRoles");
    var area1 = document.getElementById("roles1").getElementsByTagName("INPUT");
    var area2 = document.getElementById("roles2").getElementsByTagName("INPUT");
    var selected = "";
    for (var i = 0; i < area1.length; i++) {
        if (area1[i].checked == true) {
            selected += area1[i].title + " ";
        }
    }
    for (var i = 0; i < area2.length; i++) {
        if (area2[i].checked == true) {
            selected += area2[i].title + " ";
        }
    }
    hidden.value = selected;
}

function selectedUser(evt) {
    var Number = this.parentNode.childNodes[3].value;
    document.getElementById("userNumber").value = Number;
    document.getElementById("getNumber").innerHTML = Number;
    document.getElementById("pageIndex").value = this.parentNode.childNodes[5].value;
    var bindArea = document.getElementById("changeBind");
    var style = (bindArea.currentStyle != undefined) ? bindArea.currentStyle.display : window.getComputedStyle(bindArea, null).display;
    if(style == "none"){
        bindArea.style.display = "block";
    }
    chooseRole(Number);
}

function chooseRole(Number) {
    GetchooseRoles(Number);
    var area1 = document.getElementById("roles1").getElementsByTagName("INPUT");
    var area2 = document.getElementById("roles2").getElementsByTagName("INPUT");
    for (var i = 0; i < area1.length; i++) {
        if (backString.indexOf(area1[i].title) > -1) {
            area1[i].checked = true;
        } else {
            area1[i].checked = false;
        }
    }
    for (var i = 0; i < area2.length; i++) {
        if (backString.indexOf(area2[i].title) > -1) {
            area2[i].checked = true;
        } else {
            area2[i].checked = false;
        }
    }
}

function chooseAll() {
    var area1 = document.getElementById("roles1").getElementsByTagName("INPUT");
    var area2 = document.getElementById("roles2").getElementsByTagName("INPUT");
    for (var i = 0; i < area1.length; i++) {
            area1[i].checked = true;
    }
    for (var i = 0; i < area2.length; i++) {
        area2[i].checked = true;
    }   
}

function GetchooseRoles(Number) {
    var xmlHttp = new XMLHttpRequest();
    var url = "GetChooseRoles.ashx?Number=" + Number;
    xmlHttp.open("GET", url, false);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            backString = xmlHttp.responseText;
        }
    }
    xmlHttp.send();
}

function getAllRole() {
    var xmlHttp = new XMLHttpRequest();
    var url = "getAllRole.ashx";
    xmlHttp.open("GET", url, false);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            var json = xmlHttp.responseText;
            obj = eval("(" + json + ")");
        }
    }
    xmlHttp.send();
}

function createRole() {
    var addArea1 = document.getElementById("roles1");
    var addArea2 = document.getElementById("roles2");
    if (obj.role != undefined) {
        if (obj.role.Name == "false") {
            return;
        } else {
            var roles = obj.role;
            for (var i = 0; i < roles.length; i++) {
                if (i % 2 == 0) {
                    createCheckBox(roles[i], addArea1);
                } else {
                    createCheckBox(roles[i], addArea2);
                }
            }
        }
    }
}

function createCheckBox(role, area) {
    var text = document.createTextNode(role.Description);
    var span = document.createElement("SPAN");
    span.appendChild(text);
    var input = document.createElement("INPUT");
    input.type = "checkbox";
    input.name = "role";
    input.title = role.Name;//我也想用value可是IE不给我用-，-
    label = document.createElement("LABEL");
    label.appendChild(input);
    label.appendChild(span);
    var li = document.createElement("LI");
    li.appendChild(label);
    area.appendChild(li);
}