/* ***********************************************************
 * FileName: YSCheckJS.js
 * Writer: xubixiao
 * create Date: 2017-4-27
 * ReWriter:xubixiao
 * Rewrite Date:2017-4-27
 * impact :查询患者疗程情况的界面
 * **********************************************************/
window.addEventListener("load", createPatient, false)
var PatientArea;
var obj;
var pageCurrent;
var patientGroup;
var lastPageNumber;
var treaIDinfo;

function createPatient(evt) {

    PatientArea = document.getElementById("patientShow");
    getPatientInfo();
    patientGroup = obj.patientGroup;
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


    document.getElementById("currentPage").value = 1;
    document.getElementById("previousPage").disabled = "true";
    document.getElementById("firstPage").addEventListener('click', firstPageShow, false);
    document.getElementById("nextPage").addEventListener('click', nextPageShow, false);
    document.getElementById("previousPage").addEventListener('click', previousPageShow, false);
    document.getElementById("lastPage").addEventListener('click', lastPageShow, false);

    var button = document.getElementById("search");

    button.addEventListener('click', sendsearch, false);



}
function getPatientInfo(evt) {
    var xmlHttp = new XMLHttpRequest();
    var url = "patientInfo.ashx?id=all";
    xmlHttp.open("GET", url, false);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            var getString = xmlHttp.responseText;
            obj = eval("(" + getString + ")");
        }
    }
    xmlHttp.send();
}
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
function release() {
    document.getElementById("nextPage").removeAttribute("disabled");
    document.getElementById("previousPage").removeAttribute("disabled");

}
function removeUlAllChild(evt) {
    while (evt.hasChildNodes()) {
        evt.removeChild(evt.firstChild);
    }
}
function sendsearch(evt) {
    var inputvalue = document.getElementById("patientID");
    var str = inputvalue.value;
    var xmlHttp = new XMLHttpRequest();
    var url = "patientInfo.ashx?id=" + str + "&name=" + str;
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
function askForInfo(patient) {
    var panel = document.getElementById("panelbody");
    var paneltemp = document.getElementById("panelbodytemp");
    panel.style.display = "none";
    paneltemp.style.display = "block";
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

    var buttonback = document.createElement("BUTTON");
    var textNodeBack = document.createTextNode("确定回退");
    buttonback.appendChild(textNodeBack);
    buttonback.className = "btn btn-primary btn-xs";
    buttonback.onclick = function () { askForBack() };

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
    paneltemp.appendChild(buttonback);

}
function sex(evt) {
    if (evt == "F")
        return "女";
    else
        return "男";
}
function askForTreat(patient) {
    var panel = document.getElementById("panelbody");
    var paneltemp = document.getElementById("panelbodytemp");
    panel.style.display = "none";
    paneltemp.style.display = "block";
    var treattable = document.createElement("table");
    treattable.className = "table table-striped table-bordered table-hove";
    treattable.style.width = "50%";
    treattable.style.marginLeft = "25%";
    var tbody = document.createElement("tbody");
    var trnode0 = document.createElement("tr");
  
    var thnode1 = document.createElement("TD");
    var textnode01 = document.createTextNode("姓名");
    thnode1.appendChild(textnode01);
    var thnode2 = document.createElement("TD");
    var textnode02 = document.createTextNode("ID");
    thnode2.appendChild(textnode02);
    var thnode3 = document.createElement("TD");
    var textnode03 = document.createTextNode("疗程ID");
    thnode3.appendChild(textnode03);
    var thnode4 = document.createElement("TD");
    var textnode04 = document.createTextNode("进行情况");
    thnode4.appendChild(textnode04);
    trnode0.appendChild(thnode1);
    trnode0.appendChild(thnode2);
    trnode0.appendChild(thnode3);
    trnode0.appendChild(thnode4);
    tbody.appendChild(trnode0);
  
    var result = getTreatTable(patient).treatGroup;
    for(var i=0;i<result.length;i++)
    {
        var trnode1 = document.createElement("tr");
        var tdnode11 = document.createElement("td");
        var textnode11 = document.createTextNode(result[i].name);
        tdnode11.appendChild(textnode11);
        var tdnode12 = document.createElement("td");
        var textnode12 = document.createTextNode(patient.ID);
        tdnode12.appendChild(textnode12);
        var tdnode13 = document.createElement("td");
        var textnode13 = document.createTextNode(result[i].treatID);
        tdnode13.appendChild(textnode13);
        var tdnode14 = document.createElement("td");
        var textnode14 = document.createTextNode(result[i].kind);
        tdnode14.appendChild(textnode14);
        trnode1.appendChild(tdnode11);
        trnode1.appendChild(tdnode12);
        trnode1.appendChild(tdnode13);
        trnode1.appendChild(tdnode14);
        tbody.appendChild(trnode1);
    }
    var buttonback = document.createElement("BUTTON");
    var textNodeBack = document.createTextNode("确定回退");
    buttonback.appendChild(textNodeBack);
    buttonback.className = "btn btn-primary btn-xs";
    buttonback.onclick = function () { askForBack() };

    treattable.appendChild(tbody);
    paneltemp.appendChild(treattable);
    paneltemp.appendChild(buttonback);


}
function getTreatTable(patient) {
    var ID = patient.ID;
    var xmlHttp = new XMLHttpRequest();
    var url = "treatIDInfo.ashx?id=" + ID;
    xmlHttp.open("GET", url, false);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            var getString = xmlHttp.responseText;
            treaIDinfo = eval("(" + getString + ")");
        }
    }
    xmlHttp.send();
    return treaIDinfo;
}
function askForBack() {
    var paneltemp = document.getElementById("panelbodytemp");
    removeUlAllChild(paneltemp);
    var panel = document.getElementById("panelbody");
    paneltemp.style.display = "none";
    panel.style.display = "block";

}

