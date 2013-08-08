function buildDict() {
    var dict = $('<div/>');
    var recomms = $('<p/>').addClass('lookup-recomm')
                           .append($('<a/>').addClass('btnn btnn-large btnn-primary').attr('href', 'javascript: void(0);').html('Immature'))
                           .append(' ')
                           .append($('<a/>').addClass('btnn btnn-large btnn-primary').attr('href', 'javascript: void(0);').html('Please'))
                           .append(' ')
                           .append($('<a/>').addClass('btnn btnn-large btnn-primary').attr('href', 'javascript: void(0);').html('ConfessionBear'))
                           .append(' ')
                           .append($('<a/>').addClass('btnn btnn-large btnn-primary').attr('href', 'javascript: void(0);').html('Pretending'));
    var keywords = $('<div/>').append($('<span/>').addClass('lookup-heading-left').html('關於這篇有這些關鍵字喔'))
                              .append(recomms);
    dict.append(keywords);
    return dict;
}

function buildNotify() {
    var notify = $('<div/>');
    notify.append($('<span/>').addClass('lookup-heading-left').html('通知通知'));
    return notify;
}

function buildPersonal() {
    var personal = $('<div/>');
    var avatarFname = 'images/mario-big-man.png';
    
    personal.append($('<div/>').addClass('lookup-avatar').css('background-image', 'url(' + chrome.extension.getURL(avatarFname) + ')'));
    personal.append($('<span/>').addClass('lookup-heading-center').html('林蔭寶'));
    return personal;
}

function buildNavBtn(name, builder) {
    var nav = $('<a/>').attr('href', 'javascript: void(0);')
                       .html(name)
                       .click(function() {
                           var content = $('#lookup-popup-content');
                           content.fadeOut(200);
                           setTimeout(function() {
                               content.empty();
                               content.append(builder());
                               content.fadeIn(200);
                            }, 200);
                       });
    return nav;
}

function buildNavBar() {
    var navs = $('<div>').addClass('lookup-nav')
                         .append(buildNavBtn('字典', buildDict))
                         .append(' ')
                         .append(buildNavBtn('通知', buildNotify))
                         .append(' ')
                         .append(buildNavBtn('個人', buildPersonal));
    return navs;
}

function buildMain() {
    var contain = $('<div/>').addClass('lookup-popup-contain-main');
    var main = $('<div/>').addClass('lookup-popup-main');
    var header = $('<div/>').attr('id', 'lookup-popup-header');
    var content = $('<div/>').attr('id', 'lookup-popup-content');
    header.append(buildNavBar());
    content.append(buildDict());
    main.append(header);
    main.append(content);
    contain.append(main);
    return contain;
}

function buildTriangle() {
    var contain = $('<div/>').addClass('lookup-popup-contain-triangle');
    var triangle = $('<div/>').addClass('lookup-popup-triangle');
    contain.append(triangle);
    return contain;
}

