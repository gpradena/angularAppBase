(function() {
    'use strict';

    angular.module('app',[
      'ui.router',
      'app-tpl'
    ]).config(Config);

    Config.$inject = ['$urlRouterProvider', '$stateProvider', '$locationProvider'];

    function Config($urlRouterProvider, $stateProvider, $locationProvider) {
        //moment().locale('es').format('LLL');
        console.log('wea');
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('login', {
            url: '/',
            views: {
                'app-view': {
                    templateUrl: 'login/login.tpl.html'
                }
            }
        });
    }

})();

(function() {
    'use strict';


  })();
