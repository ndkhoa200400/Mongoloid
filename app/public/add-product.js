//Hàm kiểm tra nhập đầy đủ thông tin
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission

    $('.postProduct').on('click', function (e) {
      e.preventDefault()
      let isValid = true;
      var validation = Array.prototype.filter.call(forms, function (form) {

        if (form.checkValidity() === false) {
          var x = document.getElementById('alert');
          x.innerHTML = "*Chưa nhập đủ thông tin";

          isValid = false;
        }
        form.classList.add('was-validated');
        if (isValid) {
          form.submit()
          document.querySelector('.postProduct').innerHTML = (`<i class="fa fa-spinner fa-spin"></i> Đăng sản phẩm`)
        }
      });

    })
  }, false);
})();

//Hàm tải ảnh lên
var loadFile = function (event) {
  var file = "";
  var image = document.getElementById('image-container');
  //tạo ra số thẻ img bằng số img đọc lên
  var length = event.target.files.length;
  for (let i = 0; i < length; i++) {
    file += "<img id=\"output" + i + "\" />";
  }
  image.innerHTML = file;
  console.log(file);

  for (let i = 0; i < length; i++) {
    var path = 'output' + i;
    console.log(path);
    image = document.getElementById(path);
    image.src = URL.createObjectURL(event.target.files[i]);
  }
};
