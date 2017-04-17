/* ***********************************************************
 * FileName: chooseAllJS.js
 * Writer: peach
 * create Date: 2017-4-10
 * ReWriter:
 * Rewrite Date:
 * impact :
 * Root-information中全选人员功能
 * **********************************************************/

window.addEventListener("load", InitChooseAll, false);

function InitChooseAll() {
    document.getElementById("allRole").addEventListener("click", chooseAll, false);
    var allSelect = document.getElementsByName("role");
    for (var i = 0; i < allSelect.length; i++) {
        allSelect[i].addEventListener("click", cannelChooseAll, false);
    }
}

function chooseAll(evt) {
    if (this.checked == true) {
        var allSelect = document.getElementsByName("role");
        for (var i = 0; i < allSelect.length; i++) {
            allSelect[i].checked = true;
        }
    }
}

function cannelChooseAll(evt) {
    if (this.checked == false) {
        document.getElementById("allRole").checked = false;
    }
}