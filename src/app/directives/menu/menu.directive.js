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

            var nav     = angular.element('.menulateral');
            var btnIn   = angular.element('.text');
            var btnAc   = angular.element('.text-active');

             //Toggle menu click
            angular.element('.btn-link').on('click', function () {
              $(nav).toggleClass('nav-off-screen');
            });

            // Minify menu on menu_minifier click
            angular.element('#collapse_menu').on('click', function () {
              $(nav).toggleClass('nav-xs');
              $(btnIn).toggleClass('text-active');
              $(btnAc).toggleClass('text-active');
            });

  }
})();
