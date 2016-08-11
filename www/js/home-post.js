$(document).ready(function() {

    // --------初始化--------
    $.ajax({
        url: window.host + "Home/Team/getAllTeamList",
        type: "POST",
        dataType: "JSON",
        success: function(data) {
            $("#group-box").empty();
            console.log(data);
            if (data.status == 0) return null;
            var arr = data.info;
            for (var i = 0; i < arr.length; i++) {
                $("#group-box").append("<label><input type=\"checkbox\" value=\"" + arr[i].tid +
                    "\" class=\"group-item\">" + arr[i].tname + "</label>");
            }
        },
        error: function(e) {
            console.log("Error!");
            console.log(e);
        }
    });

    //--------- 是否公开切换 -----------
    $("#input2").change(function(event) {
        if ($(this).prop("checked") != "") {
            $("#group-panel").show();
        } else {
            $("#group-panel").hide();
        }
    });

    $("#input1").change(function(event) {
        if ($(this).prop("checked") != "") {
            $("#group-panel").hide();
        } else {
            $("#group-panel").show();
        }
    });

    // --------------图源类型------------
    $("#imgtype").change(function(event) {
        if ($(this).val() == 2) {

            $("#ty").prop("checked", false);
        } else {
            $("#ty").prop("checked", "checked");
        }
    });

    // ---------------发布-----------

    $("#push-btn").click(function(event) {
        var pname = $("#bname").val().trim();
        var pimg = $("#iurl").val().trim();
        var premark = $("#remark").val();
        var team = new Array();
        var ptype = $("#imgtype").val();
        if (pname == "" || pimg == "" || premark == "") {
            alert("请填写完整信息");
            return null;
        }

        if ($("#input1").prop("checked")) {
            team.push(0);
        } else {
            $(".group-item:checked").each(function(index, el) {
                team.push(parseInt($(this).val()));
            });
        }

        if (team.length == 0) {
            alert("请选择要发布的组！");
            return null;
        }

        $.ajax({
            url: window.host + "/Home/Product/releaseProduct",
            type: "POST",
            dataType: "JSON",
            data: { "pname": pname, "pimg": pimg, "premark": premark, "team": team, "ptype": ptype },
            success: function(data) {
                console.log(data);
                if (data.status == 1) {
                    alert("添加成功");
                    $("#bname").val("");
                    $("#iurl").val("");
                    $("#remark").val("");
                    $("#input1").prop("checked", true);

                    $(".group-item:checked").each(function(index, el) {
                        $(this).prop("checked", false);
                    });
                    var pid = data.info.pid;
                    if ($("#xt").prop("checked")) {
                        clrim(pid, "xt");
                        $("#xt").prop("checked",false);
                    }
                    if ($("#fy").prop("checked")) {
                        clrim(pid, "fy");
                        $("#fy").prop("checked",false);
                    }
                    if ($("#qz").prop("checked")) {
                        clrim(pid, "qz");
                        $("#qz").prop("checked",false);
                    }
                    if ($("#ty").prop("checked")) {
                        clrim(pid, "ty");
                    }
                    
                    $("#imagetype").val("0");


                } else {
                    alert(data.info);
                }
            },
            error: function(e) {
                console.log("Error!");
                console.log(e);
            }
        });
    });

    // ---------------end--------------


});


//职位自动认领
function clrim(pid, ctype) {
    $.ajax({
        url: window.host + "Home/Claim/claimProduct",
        type: "POST",
        dataType: "JSON",
        data: { "pid": pid, "ctype": ctype },
        success: function(data) {
            if (data.status == 0) {
                alert("职位自动认领失败，请手动认领");
            }
            //console.log(data);
        },
        error: function(e) {
            console.log(e);
        }

    });
}
