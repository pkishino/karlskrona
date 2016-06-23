class NavbarController {
    constructor() {
        this.name = 'navbar';
        var vm = this;
        vm.tabData = [{
            heading: 'Home',
            route: 'home',
            params: {
                icon: 'glyphicon glyphicon-home'
            }
        }, {
            heading: 'Map',
            route: 'map',
            params: {
                icon: 'glyphicon glyphicon-map-marker'
            }
        }];
    }
}

export default NavbarController;
