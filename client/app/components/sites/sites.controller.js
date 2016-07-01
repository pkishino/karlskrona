import sites from './sites.json';
import site from './siteModalContent.html';
// import siteCtrl from './site.component';

class SitesController {
    constructor($uibModal) {
        this.name = 'sites';
        this.sites = sites;
        this.$uibModal = $uibModal;
    }
    open(size, site) {
        var modalinstance = this.$uibModal.open({
            template: site,
            controller:['$uibModalInstance', function (site,$uibModalInstance) {
                 this.site=site;
                 this.close=$uibModalInstance.close;
                 this.dismiss=$uibModalInstance.dismiss; 
            }],
            size:size
        });
        modalinstance.result.then(function () { 
        }, function () {
             console.log('Dismissed modal'); 
        });
    }
}
SitesController.$inject = ['$uibModal','$uibModalInstance'];
export default SitesController;