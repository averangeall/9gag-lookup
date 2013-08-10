function buildDict(dst) {
    var dict = $('<div/>').attr('id', 'lookup-dict');
    dst.append(dict);

    var recomms = $('<p/>').attr('id', 'lookup-recomms');
    var keywords = $('<div/>').append($('<span/>').addClass('lookup-heading-left lookup-has-recomms'))
                              .append($('<span/>').addClass('lookup-heading-left lookup-grey-word').html('l'))
                              .append(recomms);
    var input = $('<input/>').attr('id', 'lookup-input')
                             .attr('type', 'text')
                             .attr('placeholder', '請在這裡輸入');
    var enter = $('<div/>').append($('<span/>').addClass('lookup-heading-left lookup-more-input'))
                           .append(input);
    dict.append(keywords)
        .append(enter);
}

function afterDict() {
    putAllRecomms();
    setInputListener();
}

function buildNotify(dst) {
    var notify = $('<div/>');
    dst.append(notify);

    notify.append($('<span/>').addClass('lookup-heading-left').html('通知通知'));
    return notify;
}

function afterNotify() {
}

function buildPersonal(dst) {
    var personal = $('<div/>');
    dst.append(personal);

    var avatarFname = 'images/mario-big-man.png';
    var avatar = $('<div/>').attr('id', 'lookup-avatar')
                            .css('background-image', 'url(' + chrome.extension.getURL(avatarFname) + ')');
    personal.append(avatar);
    personal.append($('<span/>').addClass('lookup-heading-center').html('林蔭寶'));
    return personal;
}

function afterPersonal() {
}

function buildNavBtn(dst, name, builder, after) {
    var nav = $('<a/>').attr('href', 'javascript: void(0);')
                       .addClass('lookup-nav-btn')
                       .html(name)
                       .click(function() {
                           var content = $('#lookup-content');
                           content.fadeOut(200);
                           setTimeout(function() {
                               content.empty();
                               builder(content);
                               after();
                               content.fadeIn(200);
                            }, 200);
                       });
    dst.append(nav);
}

function buildCloseBtn(dst) {
    var close = $('<a/>').attr('href', 'javascript: void(0);')
                       .addClass('lookup-close-btn fui-cross');
    dst.append(close);
    setShrinkSmall(close);
}

function buildNavBar(dst) {
    var navs = $('<div>').attr('id', 'lookup-nav-bar');
    dst.append(navs);

    buildNavBtn(navs, '字典', buildDict, afterDict);
    navs.append(' ');
    buildNavBtn(navs, '通知', buildNotify, afterNotify);
    navs.append(' ');
    buildNavBtn(navs, '個人', buildPersonal, afterPersonal);
    navs.append(' ');
    buildCloseBtn(navs);
}

function buildHeader(dst) {
    var header = $('<div/>').attr('id', 'lookup-header');
    dst.append(header);
    buildNavBar(header);
}

function buildContent(dst) {
    var content = $('<div/>').attr('id', 'lookup-content');
    dst.append(content);
    buildDict(content);
    afterDict();
}

function buildLogo(dst) {
    var logo = $('<a/>').attr('id', 'lookup-logo')
                        .addClass('lookup-anchor lookup-heading-left')
                        .html('9GAG<br/>字典');
    dst.append(logo);
}

function buildMain(dst, which) {
    var contain = $('<div/>').attr('id', 'lookup-contain-main');
    dst.append(contain);

    var main = $('<div/>');
    if(which == 'big') {
        main.addClass('lookup-big-main');
        buildHeader(main);
        buildContent(main);
    } else if(which == 'small') {
        main.addClass('lookup-small-main')
            .css('height', '110px');
        buildLogo(main);
        setGrowBig(main);
    }
    contain.append(main);
}

function buildTriangle(dst) {
    var contain = $('<div/>').attr('id', 'lookup-contain-triangle');
    dst.append(contain);

    var triangle = $('<div/>').attr('id', 'lookup-triangle');
    contain.append(triangle);
}

