var angular = require('angular');

require('angular-ui-router');
require('angular-ui-bootstrap');

var optionsModule = require('./app/options/index');
var navModule = require('./app/navigation/index');
var routesConfig = require('./routes');

var main = require('./app/main');

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

angular
  .module('app', [optionsModule, navModule, 'ui.router', 'ui.bootstrap'])
  .config(routesConfig)
  .component('app', main);
