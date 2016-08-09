$(function () {

  $.ajax({
  	url:window.host+"Home/Product/getProductList",
  	type:"POST",
  	dataType:"JSON",
  	success:function(data){
  		console.log(data);
		if(!data.status){
			console.error(data.info);return
		}
  		if(!data.info || !data.info.products || typeof data.info.products != 'object'){
			console.error('ERROR DATA');return;
		}
		if(!window.loadPic){
			console.error('NOT LOADED STRAIGHT.JS');return;
		}
		let p = data.info.products,imgs=[];
		for(let d in p){
			imgs.push(
				{
					src:p[d].pimg,
					callback:function(m){
						flushinfo(p[d],$(m))
					}
				}
			)
			
		}
		loadPic(imgs);
  		
  	},
  	error:function(e){
  		console.log(e);
  	}
  });

  $("[data-toggle='tooltip']").tooltip();

});

function flushinfo(data,m){
	//console.log(index);
	let month=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],d= new Date(data.pctime),status=[
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
	],lr = $(`<div class="mission-block">
        <div class="col-md-12 comic-box">
          <div class="thumbnail">
            <a href="#">
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
            ${status[data.pstate-1]+imgtype[data.ptype]+pubstat[data.pteam]}
            <span class="label label-warning"><span class="glyphicon glyphicon-star"></span>${data.pup}</span>
          </div>
        </div>
      </div>`);
	  m.addClass('img-panel');
	  lr.find('.conpa').appdend(m);
	  lr.appendTo('cache-mission-block');
	  

}