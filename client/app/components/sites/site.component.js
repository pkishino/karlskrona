import template from './site.html';

let siteComponent = {
    restrict: 'E',
    bindings: {
        site: '<',
        close: '&',
        dismiss: '&'
    },
    template
};

export default siteComponent;
