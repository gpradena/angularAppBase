(function() {
    'use strict';

    angular.module('app', [
      'ui.router',
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
                  templateUrl: 'layout/header/header.tpl.html'
              },
              'menu@app': {
                  templateUrl: 'layout/menu/menu.tpl.html'
              },
              'filter@app': {
                  templateUrl: 'layout/filter/filter.tpl.html'
              }
          }
      });

    }

})();

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

    angular.module('app.directive', []);
})();

(function() {
    'use strict';

    angular.module('app.analysisPeople').controller('analysisPeopleController', analysisPeopleController);


    function analysisPeopleController(){


            _init();

             function _init() {

            }
      }

})();

(function() {
    'use strict';

    angular.module('app.analysisVideo').controller('analysisVideoController', analysisVideoController);


    function analysisVideoController(){


            _init();

             function _init() {
               $('.affix').width($('.affix').parent().width() - 22);
               $(window).resize(function () {
                 $('.affix').width($('.affix').parent().width() - 22);
               });
            }
      }

})();

(function() {
    'use strict';

    angular.module('app.dashboard').controller('dashboardController', dashboardController);


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

(function() {
    'use strict';

    angular.module('app.directive')
    .directive('menuLateral', menuLateralDirective);

    menuLateralDirective.$inject = [ '$document', '$timeout' ];

    function menuLateralDirective($document, $timeout) {
      console.log('weaweawea');
      var directive = {
          restrict: 'A',
          link: link
      };
      return directive;
    }

    function link(scope, $element, attr) {

      $timeout(function() {
          var tid = setInterval( function () {
            if ( document.readyState !== 'complete' ) return;
            clearInterval( tid );



            var querySelector = document.querySelector.bind(document);

            var nav     = document.querySelector('.menulateral');
            var btnIn   = document.querySelector('.text');
            var btnAc   = document.querySelector('.text-active');
            var wrapper = document.querySelector('.wrapper');

            var menu = document.getElementById("js-menu");

             //Toggle menu click
            querySelector('.btn-link').onclick = function () {

              nav.classList.toggle('nav-off-screen');

            };


            // Minify menu on menu_minifier click
            querySelector('#collapse_menu').onclick = function () {
              nav.classList.toggle('nav-xs');
              btnIn.classList.toggle('text-active');
              btnAc.classList.toggle('text-active');
            };

          }, 100 );
    });
  }
})();
