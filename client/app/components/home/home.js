import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import animate from 'angular-animate';
import lightbox from 'angular-bootstrap-lightbox';
import parallax from 'ng-parallax';
import homeComponent from './home.component';

let homeModule = angular.module('home', [
  uiRouter,
  uiBootstrap,
  animate,
  lightbox,
  parallax
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    });
})

.component('home', homeComponent)
.name;

export default homeModule;
