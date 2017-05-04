/* ***********************************************************
 * FileName: RootInfoManageJS.js
 * Writer: xubixiao
 * create Date: 2017-4-15
 * ReWriter:xubixiao
 * Rewrite Date:2017-5-1
 * impact :
 * 消息管理前端
 * **********************************************************/


window.addEventListener("load", createManageTable, false)
var titleArea;
var obj;
var pageCurrent;
var notice;
var lastPageNumber;

function createManageTable(evt) {
    document.getElementById("refresh").addEventListener("click", Refresh, false);
    titleArea = document.getElementById("infomanagetable");
    getInformation();
    notice = obj.Notice;
    lastPageNumber = Math.ceil(notice.length / 10);
    if (notice.Title == "false") {
        return;
    }
    for (var i = 0; i < 10; i++) {
        
        createTable(notice[i]);
    }
    document.getElementById("currentPage").value = 1;
    document.getElementById("previousPage").disabled = "true";
    document.getElementById("firstPage").addEventListener('click', firstPageShow, false);
    document.getElementById("nextPage").addEventListener('click', nextPageShow, false);
    document.getElementById("previousPage").addEventListener('click', previousPageShow, false);
    document.getElementById("lastPage").addEventListener('click', lastPageShow, false);
}

function Refresh(evt) {
    evt.preventDefault();
    window.location = 'Root-InfoManage.aspx';
}

function firstPageShow(evt) {
    removeUlAllChild();
    release();
    for (var i = 0; i < 10; i++) {
        createTable(notice[i]);
    }
    document.getElementById("previousPage").disabled = "true";
    document.getElementById("currentPage").value = 1;
}
function nextPageShow(evt) {
    removeUlAllChild();
    release();
    pageCurrent = parseInt(document.getElementById("currentPage").value) + 1;
    if (pageCurrent == lastPageNumber) {
        document.getElementById("nextPage").disabled = "true";
        for (var i = 10 * pageCurrent - 10; i < notice.length; i++) {
            createTable(notice[i]);
        }
    }
    else {
        for (var i = 10 * pageCurrent - 10; i < 10 * pageCurrent; i++) {
            createTable(notice[i]);
        }

    }
    document.getElementById("currentPage").value = pageCurrent;

}
function previousPageShow(evt) {
    removeUlAllChild();
    release();
    pageCurrent = document.getElementById("currentPage").value - 1;
    if (pageCurrent == 1) {
        document.getElementById("previousPage").disabled = "true";
    }
    for (var i = 10 * pageCurrent - 10; i < 10 * pageCurrent; i++) {
        createTable(notice[i]);
    }
    document.getElementById("currentPage").value = pageCurrent;
}
function lastPageShow(evt) {
    removeUlAllChild();
    release();
    pageCurrent = lastPageNumber;
    for (var i = 10 * lastPageNumber - 10; i < notice.length; i++) {
        createTable(notice[i]);
    }
    document.getElementById("nextPage").disabled = "true";
    document.getElementById("currentPage").value = pageCurrent;
}
function release() {
    document.getElementById("nextPage").removeAttribute("disabled");
    document.getElementById("previousPage").removeAttribute("disabled");

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
function removeUlAllChild() {
    while (titleArea.hasChildNodes()) {
        var child = titleArea.firstChild;
        while (child.hasChildNodes()) {
            child.removeChild(child.firstChild);
        }
        titleArea.removeChild(titleArea.firstChild);
    }
}
function createTable(notice) {
        var type = getType();
        var title = notice.Title;
        var time = notice.Time;
        var ID = notice.ID;
        var imp = notice.Important;
        var textNode = document.createTextNode(title);


        var spanbadage = document.createElement("SPAN");
        var textNodeNew = document.createTextNode("NEW");
        spanbadage.className = "label label-danger";
        spanbadage.appendChild(textNodeNew);
        var h5 = document.createElement("H5");
        h5.appendChild(textNode);
        var linkNode = document.createElement("A");
        linkNode.href = "../Main/Notice.aspx?ID=" + ID + "&Type=" + type;
        linkNode.target = "_blank";
        linkNode.appendChild(textNode);
        var timeNode = document.createTextNode(time);
        var Span = document.createElement("SPAN");
        Span.appendChild(timeNode);
        var tdNode1 = document.createElement("TD");
        tdNode1.appendChild(linkNode);
        var Year = new String(new Date().getFullYear());
        var Day =  new String(new Date().getDay());
        var Month = new String(new Date().getMonth()+1);
        var Now = Year + "-"+Month +"-"+Day;
        if (time==Now) {
            tdNode1.appendChild(spanbadage);
        }
        var tdNode2 = document.createElement("TD");
        tdNode2.appendChild(timeNode);

    
        var tdNode3 = document.createElement("TD");
        var textNode0 = document.createTextNode("删除");
        var button0 = document.createElement("BUTTON");
        button0.className = "btn btn-primary btn-sm ";
        var linkNode0 = document.createElement("A");
        linkNode0.href = "../Root/Root-InfoManage.aspx?ID=" + ID + "&Type=0";
        linkNode0.style.cssFloat = "left";
        linkNode0.target = "_self";
        linkNode0.style = "color:white";
        linkNode0.appendChild(textNode0);
        button0.appendChild(linkNode0)
        tdNode3.appendChild(button0);
    
        var tdNode4 = document.createElement("TD");
        var textNode1 = document.createTextNode("置顶");
        var button1 = document.createElement("BUTTON");
        if (parseInt(imp) == 1) {
            button1.disabled = "true";
        }
        button1.className = "btn btn-primary btn-sm ";
        var linkNode1 = document.createElement("A");
        linkNode1.href = "../Root/Root-InfoManage.aspx?ID=" + ID + "&Type=1";
        linkNode1.style.cssFloat = "left";
        linkNode1.target = "_self";
        linkNode1.style = "color:white";
        linkNode1.appendChild(textNode1);
        button1.appendChild(linkNode1)
        var textNode2 = document.createTextNode("取消置顶");
        var button2 = document.createElement("BUTTON");
        if (parseInt(imp) == 0) {
            button2.disabled = "true";
        }
        button2.className = "btn btn-primary btn-sm ";
        button2.style.cssFloat = "right";
        var linkNode2 = document.createElement("A");
        linkNode2.href = "../Root/Root-InfoManage.aspx?ID=" + ID + "&Type=10";
        linkNode2.style.cssFloat = "right"
        linkNode2.target = "_self";
        linkNode2.style = "color:white";
        linkNode2.appendChild(textNode2);
        button2.appendChild(linkNode2)
        tdNode4.appendChild(button1);
        tdNode4.appendChild(button2);
   
        var trNode = document.createElement("TR");
        trNode.appendChild(tdNode1);
        trNode.appendChild(tdNode2);
        trNode.appendChild(tdNode3);
        trNode.appendChild(tdNode4);
        
  
        titleArea.appendChild(trNode);

}