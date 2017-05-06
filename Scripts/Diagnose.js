/* ***********************************************************
 * FileName: DiagnoseJS.js
 * Writer: xubixiao
 * create Date: 2017-5-4
 * ReWriter:xubixiao
 * Rewrite Date:2017-5-4
 * impact :病情诊断界面
 * **********************************************************/
window.addEventListener("load", createPatient, false)
var PatientArea;
var obj;
var pageCurrent;
var patientGroup;
var lastPageNumber;
var treaIDinfo;
var userName;
var userID;
//JS入口主函数
function createPatient(evt) {
    //获取入口患者信息界面的div
    PatientArea = document.getElementById("patientTable");
   //调取后台所有等待就诊的疗程号及其对应的病人
    getPatientInfo();
    patientGroup = obj.patientGroup;
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
}

//获取所有待就诊疗程号以及所属患者ID与其他信息
function getPatientInfo(evt) {
    var xmlHttp = new XMLHttpRequest();
    var url = "patientInfo.ashx?name=all";
    xmlHttp.open("GET", url, false);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            var getString = xmlHttp.responseText;
            obj = eval("(" + getString + ")");
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
        var url = "patientInfo.ashx?name=all";
    }
    else {
        var url = "patientInfo.ashx?name=" + str;
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

//回退按钮
function askForBack() {
    document.location.reload();

}
//请求诊断按钮入口
function askForDiagnose(patient) {
        var panel = document.getElementById("panelbody");
        var paneltemp = document.getElementById("panelbodytemp");
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
         var handle1 = function () { nextstep(patient);
         }
         buttonnext.addEventListener("click",handle1
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
//下一步
function nextstep(patient) {
    var curinput = document.getElementById("curstep");
    curinput.value = parseInt(curinput.value) + 1;
    showfooter(patient, curinput.value);
}
//上一步
function previousstep(patient) {
    var curinput = document.getElementById("curstep");
    curinput.value = parseInt(curinput.value) - 1;
    showfooter(patient, curinput.value);
}
//展示具体患者上下步的诊断网页
function showfooter(patient, page) {
    var buttonnext = document.getElementById("nextBtn");
    var buttonpre = document.getElementById("preBtn");
    if (page == 1) {
        buttonpre.disabled = "true";
        document.getElementById("confirm").style.display = "block";
        document.getElementById("choosetreat").style.display = "none";
        document.getElementById("complete").style.display = "none";
        var div = document.getElementById("nextpre");
        var div2 = document.getElementById("lastpage");
        div2.style.display = "none";
        div.style.display = "block";
        askForInfo(patient);
    }
    if (page == 2) {
    buttonpre.removeAttribute("disabled");
    document.getElementById("confirm").style.display = "none";
    document.getElementById("choosetreat").style.display = "none";
    document.getElementById("complete").style.display = "block";
    var div = document.getElementById("nextpre");
    var div2 = document.getElementById("lastpage");
    div.style.display = "none";
    div2.style.display = "block";
    var time = new Date();
    document.getElementById("treatID").value = patient.treatID;
    document.getElementById("time").value = time.getFullYear() + "-" + (time.getMonth()+1) + "-" + time.getDay();
    document.getElementById("diaguser").value = userName;
    document.getElementById("diaguserid").value = userID;
    var select1=document.getElementById("subcenter");
    createSubcenterItem(select1);
    var select2 = document.getElementById("princal");
    createPrincalItem(select2);
    var select3 = document.getElementById("part");
    createPartItem(select3);
    var select4 = document.getElementById("diagresult");
    createDiagResultItem(select4);
    document.getElementById("postdiag").addEventListener("click", checkAll, false);
}
}
//第二步诊断单中的分中心负责人选择项建立
function createSubcenterItem(thiselement) {
    var subcenterItem = JSON.parse(getsubcenterItem()).Item;
    thiselement.options.length = 0;
    thiselement.options[0] = new Option("--分中心负责人--");
    thiselement.options[0].value = "allItem";
    for (var i = 0; i < subcenterItem.length; i++) {
        if (subcenterItem[i] != "") {
            thiselement.options[i + 1] = new Option(subcenterItem[i].Name);
            thiselement.options[i + 1].value = parseInt(subcenterItem[i].ID);
        }
    }


}
//第二步分中心负责人数据库信息调取
function getsubcenterItem() {
    var xmlHttp = new XMLHttpRequest();
    var url = "getsubcenter.ashx";
    xmlHttp.open("GET", url, false);
    xmlHttp.send();
    var Items = xmlHttp.responseText;
    return Items;
}
//第二步诊断单中的主中心负责人选择项建立
function createPrincalItem(thiselement) {
    var princenterItem = JSON.parse(getPrincenterItem()).Item;
    thiselement.options.length = 0;
    thiselement.options[0] = new Option("--主中心负责人--");
    thiselement.options[0].value = "allItem";
    for (var i = 0; i < princenterItem.length; i++) {
        if (princenterItem[i] != "") {
            thiselement.options[i + 1] = new Option(princenterItem[i].Name);
            thiselement.options[i + 1].value = parseInt(princenterItem[i].ID);
        }
    }


}
//第二步主中心负责人数据库信息调取
function getPrincenterItem() {
    var xmlHttp = new XMLHttpRequest();
    var url = "getprincenter.ashx";
    xmlHttp.open("GET", url, false);
    xmlHttp.send();
    var Items = xmlHttp.responseText;
    return Items;
}
//第二步部位下拉项建立
function createPartItem(thiselement) {
    var PartItem = JSON.parse(getPartItem()).Item;
    thiselement.options.length = 0;
    thiselement.options[0] = new Option("--部位选择--");
    thiselement.options[0].value = "allItem";
    for (var i = 0; i < PartItem.length; i++) {
        if (PartItem[i] != "") {
            thiselement.options[i + 1] = new Option(PartItem[i].Name);
            thiselement.options[i + 1].value = parseInt(PartItem[i].ID);
        }
    }


}
//第二步部位项数据库调取
function getPartItem() {
    var xmlHttp = new XMLHttpRequest();
    var url = "getpart.ashx";
    xmlHttp.open("GET", url, false);
    xmlHttp.send();
    var Items = xmlHttp.responseText;
    return Items;
}
//第二步诊断结果下拉建立
function createDiagResultItem(thiselement) {
    var DiagResultItem = JSON.parse(getDiagResultItem()).Item;
    thiselement.options.length = 0;
    thiselement.options[0] = new Option("--诊断结果--");
    thiselement.options[0].value = "allItem";
    for (var i = 0; i < DiagResultItem.length; i++) {
        if (DiagResultItem[i] != "") {
            thiselement.options[i + 1] = new Option(DiagResultItem[i].Name);
            thiselement.options[i + 1].value = parseInt(DiagResultItem[i].ID);
        }
    }


}
//第二步诊断结果下拉选项获取
function getDiagResultItem() {
    var xmlHttp = new XMLHttpRequest();
    var url = "getDiagResult.ashx";
    xmlHttp.open("GET", url, false);
    xmlHttp.send();
    var Items = xmlHttp.responseText;
    return Items;
}
//检查填写情况
function checkAll(evt) {
    var treatid=document.getElementById("treatID");
    var time=document.getElementById("time");
    var diaguserid=document.getElementById("diaguserid");
    var remark =document.getElementById("remark");
    var select1 = document.getElementById("subcenter");
    var select2 = document.getElementById("princal");
    var select3 = document.getElementById("part");
    var select4 = document.getElementById("diagresult");
    if (select1.value == "allItem") {
        window.alert("请选择分中心负责人");
        return;
    }
    if (select2.value == "allItem") {
        window.alert("请选择主中心负责人");
        return;
    }
    if (select3.value == "allItem") {
        window.alert("请选择部位");
        return;
    }
    if (select4.value == "allItem") {
        window.alert("请选择诊断结果");
        return;
    }
    var xmlHttp = new XMLHttpRequest();
    var url = "recordDiag.ashx?treatid=" + treatid.value + "&diaguserid=" + diaguserid.value + "&remark=" + remark.value + "&sub=" + select1.value + "&prin=" + select2.value;
    url = url + "&part=" + select3.value + "&diagresult=" + select4.value;
    xmlHttp.open("GET", url, false);
    xmlHttp.send();
    var Items = xmlHttp.responseText;
    if (Items == "success") {
        window.alert("诊断成功");
        askForBack();
        return;

    }
    else {
        window.alert("诊断失败");
        return;
    }
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
        button.addEventListener("click", function () { askForDiagnose(patient) }, false);
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