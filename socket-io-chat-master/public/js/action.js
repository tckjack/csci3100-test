var playlist;
// Retrieve room ID
if(!Array.prototype.last)
{
    Array.prototype.last = (function()
    {
        return this[this.length - 1];
    });
}
var id = window.location.href.split('/').last();
// Register
var socket = io();
socket.emit('register', id);
socket.emit('getPlayList', id);
socket.on('stopVideo', function()
{
    if(player !== null)
    {
        player.stopVideo();
    }
});
socket.on('playVideo', function()
{
    console.log('playVideo Recieve');
    if(player !== null)
    {
        var state = player.getPlayerState();
        if(state == YT.PlayerState.PAUSED)
        {
            player.playVideo();
        }
        else
        {
            if(playlist.length != 0)
            {
                var id = playlist[0].videoId;
                player.loadVideoById(id);
                current = 0;
            }
        }
    }
});
socket.on('pauseVideo', function()
{
    console.log('pause recieve');
    if(player !== null)
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
    if(player !== null)
    {
        player.mute();
    }
});
socket.on('unmuteVideo', function()
{
    if(player !== null)
    {
        player.unMute();
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
socket.on('previousVideo', function()
{
    if(playlist[0].videoId != playlist[current].videoId)
    {
        var state = player.getPlayerState();
        console.log('state : ' + state);
        if(state == YT.PlayerState.PLAYING || state == YT.PlayerState.PAUSED)
        {
            var id = playlist[current - 1].videoId;
            player.loadVideoById(id);
            current--;
        }
    }
});
socket.on('nextVideo', function()
{
    if(playlist[playlist.length - 1].videoId != playlist[current].videoId)
    {
        var state = player.getPlayerState();
        console.log('state : ' + state);
        if(state == YT.PlayerState.PLAYING || state == YT.PlayerState.PAUSED)
        {
            var id = playlist[current + 1].videoId;
            player.loadVideoById(id);
            current++;
        }
    }
});
socket.on('playselectVideo', function(data)
{
    console.log('play select video recieve:' + data);
    if(player !== null)
    {
        for(var i = 0; i < playlist.length; i++)
        {
            console.log(playlist[i].videoId);
            if(playlist[i].videoId == data)
            {
                player.loadVideoById(data);
                current = i;
                break;
            }
        }
    }
});
socket.on('getPlayList', function(data)
{
    playlist = data;
    console.log('get playlist\n' + data);
    if(player !== null || player !== undefined){
      var currentPlayId = player.getVideoData()['video_id'];
      console.log(currentPlayId);
      socket.emit('updateCurrent',currentPlayId);
    }
    document.getElementById('url').value = "";
    document.getElementById('videolist').innerHTML = "";
    for(var i = 0; i < data.length; i++)
    {
        videoId = data[i].videoId;
        videoName = data[i].videoName;
        document.getElementById('videolist').innerHTML += '<li class="list-group-item clearfix"><a class="dark" id=\'vid' + i + '\' onclick="playselectVideo(\'' + videoId + '\')">' + videoId + ' : ' + videoName + '</a><span class="pull-right"><a class="dark" onclick=removeVideo(\'' + videoId + '\')><i class="fa fa-times-circle"></i></a></span></li>';
    }
});
socket.on('updateCurrent',function(data){
    current = data;
});