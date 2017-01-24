(function() {
    'use strict';


    angular.module('app', [
      'ui.router',
      'app-tpl',
      'app.dashboard'
    ])
    .config(Config);

    Config.$inject = ['$urlRouterProvider','$stateProvider', '$locationProvider'];

    function Config($urlRouterProvider, $stateProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
      .state('login', {
          url: '/',
          views: {
              'app-view': {
                  templateUrl: 'login/login.tpl.html',
                  controller: 'LoginController as vm'
              }
          }
      })
      .state('app', {
          views: {
              'app-view': {
                  templateUrl: 'layout/main/main.tpl.html'
              },
              'header@app': {
                  templateUrl: 'layout/header/header.tpl.html'
              },
              'menu@app': {
                  templateUrl: 'layout/menuLateral/menuLateral.tpl.html'
              }
          }
      });

    }

})();

(function() {
    'use strict';

    angular.module('app.dashboard', [])
    .config(Config);

    Config.$inject = ['$stateProvider'];

    function Config($stateProvider) {
        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            views: {
                'content@app': {
                    templateUrl: 'dashboard/dashboard.tpl.html',
                    controller: 'dashboardController as vm'
                }
            }
        });
    }
})();

(function() {
    'use strict';

    angular.module('app.dashboard').controller('dashboardController', dashboardController);

     dashboardController.$inject = [
        ''
    ];

    function dashboardController(){


            _init();

             function _init() {

            }
      }

})();

(function(){
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$state'];

  function LoginController($state){
    var vm = this;

    vm.login = login;

    function login() {
      $state.go('app.dashboard');
    }
  }
})();
