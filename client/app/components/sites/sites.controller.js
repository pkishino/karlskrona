import sites from './sites.json';

class SitesController {
    constructor($http) {
        this.name = 'sites';
        this.sites = sites;
    }
}
SitesController.$inject = ['$http'];
export default SitesController;
