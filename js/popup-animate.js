function setGrowBig(main) {
    main.click(function() {
        main.unbind('click');
        $('#lookup-logo').fadeOut(200);
        main.css('height', '');
        main.animate({
            width: '400px',
            top: topOffset() + 'px',
            bottom: '64px',
        }, 200, function() {
            main.empty();
            main.removeClass('lookup-small-main').addClass('lookup-big-main');
            buildHeader(main);
            buildContent(main);
            $('#lookup-header').css('display', 'none');
            $('#lookup-content').css('display', 'none');
            $('#lookup-header').fadeIn(200);
            $('#lookup-content').fadeIn(200);
            focusQuery();
        });
    });
}

function setShrinkSmall(close) {
    close.click(function() {
        close.unbind('click');
        $('#lookup-header').fadeOut(200);
        $('#lookup-content').fadeOut(200);
        var main = $('.lookup-big-main');
        main.animate({
            width: '130px',
            height: '110px',
            top: pointOffset(60.0, 117.0) + 'px',
        }, 200, function() {
            main.empty();
            main.removeClass('lookup-big-main').addClass('lookup-small-main');
            buildLogo(main);
            $('#lookup-logo').css('display', 'none');
            $('#lookup-logo').fadeIn(200);
            setGrowBig(main);
        });
    });
}

function prepareExplContent() {
    if($('.lookup-has-explains').length > 0)
        putExplStuff();

    if($('#lookup-query').hasClass('lookup-invisible'))
        return;

    $('#lookup-query').addClass('lookup-invisible');
    setTimeout(function() {
        $('#lookup-query').fadeOut(200);
    }, 0);
    setTimeout(function() {
        $('#lookup-pre-query').animate({opacity: 0}, 200);
    }, 200);
    setTimeout(function() {
        $('#lookup-pre-recomms').animate({opacity: 0}, 200);
    }, 400);
    setTimeout(function() {
        $('#lookup-pre-recomms').removeClass('lookup-has-recomms lookup-no-recomms')
                                .addClass('lookup-from-dict')
                                .animate({opacity: 1}, 200);
    }, 600);
    setTimeout(function() {
        $('#lookup-pre-query').removeClass('lookup-more-input lookup-please-input')
                              .addClass('lookup-has-explains')
                              .animate({opacity: 1}, 200);
    }, 800);
    setTimeout(function() {
        putExplStuff();
    }, 1000);
}

function prepareExplNew() {
    $('#lookup-pre-query').slideUp(200);
    $('#lookup-expl-content-row').slideUp(200);
    $('#lookup-expl-mood-row').slideUp(200);
}

