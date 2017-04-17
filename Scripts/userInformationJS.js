window.addEventListener("load", Init, false);

var obj;
var isAllGood;

function Init() {
    var phone = document.getElementById("contact");
    if (phone != null) {
        phone.addEventListener("blur", phoneFormat, false);
    }
    document.getElementById("showAdd").addEventListener("mousedown", showAdd, false);
    createRole();
    document.getElementById("addNewFrm").addEventListener("submit", checkAll, false);
    document.getElementById("phoneContact").addEventListener("blur", checkPhone, false);
    document.getElementById("userNumber").addEventListener("blur", checkNumber, false);
    document.getElementById("userPassword").addEventListener("blur", checkUserkey, false);
    document.getElementById("checkPassword").addEventListener("blur", checkRePswRight, false);
    document.getElementById("addNewFrm").addEventListener("reset", resetForm, false);
}


//电话号码格式规范
function phoneFormat() {
    var thisPhone = this.value;
    var rep = /^(\d{3})\-?(\d{4})\-?(\d{4})$/;
    if (rep.test(thisPhone)) {
        recoverClassName(this);
        rep.exec(thisPhone);
        this.value = RegExp.$1 + "-" + RegExp.$2 + "-" + RegExp.$3;
    } else {
        this.className += "invalid";
    }
}

function showAdd(evt) {
    var addArea = document.getElementById("addNewUser");
    var style = (addArea.currentStyle != undefined) ? addArea.currentStyle.display : window.getComputedStyle(addArea, null).display;
    if (style == "none") {//addArea.style.display == "none"  window.getComputedStyle(addArea, null).display == " none"
        this.value = "隐藏";
        addArea.style.display = "block";
    } else {
        this.value = "新增用户";
        addArea.style.display = "none";
    }
}

function createRole() {
    var roleArea = document.getElementById("hidePart");
    getAllRole();
    var role = obj.role;
    if (role[0].Name == "false") {
        roleArea.removeChild(roleArea.firstChild);
        var text = document.createTextNode("无角色");
        var Label = document.createElement("LABEL");
        span.appendChild(Label);//到这无角色时，下面写有角色时
    }
    //var allRoleText = document.createTextNode("所有角色");
    //var inputCheckBox = document.createElement("INPUT");
    //inputCheckBox.type = "checkbox";
    //inputCheckBox.id = "allRole";
    //var allRoleLabel = document.createElement("LABEL");
    //allRoleLabel.appendChild(inputCheckBox);
    //allRoleLabel.appendChild(allRoleText);
    //var allRoleLi = document.createElement("LI");
    //allRoleLi.appendChild(allRoleLabel);
    //roleArea.appendChild(allRoleLi);
    for (var i = 0; i < role.length; i++) {
        createDropDowmList(role[i],roleArea);
    }
}

function getAllRole() {
    var xmlHttp = new XMLHttpRequest();
    var url = "getAllRole.ashx";
    xmlHttp.open("GET", url, false);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            var json = xmlHttp.responseText;
            obj = eval("(" + json + ")");
        }
    }
    xmlHttp.send();
}

function createDropDowmList(role,roleArea){
    var roleNameString = document.createTextNode(role.Description);
    var span = document.createElement("SPAN");
    span.appendChild(roleNameString);
    var input = document.createElement("INPUT");
    //input.value = role.Name;
    input.title = role.Name;
    input.name = "role";
    input.type = "checkbox";
    var label = document.createElement("LABEL");
    label.appendChild(input);
    label.appendChild(span);
    li = document.createElement("LI");
    li.appendChild(label);
    roleArea.appendChild(li);
}

function checkAll(evt) {
    isAllGood = true;
    document.getElementById("error").innerHTML = "";
    var allElements = this.getElementsByTagName("*");
    for (var i = 0; i < allElements.length; i++) {
        if (!checkElement(allElements[i])) {
            isAllGood = false;
        }
    }
    if (!isAllGood) {
        evt.preventDefault();
    } else {
        recordRole();
    }
}

function checkElement(element) {
    var classNames = element.className.split(" ");
    var rclassName = "";
    for (var i = 0; i < classNames.length; i++) {
        rclassName += checkClassName(classNames[i],element) + " ";
    }
    element.className = rclassName;
    if (rclassName.indexOf("invalid") > -1) {
        if (element.nodeName == "Input" || element.nodeName == "SELECT") {
            element.select;
        }
        if (element.nodeName == "UL") {
            element.style.display = "list-item";
            document.getElementById('enableSeeSpan').className = "fa fa-angle-double-down";
        }
        var error = document.getElementById("error");
        switch (element.id) {
            case "userNumber":
                error.innerHTML = "请输入账号";
                break;
            case "userPassword":
                error.innerHTML = "请输入6-12位密码";
                break;
            case "checkPassword":
                error.innerHTML = "两次密码不同";
                break;
            case "name":
                error.innerHTML = "请输入姓名";
                break;
            case "phoneContact":
                error.innerHTML = "请输入正确的手机号码";
                break;
            case "officeSelect":
                error.innerHTML = "请选择办公室";
                break;
            case "hidePart":
                error.innerHTML = "请绑定角色";
                break;
        }
        return false;
    }
    return true;
}

