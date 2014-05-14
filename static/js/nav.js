(function() {
  'use strict';

  function scrollToElement(target, push_state) {
    //console.log('scrolling to ' + target);

    if(typeof push_state === 'undefined')
      push_state = true;

    var $header = $('#header');

    // Animate our page scroll to the target. Once we've scrolled there, set our
    // location hash. We can't do it before otherwise we get a scroll jump before
    // the animation starts (ugly)
    $('html, body')
      .stop(true, false) // cancel any other scrolls
      .animate({
        scrollTop: $(target).offset().top - $header.height()
      }, 100, 'easeInOutCubic', function() {
        if(history && history.pushState && push_state && location.hash !== target) {
          //console.log('pushing ' + target);
          history.pushState({}, target.slice(1), target);
        }

        setTimeout(function() {
          $('#header li').removeClass('active');
          $('#header a[href^="' + target + '"] li').addClass('active');
        }, 10);
      });
  }


  $(document).on('click', '#header a', function() {
    var target = $(this).attr('href');
    scrollToElement(target);

    return false;
  });


  function updateActiveNav() {
    var cur_dist = 99999;
    var target_nav = null;
    var scroll_top = $(window).scrollTop() + $('header').height();

    $('section').each(function() {
      var $this = $(this);
      var id = $this.attr('id');
      var nav = $('#header a[href="#' + id + '"] li');

      // does this section have a link in the nav?
      if(nav.length === 0)
        return;

      var dist = Math.abs($this.offset().top - scroll_top);

      //console.log('updateActiveNav: ' + id + ' has dist ' + dist);

      if(dist > cur_dist)
        return;

      cur_dist = dist;
      target_nav = nav;
    });

    if(!target_nav)
      return;

    //console.log('updating active nav to ' + target_nav.parent().attr('href'));

    $('#header li').removeClass('active');
    target_nav.addClass('active');
  }


  function onPopState() {
    //console.log('popped state: ' + location.hash);

    // Scroll to the element in the hash
    if(location.hash)
      scrollToElement(location.hash, false);
  }


  $(window)
    .on('popstate', onPopState)
    .load(onPopState)
    .scroll(updateActiveNav);

})();
