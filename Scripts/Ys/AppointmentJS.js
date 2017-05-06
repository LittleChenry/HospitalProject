window.addEventListener("load", Init, false);


var pageCurrent;
var patientGroup;
var lastPageNumber;
var userName;
var userID;
var Patientforfix;
var obj = [];

function Init(evt) {

    //xubixiao
    //获取入口患者信息界面的div
    PatientArea = document.getElementById("patientTable");
    //调取后台所有等待就诊的疗程号及其对应的病人
    getPatientInfo();
    patientGroup = Patientforfix.patientGroup;
    //此处为分页代码
    lastPageNumber = Math.ceil(patientGroup.length / 10);
    if (lastPageNumber == 1) {
        for (var i = 0; i < patientGroup.length; i++) {
            createPatientShow(patientGroup[i]);
        }
        document.getElementById("nextPage").disabled = "true";
    } else {
        for (var i = 0; i < 10; i++) {
            createPatientShow(patientGroup[i]);
        }
    }
    //获得当前执行人姓名与ID
    getUserName();
    getUserID();
    //此处为分页代码
    document.getElementById("currentPage").value = 1;
    document.getElementById("previousPage").disabled = "true";
    document.getElementById("firstPage").addEventListener('click', firstPageShow, false);
    document.getElementById("nextPage").addEventListener('click', nextPageShow, false);
    document.getElementById("previousPage").addEventListener('click', previousPageShow, false);
    document.getElementById("lastPage").addEventListener('click', lastPageShow, false);
    //获得搜索按钮
    var button = document.getElementById("search");
    button.addEventListener('click', sendsearch, false);
    //xubixiao


   
}

//根据今天日期创建预约表
//xuixiao加传参数,patient是病人信息,patient.Name/patient.ID...;patient.treatid是该次治疗的疗程ID
//basefixinfo是上一页基础申请信息数组，basefixinfo[0]位置是模具选择的编号，basefixinfo[1]位置是特殊要求编号,basefixinfo[2]是申请人ID，basefixinfo[3]是时间
function CreateAppiontTable(patient, basefixinfo) {
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
    CreateCurrentEquipmentTbale(obj.Equiment1, dateString, patient,basefixinfo);//创建第一个设备的表
}

//创建某设备某天的预约表
//xuixiao加传参数,patient是病人信息,patient.Name/patient.ID...;patient.treatid是该次治疗的疗程ID
//basefixinfo是上一页基础申请信息数组，basefixinfo[0]位置是模具选择的编号，basefixinfo[1]位置是特殊要求编号,basefixinfo[2]是申请人ID，basefixinfo[3]是时间
function CreateCurrentEquipmentTbale(equiment, dateString, patient,basefixinfo) {
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
//xuixiao加传参数,patient是病人信息,patient.Name/patient.ID...;patient.treatid是该次治疗的疗程ID
//basefixinfo是上一页基础申请信息数组，basefixinfo[0]位置是模具选择的编号，basefixinfo[1]位置是特殊要求编号,basefixinfo[2]是申请人ID，basefixinfo[3]是时间
function CreateNewAppiontTable(evt, patient, basefixinfo) {
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

    CreateCurrentEquipmentTbale(thisObj, date, patient, basefixinfo);
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

//xubixiao
//获取所有待等待体位固定申请疗程号以及所属患者ID与其他信息
function getPatientInfo(evt) {
    var xmlHttp = new XMLHttpRequest();
    var url = "patientInfoForFix.ashx?name=all";
    xmlHttp.open("GET", url, false);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            var getString = xmlHttp.responseText;
            Patientforfix = eval("(" + getString + ")");
        }
    }
    xmlHttp.send();
}

