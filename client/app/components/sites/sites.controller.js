import sites from './sites.json';
import site from './siteModalContent.html';
import siteCtrl from './site.component';

class SitesController {
    constructor($uibModal) {
        this.name = 'sites';
        this.sites = sites;
        this.$uibModal = $uibModal;
    }
    open() {
        var modalinstance = this.$uibModal.open({
            template: site,
            controller: siteCtrl.controller
        });
    }
}
SitesController.$inject = ['$uibModal'];
export default SitesController;