function removeAllDefi() {
    $('#explains').empty();
}

function putSingleExpl(expl) {
    var whole = $('<p/>');
    $('#explains').append(whole);
    if(expl.type == 'text') {
        whole.append($('<h4/>').html(expl.content));
    } else if(expl.type == 'image') {
        var image = $('<img/>').attr('src', expl.content)
                               .css('max-width', '80%');
        whole.append(image);
    } else if(expl.type == 'video') {
        if(expl.src == 'youtube.com') {
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
