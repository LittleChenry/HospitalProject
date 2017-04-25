/* ***********************************************************
 * FileName: rootMainJS.js
 * Writer: peach
 * create Date: 2017-4-9
 * ReWriter:peach
 * Rewrite Date:2017-4-10
 * impact :load事件增加了getUserName函数用来读取登录用户名写到右上角用户状态上在aspx里对应的<i>标签加了一个id
 * 实现内嵌标签页
 * **********************************************************/
window.onresize = function () {
    //alert("pagechanged!");
    var tabs = document.getElementsByClassName("targets");
    chooseLeftAndRight(tabs);

}

window.addEventListener("load", Init, false);
var addTagArea;
var count;
var currentdate = dateformate(new Date());
document.getElementById("current-date").innerHTML = currentdate;
var divHeight = windowHeight() - 45;
document.getElementById("main-frame").style.minHeight = divHeight + "px";

function windowHeight() {
    var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
    height = height - 50;
    return height;
}

function CreateMoveButton() {
    var moveLeft = document.getElementById("move-left");
    moveLeft.addEventListener("click", LeftMoved, false);
    var moveRight = document.getElementById("move-right");
    moveRight.addEventListener("click", RightMoved, false);
}

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


function dateformate(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '年' + m + '月' + d + '日';
};

