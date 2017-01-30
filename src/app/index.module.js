(function() {
    'use strict';

    angular.module('app', [
      'ui.router',
      'app-tpl',
      'app.directives',
      'app.dashboard',
      'app.analysisVideo',
      'app.analysisPeople'
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
              /*'menu@app': {
                  templateUrl: 'layout/menu/menu.tpl.html'
              },*/
              'filter@app': {
                  templateUrl: 'layout/filter/filter.tpl.html'
              }
          }
      });

    }

})();
