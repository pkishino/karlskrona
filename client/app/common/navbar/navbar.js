import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import uiRouterTabs from 'angular-ui-router-tabs';
import ngSanitize from 'angular-sanitize';

import navtab from './navtab.html';
import navbarComponent from './navbar.component';

let navbarModule = angular.module('navbar', [
    uiRouter,
    ngSanitize,
    uiRouterTabs,
    uiBootstrap
])
.run(['$templateCache',function($templateCache){
	$templateCache.put('navtab-template.html',navtab);
}])
.component('navbar', navbarComponent)
.name;

export default navbarModule;
