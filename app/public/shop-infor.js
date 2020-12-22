function switchingModifyMode() {
    const getTag = document.getElementById("form-input");
    const switching = document.getElementById("form-view");
    if (getTag.hidden) {
        getTag.hidden = "";
        switching.hidden = "on"
    }
    else {
        getTag.hidden = "on";
        switching.hidden = "";
    }
}