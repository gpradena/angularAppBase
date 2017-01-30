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

    angular.module('app.directives', []);
})();

(function() {
    'use strict';

    angular.module('app')
    .controller('analysisPeopleController', analysisPeopleController);

    analysisPeopleController.$inject = ['$state'];

    function analysisPeopleController($state){
        var vm = this;

        vm.init = init;
        vm.panelInteraction = panelInteraction;

        init();

         function init() {
           $('.panel1').width($('.panel1Container').width() - 22);
           $(window).resize(function () {
             $('.panel1').width($('.panel1Container').width() - 22);
           });
        }

        function panelInteraction() {
          console.log('click');
        }

    }

})();

(function() {
    'use strict';

    angular.module('app')
    .controller('analysisVideoController', analysisVideoController);

    analysisVideoController.$inject = ['$state'];

    function analysisVideoController($state){
        var vm = this;

        vm.panelInteraction = panelInteraction;

        _resizePanel();

         function _resizePanel() {
           $('.panel1').width($('.panel1Container').width() - 22);
           $(window).resize(function () {
             $('.panel1').width($('.panel1Container').width() - 22);
           });
        }

        function panelInteraction(e) {

          if($(e).hasClass('active')){
            $(e).removeClass('active');
            $('.panel1Container').removeClass('col-md-6');
            $('.panel1Container').addClass('col-md-9');
            $('.panel3Container').hide();
            _resizePanel();
          }else{
            $(e).addClass('active');
            $('.panel1Container').removeClass('col-md-9');
            $('.panel1Container').addClass('col-md-6');
            $('.panel3Container').show();
            _resizePanel();
          }

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

    angular.module('app.directives')
    .directive('menu', menuDirective);

    menuDirective.$inject = [ '$document', '$timeout' ];

    function menuDirective($document, $timeout) {
      var directive = {
          restrict: 'A',
          templateUrl: 'directives/menu/menu.tpl.html'
      };
      return directive;

      function link(scope, $element, attr) {

        $timeout(function() {
          var querySelector = $element.querySelector.bind(document);

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

        });
      }
    }
})();
