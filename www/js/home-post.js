$(document).ready(function() {

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
    // --------------end-----------------

    $("#imgtype").change(function(event) {
        if ($(this).val() == 3) {

            $("#ty").prop("checked", false);
        } else {
            $("#ty").prop("checked", "checked");
        }
    });
});
