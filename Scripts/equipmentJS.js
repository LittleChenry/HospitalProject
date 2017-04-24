window.addEventListener("load", Init, false);

var obj = [];
var Items = "";
var isAllGood = true;

function Init() {
    var ItemSelect = document.getElementById("TreatmentItem");
    var changeItem = document.getElementById("changeTreatmentItem");
    createItemSelect(ItemSelect);//创建设备隶属治疗项目下拉菜单
    createItemSelect(changeItem);
    var allLink = document.getElementsByClassName("selectedUpdate");
    for (var i = 0; i < allLink.length; i++) {
        allLink[i].addEventListener("click", EditEquipment, false);
    }
    document.getElementById("cannel").addEventListener("click", Cannel, false);
    document.getElementById("changefrm").addEventListener("submit", checkAll, false);
    document.getElementById("equipmentName").addEventListener("blur", checkEmpty, false);
    var allInput = document.getElementById("changefrm").getElementsByTagName("INPUT");
    for (var i = 0; i < allInput.length; i++) {
        if (allInput[i].className.indexOf("Time") > -1) {
            allInput[i].addEventListener("blur", checkTimes, false);
        }
    }
    document.getElementById("onceTime").addEventListener("blur", checkOnceTreat, false);
}

//创建设备隶属治疗项目下拉菜单
function createItemSelect(thisElement) {
    getCurrentItem();//获取当前所有隶属治疗项目

    thisElement.options.length = 0;
    thisElement.options[0] = new Option("隶属项目");
    thisElement.options[0].value = "allItem";
    if (Items == "") {
        return;
    }
    var allItems = Items.split(" ");
    for (var i = 0; i < allItems.length; i++) {
        if (allItems[i] != "") {
            thisElement.options[i + 1] = new Option(allItems[i]);
            thisElement.options[i + 1].value = allItems[i];
        }
    }
}

//获取当前所有隶属治疗项目
function getCurrentItem() {
    var xmlHttp = new XMLHttpRequest();
    var url = "getTreamentItem.ashx";
    xmlHttp.open("GET", url, false);
    xmlHttp.send();
    Items = xmlHttp.responseText;
}

function EditEquipment(evt) {
    evt.preventDefault();
    var equipID = document.getElementById("equipID");
    var thisType = document.getElementById("formType");
    thisType.value = "update";
    var middleArea = document.getElementById("middleArea");
    var topArea = document.getElementById("topArea");
    var hidden = this.parentNode.getElementsByTagName("INPUT");
    var id = hidden[0].value;
    equipID.value = id;
    document.getElementById("currentPage").value = hidden[1].value;
    getEquipmentInformation(id);
    FillForm();
    middleArea.style.display = "block";
    topArea.style.display = "block";
}

function getEquipmentInformation(id) {
    var xmlHttp = new XMLHttpRequest();
    var url = "getEquipmentInformation.ashx?id=" + id;
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    var json = xmlHttp.responseText;
    obj = eval("(" + json + ")");
}

function FillForm() {
    var nameText = document.getElementById("equipmentName");
    nameText.value = obj[0].Name;
    var stateText = document.getElementById("equipmentState");
    selectedByValue(stateText, obj[0].State);
    var onceTime = document.getElementById("onceTime");
    onceTime.value = obj[0].Timelength;
    var AMbeg = document.getElementById("AMbeg");
    AMbeg.value = transTime(obj[0].BeginTimeAM);
    var AMEnd = document.getElementById("AMEnd");
    AMEnd.value = transTime(obj[0].EndTimeAM);
    var PMBeg = document.getElementById("PMBeg");
    PMBeg.value = transTime(obj[0].BegTimePM);
    var PMEnd = document.getElementById("PMEnd");
    PMEnd.value = transTime(obj[0].EndTimePM);
    var changeTreatmentItem = document.getElementById("changeTreatmentItem");
    selectedByValue(changeTreatmentItem, obj[0].TreatmentItem);
}

