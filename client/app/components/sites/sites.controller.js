function fetchUrl(url) {
    var storage = firebase.storage();
    var storageRef = storage.ref();
    storageRef.child(url).getDownloadURL().then(function(urlLong) {
        return urlLong;
    }).catch(function(error) {
        console.log(error);
        switch (error.code) {
            case 'storage/object_not_found':
                // File doesn't exist
                break;

            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

            case 'storage/canceled':
                // User canceled the upload
                break;

            case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
        }
    });
}

class SitesController {
    constructor($scope, $uibModal, $firebaseArray) {
        this.sites = [];
        $scope.sites = $firebaseArray(firebase.database().ref().child('sites'));
        $scope.sites.forEach(function(site) {
            var url = '';
            if (!site.logo) {
                url = 'assets/flagga.png';
            } else if (site.logo.indexOf('http') == -1) {
                url = 'assets/' + site.logo;
            }
            if (url) {
                site.logoUrl = fetchUrl(url);
            } else {
                site.logoUrl = site.logo;
            }
        });

        this.name = 'sites';
        this.$uibModal = $uibModal;

    }
    open(site) {
        var modalinstance = this.$uibModal.open({
            template: '<site site="$ctrl.site" close="$ctrl.close()" dismiss="$ctrl.dismiss()" sitemap="$ctrl.sitemap" showfull="$ctrl.showfull()"></site>',
            controllerAs: '$ctrl',
            controller: ['$uibModalInstance', 'Lightbox',
                function($uibModalInstance, Lightbox) {

                    this.site = site;
                    if (site.map) {
                        this.sitemap = fetchUrl('divemaps/' + site.map);
                    }
                    this.close = $uibModalInstance.close;
                    this.dismiss = $uibModalInstance.dismiss;
                    this.showfull = function() {
                        var image = {
                            'url': this.sitemap,
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
