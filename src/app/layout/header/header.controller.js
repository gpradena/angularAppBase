(function(){
  'use strict';

  angular
    .module('app')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$state', 'userSession'];

  function HeaderController($state, userSession) {        
        var vm = this;
        vm.user = userSession.getUser();
        console.log(vm.user);
        // vm.logout = logout;

        // function logout(){
        //     $state.go("logout");
        // }
    }
})();
