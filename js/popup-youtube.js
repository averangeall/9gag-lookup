function putYoutube(videoId) {
    swfobject.embedSWF("https://www.youtube.com/v/" + videoId + '?enablejsapi=1&playerapiid=youtube-player&version=3',
                       'youtube-video', '640', '480', '8', null, null,
                       { allowScriptAccess: 'always' },
                       { id: 'youtube-player' });
    setTimeout(function() {
        onYouTubePlayerReady(null);
    }, 700);
}

function onYouTubePlayerReady(playerId) {
    document.getElementById('youtube-player').playVideo();
}
