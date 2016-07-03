import sites from './sites.json';
import siteComp from './site.component';

class SitesController {
    constructor($uibModal) {
        this.name = 'sites';
        this.sites = sites;
        this.$uibModal = $uibModal;
    }
    open(site) {
        var currSite = site;
        var modalinstance = this.$uibModal.open({
            template: '<site site="site">{{site}}</site>',
            controller: siteComp.controller,
            resolve: {
                site: function() {
                    return currSite;
                }
            }
        });
        modalinstance.result.then(function() {}, function() {
            console.log('Dismissed modal');
        });
    }
}
SitesController.$inject = ['$uibModal'];
export default SitesController;
