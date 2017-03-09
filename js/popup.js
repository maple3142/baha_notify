chrome.runtime.onMessage.addListener(function(req,sender,sendresponse){
    if(req.msg=='update'){
        update();
    }
});
moment.locale(navigator.language);
update();
$('#clear').on('click',function(e){
    if(confirm('確定清除?')){
        console.log('clear');
        clear();
    }
});
function update(){
    chrome.storage.local.get('msgs',function(r){
        var msgs=r.msgs;
        $('#list').html('');
        if(msgs.length==0){
            $('#nomsg').show();
            chrome.browserAction.setBadgeText({text:''});
        }
        else{
            chrome.browserAction.setBadgeText({text:msgs.length.toString()});
            $('#nomsg').hide();
            for(i in msgs){
                $('#list').prepend(
                    $('<li>').append(
                        $('<a>').append(
                            msgs[i].title
                        ).attr('href',msgs[i].link).attr('target','_blank')
                    ).append(
                        $('<span>').append(
                            moment(tformat(msgs[i].hours)+tformat(msgs[i].minutes),'HHmm').fromNow()
                        ).addClass('pull-right')
                    ).addClass('list-group-item')
                );
            }
        }
        
        
    });
}
function clear(){
    chrome.storage.local.set({msgs:[]},function(){
        update();
    });
}
function tformat(s){
    s=s.toString();
    if(s.length==1)
        return '0'+s;
    else return s;
}