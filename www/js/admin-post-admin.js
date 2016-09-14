$(function () {
	$("#navlist>li").eq(7).addClass('active');
	$.post(host+'Home/Product/getProductByPid',{pid:GET.pid},function(d){
		if(!d.status){
			alert(d.info);
			return
		}
		for(let z in d.info){
			$('[name='+z+']').val(d.info[z]).focus();
		}
		$('.cs-options [data-value='+d.info.pstate+']').click().click();
		

	},'json')
	$('#push-btn').bind('click',function(){
		let s = $('form').serialize();
		$.post(host+'Home/Product/changeProduct',s,function(d){
			if(!d.status){
				alert('修改失败');return
			}else{
				alert('修改成功');
				location = '/CE/bookinfo.shtml?id-'+GET.pid
			}
		},'json')
	})

});

