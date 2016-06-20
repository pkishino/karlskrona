module.exports = {
  templateUrl: 'app/navigation/header.html',
  controller: NavCtrl
};

/** @ngInject */
function NavCtrl() {
  var vm = this;
  vm.tabData = [{
    heading: 'Home',
    route: 'app',
    params: {
      icon: 'glyphicon glyphicon-home'
    }
  },
  {
    heading: 'Map',
    route: 'map',
    params: {
      icon: 'glyphicon glyphicon-map-marker'
    }
  }];
}
