/* Config project image hover */
$(function() {

  $('#container').sliphover({
    backgroundColorAttr: 'data-background'
  });

});

/* Navbar change color during the scroll */

$(document).ready(function(){
  var scroll_start = 0;
  var startchange = $('#about');
  var offset = startchange.offset();
  if (startchange.length){
    $(document).scroll(function() {
      scroll_start = $(this).scrollTop();
      if(scroll_start > offset.top) {
        // ;
        // $("#navbar-site").css('height', '20px');
        $('#navbar-site').addClass(".teste");
      } else {

      }
    });
  }
});


$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
    $(".fixed-top").addClass("top-nav-collapse");
    $("#navbar-site").css('background-color', 'rgba(154, 23, 77, 0.85)');
  } else {
    $(".fixed-top").removeClass("top-nav-collapse");
    $('#navbar-site').css('background-color', 'transparent');
  }
});


