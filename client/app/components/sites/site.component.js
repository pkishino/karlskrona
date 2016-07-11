import template from './site.html';

let siteComponent = {
    restrict: 'E',
    bindings: {
        site: '<',
        sitemap: '<',
        close: '&',
        dismiss: '&',
        showfull: '&'
    },
    template
};

export default siteComponent;