//首页判断
function firstPageShow(evt) {
    removeUlAllChild(PatientArea);
    release();
    if (lastPageNumber == 1) {
        for (var i = 0; i < patientGroup.length; i++) {
            createPatientShow(patientGroup[i]);
            document.getElementById("nextPage").disabled = "true";
        }
    } else {
        for (var i = 0; i < 10; i++) {
            createPatientShow(patientGroup[i]);
        }
    }
    document.getElementById("previousPage").disabled = "true";
    document.getElementById("currentPage").value = 1;
}
//下页判断
function nextPageShow(evt) {
    removeUlAllChild(PatientArea);
    release();
    pageCurrent = parseInt(document.getElementById("currentPage").value) + 1;
    if (pageCurrent == lastPageNumber) {
        document.getElementById("nextPage").disabled = "true";
        for (var i = 10 * pageCurrent - 10; i < patientGroup.length; i++) {
            createPatientShow(patientGroup[i]);
        }
    }
    else {
        for (var i = 10 * pageCurrent - 10; i < 10 * pageCurrent; i++) {
            createPatientShow(patientGroup[i]);
        }

    }
    document.getElementById("currentPage").value = pageCurrent;

}
//前页判断
function previousPageShow(evt) {
    removeUlAllChild(PatientArea);
    release();
    pageCurrent = document.getElementById("currentPage").value - 1;
    if (pageCurrent == 1) {
        document.getElementById("previousPage").disabled = "true";
    }
    for (var i = 10 * pageCurrent - 10; i < 10 * pageCurrent; i++) {
        createPatientShow(patientGroup[i]);
    }
    document.getElementById("currentPage").value = pageCurrent;
}
//尾页判断
function lastPageShow(evt) {
    removeUlAllChild(PatientArea);
    release();
    pageCurrent = lastPageNumber;
    for (var i = 10 * lastPageNumber - 10; i < patientGroup.length; i++) {
        createPatientShow(patientGroup[i]);
    }
    if (lastPageNumber == 1) {
        document.getElementById("previousPage").disabled = "true";
    }
    document.getElementById("nextPage").disabled = "true";
    document.getElementById("currentPage").value = pageCurrent;
}
//将下页与上页设为不可点击
function release() {
    document.getElementById("nextPage").removeAttribute("disabled");
    document.getElementById("previousPage").removeAttribute("disabled");

}
//删除某节点的所有子节点
function removeUlAllChild(evt) {
    while (evt.hasChildNodes()) {
        evt.removeChild(evt.firstChild);
    }
}
//搜索患者姓名
function sendsearch(evt) {
    var inputvalue = document.getElementById("patientName");
    var str = inputvalue.value;
    var xmlHttp = new XMLHttpRequest();
    if (str == "") {
        var url = "patientInfoForFix.ashx?name=all";
    }
    else {
        var url = "patientInfoForFix.ashx?name=" + str;
    }
    xmlHttp.open("GET", url, false);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            var getString = xmlHttp.responseText;
            var newob = eval("(" + getString + ")");
            removeUlAllChild(PatientArea);
            patientGroup = newob.patientGroup;
            lastPageNumber = Math.ceil(patientGroup.length / 10);
            if (lastPageNumber == 1) {
                for (var i = 0; i < patientGroup.length; i++) {
                    createPatientShow(patientGroup[i]);
                }
                document.getElementById("nextPage").disabled = "true";
            } else {
                for (var i = 0; i < 10; i++) {
                    createPatientShow(patientGroup[i]);
                }
            }
            document.getElementById("previousPage").disabled = "true";
            document.getElementById("currentPage").value = 1;
        }
    }
    xmlHttp.send();

}
function getUserName() {
    var xmlHttp = new XMLHttpRequest();
    var url = "../Root/GetUserName.ashx";
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {//正常响应
            if (xmlHttp.status == 200) {//正确接受响应数据
                userName = xmlHttp.responseText;
            }
        }
    }
    xmlHttp.send();
}
function getUserID() {
    var xmlHttp = new XMLHttpRequest();
    var url = "GetUserID.ashx";
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {//正常响应
            if (xmlHttp.status == 200) {//正确接受响应数据
                userID = xmlHttp.responseText;
            }
        }
    }
    xmlHttp.send();
}
//建立入口病患表
function createPatientShow(patient) {
    if (patient != null) {
        var tbody = document.getElementById("patientTable");
        var trnode1 = document.createElement("TR");
        var tdnode1 = document.createElement("TD");
        var textnode1 = document.createTextNode(patient.treatID);
        tdnode1.appendChild(textnode1);
        var tdnode2 = document.createElement("TD");
        var textnode2 = document.createTextNode(patient.Name);
        tdnode2.appendChild(textnode2);
        var tdnode3 = document.createElement("TD");
        var textnode3 = document.createTextNode(patient.ID);
        tdnode3.appendChild(textnode3);
        var tdnode4 = document.createElement("TD");
        var button = document.createElement("button");
        button.className = "btn btn-primary btn-xs";
        button.style.color = "white";
        button.addEventListener("click", function () { askForFix(patient) }, false);
        var textnode4 = document.createTextNode("进行体位固定申请");
        button.appendChild(textnode4);
        tdnode4.appendChild(button);
        trnode1.appendChild(tdnode1);
        trnode1.appendChild(tdnode2);
        trnode1.appendChild(tdnode3);
        trnode1.appendChild(tdnode4);
        tbody.appendChild(trnode1);


    }

}
//请求固定申请
function askForFix(patient) {
    var panel = document.getElementById("mainpanelbody");
    var paneltemp = document.getElementById("otherpanelbody");
    panel.style.display = "none";
    paneltemp.style.display = "block";
    var curinput = document.getElementById("curstep");
    curinput.value = 1;
    var curstep = parseInt(curinput.value);
    var buttonnext = document.getElementById("nextBtn");
    var buttonpre = document.getElementById("preBtn");
    var buttonpre1 = document.getElementById("preBtn1");
    var back = document.getElementById("back");
    var back1 = document.getElementById("back1");
    buttonpre.disabled = "true";
    askForInfo(patient);
    var div = document.getElementById("nextpre");
    var div2 = document.getElementById("lastpage");

    div2.style.display = "none";
    div.style.display = "block";
    var handle1 = function () {
        nextstep(patient);
    }
    buttonnext.addEventListener("click", handle1
    , false);
    back.addEventListener("click", function () {
        askForBack();
    }, false);
    back1.addEventListener("click", function () {
        askForBack();
    }, false);
    var handle2 = function () {
        previousstep(patient);
    }
    buttonpre.addEventListener("click",
        handle2, false);
    buttonpre1.addEventListener("click",
       handle2, false);

}
//回退按钮
function askForBack() {
    document.location.reload();

}
//下一步
function nextstep(patient) {
    var curinput = document.getElementById("curstep");
    if (curinput.value == 2) {
        if (document.getElementById("modelselect").value == "allItem") {
            window.alert("请选择模具");
            return;
        }
        if (document.getElementById("specialrequest").value == "allItem") {
            window.alert("请选择特殊要求");
            return;
        }

    }
    curinput.value = parseInt(curinput.value) + 1;
    showApply(patient, curinput.value);
}
//上一步
function previousstep(patient) {
    var curinput = document.getElementById("curstep");
    curinput.value = parseInt(curinput.value) - 1;
    showApply(patient, curinput.value);
}
//生成基本信息确认DIV
function askForInfo(patient) {
    var paneltemp = document.getElementById("confirm");
    removeUlAllChild(paneltemp);
    var tableNode = document.createElement("TABLE");
    tableNode.style.width = "50%";
    tableNode.style.marginLeft = "25%";
    tableNode.className = "table table-striped table-bordered table-hove";
    var thead = document.createElement("THEAD");
    var tbody = document.createElement("TBODY");
    var trnode1 = document.createElement("TR");
    var tdnode11 = document.createElement("TD");
    var textNode1 = document.createTextNode("姓名:" + patient.Name);
    tdnode11.appendChild(textNode1);
    tdnode11.style.width = "40%";
    var tdnode12 = document.createElement("TD");

    var textNode2 = document.createTextNode("民族:" + patient.Nation);
    tdnode12.appendChild(textNode2);
    tdnode12.style.width = "25%";
    var tdnode13 = document.createElement("TD");
    tdnode13.rowSpan = "6";
    tdnode13.style.background = "url(" + patient.Picture + ")";
    tdnode13.style.width = "35%";

    var trnode2 = document.createElement("TR");
    var tdnode21 = document.createElement("TD");
    var textNode3 = document.createTextNode("身份证ID:" + patient.IdentificationNumber);

    tdnode21.appendChild(textNode3);
    tdnode21.style.width = "40%";
    var tdnode22 = document.createElement("TD");
    var textNode4 = document.createTextNode("性别:" + sex(patient.Gender));
    tdnode22.appendChild(textNode4);
    tdnode22.style.width = "25%";


    var trnode3 = document.createElement("TR");

    var tdnode31 = document.createElement("TD");
    var textNode5 = document.createTextNode("出生日期:" + patient.Birthday);
    tdnode31.appendChild(textNode5);
    tdnode31.style.width = "40%";

    var tdnode32 = document.createElement("TD");
    var textNode6 = document.createTextNode("年龄:" + patient.Age);
    tdnode32.appendChild(textNode6);
    tdnode32.style.width = "25%";


    var trnode4 = document.createElement("TR");

    var tdnode41 = document.createElement("TD");
    var textNode7 = document.createTextNode("就诊单位:" + patient.Hospital);
    tdnode41.appendChild(textNode7);
    tdnode41.style.width = "40%";

    var tdnode42 = document.createElement("TD");
    var textNode8 = document.createTextNode("住址:" + patient.Address);
    tdnode42.appendChild(textNode8);
    tdnode42.style.width = "25%";

    var trnode5 = document.createElement("TR");

    var tdnode51 = document.createElement("TD");
    var textNode9 = document.createTextNode("电话1:" + patient.Contact1);
    tdnode51.appendChild(textNode9);
    tdnode51.style.width = "40%";

    var tdnode52 = document.createElement("TD");
    var textNode10 = document.createTextNode("电话2:" + patient.Contact2);
    tdnode52.appendChild(textNode10);
    tdnode52.style.width = "25%";

    var trnode6 = document.createElement("TR");

    var tdnode61 = document.createElement("TD");
    var textNode11 = document.createTextNode("身高:" + patient.Height);
    tdnode61.appendChild(textNode11);
    tdnode61.style.width = "40%";

    var tdnode62 = document.createElement("TD");
    var textNode12 = document.createTextNode("体重:" + patient.Weight);
    tdnode62.appendChild(textNode12);
    tdnode62.style.width = "25%";



    trnode1.appendChild(tdnode11);
    trnode1.appendChild(tdnode12);
    trnode1.appendChild(tdnode13);
    trnode2.appendChild(tdnode21);
    trnode2.appendChild(tdnode22);
    trnode3.appendChild(tdnode31);
    trnode3.appendChild(tdnode32);
    trnode4.appendChild(tdnode41);
    trnode4.appendChild(tdnode42);
    trnode5.appendChild(tdnode51);
    trnode5.appendChild(tdnode52);
    trnode6.appendChild(tdnode61);
    trnode6.appendChild(tdnode62);
    tbody.appendChild(trnode1);
    tbody.appendChild(trnode2);
    tbody.appendChild(trnode3);
    tbody.appendChild(trnode4);
    tbody.appendChild(trnode5);
    tbody.appendChild(trnode6);
    tableNode.appendChild(tbody);
    paneltemp.appendChild(tableNode);

}
//性别换算
function sex(evt) {
    if (evt == "F")
        return "女";
    else
        return "男";
}

