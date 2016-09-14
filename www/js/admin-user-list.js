$(function () {
	$("#navlist>li").eq(9).addClass('active');
	var page = 1,llt=1,
	status ={
		'-1':'审核未通过',
		'0':'审核中',
        '1':"征集中",
        '3':"进行中",
        '5':"已完成",
		'98':'已删除',
		'99':'已清理'
	},utype ={
		'0':'未登录',
        '1':"普通用户",
        '2':"组成员",
        '3':"管理员",
		'4':'超级管理员',
	};
	function get(page,clean){
		llt=0;
		var data = {page:page};
		$.post(host+'Home/User/getUserList',data,function(d){
			
			if(!d.status)return;
			var pro = d.info.users;
			if(!pro.length)return;
			if(clean)$('.tt-list').empty();
			for(var r in pro){
				var z = `<div class="col-md-12 main-panel" style="margin-bottom:20px">
					<h4>${pro[r].uid}:${pro[r].nickname}(${pro[r].uname})<small> -${pro[r].uemail}<em style="color:green">[${utype[pro[r].utype]}]</em></small></h4>
					<div class="btn-group t" role="group">`;
					z+=`<a type="button" class="btn btn-default p_yx" uid="${pro[r].uid}">修改邮箱</a>`;
					z+=`<a type="button" class="btn btn-default p_ma" uid="${pro[r].uid}">修改密码</a>`
					z+=`</div>
					</div>`;
				$(z).appendTo('.tt-list');
			}
			adde();llt=1;

		},'json')

	}
	function adde(){
		$('.p_yx').unbind('click').bind('click',function(){
			var uid = $(this).attr('uid');
			var email= prompt('修改邮箱为：');
			if(email){
				$.post(host+'Home/User/changeUserEmail',{uid:uid,email:email},function(d){
					if(d.status)location.reload();
					else alert(d.info)
				},'json');
			}
		});

		$('.p_ma').unbind('click').bind('click',function(){
			var uid = $(this).attr('uid');
			var z= prompt('修改密码为：');
			if(z){
				z=CryptoJS.MD5(z).toString();
				$.post(host+'Home/User/changeUserPassword',{uid:uid,password:z},function(d){
					if(d.status)location.reload();
					else alert(d.info)
				},'json');
			}
		});
	}
	var ee = function(){
		if(llt)if($(document).height()-$(document).scrollTop()-$(window).height()<200)get(++page);
	}
	$(window).bind('scroll',ee);
	get(page,1);



});

