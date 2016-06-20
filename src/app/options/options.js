module.exports = {
  templateUrl: 'app/options/options.html',
  controller: OptionsController
};

/** @ngInject */
function OptionsController($http) {
  var vm = this;

  $http
    .get('app/options/options.json')
    .then(function (response) {
      vm.options = response.data;
    });
}
