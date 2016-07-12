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
        this.scope = $scope;
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
                    fetchUrl(url).then(function(value) {
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
            vm.sites = sites;
        });
        this.name = 'sites';
        this.$uibModal = $uibModal;
        this.image = null;
    }
    open(site) {
        var modalinstance = this.$uibModal.open({
            template: '<site site="$ctrl.site" close="$ctrl.close()" dismiss="$ctrl.dismiss()" sitemap="$ctrl.sitemap" showfull="$ctrl.showfull()"></site>',
            controllerAs: '$ctrl',
            controller: ['$scope', '$uibModalInstance', 'Lightbox',
                function($scope, $uibModalInstance, Lightbox) {

                    this.site = site;
                    var vm = this;
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
    onImageSelected(file) {
        this.image = file;
    }
    onImageDeselected(){
        this.image = null;
    }
    upload() {
        if (this.image) {
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var metadata = { contentType: this.image.type };
            var uploadTask = storageRef.child('divemaps/' + this.image.name).put(this.image, metadata);
            this.uploadtype = 'info';
            var vm = this;
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function(snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    vm.uploadvalue = Math.floor(progress);
                    vm.scope.$apply();
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                },
                function(error) {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                function() {
                    // Upload completed successfully, now we can get the download URL
                    var downloadURL = uploadTask.snapshot.downloadURL;
                    vm.onImageSelected(null);
                    vm.uploadtype = 'success';
                    vm.scope.$apply();
                });
        }
    }
}
SitesController.$inject = ['$scope', '$uibModal', '$firebaseArray'];
export default SitesController;
