import angular from 'angular';
import uiRouter from 'angular-ui-router';
import sitesComponent from './sites.component';

let sitesModule = angular.module('sites', [
  uiRouter
])

.component('sites', sitesComponent);

export default sitesModule;
