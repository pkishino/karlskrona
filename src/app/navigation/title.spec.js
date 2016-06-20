var angular = require('angular');
require('angular-mocks');
var title = require('./title');

describe('title component', function () {
  beforeEach(function () {
    angular
      .module('appTitle', ['app/navigation/title.html'])
      .component('appTitle', title);
    angular.mock.module('appTitle');
  });

  it('should render Welcome to Karlskrona diving', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<app-title></app-title>')($rootScope);
    $rootScope.$digest();
    var title = element.find('h1');
    expect(title.html().trim()).toEqual('Welcome to Karlskrona diving');
  }));
});
