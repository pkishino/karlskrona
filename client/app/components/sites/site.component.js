import template from './site.html';

let siteComponent = {
    restrict: 'E',
    bindings: {
        site: '=',
        sitemap: '<',
        new: '<',
        file: '=',
        imagefile: '=',
        uploadvalue: '<',
        uploadtype: '<',
        close: '&',
        save: '&',
        dismiss: '&',
        showfull: '&',
        selected: '&'
    },
    template
};

export default siteComponent;
