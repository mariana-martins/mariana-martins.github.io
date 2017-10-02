// styles
require('normalize.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('./styles/main.scss');

// images
(function() {
  var imgContext = require.context('./img/', true, /\.(svg|jpg)$/);
  imgContext.keys().forEach(imgContext);
})();

// js dependencies - required before using templates
require('jquery');
require('bootstrap');

// template referencies
var aboutComponent = require('./templates/about');
var projectsComponent = require('./templates/projects');
var educationComponent = require('./templates/education');
var questionsComponent = require('./templates/questions');
var interestsComponent = require('./templates/interests');
var contactComponent = require('./templates/contact.marko');

// data
var profileData = require('./data/profile.json');
var projectsData = require('./data/projects.json');
var educationData = require('./data/education.json');
var questionsData = require('./data/questions.json');
var interestsData = {
  articles: require('./data/interests/articles.json'),
  books: require('./data/interests/books.json'),
  music: require('./data/interests/music.json')
};

// load templates
var loadTemplate = function(sectionId, data, component) {
    var section = document.getElementById(sectionId);
    component.renderSync(data)
        .replaceChildrenOf(section);
};

loadTemplate('about', profileData, aboutComponent);
loadTemplate('projects', projectsData, projectsComponent);
loadTemplate('education', {"education": educationData, "profile": profileData}, educationComponent);
loadTemplate('questions', questionsData, questionsComponent);
loadTemplate('interests', interestsData, interestsComponent);
loadTemplate('contact', profileData, contactComponent);

// js dependencies - after using templates
require('./scripts/css3-animate-it');
require('./scripts/navbar');
require('./scripts/github-calendar');

