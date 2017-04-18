window.addEventListener("load", Init, false);
var obj;
function Init() {
    GetRole();
    createSelect();
    document.getElementById("login").addEventListener("click", TransferMain, false);//多角色登陆
}
//根据选择，跳转相应页面
function TransferMain() {
    var sel = document.getElementById("userRole");
    var index = sel.selectedIndex;
    var url = sel.options[index].value;
    window.location.replace("../" + url + "/" + url + "Main.aspx");
}
//ajax请求后端返回用户拥有的角色
function GetRole() {
    var xmlHttp = new XMLHttpRequest();
    var roles;
    var url = "changeRole.ashx";
    xmlHttp.open("GET", url, false);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
            roles = xmlHttp.responseText;
            obj = eval("(" + roles + ")");
        }
    }
    xmlHttp.send();
}
//根据json内容，生成选择角色的下拉菜单。如果没登录，跳转登录。
function createSelect() {
    var roles = obj.Roles;
    if (roles[0].Name == "false") {
        alert("请先登录");
        window.location.replace("Login.aspx");
    } else {
        var sel = document.getElementById("userRole");
        sel.options.length = 0;
        for (var i = 0; i < roles.length; i++) {
            sel.options[i] = new Option(roles[i].Name);
            sel.options[i].value = roles[i].Type;
        }
    }
}