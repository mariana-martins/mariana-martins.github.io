/* Change color of Navbar, during the scroll */
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

// Call to Github Api using Github calendar
var GitHubCalendar = require('github-calendar');
GitHubCalendar(".calendar", "mariana-martins");

// Hide nav-link after it is clicked
$('.nav-link').on('click', function() {
  $('#navbarItems').collapse('hide');
});

// Activates scrollspy
$('body').scrollspy({ target: '#navbar-site' });

// Activate tooltips in Books section
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});
