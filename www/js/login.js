$(document).ready(function(){

  //初始化
  
  


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

  $(".img-captcha").bind('click',function(){
    $(".img-captcha").attr("src",window.host+"Home/Tool/captcha"+'?'+Math.random());
  }).click();

  $("#reg-btn").click(function(){
    var pwd1=$("#r-password").val().trim();
    var pwd2=$("#r-password2").val().trim();
    var username=$("#r-username").val().trim();
    var email=$("#r-email").val().trim();
    var captcha = $("#r-captcha").val();
    if(pwd1=="" || pwd2=="" || username==""){
      alert("请填写完整信息");
      return null;
    }
    if(pwd1!=pwd2) {
      alert("两次密码不一致");
      return null;
    }
    pwd1=CryptoJS.MD5(pwd1).toString();
    $.ajax({
      url: window.host + "Home/User/reg",
      type: "POST",
      dataType: "JSON",
      data: {"name": username, "password": pwd1, "captcha": captcha,"email":email},
      success: function (data) {
        $(".img-captcha").click();
        $("#r-captcha").val("");
        if(data.status==0){
          alert(data.info);
          return null;
        }else{
          $("#go-login-btn").click();
          alert("注册成功");
          $(".img-captcha").click();
          $("form input").val("");
        }
      },
      error: function (e) {
        console.log("ERROR!");
        console.log(e);
      }
    });
  });

  $("#login-btn").click(function() {
    var pwd = $("#l-password").val();
    var uname = $("#l-username").val();
    var captcha = $("#l-captcha").val();
    pwd=CryptoJS.MD5(pwd).toString();
    $.ajax({
      url: window.host + "Home/User/userLogin",
      type: "POST",
      dataType: "JSON",
      data: {"name": uname, "password": pwd, "captcha": captcha},
      success: function (data) {
        if(data.status==0){
          $(".img-captcha").click();
            alert(data.info);
            return null;
        }else{
          location.reload(true);
        }
      },
      error: function (e) {
        console.log("ERROR!");
        console.log(e);
      }
    });
  });
  //---------END-----------------
});
