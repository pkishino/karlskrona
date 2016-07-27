class NavbarController {
    constructor() {
        this.name = 'Dive Karlskrona';
        this.tabData = [{
            heading: 'Home',
            route: 'home',
            params: {
                icon: 'glyphicon glyphicon-home'
            }
        }, {
            heading: 'Map',
            route: 'myMap',
            params: {
                icon: 'glyphicon glyphicon-map-marker'
            }
        }, {
            heading: 'Sites',
            route: 'sites',
            params: {
                icon: 'glyphicon glyphicon-flag'
            }
        }, {
            heading: 'Emergency',
            route: 'emergency',
            params: {
                icon: 'glyphicon glyphicon-warning-sign'
            }
        }, {
            heading: 'About',
            route: 'about',
            params: {
                icon: 'glyphicon glyphicon-info-sign'
            }
        }];
    }
}

export default NavbarController;
