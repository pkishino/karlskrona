function fetchUrl(url) {
    var storage = firebase.storage();
    var storageRef = storage.ref();
    return storageRef.child(url).getDownloadURL().then(function(urlLong) {
        return urlLong;
    }).catch(function(error) {
        console.log(error);
        throw {
            message: error.code,
            status: error.status,
            data: error
        };
    });
}

class SitesController {
    constructor($scope, $uibModal, $firebaseArray) {
        var vm = this;
        var sites = $firebaseArray(firebase.database().ref().child('sites'));
        sites.$loaded().then(function() {
            sites.forEach(function(site) {
                var url = '';
                if (!site.logo) {
                    url = 'assets/flagga.png';
                } else if (site.logo.indexOf('http') == -1) {
                    url = 'assets/' + site.logo;
                }
                if (url) {
                    fetchUrl(url).then(function (value) {
                        site.logoUrl = value;
                        $scope.$apply();
                    });
                } else {
                    site.logoUrl = site.logo;
                }
            });
            vm.sites = sites;
        });
        $scope.$watch(function(event) {
            vm.sites=sites;
        });
        this.name = 'sites';
        this.$uibModal = $uibModal;

    }
    open(site) {
        var modalinstance = this.$uibModal.open({
            template: '<site site="$ctrl.site" close="$ctrl.close()" dismiss="$ctrl.dismiss()" sitemap="$ctrl.sitemap" showfull="$ctrl.showfull()"></site>',
            controllerAs: '$ctrl',
            controller: ['$scope','$uibModalInstance', 'Lightbox',
                function($scope, $uibModalInstance, Lightbox) {

                    this.site = site;
                    var vm=this;
                    if (site.map) {
                        fetchUrl('divemaps/' + site.map).then(function(value) {
                            vm.sitemap = value;
                            $scope.$apply();
                        });
                    }
                    this.close = $uibModalInstance.close;
                    this.dismiss = $uibModalInstance.dismiss;
                    this.showfull = function() {
                        var image = {
                            'url': vm.sitemap,
                            'caption': this.site.title
                        };
                        Lightbox.openModal([image], 0);
                    };
                }
            ]
        });
        modalinstance.result.then(function() {}, function() {
            console.log('Dismissed modal');
        });
    }
}
SitesController.$inject = ['$scope', '$uibModal', '$firebaseArray'];
export default SitesController;
