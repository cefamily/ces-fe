$(document).ready(function() {
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
                $("#img-box>img").error(function(){
                    $("#img-box>img").attr("src",'/img/noimage.jpg');
                });
                $("#img-box>img").attr("src",info.pimg);
                $("legend").html(info.pname);
            } else {
                $("#main").html("<h1>没有这个ID的数据哦~</h1>");
            }
        },
        error: function(e) {
            console.log(e.responseText);
        }
    });
});