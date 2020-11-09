
var counter=1;
function slidebar(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter>4){
        counter=1;
    }
    console.log(counter);
}
setInterval(slidebar, 4000);