function createPatientShow(patient) {
    var ID = patient.ID;
    var name = patient.Name;
    var img = patient.Picture;
    var textName = document.createTextNode("姓名：" + name);
    var spanname = document.createElement("SPAN");
    spanname.appendChild(textName);
    spanname.style.cssFloat = "left";

    var textid = document.createTextNode("ID:" + ID);
    var spanid = document.createElement("SPAN");
    spanid.appendChild(textid);
    spanid.style.cssFloat = "right";

    var divhead = document.createElement("DIV");
    divhead.className = "panel-heading";
    divhead.style.textAlign = "center";
    divhead.appendChild(textName);
    divhead.appendChild(textid);
    var divbody = document.createElement("DIV");
    divbody.className = "panel-body";
    divbody.style.textAlign = "center";
    divbody.style.height = "200px";
    divbody.style.background = "url(" + img + ")";
    var divfoot = document.createElement("DIV");
    divfoot.className = "panel-footer";
    divfoot.style.height = "50px";
    var textinfo = document.createTextNode("详细情况");
    var button1 = document.createElement("BUTTON");
    button1.className = "btn btn-primary btn-xs";
    button1.style.cssFloat = "left";
    button1.onclick = function () { askForInfo(patient) };
    button1.appendChild(textinfo);
    var textapply = document.createTextNode("查询疗程");
    var button2 = document.createElement("BUTTON");
    button2.className = "btn btn-primary btn-xs";
    button2.style.cssFloat = "right";
    button2.onclick = function () { askForTreat(patient) };
    button2.appendChild(textapply);
    divfoot.appendChild(button1);
    divfoot.appendChild(button2);
    var divboreder = document.createElement("DIV");
    divboreder.className = "panel panel-default";
    divboreder.appendChild(divhead);
    divboreder.appendChild(divbody);
    divboreder.appendChild(divfoot);
    var divout = document.createElement("DIV");
    divout.className = "col-lg-3";
    divout.style.height = "400px";
    divout.style.width = "250px";

    divout.appendChild(divboreder);
    PatientArea.appendChild(divout);

}