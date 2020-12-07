$(document).ready(function(){
  $('.edit-btn').click(function(e) {
    e.stopPropagation();
    $(".info1").removeAttr('readonly');
    return false;
  });

  $('.edit-pass').click(function(e) {
    e.stopPropagation();
    if ($(".hoso").slice(-2).css('display') === "none"){
      $(".hoso").slice(-2).css("display", "block");
      $(".checkoldpass").attr("required", "true");
      $(".newpass").attr("required", "true");
    }
    else {
      $(".hoso").slice(-2).css("display", "none");
      $(".checkoldpass").attr("required", "false");
      $(".newpass").attr("required", "false");
    }
    return false;
  });

  $('.submit-btn').click(function(e) {
    e.stopPropagation();
    var oldpass = $(".oldpass").val();
    var checkoldpass = $(".oldpass-check").val();
    var newpass = $(".newpass").val();
    if ($(".hoso").slice(-2).css('display') === "none"){
    }
    else if (oldpass != checkoldpass){
      $(".alertpass").css("display", "block");
      return false;
    }
  });

});