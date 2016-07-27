import SitesModule from './sites'

describe('Sites', () => {
  let $rootScope, $state, $location, $componentController, $compile;

  beforeEach(window.module(SitesModule));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    it('Sites component should be visible when navigates to /sites', () => {
      $location.url('/sites');
      $rootScope.$digest();
      expect($state.current.component).to.eq('sites');
    });
  });

  describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = $componentController('sites', {
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
      template = $compile('<sites></sites>')(scope);
      scope.$apply();
    });

    it('has main in template', () => {
      expect(template.find('main').hasClass("main")).to.eq(true);
    });

  });
});