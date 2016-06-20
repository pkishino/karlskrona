var angular = require('angular');

var option = require('./option');
var options = require('./options');

var optionsModule = 'options';

module.exports = optionsModule;

angular
  .module(optionsModule, [])
  .component('appOption', option)
  .component('appOptions', options);
