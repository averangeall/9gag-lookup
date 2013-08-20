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
    var explContent = $('#lookup-expl-content');

    explContent.empty()
               .hide();
    
    if(expl.type == 'text') {
        var text = $('<div/>').html(expl.content);
        if(expl.content.length <= 6)
            text.addClass('lookup-expl-text-big');
        else
            text.addClass('lookup-expl-text-small');
        explContent.append(text);
    } else if(expl.type == 'image') {
        var image = $('<img/>').attr('src', expl.content)
                               .attr('alt', '圖片壞掉了 : (')
                               .addClass('lookup-expl-image');
        explContent.append($('<div/>').append(image));
    } else if(expl.type == 'video') {
        if(expl.source == 'YouTube') {
            var mo = expl.content.match(/https?:\/\/www\.youtube\.com\/watch\?v=(.+)/);
            if(mo == null)
                return;
            var videoId = mo[1];
            var image = $('<img/>').attr('id', 'youtube-thumbnail-' + videoId)
                                   .attr('src', 'http://img.youtube.com/vi/' + videoId + '/mqdefault.jpg')
                                   .addClass('lookup-expl-image');
            explContent.append(image);
        }
    }

    explContent.fadeIn();
}

function putExplContent(idx) {
    if(curWordId != undefined && curWordId in allGagInfo[curGagId].explains) {
        var expls = allGagInfo[curGagId].explains[curWordId];
        if(expls.length > idx) {
            curExplId = expls[idx].id;
            putSingleExpl(expls[idx]);
            putExplMood($('#lookup-expl-like-contain'), 'lookup-expl-like', '這個解釋好', expls[idx].liked);
            putExplMood($('#lookup-expl-hate-contain'), 'lookup-expl-hate', '這個解釋爛', expls[idx].hated);
            if(expls[idx].hated)
                putExplProvide($('#lookup-expl-provide-contain'));
            else
                $('#lookup-expl-provide-contain').hide();
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
        $('#lookup-expl-provide-contain').fadeOut();
        reliableGet(makeExtraUrl('explain', 'like', {expl_id: curExplId}), function() { });
        setExplMood('liked', true);
    } else if(toggle == 'off') {
        reliableGet(makeExtraUrl('explain', 'neutral', {expl_id: curExplId}), function() { });
        setExplMood('liked', false);
    }
}

function clickHate(toggle) {
    if(toggle == 'on') {
        putExplProvide($('#lookup-expl-provide-contain'));
        reliableGet(makeExtraUrl('explain', 'hate', {expl_id: curExplId}), function() { });
        setExplMood('hated', true);
    } else if(toggle == 'off') {
        $('#lookup-expl-provide-contain').fadeOut();
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
        $('#lookup-expl-prev').removeClass('lookup-expl-nav-active').attr('disabled', '');
    else
        $('#lookup-expl-prev').addClass('lookup-expl-nav-active').removeAttr('disabled');

    putExplContent(idx);
}

function putExplNav(dst, id, arrow, enabled) {
    var button = $('<a/>').attr('id', id)
                          .attr('href', 'javascript: void(0);')
                          .addClass('btnn btnn-large')
                          .addClass(arrow)
                          .click(clickExplNav);
    if(enabled)
        button.addClass('lookup-expl-nav-active');
    else
        button.attr('disabled', '');

    dst.empty()
       .hide()
       .append(button)
       .fadeIn();
}

function putExplMood(dst, id, words, on) {
    var button = $('<a/>').attr('id', id)
                          .attr('href', 'javascript: void(0);')
                          .addClass('btnn btnn-large')
                          .html(words)
                          .click(clickMood);
    if(on)
        button.addClass('lookup-mood-on');
    else
        button.removeClass('lookup-mood-on');

    dst.empty()
       .hide()
       .append(button)
       .fadeIn();
}

function putExplBothNavs() {
    putExplNav($('#lookup-expl-prev-contain'), 'lookup-expl-prev', 'fui-arrow-left', false);
    putExplNav($('#lookup-expl-next-contain'), 'lookup-expl-next', 'fui-arrow-right', true);
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
            if($('.lookup-in-dict').length > 0)
                putExplContent(0);
        }
    });
}

