import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import lightbox from 'angular-bootstrap-lightbox';

import sitesComponent from './sites.component';
import siteComponent from './site.component';

let sitesModule = angular.module('sites', [
  uiRouter,
  uiBootstrap,
  lightbox
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

.component('site', siteComponent)
.component('sites', sitesComponent)
.name;

export default sitesModule;
