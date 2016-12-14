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

