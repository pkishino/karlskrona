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
    fetchLogo(site) {
        var url = '';
        if (!site.logo) {
            url = 'assets/flagga.png';
        } else if (site.logo.indexOf('http') == -1) {
            url = 'assets/' + site.logo;
        }
        if (url) {
            fetchUrl(url).then(function(value) {
                return value;
            });
        } else {
            url = site.logo;
        }
        return url;
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
            template: '<site site="$ctrl.site" save="$ctrl.save()" close="$close()" uploadtype="$ctrl.uploadtype" uploadvalue="$ctrl.uploadvalue" new="$ctrl.new"></site>',
            controllerAs: '$ctrl',
            controller: ['$uibModalInstance',
                function($uibModalInstance) {
                    this.site = {
                        "title": "",
                        "text1": "",
                        "text2": "",
                        "lat": "",
                        "long": "",
                        "image": null
                    };
                    this.new = true;
                    this.$uibModalInstance = $uibModalInstance;
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
