(function() {
    'use strict';

    angular.module('app')
    .factory('interceptor', Interceptor)
    .config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push('interceptor');
	}]);

    Interceptor.$inject = ['$injector', '$q', 'userSession'];

    function Interceptor($injector, $q, userSession) {
        var interceptor = {
            request: request,
            responseError: responseError
        };
        return interceptor;

        function request(config) {
            var credentials = userSession.getCredentials();

            if(credentials)
                config.headers.Authorization = 'Basic ' + credentials;
            return config;
        }

        function responseError(rejection) {
            var $state = $injector.get('$state');

            if(rejection.status === 401 && $state.current.name !== 'login')
                $state.go('logout');
            
            return $q.reject(rejection);
        }
    }
})();
