(function() {
  'use strict';

  var videos = {
    coasts: {
      name: 'Coasts',
      vids: [
        {
          title: 'Oceans',
          id: 'wiLlx6T471A',
          aspect: 32/17,
        },
        {
          title: 'Stay',
          id: 'Bl4eNIagz4Y',
          aspect: 16/9,
        }
      ],
    },
    sonsandlovers: {
      name: 'Sons & Lovers',
      vids: [
        {
          title: 'Ghosts',
          id: 'y0t4EeRi-hU',
          aspect: 5/2,
        },
        {
          title: 'Lover',
          id: '4gH9s6YPo_U',
          aspect: 16/9,
        }
      ],
    }
  };

  var $splash = $('#splash');
  var player = null;
  var selectedArtist = null;
  var selectedVideo = null;

  function initVideo() {
    if(!$.flash.available)
      return;

    selectRandomArtist();
    selectArtistVideo();

    console.log("Loading YouTube player");

    $('.splash-video').flash({
      id: 'youtubeplayer',
      hasVersion: 8,
      swf: 'https://www.youtube.com/apiplayer?playerapiid=youtubeplayer&enablejsapi=1&version=3',
      allowScriptAccess: 'always',
      wmode: 'transparent'
    });

    updateVideoDimensions();
  }

  function calculateDimensions() {
    var ch = $splash.height(),
        cw = $splash.width(),
        a = selectedVideo.aspect,
        h = 0,
        w = 0,
        t = 0,
        l = 0,
        r = a / (16 / 9);

    if (a < (16 / 9)) {
      w = cw;
      h = w * (16 / 9);
      if (ch > (w / a)) {
        h = ch;
        w = h * a / (9 / 16);
      }
    } else {
      h = ch * r;
      w = h * (16 / 9);
      if (cw > w) {
        w = cw;
        h = w * (9 / 16);
      }
    }

    t = (ch - h) / 2;
    l = (cw - w) / 2;

    return {width: w, height: h, offset: {left: l, top: t}};
  }

  function getRandomArtist() {
    var keys = Object.keys(videos)
    return keys[keys.length * Math.random() << 0];
  }

  function selectRandomArtist() {
    selectedArtist = getRandomArtist();
    $splash.attr('class', 'artist-' + selectedArtist);
    $('.splash-info-artist').text(videos[selectedArtist].name);
  }

  function selectArtistVideo() {
    var availableVideos = videos[selectedArtist].vids;
    selectedVideo = availableVideos[availableVideos.length * Math.random() << 0];

    $('.splash-info-title').text(selectedVideo.title);
  }

  window.onYouTubePlayerReady = function(id) {
    console.log('Playing video for artist: ' + selectedArtist);

    player = $('#youtubeplayer')[0];
    player.loadVideoById(selectedVideo.id, 0, 'default');
    player.setVolume(0);
    //this.control.addClass("fa-volume-up").removeClass("fa-volume-off");
    player.playVideo();
    player.addEventListener("onStateChange", "onytplayerStateChange");
  }

  function updateVideoDimensions() {
    var dims = calculateDimensions();

    console.log($splash.find('object'));
    console.log(dims);

    $splash.find('object')
      .width(dims.width)
      .height(dims.height)
      .offset(dims.offset);
  }

  $(window).resize(updateVideoDimensions);
  initVideo();
})();
