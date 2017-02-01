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
              }
              /*'menu@app': {
                  templateUrl: 'layout/menu/menu.tpl.html'
              },
              'filter@app': {
                  templateUrl: 'layout/filter/filter.tpl.html'
              }*/
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

    angular.module('app')
    .controller('analysisPeopleController', analysisPeopleController);

    analysisPeopleController.$inject = ['$state'];

    function analysisPeopleController($state){


    }

})();

(function() {
    'use strict';

    angular.module('app')
    .controller('analysisVideoController', analysisVideoController);

    analysisVideoController.$inject = ['$state'];

    function analysisVideoController($state){

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
    .directive('filter', filterDirective);

    filterDirective.$inject = [ '$document', '$timeout' ];

    function filterDirective($document, $timeout) {
      var directive = {
          restrict: 'A',
          templateUrl: 'layout/filter/filter.tpl.html',
          link: link
      };
      return directive;
    }

    function link(scope, $element, attr) {



  }
})();

(function() {
    'use strict';

    angular.module('app.directive')
    .directive('panel', panelDirective);

    panelDirective.$inject = [ '$document', '$timeout' ];

    function panelDirective($document, $timeout) {
      var directive = {
          restrict: 'A',
          link: link
      };
      return directive;
    }

    function link(scope, $element, attr) {


      _layout();

      function _layout(){

        angular.element('.peopleIn').on('click', function() {
          if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('.panel1Container').removeClass('col-md-6');
            $('.panel1Container').addClass('col-md-9');
            $('.panel3Container').hide(400);
          }else{
            $('.peopleIn').removeClass('active');
            $('.videoIn').removeClass('active');
            $(this).addClass('active');
            $('.panel1Container').removeClass('col-md-9');
            $('.panel1Container').addClass('col-md-6');
            $('.panel3Container').show(400);
          }
        });

        angular.element('.videoIn').on('click', function() {
          if($(this).hasClass('active')){
            $(this).removeClass('active');
          }else{
            $('.videoIn').removeClass('active');
            $(this).addClass('active');
          }
        });

      }



  }
})();

(function() {
    'use strict';

    angular.module('app.directive')
    .directive('menu', menuDirective);

    menuDirective.$inject = [ '$document', '$timeout' ];

    function menuDirective($document, $timeout) {
      var directive = {
          restrict: 'A',
          templateUrl: 'layout/menu/menu.tpl.html',
          link: link
      };
      return directive;
    }

    function link(scope, $element, attr) {

        _init();

        function _init(){
          var menu     = angular.element('.menulateral');
          var btnIn   = angular.element('.text');
          var btnAc   = angular.element('.text-active');

          //Toggle menu click
          angular.element('.btn-link').on('click', function () {
            $(menu).toggleClass('nav-off-screen');
          });

          // Minify menu on menu_minifier click
          angular.element('#collapse_menu').on('click', function () {
            $(menu).toggleClass('nav-xs');
            $(btnIn).toggleClass('text-active');
            $(btnAc).toggleClass('text-active');
          });

          _optionsMenu();
        }

        function _optionsMenu(){
          var filter = angular.element('.filter');
          var navLi = angular.element('.nav li');
          var navA = angular.element('.nav a');

          $(navLi).on('click', function(){
            $(navLi).removeClass('active');
            $(navA).removeClass('active');
            $(this).addClass('active');
            $(this).children().addClass('active');
          });

          $(filter).on('click', function(){
            if($(this).hasClass('op')){
              $(this).removeClass('op');
              $(this).addClass('cl');
            }else{
              $(this).removeClass('cl');
              $(this).addClass('op');
            }
          });

        }

  }
})();
