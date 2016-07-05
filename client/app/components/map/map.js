import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mapComponent from './map.component';

let mapModule = angular.module('map', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('map', {
      url: '/map',
      template: '<map></map>'
    });
})

.component('map', mapComponent)
.name;

export default mapModule;
