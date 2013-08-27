function putUserRename() {
    var button = $('<a/>').attr('id', 'lookup-user-rename')
                          .html('改名字')
                          .attr('href', 'javascript: void(0);')
                          .addClass('btnn btnn-primary');

    button.click(function() {
        var contain = $('#lookup-user-name-contain');
        var show = $('#lookup-user-name-show');
        var input = $('#lookup-user-name-input');
        if(button.hasClass('lookup-editing')) {
            var newName = $.trim(input.val());
            if(newName != '' && newName != show.html()) {
                reliableGet(makeExtraUrl('user', 'rename', {'new_name': newName}, function() { }));
                show.html(newName);
            }

            button.html('改名字')
                  .removeClass('lookup-editing');

            contain.fadeOut(function() {
                show.show();
                input.hide();
                contain.fadeIn();
            });
        } else {
            input.val(show.html());

            button.html('就這個了')
                  .addClass('lookup-editing');

            contain.fadeOut(function() {
                show.hide();
                input.show();
                contain.fadeIn();
            });
        }
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

        var nameShow = $('<div/>').attr('id', 'lookup-user-name-show')
                                  .html(res.respond.name);
        var nameInput = $('<input/>').attr('id', 'lookup-user-name-input')
                                     .attr('type', 'text')
                                     .hide();
        var coin = $('<div/>').attr('id', 'lookup-user-coin')
                              .html('$' + res.respond.coin + ' 塊硬幣');
        var score = $('<div/>').attr('id', 'lookup-user-score')
                               .html(res.respond.score + ' 點經驗值');

        nameInput.keyup(function(evt) {
            if(evt.which == 13)
                $('#lookup-user-rename').click();
            else if(evt.which == 27) {
                nameInput.val('');
                $('#lookup-user-rename').click();
            }
        });


        $('#lookup-user-name-contain').empty()
                                      .append(nameShow)
                                      .append(nameInput);
        $('#lookup-user-score-contain').empty()
                                       .append(score);
        $('#lookup-user-coin-contain').empty()
                                      .append(coin);

        putBuyButton();
    });
}

function putBuyButton() {
    var button = $('<a/>').attr('id', 'lookup-buy')
                          .html('買寶物囉')
                          .attr('href', 'javascript: void(0);')
                          .addClass('btnn btnn-large btnn-primary');
    button.click(function() {
    });
    $('#lookup-buy-contain').append(button);
}
