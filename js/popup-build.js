function buildDict(dst) {
    var dict = $('<div/>').attr('id', 'lookup-dict');
    dst.append(dict);

    var preQuery = $('<span/>').attr('id', 'lookup-pre-query')
                               .addClass('lookup-heading-left');
    var queryContain = $('<div/>').attr('id', 'lookup-query-contain');
    var queryRow = $('<div/>').attr('id', 'lookup-query-row')
                              .append(preQuery)
                              .append(queryContain);

    var preRecomms = $('<span/>').attr('id', 'lookup-pre-recomms')
                                 .addClass('lookup-heading-left lookup-has-recomms');
    var recommsContain = $('<p/>').attr('id', 'lookup-recomms-contain');
    var recommsRow = $('<div/>').attr('id', 'lookup-recomms-row')
                                .append(preRecomms)
                                .append(recommsContain);

    var preExpl = $('<span/>').attr('id', 'lookup-pre-expl')
                              .addClass('lookup-heading-left');
    var preExplRow = $('<div/>').attr('id', 'lookup-pre-expl-row')
                                .append(preExpl);

    var explPrevContain = $('<div/>').attr('id', 'lookup-expl-prev-contain')
                                     .addClass('lookup-expl-nav-contain')
    var explNextContain = $('<div/>').attr('id', 'lookup-expl-next-contain')
                                     .addClass('lookup-expl-nav-contain')
    var explContent = $('<span/>').attr('id', 'lookup-expl-content');
    var explContentRow = $('<div/>').attr('id', 'lookup-expl-content-row')
                                    .append(explPrevContain)
                                    .append(explContent)
                                    .append(explNextContain);

    var explLikeContain = $('<span/>').attr('id', 'lookup-expl-like-contain');
    var explHateContain = $('<span/>').attr('id', 'lookup-expl-hate-contain');
    var explMoodRow = $('<div/>').attr('id', 'lookup-expl-mood-row')
                                 .addClass('lookup-expl-button-row')
                                 .append(explLikeContain)
                                 .append(' ')
                                 .append(explHateContain);

    var explContentMoodRow = $('<div/>').attr('id', 'lookup-expl-content-mood-row')
                                        .append(explContentRow)
                                        .append(explMoodRow);

    var explProvideContain = $('<div/>').attr('id', 'lookup-expl-provide-contain');
    var explProvideRow = $('<div/>').addClass('lookup-expl-button-row')
                                    .append(explProvideContain);

    var explNewInputRow = $('<div/>').attr('id', 'lookup-expl-new-input-contain');

    var explNewSubmitContain = $('<div/>').attr('id', 'lookup-expl-new-submit-contain');
    var explNewSubmitRow = $('<div/>').addClass('lookup-expl-button-row')
                                      .append(explNewSubmitContain);

    var explNewRow = $('<div/>').attr('id', 'lookup-expl-new-row')
                                .append(explNewInputRow)
                                .append(explNewSubmitRow);

    dict.append(queryRow)
        .append(recommsRow)
        .append(preExplRow)
        .append(explContentMoodRow)
        .append(explProvideRow)
        .append(explNewRow);

    putAllRecomms();
    putQueryInput();
}

function buildNotifi(dst) {
    var notifi = $('<div/>');
    dst.append(notifi);

    var allNotifis = $('<div/>').attr('id', 'lookup-all-notifis');
    var notifiNav = $('<div/>').attr('id', 'lookup-notifi-nav');
    var noNotifi = $('<div/>').attr('id', 'lookup-no-notifi')
                              .addClass('lookup-heading-left lookup-high-line');
    var explain = $('<div/>').attr('id', 'lookup-notifi-explain')
                             .addClass('lookup-heading-left lookup-high-line');

    notifi.append(allNotifis)
          .append(notifiNav)
          .append(noNotifi)
          .append(explain);

    prepareNotifiExplain();
    putNotifis();

    return notifi;
}

function buildPersonal(dst) {
    var personal = $('<div/>');
    dst.append(personal);

    var avatar = $('<div/>').attr('id', 'lookup-user-avatar');

    var name = $('<div/>').attr('id', 'lookup-user-name-contain');
    var rename = $('<div/>').attr('id', 'lookup-user-rename-contain');
    var nameRow = $('<div/>').attr('id', 'lookup-user-name-row')
                             .append(name)
                             .append(rename);

    var coin = $('<div/>').attr('id', 'lookup-user-coin-contain');
    var score = $('<div/>').attr('id', 'lookup-user-score-contain');
    var buy = $('<div/>').attr('id', 'lookup-buy-contain');
    var treaBrowse = $('<div/>').attr('id', 'lookup-treasures-browse-contain');
    var treaAction = $('<div/>').attr('id', 'lookup-treasures-action-contain');

    personal.append(avatar)
            .append(nameRow)
            .append(coin)
            .append(score)
            .append(buy)
            .append(treaBrowse)
            .append(treaAction);

    putAvatar();
    putUserInfo();

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
                           content.fadeOut(function() {
                               content.empty();
                               builder(content);
                               content.fadeIn();
                           });
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
    buildNavBtn(navs, '通知', false, buildNotifi);
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
                        .addClass('lookup-anchor lookup-heading-left fui-search');
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
            .css('height', '82px');
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

function buildMask(dst) {
    var contain = $('<div/>').attr('id', 'lookup-contain-mask');
    dst.append(contain);

    var mask = $('<div/>').attr('id', 'lookup-mask');
    contain.append(mask);
}

function buildCover(dst) {
    var contain = $('<div/>').attr('id', 'lookup-contain-cover');
    dst.append(contain);

    var cover = $('<div/>').attr('id', 'lookup-cover');
    contain.append(cover);
}

