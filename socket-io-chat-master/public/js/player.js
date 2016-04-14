var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var videoId;
var id = window.location.href.split('/').last();
var i;

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
            var id = playlist[i + 1].videoId;
            player.loadVideoById(id);
            i++;
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
    // player.stopVideo();
    socket.emit('stopVideo');
}

function playVideo()
{
    // player.playVideo();
    socket.emit('playVideo',id);
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

function playselectVideo(vid)
{
    socket.emit('playselectVideo', vid);
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
socket.on('stopVideo', function()
{
    player.stopVideo();
});
socket.on('playVideo', function()
{
    console.log('playVideo Recieve');
    if(player !== null)
    {
        var state = player.getPlayerState();
        if(state == YT.PlayerState.PAUSED)
        {
            player.play();
        }
        else
        {
            var id = playlist[0].videoId;
            player.loadVideoById(id);
            i = 1;
        }
    }
});
socket.on('pauseVideo', function()
{
    if(play !== null)
    {
        var state = player.getPlayerState();
        if(state == YT.PlayerState.PLAYING)
        {
            player.pauseVideo();
        }
    }
});
socket.on('muteVideo', function()
{
    if(play !== null)
    {
        player.muteVideo();
    }
});
socket.on('unmuteVideo', function()
{
    if(play !== null)
    {
        player.pauseVideo();
    }
});
socket.on('rewindVideo', function()
{
    if(player !== null)
    {
        var state = player.getPlayerState();
        if(state == YT.PlayerState.PLAYING || state == YT.PlayerState.PAUSED)
        {
            var currentTime = player.getCurrentTime();
            if(currentTime > 2.0)
            {
                player.seekTo(currentTime - 2.0, true);
            }
            else
            {
                player.seekTo(0, true);
            }
        }
    }
});
socket.on('fastforwardVideo', function()
{
    if(player !== null)
    {
        var state = player.getPlayerState();
        if(state == YT.PlayerState.PLAYING || state == YT.PlayerState.PAUSED)
        {
            var currentTime = player.getCurrentTime();
            var duration = player.getDuration();
            if(currentTime < (duration - 2.0))
            {
                player.seekTo(currentTime + 2.0, true);
            }
            else
            {
                player.seekTo(duration, true);
            }
        }
    }
});
socket.on('playselectVideo', function(data)
{
    if(player !== null)
    {
        for(var i = 0; i < playlist; i++)
        {}
    }
});

socket.on('getPlayList', function(data) {
    playlist = data;
    console.log(data);
    document.getElementById('videolist').innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        videoId = data[i].videoId;
        videoName = data[i].videoName;
        document.getElementById('videolist').innerHTML += '<li class="list-group-item clearfix"><a class="dark" id=\'vid' + i + '\' onclick="playvideo(' + i + ')">' + videoId + ' : ' + videoName +
            '</a><span class="pull-right"><a class="dark" ><i class="fa fa-times-circle"></i></a></span></li>';
    }
});