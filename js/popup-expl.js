function removeAllDefi() {
    $('#explain-content').empty();
    $('#explain-more').empty();
    $('#explain-hline').empty();
}

function genMoodIcon(name, explId, toggle) {
    var icons = {
        'hate': 'fui-cross',
        'like': 'fui-check',
    };
    var toggles = {
        'on': {
            'hate': 'btn-danger',
            'like': 'btn-success',
        }[name],
        'off': 'btn-default',
    };
    var button = $('<a/>').attr('href', 'javascript: void(0);')
                          .attr('data-expl-id', explId)
                          .attr('data-action', name)
                          .addClass('btn btn-mini')
                          .addClass(icons[name])
                          .addClass(toggles[toggle])
                          .attr('data-toggle-on', toggles['on'])
                          .attr('data-toggle-off', toggles['off']);
    var titles = {
        'hate': '這個解釋得爛透了!',
        'like': '這個解釋還OK!',
    };
    button.tooltip({
        animation: true,
        placement: 'left',
        title: titles[name]
    });
    return button;
}

function showAction(explId, action, direction) {
    if(action == 'hate') {
        if(direction == 'forward')
            $('#expl-' + explId).children('.expl-part').hide('fast');
        else if(direction == 'backward')
            $('#expl-' + explId).children('.expl-part').show('fast');
    } else if (action == 'like') {
        if(direction == 'forward')
            $('#expl-' + explId).children('.expl-part').show('fast');
    }
}

function setMoodIconClick(one, other) {
    one.click(function() {
        var explId = one.attr('data-expl-id');
        var action = one.attr('data-action');
        console.log(one.attr('data-toggle-on'));
        console.log(one.attr('class'));
        if(one.hasClass(one.attr('data-toggle-on'))) {
            console.log('on -> off');
            showAction(explId, action, 'backward');
            one.removeClass(one.attr('data-toggle-on')).addClass(one.attr('data-toggle-off'));
            reliableGet(makeExtraUrl('explain', 'plain', {expl_id: explId}), function() { });
        } else if(one.hasClass(one.attr('data-toggle-off'))) {
            console.log('off -> on');
            showAction(explId, action, 'forward');
            one.removeClass(one.attr('data-toggle-off')).addClass(one.attr('data-toggle-on'));
            other.removeClass(other.attr('data-toggle-on')).addClass(other.attr('data-toggle-off'));
            reliableGet(makeExtraUrl('explain', action, {expl_id: explId}), function() { });
        }
    });
}

function putSingleExpl(expl) {
    var whole = $('<div/>').attr('id', 'expl-' + expl.id);
    var hate = genMoodIcon('hate', expl.id, 'off');
    var like = genMoodIcon('like', expl.id, 'off');
    var moods = $('<div/>').attr('id', 'moods-' + expl.id)
                           .append(like)
                           .append($('<span/>').addClass('space'))
                           .append(hate);
    setMoodIconClick(hate, like);
    setMoodIconClick(like, hate);
    whole.append(moods);
    var explPart = $('<div/>').attr('class', 'expl-part');
    
    if(expl.type == 'text') {
        explPart.append($('<h4/>').html(expl.content));
    } else if(expl.type == 'image') {
        var image = $('<img/>').attr('src', expl.content)
                               .attr('alt', '圖片壞掉了 : (')
                               .css('max-width', '80%');
        explPart.append($('<div/>').append(image));
    } else if(expl.type == 'video') {
        if(expl.src == 'Youtube') {
            var mo = expl.content.match(/https?:\/\/www\.youtube\.com\/watch\?v=(.+)/);
            if(mo == null || mo.length != 2)
                return;
            var videoId = mo[1];
            var divYoutube = $('<div/>').attr('id', 'youtube-' + videoId)
                                        .html('You need Flash player 8+ and JavaScript enabled to view this video.');
            explPart.append(divYoutube);
            swfobject.embedSWF("https://www.youtube.com/v/" + videoId,
                               'youtube-' + videoId, "300", "200", "8", null, null, null, null);
        }
    }
    var source = $('<div/>').append($('<span/>').html(' from '))
                            .append($('<a/>').attr('href', expl.link).attr('target', '_blank').html(expl.source))
    explPart.append(source);
    whole.append(explPart);
    $('#explain-content').append(whole);
}

function putExplContent(expls) {
    $.each(expls, function(idx, expl) {
        putHLine($('#explain-content'));
        putSingleExpl(expl);
    });
}

function putAllExpls(recomm) {
    removeAllDefi();
    putLoading();
    var args = {};
    if('id' in recomm)
        args['word_id'] = recomm.id;
    else if('content' in recomm)
        args['word_str'] = recomm.content;
    else
        return;
    reliableGet(makeExtraUrl('explain', 'query', args), function(res) {
        removeLoading();
        if(res.status == 'OKAY') {
            putExplContent(res.respond);
            putMoreExpl();
            putHLine($('#explain-hline'));
        }
    });
}

function makeProvideExpl() {
    var input = $('<textarea/>').attr('id', 'provide-expl-input')
                                .attr('type', 'text')
                                .attr('placeholder', '或是您可以輸入您的解釋!!!')
                                .addClass('span4');
    var submit = $('<a/>').html('送出吧')
                          .attr('href', 'javascript: void(0);')
                          .attr('class', 'btn btn-large btn-primary')
                          .click(function() {
                              putLoading();
                              var args = {
                                  expl_str: $('#provide-expl-input').val(),
                                  word_id: wordId
                              };
                              reliableGet(makeExtraUrl('explain', 'provide', args), function(res) {
                                  removeLoading();
                                  if(res.status == 'OKAY') {
                                      putExplContent(res.respond);
                                  }
                                  $('#provide-expl-input').val('');
                              });
                          });
    var provide = $('<div/>').append(input)
                             .append(submit);
    return provide;
}

function putMoreExpl() {
    var more = $('<div/>').append($('<h3/>').html('以上的解釋都不滿意嗎？'))
                          .append(makeProvideExpl());
    $('#explain-more').append(more);
}
