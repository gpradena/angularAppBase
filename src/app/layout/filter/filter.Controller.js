(function(){
  'use strict';

  angular
    .module('app')
    .controller('FilterController', FilterController);

  FilterController.$inject = ['FilterResource','$state', 'userSession'];

  function FilterController(filterResource, $state, userSession) {
        // var vm = this;
        // var url = window.location.href;

        // vm.filters = {};
        // vm.filter = filter;

        // function filter() {
        // console.log("url");
        // console.log(url);
        //     filterResource.updateSearch(vm.filters.location, vm.filters.camara, vm.filters.fechaDesde, vm.filters.fechaHasta)
        //     .then()
        //     .catch();            
        // }
    }
})();