//展示具体患者上下步的固定申请网页的前两页
function showApply(patient, page) {
    var buttonnext = document.getElementById("nextBtn");
    var buttonpre = document.getElementById("preBtn");
    if (page == 1) {
        buttonpre.disabled = "true";
        document.getElementById("confirm").style.display = "block";
        document.getElementById("recordbase").style.display = "none";
        document.getElementById("appoint").style.display = "none";
        var div = document.getElementById("nextpre");
        var div2 = document.getElementById("lastpage");
        div2.style.display = "none";
        div.style.display = "block";
        askForInfo(patient);
    }
    if (page == 2) {
        buttonpre.removeAttribute("disabled");
        document.getElementById("confirm").style.display = "none";
        document.getElementById("recordbase").style.display = "block";
        document.getElementById("appoint").style.display = "none";
        var div = document.getElementById("nextpre");
        var div2 = document.getElementById("lastpage");
        div2.style.display = "none";
        div.style.display = "block";
        var time = new Date();
        document.getElementById("treatID").value = patient.treatID;
        document.getElementById("time").value = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDay();
        document.getElementById("applyuser").value = userName;
        var select1 = document.getElementById("modelselect");
        createmodelselectItem(select1);
        var select2 = document.getElementById("specialrequest");
        createspecialrequestItem(select2);
     
    }
    if (page == 3) {
        buttonpre.removeAttribute("disabled");
        document.getElementById("confirm").style.display = "none";
        document.getElementById("recordbase").style.display = "none";
        document.getElementById("appoint").style.display = "block";
        var div = document.getElementById("nextpre");
        var div2 = document.getElementById("lastpage");
        div.style.display = "none";
        div2.style.display = "block";
        var basefixinfo = [];
        basefixinfo[0]= document.getElementById("modelselect").value;
        basefixinfo[1] = document.getElementById("specialrequest").value;
        basefixinfo[2] = userID;
        basefixinfo[3] = document.getElementById("time").value;
        CreateAppiontTable(patient, basefixinfo);
        document.getElementById("chooseProject").addEventListener("click", function () {
            CreateNewAppiontTable(event, patient, basefixinfo);
        }, false);//根据条件创建预约表
    }
}
//第二页的模具选择下拉菜单
function createmodelselectItem(thiselement)
{
    var modelItem = JSON.parse(getmodelItem()).Item;
    thiselement.options.length = 0;
    thiselement.options[0] = new Option("--模具选择--");
    thiselement.options[0].value = "allItem";
    for (var i = 0; i < modelItem.length; i++) {
        if (modelItem[i] != "") {
            thiselement.options[i + 1] = new Option(modelItem[i].Name);
            thiselement.options[i + 1].value = parseInt(modelItem[i].ID);
        }
    }

}
function getmodelItem() {
    var xmlHttp = new XMLHttpRequest();
    var url = "getmodel.ashx";
    xmlHttp.open("GET", url, false);
    xmlHttp.send();
    var Items = xmlHttp.responseText;
    return Items;
}
//第二页的特殊要求下拉菜单
function createspecialrequestItem(thiselement) {
    var specialItem = JSON.parse(getspecialItem()).Item;
    thiselement.options.length = 0;
    thiselement.options[0] = new Option("--特殊要求--");
    thiselement.options[0].value = "allItem";
    for (var i = 0; i < specialItem.length; i++) {
        if (specialItem[i] != "") {
            thiselement.options[i + 1] = new Option(specialItem[i].Requirements);
            thiselement.options[i + 1].value = parseInt(specialItem[i].ID);
        }
    }

}
function getspecialItem() {
    var xmlHttp = new XMLHttpRequest();
    var url = "getspecial.ashx";
    xmlHttp.open("GET", url, false);
    xmlHttp.send();
    var Items = xmlHttp.responseText;
    return Items;
}



