class MyMapController {
    constructor($scope, $firebaseArray, NgMap, FirebaseFactory) {
        this.name = 'myMap';
        this.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBbS0TVtTSSBiIup-LahxxY773efpz6qFA';
        var vm = this;
        NgMap.getMap({ id: "siteMap" }).then(function(map) {
            vm.map = map;
        });
        FirebaseFactory.initialize();
        $scope.sites = $firebaseArray(firebase.database().ref().child('sites'));
        $scope.sites.$watch(function(e) {
            var key = e.key;
            vm.sites = $scope.sites;
        });
        this.showSite = function(e, site, markerId) {
            vm.site = site;
            vm.map.showInfoWindow('popup', markerId);
        };
    }
}
MyMapController.$inject = ['$scope', '$firebaseArray', 'NgMap', 'FirebaseFactory'];
export default MyMapController;
