class SiteModalCtrl {
    constructor($uibModalInstance, site) {
        console.log(this);
        this.site = site;
        this.close = $uibModalInstance.close;
        this.dismiss = $uibModalInstance.dismiss;
        this.$uibModalInstance = $uibModalInstance;
    }
    ok() {
        console.log('modal ok');
        this.$uibModalInstance.close();
    }
    cancel() {
        console.log('modal cancel');
        this.$uibModalInstance.dismiss('cancel');
    }
}
SiteModalCtrl.$inject = ['$uibModalInstance'];
export default SiteModalCtrl;
