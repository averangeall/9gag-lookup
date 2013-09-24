function putNoNotifi() {
    var noNotifi = $('#lookup-no-notifi');

    var explainBtn = $('<a/>').html('這個')
                              .attr('href', 'javascript: void(0);');

    explainBtn.click(function() {
        noNotifi.fadeOut(function() {
            var explain = $('#lookup-notifi-explain');
            explain.fadeIn();
        });
    });

    var line1 = $('<p/>').append('目前還沒有任何通知喔 : (');
    var line2 = $('<p/>').append('請看')
                         .append(explainBtn)
                         .append('，可以了解更多喔。');

    noNotifi.append(line1)
            .append(line2);
}

function prepareNotifiExplain() {
    var explain = $('#lookup-notifi-explain');
    explain.empty()
           .hide();

    var line1 = $('<p/>').append('雖然，這是一本讓您幾乎不用打字');
    var line2 = $('<p/>').append('就可以查的字典');
    var line3 = $('<p/>').append('但是，目前也還沒那麼完美，');
    var line4 = $('<p/>').append('有時候也可以手動輸入英文單字，');
    var line5 = $('<p/>').append('等到您輸入的單字，和別人重覆到，');
    var line6 = $('<p/>').append('或是您提供的解釋被別人誇獎，');
    var line7 = $('<p/>').append('就會給您幾塊金幣!!!');
    var line8 = $('<p/>').append('這本字典將會越來越好，');
    var line9 = $('<p/>').append('大家加油!!!!');

    explain.append(line1)
           .append(line2)
           .append(line3)
           .append(line4)
           .append(line5)
           .append(line6)
           .append(line7)
           .append(line8)
           .append(line9);
}

function putAllNotifis() {
    reliableGet(makeExtraUrl('notifi', 'get', {}), function(res) {
        if(res.status != 'OKAY')
            return;

        var notifis = res.respond.notifis;
        
        putNoNotifi();
    });
}
