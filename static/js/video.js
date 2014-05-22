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
          aspect: 80/32,
        },
        {
          title: 'Lover',
          id: '4gH9s6YPo_U',
          aspect: 16/9,
        },
        {
          title: 'Golden',
          id: 'FGbD3ROHjhU',
          aspect: 16/9,
        }
      ],
    }
  };

  var $splash = $('#splash');
  var player = null;
  var selectedArtist = null;
  var selectedVideoIdx = null;

  function initVideo() {
    selectRandomArtist();

    if(!$.flash.available)
      return;

    $('body').removeClass('no-flash');

    $('.splash-video').flash({
      id: 'youtubeplayer',
      hasVersion: 8,
      swf: 'https://www.youtube.com/apiplayer?playerapiid=youtubeplayer&enablejsapi=1&version=3',
      allowScriptAccess: 'always',
      wmode: 'transparent'
    });

    // Select a random song and prepare the video container
    selectedVideoIdx = getRandomArtistVideo();
    updateVideoDimensions();
  }

  function calculateDimensions() {
    var ch = $splash.height(),
        cw = $splash.width(),
        a = videos[selectedArtist].vids[selectedVideoIdx].aspect,
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

  function updateVideoDimensions() {
    var dims = calculateDimensions();

    $splash.find('object')
      .width(dims.width)
      .height(dims.height)
      .offset(dims.offset);
  }

  function getOtherArtist() {
    if(selectedArtist === 'coasts')
      return 'sonsandlovers';

    return 'coasts';
  }

  function selectRandomArtist() {
    var keys = Object.keys(videos);
    updateArtist(keys[keys.length * Math.random() << 0]);
  }

  function updateArtist(key) {
    selectedArtist = key;
    $splash.attr('class', 'artist-' + selectedArtist);
    $('[data-bind="artist-name"]').text(videos[selectedArtist].name);
    $('[data-bind="other-artist-name"]').text(videos[getOtherArtist()].name);
  }

  function getRandomArtistVideo() {
    return videos[selectedArtist].vids.length * Math.random() << 0;
  }

  function playNextVideo() {
    playVideo((selectedVideoIdx + 1) % videos[selectedArtist].vids.length);
  }

  function playVideo(idx) {
    var selectedVideo = videos[selectedArtist].vids[idx];
    selectedVideoIdx = idx;

    updateVideoDimensions();

    player.loadVideoById(selectedVideo.id, 0, 'default');
    player.playVideo();

    $('[data-bind="song-title"]').text(selectedVideo.title);
    $('[data-event="open-yt"]').attr('href', 'http://www.youtube.com/watch?v=' + selectedVideo.id);
  }

  function muteVideo() {
    player.setVolume(0);
    $('.splash-video-mute').addClass('splash-video-muted');
  }

  function unmuteVideo() {
    player.setVolume(100);
    $('.splash-video-mute').removeClass('splash-video-muted');
  }

  function toggleMute() {
    if($('.splash-video-mute').hasClass('splash-video-muted')) {
      unmuteVideo();
    } else {
      muteVideo();
    }
  }

  window.onYouTubePlayerReady = function(id) {
    player = $('#youtubeplayer')[0];
    player.addEventListener('onStateChange', 'onytplayerStateChange');
    player.setVolume(100);

    playVideo(selectedVideoIdx);
  }

  window.onytplayerStateChange = function(s) {
    // On video ended
    if (s === 0) {
      playNextVideo();
    }
  }

  $('[data-event="next-artist"]').click(function(e) {
    updateArtist(getOtherArtist());
    playVideo(getRandomArtistVideo());
    e.preventDefault();
  });

  $('[data-event="next-song"]').click(function(e) {
    playNextVideo();
    e.preventDefault();
  });

  $('[data-event="open-yt"]').click(muteVideo);
  $('.splash-video-mute').click(toggleMute);

  $(window).resize(updateVideoDimensions);

  // Initialise video player
  initVideo();
})();