function createTag(evt) {
    if (this.className != undefined && this.className == "yes") {
        changeToThisPage(this);
        if (evt && evt.preventDefault)
            //因此它支持W3C的stopPropagation()方法
            evt.preventDefault();
        else
            //否则，我们需要使用IE的方式来取消事件冒泡 
            window.event.cancelBubble = true;
        return false;
    } else if (this.className != undefined && this.className == "no") {
        this.className = "yes";
    }
    var iframe = createIframe(this.href);//创建iframe
    var thisUrl = this.href;
    var name = this.getElementsByTagName("SPAN")[0].innerHTML;//获取导航名作为标签页名
    var title = document.createTextNode(name);
    var textNode = document.createElement("a");
    textNode.href = "javascript:;";
    textNode.className = "tag-name";
    textNode.style = "text-decoration:none;";
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

function changeToThisPage(link) {
    //找到自己的iframe
    var iframes = document.getElementsByTagName("IFRAME");
    var thisIframe;
    for (var i = 0; i < iframes.length; i++) {
        if (iframes[i].name.indexOf(link.href) > -1) {
            thisIframe = iframes[i];
            break;
        }
    }
    hideAllIframe();
    thisIframe.style.display = "block";
    var allTags = addTagArea.getElementsByTagName("DIV");
    for (var i = 0; i < allTags.length; i++) {
        if (allTags[i].className.indexOf("choosed") > -1) {
            removeChoosed(allTags[i]);
        }
    }
    var span = addTagArea.getElementsByTagName("a");
    for (var i = 0; i < span.length; i++) {
        if (span[i].innerHTML == link.getElementsByTagName("SPAN")[0].innerHTML) {
            span[i].parentNode.className += " choosed";
            break;
        }
    }
}

function chooseLeftAndRight(tabs) {
    oldTabs = findLeftRightChoosed(tabs);
    removeLeftAndRight(tabs);
    var totalLength = 0;
    var tempLength;
    var pageWidth = document.body.clientWidth;
    var tabsMax = pageWidth - 290;
    var leftIndex = oldTabs[0];
    var rightIndex = oldTabs[1];
    var choosedIndex = oldTabs[2];
    var flag = 0;
    //alert(leftIndex + "" + choosedIndex + "" + rightIndex);
    for (var i = leftIndex; i < tabs.length; i++) {
        if (flag == 1) {
            break;
        }
        totalLength += tabs[i].offsetWidth;
        if (totalLength > tabsMax) {
            if (i - 1 < choosedIndex) {
                rightIndex = choosedIndex;
                tempLength = 0;
                for (var j = choosedIndex; j > 0; j--) {
                    tempLength += tabs[j].offsetWidth;
                    if (tempLength > tabsMax) {
                        leftIndex = j + 1;
                        flag = 1;
                        break;
                    } else {
                        leftIndex = j;
                    }
                }
                flag = 1;
                break;
            } else {
                rightIndex = i - 1;
                tempLength = 0;
                for (var j = rightIndex; j > 0; j--) {
                    tempLength += tabs[j].offsetWidth;
                    if (tempLength > tabsMax) {
                        leftIndex = j + 1;
                        flag = 1;
                        break;
                    } else {
                        leftIndex = j;
                    }
                }
            }
        } else {
            rightIndex = choosedIndex;
        }
    }
    tabs[leftIndex].className += " left";
    tabs[rightIndex].className += " right";
    adjustLeftAndRight(leftIndex, rightIndex, tabs);
}

function adjustLeftAndRight(left, right, tabs) {
    for (var i = 0; i < tabs.length; i++) {
        if (i < left) {
            tabs[i].style.display = "none";
        } else {
            if (i > right) {
                tabs[i].style.display = "none";
            } else {
                if (tabs[i].style.display == "none") {
                    tabs[i].style.display = "";
                }
            }
        }
    }
}

function LeftMoved() {
    var totalLength = 0;
    var leftIndex = 0;
    var rightIndex;
    var pageWidth = document.body.clientWidth;
    var tabsMax = pageWidth - 290;
    var tabs = document.getElementsByClassName("targets");
    for (var i = 0; i < tabs.length; i++) {
        if (isClass("left", tabs[i])) {
            if (i > 0) {
                removeClass("left", tabs[i]);
                tabs[i - 1].className += " left";
                tabs[i - 1].style.display = "";
                leftIndex = i - 1;
            } else {
                alert("前面没有标签页了!");
                break;
            }
        }
    }
    for (var i = leftIndex; i < tabs.length; i++) {
        totalLength += tabs[i].offsetWidth;
        if (totalLength > tabsMax) {
            rightIndex = i - 1;
            removeClass("right", tabs[findLeftRightChoosed(tabs)[1]]);
            tabs[rightIndex].className += " right";
            adjustLeftAndRight(leftIndex, rightIndex, tabs);
            break;
        }
    }
}

function RightMoved() {
    var tabs = document.getElementsByClassName("targets");
    var totalLength = 0;
    var leftIndex;
    var rightIndex = tabs.length - 1;
    var pageWidth = document.body.clientWidth;
    var tabsMax = pageWidth - 290;
    for (var i = tabs.length - 1; i > 0; i--) {
        if (isClass("right", tabs[i])) {
            if (i < tabs.length - 1) {
                removeClass("right", tabs[i]);
                tabs[i + 1].className += " right";
                tabs[i + 1].style.display = "";
                rightIndex = i + 1;
            } else {
                alert("后面没有标签页了!");
                break;
            }
        }
    }
    for (var i = rightIndex; i > 0; i--) {
        totalLength += tabs[i].offsetWidth;
        //alert(totalLength + " " + tabsMax);
        if (totalLength > tabsMax) {
            leftIndex = i + 1;
            removeClass("left", tabs[findLeftRightChoosed(tabs)[0]]);
            tabs[leftIndex].className += " left";
            //alert(leftIndex + " " + rightIndex);
            adjustLeftAndRight(leftIndex, rightIndex, tabs);
            break;
        }
    }
}


function findLeftRightChoosed(tabs) {
    var LR = [0, tabs.length - 1, 0];
    for (var i = 0; i < tabs.length; i++) {
        if (isClass("left", tabs[i])) {
            LR[0] = i;
        }
        if (isClass("right", tabs[i])) {
            LR[1] = i;
        }
        if (isClass("choosed", tabs[i])) {
            LR[2] = i;
        }
    }
    return LR;

}

function removeLeftAndRight(tabs) {
    var leftTab = getByClass(tabs, "left");
    removeClass("left", leftTab[0]);
    var rightTab = getByClass(tabs, "right");
    removeClass("right", rightTab[0]);
}

function isClass(sClass, element) {
    var k = 0;
    var arr = element.className.split(" ");
    for (var j = 0; j < arr.length; j++) {
        /*判断拆分后的数组中有没有满足的class*/
        if (arr[j] == sClass) {
            k = 1;
        }
    }
    if (k == 0) {
        return false;
    } else {
        return true;
    }
}

function getByClass(tabs, sClass) {
    var aResult = [];
    for (var i = 0; i < tabs.length; i++) {
        var arr = tabs[i].className.split(" ");
        for (var j = 0; j < arr.length; j++) {
            /*判断拆分后的数组中有没有满足的class*/
            if (arr[j] == sClass) {
                aResult.push(tabs[i]);
            }
        }
    }
    return aResult;
};

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
    var divHeight = document.getElementById("page-wrapper").offsetHeight-40;
    iframe.name = "ifm" + url + count;
    iframe.style.width = "100%";
    iframe.style.minHeight = divHeight+"px";
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
function removeClass(rClass, thisElement) {
    var classNames = thisElement.className.split(" ");
    var rClassName = classNames[0];
    for (var i = 1; i < classNames.length; i++) {
        if (classNames[i] != rClass) {
            var temp = "";
            temp = " " + classNames[i];
            rClassName += temp;
        }
    }
    thisElement.className = rClassName;
}
//移除className choosed
function removeChoosed(thisElement) {
    var classNames = thisElement.className.split(" ");
    var rClassName = "";
    for (var i = 0; i < classNames.length; i++) {
        if (classNames[i] != "choosed") {
            rClassName += classNames[i] + " ";
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
    var url = this.parentNode.getElementsByTagName("INPUT")[0].value;
    var currentLink;
    var links = document.getElementById('side-menu').getElementsByTagName("A");
    for (var i = 0; i < links.length; i++) {
        if (url.indexOf(links[i].href) > -1) {
            currentLink = links[i];
            break;
        }
    }
    if (currentLink.className != undefined && currentLink.className == "yes") {
        currentLink.className = "no";
    }
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