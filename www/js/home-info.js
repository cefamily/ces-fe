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
                    d = new Date(parseInt(data.info.pctime)*1000),
                    status = [
                        "审核中",
                        "征集中",
                        "待定",
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
                    <dd>${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}</dd>
                    <dt>图源类型:</dt>
                    <dd>${imgtype[info.ptype]}</dd>
                    <dt>是否公开:</dt>
                    <dd>${pubstat[info.pteam]}</dd>
                    <dt>点击数:</dt>
                    <dd>${info.pclick}</dd>
                    <dt>UP数</dt>
                    <dd>${info.pup}</dd>
                    `);
                $("#img-box>img").error(function() {
                    $("#img-box>img").attr("src", '/img/noimage.jpg');
                });
                $("#img-box>img").attr("src", info.pimg);
                $("legend").html(info.pname);
            } else {
                $("#main").html("<h1>没有这个ID的数据哦~</h1>");
            }
        },
        error: function(e) {
            console.log(e.responseText);
        }
    });

    $.ajax({
        url: window.host+'Home/Progress/getProgress',
        type: 'POST',
        dataType: 'JSON',
        data: {'pid':pid},
        success:function(data){
            console.log(data);
            $('#typro').empty();
            let info=data.info;
            for(let i=0;i<info.length;i++){
                let d= new Date(parseInt(info[i].gctime)*1000);
                console.log(info[i].gctime);
               $('#'+info[i].gtype+'pro').append(`
                 <blockquote class="blockqute-danger">
                                    <p>${info[i].gtext}</p>
                                    <footer>${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}</footer>
                                </blockquote>
               `) 
            }
            
        },
        error:function(e){
            console.log(e.responseText);
        }
    });

    $('#claim').click(function(event) {

        let arr = {};
        $('#chek input:checked').each(function(index, el) {
            let value = $(this).val();
            $.ajax({
                url: window.host + '/Home/Claim/claimProduct',
                type: 'POST',
                dataType: 'JSON',
                data: { "pid": pid, "ctype": value },
                success: function(data) {
                    console.log(data);
                    if (!data.status) {
                        arr[arr.length] = value;
                        alert(data.info);
                    }else{
                        alert("认领成功");
                        $("#modal-id").modal('hide');
                    }
                },
                error: function(e) {
                    console.log(e);
                    alert("发生未知错误");
                }
            });
        });

        

    });

    // $('#myUp').click(function(event) {
    //     $.ajax({
    //         url: '/path/to/file',
    //         type: 'default GET (Other values: POST)',
    //         dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
    //         data: {param1: 'value1'},
    //     });
        
    // });
});
