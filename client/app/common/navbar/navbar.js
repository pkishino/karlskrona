import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import uiRouterTabs from 'angular-ui-router-tabs';
import ngSanitize from 'angular-sanitize';
import angularfire from 'angularfire';
import ngMessages from 'angular-messages';
import firebaseFactory from '../firebase/firebase';

import navtab from './navtab.html';
import navbarComponent from './navbar.component';
import loginComponent from './login.component';

let navbarModule = angular.module('navbar', [
    uiRouter,
    ngSanitize,
    uiRouterTabs,
    uiBootstrap,
    angularfire,
    ngMessages,
    firebaseFactory
])
.run(['$templateCache',function($templateCache){
	$templateCache.put('navtab-template.html',navtab);
}])
.component('loginComponent', loginComponent)
.component('navbar', navbarComponent)
.name;

export default navbarModule;
