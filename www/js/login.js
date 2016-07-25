$(document).ready(function(){

  //-----------页面切换--------------
  $('#go-reg-btn').click(function(){
    $("#login-panel").slideUp();
    $("#reg-panel").slideDown();
  });
  $('#go-login-btn').click(function(){
    $("#reg-panel").slideUp();
    $("#login-panel").slideDown();
  });
  //-----------END----------------

  //---------事件处理------------

  $("#reg-btn").click(function(){
    var pwd1=$("#r-password").val();
    var pwd2=$("#r-password2").val();
    var username=$("#r-username").val()
    if(pwd1.trim()=="" || pwd2.trim()=="" || username.trim()==""){
      alert("请填写完整信息");
      return null;
    }

  });
  $("#login-btn").click(function(){

  });
  //---------END-----------------
});
