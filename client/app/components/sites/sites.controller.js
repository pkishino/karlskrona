import sites from './sites.json';
// import siteComp from './site.component';

class SitesController {
    constructor($uibModal) {
        this.name = 'sites';
        this.sites = sites;
        this.$uibModal = $uibModal;
    }
    open(site) {
        var modalinstance = this.$uibModal.open({
            template: '<site site="$ctrl.site" close="$ctrl.close()" dismiss="$ctrl.dismiss()"></site>',
            controllerAs:'$ctrl',
            controller: ['$uibModalInstance',
            function ($uibModalInstance) {
                this.site = site;
                this.close = $uibModalInstance.close;
                this.dismiss = $uibModalInstance.dismiss;
            }]
        });
        modalinstance.result.then(function() {}, function() {
            console.log('Dismissed modal');
        });
    }
}
SitesController.$inject = ['$uibModal'];
export default SitesController;
