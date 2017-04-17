/* ***********************************************************
 * FileName: rootMainJS.js
 * Writer: peach
 * create Date: 2017-4-9
 * ReWriter:peach
 * Rewrite Date:2017-4-10
 * impact :load事件增加了getUserName函数用来读取登录用户名写到右上角用户状态上在aspx里对应的<i>标签加了一个id
 * 实现内嵌标签页
 * **********************************************************/
window.addEventListener("load", Init, false);
var addTagArea;
var count;
function Init() {
    addTagArea = document.getElementById("targets");
    var menu = document.getElementById("menu");
    var allLinks = menu.getElementsByTagName("A");//获取菜单栏所有导航链接节点
    for (var i = 0; i < allLinks.length; i++) {
        if (allLinks[i].className != "parent") {
            allLinks[i].addEventListener("click", createTag, false);//创建标签窗口
        }
    }
    var button = addTagArea.getElementsByTagName("BUTTON");
    for (var i = 0; i < button.length; i++) {
        button[i].onclick = closePage;
    }

    document.getElementById('logout').addEventListener("click", userLogout, false);

    getUserName();//获取登陆用户的名字
}

function userLogout(evt) {
    window.location.replace("../Main/Login.aspx");
    evt.preventDefault();
}

function createTag(evt) {
    var iframe = createIframe(this.href);//创建iframe
    var thisUrl = this.href;
    var name = this.getElementsByTagName("SPAN")[0].innerHTML;//获取导航名作为标签页名
    var title = document.createTextNode(name);
    var textNode = document.createElement("SPAN");
    textNode.className = "tag-name";
    textNode.appendChild(title);
    var buttonNode = createButton(this);//创建关闭标签页按钮节点
    buttonNode.addEventListener("click", closePage, false);
    var urlNode = document.createElement("INPUT");//创建隐藏域节点记录url和次数
    urlNode.type = "Hidden";
    urlNode.value = thisUrl + " " + count;
    var tagNode = document.createElement("DIV");//标签
    tagNode.appendChild(buttonNode);
    tagNode.appendChild(textNode);
    tagNode.appendChild(urlNode);
    tagNode.targe = iframe.name;//指定iframe
    transferPage(thisUrl, iframe);
    tagNode.className = "targets choosed";
    addTagArea.appendChild(tagNode);
    addClickEvent();
    if (evt && evt.preventDefault)
        //因此它支持W3C的stopPropagation()方法
        evt.preventDefault();
    else
        //否则，我们需要使用IE的方式来取消事件冒泡 
        window.event.cancelBubble = true;
    return false;
}

function createButton(thisElement) {
    var text = document.createTextNode("×");
    var element = document.createElement("BUTTON");
    element.appendChild(text);
    element.className = "self-close close";
    return element;
}

function createIframe(url) {
    var iframeArea = document.getElementById("iframeArea");
    var iframe = document.createElement("IFRAME");
    count = 0;
    var currentIframe = iframeArea.getElementsByTagName("IFRAME");
    for (var i = 0; i < currentIframe.length; i++) {
        if (currentIframe[i].name == "ifm" + url + count)
            count++;
    }
    iframe.name = "ifm" + url + count;
    iframe.style.width = "100%";
    iframe.style.height = "950px";
    iframe.style.border = "0px";
    iframeArea.appendChild(iframe);
    return iframe;
}


function transferPage(thisUrl, iframe) {
    //var frm = document.getElementById("iframe");
    //frm.src = thisUrl;
    hideAllIframe();
    iframe.style.display = "block";
    iframe.src = thisUrl;
    var allTags = addTagArea.getElementsByTagName("DIV");
    for (var i = 0; i < allTags.length; i++) {
        if (allTags[i].className.indexOf("choosed") > -1) {
            removeChoosed(allTags[i]);
        }
    }
}

function hideAllIframe() {
    var ifms = document.getElementById("iframeArea").getElementsByTagName("IFRAME");
    for (var i = 0; i < ifms.length; i++) {
        ifms[i].style.display = "none";
    }
}
//移除className choosed
function removeChoosed(thisElement) {
    var classNames = thisElement.className.split(" ");
    var rClassName = "";
    for (var i = 0; i < classNames.length; i++) {
        if (classNames[i] != "choosed") {
            rClassName += classNames[i];
        }
    }
    thisElement.className = rClassName;
}

