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
    constructor($scope, $stateParams, $uibModal, $firebaseArray, FirebaseFactory) {
        this.scope = $scope;
        var vm = this;
        FirebaseFactory.initialize();
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
            template: '<site site="$ctrl.site" close="$ctrl.close()" sitemap="$ctrl.sitemap" showfull="$ctrl.showfull()"></site>',
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
    }
    newSite() {
        var modalinstance = this.$uibModal.open({
            template: '<site site="$ctrl.site" save="$ctrl.save()" dismiss="$ctrl.dismiss()" uploadtype="$ctrl.uploadtype" uploadvalue="$ctrl.uploadvalue" new="$ctrl.new"></site>',
            controllerAs: '$ctrl',
            controller: ['$scope', '$uibModalInstance', 'Lightbox', '$firebaseArray',
                function($scope, $uibModalInstance, Lightbox, $firebaseArray) {
                    this.site = {
                        "title": "",
                        "text1": "",
                        "text2": "",
                        "lat": "",
                        "long": "",
                        "image": null
                    };
                    this.scope = $scope;
                    this.new = true;
                    this.$uibModalInstance = $uibModalInstance;
                    var vm = this;
                    this.save = function() {
                        this.upload();
                    };
                    this.dismiss = $uibModalInstance.dismiss;
                    this.upload = function() {
                        var newSite = {
                            "title": this.site.title,
                            "text1": this.site.text1,
                            "text2": this.site.text2,
                            "lat": this.site.lat,
                            "long": this.site.long
                        };
                        var databaseRef = firebase.database();
                        var siteKey = databaseRef.ref('sites').push(newSite).key;
                        if (this.site.image) {
                            var storageRef = firebase.storage().ref();
                            var metadata = { contentType: this.site.image.type };
                            var name = this.site.title + "." + this.site.image.name.slice((this.site.image.name.lastIndexOf(".") - 1 >>> 0) + 2);
                            var uploadTask = storageRef.child('divemaps/' + name).put(this.site.image, metadata);
                            this.uploadtype = 'info';
                            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                                function(snapshot) {
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
                                    vm.uploadtype = 'success';
                                    newSite.map = name;
                                    databaseRef.ref('sites/' + siteKey).update({ map: name });
                                    vm.$uibModalInstance.close();
                                });
                        } else {
                            this.$uibModalInstance.close();
                        }
                    };
                }
            ]
        });
        modalinstance.result.then(function() {}, function() {
            console.log('Dismissed modal');
        });
    }
}
SitesController.$inject = ['$scope', '$stateParams', '$uibModal', '$firebaseArray', 'FirebaseFactory'];
export default SitesController;
