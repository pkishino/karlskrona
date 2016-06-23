import template from './sites.html';
import controller from './sites.controller';
import './sites.styl';

let sitesComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default sitesComponent;
