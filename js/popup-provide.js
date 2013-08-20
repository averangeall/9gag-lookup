function putExplProvide(dst) {
    var button = $('<a/>').attr('id', 'lookup-expl-provide')
                          .attr('href', 'javascript: void(0);')
                          .addClass('btnn btnn-large btnn-warning')
                          .html('提供新的解釋給大家看');
    button.click(function() {
        makeNewExplSpace();
        $('#lookup-expl-content-mood-row').slideUp(function() {
            $('#lookup-expl-new-row').fadeIn();
        });
    });

    dst.empty()
       .hide()
       .append(button)
       .fadeIn();
}

function makeNewInput() {
    var input = $('<textarea/>').attr('id', 'lookup-expl-new-input')
                                .attr('type', 'text')
                                .attr('placeholder', '您可以加上您的解釋!!!')
                                .attr('cols', 20)
                                .attr('rows', 5);

    input.keyup(function() {
        var val = $('#lookup-expl-new-input').val();
        if($.trim(val) == '')
            $('#lookup-expl-new-submit').removeClass('btnn-primary');
        else
            $('#lookup-expl-new-submit').addClass('btnn-primary');
    });

    $('#lookup-expl-new-input-contain').append(input);
}

function makeNewSubmit() {
    var submit = $('<a/>').attr('id', 'lookup-expl-new-submit')
                          .html('送出吧')
                          .attr('href', 'javascript: void(0);')
                          .attr('class', 'btnn btnn-large');

    submit.click(function() {
        var val = $('#lookup-expl-new-input').val();
        if($.trim(val) == '')
            return;
        var args = {
            expl_str: $.trim(val),
            word_id: curWordId
        };
        reliableGet(makeExtraUrl('explain', 'provide', args), function(res) {
            if(res.status == 'OKAY') {
                loadExpls(curGagId, {id: curWordId});
                $('#lookup-expl-content-mood-row').slideDown();
            }
        });
        $('#lookup-expl-new-row').fadeOut();
    });

    $('#lookup-expl-new-submit-contain').append(submit);
}

function makeNewCancel() {
    var cancel = $('<a/>').attr('id', 'lookup-expl-new-cancel')
                          .html('取消')
                          .attr('href', 'javascript: void(0);')
                          .attr('class', 'btnn btnn-large');

    cancel.click(function() {
        $('#lookup-expl-new-row').fadeOut(function() {
            $('#lookup-expl-content-mood-row').slideDown();
        });
    });

    $('#lookup-expl-new-submit-contain').append(cancel);
}

function makeNewExplSpace() {
    $('#lookup-expl-new-row').hide();

    $('#lookup-expl-new-input-contain').empty();
    $('#lookup-expl-new-submit-contain').empty();

    makeNewInput();
    makeNewSubmit();
    $('#lookup-expl-new-submit-contain').append(' ');
    makeNewCancel();
}

