(function() {
    'use strict';

    angular.module('app')
    .factory('UserResource', UserResource);

    UserResource.$inject = ['$http', 'constants'];

    function UserResource($http, constants) {
        var _url = constants.API_URL + 'users';
        var resource = {
            findOne: findOne,
            find: find,
            create: create,
            update: update,
            remove: remove,
            findAnalysts: findAnalysts,
            resetPassword: resetPassword
        };
        return resource;

        function findOne(username) {
            return $http.get(_url+'/'+username);
        }

        function find(filter) {
            return $http.get(_url, { params: filter });
        }

        function create(user) {
            return $http.post(_url, user);
        }

        function update(user) {
            return $http.put(_url+'/'+user.Username, user);
        }

        function remove(username) {
            return $http.delete(_url+'/'+username);
        }

        function findAnalysts(query) {
            var url = constants.API_URL + 'analysts';
            var params = { query: query };

            return $http.get(url, { params: params });
        }

        function resetPassword(email) {
            var url = constants.API_URL + 'reset-password';
            var data = { Email: email };

            return $http.post(url, data);
        }
    }
})();
