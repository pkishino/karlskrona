import FooterModule from './footer'
import FooterController from './footer.controller';
import FooterComponent from './footer.component';
import FooterTemplate from './footer.html';

describe('Footer', () => {
  let $rootScope, makeController;

  beforeEach(window.module(FooterModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new FooterController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(FooterTemplate).to.match(/.?Patrick\sA\.\sKishino.?/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = FooterComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(FooterTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(FooterController);
      });
  });
});
