const icon='https://api.gamer.com.tw/favicon.ico';
const notificationxml='https://www.gamer.com.tw/ajax/notify.php?a=2';
update();
function update(){
    $.ajax({
            url: notificationxml,//return xml
            method: 'GET',
            success: function(d){
                var data=$(d).find('allMsg').find('Msg').find('content');
                data.each(e=>{
                    var x=data[e].innerHTML;
                    var t=/">(.*)<\/a>/g.exec(x);
                    var l=/href="([^ ]*)"/g.exec(x);
                    var p=/A\[(.*)<a/g.exec(x);
                    var a=/a>(.*)]]/.exec(x);
                    if(t&&l){
                        $('#list').append(
                            $('<li>').append(
                                [p[1],$('<a>').append(
                                    t[1]
                                ).attr('href',l[1]).attr('target','_blank'),a[1]]
                            ).addClass('list-group-item')
                        );
                    }
                });
            }
        });
}
function tformat(s){
    s=s.toString();
    if(s.length==1)
        return '0'+s;
    else return s;
}