function checkClassName(thisClassName,thisElement) {
    var backString = "";
    switch (thisClassName) {
        case "":
        case "invalid":
            break;
        case "IsEmpty":
            if (isAllGood && !checkEmpty(thisElement)) {
                backString += "invalid ";
            }
            backString += thisClassName;
            break;
        case "userKey":
            if(isAllGood && !checkKey(thisElement)){
                backString += "invalid ";
            }
            backString += thisClassName;
            break;
        case "checkPassword":
            if (isAllGood && !checkPassword(thisElement)) {
                backString += "invalid ";
            }
            backString += thisClassName;
            break;
        case "office":
            if (isAllGood && (thisElement.selectedIndex == 0)) {
                backString += "invalid ";
            }
            backString += thisClassName;
            break;
        case "checkRole":
            if (isAllGood && !checkRole(thisElement)) {
                backString += "invalid ";
            }
            backString += thisClassName;
            break;
        case "contact":
            if (isAllGood && !checkContact(thisElement)) {
                backString += "invalid ";
            }
            backString += thisClassName;
            break;
        default:
            backString += thisClassName;
        }
    return backString;
}

function checkEmpty(thisElement){
    if(thisElement.value == ""){
        return false;
    }
    return true;
}

function checkKey(thisElement){
    var psw = thisElement.value;
    var rep = /^\w{6,12}$/;
    return rep.test(psw);
}

function checkPassword(thisElement){
    var psw = document.getElementById("userPassword").value;
    return (thisElement.value == psw);
}

function checkRole(thisElement) {
    var roles = document.getElementsByName("role");
    var isCheck = false;
    for (var i = 0; i < roles.length; i++) {
        if (roles[i].checked == true) {
            isCheck = true;
        }
    }
    return isCheck;
}

function checkContact(thisElement) {
    var thisPhone = thisElement.value;
    var rep = /^(\d{3})\-?(\d{4})\-?(\d{4})$/;
    return rep.test(thisPhone);
}

function checkPhone() {
    var error = document.getElementById("error");
    error.innerHTML = "";
    recoverClassName(this);
    if (checkContact(this)) {
        var rep = /^(\d{3})\-?(\d{4})\-?(\d{4})$/;
        rep.exec(this.value);
        this.value = RegExp.$1 + "-" + RegExp.$2 + "-" + RegExp.$3;
    } else {
        error.innerHTML = "请输入正确的手机号码";
        this.className += " invalid";
    }
}

function recordRole() {
    var hidden = document.getElementById("selectedRole");
    var roles = document.getElementsByName("role");
    var seleced = "";
    for (var i = 0; i < roles.length; i++) {
        if (roles[i].checked == true) {
            seleced += roles[i].title + " ";
        }
    }
    hidden.value = seleced;
}

function recoverClassName(thisElement) {
    var thisClassNames = thisElement.className.split(" ");
    var backString = "";
    for (var i = 0; i < thisClassNames.length; i++) {
        if (thisClassNames[i] != "invalid") {
            backString += thisClassNames[i] + " ";
        }
    }
    thisElement.className = backString;
}

function checkNumber() {
    var error = document.getElementById("error");
    error.innerHTML = "";
    recoverClassName(this);
    var id = this.value;
    if (id == "") {
        error.innerHTML = "账号不能为空";
        this.className += " invalid";
        return false;
    }
    var xmlHttp = new XMLHttpRequest();
    var url = "../Main/CHeckRegeditUserName.ashx?userName=" + id;
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            var back = xmlHttp.responseText;
            if (back == "false") {
                error.innerHTML = "账号重复"
                document.getElementById("userNumber").className += " invalid";
            }
        }
    }
    xmlHttp.send();
}

function checkUserkey() {
    var error = document.getElementById("error");
    error.innerHTML = "";
    recoverClassName(this);
    if (!checkKey(this)) {
        error.innerHTML = "请输入6-12位密码";
        this.className += " invalid";
    }
}

function checkRePswRight() {
    var error = document.getElementById("error");
    error.innerHTML = "";
    recoverClassName(this);
    if (this.value != document.getElementById("userPassword").value) {
        error.innerHTML = "两次密码不同";
        this.className += " invalid";
    }
}

function resetForm(evt) {
    //所有提示清空
    document.getElementById("error").innerHTML = "";

    var allInput = this.getElementsByTagName("INPUT");
    for (var i = 0; i < allInput.length; i++) {
        if (allInput[i].className.indexOf("invalid") > -1) {
            recoverClassName(allInput[i]);//恢复Input样式
        }
    }
}