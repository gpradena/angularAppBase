
(function() {
    'use strict';

    angular
    .module('app')
    .factory('constants', Constants);

    Constants.$inject = ['$location'];

    function Constants($location) {
        var baseURL = 'http://localhost:8081/api/';
        //var baseURL = $location.$$absUrl.split('#')[0] + 'api/';
        //var baseURL = 'http://192.168.0.3:49886/api/';
        //var baseURL = 'http://localhost:49886/api/';
        //var baseURL = 'http://192.168.0.100:8080/api/';
        var factory = {
            API_URL: baseURL
        };

        return factory;
    }
})();
