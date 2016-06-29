import angular from 'angular';
import uiRouter from 'angular-ui-router';
import sitesComponent from './sites.component';

let sitesModule = angular.module('sites', [
  uiRouter
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

export default sitesModule;