function closePage() {
    var tag = this.parentNode;
    var allTags = tag.parentNode.childNodes;
}

function changePage() {
    var allTags = addTagArea.getElementsByTagName("DIV");
    for (var i = 0; i < allTags.length; i++) {
        if (allTags[i].className.indexOf("choosed") > -1) {
            removeChoosed(allTags[i]);
        }
    }
    this.className += " choosed";
    hideAllIframe();
    var information = this.getElementsByTagName("INPUT")[0].value;
    var arr = information.split(" ");
    var url = arr[0];
    var num = arr[1];
    var ifms = document.getElementById("iframeArea").getElementsByTagName("IFRAME");
    for (var i = 0; i < ifms.length; i++) {
        if (ifms[i].name.indexOf(url + num) > -1) {
            ifms[i].style.display = "block";
            break;
        }
    }
}
//为标签页添加换页点击事件
function addClickEvent() {
    var tags = addTagArea.getElementsByTagName("DIV");
    for (var i = 0; i < tags.length; i++) {
        tags[i].addEventListener("click", changePage, false);
    }
}

function closePage(e) {
    var tag = this.parentNode;
    if (tag.className.indexOf("choosed") == -1) {
        clearIframe(tag);//清除对应iframe
        addTagArea.removeChild(tag);
        if (e && e.stopPropagation)
            //因此它支持W3C的stopPropagation()方法
            e.stopPropagation();
        else
            //否则，我们需要使用IE的方式来取消事件冒泡 
            window.event.cancelBubble = true;
        return false;
    }
    var preNodeCount = findprevious(tag);
    var alltags = addTagArea.getElementsByTagName("DIV");
    if (preNodeCount >= alltags.length) {
        clearIframe(tag);//清除对应iframe
        addTagArea.removeChild(tag);
        if (e && e.stopPropagation)
            //因此它支持W3C的stopPropagation()方法
            e.stopPropagation();
        else
            //否则，我们需要使用IE的方式来取消事件冒泡 
            window.event.cancelBubble = true;
        return false;
    }
    var preNode = alltags[preNodeCount];//获取上一个标签
    preNode.className += " choosed";//上一个标签被选中
    showPreviousPage(preNode);//显示选中标签内容
    clearIframe(tag);//清除对应iframe
    addTagArea.removeChild(tag);
    if (e && e.stopPropagation)
        //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
    else
        //否则，我们需要使用IE的方式来取消事件冒泡 
        window.event.cancelBubble = true;
    return false;
}

function findprevious(tag) {
    var allTags = addTagArea.getElementsByTagName("DIV");
    var j = -1;//记录上一个兄弟节点
    for (var i = 0; i < allTags.length; i++) {
        if (allTags[i] != tag) {
            j++;
        } else {
            break;
        }
    }
    if (j == -1) {
        j = 1;//自己是第一个则下一个顶上
    }
    return j;
}

function showPreviousPage(thisNode) {
    var information = thisNode.getElementsByTagName("INPUT")[0].value;
    var arr = information.split(" ");
    var url = arr[0];
    var num = arr[1];
    var ifms = document.getElementById("iframeArea").getElementsByTagName("IFRAME");
    for (var i = 0; i < ifms.length; i++) {
        if (ifms[i].name.indexOf(url + num) > -1) {
            ifms[i].style.display = "block";
            break;
        }
    }
}

function clearIframe(thisNode) {
    var information = thisNode.getElementsByTagName("INPUT")[0].value;
    var arr = information.split(" ");
    var url = arr[0];
    var num = arr[1];
    var ifms = document.getElementById("iframeArea").getElementsByTagName("IFRAME");
    for (var i = 0; i < ifms.length; i++) {
        if (ifms[i].name.indexOf(url + num) > -1) {
            ifms[i].parentNode.removeChild(ifms[i]);
            break;
        }
    }
}

function getUserName() {
    var xmlHttp = new XMLHttpRequest();
    var url = "GetUserName.ashx";
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {//正常响应
            if (xmlHttp.status == 200) {//正确接受响应数据
                var userName = xmlHttp.responseText;
                document.getElementById("user-name").innerHTML = userName;
            }
        }
    }
    xmlHttp.send();
}