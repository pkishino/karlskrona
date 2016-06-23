module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            template: '<app></app>'
        })
        .state('map', {
        	url:'/map',
        	template:'<map></map>'
        });
}
