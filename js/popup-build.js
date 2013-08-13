function buildDict(dst) {
    var dict = $('<div/>').attr('id', 'lookup-dict');
    dst.append(dict);

    var recomms = $('<p/>').attr('id', 'lookup-recomms');
    var keywords = $('<div/>').append($('<span/>').addClass('lookup-heading-left lookup-pre-recomms lookup-has-recomms'))
                              .append(recomms);

    var input = $('<input/>').attr('id', 'lookup-input')
                             .attr('type', 'text')
                             .attr('placeholder', '請在這裡輸入');
    var enter = $('<div/>').append($('<span/>').addClass('lookup-heading-left lookup-pre-input lookup-more-input'))
                           .append(input);

    var explRow1 = $('<div/>').attr('id', 'lookup-expl-content-row')
                              .append($('<div/>').addClass('lookup-expl-nav-button').append($('<a/>').attr('id', 'lookup-expl-prev')))
                              .append($('<span/>').attr('id', 'lookup-expl-content'))
                              .append($('<div/>').addClass('lookup-expl-nav-button').append($('<a/>').attr('id', 'lookup-expl-next')));
    var explRow2 = $('<div/>').addClass('lookup-expl-button-row')
                              .append($('<a/>').css('opacity', 0).attr('id', 'lookup-expl-like'))
                              .append(' ')
                              .append($('<a/>').css('opacity', 0).attr('id', 'lookup-expl-hate'));
    var explRow3 = $('<div/>').addClass('lookup-expl-button-row')
                              .append($('<a/>').css('opacity', 0).attr('id', 'lookup-expl-provide'));
    var explRow4 = $('<div/>').append($('<div/>').attr('id', 'lookup-expl-new-input-contain'));
    var explRow5 = $('<div/>').append($('<div/>').attr('id', 'lookup-expl-new-submit-contain'));
    var explPart1 = $('<div/>').attr('id', 'lookup-expl-upper-part')
                               .append(explRow1)
                               .append($('<div/>').addClass('lookup-expl-space-row-small'))
                               .append(explRow2);
    var explPart2 = $('<div/>').attr('id', 'lookup-expl-lower-part')
                               .append($('<div/>').addClass('lookup-expl-space-row-big'))
                               .append(explRow3)
                               .append($('<div/>').addClass('lookup-expl-space-row-small'))
                               .append(explRow4)
                               .append($('<div/>').addClass('lookup-expl-space-row-small'))
                               .append(explRow5);
    var expls = $('<div/>').attr('id', 'lookup-expls')
                           .append(explPart1)
                           .append(explPart2);

    dict.append(keywords)
        .append(enter)
        .append(expls);

    putAllRecomms();
    setInputListener();
}

function buildNotify(dst) {
    var notify = $('<div/>');
    dst.append(notify);

    notify.append($('<span/>').addClass('lookup-heading-left').html('通知通知'));
    return notify;
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

function buildNavBtn(dst, name, chosen, builder) {
    var nav = $('<a/>').attr('href', 'javascript: void(0);')
                       .addClass('lookup-nav-btn')
                       .html(name)
                       .click(function() {
                           $('.lookup-nav-chosen').removeClass('lookup-nav-chosen');
                           $(this).addClass('lookup-nav-chosen');
                           var content = $('#lookup-content');
                           content.fadeOut(200);
                           setTimeout(function() {
                               content.empty();
                               builder(content);
                               content.fadeIn(200);
                            }, 200);
                       });
    if(chosen)
        nav.addClass('lookup-nav-chosen');
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

    buildNavBtn(navs, '字典', true, buildDict);
    navs.append(' ');
    buildNavBtn(navs, '通知', false, buildNotify);
    navs.append(' ');
    buildNavBtn(navs, '個人', false, buildPersonal);
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

