function getVideoIDFromURL(url)
{
  var regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  // console.log( match[ 2 ] );
  if(match && match[2].length == 11)
  {
    return match[2];
  }
  else
  {
    return url;
  }
}

function displayURL()
{
  $('form').submit(function(e)
  {
    e.preventDefault();
    var apiKey = $('#key').val();
    var videoId = $('#video-id').val();
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
			$('#title').html(data.items[0].snippet.title);
      $('#id').html(data.items[0].id);
      // Debug message
      $('#url').html(url);
      $('#response').html(JSON.stringify(data));
    });
  });
}