function fetchUrl(url, label) {
    var storage = firebase.storage();
    var storageRef = storage.ref();
    return storageRef.child(url).getDownloadURL().then(function(urlLong) {
        return {
            url: urlLong,
            label: label
        };
    }).catch(function(error) {
        console.log(error);
        throw {
            message: error.code,
            status: error.status,
            data: error
        };
    });
}

class SiteController {
    constructor($scope, Lightbox, $firebaseObject, $firebaseAuth) {
        if (!this.new) {
            this.site = new $firebaseObject(firebase.database().ref('sites/' + this.site.$id));
            var vm = this;
            this.site.$loaded().then(function() {
                if (vm.site.media) {
                    vm.slides = [];
                    Object.keys(vm.site.media).forEach(function(key) {
                        vm.loadMedia(key);
                    });
                }
            });
        }
        this.firebaseObject = $firebaseObject;
        this.scope = $scope;
        this.lightbox = Lightbox;
        this.auth = $firebaseAuth();
        this.name = 'site';
        this.uploadvalue = 0;
        this.slides = null;

    }
    loadMedia(key) {
        var vm = this;
        var media = vm.site.media[key];
        fetchUrl('media/' + media.file, media.label).then(function(value) {
            value.id = vm.slides.length;
            vm.slides.push(value);
            vm.scope.$apply();
        });
    }
    view(slide) {
        var image = {
            'url': slide.url,
            'caption': slide.label
        };
        this.lightbox.openModal([image], 0);
    }
    save() {
        var newSite = {
            "title": this.site.title,
            "text1": this.site.text1,
            "text2": this.site.text2,
            "lat": this.site.lat,
            "long": this.site.long,
            "type": this.site.type,
            "depth": {
                "average": this.site.average,
                "max": this.site.max
            },
            "sights": this.site.sights
        };
        var dbRef = firebase.database();
        var siteKey = dbRef.ref('sites').push(newSite).key;
        var vm = this;
        vm.site = new vm.firebaseObject(dbRef.ref('sites/' + siteKey));
        vm.site.$loaded().then(function() {
            if (vm.images) {
                vm.slides = [];
                vm.upload(siteKey);
            } else {
              vm.close();
            }
        });
    }
    addImages() {
        this.upload(this.site.$id);
    }
    upload(siteKey) {
        var vm = this;
        var storageRef = firebase.storage().ref();
        vm.images.forEach(function(image) {
            var metadata = { contentType: image.type };
            var name = siteKey + image.name;
            vm.uploadtype = 'info';
            var uploadTask = storageRef.child('media/' + name).put(image, metadata);
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
                    var mediaKey = firebase.database().ref('sites/' + siteKey + '/media').push().key;
                    if (vm.site.media === undefined) {
                        vm.site.media = {};
                    }
                    vm.site.media[mediaKey] = ({
                        file: name,
                        label: image.label === undefined ? "" : image.label
                    });
                    vm.site.$save().then(function() {
                        vm.loadMedia(mediaKey);
                    });
                    vm.scope.$apply();
                });
        });
    }
}
SiteController.$inject = ['$scope', 'Lightbox', '$firebaseObject', '$firebaseAuth'];
export default SiteController;
