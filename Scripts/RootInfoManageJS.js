window.addEventListener("load", createManageTable, false)
var titleArea;
var obj;
var pageCurrent;
var notice;
var lastPageNumber;

function createManageTable(evt) {
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
        for (var i = 10 * pageCurrent - 10; i < notice.length - 1; i++) {
            createTable(notice[i]);
        }
    }
    else {
        for (var i = 10 * pageCurrent - 10; i < 10 * pageCurrent - 1; i++) {
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
    for (var i = 10 * pageCurrent - 10; i < 10 * pageCurrent - 1; i++) {
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
        var hot = notice.Hot;
        var New = notice.New;
        var textNode = document.createTextNode(title);


        var spanbadage = document.createElement("SPAN");
        var textNodeNew = document.createTextNode("NEW");
        spanbadage.className = "label label-danger";
        spanbadage.appendChild(textNodeNew);


        var spanbadage2 = document.createElement("SPAN");
        var textNodeNew2 = document.createTextNode("HOT");
        spanbadage2.className = "label label-warning";
        spanbadage2.appendChild(textNodeNew2);


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
        if (parseInt(New)== 1) {
            tdNode1.appendChild(spanbadage);
        }
        if (parseInt(hot)== 1) {
            tdNode1.appendChild(spanbadage2);
        }
        var tdNode2 = document.createElement("TD");
        tdNode2.appendChild(timeNode);

    
        var tdNode3 = document.createElement("TD");
        var textNode1 = document.createTextNode("删除");
        var h = document.createElement("H5");
        h.appendChild(textNode1);
        var linkNode1 = document.createElement("A");
        linkNode1.href = "../Root/Root-InfoManage.aspx?ID=" + ID + "&Type=0";
        linkNode1.style.width = "100%"
        linkNode1.target = "_self";
        linkNode1.appendChild(h);
        tdNode3.appendChild(linkNode1);
    
        var tdNode4 = document.createElement("TD");
        var textNode1 = document.createTextNode("置顶");
        var h = document.createElement("H5");
        h.appendChild(textNode1);
        var linkNode1 = document.createElement("A");
        linkNode1.href = "../Root/Root-InfoManage.aspx?ID=" + ID + "&Type=1";
        linkNode1.style.cssFloat = "left";
        linkNode1.target = "_self";
        linkNode1.appendChild(h);
        var textNode2 = document.createTextNode("取消置顶");
        var h1 = document.createElement("H5");
        h1.appendChild(textNode2);
        var linkNode2 = document.createElement("A");
        linkNode2.href = "../Root/Root-InfoManage.aspx?ID=" + ID + "&Type=10";
        linkNode2.style.cssFloat = "right"
        linkNode2.target = "_self";
        linkNode2.appendChild(h1);
        tdNode4.appendChild(linkNode1);
        tdNode4.appendChild(linkNode2);
 

        var tdNode5 = document.createElement("TD");
        var textNode1 = document.createTextNode("置新");
        var h = document.createElement("H5");
        h.appendChild(textNode1);
        var linkNode1 = document.createElement("A");
        linkNode1.href = "../Root/Root-InfoManage.aspx?ID=" + ID + "&Type=2" ;
        linkNode1.style.cssFloat= "left"
        linkNode1.target = "_self";
        linkNode1.appendChild(h);
        var textNode2 = document.createTextNode("取消置新");
        var h1 = document.createElement("H5");
        h1.appendChild(textNode2);
        var linkNode2 = document.createElement("A");
        linkNode2.href = "../Root/Root-InfoManage.aspx?ID=" + ID + "&Type=20";
        linkNode2.style.cssFloat = "right"
        linkNode2.target = "_self";
        linkNode2.appendChild(h1);
        tdNode5.appendChild(linkNode1);
        tdNode5.appendChild(linkNode2);
  


        var tdNode6 = document.createElement("TD");
        var textNode1 = document.createTextNode("置热");
        var h = document.createElement("H5");
        h.appendChild(textNode1);
        var linkNode1 = document.createElement("A");
        linkNode1.href = "../Root/Root-InfoManage.aspx?ID=" + ID + "&Type=3";
        linkNode1.style.cssFloat= "left"
        linkNode1.target = "_self";
        linkNode1.appendChild(h);
        var textNode2 = document.createTextNode("取消置热");
        var h1 = document.createElement("H5");
        h1.appendChild(textNode2);
        var linkNode2 = document.createElement("A");
        linkNode2.href = "../Root/Root-InfoManage.aspx?ID=" + ID + "&Type=30";
        linkNode2.style.cssFloat = "right"
        linkNode2.target = "_self";
        linkNode2.appendChild(h1);
        tdNode6.appendChild(linkNode1);
        tdNode6.appendChild(linkNode2);

  
    
        var trNode = document.createElement("TR");
        trNode.appendChild(tdNode1);
        trNode.appendChild(tdNode2);
        trNode.appendChild(tdNode3);
        trNode.appendChild(tdNode4);
        trNode.appendChild(tdNode5);
        trNode.appendChild(tdNode6);
  
  
        titleArea.appendChild(trNode);

}