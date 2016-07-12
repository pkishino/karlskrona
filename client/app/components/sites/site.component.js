import template from './site.html';

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
        dismiss: '&',
        showfull: '&'
    },
    template
};

export default siteComponent;
