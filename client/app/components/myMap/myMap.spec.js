import MyMapModule from './myMap'

describe('myMap', () => {
  let $rootScope, $state, $location, $componentController, $compile, $firebaseArray, NgMap;

  beforeEach(window.module(MyMapModule));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
    $firebaseArray = $injector.get('$firebaseArray');
    NgMap = $injector.get('NgMap');
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    it('myMap component should be visible when navigates to /myMap', () => {
      $location.url('/myMap');
      $rootScope.$digest();
      expect($state.current.component).to.eq('myMap');
    });
  });

  describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = $componentController('myMap', {
        $scope: $rootScope.$new()
      });
    });

    it('has a name property', () => { // erase if removing this.name from the controller
      expect(controller).to.have.property('name');
    });
  });

  describe('View', () => {
    // view layer specs.
    let scope, template;

    beforeEach(() => {
      scope = $rootScope.$new();
      template = $compile('<my-map></my-map>')(scope);
      scope.$apply();
    });

    it('has name in template', () => {
      expect(template.find('div').class()).to.eq('mapview');
    });

  });
});