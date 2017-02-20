(function(){
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = [ 'LoginResource', '$state', 'userSession'];

  function LoginController(loginResource, $state, userSession) {
        var _ADMIN = 1;
        var vm = this;
        
        vm.form = {};
        vm.error = {};
        vm.user = {};
        vm.login = login;
        vm.isNotPossibleTryToLogin = isNotPossibleTryToLogin;

        function login() {
            loginResource.validate(vm.user.username, vm.user.password)
            .then(_validUserCredentials)
            .catch(_invalidUserCredentials);            
        }

        function _validUserCredentials(response) {
            var user = response.data;
            var credential = {
                username: vm.user.username,
                password: vm.user.password,
                userTypeId: user.TipoUsuario
            };
            userSession.save(credential);
            if(_isAdmin(user)) {
                $state.go('app.analysisVideo');
                //$state.go('administration.users');                
            } else {
                $state.go('analyst.user.assignments');
            }
        }

        function _isAdmin(user) {
            return user.IdTipoUsuario === _ADMIN;
        }

        function _invalidUserCredentials(response) {
            vm.error = response.data;
            vm.form.password.$error = { invalidLogin: true };
        }

        function isNotPossibleTryToLogin() {
            return !_isPossibleTryToLogin();
        }

        function _isPossibleTryToLogin() {
            return vm.form.$valid && vm.form.$dirty;
        }
    }
})();
