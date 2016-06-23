import template from './emergency.html';
import controller from './emergency.controller';
import './emergency.styl';

let emergencyComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default emergencyComponent;
