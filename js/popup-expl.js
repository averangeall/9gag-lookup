function removeAllDefi() {
    $('#lookup-expl-content').empty();
}

function genMoodIcon(name, explId, toggle) {
    var icons = {
        hate: 'fui-cross',
        like: 'fui-check',
    };
    var toggles = {
        on: {
            'hate': 'btn-danger',
            'like': 'btn-success',
        }[name],
        off: 'btn-default',
    };
    var button = $('<a/>').attr('href', 'javascript: void(0);')
                          .attr('data-expl-id', explId)
                          .attr('data-action', name)
                          .addClass('btn btn-mini')
                          .addClass(icons[name])
                          .addClass(toggles[toggle])
                          .attr('data-toggle-on', toggles.on)
                          .attr('data-toggle-off', toggles.off);
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
            reliableGet(makeExtraUrl('explain', 'neutral', {expl_id: explId}), function() { });
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
    //var hate = genMoodIcon('hate', expl.id, 'off');
    //var like = genMoodIcon('like', expl.id, expl.liked ? 'on' : 'off');
    //var moods = $('<div/>').attr('id', 'moods-' + expl.id)
    //                       .append(like)
    //                       .append($('<span/>').addClass('space'))
    //                       .append(hate);
    //setMoodIconClick(hate, like);
    //setMoodIconClick(like, hate);
    //whole.append(moods);

    var explPart = $('<div/>').attr('class', 'expl-part');
    
    if(expl.type == 'text') {
        var text = $('<div/>').html(expl.content);
        if(expl.content.length < 10)
            text.addClass('lookup-expl-text-big');
        else
            text.addClass('lookup-expl-text-small');
        explPart.append(text);
    } else if(expl.type == 'image') {
        var image = $('<img/>').attr('src', expl.content)
                               .attr('alt', '圖片壞掉了 : (')
                               .css('max-width', '80%');
        explPart.append($('<div/>').append(image));
    } else if(expl.type == 'video') {
        if(expl.source == 'YouTube') {
            var mo = expl.content.match(/https?:\/\/www\.youtube\.com\/watch\?v=(.+)/);
            if(mo == null)
                return;
            var videoId = mo[1];
            console.log(videoId);
            var divYoutube = $('<div/>').attr('id', 'youtube-' + videoId);
            explPart.append(divYoutube);
            setTimeout(function() {
                swfobject.embedSWF("https://www.youtube.com/v/" + videoId,
                                   'youtube-' + videoId, "300", "200", "8", null, null, null, null);
            }, 500);
        }
    }
    //var source;
    //var srcUserId = expl.source.match(/^U(\d+)$/);
    //if(srcUserId != null)
    //    source = $('<span/>').html('隱姓埋名的人');
    //else {
    //    source = $('<a/>').attr('href', expl.link)
    //                      .attr('target', '_blank')
    //                      .html(expl.source);
    //}
    //var from = $('<div/>').append(source)
    //                      .append(' 提供的');
    //explPart.append(from);
    whole.append(explPart);
    $('#lookup-expl-content').append(whole);
}

function putExplRecomm(recomm) {
    var title = $('<span/>').html(recomm.content);
    var button = $('<a/>').attr('href', 'javascript: void(0);')
                          .addClass('btn btn-mini btn-default fui-cross')
                          .attr('data-toggle-on', 'btn-danger')
                          .attr('data-toggle-off', 'btn-default');
    button.click(function() {
        if(button.hasClass(button.attr('data-toggle-on'))) {
            button.removeClass(button.attr('data-toggle-on')).addClass(button.attr('data-toggle-off'));
            $('#explain-content').show('fast');
            $('#explain-more').show('fast');
            reliableGet(makeExtraUrl('explain', 'query', {word_id: button.attr('data-word-id')}), function() { });
        } else if(button.hasClass(button.attr('data-toggle-off'))) {
            button.removeClass(button.attr('data-toggle-off')).addClass(button.attr('data-toggle-on'));
            $('#explain-content').hide('fast');
            $('#explain-more').hide('fast');
            reliableGet(makeExtraUrl('recomm', 'hate', {word_id: button.attr('data-word-id')}), function() { });
        }
    });
    button.tooltip({
        animation: true,
        placement: 'right',
        title: '這關鍵字和圖根本無關啊!!'
    });
    if('id' in recomm) {
        button.attr('data-word-id', recomm.id);
    } else {
        reliableGet(makeExtraUrl('recomm', 'id', {word_str: recomm.content}), function(res) {
            if(res.status == 'OKAY') {
                button.attr('data-word-id', res.respond.id);
            }
        });
    }
    var inner = $('<div/>').addClass('expl-recomm')
                           .append(button)
                           .append($('<span/>').addClass('space'))
                           .append(title);
    $('#explain-recomm').append(inner);
}

