function fetchUrl(url, label) {
    var storage = firebase.storage();
    var storageRef = storage.ref();
    return storageRef.child(url).getDownloadURL().then(function(urlLong) {
        return {
            url: urlLong,
            label: label
        }
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
    constructor($scope, Lightbox, $firebaseArray, $firebaseAuth) {
        this.scope = $scope;
        this.lightbox = Lightbox;
        this.auth = $firebaseAuth();
        this.name = 'site';
        this.slides = null;
        this.uploadvalue = 0;
        var vm = this;
        if (this.site.media) {
            this.slides = [];
            for (var i = 0; i < Object.keys(this.site.media).length; i++) {
                var key = Object.keys(this.site.media)[i];
                var media = this.site.media[key];
                fetchUrl('media/' + media.file, media.label).then(function(value) {
                    value.id = vm.slides.length;
                    vm.slides.push(value);
                    $scope.$apply();
                });
            }
        }
    }
    view(slide) {
        var image = {
            'url': slide.url,
            'caption': slide.label
        };
        this.lightbox.openModal([image], 0);
    }
    select(files) {
        this.site.images = files;
    }
    save() {
        var newSite = {
            "title": this.site.title,
            "text1": this.site.text1,
            "text2": this.site.text2,
            "lat": this.site.lat,
            "long": this.site.long,
            "type": this.site.type
        };
        var databaseRef = firebase.database();
        var siteKey = databaseRef.ref('sites').push(newSite).key;
        this.upload(siteKey);
    }
    addImages() {
        this.upload(this.site.$id);
    }
    upload(siteKey) {
        var vm = this;
        if (this.site.images) {
            var storageRef = firebase.storage().ref();
            for (var i = 0; i < this.site.images.length; i++) {
                var image = this.site.images[i];
                var metadata = { contentType: image.type };
                var name = siteKey + image.name;
                this.uploadtype = 'info';
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
                        var databaseRef = firebase.database();
                        databaseRef.ref('sites/' + siteKey + '/media').push({
                            file: name,
                            label: image.label === undefined ? "" : image.label
                        });
                        vm.scope.$apply();
                    });
            }
        }
    }
}
SiteController.$inject = ['$scope', 'Lightbox', '$firebaseArray', '$firebaseAuth'];
export default SiteController;
