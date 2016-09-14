$(function () {
	$("#navlist>li").eq(10).addClass('active');
	var work = {
			'fy':'翻译','ty':'图源','xt':'修图','qz':'嵌字'
		};

		$.post(host+'Home/Team/getTeamInfo',{tid:GET.tid},function(d){
			if(!d.status)return;
			if(!d.info.member.length && !d.info.master.length)return;
			$('.tt-list').empty();
			var tid = d.info.team.tid;
			var pro = d.info.master;
			for(var r in pro){
				var z = `<div class="col-md-12 main-panel" style="margin-bottom:20px">
						<h4>${pro[r].nickname}(${pro[r].uname})<small><em style="color:green">[组长]</em></small></h4>
						<div class="btn-group t" role="group">`;
						if(userinfo.utype>3)z+=`<a type="button" class="btn btn-success p_cz" uid="${pro[r].uid}" tid="${tid}">撤销组长</a>`;
						if(userinfo.utype>3)z+=`<a type="button" class="btn btn-danger p_tc" uid="${pro[r].uid}" tid="${tid}">踢出小组</a>`
						z+=`</div>
						</div>`;
				$(z).appendTo('.tt-list');
			}
			pro = d.info.member;
			for(var r in pro){
				var z = `<div class="col-md-12 main-panel" style="margin-bottom:20px">
						<h4>${pro[r].nickname}(${pro[r].uname})<small><em style="color:green">[组员]</em></small></h4>
						<div class="btn-group t" role="group">`;
						if(userinfo.utype>3)z+=`<a type="button" class="btn btn-success p_sz" uid="${pro[r].uid}" tid="${tid}">设为组长</a>`;
						z+=`<a type="button" class="btn btn-danger p_tc" uid="${pro[r].uid}" tid="${tid}">踢出小组</a>`
						z+=`</div>
						</div>`;
				$(z).appendTo('.tt-list');
			}
			adde();

		},'json');

	
	function adde(){
		$('.p_cz').unbind('click').bind('click',function(){
			var uid = $(this).attr('uid');
			var tid = $(this).attr('tid');
			if(confirm('确认撤销组长？')){
				$.post(host+'Home/Team/delMaster',{tid:tid,type:'uid',value:uid},function(d){
					if(d.status)location.reload();
					else alert(d.info)
				},'json');
			}
		});
		$('.p_sz').unbind('click').bind('click',function(){
			var uid = $(this).attr('uid');
			var tid = $(this).attr('tid');
			if(confirm('确认设为组长？')){
				$.post(host+'Home/Team/addMaster',{tid:tid,type:'uid',value:uid},function(d){
					if(d.status)location.reload();
					else alert(d.info)
				},'json');
			}
		});
		$('.p_tc').unbind('click').bind('click',function(){
			var uid = $(this).attr('uid');
			var tid = $(this).attr('tid');
			if(confirm('确认提出小组？')){
				$.post(host+'Home/Team/delMember',{tid:tid,type:'uid',value:uid},function(d){
					if(d.status)location.reload();
					else alert(d.info)
				},'json');
			}
		});
	}




});

