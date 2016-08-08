import template from './site.html';
import controller from './site.controller';
import './site.styl';

let siteComponent = {
    restrict: 'E',
    bindings: {
        site: '=',
        sitemap: '<',
        new: '<',
        uploadvalue: '<',
        uploadtype: '<',
        close: '&',
        save: '&'
    },
    template,
    controller
};

export default siteComponent;
