import template from './sites.html';
import controller from './sites.controller';
import './sites.styl';

let sitesComponent = {
  restrict: 'E',
  bindings: {
  	site: '<',
  	close: '&',
  	dismiss: '&'
  },
  template,
  controller
};

export default sitesComponent;
