function removeAllDefi() {
    $('#explains').empty();
}

function genMoodIcon(name, explId) {
    var mood = $('<a/>').attr('href', 'javascript: void(0);')
                        .attr('class', name)
                        .attr('data-expl-id', explId)
                        .append($('<img/>').attr('class', 'mood-icon off'))
                        .append($('<img/>').attr('src', 'images/blank.png'));
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
    console.log(expl);
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
    $('#explains').append(whole);
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
            expls = res.respond;
            $.each(expls, function(idx, expl) {
                putHLine($('#explains'));
                putSingleExpl(expl);
            });
            putHLine($('#explains'));
        }
    });
}
