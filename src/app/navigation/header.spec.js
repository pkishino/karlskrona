var angular = require('angular');
require('angular-mocks');
var header = require('./header');

describe('header component', function () {
  beforeEach(function () {
    angular
      .module('appHeader', ['app/navigation/header.html'])
      .component('appHeader', header);
    angular.mock.module('appHeader');
  });

  it('should render \'Karlskrona Dive\'', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<app-header></app-header>')($rootScope);
    $rootScope.$digest();
    var header = element.find('a');
    expect(header.html().trim()).toEqual('Karlskrona Dive');
  }));
});
