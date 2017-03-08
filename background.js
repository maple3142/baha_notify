
    'use strict';
    console.log('running');
    var icon='https://api.gamer.com.tw/favicon.ico';
    var notificationxml='https://www.gamer.com.tw/ajax/notify.php?a=2';
    var upd=function(){
        $.ajax({
            url: notificationxml,//return xml
            method: 'GET',
            success: function(d) {
            var msgs=$(d).find('allMsg').find('Msg');
            var code=msgs.first().find('code').text();
            if(code!=localStorage.prev){
                localStorage.prev=code;
                var cdata=msgs.find('content').html();
                var t=/">(.*)<\/a>/.exec(cdata);
                var l=/href="([^ ]*)"/.exec(cdata);
                var n=new Notification(t[1],{icon:icon});
                n.onclick=function(){
                    open(l[1],'_blank');
                };
                console.log(t[1]+' '+l[1]);
                }
                else console.log('no notification');
            }
        });
    };
    upd();
    var notifyit=setInterval(window.upd,10000);
