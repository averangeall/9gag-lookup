function pointTriangle(triangle) {
    var triangle = $('.lookup-popup-triangle');
    var curTitle = $('.badge-in-view-focus header');
    if(curTitle.length == 0)
        return;
    var curTitleTop = curTitle.offset().top;
    var magicOffset = 80.0;
    var triangleOffset = curTitleTop - pageYOffset + magicOffset;
    var minOffset = 137.0;
    triangleOffset = (triangleOffset < minOffset) ? minOffset : triangleOffset;
    triangle.css('top', triangleOffset);
}

function adjustMainTop() {
    var main = $('.lookup-popup-main');
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
    pointTriangle();
    adjustMainTop();
    $(window).scroll(function() {
        pointTriangle();
        adjustMainTop();
    });
}

