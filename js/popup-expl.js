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
    var content = $('#lookup-expl-content');

    content.empty()
           .hide();
    
    if(expl.type == 'text') {
        var text = $('<div/>').html(expl.content);
        if(expl.content.length <= 6)
            text.addClass('lookup-expl-text-big');
        else
            text.addClass('lookup-expl-text-small');
        content.append(text);
    } else if(expl.type == 'image') {
        var thumb = $('<img/>').addClass('lookup-expl-image-thumb')
                               .attr('src', expl.content);
        thumb.click(function() {
            var image = $('<img/>').addClass('lookup-expl-image')
                                   .attr('src', expl.content);
            showMaskCover(image);
        });
        content.append($('<div/>').append(thumb));
    } else if(expl.type == 'video') {
        if(expl.source == 'YouTube') {
            var mo = expl.content.match(/https?:\/\/www\.youtube\.com\/watch\?v=(.+)/);
            if(mo == null)
                return;
            var videoId = mo[1];
            var thumb = $('<div/>').addClass('lookup-expl-youtube-thumb')
                                   .css('background-image', 'url(http://img.youtube.com/vi/' + videoId + '/mqdefault.jpg)');
            var play = $('<a/>').addClass('lookup-expl-youtube-play');
            thumb.append(play);
            thumb.click(function() {
                var video = $('<div/>').attr('id', 'youtube-video');
                showMaskCover(video);
                putYoutube(videoId);
            });
            content.append(thumb);
        }
    }

    content.fadeIn();
}

function putExplLoading() {
    $('#lookup-expl-like-contain').empty();
    $('#lookup-expl-hate-contain').empty();
    var content = $('#lookup-expl-content');

    var loading = $('<div/>').addClass('lookup-loading');

    content.empty()
           .append(loading);
}

function getCachedExpls() {
    if(curWordId != undefined && curWordId in allGagInfo[curGagId].explains) {
        return allGagInfo[curGagId].explains[curWordId];
    }
    return null;
}

function addCachedExpls(extraExpls) {
    var expls = allGagInfo[curGagId].explains;
    if(curWordId in expls) {
        expls[curWordId].push.apply(expls[curWordId], extraExpls);
    } else {
        expls[curWordId] = extraExpls;
    }

    $.each(extraExpls, function(i, expl) {
        if(expl.type == 'image') {
            var img = $('<img/>').attr('src', expl.content);
        }
    });
}

function refreshExplPrevNav(idx) {
    var prev = $('#lookup-expl-prev');
    if(idx == 0) {
        prev.removeClass('lookup-expl-nav-active')
            .attr('disabled', '');
    } else {
        prev.addClass('lookup-expl-nav-active')
            .removeAttr('disabled');
    }
}

function putExplContent(idx) {
    var expls = getCachedExpls();

    refreshExplPrevNav(idx);

    if(expls == null || expls.length <= idx) {
        putExplLoading();
        return false;
    }

    curExplId = expls[idx].id;
    putSingleExpl(expls[idx]);
    putExplMood($('#lookup-expl-like-contain'), 'lookup-expl-like', '這個解釋好', expls[idx].liked);
    putExplMood($('#lookup-expl-hate-contain'), 'lookup-expl-hate', '這個解釋爛', expls[idx].hated);
    $('#lookup-expl-next').removeAttr('disabled')
                          .addClass('lookup-expl-nav-active');
    if(expls[idx].hated)
        putExplProvide($('#lookup-expl-provide-contain'));
    else
        $('#lookup-expl-provide-contain').hide();
    return true;
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
    idx = (idx < 0) ? 0 : idx;

    refreshExplPrevNav(idx);

    var loaded = putExplContent(idx);
    if(!loaded) {
        var exclExplIds = [];
        $.each(getCachedExpls(), function(i, v) {
            exclExplIds.push(v.id);
        });
        reliableGet(makeExtraUrl('explain', 'query', {word_id: curWordId, excl_expl_ids: exclExplIds.join()}), function(res) {
            if(res.status != 'OKAY') {
                return;
            }

            addCachedExpls(res.respond.expls);
            putExplContent(idx);
        });
    }
}

function putExplNav(dst, id, arrow, enabled) {
    var button = $('<a/>').attr('id', id)
                          .attr('href', 'javascript: void(0);')
                          .attr('disabled', '')
                          .addClass('btnn btnn-large lookup-expl-nav-button')
                          .addClass(arrow)
                          .click(clickExplNav);

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
    putExplNav($('#lookup-expl-prev-contain'), 'lookup-expl-prev', 'fui-arrow-left');
    putExplNav($('#lookup-expl-next-contain'), 'lookup-expl-next', 'fui-arrow-right');
}

function loadExpls(recomm) {
    if(!('explains' in allGagInfo[curGagId]))
        allGagInfo[curGagId].explains = {};
    var args = {};
    if('id' in recomm)
        args.word_id = recomm.id;
    else if('content' in recomm)
        args.word_str = recomm.content;
    else
        return;
    reliableGet(makeExtraUrl('explain', 'query', args), function(res) {
        if(res.status == 'OKAY') {
            curWordId = res.respond.word_id;
            addCachedExpls(res.respond.expls);
            if($('.lookup-in-dict').length > 0)
                putExplContent(0);
        }
    });
}

