(function() {
    'use strict';

    angular.module('app', [
      'ui.router',
      'base64',
      'app-tpl',
      'app.directive',
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
                  templateUrl: 'layout/header/header.tpl.html',
                  controller: 'HeaderController as vm'
              }
              /*'menu@app': {
                  templateUrl: 'layout/menu/menu.tpl.html'
              },
              'filter@app': {
                  templateUrl: 'layout/filter/filter.tpl.html'
              }*/
          }
      })
      .state('logout', {
            url: '/logout',
            views: {
                'app-view': { controller: 'LogoutController' }
            }
        });

    }

})();
