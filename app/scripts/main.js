console.log('\'Allo \'Allo!');

function loadTemplate(htmlSelector, templateId, data) {
  var source   = $("#" + templateId).html();
  var template = Handlebars.compile(source);
  var html     = template(data);
  $(htmlSelector).html(html);
}
