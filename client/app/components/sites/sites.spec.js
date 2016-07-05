import SitesModule from './sites'
import SitesController from './sites.controller';
import SitesComponent from './sites.component';
import SitesTemplate from './sites.html';

describe('Sites', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SitesModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SitesController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Component', () => {
      // component/directive specs
      let component = SitesComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SitesTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SitesController);
      });
  });
});
