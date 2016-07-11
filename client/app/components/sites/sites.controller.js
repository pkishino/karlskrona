import sites from './assets/sites.json';

class SitesController {
    constructor($uibModal) {
        this.name = 'sites';
        this.sites = sites;
        this.$uibModal = $uibModal;
    }
    open(site) {
        var modalinstance = this.$uibModal.open({
            template: '<site site="$ctrl.site" close="$ctrl.close()" dismiss="$ctrl.dismiss()" sitemap="$ctrl.sitemap" showfull="$ctrl.showfull()"></site>',
            controllerAs: '$ctrl',
            controller: ['$uibModalInstance', 'Lightbox',
                function($uibModalInstance, Lightbox) {
                    this.site = site;
                    if (site.map) {
                        this.sitemap = require('./assets/' + site.map);
                    }
                    this.close = $uibModalInstance.close;
                    this.dismiss = $uibModalInstance.dismiss;
                    this.showfull = function() {
                        var image = {
                            'url': this.sitemap,
                            'caption': this.site.title
                        };
                        Lightbox.openModal([image], 0);
                    };
                }
            ]
        });
        modalinstance.result.then(function() {}, function() {
            console.log('Dismissed modal');
        });
    }
    fetchlogo(site) {
        if (!site.logo){
            return require ('./assets/flagga.png');
        }
        if (site.logo.indexOf('http') == -1) {
            return require('./assets/' + site.logo);
        } else {
            return site.logo;
        }
    }
}
SitesController.$inject = ['$uibModal'];
export default SitesController;
