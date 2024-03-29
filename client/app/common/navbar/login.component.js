import template from './login.html';
import controller from './login.controller';
import './login.styl';

let loginComponent = {
    restrict: 'E',
    bindings: {
    	auth: '=',
        close: '&'
    },
    template,
    controller
};

export default loginComponent;
