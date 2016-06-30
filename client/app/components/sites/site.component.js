import template from './siteModalContent.html';
import controller from './site.controller';
import './sites.styl';

let siteComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default siteComponent;
