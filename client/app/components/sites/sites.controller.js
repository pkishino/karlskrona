class SitesController {
    constructor($scope, $stateParams, $uibModal, $firebaseArray, FirebaseFactory, $firebaseAuth) {
        this.scope = $scope;
        var vm = this;
        FirebaseFactory.initialize();
        this.auth = $firebaseAuth();
        $scope.sites = $firebaseArray(firebase.database().ref().child('sites'));
        $scope.sites.$watch(function(e) {
            var key = e.key;
            vm.sites = $scope.sites;
            if ($stateParams.site === key) {
                vm.open(vm.sites.$getRecord($stateParams.site));
            }
        });
        this.name = 'sites';
        this.$uibModal = $uibModal;

    }
    open(site) {
        var modalinstance = this.$uibModal.open({
            template: '<site site="$ctrl.site" close="$close()"></site>',
            controllerAs: '$ctrl',
            controller: [
                function() {
                    this.site = site;
                }
            ]
        });
    }
    newSite() {
        var modalinstance = this.$uibModal.open({
            template: '<site site="$ctrl.site" close="$close()" new="$ctrl.new"></site>',
            controllerAs: '$ctrl',
            controller: [
                function() {
                    this.site = {
                        "title": "",
                        "text1": "",
                        "text2": "",
                        "lat": "",
                        "long": "",
                        "image": null,
                        "type": ""
                    };
                    this.new = true;
                }
            ]
        });
        modalinstance.result.then(function() {}, function() {
            console.log('Dismissed modal');
        });
    }
}
SitesController.$inject = ['$scope', '$stateParams', '$uibModal', '$firebaseArray', 'FirebaseFactory', '$firebaseAuth'];
export default SitesController;
