function increase(num) {
    var number = 'number' + num;
    var newprice = 'newprice' + num;
    var value = parseInt(document.getElementById(number).value, 10);
    value++;
    document.getElementById(number).value = value;

    //cập nhật giá
    var str = document.getElementById(newprice).innerHTML;
    var price = str.substring(0, str.length - 4);
    var vnd = str.substring(str.length - 3, str.length);
    price = price.replace(/\,/g, "");
    price = parseInt(price, 10) / (value - 1) * value;
    price = formatStringtoNumber(price);
    document.getElementById(newprice).innerHTML = price + " " + vnd;
    tamtinh();
}

function decrease(num) {
    var number = 'number' + num;
    var newprice = 'newprice' + num;
    var value = parseInt(document.getElementById(number).value, 10);
    var flag = value;
    value--;
    if (value <= 1) value = 1;
    document.getElementById(number).value = value;

    //cập nhật giá
    if (value === 1 && flag === 1) return;
    var str = document.getElementById(newprice).innerHTML;
    var price = str.substring(0, str.length - 4);
    var vnd = str.substring(str.length - 3, str.length);
    price = price.replace(/\,/g, "");
    price = parseInt(price, 10) / (value + 1) * value;
    price = formatStringtoNumber(price);
    document.getElementById(newprice).innerHTML = price + " " + vnd;
    tamtinh();
}

function formatStringtoNumber(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x.replace(/,/g, ",");
}

function tamtinh(){
    var price = document.querySelectorAll(".valuePrice");
    var total = 0
    for (let index = 0; index < price.length; index++) {
        total += parseInt(price[index].innerHTML.replace(/\,/g, ""),10);
    }
    total = formatStringtoNumber(total);
    document.getElementById("tamtinh").innerHTML = total + " VNĐ";
    document.getElementById("thanhtien").innerHTML = total + " VNĐ";
}