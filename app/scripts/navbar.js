(function() {
  /* Change color of Navbar, during the scroll */

  // The following code is a workaround to work on tablets and mobile.
  // jQuery.scroll wasn't working reliably.
  // As I want to update navbar color based on its position, I decided
  // to keep track of it and validate it every 100ms, using setInterval.
  // Still, it's only activated after scroll animation ends on mobile.
  // To remove workaround:
  //  * comment line 32, about setInteval function
  //  * uncomment line 32, about using jQuery and scroll function
  var updateNavBarColor = function() {
    var usingTopPage = $('.navbar').offset().top > 50;

    return function() {
      var top50pixels = $('.navbar').offset().top > 50;

      if (top50pixels) {
        if (!usingTopPage) {
          $('.fixed-top').addClass('top-nav-collapse');
          $('body').addClass('top-page');
          usingTopPage = true;
        }
      } else if (usingTopPage) {
        $('.fixed-top').removeClass('top-nav-collapse');
        $('#navbar-site').removeClass('active');
        $('body').removeClass('top-page');
        usingTopPage = false;
      }
    }
  }();
  setInterval(updateNavBarColor, 100);
  // $(window).scroll(updateNavBarColor);

  // Hide nav-link after it is clicked
  $('.nav-link').on('click', function() {
    $('#navbarItems').collapse('hide');
  });

  // Activates scrollspy
  $('body').scrollspy({ target: '#navbar-site' });
}());
