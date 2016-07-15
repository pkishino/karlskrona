import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngmap from 'ngmap';
import angularfire from 'angularfire';
import myMapComponent from './myMap.component';

let myMapModule = angular.module('myMap', [
  uiRouter,
  ngmap,
  angularfire
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('myMap', {
      url: '/myMap',
      template: '<my-map></my-map>'
    });
})

.component('myMap', myMapComponent)

.name;

export default myMapModule;
