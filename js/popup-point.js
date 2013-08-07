function pointTriangle(triangle) {
    var curTitleTop = $('.badge-in-view-focus header').offset().top;
    var magicOffset = 80.0;
    var triangleOffset = curTitleTop - pageYOffset + magicOffset;
    var minOffset = 137.0;
    triangleOffset = (triangleOffset < minOffset) ? minOffset : triangleOffset;
    triangle.css('top', triangleOffset);
}

function setPoint() {
    var triangle = $('.lookup-popup-triangle');
    pointTriangle(triangle);
    $(window).scroll(function() {
        pointTriangle(triangle);
    });
}
