function putUserRename() {
    var button = $('<a/>').attr('id', 'lookup-user-rename')
                          .html('改名字')
                          .attr('href', 'javascript: void(0);')
                          .addClass('btnn btnn-primary')
                          .click(function() {
                          });
    $('#lookup-user-rename-contain').append(button);
}

function putAvatar() {
    var avatar = $('#lookup-user-avatar');
    var url = baseUrl + makeExtraUrl('image', 'avatar', {});
    avatar.css('background-image', 'url(' + url + ')');
}

function putUserInfo() {
    putUserRename();
    reliableGet(makeExtraUrl('user', 'info', {}), function(res) {
        if(res.status != 'OKAY')
            return;

        var name = $('<div/>').attr('id', 'lookup-user-name-show')
                              .html(res.respond.name);
        var coin = $('<div/>').attr('id', 'lookup-user-coin')
                              .html('$' + res.respond.coin + ' 塊硬幣');
        var score = $('<div/>').attr('id', 'lookup-user-score')
                               .html(res.respond.score + ' 點經驗值');

        $('#lookup-user-name-contain').empty()
                                      .append(name);
        $('#lookup-user-score-contain').empty()
                                       .append(score);
        $('#lookup-user-coin-contain').empty()
                                      .append(coin);
    });
}

function putBuyButton() {
    var button = $('<a/>').attr('id', 'lookup-buy')
                          .html('買寶物囉')
                          .attr('href', 'javascript: void(0);')
                          .addClass('btnn btnn-large btnn-primary')
                          .click(function() {
                          });
    $('#lookup-buy-contain').append(button);
}