//下面是jquery流程条实现代码
$(function () {

    var step = $("#myStep").step();

    $("#preBtn").click(function (event) {
        var yes = step.preStep();//上一步
    });
    $("#nextBtn").click(function (event) {
        var yes = step.nextStep();
    });
    $("#preBtn1").click(function (event) {
        var yes = step.preStep();//上一步
    });
});



(function (factory) {
    "use strict";
    if (typeof define === 'function') {
        define.cmd && define('jquery-step', ['jquery'], function (require, exports, moudles) {
            var $ = require("jquery");
            factory($);
            return $;
        });
        define.amd && define(['jquery'], factory);
    } else {
        factory((typeof (jQuery) != 'undefined') ? jQuery : window.Zepto);
    }
}

(function ($) {
    $.fn.step = function (options) {
        var opts = $.extend({}, $.fn.step.defaults, options);
        var size = this.find(".step-header li").length;
        var barWidth = opts.initStep < size ? 100 / (2 * size) + 100 * (opts.initStep - 1) / size : 100;
        var curPage = opts.initStep;

        this.find(".step-header").prepend("<div class=\"step-bar\"><div class=\"step-bar-active\"></div></div>");
        this.find(".step-list").eq(opts.initStep - 1).show();
        if (size < opts.initStep) {
            opts.initStep = size;
        }
        if (opts.animate == false) {
            opts.speed = 0;
        }
        this.find(".step-header li").each(function (i, li) {
            if (i < opts.initStep) {
                $(li).addClass("step-active");
            }
            $(li).append("<span>" + (i + 1) + "</span>");
        });
        this.find(".step-header li").css({
            "width": 100 / size + "%"
        });
        this.find(".step-header").show();
        this.find(".step-bar-active").animate({
            "width": barWidth + "%"
        },
            opts.speed, function () {

            });

        this.nextStep = function () {
            if (curPage >= size) {
                return false;
            }
            return this.goStep(curPage + 1);
        }

        this.preStep = function () {
            if (curPage <= 1) {
                return false;
            }
            return this.goStep(curPage - 1);
        }

        this.goStep = function (page) {
            if (page == undefined || isNaN(page) || page < 0) {
                if (window.console && window.console.error) {
                    console.error('the method goStep has a error,page:' + page);
                }
                return false;
            }
            //此处用于在第二页未成功输入模具与特殊要求阻止流动条流动
            if (page == 3) {
                if (document.getElementById("modelselect").value == "allItem") {
                    return false;
                }
                if (document.getElementById("specialrequest").value == "allItem") {
                    return  false;
                }
            }
            curPage = page;
            this.find(".step-list").hide();
            this.find(".step-list").eq(curPage - 1).show();
            this.find(".step-header li").each(function (i, li) {
                $li = $(li);
                $li.removeClass('step-active');
                if (i < page) {
                    $li.addClass('step-active');
                    if (opts.scrollTop) {
                        $('html,body').animate({ scrollTop: 0 }, 'slow');
                    }
                }
            });
            barWidth = page < size ? 100 / (2 * size) + 100 * (page - 1) / size : 100;
            this.find(".step-bar-active").animate({
                "width": barWidth + "%"
            },
              opts.speed, function () {

              });
            return true;
        }
        return this;
    };

    $.fn.step.defaults = {
        animate: true,
        speed: 500,
        initStep: 1,
        scrollTop: true
    };

}));