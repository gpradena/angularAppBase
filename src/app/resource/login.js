(function() {
    'use strict';

    angular.module('app')
    .factory('LoginResource', LoginResource);

    LoginResource.$inject = ['$http', 'constants'];

    function LoginResource($http, constants) {
        var _url = constants.API_URL + 'login';

        var resource = {
            validate: validate
        };

        return resource;

        function validate(username, password) {
            var credential = {
                username: username,
                password: password
            };
            return $http.post(_url, credential);
        }
    }
})();
