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

        userInfo = res.respond;

        var nameShow = $('<div/>').attr('id', 'lookup-user-name-show')
                                  .html(res.respond.name);
        var nameInput = $('<input/>').attr('id', 'lookup-user-name-input')
                                     .attr('type', 'text')
                                     .hide();
        var coinNum = $('<span/>').attr('id', 'lookup-user-coin-num')
                                  .html(res.respond.coin);
        var scoreNum = $('<span/>').attr('id', 'lookup-user-score-num')
                                   .html(res.respond.score);
        var coin = $('<div/>').attr('id', 'lookup-user-coin')
                              .append('$')
                              .append(coinNum)
                              .append(' 塊金幣');
        var score = $('<div/>').attr('id', 'lookup-user-score')
                               .append(scoreNum)
                               .append(' 點經驗值');

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

function changeTreasureImage(item) {
    var images = $('.lookup-treasure-image[data-item-id=' + item.id + ']');
    var image = $(images[0]);
    var url = baseUrl + makeExtraUrl('image', 'treasure', {treasure: item.id, enabled: item.enabled});
    image.fadeOut(function() {
        image.attr('src', url)
             .fadeIn();
    });
}

function changeAvatarImage(item) {
    var image = $('#lookup-user-avatar');
    var url = baseUrl + makeExtraUrl('image', 'avatar', {treasure: item.id});
    image.fadeOut(function() {
        image.css('background-image', 'url(' + url + ')')
             .fadeIn();
    });
}

function changeCoinNum() {
    var coinNum = $('#lookup-user-coin-num');
    var timerId = setInterval(function() {
        var cur = parseInt(coinNum.html());
        if(cur <= userInfo.coin) {
            clearInterval(timerId);
            return;
        }
        coinNum.html(cur - 1);
    }, 20);
}

function putTreasureButtons(item) {
    var okay = $('<a/>').attr('id', 'lookup-treasure-okay')
                        .attr('href', 'javascript: void(0);')
                        .addClass('btnn btnn-large');
    var cancel = $('<a/>').attr('id', 'lookup-treasure-cancel')
                          .html('取消')
                          .attr('href', 'javascript: void(0);')
                          .addClass('btnn btnn-large');

    cancel.click(function() {
        $('#lookup-treasures-action-contain').fadeOut();
    });

    if(item.enabled) {
        okay.html('使用')
            .addClass('btnn-primary');

        okay.click(function() {
            reliableGet(makeExtraUrl('treasure', 'use', {treasure: curTreasure}), function(res) {
                if(res.status != 'OKAY')
                    return;
                changeAvatarImage(item);
            });
        });
    } else {
        okay.html('購買');
        if(item.price > userInfo.coin) {
            okay.addClass('btnn-default')
                .attr('disabled', 'true');
        } else {
            okay.addClass('btnn-primary');

            okay.click(function() {
                if(item.enabled)
                    return;
                reliableGet(makeExtraUrl('treasure', 'buy', {treasure: curTreasure}), function(res) {
                    if(res.status != 'OKAY')
                        return;
                    item.enabled = true;
                    changeTreasureImage(item);
                    changeAvatarImage(item);
                    userInfo.coin -= item.price;
                    changeCoinNum();
                    okay.html('使用');
                });
            });
        }
    }

    $('#lookup-treasures-action-contain').empty()
                                         .hide()
                                         .append(okay)
                                         .append(' ')
                                         .append(cancel)
                                         .fadeIn();
}

function clickTreasure(evt) {
    curTreasure = $(evt.target).attr('data-item-id');

    var treasure;
    $.each(treasureInfo, function(i, item) {
        if(item.id != curTreasure)
            return true;
        treasure = item;
        return false;
    });

    putTreasureButtons(treasure);
}

function genTreasure(item) {
    var treasure = $('<div/>').addClass('lookup-treasure-cell');

    var link = $('<a/>').addClass('lookup-treasure-link')
                        .attr('href', 'javascript: void(0);');
    var url = baseUrl + makeExtraUrl('image', 'treasure', {treasure: item.id, enabled: item.enabled});
    var image = $('<img/>').attr('src', url)
                           .addClass('lookup-treasure-image');
    link.append(image);

    var name = $('<div/>').addClass('lookup-treasure-desc')
                          .html(item.name);
    var price = $('<div/>').addClass('lookup-treasure-desc')
                           .html('$' + item.price);
    
    image.attr('data-item-id', item.id);
    name.attr('data-item-id', item.id);
    price.attr('data-item-id', item.id);

    treasure.append(link)
            .append(name)
            .append(price);

    treasure.click(clickTreasure);

    return treasure;
}

function putAllTreasures() {
    var rowLen = 3;
    var contain = $('#lookup-treasures-browse-contain');
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
            $('#lookup-treasures-action-contain').fadeOut();
            $('#lookup-treasures-browse-contain').fadeOut(function() {
                $('#lookup-user-name-row').slideDown();
                $('#lookup-user-score-contain').slideDown();
            });
        }
    });
    $('#lookup-buy-contain').append(button);
}

