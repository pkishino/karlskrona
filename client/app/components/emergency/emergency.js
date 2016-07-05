import angular from 'angular';
import uiRouter from 'angular-ui-router';
import emergencyComponent from './emergency.component';

let emergencyModule = angular.module('emergency', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('emergency', {
      url: '/emergency',
      template: '<emergency></emergency>'
    });
})

.component('emergency', emergencyComponent)
.name;

export default emergencyModule;
