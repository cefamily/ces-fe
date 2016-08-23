$(function() {

    // -----初始化--------
    $(".img-captcha").attr("src", window.host + "Home/Tool/captcha");
    getUserInfo();

    // ----------事件处理----------

    $(".img-captcha").click(function() {
        $(".img-captcha").attr("src", window.host + "Home/Tool/captcha");
    });

    $("#changeEmail").click(function(event) {
        let email = $("#email").val().trim();
        let captcha = $("#e-captcha").val().trim();
        if (email == "" || captcha == "") {
            alert("请填写完整");
            return null;
        }
        console.log(captcha);
        $.ajax({
            url: window.host + 'Home/User/changeEmail',
            type: 'POST',
            dataType: 'JSON',
            data: { 'email': email, 'captcha': captcha },
            success: function(data) {
                if (data.status == 1) {
                    alert("修改成功");
                    getUserInfo();
                }else{
                	alert(data.info);
                }
                $(".img-captcha").click();
                $("#e-captcha").val("");
            },
            error: function(e) {
                console.log(e.responseText);
            }
        });

    });

    $("#changePass").click(function(event) {
    	let old=$("#old").val().trim();
    	let new1=$("#new1").val().trim();
    	let new2=$("#new2").val().trim();
    	let captcha=$("#p-captcha").val().trim();

    	if(old=="" || new1=="" || new2==""|| captcha==""){
    		alert("请填写完整");
    		return null;
    	}

    	if(new1!=new2){
    		alert("两次密码输入不一致");
    	}
    	let pass =CryptoJS.MD5(new1).toString();
    	let oldpass=CryptoJS.MD5(old).toString();
    	$.ajax({
    		url: window.host+'Home/User/changePassword',
    		type: 'POST',
    		dataType: 'JSON',
    		data: {'newpassword':pass,'password':oldpass,'captcha':captcha},
    		success:function(data){
    			console.log(data);
    			if(data.status==1){
    				alert("修改成功");
    			}else{
    				alert(data.info);
    			}
    			$("#password input").val('');
    			$(".img-captcha").click();
    		},
    		error:function(e){
    			console.log(e.responseText);
    		}
    	});

    });

});

function getUserInfo() {
    let z;
    eval('z = '+localStorage.userinfo);
    $("#email").val(z.uemail);
}
