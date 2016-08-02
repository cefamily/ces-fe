$(function () {

  $.ajax({
  	url:window.host+"Home/Product/getProductList",
  	type:"POST",
  	dataType:"JSON",
  	success:function(data){
  		console.log(data);
  		$("#col1").empty();
  		$("#col2").empty();
  		$("#col3").empty();
  		for(var i=0;i<data.info.products.length;i++){
  			//-------按顺序自动选择------
  			var x=i%3;
  			flushinfo(x+1,data.info.products[i]);

  			//-------按长度自动选择------
  			// var a=$("#col1").height();
  			// var b=$("#col2").height();
  			// var c=$("#col3").height();
  			// if(a<=b && a<=c){
  			// 	flushinfo(1,data.info.products[i]);
  			// }else if(b<=a && b<=c){
  			// 	flushinfo(2,data.info.products[i]);
  			// }else{
  			// 	flushinfo(3,data.info.products[i]);
  			// }
  		}
  	},
  	error:function(e){
  		console.log(e);
  	}
  });

  $("[data-toggle='tooltip']").tooltip();

});

function flushinfo(index,data){
	//console.log(index);
	var month=new Array('一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月');
	var status=new Array("<span class=\"label label-danger\">征集中</span>",
		"<span class=\"label label-info\">进行中</span>",
		"<span class=\"label label-success\">已完成</span>");
	var imgtype=new Array("<span class=\"label label-warning\">网源</span>",
		"<span class=\"label label-success\">自扫</span>",
		"<span class=\"label label-danger\">暂无图源</span>");
	var pubstat=new Array("<span class=\"label label-success\">公开</span>","<span class=\"label label-danger\">限制组</span>");
	var d= new Date(data.pctime);
	$("#col"+index).append("<div class=\"row\"><div class=\"col-md-12 comic-box\">"+
          "<div class=\"thumbnail\"><a href=\"#\"><div class=\"conpa\">"+
          "<div><span style=\"font-size:20px;\">"+d.getDate()+"</span><br>"+month[d.getMonth()]+"</div></div>"+
          "<img src=\""+data.pimg+"\" class=\"img-panel\"/></a></div>"+
          "<div class=\"caption img-text-panel\" data-toggle=\"tooltip\""+
          "title=\""+data.pname+"\">"+data.pname+
          "</div><div class=\"label-box\">"+status[data.pstate-1]+imgtype[data.ptype]+pubstat[data.pteam]+
          "<span class=\"label label-warning\"><span class=\"glyphicon glyphicon-star\"></span> "+data.pup+"</span>"+
          "</div></div></div>"
		);
}