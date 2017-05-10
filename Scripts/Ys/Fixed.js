window.addEventListener("load", Init, false);


var pageCurrent;
var patientGroup;
var lastPageNumber;
var userName;
var userID;
var Patientforfix;
var FixPatientChosen;
var obj = [];

function Init(evt) {

    //xubixiao
    //获取入口患者信息界面的div
    PatientArea = document.getElementById("patientTable");
    //调取后台所有等待体位固定的疗程号及其对应的病人
    getPatientInfo();
    patientGroup = Patientforfix.fixedPatient;
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
    //alert(userID);
    //document.getElementById("username").value = userID; 
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

function toTime(minute) {
    var hour = parseInt(parseInt(minute) / 60);
    var min = parseInt(minute) - hour * 60;
    return hour.toString() + ":" + (min < 10 ? "0" : "") + min.toString();
}

//清楚所有子节点
function RemoveAllChild(area) {
    while (area.hasChildNodes()) {
        var first = area.firstChild;
        if (first != null && first != undefined)
            area.removeChild(first);
    }
}

//获取所有待等待体位固定申请疗程号以及所属患者ID与其他信息
function getPatientInfo(evt) {
    var xmlHttp = new XMLHttpRequest();
    var url = "patientFix.ashx?name=all";
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
        var url = "patientFix.ashx?name=all";
    }
    else {
        var url = "patientFix.ashx?name=" + str;
    }
    xmlHttp.open("GET", url, false);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            var getString = xmlHttp.responseText;
            var newob = eval("(" + getString + ")");
            removeUlAllChild(PatientArea);
            patientGroup = newob.fixedPatient;
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
                //alert(userID);                
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
        var textnode1 = document.createTextNode(patient.TreatmentID);
        tdnode1.appendChild(textnode1);

        var tdnode2 = document.createElement("TD");
        var textnode2 = document.createTextNode(patient.Name);
        tdnode2.appendChild(textnode2);

        var tdnode3 = document.createElement("TD");
        var textnode3 = document.createTextNode(patient.equipment);
        tdnode3.appendChild(textnode3);

        var tdnode5 = document.createElement("TD");
        var textnode5 = document.createTextNode(patient.appointmentDate + " " + patient.begin + "-" + patient.end);
        tdnode5.appendChild(textnode5);

        var tdnode4 = document.createElement("TD");
        var button = document.createElement("button");
        button.className = "btn btn-primary btn-xs";
        button.style.color = "white";
        button.addEventListener("click", function () { askForFix(patient.FixedID) }, false);
        var textnode4 = document.createTextNode("进行体位固定记录");
        button.appendChild(textnode4);
        tdnode4.appendChild(button);
        trnode1.appendChild(tdnode1);
        trnode1.appendChild(tdnode2);
        trnode1.appendChild(tdnode3);
        trnode1.appendChild(tdnode5);
        trnode1.appendChild(tdnode4);
        tbody.appendChild(trnode1);
        var cancelbutton = document.getElementById("cancel");
        cancelbutton.addEventListener("click", cancelFixRecord, false);
        var savebutton = document.getElementById("save");
        savebutton.addEventListener("click", saveFixRecord, false);
    }

}

function saveFixRecord() {
    
}

function cancelFixRecord() {
    var panel = document.getElementById("patientspanelbody");
    var paneltemp = document.getElementById("singlepatientpanelbody");
    paneltemp.style.display = "none";
    panel.style.display = "block";
}

//请求固定记录
function askForFix(FixedID) {
    var panel = document.getElementById("patientspanelbody");
    var paneltemp = document.getElementById("singlepatientpanelbody");
    panel.style.display = "none";
    paneltemp.style.display = "block";
    var xmlHttp = new XMLHttpRequest();
    var url = "FixInfo.ashx?FixedID=" + FixedID;
    xmlHttp.open("GET", url, false);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            var getString = xmlHttp.responseText;
            FixPatientChosen = eval("(" + getString + ")");
        }
    }
    xmlHttp.send();
    writeFixInfo(FixPatientChosen);
}

function writeFixInfo(FixPatientChosen) {
    
    document.getElementById("hidetreatID").value = FixPatientChosen.fixedInfo[0].treatID;
    document.getElementById("Name").innerHTML = FixPatientChosen.fixedInfo[0].Name;
    document.getElementById("Gender").innerHTML = sex(FixPatientChosen.fixedInfo[0].Gender);
    document.getElementById("Age").innerHTML = FixPatientChosen.fixedInfo[0].Age;
    document.getElementById("Address").innerHTML = FixPatientChosen.fixedInfo[0].Address;
    var Contact = "";
    if (FixPatientChosen.fixedInfo[0].Contact1 != "" && FixPatientChosen.fixedInfo[0].Contact2 != "") {
        Contact = FixPatientChosen.fixedInfo[0].Contact1 + "、" + FixPatientChosen.fixedInfo[0].Contact2;
    } else {
        Contact = FixPatientChosen.fixedInfo[0].Contact1 + FixPatientChosen.fixedInfo[0].Contact2;
    }
    document.getElementById("Contact").innerHTML = Contact;
    document.getElementById("treatID").innerHTML = FixPatientChosen.fixedInfo[0].treatID;
    document.getElementById("modelID").innerHTML = FixPatientChosen.fixedInfo[0].modelID;
    document.getElementById("requireID").innerHTML = FixPatientChosen.fixedInfo[0].requireID;
    document.getElementById("diagnosisresult").innerHTML = FixPatientChosen.fixedInfo[0].diagnosisresult;
    document.getElementById("doctor").innerHTML = FixPatientChosen.fixedInfo[0].doctor;
    document.getElementById("body").innerHTML = FixPatientChosen.fixedInfo[0].body;
    document.getElementById("fixedEquipment").innerHTML = FixPatientChosen.fixedInfo[0].fixedEquipment;
    document.getElementById("ApplicationUser").innerHTML = FixPatientChosen.fixedInfo[0].ApplicationUser;
    document.getElementById("ApplicationTime").innerHTML = FixPatientChosen.fixedInfo[0].ApplicationTime;
    document.getElementById("userID").value = userID;
}

function sex(evt) {
    if (evt == "F")
        return "女";
    else
        return "男";
}

//回退按钮
function askForBack() {
    document.location.reload();

}


function dateformat(format) {
    var year = format.getFullYear();
    var month = format.getMonth() + 1;
    var day = format.getDate();
    var hour = format.getHours();
    var minute = format.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    var time = year + "年" + month + "月" + day + "日 " + hour + "：" + minute;
    return time;
}