$(function () {
	$("#navlist>li").removeClass('active');
	$("#navlist>li").eq(1).addClass('active');
	var pnum = 0;
	function flushinfo(dat,m,box){
		//console.log(index);
		var data = dat[pnum++];
		var month=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],d= new Date(parseInt(data.pctime*1000)),status={
			'-1':"<span class=\"label label-danger\">审核中</span>",
			'0':"<span class=\"label label-danger\">审核中</span>",
			'1':"<span class=\"label label-danger\">征集中</span>",
			'2':"<span class=\"label label-danger\">待定</span>",
			'3':"<span class=\"label label-info\">进行中</span>",
			'5':"<span class=\"label label-success\">已完成</span>"
		},imgtype=[
			"<span class=\"label label-warning\">网源</span>",
			"<span class=\"label label-success\">自扫</span>",
			"<span class=\"label label-danger\">暂无图源</span>"
		],pubstat=[
			"<span class=\"label label-success\">公开</span>",
			"<span class=\"label label-danger\">限制组</span>"
		],lr = $(`<div class="mission-block">
					<div class="col-md-12 comic-box">
						<div class="thumbnail">
							<a href="/CE/bookinfo.shtml?id-${data.pid}">
								<div class="conpa">
									<div>
										<span style="font-size:20px;">${d.getDate()}</span><br>
										${month[d.getMonth()]}
									</div>
								</div>
								<!--img-->
							</a>
						</div>
						<div class="caption img-text-panel" data-toggle="tooltip"
								title="${data.pname}">${data.pname}
						</div>
						<div class="label-box">
							${status[data.pstate]+imgtype[data.ptype]+pubstat[data.pteam]}
							<span class="label label-warning"><span class="glyphicon glyphicon-star"></span>${data.pup}</span>
						</div>
					</div>
				</div>`);
			m.addClass('img-panel');
			if(!m[0].er)lr.find('.conpa').after(m);
			else{
				lr.find('.conpa').after('<img src="/img/noimage.jpg">');
			}
			lr.appendTo('cache-mission-block');
			if(box.length==1){
				lr.appendTo('#col1');
				box[0] += lr.height();
				
			}else if(box.length==2){
				if(box[0]<=box[1]){
					lr.appendTo('#col1');
					box[0] += lr.height();
					
				}else{
					lr.appendTo('#col2');
					box[1] += lr.height();
					
				}
			}else if(box.length==3){
				if(box[0]<=box[1]){
					if(box[0]<=box[2]){
						lr.appendTo('#col1');
						box[0] += lr.height();
						
					}else{
						lr.appendTo('#col3');
						box[2] += lr.height();
						
					}
				}else{
					if(box[1]<=box[2]){
						lr.appendTo('#col2');
						box[1] += lr.height();
						
					}else{
						lr.appendTo('#col3');
						box[2] += lr.height();
					}
				}
			}
			// console.log(box,lr.height());
			// window.zzz=lr;
			

	}

	var box = [0,0,0],imgss=[],ki,page=1,llt=0;
	$('#col1,#col2,#col3').empty();
	if($('#col2').css('display')=='none')box=[0];
	else if($('#col3').css('display')=='none')box=[0,0];
	
	var ou = function(p){
		llt = 0;
		var imgs = [];
		$.ajax({
			url:window.host+"Home/Product/getMyCanClaimProduct",
			type:"POST",
			dataType:"JSON",
			data:{page:p},
			success:function(data){
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
				var p = data.info.products,pnum = 0;
				if(!p.length)$(window).unbind('scroll',ee);
				for(var d in p){
					imgs.push(
						{
							src:p[d].pimg,
							callback:function(m,k){
								ki=k;flushinfo(p,$(m),box)
							}
						}
					);
					imgss.push(
						{
							src:p[d].pimg,
							callback:function(m,k){
								ki=k;flushinfo(p,$(m),box)
							}
						}
					)
				}
				loadPic(imgs,function(){
					llt = 1;
				});
				
			},
			error:function(e){
				console.log(e);
			}
		});
	}
	ou(page);
	$(window).unbind('resize').bind('resize',function(){
		var box2 = [0,0,0];
		if($('#col2').css('display')=='none')box2=[0];
		else if($('#col3').css('display')=='none')box2=[0,0];
		if(box2.length!=box.length){
			box = box2;
			if(ki)ki.clean();
			$('#col1,#col2,#col3').empty();
			loadPic(imgss);
		}
	});
	var ee = function(){
		if(llt)if((document.documentElement.offsetHeight || $('body').height())-(document.documentElement.scrollTop || $('body').scrollTop())-$(window).height()<$('.thumbnail img.img-panel').eq(imgss.length-1).height()+200)ou(++page);
		
	}
	$(window).bind('scroll',ee);

  $("[data-toggle='tooltip']").tooltip();

});

