/* Config project image hover */
$(function() {

  $('#container').sliphover({
    backgroundColorAttr: 'data-background',
    target: 'img'
  });

});

/* Navbar change color during the scroll */

$(window).scroll(function() {
  var navbar = $('#navbar-site');
  if ($('.navbar').offset().top > 50) {
    $('.fixed-top').addClass('top-nav-collapse');
    $('body').addClass('top-page');
  } else {
    $('.fixed-top').removeClass('top-nav-collapse');
    navbar.removeClass('active');
    $('body').removeClass('top-page');
  }
});

// Call to Github api using Github calendar
GitHubCalendar(".calendar", "mariana-martins");

// Open project modal
function openModal(e) {
  $('#myModal').modal('show');
}

