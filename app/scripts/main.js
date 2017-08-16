/* Config project image hover */
$(function() {

  $('#container').sliphover({
    backgroundColorAttr: 'data-background',
    target: 'img'
  });

});

/* Navbar change color during the scroll */

/*
$(window).scroll(function() {
  var navbar = $('#navbar-site');
  if ($('.navbar').offset().top > 50) {
    $('.fixed-top').addClass('top-nav-collapse');
    $('#navbar-site').css('background-color', 'rgba(154, 23, 77, 0.75)');
  } else {
    $('.fixed-top').removeClass('top-nav-collapse');
    navbar.css('background-color', 'transparent');
    navbar.removeClass('active');
  }
});
*/

// Call to Github api using Github calendar
GitHubCalendar(".calendar", "mariana-martins");

// Open project modal
function openModal(e) {
  $('#myModal').modal('show');
}

