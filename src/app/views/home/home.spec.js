var angular = require('angular');
require('angular-mocks');
var home = require('./home');

describe('home component', function () {
  beforeEach(function () {
    angular
      .module('home', ['app/views/home.html'])
      .component('home', home);
    angular.mock.module('home');
  });

  it('should render Welcome to Karlskrona diving', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<home></home>')($rootScope);
    $rootScope.$digest();
    var title = element.find('h1');
    expect(title.html().trim()).toEqual('Welcome to Karlskrona diving');
  }));
});
