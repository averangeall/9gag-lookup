function pointTriangle(triangle) {
    var curTitleTop = $('.badge-in-view-focus header').offset().top;
    var magicOffset = 43.0;
    var triangleOffset = curTitleTop - pageYOffset + magicOffset;
    var minOffset = 100.0;
    triangleOffset = (triangleOffset < minOffset) ? minOffset : triangleOffset;
    triangle.css('top', triangleOffset);
}
