class NavbarController {
    constructor($firebaseAuth, $uibModal, FirebaseFactory) {
        this.modal = $uibModal;
        FirebaseFactory.initialize();
        this.auth = $firebaseAuth();
        this.name = 'Dive Karlskrona';
        this.tabData = [{
            heading: 'Home',
            route: 'home',
            params: {
                icon: 'glyphicon glyphicon-home'
            }
        }, {
            heading: 'Map',
            route: 'myMap',
            params: {
                icon: 'glyphicon glyphicon-map-marker'
            }
        }, {
            heading: 'Sites',
            route: 'sites',
            params: {
                icon: 'glyphicon glyphicon-flag'
            }
        }, {
            heading: 'Emergency',
            route: 'emergency',
            params: {
                icon: 'glyphicon glyphicon-warning-sign'
            }
        }, {
            heading: 'About',
            route: 'about',
            params: {
                icon: 'glyphicon glyphicon-info-sign'
            }
        }];
        var vm = this;
    }
    login() {
        var vm = this;
        var modalInstance = this.modal.open({
            template: '<login-component modalInstance="$ctrl.modalInstance" auth="$ctrl.auth" close="$close()"></login-component>',
            controllerAs: '$ctrl',
            controller: [
                function() {
                    this.modalInstance = modalInstance;
                    this.auth = vm.auth;
                }
            ]
        });
        modalInstance.result.then(function() {}, function() {
            vm.user = vm.auth.$getAuth();
        });
    }
}
NavbarController.$inject = ['$firebaseAuth', '$uibModal', 'FirebaseFactory'];
export default NavbarController;