function putExplContent(idx) {
    if(curWordId != undefined && curWordId in allGagInfo[curGagId].explains) {
        var expls = allGagInfo[curGagId].explains[curWordId];
        if(expls.length > idx) {
            putSingleExpl(expls[idx]);
            putExplMood($('#lookup-expl-like'), '這個解釋好', clickLike);
            putExplMood($('#lookup-expl-hate'), '這個解釋爛', clickHate);
        }
    }
}

function hoverLike() {
}

function hoverHate() {
}

function clickLike() {
}

function clickHate() {
    putExplProvide($('#lookup-expl-provide'), '提供新的解釋給大家看');
}

function putExplNav(button, arrow) {
    button.attr('href', 'javascript: void(0);')
          .addClass('btnn btnn-large')
          .addClass(arrow);
}

function putExplMood(button, words, click) {
    if(button.html() == '') {
        button.attr('href', 'javascript: void(0);')
              .addClass('btnn btnn-large')
              .html(words)
              .click(click);
        button.animate({opacity: 1}, 200);
    }
}

function putExplProvide(button, words) {
    if(button.html() == '') {
        button.attr('href', 'javascript: void(0);')
              .addClass('btnn btnn-large')
              .html(words);
        button.animate({opacity: 1}, 200);
    }
}

function putExplStuff() {
    removeAllDefi();
    putExplContent(0);
    putExplNav($('#lookup-expl-prev'), 'fui-arrow-left');
    putExplNav($('#lookup-expl-next'), 'fui-arrow-right');
}

function makeProvideExpl() {
    var input = $('<textarea/>').attr('id', 'provide-expl-input')
                                .attr('type', 'text')
                                .attr('placeholder', '您可以加上您的解釋!!!')
                                .addClass('span4')
                                .keyup(function() {
                                    var val = $('#provide-expl-input').val();
                                    if($.trim(val) == '')
                                        submit.removeClass('btn-primary').addClass('btn-default');
                                    else
                                        submit.removeClass('btn-default').addClass('btn-primary');
                                });
    var submit = $('<a/>').html('送出吧')
                          .attr('href', 'javascript: void(0);')
                          .attr('class', 'btn btn-large btn-default')
                          .click(function() {
                              if(submit.hasClass('btn-default'))
                                  return;
                              putLoading();
                              var args = {
                                  expl_str: input.val(),
                                  word_id: wordId
                              };
                              reliableGet(makeExtraUrl('explain', 'provide', args), function(res) {
                                  removeLoading();
                                  if(res.status == 'OKAY') {
                                      putExplContent(res.respond);
                                  }
                                  input.val('');
                                  storeExplCache(res.respond);
                              });
                              submit.removeClass('btn-primary').addClass('btn-default');
                          });
    var provide = $('<div/>').append(input)
                             .append(submit);
    return provide;
}

function makeMoreExpl() {
    var button = $('<a/>').html('取得更多的解釋!')
                          .attr('href', 'javascript: void(0);')
                          .attr('class', 'btn btn-large btn-primary')
                          .click(function() {
                              putLoading();
                              var exclExplIds = [];
                              $.each(allExplains, function(i, expl) {
                                  exclExplIds.push(expl.id);
                              });
                              var args = {
                                  excl_expl_ids: exclExplIds.join(','),
                                  word_id: wordId
                              };
                              reliableGet(makeExtraUrl('explain', 'query', args), function(res) {
                                  removeLoading();
                                  if(res.status == 'OKAY') {
                                      putExplContent(res.respond);
                                  }
                                  storeExplCache(res.respond);
                              });
                          });
    var more = $('<div/>').append(button);
    return more;
}

function loadExpls(gagId, recomm) {
    if(!('explains' in allGagInfo[gagId]))
        allGagInfo[gagId].explains = {};
    var args = {};
    if('id' in recomm)
        args.word_id = recomm.id;
    else if('content' in recomm)
        args.word_str = recomm.content;
    else
        return;
    reliableGet(makeExtraUrl('explain', 'query', args), function(res) {
        if(res.status == 'OKAY') {
            var wordId = res.respond.word_id;
            allGagInfo[gagId].explains[wordId] = res.respond.expls;
            curWordId = wordId;
            if($('.lookup-has-explains').length > 0)
                putExplStuff();
        }
    });
}


