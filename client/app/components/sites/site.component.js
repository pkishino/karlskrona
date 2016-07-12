import template from './site.html';

let siteComponent = {
    restrict: 'E',
    bindings: {
        site: '<',
        sitemap: '<',
        new: '<',
        image: '<',
        uploadvalue: '<',
        uploadtype: '<',
        close: '&',
        dismiss: '&',
        showfull: '&',
        upload: '&',
        onImageSelected: '&',
        onImageDeselected: '&',

    },
    template
};

export default siteComponent;
