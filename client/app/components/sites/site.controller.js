class SiteModalCtrl {
    constructor(site, $uibModalInstance) {
        console.log('modal ctrl');
        this.site = site;
        this.$uibModalInstance = $uibModalInstance;
    }
    ok(){
    	console.log('modal ok');
    	this.$uibModalInstance.close();
    }
    cancel(){
        console.log('modal cancel');
    	this.$uibModalInstance.dismiss('cancel');
    }
}
SiteModalCtrl.$inject = ['$uibModalInstance'];
export default SiteModalCtrl;