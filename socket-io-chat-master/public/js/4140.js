var i = 0;


function getVideoIDFromURL()
{
  url = document.getElementById('url').value;
  console.log(url);
  var regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if(match && match[2].length == 11)
  {
    console.log(match[2]);
    displayURL(match[2]);
  }
  else
  {
    console.log(url);
    displayURL(url);
  }
}

function displayURL(videoId)
{
  console.log(videoId);
  // e.preventDefault();
  var apiKey = 'AIzaSyCIRUOEGf1pJ195U9PTqZbod88jsyYD-hE';
  // var videoId = $('#video-id').val();
  var url = 'https://www.googleapis.com/youtube/v3/videos?part=id%2Csnippet&id=' + videoId + '&key=' + apiKey
    // AJAX GET request
  $.get(url, function(data)
  {
    // Check if the video ID is valid
    if(data.items.length == 0)
    {
      alert('Video not found!');
      return;
    }
		console.log(data);
    // Retrieve video title from ".items[ 0 ].snippet.title"
    i++;
    var videoId = data.items[0].id;
    var videoName = data.items[0].snippet.title;
    var video = [id,videoId,videoName];
    };
    // playlist.push(video);
	  // document.getElementById('videolist').innerHTML += '<li class="list-group-item clearfix"><a class="dark" id=\'vid' + i + '\' onclick="playvideo('+ i +')">' + videoId + ' : ' + videoName + '</a><span class="pull-right"><a class="dark" href="#"><i class="fa fa-times-circle"></i></a></span></li>';
  });

}