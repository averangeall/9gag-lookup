function setGrowBig(main) {
    main.click(function() {
        main.unbind('click');
        $('#lookup-logo').fadeOut(200);
        main.css('height', '');
        main.animate({
            width: '400px',
            top: '64px',
            bottom: '64px',
        }, 200, function() {
            main.removeClass('lookup-small-main').addClass('lookup-big-main');
            main.append(buildHeader());
            main.append(buildContent());
            $('#lookup-header').css('display', 'none');
            $('#lookup-content').css('display', 'none');
            $('#lookup-header').fadeIn(200);
            $('#lookup-content').fadeIn(200);
        });
    });
}
