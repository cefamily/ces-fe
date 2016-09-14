$(function() {

    // -----初始化--------
    $("#navlist>li").removeClass('active');
    $("#navlist>li").eq(5).addClass('active');
    getUserInfo();

    // ----------事件处理----------


    $(".img-captcha").bind('click',function(){
        $(".img-captcha").attr("src",window.host+"Home/Tool/captcha"+'?'+Math.random());
    }).click();

    $("#changeEmail").click(function(event) {
        let email = $("#email").val().trim();
        let nickname = $("#nickname").val().trim();
        let captcha = $("#e-captcha").val().trim();
        if (email == "" || nickname == "" || captcha == "") {
            alert("请填写完整");
            return null;
        }
        console.log(captcha);
        $.ajax({
            url: window.host + 'Home/User/changeEmail',
            type: 'POST',
            dataType: 'JSON',
            data: { 'email': email,nickname:nickname ,'captcha': captcha },
            success: function(data) {
                if (data.status == 1) {
                    alert("修改成功");
                    $.getJSON(window.host+'Home/User/getMyInfo',function(d){
                        if(d.status){
                            localStorage.login=1;
                            localStorage.userinfo=JSON.stringify(d.info[0]);
                            window.document.cookie = "userinfo="+btoa(localStorage.userinfo)+';Path=/';
                            location.reload(true);
                        }
                    });
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
    $.ajax({
        url: window.host + 'Home/User/getMyInfo',
        type: 'POST',
        dataType: 'JSON',
        success: function(data) {
            console.log(data);
            if (data.status == 1) {
                let info = data.info;
                $("#email").val(info[0].uemail);
                $("#nickname").val(info[0].nickname);
            } else {
                console.error("未登录");
            }

        },
        error: function(e) {
            console.log(e);
        }
    });
}
