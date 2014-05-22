(function() {
  'use strict';

  var eventTime = new Date('Jun 14 2014 12:00:00').getTime();
  var $countdown = $('.countdown');

  var countdownInterval = setInterval(function() {
    var now = new Date().getTime();
    var secondsLeft = (eventTime - now) / 1000;

    if(secondsLeft < 0) {
      $countdown.parent().remove();
      clearInterval(countdownInterval);
      return;
    }

    var days = parseInt(secondsLeft / 86400);
    secondsLeft %= 86400;

    var hours = parseInt(secondsLeft / 3600);
    secondsLeft %= 3600;

    var minutes = parseInt(secondsLeft / 60);
    var seconds = parseInt(secondsLeft % 60);

    $countdown.text('');

    if(days > 0)
      $countdown.append(days + ' days, ');

    $countdown.append(hours + ' hours, ' + minutes + ' mins, ' + seconds + ' secs');
  }, 250);
})();
