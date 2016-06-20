var angular = require('angular');
require('angular-mocks');
var options = require('./options');

var optionsJson = [
  {
    key: 'gulp',
    title: 'Gulp',
    logo: 'http://fountainjs.io/assets/imgs/gulp.png',
    text1: 'The streaming build system',
    text2: 'Automate and enhance your workflow'
  },
  {
    key: 'react',
    title: 'React',
    logo: 'http://fountainjs.io/assets/imgs/react.png',
    text1: 'A JavaScript library for building user interfaces',
    text2: 'A declarative, efficient, and flexible JavaScript library for building user interfaces'
  },
  {
    key: 'angular1',
    title: 'Angular 1',
    logo: 'http://fountainjs.io/assets/imgs/angular1.png',
    text1: 'HTML enhanced for web apps!',
    text2: 'AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop.'
  }
];

describe('options component', function () {
  beforeEach(function () {
    angular
      .module('appOptions', ['app/options/options.html'])
      .component('appOptions', options);
    angular.mock.module('appOptions');
  });
  it('should render 3 elements <app-option>', angular.mock.inject(function ($rootScope, $compile, $httpBackend) {
    $httpBackend.when('GET', 'app/options/options.json').respond(optionsJson);
    var element = $compile('<app-options></app-options>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    var options = element.find('app-option');
    expect(options.length).toEqual(3);
  }));
});
