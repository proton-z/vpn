var server_list = new Array();
function get_server_list(){
    // alert("此服务器列表为离线VIP服务器列表，截止到2020.5.31");

    MZK_getJSON_DATA("chromeext/index/getserver" , {},function(data){
            if(data.result == 'ok') {
                var str = "{\"result\":\"ok\",\"msg\":\"\",\"server\":[{\"name\":\"全球智能线路【VIP】\",\"address\":\"HTTPS ruedge.iggimgcdn.com:23389;HTTPS hk.smart.qqwx8.xyz:8443;\",\"line_sn\":\"4f527de29b\",\"line_desc\":\"系统自动测速选择最快线路\",\"vip_level\":1,\"is_auth\":\"1\",\"p_user\":\"zhangch1020@126.com\",\"p_pass\":\"9e01168d34465bd68f926f87d2de76a6\",\"last_update\":1579585793,\"line_mode\":\"smart\"},{\"name\":\"日本东京 【VIP】\",\"address\":\"HTTPS jp.smart.qqwx8.xyz:3389;HTTPS jp.free.iggimgcdn.com:443;\",\"line_sn\":\"4f527de2ab\",\"line_desc\":\"可解锁本地资源\",\"vip_level\":1,\"is_auth\":\"1\",\"p_user\":\"zhangch1020@126.com\",\"p_pass\":\"9e01168d34465bd68f926f87d2de76a6\",\"last_update\":1588944210,\"line_mode\":\"single\"},{\"name\":\"美国圣何塞【VIP】\",\"address\":\"HTTPS us.smart.qqwx8.xyz:465;HTTPS twushe.iggimgcdn.com:7200;HTTPS de2us.iggimgcdn.com:2048;\",\"line_sn\":\"5e55180f55\",\"line_desc\":\"美国多IP 出口，适宜观看视频等。\",\"vip_level\":1,\"is_auth\":\"0\",\"p_user\":\"zhangch1020@126.com\",\"p_pass\":\"9e01168d34465bd68f926f87d2de76a6\",\"last_update\":1589855760,\"line_mode\":\"single\"},{\"name\":\"TW-台湾-HINET 【VIP】\",\"address\":\"HTTPS twlive1.mzke7.buzz:3389;HTTPS twhinet2.theworkpc.com:3389;\",\"line_sn\":\"hkt6d13261\",\"line_desc\":\"原生IP,白天速度较快\",\"vip_level\":1,\"is_auth\":\"1\",\"p_user\":\"zhangch1020@126.com\",\"p_pass\":\"9e01168d34465bd68f926f87d2de76a6\",\"last_update\":1590636124,\"line_mode\":\"single\"},{\"name\":\"新加坡【VIP】\",\"address\":\"HTTPS sg1.mzkservice.com:443;HTTPS sg2.mzkservice.com:443;\",\"line_sn\":\"4678e2ab22\",\"line_desc\":\"可解锁当地 Netflix|Prime Video\",\"vip_level\":1,\"is_auth\":\"1\",\"p_user\":\"zhangch1020@126.com\",\"p_pass\":\"9e01168d34465bd68f926f87d2de76a6\",\"last_update\":1588944129,\"line_mode\":\"single\"},{\"name\":\"英国伦敦 【VIP】\",\"address\":\"HTTPS uk.qqwx8.xyz:777;HTTPS uk.qqwx8.xyz:443;\",\"line_sn\":\"5e56267dd4\",\"line_desc\":\"解锁 Netflix BBC Prime Video\",\"vip_level\":1,\"is_auth\":\"0\",\"p_user\":\"zhangch1020@126.com\",\"p_pass\":\"9e01168d34465bd68f926f87d2de76a6\",\"last_update\":1588944139,\"line_mode\":\"single\"}]}";

                data = JSON.parse(str);
                var dis_class = "";
                $.each(data.server,function(i,k){
                    if(k.vip_level === 0) {
                        var s_str = '<li><div class="line-inform"><div class="line-inform-txt" id="'+k.line_sn+'"><h4 id="server_name_'+k.line_sn+'">'+k.name+'</h4><p>'+k.line_desc+'</p></div></div></li>';
                        $("#free_server_list_ul").append(s_str);
                        server_list[k.line_sn] = k;
                    }
                });

                $.each(data.server,function(i,k){
                    if(k.vip_level > 0) {
                        dis_class = "line-inform-txt";
                        var s_str = '<li><div class="line-inform"><div class="'+dis_class+'" id="'+k.line_sn+'"><h4 id="server_name_'+k.line_sn+'">'+k.name+'</h4><p>'+k.line_desc+'</p></div></div></li>';
                        $("#server_list_ul").append(s_str);
                        server_list[k.line_sn] = k;
                    }
                });
                $(".line-inform-txt").click(function(){
                        select_server(this.id);
                    });
                $(".line-inform-free").css({cursor:"not-allowed"}).unbind("click");
                $(".line-inform-free > h4").css({color:"#e5e5e5"});
            }else{
                alert("获取服务器列表失败 [" + data.msg + "]");
            }
   });
}

function select_server(sid){
    var server_info = server_list[sid];
    chrome.storage.local.set({mzk_select_server_info: server_info}, function () {
        MZK_BGS.mzk_server_id = sid;
        MZK_BGS.mzk_select_server_info = server_info;
        MZK_BGS.open_vpn(function (){
            if(server_info.line_mode == "smart"){
                MZK_BGS.KeepLive_Session();
            }
        });
        window.location.href = "main.html";
    });
}

$(document).ready(function () {
   get_server_list();
   lang_init();
});
