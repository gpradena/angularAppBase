(function() {
    'use strict';

    angular.module('app')
    .factory('userSession', UserSession);

    UserSession.$inject = ['$base64'];

    function UserSession($base64) {
    //function UserSession() {
        var _token = 'TOKEN';
        var _userData = 'USER-DATA';
        var service = {
            save: save,
            clean: clean,
            getUser: getUser,
            getCredentials: getCredentials
        };
        return service;

        function save(user) {
            var credentials;

            if(angular.isDefined(user.password)) {
                credentials = $base64.encode(user.username + ':' + user.password);
                window.localStorage.setItem(_token, credentials);
            }

            delete user.password;
            window.localStorage.setItem(_userData, JSON.stringify(user));
        }

        function clean() {
            window.localStorage.clear();
        }

        function getUser() {
            return JSON.parse(window.localStorage.getItem(_userData));
        }

        function getCredentials() {
            return window.localStorage.getItem(_token);
        }
    }    
})();
