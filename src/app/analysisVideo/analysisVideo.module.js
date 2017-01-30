(function() {
    'use strict';

    angular.module('app.analysisVideo', [])
    .config(Config);

    Config.$inject = ['$stateProvider'];

    function Config($stateProvider) {
        $stateProvider.state('app.analysisVideo', {
            url: '/analysisVideo',
            views: {
                'content@app': {
                    templateUrl: 'analysisVideo/analysisVideo.tpl.html',
                    controller: 'analysisVideoController as vm'
                }
            }
        });
    }
})();
