/* ***********************************************************
 * FileName: NoticeJS
 * Writer: peach
 * create Date: 2017-4-11
 * ReWriter:
 * Rewrite Date:
 * impact :
 * 通知栏生成标题
 * **********************************************************/
window.addEventListener("load", createNotice, false)

var titleArea;
var obj;

function createNotice(evt) {
    titleArea = document.getElementById("information");
    getInformation();
    var notice = obj.Notice;
    if (notice.Title == "false") {
        return;
    }
    for (var i = 0; i < notice.length; i++) {
        createTitle(notice[i]);
    }
}

function getInformation() {
    var type = getType();
    var xmlHttp = new XMLHttpRequest();
    var url = "Notice.ashx?Type=" + type;
    xmlHttp.open("GET", url, false);
    //var obj;
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            var getString = xmlHttp.responseText;
            obj = eval("(" + getString + ")");
        }
    }
    xmlHttp.send();
    //return obj;
}

function getType() {
    var type = document.getElementById("type").value;
    return type;
}

function createTitle(notice) {
    var type = getType();
    var title = notice.Title;
    var time = notice.Time;
    var ID = notice.ID;
    var textNode = document.createTextNode(title);
    var h5 = document.createElement("H5");
    h5.appendChild(textNode);
    var timeNode = document.createTextNode(time);
    var Span = document.createElement("SPAN");
    Span.appendChild(timeNode);
    Span.style.cssFloat = "right";
    var linkNode = document.createElement("A");
    linkNode.href = "../Main/Notice.aspx?ID=" + ID + "&Type=" + type;
    linkNode.style.width = "100%"
    linkNode.target = "_blank";
    linkNode.appendChild(h5);
    var hr = document.createElement("HR");
    hr.style.marginTop = "5px";
    hr.style.marginBottom = "5px";
    var linkContentNode = document.createElement("INPUT");
    linkContentNode.type = "Hidden";
    linkContentNode.value = ID;
    var li = document.createElement("LI");
    li.appendChild(Span);
    li.appendChild(linkNode);
    li.appendChild(hr);
    li.appendChild(linkContentNode);
    titleArea.appendChild(li);
}