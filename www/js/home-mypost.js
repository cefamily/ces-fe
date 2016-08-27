"use strict";
$(function(){
	$("#navlist>li").removeClass('active');
	$("#navlist>li").eq(3).addClass('active');
    function flushinfo(data,m){
		//console.log(index);
		let month=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],d= new Date(parseInt(data.pctime)),status=[
			"<span class=\"label label-danger\">审核中</span>",
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
		]
		// ,work = {
		// 	'fy':'翻译','ty':'图源','xt':'修图','qz':'嵌字'
		// },works=[],ctypes = data.ctypes.split(',');
		// for(let d in ctypes)if(work[ctypes[d]])works.push(work[ctypes[d]]);
		// works = works.length?'担任：'+works.toString():'';
		let lr = $(`<div class="mission-block col-lg-6 col-sm-12">
                <div class="mission-block-in">
                    <div class="mission-info">
                        <h4>${data.pname}</h4>
                        <div class="label-box mission-info-z">
                            ${status[data.pstate]+imgtype[data.ptype]+pubstat[data.pteam]}
							<span class="label label-warning">
							<span class="glyphicon glyphicon-star"></span>${data.pup}</span>
						</div>
						
                        <div class="btn-group mission-action" role="group">
                            <a href="/CE/bookinfo.shtml?id-${data.pid}" type="button" class="btn btn-success t">查看详情</a>
                        </div>
                    </div>
                </div>
            </div>`);
		lr.appendTo('.missionList');
		if(!m[0].er)
			lr.find('.mission-block-in').css({'background-image':'linear-gradient(to right,rgba(255, 255, 255, 0) 0%,rgba(51,51,51,0.9) 20%,rgba(51,51,51,1) 30%,rgba(51,51,51,1) 100%),url('+data.pimg+')'});
	}

	let page=1,llt=0;
	$('.missionList').empty();
    let ou = function(p){
        llt=0;
        $.ajax({
			url:window.host+"Home/Product/getMyProductList",
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