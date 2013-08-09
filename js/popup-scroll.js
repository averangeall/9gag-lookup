function pointSmall() {
    var small = $('#lookup-small');
    pointObj(small, 60.0, 117.0);
}

function pointTriangle() {
    var triangle = $('#lookup-triangle');
    pointObj(triangle, 80.0, 137.0);
}

function pointObj(obj, magicOffset, minOffset) {
    var curTitle = $('.badge-in-view-focus header');
    if(curTitle.length == 0)
        return;
    var curTitleTop = curTitle.offset().top;
    var objOffset = curTitleTop - pageYOffset + magicOffset;
    objOffset = (objOffset < minOffset) ? minOffset : objOffset;
    obj.css('top', objOffset);
}

function adjustMainTop() {
    var main = $('#lookup-main');
    var subnav = $('.badge-sticky-subnav-static');
    subnav = (subnav.length == 0) ? $('.badge-sticky-post-page-sticky') : subnav;
    var subnavTop = subnav.offset().top;
    var subnavHeight = subnav.height();
    var magicOffset = 30.0;
    var mainTopOffset = subnavTop - pageYOffset + subnavHeight + magicOffset;
    var minOffset = 64.0;
    mainTopOffset = (mainTopOffset < minOffset) ? minOffset : mainTopOffset;
    main.css('top', mainTopOffset);
}

function setScroll() {
    pointSmall();
    pointTriangle();
    adjustMainTop();
    $(window).scroll(function() {
        pointSmall();
        pointTriangle();
        adjustMainTop();
    });
}

