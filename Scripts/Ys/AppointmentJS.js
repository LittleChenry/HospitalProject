window.addEventListener("load", Init, false);

var obj = [];

function Init(evt) {
    CreateDate();//创建日期下拉菜单
    CreateAppiontTable();
    document.getElementById("chooseProject").addEventListener("click", CreateNewAppiontTable, false);//根据条件创建预约表
}

//根据今天日期创建预约表
function CreateAppiontTable() {
    var equimentSelect = document.getElementById("equipmentName");
    var item = window.location.search.split("=")[1];//?后第一个变量信息
    var date = new Date();
    var dateString = (1900+date.getYear()) + "-" + (1 + date.getMonth()) + "-" + date.getDate();
    GetItemInformation(item, dateString);//获取该项目所有设备
    if (obj.Equiment1[0].Equipment == "false")
        return;
    var count = 0;
    for (var o in obj) {//o是其中一个对象的对象名
        var equiment = obj[o];//获取当前对象名的json数组
        equimentSelect.options[count] = new Option(equiment[0].Euqipment);
        equimentSelect.options[count].value = equiment[0].EuqipmentID;
        ++count;
    }
    CreateCurrentEquipmentTbale(obj.Equiment1, dateString);//创建第一个设备的表
}

//创建某设备某天的预约表
function CreateCurrentEquipmentTbale(equiment, dateString) {
    var table = document.getElementById("apptiontTable");
    RemoveAllChild(table);

    var thead = document.createElement("THEAD");
    var headRow = document.createElement("TR");
    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody = document.createElement("TBODY");
    var bodyRow1 = document.createElement("TR");
    var bodyRow2 = document.createElement("TR");
    tbody.appendChild(bodyRow1);
    tbody.appendChild(bodyRow2);
    table.appendChild(tbody);

    var cols = 0;//该行有几列了

    for (var i = 0; i < equiment.length; i++) {
        var beg = equiment[i].Begin;
        var end = equiment[i].End;
        var state = equiment[i].State;

        var timeText = document.createTextNode(toTime(beg) + " - " + toTime(end));
        var th = document.createElement("TH");
        th.appendChild(timeText);

        var stateText = document.createTextNode((state == "0" ? "未预约" : "已预约"));
        var td1 = document.createElement("TD");
        td1.appendChild(stateText);

        var td2 = document.createElement("TD");
        if (state == "0") {
            var button = document.createElement("INPUT");
            button.value = "预约";
            button.type = "submit";
            td2.appendChild(button);
        }
        

        if (cols < 9) {
            headRow.appendChild(th);
            bodyRow1.appendChild(td1);
            bodyRow2.appendChild(td2);
            ++cols;
        } else {
            cols = 1;

            var newHead = document.createElement("THEAD");
            headRow = document.createElement("TR");
            newHead.appendChild(headRow);
            table.appendChild(newHead);

            var newBody = document.createElement("TBODY");
            bodyRow1 = document.createElement("TR");
            bodyRow2 = document.createElement("TR");
            newBody.appendChild(bodyRow1);
            newBody.appendChild(bodyRow2);
            table.appendChild(newBody);

            headRow.appendChild(th);
            bodyRow1.appendChild(td1);
            bodyRow2.appendChild(td2);
        }
    }
}

function toTime(minute) {
    var hour = parseInt(parseInt(minute) / 60);
    var min = parseInt(minute) - hour * 60;
    return hour.toString() + ":" + (min < 10 ? "0" : "") + min.toString();
}

//清楚所有子节点
function RemoveAllChild(area) {
    while (area.hasChildNodes()) {
        var first = area.firstChild;
        if(first != null && first != undefined)
            area.removeChild(first);
    }
}

//获取项目预约表信息
function GetItemInformation(item, dateString) {
    var xmlHttp = new XMLHttpRequest();
    var url = "../YS/GetAppointment.ashx?item=" + item + "&date=" + dateString;
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    var json = xmlHttp.responseText;
    obj = eval("(" + json + ")");
}

//根据日期创建新表
function CreateNewAppiontTable(evt) {
    evt.preventDefault();
    var equipmentName = document.getElementById("equipmentName");
    var currentIndex = equipmentName.selectedIndex;
    var equipmentID = equipmentName.options[currentIndex].value;
    var AppiontDate = document.getElementById("AppiontDate");
    currentIndex = AppiontDate.selectedIndex;
    var date = AppiontDate[currentIndex].value;

    var xmlHttp = new XMLHttpRequest();
    var url = "../YS/GetEquipmentAppointment.ashx?equipmentID=" + equipmentID + "&date=" + date;
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    var json = xmlHttp.responseText;
    thisObj = eval("(" + json + ")");

    CreateCurrentEquipmentTbale(thisObj, date);
}

//创建日期下拉菜单
function CreateDate() {
    var date = new Date();
    var dropdownList = document.getElementById("AppiontDate");
    dropdownList.options.length = 0;
    for (var i = 0; i < 3; i++) {
        dropdownList.options[i] = new Option(date.getMonth() + 1 + "月" + date.getDate() + "日");
        dropdownList.options[i].value = date.getFullYear() + "-" + (1 + date.getMonth()) + "-" + date.getDate();
        date.setDate(date.getDate() + 1);
    }
}
