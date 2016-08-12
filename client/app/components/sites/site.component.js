import template from './site.html';
import controller from './site.controller';
import './site.styl';

let siteComponent = {
    restrict: 'E',
    bindings: {
        site: '=',
        new: '<',
        close: '&'
    },
    template,
    controller
};

export default siteComponent;
