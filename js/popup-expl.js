function removeAllDefi() {
    $('#explains').empty();
}

function genMoodIcon(name, explId) {
    var mood = $('<a/>').attr('href', '#')
                        .css('float', 'right')
                        .attr('class', name)
                        .attr('data-expl-id', explId)
                        .append($('<img/>').attr('class', 'mood-icon off'))
                        .append($('<img/>').attr('src', 'images/blank.png'));
    return mood;
}

function setMoodIconClick(one, other) {
    one.click(function() {
        var explId = one.attr('data-expl-id');
        var action = one.attr('class');
        var here = one.children('.mood-icon');
        var there = other.children('.mood-icon');
        if(here.hasClass('on')) {
            here.removeClass('on').addClass('off');
            reliableGet(makeExtraUrl('explain', 'plain', {expl_id: explId}), function() { });
        } else if(here.hasClass('off')) {
            here.removeClass('off').addClass('on');
            there.removeClass('on').addClass('off');
            reliableGet(makeExtraUrl('explain', action, {expl_id: explId}), function() { });
        }
    });
}

function putSingleExpl(expl) {
    var whole = $('<p/>');
    var hate = genMoodIcon('hate', expl.id);
    var like = genMoodIcon('like', expl.id);
    setMoodIconClick(hate, like);
    setMoodIconClick(like, hate);
    whole.append(hate);
    whole.append(like);
    $('#explains').append(whole);
    if(expl.type == 'text') {
        whole.append($('<h4/>').html(expl.content));
    } else if(expl.type == 'image') {
        var image = $('<img/>').attr('src', expl.content)
                               .attr('alt', '圖片壞掉了 : (')
                               .css('max-width', '80%');
        whole.append($('<p/>').append(image));
    } else if(expl.type == 'video') {
        if(expl.src == 'Youtube') {
            var mo = expl.content.match(/https?:\/\/www\.youtube\.com\/watch\?v=(.+)/);
            if(mo == null || mo.length != 2)
                return;
            var videoId = mo[1];
            var divYoutube = $('<div/>').attr('id', 'youtube-' + videoId)
                                        .html('You need Flash player 8+ and JavaScript enabled to view this video.');
            whole.append(divYoutube);
            swfobject.embedSWF("https://www.youtube.com/v/" + videoId,
                               'youtube-' + videoId, "300", "200", "8", null, null, null, null);
        }
    }
    whole.append($('<span/>').html(' from '));
    whole.append($('<a/>').attr('href', expl.link).attr('target', '_blank').html(expl.source));
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
            for(var i in expls) {
                putHLine($('#explains'));
                putSingleExpl(expls[i]);
            }
            putHLine($('#explains'));
        }
    });
}
