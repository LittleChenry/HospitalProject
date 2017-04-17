window.addEventListener("load", Init, false);

function Init() {
    document.getElementById('enableSee').addEventListener("click", showHide, false);
}

function showHide(evt) {
    var hidePatr = document.getElementById("hidePart");
    if (hidePart.style.display == "none") {
        hidePart.style.display = "inline-block";
        document.getElementById('enableSeeSpan').className= "fa fa-angle-double-down";
    } else {
        hidePart.style.display = "none";
        document.getElementById('enableSeeSpan').className= "fa fa-angle-double-left";
    }
    evt.preventDefault();
}