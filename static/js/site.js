(function() {
  'use strict';

  console.log('%cDid you know the entirety of the GoodFest website source is available on Github: https://github.com/GoodrickeJCRC/goodfest-2014', 'font-size: 1.5em;');

  $('.lineup-headliner').click(function() {
    var $this = $(this);

    if($this.hasClass('active')) {
      $this.removeClass('active');
    } else {
      $('.lineup-headliner.active').removeClass('active');
      $this.addClass('active');
    }
  });
})();
