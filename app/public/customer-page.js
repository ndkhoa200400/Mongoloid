$(document).ready(function(){
  $('.edit-btn').click(function(e) {
    e.stopPropagation();
    $(".info1").removeAttr('readonly');
    $('.submit-btn').prop('disabled', false);
    return false;
  });

  $('.edit-pass').click(function(e) {
    e.stopPropagation();
    if ($(".hoso").slice(-3).css('display') === "none"){
      $(".hoso").slice(-3).css("display", "block");
      $(".oldpass-check").attr("required", "true");
      $(".newpass").attr("required", "true");
    }
    else {
      $(".oldpass-check").removeAttr('required').val("");
      $(".newpass").removeAttr('required').val("");
      $(".hoso").slice(-3).css("display", "none");
      
    }
    return false;
  });

  $('.submit-btn').click(function(e) {
    e.stopPropagation();
    if ($(".hoso").slice(-2).css('display') === "none"){

    }
    else if ($(".alertpass").css("display") === "block"){
      return false;
    }
  });

  var checkpass = function(){
    var oldpass = $(".oldpass").val();
    var checkoldpass = $(".oldpass-check").val();
    if (oldpass != checkoldpass){
      $(".alertpass").css("display", "block");
      $(".oldpass-check").css("border", "1px solid black");
    }
    else{
      $(".alertpass").css("display", "none");
      $(".oldpass-check").css("border", "3px solid limegreen");
    }
  };

  setInterval (checkpass,2000);
});