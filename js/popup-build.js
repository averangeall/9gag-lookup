function buildDict() {
    var dict = $('<div/>');
    var recomms = $('<p/>').attr('id', 'lookup-recomm')
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
    var avatar = $('<div/>').attr('id', 'lookup-avatar')
                            .css('background-image', 'url(' + chrome.extension.getURL(avatarFname) + ')');
    personal.append(avatar);
    personal.append($('<span/>').addClass('lookup-heading-center').html('林蔭寶'));
    return personal;
}

function buildNavBtn(name, builder) {
    var nav = $('<a/>').attr('href', 'javascript: void(0);')
                       .addClass('lookup-anchor')
                       .html(name)
                       .click(function() {
                           var content = $('#lookup-content');
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
    var navs = $('<div>').attr('id', 'lookup-nav')
                         .append(buildNavBtn('字典', buildDict))
                         .append(' ')
                         .append(buildNavBtn('通知', buildNotify))
                         .append(' ')
                         .append(buildNavBtn('個人', buildPersonal));
    return navs;
}

function buildHeader() {
    var header = $('<div/>').attr('id', 'lookup-header');
    header.append(buildNavBar());
    return header;
}

function buildContent() {
    var content = $('<div/>').attr('id', 'lookup-content');
    content.append(buildDict());
    return content;
}

function buildLogo() {
    var logo = $('<a/>').attr('id', 'lookup-logo')
                        .addClass('lookup-anchor lookup-heading-left')
                        .html('9GAG 字典');
    return logo;
}

function buildMain(which) {
    var main = $('<div/>');
    if(which == 'big') {
        main.addClass('lookup-big-main');
        main.append(buildHeader());
        main.append(buildContent());
    } else if(which == 'small') {
        main.addClass('lookup-small-main')
            .css('height', '110px');
        main.append(buildLogo());
        setGrowBig(main);
    }
    var contain = $('<div/>').attr('id', 'lookup-contain-main')
                             .append(main);
    return contain;
}

function buildTriangle() {
    var contain = $('<div/>').attr('id', 'lookup-contain-triangle');
    var triangle = $('<div/>').attr('id', 'lookup-triangle');
    contain.append(triangle);
    return contain;
}

