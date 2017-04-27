/* ***********************************************************
 * FileName: YSrequireTreatment.js
 * Writer: xubixiao
 * create Date: 2017-4-27
 * ReWriter:xubixiao
 * Rewrite Date:2017-4-27
 * impact :申请疗程页面，此页面最后删除，暂时保留
 * **********************************************************/
window.addEventListener("load", createPatient, false)
var PatientArea;
var obj;
var pageCurrent;
var patientGroup;
var lastPageNumber;

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
    var url = "patientInfo.ashx?id="+str+"&name="+str;
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
    var container = document.createElement("DIV");
    container.className = "container";
    container.style.marginTop = "10";
    container.style.width = "40%";
    var divmarg = document.createElement("DIV");
    divmarg.className = "row";
    var asktreat = document.createElement("DIV");
    asktreat.className = "login-panel panel panel-default";
    asktreat.style.marginTop = "0";
    var div1 = document.createElement("DIV");
    div1.className = "panel-heading";
    var textnodeforask = document.createTextNode("请求患者疗程ID");
    div1.appendChild(textnodeforask);
    var div2 = document.createElement("DIV");
    div2.className = "panel-self panel-body";

    var divName = document.createElement("DIV");
    divName.className = "regedit-input form-group";
    var labelName = document.createElement("Label");
    labelName.className = "regedit-label col-sm-4 control-label";
    var inputDiv = document.createElement("DIV");
    inputDiv.className = "col-sm-8";
    var textName = document.createTextNode("姓名：");
    labelName.appendChild(textName);
    var inputName = document.createElement("INPUT");
    inputName.id = "inputName";
    inputName.size = "10";
    inputName.className = "form-control";
    inputName.disabled = "true";
    inputName.value = patient.Name;
    inputDiv.appendChild(inputName);
    divName.appendChild(labelName);
    divName.appendChild(inputDiv);

    var divID = document.createElement("DIV");
    divID.className = "regedit-input form-group";
    var labelID = document.createElement("Label");
    labelID.className = "regedit-label col-sm-4 control-label";
    var inputDiv1 = document.createElement("DIV");
    inputDiv1.className = "col-sm-8";
    var textID = document.createTextNode("身份证ID：");
    labelID.appendChild(textID);
    var inputID = document.createElement("INPUT");
    inputID.size = "10";
    inputID.id = "inputID";
    inputID.className = "form-control";
    inputID.disabled = "true";
    inputID.value = patient.IdentificationNumber;
    inputDiv1.appendChild(inputID);
    divID.appendChild(labelID);
    divID.appendChild(inputDiv1);

    var divYear= document.createElement("DIV");
    divYear.className = "regedit-input form-group";
    var labelYear = document.createElement("Label");
    labelYear.className = "regedit-label col-sm-4 control-label";
    var inputDiv2 = document.createElement("DIV");
    inputDiv2.className = "col-sm-8";
    var textYear = document.createTextNode("年份标记：");
    labelYear.appendChild(textYear);
    var inputYear = document.createElement("INPUT");
    inputYear.id = "inputYear";
    inputYear.size = "10";
    inputYear.className = "form-control";
    inputYear.disabled = "true";
    inputYear.value = new Date().getFullYear();
    inputDiv2.appendChild(inputYear);
    divYear.appendChild(labelYear);
    divYear.appendChild(inputDiv2);

    var divPartial = document.createElement("DIV");
    divPartial.className = "regedit-input form-group";
    var labelPartial = document.createElement("Label");
    labelPartial.className = "regedit-label col-sm-4 control-label";
    var inputDiv3 = document.createElement("DIV");
    inputDiv3.className = "col-sm-8";
    var textPartial = document.createTextNode("部位标记：");
    labelPartial.appendChild(textPartial);
    var inputPartial = document.createElement("SELECT");
    inputPartial.id = "inputPartial";
    inputPartial.className = "form-control";
    var inputPartial0 = document.createElement("option");
    inputPartial.appendChild(inputPartial0);
    inputPartial0.text = "--请选择部位标记--";
    inputPartial0.value = "";
    var inputPartial1 = document.createElement("option");
    inputPartial.appendChild(inputPartial1);
    inputPartial1.text = "头";
    inputPartial1.value = "01";
    var inputPartial2 = document.createElement("option");
    inputPartial.appendChild(inputPartial2);
    inputPartial2.text = "脚";
    inputPartial2.value = "02";
    var inputPartial3 = document.createElement("option");
    inputPartial.appendChild(inputPartial3);
    inputPartial3.text = "胸";
    inputPartial3.value = "03";
    inputDiv3.appendChild(inputPartial);
    divPartial.appendChild(labelPartial);
    divPartial.appendChild(inputDiv3);
   
    var divPatientID = document.createElement("DIV");
    divPatientID.className = "regedit-input form-group";
    var labelPatientID = document.createElement("Label");
    labelPatientID.className = "regedit-label col-sm-4 control-label";
    var inputDiv4 = document.createElement("DIV");
    inputDiv4.className = "col-sm-8";
    var textPatientID = document.createTextNode("身份标记：");
    labelPatientID.appendChild(textPatientID);
    var inputPatientID = document.createElement("INPUT");
    inputPatientID.id = "inputPatientID";
    inputPatientID.size = "10";
    inputPatientID.className = "form-control";
    inputPatientID.disabled = "true";
    inputPatientID.value =patient.ID;
    inputDiv4.appendChild(inputPatientID);
    divPatientID.appendChild(labelPatientID);
    divPatientID.appendChild(inputDiv4);

    var buttonsure = document.createElement("BUTTON");
    var textNodesure = document.createTextNode("确定提交");
    buttonsure.appendChild(textNodesure);
    buttonsure.style.cssFloat = "right";
    buttonsure.className = "btn btn-primary btn-xs";
    var buttonback = document.createElement("BUTTON");
    var textNodeBack = document.createTextNode("确定回退");
    buttonback.appendChild(textNodeBack);
    buttonback.style.cssFloat="left";
    buttonback.className = "btn btn-primary btn-xs";
    buttonback.onclick = function () { askForBack() };

    buttonsure.onclick = function () {
        if (inputPartial.value == "") {
            window.alert("请选择部位标志");
        }
        else {
            var treatid = document.getElementById("inputYear").value + document.getElementById("inputPartial").value + document.getElementById("inputPatientID").value;
            var xmlHttp = new XMLHttpRequest();
            var url = "treatIDrecord.ashx?treatid=" + treatid+"&patientID="+patient.ID;
            xmlHttp.open("GET", url, false);
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
                  
                    var result = xmlHttp.responseText;
                    
                    if (result == "success") {
                        window.alert("提交成功");
                          askForBack();
                          }
                    else {
                            window.alert("提交失败");
                     }
                }
            }
            xmlHttp.send();
            

        }
    };

    
    div2.appendChild(divName);
    div2.appendChild(divID);
    div2.appendChild(divYear);
    div2.appendChild(divPartial);
    div2.appendChild(divPatientID);
    div2.appendChild(buttonsure);
    div2.appendChild(buttonback);
    asktreat.appendChild(div1);
    asktreat.appendChild(div2);
    divmarg.appendChild(asktreat);
    container.appendChild(divmarg);
    paneltemp.appendChild(container);
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
    spanid.style.cssFloat="right";
   
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
    var textapply = document.createTextNode("申请疗程");
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