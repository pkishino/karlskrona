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

class SiteController {
    constructor($scope, Lightbox, $firebaseArray) {
        this.scope = $scope;
        this.lightbox = Lightbox;
        this.name = 'site';
        this.slides = [];
        var vm = this;
        if (this.site.map) {
            fetchUrl('divemaps/' + this.site.map).then(function(value) {
                vm.slides.push({
                    url: value,
                    title: 'Divemap: ' + vm.site.title,
                    id: vm.slides.length
                });
                $scope.$apply();
            });
        } else {
            this.slides = null;
        }
    }
    view(slide) {
        var image = {
            'url': slide.url,
            'caption': slide.title
        };
        this.lightbox.openModal([image], 0);
    }
    save() {
        this.upload();
    }
    upload() {
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
                    vm.close();
                });
        } else {
            this.close();
        }
    }
}
SiteController.$inject = ['$scope', 'Lightbox', '$firebaseArray'];
export default SiteController;
