// styles
require('bootstrap/dist/css/bootstrap.min.css');
require('./styles/main.scss');

// images
(function() {
  var imgContext = require.context('./img/', true, /\.(svg|jpg)$/);
  imgContext.keys().forEach(imgContext);
})();
require('./favicon.svg');

// meta data
require('./manifest.json');

// templates
var aboutComponent = require('./templates/about');
var projectsComponent = require('./templates/projects');
var educationComponent = require('./templates/education');
var questionsComponent = require('./templates/questions');

// data
var profileData = require('./data/profile.json');
var projectsData = require('./data/projects.json');
var educationData = require('./data/education.json');
var questionsData = require('./data/questions.json');


// functions
var loadTemplate = function(sectionId, data, component) {
    var section = document.getElementById(sectionId);
    component.renderSync(data)
        .replaceChildrenOf(section);
};

// logic
loadTemplate('about', profileData, aboutComponent);
loadTemplate('projects', projectsData, projectsComponent);
loadTemplate('education', {"education": educationData, "profile": profileData}, educationComponent);
loadTemplate('questions', questionsData, questionsComponent);

// js dependencies
require('bootstrap');
require('./scripts/jquery.sliphover.min');
require('./scripts/css3-animate-it');
require('./scripts/main');
