function removeAllDefi() {
    $('#explain-content').empty();
    $('#explain-more').empty();
}

function genMoodIcon(name, explId) {
    var icons = {
        'hate': 'fui-cross',
        'like': 'fui-check',
    };
    mood = $('<a/>').attr('href', 'javascript: void(0);')
                    .addClass('btn btn-mini btn-inverse')
                    .addClass(icons[name])
                    .css('text-align', 'center')
                    .css('width', '30px');
    var titles = {
        'hate': '這個解釋得爛透了!',
        'like': '這個解釋還OK!',
    };
    mood.tooltip({
        animation: true,
        placement: 'left',
        title: titles[name]
    });
    return mood;
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
        var action = one.attr('class');
        var here = one.children('.mood-icon');
        var there = other.children('.mood-icon');
        if(here.hasClass('on')) {
            showAction(one.attr('data-expl-id'), action, 'backward');
            here.removeClass('on').addClass('off');
            reliableGet(makeExtraUrl('explain', 'plain', {expl_id: explId}), function() { });
        } else if(here.hasClass('off')) {
            showAction(one.attr('data-expl-id'), action, 'forward');
            here.removeClass('off').addClass('on');
            there.removeClass('on').addClass('off');
            reliableGet(makeExtraUrl('explain', action, {expl_id: explId}), function() { });
        }
    });
}

function putSingleExpl(expl) {
    var whole = $('<div/>').attr('id', 'expl-' + expl.id);
    var hate = genMoodIcon('hate', expl.id);
    var like = genMoodIcon('like', expl.id);
    var moods = $('<div/>').attr('align', 'right')
                           .css('height', '30px')
                           .append(like)
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
