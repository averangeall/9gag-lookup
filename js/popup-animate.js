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
            width: '91px',
            height: '83px',
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

function autoType(input, text, totalTime, callback) {
    var timerId = setInterval(function() {
        if(text == input.val()) {
            clearInterval(timerId);
            callback();
            return;
        }
        if(text.match('^' + input.val()) != null || input.val() == ' ') {
            input.val(text.substr(0, input.val().length + 1));
        } else {
            input.val(input.val().substr(0, input.val().length - 1));
            if(input.val() == '')
                input.val(' ');
        }
    }, 50);
}

function prepareExplContent(wordStr) {
    if($('.lookup-has-explains').length > 0)
        putExplStuff();

    autoType($('#lookup-query'), wordStr, 200, function() {
        $('#lookup-recomms-row').slideUp(1000, function() {
            putExplStuff();
        });
    });
}

function prepareExplNew() {
    $('#lookup-pre-query').slideUp(200);
    $('#lookup-expl-content-row').slideUp(200);
    $('#lookup-expl-mood-row').slideUp(200);
}

