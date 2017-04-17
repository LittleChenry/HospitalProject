/* ***********************************************************
 * FileName: chooseAllJS.js
 * Writer: peach
 * create Date: 2017-4-10
 * ReWriter:
 * Rewrite Date:
 * impact :
 * 生成消息具体内容
 * **********************************************************/
window.addEventListener("load", Init, false);
var obj;
var contentArea;
function Init() {
    contentArea = document.getElementById("container_content");
    GetNews();
    CreateNews();
}

function GetNews() {
    var xmlHttp = new XMLHttpRequest();
    var which = window.location.href.split("?")[1];
    var url = "Notice.ashx?" + which;
    xmlHttp.open("GET", url, false);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            var json = xmlHttp.responseText;
            obj = eval("(" + json + ")");
        }
    }
    xmlHttp.send();
}

function CreateNews() {
    if (obj != undefined) {
        var title = obj.Title;
        var content = obj.Content;
        var time = obj.Time;
        var releaser = obj.RName;
        document.getElementById("title").innerHTML = title;
        document.getElementById("describe-content").innerHTML = "发布时间: " + time + "          " + "发布者: " + releaser;
        var contents = content.split("\n");
        for (var i = 0; i < contents.length; i++) {
            CreateNode(contents[i]);
        }
    }
}

function CreateNode(content) {
    var text = document.createTextNode(content);
    var span = document.createElement("SPAN");
    var P = document.createElement("P");
    if(content.indexOf(" ") == 0){
        P.style.textIndent = "2em";
    }
    P.style.fontSize = "larger";
    span.appendChild(text);
    P.appendChild(span);
    contentArea.appendChild(P);
}