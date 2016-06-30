import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import uiRouterTabs from 'angular-ui-router-tabs';
import ngSanitize from 'angular-sanitize';

import navbarComponent from './navbar.component';

let navbarModule = angular.module('navbar', [
    uiRouter,
    ngSanitize,
    uiRouterTabs,
    uiBootstrap
])

.component('navbar', navbarComponent);

export default navbarModule;