function resetExplSpace() {
    $('#lookup-expl-content').empty();
    $('#lookup-expl-provide').animate({opacity: 0}, 200);
}

function getCurExplIdx() {
    var expls = allGagInfo[curGagId].explains[curWordId];
    var idx = -1;
    $.each(expls, function(i, expl) {
        if(expl.id == curExplId) {
            idx = i;
            return false;
        }
    });
    return idx;
}

function putSingleExpl(expl) {
    var whole = $('<div/>').attr('id', 'expl-' + expl.id);
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
                               .addClass('lookup-expl-image');
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
                                   'youtube-' + videoId, "249", "180", "8", null, null, null, null);
            }, 500);
        }
    }
    whole.append(explPart);
    $('#lookup-expl-content').append(whole);
}

function putExplContent(idx) {
    resetExplSpace();
    if(curWordId != undefined && curWordId in allGagInfo[curGagId].explains) {
        var expls = allGagInfo[curGagId].explains[curWordId];
        if(expls.length > idx) {
            curExplId = expls[idx].id;
            putSingleExpl(expls[idx]);
            putExplMood($('#lookup-expl-like'), '這個解釋好', expls[idx].liked);
            putExplMood($('#lookup-expl-hate'), '這個解釋爛', expls[idx].hated);
            if(expls[idx].hated)
                putExplProvide($('#lookup-expl-provide'));
        }
    }
}

function setExplMood(which, value) {
    var expls = allGagInfo[curGagId].explains[curWordId];
    var idx = getCurExplIdx();
    expls[idx].liked = expls[idx].hated = false;
    expls[idx][which] = value;
}

function clickLike(toggle) {
    if(toggle == 'on') {
        $('#lookup-expl-provide').animate({opacity: 0}, 200);
        reliableGet(makeExtraUrl('explain', 'like', {expl_id: curExplId}), function() { });
        setExplMood('liked', true);
    } else if(toggle == 'off') {
        reliableGet(makeExtraUrl('explain', 'neutral', {expl_id: curExplId}), function() { });
        setExplMood('liked', false);
    }
}

function clickHate(toggle) {
    if(toggle == 'on') {
        putExplProvide($('#lookup-expl-provide'));
        reliableGet(makeExtraUrl('explain', 'hate', {expl_id: curExplId}), function() { });
        setExplMood('hated', true);
    } else if(toggle == 'off') {
        $('#lookup-expl-provide').animate({opacity: 0}, 200);
        reliableGet(makeExtraUrl('explain', 'neutral', {expl_id: curExplId}), function() { });
        setExplMood('hated', false);
    }
}

function clickMood(evt) {
    var button = $(evt.target);
    var todo;
    if(button.attr('id') == 'lookup-expl-like')
        todo = clickLike;
    else if(button.attr('id') == 'lookup-expl-hate')
        todo = clickHate;

    if(button.hasClass('lookup-mood-on')) {
        button.removeClass('lookup-mood-on');
        todo('off');
    } else {
        $('#lookup-expl-like').removeClass('lookup-mood-on');
        $('#lookup-expl-hate').removeClass('lookup-mood-on');
        button.addClass('lookup-mood-on');
        todo('on');
    }
}

function clickExplNav(evt) {
    var button = $(evt.target);
    if(!button.hasClass('lookup-expl-nav-active'))
        return;

    var idx = getCurExplIdx();
    if(button.attr('id') == 'lookup-expl-prev')
        -- idx;
    else if(button.attr('id') == 'lookup-expl-next')
        ++ idx;

    if(idx < 0)
        return;
    else if(idx == 0)
        $('#lookup-expl-prev').removeClass('lookup-expl-nav-active');
    else
        $('#lookup-expl-prev').addClass('lookup-expl-nav-active');

    putExplContent(idx);
}

function putExplNav(button, arrow) {
    button.attr('href', 'javascript: void(0);')
          .addClass('btnn btnn-large')
          .addClass(arrow)
          .click(clickExplNav);
}

function putExplMood(button, words, on) {
    if(button.html() == '') {
        button.attr('href', 'javascript: void(0);')
              .addClass('btnn btnn-large')
              .html(words)
              .click(clickMood);
        button.animate({opacity: 1}, 200);
    }
    if(on)
        button.addClass('lookup-mood-on');
    else
        button.removeClass('lookup-mood-on');
}

function putExplProvide(button) {
    if(button.html() == '') {
        button.attr('href', 'javascript: void(0);')
              .addClass('btnn btnn-large btnn-primary')
              .html('提供新的解釋給大家看');
    }
    button.animate({opacity: 1}, 200);
}

function putExplStuff() {
    putExplContent(0);
    putExplNav($('#lookup-expl-prev'), 'fui-arrow-left', clickExplNav);
    putExplNav($('#lookup-expl-next'), 'fui-arrow-right', clickExplNav);
    $('#lookup-expl-next').addClass('lookup-expl-nav-active')
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


