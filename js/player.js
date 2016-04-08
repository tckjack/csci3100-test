var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

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
    videoId: 'Zi9cK-lI190',
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
  if(event.data == YT.PlayerState.PLAYING && !done)
  {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo()
{
  player.stopVideo();
}
if(!window['YT'])
{
  var YT = {
    loading: 0,
    loaded: 0
  };
}