$(function () {
	$("#navlist>li").eq(10).addClass('active');
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
		$.post(host+'Home/Team/getTeamList',data,function(d){
			
			if(!d.status)return;
			if(userinfo.utype>3 && clean){
				$('.tt-list').empty();
				var z = `<div class="col-md-12 main-panel" style="margin-bottom:20px">
					<div class="btn-group t" role="group">`;
					z+=`<a type="button" class="btn btn-default p_tz">添加组</a>`;
					z+=`</div>
					</div>`;
				$(z).appendTo('.tt-list');
			}
			var pro = d.info.teams;
			if(!pro.length)return;
			if(userinfo.utype<4 && clean)$('.tt-list').empty();
			for(var r in pro){
				var z = `<div class="col-md-12 main-panel" style="margin-bottom:20px">
					<h4>${pro[r].tid}:${pro[r].tname}</h4>
					<div class="btn-group t" role="group">`;
					z+=`<a type="button" class="btn btn-default p_zy" href="/admin/team_user.shtml?tid-${pro[r].tid}">查看组员</a>`;
					z+=`<a type="button" class="btn btn-default p_mz" tid="${pro[r].tid}">修改名字</a>`;
					z+=`<a type="button" class="btn btn-default p_tj" tid="${pro[r].tid}">添加组员</a>`;
					if(userinfo.utype>3)z+=`<a type="button" class="btn btn-default p_de" tid="${pro[r].tid}">删除小组</a>`;
					z+=`</div>
					</div>`;
				$(z).appendTo('.tt-list');
			}
			adde();llt=1;

		},'json')

	}
	function adde(){
		$('.p_tz').unbind('click').bind('click',function(){
			var z= prompt('设定名字为：');
			if(z){
				$.post(host+'Home/Team/addTeam',{tname:z},function(d){
					if(d.status)location.reload();
					else alert(d.info)
				},'json');
			}
		});
		$('.p_de').unbind('click').bind('click',function(){
			var tid = $(this).attr('tid');
			var z= confirm('确认删除小组？');
			if(z){
				$.post(host+'Home/Team/deleteTeam',{tid:tid},function(d){
					if(d.status)location.reload();
					else alert(d.info)
				},'json');
			}
		});
		$('.p_mz').unbind('click').bind('click',function(){
			var tid = $(this).attr('tid');
			var z= prompt('修改名字为：');
			if(z){
				$.post(host+'Home/Team/changeTeamName',{tid:tid,tname:z},function(d){
					if(d.status)location.reload();
					else alert(d.info)
				},'json');
			}
		});

		$('.p_tj').unbind('click').bind('click',function(){
			var tid = $(this).attr('tid');
			var z= prompt('添加用户ID：');
			if(z){
				$.post(host+'Home/Team/addMember',{tid:tid,type:'uid',value:z},function(d){
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

