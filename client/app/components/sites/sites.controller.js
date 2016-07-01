import sites from './sites.json';
import siteComp from './site.component';

class SitesController {
    constructor($uibModal) {
        this.name = 'sites';
        this.sites = sites;
        this.$uibModal = $uibModal;
    }
    open(index) {
        var _this = this;
        var modalinstance = this.$uibModal.open({
            template: '<site site="$ctrl.site"></site>',
            controller: function () {
                 this.site = _this.sites[index]; 
            }
        });
        modalinstance.result.then(function() {}, function() {
            console.log('Dismissed modal');
        });
    }
}
SitesController.$inject = ['$uibModal'];
export default SitesController;
