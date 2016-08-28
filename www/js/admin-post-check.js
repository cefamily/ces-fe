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
	};
	function get(page,clean){
		llt=0;
		let data = {page:page,type:'state',value:0};
		$.post(host+'Home/Product/getAllProductList',data,function(d){
			
			if(!d.status)return;
			let pro = d.info.products;
			if(!pro.length)return;
			if(clean)$('.tt-list').empty();
			for(let r in pro){
				let z = `<div class="col-md-12 main-panel" style="margin-bottom:20px">
					<h4>${pro[r].pname}<small> -${pro[r].uname}<em style="color:green">[${status[pro[r].pstate]}]</em></small></h4>
					<div class="btn-group t" role="group">`;
					z+=`<a type="button" class="btn btn-success p_tg" pid="${pro[r].pid}">审核通过</a>`;
					z+=`<a type="button" class="btn btn-danger p_bh" pid="${pro[r].pid}">审核驳回</a>`
					z+=`</div>
					</div>`;
				$(z).appendTo('.tt-list');
			}
			adde();llt=1;

		},'json')

	}
	function adde(){
		$('.p_tg').unbind('click').bind('click',function(){
			let pid = $(this).attr('pid');
			if(confirm('确认通过？')){
				$.post(host+'Home/Product/changeProduct',{pid:pid,pstate:1},function(d){
					if(d.status)location.reload();
					else alert(d.info)
				},'json');
			}
		});
		$('.p_bh').unbind('click').bind('click',function(){
			let pid = $(this).attr('pid');
			if(confirm('确认驳回？')){
				$.post(host+'Home/Product/changeProduct',{pid:pid,pstate:-1},function(d){
					if(d.status)location.reload();
					else alert(d.info)
				},'json');
			}
		})
	}
	let ee = function(){
		if(llt)if($(document).height()-$(document).scrollTop()-$(window).height()<200)get(++page);
	}
	$(window).bind('scroll',ee);
	get(page,1);



});

