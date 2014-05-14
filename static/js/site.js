(function() {
  'use strict';

  $('.headline').on('click', function() {
    var $this = $(this);

    if($this.hasClass('active')) {
      $this.removeClass('active');
    } else {
      $('.headline.active').removeClass('active');
      $this.addClass('active');
    }
  });
})();
