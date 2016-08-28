$(function () {
	let page = 1,llt=1,
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
		let data = {page:page};
		$.post(host+'Home/Team/getTeamList',data,function(d){
			
			if(!d.status)return;
			let pro = d.info.teams;
			if(!pro.length)return;
			if(clean)$('.tt-list').empty();
			for(let r in pro){
				let z = `<div class="col-md-12 main-panel" style="margin-bottom:20px">
					<h4>${pro[r].tid}:${pro[r].tname}</h4>
					<div class="btn-group t" role="group">`;
					z+=`<a type="button" class="btn btn-default p_zy" tid="${pro[r].tid}">查看组员</a>`;
					z+=`<a type="button" class="btn btn-default p_mz" tid="${pro[r].tid}">修改名字</a>`;
					z+=`<a type="button" class="btn btn-default p_tj" tid="${pro[r].tid}">添加组员</a>`;
					z+=`</div>
					</div>`;
				$(z).appendTo('.tt-list');
			}
			adde();llt=1;

		},'json')

	}
	function adde(){
		$('.p_mz').unbind('click').bind('click',function(){
			let tid = $(this).attr('tid');
			let z= prompt('修改名字为：');
			if(z){
				$.post(host+'Home/Team/changeTeam',{tid:tid,name:z},function(d){
					if(d.status)location.reload();
				},'json');
			}
		});

		$('.p_tj').unbind('click').bind('click',function(){
			let tid = $(this).attr('tid');
			let z= prompt('添加用户ID：');
			if(z){
				$.post(host+'Home/Team/addMember',{tid:tid,type:'uid',value:z},function(d){
					if(d.status)location.reload();
				},'json');
			}
		});
	}
	let ee = function(){
		if(llt)if($(document).height()-$(document).scrollTop()-$(window).height()<200)get(++page);
	}
	$(window).bind('scroll',ee);
	get(page,1);



});

