function hideMaskCover() {
    $('#lookup-cover').fadeOut();
    $('#lookup-mask').fadeOut();
}

function showMaskCover(content) {
    $('#lookup-cover').hide();
    $('#lookup-mask').hide();

    $('#lookup-cover').click(hideMaskCover);
    $('#lookup-mask').click(hideMaskCover);

    $('#lookup-cover').empty()
                      .append(content);
    $('#lookup-mask').addClass('lookup-activate');

    $('#lookup-cover').fadeIn();
    $('#lookup-mask').fadeIn();
}
