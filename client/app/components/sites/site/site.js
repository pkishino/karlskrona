import angular from 'angular';
import uiRouter from 'angular-ui-router';
import siteComponent from './site.component';

let siteModule = angular.module('site', [
  uiRouter
])

.component('site', siteComponent);

export default siteModule;
