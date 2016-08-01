import template from './site.html';
import controller from './site.controller'

let siteComponent = {
    restrict: 'E',
    bindings: {
        site: '=',
        sitemap: '<',
        new: '<',
        uploadvalue: '<',
        uploadtype: '<',
        close: '&',
        save: '&',
        dismiss: '&'
    },
    template,
    controller
};

export default siteComponent;
