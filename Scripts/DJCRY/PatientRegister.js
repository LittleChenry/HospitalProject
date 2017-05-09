/* ***********************************************************
 * FileName: PatientRegister.js
 * Writer: xubxiao
 * create Date: 2017-5-8
 * ReWriter:
 * Rewrite Date:
 * impact :
 * 病人注册
 * **********************************************************/
var isAllGood;//所有检查是否通过

window.addEventListener("load", Init, false);//添加页面加载处理函数

//初始化
function Init() {
    document.forms[0].addEventListener("submit", CheckInput, false);//添加表单提交事件处理函数
    document.forms[0].addEventListener("reset", resetForm, false);//添加表单rest事件函数
    document.getElementById("Number1").addEventListener("change", phoneFormat, false);//电话号码格式化
    document.getElementById("Number2").addEventListener("change", phoneFormat, false);//电话号码格式化
    var select3 = document.getElementById("SickPart");
    createPartItem(select3);
}
//表单reset函数
function resetForm(evt) {
    //所有提示清空
    document.getElementById("error").innerHTML = "";

    var allInput = document.getElementsByTagName("INPUT");
    for (var i = 0; i < allInput.length; i++) {
        if (allInput[i].className.indexOf("invalid") > -1) {
            resetInput(allInput[i]);//恢复Input样式
        }
    }
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
    var url = "../YS/getpart.ashx";
    xmlHttp.open("GET", url, false);
    xmlHttp.send();
    var Items = xmlHttp.responseText;
    return Items;
}
//检查各个输入项内容
function CheckInput(evt) {
    isAllGood = true;//初始默认全为通过
    //各个提示项每次初始清空
    document.getElementById("error").innerHTML = "";
    //所有元素节点数组
    var allElements = document.forms[0].getElementsByTagName("*");
    for (var i = 0; i < allElements.length; i++) {
        if (!CheckEmpty(allElements[i])) {
            isAllGood = false;
        }
    }
    if (!isAllGood) {
        evt.preventDefault();//阻止事件进行
    }
}
//检查是否为空
function CheckEmpty(thisElement) {
    var strOutClassName = "";//检查后返回CSS
    var thisClassName = thisElement.className.split(" ");//提取classname中每个class
    for (var i = 0; i < thisClassName.length; i++) {
        strOutClassName += CheckClassName(thisClassName[i], thisElement) + " ";//验证并返回验证后classname
    }

    thisElement.className = strOutClassName;
    //验证后classname包含invalid说明验证不通过
    if (strOutClassName.indexOf("invalid") > -1) {
        AlertLabel(thisElement.parentNode);//对应元素父节点（Label）红色加粗提示
        if (thisElement.nodeName == "INPUT") {
            thisElement.select();
            if (thisElement.className.indexOf("userName") > -1) {
                document.getElementById("error").innerHTML = "姓名不能为空";
            }
            if (thisElement.className.indexOf("IDcardNumber") > -1) {
                if (document.getElementById("error").innerHTML == "") {
                    document.getElementById("error").innerHTML = "身份证不能为空";
                }
            }
            if (thisElement.className.indexOf("name") > -1) {
                document.getElementById("error").innerHTML = "姓名不能为空";
            }
            if (thisElement.className.indexOf("Hospital") > -1) {
                document.getElementById("error").innerHTML = "就诊医院不能为空";
            }
            if (thisElement.className.indexOf("RecordNumber") > -1) {
                document.getElementById("error").innerHTML = "病案号不能为空";
            }
            if (thisElement.className.indexOf("Birthday") > -1) {
                document.getElementById("error").innerHTML = "出生日期不能为空";
            }
            if (thisElement.className.indexOf("Nation") > -1) {
                document.getElementById("error").innerHTML = "民族不能为空";
            }
            if (thisElement.className.indexOf("Address") > -1) {
                document.getElementById("error").innerHTML = "地址不能为空";
            }
            if (thisElement.className.indexOf("Number1") > -1) {
                document.getElementById("error").innerHTML = "电话1格式不正确";
            }
            if (thisElement.className.indexOf("Number2") > -1) {
                document.getElementById("error").innerHTML = "电话2格式不正确";
            }
            if (thisElement.className.indexOf("height") > -1) {
                document.getElementById("error").innerHTML = "身高不能为空";
            }
            if (thisElement.className.indexOf("weight") > -1) {
                document.getElementById("error").innerHTML = "体重不能为空";
            }
            
        } else if (thisElement.nodeName == "SELECT") {
            document.getElementById("error").innerHTML = "请选择患病部位";
        }
        return false;
    }
    return true;
}
//根据classname做对应的各项检查
function CheckClassName(thisClassName, thisElement) {
    var returnClassName = "";
    switch (thisClassName) {
        case "":
            break;
        case "invalid":
            break;
        case "isEmpty"://判空
            if (isAllGood && (thisElement.value == "" ||thisElement.value == "请输入身份证号" || thisElement.value == "请输入姓名" || thisElement.value == "请输入就诊医院" || thisElement.value == "请输入病案号" || thisElement.value == "请选择出生日期" || thisElement.value == "请填写民族" || thisElement.value == "请填写地址" || thisElement.value == "请填写联系方式1"|| thisElement.value == "请填写联系方式2"|| thisElement.value == "请填写身高"|| thisElement.value == "请填写体重")) {
                returnClassName += "invalid ";
            }
            returnClassName += thisClassName;
            break;
        case "checkSex"://性别radio是否选择
            var sexRadios = document.getElementsByName("sex");
            if (isAllGood && !sexRadios[0].checked && !sexRadios[1].checked) {
                returnClassName += "invalid ";
            }
            returnClassName += thisClassName;
            break;
        case "SickPart"://办公室是否选择
            var sickSelect = document.getElementById("SickPart");
            if (isAllGood && sickSelect.selectedIndex == 0) {
                returnClassName += "invalid ";
            }
            returnClassName += thisClassName;
            break;
        case "Number1"://验证电话号码
            if (isAllGood && !checkPhone(thisElement)) {
                returnClassName += "invalid ";
            }
            returnClassName += thisClassName;
            break;
        case "Number2"://验证电话号码
            if (isAllGood && !checkPhone2(thisElement)) {
                returnClassName += "invalid ";
            }
            returnClassName += thisClassName;
            break;
        default:
            returnClassName += thisClassName;
            break;
    }
    return returnClassName;
}
function AlertLabel(thisNode) {
    if (thisNode.nodeName == "LABEL")
        thisNode.className += "invalid ";
}
//电话号码验证
function checkPhone(thisElement) {
    var strPhoneNumber = document.getElementById("Number1").value;
    var rep = /^(\d{3})\-?(\d{4})\-?(\d{4})$/;
    if (!rep.test(strPhoneNumber)) {
        return false;
    }
    return true;
}
function checkPhone2(thisElement) {
    var strPhoneNumber = document.getElementById("Number2").value;
    var rep = /^(\d{3})\-?(\d{4})\-?(\d{4})$/;
    if (!rep.test(strPhoneNumber)) {
        return false;
    }
    return true;
}
//电话号码格式规范
function phoneFormat() {
    var thisPhone = this.value;
    var rep = /^(\d{3})\-?(\d{4})\-?(\d{4})$/;
    if (rep.test(thisPhone)) {
        rep.exec(thisPhone);
        this.value = RegExp.$1 + "-" + RegExp.$2 + "-" + RegExp.$3;
    }
}
//reset时Input样式恢复
function resetInput(thisElement) {
    var allClassName = thisElement.className.split(" ");
    var resetClassName = "";
    for (var i = 0; i < allClassName.length; i++) {
        if (allClassName[i] != "invalid") {
            resetClassName += allClassName[i] + " ";
        }
    }
    thisElement.className = resetClassName;
}
//恢复样式（取消invalid）
function recoverClassName(thisElement) {
    var returnClassName = "";
    var className = thisElement.className.split(" ");
    for (var i = 0; i < className.length; i++) {
        if (className[i] != "invalid") {
            returnClassName += className[i] + " ";
        }
    }
    thisElement.className = returnClassName;
}