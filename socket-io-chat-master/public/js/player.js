var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var videoId;
var id = window.location.href.split('/').last();
var current;

function getVideoID(url)
{
    console.log(url);
    var regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if(match && match[2].length == 11)
    {
        // console.log(match[2]);
        return match[2];
    }
    else
    {
        // console.log(url);
        return url;
    }
}

function onYouTubeIframeAPIReady()
{
    if(window.innerWidth >= 992){
      player = new YT.Player('player',
      {
          // height: "100%",
          width: "100%",
          playerVars:
          {
              'controls': 0
          },
          // videoId: ,
          events:
          {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
          }
      });
    }
}

function onPlayerReady(event)
{
    // event.target.playVideo();
}
// var done = false;
function onPlayerStateChange(event)
{
    switch(event.data)
    {
        case YT.PlayerState.ENDED:
            var id = playlist[current + 1].videoId;
            player.loadVideoById(id);
            current++;
            break;
        case YT.PlayerState.PLAYING:
            break;
        case YT.PlayerState.PAUSED:
            break;
        case YT.PlayerState.BUFFERING:
            break;
        case YT.PlayerState.CUED:
            break;
        default:
    }
}

function stopVideo()
{
    // player.stopVideo();
    socket.emit('stopVideo');
}

function playVideo()
{
    // player.playVideo();
    socket.emit('playVideo', id);
}

function pauseVideo()
{
    // player.pauseVideo();
    socket.emit('pauseVideo');
}

function muteVideo()
{
    // player.mute();
    socket.emit('muteVideo');
}

function unmuteVideo()
{
    // player.unMute();
    socket.emit('unmuteVideo');
}

function rewindVideo()
{
    socket.emit('rewindVideo');
}

function fastforwardVideo()
{
    socket.emit('fastforwardVideo');
}

function previousVideo()
{
    socket.emit('previousVideo');
}

function nextVideo()
{
    socket.emit('nextVideo');
}

function playselectVideo(vid)
{
    socket.emit('playselectVideo', vid);
}

function removeVideo(vid)
{
    socket.emit('removeVideo', vid);
}

function clearAll()
{
    socket.emit('clearAll');
}


window.addEventListener('resize', function()
{
    console.log(window.innerWidth);
    if(window.innerWidth >= 992)
    {
        if(player === null)
        {
            onYouTubeIframeAPIReady();
        }
    }
    else
    {
        player.destroy(); // Destroy the video player
        player = null;
    }
});