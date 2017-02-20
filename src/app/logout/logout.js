(function() {
    'use strict';

    angular.module('app')
    .controller('LogoutController', LogoutController);

    LogoutController.$inject = [ '$state', 'userSession'];

    function LogoutController($state, userSession) {
        userSession.clean();
        $state.go('app.login');
    }

})();
