function pointSmall() {
    var offset = pointOffset(60.0, 117.0);
    $('.lookup-small-main').css('top', offset);
}

function pointTriangle() {
    var offset = pointOffset(80.0, 137.0);
    $('#lookup-triangle').css('top', offset);
}

function pointOffset(magicOffset, minOffset) {
    var curTitle = $('.badge-in-view-focus header');
    if(curTitle.length == 0)
        return;
    var curTitleTop = curTitle.offset().top;
    var objOffset = curTitleTop - pageYOffset + magicOffset;
    return (objOffset < minOffset) ? minOffset : objOffset;
}

function adjustMainTop() {
    var offset = topOffset();
    $('.lookup-big-main').css('top', offset);
}

function topOffset() {
    var subnav = $('.badge-sticky-subnav-static');
    subnav = (subnav.length == 0) ? $('.badge-sticky-post-page-sticky') : subnav;
    var subnavTop = subnav.offset().top;
    var subnavHeight = subnav.height();
    var magicOffset = 30.0;
    var objTopOffset = subnavTop - pageYOffset + subnavHeight + magicOffset;
    var minOffset = 64.0;
    return (objTopOffset < minOffset) ? minOffset : objTopOffset;
}

function updateScroll() {
    pointSmall();
    pointTriangle();
    adjustMainTop();
    updateGagId();
}

function setScroll() {
    updateScroll();
    $(window).scroll(function() {
        updateScroll();
    });
}

