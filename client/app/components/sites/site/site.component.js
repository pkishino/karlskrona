import template from './site.html';
import controller from './site.controller';
import './site.styl';

let siteComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default siteComponent;
