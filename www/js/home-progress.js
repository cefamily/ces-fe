$(function() {
    // -------------初始化--------
    let pid = window.GET.id;

    $.ajax({
        url: window.host + 'Home/Product/getProductByPid',
        type: 'POST',
        dataType: 'JSON',
        data: { 'pid': pid },
        success: function(data) {
            console.log(data);
            if (data.status == 1) {

                let month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    d = new Date(data.pctime),
                    status = [
                        "征集中",
                        "进行中",
                        "已完成"
                    ],
                    imgtype = [
                        "网源",
                        "自扫",
                        "暂无图源"
                    ],
                    pubstat = [
                        "公开",
                        "限制组"
                    ];
                let info = data.info
                $(".dl-horizontal").html(`
					<dt>当前状态:</dt>
                    <dd>${status[info.pstate]}</dd>
                    <dt>发布时间:</dt>
                    <dd>${info.pctime}</dd>
                    <dt>图源类型:</dt>
                    <dd>${imgtype[info.ptype]}</dd>
                    <dt>是否公开:</dt>
                    <dd>${pubstat[info.pteam]}</dd>
                    <dt>点击数:</dt>
                    <dd>${info.pclick}</dd>
                    <dt>UP数</dt>
                    <dd>${info.pup}</dd>
					`);
                $("#img-box>img").attr("src",info.pimg);
            } else {
                $("#main").html("<h1>没有这个ID的数据哦~</h1>");
            }
        },
        error: function(e) {
            console.log(e.responseText);
        }
    });

    $("#sub").click(function(event) {
    	let type=$("input[name='type']:checked").val();
    	let gtext=$("#gtext").val();
    	let flag;

    	if($("#finsh").prop("checked")){
    		flag=true;
    	}else{
    		flag=false;
    	}
    	$.ajax({
    		url: window.host+'Home/Progress/changeProgress',
    		type: 'POST',
    		dataType: 'JSON',
    		data: {'pid':pid,'type':type,'text':gtext,'flag':flag},
    		success:function(data){
    			console.log(data);
    			if(data.status==1){
    				alert('提交成功');
    				$("input[name='type']").eq(0).prop("checked",true);
    				$("#gtext").val("");
    			}else{
    				alert(data.info);
    			}
    		},
    		error:function(e){
    			console.log(e.responseText);
    		}
    	});
    });

});
