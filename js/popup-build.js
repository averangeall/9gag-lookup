function buildMain() {
    var contain = $('<div/>').addClass('lookup-popup-contain-main');
    var main = $('<div/>').addClass('lookup-popup-main');
    var header = $('<div/>').attr('id', 'header');
    var navs = $('<div>').addClass('lookup-nav')
                         .append($('<a/>').attr('href', '#').html('字典'))
                         .append(' ')
                         .append($('<a/>').attr('href', '#').html('通知'))
                         .append(' ')
                         .append($('<a/>').attr('href', '#').html('個人'));
    header.append(navs);
    main.append(header);
    contain.append(main);
    return contain;
}

function buildTriangle() {
    var contain = $('<div/>').addClass('lookup-popup-contain-triangle');
    var triangle = $('<div/>').addClass('lookup-popup-triangle');
    contain.append(triangle);
    return contain;
}
