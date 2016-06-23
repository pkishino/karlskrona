import angular from 'angular';
import uiRouter from 'angular-ui-router';
import emergencyComponent from './emergency.component';

let emergencyModule = angular.module('emergency', [
  uiRouter
])

.component('emergency', emergencyComponent);

export default emergencyModule;
