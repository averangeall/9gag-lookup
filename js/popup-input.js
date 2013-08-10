function putUserRecomm() {
    if($.trim(inputRecomm) != '')
        putSingleRecomm({content: inputRecomm});
}

function setRecommBtnClass() {
    $.each($('#recomm-words p a'), function(idx) {
        if(idx == 0)
            $(this).attr('class', 'btn btn-large btn-info')
    });
}

function focusInput() {
    $('#input').focus();
}

function setInputListener() {
    if($('#lookup-input').length == 0)
        return;
    $('#lookup-input').keyup(function(evt) {
        inputRecomm = $('#lookup-input').val();
        if(evt.which == 13) {
            $.each($('#recomm-words p a'), function(idx) {
                if(idx == 0)
                    $(this).click();
            });
        } else {
            filterRecomm();
            putUserRecomm();
            setRecommBtnClass();
        }
    });
}
