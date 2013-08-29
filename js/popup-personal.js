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
                reliableGet(makeExtraUrl('user', 'rename', {new_name: newName}, function() { }));
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

function genTreasure(item) {
    var treasure = $('<div/>').addClass('lookup-treasure-cell');
    var link = $('<a/>').addClass('lookup-treasure-link')
                        .attr('href', 'javascript: void(0);');
    var url = baseUrl + makeExtraUrl('image', 'treasure', {treasure: item.id, enabled: item.enabled});
    var image = $('<img/>').attr('src', url);
    var name = $('<div/>').addClass('lookup-treasure-desc')
                          .html(item.name);
    var price = $('<div/>').addClass('lookup-treasure-desc')
                           .html('$' + item.price);
    link.append(image)
    treasure.append(link)
            .append(name)
            .append(price);
    return treasure;
}

function putAllTreasures() {
    var rowLen = 3;
    var contain = $('#lookup-treasures-contain');
    contain.empty()
           .hide();
    for(var i = 0; i < treasureInfo.length; i += rowLen) {
        var row = $('<div/>');
        for(var j = 0; j < rowLen && i + j < treasureInfo.length; ++ j)
            row.append(genTreasure(treasureInfo[i + j]));
        contain.append(row);
    }
    contain.fadeIn();
}

function loadTreasureInfo() {
    if(treasureInfo == undefined) {
        reliableGet(makeExtraUrl('treasure', 'info', {}), function(res) {
            if(res.status != 'OKAY')
                return;
            treasureInfo = res.respond.info;
        });
    }
}

function putBuyButton() {
    var button = $('<a/>').attr('id', 'lookup-buy')
                          .html('買寶物囉')
                          .attr('href', 'javascript: void(0);')
                          .addClass('btnn btnn-large btnn-primary');
    button.click(function() {
        if(button.hasClass('btnn-primary')) {
            button.removeClass('btnn-primary')
                  .addClass('btnn-inverse');
            loadTreasureInfo();
            $('#lookup-user-name-row').slideUp();
            $('#lookup-user-score-contain').slideUp(putAllTreasures);
        } else if(button.hasClass('btnn-inverse')) {
            button.removeClass('btnn-inverse')
                  .addClass('btnn-primary');
            $('#lookup-treasures-contain').fadeOut(function() {
                $('#lookup-user-name-row').slideDown();
                $('#lookup-user-score-contain').slideDown();
            });
        }
    });
    $('#lookup-buy-contain').append(button);
}

