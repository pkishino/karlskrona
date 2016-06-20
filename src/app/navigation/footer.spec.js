var angular = require('angular');
require('angular-mocks');
var footer = require('./footer');

describe('footer component', function () {
  beforeEach(function () {
    angular
      .module('appFooter', ['app/navigation/footer.html'])
      .component('appFooter', footer);
    angular.mock.module('appFooter');
  });

  it('should render \'Mail me!\'', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<app-footer></app-footer>')($rootScope);
    $rootScope.$digest();
    var footer = element.find('a');
    expect(footer.html().trim()).toEqual('Mail me!');
  }));
});
