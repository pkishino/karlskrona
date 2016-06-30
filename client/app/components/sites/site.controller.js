class SiteModalCtrl {
    constructor($uibModalInstance) {
        this.$uibModalInstance = $uibModalInstance;
    }
    ok(){
    	console.log('modal ok');
    	this.$uibModalInstance.close();
    }
    cance(){
    	this.$uibModalInstance.dismiss('cancel');
    }
}
SiteModalCtrl.$inject = ['$uibModalInstance'];
export default SiteModalCtrl;