import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngmap from 'ngmap';
import angularfire from 'angularfire';
import myMapComponent from './myMap.component';
import firebaseFactory from '../../common/firebase/firebase';

let myMapModule = angular.module('myMap', [
  uiRouter,
  ngmap,
  angularfire,
  firebaseFactory
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('myMap', {
      url: '/myMap',
      component: 'myMap'
    });
})

.component('myMap', myMapComponent)

.name;

export default myMapModule;
