console.log('\'Allo \'Allo!');

function loadTemplate(htmlSelector, templateId, data) {
  var source   = $("#" + templateId).html();
  var template = Handlebars.compile(source);
  var html     = template(data);
  $(htmlSelector).html(html);
}

// TODO: Needs Improvements
$('#resume').on('click',function () {
  $('#resume-modal').on('shown.bs.modal');
});

$('#animal').on('click',function () {
  $('#animal-modal').on('shown.bs.modal');
});

$('#store').on('click',function () {
  $('#lojinha-modal').on('shown.bs.modal');
});

// It fixes Bootstrap Navbar Navigation, it wasn't working and proposed fix is to use body padding-top
// We use scrollby function to force fixing the navigation
// It won't lead to Usability problems because:
// * It doesn't change HTML and CSS code;
// * It doesn't current usability tags;
// TODO: Verify this solution after updating Bootstrap
window.addEventListener("hashchange", function () {
  scrollBy(0, -100);
});
