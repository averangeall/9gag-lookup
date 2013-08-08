function buildMain() {
    var contain = $('<div/>').addClass('lookup-popup-contain-main');
    var main = $('<div/>').addClass('lookup-popup-main');
    var header = $('<div/>').attr('id', 'header');
    var navs = $('<div>').addClass('lookup-nav')
                         .append($('<a/>').attr('href', 'javascript: void(0);').html('字典'))
                         .append(' ')
                         .append($('<a/>').attr('href', 'javascript: void(0);').html('通知'))
                         .append(' ')
                         .append($('<a/>').attr('href', 'javascript: void(0);').html('個人'));
    var recomms = $('<p/>').addClass('lookup-recomm')
                           .append($('<a/>').addClass('btnn btnn-large btnn-primary').attr('href', 'javascript: void(0);').html('Immature'))
                           .append(' ')
                           .append($('<a/>').addClass('btnn btnn-large btnn-primary').attr('href', 'javascript: void(0);').html('Please'))
                           .append(' ')
                           .append($('<a/>').addClass('btnn btnn-large btnn-primary').attr('href', 'javascript: void(0);').html('ConfessionBear'))
                           .append(' ')
                           .append($('<a/>').addClass('btnn btnn-large btnn-primary').attr('href', 'javascript: void(0);').html('Pretending'));
    var keywords = $('<div/>').append($('<span/>').addClass('lookup-heading').html('關於這篇有這些關鍵字喔'))
                              .append(recomms);
    header.append(navs);
    main.append(header);
    main.append(keywords);
    contain.append(main);
    return contain;
}

function buildTriangle() {
    var contain = $('<div/>').addClass('lookup-popup-contain-triangle');
    var triangle = $('<div/>').addClass('lookup-popup-triangle');
    contain.append(triangle);
    return contain;
}
