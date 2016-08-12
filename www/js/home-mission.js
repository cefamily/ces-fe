"use strict";
$(function(){
    function flushinfo(data,m){
		//console.log(index);
		let month=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],d= new Date(parseInt(data.pctime)),status=[
			"<span class=\"label label-danger\">征集中</span>",
			"<span class=\"label label-info\">进行中</span>",
			"<span class=\"label label-success\">已完成</span>"
		],imgtype=[
			"<span class=\"label label-warning\">网源</span>",
			"<span class=\"label label-success\">自扫</span>",
			"<span class=\"label label-danger\">暂无图源</span>"
		],pubstat=[
			"<span class=\"label label-success\">公开</span>",
			"<span class=\"label label-danger\">限制组</span>"
		],lr = $(`<div class="mission-block col-lg-6 col-sm-12">
                <div class="mission-block-in">
                    <div class="mission-info">
                        <h4>自动认领测试1</h4>
                        <div class="label-box mission-info-z">
                            ${status[data.pstate-1]+imgtype[data.ptype]+pubstat[data.pteam]}
							<span class="label label-warning"><span class="glyphicon glyphicon-star"></span>${data.pup}</span>
                        </div>
                        <div class="btn-group mission-action" role="group">
                            <a href="/CE/progress.shtml?id-${data.pid}" type="button" class="btn btn-success t">更新进度</a>
                        </div>
                    </div>
                </div>
            </div>`);
		lr.appendTo('.missionList');
	}

	let page=1,llt=0;
	$('.missionList').empty();
    let ou = function(p){
        llt=0;
        $.ajax({
			url:window.host+"Home/Product/getMyClaimProduct",
			type:"POST",
			dataType:"JSON",
			data:{page:p},
			success:function(data){
                let imgs=[];
				console.log(data);
				if(!data.status){
					$(window).unbind('scroll',ee);
					console.error(data.info);return
				}
				if(!data.info || !data.info.products || typeof data.info.products != 'object'){
					$(window).unbind('scroll',ee);
					console.error('ERROR DATA');return;
				}
				if(!window.loadPic){
					$(window).unbind('scroll',ee);
					console.error('NOT LOADED STRAIGHT.JS');return;
				}
				let p = data.info.products;
				if(!p.length)$(window).unbind('scroll',ee);
				for(let d in p){
					imgs.push(
						{
							src:p[d].pimg,
							callback:function(m,k){
								flushinfo(p[d],$(m))
							}
						}
					);
					
				}
				loadPic(imgs,()=>{
					llt = 1;
				});
				
			},
			error:function(e){
				console.log(e);
			}
		});
    }
	ou(page);
	let ee = function(){
		if(llt)if((document.documentElement.offsetHeight || $('body').height())-(document.documentElement.scrollTop || $('body').scrollTop())-$(window).height()<$('.thumbnail img.img-panel').height()+200)ou(++page);
		
	}
	$(window).bind('scroll',ee);
});