$(function () {
	$("#navlist>li").eq(7).addClass('active');
	var page = 1,llt=1,
	status ={
		'-1':'审核未通过',
		'0':'审核中',
        '1':"征集中",
        '3':"进行中",
        '5':"已完成",
		'98':'已删除',
		'99':'已清理'
	};
	function get(page,clean){
		llt=0;
		var data = {page:page};
		$.post(host+'Home/Product/getAllProductList',data,function(d){
			
			if(!d.status)return;
			var pro = d.info.products;
			if(!pro.length)return;
			if(clean)$('.tt-list').empty();
			for(var r in pro){
				var z = `<div class="col-md-12 main-panel" style="margin-bottom:20px">
					<h4>${pro[r].pname}<small> -${pro[r].nickname}(${pro[r].uname})<em style="color:green">[${status[pro[r].pstate]}]</em></small></h4>
					<div class="btn-group t" role="group">
					<a type="button" class="btn btn-default p_xg" href="/admin/post_admin.shtml?pid-${pro[r].pid}">修改详情</a>
					<a type="button" class="btn btn-default p_gl" href="/admin/post_claim.shtml?pid-${pro[r].pid}">职位管理</a>`;

					if(pro[r].pftime==0)z+=`<a type="button" class="btn btn-default p_wc" pid="${pro[r].pid}">完成项目</a>`;
					if(userinfo.utype>3)z+=`<a type="button" class="btn btn-default p_sc" pid="${pro[r].pid}">删除项目</a>`
					z+=`</div>
					</div>`;
				$(z).appendTo('.tt-list');
			}
			adde();llt=1;

		},'json')

	}
	function adde(){
		$('.p_wc').unbind('click').bind('click',function(){
			var pid = $(this).attr('pid');
			if(confirm('确认完成？')){
				$.post(host+'Home/Product/changeProduct',{pid:pid,pstate:5},function(d){
					if(d.status)location.reload();
					else alert(d.info)
				},'json');
			}
		});

		if(userinfo.utype>3)$('.p_sc').unbind('click').bind('click',function(){
			var pid = $(this).attr('pid');
			if(confirm('确认删除？')){
				$.post(host+'Home/Product/changeProduct',{pid:pid,pstate:98},function(d){
					if(d.status)location.reload();
					else alert(d.info)
				},'json');
			}
		})
	}
	var ee = function(){
		if(llt)if($(document).height()-$(document).scrollTop()-$(window).height()<200)get(++page);
	}
	$(window).bind('scroll',ee);
	get(page,1);



});

