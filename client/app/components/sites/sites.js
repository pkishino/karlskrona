import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import animate from 'angular-animate';
import lightbox from 'angular-bootstrap-lightbox';
import angularfire from 'angularfire';
import fileupload from 'ng-file-upload';
import ngMessages from 'angular-messages';
import firebaseFactory from '../../common/firebase/firebase';

import sitesComponent from './sites.component';
import siteComponent from './site.component';

let sitesModule = angular.module('sites', [
  uiRouter,
  uiBootstrap,
  animate,
  lightbox,
  angularfire,
  fileupload,
  ngMessages,
  firebaseFactory
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('sites', {
      url: '/sites?site',
      component: 'sites'
    });
})

.component('site', siteComponent)
.component('sites', sitesComponent)
.name;

export default sitesModule;
