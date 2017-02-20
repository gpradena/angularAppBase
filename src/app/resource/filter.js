(function() {
    'use strict';

    angular.module('app')
    .factory('FilterResource', FilterResource);

    FilterResource.$inject = ['$http', 'constants'];

    function FilterResource($http, constants) {
        //var _url = constants.API_URL + 'login';
        var url = window.location.href;
        console.log(url);
        var resource = {
            validate: validate
        };

        return resource;

        function updateSearch(location,camara,dateFrom,dateUntil) {
            var search = {
                Location: location,
                Camara: camara,
                DateFrom: dateFrom,
                DateUntil: dateUntil
            };
            //return $http.post(_url, credential);
        }
    }
})();