//根据value选择select当前选项
function selectedByValue(select, value) {
    var thisOption = select.getElementsByTagName("OPTION");
    for (var i = 0; i < thisOption.length; i++) {
        if (thisOption[i].value == value) {
            thisOption[i].selected = true;
            break;
        }
    }
}

//时间转换
function transTime(time) {
    var thisTime = parseInt(time);
    var hour = parseInt(thisTime / 60);
    var minute = parseInt(thisTime - hour * 60);
    return (hour.toString() + ":" + (minute < 10 ? "0" : "") + minute.toString());
}

function Cannel(evt) {
    evt.preventDefault();
    var middleArea = document.getElementById("middleArea");
    var topArea = document.getElementById("topArea");
    middleArea.style.display = "none";
    topArea.style.display = "none";
}

function checkAll(evt) {
    isAllGood = true;
    document.getElementById("error").innerHTML = "";
    var allTag = this.getElementsByTagName('*');
    for (var i = 0; i < allTag.length; i++) {
        if (!checkElement(allTag[i])) {
            isAllGood = false;
        }
    }
    if (isAllGood == false) {
        evt.preventDefault();
    }
}

function checkElement(thisElement) {
    var backClassName = "";
    var allClassName = thisElement.className.split(" ");
    for (var i = 0; i < allClassName.length; i++) {
        backClassName += checkClassName(allClassName[i], thisElement) + " ";
    }
    thisElement.className = backClassName;
    if (backClassName.indexOf("invalid") > -1) {
        var error = document.getElementById("error");
        if (thisElement.className.indexOf("IsEmpty") > -1) {
            error.innerHTML = "设备名不能为空";
        } else if (thisElement.className.indexOf("OnceTreatment") > -1) {
            error.innerHTML = "请输入0-199的时间间隔(单位分钟)";
        } else if (thisElement.className.indexOf("Time") > -1) {
            error.innerHTML = "请输入正确的时间(格式 xx:xx)";
        }
        return false;
    }
    return true;
}

function checkClassName(name, thisElement) {
    var backString = "";
    switch (name) {
        case "":
        case "invalid":
            break;
        case "IsEmpty":
            if (isAllGood && (thisElement.value == "")) {
                backString += "invalid ";
            }
            backString += name;
            break;
        case "OnceTreatment":
            if (isAllGood && !checkOnceTime(thisElement)) {
                backString += "invalid ";
            }
            backString += name;
            break;
        case "Time":
            if (isAllGood && !checkTime(thisElement)) {
                backString += "invalid ";
            }
            backString += name;
            break;
        default:
            backString += name;
    }
    return backString;
}

function checkOnceTime(thisElement) {
    var rep = /^([1]?\d{1,2})$/;
    return rep.test(thisElement.value);
}

function checkTime(thisElement) {
    var rep1 = /^([0-1]?\d):[0-5]\d$/;
    var rep2 = /2[0-3]:[0-5]\d$/;
    return (rep1.test(thisElement.value) || rep2.test(thisElement.value));
}

function removeClassName(thisElement, name) {
    var backString = "";
    var allName = thisElement.className.split(" ");
    for (var i = 0; i < allName.length; i++) {
        if (allName[i] != name) {
            backString += allName[i] + " ";
        }
    }
    thisElement.className = backString;
}

function checkEmpty() {
    var error = document.getElementById("error");
    if (this.value == "") {
        error.innerHTML = "设备名不能为空";
        this.className += " invalid";
    } else {
        error.innerHTML = "";
        removeClassName(this, "invalid");
    }
}

function checkTimes() {
    var error = document.getElementById("error");
    if (!checkTime(this)) {
        error.innerHTML = "请输入正确的时间(格式 xx:xx)";
        this.className += " invalid";
    } else {
        error.innerHTML = "";
        removeClassName(this, "invalid");
    }
}

function checkOnceTreat() {
    var error = document.getElementById("error");
    if (!checkOnceTime(this)) {
        error.innerHTML = "请输入0-199的时间间隔(单位分钟)";
        this.className += " invalid";
    } else {
        error.innerHTML = "";
        removeClassName(this, "invalid");
    }
}