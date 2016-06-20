var angular = require('angular');
require('angular-mocks');
var option = require('./option');

describe('option component', function () {
  beforeEach(function () {
    angular
      .module('appOption', ['app/options/option.html'])
      .component('appOption', option);
    angular.mock.module('appOption');
  });

  it('should render Gulp', angular.mock.inject(function ($rootScope, $compile) {
    var $scope = $rootScope.$new();
    $scope.fixture = {
      key: 'gulp',
      title: 'Gulp',
      logo: 'http://fountainjs.io/assets/imgs/gulp.png',
      text1: 'The streaming build system',
      text2: 'Automate and enhance your workflow'
    };
    var element = $compile('<app-option option="fixture"></app-option>')($scope);
    $scope.$digest();
    var option = element.find('h3');
    expect(option.html().trim()).toEqual('Gulp');
  }));
});
