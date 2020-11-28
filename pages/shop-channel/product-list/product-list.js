
function check(){
    var getCheckBox = document.querySelectorAll("[id='defaultCheck1']");
    for(var i = 0; i < getCheckBox.length; i++){
        getCheckBox[i].checked = true;
    }
}
function uncheck(){
    var getCheckBox = document.querySelectorAll("[id='defaultCheck1']");
    for(var i = 0; i < getCheckBox.length; i++){
        getCheckBox[i].checked = false;
    }
}