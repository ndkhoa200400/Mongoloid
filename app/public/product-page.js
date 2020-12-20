const { $where } = require("../model/user.model");

function increase() {
    var value = parseInt(document.getElementById('number').value, 10);
    value++;
    document.getElementById('number').value = value;

    //cập nhật giá mới
    var str = document.getElementById('newprice').innerHTML;
    var price = str.substring(0, str.length - 4);
    var vnd = str.substring(str.length - 3, str.length);
    price = price.replace(/\,/g, "");
    price = parseInt(price, 10) / (value - 1) * value;
    price = formatStringtoNumber(price);
    document.getElementById('newprice').innerHTML = price + " " + vnd;
    //cập nhật giá cũ
    var str = document.getElementById('oldprice').innerHTML;
    if (str){
        var price = str.substring(0, str.length - 4);
        var vnd = str.substring(str.length - 3, str.length);
        price = price.replace(/\,/g, "");
        price = parseInt(price, 10) / (value - 1) * value;
        price = formatStringtoNumber(price);
        document.getElementById('oldprice').innerHTML = price + " " + vnd;
        console.log("Asd");
    }
}

function decrease() {
    var value = parseInt(document.getElementById('number').value, 10);
    var flag = value;
    value--;
    if (value <= 1) value = 1;
    document.getElementById('number').value = value;

    //cập nhật giá mới
    if (value === 1 && flag === 1) return;
    var str = document.getElementById('newprice').innerHTML;
    var price = str.substring(0, str.length - 4);
    var vnd = str.substring(str.length - 3, str.length);
    price = price.replace(/\,/g, "");
    price = parseInt(price, 10) / (value + 1) * value;
    price = formatStringtoNumber(price);
    document.getElementById('newprice').innerHTML = price + " " + vnd;
    //cập nhật giá cũ
    if (str){
        if (value === 1 && flag === 1) return;
        var str = document.getElementById('oldprice').innerHTML;
        var price = str.substring(0, str.length - 4);
        var vnd = str.substring(str.length - 3, str.length);
        price = price.replace(/\,/g, "");
        price = parseInt(price, 10) / (value + 1) * value;
        price = formatStringtoNumber(price);
        document.getElementById('oldprice').innerHTML = price + " " + vnd;
    }
}

function formatStringtoNumber(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x.replace(/,/g, ",");
}

