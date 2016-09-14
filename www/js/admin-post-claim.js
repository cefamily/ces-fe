$(function () {
	$("#navlist>li").eq(7).addClass('active');
	var work = {
			'fy':'翻译','ty':'图源','xt':'修图','qz':'嵌字'
		};

		$.post(host+'Home/Claim/getClaimedUser',{pid:GET.pid},function(d){
			if(!d.status)return;
			var pro = d.info.claims;
			if(!pro.length)return;
			$('.tt-list').empty();
			for(var r in pro){
				var t = [pro[r].ctype];
				for(var k in t){
					var z = `<div class="col-md-12 main-panel" style="margin-bottom:20px">
						<h4>${pro[r].nickname}(${pro[r].uname})<small> -${work[t[k]]}<em style="color:green">[`;
						z+=pro[r].cfinish!=0?'已完成':'未完成';
						z+=`]</em></small></h4>
						<div class="btn-group t" role="group">`;
						z+=`<a type="button" class="btn btn-success p_tg" uid="${pro[r].uid}" pid="${pro[r].pid}" ctype="${t[k]}">完成认领</a>`;
						z+=`<a type="button" class="btn btn-danger p_bh" uid="${pro[r].uid}" pid="${pro[r].pid}" ctype="${t[k]}">取消认领</a>`
						z+=`</div>
						</div>`;
					$(z).appendTo('.tt-list');


				}
				
			}
			adde();

		},'json');

	
	function adde(){
		$('.p_tg').unbind('click').bind('click',function(){
			var pid = $(this).attr('pid');
			var uid = $(this).attr('uid');
			var ctype = $(this).attr('ctype');
			if(confirm('确认完成认领？')){
				$.post(host+'Home/Claim/finishClaim',{pid:pid,uid:uid,ctype:ctype},function(d){
					if(d.status)location.reload();
					else alert(d.info)
				},'json');
			}
		});
		$('.p_bh').unbind('click').bind('click',function(){
			var pid = $(this).attr('pid');
			var uid = $(this).attr('uid');
			var ctype = $(this).attr('ctype');
			if(confirm('确认取消认领？')){
				$.post(host+'Home/Claim/cancelClaim',{pid:pid,uid:uid,ctype:ctype},function(d){
					if(d.status)location.reload();
					else alert(d.info)
				},'json');
			}
		})
	}




});

