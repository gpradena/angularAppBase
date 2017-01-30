(function() {
    'use strict';

    angular.module('app.analysisPeople', [])
    .config(Config);

    Config.$inject = ['$stateProvider'];

    function Config($stateProvider) {
        $stateProvider.state('app.analysisPeople', {
            url: '/analysisPeople',
            views: {
                'content@app': {
                    templateUrl: 'analysisPeople/analysisPeople.tpl.html',
                    controller: 'analysisPeopleController as vm'
                }
            }
        });
    }
})();
