import template from './siteModalContent.html';
import controller from './site.controller';
import './sites.styl';

let siteComponent = {
  restrict: 'E',
  bindings: {
  	site: '<'
  },
  template,
  controller
};

export default siteComponent;
