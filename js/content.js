var containMain = $('<div/>').addClass('lookup-popup-contain-main');
var containTriangle = $('<div/>').addClass('lookup-popup-contain-triangle');

var main = $('<div/>').addClass('lookup-popup-main');
var triangle = $('<div/>').addClass('lookup-popup-triangle');

containMain.append(main);
containTriangle.append(triangle);

$('.badge-page').append(containMain)
                .append(containTriangle);

pointTriangle(triangle);
$(window).scroll(function() {
    pointTriangle(triangle);
});

