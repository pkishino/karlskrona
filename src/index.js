var angular = require('angular');

require('angular-ui-router');
require('angular-ui-bootstrap');

var navModule = require('./app/navigation/index');
var routesConfig = require('./routes');

var main = require('./app/main');
var home = require('./app/views/home/home');

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

angular
  .module('app', [navModule, 'ui.router', 'ui.bootstrap'])
  .config(routesConfig)
  .component('app', main);
