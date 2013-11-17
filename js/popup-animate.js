function setGrowBig(main) {
    main.click(function() {
        main.unbind('click');
        $('#lookup-logo').fadeOut();
        main.css('height', '');
        main.animate({
            width: '400px',
            top: topOffset() + 'px',
            borderTopLeftRadius: '3px',
            borderTopRightRadius: '3px',
            borderBottomLeftRadius: '3px',
            borderBottomRightRadius: '3px',
            bottom: '64px',
        }, function() {
            main.empty();
            main.removeClass('lookup-small-main').addClass('lookup-big-main');
            buildHeader(main);
            buildContent(main);
            $('#lookup-header').css('display', 'none');
            $('#lookup-content').css('display', 'none');
            $('#lookup-header').fadeIn();
            $('#lookup-content').fadeIn();
            focusQuery();
        });
    });
}

function setShrinkSmall(close) {
    close.click(function() {
        close.unbind('click');
        $('#lookup-header').fadeOut();
        $('#lookup-content').fadeOut();
        var main = $('.lookup-big-main');
        main.animate({
            width: '91px',
            height: '82px',
            borderTopLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderBottomRightRadius: '50%',
            top: pointOffset(60.0, 117.0) + 'px',
        }, function() {
            main.empty();
            main.removeClass('lookup-big-main').addClass('lookup-small-main');
            buildLogo(main);
            $('#lookup-logo').css('display', 'none');
            $('#lookup-logo').fadeIn();
            setGrowBig(main);
        });
    });
}

function autoType(input, text, callback) {
    var timerId = setInterval(function() {
        if(text.match(new RegExp('^' + input.val() + '$', 'i')) != null) {
            clearInterval(timerId);
            callback();
            return;
        }
        if(text.match(new RegExp('^' + input.val(), 'i')) != null) {
            input.val(input.val() + text.substr(input.val().length, 1));
        } else if(input.val() == ' ') {
            input.val(text.substr(0, 1));
        } else {
            input.val(input.val().substr(0, input.val().length - 1));
            if(input.val() == '')
                input.val(' ');
        }
    }, 50);
}

function prepareExplContent(wordStr) {
    autoType($('#lookup-query'), wordStr, function() {
        $('#lookup-recomms-row').slideUp(function() {
            var preExpl = $('#lookup-pre-expl');
            if(!preExpl.hasClass('lookup-in-dict')) {
                putExplBothNavs();
                preExpl.hide()
                       .addClass('lookup-in-dict')
                       .fadeIn();
            }
            putExplContent(0);
        });
    });
}

