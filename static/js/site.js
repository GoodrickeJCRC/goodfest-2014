(function() {
  'use strict';

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
