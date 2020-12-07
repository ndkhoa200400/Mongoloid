//Hàm kiểm tra nhập đầy đủ thông tin
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            var x = document.getElementById('alert');
            x.innerHTML = "*Chưa nhập đủ thông tin";
            event.preventDefault();
            event.stopPropagation();
            
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

  //Hàm tải ảnh lên
  var loadFile = function(event) {
    var file ="";
    var image = document.getElementById('image-container');
    //tạo ra số thẻ img bằng số img đọc lên
    var length = event.target.files.length;
    for (let i = 0; i < length; i++) {
        file += "<img id=\"output" + i + "\" />";
    }
    image.innerHTML = file;
    console.log(file);

    for (let i = 0; i < length; i++){
        var path = 'output' + i;
        console.log(path);
        image = document.getElementById(path);
        image.src = URL.createObjectURL(event.target.files[i]);
    }
};

