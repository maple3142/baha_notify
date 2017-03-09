
    'use strict';
    console.log('running');
    chrome.storage.local.get('msgs',function(r){
        var msgs=r.msgs||[];
        if(msgs.length==0){
            chrome.browserAction.setBadgeText({text:''});
        }
        else{
            chrome.browserAction.setBadgeText({text:msgs.length.toString()});
        }
    });
    chrome.browserAction.setBadgeBackgroundColor({color:'#E7141A'});
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
                chrome.storage.local.get('msgs',function(r){
                    var msgs=r.msgs||[];
                    var d=new Date();
                    msgs.push({
                        title:t[1],
                        link:l[1],
                        hours:d.getHours(),
                        minutes:d.getMinutes()
                    });
                    if(msgs.length==0){
                        chrome.browserAction.setBadgeText({text:''});
                    }
                    else{
                        chrome.browserAction.setBadgeText({text:msgs.length.toString()});
                    }
                    chrome.storage.local.set({msgs:msgs},function(){
                        chrome.runtime.sendMessage({msg:'update'});
                    });
                });
                var n=new Notification(t[1],{icon:icon});
                n.onclick=function(){
                    open(l[1],'_blank');
					n.close();
                };
                console.log(t[1]+' '+l[1]);
                }
                else console.log('no notification');
            }
        });
    };
    upd();
    var notifyit=setInterval(window.upd,10000);
