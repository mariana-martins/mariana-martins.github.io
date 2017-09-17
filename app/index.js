// styles
require('bootstrap/dist/css/bootstrap.min.css');
require('./styles/main.scss');

// js dependencies
require('bootstrap');
require('./scripts/jquery.sliphover.min');
require('./scripts/css3-animate-it');
require('./scripts/main');

// images
require.context(
    './img', // context folder
    true, // include subdirectories
    /.(svg|jpg)/ // RegExp
)('./' + expr);
require('./favicon.svg');

// meta data
require('./manifest.json');

// templates
var introComponent = require('./templates/intro');
var contactComponent = require('./templates/contact');

// data
var profileData = require('./data/profile.json');

// functions
var loadTemplate = function(sectionId, data, component) {
    var section = document.getElementById(sectionId);
    component.renderSync(data)
        .replaceChildrenOf(section);
};

// logic
//loadTemplate('sec_intro', profileData, introComponent);
// loadTemplate('sec_contact', {}, contactComponent);

module.exports = {
    openModal: function (e) {
        // Open project modal
        $('#myModal').modal('show');
    }
};
