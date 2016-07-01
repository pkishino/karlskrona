import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import sitesComponent from './sites.component';
// import siteComponent from './site.component';

let sitesModule = angular.module('sites', [
  uiRouter,
  uiBootstrap
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('sites', {
      url: '/sites',
      template: '<sites></sites>'
    });
})

.component('sites', sitesComponent);
// .component('site',siteComponent);

export default sitesModule;
