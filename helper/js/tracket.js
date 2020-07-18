function add_new_feedback(){
    var addemail = $("#email").val();
    if(!addemail) {
        $("#email").focus();
        return;
    }
    var add_contents = $("#contents").val();
    if(!add_contents || contents.length < 5) {
        alert("写点什么吧?");
        $("#contents").focus();
        return;
    }

    MZK_getJSON_DATA("chromeext/index/add_feedback" , {feed_contents:add_contents,reply_email:addemail,curr_location:MZK_BGS.mzk_select_server_info.name,connect_mode:MZK_BGS.mzk_connect_mode},function(data){
        if(data.result == 'ok') {
            $.confirm({
                title: '发布完成',
                content: data.msg,
                buttons: {
                    OK: function () {
                        window.close();
                    }
                }
            });
        }
});
}

function tracket_init(){
    MZK_getJSON_DATA("chromeext/index/feedback_notes" , {},function(data){
        if(data.result == 'ok') {
            $.each(data.notes, function (i, k) {
                var s_str = '<div class="alert alert-info" role="alert">'+k+'</div>';
                $("#notes").append(s_str);
            });
        }
});
}

$(document).ready(function () {
    check_user_login(function(){
        tracket_init();
    });
    $("#curr_location").val(MZK_BGS.mzk_select_server_info.name);
    $("#email").val(MZK_BGS.mzk_user_info.email);
    $("#submit_feedback").click(function(){
        add_new_feedback();
    });
 });