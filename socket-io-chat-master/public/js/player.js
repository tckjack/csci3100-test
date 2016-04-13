var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var videoid = document.getElementById('vid1').value;
var id;

function onYouTubeIframeAPIReady()
{
    player = new YT.Player('player',
    {
        // height: "100%",
        width: "100%",
        playerVars:
        {
            'controls': 0
        },
        videoId: videoId,
        events:
        {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event)
{
    event.target.playVideo();
}
var done = false;

function onPlayerStateChange(event)
{
    switch(event.data)
    {
        case YT.PlayerState.ENDED:
            // Load Next Video
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
    // if(event.data == YT.PlayerState.PLAYING && !done)
    // {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    // }
}

function stopVideo()
{
    player.stopVideo();
}

function playVideo()
{
    player.playVideo();
}

function pauseVideo()
{
    player.pauseVideo();
}

function muteVideo()
{
    player.mute();
}

function unmuteVideo()
{
    player.unMute();
}

function rewindVideo(){
  var currentTime = player.getCurrentTime();
  if(currentTime > 2.0){
    player.seekTo(currentTime - 2.0, true);
  }
  else{
    player.seekTo(0,true);
  }
}

function fastforwardVideo(){
  var currentTime = player.getCurrentTime();
  var duration = player.getDuration();
  if(currentTime < (duration - 2.0)){
    player.seekTo(currentTime + 2.0, true);
  }
  else{
    player.seekTo(duration,true);
  }
}


if(!window['YT'])
{
    var YT = {
        loading: 0,
        loaded: 0
    };
}

window.addEventListener('resize', function()
{
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